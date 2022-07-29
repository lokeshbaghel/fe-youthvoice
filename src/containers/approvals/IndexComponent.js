import React from 'react';
import { connect } from 'react-redux';
import Header from '../../components/header'
import Pagination from "react-js-pagination";
import IndexComponentStyled from './IndexComponentStyled';
import { getAllApprovals , getApprovalsStatus , getApporvalSearch } from '../../actions/myaction'
import swal from 'sweetalert';
import Loader from "react-loader-spinner";
import Leftbar from '../../components/leftbar'
import { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/style.css';
import Fade from 'react-reveal/Fade';
import Moment from 'moment';
import $ from 'jquery';
const intialState = {
  email: '',
  password: '',
  permissionmessage: '',
  passwordErr: '',
  first_name: '',
  status_id:'',
  onUpdateRecord: false,
  showModalState: false,
  activePage: 1,
  itemPerPage: 10,
  productList: [],
  duplicateProductList: []
};
class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = intialState
  }
  handlePageChange(pageNumber) {
      this.setState({activePage: pageNumber});
  }
  componentDidMount() {
    $(document).ready(function () {
      var trigger = $('.hamburger'),
        overlay = $('.overlay'),
        isClosed = false;

      trigger.click(function () {
        hamburger_cross();
      });

      function hamburger_cross() {

        if (isClosed == true) {
          overlay.hide();
          trigger.removeClass('is-open');
          trigger.addClass('is-closed');
          isClosed = false;
        } else {
          overlay.show();
          trigger.removeClass('is-closed');
          trigger.addClass('is-open');
          isClosed = true;
        }
      }

      $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
      });
    });
    this.props.getAllApprovals()
  }

  convertDate = (fetchedDate, format) => {
    const momentDate = Moment(fetchedDate);
    return momentDate.format(format)
  }
  onSubmit = async (data) => {
  
    let userdetails=this.props?.uservalueloginheaderdata?.user
    let datanew={status:data?.status_id , id:data?.id,approved_id:data?.approved_id,user_id:userdetails?.user_id}
   await this.props.getApprovalsStatus(datanew);
   await this.setState({ onUpdateRecord:true})
   }
   onSearchSubmit = async e => {
    e.preventDefault();
    let data={first_name:this.state.first_name}
    this.props.getApporvalSearch(data);
   }
   onSearchChange = async e => {
    await this.setState({ [e.target.id]: e.target.value });
    if(this.state.first_name.length>0)
    {
      this.onSearchSubmit(e)
    }
   
  }



  onChange = async (status_id ,id, approved_by_id  ) => {
   swal({
      title: "Are you sure",
      text: "You want to accept this request ?",
      icon: "warning",
      buttons: [
        'No',
        'Yes'
      ]
      //buttons: true,
    })
    .then( async (willDelete) => {
      if (willDelete) {
       await this.setState({permissionmessage:"Request has been approved !"});
        let data={
          status_id : status_id==1?3:1,
          id:id,
          approved_id:approved_by_id,
         };
      await   this.onSubmit(data);  


      } else {
        swal("request was not send yet!");
      }
    });
  }

  onChangeReject = async (status_id ,id, approved_by_id  ) => {
    swal({
      title: "Are you sure",
      text: "You want to rejected for this approvals ?",
      icon: "warning",
      buttons: [
        'No',
        'Yes'
      ],
    //  buttons: true,
      dangerMode: true,
    })
    .then( async (willDelete) => {
      if (willDelete) {

        await this.setState({permissionmessage:"Permission has been rejected!"});
          let data={
            status_id : status_id==1?2:1,
            id:id,
            approved_id:approved_by_id,
           };
        await   this.onSubmit(data);   


       
      } else {
        swal("request was not send yet!");
      }
    });
  }


  
  getAllApprovalsList = users => { 
    return users.map(user => { 
     return (
        <>
          <tr key = { user?.id } >
            <td>{ `${user?.young_person_name }` }</td>
            <td>{ `${user?.childcenter }` }</td>
            <td>{user?.user_created_name} </td>
            <td>{user?.email_address}</td>
            <td>{user?.requestor_role} </td>
            <td>{ user?.requested_ts? this.convertDate(user?.requested_ts, 'DD/MM/YYYY') :''} </td>
           <td><button className="btn btn-success" onClick={()=>this.onChange(user?.status_id,user?.id, user?.approved_by_id )}><i class="fa fa-check" aria-hidden="true"></i> </button>
             <button  className="btn btn-danger" onClick={()=>this.onChangeReject(user?.status_id,user?.id, user?.approved_by_id )} > <i class="fa fa-remove"></i></button></td> 
          </tr>
        </>
      )
    })
  }
  render() {

    const {  activePage, itemPerPage } = this.state;
    const projectList=this.props?.users;
    const indexOfLastTodo = activePage * itemPerPage;
    const indexOfFirstTodo = indexOfLastTodo - itemPerPage;
    const renderedProjects = projectList?.slice(indexOfFirstTodo, indexOfLastTodo);
    const { first_name } = this.state;
     let usepermission=this.props?.uservalueloginheaderdata?.permission?.usepermission
    let  res=  usepermission? usepermission.map((element)=> element.description).includes('Approver') : ''
  
    let token = localStorage.getItem('token')
    setTimeout(() => {
      if (!token || !res) return <Redirect to='/' />
    }, 3000)
    if (!token ) return <Redirect to='/' />
    if (this.props?.authorized === 1) {
      localStorage.clear();
      return <Redirect to='/' />
    } 
  
  


 
    if(this.state?.onUpdateRecord===true){

        swal(this.state.permissionmessage, {
          icon: "success",
        })
      
     
      this.setState({onUpdateRecord:false})
     
      
    }


    return (

      <React.Fragment>

        <IndexComponentStyled>
        { !token?  <Redirect to='/' /> :''}
        <main id="main">
          <div id="wrapper">
          <Header />
            
            <Leftbar />
          
            <Fade bottom>
            <div className="page-content-wrapper user-management" data-aos="fade-up">
            {this.props?.users?.length > 0 || this.state.first_name.length < 0  ? '' : this.props?.users?.length == 0?'':<Loader type="HashLoader" color="blue" className="loader"  />} 
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <h1 className="dash-title">Approvals</h1>
                  </div>
                </div>
                <div className="right-container">
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <div className="search-user-head">
                        <div className="row align-items-center">
                          <div className="col-lg-6 col-md-6">
                            <h2><span>Number of Users:</span> { this.props?.users ? this.props.users.length : 0}</h2>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="search-div">
                              <input type="text" className="form-control search-user" id="first_name" value={first_name} onChange={this.onSearchChange} autoComplete="off" placeholder="Search Here.." />
                         
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <div className="table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">Child Name</th>
                              
                              <th scope="col">Child Centre</th>
                              <th scope="col">Requestor Name</th>
                              <th scope="col">Requestor Email Address</th>
                              <th scope="col">Requestor Role</th>
                              <th scope="col">Date  Requested</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                           
                          {this.props?.users?.length > 0 ? this.getAllApprovalsList(renderedProjects) : ''}
                          </tbody>
                        </table>
                      </div>
                      <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={this.state.itemPerPage}
                      totalItemsCount={this.props?.users?.length}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange.bind(this)}
                      />

                    </div>
                  </div>
                </div>
              </div>
            </div>
            </Fade>
            {/* /#page-content-wrapper */}
          </div>
          {/* /#wrapper */}
        </main>{/* End #main */}
        {/* ======= Footer ======= */}
        <footer id="footer">
        </footer>{/* End Footer */}

        </IndexComponentStyled>


      </React.Fragment>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.usersManagement.list,
    authorized: state.userAuthenticate,
    usersdata: state.usersManagement,
    uservalueloginheaderdata:state.uservalueloginheaderdata
  }


}

const mapDispatchToProps = (dispatch) => {
  return {

    getApprovalsStatus: (requestdata) => {
      dispatch(getApprovalsStatus(requestdata))
    },
    getApporvalSearch: (requestdata) => {
      dispatch(getApporvalSearch(requestdata))
    },
    
    getAllApprovals:()=>{
      dispatch(getAllApprovals())
    }

  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Profile);









import React from 'react';
import { connect } from 'react-redux';
import Header from '../../components/header'
import Pagination from "react-js-pagination";
import IndexComponentStyled from './IndexComponentStyled';
import Adduser from '../../components/usermanagement/adduser'
import { getAllUsers , getUserSearch } from '../../actions/myaction'
import Loader from "react-loader-spinner";
import Leftbar from '../../components/leftbar'
import { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/style.css';
import Fade from 'react-reveal/Fade';
import Moment from 'moment';
import $ from 'jquery';
function importAll(r) {
	let images = {};
	r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
	return images;
  }
 function   NoData(){
	return(<div style={{textAlign:'center'}}>No data</div>)
}
  const images = importAll(require.context('../../assets/img/', false, /\.(png|jpe?g|svg)$/));
const intialState = {
  email: '',
  password: '',
  emailErr: '',
  passwordErr: '',
  first_name: '',
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
    this.props.getAllUsers()
  }

  convertDate = (fetchedDate, format) => {
    const momentDate = Moment(fetchedDate);
    return momentDate.format(format)
  }
  onSubmit = async e => {
    e.preventDefault();
    let data={first_name:this.state.first_name}
    this.props.getUserSearch(data);
   }
  onChange = async e => {
    await this.setState({ [e.target.id]: e.target.value });
    if(this.state.first_name.length>0)
    {
      this.onSubmit(e)
    }
   
  }

  OpenEditUserModule = async userId => { 
   
    await this.setState({ showModalState: true })
  }

  getpermissionList = permissions => { 
     return permissions?.map(permission => { 
     return (
        <p> {permission?.description}</p>
      )
    })
  }

  getusercentre = centers => { 
    return centers?.map(center => { 
    return (
       <p key={center?.id}> {center?.description}</p>
     )
   })
 }
  getAllUsersList = users => { 
    return users.map(user => { 
     return (
        <>
          <tr key = { user?.id } >
            <td>{ `${user?.first_name } ${user?.last_name }` }</td>
           
            <td>  {user?.user_centre?.length > 0 ? this.getusercentre(user?.user_centre) : ''}     </td>
            <td>{user?.user_role?.user_role}</td>
            <td> {user?.user_permissions?.length > 0 ? this.getpermissionList(user?.user_permissions) : ''}</td>
            <td>{ user?.last_login? this.convertDate(user?.last_login?.login_time, 'DD/MM/YYYY') :''} </td>
            <td><Adduser userId = { user?.id } /></td>
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
    let usermanage= usepermission ? usepermission.map((element)=> element.description).includes('Site Admin') : ''
  


    let token = localStorage.getItem('token')
    setTimeout(() => {
      if (!token || !usermanage) return <Redirect to='/' />
    }, 3000)

    if (!token ) return <Redirect to='/' />
    if (this.props?.authorized === 1) {
      localStorage.clear();
      return <Redirect to='/' />
    } 
 
    
    let user=this.props?.uservalueloginheaderdata?.user
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
            {this.props?.users?.length > 0 || this.state.first_name.length < 0  ? '' : this.props?.users?.length==0?'':<Loader type="HashLoader" color="blue" className="loader"  />} 
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <h1 className="dash-title">User Management</h1>
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
                              <input type="text" className="form-control search-user" id="first_name" value={first_name} onChange={this.onChange} autoComplete="off" placeholder="Search Here.." />
                           
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
                              <th scope="col">Name</th>
                            
                              <th scope="col">Centre</th>
                              <th scope="col">Role</th>
                              <th scope="col">Permissions</th>
                              <th scope="col">Last Login</th>
                              <th scope="col">Edit</th>
                            </tr>
                          </thead>
                          <tbody>
                          {this.props?.users?.length > 0 ? this.getAllUsersList(renderedProjects) : NoData()}
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
    uservalueloginheaderdata:state.uservalueloginheaderdata,
    authorized: state.userAuthenticate
  }


}

const mapDispatchToProps = (dispatch) => {
  return {

    getUserSearch: (requestdata) => {
      dispatch(getUserSearch(requestdata))
    },
    getAllUsers:()=>{
      dispatch(getAllUsers())
    }

  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Profile);









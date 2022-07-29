import React from 'react';
import { connect } from 'react-redux';
import ProgressBar from 'react-bootstrap/ProgressBar'
import Pagination from "react-js-pagination";
import Addyoungperson from '../../components/youngpeople/addnewyoungpeople'
import Collapse from 'react-bootstrap/Collapse'
import IndexComponentStyled from './IndexComponentStyled';
import Header from '../../components/header'
import Leftbar from '../../components/leftbar'
import { getYoungPeople,leftmenu } from '../../actions/myaction'
import Loader from "react-loader-spinner";
import Graph from '../../components/graphdashboard'
import {Link , Redirect } from 'react-router-dom';
import Moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/style.css';
import Fade from 'react-reveal/Fade';

import $ from 'jquery';
const intialState = {
  email: '',
  password: '',
  emailErr: '',
  passwordErr: '',
  open:false,
  afterloginhit:1,
  activePage: 1,
  itemPerPage: 10,
  productList: [],
  duplicateProductList: []
};

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}
function NoData() {
  return (<div style={{ textAlign: 'center' }}>No data</div>)
}
const images = importAll(require.context('../../assets/img/', false, /\.(png|jpe?g|svg)$/));
class YoungPeopleList extends React.Component {

  constructor(props) {
    super(props)
    this.state = intialState
  }
  setopen = e => {
    if(this.state.open==true)
    this.setState({open:false })
    else
    this.setState({open:true })


  }

  async onchangemenu(menu) {
    await this.props.getUsersdata(menu);
    this.setState({ menname: menu });
  }
 
  handlePageChange(pageNumber) {
  
    this.setState({activePage: pageNumber});
  }
 async componentDidMount() {
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


    let user=this.props?.uservalueloginheaderdata?.user
    if(user )
    {
     await this.props.getYoungPeople(user?.user_id);
   
    }
    
  }

  //set survey status according to the users
  getSurveyStatus = status => {
    const getCircleColor = status === 'On Time' ? 'green-circle' : 'red-circle'
    return (
      <>
        <span className={ `circle ${ getCircleColor }`}></span>
        { status }
      </>
    )
  }

  getAllUsersList = users => { 
    return users.map(user => { 
      return (
        <>
          <tr key = { user?.id } >
            <td>
              <Link to={`/young-people-report/${ user?.id }`} className={this.props.leftmenu === 'young-people-report' ? "active" : ''} onClick={() => { this.onchangemenu('young-people-report') }} >
                { `${user?.first_name }` }  { `${user?.last_name }` }
              </Link>   
            </td>
            <td><img src={user?.logo_location}/></td>
            <td>{user?.center_name }</td>
            <td>{user?.third_party_system }</td>
            <td>{user?.external_id }</td>
            <td><span className="circle-div">{user?.survey_count }</span></td>
            <td>{user?.next_due?.length > 0 ? Moment(user?.next_due[0].next_due).format('DD/MM/YYYY'):''}</td> 
            <td>{ this.getSurveyStatus(user?.onStatusSurvey) }</td>
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

    let user=this.props?.uservalueloginheaderdata?.user
    if(user && this.state.afterloginhit==1)
    {
      this.props.getYoungPeople(user?.user_id);
     this.setState({afterloginhit:2})
    }
    const now = 60;
    let token = localStorage.getItem('token')
    if (!token) return <Redirect to='/' />
    
    return (

      <React.Fragment>

        <IndexComponentStyled>
        { !token?  <Redirect to='/' /> :''}
      <main id="main">
          <div id="wrapper">
          <Header />
            {/* Sidebar */}
         
            <Leftbar />

        <Fade bottom>
            
            <div className="page-content-wrapper young-people-list" data-aos="fade-up">
            {Object.keys(this.props?.usersResponse).length === 0  ? <Loader type="HashLoader" color="blue" className="loader"  /> : this.props?.users?.length >= 0 ? '': '' } 
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    <h1 className="dash-title">Young People</h1>
                  </div>


                

                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="young-people-wrapper">
                      <div className="select-list-head">
                        <h3>Number of young people: {this.props?.users?.length}</h3> <div className="i-con"><img src={images["i-icon.png"]} /></div>
                      </div>
                      <div className="table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th></th>
                              <th>Centre</th>
                              <th>Third Party System</th>
                              <th>Third Party ID</th>
                              <th>Number of Surveys Complete</th>
                              <th>Next Survey Due Date</th>
                              <th>Survey Status</th>
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
      </React.Fragment >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.usersFetchYoungPeople.list,
    usersResponse: state.usersFetchYoungPeople,
    uservalueloginheaderdata:state.uservalueloginheaderdata,
    authorized: state.userAuthenticate
  }

}

const mapDispatchToProps = (dispatch) => {
  return {

    getUsersdata: (requestdata) => {
      dispatch(leftmenu(requestdata))
    },
    getYoungPeople:(id)=>{
      dispatch(getYoungPeople(id))
    }

  }
}
export default connect(mapStateToProps,mapDispatchToProps)(YoungPeopleList);






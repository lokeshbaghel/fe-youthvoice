import React from 'react';
import { connect } from 'react-redux';
import ProgressBar from 'react-bootstrap/ProgressBar'
import { getYoungPeopleDashboard ,getToDoList,getReportList} from '../../actions/myaction'
import Collapse from 'react-bootstrap/Collapse'
import IndexComponentStyled from './IndexComponentStyled';
import Header from '../../components/header'
import Leftbar from '../../components/leftbar'
import Graph from '../../components/graphdashboard'
import { Link , Redirect } from 'react-router-dom';
import Loader from "react-loader-spinner";
import moment from 'moment';
import Pagination from "react-js-pagination";
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
  activePage: 1,
  hitlogin:1,
  itemPerPage: 5,
  productList: [],
  duplicateProductList: []
};

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}
function NoData() {
  return (<div style={{ textAlign: 'center' }} className="nodata">No surveys</div>)
}
const images = importAll(require.context('../../assets/img/', false, /\.(png|jpe?g|svg)$/));
class Profile extends React.Component {

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
  
  handlePageChange(pageNumber) {
  
    this.setState({activePage: pageNumber});
  }
  getAllUsersList = users => { 
    return users.map(user => { 
      return (

<React.Fragment>
<tr key = { user?.GDPRid }>
         
          <td><img src={images['user-circle.svg']} /></td>
        
          <td>  <Link to={`/young-people-report/${ user?.GDPRid }`}   >
          { `${user?.first_name }` }  { `${user?.last_name }` }
            </Link> </td>
            <td>  <img src={user?.logo_location}  className="flag-icon" />   </td>
          <td>
            
                
          {user?.center_name }</td>
          <td>Next Survey Due {user?.next_due ? this.convertDate(user?.next_due, 'DD/MM/YYYY') : 'N/A'}</td>
        </tr>
</React.Fragment>
       
      )
    })
  }

  getAllTodosList = todosdata => { 
    return todosdata.map(todo => { 
      return (
          <React.Fragment>
                
          <div className="select-list">
          <Link to={`/young-people-spiral-report/1/${todo.user_respondent_id}/${todo.id}`}   >
          { `Missing Notes: ${todo?.questionnaireName } -` } { `${this.convertDate(todo.completed_ts, 'DD/MM/YYYY') }` }
          </Link>
          </div>

          </React.Fragment>
    
      )
    })
  }

  calculateVariant = (leftValue, rightValue) => {
    let variant = 'danger';
    const res = this.calculateProgressValue(leftValue, rightValue);
    if(res >= 30 && res < 60)
    variant = 'warning';
    else if(res >= 60)
    variant = 'success';

    return variant;
}

/**method to determine the value for progress bar */
calculateProgressValue = (leftValue = 0, rightValue = 0) => {
    let res = 0;
    const output = ((leftValue / rightValue) * 100);
    
    if(output != 'undefined')
    res = output;  

    return res;
}

/**method to convert data in given format */
convertDate = (fetchedDate, format) => {
  const momentDate = moment(fetchedDate);
  return momentDate.format(format)
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


    const progress = document.querySelector('.progress-done');
    if (progress) {
      progress.style.width = progress.getAttribute('data-done') + '%';
      progress.style.opacity = 1;
    }

    let user=this.props?.uservalueloginheaderdata?.user
    if(user){
      this.props.getYoungPeopleDashboard(user?.user_id);
      this.props.getToDoList(user?.user_id);
      this.props.getReportList(user?.user_id);
    }
    
    
  }


  render() {

   
    const {  activePage, itemPerPage } = this.state;
    const projectList=this.props?.users;
    const indexOfLastTodo = activePage * itemPerPage;
    const indexOfFirstTodo = indexOfLastTodo - itemPerPage;
    const renderedProjects = projectList?.slice(indexOfFirstTodo, indexOfLastTodo);

    const now = 60;
    let token = localStorage.getItem('token')
    if (!token) return <Redirect to='/' />
 

 let  user=this.props?.uservalueloginheaderdata?.user
 if(user &&  this.state.hitlogin==1){
   this.props.getYoungPeopleDashboard(user?.user_id);
   this.props.getToDoList(user?.user_id);
   this.props.getReportList(user?.user_id);
  this.setState({hitlogin:2})
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
            <div className="page-content-wrapper my-profile" data-aos="fade-up">
            
            {this.props?.users?.length > 0 ? '' : this.props?.users?.length == 0 ?'':<Loader type="HashLoader" color="blue" className="loader"/>} 
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <h1 className="dash-title">Dashboard</h1>
                  </div>
                </div>
           
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="survey-wrapper">
                      <div className="select-list-head">
                        <h3>Surveys</h3> <div className="i-con"><img src={images['i-icon.png']}  /></div>
                      </div>
                      <div className="table-responsive">
                        <table className="table top-table">
                          <thead>
                            <tr>
                              <th>User</th>
                              <th />
                              <th></th>
                              <th className="country-width">Centre </th>
                              <th>Progress</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.props?.users?.length > 0 ? this.getAllUsersList(renderedProjects) : <div style={{ textAlign: 'center' ,position: "absolute",
left: "46%"}} className="nodata">{ NoData() }</div>} 
                          </tbody>
                        </table>
                      </div>

                      {this.props?.users?.length==0?'':
                      <Pagination
                          activePage={this.state.activePage}
                          itemsCountPerPage={this.state.itemPerPage}
                          totalItemsCount={this.props?.users?.length}
                          pageRangeDisplayed={5}
                          onChange={this.handlePageChange.bind(this)}
                        />
                      }
                    </div>
                   

                  </div>
                </div>


                <div className="row">
                  <div className="col-lg-4 col-md-12">
                    <div className="white-curve-box">
                      <div className="select-list-head">
                        <h3>Monthly Report</h3> <div className="i-con"><img src={images['i-icon.png']} />
                        </div>
                      </div>
                      <h3 class="graph-title">
                      <span>{Date().split(' ')[1]} {Date().split(' ')[2]}</span></h3>
                      <Graph size={[500, 500]} />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="white-curve-box">
                      
                      <div className="select-list-head">
                        <h3>Quarterly Reports</h3> <div className="i-con"><img src={images['i-icon.png']}  />
                     
                        
                        </div>
                      </div>
                      <div class="progress-items">
                      <h3 class="progress-title">{this.props?.desktopreport?.centreSurveysCompleted}/{this.props?.desktopreport?.totalCentreSurveysCount}<span>  Centre Surveys Completed</span></h3>
                      <ProgressBar  variant={this.calculateVariant(this.props?.desktopreport?.centreSurveysCompleted, this.props?.desktopreport?.totalCentreSurveysCount)} 
                                  now={this.calculateProgressValue(this.props?.desktopreport?.centreSurveysCompleted, this.props?.desktopreport?.totalCentreSurveysCount)}  
                      />
                      </div>
                      
                      <div class="progress-items">
                      <h3 class="progress-title"> {this.props?.desktopreport?.individualSurveysCompleted}/{this.props?.desktopreport?.totalindivdualSurveysCount}  <span>Individual Surveys Completed</span></h3>
                      <ProgressBar variant={this.calculateVariant(this.props?.desktopreport?.individualSurveysCompleted, this.props?.desktopreport?.totalindivdualSurveysCount)} 
                                  now={this.calculateProgressValue(this.props?.desktopreport?.individualSurveysCompleted, this.props?.desktopreport?.totalindivdualSurveysCount)}  
                      />
                      </div>

                      <div class="progress-items">
                      <h3 class="progress-title"> {this.props?.desktopreport?.overdueSurveysCompleted}/{this.props?.desktopreport?.totalOverdueSurveys}  <span>  Overdue Surveys</span></h3>
                      <ProgressBar variant={this.calculateVariant(this.props?.desktopreport?.overdueSurveysCompleted, this.props?.desktopreport?.totalOverdueSurveys)} 
                                  now={this.calculateProgressValue(this.props?.desktopreport?.overdueSurveysCompleted, this.props?.desktopreport?.totalOverdueSurveys)}  
                      />
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-lg-4 col-md-12">
                    <div className="white-curve-box">
                      <div className="select-list-head">
                        <h3>To do list</h3> <div className="i-con"><img src={images['i-icon.png']}  /></div>
                      </div>
                      <Collapse in={this.state.open}>
                      <div className="select-list-main collapse" id="collapseExample" aria-expanded="false">
                      {this.props?.todos?.length > 0 ? this.getAllTodosList(this.props?.todos) : <div style={{ textAlign: 'center' }} className="nodata">No to do list</div>} 
                
                      </div>
                      </Collapse>
                      {this.props?.todos?.length > 3?
                      <a role="button" className="collapsed"  onClick={ this.props?.todos?.length > 3 ? this.setopen:''}  />:''
                      }
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
    users: state?.usersFetchYoungPeopleDash?.list,
    authorized: state?.userAuthenticate,
    uservalueloginheaderdata:state.uservalueloginheaderdata,
    uservalue: state?.uservalue,
    todos:state?.todosdata,
    desktopreport:state?.desktopreport,
    usererror: state?.usererror,
    email: state?.updateUserRecord
  }

  
}
const mapDispatchToProps = (dispatch) => {
  return {
    getToDoList: (requestdata) => {
      dispatch(getToDoList(requestdata))
    },
    getYoungPeopleDashboard: (requestdata) => {
      dispatch(getYoungPeopleDashboard(requestdata))
    },
    getReportList: (requestdata) => {
      dispatch(getReportList(requestdata))
    },
    
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);





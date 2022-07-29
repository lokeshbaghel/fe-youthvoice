import React from 'react';
import IndexComponentStyled from './IndexComponentStyled';
import Header from '../../components/header'
import Leftbar from '../../components/leftbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from "react-bootstrap";
import swal from 'sweetalert';
import { Link,Redirect } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import { fetchYoungPeopleById,getQuestnaire,AskforapprovalsApi,youngpeoplename ,sendlink} from '../../actions/myaction';
import { getlogininfodata  } from './../../actions/myaction';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import Moment from 'moment';
import '../../assets/css/style.css';
import Loader from "react-loader-spinner";
import $ from 'jquery';
const intialState = {
  center_id:'',
  id:'',
  onUpdateRecord: false,
  questnaireid:'',
  questionnaireFirstListID:'',
  activePage: 1,
  afterloginhit:1,
  emailtosendlink:'',
  itemPerPage: 5,
  productList: [],
  duplicateProductList: [],
  userId: '',
  link:'',
  fetchQuesionnaire: false,
  requestAccessMsg:'Request Access',
  show: false,
  close: false,
  
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
class YoungPeopleReport extends React.Component {

  constructor(props) {
    super(props)
    this.state = intialState
    
  }

  async componentDidUpdate(prevProps , prevState){
    
    let id=  this.props.match.params.id
 
    if(prevState.id !== id)
    {

    let user=this.props?.uservalueloginheaderdata?.user
if(user){
 
   const userdetaildata ={
      userid:id,
      loginuser_id:user?.user_id
    }
  await  this.props.fetchYoungPeopleById( userdetaildata );
}
   
    
      const questnaireData = {
        center_id: user?.center_id,
        user_respondent_id: id,
        user_id: user?.user_id
      }

      this.props.getQuestnaire(questnaireData);
     await this.setState({id:id, fetchQuesionnaire: true});
    }

    if(prevState.fetchQuesionnaire){
      
      if(prevState.fetchQuesionnaire === this.props?.getQuestionnaireFullResponse?.fetchQuesionnaire){
        if(this.props?.questnaire.length > 0){
          const questionnaireId = this.props?.questnaire[0]?.questionaire_id
          const questionnaireFirstListID = this.props?.questnaire[0]?.completed_ts !== "0000-00-00 00:00:00" ?this.props?.questnaire[0]?.questionaire_user_respondent_id:this.props?.questnaire[1]?.questionaire_user_respondent_id
       await   this.setState({ fetchQuesionnaire: false, questnaireid: questionnaireId,questionnaireFirstListID:questionnaireFirstListID})
        }
      }
    }
  }

  onChangecheck = e => {
    this.setState({ [e.target.id]: e.target.value })
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

    let id=  this.props.match.params.id

  await  this.setState({id:id, fetchQuesionnaire: true })
    
      
  }

  //Set link tag according to the survey status of questionnaireId
  callFunctionToAddLink =  (completedTs, userId, startedTs, questionnaireId, questionaireUserRespondentId ,yongname) => { 
     if(completedTs !== '0000-00-00 00:00:00' &&  this.state.questnaireid==''){
      this.setState({questnaireid:questionaireUserRespondentId}) 
    }
    //Type 1 for start survey and 2 for resume
    if(completedTs === '0000-00-00 00:00:00' && startedTs === '0000-00-00 00:00:00'){
      return (
        <React.Fragment>
        <Link to={`/survey/info/${ userId }/${ questionnaireId }/${ questionaireUserRespondentId }/1`}>
          <button className="btn btn-primary green-btn">
            Start Survey
          </button>
        </Link>
       
        </React.Fragment>
      )
    }
    else if(completedTs !== '0000-00-00 00:00:00'){
      return (
       
        <Link to={`/young-people-spiral-report/${ questionnaireId }/${ userId }/${ questionaireUserRespondentId }`} onClick={ async () => { await this.youngpeoplename(yongname) }}>
           
          <button className="btn btn-primary" >
            Reports
          </button>
        </Link>
        
        
      )
    }
    else{
      return (
        <React.Fragment>
        <Link to={`/survey/info/${ userId }/${ questionnaireId }/${ questionaireUserRespondentId }/2`}>
          <button className="btn btn-primary green-btn">
            Resume Survey
          </button>
        </Link>


</React.Fragment>
      )
  }
}

  //add survey status according to frequency time
  getStatusValue = (completedTs, startedTs, surveyStatus, frequency, nextDue) => {
    if(completedTs === '0000-00-00 00:00:00' && startedTs === '0000-00-00 00:00:00'){
      let dDiff = Moment().diff(nextDue);
      if(dDiff < 0){
        return (
          <>
          <span className="circle orange-circle" />
            On Time
          </>
        )  
      }else{
        return (
          <>
          <span className="circle red-circle" />
            Overdue
          </>
        )
      }
    }
    else if(completedTs !== '0000-00-00 00:00:00' ){
      return (
        <>
        <span className="circle green-circle" />
          Completed
        </>
      )
    }
    else if(completedTs === '0000-00-00 00:00:00' && startedTs !== '0000-00-00 00:00:00'){
      let dDiff = Moment().diff(nextDue);
      if(dDiff < 0){
        return (
          <>
          <span className="circle orange-circle" />
            On Time
          </>
        ) 
      }else{
        return (
          <>
          <span className="circle red-circle" />
            Overdue
          </>
        )
      }
    }
  }


  askforapprovals= async (data) => { 
    
    if(data==1)
    {
      swal("Your request access is pending. Please wait !", {
        icon: "warning",
      })
     

    }
    else{
   
    let user=this.props?.uservalueloginheaderdata?.user
      const questnaireData = {  
        approved_id:1,  
        young_person_id: this.state.id,
        user_id:user?.user_id
      }
      await  this.props.AskforapprovalsApi(questnaireData);
      await this.setState({ onUpdateRecord:true});
      
    }  
  }

  async youngpeoplename(menu) {
    await this.props.getyoungpeopelname(menu);   
  }
 
  showUserInfomation = (questnaireAttribute, name, getUserID, yongname) => {
    return (
      <>
        <tr key = { questnaireAttribute.questionaire_id } >
        <td>{questnaireAttribute.name}</td>
        <td>
          
          {questnaireAttribute.completed_ts=="0000-00-00 00:00:00"? questnaireAttribute?.next_due !== '0000-00-00 00:00:00' ? Moment(questnaireAttribute?.next_due).format('DD/MM/YYYY'):'':''}
          
          </td>
        <td>{questnaireAttribute?.completed_ts !== '0000-00-00 00:00:00' ? Moment(questnaireAttribute?.completed_ts).format('DD/MM/YYYY'):''}</td>
        <td>{ this.getStatusValue(questnaireAttribute.completed_ts, questnaireAttribute.started_ts, questnaireAttribute.surveyStatus, questnaireAttribute.frequency, questnaireAttribute?.next_due)}</td>
        <td>{ questnaireAttribute?.completed_ts !== '0000-00-00 00:00:00' ? name :'' }</td>
        <td>
          { this.callFunctionToAddLink(questnaireAttribute.completed_ts, getUserID, questnaireAttribute.started_ts, questnaireAttribute.questionaire_id, questnaireAttribute.questionaire_user_respondent_id,yongname)}  
        </td>
        </tr>
      </>
    )
  }

  loginValidate() {
    let err = false;
     if (this.state.emailtosendlink == '') {
     
      this.setState({ formErr: 'Email field is required ' });
      err = true;
    }else {
      this.setState({ formErr: '' });
    }

    return err;
  }

  onSubmit = async e => {
    e.preventDefault();
    const isValid = this.loginValidate();
    const getUserID = this.props.match.params.id

    let loginuserdetail=this.props?.uservalueloginheaderdata?.user
    if (!isValid) {
      this.setState({tableToggle:true});
      
      const sendLinkData = {
        email: this.state.emailtosendlink,
        userid: loginuserdetail.user_id,
        loginusername: loginuserdetail.username,
        loginemail: loginuserdetail.email,
        link:  `${window.location.origin.toString()+this.state.link}`, 
        respondent_id :getUserID,
      
      }
      this.props.sendlink(sendLinkData);
      await this.setState({ onUpdateRecord:true,show: false});
     
    }
  }

  showmodal = () => {
    return (
      <>
     <div>
       <Modal
          show={this.state.show}
          animation={true}
          size="md" className="send-link shadow-lg border">
             <Modal.Header className="py-1">
             <h5>Send Link</h5>
              <button type="button" class="close" onClick={() => this.setState({ show: false })}><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
             
          </Modal.Header>
          <Modal.Body className="py-0">
            <form  onSubmit={this.onSubmit}   >
            <input type="email" placeholder="Enter Email Address" id="emailtosendlink" onChange={this.onChangecheck} className="email-adress"/>
            <center><span style={{ color: 'red' }}><h4>{this.state.formErr}</h4></span></center>
            <button type="submit" id="searchsubmit" name="submit" className="btn">Send Link</button>
            </form>
          </Modal.Body>
<Modal.Footer className="py-1 d-flex justify-content-center">
              
             
            </Modal.Footer>
        </Modal>
      </div>

</>
)
}






  getAllUsersList =( questnaire ,yongname, permissionStatus)=> { 
    const getUserID = this.props.match.params.id
    return questnaire.map(questnaireAttribute => { 
      const name = questnaireAttribute.last_name ? questnaireAttribute.first_name+ ' ' + questnaireAttribute.last_name  : questnaireAttribute.first_name;
      if(permissionStatus !== 3){
        if(questnaireAttribute.completed_ts === '0000-00-00 00:00:00'){
          return this.showUserInfomation(questnaireAttribute, name, getUserID, yongname)
        }
      }else{
        return this.showUserInfomation(questnaireAttribute, name, getUserID, yongname)
      }
      
    })
  }
 async handlePageChange(pageNumber) {
  
   await this.setState({activePage: pageNumber});
  }

  render() {
   
    const {  activePage, itemPerPage } = this.state;
    const projectList=this.props?.questnaire;
    const indexOfLastTodo = activePage * itemPerPage;
    const indexOfFirstTodo = indexOfLastTodo - itemPerPage;
    const renderedProjects = projectList?.slice(indexOfFirstTodo, indexOfLastTodo);
    const token = localStorage.getItem('token')
 
    let usePermission=this.props?.uservalueloginheaderdata?.permission?.usepermission
    const questionnaireId = this.state.questnaireid
    let  isUsePermission = false
    if(usePermission){
      for(let element of usePermission){
        if(element.description === 'Center Admin'){
          isUsePermission = true
        }
      }
    }
    let user=this.props?.uservalueloginheaderdata?.user
    if(user !=undefined && this.state.afterloginhit==1 ){
      
      let id=  this.props.match.params.id
      const userdetaildata ={
        userid:id,
        loginuser_id:user?.user_id
      }
      this.props.fetchYoungPeopleById( userdetaildata );
      this.setState({afterloginhit:2})
    }
   
    let totalQuestionnaireCount = 0
    if(this.props?.questnaire?.length > 0 && this.props?.usersbyid !== undefined){
      let questionnaire = this.props?.questnaire
      if(this.props?.usersbyid.permission_status !== 3){
        for(let data of questionnaire){
          if(data.completed_ts === '0000-00-00 00:00:00'){
            totalQuestionnaireCount++;
          }
        }
      }else{
        totalQuestionnaireCount = questionnaire.length
      }
    }
    
 
      if( this.state?.onUpdateRecord===true){
      swal("Request Sent", {
           icon: "success",
         })
     this.setState({onUpdateRecord:false})
          
    }


    return (

      <React.Fragment>
        <IndexComponentStyled>

          {!token ? <Redirect to='/' /> : ''}
          <main id="main">
          <div id="wrapper">
            <Header />
         
            {/* Sidebar */}
           <Leftbar />
            {/* /#sidebar-wrapper */}
            {/* Page Content */}
            <Fade bottom>
            <div className="page-content-wrapper my-profile-second" data-aos="fade-up">
            {this.props?.usersbyid?.first_name  ? '' : <Loader type="HashLoader" color="blue" className="loader"  />} 
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    <h1 className="dash-title">{this.props?.usersbyid?.first_name} {this.props?.usersbyid?.last_name}</h1>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="btn-group">
                      {this.props?.questnaire !== undefined && this.state?.questionnaireFirstListID !== undefined ?
                      isUsePermission ? 
                        this.props?.questnaire.length > 0 ?
                         this.props?.usersbyid?.permission_status===3  ?
                        <Link to={`/young-people-spiral-report/1111654312-${questionnaireId}/${this.state?.id}/${this.state?.questionnaireFirstListID}`} onClick={ async () => { await this.youngpeoplename(`${this.props?.usersbyid?.first_name}  ${this.props?.usersbyid?.last_name}`) }}><button type="button" className="btn btn-primary">Reports</button></Link>
                        : this.props?.usersbyid?.permission_status==1? <button type="button" className="btn btn-primary" onClick={ async ()=> await this.askforapprovals(this.props?.usersbyid?.permission_status)}>Access Request Pending</button> : <button type="button" className="btn btn-primary" onClick={ async()=> await this.askforapprovals(this.props?.usersbyid?.permission_status)}>Request Access</button> 
                        : '' 
                        : this.props?.usersbyid?.permission_status===3 ? 
                        this.props?.questnaire.length > 0 ?
                         <Link to={`/young-people-spiral-report/1111654312-${questionnaireId}/${this.state?.id}/${this.state?.questionnaireFirstListID}`} onClick={ async () =>  { await this.youngpeoplename(`${this.props?.usersbyid?.first_name}  ${this.props?.usersbyid?.last_name}`) }}><button type="button" className="btn btn-primary">Reports</button></Link>
                         : ''
                         :
                         this.props?.usersbyid?.permission_status==1?<button type="button" className="btn btn-primary" onClick={ async ()=> await this.askforapprovals(this.props?.usersbyid?.permission_status)}>Access Request Pending</button> :<button type="button" className="btn btn-primary" onClick={async ()=> await this.askforapprovals(this.props?.usersbyid?.permission_status)}>Request Access</button>
                        :''
                      }
                  
                  
                   
                    
                    </div>	
                  </div>
                </div>
                <div className="right-container">
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <div className="search-user-head">
                        <h2><span>Contact Information</span></h2>
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
                              <th scope="col">DOB</th>
                              <th scope="col">Centre</th>
                              <th scope="col">Region</th>
                              <th scope="col">Next Survey Date</th>
                              <th scope="col">Surveys Completed</th>
                            </tr>
                          </thead>
                          <tbody>
                           
                          <tr>
                            <td>{this.props?.usersbyid?.first_name} {this.props?.usersbyid?.last_name}</td>
                            <td>{ Moment(this.props?.usersbyid?.dob).format('DD/MM/YYYY')}</td>
                            <td>{this.props?.usersbyid?.center_name}</td>
                            <td>{this.props?.usersbyid?.town}</td>
                            <td>{ Moment(this.props?.usersbyid?.surveyOverdue[0]?.next_due).format('DD/MM/YYYY')}</td>
                            <td>{this.props?.usersbyid?.surveyCompleted}</td>
                          </tr>
                          
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right-container mt-5">
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <div className="search-user-head">
                        <h2><span>Survey Information</span></h2>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <div className="table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">Survey</th>
                              <th scope="col">Date Due</th>
                              <th scope="col">Date Completed</th>
                              <th scope="col">Status</th>
                              <th scope="col">Completed By</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.props?.questnaire?.length > 0  && this.props?.usersbyid !== undefined ? this.getAllUsersList(renderedProjects,`${this.props?.usersbyid?.first_name}  ${this.props?.usersbyid?.last_name}`, this.props?.usersbyid.permission_status) : NoData()} 
                         </tbody>
                        </table>
                      </div>
                      <Pagination
                          activePage={this.state.activePage}
                          itemsCountPerPage={this.state.itemPerPage}
                          totalItemsCount={ totalQuestionnaireCount }
                          pageRangeDisplayed={5}
                          onChange={this.handlePageChange.bind(this)}
                        />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {this.showmodal()  }
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
    questnaire: state.questnaire.list,
    getQuestionnaireFullResponse: state.questnaire,
    authorized: state.userAuthenticate,
    usersbyid: state.search.list,
    askforapprovals:state.askforapprovals,  
    uservalueloginheaderdata:state.uservalueloginheaderdata,
    sendlinkres:state.insertSurveyWithResponse 
  }

}

const mapDispatchToProps = (dispatch) => {
  return {

  
    getyoungpeopelname: (requestdata) => {
      dispatch(youngpeoplename(requestdata))
    },
    sendlink: (requestdata) => {
      dispatch(sendlink(requestdata))
    },
    getlogininfodata: () =>{ dispatch(getlogininfodata())},
    AskforapprovalsApi: (requestdata) => {
      dispatch(AskforapprovalsApi(requestdata))
    },
    fetchYoungPeopleById: (requestdata) => {
      dispatch(fetchYoungPeopleById(requestdata))
    },
    getQuestnaire:(requestdata)=>{
      dispatch(getQuestnaire(requestdata))
    }

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(YoungPeopleReport);
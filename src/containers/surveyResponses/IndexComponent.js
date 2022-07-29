import React from "react";
import { connect } from "react-redux";
import { Link,Redirect } from 'react-router-dom';
import Collapse from "react-bootstrap/Collapse";
import IndexComponentStyled from "./IndexComponentStyled";
import Header from "../../components/header";
import Leftbar from "../../components/leftbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/style.css";
import Fade from "react-reveal/Fade";
import $ from "jquery";
import Moment from 'moment';
import swal from 'sweetalert';
import { surveyResponseForYoungPeople, questionaireRespondentNotes ,fetchYoungPeopleById } from "../../actions/myaction";
import { act } from "react-dom/test-utils";
const intialState = {
  email: "",
  password: "",
  emailErr: "",
  afterloginhit:1,
  passwordErr: "",
  open: false,
};


function NoData() {
  return <div style={{ textAlign: "center" }}>No data</div>;
}

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = intialState;
  }
  setopen = async (data) => {
    if (this.state.open == data) await this.setState({ open: false });
    else await this.setState({ open: data });
  };

  componentDidMount() {
    
    $(document).ready(function () {
      var trigger = $(".hamburger"),
        overlay = $(".overlay"),
        isClosed = false;

      trigger.click(function () {
        hamburger_cross();
      });

      function hamburger_cross() {
        if (isClosed == true) {
          overlay.hide();
          trigger.removeClass("is-open");
          trigger.addClass("is-closed");
          isClosed = false;
        } else {
          overlay.show();
          trigger.removeClass("is-closed");
          trigger.addClass("is-open");
          isClosed = true;
        }
      }

      $('[data-toggle="offcanvas"]').click(function () {
        $("#wrapper").toggleClass("toggled");
      });
    });

    const progress = document.querySelector(".progress-done");
    if (progress) {
      progress.style.width = progress.getAttribute("data-done") + "%";
      progress.style.opacity = 1;
    }
    const { id, type, userid} = this.props.match.params
    const RespondentNotes={questionaire_user_respondent_id:type,userId: userid}
    this.props.getSurveyResponsesForYoungPeople(id, type, userid);
    let userlogindetail = this.props?.uservalueloginheaderdata?.user
    
    if(userlogindetail ){ 
      const userdetaildata ={
        userid:userid,
        loginuser_id:userlogindetail?.user_id
      }
      this.props.fetchYoungPeopleById( userdetaildata );
      
     }



  
    this.props.getQuestionaireRespondentNotes(RespondentNotes);
  }

  getSurveyQuestionAnswer = (surveyResponses) => {
    const getUserID = this.props.match.params.id;
    const AnswerIcons = {
      2 : 'light-green-circle circle',
      4: 'orange-circle circle',
      3: 'yellow-circle circle',
      1: 'green-circle circle',
      5: 'red-circle circle'
    }
    return surveyResponses.map((surveyResponseAttribute) => {
      return (
        <>
          <div className="card" key={surveyResponseAttribute.module_id}>
            <div className="card-header" id="headingThree">
              <h5 className="mb-0">
                <button
                  className="btn btn-link collapsed"
                  onClick={() =>
                    this.setopen(surveyResponseAttribute.module_id)
                  }
                  data-toggle="collapse"
                  data-target={"#collapse" + surveyResponseAttribute.module_id}
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  {surveyResponseAttribute.name}
                </button>
              </h5>
            </div>
            <Collapse in={this.state.open == surveyResponseAttribute.module_id}>
              <div
                id="collapse1"
                className="collapse"
                aria-labelledby="headingThree"
                data-parent="#accordion"
              >
                {surveyResponseAttribute.questions_answers.length > 0 ? (
                  <>
                    {(() => {
                      return surveyResponseAttribute.questions_answers.map(
                        (data, index) => (
                          <div className="card-body" key={index}>
                            <div className="question-text">
                              <b>Statements:</b> {data.question}
                            </div>
                            <div className="answer-text">
                              <b>Answer:</b> <span className="answer-wrapper"><span className={AnswerIcons[data.answer_id]}></span><span>{data.answer}</span></span>
                            </div>
                          </div>
                        )
                      );
                    })()}
                  </>
                ) : (
                  ""
                )}
              </div>
            </Collapse>
          </div>
        </>
      );
    });
  };
  getList = (actions,actiondate) => { 
 
     
      let complDte;
      for(let i=0; i<=actions.length;i++){
        return (
         
          <React.Fragment>
            {  complDte = Moment(actiondate[i]).format('DD/MM/YYYY')}
            <br /> <b>Actions:</b>
          <p>{actions[i]}</p><br />
          
          <p>{complDte}</p><br />
          
         </React.Fragment>
  
 )
      }
      

    }
 getAllDataList = (datas , actions,actiondate) => { 
     return (
                 <React.Fragment>
                 <p>Notes: </p>
                 <p>{datas}</p>
             
               </React.Fragment>
         
        )
   }
  render() {
    const now = 60;
    let token = localStorage.getItem("token");
    if (!token) return <Redirect to="/" />;
    const user = JSON.parse(localStorage.getItem("user"));
    const { id, type ,userid } = this.props.match.params

  
   if(this.props?.surveyResponses?.list?.message)
   {
    swal(this.props?.surveyResponses?.list?.message, {
      icon: "warning",
    })
   }
   let userlogindetail = this.props?.uservalueloginheaderdata?.user
    
   if(userlogindetail !=undefined && this.state.afterloginhit==1){ 
     const userdetaildata ={
       userid:userid,
       loginuser_id:userlogindetail?.user_id
     }
     this.props.fetchYoungPeopleById( userdetaildata );
     this.setState({afterloginhit:2})
    }

     let arcnt= this.props?.questionaireRespondentNotes?.data?.actions?.length;
   
    let elements=[];
for(let i=0;i<arcnt;i++)
    {
      const complDate = Moment(this.props?.questionaireRespondentNotes?.data?.actiondate[i]).format('YYYY-MM-DD')
    
        elements.push( <React.Fragment>
      
           <h2>Actions:</h2>
          <p>{this.props?.questionaireRespondentNotes?.data?.actions[i]}</p>
          <p>{complDate}</p>
          </React.Fragment>
);
}

    
    return (
      <React.Fragment>
        <IndexComponentStyled>
          {!token ? <Redirect to="/" /> : ""}

          <main id="main">
            <div id="wrapper">
              <Header />
              {/* Sidebar */}

              <Leftbar />

              <Fade bottom>
                {/* Page Content */}
                <div
                  className="page-content-wrapper survey-responses"
                  data-aos="fade-up"
                >
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <h1 className="dash-title">{this.props?.youngpeoplenam?.first_name} {this.props?.youngpeoplenam?.last_name} - Reports</h1>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="links-container">
                        
                          <div className="dropdown show">
                         
                            <div
                              className="dropdown-menu"
                              aria-labelledby="dropdownMenuLink"
                            >
                              <a className="dropdown-item" href="#">
                                Data1
                              </a>
                              <a className="dropdown-item" href="#">
                                Data2
                              </a>
                              <a className="dropdown-item" href="#">
                                Data3
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="links-container">
                      <div className="row">
                        <div className="col-lg-12 col-md-12">
                          <div className="left-links">
                          <Link className="btn btn-outline-primary" to={`/young-people-spiral-report/${id}/${userid}/${type}`}>Reports</Link>
                            <a className="btn btn-outline-primary active">Survey Responses</a>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <div className="white-curve-box">
                          <div className="search-user-head">
                            <h2>
                              <span>
                                If there is anyone you do not wish your views to
                                be shared with your key worker will note it
                                here.
                              </span>
                             
                            </h2>
                           
                          
                          </div>
                          <p>{this.props?.questionaireRespondentNotes?.workerNotes?.hide_from}</p>
                        </div>
                        
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <div className="white-curve-box">
                          <div className="search-user-head">
                            <h2>
                              <span>Survey Responses</span>
                            </h2>
                          </div>
                        
                          <div
                            id="accordion"
                            className="custom-accordion-third"
                          >
                            {this.props?.surveyResponses?.list?.length > 0
                              ? this.getSurveyQuestionAnswer(
                                  this.props?.surveyResponses.list
                                )
                              : NoData()}
                          </div>
                        </div>
                      </div>
                    </div>



                    
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <div className="white-curve-box">
                          <div className="search-user-head">
                            <h2>
                              <span>Key Worker Analysis</span>
                            </h2>
                          </div>
                          <div>
                          
                          {this.props?.questionaireRespondentNotes?.data?.notes?.text?.length > 0  || this.props?.questionaireRespondentNotes?.data?.actions > 0? this.getAllDataList(this.props?.questionaireRespondentNotes?.data?.notes?.text ,  this.props?.questionaireRespondentNotes?.data?.actions, this.props?.questionaireRespondentNotes?.data?.actiondate) :''}
                      
                          {elements}  
                          </div>
                        </div>
                      
                      </div>
                    </div>
                  </div>
                </div>
              </Fade>
            </div>
            {/* /#page-content-wrapper */}
            {/* /#wrapper */}
          </main>
          {/* End #main */}
          {/* ======= Footer ======= */}
          <footer id="footer"></footer>
          {/* End Footer */}
        </IndexComponentStyled>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    youngpeoplenam: state.search.list,
    uservalue: state.uservalue,
    usererror: state.usererror,
    email: state.updateUserRecord,
    surveyResponses: state.getSurveyResponseForYoungPeople,
    uservalueloginheaderdata:state.uservalueloginheaderdata,
    questionaireRespondentNotes: state.getQuestionaireRespondentNotes.data
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSurveyResponsesForYoungPeople: (id, type, userid) => {
      dispatch(surveyResponseForYoungPeople(id, type, userid));
    },
    fetchYoungPeopleById: (requestdata) => {
      dispatch(fetchYoungPeopleById(requestdata))
    },
    getQuestionaireRespondentNotes: (id) => {
      dispatch(questionaireRespondentNotes(id))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

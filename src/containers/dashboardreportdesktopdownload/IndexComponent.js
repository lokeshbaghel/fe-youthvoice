import React from 'react';
import { connect } from 'react-redux';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Select from 'react-select';
import IndexComponentStyled from './IndexComponentStyled';
import Header from '../../components/header'
import Leftbar from '../../components/leftbar'
import Graph from '../../components/radarpantagone'
import Collapse from "react-bootstrap/Collapse";
import Graphsecond from '../../components/radarpantagone/radar'
import { Link,Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { questionaireRespondentNotes,surveyResponseForYoungPeople ,getQuestnaire ,getfirstsurveyname, fetchYoungPeopleById} from "../../actions/myaction";
import Moment from 'moment';
import '../../assets/css/style.css';
import $ from 'jquery';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}
function NoData() {
  return (<div style={{ textAlign: 'center' }}>No data</div>)
}
const images = importAll(require.context('../../assets/img/', false, /\.(png|jpe?g|svg)$/));
let newState = [];

class Profile extends React.Component {

  constructor(props) {
    super(props)
    this.state =  {
      id : props.id,
      type : props.type,
      userid: props.userid,
      email: '',
      password: '',
      afterloginhit:1,
      emailErr: '',
      passwordErr: '',
      roles:[],
      changegraphdata:0,
      textdata:'',
      actions:'',
      open:false
    };
    this.print = this.print.bind(this);
  }

  print() {
    var content = document.getElementById('divToPrint');
    var pri = document.getElementById('ifmcontentstoprint').contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();

    
}
  setopen = e => {
    if(this.state.open==true)
    this.setState({open:false })
    else
    this.setState({open:true })
 }
   //Fetch passwords detail to show in modal
   onChange = e => {
    this.setState({ [e.target.id]: e.target.value })
  }
  onChangegrapgdropdown = async e => {
   await this.setState({ [e.target.id]: e.target.value , changegraphdata:1});
   
  }
  handleChange = async (roles) => {
    await this.setState({ roles });
    await this.setState({ changegraphdata:1})
    
   
  }
  loginValidate() {
    let err = false;
     if (this.state.textdata == '') {
      
      this.setState({ formErr: 'Notes is required ' });
      err = true;
    }
    else if(this.state.actions == '') {
      
      this.setState({ formErr: 'Actions is required ' });
      err = true;
    }
    
    else {
      this.setState({ formErr: '' });
    }

    return err;
  }

  onSubmit = async e => {
    e.preventDefault();
    const {  type, } = this.state
    const isValid = this.loginValidate();
    
    if (!isValid) {
    
      let userdatas={questionaire_user_respondent_id:type , text:this.state.textdata,actions:this.state.actions}
      this.props.getQuestionaireRespondentNotes(userdatas);
     
    }

  }


   getPDF(){
            var HTML_Width = $("#divToPrint").width();
            var HTML_Height = $("#divToPrint").height();
            var top_left_margin = 15;
            var PDF_Width = HTML_Width+(top_left_margin*2);
            var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
            var canvas_image_width = HTML_Width;
            var canvas_image_height = HTML_Height;
            var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;
            html2canvas($("#divToPrint")[0],{allowTaint:true}).then(function(canvas) {
            canvas.getContext('2d');
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height]);
              pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);
              for (var i = 1; i <= totalPDFPages; i++) { 
              pdf.addPage('p', 'pt',  [PDF_Width, PDF_Height]);
              pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
          }
		        pdf.save("Reports.pdf");
        });
   	};
     
  componentDidUpdate(prevProps , prevState){
    
    let id=  this.state.type
    if(prevState.id !== id)
    {
      let userid=  this.state.userid

      let user=this.props?.uservalueloginheaderdata?.user
      const questnaireData = {
        center_id: user?.center_id,
        user_respondent_id: userid,
        user_id: user?.user_id
      }
      const getfirstsurveyname={
        
        user_respondent_id: userid,
        type: id
      }
      const userdetaildata ={
        userid:userid,
        loginuser_id:user?.user_id
      }
      this.props.fetchYoungPeopleById( userdetaildata );
     
     
      this.props.getQuestnaire(questnaireData);
      this.props.getfirstsurveyname(getfirstsurveyname);
 
      this.setState({id:id});
    }
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

    const {  id , type,userid } =this.state
    const progress = document.querySelector('.progress-done');
    if (progress) {
      progress.style.width = progress.getAttribute('data-done') + '%';
      progress.style.opacity = 1;
    }
   
    let userdatas={questionaire_user_respondent_id:type , text:this.state.textdata}
    this.props.getQuestionaireRespondentNotes(userdatas);
    this.props.getSurveyResponsesForYoungPeople(id , type , userid);

 let user=this.props?.uservalueloginheaderdata?.user
    const questnaireData = {
      center_id: user?.center_id,
      user_respondent_id: userid,
      user_id: user?.user_id
    }

    const getfirstsurveyname={
        
      user_respondent_id: userid,
      type: type
    }
   
    this.props.getfirstsurveyname(getfirstsurveyname);


    const userdetaildata ={
      userid:userid,
      loginuser_id:user?.user_id
    }
    this.props.fetchYoungPeopleById( userdetaildata );
   
    this.props.getQuestnaire(questnaireData);
    


  }
   //Get centers select Box
    optionsdata = roles => {
      return roles.map(role => {
        let dat=role?.completed_ts !== '0000-00-00 00:00:00' ? Moment(role?.completed_ts).format('DD/MM/YYYY'):''
        if(dat){
          newState.push({ value:` ${role.questionaire_user_respondent_id}-${role.questionaire_id}`, label: `${role.name} - ${dat}` })
        }
       
      })
    }
    
   

  getRolesDropdownMenu = roles => {
    let id=  this.state.type
    
    return roles.map(role => {
     
      return (
        <>
       
       
         { role?.completed_ts !== '0000-00-00 00:00:00' ?<React.Fragment>
          <option value={` ${role.questionaire_user_respondent_id}-${role.questionaire_id}`}>{role.name} - {role?.completed_ts !== '0000-00-00 00:00:00' ? Moment(role?.completed_ts).format('DD/MM/YYYY'):''}</option>
          </React.Fragment>:'' }
        </>
      )
    })
  }
  
 
  getAllDataList = datas => { 

      return (

<React.Fragment>
<li>{datas}</li>
</React.Fragment>
       
      )

  }

  render() {
    const { roles } = this.state;
    
    let token = localStorage.getItem('token')
    if (!token) return <Redirect to='/' />

    let user=this.props?.uservalueloginheaderdata?.user


    if(user !=undefined && this.state.afterloginhit==1){ 
    const questnaireData = {
      center_id: user?.center_id,
      user_respondent_id: userid,
      user_id: user?.user_id
    }

    const getfirstsurveyname={
        
      user_respondent_id: userid,
      type: type
    }
   
    this.props.getfirstsurveyname(getfirstsurveyname);


    const userdetaildata ={
      userid:userid,
      loginuser_id:user?.user_id
    }
    this.props.fetchYoungPeopleById( userdetaildata );
   
    this.props.getQuestnaire(questnaireData);
    
    this.setState({afterloginhit:2})
  }

    const { id, type ,userid} = this.state
    let questionnaireNote = ''

    if(this.props?.questionaireRespondentNotes){
      const questionnaireRespondentNote = this.props?.questionaireRespondentNotes
      if(questionnaireRespondentNote.status === 1){
        questionnaireNote = questionnaireRespondentNote?.data?.data?.notes?.text
      }
      
      
    }
    
    return (

      <React.Fragment>

        <IndexComponentStyled>

        { !token?  <Redirect to='/' /> :''}
        
        <main id="main">
          <div id="wrapper">
           
            {/* Sidebar */}
        
            {/* /#sidebar-wrapper */}
            {/* Page Content */}

         
            <div className="page-content-wrapper dashboard-report canvas_div_pdf"  data-aos="fade-up">
                      <div className="container-fluid">
                     
                        <div className="row custom-header-content">
                        
                          <div className="col-lg-6 col-md-6">
                          <div className="left-logo"><img src={images['ofg-logo.png']} /></div>
                            <h1 className="dash-title">{this.props?.youngpeoplenam?.first_name}  {this.props?.youngpeoplenam?.last_name}  
                           {this.state?.changegraphdata==1 ? '':' - '+this.props?.firstsurveyName?.survey}
                             
                             </h1>
                          </div>
                         
                          <div className="col-lg-6 col-md-6">
                         
                            
                            </div>
                        </div>
                     
                        <ul className="reading-report-links">	
                        <li><a ><span className="green-circle" /> Strongly Agree</a></li>
                        <li><a ><span className="light-green-circle" /> Agree</a></li>
                        <li><a ><span className="yellow-circle" /> Neither Agree or Disagree</a></li>
                        <li><a ><span className="orange-circle" /> Disagree</a></li>
                          <li><a ><span className="red-circle" /> Strongly Disagree</a></li>
                       </ul>
                        <div id="divToPrint">
                        <style>
                          {`
                          .printheader {
                             display: flex;
                              justify-content: space-between;
                              width: 100%;
                              height: 100px;
                              clear: both;
                          }

                         
                        
                          
                          .right-content .white-curve-box {
                            display: flex;
                            flex-direction: column;
                            justify-content: flex-start;
                          }
                          .right-content .white-curve-box .search-user-head h2 {
                            font-size: 22px;
                            color: #333333;
                            font-weight: bold;
                          }
                          
                          .right-content .card-body {
                              padding: 7px 10px;
                          }
                         

                          @page {
                            size: A4 portrait;
                            }
                          
                          @media all {
                            .pagebreak {
                              display: none;
                            }
                           

                          }
                          
                          @print {
                            @page :footer {
                                display: none
                            }
                          
                            @page :header {
                                display: none
                            }
                        }
                        .custom-header-content .col-md-6 {
                          width: 50% !important;
                        }
                        .left-logo,
                            .right-logo {
                              margin: 50px 0;
                              display: block;
                            }
                             .right-logo {
                               width: 100%;
                               text-align: right;
                             }

                             .white-curve-box {
                              height: 580px !important;
                              margin: 0 0 60px;
                            }

                            .second-graph .white-curve-box {
                              height: auto !important;
                              min-height: auto !important;
                            }

                          @media print {
                            .page-content-wrapper {
                              max-width: 1200px;
                            }
                            .apexcharts-legend {
                              margin: 0 160px 0 0;
                              position: relative;
                            }
                            .apexcharts-legend-marker {
                              float: left;
                              background-color: #000 !important;
                            }
                            
                           

                            .report-graph .custom-radar,
                            .report-graph .right-content {
                              width: 50% !important;
                            }

                            .white-curve-box svg {
                              margin: 0 0 0 -150px !important;
                           }

                           .second-graph svg {
                            position: relative;
                            left: -90px;
                           }

                         

                            .logo-small,
                            .right-links {
                              display: none;
                            }
                            
                            .right-content {
                              display: block;
                            }
                            .apexcharts-grid ,line{
                              display:none !important;
                            }
                            .pagebreak {
                              page-break-before: always;
                            }

                            .main-dropdown{
                               display:none !important;
                            }

                            .left-links{
                              display:none !important;
                            }

                            .links-container{
                              display:none !important;
                            }

                            .apexcharts-svg{
                              border:none !important;
                            }

                            .right-links .text-right{
                              display:none !important;
                            }

                            .header-right{
                              display:none !important;
                            }

                            .white-curve-box {
                              background: none !important;
                              border: none !important;
                            }

                            .reading-report-links{
                              display:none !important;
                            }
                            
                          
                            .row {
                              width: 100% !important;
                             
                            }
                          
                            .navbar {
                              display: none !important;
                            }
                            .page-content-wrapper {
                              padding: 0 !important;
                            }

                            .print-content {
                              width: 100%;
                              page-break-after: always;
                            }
                            .dontshow {
                              display: none !important;
                            }
                           
                          

                            }}`
                            }
                        </style>
                        
                        <div className="print-content first-graph">
                        <div className="row report-graph">
                        
                          {
                            this.state.changegraphdata===1?<Graph graphData={this.state.roles} userid={this.state.userid} surveyresponse={ this.props?.surveyResponses} />:<Graph id={this.state.id} graphData="" userid={this.state.userid} type={this.state.type} surveyresponse={ this.props?.surveyResponses} />
                          }
                        
                        </div>

                        <div className="print-content second-graph">  
                        <div className="row report-graph">
                          <div className="col-lg-12 col-md-12">
                            <div className="white-curve-box">
                            {
                            this.state.changegraphdata===1?<Graphsecond graphData={this.state.roles}  userid={this.state.userid} />:<Graphsecond id={this.state.id} graphData="" userid={this.state.userid} type={this.state.type} />
                          }
                        
                           
                            </div>
                          </div>
                        </div>
                        </div> 
                        </div>

                        <div className="print-content third-content">  
                        <div class="row down-div report-graph">
                         <div class="col-lg-12 col-md-12">
                        <div  className={"white-curve-box bottom-links " + (questionnaireNote ? '' : 'dontshow')} 
                        
                       >
                       <h3>Key Worker Analysis</h3>
                      <ul>
                      {questionnaireNote  ? this.getAllDataList(questionnaireNote) : <React.Fragment>
                    
                      <form className="notes-content dontshow" onSubmit={this.onSubmit}>
                      <label>
                        Notes:
                        </label>
                        <textarea value={this.state.textdata} id="textdata" className="textdata" onChange={this.onChange} />

                        <label>
                        Actions:
                        </label>
                        <textarea value={this.state.actions} id="actions" className="actions" onChange={this.onChange} />
                        
                        <center><span style={{ color: 'red' }}><h4>{this.state.formErr}</h4></span></center>
                        <button type="submit" value="Submit" className="btn btn-primary pull-right green-btn mb-5">Save</button>
                        </form>
                        
                        </React.Fragment>} 
                      
                      </ul>
                      <div>
                      
                      </div>
                  </div>
                
                  </div>          
                          
                </div>
             </div>

            </div>
				
              </div>
            </div>
          </div>

         
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
    
    youngpeoplenam: state.search.list,
    firstsurveyName: state.firstsurveyName.data,
    uservalue: state.uservalue,
    usererror: state.usererror,
    email: state.updateUserRecord,
    questnaire: state.questnaire.list,
    surveyResponses: state.getSurveyResponseForYoungPeople,
    questionaireRespondentNotes: state.getQuestionaireRespondentNotes,
    uservalueloginheaderdata:state.uservalueloginheaderdata
  }


}
const mapDispatchToProps = (dispatch) => {
  return {
        getQuestionaireRespondentNotes: (id) => {
      dispatch(questionaireRespondentNotes(id))
    },
    fetchYoungPeopleById: (requestdata) => {
      dispatch(fetchYoungPeopleById(requestdata))
    },
    getfirstsurveyname: (requestdata) => {
      dispatch(getfirstsurveyname(requestdata))
    },
    getSurveyResponsesForYoungPeople: (id,type,userid) => {
      dispatch(surveyResponseForYoungPeople(id,type,userid));
    },
    getQuestnaire:(requestdata)=>{
      dispatch(getQuestnaire(requestdata))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);









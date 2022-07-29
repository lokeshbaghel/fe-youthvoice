import React from 'react';
import { connect } from 'react-redux';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import swal from 'sweetalert';
import Select from 'react-select';
import IndexComponentStyled from './IndexComponentStyled';
import Header from '../../components/header'
import Leftbar from '../../components/leftbar'
import Download from '../../containers/dashboardreportdesktopdownload'
import Graph from '../../components/radarpantagone'
import Graphsecond from '../../components/radarpantagone/radar'
import { Link,Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { questionaireRespondentNotes,surveyResponseForYoungPeople ,getSurveyReportsListDropdown ,getfirstsurveyname, fetchYoungPeopleById} from "../../actions/myaction";

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
      id : this.props.match.params.id,
      type : this.props.match.params.type,
      userid: this.props.match.params.userid,
      email: '',
      password: '',
      emailErr: '',
      afterloginhit:1,
      downloadComponent:false,
      passwordErr: '',
      onUpdateRecord:false,
      roles:[],
      actiondate:[],
      changegraphdata:0,
      textdata:'',
      actioncnt:1,
      actions:[],
      width: 0, 
      height: 0,
      open:false
    };
    this.print = this.print.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
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
 addtextarea= e =>{
   this.setState({actioncnt: this.state.actioncnt+1});
 }
 removetextarea= e =>{
   if(this.state.actioncnt>1)
  this.setState({actioncnt: this.state.actioncnt-1});
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
   

    return err;
  }

  onSubmit = async e => {
    e.preventDefault();
    let  text=this.state.textdata;
    let  actions=this.state.actions;
    let  actiondate=this.state.actiondate;
    if(this.props?.questionaireRespondentNotes){
      const questionnaireRespondentNote = this.props?.questionaireRespondentNotes
      if(questionnaireRespondentNote.status === 1){
        text = this.state.textdata?this.state.textdata:questionnaireRespondentNote?.data?.data?.notes?.text
        actions= this.state.actions.length>0?this.state.actions: questionnaireRespondentNote?.data?.data?.action
        actiondate= this.state.actiondate.length>0?this.state.actiondate:  questionnaireRespondentNote?.data?.data?.actiondate
      }
      
      
    }

    const {  type, } = this.props.match.params
 

    const isValid = this.loginValidate();
    if (!isValid) {
      let userdatas={questionaire_user_respondent_id:type , text:text ,actions:actions,actiondate:actiondate}
      this.props.getQuestionaireRespondentNotes(userdatas);
      this.setState({ onUpdateRecord:true})
    }

  }


   getPDF = async e => {
    e.preventDefault();
    
      await this.setState({downloadComponent:true });


      setTimeout( async() => {

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

    await this.setState({downloadComponent:false });
    }, 3000);
      

    
       

   	};
     
  componentDidUpdate(prevProps , prevState){
    
    let id=  this.props.match.params.type
    if(prevState.id !== id)
    {
      let userid=  this.props.match.params.userid

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
      if(user !=undefined)
      {
        const userdetaildata ={
          userid:userid,
          loginuser_id:user?.user_id
        }
        this.props.fetchYoungPeopleById( userdetaildata );
      }
     
      this.props.getSurveyReportsListDropdown(questnaireData);
      this.props.getfirstsurveyname(getfirstsurveyname);
 
      this.setState({id:id});
    }
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);

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

    const {  type,userid , id } = this.props.match.params
    const progress = document.querySelector('.progress-done');
    if (progress) {
      progress.style.width = progress.getAttribute('data-done') + '%';
      progress.style.opacity = 1;
    }
   
    let userdatas={questionaire_user_respondent_id:type , text:this.state.textdata}
    this.props.getQuestionaireRespondentNotes(userdatas);
    this.props.getSurveyResponsesForYoungPeople(id,type,userid);
    

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

    if(user !=undefined)
    {
      const userdetaildata ={
        userid:userid,
        loginuser_id:user?.user_id
      }
      this.props.fetchYoungPeopleById( userdetaildata );
    }
  
   
    this.props.getSurveyReportsListDropdown(questnaireData);
    


  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
 
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
   //Get centers select Box
    optionsdata = (getReportsList, roles) => {
      let optionsArray = []
      for(let report of getReportsList){
        const completedDate = Moment(report?.completed_ts).format('DD/MM/YYYY')
        optionsArray.push({ value:` ${report.questionaire_user_respondent_id}-${report.questionaire_id}`, label: `${report.name} - ${completedDate}` })
      }
      
      return (
        <>
          <Select
            className="main-dropdown"
            isMulti
            value={roles}
            onChange={this.handleChange}
            id="roles" 
            options={optionsArray}
          />
        </>
      )

      
    }
    
   

  getRolesDropdownMenu = roles => {
    let id=  this.props.match.params.type
    
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
   handleInputChange = (index, event) => {
    
    const values = this.state.actions  ;
    const datedata = this.state.actiondate  ;
     if (event.target.id === `${index}actions`) {
      values[index] = event.target.value;
      const title = document.getElementById(`${index}actiondate`).value
       datedata[index] = title;
   }
   
   else {
      datedata[index] = event.target.value;
   }
  

    this.setState({
     actions:values});
     this.setState({
      actiondate:datedata});
   
  }
  render() {

   
    const { roles } = this.state;
    let token = localStorage.getItem('token')
    if (!token) return <Redirect to='/' />
 
  let user=this.props?.uservalueloginheaderdata?.user
    const { id, type ,userid} = this.props.match.params
    
    let questionnaireNote = '';
    let actions = [];
    let arcnt =this.state.actioncnt;
    let actiondate =[];
    if(this.props?.questionaireRespondentNotes){
      const questionnaireRespondentNote = this.props?.questionaireRespondentNotes
      if(questionnaireRespondentNote.status === 1){
        questionnaireNote = questionnaireRespondentNote?.data?.data?.notes?.text
        actions= questionnaireRespondentNote?.data?.data?.actions
        actiondate=  questionnaireRespondentNote?.data?.data?.actiondate
        if(actions?.length>0){
         
          if(actions?.length > actiondate?.length )
          {
            arcnt=actions.length;
          }
          else{
            arcnt=actiondate.length;
           
          }
        }
       
     
 

   if( this.state?.onUpdateRecord===true){
          swal("updated successfully ", {
            icon: "success",
          })
          this.setState({onUpdateRecord:false})
        }
      }
      
      
    }


   

    if(user !=undefined  && this.state.afterloginhit==1){ 
     
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
    
     this.props.getSurveyReportsListDropdown(questnaireData);
     
     this.setState({afterloginhit:2})
    }
 
 


    let elements=[];
    if(this.state.actioncnt>arcnt)
    {
     arcnt=this.state.actioncnt
    }
     for(let i=0;i<arcnt;i++)
     {
       const complDate = Moment(this.state?.actiondate[i]?this.state?.actiondate[i]:
         actiondate[i]).format('YYYY-MM-DD')
     
         elements.push( <React.Fragment>
  
 <div class="row notes-wrap">
   <div class="col-md-8">
     <textarea value={this.state?.actions[i]?this.state?.actions[i]:actions[i]} id={`${i}actions`} className="textdata" onChange={event => this.handleInputChange(i, event)} /> 
   </div>
   <div class="col-md-4">
   <input type="date" value={complDate?complDate:actiondate[i]} id={`${i}actiondate`} className="form-control" onChange={event => this.handleInputChange(i, event)} />
   </div>
 </div>
 
         </React.Fragment>  );
     }
 












let  mainreports=[];
if(id){
  mainreports=id.split('-')
}
  
  
    
    return (

      <React.Fragment>

        <IndexComponentStyled>

        { !token?  <Redirect to='/' /> :''}
        
        <main id="main">
          <div id="wrapper">
           <Header />
            {/* Sidebar */}
           <Leftbar />
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
                         
                              <div className="right-links text-right">
                                <button className="btn btn-outline-primary" 
                            
                               onClick={() => window.print()}
                            
                                >Print/Download</button>
                          
                              </div>
                            </div>
                        </div>
                      
                        <div className="links-container">
                          <div className="row">
                            <div className="col-lg-6 col-md-6">
                              <div className="left-links">
                                <a className="btn btn-outline-primary active">Reports</a>
                                <Link to={`/survey-response/${mainreports[1]?mainreports[1]:id}/${type}/${userid}`}  className="btn btn-outline-primary">Survey Responses</Link>
                              </div>
                            </div>
                            {
                              
                              mainreports[0]==='1111654312' ? 
                              <React.Fragment>
                                <div class="col-lg-6 col-md-6 d-flex justify-content-md-end">
                                  { this.props.questnaire && Object.keys(this.props.questnaire).length !== 0 ? this.optionsdata(this.props.questnaire, roles) : '' }
                                </div>
                              </React.Fragment>
                              : ''
                            }
                            
                          
                          </div>
                        </div>
                        <ul className="reading-report-links">	
                        <li><a ><span className="green-circle" /> Strongly Agree </a></li>
                        <li><a ><span className="light-green-circle" /> Agree </a></li>
                        <li><a ><span className="yellow-circle" /> Neither Agree or Disagree</a></li>
                        <li><a ><span className="orange-circle" /> Disagree</a></li>
                          <li><a ><span className="red-circle" /> Strongly Disagree</a></li>
                       </ul>
                      
                      
                      
                   






                      
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

                        

                         

                        

                        


                       @media print {
                          .white-curve-box {
                            margin-left: auto !important;
                            margin-right: auto !important;
                            height: 640px !important; 
                            min-height: 580px !important;
                          }

                          .custom-radar svg g.apexcharts-inner {
                            transform: translate(0, 30px) !important;
                          }

                          .white-curve-box svg {
                            margin: 0 0 0 -150px !important;
                          }

                          .mixed-chart {
                            margin-left: auto !important;
                            margin-right: auto !important;
                          }
                        

                      

                       

                         .custom-radar .apexcharts-canvas {
                            height: 600px !important;
                         }

                        .custom-radar .apexcharts-canvas svg {
                          height: 600px !important;
                         }
                        
                            .apexcharts-legend {
                              margin: 0 160px 0 0;
                              position: relative;
                            }
                            .apexcharts-legend-marker {
                              float: left;
                              background-color: #000 !important;
                            }
                            .custom-header-content .col-md-6 {
                              width: 50% !important;
                            }
                           


                            .report-graph .custom-radar,
                            .report-graph .right-content {
                              width: 50% !important;
                            }

                           
                           .second-graph svg {
                            position: relative;
                            left: -90px;
                           }

                         

                            .logo-small,
                            .right-links {
                              display: none;
                            }
                            .left-logo,
                            .right-logo {
                              margin: 50px 0;
                              display: block !important;
                            }
                             .right-logo {
                               width: 100%;
                               text-align: right;
                             }
                            .right-content {
                              display: block !important;
                            }
                            .apexcharts-grid,line{
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

                           
                          }
                           
                        
                        

                            }}`
                            }
                        </style>
                        

                      {
                        this.state.width < 2500   ?
                       <style>
                          {`

                        @media print {
                                .white-curve-box svg {
                                  margin: 0 0 0 -190px !important;
                                }

                              
                                .second-graph .white-curve-box svg {
                                  margin: 0 0 0 -8% !important;
                                }

                                
                              }

                            `
                           }
                          </style>
                       :''}

                         {
                        this.state.width < 1800  ?
                       <style>
                          {`
                         @media print {
                         .white-curve-box svg {
                          margin: 0 0 0 -170px !important;
                         }
                         .second-graph .white-curve-box svg {
                          margin: 0 0 0 50% !important;
                          transform: translateX(-50%);
                        }
                         
                        }
                            `
                           }
                          </style>
                       :''}

                        {
                        this.state.width < 1650  ?
                       <style>
                          {`
                         @media print {
                         .white-curve-box svg {
                          margin: 0 0 0 -130px !important;
                         
                         }
                        }
                            `
                           }
                          </style>
                       :''}

                          {
                        this.state.width < 1360  ?
                       <style>
                          {`
                         @media print {
                          .white-curve-box {
                            height: 690px !important; 
                            margin: 0 0 20px !important;
                          }
                        }
                            `
                           }
                          </style>
                       :''}



                      {
                        this.state.width < 1100  ?
                       <style>
                          {`
                         @media print {
                          

                         .custom-radar .apexcharts-canvas svg {
                           height: 480px !important;
                          }
                         

                          .second-graph .white-curve-box svg {
                            transform: translateX(-20%);
                          }

                          }
                            `
                           }
                          </style>
                       :''}

                      
                   
                      {
                        this.state.width < 800  ?
                       <style>
                          {`
                         @media print {
                          .second-graph .col-lg-12,
                          .custom-radar {
                           flex: 0 0 100% !important;
                           max-width: 100% !important;
                           }
                           .custom-radar .apexcharts-canvas {
                            height: 380px !important;
                           }
                         
                          .custom-radar .apexcharts-canvas svg {
                            height: 380px !important;
                           }
                          .white-curve-box {
                            min-height: 380px;
                            height: 380px !important; 
                            margin: 0 0 10px !important;
                           }
                           
                          
                           .second-graph .apexcharts-canvas {
                           height: auto !important;
                           }
                           .second-graph .apexcharts-canvas svg {
                           height: auto !important;
                            }
                         
                           .second-graph .white-curve-box {
                           height: auto !important; 
                            }
                            .custom-radar:nth-child(2) {
                              margin: 0 0 20px !important;
                             }
                           .custom-radar:nth-child(4) {
                            margin: 0 0 250px !important;
                           }
                         
                           .custom-radar:nth-child(6) {
                           margin: 0 0 250px !important;
                           }
                         }
                            `
                           }
                          </style>
                       :''}
































                        
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
                      
                      
                      <React.Fragment>
                    
                      <form className="notes-content " onSubmit={this.onSubmit}>
                        <label>
                        Notes:
                        </label>
                        <textarea value={this.state.textdata?this.state.textdata:questionnaireNote} id="textdata" className="textdata" onChange={this.onChange} />
           
            {actions?.length<=0 && this.props?.questionaireRespondentNotes?.data?.data?.notesExist ==false?<React.Fragment>
              <br /> 
                       <div onClick={this.addtextarea}  className="btn btn-info dontshow ">Add more</div>        <div className="btn btn-info dontshow" onClick={this.removetextarea} >Remove</div>  <br /> 


            </React.Fragment>:''}
                

                        <label>
                        Actions:
                        </label>
                        {elements}
                      
                        <center><span style={{ color: 'red' }}><h4>{this.state.formErr}</h4></span></center>
                        {actions?.length<=0 && this.props?.questionaireRespondentNotes?.data?.data?.notesExist ==false ?<React.Fragment>

                          <button type="submit" value="Submit" className="btn btn-primary pull-right green-btn mb-5 dontshow">Save</button>
                        </React.Fragment>:''}
                      
                      </form>
                        
                        </React.Fragment>
                       
                      
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
         

          {/* /#page-content-wrapper */}
          {/* /#wrapper */}
        </main>{/* End #main */}
        {/* ======= Footer ======= */}
        <footer id="footer">
        </footer>{/* End Footer */}
        </IndexComponentStyled>
      {this.state.downloadComponent === true? <div id="divToPrint"> <Download        
      id = {this.props.match.params.id} 
      type = {this.props.match.params.type}
      userid = {this.props.match.params.userid} />  </div>
      :''}
      
  
    </React.Fragment >
    );
  }
}

const mapStateToProps = (state) => {
 
  return {
    uservalueloginheaderdata:state.uservalueloginheaderdata,
    youngpeoplenam: state.search.list,
    firstsurveyName: state.firstsurveyName.data,
    uservalue: state.uservalue,
    usererror: state.usererror,
    email: state.updateUserRecord,
    questnaire: state.questnaire.list,
    surveyResponses: state.getSurveyResponseForYoungPeople,
    questionaireRespondentNotes: state.getQuestionaireRespondentNotes
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
    getSurveyReportsListDropdown:(requestdata)=>{
      dispatch(getSurveyReportsListDropdown(requestdata))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);









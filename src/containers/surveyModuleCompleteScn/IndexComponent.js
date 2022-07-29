import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Fade from 'react-reveal/Fade';
import swal from 'sweetalert';
import $ from 'jquery';

import IndexComponentStyled from './IndexComponentStyled';
import Header from '../../components/survey/header'
import { getModuleListWithCount , onsubmitAll} from '../../actions/myaction'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/style.css';

function importAll(r) {
	let images = {};
	r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
	return images;
  }
 function   NoData(){
	return(<div style={{textAlign:'center'}}>No data</div>)
}
  const images = importAll(require.context('../../assets/img/', false, /\.(png|jpe?g|svg)$/));
class ModuleCompletedScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selectOptionValue: '',
      userId: '',
      clickedsubmit:false,
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
    
    const progress = document.querySelector('.progress-done');
    if(progress){
      progress.style.width = progress.getAttribute('data-done') + '%';
      progress.style.opacity = 1;
    }

    $(".list-border tr").after('<tr class="tr-spacer"/>');
    
    //getting params value 
    const { id, questionaireUserRespondentId } = this.props.match.params

    //set state userId and questionnaireId coming in the url
    this.setState({ userId: id });
    const requestData = {
      questionnaireUserRespondentId: questionaireUserRespondentId
    }
    this.props.getModuleList(requestData)
  }

  //Function to check previous module is completed or not
  startResumeEvt= async( moduleid ,modules,submiturl ) => {
    const { list } = modules
    let checkIsBeforeModule = null
    for(var i = 0; i < list.length; i++) {
      if(list[i].moduleId === moduleid) {
        checkIsBeforeModule =  i;
      }
    }
    return list.map(module => {
      if(module.moduleId==moduleid){
        let previousCompletedQuestion = 0
        let previousModule = undefined
        if(checkIsBeforeModule !== 0){
          previousModule = modules.list[checkIsBeforeModule - 1]
          previousCompletedQuestion = previousModule.completedQuestion
        }
        this.loadsurvey(submiturl+'/'+moduleid);
    

      }
    })
  }
  //change state on changeOption
  onChangeOption = async e => {
    await this.setState({ [e.target.name]: e.target.value })
  }
  onsubmitAll = async e => {
    const { questionnaireId, questionaireUserRespondentId } = this.props.match.params
    const requestData = {
   
        questionnaireId: questionnaireId,
        questionaire_user_respondent_id: questionaireUserRespondentId
    }
   await this.props.onsubmitAll(requestData)
  
    await this.setState({clickedsubmit:true})

  }
  
  //Load Options
  setOptionsFunction = () => {
    const emojisArray = [
      'strongly-agree-icon.png',
      'agree-icon.png',
      'neither-disaggre-or-agree-icon.png',
      'disagree-icon.png',
      'strongly-disagree-icon.png'
    ]

    const options = [
      'Strongly Agree',
      'Agree',
      'Neither Agree or Disagree',
      'Disagree',
      'Strongly Disagree'
    ]

    const idForActiveRadioButton  = [ 'a', 'b', 'c', 'd', 'e'];
    return options.map((option, index) => {
      return (
        <>
          <li onChange={this.onChangeValue}>
            <input type="radio" id={ idForActiveRadioButton[index] } name="selectOptionValue" value={option} onChange={this.onChangeOption} />
            <label for={ idForActiveRadioButton[index] } ><img src={images[emojisArray[index]]}  /> {option}</label>
          </li>
          
        
          
        </>
      )
    })                  
  }

  loadsurvey(survey){
    window.location.href = survey;
  }

  /**method to determine the value for progress bar */
  calculateProgressValue = (leftValue = 0, rightValue = 0) => {
    let res = 0;
    const output = ((leftValue / rightValue) * 100);
    if(output != 'undefined')
    res = output;  

    return (
      <>
        <div className="progress-done" data-done={ res } style={{ width: `${ res }%`, opacity: 1 }}></div>
        <span className="count">{ leftValue }/{ rightValue } </span>
      </>
    )
  }

  //set modules with status
  setModuleListInfo = (modules,submiturl)  => {
    return modules.map((module, index) => {
      let nextSegment = ''
      if(module.completedQuestion === 5){
        nextSegment = <img src={images['tick-circle.png']} style={{ maxWidth: '54px' }}/>
      }else if(module.completedQuestion === 0){
        nextSegment = <a className="btn btn-primary" onClick={()=>this.startResumeEvt(module.moduleId  , this.props.moduleListResponse,submiturl )}>Start</a>
      }else if(module.completedQuestion > 0 && module.completedQuestion < 5){
        nextSegment = <>
                        <div className="progress">
                          { this.calculateProgressValue( module.completedQuestion, 5)}
                        </div>
                        <a className="btn btn-primary" onClick={()=>this.startResumeEvt(module.moduleId , this.props.moduleListResponse,submiturl )}>Resume</a>
                      </>
      }
      return (
        <div className="col-lg-6 col-md-6" key={ module.id} >
          <div className="curve-box">
            <h2>{module.moduleText}</h2>
            { nextSegment }
          </div>
        </div>
      )
    })
    
  }

  render() {
    let token = localStorage.getItem('token')
    const { id, questionnaireId, questionaireUserRespondentId, type } = this.props.match.params
    if (!token && type!=25 ) return <Redirect to='/' />
    if (this.props?.authorized === 1) {
      localStorage.clear();
      return <Redirect to='/' />
    } 

   let user=this.props?.uservalueloginheaderdata?.user
    const url = window.location.origin;
    
    let moduleList = ''
    let newModuleList = ''
    let firstTwoModuleList = ''
    let lastTwoModuleList = ''

    if(this.props?.submitallsurveypro?.surveycomplete==false)
    {
     
      swal("Please complete all questions before submit", {
        icon: "error",
      })
      

    }

    if(this.props?.submitallsurveypro?.surveycomplete==true)
    {
      
      return   <Redirect
      to={{

      pathname: `/survey/hideFrom/${this.state.userId}/${questionaireUserRespondentId}`,
      
    }}
  />
      

    }
    //Get all module list of an survey
    if(this.props?.moduleListResponse ){
      const moduleResponse = this.props?.moduleListResponse;
      if(moduleResponse.status === 1){
        moduleList = moduleResponse.list;
        newModuleList = [...moduleList]
        lastTwoModuleList = newModuleList.splice(2,2) //remove 2 element from index 2
        newModuleList = [...moduleList]
        firstTwoModuleList = newModuleList.splice(0,2) //remove 2 element from index 0
      }else if(moduleResponse.status === 0){

        swal(this.props?.message, {
          icon: "error",
        })
      }
    }

    return (

      <React.Fragment>

        <IndexComponentStyled>
       
        { !token?  <Redirect to='/' /> :''}
           <Header userId={ this.state.userId } />
           
            {/* Page Content */}
            <Fade bottom>
      
            <main id="main">
              {/* <!-- ======= Login Screen ======= --> */}
              <section id="login">
                <div className="container" data-aos="fade-up">
                  <div className="row align-items-center">
                    { moduleList.length > 0 ? this.setModuleListInfo(firstTwoModuleList,`${url}/survey/${ id }/${ questionnaireId }/${ questionaireUserRespondentId }/${ type }`) : ''}
              
                  </div>
                  <div className="row align-items-center">
                    { moduleList.length > 0 ? this.setModuleListInfo(lastTwoModuleList ,`${url}/survey/${ id }/${ questionnaireId }/${ questionaireUserRespondentId }/${ type }`) : ''}
                 
                  </div>
                </div>
              </section>
              {/* <!-- End Counts Section --> */}
            </main>
            {/* <!-- End #main --> */}

            {/* <!-- ======= Footer ======= --> */}
            <footer id="footer">
              <div className="container">
                <div className="row align-items-center footer-content">
                    <div className="col-lg-3 col-md-3">
                       <a className="btn btn-primary" onClick={()=>{this.loadsurvey(`${url}/survey/info/click/${ id }/${ questionnaireId }/${ questionaireUserRespondentId }/${ type }`)}}>Back</a> 
                    </div>
                    <div className="col-lg-6 col-md-6 text-center">
                      <p>Once you have completed all the sections</p>
                    </div>
                    <div className="col-lg-3 col-md-3" >	
                      <a className="btn btn-primary green-bg" disabled={true} onClick={()=>{this.onsubmitAll()}} >Submit</a> 
                    </div> 
                </div>
              </div>
            
            </footer>
           
     
            </Fade>
        
    
       
        </IndexComponentStyled>


      </React.Fragment>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    authorized: state.userAuthenticate,
    moduleListResponse: state.moduleListResponse,
    uservalueloginheaderdata:state.uservalueloginheaderdata,
    submitallsurveypro:state.submitallsurvey,
  }


}

const mapDispatchToProps = (dispatch) => {
  return {
    
    getModuleList: (requestData) => {
      dispatch(getModuleListWithCount(requestData))
    },
    onsubmitAll: (requestData) => {
      dispatch(onsubmitAll(requestData))
    },
    
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ModuleCompletedScreen);






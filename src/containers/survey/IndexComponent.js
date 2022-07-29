import React from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import ProgressBar from 'react-bootstrap/ProgressBar'
import IndexComponentStyled from './IndexComponentStyled';
import Header from '../../components/survey/header'
import {  getSurveyQuestionniare, 
          getSurveyQuestionOptions, 
          getAnswerIdOnPrevClick, 
          insertSurveyQuestionResponse, 
          unmountSurveyResponse, 
          emptyQuestionRespondObject, 
          emptyPrevAnswerObject ,
          getrespondentinformationstatus} from '../../actions/myaction'
import { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/style.css';
import Fade from 'react-reveal/Fade';
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
class Profile extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      disabledNext: false,
      disabledPrev: false,
      selectOptionValue: '',
      questionErr: '',
      userId: '',
      changeIndexStateValue: false,
      useAnswerIdWhenPrevClick: false,
      questionnaireId: '',
      isSurveyType: '',
      questionaireUserRespondentId: '',
      lastIndexValue: false,
      answerGiven: null,
      totalQuestion: null,
      isUpdateProgressBar: false,
      isSetPropertyQuestion: false,
      isUpdateSelectOptionValue: false,
    }
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
    
 
  
    $(".list-border tr").after('<tr class="tr-spacer"/>');
    
    //getting params value 
    const { id, questionnaireId, type, questionaireUserRespondentId ,module_id} = this.props.match.params

    //set state userId and questionnaireId coming in the url
    this.setState({ userId: id, questionnaireId: questionnaireId, isSurveyType: JSON.parse(type), questionaireUserRespondentId: questionaireUserRespondentId, isSetPropertyQuestion: true  });
    
    //send params value to api
    const surveyParamsData = {
      questionnaireId: questionnaireId, 
      module_id:module_id,
      questionaireUserRespondentId: questionaireUserRespondentId
    }
    // call api 
    this.props.getQuestionniare( surveyParamsData );
    this.props.getOptions();
    const data={questionnaireUserRespondentId:id};
    await this.props.getrespondentinformationstatus(data);
    
  }
  
  componentDidUpdate(prevProps, prevState) {
    // Typical usage (don't forget to compare props):
    //Change index value when clicked on prev button if any respond error reset index value
    if(prevState.changeIndexStateValue === true){
      if (prevState.changeIndexStateValue === this.props?.insertSurveyQuestionRes.ownChangeIndex) {
        let index = prevState.index - 1;
        let disabledPrev = (index === -1);
        this.setState({ index: index, disabledPrev: disabledPrev, disabledNext: false, changeIndexStateValue: false })
        
      }
    }

    //run on every answer will store then increase the answer value in state.
    if(prevState.isUpdateProgressBar === true){
      if (prevState.isUpdateProgressBar === this.props?.insertSurveyQuestionRes.isUpdateProgressBar) {
        const { data }= this.props?.insertSurveyQuestionRes
        if(data?.isRecordInsertOrUpdate === 1){
          const answerGiven = prevState.answerGiven + 1
          this.setState({ answerGiven: answerGiven });
        }
        this.setState({ isUpdateProgressBar: false });
        this.props.emptyQuestionRespondObject();
      }
    }

    //Componentdidmount run to set the total question and answer given value.
    if(prevState.isSetPropertyQuestion === true){
      if (prevState.isSetPropertyQuestion === this.props?.surveyQuestionnaireResponse.isSetPropertyQuestion) {
        const { attemptedQuestionsCount, totalQuestionsCount } = this.props?.surveyQuestionnaireResponse?.list
        this.setState({ isSetPropertyQuestion: false, answerGiven: attemptedQuestionsCount, totalQuestion:totalQuestionsCount  });
        
      }
    }

    //ComponenDidUpdate run to set the selectedOptionValue.
    if(prevState.isUpdateSelectOptionValue === true){
      if (prevState.isUpdateSelectOptionValue === this.props?.prevAnswerResponse.isUpdateSelectOptionValue) {
        if(this.props.prevAnswerResponse.status === 0 || this.props.prevAnswerResponse.status === 2){
          this.setState({ selectOptionValue: '' });
        }else{
          const { answerObject } = this.props?.prevAnswerResponse
          const { answer_id } = answerObject
          this.setState({ selectOptionValue: `${answer_id}` });
        }
        this.setState({ isUpdateSelectOptionValue: false });
        this.props.emptyPrevAnswerObject();
      }
    }
  }

  componentWillUnmount(){
    this.props.unmountSurveyResponse();
  }

  //Validate the inputs 
  questionValidate() {
    let err = false;
    if (this.state.selectOptionValue === '') {
      this.setState({ questionErr: 'Please choose one of the options before moving to the next question' });
      err = true;
    }

    return err;
  }

  //Get previous question of survey
  async togglePrev(e) {
    let index = ''
    index = this.state.index - 1;
    let disabledPrev = (index === -1);
    if(disabledPrev === false){
      const storeResponseObject = this.props?.surveyQuestionnaireResponse.list?.questions[index];
      storeResponseObject.user_respondent_id = this.state.userId
      storeResponseObject.questionaire_user_respondent_id = this.state.questionaireUserRespondentId
      await this.props.onPrevClick(storeResponseObject)
    }else{
      index = 0
    }
    await this.setState({ index: index, disabledPrev: disabledPrev, disabledNext: false, isUpdateSelectOptionValue: true })
  }

  //Get next question of survey and insert response
  async toggleNext(e) {
    const currentIndex = this.state.index;
    let lastIndexValue = false
    const isValid = this.questionValidate();
    if(this.props?.surveyQuestionnaireResponse?.list?.questions?.length > 0 && !isValid ){
      const optionsResponse = this.props?.surveyOptionsResponse.list;
      let optionValueText = ''
      await optionsResponse.map(option =>{
        if(`${option.id}` === this.state.selectOptionValue){
          optionValueText = option.answer_value
        }
      })
      const storeResponseObject = this.props?.surveyQuestionnaireResponse.list.questions[currentIndex];
      storeResponseObject.answer_id = this.state.selectOptionValue
      storeResponseObject.user_respondent_id = this.state.userId
      storeResponseObject.answer_value = optionValueText
      storeResponseObject.questionaire_user_respondent_id = this.state.questionaireUserRespondentId
      if(this.state.isSurveyType === 1){
        storeResponseObject.first_question = true
      }
      const getLastElement = this.props?.surveyQuestionnaireResponse.list.questions[this.props?.surveyQuestionnaireResponse.list.questions.length - 1]; // Getting last element
      if(getLastElement.id === storeResponseObject.id){
        storeResponseObject.last_question = true
      }
      else{
        const getNextAnswerObject = this.props?.surveyQuestionnaireResponse.list?.questions[this.state.index + 1];
        getNextAnswerObject.user_respondent_id = this.state.userId
        getNextAnswerObject.questionaire_user_respondent_id = this.state.questionaireUserRespondentId
        await this.props.onPrevClick(getNextAnswerObject)
      }
      
      await this.props.insertQuestion(storeResponseObject);

      //call the next question
      let index = ''
      index = this.state.index + 1;
      let disabledNext = await index === (this.props?.surveyQuestionnaireResponse.list.questions.length - 1);
      if(getLastElement.id === storeResponseObject.id){
        index = this.state.index
        lastIndexValue = true
      }
      
      await this.setState({ index: index, disabledNext: disabledNext, disabledPrev: false, lastIndexValue: lastIndexValue,selectOptionValue: '', questionErr: '', changeIndexStateValue: true, isSurveyType: '', isUpdateProgressBar: true })
      if(getLastElement.id !== storeResponseObject.id){
        await this.setState({ selectOptionValue: '' , isUpdateSelectOptionValue: true})
      }
      
    }
    
  }

  //change state on changeOption
  onChangeOption = async e => {
    await this.setState({ [e.target.name]: e.target.value })
  }

  //Load Options
  setOptionsFunction = (options) => {
    const emojisArray = [
      'strongly-agree-icon.png',
      'agree-icon.png',
      'neither-disaggre-or-agree-icon.png',
      'disagree-icon.png',
      'strongly-disagree-icon.png'
    ]

    const idForActiveRadioButton  = [ 'a', 'b', 'c', 'd', 'e'];
    return options.map((option, index) => {
      return (
        <>
          <li onChange={this.onChangeValue}>
            <input type="radio" id={ idForActiveRadioButton[index] } name="selectOptionValue" checked={this.state.selectOptionValue === `${ option.id }`} value={option.id} onChange={this.onChangeOption} />
            <label for={ idForActiveRadioButton[index] } ><img src={images[emojisArray[index]]}  /> {option.answer_text}</label>
          </li>

        </>
      )
    })                  
  }

  //Load next survey screen
  loadsurvey(survey){
    window.location.href = survey;
  }

  //Update seleectedoptionvalue on prev button click
  updateSelectedOptionValue = optionValue => {
    this.state.selectOptionValue = `${optionValue}`
  }

 
  onButtonText = (id, surveyQuestionnaireResponse) => { 
    if(!surveyQuestionnaireResponse || id === null){
      return 'Next'
    }else{ 
      const getLastElement = surveyQuestionnaireResponse[surveyQuestionnaireResponse.length - 1]; // Getting last element
      if(getLastElement.id === id){
        return 'Submit'
      }
      else{
        return 'Next'
      }
      
    }
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

  setProgressBarStateComingInList = (attemptedQuestionsCount, totalQuestionsCount) => {
    this.state.answerGiven = attemptedQuestionsCount
    this.state.totalQuestion = totalQuestionsCount
  }

  isModuleChange = questionnaire => {
    const { id, questionnaireId, questionaireUserRespondentId, type } = this.props.match.params
    const url = window.location.origin;
    const indexLastValue = this.state.index -1
    if(indexLastValue === -1){
      return null
    }
    else{
      const lastQuestionnaire = this.props?.surveyQuestionnaireResponse.list.questions[indexLastValue];
      if(lastQuestionnaire.module_id !== questionnaire.module_id){
        return (
          <>
          
          {this.loadsurvey(`${url}/survey/module/${ id }/${ questionnaireId }/${ questionaireUserRespondentId }/${ type }`)}
            You are moving towards <b>{ questionnaire.moduleName }</b> module!
          </>
        )
      }
    }
  }

  render() {
    const { id, questionnaireId, questionaireUserRespondentId, type } = this.props.match.params
    let token = localStorage.getItem('token')
    if (!token && type!=25 ) return <Redirect to='/' />
    if (this.props?.authorized === 1) {
      localStorage.clear();
      return <Redirect to='/' />
    } 
  
   let user=this.props?.uservalueloginheaderdata?.user

    const url = window.location.origin;

    

    let questionnaire = '';
    let surveyOptions = '';

    //Get all questions list of an survey
    if(this.props?.surveyQuestionnaireResponse ){
      const surveyResponse = this.props?.surveyQuestionnaireResponse;
      if(surveyResponse.status === 1){
        questionnaire = surveyResponse?.list?.questions[this.state.index];
      }else if(surveyResponse.status === 0){

        swal(this.props?.message, {
          icon: "error",
        })
      }
    }

    //Get all options value
    if(this.props?.surveyOptionsResponse ){
      const optionsResponse = this.props?.surveyOptionsResponse;
      if(optionsResponse.status === 1){
        surveyOptions = optionsResponse.list;
      }else if(optionsResponse.status === 0){
        swal(this.props?.message, {
          icon: "error",
        })
      }
    }

    //Get answer id from the api and update state
    if(this.props?.prevAnswerResponse  && this.state.isUpdateSelectOptionValue === true  ){
      const surveyResponse = this.props?.prevAnswerResponse;
      if(surveyResponse && Object.keys(surveyResponse).length > 0 && surveyResponse.constructor === Object){
        if(surveyResponse.status === 0){
          swal(this.props?.message, {
            icon: "error",
          })
        }
      }
      
    }

    //check survey response is stored or not
    if(this.props?.insertSurveyQuestionRes){
      const surveyResponse = this.props?.insertSurveyQuestionRes;
      if(surveyResponse.status === 0){
        swal(surveyResponse.message, {
          icon: "error",
        })
      }
      else if(surveyResponse.status === 1){
        const getLastElement = this.props?.surveyQuestionnaireResponse?.list?.questions[this.props?.surveyQuestionnaireResponse.list.questions.length - 1]; // Getting last element
         if(this.state.lastIndexValue === true){
          if(  this.props?.surveyQuestionnaireResponse?.list?.Allcompletd === 1 || this.state.clickedsubmit==true){
        
          return   <Redirect
            to={{
             pathname: `/survey/hideFrom/${this.state.userId}/${this.state.questionaireUserRespondentId}`,
           
          }}
        />
        
        }

        else{
        
          return   <Redirect
            to={{
             pathname: `/survey/module/${ id }/${ questionnaireId }/${ questionaireUserRespondentId }/${ type }`,
            
          }}
        />
        
        }
      }
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
          {/* ======= Login Screen ======= */}
          <section id="login">
            <div className="container" data-aos="fade-up">
              <div className="progress-items">
                <h3 className="progress-title">{ (this.state.answerGiven%this.state.totalQuestion)+1}/{ this.state.totalQuestion }<span>  Survey Responses</span></h3>
                <ProgressBar  variant={this.calculateVariant( (this.state.answerGiven%this.state.totalQuestion)+1, this.state.totalQuestion)} 
                            now={this.calculateProgressValue((this.state.answerGiven%this.state.totalQuestion)+1, this.state.totalQuestion)}  
                />
              </div>
              <div className="row align-items-center">
                <div className="col-lg-7 col-md-7">
                  <p>{ questionnaire ? this.isModuleChange(questionnaire) : null }</p>
                  <h1>{ questionnaire ? questionnaire.question_text: null }</h1>
                  <span style={{ color: 'red' }}>{this.state.questionErr}</span>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-7 col-md-7 mt-3">
                  <div className="reaction-div">
                    <ul>
                      { surveyOptions.length > 0 ? this.setOptionsFunction(surveyOptions) : null }
                    </ul>
                  </div>
                  { this.props?.respondentinformationstatus?.status_id == 1 ? 
                  <>
                  <a className="btn btn-primary" onClick={(e)=> this.togglePrev(e)} disabled={this.state.disabledPrev}>Previous</a>
                  <a className="btn btn-primary" onClick={(e)=> this.toggleNext(e)} disabled={this.state.disabledNext}>{ this.onButtonText(questionnaire === undefined ? null : questionnaire.id, this.props?.surveyQuestionnaireResponse?.list?.questions)}</a>
                  </>  
                  :
                    <div className="container" data-aos="fade-up">
                    <div className="row align-items-center">
                      <div className="col-lg-12 col-md-12 center">
        
                       <h1 style={{"margin-top":"16%"}}><center>Sorry ! This young user is diabled.</center></h1>
                      </div>
                    </div>
                    
                  </div>
      
        }
               
                </div>
                <div className="col-lg-5 col-md-5 d-flex align-items-center text-right">
                  <img className="graphic-right" src={ questionnaire?.question_image } />
                </div>
              </div>
            </div>
          </section>{/* End Counts Section */}
        </main>{/* End #main */}
        {/* ======= Footer ======= */}
        <footer id="footer">
        </footer>{/* End Footer */}
     
            </Fade>

        </IndexComponentStyled>


      </React.Fragment>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    authorized: state.userAuthenticate,
    surveyQuestionnaireResponse: state.surveyQuestionnaire,
    surveyOptionsResponse: state.surveyOptions,
    prevAnswerResponse: state.surveyPrevAnswerObject,
    uservalueloginheaderdata:state.uservalueloginheaderdata,
    insertSurveyQuestionRes: state.insertSurveyWithResponse,
    respondentinformationstatus: state.respondentinformationstatus.list
  }


}

const mapDispatchToProps = (dispatch) => {
  return {
    getrespondentinformationstatus: (userId) => {
      dispatch(getrespondentinformationstatus(userId))
    },
    getQuestionniare: (questionnaireId) => {
      dispatch(getSurveyQuestionniare(questionnaireId))
    },
    getOptions: () => {
      dispatch(getSurveyQuestionOptions())
    },
    onPrevClick: (questionObject) => {
      dispatch(getAnswerIdOnPrevClick(questionObject))
    },
    insertQuestion: (questionObject) => {
      dispatch(insertSurveyQuestionResponse(questionObject))
    },
    unmountSurveyResponse: () => { 
      dispatch(unmountSurveyResponse())
    },
    emptyQuestionRespondObject: () => { 
      dispatch(emptyQuestionRespondObject())
    },
    emptyPrevAnswerObject: () => { 
      dispatch(emptyPrevAnswerObject())
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);






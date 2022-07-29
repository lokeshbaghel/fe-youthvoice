import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Fade from 'react-reveal/Fade';
import swal from 'sweetalert';
import $ from 'jquery';

import IndexComponentStyled from './IndexComponentStyled';
import Header from '../../components/survey/header'
import { storeSurveyNoteRequest } from '../../actions/myaction'
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
      userId: '',
      questionaireUserRespondentId: '',
      textAreaValue: '',
      textAreaError: '',
      isSurveyNoteStored: false
    }
  }


  componentDidMount() {
    
    //getting params value 
    const { userId, questionnareUserRespondentId } = this.props.match.params

    //set state userId and questionnaireId coming in the url
    this.setState({ userId: userId, questionaireUserRespondentId: questionnareUserRespondentId });
  }

  componentDidUpdate(prevProps , prevState){
    if(prevState.isSurveyNoteStored){
      if(prevState.isSurveyNoteStored === this.props?.surveyNote?.isSurveyNoteStored){
        if(this.props?.surveyNote.data.istextAreaFilled === 0) {         //means not filled
          const data = this.props?.surveyNote.data
          this.setState({ isSurveyNoteStored: false, textAreaValue: data.textAreaValue, textAreaError: 'Textarea should not empty.'})
        }
      }
    }
  }

  loadsurvey(survey){
    window.location.href = survey;
  }

  handleChange = (event) => {
    this.setState({ textAreaValue: event.target.value });
  }

  async callStoreSurveyNote(e){
    const requestData = {
      questionnaireUserRespondentId: this.state.questionaireUserRespondentId,
      note: this.state.textAreaValue
    }
    await this.props.storeSurveyNote(requestData)
    this.setState({ isSurveyNoteStored: true})
  }

  render() {
    let token = localStorage.getItem('token')
    if (!token) return <Redirect to='/' />
    if (this.props?.authorized === 1) {
      localStorage.clear();
      return <Redirect to='/' />
    } 

    let user=this.props?.uservalueloginheaderdata?.user
    const url = window.location.origin;

    //check survey note is stored or not
    if(this.props?.surveyNote){
      const surveyResponse = this.props?.surveyNote;
      if(surveyResponse.status === 0){
        swal(surveyResponse.message, {
          icon: "error",
        })
      }
      else if(surveyResponse.status === 1){
        
        const storeFilledId = this.props?.surveyNote.data.istextAreaFilled
        if(storeFilledId === 1){
          return <Redirect
            to={{
            pathname: `/young-people-report/${this.state.userId}`,
          }}
        />
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
              {/* <!-- ======= Login Screen ======= --> */}
              <section id="login">
                <div className="container" data-aos="fade-up">
                  <div className="row align-items-center">
                    <div className="col-lg-12 col-md-12 thnkyou-message">
                      
                        <h2>Thank you for completing the survey</h2>
                        <br />
                        <h2>Is there anyone you do not wish to share this survey with?</h2>
                        <textarea
                          value={this.state.textAreaValue}
                          onChange={this.handleChange}
                        />
                        <span style={{ color: 'red' }}>{this.state?.textAreaError}</span>
                     
                    </div>
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
                
                  <div className="col-lg-8 col-md-8 d-flex justify-content-md-end align-items-center flex-column flex-md-row">
                    <a className="btn btn-primary mr-4" onClick={()=>{this.loadsurvey(`${url}/young-people-report/${ this.state.userId }`)}} >Previous</a>
                    <a className="btn btn-primary green-bg" onClick={(e)=> this.callStoreSurveyNote(e)} >Finish</a> 
                  </div>
                </div>
              </div>
            </footer>
            {/* <!-- End Footer --> */}
          </Fade>
        
    
       
        </IndexComponentStyled>


      </React.Fragment>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    authorized: state.userAuthenticate,
    uservalueloginheaderdata:state.uservalueloginheaderdata,
    surveyNote: state.surveyNoteResponse
  }


}

const mapDispatchToProps = (dispatch) => {
  return {
    
    storeSurveyNote: (requestData) => {
      dispatch(storeSurveyNoteRequest(requestData))
    }
    
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ModuleCompletedScreen);






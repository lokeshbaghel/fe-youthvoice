import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import { getrespondentinformationstatus } from '../../actions/myaction';
import $ from 'jquery';

import IndexComponentStyled from './IndexComponentStyled';
import Header from '../../components/survey/header'
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
class Profile extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selectOptionValue: '',
      userId: '',
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
    const { id } = this.props.match.params;
    const data={questionnaireUserRespondentId:id};
    await this.props.getrespondentinformationstatus(data);

    //set state userId and questionnaireId coming in the url
    this.setState({ userId: id });
    
  }

  //change state on changeOption
  onChangeOption = async e => {
    await this.setState({ [e.target.name]: e.target.value })
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

  render() {
    let token = localStorage.getItem('token')
    const { id, questionnaireId, questionaireUserRespondentId, type } = this.props.match.params
    if (!token && type!=25 ) return <Redirect to='/' />
    if (this.props?.authorized === 1) {
      localStorage.clear();
      return <Redirect to='/' />
    } 

    const url = window.location.origin;
 
    
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
          { this.props?.respondentinformationstatus?.status_id == 1 ?
            <div className="container" data-aos="fade-up">
              <div className="row align-items-center">
                <div className="col-lg-7 col-md-7">
                  <h1>HOW DOES THIS WORK?</h1>
                  <p>The numbers will indicate where you are in the survey and how many questions you’ve completed.</p>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-7 col-md-7 mt-5">
                  <div className="pagination-wrap">
                    <span className="page">3/10</span> SURVEY RESPONSES
                   
                  </div>
                </div>
                <div className="col-lg-5 col-md-5 text-right">
                  <img className="graphic-right" src={images['bg-graphic4.png']} />
                </div>
              </div>
              <div class="row">
              <div class="col-lg-12 col-md-12 mt-5">
              <a className="btn btn-primary" onClick={()=>{this.loadsurvey(`${url}/survey/info/option/${ id }/${ questionnaireId }/${ questionaireUserRespondentId }/${ type }`)}} >Back </a>
                  <a className="btn btn-primary" onClick={()=>{this.loadsurvey(`${url}/survey/module/${ id }/${ questionnaireId }/${ questionaireUserRespondentId }/${ type }`)}} >Start </a>
              </div>
            </div>
            </div>
            :

            <div className="container" data-aos="fade-up">
              <div className="row align-items-center">
                <div className="col-lg-12 col-md-12 center">
  
                 <h1 style={{"margin-top":"16%"}}><center>Sorry ! This young user is diabled.</center></h1>
                </div>
              </div>
              
            </div>

  }
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
    respondentinformationstatus: state.respondentinformationstatus.list,
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    getrespondentinformationstatus: (userId) => {
      dispatch(getrespondentinformationstatus(userId))
    },
   
}
}

export default connect(mapStateToProps ,mapDispatchToProps)(Profile);






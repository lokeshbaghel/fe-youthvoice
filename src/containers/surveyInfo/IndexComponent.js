import React from 'react';
import { connect } from 'react-redux';
import IndexComponentStyled from './IndexComponentStyled';
import Header from '../../components/survey/header'
import { getrespondentinformationstatus } from '../../actions/myaction';
import { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/style.css';
import Fade from 'react-reveal/Fade';
import $ from 'jquery';
const intialState = {
  email: '',
  password: '',
  emailErr: '',
  passwordErr: '',

};

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
    this.state = intialState
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
    
    
    const progress = document.querySelector('.progress-done');
    if(progress){
      progress.style.width = progress.getAttribute('data-done') + '%';
      progress.style.opacity = 1;
    }
  
    $(".list-border tr").after('<tr class="tr-spacer"/>');
    const { id} = this.props.match.params
    const data={questionnaireUserRespondentId:id};
    await this.props.getrespondentinformationstatus(data)
    
    
    
  }
  loadsurvey(survey){
    window.location.href = survey;
  }
  
  render() {
    const { id, questionnaireId, questionaireUserRespondentId, type } = this.props.match.params
     let token = localStorage.getItem('token')
    if (!token && type!=25 ) return <Redirect to='/' />
   
    const url = window.location.origin;
  
    return (

      <React.Fragment>

        <IndexComponentStyled>
       
        
           <Header userId={ id } />
           
            {/* Page Content */}
            <Fade bottom>
      
        <main id="main">
          {/* ======= Login Screen ======= */}
          <section id="login">

         { this.props?.respondentinformationstatus?.status_id == 1 ?

            <div className="container" data-aos="fade-up">
              <div className="row align-items-center">
                <div className="col-lg-7 col-md-7">
                  <h1>How does this work?</h1>
                  <p>Use the Next and Back buttons to move forwards and backwards in the <br/>survey.</p>
                  <p>You can always return to a question if you need to, by pressing the back button</p>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-7 col-md-7 mt-5">
              
                <a className="btn btn-primary" onClick={()=>{this.loadsurvey(`${url}/survey/module/${ id }/${ questionnaireId }/${ questionaireUserRespondentId }/${ type }`)}} >SKIP </a>
                
                  <a className="btn btn-primary" onClick={()=>{this.loadsurvey(`${url}/survey/info/screen/${ id }/${ questionnaireId }/${ questionaireUserRespondentId }/${ type }`)}}>Next</a>
                 
              
                </div>
                <div className="col-lg-5 col-md-5 text-right">
                  <img className="graphic-right" src={images['cartoon-graphic.png']} />
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
    uservalue: state.uservalue,
    usererror: state.usererror,
    email: state.updateUserRecord,
    uservalueloginheaderdata:state.uservalueloginheaderdata,
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

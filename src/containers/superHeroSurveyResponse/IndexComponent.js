import React from 'react';
import { connect } from 'react-redux';

import IndexComponentStyled from './IndexComponentStyled';

import Leftbar from '../../components/leftbar'
import Header from '../../components/header'
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
    
    
    
    
  }

  
  render() {
    let token = localStorage.getItem('token')
    if (!token) return <Redirect to='/' />

  let user=this.props?.uservalueloginheaderdata?.user

    return (

      <React.Fragment>

        <IndexComponentStyled>
        { !token?  <Redirect to='/' /> :''}
        <main id="main">
          <div id="wrapper">
           <Header />
            {/* Sidebar */}

            <Leftbar/>

            {/* /#sidebar-wrapper */}
            {/* Page Content */}
            <Fade bottom>
            <div className="page-content-wrapper my-profile" data-aos="fade-up">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <h3 className="content-title">Jeremy Davies - Reports</h3>
                    <div className="btn-group">
                      <button data-toggle="modal" data-target="#addSuperhero" type="button" className="btn btn-primary green-btn">Add Actions</button>
                      <button data-toggle="modal" data-target="#addSuperhero" type="button" className="btn btn-primary green-btn">Add Notes</button>
                      <button data-toggle="modal" data-target="#addSuperhero" type="button" className="btn btn-primary purple-btn">Add Survey</button>
                    </div>	
                    <div className="inline-div">
                      <ul className="links">				
                        <li><a href="#" className="active">Reports</a></li>
                        <li><a href="#">Survey Responses</a></li>
                      </ul>
                      <div className="filter-adsuperhero">
                        <ul>				
                          <li><span>Filter by:</span></li>
                          <li><a href="#">Completed</a></li>
                          <li><a href="#">Centre</a></li>
                          <li><a href="#">Comparison</a></li>
                        </ul>
                      </div>
                      <ul className="small-link">	
                        <li><a href="#">Print</a></li>
                        <li><a href="#">Download</a></li>
                      </ul>
                    </div>	
                  </div>	
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="search-keyword-container">
                      <form>
                        <label>If there is anyone you do not wish your views to be shared with, your key worker will note this here:</label>
                        <input type="text" className="form-control" id placeholder="Joanna Doe" />
                      </form>
                    </div>
                  </div>
                </div>
                <div id="accordion" className="custom-accordion-second">
                  <div className="card">
                    <div className="card-header" id="headingfive">
                      <h5 className="mb-0">
                        <button className="btn btn-link" data-toggle="collapse" data-target="#collapsefive" aria-expanded="true" aria-controls="collapsefive">
                          Keep me safe and care well for me
                        </button>
                      </h5>
                    </div>
                    <div id="collapsefive" className="collapse show" aria-labelledby="headingfive" data-parent="#accordion">
                      <div className="card-body">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt pretium, libero sit commodo pellentesque. Tempus imperdiet in ac sit. Orci curabitur molestie lobortis et nunc integer magna sit. Maecenas amet molestie ornare at nec. Non volutpat nulla ut auctor duis.
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header" id="headingsix">
                      <h5 className="mb-0">
                        <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapsesix" aria-expanded="false" aria-controls="collapsesix">
                          Help me get a good education (achieve and enjoy)
                        </button>
                      </h5>
                    </div>
                    <div id="collapsesix" className="collapse" aria-labelledby="headingsix" data-parent="#accordion">
                      <div className="card-body">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt pretium, libero sit commodo pellentesque. Tempus imperdiet in ac sit. Orci curabitur molestie lobortis et nunc integer magna sit. Maecenas amet molestie ornare at nec. Non volutpat nulla ut auctor duis.
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header" id="headingseven">
                      <h5 className="mb-0">
                        <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseseven" aria-expanded="false" aria-controls="headingseven">
                          Help me be healthy and enjoy life
                        </button>
                      </h5>
                    </div>
                    <div id="collapseseven" className="collapse" aria-labelledby="headingseven" data-parent="#accordion">
                      <div className="card-body">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt pretium, libero sit commodo pellentesque. Tempus imperdiet in ac sit. Orci curabitur molestie lobortis et nunc integer magna sit. Maecenas amet molestie ornare at nec. Non volutpat nulla ut auctor duis.
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header" id="headingeight">
                      <h5 className="mb-0">
                        <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseeight" aria-expanded="false" aria-controls="collapseeight">
                          Support my future and my next adventure
                        </button>
                      </h5>
                    </div>
                    <div id="collapseeight" className="collapse" aria-labelledby="headingeight" data-parent="#accordion">
                      <div className="card-body">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt pretium, libero sit commodo pellentesque. Tempus imperdiet in ac sit. Orci curabitur molestie lobortis et nunc integer magna sit. Maecenas amet molestie ornare at nec. Non volutpat nulla ut auctor duis.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div id="accordion" className="custom-accordion purple-arrow">
                      <h3 className="content-title">Keyworker Notes</h3>
                      <div className="card">
                        <div className="card-header" id="headingOne">
                          <h5 className="mb-0">
                            <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                              Keep me safe and care well for me
                            </button>
                          </h5>
                        </div>
                        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                          <div className="card-body">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt pretium, libero sit commodo pellentesque. Tempus imperdiet in ac sit. Orci curabitur molestie lobortis et nunc integer magna sit. Maecenas amet molestie ornare at nec. Non volutpat nulla ut auctor duis.
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-header" id="headingTwo">
                          <h5 className="mb-0">
                            <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                              Help me get a good education (achieve and enjoy)
                            </button>
                          </h5>
                        </div>
                        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                          <div className="card-body">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt pretium, libero sit commodo pellentesque. Tempus imperdiet in ac sit. Orci curabitur molestie lobortis et nunc integer magna sit. Maecenas amet molestie ornare at nec. Non volutpat nulla ut auctor duis.
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-header" id="headingThree">
                          <h5 className="mb-0">
                            <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                              Help me be healthy and enjoy life
                            </button>
                          </h5>
                        </div>
                        <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                          <div className="card-body">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt pretium, libero sit commodo pellentesque. Tempus imperdiet in ac sit. Orci curabitur molestie lobortis et nunc integer magna sit. Maecenas amet molestie ornare at nec. Non volutpat nulla ut auctor duis.
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-header" id="headingThree">
                          <h5 className="mb-0">
                            <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                              Support my future and my next adventure
                            </button>
                          </h5>
                        </div>
                        <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                          <div className="card-body">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt pretium, libero sit commodo pellentesque. Tempus imperdiet in ac sit. Orci curabitur molestie lobortis et nunc integer magna sit. Maecenas amet molestie ornare at nec. Non volutpat nulla ut auctor duis.
                          </div>
                        </div>
                      </div>
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


      </React.Fragment>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    uservalue: state.uservalue,
    usererror: state.usererror,
    uservalueloginheaderdata:state.uservalueloginheaderdata,
    email: state.updateUserRecord
  }


}


export default connect(mapStateToProps)(Profile);






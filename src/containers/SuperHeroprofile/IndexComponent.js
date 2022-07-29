import React from 'react';
import { connect } from 'react-redux';

import IndexComponentStyled from './IndexComponentStyled';
import Addnewsuperhero from '../../components/superheroprofile/addnewsuperhero'
import Header from '../../components/header'
import Leftbar from '../../components/leftbar'
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
        <div>
        <main id="main">
          <div id="wrapper">
        <Header />
            {/* Sidebar */}
            <Leftbar />
            {/* /#sidebar-wrapper */}
            {/* Page Content */}
            <Fade bottom>
            <div className="page-content-wrapper my-profile" data-aos="fade-up">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="seperate-sec">
                      <h2 href="#" className="profile-title">Superheroes</h2>
                      <div className="filter-adsuperhero">
                        <ul>				
                          <li><span>Filter by:</span></li>
                          <li><a href="#">Name</a></li>
                          <li><a href="#">Age</a></li>
                          <li><a href="#">Next Due</a></li>
                          <li><a href="#">Total Coins</a></li>
                        </ul>
                        <Addnewsuperhero />
                     
                      </div>
                      <div className="panel panel-default table-responsive">
                        <table className="table table-borderless list-border table-fixed">
                          <thead>
                            <tr>
                              <th>Full Name</th>
                              <th>Age</th>
                              <th>Last Survey</th>
                              <th>Next Due</th>
                              <th>Surveys Completed</th>
                              <th />
                              <th>Total Coins</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Jeremy Davies</td>
                              <td>12</td>
                              <td>12.02.2021</td>
                              <td>12.02.2021</td>
                              <td>4</td>
                              <td><span className="green">Start New Survey</span></td>
                              <td>725</td>
                            </tr>
                            <tr>
                              <td>Jeremy Davies</td>
                              <td>12</td>
                              <td>12.02.2021</td>
                              <td>12.02.2021</td>
                              <td>4</td>
                              <td><span className="green">Start New Survey</span></td>
                              <td>725</td>
                            </tr>
                            <tr>
                              <td>Jeremy Davies</td>
                              <td>12</td>
                              <td>12.02.2021</td>
                              <td>12.02.2021</td>
                              <td>4</td>
                              <td><span className="green">Start New Survey</span></td>
                              <td>725</td>
                            </tr>
                            <tr>
                              <td>Jeremy Davies</td>
                              <td>12</td>
                              <td>12.02.2021</td>
                              <td>12.02.2021</td>
                              <td>4</td>
                              <td><span className="green">Start New Survey</span></td>
                              <td>725</td>
                            </tr>
                            <tr>
                              <td>Jeremy Davies</td>
                              <td>12</td>
                              <td>12.02.2021</td>
                              <td>12.02.2021</td>
                              <td>4</td>
                              <td><span className="green">Start New Survey</span></td>
                              <td>725</td>
                            </tr>
                          </tbody>
                        </table>
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
        </main>{/* End #main */}
        {/* ======= Footer ======= */}
        <footer id="footer">
        </footer>{/* End Footer */}
      </div>
      
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






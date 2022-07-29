import React from 'react';
import { connect } from 'react-redux';

import IndexComponentStyled from './IndexComponentStyled';
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
        <main id="main">
          <div id="wrapper">
            <Header />
           <Leftbar />
            {/* Page Content */}
            <Fade bottom>
            <div className="page-content-wrapper my-profile" data-aos="fade-up">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <h3 className="content-title">Jeremy Davies</h3>
                    <div className="btn-group">
                      <button data-toggle="modal" data-target="#addSuperhero" type="button" className="btn btn-primary green-btn">Add Actions</button>
                      <button data-toggle="modal" data-target="#addSuperhero" type="button" className="btn btn-primary green-btn">Reports</button>
                      <button data-toggle="modal" data-target="#addSuperhero" type="button" className="btn btn-primary purple-btn">Start/Resume Survey</button>
                    </div>	
                    <h3 className="content-title">Contact Information</h3>
                    <div className="panel panel-default table-responsive">
                      <table className="table table-borderless main-table table-fixed">
                        <thead>
                          <tr>
                            <th scope="col">Full Name</th>
                            <th scope="col">Date of Birth</th>
                            <th scope="col">Centre</th>
                            <th scope="col">Region</th>
                            <th scope="col">Next Survey Due</th>
                            <th scope="col">Surveys Completed</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Jeremy Davies</td>
                            <td>12.03.2021</td>
                            <td>Northwich</td>
                            <td>North West</td>
                            <td>12.03.2021</td>
                            <td>5</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="panel panel-default table-responsive">
                      <table className="table table-borderless list-border table-fixed">
                        <thead>
                          <tr>
                            <th>Survey</th>
                            <th>Due By/Completed</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Survey 1</td>
                            <td>12.12.2020</td>
                            <td>Overdue</td>
                            <td>Start Survey</td>
                          </tr>
                          <tr>
                            <td>Survey 2</td>
                            <td>10.02.2021</td>
                            <td>Incomplete</td>
                            <td>Resume Survey</td>
                          </tr>
                          <tr>
                            <td>Survey 3</td>
                            <td>21.04.2021</td>
                            <td>On Schedule</td>
                            <td />
                          </tr>
                          <tr>
                            <td>Survey 4</td>
                            <td>12.06.2021</td>
                            <td>On Schedule</td>
                            <td />
                          </tr>
                          <tr>
                            <td>Survey 5</td>
                            <td>21.04.2021</td>
                            <td>On Schedule</td>
                            <td />
                          </tr>
                          <tr>
                            <td>Survey 6</td>
                            <td>12.06.2021</td>
                            <td>Completed</td>
                            <td />
                          </tr>
                          <tr>
                            <td>Survey 7</td>
                            <td>21.04.2021</td>
                            <td>Completed</td>
                            <td />
                          </tr>
                          <tr>
                            <td>Survey 8</td>
                            <td>12.06.2021</td>
                            <td>Completed</td>
                            <td />
                          </tr>
                        </tbody>
                      </table>
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






import React from 'react';
import IndexComponentStyled from './IndexComponentStyled';
import { Link ,Redirect  } from "react-router-dom";
import { connect } from 'react-redux';
import Header from '../header'
import { leftmenu } from '../../../actions/myaction';
import Fade from 'react-reveal/Fade';

function importAll(r) {
	let images = {};
	r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
	return images;
  }
 function   NoData(){
	return(<div style={{textAlign:'center'}}>No data</div>)
}
  const images = importAll(require.context('../../../assets/img/', false, /\.(png|jpe?g|svg)$/));
  const intialState = {
    menname: 'Dashboard',
   };
class Leftbar extends React.Component
{
  constructor(props) {
    super(props)
    this.state = intialState
  }
  logout = e => {
    localStorage.clear();
    this.setState(intialState);


  }
 async onchangemenu (menu) {
 await this.props.getUsersdata(menu);
    this.setState({ menname: menu});
    }
    loadsurvey(survey){
      window.location.href = survey;
    }
  render()
  {
    let token = localStorage.getItem('token')
    if (!token) return <Redirect to='/' />
    const url = window.location.origin;
    return(
      <React.Fragment>
         <IndexComponentStyled>
       <Header />
       <Fade bottom>
        <main id="main">
          {/* ======= Login Screen ======= */}
          <section id="login">
            <div className="container" data-aos="fade-up">
              <div className="row align-items-center">
                <div className="col-lg-6 col-md-6">
                  <div className="curve-box">
                    <h2>Keep me safe and care well for me</h2>
                    <img src={images['tick-circle.png']} style={{maxWidth: '54px'}} />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="curve-box">
                    <h2>Help me get a good education</h2>
                    <div className="progress">
                      <div className="progress-done" data-done={70} />
                      <span className="count">7/10</span>
                    </div>
                    <a className="btn btn-primary">Resume</a>
                  </div>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-lg-6 col-md-6">
                  <div className="curve-box">
                    <h2>help me be healthy and enjoy life</h2>
                    <a className="btn btn-primary" >Start</a>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="curve-box">
                    <h2>Support my future and next adventure</h2>
                    <a className="btn btn-primary">Start</a>
                  </div>
                </div>
              </div>
            </div>
          </section>{/* End Counts Section */}
        </main>{/* End #main */}
        {/* ======= Footer ======= */}
        <footer id="footer">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-12 col-md-12">
                <div className="footer-content">
                  <a className="btn btn-primary"onClick={()=>{this.loadsurvey(`${url}/survey/fourth`)}}>Back</a> 
                  <p>Once you have completed all the sections</p>
                  <a className="btn btn-primary green-bg" onClick={()=>{ this.loadsurvey(`${url}/survey/sixth`)}}>Submit</a> 
                </div>
              </div>
            </div>
          </div>
        </footer>{/* End Footer */}
        </Fade>
            </IndexComponentStyled>
    </React.Fragment>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    leftmenu: state.leftmenu,
 }
}
const mapDispatchToProps = (dispatch) => {
  return {

    getUsersdata: (requestdata) => {
      dispatch(leftmenu(requestdata))
    },


  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Leftbar);


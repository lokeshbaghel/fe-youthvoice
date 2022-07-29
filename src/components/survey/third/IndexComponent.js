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
                <div className="col-lg-7 col-md-7">
                  <h1>How does this work?</h1>
                  <p>When you have selected your response, the emoji you have chosen will be highlighted and the others will fade out. If you want to change your response at any time, you can simply click on a different emoji to change.</p>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-7 col-md-7 mt-5">
                  <div className="reaction-div">
                    <a className="btn btn-primary"><img src={images['strongly-agree-icon.png']} /> Strongly agree</a>
                    <a className="btn btn-primary disabled"><img src={images['agree-icon.png']} /> Agree</a>
                    <a className="btn btn-primary disabled"><img src={images['neither-disaggre-or-agree-icon.png']} /> Neither agree or disagree</a>
                    <a className="btn btn-primary disabled"><img src={images['disagree-icon.png']}   /> Disagree</a>
                    <a className="btn btn-primary disabled"><img src={images['strongly-disagree-icon.png']}  /> Strongly disagree</a>
                  </div>
                  <a className="btn btn-primary" onClick={()=>{this.loadsurvey(`${url}/survey/second`)}}>Back</a>
                  <a className="btn btn-primary" onClick={()=>{this.loadsurvey(`${url}/survey/fourth`)}}>Next</a>
                </div>
                <div className="col-lg-5 col-md-5 text-right">
                  <img className="graphic-right" src={images['bg-graphic3.png']} />
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


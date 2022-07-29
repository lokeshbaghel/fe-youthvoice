import React from 'react';
import { Link ,Redirect  } from "react-router-dom";
import { connect } from 'react-redux';


function importAll(r) {
	let images = {};
	r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
	return images;
  }
 function   NoData(){
	return(<div style={{textAlign:'center'}}>No data</div>)
}
  const images = importAll(require.context('../../../../assets/img/', false, /\.(png|jpe?g|svg)$/));
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

  render()
  {
    let token = localStorage.getItem('token')
    if (!token) return <Redirect to='/' />
    return(
      <React.Fragment>
        <header id="header">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <a href="#" className="logo"> <img src={images['logo.png']} /></a>
              </div>
              <div className="col-md-9">
                <div className="progress-coin-main">
                  <div className="top-progressbar" />
                  <div className="coin-icon-container">
                    <img src={images['coins-icon.png']}  />
                    <span>0 OMC</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
    </React.Fragment>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    leftmenu: state.leftmenu,
 }
}



export default connect(mapStateToProps)(Leftbar);


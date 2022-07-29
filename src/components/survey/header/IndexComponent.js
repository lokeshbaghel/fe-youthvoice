import React from 'react';
import IndexComponentStyled from './IndexComponentStyled';
import { Link ,Redirect  } from "react-router-dom";
import { connect } from 'react-redux';
import { getlogininfodata  } from './../../../actions/myaction';

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
 async componentDidMount(){

      const requestData = {
        userid: "tets",
       
      }
   await   this.props.getlogininfodata();
  
  }

  loadsurvey(survey){
    window.location.href = survey;
  }

  render()
  {
   
    let urlElements = window.location.href.split('/')

    let urlElelement = (urlElements[8])
    let token = localStorage.getItem('token')
    if (!token && urlElelement !='25') return <Redirect to='/' />

    const url = window.location.origin;
    
    //getting params value 
    const { userId } = this.props

    return(
      <React.Fragment>
        <IndexComponentStyled>
          <header id="header">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <a href="#" className="logo"> <img src={images['logo.png']} /></a>
                </div>
                <div className="col-md-6 d-flex justify-content-md-end">
                  <a className="btn btn-primary exit-btn" onClick={()=>{this.loadsurvey(`${url}/young-people-report/${ userId }`)}}>Exit Survey</a>
                </div>
              </div>
            </div>
          </header>
        </IndexComponentStyled>
      </React.Fragment>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    leftmenu: state.leftmenu,
    uservalueloginheaderdata:state.uservalueloginheaderdata,
 }
}

const mapDispatchToProps = (dispatch) => {
  return {
  
  getlogininfodata: () =>{ dispatch(getlogininfodata())},
  
  }
  }



export default connect(mapStateToProps, mapDispatchToProps)(Leftbar);


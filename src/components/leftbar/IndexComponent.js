import React from 'react';
import IndexComponentStyled from './IndexComponentStyled';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { leftmenu,userlogout } from './../../actions/myaction';
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}
function NoData() {
  return (<div style={{ textAlign: 'center' }}>No data</div>)
}
const images = importAll(require.context('../../assets/img/', false, /\.(png|jpe?g|svg)$/));
const intialState = {
  menname: 'Dashboard',
};
class Leftbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = intialState
  }
  logout = async e => {
    let token = localStorage.getItem('token')
    let userdata={"idToken":2};
    await this.props.logout(userdata);
    localStorage.clear();
    this.setState(intialState);


  }
  async onchangemenu(menu) {
    await this.props.getUsersdata(menu);
    this.setState({ menname: menu });
  }

  render() {
    let token = localStorage.getItem('token')
   
  let usepermission=this.props?.uservalueloginheaderdata?.permission?.usepermission
 
 
  let userdetail=this.props?.uservalueloginheaderdata?.user
  
    let  res=  usepermission? usepermission.map((element)=> element.description).includes('Approver') : ''
    let  usermanage= usepermission ? usepermission.map((element)=> element.description).includes('Site Admin') : ''
    if (!token) return <Redirect to='/' />
    return (
      <React.Fragment>
        <IndexComponentStyled>

        { !token?  <Redirect to='/' /> :''}


          <button type="button" className="hamburger animated fadeInLeft is-closed" data-toggle="offcanvas">
            <span className="hamb-top" />
            <span className="hamb-middle" />
            <span className="hamb-bottom" />
          </button>
          <nav className="navbar navbar-inverse fixed-top" id="sidebar-wrapper" role="navigation">
            <h2 className="menu-title">Menu</h2>
            <ul className="nav sidebar-nav">
              <li><Link to="/dashboard" className={this.props.leftmenu === 'Dashboard' ? "active" : ''} onClick={() => { this.onchangemenu('Dashboard') }} ><img src={images['dashboard.svg']} /> Dashboard</Link></li>
           
              <li>
                <Link to="/youngpeople" className={this.props.leftmenu === 'superheroprofile' ? "active" : ''} onClick={() => { this.onchangemenu('superheroprofile') }} ><img src={images['profile-white.svg']} />Young People</Link>
              </li>
              
            
            {
              usermanage?<li>
              <Link to="/user" className={this.props.leftmenu === 'user' ? "active" : ''} onClick={() => { this.onchangemenu('user') }} ><img src={images['i-edit.svg']} />User Management</Link>
            </li>:''
            }  
             
                
              
               {
            
                    res ? <li> <Link to="/approvals" className={this.props.leftmenu === 'Approvals' ? "active" : ''} onClick={() => { this.onchangemenu('Approvals') }} ><img src={images['i-edit.svg']} />Approvals</Link> </li>:''
            
               }
            
              <div className="sidebar-bottom-content flag-iconimg">
                <img src={ userdetail?.center_logo } />
              
              </div>
            </ul>
          </nav>





        </IndexComponentStyled>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    leftmenu: state.leftmenu,
    uservalueloginheaderdata:state.uservalueloginheaderdata
  }
}
const mapDispatchToProps = (dispatch) => {
  return {

    getUsersdata: (requestdata) => {
      dispatch(leftmenu(requestdata))
    },
    logout: (requestdata) => {
      dispatch(userlogout(requestdata))
    },

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Leftbar);
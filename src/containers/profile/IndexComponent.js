import React from 'react';
import { connect } from 'react-redux';
import Header from '../../components/header'
import IndexComponentStyled from './IndexComponentStyled';
import { getUserByUserName } from '../../actions/myaction';
import Emaipopup from '../../components/profile/emailPopup'
import Password from '../../components/profile/password'
import Username from '../../components/profile/username'
import Leftbar from '../../components/leftbar'
import { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/style.css';
import Fade from 'react-reveal/Fade';
import $ from 'jquery';
import Moment from 'moment';
const intialState = {
  email: '',
  password: '',
  emailErr: '',
  afterloginhit:1,
  passwordErr: '',

};
function   NoData(){
	return(<div style={{textAlign:'center'}}>No data</div>)
}
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
  
    let user=this.props?.uservalueloginheaderdata?.user
    await this.props.getUserByUserName(user?.username)
 
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value })
  }

  loginValidate() {
    let err = false;
    if (!this.state.email) {
      this.setState({ emailErr: 'Email can not be blank' });
      err = true;
    }
    else if (!this.state.email.includes('@')) {
      this.setState({ emailErr: 'Please enter valid email' });
      err = true;
    }
    else {
      this.setState({ emailErr: '' });

    }
    if (!this.state.password) {
      this.setState({ passwordErr: 'Password can not be blank' });
      err = true;
    }
    else {
      this.setState({ passwordErr: '' });
    }
    return err;
  }


  onSubmit = e => {
    e.preventDefault();

    const isValid = this.loginValidate();
    if (!isValid) {
      const userData = {
        email: this.state.email,
        password: this.state.password,
      }
      this.setState(intialState);
      
    
    }
    else {
      
    }

  }
  convertDate = (fetchedDate, format) => {
    const momentDate = Moment(fetchedDate);
    return momentDate.format(format)
  }
  getpermissionList = permissions => { 
    return permissions?.map(permission => { 
    return (
       <p> {permission?.description}</p>
     )
   })
 }


  getusercentre = centers => { 
    return centers?.map(center => { 
    return (
       <p> {center?.description}</p>
     )
   })
 }
  getAllUsersList = users => { 
    return users.map(user => { 
     return (
        <>
          <tr key = { user?.id } >
            <td>{ `${user?.first_name } ${user?.last_name }` }</td>
            <td>{user?.username}</td> 
            <td>  {user?.user_centre?.length > 0 ? this.getusercentre(user?.user_centre) : ''}     </td>
            <td>{user?.user_role?.user_role}</td>
            <td> {user?.user_permissions?.length > 0 ? this.getpermissionList(user?.user_permissions) : ''}</td>
            <td>{ user?.last_login? this.convertDate(user?.last_login?.login_time, 'DD/MM/YYYY') :''} </td>
           
          </tr>
        </>
      )
    })
  }


  render() {
    let token = localStorage.getItem('token')
    if (!token) return <Redirect to='/' />

   let user=this.props?.uservalueloginheaderdata?.user
   if(user && this.state.afterloginhit==1 )
   {
     this.props.getUserByUserName(user?.username)
    this.setState({afterloginhit:2})
   }
    return (
  <React.Fragment>
   <IndexComponentStyled>
     { !token?  <Redirect to='/' /> :''}
          <div id="maindiv">
            <main id="main">
              <div id="wrapper">
                <Header />
                <div className="overlay" />
           <Leftbar />
  <Fade bottom>
   <div className="page-content-wrapper my-profile" data-aos="fade-up">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <h1 className="dash-title">My Profile</h1>
            </div>
          </div>
          <div className="right-container">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="search-user-head">
                  <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6">
                      <h2><span>Contact Information</span></h2>
                    </div>
                  
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                    <tr>
                              <th scope="col">Name</th>
                               <th scope="col">Username</th>
                              <th scope="col">centre</th>
                              <th scope="col">Role</th>
                              <th scope="col">Permissions</th>
                              <th scope="col">Last Login</th>
                             
                            </tr>
                   
                    </thead>
                    <tbody>
                    
                    {this.props?.users?.length > 0 ? this.getAllUsersList(this.props?.users) : ''}
                   
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="table-responsive contact-details">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td><strong>Email Address:</strong> {user?.email}</td>
                        <td><Emaipopup /></td>
                      </tr>
                      <tr>
                        <td><strong>Username:</strong> {user?.username}</td>
                        <td><Username /></td>
                      </tr>
                      <tr>
                        <td><strong>Password:</strong> *************</td>
                        <td> <Password /></td>
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
            </main>
              <footer id="footer">
              </footer>
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
    email: state.updateUserRecord,
    uservalueloginheaderdata:state.uservalueloginheaderdata,
    users: state.usersManagement.list,
  }


}


const mapDispatchToProps = (dispatch) => {
  return {
    getUserByUserName: (userId) => {
      dispatch(getUserByUserName(userId))
    },
   
}
}


export default connect(mapStateToProps ,mapDispatchToProps)(Profile);






import React from 'react';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';
import IndexComponentStyled from './IndexComponentStyled';
import { Modal } from 'react-bootstrap'
import { getUserById } from '../../../actions/myaction';
import { connect } from 'react-redux';
import { Link ,Redirect  } from "react-router-dom";


function importAll(r) {
	let images = {};
	r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
	return images;
  }
 function   NoData(){
	return(<div style={{textAlign:'center'}}>No data</div>)
}

const images = importAll(require.context('../../../assets/img', false, /\.(png|jpe?g|svg)$/));
const initialState = { 
  showHide: false,
  userID: '',
  password:'',
  confirmPassword:'',
  confirmPasswordErr: '',
  passwordErr: '',
  username: '',
  usernameErr: '',
  isOtpScreen: false,
  otp: '',
  otpErr: '',
  buttonText: 'Send Verification Code'
}

class PasswordBootstrapModal extends React.Component {

  constructor() {
 
    super();
    this.state = initialState
  }
  //Fetch passwords detail to show in modal
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value })
  }

  passwordScreenValidate() {
    let err = false;
    if (!this.state.username) {
      this.setState({ usernameErr: 'Username is required' });
      err = true;
    }
    else {
      this.setState({ usernameErr: '' });

    }

    // FOR OTP SCREEN
    if (this.state.isOtpScreen) {
      if (!this.state.password) {
        this.setState({ passwordErr: 'Password is required ' });
        err = true;
      }
      else if (this.state.password) {
  
        const re = new RegExp("^(?=.*?[#@$?!])(?=.*[a-z])(?=.*[A-Z]).{7,32}$");
        const isOk = re.test(this.state.password);
        if (!isOk) {
          this.setState({ passwordErr: 'A minimum 8 characters password contains a combination of uppercase and lowercase letter and number. ' });
          err = true;
        }
        else {
          this.setState({ passwordErr: '' });
        }
  
      }
      else{
        this.setState({ passwordErr: '' });
      }
      if (!this.state.confirmPassword) {
        this.setState({ confirmPasswordErr: 'Last name is required ' });
        err = true;
      }else{
        this.setState({ confirmPasswordErr: '' });
      }
      if (typeof this.state.password !== "undefined" && typeof this.state.confirmPassword !== "undefined") {
            
        if (this.state.password != this.state.confirmPassword) {
          this.setState({ confirmPasswordErr: "Passwords don't match." });
          err = true;
        }
      }else{
        this.setState({ confirmPasswordErr: '' });
      }
    }
    

    return err;
  }

  async handleModalShowHide() {
    
    await this.setState({ showHide: !this.state.showHide }, async () => {
      
      if(this.state.showHide){
        await this.setState({ userID : this.props.userId})
      
      }
    })
    
    
  }

  onSubmit = async e => {
    e.preventDefault();
    const isValid = this.passwordScreenValidate();
    const userData = {  }
    if (this.state.isOtpScreen) {
      if (!isValid) {
        userData.username = this.state.username
        userData.passcode = this.state.otp
        userData.newpassword = this.state.password
        userData.id = this.state.userID
        this.setState(initialState);
        await this.props.sendForgetRquestMails(userData);
      }
    } else {
      if (!isValid) {
        userData.username = this.state.username
        userData.id = this.state.userID
        await this.props.sendForgetRquestMails(userData);
        this.setState({ isOtpScreen: true, buttonText: 'Submit' });
      }
    }
  }
  
  isOtpScreenFunction(state) {
    if (state.isOtpScreen) {

      const { otp, password, confirmPassword } = this.state;
      return (
        <>
          <div className="form-group">
            <label>OTP</label>
            <input type="text" className="form-control" id="otp" value={otp} onChange={this.onChange} placeholder="OTP" />
            <span style={{ color: 'red' }}>{this.state.otpErr}</span>
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input type="password" className="form-control" id="password" value={password} onChange={this.onChange} placeholder="Xyz@123" />
            <span style={{ color: 'red' }}>{this.state.passwordErr}</span>
          </div>

          <div className="form-group">
            <input type="password" placeholder="Confirm Password" id="confirmPassword" value={ confirmPassword } onChange={this.onChange} />
            <span style={{ color: 'red' }}>{this.state.confirmPasswordErr}</span>
          </div>

        </>
      )
    }
  }

  render() {
    const { username, password,confirmPassword } = this.state;
    if (this.props?.authorized === 1) {
      localStorage.clear();
      return <Redirect to='/' />
    } 
    return (
      <React.Fragment>
        <IndexComponentStyled>
        
          <Link to="#" onClick={() => this.handleModalShowHide()} ><img src={images['edit-icon.png']} /></Link>

          <Modal show={this.state.showHide}>
            <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
             
            </Modal.Header>
            <Modal.Body>
            <div className="modal-body user-management-modal">
              <h1>Edit</h1>
              <form onSubmit={this.onSubmit} autoComplete="off">
                <div className="form-group">
                  <label>Username</label>
                  <input type="text" className="form-control" id="username" value={username} onChange={this.onChange} placeholder="Joanna Doe" />
                  <span style={{ color: 'red' }}>{this.state.usernameErr}</span>
                </div>
                {
                  this.state.isOtpScreen ? this.isOtpScreenFunction(this.state) : ''
                }
                <button type="submit" className="btn btn-primary">{this.state.buttonText} </button>
              </form>
            </div>
            <div className="modal-footer">
              <a className="cancel-btn" data-dismiss="modal" aria-label="Close">
                Cancel
              </a>
            </div>
            </Modal.Body>

          </Modal>
        </IndexComponentStyled>
      </React.Fragment>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    authorized: state.userAuthenticate,
    updateUserResult: state.updateUserResult
    
  }


}
const mapDispatchToProps = (dispatch) => {
  return {
    getUserById: (userId) => {
      dispatch(getUserById(userId))
    },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PasswordBootstrapModal);



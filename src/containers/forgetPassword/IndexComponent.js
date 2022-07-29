import React from 'react';
import Fade from 'react-reveal/Fade';
import swal from 'sweetalert';

import { connect } from 'react-redux';
import { Redirect ,Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import IndexComponentStyled from './IndexComponentStyled';
import Logo from '../../assets/img/logo.png';
import Logingraphic from '../../assets/img/forgot-password-graphic.png';
import { sendForgetRquestMails } from '../../actions/myaction'

const intialState = {
  username: '',
  usernameErr: '',
  isOtpScreen: false,
  otp: '',
  otpErr: '',
  buttonText: 'Send Verification Code',
  password: '',
  passwordErr: '',
};
class ForgetPassword extends React.Component {

  constructor(props) {
    super(props)
    this.state = intialState;
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value })
  }
  forgetValidate() {
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
      if (this.state.otp === '') {
        this.setState({ otpErr: 'OTP is required' });
        err = true;
      }
      if (this.state.password === '') {
        this.setState({ passwordErr: 'Password is required' });
        err = true;
      } else if (this.state.password) {

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

    }

    return err;
  }

  onSubmit = async e => {
    e.preventDefault();

    const isValid = this.forgetValidate();
    let userData = {}
    if (this.state.isOtpScreen) {
      if (!isValid) {
        userData.username = this.state.username
        userData.passcode = this.state.otp
        userData.newpassword = this.state.password
        this.setState(intialState);
        await this.props.sendForgetRquestMails(userData);
      }
    } else {
      if (!isValid) {
        userData.username = this.state.username
        await this.props.sendForgetRquestMails(userData);
        this.setState({ isOtpScreen: true, buttonText: 'Submit' });
      }
    }


  }

  isOtpScreenFunction(state) {
    if (state.isOtpScreen) {

      const { otp, password } = this.state;
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

        </>
      )
    }
  }
  redirectFunction(url) {
    return <Redirect to={url} />;
  }
  render() {
    const { username } = this.state;
    if (this.props?.forgetScreenResponse) {
      const forgetResponse = this.props?.forgetScreenResponse;
      if (forgetResponse.status === 0) {
        this.setState({ isOtpScreen: false, buttonText: 'Send Verification Code' })
        swal(this.props?.mail?.message, {
          icon: "error",
        })
      } else if (forgetResponse.isUpdated === true) {
        swal(forgetResponse?.message, {
          icon: "success",
        })

      }
    }
    return (

      <React.Fragment>
        <IndexComponentStyled>
          <header id="header">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <a href="#" className="logo"> <img src={Logo} /></a>
                </div>
              </div>
            </div>
          </header>
          <Fade bottom>
            <main id="main">
              {/* ======= Login Screen ======= */}
              <section id="login">
                <div className="container" data-aos="fade-up">
                  <div className="row align-items-center">
                    <div className="col-lg-7 col-md-7">
                      <img src={Logingraphic} />
                    </div>
                    <div className="col-lg-5 col-md-5">
                      <form onSubmit={this.onSubmit} autoComplete="off">
                        <h3>Verification is necessary. Please enter your username.</h3>
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
                   
                      <Link to="/" className="btn btn-primary cancle-btn"  >Cancel</Link>
                      
                    </div>
                  </div>
                </div>
              </section>{/* End Counts Section */}
            </main>{/* End #main */}
          </Fade>
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
    forgetScreenResponse: state.forgetPasswordChange
  }


}
const mapDispatchToProps = (dispatch) => {
  return {

    sendMailToUsers: (requestdata) => {
      dispatch(sendForgetRquestMails(requestdata))
    },
  }
}


export default connect(mapStateToProps, { sendForgetRquestMails })(ForgetPassword);





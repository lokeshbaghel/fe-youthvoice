import React from 'react';
import IndexComponentStyled from './IndexComponentStyled';
import Logo from '../../assets/img/logo.png';
import Loader from "react-loader-spinner";
import Logingraphic from '../../assets/img/login-graphic.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import { login } from './../../actions/myaction';
import { connect } from 'react-redux';


import { Redirect } from 'react-router-dom';
const intialState = {
  email: '',
  password: '',
  emailErr: '',
  loginErr: '',
  passwordErr: '',
  lodder: false,

};
class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = intialState
  }



  onChange = e => {
    this.setState({ [e.target.id]: e.target.value })
  }

  loginValidate() {
    let err = false;
    if (!this.state.email) {
      this.setState({ emailErr: 'Username is required' });
      err = true;
    }
  
    else {
      this.setState({ emailErr: '' });

    }
    if (!this.state.password) {
      this.setState({ passwordErr: 'Password is required' });
      err = true;
    }
    else {
      this.setState({ passwordErr: '' });
    }
    if (this.state.password) {

      const re = new RegExp("^(?=.*?[#@$?!])(?=.*[a-z])(?=.*[A-Z]).{7,32}$");
      const isOk = re.test(this.state.password);
      if (!isOk) {
   this.setState({ loginErr: 'Incorrect username or password.' });
      
      err = true;
      }
      else {
        this.setState({ loginErr: '' });
      }

    }
    return err;
  }


  onSubmit = async e => {
    e.preventDefault();

    const isValid = this.loginValidate();
    if (!isValid) {
      const userData = {
        username: this.state.email,
        password: this.state.password,
      }

      this.setState({ lodder: true })
      await this.props.getUsersdata(userData);
      
    }

  }
  render() {

    const { email, password } = this.state;
    const token = JSON.parse(localStorage.getItem('token'))
   
    return (

      <React.Fragment>
        <IndexComponentStyled>

          {token !== null && Object.keys(token).length > 0 ? <Redirect to='/dashboard' /> : ''}
          <header id="header">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <a href="javascript:void(0);" className="logo"> <img src={Logo} /></a>
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
                    <div className="col-lg-7 col-md-7 d-flex justify-content-center">
                      <img src={Logingraphic} />
                    </div>
                    <div className="col-lg-5 col-md-5 d-flex justify-content-center flex-column">

                      <span style={{ color: "red" }}>
                        {this.props?.usererror ==="jwt expired" ? "Authentication failed" : this.props?.usererror}
                      </span>
                      <span style={{ color: 'red' }}>{this.state.loginErr}</span>
                      <form onSubmit={this.onSubmit} autoComplete="off">
                        <div className="form-group">
                          <label>Username</label>
                          <input type="text" id="email" value={email} onChange={this.onChange} className="form-control" placeholder="Joanna Doe" />
                          <span style={{ color: 'red' }}>{this.state.emailErr}</span>
                        </div>
                        <div className="form-group">
                          <label>Password</label>
                          <input type="password" id="password" value={password} onChange={this.onChange} className="form-control" placeholder="Xyz@123" />
                          <span style={{ color: 'red' }}>{this.state.passwordErr}</span>
                        </div>
                        <button type="submit" className="btn btn-primary">
                       { this.state.lodder && this.props.loaderflag ? <Loader type="TailSpin" color="white" height={40} width={40} /> :'' }
                       
                          Sign in</button>

                        <p><Link to="/forgetpassword">Forgot your password?</Link></p>
                      </form>
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
    uservalue: state.uservalue,
    usererror: state.usererror,
    loaderflag:state.loaderflag,
    authorized: state.userAuthenticate
  }


}
const mapDispatchToProps = (dispatch) => {
  return {

    getUsersdata: (requestdata) => {
      dispatch(login(requestdata))
    },


  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);
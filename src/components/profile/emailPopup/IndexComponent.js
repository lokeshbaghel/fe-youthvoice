import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import IndexComponentStyled from './IndexComponentStyled';
import { Modal } from 'react-bootstrap'
import { updateemailverify, updateemailwithopt } from '../../../actions/myaction';
import { connect } from 'react-redux';

class BootstrapModal extends React.Component {

  constructor() {


    super();
    this.state = {
      showHide: false,
      email: "",
      emailErr: '',
      otp: '',
      otpErr: '',

    }
  }
  componentDidMount(){
    let user=this.props?.uservalueloginheaderdata?.user
    this.setState({ username: user?.username});
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value })
  }

  loginValidate() {
    let err = false;
    if (!this.state.email) {
      this.setState({ emailErr: 'Email is required ' });
      err = true;
    }
    else if (!this.state.email.includes('@')) {
      this.setState({ emailErr: 'Please enter valid email' });
      err = true;
    }
    else {
      this.setState({ emailErr: '' });
    }

    return err;
  }

  handleModalShowHide() {
    this.setState({ showHide: !this.state.showHide })
  }
  onSubmit = async e => {
    e.preventDefault();

    const isValid = this.loginValidate();
    if (!isValid) {
      if (!this.state.otp) {
        const userData = { email: this.state.email, }
        await this.props.getupdateemailverify(userData);
      }
      else {
        const userData = { email: this.state.email, otp: this.state.otp }
        await this.props.updateemailwithotp(userData);
      }


    }

  }
  render() {
    const { email, otp } = this.state;
    return (
      <React.Fragment>
        <IndexComponentStyled>
       

          <Modal show={this.state.showHide}>
            <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
          
            </Modal.Header>
            <Modal.Body  className="profile-popup">
            {this.props.usererror?  <span  className="alert alert-danger" style={{ color: "red" }}>
                {this.props.usererror}
              </span> :""}
              {this.props.uservalue.statusCode === 200 ? <React.Fragment>

                <span className="alert alert-success" style={{ color: "green" }}>
                OTP has been sent on your mail successfully
                </span>
              </React.Fragment>   
            
              : ''}

              {this.props.email.statusCode === 200 ? 
              <React.Fragment>
              <span style={{ color: "green" }}>
                Email updated successfully
              </span>
              </React.Fragment>
              : ''}
              <form onSubmit={this.onSubmit} autoComplete="off" >
              <h1>Change Email</h1>
                <div className="form-group">
                  <label>Change Email Address</label>
                  <input type="text" placeholder="Email Address" id="email" value={email} onChange={this.onChange} />
                  <span style={{ color: 'red' }}>{this.state.emailErr}</span>
                </div>
                {this.props.uservalue.status === 'ok' ? <React.Fragment>

                  <div className="form-group">
                    <label>Otp</label>
                    <input type="text" id="otp" placeholder="Enter Otp" value={otp} onChange={this.onChange} />
                    <span style={{ color: 'red' }}>{this.state.otpErr}</span>
                  </div>

                  <button type="submit" class="btn btn-primary">Update Email</button>
                </React.Fragment> : ''


                }
                {this.props.uservalue.status !== 'ok' ? <React.Fragment>
                  <button type="submit" class="btn btn-primary">Send otp</button>
                </React.Fragment> : ''}
              </form>
            </Modal.Body>
            <Modal.Footer >
            <a class="cancel-btn" closeButton onClick={() => this.handleModalShowHide()}>
             Cancel
          </a>
            </Modal.Footer>
          </Modal>
        </IndexComponentStyled>
      </React.Fragment>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    uservalue: state.uservalueupdat,
    usererror: state.usererror,
    uservalueloginheaderdata:state.uservalueloginheaderdata,
    email: state.updateUserRecord
  }


}
const mapDispatchToProps = (dispatch) => {
  return {

    getupdateemailverify: (requestdata) => {
      dispatch(updateemailverify(requestdata))
    },
    updateemailwithotp: (requestdata) => {
      dispatch(updateemailwithopt(requestdata))
    },



  }
}


export default connect(mapStateToProps, mapDispatchToProps)(BootstrapModal);



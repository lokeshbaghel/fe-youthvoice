import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import IndexComponentStyled from './IndexComponentStyled';
import { Modal } from 'react-bootstrap'
import { login } from '../../../actions/myaction';
import { connect } from 'react-redux';

class BootstrapModal extends React.Component {

  constructor() {
 
    

    super();

    this.state = {
      showHide: false,
      username: '',
      usernameErr: '',
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value })
  }

  componentDidMount(){
    let user=this.props?.uservalueloginheaderdata?.user
    this.setState({ username: user?.username});
  }
  loginValidate() {
    let err = false;
    if (!this.state.username) {
      this.setState({ usernameErr: 'Username is required ' });
      err = true;
    }

    else {
      this.setState({ usernameErr: '' });

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
      const userData = {
        username: this.state.username,

      }
      alert('validated')


    }

  }
  render() {

    const { username } = this.state;

    return (
      <React.Fragment>
        <IndexComponentStyled>
         

          <Modal show={this.state.showHide}>
            <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
             </Modal.Header>
            <Modal.Body className="profile-popup">
          
              <span style={{ color: "red" }}>
                {this.props.usererror}
              </span>
              <form onSubmit={this.onSubmit} autoComplete="off" >
              <h1>Change Username</h1>
                <div className="form-group">
                  <label>Change Username</label>
                  <input type="text" id="username" value={username} onChange={this.onChange} />
                  <span style={{ color: 'red' }}><br />{this.state.usernameErr}</span>
                </div>

                <button type="submit" class="btn btn-primary">Save</button>
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
    uservalue: state.uservalue,
    usererror: state.usererror,
    uservalueloginheaderdata:state.uservalueloginheaderdata,
  }


}
const mapDispatchToProps = (dispatch) => {
  return {

    getUsersdata: (requestdata) => {
      dispatch(login(requestdata))
    },


  }
}


export default connect(mapStateToProps, mapDispatchToProps)(BootstrapModal);
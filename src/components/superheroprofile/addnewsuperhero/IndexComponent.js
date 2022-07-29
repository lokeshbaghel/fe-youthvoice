import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import IndexComponentStyled from './IndexComponentStyled';
import { Modal } from 'react-bootstrap'

import { updateemailverify, updateemailwithopt } from '../../../actions/myaction';
import { connect } from 'react-redux';
function importAll(r) {
	let images = {};
	r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
	return images;
  }
 function   NoData(){
	return(<div style={{textAlign:'center'}}>No data</div>)
}

  const images = importAll(require.context('../../../assets/img/', false, /\.(png|jpe?g|svg)$/));
class BootstrapModal extends React.Component {

  constructor() {
    
   let user=this.props?.uservalueloginheaderdata?.user

    super();
    this.state = {
      showHide: false,
      email: user?.email,
      emailErr: '',
      otp: '',
      otpErr: '',

    }
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
        

          <button onClick={() => this.handleModalShowHide()}  type="button" className="btn btn-primary purple-btn"><img src={images['plus-icon.png']} />Add New Superhero</button>
          <Modal show={this.state.showHide}>
            <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
             
            </Modal.Header>
            <Modal.Body>
              

                    <form>
                      <div className="form-group">
                        <label>Kristin</label>
                        <input type="text" defaultValue="Kristin" />
                      </div>
                      <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" defaultValue="Holland" />
                      </div>
                      <div className="form-group">
                        <label>Age</label>
                        <input type="text" defaultValue={12} />
                      </div>
                      <div className="form-group">
                        <label>ID</label>
                        <input type="text" defaultValue={12345} />
                      </div>
                      <button type="submit" className="btn btn-primary">Confirm</button>
                    </form>
                
            </Modal.Body>

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



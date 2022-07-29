import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import IndexComponentStyled from './IndexComponentStyled';
import { Modal } from 'react-bootstrap'
import { updateuserpassword } from '../../../actions/myaction';
import { connect } from 'react-redux';

class BootstrapModal extends React.Component {

    constructor() {
        super();
        this.state = {
            showHide: false,
            oldpassword: '',
            oldpasswordErr: '',
            newpassword: '',
            newpasswordErr: '',
            confirmpassword: '',
            confirmpasswordErr: ''
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    loginValidate() {
        let err = false;
        if (!this.state.oldpassword) {
            this.setState({ oldpasswordErr: 'Old password is required ' });
            err = true;
        }

        else {
            this.setState({ oldpasswordErr: '' });
        }


        if (!this.state.newpassword) {
            this.setState({ newpasswordErr: 'New password is required ' });
            err = true;
        }

        else {
            this.setState({ newpasswordErr: '' });
        }


        if (!this.state.confirmpassword) {
            this.setState({ confirmpasswordErr: 'Confirm password is required ' });
            err = true;
        }

        else {
            this.setState({ confirmpasswordErr: '' });
        }


        if (this.state.newpassword) {

            const re = new RegExp("^(?=.*?[#@$?!])(?=.*[a-z])(?=.*[A-Z]).{8,32}$");
            const isOk = re.test(this.state.newpassword);
            if (!isOk) {
                this.setState({ newpasswordErr: 'Your new password must contain letters, numbers and special characters and be at least 8 characters long. ' });
                err = true;
            }
            else {
                this.setState({ newpasswordErr: '' });
            }

        }
        if (this.state.newpassword !== this.state.confirmpassword) {
            this.setState({ confirmpasswordErr: 'password did not match ' });
            err = true;
        }

        else {
            this.setState({ confirmpasswordErr: '' });
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
                oldpassword: this.state.oldpassword,
                newpassword: this.state.newpassword,
            }
            
            
            await this.props.updatepassword(userData);
            this.setState({oldpassword:'',newpassword:'',confirmpassword:''});
            


        }

    }
    render() {
        const { oldpassword, newpassword, confirmpassword } = this.state;

        return (
            <React.Fragment>
                <IndexComponentStyled>
                    <span className="popup-btn" onClick={() => this.handleModalShowHide()} >Change Password</span>
                    <Modal show={this.state.showHide}>
                        <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
                      
                        </Modal.Header>
                        <Modal.Body className="profile-popup">
                          
                         <div className="modal-wrapnew"> 
                          
                            <span style={{ color: "red" }} className="custom-message">
                                {this.props.usererror}
                            </span>

                            <span style={{ color: "green" }} className="custom-message">
                                {this.props.uservalue.statusCode == 200 ? 'Password has been updated successfully' : ''}
                            </span>
                         <form onSubmit={this.onSubmit} autoComplete="off" >
                            <h1>Change Password</h1>
                                <div className="form-group">
                                    <label>Old password</label>
                                    <input type="password" placeholder="Old password" id="oldpassword" value={oldpassword} onChange={this.onChange} />
                                    <span style={{ color: 'red' }}><br />{this.state.oldpasswordErr}</span>
                                </div>
                                <div className="form-group">
                                    <label>New password</label>
                                    <input type="password"  placeholder="New password" id="newpassword" value={newpassword} onChange={this.onChange} />
                                    <span style={{ color: 'red' }}><br />{this.state.newpasswordErr}</span>
                                </div>
                                <div className="form-group">
                                    <label>Confirm password</label>
                                    <input type="password" placeholder="Confirm password" id="confirmpassword" value={confirmpassword} onChange={this.onChange} />
                                    <span style={{ color: 'red' }}><br />{this.state.confirmpasswordErr}</span>
                                </div>

                                <button type="submit" className="btn btn-primary">Save</button>
                            </form>
                        </div>

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
        uservalue: state.updateUserRecord,
        usererror: state.usererror,
    }


}
const mapDispatchToProps = (dispatch) => {
    return {

        updatepassword: (requestdata) => {
            dispatch(updateuserpassword(requestdata))
        },


    }
}


export default connect(mapStateToProps, mapDispatchToProps)(BootstrapModal);


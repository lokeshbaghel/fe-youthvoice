import React from 'react';
import baseURL from "../../../axios/baseURL";
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';
import IndexComponentStyled from './IndexComponentStyled';
import { Modal } from 'react-bootstrap'
import { updateemailverify, updateemailwithopt, getUserById, updateUserById } from '../../../actions/myaction';
import { connect } from 'react-redux';
import { Link ,Redirect  } from "react-router-dom";
import Moment from 'moment';

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
  email: '',
  otp: '',
  otpErr: '',
  firstName:'',
  lastName:'',
  userName:'',
  email:'',
  userID: '',
  password:'',
  confirmpassword:'',
  roles: '',
  centerData: '',
  firstNameErr: '',
  lastNameErr: '',
  emailErr: '',
  rolesErr: '',
  hierarchyTypes:'',
  centersErr: '',
  hierarchyTypeErr:'',
  toUpdateProps: false,
  status_id : false,
  onUpdateRecord: false
};

class BootstrapModal extends React.Component {

  constructor() {

    super();
    this.state = initialState
  }
  //Fetch user detail to show in modal
  onChange = async e => {
   await this.setState({ [e.target.id]: e.target.value })
  }
  onChangestatus_id = async e => {
    if(this.state.status_id==1)
   await this.setState({ [e.target.id]: 2 })
    else
   await this.setState({ [e.target.id]: 1 })
  }
  editUserValidate() {
    let err = false;
    if (!this.state?.firstName) {
      this.setState({ firstNameErr: 'First name is required ' });
      err = true;
    }
    if (!this.state?.lastName) {
      this.setState({ lastNameErr: 'Last name is required ' });
      err = true;
    }
    if (!this.state?.roles || this.state?.roles === 0) {
      this.setState({ rolesErr: 'Please select a role ' });
      err = true;
    }
    if ( this.state?.centers === 0) {
      this.setState({ centersErr: 'Please select a centre ' });
      err = true;
    }
    if ( this.state?.hierarchyType === 0) {
      this.setState({ hierarchyTypeErr: 'Please select a hierarchy Type ' });
      err = true;
    }
    
    if (!this.state?.email) {
      this.setState({ emailErr: 'Email is required ' });
      err = true;
    }
    else if (!this.state?.email.includes('@')) {
      this.setState({ emailErr: 'Please enter valid email' });
      err = true;
    }
    else {
      this.setState({ emailErr: '' });
    }

    return err;
  }

  async handleModalShowHide() {
    await this.setState({ showHide: !this.state?.showHide }, async () => {
      
      if(this.state?.showHide){
        await this.setState({ toUpdateProps : false})
        await this.getUserDataReq(this.props.userId);
     
      }
    })
    
    
  }

  onSubmit = async e => {
    e.preventDefault();

    const isValid = this.editUserValidate();
    if (!isValid) {
      const { email, firstName, lastName, roles, userID , hierarchyTypes , centerData ,status_id } = this.state;
      const userData = { email: email, first_name: firstName, last_name: lastName, user_role_id: roles, id: userID , center_id:centerData , hierarchy_type_id: hierarchyTypes , status_id:status_id==2?2:1}
      await this.props.updateUserById(userData);
      this.setState({ showHide: false ,onUpdateRecord:true})
    }

  }
  //Get roles select Box
  getRolesDropdownMenu = roles => {
    return roles.map(role => {
      return (
        <>
          <option value={role.id}>{role.user_role}</option>
        </>
      )
    })
  }
  
  //Get centers select Box
  getCentersDropdownMenu = centers => {
    return centers.map(center => {
      return (
        <>
          <option value={center.id}>{center.description}</option>
        </>
      )
    })
  }
  
  getUserDataReq = async (id) =>{

    let tokens = await JSON.parse(localStorage.getItem('token'));
    if(tokens){
      
      
      const token = tokens.accessToken;
  
      baseURL.post(`/getUserById`,{ id : id } , {
  
      headers: {
          'Authorization': token,
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
      }
    })
     .then(async (response) => {
      if( response?.data?.statusCode === 404){
        localStorage.clear();

      }
      if( response?.data  ){
        
        const { email_address : email,first_name,last_name ,username, id,external_id, third_party_system,login_time,user_role_id ,hierarchy_type_id ,center_id ,status_id } = response?.data?.data?.user;
        this.setState({
          centers:response?.data?.data?.centers,
          hierarchyType:response?.data?.data?.hierarchyType,
          role:response?.data?.data?.role,
        });
        this.setState({
          firstName:first_name,
          lastName : last_name,
          userName : username,
          roles : user_role_id,  
          hierarchyTypes : hierarchy_type_id,  
          centerData : center_id,  
          external_id : external_id,
          third_party_system : third_party_system,
          login_time : login_time,
          email : email,
          userID : id,  
          status_id:status_id 
         
        },()=>{
          this.setState({ toUpdateProps : true})
        });
        }
        
     
        }).catch((error) => {
          
       });


      } 
    }

    

convertDate = (fetchedDate, format) => {
  const momentDate = Moment(fetchedDate);
  return momentDate.format(format)
}
  setFormFields =  (user) => {
    if(user?.status === 1 && this.state.toUpdateProps === false ){
      const { email_address : email,first_name,last_name ,username, id,external_id, third_party_system,login_time,user_role_id ,hierarchy_type_id ,center_id} = user?.list.user;
     
      this.setState({
        firstName:first_name,
        lastName : last_name,
        userName : username,
        roles : user_role_id,  
        hierarchyType : hierarchy_type_id,  
        centerData : center_id,  
        external_id : external_id,
        third_party_system : third_party_system,
        login_time : login_time,
        email : email,
        userID : id,   
       
      },()=>{
        this.setState({ toUpdateProps : true})
      });
     

    }
  }
  render() {

    if (this.props?.authorized === 1) {
      localStorage.clear();
      return <Redirect to='/' />
    } 
    if(this.props?.updateUserResult ){
      const editUserResponse = this.props?.updateUserResult;
      if(editUserResponse?.status === 1  && this.state?.onUpdateRecord===true){
        swal(editUserResponse?.message, {
          icon: "success",
        })
        this.setState({onUpdateRecord:false})
      }else if(editUserResponse.status === 0){
        swal(this.props?.mail?.message, {
          icon: "error",
        })
        this.setState({onUpdateRecord:false})
      }
      
    }
    return (
      <React.Fragment>
        <IndexComponentStyled>
        
          <Link to="#" onClick={() => this.handleModalShowHide()} ><img src={images['edit-icon.png']} /></Link>

          <Modal show={this.state?.showHide}>
            <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
          
            </Modal.Header>
            <Modal.Body>
          
            <div className="modal-body user-management-modal">
              <h1>Edit</h1>
              <form onSubmit={this.onSubmit} autoComplete="off">
               
                <div className="form-group">
                  <input type="text" placeholder="First Name" id="firstName" value={ this.state?.firstName } disabled  />
                  <span style={{ color: 'red' }}>{this.state?.firstNameErr}</span>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Last Name" id="lastName" value={ this.state?.lastName } disabled  />
                  <span style={{ color: 'red' }}>{this.state?.lastNameErr}</span>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Username" value={ this.state?.userName } disabled />
                </div>
               
                <div className="form-group">
               
                  <select className="form-control" id="roles"  value={this.state?.roles} onChange={this.onChange}>
                    <option>Open this select menu {this.state?.roles}</option>
                    { this.state?.role && Object.keys(this.state.role).length !== 0 ? this.getRolesDropdownMenu(this.state.role) : '' }
                  
                  </select>
                  <span style={{ color: 'red' }}>{this.state?.rolesErr}</span>
                </div>
                
                    <div className="form-group">
                  <select className="form-control" id="hierarchyTypes" value={this.state?.hierarchyTypes} onChange={this.onChange} >
                    <option>Open this select menu</option>
                    { this.state?.hierarchyType && Object.keys(this.state?.hierarchyType).length !== 0 ? this.getCentersDropdownMenu(this.state?.hierarchyType) : '' }
                   
                  </select>
                  <span style={{ color: 'red' }}>{this.state?.hierarchyTypeErr}</span>
                </div>
                 
                <div className="form-group">
                  <select className="form-control" id="centerData" value={this.state?.centerData} onChange={this.onChange} >
                    <option>Open this select menu</option>
                    { this.state?.centers && Object.keys(this.state?.centers).length !== 0 ? this.getCentersDropdownMenu(this.state?.centers) : '' }
                   
                  </select>
                  <span style={{ color: 'red' }}>{this.state?.centersErr}</span>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Third Party System" readOnly value={this.state?.third_party_system} />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Third Party ID" readOnly value={this.state?.external_id } />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Email ID" id="email"  value={this.state?.email} disabled />
                  <span style={{ color: 'red' }}>{this.state?.emailErr}</span>
                </div>
                <div className="form-group">
                Last Login : { this.state?.login_time? this.convertDate(this.state?.login_time, 'DD/MM/YYYY') :''}
               
                </div>
           
                <div className="form-group">
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
              </form>
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
    uservalue: state.uservalue,
    usererror: state.usererror,
    email: state.updateUserRecord,
    user: state.user,
    authorized: state.userAuthenticate,
    uservalueloginheaderdata:state.uservalueloginheaderdata,
    updateUserResult: state.updateUserResult
    
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getUserById: (userId) => {
      dispatch(getUserById(userId))
    },
    updateUserById: (userData) => { 
      dispatch(updateUserById(userData))
    },
    getupdateemailverify: (requestdata) => {
      dispatch(updateemailverify(requestdata))
    },
    updateemailwithotp: (requestdata) => {
      dispatch(updateemailwithopt(requestdata))
    },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(BootstrapModal);



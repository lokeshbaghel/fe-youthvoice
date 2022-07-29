import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import IndexComponentStyled from './IndexComponentStyled';
import { getYoungPeopleByName, addYoungPeopleById} from '../../../actions/myaction'
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

  constructor(props) {



    super(props);
    this.state = {
      showHide: false,
      first_name: '',
      last_name: '',
      formErr: '',
      tableToggle:false,
      parent_id:'',
      sub_id:'',
      activePage: 1
      

    }
  }

  

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value })
  }

 

  loginValidate() {
    let err = false;
     if ((this.state.first_name == '') && (this.state.last_name == '')) {
     
      this.setState({ formErr: 'One of the fields is required ' });
      err = true;
    }else {
      this.setState({ formErr: '' });
    }

    return err;
  }

  handleModalShowHide() {
    this.setState({ showHide: !this.state.showHide })
  }



  addYoungPeopleById = async e => {
    
    e.preventDefault();
    const youngPeopleData = {
      parent_id: 1,
      sub_id: this.state.sub_id,
    }
    this.props.addYoungPeopleById(youngPeopleData);
    this.setState({"tableToggle":false});
    this.setState({"successMsgBoolean":true,"successMsg":"Access request sent successfully"});
  }
  



  onSubmit = async e => {
    e.preventDefault();
    const isValid = this.loginValidate();
    
    if (!isValid) {
      this.setState({tableToggle:true});
      const searchData = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
      }
      this.props.getYoungPeopleByName(searchData);
     
    }

  }


  getAllUsersListByName = usersbyname => { 
    return usersbyname.map(user => { 
      return (
        <>
          <tr key = { user?.id } >
            <td>{ `${user?.first_name }` }</td>
            <td>  { `${user?.last_name }` }</td>
            <td><img src={images["tree-icon.png"]}/></td>
             <td> Acorn Park</td>
             <td> <input type="checkbox" id="sub_id" onClick={this.onChange} value={user?.id}/></td>
                            
          </tr>
        </>
      )
    })
  }




  render() {
    const { first_name, last_name } = this.state;
    return (
      <React.Fragment>
        <IndexComponentStyled>
        <button onClick={() => this.handleModalShowHide()}  type="button" className="btn btn-primary purple-btn">Add A Young Person</button>
          <Modal show={this.state.showHide}>
            <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
            
            </Modal.Header>
            <Modal.Body>
               
      <div className="modal-body" id="addYoungPerson">
			<h1>Add A Young Person</h1>
			<form onSubmit={this.onSubmit}>
				<div className="form-group">
					<input type="text" id="first_name" value={first_name} onChange={this.onChange} placeholder="First Name" />
        </div>
				
				<div className="form-group">
					<input type="text" id="last_name" value={last_name} onChange={this.onChange} placeholder="Last Name" />
        </div>
				<button type="submit" class="btn btn-primary"><img src={images["search.svg"]} /></button>
			</form>
      <center><span style={{ color: 'red' }}><h4>{this.state.formErr}</h4></span></center>
  {this.state.tableToggle &&
			<div class="row">
         <div class="col-lg-12 col-md-12">
        
						<div class="young-people-wrapper">
            <button type="submit" onClick={this.addYoungPeopleById} class="btn btn-primary">Add</button>
            <br></br>
								<div class="table-responsive">
							  <table class="table">
								<thead>
								  <tr>
									<th>First Name</th>
									<th>Last Name</th>
                  <th></th>
									<th>Centre</th>
                  <th></th>
								  </tr>
								</thead>
								<tbody>
                {this.props?.usersbyname?.length > 0 ? this.getAllUsersListByName(this.props.usersbyname) : NoData()} 
								 
								</tbody>
							  </table>
							</div>

						</div>
					</div>
				</div>

  }

     
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
    search:state.message,
    email: state.updateUserRecord,
    usersbyname: state.search.list,
    authorized: state.userAuthenticate,
    uservalueloginheaderdata:state.uservalueloginheaderdata
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
    getYoungPeopleByName: (requestdata) => dispatch(getYoungPeopleByName(requestdata)),
    addYoungPeopleById: (requestdata) => dispatch(addYoungPeopleById(requestdata)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BootstrapModal);



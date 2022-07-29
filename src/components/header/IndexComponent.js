import React from 'react';
import IndexComponentStyled from './IndexComponentStyled';
import Dropdown from 'react-bootstrap/Dropdown'
import { Link , Redirect } from 'react-router-dom';
import ReactTooltip from "react-tooltip"; 
import Pagination from "react-js-pagination";
import Moment from 'moment';
import { connect } from 'react-redux';
import { getlogininfodata , userlogout } from './../../actions/myaction';
import { getYoungPeopleHeaderSearch, newNotificationListApi, addYoungPeopleById,updateNotificationStatus } from './../../actions/myaction'
function importAll(r) {
	let images = {};
	r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
	return images;
  }

  const images = importAll(require.context('../../assets/img/', false, /\.(png|jpe?g|svg)$/));
  function   NoData(){
    return(<div style={{textAlign:'center'}}>No data</div>)
  }
  const intialState = { 
    logout:false,
    redir:false,
    redurl:'',
    sub_id:'',
    hidetooltip:false,
    requestsend:false,
    first_name: '',
    activePage: 1,
    afterloginhit:1,
    itemPerPage: 8,
    productList: [],
    duplicateProductList: [],
    notificationListState: false,
    notificationListState: [],
    updateNotificationState: false
  };
class Header extends React.Component
{
  constructor(props) {
    super(props)
    this.state = intialState
    
  }

  componentDidMount(){
 
    // let user=this.props?.uservalueloginheaderdata?.user
    // if(user){
     
     

    //   this.props.getNewNotificationList()
    // }

    this.props.getlogininfodata();
  }

  async componentDidUpdate(prevProps, prevState) {
   
    if(prevState.updateNotificationState === true){
      if (prevState.updateNotificationState === this.props?.updateNotificationResponse?.updateNotificationState) {
      await  this.setState({ notificationListState: this.props?.updateNotificationResponse?.list, updateNotificationState : false})
 
      }
    } 
  }


  onChange = async e => {
   await this.setState({ [e.target.id]: e.target.value });
   await this.setState({hidetooltip:false ,requestsend:true });
    this.onSubmit(e)
    setTimeout(() => {
      this.setState({ requestsend: false });
      this.onSubmit(e)
    }, 20000);
  }

  loginValidate() {
    let err = false;
     if (this.state.first_name == '') {
     
      this.setState({ formErr: 'Search fields is required ' });
      err = true;
    }else {
      this.setState({ formErr: '' });
    }

    return err;
  }

  onSubmit = async e => {
    e.preventDefault();
    const isValid = this.loginValidate();
    

   let loginuserdetail=this.props?.uservalueloginheaderdata?.user
  
    if (!isValid) {
      this.setState({tableToggle:true});
      const searchData = {
        first_name: this.state.first_name,
        parent_id: loginuserdetail.user_id,
      
      }
      this.props.getYoungPeopleHeaderSearch(searchData);
     
    }
  }
  getSurveyStatus = status => {
    const getCircleColor = status === 'On Time' ? 'green-circle' : 'red-circle'
    return (
      <>
        <span className={ `circle ${ getCircleColor }`}></span>
        { status }
      </>
    )
  }
  onChangecheck = e => {
    this.setState({ [e.target.id]: e.target.value })
  }
  
  getAllUsersList = users => { 
    return users.map(user => { 
      return (
        <>
              <tr key = { user?.id } >
          
            <td>
              <Link to={`/young-people-report/${ user?.id }`} className={this.props.leftmenu === 'young-people-report' ? "active" : ''}  >
                { `${user?.first_name }` }  { `${user?.last_name }` }
              </Link>   
            </td>
            <td><img src={user?.logo_location} className="flag-icon" /></td>
            <td>{user?.center }</td>
            
            <td>{user?.town }</td>
           
          </tr>  

        </>
      )
    })
  }

  addYoungPeopleById = async (id) => {
  
    let loginuserdetail=this.props?.uservalueloginheaderdata?.user
  
    const youngPeopleData = {
      parent_id: loginuserdetail.user_id,
      sub_id: id,
    }
    this.props.addYoungPeopleById(youngPeopleData);
    this.setState({"tableToggle":false});
    this.setState({"successMsgBoolean":true,"successMsg":"Access request sent successfully"});
  }
  


  profile = async (url) => {
    
      this.setState({redir:true,redurl:url})
    
  }
  logout = async e => {

    let userdata={"idToken":2};
    await this.props.logout(userdata);
    localStorage.clear();
    this.setState({logout:true})
 
  }
  handlePageChange(pageNumber) {
  
    this.setState({activePage: pageNumber});
  }
  onMarkAsRead = data => {
    
    const requestData = {
      id: data.userNotificationTableId,
      userId: data.userId
    }
    this.props.updateNotificationStatus(requestData)
    this.setState({ updateNotificationState: true})
  }

  getNotificationDropdownMenu = notifications => {
    return notifications.map(notification => {
      return (
        <>
        <Dropdown.Item onClick={() => this.onMarkAsRead(notification) } className={notification.status_id==1?"unread":"read"} >{notification?.text}</Dropdown.Item>
        </>
      )
    })
  }



  integrateNotificationList = notifications => {


 let cnt=0;

 {notifications.map((i)=>(
  i.status_id==1?cnt++:''
   ))}
 
    return (
      <>

      
<Dropdown className="notification_wrapper">
  <Dropdown.Toggle id="dropdown-basic">
    <span className="notification-count"> 
   {cnt}
  </span>
  <img src={images["notification-icon.svg"]}/>
  </Dropdown.Toggle>

  <Dropdown.Menu>
  <div className="notification-header">
    <span className="noti-heading">Notification </span>
    
  </div>
  <div className="item-wrap">
  { notifications && Object.keys(notifications).length !== 0 ? this.getNotificationDropdownMenu(notifications) : '' }
 
  </div>
  </Dropdown.Menu>
</Dropdown>

      </>
    )
    
  }
  render()
  {
   
    const {  activePage, itemPerPage } = this.state;
    const projectList=this.props?.users;
    const indexOfLastTodo = activePage * itemPerPage;
    const indexOfFirstTodo = indexOfLastTodo - itemPerPage;
    const renderedProjects = projectList?.slice(indexOfFirstTodo, indexOfLastTodo);


    const { first_name } = this.state;
    if (this.state.redir==true) { return <React.Fragment><Redirect to={this.state.redurl} />{ this.setState({redir:false})}</React.Fragment> }
    let token = localStorage.getItem('token')
 
  let user=this.props?.uservalueloginheaderdata?.user

   if(this.props.uservaluelogin && this.state.afterloginhit==2){
  this.setState({afterloginhit:3})
}     if (!token) return <Redirect to='/' />
    return(
      <React.Fragment>
        <IndexComponentStyled>
          { !token?  <Redirect to='/' /> :''}
          <header id="header" className="second-header">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-4 header-left">	 
                  <img className="logo-small" src={images['logo.png']} />
                </div>
                <div className="col-md-8 header-right">	
                
                  <form  id="searchform" onSubmit={this.onSubmit} data-for={this.state.hidetooltip?"":"sadFace"}  data-tip="no data" autoComplete="off"  >
                    <label className="sr-only" for="s">Search</label>
                    <div className="input-group">
                      <input type="text" id="first_name" value={first_name} onChange={this.onChange} onClick={ async () => await this.setState({hidetooltip:false})} autoComplete="off"  event="focus"  className="form-control search-form-control"   placeholder="Search..." aria-label="Search"  data-tip="no data" data-for={this.state.hidetooltip?"":"sadFace"} />
                      <div className="input-group-append">
                        <button  type="submit"  className="btn btn-primary" id="searchsubmit" name="submit" >
                          <img className="search-icon" src={images['search.svg']}  />
                        </button>
                      </div>
                    </div>
                  </form>
                
                  
                  <Dropdown>
                    <Dropdown.Toggle variant="default" id="dropdown-basic">
                      <span>{ user?.username?user?.username:"Catherine Pepper"}</span>
                      <img className="user-icon" src={images['user.png']} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => this.setState({redir:true,redurl:'/profile'}) }      >My Profile</Dropdown.Item>
                      <Dropdown.Item onClick={this.logout} >Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </header>
         
          <ReactTooltip id={this.state.hidetooltip ? "happy" : "sadFace"} place="bottom"  type="info" event="click focus" 
            effect="solid" scrollHide="true" clickable="true" eventOff={'focusOut doubleClick'} globalEventOff={'click'}  >
            { this.props?.users?.length > 0 && this.state.first_name.length > 0 && this.state.hidetooltip===false ?
          this.props?.users?.length > 0 && this.state.first_name.length > 0 ?
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <div className="young-people-wrapper">
                 
                    <button   className="close-tooltip btn btn-primary pull-right"                   
                        onClick={ async ()=>{ await this.setState({hidetooltip:true})}}
                        >Exit</button>
                        <div className="table-responsive">
                        
                         
      { this.state.requestsend==true && this.props?.search==='Access request sent successfully' && <center><span style={{ color: 'green' }}><h4>{this.props?.search}</h4></span></center> }
                      
                        <table className="table">
                        <thead>
                        <tr>
                          <th>Name</th>
                          <th></th>
                          <th>Centre</th>
                           <th>Town</th>
                     
                        
                        </tr>
                        </thead>
                        <tbody>
                        
                        {this.props?.users?.length > 0 ? this.getAllUsersList(renderedProjects) :""} 
                      </tbody>
                        </table>
                      </div>
                      <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.itemPerPage}
                        totalItemsCount={this.props?.users?.length}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange.bind(this)}
                    />
                  </div>
                </div>
              </div>
              : <span className="nodata">No Data Found</span>
              : <span className="nodata">No Data Found</span> 
            }
          </ReactTooltip>
       </IndexComponentStyled>
    </React.Fragment>
      );
  }
}
const mapStateToProps = (state) => {
  return {
    search:state.message,
    users: state.search.list,
    users: state.searchData.list,
    authorized: state.userAuthenticate,
    notificationList: state.newNotificationList,
    uservaluelogin: state.uservalue,
    uservalueloginheaderdata:state.uservalueloginheaderdata,
    updateNotificationResponse: state.updateNotificationStatusResponse
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: (requestdata) => {
      dispatch(userlogout(requestdata))
    },
    getYoungPeopleHeaderSearch: (requestdata) => dispatch(getYoungPeopleHeaderSearch(requestdata)),
    getNewNotificationList: () => dispatch(newNotificationListApi()),
    getlogininfodata: () =>{ dispatch(getlogininfodata())},
    updateNotificationStatus: (requestData) => dispatch(updateNotificationStatus(requestData)),
    addYoungPeopleById: (requestdata) => dispatch(addYoungPeopleById(requestdata)),
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);

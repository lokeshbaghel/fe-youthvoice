import React from 'react';
import { connect } from 'react-redux';
import IndexComponentStyled from './IndexComponentStyled';
import { fetchAllCenter } from '../../actions/myaction';
import Header from '../../components/header'
import Leftbar from '../../components/leftbar'
import Graph from '../../components/userreportgraph'
import BARGraph from '../../components/barchart'
import { Redirect } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import Moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/style.css';
import Fade from 'react-reveal/Fade';
import $ from 'jquery';

const intialState = {
  email: '',
  password: '',
  emailErr: '',
  passwordErr: '',
  dropdate:'',
  afterloginhit:1,
  agefrom:1,
  ageto:18,
  open:false,
  filterapply:0,
  center: [],

};
let newState = [];

class Profile extends React.Component {

  constructor(props) {
    super(props)
    this.state = intialState
    
    
  }
  onChange = async e => {
    await this.setState({ [e.target.id]: e.target.value })
    await this.setState({filterapply:1})
   
   }
   handleChange = async (center) => {
    await this.setState({ center });
    await this.setState({filterapply:1})
   
  }
  setopen = e => {
    if(this.state.open==true)
    this.setState({open:false })
    else
    this.setState({open:true })
  }
    
  getCentersDropdownMenu = centers => {
    return centers.map(center => {
      return (
        <>
          <option value={center.id}>{center.description}</option>
        </>
      )
    })
  }

  //Get centers select Box
  optionsdata = centers => {
    newState = [];
    return centers.map(center => {
              newState.push({ value: center.id, label: center.description})
    })
  }
  setdate =date =>{
    this.setState({dropdate:date })
  }
 async componentDidMount() {
    $(document).ready(function () {
      var trigger = $('.hamburger'),
        overlay = $('.overlay'),
        isClosed = false;

      trigger.click(function () {
        hamburger_cross();
      });

      function hamburger_cross() {

        if (isClosed == true) {
          overlay.hide();
          trigger.removeClass('is-open');
          trigger.addClass('is-closed');
          isClosed = false;
        } else {
          overlay.show();
          trigger.removeClass('is-closed');
          trigger.addClass('is-open');
          isClosed = true;
        }
      }

      $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
      });
    });


    const progress = document.querySelector('.progress-done');
    if (progress) {
      progress.style.width = progress.getAttribute('data-done') + '%';
      progress.style.opacity = 1;
    }
    var date = new Date();
  this.setState({ dropdate:date });
  let loginuserdetail=this.props?.uservalueloginheaderdata?.user
  if(loginuserdetail ){ 
    await this.props.fetchAllCenter(loginuserdetail)

   
   }
  }
  buildOptions(data) {
    var arr = [];
if(data==='from')
{
  for (let i = 1; i <= 18; i++) {
    arr.push(<option key={i} value={i}>{i}</option>)
  }
}
else
{
  for (let i = 18; i >= 1; i--) {
    arr.push(<option key={i} value={i}>{i}</option>)
   }
}
   

    return arr; 
}

convertDate = (fetchedDate, format) => {
  const momentDate = Moment(fetchedDate);
  return momentDate.format(format)
}

  render() {
    const { center } = this.state;
    let condeta=this.convertDate(this.state?.dropdate, 'YYYY/MM')
    let grapfilter={
  month:12,
  date:condeta,
  startage:this.state.agefrom,
  endage:this.state.ageto,
  center:this.state.center,
  filterapply:this.state.filterapply,
  user_id:1
}

let loginuserdetail=this.props?.uservalueloginheaderdata?.user
if(loginuserdetail && this.state.afterloginhit==1){ 
   this.props.fetchAllCenter(loginuserdetail)

  this.setState({afterloginhit:2})
 }
    let token = localStorage.getItem('token');
    if (!token) return <Redirect to='/' />
    return (

      <React.Fragment>

        <IndexComponentStyled>

        { !token?  <Redirect to='/' /> :''}
        <main id="main">
          <div id="wrapper">
          <Header />
            {/* Sidebar */}
            <Leftbar />
            {/* /#sidebar-wrapper */}
            {/* Page Content */}
            <Fade bottom>
       
            {/* Page Content */}
            <div className="page-content-wrapper user-report" data-aos="fade-up">
              
              <div className="container-fluid">
                <div className="row">
    
                  <div className="col-lg-12 col-md-12">
                 
                    <div className="dropdown-container">
                    <div class="custom-calendar-option">
                    <span>Date</span>
                    <DatePicker
                      selected={this.state?.dropdate}
                      onChange={date =>this.setState({dropdate:date ,filterapply:1 }) }
                      dateFormat="MM/yyyy"
                      showMonthYearPicker
                    />
                  </div>
                <div class="custom-select-option">
                <span>Centre</span>
              

                  { this.props?.allcenters && Object.keys(this.props?.allcenters).length !== 0 ? this.optionsdata(this.props?.allcenters) : '' }
                  <Select
                    className="form-select select-option selectopt"
                    isMulti
                    value={center}
                    onChange={this.handleChange}
                    id="center" 
                    options={newState}
                  />


                </div>
                <div class="custom-select-option">
                  <span>Age From</span>
                <select className="form-select selectopt small-box" id="agefrom"  value={this.state?.agefrom} onChange={this.onChange}>
                    {this.buildOptions('from')}
                </select>
                </div>    
                <div class="custom-select-option">
                  <span>Age To</span>
                <select className="form-select selectopt small-box" id="ageto" value={this.state?.ageto} onChange={this.onChange}>
                    {this.buildOptions('to')}
                </select>
                </div>  

                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="white-curve-box">
                    <Graph graphData={grapfilter} /> 
                    

                    </div>
                  </div>

                </div>
                <div className="row custom-graph">
                 < BARGraph graphData={grapfilter} />
                </div>
              </div>
            </div>
           </Fade>
          </div>
          {/* /#page-content-wrapper */}
          {/* /#wrapper */}
        </main>{/* End #main */}
        {/* ======= Footer ======= */}
        <footer id="footer">
        </footer>{/* End Footer */}
        

  </IndexComponentStyled>


      </React.Fragment >

    );
  }
}

const mapStateToProps = (state) => {
  return {
    uservalue: state.uservalue,
    usererror: state.usererror,
    email: state.updateUserRecord,
    uservalueloginheaderdata:state.uservalueloginheaderdata,
    allcenters:state?.allcenters?.centers
  }


}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllCenter: (user) => {
      dispatch(fetchAllCenter(user))
    },
   
}
}

export default connect(mapStateToProps ,mapDispatchToProps)(Profile);






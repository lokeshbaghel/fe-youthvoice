import React from 'react';
import {Line} from 'react-chartjs-2';
import { connect } from 'react-redux';
import {dashboardGraphData} from '../../actions/myaction'

function NoData() {
  return (<div style={{ textAlign: 'center' }}>No data</div>)
}


class dashboardGraph extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cnt:0,
      labels: [],
      datasets: [
        {
          label: 'Surveys',
          fill: true,
          lineTension: 0.5,
          backgroundColor: '#E0ECFE',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
           data: []
        }
      ],
      options:[{
        title:{
          display:true,
          text:'',
          fontSize:20
        },
        legend:{
          display:true,
          position:'right'
        }
      }],
     
    }
  }



getAllGraphData = users => {

  return users.map(user => { 
    return (
      this.state.cnt==0?<React.Fragment>
     <React.Fragment> 
       {this.setState({cnt:1})}
       { this.state.labels.push(user?.dateName)}
     { this.state.datasets[0].data.push(user?.totalCount)}
     </React.Fragment>
     </React.Fragment>:''
    )
    
  })
  
  
}

  componentDidMount() {
     this.props.dashboardGraphData();
   }
  render() {
    return (
      <div >
           {this.props?.data?.length > 0 ? this.getAllGraphData(this.props?.data) : NoData()} 
           <Line
          data={this.state}
          options={this.state.options}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.dashboardgraph.list,
    authorized: state.userAuthenticate,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    dashboardGraphData: () => {
      dispatch(dashboardGraphData())
    },
   
    
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(dashboardGraph);
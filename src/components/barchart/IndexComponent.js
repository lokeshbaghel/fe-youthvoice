import React, { Component } from "react";
import AppStyledId from './IndexComponentStyled'
import Chart from "react-apexcharts";
import baseURL from "../../axios/baseURL";
import { Redirect } from 'react-router-dom';
import Loader from "react-loader-spinner";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
          
      series: [],
     
      options: {
        chart: {
          toolbar: {
            show: false
          },
          width: 380,
          type: 'pie',
        },
        legend: {
          position: 'left',
          fontWeight: 400,
          itemMargin: {
            horizontal: 10,
            vertical: 5
        },
        width: 200,
        },
        
        
        
        fill: {
          colors: ['#23B899', '#7A79FF', '#333FFF'],
        },
        colors: ['#23B899', '#7A79FF', '#333FFF'],
        title: {
          text: 'Help me be healthy and enjoy life',
         },
       labels: ['Positive', 'Neutral', 'Negative'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 500
            },
            legend: {
              position: 'left'
            }
          }
        }]
      },
      dataForChart: { },
    
    };
    
  }
  async setData() {
    try {
      let { graphData } = this.props;
      let newState = { ...this.state };

      newState = 
        {
          dataForChart: graphData,      
        };
      
    
     await this.setState(newState);
      
    } catch (error) {
      
    }
  }
  async componentDidUpdate(prevProps) {
    if (prevProps.graphData !== this.props.graphData) {
      await  this.setData();
      if(Object.keys(this.state?.dataForChart).length && this.state?.dataForChart?.filterapply > 0)
      await this.getGraphDataReqFilterUpdate(this.state?.dataForChart)
    }
  }



  getGraphDataReqFilterUpdate = async (userData) =>{

    let tokens = await JSON.parse(localStorage.getItem('token'));
    if(tokens){
      
     
      const token = tokens.accessToken;
    
     baseURL.post(`/buildquestionresponsegraphdatafilter`,userData, {
  
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
      if( response?.data  )
       {
           await  this.setState({series:response?.data?.data });
           
       }
          
     
        }).catch((error) => {
          
       });

      } 
    }


  getGraphDataReq = async () =>{

    let tokens = await JSON.parse(localStorage.getItem('token'));
    if(tokens){
      
      let userData={questnaire_id:1, user_respondent_id:109 }
      const token = tokens.accessToken;
    
     baseURL.get(`/buildquestionresponsegraphdata/1`, {
  
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
      if( response?.data  )
       {
           await  this.setState({series:response?.data?.data });
       }
          
     
        }).catch((error) => {
         
       });


      } 
    }
 async componentDidMount() {
   await this.getGraphDataReq();
  }
  render() {
    let options= this.state.options
    const token = localStorage.getItem('token')
    return (
      <AppStyledId>
      {!token ? <Redirect to='/' /> : ''}      
      { 
      this.state?.series?.length>0?
      this.state?.series.map((dynamicData, Key) => {
      let keys = Object.keys(dynamicData);
      let d = dynamicData;
   
      return dynamicData?.name !==undefined && dynamicData.data.length >0 ?
   
      <React.Fragment>
         {this.state?.series?.length > 0 ? '' : this.state?.series?.length == 0 ?'':<Loader type="HashLoader" color="blue" className="loader"/>}
      <div className="col-lg-6 col-md-12">
                    <div className="white-curve-box small">
      <div className="mixed-chart">
      { options.title.text= dynamicData?.name }
            <Chart
              options={options}
              series={dynamicData?.data} 
              type="pie"
              width="100%"
            />
        </div>
        </div>
                  </div>
      </React.Fragment>
    
    :''
   

})
:''
}  

    
      </AppStyledId>
    );
  }
}
export default App;


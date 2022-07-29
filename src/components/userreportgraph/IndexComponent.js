import React, { Component } from "react";
import AppStyledId from './IndexComponentStyled'
import Chart from "react-apexcharts";
import baseURL from "../../axios/baseURL";
import { Redirect } from 'react-router-dom';
import Loader from "react-loader-spinner";
import { connect } from 'react-redux';
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      responsive: [],
      options: {},
      dataForChart: { },
      series: [],
     
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
      if(Object.keys(this.state?.dataForChart).length && this.state?.dataForChart.filterapply===1)
      await this.getGraphDataReqFilterUpdate(this.state?.dataForChart)
    }
  }

  getGraphDataReqFilterUpdate = async (userData) =>{

    let tokens = await JSON.parse(localStorage.getItem('token'));
    if(tokens){
     
      const token = tokens.accessToken;
    
     baseURL.post(`/buildincompletecompletesurveygraphdatafilter`,userData, {
  
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
         await  this.setState({series:response?.data?.data })
         await this.setState({responsive:
          {
            breakpoint: 1000,
            width:"800",
            options: {
          
              markers: {
                size: 0,
                hover: {
                  size: 0
                }
              },
              colors: ['#333FFF','#d21717'],
          
              dataLabels: {
                enabled: false
              },
             
              legend: {
                horizontalAlign: 'left'
              },
              fill: {
               opacity:1,
                colors: ['#333FFF','#d21717'],
                
              },
              chart: {
                type: 'area',
                height: 450,
                zoom: {
                  enabled: false
                },
                
                toolbar: {
                  show: false,
                  tools: {
                    download: false
                  }}
              },
           stroke: {
                colors: ['#333FFF','#d21717'],
                curve: 'straight'
              },
       
          sparkline: {
                enabled: true,
      
            },
           yaxis: {
              opposite: true
            },
              xaxis: {
                categories: response?.data?.data[0]?.month
              },
           
            },
          }})
         await this.setState({options: {
          title: {
            text: 'Surveys Completed vs Surveys Missed',
            align: 'left',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
              fontSize:  '20px',
              fontWeight:  'normal',
              fontFamily: 'ProximaSoft',
              color:  '#263238',
             
            },
        },
          markers: {
            size: 0,
            hover: {
              size: 0
            }
          },
         
          colors: ['#333FFF','#d21717'],
          dataLabels: {
            enabled: false
          },
         
          legend: {
            horizontalAlign: 'left'
          },
          fill: {
           opacity:1,
            colors: ['#333FFF','#d21717'],
            
          },
          chart: {
            type: 'area',
            height: 250,
            zoom: {
              enabled: false
            },
            toolbar: {
              show: true,
              tools: {
                download: false
              }}
          },
          stroke: {
            colors: ['#333FFF','#d21717'],
            curve: 'straight'
          },
   
      sparkline: {
            enabled: true,
  
        },
       yaxis: {
          opposite: true
        },
        xaxis: {
         categories: response?.data?.data[0]?.month
          },
       
        }});
        }
        
     
        }).catch((error) => {
          
       });


      } 
    }


  getGraphDataReq = async () =>{

    let tokens = await JSON.parse(localStorage.getItem('token'));
    if(tokens){
    
      let user=this.props?.uservalueloginheaderdata?.user
      
      let userData={user_id:user?.user_id, user_respondent_id:109 }
      const token = tokens.accessToken;
    
     baseURL.get(`/buildincompletecompletesurveygraphdata/${user?.user_id}`, {
  
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
         await  this.setState({series:response?.data?.data })
         await this.setState({responsive:
          {
            breakpoint: 1000,
            width:"800",
            options: {
            markers: {
                size: 0,
                hover: {
                  size: 0
                }
              },
              colors: ['#333FFF','#d21717'],
          
              dataLabels: {
                enabled: false
              },
             
              legend: {
                horizontalAlign: 'left'
              },
              fill: {
               opacity:1,
                colors: ['#333FFF','#d21717'],
                
              },
              chart: {
                type: 'area',
                height: 450,
                zoom: {
                  enabled: false
                },
                
                toolbar: {
                  show: false,
                  tools: {
                    download: false
                  }}
              },
           stroke: {
                colors: ['#333FFF','#d21717'],
                curve: 'straight'
              },
       
          sparkline: {
                enabled: true,
      
            },
           yaxis: {
              opposite: true
            },
              xaxis: {
                categories: response?.data?.data[0]?.month
              },
           
            },
          }})
         await this.setState({options: {
          title: {
            text: 'Surveys Completed vs Surveys Missed',
            align: 'left',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
              fontSize:  '20px',
              fontWeight:  'normal',
              fontFamily: 'ProximaSoft',
              color:  '#263238',
             
            },
        },
          markers: {
            size: 0,
            hover: {
              size: 0
            }
          },
         
          colors: ['#333FFF','#d21717'],
          dataLabels: {
            enabled: false
          },
         
          legend: {
            horizontalAlign: 'left'
          },
          fill: {
           opacity:1,
            colors: ['#333FFF','#d21717'],
            
          },
          chart: {
            type: 'area',
            height: 250,
            zoom: {
              enabled: false
            },
            toolbar: {
              show: true,
              tools: {
                download: false
              }}
          },
          stroke: {
            colors: ['#333FFF','#d21717'],
            curve: 'straight'
          },
   
      sparkline: {
            enabled: true,
  
        },
       yaxis: {
          opposite: true
        },
        xaxis: {
         categories: response?.data?.data[0]?.month
          },
       
        }});
        }
        
     
        }).catch((error) => {
          
       });


      } 
    }

    
 async componentDidMount() {
   await this.getGraphDataReq();
   await this.setData();
  }

 render() {
  let token = localStorage.getItem('token')
 
  let options=this.state.options;
 
    return (
      <AppStyledId>
        { !token?  <Redirect to='/' /> :''}
        {this.state?.series?.length > 0 ? '' : this.state?.series?.length > 0 ?'':<Loader type="HashLoader" color="blue" className="loader"  />} 
      <div className="app">
       
          <div className="mixed-chart">
          <div class="filter-btn">
        
          </div>
          
        
         <Chart
              options={this.state.options}
              series={this.state.series}
              responsive={this.state.responsive}
              type="area"
              width="100%"
              height="450"
          />
          
         </div>
       

      </div>
      </AppStyledId>
    );
  }
}
const mapStateToProps = (state) => {
  return {
  
    uservalueloginheaderdata:state.uservalueloginheaderdata
  }
}


export default connect(mapStateToProps)(App);



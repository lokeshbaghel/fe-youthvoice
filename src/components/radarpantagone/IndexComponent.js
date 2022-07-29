import React, { Component } from "react";
import AppStyledId from './IndexComponentStyled'
import Chart from "react-apexcharts";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getGraphData} from '../../actions/myaction'
import Collapse from "react-bootstrap/Collapse";
import swal from 'sweetalert';
import baseURL from "../../axios/baseURL";
class App extends Component {
constructor(props) {
    super(props);

    this.state = {
      dataForChart:{},
      open: false,
      id : this.props.id,
      type : this.props.type,
      userid: this.props.userid,
      surveyresponse:this.props.surveyresponse,
      options: {
     

      scale: {
        ticks: {
            beginAtZero: true,
            min: 5
        }
    },
      grid: {
        show: true,
        borderColor: '#90A4AE',
        strokeDashArray: 0,
        position: 'back',
        xaxis: {
            lines: {
                show: false
            }
        },   
        yaxis: {
            lines: {
                show: false
            }
        },  
        row: {
            colors: undefined,
            opacity: 0.5
        },  
        column: {
            colors: undefined,
            opacity: 0.5
        },  
          padding: {
              top: 0,
              bottom: -60,
              left: -75,
              right: -75,

          }, 
    },



        colors : ['#cb0cb8', '#d21717', '#291cd9'],
        markers: {
          size: 0,
          hover: {
            size: 10
          }
        },
        stroke: {
          show: true,
           width: 4,
          colors: ['#cb0cb8', '#d21717', '#291cd9'],
          dashArray: 0
        },
       
        fill: {
          opacity: 0,
          colors: ['#cb0cb8', '#d21717', '#291cd9'],
          
        },
        chart: {
          toolbar: {
            show: true,
            tools: {
              download: false
            }},
          
        type: 'radar',
        },
        dataLabels: {
          enabled: true
        },
        plotOptions: {
          radar: {
          
            polygons: {
              strokeColors: '#8b5583',
              strokeWidth: 0,
              fill: {
               
               colors: [ '#00BC5A' , '#BBE445' , '#FFD93B', '#FA9A26','#F2323F'],
              }
            }
          }
        },
        title: {
          text: '',
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
        sparkline: {
          enabled: false,

      },

        xaxis: {
       
         categories: ['1', '2', '3','4', '5'],
       
        },

        
        yaxis: {
          show: false,
          tickAmount: 5,
          max:5,
          categories: [1, 2, 3, 4,5]
        },

        responsive: [{
          breakpoint: 2500,
          options: {
            chart: {
              width: "100%",
            },
          },
       },
    ],

  },
    
      series: [  ],
     
     };
  }

  setopen = async (data) => {
    if (this.state.open == data) await this.setState({ open: false });
    else await this.setState({ open: data });
  }; 

  async setData() {
    try {
      let { graphData ,userid } = this.props;
      let newState = { ...this.state };
       newState = 
           {
             dataForChart: graphData, 
             userid:userid     
           };
           
       await this.setState(newState);
     
    } catch (error) {
      
    }
  }
  getSurveyQuestionAnswer = (surveyResponses ,module_id) => {
    
    const AnswerIcons = {
      2 : 'light-green-circle circle',
      4: 'orange-circle circle',
      3: 'yellow-circle circle',
      1: 'green-circle circle',
      5: 'red-circle circle'
    }
    let cnt=1;
    return surveyResponses.map((surveyResponseAttribute) => {
     
      return (
        
        module_id===surveyResponseAttribute.module_id?<React.Fragment>
      
                  {surveyResponseAttribute.name}
       
                {surveyResponseAttribute.questions_answers.length > 0 ? (
                  <>
                    {(() => {
                      return surveyResponseAttribute.questions_answers.map(
                        
                        (data, index) => (
                          
                          <div className="card-body" key={index}>
                            <div className="question-text">
                            
                            
                              {data.question}

                            </div>
                           
                        
                          </div>
                        )
                      );
                    })()}
                  </>
                ) : (
                  ""
                )}
           
        </React.Fragment>
       
        :""
      );
    });
  };


  async componentDidUpdate(prevProps) {
    if (prevProps.graphData !== this.props.graphData) {
      await  this.setData();
      if(Object.keys(this.state?.dataForChart).length )
      await this.getGraphDataReq()
    }
  }
  getGraphDataReq = async () =>{
    
    const words=[];
    let mainreports=[];
    let userData={};
    let tokens = await JSON.parse(localStorage.getItem('token'));
    if(tokens){
     

      if(Object.keys(this.state?.dataForChart).length ){
    
        await  this.state?.dataForChart?.map( async dataForChart => {
          
            return(
            
                await   words.push(dataForChart.value.split('-'))
               
            )
    
      })
      const wordsdata=[];
      const wordsdata2=[];
      words.map( async dataForChart => {
    
        await   wordsdata.push(dataForChart[0])
        if(wordsdata2.length<1)
        await   wordsdata2.push(dataForChart[1])
         })

     
       if(wordsdata && wordsdata2)
       {
        
         userData={questnaire_id:wordsdata2, user_respondent_id:wordsdata,userid:this.state.userid }
         
       }
      }
       else{
        if(this.state.id){
          mainreports=this.state.id.split('-')
        }
       
        const qustid=[];
        if(mainreports[1]!==undefined && mainreports[0]=='1111654312')
        {
        
          qustid.push(mainreports[1]);
        }
        if(mainreports[1]==undefined)
        {
          qustid.push(this.state.id); 
        }
        
         userData={questnaire_id:qustid, user_respondent_id:[this.state.type] ,userid:this.state.userid }
      }
  
      const token = tokens.accessToken;
      baseURL.post(`/getreportgraphdata`,userData, {
    
      headers: {
          'Authorization': token,
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
      }
    })
     .then(async (response) => {
      
      if( response?.data  ){
        if(response?.data?.data.length>0){
          await  this.setState({series:response?.data?.data })
        }
        else{
          swal(response?.data?.message, {
            icon: "warning",
          })
         
        }
        
        }
        if( response?.data?.statusCode === 404){
          localStorage.clear();
  
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
   let option=this.state.options;
   let token = localStorage.getItem('token')
   
   return (
      <AppStyledId>
         
         { !token?  <Redirect to='/' /> :''}            
                  
      { 
      this.state?.series?.length>0?
this.state?.series.map((dynamicData, Key) => {
 return  dynamicData?.series?.length > 0  ?
  <React.Fragment>
   
   
   <div className="col-lg-6 col-md-6 custom-radar">
    <div className="white-curve-box">
      <div className="mixed-chart">
      { option.title.text= dynamicData?.module_name }
        <Chart
          options={option}
          series={dynamicData?.series} 
          type="radar"
          width="100%"
          
        />
    </div>
  </div>
</div>

<div className="col-lg-6 col-md-6 custom-radar right-content">
                        <div className="white-curve-box">
                          <div className="search-user-head">
                            <h2>
                              <span>Statement Text</span>
                            </h2>
                          </div>
                          <div
                            id="accordion"
                            className="custom-accordion-third"
                          >
                            {this.props?.surveyresponse?.list?.length > 0
                              ? this.getSurveyQuestionAnswer(
                                  this.props?.surveyresponse.list ,dynamicData?.module_id 
                                )
                              : ""}
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
const mapStateToProps = (state) => {
  return {
    series: state?.grapgdatareport,
    usererror: state?.usererror,   
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getGraphDataReq: (requestdata) => {
      dispatch(getGraphData(requestdata))
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);





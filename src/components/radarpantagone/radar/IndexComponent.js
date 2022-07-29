
import React, { Component } from "react";
import Chart from "react-apexcharts";
import baseURL from "../../../axios/baseURL";
import { Redirect } from 'react-router-dom';
import AppStyledId from './IndexComponentStyled'
import swal from 'sweetalert';
class App extends Component {
  constructor(props) {
    super(props);



    
    this.state = {
      dataForChart:{},
      id : this.props.id,
      type : this.props.type,
      userid: this.props.userid,
      options: {
        markers: {
          size: 0,
          hover: {
            size: 10
          }
        },
        
        colors : ['#cb0cb8', '#d21717', '#291cd9'],
      
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


        stroke: {
          show: true,
          width: 5,
          colors: ['#cb0cb8', '#d21717', '#291cd9'],
       
          dashArray: 0
        },
 
        dataLabels: {
          enabled: true
        },
        fill: {
          
          opacity: 0,
      
         colors: [ '#00BC5A' , '#BBE445' , '#FFD93B', '#FA9A26','#F2323F'],
         

    
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
        chart: {
          toolbar: {
            show: false
          },
            type: 'radar',
        },
        tooltip: {
          enabled: true,
          offsetX: 0,
      },
        xaxis: {

          categories: ['Keep me safe and care well for me',
          ['Help me get a good  education', '(achieve and enjoy)'],
          // 'Help me get a good  education (achieve and enjoy)', 
          'Help me be healthy and enjoy life',
           
           ['Support my future and', 'my next adventure'],
         //  'Support my future and my next adventure'
          ]

            
        },
        yaxis: {
        show: false,
        tickAmount: 5,
        max:5,

        categories: ['1', '2', '3', '4','5'],
       
        }
      },
      series: [
        {
          data: []
        },
       
        
        
      ]


    };
  }


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

  async componentDidUpdate(prevProps) {
    if (prevProps.graphData !== this.props.graphData) {
      await  this.setData();
      if(Object.keys(this.state?.dataForChart).length )
      await this.getGraphDataReq()
    }
  }

  getGraphDataReq = async () =>{
    
    const words=[];
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
      
         userData={questnaire_id:wordsdata2,survey_id :wordsdata,user_respondent_id:this.state.userid }
    
       }
      }
       else{

        let mainreports=[];
        if(this.state.id){
          mainreports=this.state.id.split('-');
        }
        
        userData={questnaire_id:mainreports[1] && mainreports[0]=='1111654312' ?mainreports[1]:[this.state.id],survey_id :[this.state.type] ,user_respondent_id:this.state.userid }
      }
  
      const token = tokens.accessToken;
      baseURL.post(`/countanswerquestions`,userData, {
   
  
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
    let token = localStorage.getItem('token')
    return (
      <AppStyledId>
        <React.Fragment>
          { !token?  <Redirect to='/' /> :''}
          <div className="mixed-chart">
           <Chart
              options={this.state?.options}
              series={this.state?.series}
              type="radar"
              width="100%"
              
            />
       </div>
      </React.Fragment>
      </AppStyledId>
    );
  }
}

export default App;


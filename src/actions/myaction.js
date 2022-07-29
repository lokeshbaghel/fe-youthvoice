
import baseURL from "../axios/baseURL";

export const leftmenu = (userData) => dispatch => {
  dispatch({
    type: 'GET_SIDEBAR',
    payload: userData
  })
}
export const youngpeoplename = (userData) => dispatch => {
  dispatch({
    type: 'GET_YOUNGPEOPENAM',
    payload: userData
  })
}











export const getlogininfodata = () => async dispatch => {
const data={}
  let tokens = await JSON.parse(localStorage.getItem('token'));
  const token = tokens.accessToken;
  dispatch({
    type: 'SETLOADDERFLAG',
    payload: true
  })

  baseURL.post(`/getlogininfo`, data , {
    headers: {
        'authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
  })


 
    .then(async res => {
      dispatch({
        type: 'SETLOADDERFLAG',
        payload: false
      })
      const response = res.data;
      if (response.statusCode === 200) {
       
        dispatch({
          type: 'GET_USERLOGININFO',
          payload: res?.data?.result?.res
        })
      } 
      else if(response.statusCode === 401){
        dispatch({
          type: 'GET_USER_ERR',
          payload: response.message
        })
      }
      else {
        dispatch({
          type: 'GET_USER_ERR',
          payload: response.result.message
        })
      }
  
    })

    .catch(err => {
      
      dispatch({
        type: 'GET_USERERR',
        payload: 'User not found.'
      })
    })
}

export const login = (userData) => dispatch => {
  dispatch({
    type: 'SETLOADDERFLAG',
    payload: true
  })
  baseURL.post(`/login`, userData)
    .then(async res => {
      dispatch({
        type: 'SETLOADDERFLAG',
        payload: false
      })
      const response = res.data;
      if (response.statusCode === 200) {
        await localStorage.setItem('token', JSON.stringify(res?.data?.result?.res?.token))
       
        dispatch({
          type: 'GET_USER',
          payload: res?.data?.result?.res
        })
      } 
      else if(response.statusCode === 401){
        dispatch({
          type: 'GET_USER_ERR',
          payload: response.message
        })
      }
      else {
        dispatch({
          type: 'GET_USER_ERR',
          payload: response.result.message
        })
      }
  
    })

    .catch(err => {
      
      dispatch({
        type: 'GET_USERERR',
        payload: 'User not found.'
      })
    })
}


export const userlogout = (userData) => dispatch => {

  let tokens = JSON.parse(localStorage.getItem('token'));
  const token = tokens?.accessToken;
  baseURL.post(`/logout`, userData, {
    headers: {
        'authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
  })
    .then(res => {
      localStorage.clear();
       dispatch({
        type: 'GET_USER',
        payload: res
      })

    })

    .catch(err => {
      
      dispatch({
        type: 'GET_USERERR',
        payload: 'User not found.'
      })
    })
}


export const updateuserpassword = (userData) => async dispatch => {
  let tokens = await JSON.parse(localStorage.getItem('token'));
  const token = tokens.accessToken;
  baseURL.post(`/updatepassword`, userData, {
    headers: {
        'authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
  })
    .then(res => {
      const response = res.data;
      if (response.statusCode === 200) {
        dispatch({
          type: 'UPDATEPASS',
          payload: res
        })
      } else {
        dispatch({
          type: 'UPDATEPASSERR',
          payload: response.result.message
        })
      }
    }).catch(err => {
      dispatch({
        type: 'UPDATEPASSERR',
        payload: 'Something went wrong.'
      })
    })
}


export const updateemailwithopt = (userData) => async dispatch => {
  let tokens = await JSON.parse(localStorage.getItem('token'));
  const token = tokens.accessToken;
  
  baseURL.post(`/confirmemailafterupdate`, userData, {
    headers: {
        'Authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
  }).then(res => {
      const response = res.data;
      if (response.statusCode === 200) {
        dispatch({
          type: 'UPDATEEMAILOTP',
          payload: res
        })
      } else {
        dispatch({
          type: 'UPDATEEMAILOTPERR',
          payload: response.result.message
        })
      }
    }).catch(err => {
      dispatch({
        type: 'UPDATEEMAILOTPERR',
        payload: 'Something went wrong.'
      })
    })
}

export const updateemailverify = (userData) => async dispatch => {
  let tokens = await JSON.parse(localStorage.getItem('token'));
  const token = tokens.accessToken;
  baseURL.post(`/updateemail`, userData, {
    headers: {
        'Authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
  }).then(res => {
      const response = res.data;
      if (response.statusCode === 200) {
        dispatch({
          type: 'UPDATEEMAIL',
          payload: res
        })
      } else {
        dispatch({
          type: 'UPDATEEMAILERR',
          payload: response.result.message
        })
      }
    }).catch(err => {
      
      dispatch({
        type: 'UPDATEEMAILERR',
        payload: 'Something went wrong.'
      })
    })
}


//Forget password send username to receive OTP 
export const sendForgetRquestMails = (userData) => async dispatch => {
  if (userData.passcode === undefined) {
    baseURL.post(`/forgotpassword`, userData, 
    ).then(res => {
      const response = res.data;
      if (response.statusCode === 200) {
        dispatch({
          type: 'FORGET_SEND_USERNAME',
          payload: response,

        })
      } else {
        dispatch({
          type: 'FORGET_SEND_USERNAME_ERR',
          payload: response.result.message,

        })
      }
    }).catch(err => {
      
    
      dispatch({
        type: 'FORGET_SEND_USERNAME_ERR',
        payload: 'Something went wrong.',

      })
    })
  } else {
    baseURL.post(`/forgotpasswordSubmit`, userData).then(res => {
      const response = res.data;
      if (response.statusCode === 200) {
        dispatch({
          type: 'FORGET_SEND_USERDATA',
          payload: response,

        })
      } else {
        dispatch({
          type: 'FORGET_SEND_USERDATA_ERR',
          payload: response.result.message,

        })
      }
    }).catch(err => {
      dispatch({
        type: 'FORGET_SEND_USERDATA_ERR',
        payload: 'Something went wrong.',

      })
    })
  }


}

export const logoutWithEmptyState = () => dispatch => {
  dispatch({
    type: 'LOGOUT_WITH_STATE',
    payload: 'Logout successfully'
  })
}





export const getUserSearch = (data) => async dispatch => {
  let tokens = await JSON.parse(localStorage.getItem('token'));
  if(tokens){
    const token = tokens.accessToken;
 baseURL.post(`/getusersearch`,data, {
    headers: {
        'Authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
  }).then(res => {
      const response = res?.data;
      if (response?.statusCode === 200) {
        dispatch({
          type: 'FETCHALLUSERS',
          payload: response?.data
        })
      } else if( response?.statusCode === 404){
         localStorage.clear();
        

        dispatch({
          type: 'UNAUTHENTICATE_USER',
          payload: response?.result?.message
        })
      } 
      else {
        dispatch({
          type: 'FETCHALLUSERS_ERR',
          payload: response.result.message
        })
      }
    }).catch(err => {
      
      dispatch({
        type: 'FETCHALLUSERS_ERR',
        payload: 'Something went wrong.'
      })
    })
  }else{
    dispatch({
      type: 'TOKENNOTSAVED_ERR',
      payload: 'Something went wrong.'
    })
  }
  
}

export const getAllApprovals = () => async dispatch => {
  let tokens = await JSON.parse(localStorage.getItem('token'));
  if(tokens){
    const token = tokens.accessToken;
 baseURL.post(`/youngpeopleapprovedlist`,{}, {
    headers: {
        'Authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
  }).then(res => {
      const response = res?.data;
      if (response?.statusCode === 200) {
        dispatch({
          type: 'FETCHALLUSERS',
          payload: response?.data
        })
      } else if( response?.statusCode === 404){
         localStorage.clear();
        

        dispatch({
          type: 'UNAUTHENTICATE_USER',
          payload: response?.result?.message
        })
      } 
      else {
        dispatch({
          type: 'FETCHALLUSERS_ERR',
          payload: response.result.message
        })
      }
    }).catch(err => {
      
      dispatch({
        type: 'FETCHALLUSERS_ERR',
        payload: 'Something went wrong.'
      })
    })
  }else{
    dispatch({
      type: 'TOKENNOTSAVED_ERR',
      payload: 'Something went wrong.'
    })
  }
  
}

export const getrespondentinformationstatus = (data) => async dispatch => {
  let tokens = await JSON.parse(localStorage.getItem('token'));
  if(tokens){
    const token = tokens.accessToken;
 baseURL.post(`/getrespondentinformationstatus`,data, {
    headers: {
        'Authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
  }).then(res => {
      const response = res?.data;
      if (response?.statusCode === 200) {
        dispatch({
          type: 'GETRESPONDENTINFORMATIONSTATUS',
          payload: response?.data
        })
      } else if( response?.statusCode === 404){
         localStorage.clear();
        

        dispatch({
          type: 'UNAUTHENTICATE_USER',
          payload: response?.result?.message
        })
      } 
      else {
        dispatch({
          type: 'FETCHALLUSERS_ERR',
          payload: response.result.message
        })
      }
    }).catch(err => {
      
      dispatch({
        type: 'FETCHALLUSERS_ERR',
        payload: 'Something went wrong.'
      })
    })
  }else{
    dispatch({
      type: 'TOKENNOTSAVED_ERR',
      payload: 'Something went wrong.'
    })
  }
  
}


export const getAllUsers = () => async dispatch => {
  let tokens = await JSON.parse(localStorage.getItem('token'));
  if(tokens){
    const token = tokens.accessToken;
 baseURL.post(`/getuser`,{}, {
    headers: {
        'Authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
  }).then(res => {
      const response = res?.data;
      if (response?.statusCode === 200) {
        dispatch({
          type: 'FETCHALLUSERS',
          payload: response?.data
        })
      } else if( response?.statusCode === 404){
         localStorage.clear();
        

        dispatch({
          type: 'UNAUTHENTICATE_USER',
          payload: response?.result?.message
        })
      } 
      else {
        dispatch({
          type: 'FETCHALLUSERS_ERR',
          payload: response.result.message
        })
      }
    }).catch(err => {
      
      dispatch({
        type: 'FETCHALLUSERS_ERR',
        payload: 'Something went wrong.'
      })
    })
  }else{
    dispatch({
      type: 'TOKENNOTSAVED_ERR',
      payload: 'Something went wrong.'
    })
  }
  
}

//Fetch user detail by userId
export const getUserById = (id) => async dispatch => {
  let tokens = await JSON.parse(localStorage.getItem('token'));
  if(tokens){
    const token = tokens.accessToken;
  baseURL.post(`/getUserById`,{ id : id } , {
    headers: {
        'Authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
  }).then(res => {
      const response = res.data;
      if (response.statusCode === 200) {
        dispatch({
          type: 'FETCHUSERBYID',
          payload: response.data
        })
      } else if( response.statusCode === 404){
         localStorage.clear();
        
        dispatch({
          type: 'UNAUTHENTICATE_USER',
          payload: response.result.message
        })
      } 
      else {
        dispatch({
          type: 'FETCHUSERBYID_ERR',
          payload: response.result.message
        })
      }
    }).catch(err => {
      
      dispatch({
        type: 'FETCHUSERBYID_ERR',
        payload: 'Something went wrong.'
      })
    })
  }
  
}

export const getUserByUserName = (id) => async dispatch => {
  let tokens = await JSON.parse(localStorage.getItem('token'));
  if(tokens){
    const token = tokens.accessToken;
 baseURL.post(`/getUserByUserName`,{ id : id }, {
    headers: {
        'Authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
  }).then(res => {
      const response = res?.data;
      if (response?.statusCode === 200) {
        dispatch({
          type: 'FETCHALLUSERS',
          payload: response?.data
        })
      } else if( response?.statusCode === 404){
         localStorage.clear();
        

        dispatch({
          type: 'UNAUTHENTICATE_USER',
          payload: response?.result?.message
        })
      } 
      else {
        dispatch({
          type: 'FETCHALLUSERS_ERR',
          payload: response.result.message
        })
      }
    }).catch(err => {
      
      dispatch({
        type: 'FETCHALLUSERS_ERR',
        payload: 'Something went wrong.'
      })
    })
  }else{
    dispatch({
      type: 'TOKENNOTSAVED_ERR',
      payload: 'Something went wrong.'
    })
  }
  
}




//Fetch user detail by userId
export const updateUserById = (userData) => async dispatch => {
  let tokens = await JSON.parse(localStorage.getItem('token'));
  if(tokens){
    const token = tokens.accessToken;
    baseURL.post(`/updateuser`,userData , {
      headers: {
          'Authorization': token,
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
      }
    }).then(res => {
      const response = res.data;
     
      if (response.statusCode === 200) {
        dispatch({
          type: 'UPDATEUSERBYID',
          payload: response
        })
      } else if( response.statusCode === 404){
         localStorage.clear();
        
        dispatch({
          type: 'UNAUTHENTICATE_USER',
          payload: response.result.message
        })
      } 
      else {
        dispatch({
          type: 'UPDATEUSERBYID_ERR',
          payload: response.result.message
        })
      }
    }).catch(err => {
      
     
      dispatch({
        type: 'UPDATEUSERBYID_ERR',
        payload: 'Something went wrong.'
      })
    })
  
}else{
  dispatch({
    type: 'TOKENNOTSAVED_ERR',
    payload: 'Something went wrong.'
  })
}

}


export const fetchAllCenter = (user) => async dispatch => {
  let tokens = await JSON.parse(localStorage.getItem('token'));
 
  
  if(tokens){
    const token = tokens.accessToken;
    baseURL.get(`/fetchAllCenter/${user?.user_id}`, {
      headers: {
          'Authorization': token,
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
      }
    }).then(res => {
      const response = res.data;
     
      if (response.statusCode === 200) {
        dispatch({
          type: 'ALLCENTERS',
          payload: response
        })
      } else if( response.statusCode === 404){
         localStorage.clear();
        
        dispatch({
          type: 'UNAUTHENTICATE_USER',
          payload: response.result.message
        })
      } 
      else {
        dispatch({
          type: 'UPDATEUSERBYID_ERR',
          payload: response.result.message
        })
      }
    }).catch(err => {
      
     
      dispatch({
        type: 'UPDATEUSERBYID_ERR',
        payload: 'Something went wrong.'
      })
    })
  
}else{
  dispatch({
    type: 'TOKENNOTSAVED_ERR',
    payload: 'Something went wrong.'
  })
}

}




export const getYoungPeopleDashboard = (userData) => async dispatch => {
  let tokens = await JSON.parse(localStorage.getItem('token'));
  if(tokens){
    const token = tokens.accessToken;
  baseURL.get(`/getyoungpeopleDashboard/${userData}`, {
    headers: {
        'Authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
  }).then(res => {
      const response = res.data;
      if (response.statusCode === 200) {
        dispatch({
          type: 'FETCHALLYOUNGPEOPLEDASHB',
          payload: response.data
        })
      } else if( response.statusCode === 404){
         localStorage.clear();

         
        dispatch({
          type: 'UNAUTHENTICATE_USER',
          payload: response.result.message
        })
      } 
      else {
        dispatch({
          type: 'FETCHALLYOUNGPEOPLE_ERR',
          payload: response.result.message
        })
      }
    }).catch(err => {
      
      dispatch({
        type: 'FETCHALLYOUNGPEOPLE_ERR',
        payload: 'Something went wrong.'
      })
    })
  }else{
    dispatch({
      type: 'TOKENNOTSAVED_ERR',
      payload: 'Something went wrong.'
    })
  }
  
}


export const getYoungPeople = (authUserId) => async dispatch => {
  let tokens = await JSON.parse(localStorage.getItem('token'));
  if(tokens){
    const token = tokens.accessToken;
  baseURL.post(`/getyoungpeople/${authUserId}`,{}, {
    headers: {
        'Authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
  }).then(res => {
      const response = res.data;
      if (response.statusCode === 200) {
        dispatch({
          type: 'FETCHALLYOUNGPEOPLE',
          payload: response.data
        })
      } else if( response.statusCode === 404){
         localStorage.clear();
        
        dispatch({
          type: 'UNAUTHENTICATE_USER',
          payload: response.result.message
        })
      } 
      else {
        dispatch({
          type: 'FETCHALLYOUNGPEOPLE_ERR',
          payload: response.result.message
        })
      }
    }).catch(err => {
      
      dispatch({
        type: 'FETCHALLYOUNGPEOPLE_ERR',
        payload: 'Something went wrong.'
      })
    })
  }else{
    dispatch({
      type: 'TOKENNOTSAVED_ERR',
      payload: 'Something went wrong.'
    })
  }
  
}




export const getYoungPeopleHeaderSearch = (userData) => async dispatch => {
  let tokens = await JSON.parse(localStorage.getItem('token'));
  if(tokens){
    const token = tokens.accessToken;

    baseURL.post(`/getyoungpeoplebynameheader`,userData, {

    
    headers: {
        'Authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
  }).then(res => {
      const response = res.data;
      if (response.statusCode === 200) {
        dispatch({
          type: 'FETCHALLYOUNGPEOPLEBYNAMEHeader',
          payload: response.data
        })
      } else if( response.statusCode === 404){
         localStorage.clear();
        
        dispatch({
          type: 'UNAUTHENTICATE_USER',
          payload: response.result.message
        })
      } 
      else {
        dispatch({
          type: 'FETCHALLYOUNGPEOPLE_ERR',
          payload: response.result.message
        })
      }
    }).catch(err => {
      
      dispatch({
        type: 'FETCHALLYOUNGPEOPLE_ERR',
        payload: 'Something went wrong.'
      })
    })
  }else{
    dispatch({
      type: 'TOKENNOTSAVED_ERR',
      payload: 'Something went wrong.'
    })
  }
  
}

export const getYoungPeopleByName = (userData) => async dispatch => {
  let tokens = await JSON.parse(localStorage.getItem('token'));
  if(tokens){
    const token = tokens.accessToken;
  baseURL.post(`/getyoungpeoplebyname`,userData, {
   
    
    headers: {
        'Authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
  }).then(res => {
      const response = res.data;
      if (response.statusCode === 200) {
        dispatch({
          type: 'FETCHALLYOUNGPEOPLEBYNAME',
          payload: response.data
        })
      } else if( response.statusCode === 404){
         localStorage.clear();
        
        dispatch({
          type: 'UNAUTHENTICATE_USER',
          payload: response.result.message
        })
      } 
      else {
        dispatch({
          type: 'FETCHALLYOUNGPEOPLE_ERR',
          payload: response.result.message
        })
      }
    }).catch(err => {
      
      dispatch({
        type: 'FETCHALLYOUNGPEOPLE_ERR',
        payload: 'Something went wrong.'
      })
    })
  }else{
    dispatch({
      type: 'TOKENNOTSAVED_ERR',
      payload: 'Something went wrong.'
    })
  }
  
}


export const addYoungPeopleById = (userData) => async dispatch => {
  let tokens = await JSON.parse(localStorage.getItem('token'));
  if(tokens){
    const token = tokens.accessToken;
  baseURL.post(`/addYoungPeopleById`,userData, {
    headers: {
        'Authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
  }).then(res => {
      const response = res.data;
      if (response.statusCode === 200) {
        dispatch({
          type: 'ADDYOUNGPEOPLEBYID',
          payload: response
        })
      } else if( response.statusCode === 404){
         localStorage.clear();
        
        dispatch({
          type: 'UNAUTHENTICATE_USER',
          payload: response.result.message
        })
      } 
      else {
        dispatch({
          type: 'FETCHALLYOUNGPEOPLE_ERR',
          payload: response?.message
        })
      }
    }).catch(err => {
      
      dispatch({
        type: 'FETCHALLYOUNGPEOPLE_ERR',
        payload: 'Something went wrong.'
      })
    })
  }else{
    dispatch({
      type: 'TOKENNOTSAVED_ERR',
      payload: 'Something went wrong.'
    })
  }
  
}


export const getGraphData = (userData) => async dispatch => {
  let tokens = await JSON.parse(localStorage.getItem('token'));
  if(tokens){
    const token = tokens.accessToken;
    
    
      baseURL.get(`/getlatestSurveys/${userData}`, {

    headers: {
        'Authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
  }).then(res => {
      const response = res.data;
      if (response.statusCode === 200) {
        dispatch({
          type: 'GETGRAPHDATA',
          payload: response?.data
        })
      } else if( response.statusCode === 404){
         localStorage.clear();
        
        dispatch({
          type: 'UNAUTHENTICATE_USER',
          payload: response?.result?.message
        })
      } 
      else {
        dispatch({
          type: 'FETCHALLGETTODOS_ERR',
          payload: response?.message
        })
      }
    }).catch(err => {
      
      dispatch({
        type: 'FETCHALLGETTODOS_ERR',
        payload: 'Something went wrong.'
      })
    })
  }else{
    dispatch({
      type: 'TOKENNOTSAVED_ERR',
      payload: 'Something went wrong.'
    })
  }
  
}


export const getToDoList = (userData) => async dispatch => {
  let tokens = await JSON.parse(localStorage.getItem('token'));
  if(tokens){
    const token = tokens.accessToken;
  baseURL.get(`/getSurveysWithoutNote/${userData}`, {
    headers: {
        'Authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
  }).then(res => {
      const response = res.data;
      if (response.statusCode === 200) {
        dispatch({
          type: 'GETTODOS',
          payload: response?.data
        })
      } else if( response.statusCode === 404){
         localStorage.clear();
        
        dispatch({
          type: 'UNAUTHENTICATE_USER',
          payload: response?.result?.message
        })
      } 
      else {
        dispatch({
          type: 'FETCHALLGETTODOS_ERR',
          payload: response?.message
        })
      }
    }).catch(err => {
      
      dispatch({
        type: 'FETCHALLGETTODOS_ERR',
        payload: 'Something went wrong.'
      })
    })
  }else{
    dispatch({
      type: 'TOKENNOTSAVED_ERR',
      payload: 'Something went wrong.'
    })
  }
  
}
export const getReportList = (userData) => async dispatch => {
  let tokens = await JSON.parse(localStorage.getItem('token'));
  if(tokens){
    const token = tokens.accessToken;
  baseURL.get(`/getCountofReport/${userData}`, {
    headers: {
        'Authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
  }).then(res => {
      const response = res.data;
      if (response.statusCode === 200) {
        dispatch({
          type: 'GETREPORT',
          payload: response?.data
        })
      } else if( response.statusCode === 404){
         localStorage.clear();
        
        dispatch({
          type: 'UNAUTHENTICATE_USER',
          payload: response?.result?.message
        })
      } 
      else {
        dispatch({
          type: 'FETCHALLGETTODOS_ERR',
          payload: response?.message
        })
      }
    }).catch(err => {
      
      dispatch({
        type: 'FETCHALLGETTODOS_ERR',
        payload: 'Something went wrong.'
      })
    })
  }else{
    dispatch({
      type: 'TOKENNOTSAVED_ERR',
      payload: 'Something went wrong.'
    })
  }
  
}


export const getQuestnaire = (questnaireData) => async dispatch => {
  let tokens = await JSON.parse(localStorage.getItem('token'));
  if(tokens){
    const token = tokens.accessToken;
    baseURL.post(`/getquestnairewithcenter`,questnaireData, {
    headers: {
        'Authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
  }).then(res => {
      const response = res.data;
      if (response.statusCode === 200) {
        dispatch({
          type: 'FETCHALLQUESTNAIRE',
          payload: response.data
        })
      } else if( response.statusCode === 404){
         localStorage.clear();
        
        dispatch({
          type: 'UNAUTHENTICATE_USER',
          payload: response.result.message
        })
      } 
      else {
        dispatch({
          type: 'FETCHALLYOUNGPEOPLE_ERR',
          payload: response.message
        })
      }
    }).catch(err => {
      
      dispatch({
        type: 'FETCHALLYOUNGPEOPLE_ERR',
        payload: 'Something went wrong.'
      })
    })
  }else{
    dispatch({
      type: 'TOKENNOTSAVED_ERR',
      payload: 'Something went wrong.'
    })
  }
  
}

export const fetchYoungPeopleById = (userData) => async dispatch => {
  let tokens = await JSON.parse(localStorage.getItem('token'));

  if(tokens){
    const token = tokens.accessToken;
    baseURL.get(`/fetchYoungPeopleById/${userData?.userid}/${userData?.loginuser_id}`, {
    headers: {
        'Authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
  }).then(res => {
      const response = res.data;
      if (response.statusCode === 200) {
        dispatch({
          type: 'FETCHALLYOUNGPEOPLEBYNAME',
          payload: response.data
        })
      } else if( response.statusCode === 404){
         localStorage.clear();
        
        dispatch({
          type: 'UNAUTHENTICATE_USER',
          payload: response.result.message
        })
      } 
      else {
        dispatch({
          type: 'FETCHALLYOUNGPEOPLE_ERR',
          payload: response.result.message
        })
      }
    }).catch(err => {
      
      dispatch({
        type: 'FETCHALLYOUNGPEOPLE_ERR',
        payload: 'Something went wrong.'
      })
    })
  }else{
    dispatch({
      type: 'TOKENNOTSAVED_ERR',
      payload: 'Something went wrong.'
    })
  }
  
}


export const dashboardGraphData = () => async dispatch => {
  let tokens = await JSON.parse(localStorage.getItem('token'));
  if(tokens){
    const token = tokens.accessToken;
    baseURL.get(`/getEightMonthOldDataforDashboard`, {
    headers: {
        'Authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
  }).then(res => {
      const response = res.data;
      if (response.statusCode === 200) {
        dispatch({
          type: 'GETGRAPHDASHBOARD',
          payload: response.data
        })
      } else if( response.statusCode === 404){
         localStorage.clear();
        
        dispatch({
          type: 'UNAUTHENTICATE_USER',
          payload: response.result.message
        })
      } 
      else {
        dispatch({
          type: 'GETGRAPHDASHBOARD_ERR',
          payload: response.result.message
        })
      }
    }).catch(err => {
      
      dispatch({
        type: 'GETGRAPHDASHBOARD_ERR',
        payload: 'Something went wrong.'
      })
    })
  }else{
    dispatch({
      type: 'TOKENNOTSAVED_ERR',
      payload: 'Something went wrong.'
    })
  }
  
}

export const getSurveyQuestionniare = (data) => async dispatch => {
  const questionnaireId = 1;
  let tokens = await JSON.parse(localStorage.getItem('token'));
  if(tokens){
    const token = tokens.accessToken;
  baseURL.get(`/getmodulequestions/${data.questionnaireId}/${ data.questionaireUserRespondentId}/${ data.module_id}`,  {
    headers: {
        'Authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
  }).then(res => {
      const response = res.data;
      if (response.statusCode === 200) {
        dispatch({
          type: 'GETQUESTIONNAIRELIST',
          payload: response.data
        })
      } else if( response.statusCode === 404){
        localStorage.clear();
        dispatch({
          type: 'UNAUTHENTICATE_USER',
          payload: response.result.message
        })
      } 
      else {
        dispatch({
          type: 'GETQUESTIONNAIRE_ERR',
          payload:response.result.message
        })
      }
    }).catch(err => {
      
      dispatch({
        type: 'GETQUESTIONNAIRE_ERR',
        payload: 'Something went wrong.'
      })
    })
  }else{
    dispatch({
      type: 'TOKENNOTSAVED_ERR',
      payload: 'Something went wrong.'
    })
  }
  
}

export const getSurveyQuestionOptions = () => async dispatch => {
  let tokens = await JSON.parse(localStorage.getItem('token'));
  if(tokens){
    const token = tokens.accessToken;
  baseURL.get(`/getanswers`,  {
    headers: {
        'Authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
  }).then(res => {
      const response = res.data;
      if (response.statusCode === 200) {
        dispatch({
          type: 'GETQUESTIONOPTION',
          payload: response.data
        })
      } else if( response.statusCode === 404){
        localStorage.clear();
        dispatch({
          type: 'UNAUTHENTICATE_USER',
          payload: response.result.message
        })
      } 
      else {
        dispatch({
          type: 'GETQUESTIONOPTION_ERR',
          payload: response?.message
        })
      }
    }).catch(err => {
      
      dispatch({
        type: 'GETQUESTIONOPTION_ERR',
        payload: 'Something went wrong.'
      })
    })
  }else{
    dispatch({
      type: 'TOKENNOTSAVED_ERR',
      payload: 'Something went wrong.'
    })
  }
  
}

export const getAnswerIdOnPrevClick = (questionObject) => async dispatch => {
  let tokens = await JSON.parse(localStorage.getItem('token'));
  if(tokens){
    const token = tokens.accessToken;
    baseURL.post(`/getAnswerForQuestion`,questionObject, {
      headers: {
          'Authorization': token,
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
      }
    }).then(res => {
      const response = res.data;
      if (response.statusCode === 200) {
        if(response.data.length === 0){
          dispatch({
            type: 'GETANSWERIDEMPTY'
          })
        }else {
          dispatch({
            type: 'GETANSWERID',
            payload: response.data[0]
          })
        }
      } else if( response.statusCode === 404){
        localStorage.clear();
        dispatch({
          type: 'UNAUTHENTICATE_USER',
          payload: response.result.message
        })
      } 
      else {
        dispatch({
          type: 'GETANSWERID_ERR',
          payload: response?.message
        })
      }
    }).catch(err => {
      
      dispatch({
        type: 'GETANSWERID_ERR',
        payload: 'Something went wrong.'
      })
    })
  }else{
    dispatch({
      type: 'TOKENNOTSAVED_ERR',
      payload: 'Something went wrong.'
    })
  }
  
}

export const insertSurveyQuestionResponse = (questionObject) => async dispatch => {
  let tokens = await JSON.parse(localStorage.getItem('token'));
  if(tokens){
    const token = tokens.accessToken;
  baseURL.post(`/questionRespond`,questionObject, {
    headers: {
        'Authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
  }).then(res => {
      const response = res.data;
      if (response.statusCode === 200) {
        dispatch({
          type: 'INSERTSURVEYQUESTIONRESPONSE',
          payload: response.data
        })
      } else if( response.statusCode === 404){
        localStorage.clear();
        dispatch({
          type: 'UNAUTHENTICATE_USER',
          payload: response.result.message
        })
      } 
      else {
        dispatch({
          type: 'INSERTSURVEYQUESTIONRESPONSE_ERR',
          payload: response?.message
        })
      }
    }).catch(err => {
      
      dispatch({
        type: 'INSERTSURVEYQUESTIONRESPONSE_ERR',
        payload: 'Something went wrong.'
      })
    })
  }else{
    dispatch({
      type: 'TOKENNOTSAVED_ERR',
      payload: 'Something went wrong.'
    })
  }
  
}

export const surveyResponseForYoungPeople = (id, type, userid) => async dispatch => {

  let tokens = await JSON.parse(localStorage.getItem('token'));
  const questionnaireId = id;
  const userRespondentId = userid;
  const questionaireUserRespondentId = type;
  if(tokens){
    const token = tokens.accessToken;
  baseURL.get(`/surveyResponseForYoungPeople/${questionnaireId}/${userRespondentId}/${questionaireUserRespondentId}`,  {
    headers: {
        'Authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
  }).then(res => {
      const response = res.data;
      if (response.statusCode === 200) {
        dispatch({
          type: 'GETSURVEYRESPONSE',
          payload: response.data? response.data: response
        })
      } else if( response.statusCode === 404){
        localStorage.clear();
        dispatch({
          type: 'UNAUTHENTICATE_USER',
          payload: response.result.message
        })
      } 
      else {
        dispatch({
          type: 'GETSURVEYRESPONSE_ERR',
          payload: response?.message
        })
      }
    }).catch(err => {
      
      dispatch({
        type: 'GETSURVEYRESPONSE_ERR',
        payload: 'Something went wrong.'
      })
    })
  }else{
    dispatch({
      type: 'TOKENNOTSAVED_ERR',
      payload: 'Something went wrong.'
    })
  }
}

export const questionaireRespondentNotes = (userData) => async dispatch => {

  let tokens = await JSON.parse(localStorage.getItem('token'));
   if(tokens){
    const token = tokens.accessToken;
    baseURL.post(`/fetchsavequestionairerespondentnote`, userData, {

    headers: {
        'Authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
  }).then(res => {
      const response = res.data;
      if (response.statusCode === 200) {
        dispatch({
          type: 'RESPONDENTNOTESRESPONSE',
          payload: response
        })
      } else if( response.statusCode === 404){
        localStorage.clear();
        dispatch({
          type: 'UNAUTHENTICATE_USER',
          payload: response.result.message
        })
      } 
      else {
        dispatch({
          type: 'RESPONDENTNOTESRESPONSE_ERR',
          payload: response?.message
        })
      }
    }).catch(err => {
      
      dispatch({
        type: 'GETSURVEYRESPONSE_ERR',
        payload: 'Something went wrong.'
      })
    })
  }else{
    dispatch({
      type: 'TOKENNOTSAVED_ERR',
      payload: 'Something went wrong.'
    })
  }
}



export const AskforapprovalsApi = (userData) => async dispatch => {
  let tokens = await JSON.parse(localStorage.getItem('token'));
  if(tokens){
    const token = tokens.accessToken;
 baseURL.post(`/youngpeopleinsert`,userData, {
    headers: {
        'Authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
  }).then(res => {
      const response = res?.data;
      if (response?.statusCode === 200) {
        dispatch({
          type: 'ASKFORAPPROVAL',
          payload: response?.data
        })
      } else if( response?.statusCode === 404){
         localStorage.clear();
        

        dispatch({
          type: 'UNAUTHENTICATE_USER',
          payload: response?.result?.message
        })
      } 
      else {
        dispatch({
          type: 'FETCHALLUSERS_ERR',
          payload: response.result.message
        })
      }
    }).catch(err => {
      
      dispatch({
        type: 'FETCHALLUSERS_ERR',
        payload: 'Something went wrong.'
      })
    })
  }else{
    dispatch({
      type: 'TOKENNOTSAVED_ERR',
      payload: 'Something went wrong.'
    })
  }
  
}

export const getApprovalsStatus = (userData) => async dispatch => {
  let tokens = await JSON.parse(localStorage.getItem('token'));
  if(tokens){
    const token = tokens.accessToken;
 baseURL.post(`/youngpeopleapproved`,userData, {
    headers: {
        'Authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
  }).then(res => {
      const response = res?.data;
      if (response?.statusCode === 200) {
        dispatch({
          type: 'FETCHALLUSERSUPDATE',
          payload: response?.data
        })
      } else if( response?.statusCode === 404){
         localStorage.clear();
        

        dispatch({
          type: 'UNAUTHENTICATE_USER',
          payload: response?.result?.message
        })
      } 
      else {
        dispatch({
          type: 'FETCHALLUSERS_ERR',
          payload: response.result.message
        })
      }
    }).catch(err => {
      
      dispatch({
        type: 'FETCHALLUSERS_ERR',
        payload: 'Something went wrong.'
      })
    })
  }else{
    dispatch({
      type: 'TOKENNOTSAVED_ERR',
      payload: 'Something went wrong.'
    })
  }
  
}
export const getApporvalSearch = (data) => async dispatch => {
  let tokens = await JSON.parse(localStorage.getItem('token'));
  if(tokens){
    const token = tokens.accessToken;
 baseURL.post(`/youngpeopleapprovedSearchlist`,data, {
    headers: {
        'Authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
  }).then(res => {
      const response = res?.data;
      if (response?.statusCode === 200) {
        dispatch({
          type: 'FETCHALLUSERS',
          payload: response?.data
        })
      } else if( response?.statusCode === 404){
         localStorage.clear();
        

        dispatch({
          type: 'UNAUTHENTICATE_USER',
          payload: response?.result?.message
        })
      } 
      else {
        dispatch({
          type: 'FETCHALLUSERS_ERR',
          payload: response.result.message
        })
      }
    }).catch(err => {
      
      dispatch({
        type: 'FETCHALLUSERS_ERR',
        payload: 'Something went wrong.'
      })
    })
  }else{
    dispatch({
      type: 'TOKENNOTSAVED_ERR',
      payload: 'Something went wrong.'
    })
  }
  
}

export const newNotificationListApi = () => async dispatch => {
  let tokens = await JSON.parse(localStorage.getItem('token'));
   if(tokens){
    const token = tokens.accessToken;
    baseURL.get(`/notification/list`, {

    headers: {
        'Authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
  }).then(res => {
      const response = res.data;
      if (response.statusCode === 200) {
        dispatch({
          type: 'NEWNOTIFICATIONLISTRESPONSE',
          payload: response.data
        })
      } else if( response.statusCode === 404){
        localStorage.clear();
        dispatch({
          type: 'UNAUTHENTICATE_USER',
          payload: response.result.message
        })
      } 
      else {
        dispatch({
          type: 'NEWNOTIFICATIONLISTRESPONSE_ERR',
          payload: response?.message
        })
      }
    }).catch(err => {
      dispatch({
        type: 'NEWNOTIFICATIONLISTRESPONSE_ERR',
        payload: 'Something went wrong.'
      })
    })
  }else{
    dispatch({
      type: 'TOKENNOTSAVED_ERR',
      payload: 'Something went wrong.'
    })
  }
}


export const updateNotificationStatus = (data) => async dispatch => {
  let tokens = await JSON.parse(localStorage.getItem('token'));
   if(tokens){
    const token = tokens.accessToken;
    baseURL.get(`/notification/update/${data.id}/${data.userId}`, {

    headers: {
        'Authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
  }).then(res => {
      const response = res.data;
      if (response.statusCode === 200) {
        dispatch({
          type: 'UPDATENOTIFICATIONSTATUS',
          payload: response.data
        })
      } else if( response.statusCode === 404){
        localStorage.clear();
        dispatch({
          type: 'UNAUTHENTICATE_USER',
          payload: response.result.message
        })
      } 
      else {
        dispatch({
          type: 'UPDATENOTIFICATIONSTATUS_ERR',
          payload: response?.message
        })
      }
    }).catch(err => {
      dispatch({
        type: 'UPDATENOTIFICATIONSTATUS_ERR',
        payload: 'Something went wrong.'
      })
    })
  }else{
    dispatch({
      type: 'TOKENNOTSAVED_ERR',
      payload: 'Something went wrong.'
    })
  }
}

//Get module list with module number of question completed count out of 5
export const getModuleListWithCount = (data) => async dispatch => {
  let tokens = await JSON.parse(localStorage.getItem('token'));
   if(tokens){
    const token = tokens.accessToken;
    baseURL.post(`/moduleInfoyoungUsers`,data, {

    headers: {
        'Authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
  }).then(res => {
      const response = res.data;
      if (response.statusCode === 200) {
        dispatch({
          type: 'GETMODULELIST',
          payload: response.data
        })
      } else if( response.statusCode === 404){
        localStorage.clear();
        dispatch({
          type: 'UNAUTHENTICATE_USER',
          payload: response.result.message
        })
      } 
      else {
        dispatch({
          type: 'GETMODULELIST_ERR',
          payload: response?.message
        })
      }
    }).catch(err => {
      
      debugger
      dispatch({
        type: 'GETMODULELIST_ERR',
        payload: 'Something went wrong.'
      })
    })
  }else{
    dispatch({
      type: 'TOKENNOTSAVED_ERR',
      payload: 'Something went wrong.'
    })
  }
}


export const onsubmitAll = (data) => async dispatch => {
  let tokens = await JSON.parse(localStorage.getItem('token'));
   if(tokens){
    const token = tokens.accessToken;
    baseURL.get(`/checksurveyquestion/${data.questionnaireId}/${data.questionaire_user_respondent_id}`, {

    headers: {
        'Authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
  }).then(res => {
      const response = res.data;
      if (response.statusCode === 200) {
        dispatch({
          type: 'SUBMITALLSURVEY',
          payload: response
        })
      } else if( response.statusCode === 404){
        localStorage.clear();
        dispatch({
          type: 'UNAUTHENTICATE_USER',
          payload: response.result.message
        })
      } 
      else {
        dispatch({
          type: 'UPDATENOTIFICATIONSTATUS_ERR',
          payload: response?.message
        })
      }
    }).catch(err => {
      dispatch({
        type: 'UPDATENOTIFICATIONSTATUS_ERR',
        payload: 'Something went wrong.'
      })
    })
  }else{
    dispatch({
      type: 'TOKENNOTSAVED_ERR',
      payload: 'Something went wrong.'
    })
  }
}


//store survey notes
export const storeSurveyNoteRequest = (data) => async dispatch => {
  let tokens = await JSON.parse(localStorage.getItem('token'));
   if(tokens){
    const token = tokens.accessToken;
    baseURL.post(`/surveyHideFrom`,data, {

    headers: {
        'Authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
  }).then(res => {
      const response = res.data;
      if (response.statusCode === 200) {
        dispatch({
          type: 'STORESURVEYNOTE',
          payload: response.data
        })
      } else if( response.statusCode === 404){
        localStorage.clear();
        dispatch({
          type: 'UNAUTHENTICATE_USER',
          payload: response.result.message
        })
      } 
      else {
        dispatch({
          type: 'STORESURVEYNOTE_ERR',
          payload: response?.message
        })
      }
    }).catch(err => {
      
      debugger
      dispatch({
        type: 'STORESURVEYNOTE_ERR',
        payload: 'Something went wrong.'
      })
    })
  }else{
    dispatch({
      type: 'TOKENNOTSAVED_ERR',
      payload: 'Something went wrong.'
    })
  }
}



//store survey notes
export const getfirstsurveyname = (data) => async dispatch => {
  let tokens = await JSON.parse(localStorage.getItem('token'));
   if(tokens){
    const token = tokens.accessToken;
    baseURL.post(`/getsurveydatename`,data, {

    headers: {
        'Authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
  }).then(res => {
      const response = res.data;
      if (response.statusCode === 200) {
        dispatch({
          type: 'SURVEYNAME',
          payload: response.data
        })
      } else if( response.statusCode === 404){
        localStorage.clear();
        dispatch({
          type: 'UNAUTHENTICATE_USER',
          payload: response.result.message
        })
      } 
      else {
        dispatch({
          type: 'STORESURVEYNOTE_ERR',
          payload: response?.message
        })
      }
    }).catch(err => {
     
      debugger
      dispatch({
        type: 'STORESURVEYNOTE_ERR',
        payload: 'Something went wrong.'
      })
    })
  }else{
    dispatch({
      type: 'TOKENNOTSAVED_ERR',
      payload: 'Something went wrong.'
    })
  }
}

//store survey notes
export const sendlink = (data) => async dispatch => {
  let tokens = await JSON.parse(localStorage.getItem('token'));
   if(tokens){
    const token = tokens.accessToken;
    baseURL.post(`/youngpeoplesendlink`,data, {

    headers: {
        'Authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
  }).then(res => {
      const response = res.data;
      if (response.statusCode === 200) {
        dispatch({
          type: 'SAVELINK',
          payload: response.data
        })
      } else if( response.statusCode === 404){
        localStorage.clear();
        dispatch({
          type: 'UNAUTHENTICATE_USER',
          payload: response.result.message
        })
      } 
      else {
        dispatch({
          type: 'STORESURVEYNOTE_ERR',
          payload: response?.message
        })
      }
    }).catch(err => {
     
      debugger
      dispatch({
        type: 'STORESURVEYNOTE_ERR',
        payload: 'Something went wrong.'
      })
    })
  }else{
    dispatch({
      type: 'TOKENNOTSAVED_ERR',
      payload: 'Something went wrong.'
    })
  }
}



export const getSurveyReportsListDropdown = (questnaireData) => async dispatch => {
  let tokens = await JSON.parse(localStorage.getItem('token'));
  if(tokens){
    const token = tokens.accessToken;
    baseURL.post(`/fetchsurveyreportlist`,questnaireData, {
    headers: {
        'Authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
  }).then(res => {
      const response = res.data;
      if (response.statusCode === 200) {
        dispatch({
          type: 'FETCHALLQUESTNAIRE',
          payload: response.data
        })
      } else if( response.statusCode === 404){
         localStorage.clear();
        
        dispatch({
          type: 'UNAUTHENTICATE_USER',
          payload: response.result.message
        })
      } 
      else {
        dispatch({
          type: 'FETCHALLYOUNGPEOPLE_ERR',
          payload: response.message
        })
      }
    }).catch(err => {
      
      dispatch({
        type: 'FETCHALLYOUNGPEOPLE_ERR',
        payload: 'Something went wrong.'
      })
    })
  }else{
    dispatch({
      type: 'TOKENNOTSAVED_ERR',
      payload: 'Something went wrong.'
    })
  }
  
}

export const unmountSurveyResponse = () => async dispatch => { 
  dispatch({
    type: 'UNMOUNTSURVEYRESPONSE'
  })
}

export const emptyQuestionRespondObject = () => async dispatch => { 
  dispatch({
    type: 'EMPTYQUESTIONRESPONDOBJECT'
  })
}

export const emptyPrevAnswerObject = () => async dispatch => { 
  dispatch({
    type: 'EMPTYPREVANSWEROBJECT'
  })
}


const islogin = {
  "userAuthenticate": 0,
  "status": '0',
  "message": '',
  'uservalue': {},
  'uservalueupdat':'',
  'updateUserRecord': '',
  'allcenters':[],
  'usererror': '',
  'leftmenu': 'Dashboard',
  'usersvalue': [],
  'mailSendResponse': {},
  'forgetPasswordChange': {},
  'todosdata':{},
  'askforapprovals':{},
  'respondentinformationstatus':{},
  'desktopreport':{},
  'users': {},
  'loaderflag':true,
  "usersFetchYoungPeople": {},
  "usersFetchYoungPeopleDash": {},  
  'user': {},
  'usersManagement':{},
  'updateUserResult': {},
  'search':{},
  'youngpeoplenam':'',
  'grapgdatareport':[],  
  'searchData':{},
  'dashboardgraph':{},
  'questnaire':{},
  'surveyQuestionnaire': {},
  'surveyOptions': {},
  'surveyPrevAnswerObject': {},
  'questnaire':{},
  'insertSurveyWithResponse': {},
  'getSurveyResponseForYoungPeople': {},
  'getQuestionaireRespondentNotes': {},
  'newNotificationList': {},
  'updateNotificationStatusResponse' : {},
  'moduleListResponse': {},
  'surveyNoteResponse': {},
  'firstsurveyName':{},
  'submitallsurvey':{},
  "uservalueloginheaderdata":{}
}


const reducer = (state = islogin, action) => {
  switch (action.type) {
    case 'GET_STATE':
      return { ...state, }
      case 'SETLOADDERFLAG':
        return { ...state, loaderflag:action.payload, }
      
      
    case 'GET_USER':
      return {
        ...state,
        uservalue: action.payload,
       
        usererror: '',
        userAuthenticate: 0
      }
      case 'GET_USERLOGININFO':
        return {
           ...state,
           uservalueloginheaderdata: action.payload,     
        }
      
    case 'GET_SIDEBAR':
      return {
        ...state,
        leftmenu: action.payload,
        usererror: ''
      }
      case 'GET_YOUNGPEOPENAM':
        return {
          ...state,
          youngpeoplenam: action.payload,
          usererror: ''
        }
      
    case 'UNAUTHENTICATE_USER':
    case 'GET_USER_ERR': 
      return {
        ...state,
        usererror: action.payload,
        uservalue: '',
        userAuthenticate: 1
    }
    
    case 'FETCHUSERBYID_ERR':
      return {
        ...state, userAuthenticate: 1
      }

    case 'GET_USERERR':
      return {
        ...state,
        usererror: action.payload,
        uservalue: ''
      }
    case 'UPDATEPASS':
      return {
        ...state,
        updateUserRecord: action.payload.data,
        usererror: ''
      }

    case 'FETCHALLGETTODOS_ERR':
      return {
        ...state,
        usererror: action.payload,
        uservalue: ''
      }
    case 'GETTODOS':
      return {
        ...state,
        todosdata: action.payload,
        usererror: ''
        
      }
    case 'GETGRAPHDATA':
      return {
        ...state,
        grapgdatareport:  [
            {
              name: 'Survey -1',
              
              data: [51,40,49,50,58]
            },
            {
              name: 'Survey -2',
              data: [58,56,53,51,59]
            },
            {
              name: 'Survey -3',
              data: [58,51,53,57,59]
            },
            
            {
              name: 'Survey -4',
              data: [57,52,47,32,56]
            },
            
          ],
        
        usererror: ''
        
      }
        
    case 'GETREPORT':
      return {
        ...state,
        desktopreport: action.payload,
        usererror: ''
        
      }   
    case 'UPDATEPASSERR':
      return {
        ...state,
        usererror: action.payload,
        uservalue: '',
        updateUserRecord: ''
      }

    case 'UPDATEEMAIL':
      return {
        ...state,
        uservalueupdat: action.payload.data,
        usererror: '',
        updateUserRecord: ''
      }

    case 'UPDATEEMAILERR':
      return {
        ...state,
        usererror: action.payload,
        uservalue: ''
      }

    case 'UPDATEEMAILOTP':
      return {
        ...state,
        updateUserRecord: action.payload.data,
        usererror: ''
      }

    case 'UPDATEEMAILOTPERR':
      return {
        ...state,
        usererror: action.payload,
        uservalue: ''
      }


    case 'FORGET_SEND_USERNAME':
      return {
        ...state, forgetPasswordChange: { status: 1, message: action.payload.message ? action.payload.message : 'Mail sent successfully' }
      }

    case 'FORGET_SEND_USERNAME_ERR':
      return {
        ...state, forgetPasswordChange: { status: 0, message: action.payload }
      }
    case 'FORGET_SEND_USERDATA':
      return {
        ...state, forgetPasswordChange: { status: 1, isUpdated: true, message: action.payload.message ? action.payload.message : 'Password updated successfully' }
      }

    case 'FORGET_SEND_USERDATA_ERR':
      return {
        ...state, forgetPasswordChange: { status: 0, message: action.payload }
      }
    case 'FETCHALLUSERS':
      return {
        ...state, usersManagement: { status: 1, list: action.payload }
      }
      case 'FETCHALLUSERSUPDATE':
        return {
          ...state, usersManagement: { status: 2, list: action.payload }
        }
     case 'FETCHALLUSERS_ERR':
    case 'FETCHALLUSERS_ERR':
      return {
        ...state, users: { status: 0, message: action.payload }
      }
    case 'FETCHUSERBYID':
      return {
        ...state, user: { status: 1, list: action.payload }
      }
      
      case 'ASKFORAPPROVAL':
      return {
        ...state, askforapprovals: { status: 1, list: action.payload }
      }
      case 'ALLCENTERS':
    case 'ALLCENTERS':
        return {
          ...state, allcenters:action.payload
        }
      
    case 'FETCHUSERBYID_ERR':
      return {
        ...state, user: { status: 0, message: action.payload }
      }

      case 'SUBMITALLSURVEY':
        return {
          ...state, submitallsurvey:action.payload
        }
      
      
    case 'GETGRAPHDASHBOARD':
        return {
          ...state, dashboardgraph: { status: 1, list: action.payload }
        }
    case 'GETGRAPHDASHBOARD_ERR':
        return {
          ...state, user: { status: 0, message: action.payload }
        }
    case 'UPDATEUSERBYID':
      return {
        ...state, usersManagement: { status: 1, list: action.payload.data }
    
      }
    case 'UPDATEUSERBYID_ERR':
      return {
   
      ...state, updateUserResult: { status: 0, message: action.payload }
      }
    case 'FETCHALLYOUNGPEOPLE':
      return {
        ...state, usersFetchYoungPeople: { status: 1, list: action.payload }
      }

    case 'FETCHALLYOUNGPEOPLEDASHB':
        return {
          ...state, usersFetchYoungPeopleDash: { status: 1, list: action.payload }
        }
      
    case 'FETCHALLYOUNGPEOPLEBYNAME':
      return {
        ...state, search: { status: 1, list: action.payload }
      }

    case 'FETCHALLYOUNGPEOPLEBYNAMEHeader':
        return {
          ...state, searchData: { status: 1, list: action.payload }
        }
      

    case 'FETCHALLQUESTNAIRE':
      return {
        ...state, questnaire: { status: 1, fetchQuesionnaire: true, list: action.payload }
      }

    case 'ADDYOUNGPEOPLEBYID':
      return {
        ...state, search: { status: 1, list: action.payload.data },
        users: { status: 1, list: action.payload.data },
        message:  action.payload.message
      }

    case 'FETCHALLYOUNGPEOPLE_ERR':
      return {
        ...state, message:  action.payload
      }
    case 'GETQUESTIONNAIRELIST':
      return {
        ...state, surveyQuestionnaire: { status: 1, isSetPropertyQuestion: true, list: action.payload }        
      }

    case 'GETQUESTIONNAIRE_ERR':
      return {
        ...state, surveyQuestionnaire: { status: 0, isSetPropertyQuestion: false, message: action.payload }
      }

    case 'GETQUESTIONOPTION':
      return {
        ...state, surveyOptions: { status: 1, list: action.payload }        
      }

    case 'GETQUESTIONOPTION_ERR':
      return {
        ...state, surveyOptions: { status: 0, message: action.payload }
      }
    case 'GETANSWERID':
      return {
        ...state, surveyPrevAnswerObject: { status: 1, isUpdateSelectOptionValue: true, answerObject: action.payload }        
      }
    case 'GETANSWERIDEMPTY':
  
      return {
        ...state, surveyPrevAnswerObject: { status: 2, isUpdateSelectOptionValue: true }        
      }

    case 'GETANSWERID_ERR':
      return {
        ...state, surveyPrevAnswerObject: { status: 0, isUpdateSelectOptionValue: true, message: action.payload }
      }
    case 'INSERTSURVEYQUESTIONRESPONSE':
      return {
        ...state, insertSurveyWithResponse: { status: 1, ownChangeIndex: false, isUpdateProgressBar: true, data: action.payload }        
      }

    case 'INSERTSURVEYQUESTIONRESPONSE_ERR':
      return {
        ...state, insertSurveyWithResponse: { status: 0, ownChangeIndex: true, isUpdateProgressBar:false, message: action.payload }
      }

    case 'GETSURVEYRESPONSE':
      return {
        ...state, getSurveyResponseForYoungPeople: { status: 1,  list: action.payload }
      }

      case 'GETRESPONDENTINFORMATIONSTATUS':
        return {
          ...state, respondentinformationstatus: { status: 1,  list: action.payload }
        }
      
    case 'GETSURVEYRESPONSE_ERR':
      return {
        ...state, getSurveyResponseForYoungPeople: { status: 0, message: action.payload }
      }

    case 'RESPONDENTNOTESRESPONSE':
      return {
        ...state, getQuestionaireRespondentNotes: { status: 1, data: action.payload }
      }

    case 'RESPONDENTNOTESRESPONSE_ERR':
      return {
        ...state, getQuestionaireRespondentNotes: { status: 0, message: action.payload }
      }

    case 'NEWNOTIFICATIONLISTRESPONSE':
      return {
        ...state, newNotificationList: { status: 1, list: action.payload }
      }
    case 'NEWNOTIFICATIONLISTRESPONSE_ERR':
      return {
        ...state, newNotificationList: { status: 0, message: action.payload }
      }
    case 'UPDATENOTIFICATIONSTATUS':
      return {
        ...state, updateNotificationStatusResponse: { status: 1, updateNotificationState: true, list: action.payload }
      }
    case 'UPDATENOTIFICATIONSTATUS_ERR':
      return {
        ...state, updateNotificationStatusResponse: { status: 0, updateNotificationState: false, message: action.payload }
      } 
    case 'GETMODULELIST':
      return {
        ...state, moduleListResponse: { status: 1, list: action.payload }
      }

      case 'SAVELINK':
        return {
          ...state, insertSurveyWithResponse: { status: 1, list: action.payload }
        }
      
    case 'GETMODULELIST_ERR':
      return {
        ...state, moduleListResponse: { status: 0, message: action.payload }
      } 
    case 'STORESURVEYNOTE':
      return {
        ...state, surveyNoteResponse: { status: 1, isSurveyNoteStored: true, data: action.payload }
      }
      case 'SURVEYNAME':
        return {
          ...state, firstsurveyName: { status: 1,  data: action.payload }
        }
    case 'STORESURVEYNOTE_ERR':
      return {
        ...state, surveyNoteResponse: { status: 0, isSurveyNoteStored: false, message: action.payload }
      }
    case 'UNMOUNTSURVEYRESPONSE':
      return {
        ...state, surveyQuestionnaire: {}, surveyOptions: {}, surveyPrevAnswerObject: {}, insertSurveyWithResponse: {}
      }
    case 'EMPTYQUESTIONRESPONDOBJECT':
      return {
        ...state, insertSurveyWithResponse: {}
      }
    case 'EMPTYPREVANSWEROBJECT':
      return {
        ...state, surveyPrevAnswerObject: {}
      }  
    default:
      return state
  }
}
export default reducer;
import axios from 'axios';

let api_server = 'https://127.0.0.1:8070/api/v1'
let localApiUrl = 'http://127.0.0.1:8070/api/v1'
let devApiUrl = 'https://yv-be-dev.8bitsolutions.net/api/v1'
let qaApiUrl ='https://yv-be-qa.8bitsolutions.net/api/v1'
let uatApiUrl ='https://api.uat.myyouthvoice.co.uk/api/v1'
let liveApiUrl = 'https://api.myyouthvoice.co.uk/api/v1'

switch (window.location.origin) {
 default:
  case 'http://127.0.0.1/api/v1': // local
    api_server = localApiUrl;
    break

  case 'https://yv-fe-dev.8bitsolutions.net':
    api_server = devApiUrl;
    break

  case 'https://yv-fe-qa.8bitsolutions.net':
    api_server = qaApiUrl;
    break

  case 'https://uat.myyouthvoice.co.uk':
    api_server = uatApiUrl;
    break

  case 'https://www.myyouthvoice.co.uk':
    api_server = liveApiUrl;
    break
}
axios.defaults.baseURL = api_server;
export default axios;
let localApiUrl = 'http://127.0.0.1:8070/api/v1'
let devApiUrl = 'https://yv-be-dev.8bitsolutions.net/api/v1'
let qaApiUrl ='https://yv-be-qa.8bitsolutions.net/api/v1'
let uatApiUrl ='https://api.uat.myyouthvoice.co.uk/api/v1'
let liveApiUrl = 'https://api.myyouthvoice.co.uk/api/v1'
let api_server = ''

switch (window.location.origin) {
 default:
  case "http://127.0.0.1": // local
    api_server = localApiUrl;
    break

  case "https://yv-fe-dev.8bitsolutions.net":
    api_server = devApiUrl;
    break

  case "https://yv-fe-qa.8bitsolutions.net":
    api_server = qaApiUrl;
    break

  case "https://uat.myyouthvoice.co.uk":
    api_server = uatApiUrl;
    break

  case "https://www.myyouthvoice.co.uk":
    api_server = liveApiUrl;
    break
}

export default {
  BACKEND: api_server
};
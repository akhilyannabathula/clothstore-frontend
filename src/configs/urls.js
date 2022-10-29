// http.js

const env = 'production'

const getBaseUrl = () => {
    let url;
    switch(env) {
      case 'production':
        url = 'https://cloth-api.onrender.com/';
        break;
      case 'development':
        url = 'http://localhost:8085/';
        break;
      default:
        url = 'http://localhost:8085/'
    }
  
    return url;
  }
  
  export const baseURL = getBaseUrl()
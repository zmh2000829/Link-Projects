import axios from 'axios'
import qs from 'qs'
import _ from 'lodash'

//let baseURL = 'http://localhost/newYearDraw/server/public/index.php/'
let baseURL = 'https://www.link-studio.cn/2021newyear/server/public/index.php/'

let request = async (requestMethod = 'get', requestConf) => {
  requestConf.headers = {}
  requestConf.timeout = 5000
  requestConf.method = requestMethod
  console.log(requestConf)
  let response = await axios.request(requestConf).catch(
    function (error) {
    let data = {
      code: 404,
      data: null,
      error: error + ''
    }
    return {data: data}
  
    }
  )
  return response.data
}

let get = (url = '', params = {}) => {
  let requestConf = {
    url,
    baseURL: baseURL,
    params
  }

  let response = request('get', requestConf)
  return response
}

let del = (url = '', params = {}) => {
  let requestConf = {
    url,
    baseURL: baseURL,
    params
  }
  let response = request('post', requestConf)
  return response
}

let post = async (url = '', params = {}) => {
   console.log(params);
   console.log(qs.stringify({params}))
   params = _.size(params) ? qs.stringify(params) : {}
  
  let requestConf = {
    url,
    baseURL: baseURL,
    data: params
  }
  console.log(requestConf)
  let response = await request('post', requestConf)
  return response
}

let put = async (url = '', params = {}) => {
  params = _.size(params) ? qs.stringify(params) : {}
  let requestConf = {
    url,
    baseURL: baseURL,
    data: params
  }
  let response = await request('put', requestConf)
  return response
}

export default{
  post,
  get,
  put,
  del,
  baseURL
}

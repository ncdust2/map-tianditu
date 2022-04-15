import axios from 'axios'
const instance = axios.create({});
instance.interceptors.request.use(config => {
  console.log(window.sessionStorage)
  // 在最后必须 return config
  if (config.method === "get") {
            config.data = { unused: 0 }; // 这个是关键点，加入这行就可以了,解决get,请求添加不上Content-Type       
            }
        config.headers["Content-type"] = "application/json;charset=UTF-8";
        var stoken = window.sessionStorage.getItem('token');
        console.log(stoken)
        config.headers["token"] = window.sessionStorage.getItem('token');
  return config
}, error => {
 // 处理请求错误
 console.log(error); // for debug
 Promise.reject(error);
 }
)

export default instance

import axios from "axios";
import router from "./router";
import Element from "element-ui"
// 拦截器配置
// axios.defaults.baseURL = "http://localhost:8081"
// 添加请求头和超时设置
const request = axios.create({
    timeout: 5000,
    headers: {
        'Context-Type': "application/json;charset=utf-8",
    }
})
// 请求添加token
request.interceptors.request.use(config => {
    config.headers["Authorization"] = localStorage.getItem("token")
    return config
})
// 判断返回是是不是200，不是就报异常
request.interceptors.response.use(response => {
        let res = response.data
        if (res.code === 200) {
            return response
        } else {
            // Promise.reject()方法返回一个带有拒绝原因的Promise对象。
            Element.Message.error(res.msg ? res.msg : "系统异常")
            return Promise.reject(response.data.msg)
        }
    }, error => {
        if(error.response.data){
            error.massage = error.response.data.msg
        }

        if(error.response.status === 401){
            router.push("/login")
        }

        Element.Message.error(error.massage,{duration:3000})

        return Promise.reject(error)
    }
)

export default request
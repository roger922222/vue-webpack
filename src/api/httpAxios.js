import axios from 'axios'
import qs from 'qs'
// import { env } from './env'
import store from '../store'

const serverContext = {
    // 放置一些接口的参数
}

console.log(serverContext)

// 请求时的截拦器
axios.interceptors.request.use(config => {
    // 发送请求做的处理
    store.dispatch('loading')
    return config
}, error => {
    // 请求异常时做的一些处理
    store.dispatch('hideing')
    return Promise.reject(error)
})

// 请求完成后的截拦器
axios.interceptors.response.use(response => {
    // 返回响应时做的一些处理
    // 这里的response返回的是一个对象
    // {
    // data: {}  服务器提供的响应
    // status http状态码
    // statusText: http状态消息
    // headers: {} 服务器响应头
    // config: {} axios 的配置
    // }
    store.dispatch('hideing')
    return response
}, error => {
    store.dispatch('hideing')
    return Promise.reject(error.response)
})

const errorState = (res) => {
    // 错误的处理
}

const successState = (res) => {
    // 对200，非业务数据的处理
}

const httpServer = (opts) => {
    let url = 'https://localhost'
    // 公共参数
    let Publish = {

    }

    let httpDefaultOpts = {
    //   baseURL,
        method: opts.method || 'post',
        url: `${url}${opts.url}`,
        params: Object.assign(Publish, opts.data),
        data: qs.stringify(Object.assign(Publish, opts.data)),
        headers: opts.method === 'get' ? {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
        } : {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    }

    if (opts.methods === 'get') {
        delete httpDefaultOpts.data
    } else {
        delete httpDefaultOpts.params
    }

    let promise = new Promise((resolve, reject) => {
        axios(httpDefaultOpts).then(res => {
            successState()
            resolve(res.data)
        }).catch(err => {
            errorState()
            reject(err)
        })
    })

    return promise
}

export default httpServer

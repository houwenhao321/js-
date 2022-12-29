import Axios from 'axios'
import config from '../config'
import { ErrorToken, GlobalResponseCode, BusinessResponseCode, ApiResult } from '@/api/backend'
import router from '@/router'

// 设置超时时间
const axios = Axios.create({
    timeout: config.timeout,
})

// 请求拦截处理token的情况
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.authToken = token
    }
    return config
})

// 响应拦截
axios.interceptors.response.use(
    (response) => {
        // 我们一般在这里处理，请求成功后的错误状态码 例如状态码是500，404，403
        // console.log("响应的数据：",response)
        return Promise.resolve(response)
    },
    (error) => {
        // 服务器响应发生错误时的处理
        Promise.reject(error)
    }
)

// 定义类
class MyAxios {
    get(url, params) {
        return this.request(axios.get(url, params))
    }
    post(url, data) {
        return this.request(axios.post(url, data))
    }
    put(url) {
        return this.request(axios.put(url))
    }
    /**统一响应封装 */
    async request(axiosRequest) {
        try {
            const res = await axiosRequest
            // 请求失败的情况
            if (!res.data || res.data.code != '000000') {
                this.resCodePrompt(res.data.code)
                console.warn('SeverError', res)
                // 处理失败结果
                return new ApiResult().setError(res.data)
            }
            // 请求成功的处理
            return new ApiResult().setSuccess(res.data)
        } catch (error) {
            // TODO 这里需要验证失败的情况
            const res = error.response
            // 根据状态吗进行提示
            this.resErrorPrompt(res)
            return new ApiResult().setNetworkError()
        }
    }

    /**效验返回码 */
    resCodePrompt(resCode) {
        // 判断是否是token的问题
        if (ErrorToken.includes(resCode)) {
            // 清除token
            // cookie.delCookie('token')
            this.$message({ type: 'error', message: '登录凭证无效，请重新登录' })
            router.push('/login')
        }
        // 判断不是token的问题
        const message = GlobalResponseCode[resCode] || BusinessResponseCode[resCode]
        if (message) {
            return this.$message({ type: 'error', message: '登录凭证无效，请重新登录' })
        }
    }

    /**错误的返回码处理 */
    resErrorPrompt(res) {
        if (!res) {
            this.$message({ type: 'error', message: '网络错误！' })
        } else if (res.status === 404) {
            this.$message({ type: 'error', message: '找不到资源！' })
        } else if (res.status === 500) {
            this.$message({ type: 'error', message: '内部错误！' })
        } else {
            // 其余统一提示状态码
            this.$message({ type: 'error', message: `${res.status}` })
        }
    }
}

export const myAxios = new MyAxios()

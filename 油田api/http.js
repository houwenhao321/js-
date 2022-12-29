//  基于axios 封装的http请求插件
const axios = require('axios');

/**
 * 以下这种方式需要调用Vue.use方法 调用的时候调用 this.$fetch, this.$post, this.$axios, this.$put, this.$del 方法
 *
 * @param {*} data
 * @return {*} 
 */
const coverFormData = (data) => {
  return Object.keys(data).map(key => {
    let value = data[key];
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    return encodeURIComponent(key) + '=' + encodeURIComponent(value);
  })
}

// 
const http = {
    /**
     *
     *
     * @param {*} Vue  vue实例
     * @param {*} Option 信息
     */
    install(Vue, Option) {
        axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        if (Option) {
        // 超时设置
        axios.defaults.timeout = Option.timeout || 10000;
        // 默认请求地址设置
        axios.defaults.baseURL = Option.baseURL || "";
        // 头部设置
        if (Option.headers && typeof Option.headers === 'object') {
            for (let key in Option.headers) {
            if (!Option.headers.hasOwnProperty(key)) continue;
            axios.defaults.headers[key] = Option.headers[key];
            }
        }
        // 请求/响应拦截器
        Option.inRequest && axios.interceptors.request.use(Option.inRequest, error => {
            Promise.reject(error);
        });
        Option.inResponse && axios.interceptors.response.use(Option.inResponse, error => {
            Promise.reject(error);
        });
    }
    /**
     * @param  {string} url
     * @param  {object} params={}  参数可以根据需要自行处理
     */
    const fetch = (url, params = {}, config = {}) => {
      const str = coverFormData(params).join('&');
      return new Promise((resolve, reject) => {
        let address = url;
        if (str) {
          address += '?' + str;
        }
        axios.get(address, config).then(res => {
          resolve(res.data);
        }).catch(error => {
          reject(error);
        });
      });
    };

    /**
     * @param  {string} url
     * @param  {object} data={} 参数可以根据需要自行处理
    
     */
    const post = (url, data = {}, config = {}) => {
      const str = coverFormData(data).join('&');
      return new Promise((resolve, reject) => {
        axios.post(url, str, config).then(res => {
          resolve(res.data);
        }).catch(error => {
          reject(error);
        });
      });
    };

    /**
     * @param  {string} url
     * @param  {object} data={} 参数可以根据需要自行处理
     */
    const put = (url, data = {}, config = {}) => {
      const str = coverFormData(data).join('&');
      return new Promise((resolve, reject) => {
        axios.put(url, str, config).then(res => {
          resolve(res.data);
        }).catch(error => {
          reject(error);
        });
      });
    };

    /**
     * @param  {string} url
     * @param  {object} params={}
     */

    const del = (url, config = {}) => {
      const str = coverFormData(config).join('&');
      return new Promise((resolve, reject) => {
        axios.delete(url, str).then(res => {
          resolve(res.data);
        }).catch(error => {
          reject(error);
        });
      });
    };
    const data = { axios, fetch, post, put, del };
    Object.keys(data).map(item => Object.defineProperty(Vue.prototype, '$' + item, { value: data[item] }));
  }
};

export default http;
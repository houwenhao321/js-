/*
 * @Author: houwenhao321 2942573925@qq.com
 * @Date: 2023-02-28 10:18:45
 * @LastEditors: houwenhao321 2942573925@qq.com
 * @LastEditTime: 2023-02-28 10:23:18
 * @FilePath: \publicFun\scuiApi\api\model\auth.js
 * @Description: 
 */
import config from "../../config"
// import http from "/utils/request"
import http from "../../utils/request"

export default {
	token: {
		url: `${config.API_URL}/token`,
		name: "登录获取TOKEN",
		post: async function(data={}){
			return await http.post(this.url, data);
		}
	}
}

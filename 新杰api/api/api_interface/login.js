import { myAxios } from '../myAxios'

export default {
    // 请求登录接口
    queryLogin(mobileNo) {
        return myAxios.post('/backend/pep/web/service-policy/login', mobileNo )
    }
}

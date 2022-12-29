/**错误响应吗 关于token验证的 */
export const ErrorToken = ['000002', '000003', '000004']

/**全局响应码 000000--000100（包括000000和000100）*/
export const GlobalResponseCode = {
    /**成功*/
    '000000': '成功',
    /**请求失败 */
    '000001': '请求失败',
    /**令牌为空 */
    '000002': '请重新登录',
    /**令牌过期 */
    '000003': '请重新登录',
    /**令牌无效 */
    '000004': '请重新登录',
    /**非法请求 */
    '000005': '非法请求',
    /**参数非法 */
    '000006': '参数非法',
    /**参数为空 */
    '000007': '数据为空',
}

/**关于业务逻辑上的响应码 */
export const BusinessResponseCode = {
    /**账号不存在 */
    '000101': '账号信息有误,请确认',
    /**图片验证码不一致 */
    '000102': '图片验证码有误',
    /**短信验证码不一致 */
    '000103': '短信验证码错误',
    /**与保单绑定的手机号不一致 */
    '000104': '手机号有误,请确认',
    /**未勾选同意条款 */
    '000105': '请先勾选保单设计须知。',
    /**短信验证码获取频繁 */
    '000106': '短信验证码获取频繁',
    /**修改保单失败 */
    '000107': '修改失败',
    /**添加保单信息失败 */
    '000108': '添加保单信息失败',
    /**保单已存在 */
    '000109': '保单已存在',
    /**内部错误 */
    '000110': '内部错误',
    /**保单设计已完成 */
    '000111': '保单设计已完成',
    /**获取图片信息失败 */
    '000112': '获取图片失败,请刷新重试',

    '000113': '图片保存失败,请重试',

    '000114': '上传文件过大,请重新上传',

    '000115': '文件上传失败,请重新上传',

    '000116': '已参加该活动',
    '000117': '活动已结束',
    '000118': '参加的活动不存在',
}

/**请求状态 */
export const RequestStu = {
    /** 请求成功 */
    success: 'success',
    /** 请求错误 */
    error: 'error',
    /** 连接失败 */
    networkError: 'networkError',
}

/**结果封装 */
export class ApiResult {
    /**请求是否成功 */
    isSuccess = false

    /**请求结果状态 */
    stu = RequestStu.success

    /**状态码 */
    code = '000000'

    /**描述信息 */
    msg = ''

    /**请求结果数据 */
    data = null

    /**后端返回成功 */
    setSuccess(res) {
        this.isSuccess = true
        this.stu = RequestStu.success
        this.msg = res.msg
        this.data = res.data
        this.code = res.code
        return this
    }

    /** 后端返回失败 */
    setError(res) {
        this.stu = RequestStu.error
        this.msg = res.msg
        this.code = res.code
        return this
    }

     /** 网络错误 */
     setNetworkError() {
        this.stu = RequestStu.networkError
        return this
    }
}

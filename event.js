/**
 *  防抖函数
 *
 * @param {Function} fun   Function  要进行防抖的函数事件
 * @param {Number} time  Number    防抖的时间间隔
 * @return {*}
 */
const debounce = (fun, time) => {
  let timer = null;
  return () => {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(fun, time);
  };
};

/**
 * 节流函数
 *
 * @param {Function} fun   Function  要进行防抖的函数事件
 * @param {Number} time  Number    防抖的时间间隔
 * @return {*}
 */
const throttle = (fun, time) => {
  let flag = true;
  let interval = time || 500;
  return () => {
    let args = arguments;
    if (flag) {
      fun.apply(this, args);
      flag = false;
      setTimeout(() => {
        flag = true;
      }, interval);
    }
  };
};

/**
 * 数组去重
 *
 * @param {Object} arr 要进行去重的数组
 * @return {*}
 */
const unique = (arr) => {
  return [...new Set(arr)];
};

/**
 * 输入值返回其基本数据类型
 *
 * @param {any} para
 * @return {*}
 */
const type = (para) => {
  return Object.prototype.toString.call(para);
};

/**
 * 返回当前时间
 *
 * @return {*}
 */
function getDateTime() {
  const checkTime = (i) => {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  };
  let date = new Date(),
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate(),
    hour = date.getHours() + 1,
    minute = date.getMinutes(),
    second = date.getSeconds();
  month = checkTime(month);
  day = checkTime(day);
  hour = checkTime(hour);
  minute = checkTime(minute);
  second = checkTime(second);

  return (
    year +
    "年" +
    month +
    "月" +
    day +
    "日" +
    hour +
    "时" +
    minute +
    "分" +
    second +
    "秒"
  );
}

/**
 * 判断值是不是 null, undefined, 空字符串
 *
 * @param {*} vel
 * @return {*}  Boolean
 */
const isNull = (vel) => {
  if (typeof vel == "undefined") {
    return true;
  }
  if (!vel && typeof vel !== "undefined" && vel != 0) {
    return true;
  }
  if (val == "" || val == "") {
    return true;
  }
};

/**
 * 小数点后几位
 *
 * @param {number} exp 需要计算的表达式
 * @param {number} digit 小数位数
 * @return {number}
 */
const formatFloatExp = (exp, digit) => {
  // Math.pow(指数，幂指数)
  let m = Math.pow(10, digit);
  // Math.round（） 四舍五入
  return Math.round(exp * m, 10) / m;
};

/**
 * 数字小数点计算
 *
 * @param {number} num 要处理的数字
 * @param {number} digit 要保留的小数点位数
 * @return {number}
 */
const formatFloat = (num, digit) => {
  return num.toString().substring(0, num.toString().indexOf(".") + digit + 1);
};

/**
 * 加法函数，用来得到精确的加法结果
 * 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 * 调用：accAdd(arg1,arg2)
 * 返回值：arg1加上arg2的精确结果
 *
 * @param {number} arg1 第一个参数
 * @param {number} arg2 第二个参数
 * @return {number}
 */
const accAdd = (arg1, arg2) => {
  let r1, r2, m, c;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  c = Math.abs(r1 - r2);
  m = Math.pow(10, Math.max(r1, r2));
  if (c > 0) {
    let cm = Math.pow(10, c);
    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace(".", ""));
      arg2 = Number(arg2.toString().replace(".", "")) * cm;
    } else {
      arg1 = Number(arg1.toString().replace(".", "")) * cm;
      arg2 = Number(arg2.toString().replace(".", ""));
    }
  } else {
    arg1 = Number(arg1.toString().replace(".", ""));
    arg2 = Number(arg2.toString().replace(".", ""));
  }
  return (arg1 + arg2) / m;
};

/**
 * 减法函数，用来得到精确的减法结果
 * 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
 * 调用：accSub(arg1,arg2)
 * 返回值：arg1加上arg2的精确结果
 *
 * @param {number} arg1 减数
 * @param {number} arg2 被减数
 * @return {number}
 */
const accSub = (arg1, arg2) => {
  let r1, r2, m, n;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
  n = r1 >= r2 ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
};

/**
 * 乘法函数，用来得到精确的乘法结果
 * 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 * 调用：accMul(arg1,arg2)
 * 返回值：arg1乘以 arg2的精确结果
 *
 * @param {number} arg1 第一个参数
 * @param {number} arg2 第二个参数
 * @return {number}
 */
const accMul = (arg1, arg2) => {
  let m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (e) {}
  try {
    m += s2.split(".")[1].length;
  } catch (e) {}
  return (
    (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
    Math.pow(10, m)
  );
};

/**
 *
 * 除法函数，用来得到精确的除法结果
 * 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
 * 调用：accDiv(arg1,arg2)
 * 返回值：arg1除以arg2的精确结果
 *
 * @param {number} arg1
 * @param {number} arg2
 * @return {number}
 */
const accDiv = (arg1, arg2) => {
  let t1 = 0,
    t2 = 0,
    r1,
    r2;
  try {
    t1 = arg1.toString().split(".")[1].length;
  } catch (err) {
    console.log(err);
  }
  try {
    t2 = arg2.toString().split(".")[1].length;
  } catch (err) {
    console.log(err);
  }

  try {
    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    return (r1 / r2) * pow(10, t2 - t1);
  } catch (err) {
    console.log(err);
  }
};

/**
 * 深拷贝（深拷贝不考虑函数）
 *
 * @param {object} obj
 * @param {object} result
 * @return {*}
 */
const deepClone = (obj, result) => {
  let result = result || {};
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (typeof obj[prop] == "object" && obj[prop] !== null) {
        // 引用值(obj/array)且不为null
        if (Object.prototype.toString.call(obj[prop]) == "[object Object]") {
          // 对象
          result[prop] = {};
        } else {
          // 数组
          result[prop] = [];
        }
        deepClone(obj[prop], result[prop]);
      } else {
        // 原始值或func
        result[prop] = obj[prop];
      }
    }
  }
  return result;
};

/**
 * 深浅拷贝是针对引用值
 *
 * @param {object} target
 * @return {object}
 */
const deepClonePointer = (target) => {
  if (typeof target !== "object") {
    return target;
  }
  let result;
  if (Object.prototype.toString.call(target) == "[object Array]") {
    // 数组
    result = [];
  } else {
    // 对象
    result = {};
  }
  for (let prop in target) {
    if (target.hasOwnProperty(prop)) {
      result[prop] = deepClone(target[prop]);
    }
  }
  return result;
};

/**
 * 判断是android还是ios还是web
 *
 * @return {*}
 */
const isDevice = () => {
  let ua = navigator.userAgent.toLowerCase();
  if (ua.match(/iPhone\sOS/i) === "iphone os" || ua.match(/iPad/i) === "ipad") {
    // ios
    return "iOS";
  }
  if (ua.match(/Android/i) === "android") {
    return "Android";
  }

  return "Web";
};

/**
 * 获得滚动条的滚动距离
 *
 * @return {*}
 */
const getScrollOffset = () => {
  if (window.pageXOffset) {
    return {
      x: window.pageXOffset,
      y: window.pageYOffset,
    };
  } else {
    return {
      x: document.body.scrollLeft + document.documentElement.scrollLeft,
      y: document.body.scrollTop + document.documentElement.scrollTop,
    };
  }
};

/**
 * 验证邮箱的正则
 *
 * @param {*} sEmail 要验证的邮箱
 * @return {*}
 */
const isAvailableEmail = (sEmail) => {
  let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  return reg.test(sEmail);
};

/**
 * 验证手机号
 *
 * @param {*} number 要验证的手机号
 * @return {*}
 */
const isAvailableMobileNumber = (number) => {
  let reg = new RegExp("^1[3578]\\d{9}$");
  return reg.test(number);
};

/**
 * 获取浏览器信息，各主流浏览器
 *
 * @return {*}
 */
const getBrowser = () => {
  let u = navigator.userAgent;
  let bws = [
    {
      name: "sgssapp",
      it: /sogousearch/i.test(u),
    },
    {
      name: "wechat",
      it: /MicroMessenger/i.test(u),
    },
    {
      name: "weibo",
      it: !!u.match(/Weibo/i),
    },
    {
      name: "uc",
      it: !!u.match(/UCBrowser/i) || u.indexOf(" UBrowser") > -1,
    },
    {
      name: "sogou",
      it: u.indexOf("MetaSr") > -1 || u.indexOf("Sogou") > -1,
    },
    {
      name: "xiaomi",
      it: u.indexOf("MiuiBrowser") > -1,
    },
    {
      name: "baidu",
      it: u.indexOf("Baidu") > -1 || u.indexOf("BIDUBrowser") > -1,
    },
    {
      name: "360",
      it: u.indexOf("360EE") > -1 || u.indexOf("360SE") > -1,
    },
    {
      name: "2345",
      it: u.indexOf("2345Explorer") > -1,
    },
    {
      name: "edge",
      it: u.indexOf("Edge") > -1,
    },
    {
      name: "ie11",
      it: u.indexOf("Trident") > -1 && u.indexOf("rv:11.0") > -1,
    },
    {
      name: "ie",
      it: u.indexOf("compatible") > -1 && u.indexOf("MSIE") > -1,
    },
    {
      name: "firefox",
      it: u.indexOf("Firefox") > -1,
    },
    {
      name: "safari",
      it: u.indexOf("Safari") > -1 && u.indexOf("Chrome") === -1,
    },
    {
      name: "qqbrowser",
      it: u.indexOf("MQQBrowser") > -1 && u.indexOf(" QQ") === -1,
    },
    {
      name: "qq",
      it: u.indexOf("QQ") > -1,
    },
    {
      name: "chrome",
      it: u.indexOf("Chrome") > -1 || u.indexOf("CriOS") > -1,
    },
    {
      name: "opera",
      it: u.indexOf("Opera") > -1 || u.indexOf("OPR") > -1,
    },
  ];

  for (let i = 0; i < bws.length; i++) {
    if (bws[i].it) {
      return bws[i].name;
    }
  }

  return "other";
};

/**
 * 区分系统
 *
 * @return {*}
 */
function getOS() {
  let u = navigator.userAgent;
  if (!!u.match(/compatible/i) || u.match(/Windows/i)) {
    return "windows";
  } else if (!!u.match(/Macintosh/i) || u.match(/MacIntel/i)) {
    return "macOS";
  } else if (!!u.match(/iphone/i) || u.match(/Ipad/i)) {
    return "ios";
  } else if (!!u.match(/android/i)) {
    return "android";
  } else {
    return "other";
  }
}

/**
 * @description: 处理时间 将标准时间以 yyyy-mm-dd hh:mm:ss的格式返回
 * @param {*} date 处理后的时间
 * @return {*}
 * @Date: 2023-02-21 14:20:13
 * @Author: houwenhao32
 */
const spliceTime = date => {
  if (typeof date == 'string' && date.constructor == String) {
    return date;
  }
  const H = date.getHours(); // 小时
  const M = date.getMinutes(); // 分钟
  const S = date.getSeconds();

  return (
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
    '-' +
    (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
    ' ' +
    (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
    ':' +
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
    ':' +
    (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  );
};

/**
 * @description: 处理时间 将标准时间以 hh:mm:ss的格式返回
 * @param {*} date 处理后的时间
 * @return {*}
 * @Date: 2023-02-21 14:20:13
 * @Author: houwenhao32
 */
const newspliceTime = date => {
  if (typeof date == 'string' && date.constructor == String) {
    return date;
  }

  return date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
};

/**
 * @description: 处理时间 返回以hh:mm:ss格式的时间
 * @param {*} date 处理后的时间
 * @return {*}
 * @Date: 2023-02-21 14:20:13
 * @Author: houwenhao32
 */
const spliceTimes = date => {
  if (typeof date == 'string' && date.constructor == String) {
    return date;
  }

  return (
    (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
    ':' +
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
    ':' +
    (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  );
};

/**
 * @description: 将HH:MM:SS时间返回为标准时间
 * @param {*} time
 * @return {*}
 * @Date: 2023-06-09 08:36:57
 * @Author: houwenhao321
 */
const converTime = time => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = time.split(':')[0];
  const minutes = time.split(':')[1];
  return new Date(year, month, day, hour, minutes);
};

export {
  debounce,
  throttle,
  unique,
  type,
  getDateTime,
  isNull,
  formatFloat,
  formatFloatExp,
  accAdd,
  accSub,
  accMul,
  accDiv,
  deepClone,
  deepClonePointer,
  isDevice,
  getScrollOffset,
  isAvailableEmail,
  isAvailableMobileNumber,
  getBrowser,
  getOS,
  spliceTimes,
  converTime,
  newspliceTime,
  spliceTime,
};

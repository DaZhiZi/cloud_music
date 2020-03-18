const log = console.log.bind(console)

const e = (element) => {
    return document.querySelector(element)
}

const es = (elemets) => {
    return document.querySelectorAll(elemets)
}
const appendHtml = (element, html) => element.insertAdjacentHTML('beforeend', html)

const bindEvent = (element, eventName, callback) => {
    element.addEventListener(eventName, function (event) {
        callback(event)
    })
}

const bindAll = (elements, eventName, callback) => {
    for (let i = 0; i < elements.length; i++) {
        let element = elements[i]
        bindEvent(element, eventName, callback)
    }
}

const ajax = (request) => {
    let newRequest = new XMLHttpRequest()
    newRequest.open(request.method, request.url, true)
    if (request.contentType != undefined) {
        newRequest.setRequestHeader("Content-Type", request.contentType)
    }
    newRequest.onreadystatechange = () => {
        if (newRequest.readyState == 4) {
            let data = JSON.parse(newRequest.response)
            request.callback(data)
        }
    }
    if (request.method == "GET") {
        newRequest.send()
        return
    }
    let data = JSON.stringify(request.data)
    console.log("ajax发送的数据", data)
    newRequest.send(data)
}

const find = (element, selector) => {
    return element.querySelector(selector)
}
const findAll = (element, selector) => {
    return element.querySelectorAll(selector)
}

const toggleClass = (element, className) => {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

const hoverSrc = src => {
    if (!src.includes('hover')) {
        src = `${src.slice(0, -4)}_hover.png`
    }
    return src
}

const leaveSrc = (src) => {
    if (src.includes('hover')) {
        src = `${src.slice(0, -10)}.png`
    }
    return src
}

const zfill = (s) => {
    if (s.length == 1) {
        s = '0' + s
    }
    return s
}

const rjust = (str, size, delimeter = '0') => {
    let result = str
    while (result.length < size) {
        result = delimeter + result
    }
    return result
}

const mySetAttr = (element, key, newValue) => {
    element.setAttribute(key, newValue)
}

const myGetAttr = (element, key) => {
    return element.getAttribute(key)
}
const mySetCss = (element, properyName, newValue) => {
    element.style[properyName] = newValue
}
const mySetHtml = (element, string) => {
    element.innerHTML = string
}
const myTypeOf = a => {
    return Object.prototype.toString.call(a)
}

const myInt = num => parseInt(num, 10)

const myStr = s => String(s)

const myRepalce = (str, old_str, new_str) => {
    return str.split(old_str).join((new_str))
}
// 在 element 上绑定一个事件委托, 只会响应拥有 responseClass 类的元素
// 需要做成支持多个 responseClass 的形式
const bindEventDelegate = (element, eventName, callback, responseClass, useCapture = false) => {
    element.addEventListener(eventName, function (event) {
        let target = event.target
        let hasClass = target.classList.contains(responseClass)
        if (hasClass) {
            callback()
        }
    })
}
const removeClassAll = (className) => {
    let selector = '.' + className
    let elements = document.querySelectorAll(selector)
    for (let i = 0; i < elements.length; i++) {
        let e = elements[i]
        e.classList.remove(className)
    }
}

const addClassAll = (className, addName) => {
    let selector = '.' + className
    let elements = document.querySelectorAll(selector)
    for (let i = 0; i < elements.length; i++) {
        let e = elements[i]
        e.classList.add(addName)
    }
}
const giveClassAll = (elements, className) => {
    for (let ele of elements) {
        ele.classList.add(className)
    }
}
const removeChildAll = (element, idName) => {
    let selector = '#' + idName
    let elements = element.querySelector(selector)
    for (let i = 0; i < elements.childNodes.length; i++) {
        let e = elements.childNodes[i]
        elements.removeChild(e)
    }
}
const deleteClassAll = (elements, className) => {
    for (let ele of elements) {
        ele.classList.remove(className)
    }
}
const removeAll = (sel) => {
    let tags = document.querySelectorAll(sel)
    for (let i = 0; i < tags.length; i++) {
        let tag = tags[i]
        tag.remove()
    }
}

const hasClass = (element, className) => {
    return element.classList.contains(className)
}
const addClass = (element, className) => {
    element.classList.add(className)
}
const removeClass = (element, className) => {
    element.classList.remove(className)
}
const replaceClass = (element, classNameOld, classNameNew) => {
    element.classList.replace(classNameOld, classNameNew)
}

const closestClass = (element, className) => {
    /*
    element 是一个 DOM 元素
    className 是一个 string
    循环查找 element 的直系父元素
    如果父元素拥有 className 这个 class, 则返回这个父元素
    如果找到 document 都还没有, 则返回 null
    */
    let e = element
    while (e != null) {
        if (e.classList.contains(className)) {
            return e
        } else {
            e = e.parentElement
        }
    }
}

const closestId = (element, idName) => {
    /*
    element 是一个 DOM 元素
    idName 是一个 string
    循环查找 element 的直系父元素
    如果父元素拥有 idName 这个 id, 则返回这个父元素
    如果找到 document 都还没有, 则返回 null
    */
    let e = element
    while (e != null) {
        // 判断 e 是否包含 idName 这个 id
        if (e.id == idName) {
            return e
        } else {
            e = e.parentElement
        }
    }
}

const closestTag = (element, tagName) => {
    /*
    element 是一个 DOM 元素
    tagName 是一个 string
    循环查找 element 的直系父元素
    如果父元素是一个 tagName 标签, 则返回这个父元素
    如果找到 document 都还没有, 则返回 null

    tagName 是 'div' 'p' 'h1' 这样的标签名
    获取一个 DOM 元素的标签名的方法如下
    element.tagName
    需要注意的是, tagName 属性返回的标签名是大写的
    例如 'DIV' 'H1'
    所以你在比较的时候需要把 tagName 转换为大写字母
    使用如下 js 标准库函数转换
    tagName.toUpperCase()
    */
    let e = element
    while (e != null) {
        // 判断 e 是否和 tagName 相等
        if (e.tagName.toUpperCase() == tagName.toUpperCase()) {
            return e
        } else {
            e = e.parentElement
        }
    }
}

const myClosest = (element, selector) => {
    /*
    element 是一个 DOM 元素
    selector 是一个 string, 表示一个选择器
    可能的值是  'div'  '#id-div-gua'  '.red' 这三种

    循环查找 element 的直系父元素
    如果父元素符合选择器, 则返回这个父元素
    如果找到 document 都还没有, 则返回 null
    */
    let char = selector[0]
    if (char == '.') {
        let className = selector.slice(1)
        return closestClass(element, className)
    } else if (char == '#') {
        let idName = selector.slice(1)
        return closestId(element, idName)
    } else {
        let tag = selector
        return closestTag(element, tag)
    }
}

// JS 时间格式化
const myTime = function () {
    let d = new Date()
    let year = d.getFullYear()
    let month = d.getMonth() + 1
    let date = d.getDate()
    let hours = d.getHours()
    let minutes = d.getMinutes()
    let seconds = d.getSeconds()
    let timeString = `${year}/${month}/${date} ${hours}:${minutes}:${seconds}`
    return timeString
}
// 时间标准库
// ===
// 常用用法如下
/*
let d = new Date()
d.getFullYear()
年份, 2016
d.getMonth()
月份, 0-11
d.getDate()
日期, 1-31
d.getHours()
小时, 0-23
d.getMinutes()
分钟, 0-59
d.getSeconds()
秒数, 0-59
d.getMilliseconds()
毫秒, 0-999
d.getDay()
星期几, 0-6
*/
// 测试函数
const ensure = function (condition, message) {
    // condition 是布尔值
    // message 是 string, condition 不成立的时候被输出
    if (!condition) {
        console.log(message)
    } else {
        console.log('测试成功')
    }
}
// 判断浮点数相等
const floatEqual = function (a, b) {
    let delta = 0.0001
    return Math.abs(a - b) < delta
}
// 加强版测试函数
const ensureEqual = function (a, b, message) {
    if (JSON.stringify(a) != JSON.stringify(b)) {
        log(`${message} 大侄子测试出错:${a} != ${b}`)
    } else {
        log(`${message} 大侄子测试成功  牛逼!`)
    }
}
const arrayEqual = function (a, b) {
    if (a.length != b.length) {
        return false
    }
    let result = true
    for (let i = 0; i < a.length; i++) {
        let a1 = a[i]
        let b1 = b[i]
        if (a1 instanceof Array && b1 instanceof Array) {
            result = arrayEqual(a1, b1)
        } else {
            result = a1 == b1
        }
        if (!result) {
            return false
        }
    }
    return true
}
const objectEquals = (o1, o2) => {
    if (Object.keys(o1).length !== Object.keys(o2).length) {
        return false
    }
    for (let k1 in o1) {
        if (o1.hasOwnProperty(k1)) {
            let v1 = o1[k1]
            let v2 = o2[k1]
            // log('debug k', k1)
            // log('debug v1 v2', v1, v2)
            if ((v1 instanceof Array) && (v2 instanceof Array)) {
                let result = arrayEquals(v1, v2)
                if (!result) {
                    return false
                }
            } else if ((v1 instanceof Object) && (v2 instanceof Object)) {
                let result = objectEquals(v1, v2)
                if (!result) {
                    return false
                }
            } else {
                if (v1 !== v2) {
                    return false
                }
            }
        }
    }
    return true
}

// 判断 string 的元素全部是字母
const isFloat = (num) => {
    return n % 1 !== 0
}
const myAlphabet = function (s) {
    let lower = 'abcdefghijklmnopqrstuvwxyz'
    let upper = lower.toUpperCase()
    let alphabeta = lower + upper
    for (let i = 0; i < s.length; i++) {
        let char = s[i]
        if (!alphabeta.includes(char)) {
            return false
        }
    }
    return true
}
// 判断是否是合法的变量名，目前定义了数字、字母、下划线
const validName = function (s) {
    let lower = 'abcdefghijklmnopqrstuvwxyz'
    let upper = lower.toUpperCase()
    let digital = '0123456789'
    let alphabeta = lower + upper
    let limitText = alphabeta + digital + '_'
    for (let i = 0; i < s.length; i++) {
        if (limitText.includes(s[i]) === false) {
            return false
        }
    }
    return true
}
// 检查 s 中是否只包含数字
let isDigit = function (s) {
    /*
    s 是字符串
    检查 s 中是否只包含数字
    返回: bool, 如果 s 中包含的只有数字则返回 true, 否则返回 false
    */
    let digit = '0123456798'
    if (s.length == 0) {
        return false
    }
    for (let i = 0; i < s.length; i++) {
        if (digit.includes(s[i]) == false) {
            return false
        }
    }
    return true
}
// 判断只包含字母或数字
const alphabetaAndNumber = function (s) {
    let lower = 'abcdefghijklmnopqrstuvwxyz'
    let upper = lower.toUpperCase()
    let alphabeta = lower + upper
    let digital = '0123456789'
    let limitText = alphabeta + digital
    for (let i = 0; i < s.length; i++) {
        if (limitText.includes(s[i]) === false) {
            return false
        }
    }
    return true
}
// 返回一个 object 的 key=value&key=value 的形式
const queryFromObject = function (param) {
    let keys = Object.keys(param)
    let items = []
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i]
        let item = key + '=' + param[key]
        items.push(item)
    }
    let result = items.join('&')
    return result
}
// 将 foo=1&bar=far 格式的 string 返回 object
const argsFromQuery = function (queryString) {
    let pairs = queryString.split('&')
    let args = {}
    for (let i = 0; i < pairs.length; i++) {
        let p = pairs[i]
        let kv = p.split('=')
        args[kv[0]] = kv[1]
    }
    return args
}

// 返回一个 array, 包含了 a 中所有元素, 但不包含重复元素
const unique = function (a) {
    /*
    a 是一个 array
    返回一个 array, 包含了 a 中所有元素, 但不包含重复元素
    例如 a 是 [1, 2, 3, 1, 3, 5]
    返回 [1, 2, 3, 5]
    */
    let r = []
    for (let i = 0; i < a.length; i++) {
        if (!r.includes(a[i])) {
            r.push(a[i])
        }
    }
    return r
}
// 两数组交集
const intersection = function (a, b) {
    /*
    a b 都是 array
    返回一个 array, 里面的元素是同时出现在 a b 中的元素
    也就是取交集
    这个 array 中不包含重复元素
    */
    let r = []
    for (let i = 0; i < a.length; i++) {
        if (b.includes(a[i])) {
            r.push(a[i])
        }
    }
    return r
}
// 两数组求并集
const union = function (a, b) {
    /*
    a b 都是 array
    返回一个 array, 里面的元素是所有出现在 a b 中的元素
    这个 array 中不包含重复元素
    */
    let r = []
    for (let i = 0; i < a.length; i++) {
        r.push(a[i])
    }
    for (let i = 0; i < b.length; i++) {
        r.push(b[i])
    }
    return unique(r)
}
// a 对 b 的差集
const difference = function (a, b) {
    /*
    a b 都是 array
    返回一个 array, 里面的元素是
    所有在 a 中有 b 中没有的元素
    这个 array 中不包含重复元素
    */
    let d = intersection(a, b)
    let r = []
    for (let i = 0; i < a.length; i++) {
        if (!d.includes(a[i])) {
            r.push(a[i])
        }
    }
    return r
}
// 总差集
const differenceAll = function (a, b) {
    /*/
    a b 都是 array
    返回一个 array, 里面的元素是
    所有在 a b 中的非公共元素
    这个 array 中不包含重复元素
    /*/
    let a1 = difference(a, b)
    let a2 = difference(b, a)
    return a1.concat(a2).sort()
}
const isSubset = function (a, b) {
    /*/
    a b 都是 array
    检查是否 a 中的每个元素都在 b 中出现
    返回 bool
    /*/
    for (let i = 0; i < a.length; i++) {
        if (!b.includes(a[i])) {
            return false
        }
    }
    return true
}

// 判断是否是素数
const degreeToRadian = (angle) => {
    return angle * Math.PI / 180
}
const sin = (angle) => {
    let radian = degreeToRadian(angle)
    let s = Math.sin(radian)
    return s.toFixed(3)
}
const cos = (angle) => {
    let radian = degreeToRadian(angle)
    let s = Math.cos(radian)
    return s.toFixed(3)
}

const range = (a, b, step = 1) => {
    let result = []
    if (a < b) {
        if (step < 0) {
            step *= -1
        }
        for (let i = a; i < b; i += step) {
            result.push(i)
        }
    } else if (a > b) {
        if (step < 0) {
            step = Math.abs(step)
        }
        for (let i = a; i > b; i -= step) {
            result.push(i)
        }
    } else {
        log('error in range')
    }
    return result
}
const sum = (array) => {
    return array.reduce((sum, value) => {
        return sum + value
    })
}
const isPrime = function (n) {
    if (n < 2) {
        return false
    }
    for (let i = 2; i <= Math.sqrt(n); i++) {
        let a = n % i
        if (a === 0) {
            return false
        }
    }
    return true
}
// 判断是否是奇数和偶数
const isOdd = function (n) {
    // 取余数的操作符是 %
    // if(n % 2 != 0) {
    //     return true
    // } else {
    //     return false
    // }
    // 实际上, 这一段代码可以简单地写成下面的样式
    return n % 2 != 0
    // 或者下面的代码
    // let r = n % 2 != 0
    // return r
}
const isEven = function (n) {
    // 取余数的操作符是 %
    return n % 2 == 0
}
// 返回两个参数中较小的一个
const min = function (a, b) {
    if (a < b) {
        return a
    } else {
        return b
    }
}
// 求绝对值
const abs = function (n) {
    if (n < 0) {
        n = -n
    }
    return n
}
// 求平均数
const average = function (array) {
    let n = array.length
    let s = sum(array)
    return s / n
}
// 斐波那契数列
const fib = function (n) {
    // 如果 n 是 1 或者 2 则返回 1 作为结果
    // 这是递归终止的条件, 必须要有, 否则无限递归了
    if (n == 1 || n == 2) {
        return 1
    } else {
        // 如果 n 不为 1 和 2, 返回 fib(n-2) + fib(n-1)
        // 这时候 fib(n-2) fib(n-1) 需要计算
        // 于是代码进入下一重世界开始计算
        return fib(n - 2) + fib(n - 1)
    }
}
// 阶乘
const fac = function (n) {
    // 如果 n 是 0 则返回 1
    // 这是递归终止的条件, 必须要有, 否则无限递归了
    if (n == 0) {
        return 1
    } else {
        // 如果 n 不为 0, 返回 n * fac(n-1)
        // 这时候 n 是已知的, fac(n-1) 需要计算
        // 于是代码进入下一重世界开始计算
        return n * fac(n - 1)
    }
}


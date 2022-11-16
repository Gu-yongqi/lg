// export default {
//     // 黑白名单只能二选一，可配置页面路径 或 正则表达式规则。使用 '/' 和 '页面路径'同时配置应用首页

//     // 白名单，不需要登录的页面路径
//     //  whiteList:[

//     //     '/pages/login/login',
//     //     '/pages/login/reg',
//     //     '/pages/login/edit_pwd',
//     //     '/pages/login/agree',
//     //     '/pages/login/policy',
//     //     {'pattern':RegExp(/register/)}
//     // ],

//     // 黑名单，需要登录的页面路径
//     blackList: [
//         '/pages/cart/cart',
//         '/pages/shop/shop',
//         '/pages/home/home',
//         { 'pattern': RegExp(/detail/) }
//     ],

//     // setStorageSync 设置本地存储的用户登录标识
//     uInfo: 'uInfo',

//     // 登录页面地址，用于未登录时跳转
//     loginPath: '/pages/login/login',

//     // 点击跳转到需要登录的页面时，未登录状态下是否跳转到登录页面，true | false
//     toLogin: true
// }
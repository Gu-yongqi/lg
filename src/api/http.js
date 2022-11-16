import configTEST from './config.test.json'; // 开发环境域名
import configSTAR from './config.star.json'; // 生产环境域名
import store from '@/store/index'

// #ifdef MP-WEIXIN || FIRST-PARTY-TEST
let h = configTEST;
// #endif

// #ifdef STAR
let h = configSTAR;
// #endif

const BASE_URL = h.domain
console.log('store', store);

const request = ({
    url,
    method = 'GET',
    data = {},
    tip = '加载中...',
    showLoad = true
}) => {
    return new Promise((resolve, reject) => {
        if (showLoad) {
            uni.showLoading({
                title: tip,
                mask: true
            })
        }

        let saasTokenX = ''
        try {
            saasTokenX = JSON.parse(uni.getStorageSync('dataObj')).ticketTokenid;
        } catch (err) {

        }
        const saasToken =
        uni.request({
            url: `${BASE_URL}${url}`,
            method,
            data,
            header: {
                'Saas-Agent': 'qj-wemini',
                'saas-proappcode': 'cs3',
                'saas-tenantcode': '00000000',
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                'saas-token': saasTokenX
            },
            success: res => {
                resolve(res.data)
            },
            fail: err => {
                reject(err)
            },
            complete: () => {
                if (showLoad) {
                    uni.hideLoading()
                }
            }
        })

    })
}

uni.$request = request

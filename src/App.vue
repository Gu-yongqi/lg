<script>
// import lgen_intercept from "@/uni_modules/lgen-intercept/js_sdk/lgen-intercept.js";

// export default {
  // onLaunch: function (e) {
  //   let ress = uni.getStorageSync("dataObj");
  //   let userId = ress.userId;
  //   let saastoken = ress.ticketTokenid
  //   uni.request({
  //     url: "https://csweapp.saas.qianjiangcloud.cn/web/um/userservice/getUserserviceInfo.json",
  //     method: "GET",
  //     header: {
  //       "Accept": "application/json, text/plain, */*",
  //       "Accept-Language": "zh-CN,zh;q=0.9",
  //       "Connection": "keep-alive",
  //       "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  //       // "Origin": "https://csweapp.saas.qianjiangcloud.cn",
  //       // "Referer": "https://csweapp.saas.qianjiangcloud.cn/paas/cs-cli-pc/",
  //       "Sec-Fetch-Dest": "empty",
  //       "Sec-Fetch-Mode": "cors",
  //       "Sec-Fetch-Site": "same-origin",
  //       "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36",
  //       "saas-proappcode": "cs3",
  //       "saas-tenantcode": "00000000",
  //       "saas-token": saastoken,
  //       "sec-ch-ua": '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"',
  //       "sec-ch-ua-mobile": "?0",
  //       "sec-ch-ua-platform": '"Windows"',
  //       "Accept-Encoding": "deflate, gzip",
  //     },
  //     data: {
  //       userId,
  //     },
  //     success: (res) => {
  //       console.log(res);
  //       if (res.data.errorCode == "nologin") {
  //         uni.removeStorageSync('uInfo')
  //         uni.showToast({
  //           icon: 'error',
  //           title: '登录已过期'
  //         })
  //       }
  //     },
  //   });
  //   lgen_intercept(e);
  // },
//   onShow: function () {
//     console.log("App Show");
//     lgen_intercept(e);
//   },
//   onHide: function () {
//     console.log("App Hide");
//   },
// };
</script>

<style lang="scss">
/*每个页面公共css */
@import "uview-ui/index.scss";
</style>

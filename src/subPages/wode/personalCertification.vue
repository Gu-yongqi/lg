// 个人认证
<template>
  <view class="page flex-col">
    <view class="box_1 flex-col">
      <view class="section_1 flex-col">
        <view class="group_1 flex-col">
          <view class="group_2 flex-col">
            <view class="section_2 flex-col justify-between">
              <view class="group_3 flex-row justify-between">
                <image class="thumbnail_1" referrerpolicy="no-referrer" src="@/static/image/wode/fanhui.png" @click="black" />
                <text class="text_1">个人认证</text>
              </view>
            </view>
          </view>
          <view class="group_4 flex-row">
            <text class="text_2">*</text>
            <text class="text_3">真实姓名：</text>
            <u--input placeholder="请填写" class="text-wrapper_1" v-model="name" @blur="blurName"></u--input>
          </view>
          <view class="text">{{textName}}</view>
          <view class="group_5 flex-row">
            <text class="text_5">*</text>
            <text class="text_6">身份证号码：</text>
            <u--input placeholder="请填写" class="text-wrapper_2" v-model="user" @blur="blurUser"></u--input>
          </view>
          <view class="text">{{textUser}}</view>
          <view class="group_6 flex-row">
            <text class="text_8">*</text>
            <text class="text_9">所在地址：</text>
            <u--input :placeholder="pickerPlaceholder" placeholderStyle="color: rgb(192, 196, 204);" class="section_3" :suffixIcon="arrow" suffixIconStyle="color: rgba(96, 98, 102, 0.48);" @focus="pickerClick" v-model="picker">
            </u--input>
            <!-- <u-cell :titleStyle="{color:(picker=='请选择省市区'?'#c0c4cc':'#000')}" :border="false"
							:title="picker" :isLink="true" arrow-direction="down"  @click="pickerClick"></u-cell> -->
          </view>
          <view class="text">{{textPicker}}</view>
          <u-picker @cancel="cancel" :show="show" ref="uPicker" :columns="columns" keyName="name" @confirm="confirm" @change="changeHandler"></u-picker>
          <view class="group_9 flex-row">
            <text class="text_11">*</text>
            <text class="text_12">详细地址：</text>
            <u--input placeholder="请填写" class="text-wrapper_3" v-model="add" @blur="blurAdd"></u--input>
          </view>
          <view class="text">{{textAdd}}</view>
          <view class="group_10 flex-row">
            <text class="text_14">*</text>
            <text class="text_15">身份证照片：</text>
            <view class="box_2 flex-col">
              <view class="box_3 flex-col justify-between shangchuan">
                <view class="sc2" v-for="(item, index) in imgListOne" :key="index">
                  <image class="del" @click="delOne(index)" src="../../static/image/wode/shanchu.png" mode="">
                  </image>
                  <image class="Img3" :src="item" mode=""></image>
                </view>
                <view class="image_2 sc2" v-if="imgListOne.length <1" @click="uploadOne">
                  <image style="width:300rpx;height:238rpx;border: 2rpx dashed #9f9f9f;" class="sc3" src="@/static/image/wode/shenfenzhengbeimian.png" mode=""></image>
                </view>
                <text class="text_16">{{imgListOne.length==0?'上传身份证国徽面':''}}</text>
              </view>
            </view>
          </view>
          <view class="text">{{textImageOne}}</view>
          <view class="group_10 flex-row">
            <text class="text_14"></text>
            <text class="text_15"></text>
            <view class="box_2 flex-col">
              <view class="box_3 flex-col justify-between shangchuan">
                <view class="sc2" v-for="(item, index) in imgListTwo" :key="index">
                  <image class="del" @click="delTwo(index)" src="../../static/image/wode/shanchu.png" mode="">
                  </image>
                  <image class="Img3" :src="item" mode=""></image>
                </view>
                <view class="image_2 sc2" v-if="imgListTwo.length <1" @click="uploadTwo">
                  <image style="width:300rpx;height:238rpx;border: 2rpx dashed #9f9f9f;" class="sc3" src="@/static/image/wode/shenfenzhengzhengmian.png" mode=""></image>
                </view>
                <text class="text_16">{{imgListTwo.length==0?'上传身份证头像面':''}}</text>
              </view>
            </view>
          </view>
          <view class="text">{{textImageTwo}}</view>
          <text class="text_18">
            上传身份证照片，格式要求：要件照片，支持.jpg&nbsp;.jpeg&nbsp;.gif&nbsp;.png格式照片，大小不超过2M
          </text>
          <view class="group_12 flex-row justify-between">
            <button class="text-wrapper_4 flex-col" @click="black">
              <text class="text_19">取消</text>
            </button>
            <button class="text-wrapper_5 flex-col" @click="submit">
              <text class="text_20">确定</text>
            </button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import address from '@/static/address/address.json';
export default {
  created() {
    this.initDataPicker();
  },
  data() {
    return {
      dataObj: {},
      // paramJson: {},
      arrow: 'arrow-down',
      imgListOne: [],
      imgListTwo: [],
      name: '',
      textName: '',
      user: '',
      textUser: '',
      show: false,
      columns: [],
      columnData: [],
      columnDatas: [],
      pickerPlaceholder: '请选择省市区',
      picker: '',
      textPicker: '',
      add: '',
      textAdd: '',
      textImageOne: '',
      textImageTwo: '',
      sheng: '',
      shi: '',
      qu: ''
    };
  },
  mounted() {
    try {
      this.dataObj = JSON.parse(uni.getStorageSync('dataObj'));
    } catch (err) {

    };
    this.init();
  },
  watch: {
    picker(newName, oldName) {
      if (newName != '') {
        this.textPicker = '';
      }
    }
  },
  methods: {
    init() {
      let {
        userInfoCode,
        ticketTokenid
      } = this.dataObj;
      uni.request({
        header: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
          'saas-proappcode': 'cs3',
          'saas-tenantcode': '00000000',
          'saas-token': ticketTokenid
        },
        url: 'https://csweapp.saas.qianjiangcloud.cn/web/um/userInfoAuth/getUserInfoAuth.json',
        method: 'POST',
        data: {
          userInfoCode
        },
        success: res => {
          console.log(res.data);
          // this.paramJson = res.data.dataObj;
        }
      })
    },
    // 点击上传图片
    uploadOne() {
      let {
        ticketTokenid
      } = this.dataObj;
      uni.chooseImage({
        success: (res) => {
          console.log(res);
          // const tempFilePaths = res.tempFilePaths;
          // var file=res.tempFiles[0];
          // const formdata = new FormData()
          // formdata.append(file, file)
          // // console.log(file);
          uni.uploadFile({
            header: {
              'content-type': 'multipart/form-data',
              // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
              'saas-proappcode': 'cs3',
              'saas-tenantcode': '00000000',
              'saas-token': ticketTokenid
            },
            name: 'file',
            filePath: res.tempFilePaths[0],
            file: res.tempFiles[0],

            url: 'https://csweapp.saas.qianjiangcloud.cn/web/rs/goodsFile/uploadGoodsFiles.json',
            method: 'POST',
            // formdata:formdata,
            success: res => {
              // console.log(file);
              console.log(JSON.parse(res.data).fileUrl);
              var img = JSON.parse(res.data).fileUrl;
              this.imgListOne = [];
              this.imgListOne.push('https://csweapp.saas.qianjiangcloud.cn' + img);
            }
          })
        }
      });
    },
    uploadTwo() {
      let {
        ticketTokenid
      } = this.dataObj;
      uni.chooseImage({
        success: (res) => {
          console.log(res);
          // const tempFilePaths = res.tempFilePaths;
          // var file=res.tempFiles[0];
          // const formdata = new FormData()
          // formdata.append(file, file)
          // // console.log(file);
          uni.uploadFile({
            header: {
              'content-type': 'multipart/form-data',
              // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
              'saas-proappcode': 'cs3',
              'saas-tenantcode': '00000000',
              'saas-token': ticketTokenid
            },
            name: 'file',
            filePath: res.tempFilePaths[0],
            file: res.tempFiles[0],

            url: 'https://csweapp.saas.qianjiangcloud.cn/web/rs/goodsFile/uploadGoodsFiles.json',
            method: 'POST',
            // formdata:formdata,
            success: res => {
              // console.log(file);
              console.log(JSON.parse(res.data).fileUrl);
              var img = JSON.parse(res.data).fileUrl;
              this.imgListTwo = [];
              this.imgListTwo.push('https://csweapp.saas.qianjiangcloud.cn' + img);
            }
          })
        }
      });
    },
    // 删除图片
    delOne(index) {
      this.imgListOne.splice(index, 1);
      console.log(this.imgList);
    },
    delTwo(index) {
      this.imgListTwo.splice(index, 1);
      console.log(this.imgList);
    },
    black() {
      uni.navigateBack({
        url: '/pages/wode/wode'
      })
    },
    blurName() {
      if (this.name == '') {
        this.textName = '真实姓名不能为空'
      } else {
        this.textName = '';
      }
    },
    blurUser() {
      if (this.user == '') {
        this.textUser = '身份证号码不能为空'
      } else {
        this.textUser = '';
      }
    },
    // 失去焦点
    // blurPicker() {
    // 	if (this.pickerPlaceholder == '请选择省市区' && this.picker == '') {
    // 		this.textPicker = '所在地址不能为空';
    // 	} else {
    // 		this.textPicker = '';
    // 	}
    // 	this.show = false;
    // 	this.arrow = 'arrow-down';
    // },
    blurAdd() {
      if (this.add == '') {
        this.textAdd = '详细地址不能为空'
      } else {
        this.textAdd = '';
      }
    },
    pickerClick() {
      this.show = true;
      this.arrow = 'arrow-up';
    },
    submit() {
      this.sheng = this.picker.split('-')[0];
      this.shi = this.picker.split('-')[1];
      this.qu = this.picker.split('-')[2];
      if (this.name == '' || this.user == '' || this.picker == '' || this.add == '' || this.imgListOne.length ==
        0 || this.imgListTwo.length == 0) {
        if (this.name == '') {
          this.textName = '真实姓名不能为空'
        } else {
          this.textName = '';
        }
        if (this.user == '') {
          this.textUser = '身份证号码不能为空'
        } else {
          this.textUser = '';
        }
        if (this.picker == '') {
          this.textPicker = '所在地址不能为空'
        } else {
          this.textPicker = '';
        }
        if (this.add == '') {
          this.textAdd = '详细地址不能为空'
        } else {
          this.textAdd = '';
        }
        if (this.imgListOne.length == 0) {
          this.textImageOne = '身份证背面不能为空'
        } else {
          this.textImageOne = '';
        }
        if (this.imgListTwo.length == 0) {
          this.textImageTwo = '身份证正面不能为空'
        } else {
          this.textImageTwo = '';
        }
      } else {
        let {
          userInfoCode,
          ticketTokenid
        } = this.dataObj;
        // let paramJson = this.paramJson;
        uni.request({
          header: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
            'saas-proappcode': 'cs3',
            'saas-tenantcode': '00000000',
            'saas-token': ticketTokenid
          },
          url: 'https://csweapp.saas.qianjiangcloud.cn/web/um/userInfoAuth/saveUserInfoAuth.json',
          method: 'GET',
          data: {
            paramJson: { "userinfoCode": this.dataObj.userInfoCode, "userinfoType": 1, "userinfoCorp": this.name, "userinfoCoid": this.user, "provinceName": this.sheng, "provinceCode": "", "cityName": this.shi, "cityCode": "", "areaName": this.qu, "areaCode": "", "companyAddress": this.add, "userinfoCertUrl": this.imgListOne[0], "userinfoCert1Url": this.imgListTwo[0] }
          },
          success: res => {
            console.log(res);
            this.init();
            uni.navigateTo({
              url: '/subPages/wode/individualResults'
            })
          }
        })
      }
    },
    initDataPicker() {

      //此处的province主要用作数据的初始化，即刚打开就需要进行展示的数据，这个跟第一条省份数据相关，我的第一条是北京市，所以需要columns中的三维数组，第一维度是省份数据数组，第二维度是市数据数组，第三维度是区数据数组
      let province = []; //初始数据需要展示的省份
      let province1 = [{
        name: '北京市',
        code: '1101'
      }]; //因为第一个市北京市，所以就直接添加北京市下辖的直辖市了 也即初始数据需要展示的市，北京市只有一个市辖区
      let province2 = []; //初始数据需要展示的区域数据，也即是 北京市市辖区内的区
      address.map(item => {
        province.push(item);
      });

      address[0].children[0].children.map(item => {
        province2.push(item);
      });

      //省数据 因为要做数据初始化，所以是三维数组
      // 数据格式 [ [所有的省份数据:{},{}] , [第一个省份下的所有的市:{},{},{}] , [第一个市下面所有的区:{},{},{}] ]
      this.columns.push(province);
      this.columns.push(province1);
      this.columns.push(province2);

      // 市数据数组，筛选address.json文件，将全国所有省下面的市数据放入数组
      // 格式[ [第一个省下面所有市,{},{},{}] , [第二个省下面所有市{},{},{}] , [第三个省下面所有市{},{},{}] ] 注意，以上的第一第二对应着 columns[0] 的数据

      address.map(item => {
        let city = [];
        item.children.map(item1 => {
          city.push(item1);
        });
        this.columnData.push(city);
      });

      //区数据数组
      //数据格式: [ 所有省下面所有市的所有区 [ 第一个省下面所有市的区:[ [第一个省下面第一个市的所有区] , [第一个省下面第二个市的所有区] ,]   ,   [ 第二个省下面所有市的区:[ [第二个省下面第一个市的所有区] , [第二个省下面第二个市的所有区] ,]   ]

      let area = [];
      address.map((item, index) => {
        let area1 = []; //省下面所有市的初始化
        item.children.map(item1 => {
          area = []; //市下面的区初始化
          item1.children.map(item2 => {
            area.push(item2);
          });
          area1.push(area); // 每循环一个市，添加该市下面的所有区
        });
        this.columnDatas.push(area1); // 每循环一个省，添加该省下面的所有市
      });
    },
    changeHandler(e) { //城市选择时触发
      const {
        columnIndex, //当前选择的列，省 / 市 / 区
        value, // 当前选择的数组内容
        values, // values为当前变化列的数组内容
        index, // 当前列的下标值
        indexs, // 当前选择 省 市 区的下表值
        picker = this.$refs.uPicker
      } = e;
      // 当第一列值发生变化时，变化第二列和第三列的值（省份变更，市和区跟着变更）
      if (columnIndex === 0) { // 判断当前变更的是省还是市还是区
        // picker为选择器this实例，变化第二列对应的选项
        picker.setColumnValues(1, this.columnData[
          index]); //设置市为该省下面的所有市，index是当前省在省份数组的下标，对应市数组中的下表就是 该省下面的所有市 的数据
        picker.setColumnValues(2, this.columnDatas[index][0]); // 设置区域为该省下面第一个市下面的所有区域
      }
      if (columnIndex === 1) {
        // 当第二列发生变化 变化对应的第三列
        picker.setColumnValues(2, this.columnDatas[indexs[0]][index]); //同上
      }
    },
    confirm(e) { //点击确定按钮
      this.pickerPlaceholder = '';
      this.picker = '';
      e.value.forEach(v => {
        return this.picker += v.name + '-';
      })
      this.picker = this.picker.slice(0, this.picker.length - 1);
      this.show = false;
      this.arrow = 'arrow-down';
    },
    cancel() { //点击取消按钮
      if (this.picker == '') {
        this.textPicker = '所在地址不能为空'
      } else {
        this.textPicker = '';
      }
      this.show = false;
      this.arrow = 'arrow-down';
    }
  },
};
</script>
<style lang="scss">
.shangchuan {
  width: 90%;
  height: 200rpx;
  display: flex;
  align-items: center;

  .sc2 {
    // width: 30%;
    // height: 90%;
    border-radius: 10rpx;
    text-align: center;
    // line-height: 240rpx;
    margin: 0 10rpx;
    position: relative;
    // background-color: #4CD964;
  }

  .Img3 {
    width: 150px;
    height: 109px;
    border-radius: 10rpx;
    margin-left: 110rpx;
  }

  .del {
    width: 32rpx;
    height: 32rpx;
    position: absolute;
    z-index: 1000;
    top: 0rpx;
    right: 0;
  }

  .sc3 {
    width: 96rpx;
    height: 96rpx;
    // border-radius: 10rpx;
  }
}

.u-cell {
  box-sizing: border-box;
  border: 3rpx solid #f1f2f7;
  border-radius: 4rpx;
  margin-left: 8rpx;
  width: 512rpx;
  height: 64rpx;
  // width: 520rpx;
  // padding: 4px 10px;
  padding-left: 20rpx;
}

// .u-cell__title-text{
// 	margin: 4rpx 0 0 4rpx;
// padding-left: 4rpx;
// }
// /deep/	.u-cell span{
// 		margin: 4rpx 0 0 4rpx;
// 	}
/deep/ .u-cell__body {
  // margin-left: -10rpx;
  padding: 10rpx 0;
}

// /deep/ .u-cell__body__content {
// 	margin: -10rpx 0 0 0;
// }

/deep/ .u-cell__title-text {
  color: #d2c9cc;
}

.text {
  margin: 10rpx 0 0 220rpx;
  font-size: 20rpx;
  color: #ff0052;
}

// .u-popup[data-v-3a231fda] {
// 	flex: 0;
// }
.u-input {
  border: 1px solid rgba(236, 238, 245, 1);
}

body *,
page view {
  box-sizing: border-box;
  flex-shrink: 0;
}

body {
  font-family: PingFangSC-Regular, Roboto, Helvetica Neue, Helvetica, Tahoma,
    Arial, PingFang SC-Light, Microsoft YaHei;
  margin: 0;
}

button {
  margin: 0;
  padding: 0;
  border: 1px solid transparent;
  outline: none;
  background-color: transparent;
}

button:active {
  opacity: 0.6;
}

.flex-col {
  display: flex;
  flex-direction: column;
}

.flex-row {
  display: flex;
  flex-direction: row;
}

.justify-start {
  display: flex;
  justify-content: flex-start;
}

.justify-center {
  display: flex;
  justify-content: center;
}

.justify-end {
  display: flex;
  justify-content: flex-end;
}

.justify-evenly {
  display: flex;
  justify-content: space-evenly;
}

.justify-around {
  display: flex;
  justify-content: space-around;
}

.justify-between {
  display: flex;
  justify-content: space-between;
}

.align-start {
  display: flex;
  align-items: flex-start;
}

.align-center {
  display: flex;
  align-items: center;
}

.align-end {
  display: flex;
  align-items: flex-end;
}

.page {
  position: relative;
  width: 750rpx;
  height: 1624rpx;
  background-color: rgba(255, 255, 255, 1);
  overflow-y: scroll;

  .box_1 {
    height: 1624rpx;
    background-color: rgba(248, 248, 248, 1);
    width: 750rpx;

    .section_1 {
      height: 1624rpx;
      background-color: rgba(255, 255, 255, 1);
      width: 750rpx;

      .group_1 {
        width: 750rpx;
        height: 1572rpx;

        .group_2 {
          height: 188rpx;
          background-color: rgba(255, 255, 255, 1);
          width: 750rpx;

          .section_2 {
            width: 674rpx;
            height: 126rpx;
            margin: 34rpx 0 0 38rpx;

            .image_1 {
              width: 674rpx;
              height: 24rpx;
            }

            .group_3 {
              width: 408rpx;
              height: 50rpx;
              margin-top: 52rpx;

              .thumbnail_1 {
                width: 18rpx;
                height: 32rpx;
                margin-top: 10rpx;
              }

              .text_1 {
                width: 144rpx;
                height: 50rpx;
                display: inline-block;
                overflow-wrap: break-word;
                color: rgba(51, 51, 51, 1);
                font-size: 36rpx;
                white-space: nowrap;
                line-height: 50rpx;
                text-align: center;
              }
            }
          }
        }

        .group_4 {
          width: 684rpx;
          height: 64rpx;
          margin: 38rpx 0 0 46rpx;

          .text_2 {
            width: 16rpx;
            height: 40rpx;
            display: inline-block;
            overflow-wrap: break-word;
            color: rgba(255, 0, 0, 1);
            font-size: 28rpx;
            white-space: nowrap;
            line-height: 40rpx;
            text-align: right;
          }

          .text_3 {
            width: 140rpx;
            height: 40rpx;
            display: inline-block;
            overflow-wrap: break-word;
            color: rgba(96, 98, 102, 1);
            font-size: 28rpx;
            white-space: nowrap;
            line-height: 40rpx;
            text-align: right;
            margin-top: 12rpx;
          }

          .text-wrapper_1 {
            height: 64rpx;
            border-radius: 1px;
            border: 1px solid rgba(236, 238, 245, 1);
            background-color: rgba(255, 255, 255, 1);
            margin-left: 16rpx;
            width: 512rpx;

            .text_4 {
              width: 84rpx;
              height: 40rpx;
              display: inline-block;
              overflow-wrap: break-word;
              color: rgba(96, 98, 102, 0.48);
              font-size: 28rpx;
              white-space: nowrap;
              line-height: 40rpx;
              text-align: left;
              margin: 12rpx 0 0 30rpx;
            }
          }
        }

        .group_5 {
          width: 712rpx;
          height: 64rpx;
          margin: 30rpx 0 0 18rpx;

          .text_5 {
            width: 16rpx;
            height: 40rpx;
            display: inline-block;
            overflow-wrap: break-word;
            color: rgba(255, 0, 0, 1);
            font-size: 28rpx;
            white-space: nowrap;
            line-height: 40rpx;
            text-align: right;
          }

          .text_6 {
            width: 168rpx;
            height: 40rpx;
            display: inline-block;
            overflow-wrap: break-word;
            color: rgba(96, 98, 102, 1);
            font-size: 28rpx;
            white-space: nowrap;
            line-height: 40rpx;
            text-align: right;
            margin-top: 12rpx;
          }

          .text-wrapper_2 {
            height: 64rpx;
            border-radius: 1px;
            border: 1px solid rgba(236, 238, 245, 1);
            background-color: rgba(255, 255, 255, 1);
            margin-left: 16rpx;
            width: 512rpx;

            .text_7 {
              width: 84rpx;
              height: 40rpx;
              display: inline-block;
              overflow-wrap: break-word;
              color: rgba(96, 98, 102, 0.48);
              font-size: 28rpx;
              white-space: nowrap;
              line-height: 40rpx;
              text-align: left;
              margin: 12rpx 0 0 30rpx;
            }
          }
        }

        .group_6 {
          width: 684rpx;
          height: 64rpx;
          margin: 30rpx 0 0 46rpx;

          .text_8 {
            width: 16rpx;
            height: 40rpx;
            display: inline-block;
            overflow-wrap: break-word;
            color: rgba(255, 0, 0, 1);
            font-size: 28rpx;
            white-space: nowrap;
            line-height: 40rpx;
            text-align: right;
          }

          .text_9 {
            width: 140rpx;
            height: 40rpx;
            display: inline-block;
            overflow-wrap: break-word;
            color: rgba(96, 98, 102, 1);
            font-size: 28rpx;
            white-space: nowrap;
            line-height: 40rpx;
            text-align: right;
            margin-top: 12rpx;
          }

          .section_3 {
            height: 64rpx;
            border-radius: 1px;
            border: 1px solid rgba(236, 238, 245, 1);
            background-color: rgba(255, 255, 255, 1);
            margin-left: 16rpx;
            width: 512rpx;

            .group_7 {
              width: 448rpx;
              height: 40rpx;
              margin: 12rpx 0 0 30rpx;

              .text_10 {
                width: 168rpx;
                height: 40rpx;
                display: inline-block;
                overflow-wrap: break-word;
                color: rgba(96, 98, 102, 0.48);
                font-size: 28rpx;
                white-space: nowrap;
                line-height: 40rpx;
                text-align: left;
              }

              .group_8 {
                width: 22rpx;
                height: 12rpx;
                background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngc0c89d973b90225b112f9169d823c10345cc9308429f0a6737fc17144f6e4ec6)
                  0rpx 0rpx no-repeat;
                background-size: 24rpx 14rpx;
                margin-top: 16rpx;
              }
            }
          }
        }

        .group_9 {
          width: 684rpx;
          height: 66rpx;
          margin: 30rpx 0 0 46rpx;

          .text_11 {
            width: 16rpx;
            height: 40rpx;
            display: inline-block;
            overflow-wrap: break-word;
            color: rgba(255, 0, 0, 1);
            font-size: 28rpx;
            white-space: nowrap;
            line-height: 40rpx;
            text-align: right;
          }

          .text_12 {
            width: 140rpx;
            height: 40rpx;
            display: inline-block;
            overflow-wrap: break-word;
            color: rgba(96, 98, 102, 1);
            font-size: 28rpx;
            white-space: nowrap;
            line-height: 40rpx;
            text-align: right;
            margin-top: 12rpx;
          }

          .text-wrapper_3 {
            height: 64rpx;
            border-radius: 1px;
            border: 1px solid rgba(236, 238, 245, 1);
            background-color: rgba(255, 255, 255, 1);
            width: 512rpx;
            margin: 2rpx 0 0 16rpx;

            .text_13 {
              width: 84rpx;
              height: 40rpx;
              display: inline-block;
              overflow-wrap: break-word;
              color: rgba(96, 98, 102, 0.48);
              font-size: 28rpx;
              white-space: nowrap;
              line-height: 40rpx;
              text-align: left;
              margin: 12rpx 0 0 30rpx;
            }
          }
        }

        .group_10 {
          width: 500rpx;
          height: 258rpx;
          margin: 36rpx 0 0 18rpx;

          .text_14 {
            width: 16rpx;
            height: 40rpx;
            display: inline-block;
            overflow-wrap: break-word;
            color: rgba(255, 0, 0, 1);
            font-size: 28rpx;
            white-space: nowrap;
            line-height: 40rpx;
            text-align: right;
          }

          .text_15 {
            width: 168rpx;
            height: 40rpx;
            display: inline-block;
            overflow-wrap: break-word;
            color: rgba(96, 98, 102, 1);
            font-size: 28rpx;
            white-space: nowrap;
            line-height: 40rpx;
            text-align: right;
            margin-top: 12rpx;
          }

          .box_2 {
            height: 238rpx;
            // background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngdacd228f3b684e5651ad87c87adbbf9a95b95a13b4fcb4f72d39d13961f9d93e) 100% no-repeat;
            width: 300rpx;
            margin-top: 20rpx;

            .box_3 {
              width: 192rpx;
              height: 188rpx;
              // margin: 28rpx 0 0 54rpx;

              .image_2 {
                width: 184rpx;
                height: 134rpx;
                margin-left: 4rpx;
              }

              .text_16 {
                width: 192rpx;
                height: 34rpx;
                display: inline-block;
                overflow-wrap: break-word;
                color: rgba(198, 198, 198, 1);
                font-size: 24rpx;
                white-space: nowrap;
                line-height: 34rpx;
                text-align: left;
                margin-top: 20rpx;
              }
            }
          }
        }

        .group_11 {
          height: 238rpx;
          // background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngdacd228f3b684e5651ad87c87adbbf9a95b95a13b4fcb4f72d39d13961f9d93e) 100% no-repeat;
          width: 300rpx;
          margin: 30rpx 0 0 218rpx;

          .box_4 {
            width: 192rpx;
            height: 186rpx;
            margin: 30rpx 0 0 54rpx;

            .box_5 {
              width: 190rpx;
              height: 136rpx;
              background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPnge2a92ce6a485dc32bd75e407f3b405dfb724761e79d2fce8b2fd0c8597a33870) -2rpx
                0rpx no-repeat;
              background-size: 192rpx 138rpx;
            }

            .text_17 {
              width: 192rpx;
              height: 34rpx;
              display: inline-block;
              overflow-wrap: break-word;
              color: rgba(198, 198, 198, 1);
              font-size: 24rpx;
              white-space: nowrap;
              line-height: 34rpx;
              text-align: left;
              margin-top: 16rpx;
            }
          }
        }

        .text_18 {
          width: 512rpx;
          height: 56rpx;
          display: inline-block;
          overflow-wrap: break-word;
          color: rgba(96, 98, 102, 0.48);
          font-size: 20rpx;
          line-height: 28rpx;
          text-align: left;
          margin: 16rpx 0 0 198rpx;
        }

        .group_12 {
          width: 684rpx;
          height: 120rpx;
          margin: 208rpx 0 0 34rpx;

          .text-wrapper_4 {
            height: 76rpx;
            border-radius: 19px;
            border: 0.5px solid rgba(224, 37, 27, 1);
            width: 332rpx;

            .text_19 {
              width: 56rpx;
              height: 40rpx;
              display: inline-block;
              overflow-wrap: break-word;
              color: rgba(224, 37, 27, 1);
              font-size: 28rpx;
              white-space: nowrap;
              line-height: 40rpx;
              text-align: center;
              margin: 18rpx 0 0 138rpx;
            }
          }

          .text-wrapper_5 {
            height: 76rpx;
            border-radius: 19px;
            background-color: rgba(224, 37, 27, 1);
            width: 332rpx;

            .text_20 {
              width: 56rpx;
              height: 40rpx;
              display: inline-block;
              overflow-wrap: break-word;
              color: rgba(255, 255, 255, 1);
              font-size: 28rpx;
              white-space: nowrap;
              line-height: 40rpx;
              text-align: center;
              margin: 18rpx 0 0 138rpx;
            }
          }
        }
      }
    }
  }
}
</style>

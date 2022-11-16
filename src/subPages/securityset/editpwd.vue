<template>
  <view class="editpwd-container">

    <view class="form">

      <u-form
          labelPosition="left"
          :model="formLoginPass"
          :rules="rules"
          labelWidth="80"
          ref="form"
      >
        <u-form-item
            label="*旧密码："
            prop="oldLoginPassword"
        >
          <u-input
              placeholder="请填写"
              border="surround"
              v-model="formLoginPass.oldLoginPassword"
              type="password"

            ></u-input>
        </u-form-item>
        <u-form-item
            label="*新密码："
            prop="newLoginPassword"
        >
          <u-input
              placeholder="请填写"
              border="surround"
              v-model="formLoginPass.newLoginPassword"
              type="password"
            ></u-input>
        </u-form-item>
        <u-form-item>
          <button @click="submit" class="logbtn">修改</button>
        </u-form-item>
      </u-form>
    </view>

  </view>
</template>

<script>
import { updateUserpsw } from '@/api/interface'
export default {

  data(){

    let validatePassword = (rule, value, callback) => {
    // let isPass = new RegExp(/^[a-zA-Z0-9]{8,16}$/).test(value); // 8-16位
    let isPass = new RegExp(/^[a-zA-Z0-9]{6,16}$/).test(value); // 8-16位
    if (value === "") {
      callback(new Error("请输入旧密码"));
    } else {
      if (isPass) {
        callback();
      } else {
        callback(new Error("请输入6-16位由数字或字母组成的密码"));
      }
    }
  };
  let validateNewPassword = (rule, value, callback) => {
    // let isPass = new RegExp(/^[a-zA-Z0-9]{8,16}$/).test(value);
    let isPass = new RegExp(/^[a-zA-Z0-9]{6,16}$/).test(value);
    if (value === '') {
      callback(new Error('请输入新密码'))
    } else if (value === this.formLoginPass.oldLoginPassword) {
      callback(new Error('新密码不能与旧密码一致'))
    } else {
      if (isPass) {
        callback();
      } else {
        callback(new Error("请输入6-16位由数字或字母组成的密码"));
      }
    }
  }

    return {
      formLoginPass: {
        oldLoginPassword: "",
        newLoginPassword: "",
      },
      rules:{
        oldLoginPassword: [
          {required: true,validator: validatePassword,trigger: "blur"},
        ],
        newLoginPassword: [
          {required: true, validator: validateNewPassword, trigger: 'blur'}
        ]
      }
    }
  },

  onReady(){
    this.$refs.form.setRules(this.rules)
  },

  methods: {
    submit() {
      this.$refs.form.validate().then(res => {
        let params = {
          oldPassword: this.formLoginPass.oldLoginPassword,
          newPassword: this.formLoginPass.newLoginPassword,
        }
        uni.$request({
          url: updateUserpsw,
          method: 'POST',
          data: params
        })
        .then(res => {
          if (res.success) {
            uni.showToast({
              title: '操作成功',
              icon: 'none',
              duration: 1000
            })
          } else {
            uni.showToast({
              title: '操作失败',
              icon: 'none',
              duration: 1000
            })
          }
        })

      })
    }
  }
}
</script>

<style lang="scss" scoped>
.editpwd-container{
  .form{
    padding: 20px;
    padding-top: 30px;
    .logbtn {
        width: 100%;
				margin-top: 50px;
				color: #fff;
				background: rgba(224, 37, 27, 1);
				border-radius: 50px;
			}
  }
}

/deep/.u-button{
  height: 44px;
}
</style>
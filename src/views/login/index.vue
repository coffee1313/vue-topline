<template>
  <div class="login_box">
    <div class="login_contain">
      <div class="login_trans">
        <img class="login-img" src="./img/logo_index.png" />
        <el-form :rules="loginFormrules" ref="loginFormRef" :model="loginForm">
          <el-form-item prop="mobile">
            <el-input
              v-model="loginForm.mobile"
              placeholder="请输入手机号码"
            >
              <i slot="prefix" class="el-icon-user-solid"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input
              v-model="loginForm.code"
              placeholder="请输入验证码"
            >
              <i slot="prefix" class="el-icon-warning"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="agreeChecked">
            <el-checkbox v-model="loginForm.agreeChecked"
              >我已同意并阅读用户协议和条款</el-checkbox
            >
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%;" v-loading="btnLoadFlag" :disabled="btnLoadFlag" type="primary" @click="loginFn"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/js/gt.js";
export default {
  methods: {
    // 验证登陆信息，并设置sessionsStorage
    loginAct() {
      this.$axios
        .post("/authorizations", this.loginForm)
        .then(result => {
          var { id, name, photo, token } = result.data.data;
          window.sessionStorage.setItem("id", id);
          window.sessionStorage.setItem("name", name);
          window.sessionStorage.setItem("photo", photo);
          window.sessionStorage.setItem("token", token);
          this.$router.push({ name: "home" });
        })
        .catch(error => {
          console.log(error);
          return this.$message.error('手机号码或验证码错误，请重新输入！');
        });
    },
    // 点击注册按钮
    loginFn() {
      this.$refs.loginFormRef.validate(valid => {
        if (valid) {
          // 判断人机交互对象是否存在
          if(this.captchaObject !== null){
            return this.captchaObject.verify();
          }
          this.btnLoadFlag = true;
          // 人机交互
          this.$axios
            .get(`/captchas/${this.loginForm.mobile}`)
            .then(result => {
              console.log(result);
              let { data } = result.data;
              window.initGeetest(
                {
                  // 省略必须的配置参数
                  // 以下配置参数来自服务端 SDK
                  gt: data.gt,
                  challenge: data.challenge,
                  offline: !data.success,
                  new_captcha: true,
                  product: "bind"
                },
                (captchaObj) => {
                  captchaObj
                    .onReady(() => {
                      // 验证码ready之后才能调用verify方法显示验证码
                      captchaObj.verify(); // 显示验证码
                      this.captchaObject = captchaObj;
                      this.btnLoadFlag = false;
                    })
                    .onSuccess(() => {
                      this.loginAct();
                    })
                    .onError(function() {
                      // your code
                    });

                }
              );
            })
            .catch(error => {
              console.log(error);
              return this.$message.error('获取极验验证码错误！');
            });
        }
      });
    }
  },
  data() {
    var checkAgreeType = (rule, value, callback) => {
      if (Number(value) === 0) {
        return callback(new Error("请遵守协议"));
      }
      callback();
    };
    var checkMoible = (rule, value, callback) => {
      var reg = /^1[3-9]\d{9}$/;
      if (!reg.test(value)) {
        return callback(new Error("手机号码格式不正确"));
      }
      callback();
    };
    return {
      captchaObject:null, // 存储生成的人机交互对象
      btnLoadFlag: false,
      loginForm: {
        mobile: "13161167721",
        code: "246810",
        agreeChecked: true
      },
      loginFormrules: {
        mobile: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          { validator: checkMoible, trigger: "blur" }
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        agreeChecked: [{ validator: checkAgreeType }]
      }
    };
  }
};
</script>

<style lang="less" scoped>
.login_box {
  height: 100%;
  background-image: url(img/login_bg.jpg);
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login_contain {
  width: 410px;
  height: 350px;
  background: #fff;
  display: flex;
  justify-content: center;
}

.login_trans {
  width: 70%;
}

.el-form {
  width: 100%;
}
.login-img {
  width: 60%;
  margin: 20px;
}
</style>

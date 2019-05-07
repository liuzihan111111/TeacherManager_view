<template>
  <div class="login-container">
    <div class="header">
      <div class="logo pull_left">
        <div class="logo-wrap">
          <img src="../../img/logo.png" alt="IDS logo" title="IDS logo">
          <i class="divideline"></i>
          <span class="title">教师信息管理</span>
        </div>
      </div>
    </div>
    <div class="main">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <div class="title-container">
          <span class="title">用户登录</span>
        </div>

        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user"/>
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="账号"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password"/>
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
          </span>
        </el-form-item>

        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;margin-bottom:25px;"
          @click.native.prevent="handleLogin"
        >登录</el-button>
        <div class="login_hint">
          <p>账号说明：教师职工号。</p>
          <p>密码说明：初始密码为六个0。</p>
          <p>如尝试以上密码不能登录，请联系管理员。</p>
        </div>
      </el-form>
    </div>
    <div class="footer">
      <div class="copy">
        <p>
          <strong>
            版权所有
            <strong>
              <span style="color: #ccc">©</span>
            </strong> 洛阳理工学院 豫ICP备17035763号-1
          </strong>
          <br>地址：河南省洛阳市洛龙区王城大道90号 &nbsp;邮政编码：471023
          <br>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import { teacherRouterMap, adminRouterMap } from "@/router";

export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      callback();
      /* if (!
      validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      } */
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error("密码长度不能小于5"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: "password",
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      // $refs获取页面中所有的设置了ref属性的标签
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(rr => {
              console.log(rr);
              var routes = this.$router.options.routes;
              if (rr.type == 0) {
                routes = [...routes, ...adminRouterMap];
                this.$store.commit("initRoutes", routes);
                this.$router.addRoutes(adminRouterMap);
              }
              if (rr.type == 1) {
                routes = [...routes, ...teacherRouterMap];
                this.$store.commit("initRoutes", routes);
                this.$router.addRoutes(teacherRouterMap);
              }

              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch(msg => {
              console.log(msg);
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" >
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #ffffff;
$light_gray: #000;
$cursor: #000;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
    background: #fff;
  }
}

/* reset element-ui css */
.login-container {
  font-family: Arial, Helvetica, sans-serif;
  .header {
    height: 8rem;
    line-height: 8rem;
    margin: 0 auto;
    width: 75%;
    padding-top: 20px;
    .pull_left {
      float: left;
      .logo-wrap {
        width: 490px;
        height: 100px;
        line-height: 100px;
        img {
          float: left;
        }
        .divideline {
          width: 1px;
          height: 22px;
          background-color: #d9d9d9;
          float: left;
          margin: 30px 10px 15px 10px;
          font-style: italic;
        }
        .title {
          display: inline-block;
          height: 80px;
          line-height: 80px;
          font-size: 22px;
          font-weight: 700;
          float: right;
        }
      }
    }
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 75%;

    input {
      background: transparent;
      white-space: nowrap;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid #dedede;
    background: #fff;
    border-radius: 5px;
    color: #454545;
  }
}
.main {
  margin: 15px 0 0 0;
  min-height: 630px;
  width: 100%;
  background: url(../../img/index_bg.png) no-repeat;
  position: relative;
  .el-input__inner {
    border: 1px solid #fff !important;
  }
}
.footer {
  font-size: 12px;
}
.footer .copy {
  border-top: 1px solid #dbdbdb;
  width: 75%;
  padding-top: 20px;
}
.footer .copy,
.footer .support {
  margin: 0 auto;
  text-align: center;
  color: #9a9a9a;
  line-height: 16px;
}
p {
  margin: 0;
  padding: 0;
}
strong,
b {
  font-weight: bold;
}
.login_hint {
  padding-bottom: 20px;
  padding-left: 10px;
  p {
    color: #75a2cfbe;
    font-size: 12px;
    line-height: 1.5;
  }
}
</style>

<style lang="scss" scoped>
$bg: #fff;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    /* position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden; */
    position: absolute;
    top: 90px;
    right: 100px;
    width: 320px;
    height: auto;
    background: #fff;
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: 1px 1px 1px #cdd4da;
    padding: 10px 40px;
    box-sizing: content-box;
  }

  .tips {
    font-size: 14px;
    color: #000;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    text-align: center;
    height: 35px;
    padding: 15px;
    border-bottom: 2px solid #720808;
    margin-bottom: 30px;

    .title {
      /* font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold; */
      font: bold 20px/40px "Microsoft YaHei";
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>

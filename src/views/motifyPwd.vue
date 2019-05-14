<template>
  <div class="app-container">
    <el-form
      :model="ruleForm2"
      status-icon
      :rules="rules2"
      ref="ruleForm2"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="旧密码" prop="pwd">
        <el-input v-model="ruleForm2.pwd"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { TeacherModify, TeacherList } from "@/api/teacher";
import { AdminList, AdminModify } from "@/api/admin";
import { mapGetters } from "vuex";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 5) {
        callback(new Error("密码长度不能小于5"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        pass: "",
        checkPass: "",
        pwd: ""
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
      role: localStorage.getItem("role") // 判断登录的角色
    };
  },
  computed: {
    ...mapGetters(["name"])
  },
  methods: {
    // 退出登录
    async logout() {
      await this.$store.dispatch("user/logout");
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      window.location.href = "/#/login";
    },
    // 修改密码
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        // valid  判断输入是否满足条件
        if (valid) {
          var data = {};
          // 教师登录
          if (this.role == 1) {
            data.tid = this.name;
            data.tpwd = this.ruleForm2.pwd;
            TeacherList(data).then(res => {
              if (res.code == 1 && res.info.allCount) {
                var id = res.info.list[0]._id;
                TeacherModify(id, { tpwd: this.ruleForm2.pass })
                  .then(res => {
                    if (res.code == 1) {
                      this.$message({
                        showClose: true,
                        message: "密码修改成功!!",
                        type: "success"
                      });
                      this.logout();
                    } else {
                      this.$message({
                        showClose: true,
                        message: "密码修改失败!!",
                        type: "error"
                      });
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  });
              } else {
                this.$message({
                  showClose: true,
                  message: "原密码输入错误!!",
                  type: "error"
                });
              }
            });
          }
          // 管理员登录
          if (this.role == 2) {
            console.log(this.role);
            data.admin_id = this.name;
            data.admin_pwd = this.ruleForm2.pwd;
            // console.log(data);
            AdminList(data).then(res => {
              // console.log(res);
              if (res.code == 1 && res.info.length) {
                var id = res.info[0]._id;
                AdminModify(id, { admin_pwd: this.ruleForm2.pass })
                  .then(res => {
                    if (res.code == 1) {
                      this.$message({
                        showClose: true,
                        message: "密码修改成功!!",
                        type: "success"
                      });
                      this.logout();
                    } else {
                      this.$message({
                        showClose: true,
                        message: "密码修改失败!!",
                        type: "error"
                      });
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  });
              } else {
                this.$message({
                  showClose: true,
                  message: "原密码输入错误!!",
                  type: "error"
                });
              }
            });
          }
          this.$refs[formName].resetFields();
        } else {
          this.$message({
            showClose: true,
            message: "输入不合法!!",
            type: "warning"
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>


<style scoped>
.line {
  text-align: center;
}
.app-container {
  width: 70%;
}
</style>


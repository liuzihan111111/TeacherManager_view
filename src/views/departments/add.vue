<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" size="small" :rules="rules">
      <el-form-item label="学院名称" prop="major_name">
        <el-input v-model="form.major_name"/>
      </el-form-item>
      <el-form-item label="学院描述" prop="major_dec">
        <el-input type="textarea" :rows="15" placeholder="请输入内容" v-model="form.major_dec"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { DepartmentAdd } from "@/api/departments";
export default {
  data() {
    return {
      form: {
        major_name: "",
        major_dec: ""
      },
      rules: {
        major_name: [
          { required: true, message: "请输入学院名", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      DepartmentAdd(this.form)
        .then(res => {
          console.log(res);
          if (res.code === 1) {
            this.$message({
              showClose: true,
              message: res.info,
              type: "success"
            });
            this.$refs["form"].resetFields();
          } else {
            this.$message({
              showClose: true,
              message: res.info,
              type: "error"
            });
          }
        })
        .catch(err => {
          console.log(err);
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


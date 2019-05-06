<template>
  <div class="app-container">
    <el-form ref="form" :model="detail" label-width="120px" size="small" :rules="rules">
      <el-form-item label="教师工号" prop="tid">
        <el-input v-model="detail.tid" :disabled="true"/>
      </el-form-item>
      <el-form-item label="基本工资" prop="basePay">
        <el-input v-model="detail.basePay"/>
      </el-form-item>
      <el-form-item label="课时费" prop="ClassFees">
        <el-input v-model="detail.ClassFees"/>
      </el-form-item>
      <el-form-item label="效绩工资" prop="PerformanceSalary">
        <el-input v-model="detail.PerformanceSalary"/>
      </el-form-item>
      <el-form-item label="奖金" prop="bonus">
        <el-input v-model="detail.bonus"/>
      </el-form-item>
      <el-form-item label="津贴" prop="allowance">
        <el-input v-model="detail.allowance"/>
      </el-form-item>
      <el-form-item label="其他" prop="other">
        <el-input v-model="detail.other"/>
      </el-form-item>
      <el-form-item label="备注" prop="mark">
        <el-input v-model="detail.mark"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { SalaryModify } from "@/api/salary";
export default {
  data() {
    return {
      detail: {}
    };
  },
  methods: {
    onSubmit() {
      SalaryModify(this.detail._id, this.detail)
        .then(req => {
          // console.log(req);
          if (req.code === 1) {
            this.$message("修改成功!");
            this.$router.push("/salary");
          } else {
            this.$message("修改失败!");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {
    this.detail = this.$route.params;
    // console.log(this.$route);
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


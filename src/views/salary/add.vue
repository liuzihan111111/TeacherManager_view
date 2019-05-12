<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" size="small" :rules="rules">
      <el-form-item label="教师工号" prop="tid">
        <el-input v-model="form.tid"/>
      </el-form-item>
      <el-form-item label="基本工资" prop="basePay">
        <el-input v-model="form.basePay"/>
      </el-form-item>
      <el-form-item label="课时费" prop="ClassFees">
        <el-input v-model="form.ClassFees"/>
      </el-form-item>
      <el-form-item label="效绩工资" prop="PerformanceSalary">
        <el-input v-model="form.PerformanceSalary"/>
      </el-form-item>
      <el-form-item label="奖金" prop="bonus">
        <el-input v-model="form.bonus"/>
      </el-form-item>
      <el-form-item label="津贴" prop="allowance">
        <el-input v-model="form.allowance"/>
      </el-form-item>
      <el-form-item label="其他" prop="other">
        <el-input v-model="form.other"/>
      </el-form-item>
      <el-form-item label="备注" prop="mark">
        <el-input v-model="form.mark"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { SalaryAdd } from "@/api/salary";
export default {
  data() {
    return {
      form: {
        tid: "",
        basePay: "",
        ClassFees: "",
        PerformanceSalary: "",
        bonus: "",
        allowance: "",
        other: "",
        mark: "无"
      },
      rules: {
        tid: [{ required: true, message: "请输入教师工号", trigger: "blur" }],
        basePay: [
          { required: true, message: "请输入基本工资", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      // console.log(this.form);
      this.form.basePay = Number(this.form.basePay);
      this.form.ClassFees = Number(this.form.ClassFees);
      this.form.PerformanceSalary = Number(this.form.PerformanceSalary);
      this.form.bonus = Number(this.form.bonus);
      this.form.allowance = Number(this.form.allowance);
      this.form.other = Number(this.form.other);
      SalaryAdd(this.form)
        .then(res => {
          console.log(res);
          if (res.code === 1) {
            this.$message({
              showClose: true,
              message: "添加成功!!",
              type: "success"
            });
            this.$refs["form"].resetFields();
          } else if (res.code === 2) {
            this.$message("该工号已经存在!");
          } else {
            this.$message({
              showClose: true,
              message: "添加失败!!",
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


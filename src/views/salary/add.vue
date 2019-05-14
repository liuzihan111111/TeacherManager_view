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
import { TeacherList } from "@/api/teacher";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      form: {
        /* tid: "",
        basePay: "",
        ClassFees: "",
        PerformanceSalary: "",
        bonus: "",
        allowance: "",
        other: "",
        mark: "无" */
      },
      list: null,
      rules: {
        tid: [{ required: true, message: "请输入教师工号", trigger: "blur" }],
        basePay: [
          { required: true, message: "请输入基本工资", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["major"])
  },
  methods: {
    onSubmit() {
      // console.log(this.form.tid);
      /* this.form.basePay = Number(this.form.basePay);
      this.form.ClassFees = Number(this.form.ClassFees);
      this.form.PerformanceSalary = Number(this.form.PerformanceSalary);
      this.form.bonus = Number(this.form.bonus);
      this.form.allowance = Number(this.form.allowance);
      this.form.other = Number(this.form.other);
      console.log(this.form.basePay); */
      TeacherList({ tid: this.form.tid, major_name: this.major })
        .then(response => {
          console.log(response);
          this.list = response.info.list[0];
          if (!response.info.allCount) {
            this.$message({
              showClose: true,
              message: "该账号不存在，或不属于该系!!",
              type: "error"
            });
            return;
          } else {
            console.log(this.form);
            this.form.t_id = this.list._id;
            SalaryAdd(this.form)
              .then(res => {
                console.log(res);
                if (res.code === 1) {
                  this.$message({
                    showClose: true,
                    message: "添加成功!!",
                    type: "success"
                  });
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
            this.$refs["form"].resetFields();
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


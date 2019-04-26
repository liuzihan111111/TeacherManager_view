<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" size="small" :rules="rules">
      <el-form-item label="教师工号" prop="tid">
        <el-input v-model="form.tid"/>
      </el-form-item>
      <el-form-item label="授课老师" prop="tname">
        <el-input v-model="form.tname"/>
      </el-form-item>
      <el-form-item label="课程名" prop="cname">
        <el-input v-model="form.cname"/>
      </el-form-item>
      <el-form-item label="上课时间" prop="ClassTime">
        <el-input v-model="form.ClassTime"/>
      </el-form-item>
      <el-form-item label="上课地点" prop="ClassPlace">
        <el-input v-model="form.ClassPlace"/>
      </el-form-item>
      <el-form-item label="总课时" prop="ClassHour">
        <el-input v-model="form.ClassHour"/>
      </el-form-item>
      <el-form-item label="上课班级" prop="Student">
        <el-input v-model="form.Student"/>
      </el-form-item>

      <!--  <el-form-item label="学历" prop="edu">
        <el-select v-model="form.edu" placeholder="请选择。。。">
          <el-option label="本科" value="本科"/>
          <el-option label="硕士" value="硕士"/>
          <el-option label="博士" value="博士"/>
        </el-select>
      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ScheduleAdd } from "@/api/schedule";
export default {
  data() {
    return {
      form: {
        tid: "",
        tname: "",
        cname: "",
        ClassTime: "",
        ClassPlace: "",
        ClassHour: "",
        Student: ""
      },
      rules: {
        tid: [{ required: true, message: "请输入教师工号", trigger: "blur" }],
        tname: [
          { required: true, message: "请输入授课老师姓名", trigger: "blur" }
        ],
        cname: [{ required: true, message: "请输入课程名", trigger: "blur" }],
        ClassTime: [
          { required: true, message: "请输入上课时间", trigger: "blur" }
        ],
        ClassPlace: [
          { required: true, message: "请输入上课地点", trigger: "blur" }
        ],
        ClassHour: [
          { required: true, message: "请输入上课时间", trigger: "blur" }
        ],
        Student: [
          { required: true, message: "请输入上课班级", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      // console.log(this.form);
      ScheduleAdd(this.form)
        .then(res => {
          // console.log(res);
          if (res.code === 1) {
            this.$message("添加成功!");
            this.$refs["form"].resetFields();
          } else {
            this.$message("添加失败！");
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

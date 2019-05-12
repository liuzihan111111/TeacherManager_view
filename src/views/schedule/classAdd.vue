<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" size="small" :rules="rules">
      <el-form-item label="教师工号" prop="tid">
        <el-input v-model="form.tid"/>
      </el-form-item>
      <el-form-item label="课程名" prop="cname">
        <el-input v-model="form.cname"/>
      </el-form-item>
      <el-form-item label="总人数" prop="number">
        <el-input v-model="form.Number"/>
      </el-form-item>
      <el-form-item label="学历层次" prop="edu">
        <el-select v-model="form.type" placeholder="请选择。。。">
          <el-option label="专科" value="专科"/>
          <el-option label="本科" value="本科"/>
          <!-- <el-option label="硕士" value="硕士"/> -->
        </el-select>
      </el-form-item>
      <el-form-item label="总课时" prop="ClassHour">
        <el-input v-model="form.ClassHour"/>
      </el-form-item>
      <el-form-item label="上课班级" prop="Student">
        <el-input v-model="form.Student"/>
      </el-form-item>
      <el-form-item label="学年" prop="term">
        <el-input v-model="form.term"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ScheduleAdd } from "@/api/schedule";
import { TeacherList } from "@/api/teacher";
export default {
  data() {
    return {
      list: null,
      form: {},
      rules: {
        tid: [{ required: true, message: "请输入教师工号", trigger: "blur" }],
        cname: [{ required: true, message: "请输入课程名", trigger: "blur" }],
        number: [{ required: true, message: "请输入总人数", trigger: "blur" }],
        edu: [
          { required: true, message: "请输入授课学生学历", trigger: "blur" }
        ],
        term: [{ required: true, message: "请输入授课时间", trigger: "blur" }],
        Student: [
          { required: true, message: "请输入上课班级", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      // console.log(this.form);
      TeacherList({ tid: this.form.tid }).then(response => {
        console.log(response);
        this.list = response.info.list[0];
        if (!response.info.allCount) {
          this.$message({
            showClose: true,
            message: "该教师账号不存在!!",
            type: "error"
          });
          return;
        } else {
          this.form.t_id = this.list._id;
          console.log(this.form);
          ScheduleAdd(this.form)
            .then(res => {
              // console.log(res);
              if (res.code === 1) {
                this.$message({
                  showClose: true,
                  message: "添加成功!!",
                  type: "success"
                });
                this.$refs["form"].resetFields();
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

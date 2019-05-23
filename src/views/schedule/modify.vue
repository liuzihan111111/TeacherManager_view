<template>
  <div class="app-container">
    <el-form ref="form" :model="detail" label-width="120px" size="small" :rules="rules">
      <el-form-item label="教师工号" prop="tid">
        <el-input v-model="detail.tid" disabled="true"/>
      </el-form-item>
      <el-form-item label="授课老师" prop="tname">
        <el-input v-model="detail.t_id.tname" disabled="true"/>
      </el-form-item>
      <el-form-item label="课程名" prop="cname">
        <el-input v-model="detail.cname"/>
      </el-form-item>
      <el-form-item label="学分" prop="cname">
        <el-input v-model="detail.score"/>
      </el-form-item>
      <el-form-item label="总人数" prop="ClassTime">
        <el-input v-model="detail.Number"/>
      </el-form-item>
      <el-form-item label="学历层次" prop="edu">
        <el-select v-model="detail.type" placeholder="请选择。。。">
          <el-option label="专科" value="专科"/>
          <el-option label="本科" value="本科"/>
          <!-- <el-option label="硕士" value="硕士"/> -->
        </el-select>
      </el-form-item>
      <el-form-item label="总课时" prop="ClassHour">
        <el-input v-model="detail.ClassHour"/>
      </el-form-item>
      <el-form-item label="上课班级" prop="Student">
        <el-input v-model="detail.Student"/>
      </el-form-item>
      <el-form-item label="学年" prop="Student">
        <el-input v-model="detail.term"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
        <el-button @click="resetForm('detail')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { ScheduleModify } from "@/api/schedule";
export default {
  data() {
    return {
      detail: {}
    };
  },
  methods: {
    onSubmit() {
      ScheduleModify(this.detail._id, this.detail)
        .then(req => {
          // console.log(req);
          if (req.code === 1) {
            this.$message("修改成功!");
            this.$router.push("/schedule");
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
.app-container {
  width: 70%;
}
</style>

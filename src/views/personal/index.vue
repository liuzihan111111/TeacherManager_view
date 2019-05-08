<template>
  <div class="app-container">
    <h3>{{locals}}</h3>
    <el-form ref="form" :model="detail" label-width="120px" size="mini">
      <el-form-item label="工号">
        <el-input v-model="detail.tid" disabled="true"/>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="detail.tname" disabled="true"/>
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="detail.sex"/>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="detail.tel"/>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker
          v-model="detail.birth"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="婚否">
        <el-input v-model="detail.marriage"/>
      </el-form-item>
      <el-form-item label="政治面貌">
        <el-input v-model="detail.polity" disabled="true"/>
      </el-form-item>
      <el-form-item label="学历">
        <el-input v-model="detail.edu" disabled="true"/>
      </el-form-item>
      <el-form-item label="职称">
        <el-input v-model="detail.duty" disabled="true"/>
      </el-form-item>
      <el-form-item label="家庭住址">
        <el-input v-model="detail.address"/>
      </el-form-item>
      <el-form-item label="院系">
        <el-input v-model="detail.major_name" disabled="true"/>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="detail.remark" type="textarea"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
        <el-button @click="resetForm('detail')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { TeacherModify, TeacherList } from "@/api/teacher";
export default {
  data() {
    return {
      detail: {},
      id: localStorage.getItem("id")
    };
  },
  methods: {
    onSubmit() {
      console.log(this.detail);
      /* TeacherModify(this.detail._id, this.detail)
        .then(req => {
          // console.log(req);
          if (req.code === 1) {
            this.$message("修改成功!");
            this.$router.push("/teacher");
          } else {
            this.$message("修改失败!");
          }
        })
        .catch(err => {
          console.log(err);
        }); */
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {
    TeacherList({ tid: this.id })
      .then(res => {
        this.detail = res.info.list[0];
        // console.log(res);
        console.log(this.detail);
      })
      .catch(err => console.log(err));
  }
};
</script>
<style scoped>
.app-container {
  width: 70%;
}
</style>



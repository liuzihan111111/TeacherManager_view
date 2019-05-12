<template>
  <div class="app-container">
    <el-form ref="form" :model="detail" label-width="120px" size="mini">
      <el-form-item label="工号">
        <el-input v-model="detail.tid"/>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="detail.tname"/>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="detail.sex">
          <el-radio label="男"/>
          <el-radio label="女"/>
        </el-radio-group>
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
        <el-radio-group v-model="detail.marriage">
          <el-radio label="是"/>
          <el-radio label="否"/>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="政治面貌">
        <el-select v-model="detail.polity" placeholder="请选择。。。">
          <el-option label="群众" value="群众"/>
          <el-option label="党员" value="党员"/>
        </el-select>
      </el-form-item>
      <el-form-item label="学历">
        <el-select v-model="detail.edu" placeholder="请选择。。。">
          <el-option label="本科" value="本科"/>
          <el-option label="硕士" value="硕士"/>
          <el-option label="博士" value="博士"/>
        </el-select>
      </el-form-item>
      <el-form-item label="职称">
        <el-radio-group v-model="detail.duty">
          <el-radio label="助教"/>
          <el-radio label="讲师"/>
          <el-radio label="副教授"/>
          <el-radio label="教授"/>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="家庭住址">
        <el-input v-model="detail.address"/>
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
import { TeacherModify } from "@/api/teacher";
export default {
  data() {
    return {
      detail: {}
    };
  },
  methods: {
    onSubmit() {
      TeacherModify(this.detail._id, this.detail)
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



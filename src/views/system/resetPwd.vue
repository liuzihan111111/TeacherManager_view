<template>
  <div class="app-container">
    <el-form ref="form" label-width="120px" size="mini" :inline="true">
      <el-form-item label="工号">
        <el-input v-model="tid"/>
      </el-form-item>
      <el-form-item label>
        <el-button type="primary" @click="onSubmit">重置密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { TeacherList, TeacherModify } from "@/api/teacher";
export default {
  data() {
    return {
      tid: "",
      tpwd: "000000",
      id: ""
    };
  },
  methods: {
    onSubmit() {
      TeacherList({ tid: this.tid }).then(response => {
        console.log(response);
        if (response.info.allCount) {
          this.id = response.info.list[0]._id;
          TeacherModify(this.id, { tpwd: this.tpwd })
            .then(req => {
              // console.log(req);
              if (req.code === 1) {
                this.$message({
                  message: "密码重置成功!",
                  type: "success"
                });
                this.tid = "";
              } else {
                this.$message("密码重置失败!");
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$message({
            message: "该教师工号不存在，请重新输入!!",
            type: "warning"
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.app-container {
  width: 93%;
  margin: 7% auto;
}
</style>




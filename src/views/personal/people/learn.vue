<template>
  <div class="app-container">
    <h2>{{name}}</h2>
    <el-form
      ref="form"
      :model="detail"
      label-width="200px"
      size="medium"
      :inline="true"
      label-position="top"
    >
      <el-form-item label="起止时间" prop="edu1_time">
        <el-input v-model="detail.edu1_time" placeholder="例:2016年6月-2019年9月"/>
      </el-form-item>
      <el-form-item label="学校" prop="edu1_school">
        <el-input v-model="detail.edu1_school"/>
      </el-form-item>
      <el-form-item label="学历" prop="edu1_name">
        <el-input v-model="detail.edu1_name" placeholder="本科"/>
      </el-form-item>
      <br>
      <el-form-item label prop="edu2_time">
        <el-input v-model="detail.edu2_time"/>
      </el-form-item>
      <el-form-item label prop="edu2_school">
        <el-input v-model="detail.edu2_school"/>
      </el-form-item>
      <el-form-item label prop="edu2_name">
        <el-input v-model="detail.edu2_name" placeholder="硕士"/>
      </el-form-item>
      <br>
      <el-form-item label prop="edu3_time">
        <el-input v-model="detail.edu3_time"/>
      </el-form-item>
      <el-form-item label prop="edu3_school">
        <el-input v-model="detail.edu3_school"/>
      </el-form-item>
      <el-form-item label prop="edu3_name">
        <el-input v-model="detail.edu3_name" placeholder="博士"/>
      </el-form-item>
      <br>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
        <el-button @click="resetForm('detail')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { EduList, EduModify } from "@/api/edu";
import { mapGetters } from "vuex";
import { TeacherList } from "@/api/teacher";
export default {
  data() {
    return {
      detail: {}, // 存放个人的教育经历
      list: {} // 根据工号获取教师信息
    };
  },
  computed: {
    ...mapGetters(["name"])
  },
  created() {
    // 获取教育经历
    this.GetEdu();
  },
  methods: {
    // 存在修改教育经历，不存在添加
    onSubmit() {
      TeacherList({ tid: this.name }).then(response => {
        console.log(response);
        this.list = response.info.list[0];
        if (!response.info.allCount) {
          this.$message({
            showClose: true,
            message: "添加失败!!",
            type: "error"
          });
          return;
        } else {
          this.detail.t_id = this.list._id;
          this.detail.tid = this.name;
          console.log(this.detail);
          EduModify(this.detail)
            .then(res => {
              console.log(res);
              if (res.code === 1) {
                this.$message({
                  showClose: true,
                  message: "添加成功!!",
                  type: "success"
                });
                this.$refs["detail"].resetFields();
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
    // 获取教育经历
    GetEdu() {
      EduList({ tid: this.name })
        .then(res => {
          console.log(res);
          this.detail = res.info.list[0];
        })
        .catch(err => {
          console.log(err);
        });
    },
    resetForm(formName) {
      this.GetEdu();
    }
  }
};
</script>
<style scoped>
.app-container {
  width: 100%;
}
.el-form-item {
  width: 30%;
}
</style>

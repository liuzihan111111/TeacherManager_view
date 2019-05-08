<template>
  <div class="app-container">
    <el-form ref="form" :model="detail" label-width="120px" size="mini" :rules="rules">
      <el-form-item label="项目名" prop="subject_title">
        <el-input v-model="detail.subject_title"/>
      </el-form-item>
      <el-form-item label="时长（天）" prop="subject_time">
        <el-input v-model="detail.subject_time"/>
      </el-form-item>
      <el-form-item label="研究经费" prop="subject_funding">
        <el-input v-model="detail.subject_funding"/>
      </el-form-item>
      <el-form-item label="项目说明">
        <el-input type="textarea" :rows="3" v-model="detail.subject_desc"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" title="提交项目修改">修改</el-button>
        <el-button @click="resetForm" title="返回项目列表页">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { ProjectModify } from "@/api/project";
export default {
  data() {
    return {
      detail: {},
      rules: {
        subject_title: [
          { required: true, message: "项目名不能为空", trigger: "blur" }
        ],
        subject_time: [
          { required: true, message: "项目周期不能为空", trigger: "blur" }
        ],
        subject_funding: [
          { required: true, message: "项目经费不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      // console.log(this.detail.check);
      var data = {};
      if (this.detail.subject_title) {
        data.subject_title = this.detail.subject_title;
      }
      if (this.detail.subject_time) {
        data.subject_time = this.detail.subject_time;
      }
      if (this.detail.subject_funding) {
        data.subject_funding = this.detail.subject_funding;
      }
      if (this.detail.subject_desc) {
        data.subject_desc = this.detail.subject_desc;
      }
      // console.log(data);
      ProjectModify(this.detail._id, data)
        .then(req => {
          // console.log(req);
          if (req.code === 1) {
            this.$message({
              showClose: true,
              message: "修改成功!",
              type: "success"
            });
            this.$router.push("/Myproject");
          } else {
            this.$message("修改失败!");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 返回
    resetForm() {
      this.$router.push("/Myproject");
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



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
        <el-button type="primary" @click="onSubmit" title="提交项目申请">提交</el-button>
        <el-button @click="resetForm" title="返回项目列表页">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { ProjectAdd } from "@/api/project";
import { Format } from "@/utils/formateDate";
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
      // 传递的参数
      this.detail.tid = localStorage.getItem("id");
      this.detail.tname = localStorage.getItem("name");
      this.detail.apply_time = Format(new Date(), "/");
      this.detail.check = 0;
      this.detail.check_time = "";
      this.detail.mark = "";
      this.detail.complete = "";
      console.log(this.detail);
      ProjectAdd(this.detail)
        .then(req => {
          // console.log(req);
          if (req.code === 1) {
            this.$message({
              showClose: true,
              message: "添加成功!",
              type: "success"
            });
            this.$router.push("/Myproject");
          } else {
            this.$message("添加失败!");
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
  }
};
</script>
<style scoped>
.app-container {
  width: 70%;
}
</style>



<template>
  <div class="app-container">
    <el-form ref="form" :model="detail" label-width="120px" size="mini" :rules="rules">
      <el-form-item label="项目名" prop="subject_title">
        <el-input v-model="detail.subject_title"/>
      </el-form-item>
      <el-form-item label="项目级别" prop="subject_title">
        <el-input v-model="detail.subject_type"/>
      </el-form-item>
      <el-form-item label="时长（天）" prop="subject_time">
        <el-input v-model="detail.subject_time"/>
      </el-form-item>
      <el-form-item label="研究经费" prop="subject_funding">
        <el-input v-model="detail.subject_funding"/>
      </el-form-item>
      <el-form-item label="经费来源" prop="subject_funding">
        <el-input v-model="detail.subject_from"/>
      </el-form-item>
      <el-form-item label="项目说明">
        <el-input type="textarea" :rows="3" v-model="detail.subject_desc"/>
      </el-form-item>
      <el-form-item label="项目说明">
        <el-input type="textarea" :rows="3" v-model="detail.subject_desc"/>
      </el-form-item>
      <el-form-item label="证明材料">
        <img
          :src="serverurl+detail.src"
          title="点击放大"
          style="width:15%;cursor:pointer"
          @click="PictureShow"
          alt="暂无材料"
        >
        <el-upload
          action="11"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          multiple
          :before-upload="beforeUpload"
        >
          <el-button size="small" type="primary" title="上传图片">修改材料</el-button>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" size="tiny">
          <img width="100%" :src="serverurl+detail.src" alt>
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" title="提交项目修改">修改</el-button>
        <el-button @click="resetForm" title="返回项目列表页">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { ProjectModify, Upload } from "@/api/project";
export default {
  data() {
    return {
      dialogVisible: false,
      serverurl: "http://localhost:3000",
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
    // 修改
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
      if (this.detail.subject_type) {
        data.subject_type = this.detail.subject_type;
      }
      if (this.detail.subject_from) {
        data.subject_from = this.detail.subject_from;
      }
      if (this.detail.src) {
        data.src = this.detail.src;
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
    // 查看图片
    PictureShow() {
      this.dialogVisible = true;
    },
    // 图片上传
    beforeUpload(file) {
      let fd = new FormData(); //通过form数据格式来传
      fd.append("file", file); //传文件
      Upload(fd)
        .then(res => {
          if (res.code == 1) {
            this.detail.src = res.info;
          } else {
            this.$message({
              showClose: true,
              message: "文件上传失败!!",
              type: "error"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });

      return false;
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



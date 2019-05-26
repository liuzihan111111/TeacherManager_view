<template>
  <div class="app-container">
    <!--  <h2>{{name}}</h2> -->
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
      <el-form-item label="最高学历材料证明：">
        <img
          :src="serverurl+detail.src"
          title="点击放大"
          style="width:25%;cursor:pointer"
          @click="PictureShow"
          v-if="detail.src"
        >
        <el-upload
          action="11"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          multiple
          :before-upload="beforeUpload"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" size="tiny">
          <img width="100%" :src="serverurl+detail.src" alt>
        </el-dialog>
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
import { Upload } from "@/api/project";
export default {
  data() {
    return {
      dialogVisible: false,
      serverurl: "http://localhost:3000",
      detail: {
        src: ""
      },
      list: {} // 根据工号获取教师信息
    };
  },
  computed: {
    ...mapGetters(["name"])
  },
  created() {
    // 获取教育经历
    this.GetEdu();
    console.log(this.detail);
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
          if (res.info.list[0]) {
            this.detail = res.info.list[0];
          }
          console.log(this.serverurl + this.detail.src);
        })
        .catch(err => {
          console.log(err);
        });
    },
    resetForm(formName) {
      this.GetEdu();
    },
    PictureShow() {
      this.dialogVisible = true;
    },
    beforeUpload(file) {
      let fd = new FormData(); //通过form数据格式来传
      fd.append("file", file); //传文件
      Upload(fd)
        .then(res => {
          console.log(res);
          if (res.code == 1) {
            console.log(this.detail);
            this.detail.src = res.info;
            console.log(this.detail);
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

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
      <el-form-item label="证明材料">
        <img
          :src="serverurl+detail.src"
          title="点击放大"
          style="width:15%;cursor:pointer"
          @click="PictureShow"
          v-if="detail.src"
        >
        <el-upload
          v-else
          action="11"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          multiple
          :before-upload="beforeUpload"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" size="tiny">
          <img width="100%" :src="serverurl+detail.src" alt>
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" title="提交项目申请">提交</el-button>
        <el-button @click="resetForm" title="返回项目列表页">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { ProjectAdd, Upload } from "@/api/project";
import { Format } from "@/utils/formateDate";
import { mapGetters } from "vuex";
import { TeacherList } from "@/api/teacher";
export default {
  data() {
    return {
      dialogVisible: false,
      serverurl: "http://localhost:3000",
      list: null,
      detail: {
        src: null // 图片路径
      },
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
  computed: {
    ...mapGetters(["name"])
  },
  methods: {
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
          // 添加项目
          // 传递的参数
          this.detail.tid = localStorage.getItem("id");
          this.detail.apply_time = Format(new Date(), "/");
          this.detail.check = 0;
          this.detail.check_time = "";
          this.detail.mark = "";
          this.detail.complete = "";
          this.detail.t_id = this.list._id;
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
        }
      });
    },
    // 返回
    resetForm() {
      this.$router.push("/Myproject");
    },
    handleRemove(file, fileList) {
      //console.log("2222");
      // console.log(file, fileList);
    },
    PictureShow() {
      this.dialogVisible = true;
    },
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
    }
  }
};
</script>
<style scoped>
.app-container {
  width: 70%;
}
</style>



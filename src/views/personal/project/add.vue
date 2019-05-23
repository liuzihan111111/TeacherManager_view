<template>
  <div class="app-container">
    <el-form ref="form" :model="detail" label-width="120px" size="mini" :rules="rules">
      <el-form-item label="成果名">
        <el-input v-model="detail.subject_title"/>
      </el-form-item>
      <!--  <el-form-item label="成果类别">
        <el-input v-model="detail.subject_type"/>
      </el-form-item>-->
      <el-form-item label="成果类别">
        <el-select v-model="detail.subject_type" placeholder="请选择">
          <el-option label="论文" value="论文"/>
          <el-option label="项目" value="项目"/>
          <el-option label="专利" value="专利"/>
        </el-select>
      </el-form-item>
      <!--  <el-form-item label="级别">
        <el-input v-model="detail.subject_level"/>
      </el-form-item>-->
      <el-form-item label="级别">
        <el-select
          v-model="detail.subject_level"
          v-if="detail.subject_type==='论文'"
          placeholder="级别由高向低"
        >
          <el-option label="SCI源刊" value="SCI源刊"/>
          <el-option label="EI源刊" value="EI源刊"/>
          <el-option label="中文核心" value="中文核心"/>
          <el-option label="普刊" value="普刊"/>
        </el-select>
        <el-select
          v-model="detail.subject_level"
          v-else-if="detail.subject_type==='项目'"
          placeholder="级别由高向低"
        >
          <el-option label="国家级" value="国家级"/>
          <el-option label="省级" value="省级"/>
          <el-option label="市厅级" value="市厅级"/>
        </el-select>
        <el-select v-model="detail.subject_level" v-else placeholder="级别由高向低">
          <el-option label="国家级" value="国家级"/>
        </el-select>
      </el-form-item>
      <el-form-item label="主要完成人">
        <el-input type="textarea" :rows="3" v-model="detail.subject_peoples" placeholder="按顺序依次输入"/>
      </el-form-item>
      <el-form-item label="完成时间">
        <el-input v-model="detail.subject_time"/>
      </el-form-item>
      <el-form-item label="获奖情况">
        <el-input v-model="detail.subject_win"/>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" :rows="3" v-model="detail.note"/>
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



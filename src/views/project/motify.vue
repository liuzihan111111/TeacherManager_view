<template>
  <div class="app-container">
    <el-form ref="form" :model="detail" label-width="120px" size="mini" :rules="rules">
      <el-form-item label="负责人工号">
        <el-input v-model="detail.tid" :disabled="true"/>
      </el-form-item>
      <el-form-item label="负责人姓名">
        <el-input v-model="detail.t_id.tname" :disabled="true"/>
      </el-form-item>
      <el-form-item label="成果名">
        <el-input v-model="detail.subject_title" :disabled="true"/>
      </el-form-item>
      <el-form-item label="成果类别">
        <el-input v-model="detail.subject_type" :disabled="true"/>
      </el-form-item>
      <el-form-item label="级别">
        <el-input v-model="detail.subject_level" :disabled="true"/>
      </el-form-item>
      <el-form-item label="主要完成人">
        <el-input type="textarea" :rows="3" v-model="detail.subject_peoples" :disabled="true"/>
      </el-form-item>
      <el-form-item label="完成时间">
        <el-input v-model="detail.subject_time" :disabled="true"/>
      </el-form-item>
      <el-form-item label="获奖情况">
        <el-input v-model="detail.subject_desc" :disabled="true"/>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" :rows="3" v-model="detail.note" :disabled="true"/>
      </el-form-item>
      <el-form-item label="证明材料">
        <img
          :src="serverurl+detail.src"
          title="点击放大"
          style="width:15%;cursor:pointer"
          @click="PictureShow"
          alt="暂无材料"
        >
        <el-dialog :visible.sync="dialogVisible" size="tiny">
          <img width="100%" :src="serverurl+detail.src" alt>
        </el-dialog>
      </el-form-item>
      <el-form-item label="审核" prop="check">
        <el-radio-group v-model="detail.check" size="small">
          <el-radio label="2" border>不通过</el-radio>
          <el-radio label="1" border>通过</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="审核说明">
        <el-input v-model="detail.mark" type="textarea"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" title="提交项目审核状态">确定</el-button>
        <el-button @click="resetForm" title="返回项目列表页">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { ProjectModify } from "@/api/project";
import { Format } from "@/utils/formateDate";
export default {
  data() {
    return {
      dialogVisible: false,
      serverurl: "http://localhost:3000",
      detail: {},
      rules: {
        check: [{ required: true, message: "请选择", trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit() {
      // console.log(this.detail.check);
      if (this.detail.check) {
        var data = {};
        data.check = this.detail.check;
        if (this.detail.mark) {
          data.mark = this.detail.mark;
        }
        data.check_time = Format(new Date(), "/");
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
              this.$router.push("/project");
            } else {
              this.$message("修改失败!");
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$message({
          showClose: true,
          message: "还没有选择审核状态，请选择!!",
          type: "warning"
        });
      }
    },
    // 查看图片
    PictureShow() {
      this.dialogVisible = true;
    },
    // 返回
    resetForm() {
      this.$router.push("/project");
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



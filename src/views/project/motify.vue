<template>
  <div class="app-container">
    <el-form ref="form" :model="detail" label-width="120px" size="mini" :rules="rules">
      <el-form-item label="工号">
        <el-input v-model="detail.tid" :disabled="true"/>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="detail.t_id.tname" :disabled="true"/>
      </el-form-item>
      <el-form-item label="项目名">
        <el-input v-model="detail.subject_title" :disabled="true"/>
      </el-form-item>
      <el-form-item label="时长（天">
        <el-input v-model="detail.subject_time" :disabled="true"/>
      </el-form-item>
      <el-form-item label="研究经费">
        <el-input v-model="detail.subject_funding" :disabled="true"/>
      </el-form-item>
      <el-form-item label="项目说明">
        <el-input type="textarea" :rows="3" v-model="detail.subject_desc" :disabled="true"/>
      </el-form-item>
      <el-form-item label="申请时间">
        <el-input v-model="detail.apply_time" :disabled="true"/>
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



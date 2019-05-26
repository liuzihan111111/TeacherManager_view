<template>
  <div class="app-container">
    <el-form ref="form" :model="detail" label-width="120px" size="mini">
      <el-form-item label="工号">
        <el-input v-model="detail.tid"/>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="detail.tname"/>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="detail.sex">
          <el-radio label="男"/>
          <el-radio label="女"/>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="detail.tel"/>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker
          v-model="detail.birth"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="婚否">
        <el-radio-group v-model="detail.marriage">
          <el-radio label="是"/>
          <el-radio label="否"/>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="政治面貌">
        <el-select v-model="detail.polity" placeholder="请选择。。。">
          <el-option label="群众" value="群众"/>
          <el-option label="党员" value="党员"/>
        </el-select>
      </el-form-item>
      <el-form-item label="学历">
        <el-select v-model="detail.edu" placeholder="请选择。。。">
          <el-option label="本科" value="本科"/>
          <el-option label="硕士" value="硕士"/>
          <el-option label="博士" value="博士"/>
        </el-select>
      </el-form-item>
      <el-form-item label="职称">
        <el-radio-group v-model="detail.duty">
          <el-radio label="助教"/>
          <el-radio label="讲师"/>
          <el-radio label="副教授"/>
          <el-radio label="教授"/>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="家庭住址">
        <el-input v-model="detail.address"/>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="detail.remark" type="textarea"/>
      </el-form-item>
      <!--  <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
        <el-button @click="resetForm('detail')">重置</el-button>
      </el-form-item>-->
    </el-form>
    <hr>
    <h4>教育经历</h4>
    <el-form
      ref="form"
      :model="edu"
      label-width="200px"
      size="medium"
      :inline="true"
      label-position="top"
      :rules="rules"
      style="padding-left:7%"
    >
      <el-form-item label="起止时间" prop="edu1_time">
        <el-input v-model="edu.edu1_time" placeholder="例:2016年6月-2019年9月"/>
      </el-form-item>
      <el-form-item label="学校" prop="edu1_school">
        <el-input v-model="edu.edu1_school"/>
      </el-form-item>
      <el-form-item label="学历" prop="edu1_name">
        <el-input v-model="edu.edu1_name" placeholder="本科"/>
      </el-form-item>
      <br>
      <el-form-item label prop="edu2_time">
        <el-input v-model="edu.edu2_time"/>
      </el-form-item>
      <el-form-item label prop="edu2_school">
        <el-input v-model="edu.edu2_school"/>
      </el-form-item>
      <el-form-item label prop="edu2_name">
        <el-input v-model="edu.edu2_name" placeholder="硕士"/>
      </el-form-item>
      <br>
      <el-form-item label prop="edu3_time">
        <el-input v-model="edu.edu3_time"/>
      </el-form-item>
      <el-form-item label prop="edu3_school">
        <el-input v-model="edu.edu3_school"/>
      </el-form-item>
      <el-form-item label prop="edu3_name">
        <el-input v-model="edu.edu3_name" placeholder="博士"/>
      </el-form-item>
      <br>
      <el-form-item label="最高学历材料证明：">
        <img
          :src="serverurl+edu.src"
          title="点击放大"
          style="width:25%;cursor:pointer"
          @click="PictureShow"
        >
        <el-dialog :visible.sync="dialogVisible" size="tiny">
          <img width="100%" :src="serverurl+edu.src" alt>
        </el-dialog>
      </el-form-item>
      <br>
      <el-form-item label="审核信息：" prop="check">
        <el-radio-group v-model="detail.check" size="small">
          <el-radio label="2" border>不通过</el-radio>
          <el-radio label="1" border>通过</el-radio>
        </el-radio-group>
      </el-form-item>
      <br>
      <el-form-item>
        <el-button type="primary" size="mini" @click="onSubmit" title="提交审核状态">确定</el-button>
        <el-button @click="resetForm('detail')" size="mini">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { TeacherModify } from "@/api/teacher";
import { EduList, EduModify } from "@/api/edu";
export default {
  data() {
    return {
      dialogVisible: false,
      serverurl: "http://localhost:3000",
      detail: {},
      edu: {}, // 存放个人的教育经历
      rules: {
        check: [{ required: true, message: "请选择", trigger: "blur" }]
      }
    };
  },
  methods: {
    EduShow() {
      EduList({ tid: this.detail.tid })
        .then(res => {
          console.log(res);
          this.edu = res.info.list[0];
          console.log(this.edu.src);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 材料放大
    PictureShow() {
      this.dialogVisible = true;
    },
    onSubmit() {
      TeacherModify(this.detail._id, this.detail)
        .then(req => {
          // console.log(req);
          if (req.code === 1) {
            this.$message("修改成功!");
            this.$router.push("/teacher");
          } else {
            this.$message("修改失败!");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {
    this.detail = this.$route.params;
    this.EduShow();
  }
};
</script>
<style scoped>
.app-container {
  width: 70%;
}
</style>



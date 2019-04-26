<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" size="mini" :rules="rules">
      <el-form-item label="工号" prop="tid">
        <el-input v-model="form.tid"/>
      </el-form-item>
      <el-form-item label="姓名" prop="tname">
        <el-input v-model="form.tname"/>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio label="男"/>
          <el-radio label="女"/>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="联系电话" prop="tel">
        <el-input v-model="form.tel"/>
      </el-form-item>
      <el-form-item label="出生日期" prop="birth">
        <el-date-picker
          v-model="form.birth"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="婚否" prop="marriage">
        <el-radio-group v-model="form.marriage">
          <el-radio label="是"/>
          <el-radio label="否"/>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="政治面貌" prop="polity">
        <el-select v-model="form.polity" placeholder="请选择。。。">
          <el-option label="群众" value="群众"/>
          <el-option label="党员" value="党员"/>
        </el-select>
      </el-form-item>
      <el-form-item label="学历" prop="edu">
        <el-select v-model="form.edu" placeholder="请选择。。。">
          <el-option label="本科" value="本科"/>
          <el-option label="硕士" value="硕士"/>
          <el-option label="博士" value="博士"/>
        </el-select>
      </el-form-item>
      <el-form-item label="职称" prop="duty">
        <el-radio-group v-model="form.duty">
          <el-radio label="助教"/>
          <el-radio label="讲师"/>
          <el-radio label="副教授"/>
          <el-radio label="教授"/>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="家庭住址" prop="address">
        <el-input v-model="form.address"/>
      </el-form-item>
      <el-form-item label="院系" prop="major_name">
        <el-select v-model="form.major_name" placeholder="请选择。。。">
          <el-option label="计算机" value="计算机"/>
          <el-option label="会计" value="会计"/>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" type="textarea"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { TeacherAdd } from "@/api/teacher";
export default {
  data() {
    return {
      form: {
        tid: "",
        tname: "",
        address: "",
        sex: "男",
        birth: "",
        marriage: "否",
        polity: "群众",
        edu: "",
        major_name: "",
        duty: "助教",
        tel: "",
        remark: ""
      },
      rules: {
        tid: [{ required: true, message: "请输入工号", trigger: "blur" }],
        tname: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        tel: [{ required: true, message: "请输入电话号码", trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit() {
      console.log(this.form);
      TeacherAdd(this.form)
        .then(res => {
          console.log(res);
          if (res.code === 1) {
            this.$message("添加成功!");
            this.$refs["form"].resetFields();
          } else {
            this.$message("添加失败！");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
.app-container {
  width: 70%;
}
</style>


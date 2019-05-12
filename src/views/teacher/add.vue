<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" :rules="rules">
      <el-form-item label="工号" prop="tid">
        <el-input v-model="form.tid"/>
      </el-form-item>
      <el-form-item label="姓名" prop="tname">
        <el-input v-model="form.tname"/>
      </el-form-item>
      <el-form-item label="所属院系" :label-width="formLabelWidth" v-if=" !major">
        <el-select v-model="form.major_name" placeholder="请选择院系" style="width: 100%;">
          <el-option
            v-for="item in departments"
            :key="item._id"
            :label="item.major_name"
            :value="item.major_name"
          ></el-option>
        </el-select>
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
import { mapGetters } from "vuex";
import { DepartmentList } from "@/api/departments";
export default {
  data() {
    return {
      departments: [], // 学院信息
      form: {
        tid: "",
        tname: "",
        major_name: ""
      },
      rules: {
        tid: [{ required: true, message: "请输入工号", trigger: "blur" }],
        tname: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapGetters(["major"])
  },
  created() {
    // 是否为院级管理员登录
    if (this.major) {
      this.form.major_name = this.major;
    } else {
      this.getDepartmentList();
    }
  },
  methods: {
    // 获取学院列表
    getDepartmentList() {
      DepartmentList()
        .then(req => {
          this.departments = req.info.list;
        })
        .catch(err => {
          console.log(err);
        });
    },
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


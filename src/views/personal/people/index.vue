<template>
  <div class="app-container">
    <el-form ref="form" :model="detail" label-width="120px" size="mini">
      <el-form-item label="审核状态">
        <el-radio-group v-model="detail.check" size="small">
          <el-radio-button v-model="detail.check" :label="0" disabled>未审核</el-radio-button>
          <el-radio-button v-model="detail.check" :label="1" disabled>已通过</el-radio-button>
          <el-radio-button v-model="detail.check" :label="2" disabled>未通过</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="工号">
        <el-input v-model="detail.tid" disabled="true"/>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="detail.tname" :disabled="IsMotify"/>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="detail.sex" :disabled="IsMotify">
          <el-option label="是" value="是"/>
          <el-option label="否" value="否"/>
        </el-select>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="detail.tel" :disabled="IsMotify"/>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker
          v-model="detail.birth"
          :disabled="IsMotify"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="婚否">
        <el-select v-model="detail.marriage" :disabled="IsMotify">
          <el-option label="是" value="是"/>
          <el-option label="否" value="否"/>
        </el-select>
      </el-form-item>
      <el-form-item label="政治面貌">
        <el-select v-model="detail.polity" :disabled="IsMotify">
          <el-option label="群众" value="群众"/>
          <el-option label="党员" value="党员"/>
        </el-select>
      </el-form-item>
      <el-form-item label="最高学历">
        <el-select v-model="detail.edu" :disabled="IsMotify">
          <el-option label="本科" value="本科"/>
          <el-option label="硕士" value="硕士"/>
          <el-option label="博士" value="博士"/>
        </el-select>
      </el-form-item>
      <el-form-item label="职称">
        <el-select v-model="detail.duty" :disabled="IsMotify">
          <el-option label="助教" value="助教"/>
          <el-option label="讲师" value="讲师"/>
          <el-option label="副教授" value="副教授"/>
          <el-option label="教授" value="教授"/>
        </el-select>
      </el-form-item>
      <el-form-item label="家庭住址">
        <el-input v-model="detail.address" :disabled="IsMotify"/>
      </el-form-item>
      <el-form-item label="所属院系">
        <el-select v-model="detail.major_name" placeholder="请选择院系" :disabled="IsMotify">
          <el-option
            v-for="item in departments"
            :key="item._id"
            :label="item.major_name"
            :value="item.major_name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="detail.remark" type="textarea" :disabled="IsMotify"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit" v-if="IsMotify">修改</el-button>
        <el-button type="primary" @click="MotifyList" v-else>保存</el-button>
        <el-button @click="resetForm('detail')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { TeacherModify, TeacherList } from "@/api/teacher";
import { DepartmentList } from "@/api/departments";
export default {
  data() {
    return {
      detail: {
        check: 0
      },
      id: localStorage.getItem("id"),
      departments: [], // 学院信息
      IsMotify: true // 输入框是否可填
    };
  },
  methods: {
    onSubmit() {
      this.IsMotify = false;
    },
    MotifyList() {
      this.detail.check = 0;
      console.log(this.detail);
      TeacherModify(this.detail._id, this.detail)
        .then(req => {
          // console.log(req);
          if (req.code === 1) {
            this.$message({
              showClose: true,
              message: "修改成功!!",
              type: "success"
            });
            this.IsMotify = true;
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
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.IsMotify = true;
    },
    // 获取学院列表
    getDepartmentList() {
      DepartmentList()
        .then(req => {
          this.departments = req.info.list;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    // 初始化个人信息
    TeacherList({ tid: this.id })
      .then(res => {
        this.detail = res.info.list[0];
        // console.log(res);
        console.log(this.detail);
      })
      .catch(err => console.log(err));
    this.getDepartmentList();
  }
};
</script>
<style scoped>
.app-container {
  width: 70%;
}
</style>



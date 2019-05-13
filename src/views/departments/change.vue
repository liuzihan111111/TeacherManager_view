<template>
  <div class="app-container">
    <el-form class="demo-form-inline" :inline="true" :model="formInline" size="mini">
      <el-form-item label>
        <el-input placeholder="请输入调动教师工号" v-model="formInline.user"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          plain
          icon="el-icon-search"
          @click="SearchHandle"
          title="查询工号是否存在"
        ></el-button>
      </el-form-item>
      <i class="opera" title="刷新列表" @click="Refresh">刷新</i>
    </el-form>
    <el-form :model="list" v-if="IsShow">
      <el-form-item label="教师工号">
        <el-input v-model="list.tid" auto-complete="off" style="width: 60%;" disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="教师姓名">
        <el-input v-model="list.tname" auto-complete="off" style="width: 60%;" disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="所属院系">
        <el-select
          v-model="list.major_name"
          placeholder="请选择院系"
          style="width: 60%;"
          :disabled="motify"
        >
          <el-option
            v-for="item in departments"
            :key="item._id"
            :label="item.major_name"
            :value="item.major_name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="DepartmentChange" v-if="!motify">确 定</el-button>
        <el-button type="primary" @click="motify = false" v-else>调 动</el-button>
        <el-button @click="IsShow = false">取 消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { TeacherList, TeacherModify } from "@/api/teacher";
import { mapGetters } from "vuex";
import { DepartmentList } from "@/api/departments";
import { truncate } from "fs";
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      IsShow: false, // 判断工号是否存在
      list: {}, // 返回数据
      formInline: {
        // 搜索条件，value
        region: ""
      },
      departments: null, // 学院列表
      motify: true // 是否修改院系
    };
  },
  computed: {
    ...mapGetters(["major"])
  },
  created() {
    this.getDepartmentList();
  },
  methods: {
    // 获取教师列表信息
    fetchData() {
      const content = this.formInline.user;
      // 将查询条件传递过去
      var data = {};
      if (!content) {
        this.$message({
          showClose: true,
          message: "请输入要调动的教师工号!!",
          type: "warning"
        });
        return;
      }
      if (this.major) {
        data.major_name = this.major;
      }
      data.tid = content;
      // 调用教师列表
      TeacherList(data)
        .then(response => {
          console.log(response);
          if (response.info.allCount) {
            this.list = response.info.list[0];
            this.IsShow = true;
          } else {
            this.$message({
              showClose: true,
              message: "该工号不符！！",
              type: "error"
            });
          }
          this.formInline.user = "";
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 按条件查询
    SearchHandle() {
      this.fetchData();
      this.motify = true;
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
    },
    // 教师修改
    DepartmentChange() {
      TeacherModify(this.list._id, { major_name: this.list.major_name })
        .then(req => {
          // console.log(req);
          if (req.code === 1) {
            this.$message("调动成功!");
            this.$router.push("/teacher");
          } else {
            this.$message("调动失败!");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 刷新
    Refresh() {
      this.formInline.user = "";
      this.list = "";
    }
  }
};
</script>
<style scoped>
.app-container {
  border-bottom: 1px solid #cecece;
  padding-left: 4%;
}
.demo-form-inline {
  margin-bottom: 3%;
}
.opera {
  cursor: pointer;
  margin-top: 6px;
  margin-right: 25px;
  float: right;
  font-size: 12px;
  font-style: normal;
  color: #a79d9d;
}
.opera:hover {
  color: #409eff;
}
.block {
  padding-top: 15px;
  display: flex;
  justify-content: center;
}
</style>



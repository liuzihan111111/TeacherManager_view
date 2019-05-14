<template>
  <div id="app" class="app-container">
    <el-form class="demo-form-inline" :inline="true" :model="formInline" size="mini">
      <el-form-item label>
        <el-select placeholder="查询类别" v-model="formInline.region">
          <el-option label="工号" value="tid"></el-option>
          <el-option label="姓名" value="tname"></el-option>
          <el-option label="学历" value="edu"></el-option>
          <el-option label="院系" value="major_name" v-if="!major"></el-option>
          <el-option label="职称" value="duty"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label>
        <el-input placeholder="查询条件" v-model="formInline.user"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain icon="el-icon-search" @click="SearchHandle"></el-button>
      </el-form-item>
      <i class="opera" title="新增教师" @click="AddTeacherRow">新增</i>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list.list"
      element-loading-text="Loading"
      max-height="420"
      border
      stripe
      empty-text="无"
      highlight-current-row
      :default-sort="{prop: 'id', order: 'undescending'}"
      @selection-change="handleSelectionChange"
    >
      >
      <el-table-column type="selection" align="center" width="55" fixed></el-table-column>
      <el-table-column align="center" label="工号" sortable prop="id" width="80">
        <template slot-scope="scope">{{ scope.row.tid }}</template>
      </el-table-column>
      <el-table-column label="姓名" width="80" align="center">
        <template slot-scope="scope">{{ scope.row.tname}}</template>
      </el-table-column>
      <el-table-column label="性别" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.sex }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="出生日期"
        align="center"
        sortable
        prop="date"
        width="120"
        show-overflow-tooltip
      >
        <template slot-scope="scope">{{ scope.row.birth }}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="婚姻状态" align="center" width="100">
        <template slot-scope="scope">{{ scope.row.marriage }}</template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="政治面貌" width="100">
        <template slot-scope="scope">{{ scope.row.polity }}</template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="最高学历" width="100">
        <template slot-scope="scope">{{ scope.row.edu }}</template>
      </el-table-column>
      <el-table-column align="center" label="职称" width="80" sortable prop="duty">
        <template slot-scope="scope">{{ scope.row.duty }}</template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="电话" width="120">
        <template slot-scope="scope">{{ scope.row.tel }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="住址"
        width="120"
        show-overflow-tooltip
      >
        <template slot-scope="scope">{{ scope.row.address }}</template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="密码" width="100">
        <template slot-scope="scope">{{ scope.row.tpwd }}</template>
      </el-table-column>
      <el-table-column align="center" prop="date" label="所属院系" width="100" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.major_name }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="备注"
        show-overflow-tooltip
        width="100"
      >
        <template slot-scope="scope">{{ scope.row.remark }}</template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="140" fixed="right">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-news"
            type="primary"
            circle
            size="mini"
            @click="handleEdit(scope.row)"
            title="教师详情"
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            circle
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            title="删除记录"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="list.allCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { TeacherList, TeacherDelete } from "@/api/teacher";
import { mapGetters } from "vuex";
import { stat } from "fs";
export default {
  name: "app",
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
      // major: null, // 所属院系
      list: null, // 返回数据列表
      listLoading: true, // 加载中
      formInline: {
        // 搜索条件，value
        user: "",
        region: ""
      },
      currentPage: 1, // 分页，当前页数
      per: 10 // 每页的条数
    };
  },
  computed: {
    ...mapGetters(["major"])
  },
  created() {
    // 是否为院级管理员登录

    console.log(this.major);
    /*if (this.major) {
      this.major1 = localStorage.getItem("name");
    } */
    // 初始化列表
    this.fetchData();
  },
  methods: {
    // 获取列表信息
    fetchData() {
      this.listLoading = true;
      const title = this.formInline.region;
      const content = this.formInline.user;
      // 将查询条件传递过去
      var data = {};
      // 院级管理员条件
      data.major_name = this.major;
      data[title] = content;
      data.page = this.currentPage;
      data.per = this.per;
      // 调用教师列表
      TeacherList(data).then(response => {
        // console.log(response);
        this.list = response.info;
        this.listLoading = false;
      });
    },
    // 按条件查询
    SearchHandle() {
      this.fetchData();
    },
    // 添加新纪录
    AddTeacherRow() {
      this.$router.push("/teacher/TeacherAdd");
    },
    // 编辑按钮
    handleEdit(row) {
      console.log(row);
      // 跳转到修改页面
      this.$router.push({ name: "TeacherMotify", params: row });
    },
    // 删除按钮
    handleDelete(row) {
      this.$confirm(
        "此操作将永久删除与该工号所有相关的信息（薪资、排课等）, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          console.log(1111);
          TeacherDelete(row._id).then(res => {
            // console.log(res)
            if (res.code === 1) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.fetchData();
            } else {
              this.$message({
                type: "info",
                message: "删除失败!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 全选
    handleSelectionChange(val) {
      console.log(val);
      // this.multipleSelection = val;
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.per = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.fetchData();
    }
  }
};
</script>
<style scoped>
.app-container {
  border-bottom: 1px solid #cecece;
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


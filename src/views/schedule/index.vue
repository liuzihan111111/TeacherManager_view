<template>
  <div class="app-container">
    <el-form class="demo-form-inline" :inline="true" :model="formInline" size="mini">
      <el-form-item label>
        <el-select placeholder="查询类别" v-model="formInline.region">
          <el-option label="授课教师工号" value="tid"></el-option>
          <el-option label="授课老师" value="tname"></el-option>
          <el-option label="课程名" value="cname"></el-option>
          <el-option label="上课地点" value="ClassPlace"></el-option>
          <el-option label="上课班级" value="Student"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label>
        <el-input placeholder="查询条件" v-model="formInline.user"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain icon="el-icon-search" @click="SearchHandle"></el-button>
      </el-form-item>
      <i class="opera" title="添加记录" @click="AddTeacherRow">添加记录</i>
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
      <el-table-column type="selection" align="center" width="55" fixed></el-table-column>
      <el-table-column align="center" label="课程名" sortable prop="id" width="120">
        <template slot-scope="scope">{{ scope.row.cname }}</template>
      </el-table-column>
      <el-table-column label="教师工号" width="120" align="center">
        <template slot-scope="scope">{{ scope.row.tid}}</template>
      </el-table-column>
      <el-table-column label="授课老师" align="center" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.tname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上课时间" align="center" width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.ClassTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上课地点" align="center" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.ClassPlace }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="总课时" width="120">
        <template slot-scope="scope">{{ scope.row.ClassHour }}</template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="上课班级" width="140">
        <template slot-scope="scope">{{ scope.row.Student }}</template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-edit"
            type="primary"
            circle
            size="mini"
            @click="handleEdit(scope.row)"
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            circle
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
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
import { ScheduleList, ScheduleDelete } from "@/api/schedule";

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
  created() {
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
      data[title] = content;
      data.page = this.currentPage;
      data.per = this.per;
      console.log(data);
      // 调用排课信息列表
      ScheduleList(data).then(response => {
        console.log(response);
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
      this.$router.push("/schedule/ScheduleAdd");
    },
    // 编辑按钮
    handleEdit(row) {
      console.log(row);
      // 跳转到修改页面
      this.$router.push({ name: "ScheduleMotify", params: row });
    },
    // 删除按钮
    handleDelete(row) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // console.log(1111);
          ScheduleDelete(row._id).then(res => {
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


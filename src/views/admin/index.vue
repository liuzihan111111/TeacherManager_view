<template>
  <div class="app-container">
    <el-form class="demo-form-inline" :inline="true" :model="formInline" size="mini">
      <el-form-item label>
        <el-input placeholder="所属院系" v-model="formInline.user"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain icon="el-icon-search" @click="SearchHandle"></el-button>
      </el-form-item>
      <i class="opera" title="刷新列表" @click="Refresh">刷新</i>
      <i class="opera" title="添加新记录" @click="ShowFrom">添加</i>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list"
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
      <el-table-column align="center" label="管理员账号" sortable prop="id" width="200">
        <template slot-scope="scope">{{ scope.row.admin_id }}</template>
      </el-table-column>
      <el-table-column label="管理员密码" width="200" align="center">
        <template slot-scope="scope">{{ scope.row.admin_pwd}}</template>
      </el-table-column>
      <el-table-column label="所属院系" align="center" width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.major_name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="160">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-edit"
            type="primary"
            circle
            size="mini"
            @click="handleEdit(scope.row)"
            title="修改记录"
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
    <!-- 弹出框 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="管理员账号" :label-width="formLabelWidth" prop="admin">
          <el-input v-model="form.admin_id" auto-complete="off" style="width: 60%;"></el-input>
        </el-form-item>
        <el-form-item label="所属院系" :label-width="formLabelWidth">
          <el-select v-model="form.major_name" placeholder="请选择院系" style="width: 60%;">
            <el-option
              v-for="item in departments"
              :key="item._id"
              :label="item.major_name"
              :value="item.major_name"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="Addadmin">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { AdminList, AdminDelete, AdminAdd, AdminModify } from "@/api/admin";
import { DepartmentList } from "@/api/departments";
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
      title: "新增管理员",
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      list: null, // 返回数据列表
      listLoading: true, // 加载中
      formInline: {
        // 搜索条件，value
        // user: "",
        region: ""
      },
      // currentPage: 1, // 分页，当前页数
      // per: 10 // 每页的条数
      form: {
        admin_id: "",
        major_name: ""
      },
      departments: [] // 学院信息
    };
  },
  created() {
    // 初始化列表
    this.fetchData();
    //获取学院信息
  },
  methods: {
    // 获取列表信息
    fetchData() {
      this.listLoading = true;
      const content = this.formInline.user;
      // 将查询条件传递过去
      var data = {};
      data.major_name = content;
      // 调用列表
      // console.log(data);
      AdminList(data).then(response => {
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
    ShowFrom() {
      this.dialogFormVisible = true;
      this.getDepartmentList();
    },
    // 添加管理员信息
    Addadmin() {
      console.log(this.form);
      if (!this.form.admin_id) {
        this.$message({
          showClose: true,
          message: "管理员账号不能为空!!",
          type: "warning"
        });
        return;
      }
      if (!this.form.major_name) {
        this.$message({
          showClose: true,
          message: "请选择所属院系!!",
          type: "warning"
        });
        return;
      }
      AdminAdd(this.form)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      //dialogFormVisible = false
    },
    // 编辑按钮
    handleEdit(row) {
      console.log(row);
      // 跳转到修改页面
      // this.$router.push({ name: "Motify", params: row });
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
          AdminDelete(row._id).then(res => {
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
    /*  handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.per = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.fetchData();
    }, */
    // 刷新
    Refresh() {
      this.formInline.user = "";
      this.fetchData();
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



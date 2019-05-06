<template>
  <div class="app-container">
    <el-form class="demo-form-inline" :inline="true" :model="formInline" size="mini">
      <el-form-item label>
        <el-input placeholder="工号" v-model="formInline.user"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain icon="el-icon-search" @click="SearchHandle"></el-button>
      </el-form-item>
      <i class="opera" title="刷新列表" @click="Refresh">刷新</i>
      <i class="opera" title="添加新记录" @click="AddSalaryRow">添加</i>
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
      <el-table-column label="基本工资" width="100" align="center">
        <template slot-scope="scope">{{ scope.row.basePay}}</template>
      </el-table-column>
      <el-table-column label="课时费" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.ClassFees }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="效绩工资" align="center" width="100">
        <template slot-scope="scope">{{ scope.row.PerformanceSalary }}</template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="奖金" width="100">
        <template slot-scope="scope">{{ scope.row.bonus }}</template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="津贴" width="100">
        <template slot-scope="scope">{{ scope.row.allowance }}</template>
      </el-table-column>
      <el-table-column align="center" label="其他" width="100" prop="duty">
        <template slot-scope="scope">{{ scope.row.other }}</template>
      </el-table-column>
      <el-table-column align="center" label="总计" width="120" sortable prop="total">
        <template
          slot-scope="scope"
        >{{scope.row.basePay + scope.row.ClassFees + scope.row.PerformanceSalary + scope.row.bonus + scope.row.other + scope.row.allowance }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="备注"
        show-overflow-tooltip
        width="120"
      >
        <template slot-scope="scope">{{ scope.row.mark }}</template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="140" fixed="right">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-edit"
            type="primary"
            circle
            size="mini"
            @click="handleEdit(scope.row)"
            title="修改记录"
          ></el-button>
          <!--  <el-button
            size="mini"
            type="danger"
            circle
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            title="删除记录"
          ></el-button>-->
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
import { SalaryList, SalaryDelete } from "@/api/salary";

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
        // user: "",
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
      // const title = this.formInline.region;
      const content = this.formInline.user;
      // 将查询条件传递过去
      var data = {};
      data.tid = content;
      data.page = this.currentPage;
      data.per = this.per;
      // 调用薪资列表
      SalaryList(data).then(response => {
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
    AddSalaryRow() {
      this.$router.push("/salary/SalaryLAdd");
    },
    // 编辑按钮
    handleEdit(row) {
      console.log(row);
      // 跳转到修改页面
      this.$router.push({ name: "SalaryMotify", params: row });
    },
    // 删除按钮
    handleDelete(row) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(1111);
          SalaryDelete(row._id).then(res => {
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
    },
    // 刷新
    Refresh() {
      this.formInline.user = "";
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



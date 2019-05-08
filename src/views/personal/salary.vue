<template>
  <div class="app-container">
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
    </el-table>
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
      listLoading: true // 加载中
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
      // 调用薪资列表
      SalaryList({ tid: localStorage.getItem("id") }).then(response => {
        // console.log(response);
        this.list = response.info;
        this.listLoading = false;
      });
    },
    // 全选
    handleSelectionChange(val) {
      console.log(val);
      // this.multipleSelection = val;
    }
  }
};
</script>
<style scoped>
.app-container {
  border-bottom: 1px solid #cecece;
}
.block {
  padding-top: 15px;
  display: flex;
  justify-content: center;
}
</style>



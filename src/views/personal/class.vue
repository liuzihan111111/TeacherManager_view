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
      <el-table-column type="selection" align="center" width="55" fixed></el-table-column>
      <el-table-column align="center" label="课程名" sortable prop="id" width="120">
        <template slot-scope="scope">{{ scope.row.cname }}</template>
      </el-table-column>
      <el-table-column label="教师工号" width="120" align="center">
        <template slot-scope="scope">{{ scope.row.tid}}</template>
      </el-table-column>
      <el-table-column label="授课老师" align="center" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.t_id.tname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学分" align="center" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.score }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总课时" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.ClassHour }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总人数" align="center" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.Number }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="学历层次" width="120">
        <template slot-scope="scope">{{ scope.row.type }}</template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="上课班级" width="150">
        <template slot-scope="scope">{{ scope.row.Student }}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { ScheduleList } from "@/api/schedule";

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
      // 调用授课记录信息列表
      ScheduleList({ tid: localStorage.getItem("id") }).then(response => {
        console.log(response);
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
/* .opera {
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
} */
.block {
  padding-top: 15px;
  display: flex;
  justify-content: center;
}
</style>


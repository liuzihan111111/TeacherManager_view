<template>
  <div class="app-container">
    <el-form class="demo-form-inline" :inline="true" :model="formInline" size="mini">
      <i class="opera" title="添加记录" @click="AddMyProjectRow">添加记录</i>
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
      <el-table-column align="center" label="负责人工号" sortable prop="id" width="120">
        <template slot-scope="scope">{{ scope.row.tid }}</template>
      </el-table-column>
      <el-table-column label="负责人姓名" width="120" align="center">
        <template slot-scope="scope">{{ scope.row.t_id.tname}}</template>
      </el-table-column>
      <el-table-column label="成果名" align="center" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.subject_title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="成果类别" align="center" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.subject_type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="级别" align="center" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.subject_level }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="主要完成人"
        align="center"
        width="120"
        prop="subject_peoples"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span>{{ scope.row.subject_peoples }}</span>
        </template>
      </el-table-column>
      <el-table-column label="完成时间" sortable align="center" width="120" prop="subject_time">
        <template slot-scope="scope">
          <span>{{ scope.row.subject_time }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="获奖情况"
        align="center"
        width="120"
        prop="subject_win"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span>{{ scope.row.subject_win }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" width="120" prop="note" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.note }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="check" label="审核状态" width="120">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p v-if="scope.row.check===0">项目名: {{ scope.row.subject_title }}，还没有审核！</p>
            <p v-else-if="scope.row.check===1">项目名: {{ scope.row.subject_title }}，已通过审核！</p>
            <p v-else>项目名: {{ scope.row.subject_title }}，审核不通过！</p>
            <div slot="reference" class="name-wrapper">
              <el-tag type="warning" size="medium" v-if="scope.row.check===0">未审核</el-tag>
              <el-tag type="success" size="medium" v-else-if="scope.row.check===1">已通过</el-tag>
              <el-tag type="danger" size="medium" v-else>未通过</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="check_time" label="审核时间" width="120">
        <template slot-scope="scope">{{ scope.row.check_time }}</template>
      </el-table-column>
      <el-table-column align="center" prop="mark" show-overflow-tooltip label="审核说明" width="120">
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
            title="修改项目"
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
import { ProjectList, ProjectDelete } from "@/api/project";

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
      var data = {};
      /*  data.page = this.currentPage;
      data.per = this.per; */
      // console.log(data);
      // 调用项目信息列表
      ProjectList({ tid: localStorage.getItem("id") }).then(response => {
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
    AddMyProjectRow() {
      this.$router.push("/Myproject/MyProjectAdd");
    },
    // 编辑按钮
    handleEdit(row) {
      console.log(row);
      if (row.check === 1) {
        this.$message({
          type: "warning",
          message: "审核通过的项目，不能进行修改!!",
          showClose: true
        });
        return;
      }
      // 跳转到修改页面
      this.$router.push({ name: "MyProjectMotify", params: row });
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


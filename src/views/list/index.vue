<template>
  <div class="app-container">
    <el-form  class="demo-form-inline" :inline="true" :model="formInline" size="mini">
      <el-form-item label="">
        <el-select placeholder="查询类别" v-model="formInline.region" >
          <el-option label="工号" value="tid"></el-option>
          <el-option label="姓名" value="tname"></el-option>
          <el-option label="学历" value="edu"></el-option>
          <el-option label="院系" value="major_name"></el-option>
          <el-option label="职称" value="duty"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" >
        <el-input placeholder="查询条件" v-model="formInline.user"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="SearchHandle">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      max-height="500"
      border
      empty-text="无"
      highlight-current-row
      :default-sort="{prop: 'id', order: 'undescending'}"
    >
      <el-table-column align="center" label="工号" sortable prop="id" fixed width="80">
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
        show-overflow-tooltip="true"
      >
        <template slot-scope="scope">{{ scope.row.birth }}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="婚姻状态" align="center" width="100">
        <template slot-scope="scope">{{ scope.row.marriage }}</template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="政治面貌" width="100">
        <template slot-scope="scope">{{ scope.row.polity }}</template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="学历" width="80">
        <template slot-scope="scope">{{ scope.row.edu }}</template>
      </el-table-column>
      <el-table-column align="center"  label="职称" width="80" sortable prop="duty">
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
        show-overflow-tooltip=true
      >
        <template slot-scope="scope">{{ scope.row.address }}</template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="密码" width="100">
        <template slot-scope="scope">{{ scope.row.tpwd }}</template>
      </el-table-column>
      <el-table-column align="center" prop="date" label="所属院系" width="100">
        <template slot-scope="scope">{{ scope.row.major_name }}</template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="备注">
        <template slot-scope="scope" show-overflow-tooltip=true width="100">{{ scope.row.remark }}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { TeacherList } from "@/api/teacher";

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
      list: null,
      listLoading: true,
      formInline: {
        user: '',
        region: ''
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      const title = this.formInline.region;
      const content =this.formInline.user;
      // 将查询条件传递过去
      var data = {};
      data[title] = content;
      // 调用教师列表
      TeacherList(data).then(response => {
        // console.log(response);
        this.list = response.info.list;
        this.listLoading = false;
      });
    },
    SearchHandle() {
     this.fetchData();
    }
  }
};
</script>
<style scoped>
.el-form-item__content {
    line-height: 36px;
}
</style>


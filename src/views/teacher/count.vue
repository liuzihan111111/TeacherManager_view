<template>
  <div class="app-container">
    <el-form class="demo-form-inline" :inline="true" :model="formInline" size="mini">
      <el-form-item label="查询条件">
        <el-select placeholder="查询类别" v-model="formInline.region">
          <el-option label="学历" value="edu"></el-option>
          <el-option label="院系" value="major_name"></el-option>
          <el-option label="职称" value="duty"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label>
        <el-input placeholder="查询条件" v-model="formInline.user"></el-input>
      </el-form-item>
      <el-form-item label="统计条件">
        <el-select placeholder="统计类别" v-model="formInline.group">
          <el-option label="学历" value="edu"></el-option>
          <el-option label="院系" value="major_name"></el-option>
          <el-option label="职称" value="duty"></el-option>
          <el-option label="婚否" value="marriage"></el-option>
          <el-option label="政治面貌" value="polity"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain icon="el-icon-search" @click="SearchHandle"></el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="list"
      border
      :summary-method="getSummaries"
      show-summary
      style="width: 35%; margin-top: 20px"
      size="small"
    >
      <el-table-column prop="_id" label="分组" width="250" align="center"></el-table-column>
      <el-table-column prop="num" label="数量" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { TeacherGroup } from "@/api/teacher";

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
        region: "",
        group: ""
      }
    };
  },
  methods: {
    // 获取列表信息
    SearchHandle() {
      if (!this.formInline.group) {
        this.$message({
          showClose: true,
          message: "请选择分组条件!!",
          type: "warning"
        });
        return;
      }
      this.listLoading = true;
      const title = this.formInline.region;
      const content = this.formInline.user;
      // 将查询条件传递过去
      var data = {};
      data[title] = content;
      data.page = this.currentPage;
      data.per = this.per;
      // 调用教师统计
      TeacherGroup(this.formInline.group, data)
        .then(response => {
          console.log(response);
          if (response.code == 1) {
            this.list = response.info;
          } else {
            this.$message({
              showClose: true,
              message: "分组失败!!",
              type: "error"
            });
          }
          this.listLoading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总数";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        } else {
          sums[index] = "N/A";
        }
      });

      return sums;
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


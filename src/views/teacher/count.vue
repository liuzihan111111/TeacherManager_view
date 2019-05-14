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
          <el-option label="性别" value="sex"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain icon="el-icon-search" @click="SearchHandle"></el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-if="this.list"
      :data="list"
      border
      :summary-method="getSummaries"
      show-summary
      style="width: 35%; margin: 45px 0 0 80px;float:left"
      size="small"
      highlight-current-row
    >
      <el-table-column prop="_id" label="分组" width="250" align="center"></el-table-column>
      <el-table-column prop="num" label="数量" align="center"></el-table-column>
    </el-table>
    <div id="myChart" class="chart"></div>
  </div>
</template>

<script>
import { TeacherGroup } from "@/api/teacher";
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/pie");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
// import echarts from "echarts";
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
      title: [],
      content: [],
      formInline: {
        // 搜索条件，value
        user: "",
        region: "",
        group: ""
      },
      chart: null
    };
  },
  mounted() {
    this.initCharts();
  },
  methods: {
    // 初始化图表
    initCharts() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      this.chart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        series: [
          {
            name: "统计分析",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: [],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
      /*  this.chart.setOption({
        tooltip: {},
        xAxis: {
          data: this.title
        },
        yAxis: {},
        series: [
          {
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#83bff6" },
                  { offset: 0.5, color: "#188df0" },
                  { offset: 1, color: "#188df0" }
                ])
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#2378f7" },
                  { offset: 0.7, color: "#2378f7" },
                  { offset: 1, color: "#83bff6" }
                ])
              }
            },
            name: "总数",
            type: "bar",
            data: this.content
          }
        ]
      }); */
    },
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
      if (content) {
        data[title] = content;
      }
      data.page = this.currentPage;
      data.per = this.per;
      // 调用教师统计
      TeacherGroup(this.formInline.group, data)
        .then(response => {
          console.log(response);
          if (response.code == 1) {
            this.list = response.info;
            this.content = [];
            this.title = [];
            response.info.forEach((item, index) => {
              // this.title.push(item._id);
              // this.content.push(item.num);
              this.content.push({ value: item.num, name: item._id });
            });
            console.log(this.content);
            this.chart.setOption({
              /*  xAxis: {
                data: this.title
              }, */
              series: [
                {
                  // 根据名字对应到相应的系列
                  name: "统计分析",
                  data: this.content
                }
              ]
            });
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
    // 总计
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
  overflow: hidden;
  padding-top: 30px;
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
.chart {
  float: left;
  width: 50%;
  height: 300px;
}
</style>


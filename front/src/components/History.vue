<template>
  <el-tabs type="card" stretch="true">
    <el-tab-pane label="全部工单">
      <el-table
        :data="tableData"
        height="500"
        border
        style="width: 100% ">
        <el-table-column
          fixed
          prop="id"
          label="工单id"
          width="200"
          >
        </el-table-column>
        <el-table-column
          prop="timestart"
          label="提交时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="status"
          label="处理状态"
          width="200">
        </el-table-column>
        <el-table-column
          prop="title"
          label="工单题目"
          width="120">
        </el-table-column>
        <el-table-column
          prop="problem"
          label="工单内容"
          width="500">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-tab-pane>
    <el-tab-pane label="待处理">
      <el-table
        :data="tableData1"
        height="500"
        border
        style="width: 100% ">
        <el-table-column
          fixed
          prop="id"
          label="工单id"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="timestart"
          label="提交时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="status"
          label="处理状态"
          width="200">
        </el-table-column>
        <el-table-column
          prop="title"
          label="工单题目"
          width="120">
        </el-table-column>
        <el-table-column
          prop="problem"
          label="工单内容"
          width="500">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-tab-pane>
    <el-tab-pane label="已处理">
      <el-table
        :data="tableData2"
        height="500"
        border
        style="width: 100% ">
        <el-table-column
          fixed
          prop="id"
          label="工单id"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="timestart"
          label="提交时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="status"
          label="处理状态"
          width="200">
        </el-table-column>
        <el-table-column
          prop="title"
          label="工单题目"
          width="120">
        </el-table-column>
        <el-table-column
          prop="problem"
          label="工单内容"
          width="500">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-tab-pane>

  </el-tabs>


</template>

<script>

    function status(obj) {
        for (let i = 0; i < obj.length; i++)
        {
            if(obj[i].status == 1)
            {
                obj[i].status  = "待处理";
            }
            else if(obj[i].status == 2)
                obj[i].status  = "客服处理";
            else if(obj[i].status == 3)
                obj[i].status  = "客服转交技术处理";
            else if(obj[i].status == 4)
                obj[i].status  = "技术处理";
            else if(obj[i].status == 5)
                obj[i].status  = "已完成（未评价）";
            else if(obj[i].status == 6)
                obj[i].status  = "全部完成";

            //缩短问题描述长度。
            if(obj[i].problem.length>50)
              obj[i].problem = obj[i].problem.slice(0,50)+'......';
            else
                obj[i].problem = obj[i].problem.slice(0,50);

        }
    }

  export default {
      name: "History",
      data() {
          return {
              tableData: [],
              tableData1: [],
              tableData2: []

          }
      },

      created: function (){
        this.getTableData();
      },

      methods:{
          handleClick(row) {
              console.log(row.id);
              this.$router.push('/home/Data?id='+row.id);
          },
          getTableData(){
              this.$axios({
                  method:'post',
                 // url:'http://localhost:3000/getform',
                  url:'http://'+window.location.hostname+':3000/getform',
                  data:this.qs.stringify({    //这里是发送给后台的数据
                      username:sessionStorage.getItem("username")
                  })
              }).then((response) =>{//这里使用了ES6的语法
                  console.log(response.data)   ;    //请求成功返回的数据
                  if(response.data!="没有表单记录")
                  {
                      //alert('注册成功');
                      // this.$message({
                      //     message: '恭喜你，提交成功',
                      //     type: 'success'
                      // });
                      // this.$router.push('/home');
                      this.tableData = response.data.reverse() ;
                      status(this.tableData);
                      for (let i = 0; i < this.tableData.length; i++)
                      {
                          if(this.tableData[i].status =="已完成（未评价）" || this.tableData[i].status == "全部完成")
                              this.tableData2.push(this.tableData[i]);
                          else
                              this.tableData1.push(this.tableData[i]);
                      }
                  }
                  else
                      this.$message.error("没有表单记录");
                  //alert("此用户已被注册过");
              }).catch((error) =>
                  console.log(error) ) ;   //请求失败返回的数据
          }


      }
  }
</script>

<style >
  .el-table__header tr,
  .el-table__header th {
    padding: 0;
    height: 60px;
  }
  .el-table__body tr,
  .el-table__body td {
    padding: 0;
    height: 40px;
  }
</style>

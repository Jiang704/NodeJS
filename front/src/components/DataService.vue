<template>
  <div v-if="this.$route.query.id != null">
    <el-steps :active="statusflag"  align-center style="text-align: center;">
      <el-step  title="待处理"></el-step>
      <el-step  title="处理中"></el-step>
      <el-step title="已处理"></el-step>
      <el-step title="已评分"></el-step>
    </el-steps>
    <el-divider ></el-divider>
    <span style="font-size: 24px; margin:1%;">工单详情</span>
    <span style="margin:1%; text-align: center; position:relative; right:-80%;">
    <el-button v-if="tableData[0].status == '待处理'" style="margin:1%; " type="primary" icon="el-icon-edit"  @click="dialogFormVisible = true">接单</el-button>
    <el-button v-if="tableData[0].status == '客服处理'" style="margin:1%; " type="primary" icon="el-icon-collection-tag"  @click="dialogScoreVisible = true">处理</el-button>

      <el-dialog title="确认接单" :visible.sync="dialogFormVisible">
  <el-form :model="form"  label-position="right" status-icon :rules="rules" ref="form" label-width="80px" class="demo-ruleForm">
<!--    <el-form-item label="问题名称" style="margin-right: 40px" prop="title">-->
<!--      <el-input v-model="form.title"></el-input>-->
<!--    </el-form-item>-->
<!--    <el-form-item label="用户电话" style="width:280px" prop="userphone">-->
<!--      <el-input v-model="form.userphone"></el-input>-->
<!--    </el-form-item>-->
<!--    <el-form-item label="用户邮箱" style="width:280px" prop="useremail">-->
<!--      <el-input v-model="form.useremail"></el-input>-->
<!--    </el-form-item>-->

<!--    <el-form-item label="问题描述"  style="margin-right: 40px;"  prop="problem">-->
<!--      <el-input type="textarea" v-model="form.problem" :rows="10"></el-input>-->
<!--    </el-form-item>-->
    <p></p>
<!--    <el-form-item>-->
      <el-button type="primary" @click="onSubmit('form')">确认</el-button>
      <el-button  @click="dialogFormVisible = false">取消</el-button>
<!--    </el-form-item>-->
  </el-form>
</el-dialog>


      <el-dialog title="工单处理" :visible.sync="dialogScoreVisible">

        <p></p>
  <el-form :model="form"  label-position="right" status-icon :rules="rules" ref="form" label-width="80px" class="demo-ruleForm">
    &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp

        <el-form-item label="解决方案"  style="margin-right: 40px;"  prop="problem">
          <el-input type="textarea" v-model="form.solution" :rows="10"></el-input>
        </el-form-item><p>
    <el-radio-group v-model="turnflag" prop="loaction">
        <el-radio :label="1">客服自己处理</el-radio>、
        <el-radio :label="2">转交技术人员</el-radio>
      </el-radio-group></p>
    <p></p>
      <el-button type="primary" @click="onSubmit2('form')">确认</el-button>
      <el-button  @click="dialogScoreVisible = false">取消</el-button>
  </el-form>
</el-dialog>

      </span>
    <div class="table">

      <table class="mailTable"  v-if="s_showByRow">


        <tr>
          <td style="width:10%;background: #d6dae2;">工单id</td>
          <td style="width:15%">{{tableData[0].id}}</td>
          <td style="width:10%;background: #d6dae2;">工单状态</td>
          <td style="width:15%">{{tableData[0].status}}</td>
          <td style="width:10%;background: #d6dae2;">提交时间</td>
          <td colspan="3" style="width:40%">{{tableData[0].timestart}}</td>

        </tr>

        <tr>
          <td style="width:10%;background: #d6dae2;">优先度</td>
          <td style="width:15%">{{tableData[0].priority}}</td>
          <td style="width:10%;background: #d6dae2;">用户名</td>
          <td style="width:15%">{{tableData[0].username}}</td>
          <td style="width:10%;background: #d6dae2;">用户手机号</td>
          <td style="width:15%">{{tableData[0].userphone}}</td>
          <td style="width:10%;background: #d6dae2;">用户邮箱</td>
          <td style="width:15%">{{tableData[0].useremail}}</td>
        </tr>

        <tr>
          <td style="width:10%;background: #d6dae2;">接单客服id</td>
          <td style="width:15%">{{tableData[0].csid}}</td>
          <td style="width:10%;background: #d6dae2;">接单客服</td>
          <td style="width:15%">{{tableData[0].csname}}</td>
          <td style="width:10%;background: #d6dae2;">接单技术id</td>
          <td style="width:15%">{{tableData[0].tsid}}</td>
          <td style="width:10%;background: #d6dae2;">接单技术</td>
          <td style="width:15%">{{tableData[0].tsname}}</td>
        </tr>

        <tr>
          <td style="width:10%;background: #d6dae2;">工单题目</td>
          <td  colspan="5" style="width:30%">{{tableData[0].title}}</td>
          <td style="width:10%;background: #d6dae2;">用户评分</td>
          <td style="width:15%">{{tableData[0].score}}</td>
        </tr>

        <tr>
          <td style="width:10%;background: #d6dae2;">问题描述</td>
          <td  colspan="7" style="width:90%;">{{tableData[0].problem}}</td>
        </tr>

        <tr>
          <td style="width:10%;background: #d6dae2;">解决方案</td>
          <td  colspan="7" style="width:90%">{{tableData[0].solution}}</td>
        </tr>

      </table>
    </div>

    <el-divider></el-divider>

    <div class="block" >
      <el-timeline>
        <el-timeline-item  v-if="tableData[0].timeover != ''" color="#0bbd87" :timestamp="tableData[0].timeover" placement="top">
          <el-card>
            <h4>工单结束</h4>
            <p>此工单完成。</p>
            <p>用户评价:{{tableData[0].review}}</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item  v-if="tableData[0].time_back != ''" color="#0bbd87" :timestamp="tableData[0].time_back" placement="top">
          <el-card>
            <h4>工单处理</h4>
            <p>此工单被回拨</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item v-if="tableData[0].time_trec != ''" color="#0bbd87" :timestamp="tableData[0].time_trec" placement="top">
          <el-card>
            <h4>工单处理</h4>
            <p>技术人员{{tableData[0].tsname}}处理此工单</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item  v-if="tableData[0].time_del != ''" color="#0bbd87" :timestamp="tableData[0].time_del" placement="top">
          <el-card>
            <h4>工单处理</h4>
            <p>客服{{tableData[0].csname}}转交此工单</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item v-if="tableData[0].time_rec != ''" color="#0bbd87" :timestamp="tableData[0].time_rec" placement="top">
          <el-card>
            <h4>工单处理</h4>
            <p>客服{{tableData[0].csname}}处理此工单</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item v-if="tableData[0].timestart != ''" color="#0bbd87" :timestamp="tableData[0].timestart" placement="top">
          <el-card>
            <h4>工单创建</h4>
            <p>{{tableData[0].username}} 提交此工单</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>



  </div>
  <div v-else  class="table2">
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card shadow="hover">
          我接收的工单数：{{number}}
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          待处理的的工单数：{{numberunfinish}}
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          已处理的的工单数：{{numberfinish}}
        </el-card>
      </el-col>
    </el-row>
    <p>&nbsp;</p>
    <p>完成率</p>
    <el-progress type="circle" width="250" stroke-width="15" color="#0bbd87" :percentage="(100*numberfinish/number).toFixed(2)"></el-progress>
    <p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>
  </div>
</template>

<script>
    function appendZero(obj) {
        if (obj < 10) {
            return "0" + obj;
        } else {
            return obj;
        }
    };

    function getTime(){
        var date1=new Date();
        var year=date1.getFullYear();
        var month=appendZero(date1.getMonth()+1);
        var day=appendZero(date1.getDate());
        var hours=appendZero(date1.getHours());
        var minutes=appendZero(date1.getMinutes());
        var seconds=appendZero(date1.getSeconds());
        return year+"年 "+month+"月 "+day+"日 "+hours+":"+minutes+":"+seconds
    };

    function status(obj) {
        for (let i = 0; i < obj.length; i++)
        {
            if(obj[i].priority == 1)
                obj[i].priority = "重要";
            else
                obj[i].priority = "一般";

            if(obj[i].csname== "")
                obj[i].csname = "暂无";
            if(obj[i].csid== "")
                obj[i].csid = "暂无";

            if(obj[i].tsname== "")
                obj[i].tsname = "暂无";
            if(obj[i].tsid== "")
                obj[i].tsid = "暂无";

            if(obj[i].solution== "")
                obj[i].solution = "暂无";
            if(obj[i].score== "")
                obj[i].score = "暂无";
            if(obj[i].problem== "")
                obj[i].problem = "暂无";

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


        }
    }

    export default {
        name: "DataService",
        data() {
            var checkTitle = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入标题内容'));
                } else {
                    callback();
                }
            };
            var checkUserphone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入电话号码'));
                } else {
                    callback();
                }
            };
            var checkUseremail = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入邮箱地址'));
                } else {
                    callback();
                }
            };
            var checkProblem = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入问题内容'));
                } else {
                    callback();
                }
            };
            return {
                tableData: [],  //某一编号工单
                tableData1: [],   //所有未完成工单
                tableData2: [],   //所有完成工单
                tableDataTemp:[], //所有历史工单
                number:0, //工单数量
                numberunfinish:0,   //未完成工单数量
                numberfinish:0,     //完成工单数量
                turnflag:1, //客服自己处理或者转交技术处理的标志位 1为自己 2为转交
                s_showByRow: true,
                statusflag: undefined,
                dialogFormVisible: false,
                dialogScoreVisible:false,
                form: {
                    status:'',
                    id:'',
                    timestart: '',
                    timeduring:'',
                    timeover:'',
                    time_rec:'',	//接单时间
                    time_del:'',	//转交时间
                    time_trec:'',	//技术接单时间
                    time_back:'',//回拨时间
                    username:'',
                    priority:0,
                    userphone:'',
                    useremail:'',
                    csname:'',
                    csid:'',
                    tsname:'',
                    tsid:'',
                    score:'',	//得分
                    title: '',
                    problem:'',
                    solution: '',
                    review: ''
                },
                rules: {
                    title: [
                        { validator: checkTitle, trigger: 'blur' }
                    ],
                    userphone: [
                        { validator: checkUserphone, trigger: 'blur' }
                    ],
                    useremail: [
                        { validator: checkUseremail, trigger: 'blur' }
                    ],
                    problem: [
                        { validator: checkProblem, trigger: 'blur' }
                    ]
                }

            }
        },

        created: function (){
            this.getTableData();
            this.getTableData2(); //获取历史所有工单

        },

        methods:{

            getTableData(){
                this.$axios({
                    method:'post',
                   // url:'http://localhost:3000/getformbyid',
                    url:'http://'+window.location.hostname+':3000/getformbyid',
                    data:this.qs.stringify({    //这里是发送给后台的数据
                        id:this.$route.query.id
                    })
                }).then((response) =>{//这里使用了ES6的语法
                    console.log(response.data)   ;    //请求成功返回的数据
                    if(response.data!="没有表单记录")
                    {

                        this.tableData = response.data.reverse() ;
                        this.form = JSON.parse( JSON.stringify(	this.tableData[0]) );
                        status(this.tableData);
                        if(this.tableData[0].status =="待处理")
                            this.statusflag =1;
                        else if(this.tableData[0].status=="已完成（未评价）")
                            this.statusflag = 3;
                        else if(this.tableData[0].status=="全部完成")
                            this.statusflag = 4;
                        else
                            this.statusflag =2;

                    }
                    else
                        this.$message.error("请在我的工单中选择想要查看的工单");
                    //alert("此用户已被注册过");
                }).catch((error) =>
                    console.log(error) ) ;   //请求失败返回的数据
            },

            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {

                    var vm=this;
                    //console.log(vm.form.username);
                    if (valid) {
                        this.$axios({
                            method:'post',
                            //url:'http://localhost:3000/updataform',
                            url:'http://'+window.location.hostname+':3000/updataform',
                            data:this.qs.stringify({    //这里是发送给后台的数据
                                status:2,  //确认接单后
                                id:vm.form.id,
                                timestart: vm.form.timestart,
                                timeduring:vm.form.timeduring,
                                timeover:vm.form.timeover,
                                time_rec:getTime(),	//接单时间
                                time_del:vm.form.time_del,	//转交时间
                                time_trec:vm.form.time_trec,	//技术接单时间
                                time_back:vm.form.time_back,//回拨时间
                                username:vm.form.username,
                                priority:vm.form.priority,
                                userphone:vm.form.userphone,
                                useremail:vm.form.useremail,
                                csname:sessionStorage.getItem("username"),
                                csid:vm.form.csid,
                                tsname:vm.form.tsname,
                                tsid:vm.form.tsid,
                                score:vm.form.score,	//得分
                                title: vm.form.title,
                                problem:vm.form.problem,
                                solution: vm.form.solution,
                                review: vm.form.review
                            })
                        }).then((response) =>{//这里使用了ES6的语法
                            console.log(response.data)   ;    //请求成功返回的数据
                            if(response.data=="提交成功")
                            {
                                //alert('注册成功');
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                                this.$router.push('/homeService');
                            }
                            else
                                this.$message.error("修改失败，请重试");
                            //alert("此用户已被注册过");
                        }).catch((error) =>
                            console.log(error) ) ;   //请求失败返回的数据

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            //评分后状态加1用
            onSubmit2(formName) {
                this.$refs[formName].validate((valid) => {

                    var vm=this;
                    //console.log(vm.form.username);
                    if (valid) {
                        this.$axios({
                            method:'post',
                            //url:'http://localhost:3000/updataform',
                            url:'http://'+window.location.hostname+':3000/updataform',
                            data:this.qs.stringify({    //这里是发送给后台的数据
                                status:vm.turnflag==1?5:3,  //确认接单后
                                id:vm.form.id,
                                timestart: vm.form.timestart,
                                timeduring:vm.form.timeduring,
                                timeover:vm.form.timeover,
                                time_rec:vm.form.time_rec,	//接单时间
                                time_del:vm.turnflag==2?getTime():vm.form.time_del,	//转交时间
                                time_trec:vm.form.time_trec,	//技术接单时间
                                time_back:vm.turnflag==1?getTime():vm.form.time_back,//回拨时间
                                username:vm.form.username,
                                priority:vm.form.priority,
                                userphone:vm.form.userphone,
                                useremail:vm.form.useremail,
                                csname:vm.form.csname,
                                csid:vm.form.csid,
                                tsname:vm.form.tsname,
                                tsid:vm.form.tsid,
                                score:vm.form.score,	//得分
                                title: vm.form.title,
                                problem:vm.form.problem,
                                solution: vm.form.solution,
                                review: vm.form.review
                            })
                        }).then((response) =>{//这里使用了ES6的语法
                            console.log(response.data)   ;    //请求成功返回的数据
                            if(response.data=="提交成功")
                            {
                                //alert('注册成功');
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                                this.$router.push('/homeService');
                            }
                            else
                                this.$message.error("修改失败，请重试");
                            //alert("此用户已被注册过");
                        }).catch((error) =>
                            console.log(error) ) ;   //请求失败返回的数据

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            //获取历史所有工单
            getTableData2(){
                this.$axios({
                    method:'post',
                    //url:'http://localhost:3000/getformbyservicename',
                    url:'http://'+window.location.hostname+':3000/getformbyservicename',
                    data:this.qs.stringify({    //这里是发送给后台的数据
                        csname:sessionStorage.getItem("username")
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
                        this.tableDataTemp = response.data.reverse() ;
                        status(this.tableDataTemp);
                        for (let i = 0; i < this.tableDataTemp.length; i++)
                        {
                            if(this.tableDataTemp[i].status =="已完成（未评价）" || this.tableDataTemp[i].status == "全部完成"|| this.tableDataTemp[i].status == "客服转交技术处理"|| this.tableDataTemp[i].status == "技术处理")
                                this.tableData2.push(this.tableDataTemp[i]);
                            else
                                this.tableData1.push(this.tableDataTemp[i]);
                        }
                        this.number = this.tableDataTemp.length;
                        this.numberfinish = this.tableData2.length;
                        this.numberunfinish = this.tableData1.length;
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

<style scoped>
  .table2{
    text-align: center;
    border-radius:5px;
    width:100%;
    background: #F2F6FC;
    color:#606266;
  }
  .table{
    background: #F2F6FC;
    text-align: center;
    border-radius:5px;
    border-collapse:collapse;
    width:100%;
  }
  .mailTable {
    margin:0%;
    height: 400px;
    border: 2px solid #DCDFE6;
    border-radius:5px;
    line-height: 40px;
    text-align: center;
    border-collapse:collapse;
    color:#606266;
    width:100%;
    table-layout:fixed ;
  }
  .mailTable td,tr{
    height: 40px;
    border: 2px solid #DCDFE6;
    line-height: 40px;
    text-align: center;
    word-wrap:break-word;

  }
</style>

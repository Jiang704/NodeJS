<template>
  <el-form :model="form"  label-position="right" status-icon :rules="rules" ref="form" label-width="80px" class="demo-ruleForm">
    <el-form-item label="问题名称" style="margin-right: 40px" prop="title">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="用户电话" style="width:280px" prop="userphone">
      <el-input v-model="form.userphone"></el-input>
    </el-form-item>
    <el-form-item label="用户邮箱" style="width:280px" prop="useremail">
      <el-input v-model="form.useremail"></el-input>
    </el-form-item>

    <el-form-item label="问题描述"  style="margin-right: 40px;"  prop="problem">
      <el-input type="textarea" v-model="form.problem" :rows="10"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
    function random_No(j) {
        var random_no = "";
        for (var i = 0; i < j; i++) //j位随机数，用以加在时间戳后面。
        {
            random_no += Math.floor(Math.random() * 10);
        }
        random_no = new Date().getTime() + random_no;
        return random_no;
    };

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

export default {
    name: 'HelloWorld',
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
            form: {
                status:1,
                id:random_No(3),
                timestart: '',
                timeduring:'',
                timeover:'',
                time_rec:'',	//接单时间
                time_del:'',	//转交时间
                time_trec:'',	//技术接单时间
                time_back:'',//回拨时间
                username:sessionStorage.getItem("username"),
                priority:0,
                userphone:'',
                useremail:sessionStorage.getItem("email"),
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

    methods: {
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {

                var vm=this;
                console.log(vm.form.username);
                if (valid) {
                this.$axios({
                    method:'post',
                    //url:'http://localhost:3000/insertform',
                    url:'http://'+window.location.hostname+':3000/insertform',
                    data:this.qs.stringify({    //这里是发送给后台的数据
                        status:1,
                        id:vm.form.id,
                        timestart: getTime(),
                        timeduring:'',
                        timeover:'',
                        time_rec:'',	//接单时间
                        time_del:'',	//转交时间
                        time_trec:'',	//技术接单时间
                        time_back:'',//回拨时间
                        username:vm.form.username,
                        priority:vm.form.priority,
                        userphone:vm.form.userphone,
                        useremail:vm.form.useremail,
                        csname:'',
                        csid:'',
                        tsname:'',
                        tsid:'',
                        score:'',	//得分
                        title: vm.form.title,
                        problem:vm.form.problem,
                        solution: '',
                        review: ''
                    })
                }).then((response) =>{//这里使用了ES6的语法
                    console.log(response.data)   ;    //请求成功返回的数据
                    if(response.data=="提交成功")
                    {
                        //alert('注册成功');
                        this.$message({
                            message: '恭喜你，提交成功',
                            type: 'success'
                        });
                        this.$router.push('/home');
                    }
                    else
                        this.$message.error("此表单号已被注册过");
                    //alert("此用户已被注册过");
                }).catch((error) =>
                    console.log(error) ) ;   //请求失败返回的数据

            } else {
                console.log('error submit!!');
                return false;
            }
        });
    }

    }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div{
    height: 100%;
  }
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

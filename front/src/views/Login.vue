<template>
  <div id="login">
    <h1 style="color:#606266">欢迎登录</h1>
    <el-form :model="ruleForm"  label-position="right" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
      <br/><br/>
      <el-form-item label="用户名" prop="username" >
        <el-input v-model="ruleForm.username" style="width:280px" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off" style="width:280px"></el-input>
      </el-form-item>

      <el-link type="primary" href="/register">注册</el-link>
      <br/><br/><br/>
      <el-form-item style="text-align: center;transform: translate(-7%, 0)">
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        &nbsp&nbsp&nbsp&nbsp&nbsp
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            var checkName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            return {
                ruleForm: {
                    pass: '',
                    username: ''
                },
                rules: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' },
                        { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                    ],
                    username: [
                        { validator: checkName, trigger: 'blur' },
                        { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {

            submitForm(formName) {

                this.$refs[formName].validate((valid) => {
                    var vm=this;
                    console.log(vm.ruleForm.username);
                   // console.log('http://'+window.location.hostname+':3000/doLogin');
                    if (valid) {

                        this.$axios({
                            method:'post',
                            // url:'http://localhost:3000/doLogin',
                            url:'http://'+window.location.hostname+':3000/doLogin',
                            data:this.qs.stringify({    //这里是发送给后台的数据
                                username : vm.ruleForm.username,
                                password : vm.ruleForm.pass
                                // username:qwewww,
                                // password:123456
                            })
                        }).then((response) =>{//这里使用了ES6的语法
                            console.log(response.data)   ;    //请求成功返回的数据
                            if(response.data!="账号密码不匹配，请重新登录")
                              {
                                  sessionStorage.setItem("username", response.data.username) ;
                                  sessionStorage.setItem("email", response.data.email) ;
                                  //alert('登录成功');
                                  this.$message({
                                      message: '登陆成功',
                                      type: 'success'
                                  });
                                  if(response.data.location==1)
                                      this.$router.push('/home');
                                  else if(response.data.location==2)
                                      this.$router.push('/homeservice');
                                  else if(response.data.location==3)
                                      this.$router.push('/homepro');
                              }
                            else
                                this.$message.error('账号密码不匹配，请重新登录');
                               // alert('账号密码不匹配，请重新登录');
                        }).catch((error) =>
                            console.log(error) ) ;   //请求失败返回的数据

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style >
  #login{
    border:1px solid #c5f5f0;
    border-radius:5px;
    background: no-repeat;
    background-color: #8ee8ea;
    background-image: linear-gradient(0deg, #9eead4 0%, #c5f5f0 100%);
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    text-align: center;


    position: absolute;/*绝对定位，将DIV1外面的大框用绝对定位进行div的固定*/
    margin-left: 50%;/*距左15%的距离*/
    margin-top: 20px;/*距上20px的距离*/
    width: 400px;/*宽设定1000px*/
    height: 400px;/*高设定400px*/
    transform: translate(-50%, 0);

  }
</style>

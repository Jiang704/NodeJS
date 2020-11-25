<template>
  <div id="register">
    <h1 style="color:#606266">欢迎注册</h1>
    <el-form :model="ruleForm"  label-position="right" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
      <br/>
      <el-form-item label="用户名" prop="username" >
        <el-input v-model="ruleForm.username" style="width:280px" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off" style="width:280px"></el-input>
      </el-form-item>

      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" style="width:280px"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email" >
        <el-input v-model="ruleForm.email" style="width:280px" autocomplete="off"></el-input>
      </el-form-item>
      &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
      <el-radio-group v-model="ruleForm.location" prop="loaction">
        <el-radio :label="1">客户</el-radio>
        <el-radio :label="2">客服</el-radio>
        <el-radio :label="3">技术人员</el-radio>
      </el-radio-group>

      <br/><br/>
      <el-link type="primary" href="/login">登录</el-link>

      <br/><br/>
      <el-form-item style="text-align: center;transform: translate(-7%, 0)">
        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
        &nbsp&nbsp&nbsp&nbsp&nbsp
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
        name: "Register",
        data() {
            var checkName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else {
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
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var checkEmail = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入邮箱地址'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    pass: '',
                    username: '',
                    checkPass: '',
                    email:'',
                    location:1
                },
                rules: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' },
                        { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' },
                        { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                    ],
                    username: [
                        { validator: checkName, trigger: 'blur' },
                        { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                    ],
                    email:[
                        { validator: checkEmail, trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                    ]
                }
            };
        },
        methods: {

            submitForm(formName) {

                this.$refs[formName].validate((valid) => {
                    var vm=this;
                    console.log(vm.ruleForm.username);
                    if (valid) {

                        this.$axios({
                            method:'post',
                            //url:'http://localhost:3000/doAdd',
                            url:'http://'+window.location.hostname+':3000/doAdd',
                            data:this.qs.stringify({    //这里是发送给后台的数据
                                username : vm.ruleForm.username,
                                password : vm.ruleForm.pass,
                                repwd:vm.ruleForm.checkPass,
                                email: vm.ruleForm.email,
                                location: vm.ruleForm.location
                            })
                        }).then((response) =>{//这里使用了ES6的语法
                            console.log(response.data)   ;    //请求成功返回的数据
                            if(response.data=="注册成功")
                            {
                                //alert('注册成功');
                                this.$message({
                                    message: '恭喜你，注册成功',
                                    type: 'success'
                                });
                                this.$router.push('/');
                            }
                            else
                                this.$message.error("此用户已被注册过");
                                //alert("此用户已被注册过");
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

<style scoped>
  #register{border:1px solid #c5f5f0;
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
  height: 600px;/*高设定400px*/
  transform: translate(-50%, 0);}
</style>

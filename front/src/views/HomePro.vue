<template>
  <el-container style="height:100%;">
    <el-header style="text-align: right; font-size: 12px">
      <el-image :src="src" style="display: inline-block;vertical-align: middle;left:-30%;width: 300px; height:60px"></el-image>

      <el-dropdown>
        <i class="el-icon-user-solid" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>技术 {{username}}</span>

    </el-header>

    <el-container style="overflow: hidden; height:100%;" >

      <el-aside width="300px;" >
        <el-menu
          :default-active="this.$route.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          style="height:100%;"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="/homePro/HistoryPro">
            <i class="el-icon-menu"></i>
            <span slot="title">工单中心</span>
          </el-menu-item>
          <el-menu-item index="/homePro/DataPro">
            <i class="el-icon-setting"></i>
            <span slot="title">处理中心</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>

        <el-main>
          <router-view to="HistoryPro"></router-view>
        </el-main>
        <el-footer>本产品尚处于测试阶段</el-footer>
      </el-container>

    </el-container>
  </el-container>
</template>

<script>
    export default {
        name: "HomePro",
        data() {
            return {
                username:sessionStorage.getItem("username"),
                src: require('@/assets/logo4.png'),
            };
        }

    }

</script>

<style>
  html,body,#app,.el-container{
    /*设置内部填充为0，几个布局元素之间没有间距*/
    padding: 0px;
    /*外部间距也是如此设置*/
    margin: 0px;
    /*统一设置高度为100%*/
    height: 100%;
  }

  .el-header, .el-footer {
    background-color: #b7c1c9;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
    margin-bottom: -3000px;
    padding-bottom: 3000px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    /*text-align: center;*/
    /*line-height: 60px;*/
    /*margin-bottom: -3000px;*/
    /*padding-bottom: 3000px;*/
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>

<template>
  <el-container>
    <el-aside :width="menuCollapse?'65px':'200px'">
      <el-menu
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#3C9DFF"
        :collapse="menuCollapse"
        :collapse-transition="false"
      >
        <el-menu-item index="1" :style="{width: menuCollapse? '65px':'200px'}">
          <i class="el-icon-setting"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="2" :style="{width: menuCollapse? '65px':'200px'}">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>内容管理</span>
          </template>
          <el-menu-item index="2-1">发布文章</el-menu-item>
          <el-menu-item index="2-2">文章列表</el-menu-item>
          <el-menu-item index="2-3">评论列表</el-menu-item>
          <el-menu-item index="2-4">素材管理</el-menu-item>
        </el-submenu>
        <el-menu-item index="3" :style="{width: menuCollapse? '65px':'200px'}">
          <i class="el-icon-document"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="4" :style="{width: menuCollapse? '65px':'200px'}">
          <i class="el-icon-document"></i>
          <span slot="title">账户信息</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="header-left">

          <div><i slot="prefix" class="el-icon-s-fold" @click="menuCollapse=!menuCollapse"></i>后台系统</div>
        </div>
        <div class="header-right">
          <el-input placeholder="请输入内容">
            <i slot="prefix" class="el-icon-search"></i>
          </el-input>
          <span class="ms">消息</span>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <img :src="photo" style="width: 40px; height: 40px;" />
              {{ name }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>git地址</el-dropdown-item>
              <el-dropdown-item divided @click.native="loginout()"
                >退出</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menuCollapse: false
    }
  },
  computed: {
    name() {
      return window.sessionStorage.getItem("name");
    },
    photo() {
      return window.sessionStorage.getItem("photo");
    }
  },
  methods: {
    loginout() {
      this.$confirm("确定要退出吗?", "退出", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          window.sessionStorage.clear(); // 清空sessionStorage信息
          this.$router.push({ name: "login" }); // 导航到登录页面
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-aside {
  background-color: #304156;
  width: 200px;
}
.el-header {
  height: 60px;
  line-height: 60px;
  background: #fff;
  overflow: hidden;
  .header-left {
    float: left;
  }
  .header-right {
    float: right;
    .el-input {
      width: 200px;
      height: 40px;
    }
    .ms {
      display: inline-block;
      width: 100px;
      text-align: center;
    }
    .el-dropdown {
      width: 160px;
    }
  }
}
.el-main {
  background: #f2f3f5;
}
.el-menu-item,
.el-submenu {
  text-align: left;
}
</style>

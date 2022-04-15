<template>
  <el-row class="tac">
    <el-col :span="12">
      <el-menu
        default-active="this.$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      >
        </el-submenu>
        <el-menu-item index="/users" @click="goTo('/users')">
          <i class="el-icon-menu"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>

        <el-menu-item index="/tasks" @click="goTo('/tasks')">
          <i class="el-icon-menu"></i>
          <span slot="title">任务管理</span>
        </el-menu-item>

        <el-menu-item index="/results" @click="goTo('/results')">
          <i class="el-icon-menu"></i>
          <span slot="title">上报结果展示</span>
        </el-menu-item>

      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    goTo(path) {
      this.$router.replace(path);
    }
  }
};
</script>

<style scoped>
.el-col-12{
}
</style>

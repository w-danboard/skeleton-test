<template>
  <div class="app-header">
    <!-- logo -->
    <div class="logo-wrap">
      <img class="logo-icon" src="../assets/logo.png" width="32">
      <span class="logo-text">测试骨架屏</span>
    </div>
    <!-- 个人中心 -->
    <div class="user">
      个人中心
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-header',
  data () {
    return {}
  }
}
</script>

<style scoped>
  .app-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    height: 56px;
    line-height: 56px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    z-index: 999;

    /* background-image: linear-gradient(90deg, #ff0000 25%, #41de6a 37%, #ff0000 63%);
    width: 100%;
    list-style: none;
    background-size: 400% 100%;
    background-position: 100% 50%;
    animation: skeleton-loading 1.4s ease infinite; */
  }

  /* logo */
  .logo-wrap {
    width: 230px;
    background: #2f323d;
    padding-left: 1px;
  }

  .logo-icon {
    display: inline-block;
    vertical-align: middle;
    margin: 0 5px;
  }

  .logo-text {
    display: inline-block;
    vertical-align: middle;
    color: #fff;
    font-size: 15px;
    font-weight: 700;
  }

  /* 个人中心 */
  .user {
    padding-right: 15px;
    cursor: pointer;
  }

  .avatar-icon {
    padding-right: 5px;
  }

  @keyframes skeleton-loading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
  }
</style>
<template>
  <div class="hello">
    <!-- 头部 -->
    <app-header></app-header>
    <!-- 主体部分 -->
    <main>
      <!-- 图片示例 -->
      <section>
        <h6>我是图片示例</h6>
        <img alt="图片示例" src="../assets/logo.png" width="140">
      </section>

      <!-- 按钮示例 -->
      <section>
        <h6>我是按钮示例</h6>
        <button>按钮示例</button>
      </section>
    </main>
  </div>
</template>

<script>
import appHeader from './app-header.vue' // 头部

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    appHeader
  }
}
</script>

<style scoped>
  main {
    text-align: center;
    margin-top: 200px;
  }
</style>

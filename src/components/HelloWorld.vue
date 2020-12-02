<template>
  <div class="hello">
    <!-- 主体部分 -->
    <main>
      <!-- svg -->
      <svgDome></svgDome>
      <!-- 每个条目 -->
      <div class="dc-evaluate-wrap">
        <ul>
          <li v-for="(item, index) in listData" :key="item.id">
            <div class="dc-relative dc-evaluate-top">
              <span>来自：{{item.user}}  （{{item.phone}}）</span>
              <span class="dc-overall-evaluation">
                <button>查看详情</button>
              </span>
              <div :style="setColor(index)"
                class="dc-right dc-troika">[{{item.restaurant}}]</div>
            </div>
            <div class="dc-evaluate-cont">
              <img alt="图片示例" src="../assets/logo.png" width="60">
              <span>{{item.comment}}</span>
              <span class="dc-color-gray">{{item.date}}</span>
            </div>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
import appHeader from './app-header.vue' // 头部
import svgDome from './svg.vue' // 头部

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    appHeader,
    svgDome
  },
  data () {
    return {
      listData: [
        {
          id: '1',
          user: '小猫',
          phone: 13678789999,
          restaurant: '小猫主题餐厅',
          comment: '来自小猫的评论',
          date: '2020-11-30 13:20'
        },
        {
          id: '2',
          user: '小狗',
          phone: 13678786666,
          restaurant: '小狗主题餐厅',
          comment: '来自小狗的评论',
          date: '2020-11-30 14:20'
        },
        {
          id: '3',
          user: '小刺猬',
          phone: 13678788888,
          restaurant: '小刺猬主题餐厅',
          comment: '来自小刺猬的评论',
          date: '2020-12-01 13:20'
        },
        {
          id: '4',
          user: '小猫',
          phone: 13678789999,
          restaurant: '小猫主题餐厅',
          comment: '来自小猫的评论',
          date: '2020-11-30 13:20'
        },
        {
          id: '5',
          user: '小狗',
          phone: 13678789999,
          restaurant: '小狗主题餐厅',
          comment: '来自小狗的评论',
          date: '2020-11-30 13:20'
        },
        {
          id: '6',
          user: '小刺猬',
          phone: 13678789999,
          restaurant: '小刺猬主题餐厅',
          comment: '来自小刺猬的评论',
          date: '2020-11-30 13:20'
        },
        {
          id: '7',
          user: '小猫',
          phone: 13678789999,
          restaurant: '小猫主题餐厅',
          comment: '来自小猫的评论',
          date: '2020-11-30 13:20'
        },
        {
          id: '8',
          user: '小狗',
          phone: 13678789999,
          restaurant: '小狗主题餐厅',
          comment: '来自小狗的评论',
          date: '2020-11-30 13:20'
        },
        {
          id: '9',
          user: '小猫',
          phone: 13678789999,
          restaurant: '小猫主题餐厅',
          comment: '来自小猫的评论',
          date: '2020-11-30 13:20'
        },
        {
          id: '10',
          user: '小猫',
          phone: 13678789999,
          restaurant: '小猫主题餐厅',
          comment: '来自小猫的评论',
          date: '2020-11-30 13:20'
        },
        {
          id: '11',
          user: '小猪',
          phone: 13678789999,
          restaurant: '小猪主题餐厅',
          comment: '来自小猪的评论',
          date: '2020-11-30 13:20'
        },
        {
          id: '12',
          user: '小刺猬',
          phone: 13678789999,
          restaurant: '小刺猬主题餐厅',
          comment: '来自小刺猬的评论',
          date: '2020-11-30 13:20'
        }
      ]
    }
  },
  methods: {
    setColor (index) {
      const COLORS = ['#f74d5b', '#70cbfd', '#92de74']
      return {
        color: COLORS[index % COLORS.length]
      }
    }
  }
}
</script>

<style scoped>
  main {
    text-align: center;
    padding-bottom: 20px;
  }

  button {
    height: 26px;
    line-height: 20px;
    cursor: pointer;
    background: transparent;
    border: 1px solid #70cbfd;
    border-radius: 5px;
    color: #70cbfd;
  }
</style>

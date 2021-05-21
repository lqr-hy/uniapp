<template>
  <view>
    <view class="home-tab">
      <view class="home-tab-title">
        <view class="tab-inner">
          <uni-segmented-control
            :current="current"
            :values="items.map(v=>v.title)"
            @clickItem="onClickItem"
            styleType="text"
            activeColor="#d4237a"
          ></uni-segmented-control>
        </view>
        <view class="tab-search">
          <view class="iconfont icon-shoucang2"></view>
        </view>
      </view>
      <view class="home-tab-content">
        <view v-if="current === 0">
          <HomeRecommend></HomeRecommend>
        </view>
        <view v-if="current === 1">
          <HomeCategory></HomeCategory>
        </view>
        <view v-if="current === 2">
          <HomeNew></HomeNew>
        </view>
        <view v-if="current === 3">
          <HomeAlbum></HomeAlbum>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import HomeAlbum from './home-album'
import HomeCategory from './home-category'
import HomeNew from './home-new'
import HomeRecommend from './home-recommend'
import { uniSegmentedControl } from '@dcloudio/uni-ui'

export default {
  components: {
    HomeAlbum,
    HomeCategory,
    HomeNew,
    HomeRecommend,
    uniSegmentedControl
  },
  data() {
    return {
      items: [
        { title: '推荐' },
        { title: '分类' },
        { title: '最新' },
        { title: '专辑' }
      ],
      current: 0
    }
  },
  methods: {
    onClickItem(e) {
      this.current = e.currentIndex
    }
  }
}
</script>
<style lang="scss">
.home-tab {
  .home-tab-title {
    position: relative;
    .tab-inner {
      width: 60%;
      margin: 0 auto;
    }
    .tab-search {
      position: absolute;
      right: 5%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .home-tab-content {
  }
}
</style>
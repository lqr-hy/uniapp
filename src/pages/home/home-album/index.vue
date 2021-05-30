<template>
  <scroll-view scroll-y @scrolltolower="handleToLower" class="album_scroll">
    <!-- 轮播图 -->
    <view class="swiper_content">
      <swiper autoplay circular indicator-dots>
        <swiper-item v-for="item in banner" :key="item.id">
          <image :src="item.thumb" />
        </swiper-item>
      </swiper>
    </view>
    <!-- 列表数据 -->
    <view class="ablum">
      <navigator
        :url="`/pages/album/index?id=${item.id}`"
        class="ablum-item"
        v-for="item in album"
        :key="item.id"
      >
        <view class="item-img">
          <image :src="item.cover" mode="aspectFill" />
        </view>
        <view class="item-des">
          <view class="item-title">{{item.name}}</view>
          <view class="item-content">{{item.desc}}</view>
          <view class="item-btn">
            <view class="item-follow">+ 关注</view>
          </view>
        </view>
      </navigator>
    </view>
  </scroll-view>
</template>
<script>
export default {
  data() {
    return {
      params: {
        limit: 30,
        skip: 0,
        order: 'new'
      },
      // 轮播图数据
      banner: [],
      // 例表数据
      album: [],
      // 判断还有没有更多
      hasMore: true
    }
  },
  mounted() {
    uni.setNavigationBarTitle({
      title: '专辑'
    }),
      this.getList()
  },
  methods: {
    async getList() {
      const { res } = await this.request({
        url: '/v1/wallpaper/album',
        data: this.params
      })

      if (res.album.length === 0) {
        // 说明没有数据了
        this.hasMore = false
        return
      }
      console.log(res)
      this.banner = res.banner
      this.album = [...this.album, ...res.album]
    },
    handleToLower() {
      if (this.hasMore) {
        this.params.skip += this.params.limit
        this.getList()
      } else {
        uni.showLoading({
          title: '没有跟数据了',
          icon: 'none'
        })
      }
    }
  }
}
</script>
<style lang='scss' socped>
.album_scroll {
  height: calc(100vh - 36px);
}
.swiper_content {
  swiper {
    // 因为图片和swiper 存在默认宽高 2.3为图片的宽高比
    height: calc(750rpx / 2.3);
    image {
      height: 100%;
    }
  }
}

.ablum {
  .ablum-item {
    display: flex;
    padding: 15rpx;
    border-bottom: 1px solid #ccc;
    .item-img {
      flex: 1;
      image {
        width: 200rpx;
        height: 200rpx;
      }
    }
    .item-des {
      flex: 2;
      overflow: hidden;
      .item-title {
        font-weight: 600;
      }
      .item-content {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        margin: 10rpx 0;
      }
      .item-btn {
        display: flex;
        justify-content: flex-end;
        .item-follow {
          color: $color;
          border: 1px solid $color;
          padding: 10rpx;
        }
      }
    }
  }
}
</style>
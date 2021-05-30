<template>
  <scroll-view scroll-y  @scrolltolower="handleToLower" class="recommend_scroll" v-if="recommend.length>0">
    <!-- 推荐 -->
    <view class="recommend_warp">
      <view class="recommend_item"
      v-for="item in recommend"
      :key="item.id"
      >
      <image mode="widthFix" :src="item.thumb"></image>
      </view>
    </view>

    <!-- 月份开始 -->
    <view class="months_warp">
      <view class="months_title">
        <view class="months_title_info">
          <view class="months_info">
            <text>{{months.DD}} /&nbsp; </text>
            {{months.MM}} 月
          </view>
          <view class="months_text">{{months.title}}</view>
        </view>
        <view class="months_title_more">更多》</view>
      </view>
      <view class="months_content">
        <view class="content_item"
        v-for="item in months.items"
        :key="item.id">
          <img mode='aspectFill' :src="item.thumb + item.rule.replace('$<Height>',360)" alt="">
        </view>
      </view>
    </view>

    <!-- 热门开始 -->
    <view class="hots_warp">
      <view class="hots_title">
        <text>热门</text>
      </view>
      <view class="hots_content">
        <view class="content_item"
        v-for="item in hots" :key="item.id"
        >
          <image mode="aspectFill" :src="item.thumb"></image>
        </view>
      </view>
    </view>
  </scroll-view>
</template>
<script>
import moment from 'moment'
export default {
  data() {
    return {
      // 推荐数据
      recommend: [],
      // 月份数据
      months: [],
      // 热门数据
      hots:[],
      params:{
        //  请求调试
        limit: 30,
        order: 'hot',
        // 跳过的数据
        skip: 0
      },
      // 判断还有没有数据
      hasMore:true
    }
  },
  mounted() {
    uni.setNavigationBarTitle({
      title:'推荐'
    })
    this.getlist()  
  },
  methods: {
   async getlist(){
    const { res } = await this.request({
      url: '/v3/homepage/vertical',
      data: this.params
    })
    // console.log(res)
    //  判断还有没有数据
    if(res.vertical.length === 0){
      // 说明没有数据了
      this.hasMore = false
      return
    }
    // console.log(res)
    if(this.recommend.length === 0){
      //说明第一次发送请求
      this.recommend = res.homepage[1].items
       // console.log(this.recommend)
      this.months = res.homepage[2]
      // console.log(this.months)
      this.months.MM = moment(this.months.stime).format('MM')
      this.months.DD = moment(this.months.stime).format('DD')
    }
    // console.log(res)

    // this.hots = this.hots.concat(res.vertical)
    this.hots = [...this.hots, ...res.vertical]
    },


    handleToLower(){
      // console.log('触底了')
      if(this.hasMore){
        this.params.skip += this.params.limit
        this.getlist()
      }else{
        wx.showToast({
          title:'没有数据了',
          icon:'none'
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.recommend_scroll{
  height: calc( 100vh - 36px );
}
.recommend_warp{
  display: flex;
  flex-wrap: wrap;
  .recommend_item{
    width: 50%;
    border: 3px solid #fff;
  }
}
.months_warp{
  .months_title{
    display: flex;
    justify-content: space-between;
    padding: 20rpx;
    color: $color;
    .months_title_info{
      font-weight: 600;
      font-size: 30rpx;
      display: flex;
      .months_info{

      }
      .months_text{
        margin-left: 30rpx;
        color: #666;
      }
    }
    .months_title_more{
      
    }
  }
  .months_content{
    display: flex;
    flex-wrap: wrap;
    .content_item{
      width: 33.33%;
      border: 5rpx solid #fff;
    }
  }
}

.hots_warp{
  .hots_title{
    padding: 20px;
    text{
      padding: 30rpx;
      font-weight: 600px;
      font: 26rpx;
      height: 30rpx;
      border-left: 20rpx solid $color;
    }
  }
  .hots_content{
    display: flex;
    flex-wrap: wrap;
    .content_item{
      width: 33.33%;
      border: 5rpx solid #fff;
    }
  }
}
</style>
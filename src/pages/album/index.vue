<template>
  <view>专辑详情</view>
</template>
<script>
export default {
  data() {
    return {
      params: {
        limit: 30,
        skip: 0,
        order: 'new',
        first: 0
      },
      id: -1
    }
  },
  onLoad(options) {
    this.id = options.id
    this.getList()
  },
  methods: {
    async getList() {
      const res = await this.request({
        url: `/v1/wallpaper/album/${this.id}/wallpaper`,
        data: this.params
      })
      console.log(res)
    }
  }
}
</script>
<style lang="">
</style>
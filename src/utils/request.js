const baseUrl = 'http://157.122.54.189:9088';
export default (params) => {

  wx.showLoading({
    title: "加载中"
  })
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success(res) {
        resolve(res.data)
      },
      fail(err) {
        reject(err)
      },
      complete() {
        wx.hideLoading()
      }
    })
  })
}
// pages/movies/movies.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moviesBeingRelease: [],
    moviesWillBeReleased: [],
    highScoreMovies: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 向服务器发起请求：正在热映的电影
    wx.request({
      url: 'https://api.douban.com/v2/movie/nowplaying?apikey=0df993c66c0c636e29ecbb5344252a4a',
      method: 'GET',
      header: {
        'Content-Type': 'json'
      },
      success: (res) => {
        if(res.statusCode === 200){
          if (res.data.entries) {
            // 注：数组长度不够时，slice()会返回数组的副本
            this.setData({
              moviesBeingRelease: res.data.entries.slice(0, 3)
            });
          }
        }
      }
    });
    // 向服务器发起请求：即将上映的电影
    wx.request({
      url: 'http://api.douban.com/v2/movie/coming?apikey=0df993c66c0c636e29ecbb5344252a4a',
      method: 'GET',
      header: {
        'Content-Type': 'json'
      },
      success: (res) => {
        if (res.statusCode === 200) {
          if (res.data.entries) {
            this.setData({
              moviesWillBeReleased: res.data.entries.slice(0, 3)
            });
          }
        }
      }
    });
    // 向服务器发起请求：高分电影
    wx.request({
      url: 'http://api.douban.com/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a',
      method: 'GET',
      header: {
        'Content-Type': 'json'
      },
      success: (res) => {
        if (res.statusCode === 200) {
          if (res.data.subjects){
            // 与其他 API 返回的 json 结构不一样（评分 rating 不一样）
            const originalMoviesList = res.data.subjects;
            originalMoviesList.forEach((list, index) => {
              originalMoviesList[index].rating = originalMoviesList[index].rating.average;
            })
            this.setData({
              highScoreMovies: originalMoviesList.slice(0, 3)
            });
          }
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
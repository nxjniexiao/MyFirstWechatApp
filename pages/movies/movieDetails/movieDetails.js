// pages/movies/movieDetails/movieDetails.js
const getMovieDetails = require('../../../utils/doubanAPI.js').getMovieDetails;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    const movieId = options.movieId;
    // console.log(movieId);
    const apiKey = '?apikey=0df993c66c0c636e29ecbb5344252a4a';
    const url = 'https://api.douban.com/v2/movie/subject/' + movieId + apiKey;
    getMovieDetails(url).then(movieData => {
      this.setData({
        movieData
      });
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
      wx.showToast({
        title: msg,
        icon: 'none'
      })
    });
  }
})
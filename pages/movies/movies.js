// pages/movies/movies.js
const getMoviesList = require('../../utils/doubanAPI.js').getMoviesList;
const doubanAPI = require('../../utils/doubanAPI.js');
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
    const urlBeingRelease = 'https://api.douban.com/v2/movie/nowplaying';
    const urlWillBeReleased = 'https://api.douban.com/v2/movie/coming';
    const urlHighScoreMovies = 'https://api.douban.com/v2/movie/top250';
    // 向服务器发起请求：正在热映的电影
    getMoviesList(urlBeingRelease, 3, (moviesList) => {
      // 防止API变动，导致返回的电影数目超过3个
      moviesList.splice(3);
      this.setData({
        'moviesBeingRelease': moviesList
      });
    });
    // 向服务器发起请求：即将上映的电影
    getMoviesList(urlWillBeReleased, 3, (moviesList) => {
      // 防止API变动，导致返回的电影数目超过3个
      moviesList.splice(3);
      this.setData({
        'moviesWillBeReleased': moviesList
      });
    });
    // 向服务器发起请求：高分电影
    getMoviesList(urlHighScoreMovies, 3, (moviesList) => {
      // 防止API变动，导致返回的电影数目超过3个
      moviesList.splice(3);
      this.setData({
        'highScoreMovies': moviesList
      });
    });
  },
})
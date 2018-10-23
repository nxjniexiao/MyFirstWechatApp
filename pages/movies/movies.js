// pages/movies/movies.js
const getMoviesList = require('../../utils/doubanAPI.js').getMoviesList;
const createUrlWithOpt = require('../../utils/doubanAPI.js').createUrlWithOpt;
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
    let urlBeingRelease = 'https://api.douban.com/v2/movie/in_theaters';
    let urlWillBeReleased = 'https://api.douban.com/v2/movie/coming_soon';
    let urlHighScoreMovies = 'https://api.douban.com/v2/movie/top250';
    // 向服务器发起请求：正在热映的电影
    urlBeingRelease = createUrlWithOpt(urlBeingRelease, 0, 3);
    getMoviesList(urlBeingRelease, (resData) => {
      this.setData({
        moviesBeingRelease: resData.moviesList
      });
    });
    // 向服务器发起请求：即将上映的电影
    urlWillBeReleased = createUrlWithOpt(urlWillBeReleased, 0, 3);
    getMoviesList(urlWillBeReleased, (resData) => {
      this.setData({
        moviesWillBeReleased: resData.moviesList
      });
    });
    // 向服务器发起请求：高分电影
    urlHighScoreMovies = createUrlWithOpt(urlHighScoreMovies, 0, 3);
    getMoviesList(urlHighScoreMovies, (resData) => {
      this.setData({
        highScoreMovies: resData.moviesList
      });
    });
  },
})
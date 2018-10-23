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
    // showSearchResult: false,
    showClearBtn: false,
    searchContent: '',
    searchResult: []
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
  // 搜索框聚焦
  onFocus: function(event){
    this.setData({
      showSearchResult: true
    });
  },
  // 搜索框失去焦点
  onBlur: function (event) {
    this.setData({
      showSearchResult: false
    });
  },
  // 键盘输入时触发
  onInput: function (event) {
    console.log('input:', event.detail.value);
    const value = event.detail.value;
    if(value){
      // 输入框不为空
      if (!this.data.showClearBtn){
        // 显示清空按钮
        this.setData({
          showClearBtn: true
        });
      }
    } else {
      // 输入框为空
      if (this.data.showClearBtn) {
        // 隐藏清空按钮
        this.setData({
          showClearBtn: false
        });
      }
    }
  },
  // 清空搜索框内容
  clearSearchContent: function (event) {
    this.setData({
      searchContent: '',
      showClearBtn: false
    })
  }
})
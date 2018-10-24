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
    showClearBtn: false,
    searchContent: '',
    searchTotal: null,
    searchResponseTotal: null, // API 返回的电影数目小于 count
    searchResult: [],
    requestUrl: null
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
    getMoviesList(urlBeingRelease).then(resData => {
      this.setData({
        moviesBeingRelease: resData.moviesList
      });
    }).catch(err => {
      wx.showToast({
        title: '正在热映的电影加载出错',
        icon: 'none'
      });
    })
    // 向服务器发起请求：即将上映的电影
    urlWillBeReleased = createUrlWithOpt(urlWillBeReleased, 0, 3);
    getMoviesList(urlWillBeReleased).then(resData => {
      this.setData({
        moviesWillBeReleased: resData.moviesList
      });
    }).catch(err => {
      wx.showToast({
        title: '即将上映的电影加载出错',
        icon: 'none'
      });
    });
    // 向服务器发起请求：高分电影
    urlHighScoreMovies = createUrlWithOpt(urlHighScoreMovies, 0, 3);
    getMoviesList(urlHighScoreMovies).then(resData => {
      this.setData({
        highScoreMovies: resData.moviesList
      });
    }).catch(err => {
      wx.showToast({
        title: '高分电影加载出错',
        icon: 'none'
      });
    });
  },
  // 键盘输入时触发
  onInput: function(event) {
    const value = event.detail.value;
    if (value) {
      // 输入框不为空
      if (!this.data.showClearBtn) {
        // 显示清空按钮
        this.setData({
          showClearBtn: true
        });
      }
    } else {
      // 输入框为空
      this.setData({
        searchResult: [],
        requestUrl: ''
      });
      this._scrollToTop(); // 显示热映等电影内容时，立即滚动到顶部
      if (this.data.showClearBtn) {
        // 隐藏清空按钮
        this.setData({
          showClearBtn: false
        });
      }
    }
  },
  // 清空搜索框内容
  clearSearchContent: function(event) {
    this.setData({
      searchContent: '',
      showClearBtn: false,
      searchResult: [],
      requestUrl: ''
    });
    this._scrollToTop(); // 显示热映等电影内容时，立即滚动到顶部
  },
  // 点击完成按钮时触发
  onConfirm: function(event) {
    let content = event.detail.value;
    if (content) {
      wx.showLoading({
        title: '加载中',
      });
      // 编码
      content = encodeURIComponent(content);
      let url = 'https://api.douban.com/v2/movie/search?q=' + content;
      this.setData({
        requestUrl: url
      });
      url = createUrlWithOpt(url, 0, 18);
      // 搜索电影
      getMoviesList(url).then(resData => {
        this.setData({
          searchTotal: resData.total,
          searchResult: resData.moviesList,
          searchResponseTotal: 18
        });
        wx.hideLoading();
      }).catch(err => {
        wx.hideLoading();
        wx.showToast({
          title: '搜索电影出错',
          icon: 'none'
        });
      });
    } else {
      // 搜索框内容为空
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      })
    }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let url = this.data.requestUrl;
    if (url) {
      const total = this.data.searchTotal;
      const currTotal = this.data.searchResponseTotal;
      if (total > currTotal) {
        wx.showLoading({
          title: '加载中',
        });
        url = createUrlWithOpt(url, currTotal, 18);
        // 请求更多的搜索结果
        getMoviesList(url).then(resData => {
          const moviesList = resData.moviesList;
          let newMoviesList = this.data.searchResult;
          newMoviesList = newMoviesList.concat(moviesList);
          this.setData({
            searchResult: newMoviesList,
            searchResponseTotal: currTotal + 18
          });
          wx.hideLoading();
        }).catch(err => {
          wx.hideLoading();
          wx.showToast({
            title: '加载更多出错',
            icon: 'none'
          })
        });
      } else {
        wx.showToast({
          title: '已经到底了',
          icon: 'none'
        });
      }
    }
  },
  // 使页面滚动到顶部
  _scrollToTop: function() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    });
  }
})
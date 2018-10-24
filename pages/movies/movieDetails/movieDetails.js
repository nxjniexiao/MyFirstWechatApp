// pages/movies/movieDetails/movieDetails.js
const getMovieDetails = require('../../../utils/doubanAPI.js').getMovieDetails;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    local_directors: '',
    local_casts: '',
    local_type: ''
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
    const url = 'https://api.douban.com/v2/movie/subject/' + '26425063' + apiKey;
    getMovieDetails(url).then(movieData => {
      this.setData({
        local_directors: this._concatNames(movieData.directors),
        local_casts: this._concatNames(movieData.casts),
        local_type: movieData.genres.join(' / '),
        ...movieData
      });
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
      wx.showToast({
        title: msg,
        icon: 'none'
      })
    });
  },
  onshow: function() {
    console.log(this.data.casts);
  },
  // 合并导演/演员名字
  _concatNames: function (arr) {
    let namesArr = [];
    arr.forEach((item) => {
      if(item.name){
        namesArr.push(item.name);
      }
    });
    return namesArr.join(' / ');
  }
})
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
    const urlBeingRelease = 'https://api.douban.com/v2/movie/nowplaying';
    const urlWillBeReleased = 'https://api.douban.com/v2/movie/coming';
    const urlHighScoreMovies = 'https://api.douban.com/v2/movie/top250';
    // 向服务器发起请求：正在热映的电影
    this.getMoviesList(urlBeingRelease, 'moviesBeingRelease');
    // 向服务器发起请求：即将上映的电影
    this.getMoviesList(urlWillBeReleased, 'moviesWillBeReleased');
    // 向服务器发起请求：高分电影
    this.getMoviesList(urlHighScoreMovies, 'highScoreMovies');
  },
  // 封装获取数据的方法
  getMoviesList: function(url, moviesListName) {
    const opt = '?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=3';// 请求前三条
    wx.request({
      url: url + opt,
      method: 'GET',
      header: {
        'Content-Type': 'json'
      },
      success: (res) => {
        if (res.statusCode === 200) {
          // top250 API 返回的 json 结构与其他两个不一样
          const originalMoviesList = res.data.subjects || res.data.entries;
          if (originalMoviesList) {
            // top250 API 中的 rating 为对象，其他的为评分字符串
            if (moviesListName == 'highScoreMovies') {
              originalMoviesList.forEach((list, index) => {
                originalMoviesList[index].rating = originalMoviesList[index].rating.average;
              })
            }
            // 防止API变动，导致返回的电影数目超过3个
            originalMoviesList.splice(3);
            // 筛选需要的数据
            const newMoviesList=[];
            originalMoviesList.forEach( (list, index) => {
              newMoviesList[index] = {
                id: list.id,
                title: list.title,
                moviePoster: list.images.large,
                rating: list.rating,
              }
            })
            this.setData({
              [moviesListName]: newMoviesList
            });
          }
        }
      }
    });
  }
})
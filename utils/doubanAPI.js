/* 
  获取电影列表：getMoviesList(url, countLimit, callback)
  获取指定电影信息:
 */
const doubanAPI = {
  // 获取电影列表
  // moviesListName
  getMoviesList: function (url, countLimit, callback) {
    if(!url){
      throw new Error('getMoviesList(url, countLimit, callback)中的url不能为空');
    }
    if (typeof countLimit !== 'number') {
      throw new Error('getMoviesList(url, countLimit, callback)中的countLimit必须为数字');
    }
    if (typeof callback !== 'function') {
      throw new Error('getMoviesList(url, countLimit, callback)中的callback必须为函数');
    }
    if (countLimit < 0){
      countLimit = 0;
    }
    // const opt = '?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=3';// 请求前三条
    const count = countLimit ? ('&start=0&count=' + 'countLimit') : '';// 请求的电影数量限制
    const opt = '?apikey=0df993c66c0c636e29ecbb5344252a4a' + count;
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
            if (url == 'https://api.douban.com/v2/movie/top250') {
              originalMoviesList.forEach((list, index) => {
                originalMoviesList[index].rating = originalMoviesList[index].rating.average;
              })
            }
            // 筛选需要的数据
            const newMoviesList = [];
            originalMoviesList.forEach((list, index) => {
              newMoviesList[index] = {
                id: list.id,
                title: list.title,
                moviePoster: list.images.large,
                rating: list.rating,
              };
            });
            callback(newMoviesList);
          }
        }
      }
    });
  }
  // 根据 id 获取电影信息
}
module.exports = doubanAPI;
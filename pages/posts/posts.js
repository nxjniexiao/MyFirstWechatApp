// pages/posts/posts.js
const posts = require('../../data/posts-data.js'); // require不支持绝对路径
Page({

  /**
   * 页面的初始数据
   */
  data: {
    posts: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      posts: posts
    });
  },

  // 进入文章详情页面
  navToArticle: function(event) {
    // wxml 中使用 'data-post-id' (data-前缀)给 dataset 中添加自定义变量 postId
    const postId = event.currentTarget.dataset.postId;
    wx.navigateTo({
      url: 'posts-detail/posts-detail?postId=' + postId,
    })
  }
})
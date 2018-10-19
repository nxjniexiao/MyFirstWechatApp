// pages/posts/posts-detail/posts-detail.js
const posts = require('../../../data/posts-data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    post: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // url 中 'posts-detail/posts-detail?postId=0'
    const currPostId = options.postId;
    var newPost = null;
    posts.forEach(post => {
      if (post.postId == currPostId) {
        newPost = post;
      }
    });
    this.setData({
      post: newPost
    });
  }
})
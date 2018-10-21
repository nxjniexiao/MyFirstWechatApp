// pages/posts/posts-detail/posts-detail.js
const posts = require('../../../data/posts-data.js');
const storageUtils = require('../../../utils/storageUtils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currPostId: '',
    currPostCollected: false,
    musicIsPlaying: false,
    post: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // url 中 'posts-detail/posts-detail?postId=0'
    const currPostId = options.postId;
    const currPostCollected = storageUtils.get('posts_collection', currPostId);
    var newPost = null;
    posts.forEach(post => {
      if (post.postId == currPostId) {
        // 不使用 '==='，因为 currPostId 为字符串
        newPost = post;
      }
    });
    this.setData({
      currPostId,
      currPostCollected,
      post: newPost
    });
    // 监听背景音乐播放/暂停
    const backgroundAudioManager = wx.getBackgroundAudioManager();
    backgroundAudioManager.onPlay(() => {
      if (!this.data.musicIsPlaying) {
        this.setData({
          musicIsPlaying: true,
        });
      }
    });
    backgroundAudioManager.onPause(() => {
      if (this.data.musicIsPlaying) {
        this.setData({
          musicIsPlaying: false,
        });
      }
    });
  },
  onUnload() {
    // 退出页面时暂停BGM
    wx.getBackgroundAudioManager().pause();
  },
  switchCollection: function(event) {
    let currPostCollected = !this.data.currPostCollected;
    this.setData({
      currPostCollected
    });
    storageUtils.set('posts_collection', this.data.currPostId, currPostCollected);
    wx.showToast({
      title: currPostCollected?'已收藏':'取消收藏',
      duration: 1000
    })
  },
  shareNews: function(event){
    wx.showActionSheet({
      itemList: ['发送给微信好友', '分享到朋友圈', '分享到手机QQ', '分享到QQ空间'],
    })
  },
  handleMusic: function(event) {
    const backgroundAudioManager = wx.getBackgroundAudioManager();
    const bgm = this.data.post.backgroundMusic;
    this.setData({
      musicIsPlaying: !this.data.musicIsPlaying
    });
    if(this.data.musicIsPlaying) {
      console.log('play');
      backgroundAudioManager.title = bgm.title;
      backgroundAudioManager.singer = bgm.singer;
      backgroundAudioManager.coverImgUrl = bgm.coverImgUrl;
      backgroundAudioManager.src = bgm.src;//当设置了新的 src 时，会自动开始播放
      // backgroundAudioManager.play();// 播放
    } else {
      console.log('pause');
      backgroundAudioManager.pause();
    }
  }
})
// pages/posts/posts.js
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
  onLoad: function (options) {
    const newPosts=[
      {
        title: 'WEBINAR 30 Oct: Cyber security threats in shipping – are you prepared?',
        desc: 'See the big picture and discover recommended steps to build up cyber security. Register for one of the two free sessions!',
        authorAvatar: '/images/avatar/1.png',
        publishDate: '10 September 2018',
        contentPic: '/images/posts/post-1.jpg',
        msgNum: 26,
        viewNum: 50
      },
      {
        title: 'New Maritime Forecast to 2050 available for download',
        desc: 'A rise of 32% in seaborne-trade measured in tonne-miles is predicted for 2016–2030. The report also focusses on the challenges of decarbonizing the shipping industry.',
        authorAvatar: '/images/avatar/2.png',
        publishDate: '09 September 2018',
        contentPic: '/images/posts/post-2.jpg',
        msgNum: 32,
        viewNum: 89
      },
      {
        title: ' 16 expert presentations from SMM 2018 now available',
        desc: ' Covering every ship type, emerging technologies, the regulatory landscape, efficiency gains, and much more. Watch the video recordings and download the presentations.',
        authorAvatar: '/images/avatar/3.png',
        publishDate: '08 September 2018',
        contentPic: '/images/posts/post-3.jpg',
        msgNum: 33,
        viewNum: 50
      },
      {
        title: ' Alternative Fuels Insight (AFI) platform',
        desc: ' Provides the industry with an open platform for evaluating the uptake of alternative fuels and technologies',
        authorAvatar: '/images/avatar/4.png',
        publishDate: '07 September 2018',
        contentPic: '/images/posts/post-4.jpg',
        msgNum: 15,
        viewNum: 40
      }
    ];
    this.setData({ posts: newPosts});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
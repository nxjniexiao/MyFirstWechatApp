// pages/welcome/welcome.js
Page({
  start: function(event) {
    // wx.switchTab(Object object) 替代 wx.redirectTo(Object object)
    // 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
    wx.switchTab({
      url: '../posts/posts',
    })
  }
})
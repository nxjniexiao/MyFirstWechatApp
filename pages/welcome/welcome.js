// pages/welcome/welcome.js
Page({
  start: function(event) {
    wx.redirectTo({
      url: '../posts/posts',
    })
  }
})
// pages/login/login.js

//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '',
    userInfo: {},
    id:'',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    
  },
  //事件处理函数
  bindViewTap: function () {

  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  //点击登陆
  login:function(){
    var id = this.data.id
    var hasRegister = this.data.hasRegister

    id = app.globalData.id
    console.log("open",id)

    var that = this
    this.setData({
      id 
    })
    wx.request({
      url: 'https://www.tisys-club.com/Api/Login/Login/'+ id,
      success:function(res){
        console.log(res.data)
        hasRegister = res.data.code
        that.setData({
          hasRegister: res.data.code
        })
        if (hasRegister == false){
          wx.navigateTo({
            url: '../register/register',
          })
        } else if (hasRegister == true) {
          wx.switchTab({
          url: '../home/home',
        })}
      }
    })
  }
  
})

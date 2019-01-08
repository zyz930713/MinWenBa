//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        var that = this
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'https://www.tisys-club.com/Api/WeiXin/GetOpenId',
          data: { code: res.code },
          success: function (res) {
            var newData = JSON.parse(res.data)
            that.globalData.id = newData.openid
            var id = that.globalData.id
            wx.request({
              url: 'https://www.tisys-club.com/Api/Login/Login/' + id,
              success: function (res) {
                var hasRegister = res.data.code
                console.log(hasRegister)
                if (hasRegister == false) {
                  wx.navigateTo({
                    url: '../login/login',
                  })
                } else {
                  that.globalData.roleInfo = res.data
                  wx.switchTab({
                    url: '../home/home',
                  })
                }
              }
            })
          }
        })  
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log(res)
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow:function(){
    wx.login({
      success: res => {
        var that = this
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'https://www.tisys-club.com/Api/WeiXin/GetOpenId',
          data: { code: res.code },
          success: function (res) {
            var newData = JSON.parse(res.data)
            that.globalData.id = newData.openid
            var id = that.globalData.id
            wx.request({
              url: 'https://www.tisys-club.com/Api/Login/Login/' + id,
              success: function (res) {
                var hasRegister = res.data.code
                console.log(hasRegister)
                if (hasRegister == false) {
                  wx.navigateTo({
                    url: '../login/login',
                  })
                } else {
                  that.globalData.roleInfo = res.data
                  wx.switchTab({
                    url: '../home/home',
                  })
                }
              }
            })
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    roleInfo:null,
    id:""

  }
})
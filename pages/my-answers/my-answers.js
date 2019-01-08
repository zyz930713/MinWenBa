// pages/my-answers/my-answers.js
const app = getApp()
Page({
  data:{
    answersItem:[],
    roleInfo: ""
  },
  onLoad:function(){
    var answersItem = this.data.answersItem
    var roleInfo = this.data.roleInfo
    roleInfo = app.globalData.roleInfo

    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
    wx.request({
      url: 'https://www.tisys-club.com/api/MyData/GetMyAnswers/' + roleInfo.UserId,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: (res) => {
        
        answersItem = res.data
        console.log(answersItem)
        this.setData({
          answersItem
        })
      }
    })
  },
  //返回刷新
  onShow: function () {
    var answersItem = this.data.answersItem;
    answersItem = []


    this.setData({
      answersItem
    })

    this.onLoad();
  },
  
})
// pages/my-questions/my-questions.js
const app = getApp()

Page({
  data: {
    questionsItem: [],
    anwserTabY: "已答",
    anwserTabN: "未答",
    roleInfo: ""
  },
  onLoad: function () {
    var questionsItem = this.data.questionsItem
    var roleInfo = this.data.roleInfo
    roleInfo = app.globalData.roleInfo

    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
    wx.request({
      url: 'https://www.tisys-club.com/api/MyData/GetMyQuestions/' + roleInfo.UserId,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: (res) => {

        questionsItem = res.data
        
        this.setData({
          questionsItem
        })
      }
    })
  },
  //返回刷新
  onShow: function () {
    var questionsItem = this.data.questionsItem;
    questionsItem = []


    this.setData({
      questionsItem
    })

    this.onLoad();
  },

})
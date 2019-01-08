// pages/study-record/study-record.js
const app = getApp()
Page({
  data: {
    studyItem: [],
    roleInfo: ""
  },
  onLoad: function () {
    var studyItem = this.data.studyItem
    var roleInfo = this.data.roleInfo
    roleInfo = app.globalData.roleInfo

    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
    wx.request({
      url: 'https://www.tisys-club.com/api/MyData/GetCoursesList/' + roleInfo.UserId,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: (res) => {

        studyItem = res.data
        console.log(studyItem)
        this.setData({
          studyItem
        })
      }
    })
  },
  //返回刷新
  onShow: function () {
    var studyItem = this.data.studyItem;
    studyItem = []


    this.setData({
      studyItem
    })

    this.onLoad();
  },

})
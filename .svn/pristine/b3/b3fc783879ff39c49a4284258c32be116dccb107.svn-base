// pages/my-notes/my-notes.js
const app = getApp()
Page({

 data:{
   notesItems:[],
   roleInfo: ""
 },
  onLoad: function () {
    var notesItems = this.data.notesItems
    var roleInfo = this.data.roleInfo
    roleInfo = app.globalData.roleInfo

    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
    wx.request({
      url: 'https://www.tisys-club.com/api/MyData/GetMyNotes/' + roleInfo.UserId,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: (res) => {

        notesItems = res.data
        console.log(notesItems)
        this.setData({
          notesItems
        })
      }
    })
  },
  //返回刷新
  onShow: function () {
    var notesItems = this.data.notesItems;
    notesItems = []
    

    this.setData({
      notesItems
    })

    this.onLoad();
  },
})
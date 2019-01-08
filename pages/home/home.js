// pages/home/home.js
const app = getApp()
Page({
 data:{
   navbar: [],
   currentTab: 0,
   courseItems:[],
   anwserTabY:"已答",
   anwserTabN:"未答",
   ProjectId:"",
   roleInfo: ""
 },

 //获取课程信息
  onLoad:function(){
    var navbar = this.data.navbar;
    var courseItems = this.data.courseItems;
    var ProjectId = this.data.ProjectId
    var that = this
    var roleInfo = this.data.roleInfo
    roleInfo = app.globalData.roleInfo

    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
    wx.request({
      url: 'https://www.tisys-club.com/api/Index/GetMyCoursesAll/' + roleInfo.UserId,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: (res) => {

        for (let i = 0; i < res.data.length; i++) {

          navbar.push(res.data[i].CourseName)

          courseItems.push(res.data[i])
          console.log("100",courseItems)
        }

        that.setData({
          navbar,
          courseItems,
          roleInfo: app.globalData.roleInfo
        })
      }
    })
    
  },
  
  //返回刷新
  onShow:function(){
    var navbar = this.data.navbar;
    var currentTab = this.data.currentTab;
    var courseItems = this.data.courseItems;

    navbar = []
    currentTab = 0
    courseItems = []

    this.setData({
      navbar,
      currentTab,
      courseItems
    })

    this.onLoad();
  },

 //点击选择课程
  navbarTap:function(e){
    this.setData({
      currentTab:e.currentTarget.dataset.idx
    })
  },

  //回答问题
  


  //我的提问
  writeQuestion: function () {
    var CourseNum = this.data.currentTab
    
    wx.navigateTo({
      url: '../add-question/add-question?CourseNum=' + CourseNum,
    })
  }
})


 
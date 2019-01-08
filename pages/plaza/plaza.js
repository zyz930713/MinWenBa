const app = getApp()

Page({
  data: {
    navbar: ["学习广场", "排行榜"],
    currentTab: 0,
    courseItems: [],
    anwserTabY: "已答",
    anwserTabN: "未答",
    collectFlag: ["收藏","已收藏"],
    rankInfo:[],
    roleInfo: "",
    showTab:0,
  },

  //获取课程信息
  onLoad: function () {
    var courseItems = this.data.courseItems;
    var rankInfo = this.data.rankInfo
    var myId = this.data.myId
    var that = this
    var roleInfo = this.data.roleInfo
    roleInfo = app.globalData.roleInfo
    console.log(roleInfo)

    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    })
    wx.request({
      url: 'https://www.tisys-club.com/api/Xxgc/Getxxgc/' + roleInfo.UserId,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: (res) => {
        courseItems = (res.data)
        this.setData({
          courseItems
          
        })
      }
    }),
    wx.request({
      url: 'https://www.tisys-club.com/Api/Rank/RankList/' + roleInfo.UserId,
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          success: (res) => {
            console.log(res.data)
            rankInfo = (res.data)
            that.setData({
              rankInfo,
              roleInfo
            })
          }
        })
     
      
  },

  

  //广场排行切换
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  //返回刷新
  onShow:function(){
    var currentTab = this.data.currentTab;
    var courseItems = this.data.courseItems;


    currentTab = 0
    courseItems = []

    this.setData({
      currentTab,
      courseItems
    })

    this.onLoad();
  },

   
  //点击收藏回答
  toColl:function(e){
    var roleInfo = this.data.roleInfo
    roleInfo = app.globalData.roleInfo
    wx.request({
      url: 'https://www.tisys-club.com/api/Xxgc/PostCollection',
      method:'POST',
      data:{
        "NoteId": e.currentTarget.dataset.answerid,
        "UserId": roleInfo.UserId,
        "CreatedBy": roleInfo.UserId,
        "LastUpdatedBy": roleInfo.UserId,
      }, 
      success:(res) => {
        var currentTab = this.data.currentTab;
        var courseItems = this.data.courseItems;


        currentTab = 0
        courseItems = []

        this.setData({
          currentTab,
          courseItems
        })

        this.onLoad();
      }
    })
  },

  //点击收藏评论
  toCollP: function (e) {
    var roleInfo = this.data.roleInfo
    roleInfo = app.globalData.roleInfo
    wx.request({
      url: 'https://www.tisys-club.com/api/Xxgc/PostCollection',
      method: 'POST',
      data: {
        "CommentId": e.currentTarget.dataset.commentid,
        "UserId": roleInfo.UserId,
        "CreatedBy": roleInfo.UserId,
        "LastUpdatedBy": roleInfo.UserId,
      },
      success: (res) => {
        var currentTab = this.data.currentTab;
        var courseItems = this.data.courseItems;


        currentTab = 0
        courseItems = []

        this.setData({
          currentTab,
          courseItems
        })

        this.onLoad();
      }
    })
    console.log(e.currentTarget.dataset.commentid)
  },

  //点赞回答
  toLike: function (e) {
    var roleInfo = this.data.roleInfo
    roleInfo = app.globalData.roleInfo
    wx.request({
      url: 'https://www.tisys-club.com/api/Xxgc/PostLike',
      method: 'POST',
      data: {
        "NoteId": e.currentTarget.dataset.answerid,
        "UserId": roleInfo.UserId,
        "CreatedBy": roleInfo.UserId,
        "LastUpdatedBy": roleInfo.UserId,
      },
      success: (res) => {
        var currentTab = this.data.currentTab;
        var courseItems = this.data.courseItems;


        currentTab = 0
        courseItems = []

        this.setData({
          currentTab,
          courseItems
        })

        this.onLoad();
      }
    })
  },

  //点赞评论
  toLikeP: function (e) {
    var roleInfo = this.data.roleInfo
    roleInfo = app.globalData.roleInfo
    wx.request({
      url: 'https://www.tisys-club.com/api/Xxgc/PostLike',
      method: 'POST',
      data: {
        "CommentId": e.currentTarget.dataset.commentid,
        "UserId": roleInfo.UserId,
        "CreatedBy": roleInfo.UserId,
        "LastUpdatedBy": roleInfo.UserId,
      },
      success: (res) => {
        var currentTab = this.data.currentTab;
        var courseItems = this.data.courseItems;


        currentTab = 0
        courseItems = []

        this.setData({
          currentTab,
          courseItems
        })

        this.onLoad();
      }
    })
  },
  //显示隐藏分数详情
  
  showDetail: function (e) {
    this.setData({
      showTab: e.currentTarget.dataset.showId
    })
  }
})
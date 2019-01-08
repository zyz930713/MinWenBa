// pages/add-comment/add-comment.js
const app = getApp()
Page({
  data: {
    answerText: '',
    noteId: '',
    notes: "",
    isPublic: "Y",
    commentType:"Q",
    texts: "至少5个字",
    min: 5,//最少字数
    max: 200, //最多字数
    roleInfo: ""
  },
  onLoad: function (options) {
    var that = this;

    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    })
    console.log(options)
    that.setData({
      answerText: options
    })
  },
  //字数限制  
  inputs: function (e) {
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);

    this.setData({
      notes: value
    })

    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber: len //当前字数  
    });
  },
  

  //上传评论
  submit: function () {
    var subValue = this.data.notes;
    var PublicFlag = this.data.isPublic;
    var noteId = this.data.answerText.noteId;
    var commentType = this.data.commentType;
    var roleInfo = this.data.roleInfo
    roleInfo = app.globalData.roleInfo

    console.log(subValue);
    wx.request({
      url: 'https://www.tisys-club.com/api/Xxgc/PostComment',
      method: 'post',
      data: {
        "Comments": subValue,
        "noteId": noteId,
        "PublicFlag": PublicFlag,
        "commentedType": commentType,
        "CommentedBy": roleInfo.UserId,
        "CreatedBy": roleInfo.UserId,
        "LastUpdatedBy":roleInfo.UserId
      },
      header: { 
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data)
        wx.showToast({
          title: '加载中',
          icon: 'loading',
          duration: 1500
        }),
          setTimeout(function () {
            wx.switchTab({
              url: '../plaza/plaza',
            })
          }, 2000)

      }
    })

  }
})
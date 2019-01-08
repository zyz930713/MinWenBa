// pages/add-anwser/add-anwser.js
const app = getApp()
Page({
  data:{
    questionText:'',
    questionId:'',
    notes: "",
    isPublic: "Y",
    isPublicTab: true,
    publishText: "可公开",
    texts: "至少5个字",
    min: 5,//最少字数
    max: 200, //最多字数
    roleInfo: ""
  },
  onLoad:function(options){
    var that = this
    var roleInfo = this.data.roleInfo

    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    })
    console.log(options)
    that.setData({
      questionText: options,
      roleInfo: app.globalData.roleInfo
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
  //选择是否公开展示
  chooseShow: function () {
    if (this.data.isPublic == "Y") {
      this.setData({
        isPublic: "N",
        publishText: "不公开",
        isPublicTab: false
      });
    } else {
      this.setData({
        isPublic: "Y",
        publishText: "可公开",
        isPublicTab: true
      });
    }

  },

  //上传回答
  submit: function () {
    var subValue = this.data.notes;
    var PublicFlag = this.data.isPublic;
    var questionId = this.data.questionText.questionId;
    var roleInfo = this.data.roleInfo
    var that = this

    console.log(subValue);
    wx.request({
      url: 'https://www.tisys-club.com/api/Index/PostAnswer',
      method: 'post',
      data: {
        "Notes": subValue,
        "QuestionId": questionId,
        "PublicFlag": PublicFlag,
        "UserId": roleInfo.UserId,
        "CreatedBy": roleInfo.UserId,
        "LastUpdatedBy": roleInfo.UserId,
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data)
        that.setData({
          
        })
        wx.showToast({
          title: '加载中',
          icon: 'loading',
          duration: 1500
        }),
        setTimeout(function(){
          wx.switchTab({
            url: '../home/home',
          })
        },2000)
        
      }
    })

  }
})
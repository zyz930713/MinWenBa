// pages/add-question/add-question.js
const app = getApp()

Page({
  data: {
    notes: "",
    Status: "O",
    QuestionType:"Q",
    CourseName:"",
    QuestionNum:"S",
    option:0,
    CourseIds:[],
    CourseId:0,
    min: 5,//最少字数
    max: 50, //最多字数 (根据自己需求改变) 
    LabelType: [],
    labelId:'',
    roleInfo:""
    
  },

  

  //获取课程信息
  onLoad: function (options) {
    console.log(options)
    var LabelType = this.data.LabelType;
    var CourseIds = this.data.CourseIds;
    var QuestionNum = this.data.QuestionNum;
    var ProjectId = ""
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
        console.log(res.data)
        for (let i = 0; i < res.data.length; i++) {
          LabelType.push(res.data[i].CourseName)
          CourseIds.push(res.data[i].CourseId)
        }
        console.log(LabelType);
        that.setData({
          LabelType: LabelType,
          CourseName: LabelType[options.CourseNum],
          CourseId: CourseIds[[options.CourseNum]],
          option: options.CourseNum,
          QuestionNum: QuestionNum + 1,
        })
      }
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

  

  //提交问题
  submit: function () {
    var QuestionDesc = this.data.notes;
    var Status = this.data.Status;
    var CourseId = this.data.CourseId;
    var QuestionType = this.data.QuestionType
    var QuestionNum = this.data.QuestionNum
    var roleInfo = this.data.roleInfo
    roleInfo = app.globalData.roleInfo

    console.log(QuestionDesc)
    console.log(Status)
    console.log(CourseId)
    console.log(QuestionType)
    wx.request({
      url: 'https://www.tisys-club.com/api/Index/PostQuestion',
      method: 'post',
      data: {
        "QuestionDesc": QuestionDesc,
        "Status": Status,
        "CourseId": CourseId,
        "QuestionType": QuestionType,
        "QuestionNum": QuestionNum,
        "CreatedBy": roleInfo.UserId,
        "LastUpdatedBy": roleInfo.UserId
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data)
        res.data.QuestionNum+1
        wx.showToast({
          title: '加载中',
          icon: 'loading',
          duration: 1500
        }),
          setTimeout(function () {
            wx.switchTab({
              url: '../home/home',
            })
          }, 2000)
      }
    })

  }



})
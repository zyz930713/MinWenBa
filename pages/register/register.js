// pages/register/register.js
const app = getApp()

Page({
  data:{
    studentFlag: false,
    teacherFlag:false,
    id:"",
    headImage:"",
    roleInfo:""
  },
  toStudent:function(){
    var studentFlag = this.data.studentFlag
    var teacherFlag = this.data.teacherFlag
    this.setData({
      studentFlag:true,
      teacherFlag: false
    })
  },
  toTeacher: function () {
    var studentFlag = this.data.studentFlag
    var teacherFlag = this.data.teacherFlag
    this.setData({
      teacherFlag: true,
      studentFlag: false
    })
  },

  //学生信息提交
  studentSubmit:function(e){
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var id = this.data.id
    var headImage = this.data.headImage
    var Gender = e.detail.value.Gender
    var ProjectNum = e.detail.value.ProjectNum
    var StudentName = e.detail.value.StudentName
    var StudentNum = e.detail.value.StudentNum
    var ipone = e.detail.value.ipone
    var that = this

    id = app.globalData.id
    headImage = app.globalData.userInfo.avatarUrl
    if (ProjectNum == ""){
      wx.showToast({
        title: '项目编号不能为空！',
        icon:'none',
        duration:3000
      })
      return false;
    } else if (StudentName == ""){
      wx.showToast({
        title: '用户姓名不能为空！',
        icon: 'none',
        duration: 3000
      })
      return false;
    } else if (ipone == ""){
      wx.showToast({
        title: '手机号码不能为空！',
        icon: 'none',
        duration: 3000
      })
      return false;
    } else if (!(/^1[34578]\d{9}$/.test(ipone))) {
      wx.showToast({
        title: '手机号码有误，请重填',
        icon: 'none',
        duration: 3000
      })
      return false;
    } else if (StudentNum == "") {
      wx.showToast({
        title: '学号不能为空！',
        icon: 'none',
        duration: 3000
      })
      return false;
    } else if (Gender == "") {
      wx.showToast({
        title: '请选择性别！',
        icon: 'none',
        duration: 3000
      })
      return false;
    }
    wx.request({
      url: 'https://www.tisys-club.com/Api/Register/PostStudent',
      method:'POST',
      header: { 'content-type': 'application/json' },
      data:{
        OpenId: id,
        HeadImage: headImage,
        Gender: Gender,
        ProjectNum: ProjectNum,
        StudentName: StudentName,
        StudentNum: StudentNum,
        Mobile: ipone
      },
      success:function(res){
        console.log(res)
        
        if (res.data.code == false){
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 3000
          })
        }else {
          app.globalData.roleInfo = res.data
          wx.showToast({
            title: res.data.message,
            duration: 1000
          })
          setTimeout(function(){
            wx.switchTab({
              url: '../home/home',
            })
          },500) 
        }
        
      }
    })
  },


  //老师信息提交
  teacherSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var id = this.data.id
    var headImage = this.data.headImage
    var Gender = e.detail.value.Gender
    var TeacherName = e.detail.value.TeacherName
    var TeacherNum = e.detail.value.TeacherNum
    var ipone = e.detail.value.ipone

    id = app.globalData.id
    headImage = app.globalData.userInfo.avatarUrl
    if (TeacherName == "") {
      wx.showToast({
        title: '用户姓名不能为空！',
        icon: 'none',
        duration: 3000
      })
      return false;
    } else if (ipone == "") {
      wx.showToast({
        title: '手机号码不能为空！',
        icon: 'none',
        duration: 3000
      })
      return false;
    } else if (!(/^1[34578]\d{9}$/.test(ipone))) {
      wx.showToast({
        title: '手机号码有误，请重填',
        icon: 'none',
        duration: 3000
      })
      return false;
    } else if (TeacherNum == "") {
      wx.showToast({
        title: '教师号不能为空！',
        icon: 'none',
        duration: 3000
      })
      return false;
    } else if (Gender == "") {
      wx.showToast({
        title: '请选择性别！',
        icon: 'none',
        duration: 3000
      })
      return false;
    }
    wx.request({
      url: 'https://www.tisys-club.com/Api/Register/PostTeacher',
      method: 'POST',
      header: { 'content-type': 'application/json' },
      data: {
        OpenId: id,
        HeadImage: headImage,
        Gender: Gender,
        TeacherName: TeacherName,
        TeacherNum: TeacherNum,
        Mobile: ipone
      },
      success: function (res) {
        console.log(res)
        app.globalData.roleInfo = res.data
        wx.showToast({
          duration: 1000
        })
        wx.switchTab({
          url: '../home/home',
        })

      
      }
    })
  },

  //重置
  formReset() {
    
  }
})
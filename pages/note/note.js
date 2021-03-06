// pages/note/note.js
const app = getApp()
Page({
  data:{
    subValue: "",
    notes:"",
    isPublic:"Y",
    isPublicTab:true,
    publishText:"可公开",
    texts: "至少5个字",
    min: 5,//最少字数
    max: 520, //最多字数 (根据自己需求改变) 
    LabelType:[],
    tag:"",
    tags:[],
    filterTag:"",
    isChooseTag:false,
    tagCheckedNum: -1,
    roleInfo: ""
  },

  //获取课程信息
  onLoad: function () {
    var LabelType = this.data.LabelType;
    var roleInfo = this.data.roleInfo
    roleInfo = app.globalData.roleInfo

    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
    wx.request({
      url: 'https://www.tisys-club.com/api/Notes/GetLabels',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: (res) => {
        console.log(res.data[0])
        for (let i = 0; i < res.data.length; i++) {
          LabelType.push(res.data[i].Label1)
        }
        console.log(LabelType);
        this.setData({
          LabelType: LabelType,
        })
      }
    })
  },

  //返回刷新
  onShow: function () {
    var subValue = this.data.subValue;
    var notes = this.data.notes;
    var isPublic = this.data.isPublic;
    var LabelType = this.data.LabelType;
    var tags = this.data.tags;

    subValue = ""
    notes = ""
    LabelType = []
    isPublic = "Y"
    tags = []

    this.setData({
      subValue,
      notes,
      LabelType,
      isPublic,
      tags
    })

    this.onLoad();
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
    //最少字数限制
    if (len <= this.data.min)
      this.setData({
        texts: "加油"
      })
    else if (len > this.data.min)
      this.setData({
        texts: " "
      })

    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber: len //当前字数  
    });
  },

  //选择是否公开展示
  chooseShow:function(){
    if (this.data.isPublic == "Y"){
      this.setData({
        isPublic: "N", 
        publishText:"不公开",
        isPublicTab:false
      });
    }else {
      this.setData({
        isPublic: "Y",
        publishText: "可公开",
        isPublicTab: true
      });
    }
    
  },
  
  //选择标签
  chooseTag: function (e){
    var isChooseTag = this.data.isChooseTag
    var notes = this.data.notes
    var tag = this.data.tag
    var tags = this.data.tags
    var filterTag = this.data.filterTag
    var subValue = this.data.subValue
    
    tag = "#" + e._relatedInfo.anchorTargetText + "#"
    tags.push(tag)
    
    function uniq(array){
      var temp = [];
      for(let i = 0; i < array.length; i++){
        if (temp.indexOf(array[i]) == -1){
          temp.push(array[i])
        }
      }
      return temp;
    }
    
    filterTag = uniq(tags).toString() ;
    subValue = filterTag + notes 
    console.log(filterTag);

    this.setData({
      tagCheckedNum: e.currentTarget.dataset.idx,
      tag,
      tags,
      notes,
      filterTag,
      subValue
    })
    
  },


  //上传笔记
  submit: function() {
    var subValue = this.data.subValue;
    var PublicFlag = this.data.isPublic;
    var tag = this.data.tag;
    var roleInfo = this.data.roleInfo
    roleInfo = app.globalData.roleInfo

    console.log(subValue);
    this.setData({ subValue: "" })
    wx.request({
      url: 'https://www.tisys-club.com/api/Notes/PostNote',
      method: 'post',
      data:{
        "Notes": subValue,
        "QuestionId": null,
        "PublicFlag": PublicFlag,
        "UserId": roleInfo.UserId,
        "CreatedBy": roleInfo.UserId,
        "LastUpdatedBy": roleInfo.UserId,
      },
      header: {
        'content-type': 'application/json' 
      },
      success(res) {
        
        wx.showToast({
          title: '提交成功',
          duration: 1500
        }),
          setTimeout(function () {
          
            wx.navigateTo({
              url: '../my-notes/my-notes',
            })
          }, 2000)
      }
    })
    
  }


 
})
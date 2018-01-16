const app = getApp();

Page({

  data:{
    path:[]
  },
  onLoad(res) {
    
    var addColor='#A9A9A9';
    var minusColor='#A9A9A9';
    if(res.currCount<res.count){
      addColor='black';
    }
    if(res.currCount>0&&res.currCount<=res.count){
      minusColor='black'
    }
    
    this.setData({
        data:res,
        addColor:addColor,
        minusColor:minusColor,
      });
      
  },
  add(event){
    var data = event.target.dataset;
    var count = data.count;
    var unitPrice = data.unitPrice;
    var totalPrice = data.totalPrice;
    var currCount = data.currCount;
    var currPrice = data.currPrice;

    if(currCount<count){
      currCount=currCount+1;
      currPrice = parseFloat(currPrice)+parseFloat(unitPrice);
      data.currCount = currCount;
      data.currPrice = currPrice;
      this.onLoad(data);
    }

  },
  minus(event){
    var data = event.target.dataset;
    var count = data.count;
    var unitPrice = data.unitPrice;
    var totalPrice = data.totalPrice;
    var currCount = data.currCount;
    var currPrice = data.currPrice;
    
    if(currCount>0&&currCount<=count){
      currCount=currCount-1;
      currPrice=currPrice-unitPrice;
      data.currCount = currCount;
      data.currPrice = currPrice;
      this.onLoad(data);
    }
    
  },
  formSubmit(e){
    var formData = e.detail.value; 
    console.log('form发生了submit事件，携带数据为：', e.detail.value);

    var successUp = 0; //成功个数
    var failUp = 0; //失败个数
    var len = formData.paths.length; //总共个数
    var i = 0; //第几个
    if(len>0){
      this.uploadDIY(formData.paths,successUp,failUp,i,len);
    }
    
    my.httpRequest({  
      url: 'http://localhost:8080/JobImg',  
      method: 'POST',
      data: formData,  
      header: {  
          'Content-Type': 'application/json'  
      },  
      success: function(res) {  
        console.log('表单提交成功数据：',res.data)  
        my.alert({
          content: '提交成功'
        })
        my.navigateBack({
          delta: 1
        })
      },
      fail:function(res){
        console.log('表单提交失败数据：',res.data) 
        my.alert({
          content: '提交失败，请重新操作'
        })
      }  
    })  

  },

  /* 函数描述：作为上传文件时递归上传的函数体体；
   * 参数描述： 
   * filePaths是文件路径数组
   * successUp是成功上传的个数
   * failUp是上传失败的个数
   * i是文件路径数组的指标
   * length是文件路径数组的长度
   */      
    uploadDIY(filePaths,successUp,failUp,i,length){
      my.uploadFile({
                    url: 'http://localhost:8080/JobImg', 
                    filePath: filePaths[i],
                    fileName: Date.parse(new Date()),
                    fileType:'image',
                    /*formData:{
                      'pictureUid': owerId,
                      'pictureAid': albumId
                    },*/
                    success: (resp) => {
                      console.log("resp数据：",resp);
                        successUp++;
                    },
                    fail: (res) => {
                        failUp ++;
                    },
                    complete: () => {
                        i ++;                        
                        if(i == length)
                        {                      
                          //my.alert({content:'总共'+successUp+'张上传成功,'+failUp+'张上传失败！'});
                        }
                        else
                        {  //递归调用uploadDIY函数
                            this.uploadDIY(filePaths,successUp,failUp,i,length);
                        }
                    },
                });
  },

  uploadImg() {
    var path = this.data.path;
    my.chooseImage({
      count: 3 - path.length,
      success: (res) => {
        path = path.concat(res.apFilePaths);
        if (path.length > 3) {
          path = path.slice(0, 3);
        }
        this.setData({
          "path": path
        })

       // var successUp = 0; //成功个数
       // var failUp = 0; //失败个数
       // var len = res.apFilePaths.length; //总共个数
       // var i = 0; //第几个
       // this.uploadDIY(res.apFilePaths,successUp,failUp,i,len);
      },
    });
  },

  showImg: function (event) {
    var url = event.target.dataset.url;
    my.previewImage({
      urls: [
        url
      ],
    });
  },


  removeImg: function (event) {
    var idx = event.target.dataset.idx;
    var path = this.data.path;
    path.splice(idx, 1)
    this.setData({
      "path": path
    })
  }
});
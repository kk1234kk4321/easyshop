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
    my.showToast({
      title: '提交成功',
      icon: 'loading',
      duration: 1500
    })
    my.navigateBack({
      delta: 1
    })
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
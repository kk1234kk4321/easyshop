const app = getApp();
var resultList=require("../add-replenish/replenish-data.js");
Page({
  onLoad() {
    var that = this;
    console.log('补货列表请求，userid===>',app.globalData.userId)
     my.httpRequest({  
        url: app.globalData.erpUrl +'erpLife/out/userSupplyQuery.do',
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }, 
        data: {
          userZfbId: app.globalData.userId,
        },
        success: function(res) {  
          console.log("res====>",res);
          that.setData({
            array:res.data.list
          })
        },
        fail: function(res) {
          console.log("fail reson:", res);
          if(res.error==12||res.error==13){
            my.alert({
              content: '网络出错或超时，请稍候重试！',
            });
          }else{
             my.alert({
              content: '操作失败，请重新操作！',
            });
          }
        },
    }); 

    /*this.setData({
        array:resultList.result
    });*/
  },
  open(){
       let msg ={
        "authcode": app.globalData.authCode,
        "timestamp": Date.parse(new Date()),
        "keepTime": "3600",
        "deviceId":app.globalData.deviceId,
        "boxId":app.globalData.boxId,
        "cmd":300,//补货开门
      }; 
      my.sendSocketMessage({
      data: JSON.stringify(msg)
      });
  },
  detail(e){
    console.log("准备进入补货订单明细页面====",e);
    var id = e.currentTarget.dataset.replenishId;
    my.navigateTo({
      url: `/pages/replenish-detail/replenish-detail?supplyId=`+id,
    });
  },
  toIndex() {
    my.reLaunch({
      url: '/pages/index/index', // 页面路径。如果页面不为 tabbar 页面则路径后可以带参数。参数规则如下：路径与参数之间使用
    });
  }
});
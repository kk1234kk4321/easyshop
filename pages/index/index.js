const app = getApp();

Page({
  
  onLoad() {


  },

  toMyinfo(e){
      my.navigateTo({
      url: `/pages/myinfo/myinfo`,
    });
  },
  
  toOrder(e){
      my.navigateTo({
      url: `/pages/add-order/add-order`,
    });
  },
  
  toReplenish(e){
      my.navigateTo({
      url: `/pages/add-replenish/add-replenish`,
    });
  },

    toWebSocket(e){
      var date ={
        "authcode": app.globalData.authCode,
        "timestamp": Date.parse(new Date()),
        "keepTime": "3600",
        "deviceId":app.globalData.deviceId,
        "boxId":app.globalData.boxId,
        "cmd":200,//购物开门
      }; 
      var str = JSON.stringify(date); 
      my.sendSocketMessage({
      data: str
      });

  }





});

const app = getApp();
var resultList=require("../add-replenish/replenish-data.js");
Page({
  onLoad() {
    this.setData({
        array:resultList.result
    });
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
  }
});
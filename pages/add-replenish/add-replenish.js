const app = getApp();
var resultList=require("../add-replenish/replenish-data.js");
Page({
  onLoad() {
    this.setData({
        array:resultList.result
    });
  },
  open(){
      alert("补货员补货开门！");
  }
});
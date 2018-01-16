const app = getApp();
var resultList=require("../add-order/order-data.js");
Page({
  onLoad() {
    this.setData({
        array:resultList.result
    });
   my.setNavigationBar({
     title:'订单列表'
    });
  },
  backOrker(event){
    var data = event.target.dataset;
    my.navigateTo({
      url: '/pages/back-order/back-order?id='+data.id+'&name='+data.name+
            '&count='+data.count+'&unitPrice='+data.unitPrice+
            '&totalPrice='+data.totalPrice+'&currCount='+data.count+
            '&currPrice='+data.totalPrice+'&orderId='+data.orderId,
    });
  }
});
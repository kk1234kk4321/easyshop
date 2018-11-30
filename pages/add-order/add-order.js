const app = getApp();
var resultList=require("../add-order/order-data.js");
Page({
  onLoad() {
     console.log("app.globalData.userId===>",app.globalData.userId);
     var that = this;
     my.httpRequest({  
        url: 'http://erp.zhangyuanzhineng.com:8080/erpLife/out/userSalesQuery.do',
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
  },
  toIndex(){
    my.reLaunch({
      url: '/pages/index/index', // 页面路径。如果页面不为 tabbar 页面则路径后可以带参数。参数规则如下：路径与参数之间使用
    });
  }
});
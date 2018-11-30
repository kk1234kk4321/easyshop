const app = getApp();

Page({
  data: {
    userId:app.globalData.userId
  },
  onLoad() {   
    this.setData({
      userId:app.globalData.userId
      // userId:'1231546113565123'
    });
    app.getUserInfo().then(
      user => this.setData({
        user,
      }),
    );
    console.log("user===>",this.data)
    
  },

  toOrder(e){
      my.navigateTo({
      url: `/pages/add-order/add-order`,
    });
  },
  copyCode(e){
    my.setClipboard({
      text: this.data.userId, // 剪贴板数据
      success: (res) => {
        my.getClipboard({
          success: (res) => {
            my.alert({
              title: '复制成功' 
            });
          console.log("userid",res.text)
          },
        });
      },
    });
  },
  toIndex() {
    my.reLaunch({
      url: '/pages/index/index', // 页面路径。如果页面不为 tabbar 页面则路径后可以带参数。参数规则如下：路径与参数之间使用
    });
  }
});

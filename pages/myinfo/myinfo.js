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
  }
});

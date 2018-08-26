const app = getApp();

Page({
  data: {
    userId:app.globalData.userId
  },
  onLoad() {   
    this.setData({
      userId:app.globalData.userId
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
});

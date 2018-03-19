const app = getApp();

Page({
  data: {},
  onLoad() {   

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

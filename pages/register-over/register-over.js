const app = getApp();
Page({
  data: {
    status:0
  },
  onLoad(res) {
    this.setData({
      status:res.status
    })
  },
});

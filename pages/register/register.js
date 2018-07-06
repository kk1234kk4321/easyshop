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
  //重新注册
  reRegister(e){
    let msg = {
      "cmd":121,
      "authcode": app.globalData.authCode,
      "userid":app.globalData.userId,
      "isRepeat":1
    }
    my.sendSocketMessage({
      data: JSON.stringify(msg),
      success: (res) => {
          console.log("重新注册请求发送成功===>",res);
          my.navigateTo({
            url: 'pages/index/index',
          });
      },
      fail:(res)=>{
        console.log("重新注册请求发送失败===>",res)
      }
    });
  }
});

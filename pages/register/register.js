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
      "cmd":122,
      "authcode": app.globalData.authCode,
      "userid":app.globalData.userId,
      "deviceId":app.globalData.deviceId
    }
    console.log("发送cmd122|掌静脉重新注册:",msg);
    my.sendSocketMessage({
      data: JSON.stringify(msg),
      success: (res) => {
        console.log("send cmd122 success");
        //调到注册中页面
        my.navigateTo({
            url: '/pages/registering/registering',
        });
      },
      fail:(res)=>{
        console.log("send cmd122 fail",res)
      }
    });
  }
});

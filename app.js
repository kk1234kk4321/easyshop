App({
  onLaunch(options) {
    //my.alert({content: '启动参数：'+JSON.stringify(options.query)});
    console.log('启动参数:App Launch', options);
    if(options.query){
      my.alert({content: '启动参数：'+JSON.stringify(options.query.x)});
    }
    console.log('getSystemInfoSync', my.getSystemInfoSync());
    console.log('SDKVersion', my.SDKVersion);


    my.connectSocket({
      url: 'ws://localhost:8080/WebsocketHome/actions', // 开发者服务器接口地址，必须是 wss 协议，且域名必须是后台配置的合法域名
    })

    my.onSocketClose((res) => {
      my.alert({ content: '服务器通信异常！' });
    });

    my.onSocketOpen((res) => {
      console.log("连接已经打开");
    });

    my.onSocketError(function (res) {
      my.alert({content:'服务器连接失败！' + res});
    });

    my.onSocketMessage((res) => {
      var data = JSON.parse(res.data);
      if (data.cmd == undefined) {
        return;
        my.alert({ content: '收到数据！' + res.data });

      }
      switch (data.cmd) {
        case 100://免密授权
          my.paySignCenter({
            signStr: data.signStr,
            success: (res) => {

            },
            fail: (res) => {
              
            }
          });
          break;
        case 2:

          break;
        default:

      }
    });


    my.getAuthCode({
      scopes: 'auth_base', // 主动授权（弹框）：auth_user，静默授权（不弹框）：auth_base
      success: (res) => {
        var data = {
          "auth_code": res.authCode,
          "deviceId": this.globalData.deviceId,
          "boxId": this.globalData.boxId,
          "cmd": 100 //扫码进入小程序，传递auth_code
        }
        this.globalData.authCode =  res.authCode;
        my.sendSocketMessage({
          data: JSON.stringify(data)
        });
      },
    });
  },

  onShow() {
    console.log('App Show');
  },
  onHide() {
    console.log('App Hide');
  },

  globalData: {
    authCode: "",
    deviceId:1000086,
    boxId:1
  },
  userInfo: null,

  getUserInfo() {
    return new Promise((resolve, reject) => {
      if (this.userInfo) resolve(this.userInfo);
          my.getAuthUserInfo({
            success: (res) => {
              this.userInfo = res;
              resolve(this.userInfo);
            },
            fail: () => {
              reject({});
            },
          });
    });
  },


});

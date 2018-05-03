App({
  
  onLaunch(options) {
    //my.alert({content: '启动参数：'+JSON.stringify(options.query)});
    //console.log('启动参数:App Launch', options);
    // if(options.query){
    //   my.alert({content: '启动参数：'+JSON.stringify(options.query.x)});
    // }
    console.log('getSystemInfoSync', my.getSystemInfoSync());
    console.log('SDKVersion', my.SDKVersion);

    my.connectSocket({
      //url: 'ws://localhost:8080/WebsocketHome/actions', // 开发者服务器接口地址，必须是 wss 协议，且域名必须是后台配置的合法域名
      url: 'ws://222.186.101.234:8090/erpLife/socket/websocket'
    })

  },


  onShow() {
    my.onSocketClose((res) => {
      my.alert({ content: '服务器通信异常！' });
    });

    my.onSocketOpen((res) => {
      console.log("连接已经打开");
    });

    my.onSocketError(function (res) {
      my.alert({ content: '服务器连接失败！' + res });
    });

  },
  onHide() {
    console.log('App Hide');
  },

  globalData: {
    authCode: "",
    deviceId:99872212,
    boxId:1,
    userId:"",
    userType:2,
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

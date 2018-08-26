App({
  
  onLaunch(options) {//2017120700423854
    //my.alert({content: '启动参数：'+JSON.stringify(options.query)});
    console.log('启动参数:App Launch', options);
     if(options.query){
        if(options.query.deviceId){
        this.globalData.deviceId = options.query.deviceId;
        }
        if(options.query.openType){
          this.globalData.openType = options.query.openType;
        }
        console.log("参数deviceId",this.globalData.deviceId);
        console.log("参数openType",this.globalData.openType);
     }
    console.log('getSystemInfoSync', my.getSystemInfoSync());
    console.log('SDKVersion', my.SDKVersion);

    my.connectSocket({
      //url: 'ws://localhost:8080/WebsocketHome/actions', // 开发者服务器接口地址，必须是 wss 协议，且域名必须是后台配置的合法域名
      //url: 'ws://222.186.101.234:8090/erpLife/socket/websocket'
      url: 'ws://erp.zhangyuanzhineng.com:8080/erpLife/socket/websocket'
    })

  },


  onShow() {
    my.onSocketClose((res) => {
      my.alert({ content: '服务器通信异常！' });
    });

    my.onSocketOpen((res) => {
      console.log("连接已经打开",res);

      my.getAuthCode({
      scopes: 'auth_base',
      success: (res) => {
        let msg = {
          "authcode": res.authCode,
          "deviceId": this.globalData.deviceId,
          "boxId": this.globalData.boxId,
          "cmd": 100 //扫码进入小程序，传递auth_code
        }
        this.globalData.authCode = res.authCode;
        console.log("发送cmd100|扫码",msg);
        my.sendSocketMessage({
          data: JSON.stringify(msg),
          success: (res) => {
              console.log("send cmd100 success");
          },
          fail:(res) => {
            console.log("send cmd100 fail",res);
          }
        });
      },
    });
    
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
    deviceId:"",//99872212,
    boxId:1,
    userId:"",//"2088902710839148",//"2088112422848101",
    userType:0,
    openType:''//"palm"
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

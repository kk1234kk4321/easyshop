const app = getApp();

Page({

   data: {
    userType: app.globalData.userType
  },
  
  dd: function (signstr) {
    my.paySignCenter({
      signStr: signstr,
      success: (res) => {
        let o = JSON.parse(res.result);
        console.log("@@@@@@@@@@@" + o.sign_time);
        let msg = {
          "cmd": 102,
          "authcode": app.globalData.authCode,
          "agreement_no": o.alipay_user_agreement_page_sign_response.agreement_no,
          "sign_time": o.sign_time,
        }
        my.sendSocketMessage({
          data: JSON.stringify(msg)
        });

      },
      fail: (res) => {
        let msg = {
          "cmd": 104,
          "authcode": app.globalData.authCode,
        }
        my.sendSocketMessage({
          data: JSON.stringify(msg)
        });
      }
    });

  },

  onLoad() {
    console.log("app.globalData.userType===>",app.globalData.userType),
    my.getAuthCode({
      scopes: 'auth_base',
      success: (res) => {
        let msg = {
          "authcode": res.authCode,
          "deviceId": app.globalData.deviceId,
          "boxId": app.globalData.boxId,
          "cmd": 100 //扫码进入小程序，传递auth_code
        }
        console.log("res.authCode===>",res.authCode);
        app.globalData.authCode = res.authCode;
        my.sendSocketMessage({
          data: JSON.stringify(msg),
          success: (res) => {
              //my.alert({content: '数据发送！' + msg});
              console.log("数据发送！",msg);
          },
          fail:(res) => {
            console.log("数据发送失败原因",res);
          }
        });
      },
    });

  },

  onReady() {
    var that = this;
    my.onSocketMessage((res) => {
      console.log("连接数据：onSocketMessage====>",res.data);
      var resdata = JSON.parse(res.data);
      console.log("收到服务器内容：",resdata);
      if (resdata.cmd == undefined) {
        return;
        my.alert({ content: '收到数据！' + res.data });
      }
      switch (resdata.cmd) {
        case 101://未签约免密授权          
          app.globalData.userId = resdata.userid;
          app.globalData.userType = resdata.userType;
          this.dd(resdata.signstr);
          break;
        case 110://已签约
          app.globalData.userId = resdata.userid;
          app.globalData.userType = resdata.userType;
          that.setData({
            userType: resdata.userType
          })  
          console.log("已签约userid：",app.globalData.userId);
          break;
        case 201://购物开门成功
         // my.alert({ content: 'door is open' });
          my.navigateTo({
            url: 'pages/open-over/open-over?status='+resdata.status+'&cmd=201',
          });
          break;
        case 301://补货开门成功
          //my.alert({ content: 'door is open' });
          my.navigateTo({
            url: 'pages/open-over/open-over?status='+resdata.status+'&cmd=301',
          });
          break;
        case 210://购物关门成功
          my.navigateTo({
            url: '/pages/shopping-over/shopping-over?status='+resdata.status,
          });
          break;
        case 310://补货关门成功
          my.navigateTo({
            url: '/pages/replenish-over/replenish-over?status='+resdata.status,
          });
          break;
        default:

      }
    });


    // var data = {
    //   "cmd": 101,
    //   "signstr": "alipay_sdk%3Dalipay-sdk-java-dynamicVersionNo%26app_id%3D2017120700423854%26biz_content%3D%257B%2522product_code%2522%253A%2522GENERAL_WITHHOLDING%2522%252C%2522personal_product_code%2522%253A%2522GENERAL_WITHHOLDING_P%2522%252C%2522sign_scene%2522%253A%2522INDUSTRY%257CCARRENTAL%2522%252C%2522third_party_type%2522%253A%2522PARTNER%2522%252C%2522access_params%2522%253A%257B%2522channel%2522%253A%2522ALIPAYAPP%2522%257D%257D%26charset%3DUTF-8%26format%3Djson%26method%3Dalipay.user.agreement.page.sign%26sign%3DDx7bsUwIsUJnxxBW%252BLmeKetPuGJ4w4BKTBhza7mswP3sqJwsxgD4S5CqTDpg1fxNiIiOkQ0sOkJ224takrPInGosIf3z3JzpwLkUZs%252FZAP3rxO9WOZW0luWGKdNa74RKYXleCrpknD040rdzwWE714fJyrAe%252FYDFxvvHCAGmjpyREMWQI%252BTwkenn0rcTxbKU%252Fd4HgbMm7qGPt%252BKua85uYldE5N4PSo49F2jmWIDl7cik32IyAZLgYOidCnJww0q3TBlmmv9LDJc13I2myJJddl1HS0UaXjfEx2sNgesDKBGCVumcdWtbz9ibC4wFdLo19aAFwp%252F5iTClUDVZ%252Fe%252BUPg%253D%253D%26sign_type%3DRSA2%26timestamp%3D2018-03-17%2B14%253A24%253A04%26version%3D1.0"
    // }

    // my.paySignCenter({
    //   signStr: data.signstr,
    //   success: (res) => {
    //     let o = JSON.parse(res.result);
    //     let msg = {
    //       "cmd": 102,
    //       "authcode": app.globalData.authCode,
    //       "agreement_no": o.alipay_user_agreement_page_sign_response.agreement_no,
    //       "sign_time": o.sign_time,
    //     }
    //     my.sendSocketMessage({
    //       data: JSON.stringify(msg)
    //     });

    //   },
    //   fail: (res) => {
    //     let msg = {
    //       "cmd": 104,
    //       "authcode": app.globalData.authCode,
    //     }
    //     my.sendSocketMessage({
    //       data: JSON.stringify(msg)
    //     });
    //   }
    // });


  },

  toMyinfo(e) {
    my.navigateTo({
      url: `/pages/myinfo/myinfo`,
    });
  },

  toOrder(e) {
    my.navigateTo({
      url: `/pages/add-order/add-order`,
    });
  },

  toReplenish(e) {
    my.navigateTo({
      url: `/pages/add-replenish/add-replenish`,
    });
  },

  toWebSocket(e) {
    let msg = {
      "authcode": app.globalData.authCode,
      "timestamp": Date.parse(new Date()),
      "keepTime": "3600",
      "deviceId": app.globalData.deviceId,
      "boxId": app.globalData.boxId,
      "cmd": 200,//购物开门
    };
    my.sendSocketMessage({
      data: JSON.stringify(msg)
    });

  },





});

const app = getApp();
Page({
    /*data:{
        status:0
    },*/
    onLoad(res) {
        console.log(res);
        this.setData({
            status:res.status
        })
    },
    view(){
        my.navigateTo({
            url: `/pages/add-order/add-order`,
        });
    }
})
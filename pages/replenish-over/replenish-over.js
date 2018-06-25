const app = getApp();
Page({
    onLoad(res) {
        this.setData({
            status:res.status
        })
    },
    view(){
        my.navigateTo({
            url: `/pages/add-replenish/add-replenish`,
        });
    }
})
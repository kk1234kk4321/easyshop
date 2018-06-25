Page({
    /*data:({
        cmd:301,
        status:1
    }),*/
     onLoad(res) {
        this.setData({
            status:res.status,
            cmd:res.cmd
        })
    },
})

Page({

  toMyinfo(e){
      my.navigateTo({
      url: `/pages/myinfo/myinfo`,
    });
  },
  
  toOrder(e){
      my.navigateTo({
      url: `/pages/add-order/add-order`,
    });
  },
  
  toReplenish(e){
      my.navigateTo({
      url: `/pages/add-replenish/add-replenish`,
    });
  }



});

const app = getApp();
Page({
  data: {
    showMorePaymentFlg: !1,
    showMoreTeamBuyFlg: !1,
    showMoreServiceFlg: !1,
    showMoreCouponFlg: !1,
    storeInfo: {
      imgUrl: "http://www.tzi.cn/upfile/2012/10715591cf-153f-4b59-895b-5e99a3f55ccc.jpg",
      storeLogo: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513702994137&di=fc2833a144dd94f85fdb141d09d51b6f&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fcaef76094b36acaf2f8bc9db77d98d1001e99ca9.jpg",
      storeName: "新秀丽人中成至谷店新秀丽人中成至谷店新秀丽人中成至谷店",
      price: 90,
      storeAddress: "上海市宝山区长江路中成智谷258号上海市宝山区长江路中成智谷258号"
    },
    buyInfo: [{
      title: "满100元减5元",
      date: "周四、周五0:00～23:59",
      usable: !0
    }, {
      title: "满100元减5元",
      date: "周四、周五0:00～23:59"
    }, {
      title: "满100元减5元",
      date: "周四、周五0:00～23:59"
    }],
    teamBuyList: [],
    cardList: [],
    serviceList: [],
    employeePoi: {},
    employeeIds: [],
    couponList: [],
    storeBaseInfo: {},
    storePoiSwitchList: {},
    merchantCoupon: {},
    serviceDisplayName: "",
    serviceBtnText: "",
    loaded: !1,
    showPop: !1,
    shareImg: "",
    incount: 0,
    menuState: {
      show: !0,
      title: "",
      current: "index"
    },
    isShowContact: !1
  },
  onLoad: function (options) {
    setTimeout(()=>{
      this.setData({
        loaded: !0,
      });
    },2000)
  },
  onShow: function () {
  
  },
  showSharePop: function () {
    this.setData({
      showPop: !0
    });
  },
  hideSharePop: function () {
    this.setData({
      showPop: !1
    });
  }
})
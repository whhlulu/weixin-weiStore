function e(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

var o = e(require("./common/http/request")), t = e(require("./common/auth/auth")), r = (e(require("./common/rprm/rprm_init")),
  e(require("./store/store"))), n = e(require("./common/http/base"));

App({
  onLaunch: function (e) {
    if (console.log(e), e) {
      var o = e.scene || null;
      wx.setStorageSync("scene", o);
    }
    var t = this, n = wx.getStorageSync("storeId");
    r.default.commit({
      storeId: n || 0
    }), wx.getSystemInfo({
      success: function (e) {
        t.globalData.isIpx = e.model.indexOf("iPhone X") >= 0 || e.model.indexOf("iphone X") >= 0,
          r.default.commit({
            isIpx: t.globalData.isIpx
          });
        var o = e.SDKVersion;
        o = o.replace(/\./g, ""), console.log(o), parseInt(o) < 164 && wx.reLaunch({
          url: "/pages/error/versionError"
        });
      }
    });
  },
  globalData: {
    isIpx: !1,
    userInfo: {}
  },
  request: o.default,
  auth: t.default,
  store: r.default,
  onShow: function () {
    n.default.initData();
  },
  onLoad: function () { }
});
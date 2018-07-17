function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var s = arguments[e];
        for (var a in s) Object.prototype.hasOwnProperty.call(s, a) && (t[a] = s[a]);
    }
    return t;
}, s = t(require("../../utils/basePage")), a = t(require("../../store/store")), i = require("./api/storeList");

(0, t(require("../../utils/extendPage")).default)(e({}, s.default, {
    data: e({}, s.default.baseData, a.default.mapState(), {
        showDialog: !1,
        cities: [],
        currentCity: "",
        storeList: [],
        from: "",
        storeId: 0
    }),
    onLoad: function(t) {
        console.log(wx.getStorageSync("storeId")), this.setData({
            from: t.from || ""
        }), this.setNavMenu("门店列表");
    },
    onShow: function() {
        this.setData({
            storeId: wx.getStorageSync("storeId")
        }), this.getCityList(), this.getStoreList(this.data.state.storeBaseInfo ? this.data.state.storeBaseInfo.city : "");
    },
    showDialog: function() {
        this.setData({
            showDialog: !0
        });
    },
    cityChange: function(t) {
        this.setData({
            showDialog: !1
        }), this.getStoreList(t.detail);
    },
    getCityList: function() {
        var t = this, e = {
            data: {}
        };
        this.simpleRequest(i.getCityList, e).then(function(e) {
            t.setData({
                cities: e.cityList
            });
        });
    },
    getStoreList: function(t) {
        var e = this, s = {
            data: {
                city: t = t ? "string" == typeof t ? t : t.city : ""
            }
        };
        this.setData({
            currentCity: t
        }), this.pageRequest(i.getStoreList, s).then(function(t) {
            e.setData({
                storeList: t.stores
            });
        });
    },
    changeStore: function(t) {
        var e = t.currentTarget.dataset.detail;
        wx.setStorageSync("storeId", e.storeId), this.data.from || 1 == getCurrentPages().length ? this.jumpUrl("/pages/index/index") : wx.navigateBack();
    }
}));
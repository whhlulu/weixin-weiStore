function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var r = Object.assign || function(e) {
    for (var r = 1; r < arguments.length; r++) {
        var t = arguments[r];
        for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
    }
    return e;
}, t = e(require("../../../utils/basePage")), a = e(require("../../../store/store")), o = require("../api/api");

(0, e(require("../../../utils/extendPage")).default)(r({}, t.default, {
    data: r({}, t.default.baseData, a.default.mapState(), {
        orderNo: "",
        orderInfo: {},
        refundInfo: {}
    }),
    onLoad: function(e) {
        this.setData({
            orderNo: e.orderNo
        });
    },
    onShow: function() {
        var e = this;
        this.setNavMenu("申请退款", "", !1);
        var r = {
            data: {
                orderNo: this.data.orderNo
            }
        };
        this.pageRequest(o.getOrderCardRefoundMessage, r).then(function(r) {
            e.setData({
                orderInfo: {
                    imgUrl: r.picUrl,
                    name: r.productName,
                    salePrice: r.salePrice,
                    marketPrice: r.originalPrice
                },
                refundInfo: r
            });
        });
    },
    confirmRefund: function() {
        var e = this;
        wx.rprm.rec({
            elementid: "confirmRefund",
            eventtype: "tap",
            orderType: "41",
            orderStatus: 1,
            orderSubType: this.data.refundInfo.productType,
            payStatus: 1,
            serviceId: this.data.refundInfo.productId
        });
        var r = {
            data: {
                orderNo: this.data.orderNo
            }
        };
        this.simpleRequest(o.applyOrderCardRefound, r, {}, !1).then(function(r) {
            wx.redirectTo({
                url: "/pages/order/detail/card?orderNo=" + e.data.orderNo
            });
        });
    }
}));
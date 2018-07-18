function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (e[n] = a[n]);
    }
    return e;
}, a = e(require("../../../utils/basePage")), n = e(require("../../../store/store")), i = require("../api/api"), r = require("../../payment/api/api");

(0, e(require("../../../utils/extendPage")).default)(t({}, a.default, {
    data: t({}, a.default.baseData, n.default.mapState(), {
        payInfo: {
            duePrice: 0,
            discount: 0,
            shipDiscount: 0,
            couponDiscount: 0,
            pointDiscount: 0,
            balanceDiscount: 0,
            cashDiscount: 0,
            realPay: 0
        },
        orderInfo: {},
        orderDetailInfo: {},
        interval: null,
        isShowPayBtn: !0
    }),
    onLoad: function(e) {
        this.setData({
            orderNo: e.orderNo
        }), this.getOrderDetail(e.orderNo);
    },
    onHide: function() {
        clearInterval(this.data.interval);
    },
    onUnload: function() {
        clearInterval(this.data.interval);
    },
    getOrderDetail: function(e) {
        var t = this, a = {
            data: {
                orderNo: e
            }
        };
        this.pageRequest(i.getStorePayOrderDetail, a).then(function(e) {
            var a = e;
            t.setData({
                orderDetailInfo: a,
                payInfo: {
                    duePrice: a.totalAmount,
                    discount: a.marketDiscountAmount || 0,
                    shipDiscount: a.vipDiscount || 0,
                    couponDiscount: a.couponDiscount || 0,
                    pointDiscount: a.pointDiscount || 0,
                    balanceDiscount: a.balanceAmount || 0,
                    realPay: a.payAmount
                },
                orderInfo: {
                    orderNumber: a.orderNo,
                    orderTime: a.orderTime,
                    payTime: a.payTime,
                    payStore: a.storeName
                }
            }), t.setNavMenu("订单详情", "order_detail", {
                orderType: 4,
                payStatus: e.payStatus
            }), 1e3 * e.seconds >= 1e3 && t.timer(1e3 * e.seconds);
        });
    },
    cancelOrder: function() {
        var e = this, t = this.data.orderNo;
        this.simpleRequest(r.fetchCancelOrder, {
            data: {
                orderNo: t,
                operatorType: 1,
                isDelete: 0
            }
        }).then(function(a) {
            e.toast("取消成功"), e.getOrderDetail(t);
        });
    },
    timer: function(e) {
        var t = this;
        if (e > 0) {
            this.calculateTime(e), this.data.interval && clearInterval(this.data.interval);
            var a = setInterval(function() {
                e >= 1e3 ? (e -= 1e3, t.calculateTime(e)) : clearInterval(a);
            }, 1e3);
            this.setData({
                interval: a
            });
        } else this.setData({
            isShowPayBtn: !1
        }), this.getOrderDetail(this.data.orderNo);
    },
    continuePay: function() {
        function e(a) {
            t.simpleRequest(r.getOrderPayStatus, {
                data: {
                    orderNo: a
                }
            }).then(function(n) {
                3 == n.payStatus ? setTimeout(function() {
                    e(a);
                }, 3e3) : t.getOrderDetail(a);
            });
        }
        var t = this, a = this.data.orderDetailInfo, n = a.orderNo, o = a.storeId, s = this.getSessionInfo("openid"), u = this.getSessionInfo("appid");
        this.simpleRequest(i.fetchContinueStorePay, {
            data: {
                orderNo: n,
                storeId: o,
                userOpenId: s,
                appId: u
            }
        }).then(function(a) {
            var n = a.wexinAppId, i = a.wexinTimeStamp, r = a.wexinNonceStr, o = a.wexinPayPackage, s = a.wexinSignType, u = a.wexinPaySign, d = a.orderNo, c = {
                timeStamp: i,
                appId: n,
                nonceStr: r,
                package: o,
                signType: s,
                paySign: u
            };
            c.success = function() {
                t.showLoading(), e(d);
            }, c.fail = function(e) {}, wx.requestPayment(c);
        });
    }
}));
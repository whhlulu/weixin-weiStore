function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (e[o] = a[o]);
    }
    return e;
}, a = e(require("../../../utils/basePage")), o = e(require("../../../store/store")), r = (e(require("../../../utils/util")), 
e(require("../../../common/lib/moment"))), n = require("../api/api"), i = null, s = null, d = null;

(0, e(require("../../../utils/extendPage")).default)(t({}, a.default, {
    data: t({}, a.default.baseData, o.default.mapState(), {
        orderNo: "",
        orderCode: "",
        orderDetail: {},
        stores: "",
        storeId: "",
        isShow: !0,
        loaded: !1,
        payLeftTime: "",
        storeInfo: {
            name: ""
        },
        goodsInfo: {
            name: "",
            cnt: 0,
            price: 0,
            imgUrl: ""
        },
        goodsComboVos: [],
        reservedInfo: [],
        goodsSkuVo: {},
        payInfo: {
            duePrice: "0",
            discount: "0",
            shipDiscount: "0",
            couponDiscount: "0",
            pointDiscount: "0",
            balanceDiscount: "0",
            realPay: "0",
            payStatus: 0,
            orderStatus: 0
        },
        orderInfo: {
            orderNumber: "",
            orderTime: "",
            payTime: "",
            payMethod: "",
            orderType: ""
        },
        canCancel: !1
    }),
    onShow: function() {
        this.getServiceOrderDetail();
    },
    onLoad: function(e) {
        this.setData({
            orderNo: e.orderNo
        });
    },
    toPoiPage: function(e) {
        wx.setStorageSync("storeId", this.data.storeId), this.jumpUrl("/pages/index/index");
    },
    cancelOrder: function() {
        var e = this;
        wx.rprm.rec({
            elementid: "cancelPay",
            eventtype: "tap",
            orderType: this.data.orderDetail.orderType,
            orderSubType: this.data.orderDetail.orderSubType,
            orderStatus: this.data.orderDetail.orderStatus,
            payStatus: this.data.orderDetail.payStatus
        });
        var t = {
            data: {
                orderNo: this.data.orderNo
            }
        };
        this.simpleRequest(n.cancelOrderCardPay, t).then(function(t) {
            e.toast("取消成功"), e.getServiceOrderDetail();
        });
    },
    getServiceOrderDetail: function() {
        var e = this, t = "", a = {
            data: {
                orderNo: this.data.orderNo
            }
        };
        this.pageRequest(n.getCycleOrderDetail, a).then(function(a) {
            e.setNavMenu("我的订单", "orderDetail", {
                orderType: a.orderType,
                orderSubType: a.orderSubType,
                orderStatus: a.orderStatus,
                payStatus: a.payStatus
            }, "", !1);
            var o = [ {
                name: 1 == a.orderSubType ? "预约人" : "联系人",
                content: a.contactName || ""
            }, {
                name: "手机号码",
                content: a.contactPhone || ""
            }, {
                name: "订单备注",
                content: a.userComment || ""
            } ];
            2 == a.orderSubType && 0 == a.payStatus && (a.paidTimeDeadline ? e.countDown(a.paidTimeDeadline) : e.setData({
                isShow: !1
            })), 0 != a.payStatus && 2 == a.orderSubType && (t = "线上支付"), 1 == a.orderSubType && (t = "线下支付"), 
            1 != a.orderSubType && 0 == a.payStatus && (t = ""), e.setData({
                loaded: !0,
                orderDetail: a,
                storeId: a.storeId,
                storeInfo: {
                    name: a.storeName,
                    bookingTime: a.bookingTime,
                    bookingPersons: a.bookingPersons
                },
                orderInfo: {
                    orderNumber: a.orderNo,
                    orderTime: a.createTime,
                    payTime: 0 == a.payStatus ? "" : a.paidTime,
                    payMethod: t,
                    orderType: a.orderType
                },
                payInfo: {
                    duePrice: a.totalAmount,
                    discount: a.discountAmount,
                    shipDiscount: a.memberCardDiscountAmount,
                    couponDiscount: a.cardAmount,
                    pointDiscount: a.pointAmount,
                    balanceDiscount: a.balanceAmount,
                    realPay: a.paidAmount,
                    payStatus: a.payStatus,
                    orderSubType: a.orderSubType
                },
                goodsInfo: {
                    name: a.productInfos[0].goodsName,
                    cnt: a.productInfos[0].number,
                    price: a.productInfos[0].price,
                    imgUrl: a.productInfos[0].menuExtInfo,
                    totalAmount: a.totalAmount,
                    payStatus: a.payStatus
                },
                goodsSkuVo: a.productInfos[0].goodsSkuVo,
                goodsComboVos: a.productInfos[0].goodsComboVos,
                reservedInfo: o
            });
            var n = (0, r.default)(a.bookingTime).diff((0, r.default)(), "minute") > 120;
            e.setData({
                canCancel: n || a.orderStatus < 1
            }), a.orderStatus < 2 ? i = setTimeout(function() {
                e.getServiceOrderDetail();
            }, 1e4) : (clearTimeout(i), i = null);
        });
    },
    onHide: function() {
        i && clearTimeout(i), s && clearInterval(s), d && clearTimeout(d);
    },
    onUnload: function() {
        i && clearTimeout(i), s && clearInterval(s), d && clearTimeout(d);
    },
    countDown: function(e) {
        var t = this;
        console.log(e), e > 0 ? (this.calculateTime(e), s && clearInterval(s), s = setInterval(function() {
            e >= 1e3 ? (e -= 1e3, t.calculateTime(e)) : (clearInterval(s), t.setData({
                isShow: !1
            }));
        }, 1e3)) : this.setData({
            isShow: !1
        });
    },
    goPay: function() {
        var e = this;
        wx.rprm.rec({
            elementid: "pay",
            eventtype: "tap",
            orderType: this.data.orderDetail.orderType,
            orderSubType: this.data.orderDetail.orderSubType,
            orderStatus: this.data.orderDetail.orderStatus,
            payStatus: this.data.orderDetail.payStatus
        });
        var t = {
            data: {
                orderNo: this.data.orderNo,
                openId: this.getSessionInfo("openid"),
                appId: this.getSessionInfo("appid")
            }
        };
        this.simpleRequest(n.fetchOrderCardPay, t).then(function(t) {
            e.setData({
                payInfo: t.payVo
            }), 0 == t.payVo.status ? e.wxPay() : e.toast(t.payVo.errorMessage);
        });
    },
    selectPaySataus: function(e, t) {
        var a = this;
        t.simpleRequest(n.getCardOrderPayResult, {
            data: {
                orderNo: e
            }
        }, {}, !1).then(function(o) {
            3 == o.payStatus ? d = setTimeout(function() {
                t.selectPaySataus(e, t);
            }, 3e3) : (t.hideLoading(), t.jumpUrl("/pages/order/detail/service?orderNo=" + a.data.orderNo));
        });
    },
    wxPay: function() {
        var e = this, t = this.data.orderNo, a = {
            timeStamp: this.data.payInfo.timestamp,
            nonceStr: this.data.payInfo.nonceStr,
            package: this.data.payInfo.packageData,
            signType: this.data.payInfo.signType,
            paySign: this.data.payInfo.paySign,
            success: function(a) {
                e.showLoading(), e.selectPaySataus(t, e);
            },
            fail: function(e) {},
            complete: function(t) {
                if (t.errMsg.indexOf("cancel") > 0) e.data.orderNo;
            }
        };
        wx.requestPayment(a);
    }
}));
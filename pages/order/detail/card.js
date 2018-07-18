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
require("../api/api")), i = e(require("../../../utils/extendPage")), n = require("../../../common/lib/moment"), s = null, d = null, u = null, l = null;

(0, i.default)(t({}, a.default, {
    data: t({}, a.default.baseData, o.default.mapState(), {
        storeInfo: {},
        goodsInfo: {},
        reservedInfo: [],
        payInfoDetail: {
            duePrice: 0,
            discount: 0,
            shipDiscount: 0,
            couponDiscount: 0,
            pointDiscount: 0,
            balanceDiscount: 0,
            realPay: 0,
            payStatus: 0
        },
        orderInfo: {},
        orderDetail: {},
        beautyCards: [],
        orderNo: "",
        showQrCodeOption: {},
        payInfo: {},
        isShow: !0,
        storesNum: 0
    }),
    onLoad: function(e) {
        e.orderNo && this.setData({
            orderNo: e.orderNo
        });
    },
    onHide: function() {
        l && clearInterval(l), d && clearTimeout(d), u && clearTimeout(u), s && clearTimeout(s);
    },
    onUnload: function() {
        l && clearInterval(l), d && clearTimeout(d), u && clearTimeout(u), s && clearTimeout(s);
    },
    onShow: function() {
        this.getOrderDetail();
    },
    getOrderDetail: function() {
        var e = this, t = {
            data: {
                orderNo: this.data.orderNo
            }
        };
        this.pageRequest(r.getCycleOrderDetail, t).then(function(t) {
            var a = [ {
                name: "联系人",
                content: t.contactName || ""
            }, {
                name: "手机号码",
                content: t.contactPhone || ""
            } ];
            t.userComment && a.push({
                name: "订单备注",
                content: t.userComment
            }), 0 == t.orderStatus && 0 == t.payStatus && t.paidTimeDeadline ? e.countDown(t.paidTimeDeadline) : e.setData({
                isShow: !1
            }), e.setData({
                orderDetail: t,
                storeInfo: {
                    name: t.storeName
                },
                orderInfo: {
                    orderNumber: t.orderNo,
                    orderTime: t.createTime,
                    payTime: 0 != t.payStatus ? t.paidTime : "",
                    payMethod: 0 != t.payStatus ? "线上支付" : ""
                },
                payInfoDetail: {
                    duePrice: t.totalAmount,
                    discount: t.discountAmount,
                    shipDiscount: t.memberCardDiscountAmount,
                    couponDiscount: t.cardAmount,
                    pointDiscount: t.pointAmount,
                    balanceDiscount: t.balanceAmount,
                    realPay: t.paidAmount,
                    payStatus: t.payStatus
                },
                goodsInfo: {
                    name: t.productInfos[0].goodsName,
                    cnt: t.productInfos[0].number,
                    price: t.productInfos[0].totalPrice,
                    imgUrl: t.productInfos[0].menuExtInfo
                },
                reservedInfo: a,
                beautyCards: t.beautyCardVOList,
                paidTimeDeadline: t.paidTimeDeadline,
                storesNum: t.applyStoreNamesList ? t.applyStoreNamesList.length : 0
            }), 1 == t.orderStatus ? s = setTimeout(function() {
                e.getOrderDetail();
            }, 1e4) : (clearTimeout(s), s = null), e.setNavMenu("订单详情", "orderDetail", {
                orderType: "41",
                orderSubType: e.data.orderDetail.orderSubType,
                orderStatus: e.data.orderDetail.orderStatus,
                payStatus: e.data.orderDetail.payStatus,
                serviceId: e.data.orderDetail.productInfos[0].goodsId
            });
        });
    },
    countDown: function(e) {
        var t = this;
        e > 0 ? (this.calculateTime(e), l && clearInterval(l), l = setInterval(function() {
            e >= 1e3 ? (e -= 1e3, t.calculateTime(e)) : (clearInterval(l), t.setData({
                isShow: !1
            }));
        }, 1e3)) : this.setData({
            isShow: !1
        });
    },
    goToPay: function() {
        var e = this;
        wx.rprm.rec({
            elementid: "pay",
            eventtype: "tap",
            orderType: "41",
            orderSubType: this.data.orderDetail.orderSubType,
            orderStatus: this.data.orderDetail.orderStatus,
            payStatus: this.data.orderDetail.payStatus,
            serviceId: this.data.orderDetail.productInfos[0].goodsId
        });
        var t = {
            data: {
                orderNo: this.data.orderNo,
                openId: this.getSessionInfo("openid"),
                appId: this.getSessionInfo("appid")
            }
        };
        this.simpleRequest(r.fetchOrderCardPay, t).then(function(t) {
            e.setData({
                payInfo: t.payVo
            }), 0 == t.payVo.status ? e.wxPay() : e.toast(t.payVo.errorMessage);
        });
    },
    checkPayResult: function(e, t) {
        var a = this;
        t.simpleRequest(r.getCardOrderPayResult, {
            data: {
                orderNo: e
            }
        }, {}, !1).then(function(o) {
            3 == o.payStatus ? u = setTimeout(function() {
                t.checkPayResult(e, t);
            }, 3e3) : (t.hideLoading(), t.jumpUrl("/pages/order/detail/card?orderNo=" + a.data.orderNo));
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
                e.showLoading(), console.log("orderNo:", t), e.checkPayResult(t, e);
            },
            fail: function() {},
            complete: function() {}
        };
        wx.requestPayment(a);
    },
    cancleOrder: function() {
        var e = this;
        wx.rprm.rec({
            elementid: "cancelPay",
            eventtype: "tap",
            orderType: "41",
            orderSubType: this.data.orderDetail.orderSubType,
            orderStatus: this.data.orderDetail.orderStatus,
            payStatus: this.data.orderDetail.payStatus,
            serviceId: this.data.orderDetail.productInfos[0].goodsId
        });
        var t = {
            data: {
                orderNo: this.data.orderNo
            }
        };
        this.simpleRequest(r.cancelOrderCardPay, t, {}, !1).then(function(t) {
            e.toast("取消成功"), e.getOrderDetail();
        });
    },
    applyRefund: function() {
        wx.rprm.rec({
            elementid: "applyRefund",
            eventtype: "tap",
            orderType: "41",
            orderSubType: this.data.orderDetail.orderSubType,
            orderStatus: this.data.orderDetail.orderStatus,
            payStatus: this.data.orderDetail.payStatus,
            serviceId: this.data.orderDetail.productInfos[0].goodsId
        }), this.jumpUrl("/pages/order/refund/serviceApplyRefund?orderNo=" + this.data.orderNo);
    },
    useCard: function(e) {
        var t = e.detail.cardNumber, a = {
            expiry: n(this.data.orderDetail.expDate).format("YYYY年MM月DD日"),
            surPlus: e.detail.surplus,
            type: e.detail.type
        };
        this.showCardQrCode(this.data.goodsInfo.name, t, a), this.getCodeStatus(t);
    },
    getCodeStatus: function(e) {
        var t = this, a = {
            data: {
                code: e
            }
        };
        this.simpleRequest(r.getCancelResultInfo, a, {}, !1).then(function(a) {
            t.setData({
                info: a
            }), 2 == a.result || 3 == a.result ? (t.closeCardQrCode(), t.alert()) : d = setTimeout(function() {
                t.getCodeStatus(e);
            }, 1e3);
        });
    },
    close: function() {
        d && clearTimeout(d);
    },
    closeAlert: function() {
        d && clearTimeout(d), this.getOrderDetail();
    },
    storeCellClick: function() {
        this.setData({
            showDialog: !0
        });
    },
    toPoiPage: function(e) {
        wx.setStorageSync("storeId", this.data.orderDetail.storeId), this.jumpUrl("/pages/index/index");
    }
}));
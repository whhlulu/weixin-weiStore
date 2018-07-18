function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var a = Object.assign || function(e) {
    for (var a = 1; a < arguments.length; a++) {
        var t = arguments[a];
        for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
    }
    return e;
}, t = e(require("../../../utils/basePage")), r = e(require("../../../store/store")), o = e(require("../../../utils/util")), d = require("../api/api"), s = null, i = null;

(0, e(require("../../../utils/extendPage")).default)(a({}, t.default, {
    data: a({}, t.default.baseData, r.default.mapState(), {
        orderNo: "",
        orderId: "",
        refundNo: "",
        cardDetails: {},
        cardTemplate: {},
        orderDetail: {},
        iconStyle: "",
        orderItem: {},
        payLeftTime: "",
        mm: "",
        ss: "",
        loaded: !1,
        interval: null,
        isShow: !0,
        payInfo: {}
    }),
    onLoad: function(e) {
        this.setData({
            orderNo: e.orderNo
        });
    },
    onHide: function() {
        i && clearInterval(i), s && clearTimeout(s);
    },
    onUnload: function() {
        i && clearInterval(i), s && clearTimeout(s);
    },
    onShow: function() {
        var e = this;
        this.closeCardQrCode();
        var a = {
            data: {
                orderNo: this.data.orderNo
            }
        };
        this.pageRequest(d.getTeamOrderDetail, a).then(function(a) {
            switch (e.data.orderItem.imgUrl = a.headPicUrl, e.data.orderItem.salePrice = a.salePrice, 
            e.data.orderItem.name = a.cardName, e.data.orderItem.marketPrice = a.marketPrice, 
            e.data.cardDetails = a.cardDetails, e.data.cardTemplate = a.cardTemplate, e.data.refundNo = a.refundNo, 
            e.timer(a.payLeftTime), e.data.cardTemplate.privilege = e.replaceAll(a.cardTemplate.privilege, "privilege"), 
            e.data.cardTemplate.stores = e.replaceAll(a.cardTemplate.stores, "stores"), e.data.orderDetail = a, 
            e.data.orderNo = a.orderNo, e.data.orderId = a.orderId, e.data.loaded = !0, a.status) {
              case 0:
                e.data.iconStyle = "icon-fail s-fc-red";
                break;

              case 1:
                e.data.iconStyle = "icon-success s-fc-grn";
                break;

              case 3:
                e.data.iconStyle = "icon-fail s-fc-c";
                break;

              case 4:
                e.data.iconStyle = "icon-waiting s-fc-yb";
                break;

              case 5:
                e.data.iconStyle = "icon-success s-fc-grn";
                break;

              case 6:
                e.data.iconStyle = "icon-fail s-fc-c";
            }
            e.setData(e.data), e.setNavMenu("订单详情", "orderDetail", {
                orderType: 5,
                orderStatus: a.status,
                payStatus: a.payStatus,
                cardTemplateId: a.cardTemplateId
            }, "", !1);
        });
    },
    timer: function(e) {
        var a = this;
        e > 0 ? (this.calculateTime(e), i && clearInterval(i), i = setInterval(function() {
            e >= 1e3 ? (e -= 1e3, a.calculateTime(e)) : (clearInterval(i), a.setData({
                isShow: !1
            }));
        }, 1e3)) : this.setData({
            isShow: !1
        });
    },
    calculateTime: function(e) {
        var a = o.default.formatDate(e / 1e3, "mm:ss"), t = a.split(":");
        this.setData({
            payLeftTime: a,
            mm: t[0],
            ss: t[1]
        });
    },
    replaceAll: function(e, a) {
        return null != e && (e = "stores" === a ? e.replace(new RegExp(";", "gm"), "\t") : e.replace(new RegExp("<br/>", "gm"), "\n")), 
        e;
    },
    shoWqrCode: function(e) {
        var a = e.currentTarget.dataset.cardcode, t = e.currentTarget.dataset.cardname;
        this.showCardQrCode(t, a);
    },
    toRefundDetail: function(e) {
        var a = e.currentTarget.dataset.refundno;
        this.jumpUrl("/pages/order/refund/refundDetail?refundNo=" + a);
    },
    applyRefund: function() {
        wx.rprm.rec({
            elementid: "applyRefund",
            eventtype: "tap",
            orderType: 5,
            orderStatus: this.data.orderDetail.status,
            payStatus: this.data.orderDetail.payStatus,
            cardTemplateId: this.data.orderDetail.cardTemplateId
        }), this.jumpUrl("/pages/order/refund/teamApplyRefund?orderNo=" + this.data.orderNo);
    },
    showMoreDetail: function() {
        this.setData({
            moreFlg: !this.data.moreFlg
        });
    },
    goPay: function() {
        var e = this;
        wx.rprm.rec({
            elementid: "pay",
            eventtype: "tap",
            orderType: 5,
            orderStatus: this.data.orderDetail.status,
            payStatus: this.data.orderDetail.payStatus,
            cardTemplateId: this.data.orderDetail.cardTemplateId
        });
        var a = {
            data: {
                orderNo: this.data.orderNo,
                openId: this.getSessionInfo("openid"),
                appId: this.getSessionInfo("appid")
            }
        };
        this.simpleRequest(d.fetchTeamPay, a).then(function(a) {
            e.setData({
                payInfo: a.payVo
            }), 0 === a.payVo.status ? e.wxPay() : e.toast(a.payVo.errorMessage);
        });
    },
    selectPaySataus: function(e, a) {
        var t = this;
        a.simpleRequest(d.getOrderPayResult, {
            data: {
                orderNo: e
            }
        }, {}, !1).then(function(r) {
            3 == r.payStatus ? s = setTimeout(function() {
                a.selectPaySataus(e, a);
            }, 3e3) : (a.hideLoading(), a.jumpUrl("/pages/order/detail/team?orderNo=" + t.data.orderNo));
        });
    },
    wxPay: function() {
        var e = this, a = this.data.orderNo, t = {
            timeStamp: this.data.payInfo.timestamp,
            nonceStr: this.data.payInfo.nonceStr,
            package: this.data.payInfo.packageData,
            signType: this.data.payInfo.signType,
            paySign: this.data.payInfo.paySign,
            success: function(t) {
                e.showLoading(), e.selectPaySataus(a, e);
            },
            fail: function(e) {},
            complete: function(a) {
                if (a.errMsg.indexOf("cancel") > 0) e.data.orderNo;
            }
        };
        wx.requestPayment(t);
    },
    seeStore: function() {
        this.setData({
            showDialog: !0
        });
    }
}));
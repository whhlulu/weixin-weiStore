function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var r in a) Object.prototype.hasOwnProperty.call(a, r) && (e[r] = a[r]);
    }
    return e;
}, a = e(require("../../../utils/basePage")), r = e(require("../../../store/store")), d = require("../api/api");

(0, e(require("../../../utils/extendPage")).default)(t({}, a.default, {
    data: t({}, a.default.baseData, r.default.mapState(), {
        orderNo: "",
        totalPrice: "0",
        buyNumber: "1",
        selectIndex: "0",
        orderItem: {},
        loaded: !1,
        comment: "",
        refundInfo: {},
        refundReason: [ "买多了／买错了", "计划有变，没时间消费", "预约不到", "评价不好", "后悔了，不想买了", "其它原因" ]
    }),
    onLoad: function(e) {
        this.setData({
            orderNo: e.orderNo
        });
    },
    onShow: function() {
        var e = this;
        this.setNavMenu("申请退款", "", !1);
        var t = {
            data: {
                orderNo: this.data.orderNo
            }
        };
        this.pageRequest(d.getTeamApplyMessage, t).then(function(t) {
            e.data.orderItem.imgUrl = t.headPicUrl, e.data.orderItem.salePrice = t.salePrice, 
            e.data.orderItem.name = t.cardName, e.data.orderItem.marketPrice = t.marketPrice, 
            e.data.refundInfo = t, e.data.loaded = !0, e.data.comment = e.data.refundReason[0], 
            e.data.totalPrice = (t.salePrice * e.data.buyNumber).toFixed(2), e.setData(e.data);
        });
    },
    confirmRefund: function() {
        var e = this;
        wx.rprm.rec({
            elementid: "confirmRefund",
            eventtype: "tap",
            orderType: 5,
            orderStatus: 1,
            payStatus: 1
        });
        var t = {
            data: {
                orderNo: this.data.orderNo,
                comment: this.data.comment,
                refundNum: this.data.buyNumber
            }
        };
        this.simpleRequest(d.fetchApplyRefund, t).then(function(t) {
            e.toast("退款申请已提交可在“我的订单-退款售后”中查看退款进度"), wx.redirectTo({
                url: "/pages/order/refund/refundDetail?refundNo=" + t.refundNo
            });
        });
    },
    checkItem: function(e) {
        var t = e.currentTarget.dataset.id;
        this.setData({
            selectIndex: t,
            comment: this.data.refundReason[t]
        });
    },
    countPrice: function(e) {
        if (this.data.refundInfo && this.data.refundInfo.salePrice) {
            var t = this.data.refundInfo.salePrice * e.detail.inputValue;
            this.setData({
                totalPrice: t.toFixed(2),
                buyNumber: e.detail.inputValue
            });
        }
    }
}));
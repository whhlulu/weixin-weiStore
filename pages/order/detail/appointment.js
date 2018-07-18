function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var r in a) Object.prototype.hasOwnProperty.call(a, r) && (t[r] = a[r]);
    }
    return t;
}, a = t(require("../../../utils/basePage")), r = t(require("../../../store/store"));

(0, t(require("../../../utils/extendPage")).default)(e({}, a.default, {
    data: e({}, a.default.baseData, r.default.mapState()),
    onShow: function() {
        this.setNavMenu("订单详情", "", !1), this.alert("恭喜你获得一张优惠券");
    },
    onLoad: function() {},
    cancelOrder: function() {
        this.confirm("确定要取消预约吗？", "", {
            text: "确认取消",
            fn: function() {}
        }, {
            text: "再等等"
        });
    }
}));
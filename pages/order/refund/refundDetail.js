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
}, t = e(require("../../../utils/basePage")), r = e(require("../../../store/store")), n = require("../api/api");

(0, e(require("../../../utils/extendPage")).default)(a({}, t.default, {
    data: a({}, t.default.baseData, r.default.mapState(), {
        refundNo: "",
        iconStyle: "",
        loaded: !1,
        refundDetail: {},
        refundProgress: []
    }),
    onLoad: function(e) {
        this.setData({
            refundNo: e.refundNo
        });
    },
    onShow: function() {
        var e = this;
        this.setNavMenu("退款详情", "", !1);
        var a = {
            data: {
                refundNo: this.data.refundNo
            }
        };
        this.pageRequest(n.getRefundMessage, a).then(function(a) {
            switch (e.data.refundDetail = a, e.data.refundProgress = a.refundProgress, e.data.loaded = !0, 
            a.status) {
              case 1:
                e.data.iconStyle = "icon-waiting s-fc-yb";
                break;

              case 2:
                e.data.iconStyle = "icon-success s-fc-grn";
                break;

              case 3:
                e.data.iconStyle = "icon-fail s-fc-c";
            }
            e.setData(e.data);
        });
    }
}));
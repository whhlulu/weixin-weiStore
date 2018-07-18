function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

function a(t) {
    if (Array.isArray(t)) {
        for (var e = 0, a = Array(t.length); e < t.length; e++) a[e] = t[e];
        return a;
    }
    return Array.from(t);
}

var r = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var r in a) Object.prototype.hasOwnProperty.call(a, r) && (t[r] = a[r]);
    }
    return t;
}, i = t(require("../../utils/basePage")), n = t(require("../../store/store")), l = require("./api/api");

(0, t(require("../../utils/extendPage")).default)(r({}, i.default, {
    data: r({}, i.default.baseData, n.default.mapState(), {
        tabList: [ {
            title: "全部",
            name: "all"
        }, {
            title: "待付款",
            name: "waiting"
        }, {
            title: "可使用",
            name: "usable"
        }, {
            title: "退款/售后",
            name: "refund"
        } ],
        pageInfo: {
            all: {
                pageNum: 0,
                total: 0,
                list: []
            },
            waiting: {
                pageNum: 0,
                total: 0,
                list: []
            },
            usable: {
                pageNum: 0,
                total: 0,
                list: []
            },
            refund: {
                pageNum: 0,
                total: 0,
                list: []
            }
        },
        loaded: !1,
        current: "all",
        menuState: {
            show: !0,
            title: "",
            current: "order"
        }
    }),
    onLoad: function() {
        this.getOrderList("all", !0);
    },
    onShow: function() {
        this.setNavMenu("我的订单", "order_list", {}, "order", !0);
    },
    loadMore: function() {
        var t = this.data.current;
        console.log(t);
        var e = this.data.pageInfo[t], a = e.total;
        e.list.length < a && this.getOrderList(this.data.current);
    },
    getOrderList: function(t, r) {
        var i = this, n = this.data.pageInfo[t], u = n.pageNum, o = (n.total, n.list);
        r ? u = 1 : u++;
        var s = {
            data: {
                pageNum: u,
                pageSize: 10,
                orderTypes: [ 4, 5, 41 ],
                type: "all" == t ? 0 : "waiting" == t ? 1 : "usable" == t ? 2 : 3
            }
        };
        this.simpleRequest(l.getOrderList, s).then(function(n) {
            var l, s, d = n.list;
            r && (o = []), (l = o).push.apply(l, a(d)), i.setData((s = {}, e(s, "pageInfo." + t + ".list", o), 
            e(s, "pageInfo." + t + ".total", n.count), e(s, "pageInfo." + t + ".pageNum", u), 
            e(s, "loaded", !0), s));
        });
    },
    tabChange: function(t) {
        var e = t.detail;
        this.setData({
            current: e
        }), this.getOrderList(e, !0);
    }
}));
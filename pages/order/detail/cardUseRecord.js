function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t) {
    if (Array.isArray(t)) {
        for (var e = 0, a = Array(t.length); e < t.length; e++) a[e] = t[e];
        return a;
    }
    return Array.from(t);
}

var a = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (t[o] = a[o]);
    }
    return t;
}, o = t(require("../../../utils/basePage")), s = t(require("../../../store/store")), r = require("../api/api");

(0, t(require("../../../utils/extendPage")).default)(a({}, o.default, {
    data: a({}, o.default.baseData, s.default.mapState(), {
        cardInfo: {},
        logs: [],
        code: null,
        pageInfo: {
            pageNum: 0,
            totalCount: 0
        }
    }),
    onLoad: function(t) {
        this.setNavMenu("明细"), this.setData({
            code: t.code
        }), this.getCardsUseLogs(!0);
    },
    loadMore: function() {
        var t = this.data.pageInfo.totalCount;
        this.data.logs.length < t && this.getCardsUseLogs(!1);
    },
    getCardsUseLogs: function(t) {
        var a = this, o = this.data.pageInfo, s = o.pageNum, n = (o.totalCount, this.data.logs);
        t ? s = 1 : s++;
        var u = {
            data: {
                code: this.data.code,
                pageNum: s,
                pageSize: 10
            }
        };
        this.simpleRequest(r.getCardUseLog, u).then(function(o) {
            var s, r = o.cardName, u = o.code, i = o.expDate, l = o.leftCounts, d = o.leftDays, g = o.startDate, f = o.type, p = o.useCounts, c = o.uselogs, h = o.totalCount, C = o.pageNum;
            t && (n = []), (s = n).push.apply(s, e(c)), a.setData({
                cardInfo: {
                    cardName: r,
                    code: u,
                    expDate: i,
                    leftCounts: l,
                    leftDays: d,
                    startDate: g,
                    type: f,
                    useCounts: p
                },
                logs: n,
                "pageInfo.totalCount": h,
                "pageInfo.pageNum": C
            });
        });
    }
}));
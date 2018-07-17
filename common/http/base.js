function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = e(require("../lib/promisify")), t = e(require("../auth/constants")), u = e(require("../auth/session")), r = (e(require("../../config/config")), 
e(require("../auth/auth"))), s = !1, a = !1, i = [], o = function(e) {
    var n = {};
    return e && e.token && (n[t.default.WX_HEADER_Token] = e.token), n;
}, c = [], f = {
    header: {},
    request: wx.request,
    Promise: n.default,
    concurrency: 10
}, l = function(e) {
    return new n.default(function(l, d) {
        var S = e.header || f.header;
        e.scope = e.scope || "snsapi_base";
        var _ = function(r) {
            var s = o(u.default.get(t.default.WX_SESSION_WXAPP_SESSION)), a = Object.assign({}, S, s), _ = Object.assign({}, e, {
                header: a
            });
            c.length > 0 && c.forEach(function(e) {
                e.request(_);
            }), f.request(Object.assign({}, _, {
                success: function(e) {
                    var t = void 0;
                    i.length && i.shift()(), c.length > 0 ? c.forEach(function(u) {
                        (t = u.response(_, e.data)) && t instanceof n.default ? t.then(function(e) {
                            l(e);
                        }) : l(t);
                    }) : l(e.data);
                },
                fail: function(e) {
                    var n = new RequestError(t.default.WX_DOMAIN_URL_FAILED, e.errMsg || "request:fail");
                    d(n);
                }
            }));
        }, h = function(e) {
            r.default.login({}).then(function(n) {
                i.length && i.shift()(), e();
            }).catch(function(e) {
                d(e);
            });
        };
        if ("snsapi_base" == e.scope) u.default.get(t.default.WX_SESSION_WXAPP_SESSION) ? _() : s ? i.push(function() {
            u.default.get(t.default.WX_SESSION_WXAPP_SESSION) ? _() : (s = !0, h(function() {
                s = !1, _();
            }));
        }) : (s = !0, h(function() {
            s = !1, _();
        })); else if ("snsapi_userinfo" == e.scope) {
            var g = u.default.get(t.default.WX_SESSION_WXAPP_SESSION);
            g && "snsapi_userinfo" == g.scope ? _() : a ? i.push(function() {
                _();
            }) : (a = !0, r.default.loginUserInfo({}).then(function(e) {
                a = !1, _();
            }, function(e) {
                a = !1;
            }));
        }
    });
};

exports.default = {
    setConfig: function(e) {
        var n = e.concurrency !== f.concurrency;
        f = Object.assign({}, f, e), n && (q.concurrency = f.concurrency);
    },
    request: {
        Post: function(e, n, t) {
            return l(Object.assign({
                method: "POST",
                url: e,
                data: n
            }, t));
        },
        Get: function(e, n, t) {
            return l(Object.assign({
                method: "GET",
                url: e,
                data: n
            }, t));
        }
    },
    interceptors: c,
    initData: function() {
        s = !1, a = !1, i = [];
    }
};
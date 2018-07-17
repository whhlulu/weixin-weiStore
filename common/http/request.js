function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), r = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
}, u = e(require("base")), a = e(require("../auth/session")), o = e(require("../auth/auth")), i = e(require("../auth/constants")), s = require("../../config/config"), f = e(s), c = !1, l = [];

u.default.setConfig({
    concurrency: 10,
    header: r({
        "content-type": "application/json"
    }, f.default.headers, {
        accept: "application/json"
    })
}), u.default.interceptors.push({
    request: function(e) {
        var t = f.default.form || {};
        return e.header = e.header || {}, e.data = Object.assign({}, t, e.data), e;
    },
    response: function(e, t) {
        if (t) {
            if (0 == t.errcode) return t;
            if ("1041" != t.errcode) return t;
            a.default.clear(i.default.WX_SESSION_WXAPP_SESSION);
            var n = function() {
                return "POST" == e.method ? u.default.request.Post(e.url, e.data, e.header).then(function(e) {
                    if (l.length && l.shift()(), e && 0 == e.errcode) return e;
                }) : u.default.request.Get(e.url, e.data, e.header).then(function(e) {
                    if (l.length && l.shift()(), e && 0 == e.errcode) return e;
                });
            };
            if (a.default.get(i.default.WX_SESSION_WXAPP_SESSION)) return n();
            if (c) l.push(function() {
                return n();
            }); else {
                if (c = !0, "snsapi_base" == e.scope) return o.default.login({}).then(function(e) {
                    return c = !1, n();
                });
                if ("snsapi_userinfo" == e.scope) return o.default.loginUserInfo().then(function(e) {
                    return c = !1, n();
                }, function(e) {
                    c = !1;
                });
            }
        }
    }
});

var h = function() {
    function e() {
        t(this, e), this.request = u.default.request;
    }
    return n(e, [ {
        key: "Post",
        value: function(e, t, n) {
            return this.request.Post((0, s.getApiUrl)(e.api), t, n).then(function(e) {
                return e;
            }).catch(function(e) {
                e.message && wx.showModal({
                    title: "",
                    showCancel: !1,
                    content: e.message
                });
            });
        }
    }, {
        key: "Get",
        value: function(e, t, n) {
            return this.request.Get((0, s.getApiUrl)(e.api), t, n).then(function(e) {
                return e;
            }).catch(function(e) {
                e.message && wx.showModal({
                    title: "",
                    showCancel: !1,
                    content: e.message
                });
            });
        }
    } ]), e;
}();

exports.default = new h();
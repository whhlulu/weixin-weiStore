function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function n(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function r(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = function() {
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
}(), o = e(require("../lib/promisify")), u = e(require("constants")), i = e(require("session")), f = e(require("../wxApiPromise")), l = e(require("../../config/config")), s = e(require("../identityUrls")), c = (l.default.extConfig && l.default.extConfig.host, 
function(e) {
    function a(e, r) {
        t(this, a);
        var o = n(this, (a.__proto__ || Object.getPrototypeOf(a)).call(this, e, r));
        return o.type = e, o.message = r, o;
    }
    return r(a, Error), a;
}()), d = function() {
    function e() {
        t(this, e), this._wxApi = f.default;
    }
    return a(e, [ {
        key: "getLoginResult",
        value: function() {
            return this._wxApi.login().then(function(e) {
                return e;
            }).catch(function(e) {
                var t = new c(u.default.ERR_WX_LOGIN_FAILED, "微信登录失败，请检查网络状态");
                return new o.default(function(e, n) {
                    n(t);
                });
            });
        }
    }, {
        key: "checkUserInfo",
        value: function() {
            var e = this;
            try {
                if (!wx.canIUse("getSetting") || !wx.canIUse("button.open-type.getUserInfo")) return new o.default(function(e, t) {
                    t(new Error("当前微信版本过低，请升级到最新微信版本后重试。"));
                });
            } catch (e) {
                return new o.default(function(e, t) {
                    t(new Error("当前微信版本过低，请升级到最新微信版本后重试。"));
                });
            }
            return e._wxApi.getSetting().then(function(t) {
                if (t.authSetting["scope.userInfo"]) return e._wxApi.getUserInfo({
                    lang: "zh_CN"
                }).then(function(e) {
                    return {
                        encryptedData: e.encryptedData,
                        iv: e.iv,
                        userInfo: e.userInfo
                    };
                }).catch(function(e) {
                    var t = new c(u.default.ERR_WX_GET_USER_INFO, "获取微信用户信息失败，请检查网络状态");
                    return new o.default(function(e, n) {
                        n(t);
                    });
                });
                e._wxApi.showModal({
                    title: "信息授权提示",
                    showCancel: !1,
                    content: "需要您的授权才能获取公开信息(昵称、头像等)",
                    confirmText: "确定"
                }).then(function(e) {});
            });
        }
    }, {
        key: "login",
        value: function() {
            var e = this;
            return new o.default(function(t, n) {
                var r = l.default.form || {};
                e.getLoginResult().then(function(e) {
                    wx.request({
                        url: l.default.api.host + "/fe/mapi/user/login",
                        header: {},
                        method: "POST",
                        data: Object.assign({}, r, {
                            code: e.code
                        }),
                        success: function(e) {
                            var r = e.data;
                            if (0 == r.errcode) i.default.set(u.default.WX_SESSION_WXAPP_SESSION, r.data), getApp().globalData.userInfo = r.data, 
                            t(r); else {
                                var a = "登录失败(" + r.errcode + ")：" + (r.errormsg || "未知错误"), o = new c(u.default.ERR_LOGIN_SESSION_NOT_RECEIVED, a);
                                n(o);
                            }
                        },
                        fail: function(e) {
                            var t = new c(u.default.WX_DOMAIN_URL_FAILED, e.errMsg || "request:fail");
                            n(t);
                        }
                    });
                });
            });
        }
    }, {
        key: "bussessLogin",
        value: function(e, t) {
            return new o.default(function(n, r) {
                var a = {}, o = i.default.get(u.default.WX_SESSION_WXAPP_SESSION);
                a[u.default.WX_HEADER_Token] = o.token, wx.request({
                    url: l.default.api.host + "/fe/mapi/user/blogin",
                    header: a,
                    method: "POST",
                    data: {
                        phone: e,
                        password: t
                    },
                    success: function(e) {
                        var t = e.data;
                        if (0 == t.errcode) i.default.set(u.default.WX_SESSION_WXAPP_SESSION, t.data), getApp().globalData.userInfo = t.data, 
                        n(t); else {
                            var a = new c(u.default.ERR_LOGIN_SESSION_NOT_RECEIVED, "B端商户获取用户信息失败");
                            r(a);
                        }
                    },
                    fail: function(e) {
                        var t = new c(u.default.WX_DOMAIN_URL_FAILED, e.errMsg || "request:fail");
                        r(t);
                    }
                });
            });
        }
    }, {
        key: "bussessLogout",
        value: function() {
            var e = i.default.get(u.default.WX_SESSION_WXAPP_SESSION);
            e && e.bwid && delete e.bwid, i.default.set(u.default.WX_SESSION_WXAPP_SESSION, e);
        }
    }, {
        key: "loginUserInfo",
        value: function() {
            var e = this;
            return new o.default(function(t, n) {
                var r = l.default.form || {};
                e.getLoginResult().then(function(a) {
                    e.checkUserInfo().then(function(e) {
                        wx.request({
                            url: l.default.api.host + "/fe/mapi/user/loginUserInfo",
                            header: {},
                            method: "POST",
                            data: Object.assign({}, r, {
                                code: a.code,
                                iv: e.iv,
                                encryptedData: e.encryptedData
                            }),
                            success: function(e) {
                                var r = e.data;
                                if (0 == r.errcode) i.default.set(u.default.WX_SESSION_WXAPP_SESSION, r.data), getApp().globalData.userInfo = r.data, 
                                t(r); else {
                                    var a = "授权失败(" + r.errcode + ")：" + (r.errormsg || "未知错误"), o = new c(u.default.ERR_LOGIN_SESSION_NOT_RECEIVED, a);
                                    n(o);
                                }
                            },
                            fail: function(e) {
                                var t = new c(u.default.WX_DOMAIN_URL_FAILED, e.errMsg || "request:fail");
                                n(t);
                            }
                        });
                    });
                });
            });
        }
    }, {
        key: "isVerifyAuth",
        value: function(e) {
            var t = this;
            return new o.default(function(n, r) {
                e.detail.userInfo ? i.default.get("WX_SESSION_WXAPP_SESSION") && "snsapi_userinfo" == i.default.get("WX_SESSION_WXAPP_SESSION").scope ? n(!0) : (wx.showLoading({
                    title: "授权中"
                }), t.loginUserInfo().then(function(e) {
                    wx.hideLoading(), e && e.data && n(!0);
                })) : r();
            });
        }
    }, {
        key: "loginCheck",
        value: function(e) {
            if (e.onLoad || e.onShow) {
                var t = e.onLoad, n = e.onShow, r = [];
                e.onLoad = function(e) {
                    var n = getCurrentPages(), a = n[n.length - 1];
                    if (s.default.indexOf(a.route) >= 0) t.call(a, e); else if (i.default.get("WX_SESSION_WXAPP_SESSION") && "snsapi_userinfo" == i.default.get("WX_SESSION_WXAPP_SESSION").scope) t.call(a, e); else {
                        r.push("url=" + a.route);
                        for (var o in e) r.push(o + "=" + e[o]);
                        wx.redirectTo({
                            url: "/pages/authorization/index?" + r.join("&")
                        });
                    }
                }, e.onShow = function() {
                    var e = getCurrentPages(), t = e[e.length - 1];
                    s.default.indexOf(t.route) >= 0 ? n.call(t, {}) : i.default.get("WX_SESSION_WXAPP_SESSION") && "snsapi_userinfo" == i.default.get("WX_SESSION_WXAPP_SESSION").scope ? n.call(t, {}) : wx.redirectTo({
                        url: "/pages/authorization/index?" + r.join("&")
                    });
                };
            }
            return e;
        }
    } ]), e;
}();

exports.default = new d();
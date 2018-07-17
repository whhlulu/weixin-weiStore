var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, t = {
    compress: function(e) {
        if (null == e) return "";
        return function(e, t, r) {
            if (null == e) return "";
            var n, o, c, a = {}, i = {}, s = "", u = "", p = "", l = 2, f = 3, d = 2, m = [], g = 0, y = 0;
            for (c = 0; c < e.length; c += 1) if (s = e.charAt(c), Object.prototype.hasOwnProperty.call(a, s) || (a[s] = f++, 
            i[s] = !0), u = p + s, Object.prototype.hasOwnProperty.call(a, u)) p = u; else {
                if (Object.prototype.hasOwnProperty.call(i, p)) {
                    if (p.charCodeAt(0) < 256) {
                        for (n = 0; n < d; n++) g <<= 1, y == t - 1 ? (y = 0, m.push(r(g)), g = 0) : y++;
                        for (o = p.charCodeAt(0), n = 0; n < 8; n++) g = g << 1 | 1 & o, y == t - 1 ? (y = 0, 
                        m.push(r(g)), g = 0) : y++, o >>= 1;
                    } else {
                        for (o = 1, n = 0; n < d; n++) g = g << 1 | o, y == t - 1 ? (y = 0, m.push(r(g)), 
                        g = 0) : y++, o = 0;
                        for (o = p.charCodeAt(0), n = 0; n < 16; n++) g = g << 1 | 1 & o, y == t - 1 ? (y = 0, 
                        m.push(r(g)), g = 0) : y++, o >>= 1;
                    }
                    0 == --l && (l = Math.pow(2, d), d++), delete i[p];
                } else for (o = a[p], n = 0; n < d; n++) g = g << 1 | 1 & o, y == t - 1 ? (y = 0, 
                m.push(r(g)), g = 0) : y++, o >>= 1;
                0 == --l && (l = Math.pow(2, d), d++), a[u] = f++, p = String(s);
            }
            if ("" !== p) {
                if (Object.prototype.hasOwnProperty.call(i, p)) {
                    if (p.charCodeAt(0) < 256) {
                        for (n = 0; n < d; n++) g <<= 1, y == t - 1 ? (y = 0, m.push(r(g)), g = 0) : y++;
                        for (o = p.charCodeAt(0), n = 0; n < 8; n++) g = g << 1 | 1 & o, y == t - 1 ? (y = 0, 
                        m.push(r(g)), g = 0) : y++, o >>= 1;
                    } else {
                        for (o = 1, n = 0; n < d; n++) g = g << 1 | o, y == t - 1 ? (y = 0, m.push(r(g)), 
                        g = 0) : y++, o = 0;
                        for (o = p.charCodeAt(0), n = 0; n < 16; n++) g = g << 1 | 1 & o, y == t - 1 ? (y = 0, 
                        m.push(r(g)), g = 0) : y++, o >>= 1;
                    }
                    0 == --l && (l = Math.pow(2, d), d++), delete i[p];
                } else for (o = a[p], n = 0; n < d; n++) g = g << 1 | 1 & o, y == t - 1 ? (y = 0, 
                m.push(r(g)), g = 0) : y++, o >>= 1;
                0 == --l && (l = Math.pow(2, d), d++);
            }
            for (o = 2, n = 0; n < d; n++) g = g << 1 | 1 & o, y == t - 1 ? (y = 0, m.push(r(g)), 
            g = 0) : y++, o >>= 1;
            for (;;) {
                if (g <<= 1, y == t - 1) {
                    m.push(r(g));
                    break;
                }
                y++;
            }
            return m.join("");
        }(e, 6, function(e) {
            return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$".charAt(e);
        });
    },
    btoa: function(e) {
        for (var t, r, n = String(e), o = 0, c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", a = ""; n.charAt(0 | o) || (c = "=", 
        o % 1); a += c.charAt(63 & t >> 8 - o % 1 * 8)) (r = n.charCodeAt(o += .75)) < 255 && (t = t << 8 | r);
        return a;
    },
    init: function(r) {
        if (r) {
            r.appName && (t.appName = r.appName), r.statType && (t.statType = r.statType);
            try {
                "dev" !== r.env && "development" !== r.env && "localhost" !== r.env && "local" !== r.env || (t.recAPI = "https://mobileapm-pl.weimob.com/postFrontEndData", 
                t.ancAPI = "https://statistic-dev.weimobdc.com/wm.css", !0 === r.debug && (t.dev = !0)), 
                "qa" !== r.env && "test" !== r.env && "testing" !== r.env && -1 === r.env.indexOf("quality") && -1 === r.env.indexOf("assurance") && -1 === r.env.indexOf("internal") || (t.recAPI = "https://mobileapm-pl.weimob.com/postFrontEndData", 
                t.ancAPI = "https://statistic-qa.weimobdc.com/wm.css", !0 === r.debug && (t.dev = !0)), 
                "pl" !== r.env && "pre-production" !== r.env && "preproduction" !== r.env && "pre_production" !== r.env && "stage" !== r.env && "staging" !== r.env && -1 === r.env.indexOf("external") || (t.recAPI = "https://mobileapm-pl.weimob.com/postFrontEndData", 
                t.ancAPI = "https://statistic-qa.weimobdc.com/wm.css"), "production" !== r.env && "live" !== r.env || (t.recAPI = "https://mobileapm.weimob.com/postFrontEndData", 
                t.ancAPI = "https://statistic.weimobdc.com/wm.css");
            } catch (e) {}
            r.recAPI && (t.recAPI = r.recAPI), r.ancAPI && (t.ancAPI = r.ancAPI), !1 === r.runtime && (t.recAPI = !1, 
            t.risSending = !0), !1 === r.anchor && (t.ancAPI = !1, t.isSending = !0), r.retry && (t.retry = r.retry), 
            r.rretry && (t.rretry = r.rretry), r.count && (t.count = r.count), r.len && (t.len = r.len), 
            r.frequency && (t.frequency = r.frequency), r.rfrequency && (t.rfrequency = r.rfrequency), 
            r.public && "object" === e(r.public) && t.public(r.public), void 0 !== r.LZ && (t.LZ = r.LZ), 
            void 0 !== r.RLZ && (t.RLZ = r.RLZ);
            try {
                wx.removeStorageSync("rprm_vars");
            } catch (e) {}
            if (t.cuid = wx.getStorageSync("rprm_cuid"), !t.cuid) try {
                t.cuid = t.btoa(Date.now()).slice(0, 16), wx.setStorageSync("rprm_cuid", t.cuid);
            } catch (e) {
                t.cuid = Date.now();
            }
            try {
                var n = wx.getStorageSync("rprm_tracepromotion");
                "object" === (void 0 === n ? "undefined" : e(n)) && "number" == typeof n.update && "object" === e(n.obj) && (Date.now() - n.update < 288e5 ? t.vars = Object.assign({}, t.vars, n.obj) : wx.removeStorageSync("rprm_tracepromotion"));
            } catch (e) {}
            if (t.timer = setInterval(function() {
                t.send();
            }, t.frequency), t.rtimer = setInterval(function() {
                t.rsend();
            }, t.rfrequency), !1 !== r.runtime) {
                var o = wx.request;
                Object.defineProperty(wx, "request", {
                    get: function() {
                        return function() {
                            if ("string" == typeof arguments[0].url && !arguments[0].url.includes(t.recAPI) && !arguments[0].url.includes(t.ancAPI)) {
                                var e = Date.now(), r = arguments[0].complete, n = arguments[0].url;
                                arguments[0].complete = function(o) {
                                    var c = "does not exist";
                                    o.header && o.header.globalticket && (c = o.header.globalticket);
                                    var a = Date.now(), i = {
                                        url: n,
                                        endTime: a,
                                        startTime: e,
                                        state: o.statusCode,
                                        globalticket: c
                                    };
                                    if (t.ajax(i), "function" == typeof r) return r.apply(arguments[0].complete, arguments);
                                };
                            }
                            return o.apply(wx, arguments);
                        };
                    }
                });
            }
            if (!1 !== r.anchor) {
                t.extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : Object.create(null), 
                t.extConfig && t.extConfig.form instanceof Object && t.public(t.extConfig.form, "new");
                var c = Page;
                Page = function() {
                    var e = this, r = arguments[0].onShow;
                    return arguments[0].onShow = function() {
                        var e, n = this, o = arguments;
                        try {
                            e = "-" + Date.now().toString() + Math.random();
                        } catch (e) {}
                        if (t.pageShowId = "" + t.cuid + e, t.rec({
                            pageShow: t.pageShowId
                        }), "function" == typeof r) return r.apply(n, o);
                    }, c.apply(e, arguments);
                }, wx.getSystemInfo({
                    success: function(e) {
                        t.systemInfo = e, Object.keys(e).forEach(function(r) {
                            t.ua = t.ua + (r + ":") + e[r] + ";";
                        });
                    }
                }), r.geo && wx.getLocation({
                    success: function(e) {
                        t.geoInfo = e, t.rec(e);
                    }
                });
                var a = App;
                App = function() {
                    var e = arguments[0].onLaunch;
                    arguments[0].onLaunch = function() {
                        var r = arguments[0];
                        if (r && r.scene && (t.public({
                            scene: r.scene
                        }, "new"), r.referrerInfo && r.referrerInfo.appId && t.public({
                            fromAppId: r.referrerInfo.appId
                        }, "new")), "function" == typeof e) return e.apply(this, arguments);
                    };
                    var r = arguments[0].onShow;
                    arguments[0].onShow = function() {
                        var e = arguments[0];
                        e && e.scene && (t.public({
                            scene: e.scene
                        }, "new"), e.referrerInfo && e.referrerInfo.appId && t.public({
                            fromAppId: e.referrerInfo.appId
                        }, "new"));
                        var n;
                        try {
                            n = "-" + Date.now().toString() + Math.random();
                        } catch (e) {}
                        if (t.public({
                            appShow: "" + t.cuid + n
                        }, "new"), "function" == typeof r) return r.apply(this, arguments);
                    };
                    var n = arguments[0].onHide;
                    return arguments[0].onHide = function() {
                        if (t.rec({
                            appHide: Date.now()
                        }), t.send(), t.rsend(), "function" == typeof n) return n.apply(this, arguments);
                    }, a.apply(this, arguments);
                };
            }
        } else t.dev && console.log("RPRM初始化失败");
    },
    ajax: function(e) {
        var r = {
            type: "ajax",
            id: t.dataId + "-" + t.dataIndex,
            data: e,
            cTime: Date.now()
        };
        ++t.dataIndex, t.rpush(r);
    },
    rpush: function(e) {
        var r = wx.getStorageSync("rprm_obj");
        r && r.length > 0 ? r.push(e) : r = [ e ], wx.setStorageSync("rprm_obj", r), r.length > t.count && (t.dev && console.log("调用链数据长度超过阀值，准备发送"), 
        t.rsend());
    },
    rsend: function() {
        if (!t.risSending) {
            var e = wx.getStorageSync("rprm_obj");
            if ("string" == typeof e || e.length < 1) return;
            if (t.rretry < 1) return t.dev && console.log("调用链接口出错，请通知接口管理员"), void clearInterval(t.rtimer);
            if (t.rcurrentTime = Date.now(), t.rcurrentTime - t.rlastTime < 1e3) return void (t.dev && console.log("调用链请求过频"));
            t.rlastTime = t.rcurrentTime, t.risSending = !0;
            var r = {
                id: t.dataId,
                appName: t.appName,
                cuid: t.cuid,
                abandon: Math.max(0, e.length - 2 * t.count),
                cTime: Date.now(),
                perfs: e.slice(0, 2 * t.count)
            };
            if (t.RLZ) {
                t.dev && console.log("RPRM尝试压缩调用链数据：", r);
                n = {
                    compressed: t.compress(JSON.stringify(r))
                };
            } else {
                t.dev && console.log("RPRM准备发送调用链数据：", r);
                var n = JSON.stringify(r);
            }
            wx.request({
                url: t.recAPI,
                method: "POST",
                data: n,
                success: function() {
                    var e = wx.getStorageSync("rprm_obj");
                    wx.setStorageSync("rprm_obj", e.slice(2 * t.count, e.length));
                },
                fail: function() {
                    t.rretry--;
                    var e = wx.getStorageSync("rprm_obj");
                    JSON.stringify(e).length > 2048 && (t.dev && console.log("调用链失败次数太多抛弃部分数据"), wx.setStorageSync("rprm_obj", e.slice(t.count, e.length)));
                },
                complete: function(e) {
                    t.dev && console.log("调用链服务器返回了：", e), t.risSending = !1;
                }
            });
        }
    },
    push: function(e) {
        var r = wx.getStorageSync("rprm");
        r = r ? r + "#" + e : e, wx.setStorageSync("rprm", r), r.length > t.len && (t.dev && console.log("打点数据长度超过阀值，准备发送"), 
        t.send());
    },
    pv: function(e, r) {
        var n = !1, o = "-1";
        t.extConfig && t.extConfig.form && t.extConfig.form.pid ? o = t.extConfig.form.pid : t.vars && t.vars.pid && (o = t.vars.pid);
        try {
            if (!t.LZ) throw "e";
            t.dev && console.log("RPRM尝试压缩PV打点数据：", e);
            n = "StatType=e&c=" + t.compress(e) + "&pid=" + o + "&" + r;
        } catch (r) {
            t.dev && console.log("RPRM准备发送PV打点数据：", e);
            n = e;
        }
        !1 !== n && wx.request({
            url: t.ancAPI + "?" + n,
            method: "GET",
            fail: function(e) {
                t.dev && console.log("RPRM发送PV打点数据失败：", e);
            }
        });
    },
    send: function() {
        if (!t.isSending) {
            var e = wx.getStorageSync("rprm");
            if (!e.length && e.length < 1) return;
            if (t.retry < 1) return t.dev && console.log("接口出错，请通知接口管理员"), void clearInterval(t.timer);
            if (t.currentTime = Date.now(), t.currentTime - t.lastTime < 1e3) return void (t.dev && console.log("请求过频"));
            t.lastTime = t.currentTime, t.isSending = !0;
            try {
                if (!t.LZ) throw "e";
                t.dev && console.log("RPRM尝试压缩PV打点数据：", e);
                r = "StatType=e&c=" + t.compress(e);
            } catch (n) {
                t.dev && console.log("RPRM准备发送PV打点数据：", e);
                var r = e;
            }
            wx.request({
                url: t.ancAPI + "?" + r,
                method: "GET",
                success: function() {
                    e.length;
                    var t = wx.getStorageSync("rprm");
                    wx.setStorageSync("rprm", t.substring(e.length));
                },
                fail: function() {
                    t.retry--;
                    var r = wx.getStorageSync("rprm");
                    if (r.length > 16384) {
                        t.dev && console.log("失败次数太多抛弃部分数据");
                        e.length;
                        wx.setStorageSync("rprm", r.substring(e.length));
                    }
                },
                complete: function(e) {
                    t.dev && console.log("打点服务器返回了：", e), t.isSending = !1;
                }
            });
        }
    },
    rec: function(r) {
        if (!1 !== t.ancAPI) if ("object" === (void 0 === r ? "undefined" : e(r))) {
            var n = !1, o = "", c = "failed", a = t.getCurrentRoute();
            c = a === t.urlroute ? "" + a + t.urlstring : a;
            var i = "StatType=" + t.statType + "&timestamp=" + Date.now() + "&url=" + encodeURIComponent(c) + "&ua=" + encodeURIComponent(t.ua) + "&csource=" + encodeURIComponent(t.channelsource) + "&cuid=" + t.cuid + "&v=" + t.v;
            r = Object.assign({}, t.vars, r), Object.keys(r).forEach(function(e) {
                var c = e, a = !1;
                try {
                    a = "elementid" === (c = e.toLowerCase()) && "pv" === r[e].toLowerCase();
                } catch (e) {}
                "stattype" !== c && "timestamp" !== c && "url" !== c && "ua" !== c && "csource" !== c && "cuid" !== c && "v" !== c && (i = i + "&" + encodeURIComponent(e) + "=" + encodeURIComponent(r[e])), 
                "pageShow" === e ? (n = !0, o = "pageShow=" + (r[e] || t.pageShowId)) : a && (i = i + "&pageShowId=" + t.pageShowId, 
                n = !0, o = "elementid=pv");
            }), !0 === n ? t.pv(i, o) : t.push(i);
        } else t.dev && console.log("rprm.rec 的入参必须是对象"); else t.dev && console.log("打点被设为关闭, 不记录打点信息:", r);
    },
    public: function(r, n) {
        "object" === (void 0 === r ? "undefined" : e(r)) && r instanceof Array == !1 && (t.vars = "new" === n ? Object.assign({}, t.vars, r) : r);
    },
    csource: function(e) {
        "string" != typeof e && "number" != typeof e || (t.channelsource = e);
    },
    tracepromotion: function(r) {
        if ("object" === (void 0 === r ? "undefined" : e(r)) && r instanceof Array == !1) {
            t.vars = Object.assign({}, t.vars, r);
            var n = {
                update: Date.now(),
                obj: r
            };
            wx.setStorageSync("rprm_tracepromotion", n);
        }
    },
    getCurrentRoute: function() {
        try {
            var e = getCurrentPages();
            if (Array.isArray(e)) return e[e.length - 1].route;
            throw "error";
        } catch (e) {
            return "N/A";
        }
    },
    capture: function() {
        var r = Page;
        Page = function() {
            var n = this, o = arguments[0].onLoad;
            return arguments[0].onLoad = function() {
                var r = this, n = arguments;
                if ("object" === e(n[0])) {
                    var c = n[0], a = "";
                    Object.keys(c).forEach(function(e) {
                        a = a + "&" + e + "=" + c[e];
                    }), 0 !== a.length && (a = "?" + a.slice(1)), t.urlstring = a, t.urlroute = t.getCurrentRoute();
                }
                if ("function" == typeof o) return o.apply(r, n);
            }, r.apply(n, arguments);
        };
    },
    reCapture: function() {
        --t.retry, t.retry > 0 && setTimeout(function() {
            try {
                t.capture();
            } catch (e) {
                t.reCapture();
            }
        }, 0);
    },
    urlstring: "",
    channelsource: "",
    vars: Object.create(null),
    recAPI: "https://mobileapm.weimob.com/postFrontEndData",
    ancAPI: "https://statistic.weimobdc.com/wm.css",
    appName: "hello",
    statType: "world",
    timer: null,
    rtimer: null,
    isSending: !1,
    risSending: !1,
    retry: 5,
    rretry: 5,
    count: 10,
    len: 1024,
    frequency: 6e4,
    rfrequency: 6e4,
    lastTime: 0,
    currentTime: 0,
    rlastTime: 0,
    rcurrentTime: 0,
    ref: !1,
    dev: !1,
    dataId: Math.random().toString(32).slice(-10),
    dataIndex: 1e3,
    LZ: !0,
    RLZ: !0,
    systemInfo: null,
    geoInfo: null,
    ua: "",
    v: "mp-32"
};

try {
    t.capture();
} catch (e) {
    t.reCapture();
}

try {
    wx && (wx.rprm = t);
} catch (e) {
    console.log("绑定RPRM到全局wx对象失败");
}

"function" == typeof define && define.amd ? define(function() {
    return t;
}) : "undefined" != typeof module && null != module && (module.exports = t);
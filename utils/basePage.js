function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];
        for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
}, n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, r = t(require("../common/auth/session")), o = t(require("../common/auth/constants")), a = t(require("./wxqrcode")), i = (require("../config/config"), 
t(require("../store/store"))), c = t(require("../common/http/request")), l = t(require("./util")), s = getApp(), u = null, g = null, p = null, d = null;

exports.default = {
    app: s,
    baseData: {
        isIpx: s.globalData.isIpx,
        apiUrl: "http://mock.dev.weimob.com/",
        alertOption: {
            title: "",
            content: "提示内容",
            btnText: "确定",
            okOpt: {
                text: "确定"
            },
            cancelOpt: {
                text: "取消"
            },
            type: "alert"
        },
        cancelalertOption: {
            title: "",
            content: "提示内容",
            btnText: "确定",
            okOpt: {
                text: "确定"
            },
            cancelOpt: {
                text: "取消"
            },
            type: "alert"
        },
        showLoading: !1,
        toastOption: {
            content: "",
            timer: 2e3
        },
        errOption: {
            type: "404",
            page: "index",
            msg: "",
            show: !1
        },
        qrCodeOption: {},
        actualPay: 0,
        payLeftTime: "",
        mm: "",
        ss: ""
    },
    alert: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "提示内容", e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", n = arguments[2], r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "确定";
        p = n;
        var o = {
            showModal: !0,
            content: t,
            title: e,
            btnText: r,
            type: "alert"
        };
        this.setData({
            alertOption: o
        });
    },
    cancelalert: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "提示内容", e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", n = arguments[2], r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "确定";
        d = n;
        var o = {
            showModal: !0,
            content: t,
            title: e,
            btnText: r,
            type: "cancelalert"
        };
        this.setData({
            cancelalertOption: o
        });
    },
    alertCallBack: function() {
        if (p) switch (void 0 === p ? "undefined" : n(p)) {
          case "string":
            this[p]();
            break;

          case "function":
            p();
        }
    },
    cancelalertCallBack: function(t) {
        function e() {
            return t.apply(this, arguments);
        }
        return e.toString = function() {
            return t.toString();
        }, e;
    }(function() {
        if (cancelalertCallBack) switch ("undefined" == typeof cancelalertCallBack ? "undefined" : n(cancelalertCallBack)) {
          case "string":
            this[cancelalertCallBack]();
            break;

          case "function":
            cancelalertCallBack();
        }
    }),
    confirm: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "提示内容", n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}, a = {
            showModal: !0,
            content: t,
            title: n,
            okOpt: e({
                text: "确定",
                fn: null
            }, r),
            cancelOpt: e({
                text: "取消",
                fn: null
            }, o),
            type: "confirm"
        };
        u = r.fn, g = o.fn, this.setData({
            alertOption: a
        });
    },
    okEvent: function() {
        if (u) switch (void 0 === u ? "undefined" : n(u)) {
          case "string":
            this[u]();
            break;

          case "function":
            u();
        }
    },
    cancelEvent: function() {
        if (g) switch (void 0 === g ? "undefined" : n(g)) {
          case "string":
            this[g]();
            break;

          case "function":
            g();
        }
    },
    showLoading: function() {
        this.setData({
            showLoading: !0
        });
    },
    hideLoading: function() {
        this.setData({
            showLoading: !1
        });
    },
    toast: function() {
        var t = {
            content: arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "提示内容",
            type: arguments[1],
            timer: arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 2e3,
            showToast: !0
        };
        this.setData({
            toastOption: t
        });
    },
    showCardQrCode: function(t, n) {
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        r.expiry ? r.showSur = !0 : r.showSur = !1, Object.assign(r, e({
            code: n
        }, {
            title: t
        }, {
            show: !0
        })), this.setData({
            qrCodeOption: r
        });
    },
    closeCardQrCode: function() {
        this.setData({
            qrCodeOption: {
                show: !1
            }
        });
    },
    pageRequest: function(t, e, n) {
        var r = this;
        return new Promise(function(o, a) {
            c.default.Post(t, e, n).then(function(e) {
                t.title, t.api;
                "string" == typeof e ? r.showErrorPage("500", e) : 0 === parseInt(e.errcode) || 0 === e.status ? o(e.data) : 7888874 === parseInt(e.errcode) ? wx.reLaunch({
                    url: "/pages/error/passedError"
                }) : ("/" + getCurrentPages()[getCurrentPages().length - 1].route).indexOf("pages/index/index") >= 0 ? r.showErrorPage(e.errcode, e.errmsg, "index") : r.showErrorPage(e.errcode, e.errmsg);
            }).catch(function(t) {
                wx.redirectTo({
                    url: "/" + r.route
                }), console.log("page   error");
            });
        });
    },
    simpleRequest: function(t, e, n) {
        var r = this, o = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3], a = arguments.length > 4 && void 0 !== arguments[4] && arguments[4], i = this;
        return o && i.showLoading(), console.log("??????????????????"), new Promise(function(o, l) {
            c.default.Post(t, e, n).then(function(e) {
                t.title, t.api;
                i.hideLoading(), "string" == typeof e ? r.alert(e, "出错了") : 0 === parseInt(e.errcode) ? o(e.data) : 7888874 === parseInt(e.errcode) ? wx.reLaunch({
                    url: "/pages/error/passedError"
                }) : (l(e), a || r.toast(e.errmsg));
            }).catch(function(t) {
                console.log("simple   error");
            });
        });
    },
    showErrorPage: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "404", e = arguments[1], n = arguments[2];
        this.setData({
            errOption: {
                type: t,
                msg: e,
                page: n,
                show: !0
            }
        });
    },
    setNavMenu: function(t, n) {
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, o = arguments[3], a = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
        wx.setNavigationBarTitle({
            title: t
        }), n && (wx.rprm && wx.rprm.public({
            pagename: n,
            secen: wx.getStorageSync("secen")
        }, "new"), wx.rprm.rec(e({
            elementid: "pv",
            eventtype: "view"
        }, r))), i.default.commit({
            menuState: {
                title: t,
                current: o,
                show: a
            }
        });
    },
    jumpUrl: function(t) {
        var e = "/" + getCurrentPages()[getCurrentPages().length - 1].route;
        if (t.indexOf("?") >= 0 && t.substring(0, t.indexOf("?")) == e) wx.redirectTo({
            url: t
        }); else if (e != t) {
            var n = getCurrentPages(), r = "" + t, o = [ "/pages/index/index", "/pages/order/list", "/pages/member/index" ];
            for (var a in o) if (0 == r.indexOf(o[a])) return void wx.reLaunch({
                url: r
            });
            n.length >= 5 ? wx.redirectTo({
                url: r
            }) : wx.navigateTo({
                url: r
            });
        }
    },
    createQrCode: function(t) {
        return a.default.createQrCodeImg(t, {
            size: 420
        });
    },
    getSessionInfo: function(t) {
        return console.log(r.default), r.default.get(o.default.WX_SESSION_WXAPP_SESSION)[t];
    },
    calculateTime: function(t) {
        var e = l.default.formatDate(t / 1e3, "mm:ss"), n = e.split(":");
        this.setData({
            payLeftTime: e,
            mm: n[0],
            ss: n[1]
        });
    },
    accAdd: function(t, e) {
        var n = void 0, r = void 0, o = void 0, a = void 0;
        try {
            n = t.toString().split(".")[1].length;
        } catch (t) {
            n = 0;
        }
        try {
            r = e.toString().split(".")[1].length;
        } catch (t) {
            r = 0;
        }
        if (a = Math.abs(n - r), o = Math.pow(10, Math.max(n, r)), a > 0) {
            var i = Math.pow(10, a);
            n > r ? (t = Number(t.toString().replace(".", "")), e = Number(e.toString().replace(".", "")) * i) : (t = Number(t.toString().replace(".", "")) * i, 
            e = Number(e.toString().replace(".", "")));
        } else t = Number(t.toString().replace(".", "")), e = Number(e.toString().replace(".", ""));
        return (t + e) / o;
    },
    accSub: function(t, e) {
        var n = void 0, r = void 0, o = void 0, a = void 0;
        try {
            n = t.toString().split(".")[1].length;
        } catch (t) {
            n = 0;
        }
        try {
            r = e.toString().split(".")[1].length;
        } catch (t) {
            r = 0;
        }
        return o = Math.pow(10, Math.max(n, r)), a = n >= r ? n : r, ((t * o - e * o) / o).toFixed(a);
    },
    accMul: function(t, e) {
        var n = 0, r = t.toString(), o = e.toString();
        try {
            n += r.split(".")[1].length;
        } catch (t) {}
        try {
            n += o.split(".")[1].length;
        } catch (t) {}
        return Number(r.replace(".", "")) * Number(o.replace(".", "")) / Math.pow(10, n);
    },
    accDiv: function(t, e) {
        var n, r, o = 0, a = 0;
        try {
            o = t.toString().split(".")[1].length;
        } catch (t) {}
        try {
            a = e.toString().split(".")[1].length;
        } catch (t) {}
        return n = Number(t.toString().replace(".", "")), r = Number(e.toString().replace(".", "")), 
        n / r * Math.pow(10, a - o);
    },
    toFixed2: function(t) {
        return this.accDiv(Math.floor(this.accMul(t, 100)), 100);
    },
    onShareAppMessage: function() {
        return {
            title: wx.getStorageSync("storeName"),
            path: "/pages/index/index?storeId=" + wx.getStorageSync("storeId"),
            imageUrl: wx.getStorageSync("storePic"),
            success: function(t) {},
            fail: function(t) {}
        };
    },
    rprm: function(t, n) {
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        wx.rprm.rec(e({
            elementid: t,
            eventtype: n
        }, r));
    }
};
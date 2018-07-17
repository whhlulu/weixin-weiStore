function n(n, t) {
    if (!(n instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = Object.assign || function(n) {
    for (var t = 1; t < arguments.length; t++) {
        var e = arguments[t];
        for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (n[o] = e[o]);
    }
    return n;
}, e = function() {
    function n(n, t) {
        for (var e = 0; e < t.length; e++) {
            var o = t[e];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(n, o.key, o);
        }
    }
    return function(t, e, o) {
        return e && n(t.prototype, e), o && n(t, o), t;
    };
}(), o = getApp(), r = function() {
    function t() {
        n(this, t), this.app = o, this.methods = {
            onLoad: this.onLoad,
            onShow: this.onShow
        };
    }
    return e(t, [ {
        key: "onLoad",
        value: function(n) {}
    }, {
        key: "onShow",
        value: function() {}
    } ]), t;
}();

exports.default = function(n) {
    var e = Page, a = new r(n);
    for (var i in a.methods) !function() {
        if ("onShareAppMessage" == i) return "continue";
        var t = a.methods[i];
        a.methods[i] = function() {
            var e = i;
            return function(o) {
                t.call(this, o), "function" == typeof n[e] && n[e].call(this, o);
            };
        }();
    }();
    e(o.auth.loginCheck(t({
        data: a.data
    }, n, a.methods)));
};
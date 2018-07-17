function e(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = function() {
    function e(e, n) {
        for (var t = 0; t < n.length; t++) {
            var r = n[t];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(n, t, r) {
        return t && e(n.prototype, t), r && e(n, r), n;
    };
}(), t = function() {
    function t() {
        e(this, t), this.callbacks = {};
    }
    return n(t, [ {
        key: "set",
        value: function(e, n) {
            e && e in this.callbacks && this.callbacks[e](n);
        }
    }, {
        key: "on",
        value: function(e, n) {
            return !(!e || "function" != typeof n) && (this.callbacks[e] = n, !0);
        }
    } ]), t;
}();

exports.default = new t();
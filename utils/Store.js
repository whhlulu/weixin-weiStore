function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var a = e[n];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(t, a.key, a);
        }
    }
    return function(e, n, a) {
        return n && t(e.prototype, n), a && t(e, a), e;
    };
}(), n = function() {
    function n(e, a, i) {
        var r = this;
        t(this, n), this.state = {}, this.action = {}, this.getters = {}, this.mapState = function() {
            return {
                state: r.state
            };
        }, this.mapAction = function() {
            return {
                action: r.action
            };
        }, this.state = e, this.action = a, this.getters = i;
    }
    return e(n, [ {
        key: "commit",
        value: function() {
            var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            for (var n in e) n && (this.state[n] = e[n]);
            getCurrentPages().forEach(function(e) {
                e.setData({
                    state: t.state
                }), e.selectComponent("#container") && e.selectComponent("#container").setData({
                    state: t.state
                });
            });
        }
    } ]), n;
}();

exports.default = n;
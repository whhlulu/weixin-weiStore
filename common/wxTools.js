function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
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
}(), n = function() {
    function n() {
        e(this, n);
    }
    return t(n, [ {
        key: "setStorageSync",
        value: function(e, t) {
            wx.setStorageSync(e, t);
        }
    }, {
        key: "getStorageSync",
        value: function(e) {
            return wx.getStorageSync(e);
        }
    }, {
        key: "clearStorageSync",
        value: function() {
            return wx.clearStorageSync();
        }
    }, {
        key: "removeStorageSync",
        value: function(e) {
            return wx.removeStorageSync(e);
        }
    }, {
        key: "toThousands",
        value: function(e) {
            return (e || 0).toString().replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, "$&,");
        }
    }, {
        key: "delcommafy",
        value: function(e) {
            return "" == (e + "").trim() ? "0" : e = e.replace(/,/gi, "");
        }
    }, {
        key: "trim",
        value: function(e) {
            return this.isString(e) ? e.trim() : e;
        }
    }, {
        key: "toJson",
        value: function(e, t) {
            if (!this.isUndefined(e)) return this.isNumber(t) || (t = t ? 2 : null), JSON.stringify(e, null, t);
        }
    }, {
        key: "fromJson",
        value: function(e) {
            return this.isString(e) ? JSON.parse(e) : e;
        }
    }, {
        key: "merge",
        value: function() {
            return Object.assign.apply(Object, arguments);
        }
    }, {
        key: "formatData",
        value: function(e, t) {
            t || (t = "YYYY-MM-DD HH:mm"), "string" == typeof e ? e = new Date(e) : "number" == typeof e ? e = new Date(1e3 * e) : e instanceof Date || (e = new Date());
            var n = [ "日", "一", "二", "三", "四", "五", "六" ];
            return t.replace(/YYYY|YY|MM|DD|HH|hh|mm|SS|ss|week/g, function(t) {
                switch (t) {
                  case "YYYY":
                    return e.getFullYear();

                  case "YY":
                    return (e.getFullYear() + "").slice(2);

                  case "MM":
                    return e.getMonth() + 1 < 10 ? "0" + (e.getMonth() + 1) : e.getMonth() + 1;

                  case "DD":
                    return e.getDate() < 10 ? "0" + e.getDate() : e.getDate();

                  case "HH":
                  case "hh":
                    return e.getHours() < 10 ? "0" + e.getHours() : e.getHours();

                  case "mm":
                    return e.getMinutes() < 10 ? "0" + e.getMinutes() : e.getMinutes();

                  case "SS":
                  case "ss":
                    return e.getSeconds() < 10 ? "0" + e.getSeconds() : e.getSeconds();

                  case "week":
                    return n[e.getDay()];
                }
            });
        }
    } ]), n;
}();

exports.default = new n();
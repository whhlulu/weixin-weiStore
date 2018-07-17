function e(e, r) {
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = function() {
    function e(e, r) {
        for (var t = 0; t < r.length; t++) {
            var n = r[t];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(r, t, n) {
        return t && e(r.prototype, t), n && e(r, n), r;
    };
}(), t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./lib/promisify")), n = [ "clearStorage", "hideToast", "showNavigationBarLoading", "hideNavigationBarLoading", "drawCanvas", "canvasToTempFilePath", "hideKeyboard" ], i = function() {
    function i() {
        e(this, i), this._wxApi = wx, this._wrappedApi = {}, this._wrapperApi();
    }
    return r(i, [ {
        key: "WxApi",
        get: function() {
            return this._wrappedApi;
        }
    } ]), r(i, [ {
        key: "_canNotPromisable",
        value: function(e) {
            return -1 !== n.indexOf(e) || /^(on|create|stop|pause|close)/.test(e) || /\w+Sync$/.test(e);
        }
    }, {
        key: "_wrapperApi",
        value: function() {
            var e = this;
            Object.keys(this._wxApi).forEach(function(r) {
                e._canNotPromisable(r) ? e._wrappedApi[r] = function() {
                    for (var t = arguments.length, n = Array(t), i = 0; i < t; i++) n[i] = arguments[i];
                    try {
                        e._wxApi[r].apply(e._wrappedApi, n);
                    } catch (e) {
                        reject({
                            msg: "wx接口调用异常"
                        });
                    }
                } : e._wrappedApi[r] = function(n) {
                    var i = n || {};
                    return new t.default(function(t, n) {
                        i.success = t, i.fail = function(e) {
                            n(e && e.errMsg ? new Error(e.errMsg) : e);
                        };
                        try {
                            e._wxApi[r](i);
                        } catch (e) {
                            n({
                                msg: "wx接口调用异常"
                            });
                        }
                    });
                };
            });
        }
    } ]), i;
}();

exports.default = new i().WxApi;
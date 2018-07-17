var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(t, n) {
    if ("object" == ("undefined" == typeof exports ? "undefined" : e(exports)) && "object" == ("undefined" == typeof module ? "undefined" : e(module))) module.exports = n(); else if ("function" == typeof define && define.amd) define([], n); else {
        var r = n();
        for (var o in r) ("object" == ("undefined" == typeof exports ? "undefined" : e(exports)) ? exports : t)[o] = r[o];
    }
}(void 0, function() {
    return function(e) {
        function t(r) {
            if (n[r]) return n[r].exports;
            var o = n[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return e[r].call(o.exports, o, o.exports, t), o.l = !0, o.exports;
        }
        var n = {};
        return t.m = e, t.c = n, t.i = function(e) {
            return e;
        }, t.d = function(e, n, r) {
            t.o(e, n) || Object.defineProperty(e, n, {
                configurable: !1,
                enumerable: !0,
                get: r
            });
        }, t.n = function(e) {
            var n = e && e.__esModule ? function() {
                return e.default;
            } : function() {
                return e;
            };
            return t.d(n, "a", n), n;
        }, t.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }, t.p = "", t(t.s = 7);
    }([ function(t, n, r) {
        var o = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
            return void 0 === t ? "undefined" : e(t);
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
        };
        t.exports = {
            type: function(e) {
                return Object.prototype.toString.call(e).slice(8, -1).toLowerCase();
            },
            isObject: function(e, t) {
                return t ? "object" === this.type(e) : e && "object" === (void 0 === e ? "undefined" : o(e));
            },
            isFormData: function(e) {
                return "undefined" != typeof FormData && e instanceof FormData;
            },
            trim: function(e) {
                return e.replace(/(^\s*)|(\s*$)/g, "");
            },
            encode: function(e) {
                return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
            },
            formatParams: function(e) {
                var t = [];
                for (var n in e) {
                    var r = e[n];
                    this.isObject(r) && (r = JSON.stringify(r)), t.push(this.encode(n) + "=" + this.encode(r));
                }
                return t.join("&");
            },
            merge: function(e, t) {
                for (var n in t) e.hasOwnProperty(n) ? this.isObject(t[n], 1) && this.isObject(e[n], 1) && this.merge(e[n], t[n]) : e[n] = t[n];
                return e;
            }
        };
    }, , function(t, n, r) {
        function o(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        var s = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
            return void 0 === t ? "undefined" : e(t);
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
        }, a = function() {
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
        }(), i = r(0), u = "undefined" != typeof document;
        t.exports = function(e) {
            return function() {
                function t() {
                    o(this, t), this.requestHeaders = {}, this.readyState = 0, this.timeout = 0, this.responseURL = "", 
                    this.responseHeaders = {};
                }
                return a(t, [ {
                    key: "_call",
                    value: function(e) {
                        this[e] && this[e].apply(this, [].splice.call(arguments, 1));
                    }
                }, {
                    key: "_changeReadyState",
                    value: function(e) {
                        this.readyState = e, this._call("onreadystatechange");
                    }
                }, {
                    key: "open",
                    value: function(e, t) {
                        if (this.method = e, t) {
                            if (0 !== (t = i.trim(t)).indexOf("http") && u) {
                                var n = document.createElement("a");
                                n.href = t, t = n.href;
                            }
                        } else t = location.href;
                        this.responseURL = t, this._changeReadyState(1);
                    }
                }, {
                    key: "send",
                    value: function(t) {
                        var n = this;
                        if (t = t || null, u) {
                            var r = document.cookie;
                            r && (this.requestHeaders.cookie = r);
                        }
                        var o = this;
                        if (e) {
                            var a = {
                                method: o.method,
                                url: o.responseURL,
                                headers: o.requestHeaders || {},
                                body: t
                            };
                            i.merge(a, o._options || {}), "GET" === a.method && (a.body = null), o._changeReadyState(3);
                            var c;
                            o.timeout = o.timeout || 0, o.timeout > 0 && (c = setTimeout(function() {
                                3 === o.readyState && (n._call("onloadend"), o._changeReadyState(0), o._call("ontimeout"));
                            }, o.timeout)), a.timeout = o.timeout, e(a, function(e) {
                                if (3 === o.readyState) {
                                    if (clearTimeout(c), o.status = e.statusCode - 0, 0 === o.status) o.statusText = e.responseText, 
                                    o._call("onerror", {
                                        msg: e.statusMessage
                                    }); else {
                                        var t = {};
                                        for (var n in e.headers) {
                                            var r = e.headers[n], a = n.toLowerCase();
                                            "object" === (void 0 === r ? "undefined" : s(r)) ? t[a] = r : (t[a] = t[a] || [], 
                                            t[a].push(r));
                                        }
                                        var i = t["set-cookie"];
                                        u && i && i.forEach(function(e) {
                                            document.cookie = e.replace(/;\s*httpOnly/gi, "");
                                        }), o.responseHeaders = t, o.statusText = e.statusMessage || "", o.response = o.responseText = e.responseText, 
                                        o._response = e, o._changeReadyState(4), o._call("onload");
                                    }
                                    o._call("onloadend");
                                }
                            });
                        } else console.error("Ajax require adapter");
                    }
                }, {
                    key: "setRequestHeader",
                    value: function(e, t) {
                        this.requestHeaders[i.trim(e)] = t;
                    }
                }, {
                    key: "getResponseHeader",
                    value: function(e) {
                        return (this.responseHeaders[e.toLowerCase()] || "").toString();
                    }
                }, {
                    key: "getAllResponseHeaders",
                    value: function() {
                        var e = "";
                        for (var t in this.responseHeaders) e += t + ":" + this.getResponseHeader(t) + "\r\n";
                        return e;
                    }
                }, {
                    key: "abort",
                    value: function(e) {
                        this._changeReadyState(0), this._call("onerror", {
                            msg: e
                        }), this._call("onloadend");
                    }
                } ], [ {
                    key: "setAdapter",
                    value: function(t) {
                        e = t;
                    }
                } ]), t;
            }();
        };
    }, function(e, t, n) {
        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        var o = function() {
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
        }(), s = n(0), a = "undefined" != typeof document, i = function() {
            function e(t) {
                r(this, e), this.engine = t || XMLHttpRequest, this.interceptors = {
                    response: {
                        use: function(e, t) {
                            this.handler = e, this.onerror = t;
                        }
                    },
                    request: {
                        use: function(e) {
                            this.handler = e;
                        }
                    }
                }, this.config = {
                    method: "GET",
                    baseURL: "",
                    headers: {},
                    timeout: 0,
                    withCredentials: !1
                };
            }
            return o(e, [ {
                key: "request",
                value: function(e, t, n) {
                    var r = this, o = new this.engine(), i = new Promise(function(i, u) {
                        n = n || {}, r.config.headers = s.merge(r.config.headers || {}, {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }), s.merge(n, r.config);
                        var c = r.interceptors.request, f = r.interceptors.response;
                        n.body = t || n.body;
                        var d = !1, l = {
                            reject: function(e) {
                                d = !0, u(e);
                            },
                            resolve: function(e) {
                                d = !0, i(e);
                            }
                        };
                        if (e = s.trim(e || ""), n.method = n.method.toUpperCase(), n.url = e, (!c.handler || (n = c.handler(n, l))) && !d) {
                            !(e = s.trim(n.url)) && a && (e = location.href);
                            var p = s.trim(n.baseURL || "");
                            if (0 !== e.indexOf("http")) {
                                var h = "/" === e[0];
                                if (!p && a) {
                                    var y = location.pathname.split("/");
                                    y.pop(), p = location.protocol + "//" + location.host + (h ? "" : y.join("/"));
                                }
                                if ("/" !== p[p.length - 1] && (p += "/"), e = p + (h ? e.substr(1) : e), a) {
                                    var m = document.createElement("a");
                                    m.href = e, e = m.href;
                                }
                            }
                            var v = s.trim(n.responseType || "");
                            o.withCredentials = !!n.withCredentials;
                            var b = "GET" === n.method;
                            b && n.body && (t = s.formatParams(n.body), e += (-1 === e.indexOf("?") ? "?" : "&") + t), 
                            o.open(n.method, e);
                            try {
                                o.timeout = n.timeout || 0, "stream" !== v && (o.responseType = v);
                            } catch (e) {}
                            s.isFormData(n.body) || -1 === [ "object", "array" ].indexOf(s.type(n.body)) || (n.headers["Content-Type"] = "application/json;charset=utf-8", 
                            t = JSON.stringify(n.body));
                            for (var g in n.headers) if ("content-type" !== g.toLowerCase() || !s.isFormData(n.body) && n.body && !b) try {
                                o.setRequestHeader(g, n.headers[g]);
                            } catch (e) {} else delete n.headers[g];
                            var x = function(e) {
                                return f.onerror && (e = f.onerror(e, l)), e;
                            };
                            o.onload = function() {
                                if (o.status >= 200 && o.status < 300 || 304 === o.status) {
                                    var e = o.response || o.responseText;
                                    -1 === (o.getResponseHeader("Content-Type") || "").indexOf("json") || s.isObject(e) || (e = JSON.parse(e));
                                    var t = {
                                        data: e,
                                        engine: o,
                                        request: n
                                    };
                                    if (s.merge(t, o._response), f.handler && (t = f.handler(t, l) || t), d) return;
                                    i(t);
                                } else {
                                    var r = new Error(o.statusText);
                                    if (r.status = o.status, r = x(r) || r, d) return;
                                    u(r);
                                }
                            }, o.onerror = function(e) {
                                var t = new Error(e.msg || "Network Error");
                                t.status = 0, t = x(t), d || u(t);
                            }, o.ontimeout = function() {
                                var e = new Error("timeout [ " + o.timeout + "ms ]");
                                e.status = 1, e = x(e), d || u(e);
                            }, o._options = n, setTimeout(function() {
                                o.send(b ? null : t);
                            }, 0);
                        }
                    });
                    return i.engine = o, i;
                }
            }, {
                key: "all",
                value: function(e) {
                    return Promise.all(e);
                }
            }, {
                key: "spread",
                value: function(e) {
                    return function(t) {
                        return e.apply(null, t);
                    };
                }
            } ]), e;
        }();
        [ "get", "post", "put", "delete", "patch" ].forEach(function(e) {
            i.prototype[e] = function(t, n, r) {
                return this.request(t, n, s.merge({
                    method: e
                }, r));
            };
        }), e.exports = i;
    }, function(e, t, n) {
        e.exports = function(e, t) {
            var n = {
                method: e.method,
                url: e.url,
                dataType: e.dataType || "text",
                header: e.headers,
                data: e.body || {},
                success: function(e) {
                    t({
                        statusCode: e.statusCode,
                        responseText: e.data,
                        headers: e.header,
                        statusMessage: e.errMsg
                    });
                },
                fail: function(e) {
                    t({
                        statusCode: e.statusCode || 0,
                        statusMessage: e.errMsg
                    });
                }
            };
            wx.request(n);
        };
    }, , , function(e, t, n) {
        var r = n(3), o = n(2)(n(4));
        e.exports = function(e) {
            return new r(e || o);
        };
    } ]);
});
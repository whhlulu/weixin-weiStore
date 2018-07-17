function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

module.exports = Behavior({
    properties: {},
    data: {},
    attached: function() {},
    methods: {
        valueChange: function(t) {
            var a = t.detail.value;
            t.currentTarget.dataset.type ? (this.setData({
                inputValue: {
                    name: a,
                    sex: this.data.sex
                }
            }), this.validate()) : (this.setData({
                inputValue: a
            }), this.validate());
        },
        initValue: function() {},
        validate: function() {
            var t = this.data.inputValue || "";
            if (0 == t.length && "false" !== this.data.required && !1 !== this.data.required) return this.setData({
                pass: !1,
                errMsg: this.data.title + "不能为空"
            }), !1;
            if (this.data.validation && t) switch (this.data.validation) {
              case "email":
                var a = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                if (!a.test(t)) return this.setData({
                    pass: !1,
                    errMsg: "请输入正确的邮箱"
                }), !1;
                break;

              case "phone":
                if (!(a = /^1[3|4|5|7|8][0-9]\d{8}$/).test(t)) return this.setData({
                    pass: !1,
                    errMsg: "请输入正确的手机号"
                }), !1;
                break;

              case "int":
                if (!(a = /^[0-9]+$/).test(t)) return this.setData({
                    pass: !1,
                    errMsg: "请输入有效的整数"
                }), !1;
                break;

              case "float":
                if (!(a = /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g).test(t)) return this.setData({
                    pass: !1,
                    errMsg: "请输入有效的数字"
                }), !1;
                break;

              case "double":
                if (!(a = /^\d+(?:\.\d{1,2})?$/).test(t)) return this.setData({
                    pass: !1,
                    errMsg: "最多两位小数"
                }), !1;
                break;

              default:
                if (!(a = this.data.validation).test(t)) return this.setData({
                    pass: !1,
                    errMsg: this.data.title + "输入不正确，请检查"
                }), !1;
            }
            return this.setData({
                pass: !0,
                errMsg: ""
            }), !0;
        },
        getValue: function() {
            var a = this.data.inputValue;
            return t({}, this.data.name, a);
        },
        getValueObj: function() {
            var t = this.data.inputValue;
            return {
                name: this.data.name,
                value: t
            };
        },
        plus: function() {
            var t = this.data, e = t.inputValue, s = t.max, i = t.step;
            if (e != s) {
                var n = e + i;
                "object" != (void 0 === s ? "undefined" : a(s)) && n > s && (n = s), this.setData({
                    inputValue: n
                });
            } else getCurrentPages()[0].toast("不能再加啦");
        },
        sub: function() {
            var t = this.data, e = t.inputValue, s = t.min, i = t.step;
            if (e != s) {
                var n = e - i;
                "object" != (void 0 === s ? "undefined" : a(s)) && n < s && (n = s), this.setData({
                    inputValue: n
                });
            } else getCurrentPages()[0].toast("不能再减啦");
        },
        checkSex: function(t) {
            this.setData({
                inputValue: {
                    name: this.data.inputValue,
                    sex: t.currentTarget.dataset.value
                }
            }), this.setData({
                sex: t.currentTarget.dataset.value
            });
        }
    },
    ready: function() {
        var t = this.data, a = t.value, e = t.type;
        return this.setData({
            inputValue: a
        }), "phone" === e && this.setData({
            validation: "phone"
        }), "int" === e && this.setData({
            validation: "int"
        }), "float" === e && this.setData({
            validation: "float"
        }), "double" === e && this.setData({
            validation: "double"
        }), "number" != this.data.type || this.data.value || (this.data.min ? this.setData({
            inputValue: parseInt(this.data.min)
        }) : this.setData({
            inputValue: 0
        })), {};
    }
});
Component({
    properties: {
        buttonText: {
            type: null
        },
        isFocus: {
            type: null,
            value: !0
        }
    },
    data: {
        phoneValue: "",
        codeValue: "",
        isPass: !1,
        codeDisabled: !1,
        sendText: "发送验证码",
        setTimer: 60,
        timeout: null
    },
    methods: {
        sendCode: function() {
            if (this.data.isPass && !this.data.codeDisabled) {
                var t = this.data.setTimer;
                this.setData({
                    sendText: t + "s 后再试",
                    codeDisabled: !0
                }), this.recursionCountdown(), this.triggerEvent("sendCode", this.data);
            }
        },
        recursionCountdown: function() {
            var t = this, e = setTimeout(function() {
                if (1 === t.data.setTimer) /^1[3-9][0-9]\d{8}$/.test(t.data.phoneValue) ? t.setData({
                    isPass: !0
                }) : t.setData({
                    isPass: !1
                }), t.setData({
                    sendText: "发送验证码",
                    setTimer: 60,
                    codeDisabled: !1
                }); else {
                    var e = Number(t.data.setTimer - 1);
                    t.setData({
                        sendText: e + "s 后再试",
                        setTimer: e
                    }), t.recursionCountdown();
                }
            }, 1e3);
            this.setData({
                timeout: e
            });
        },
        validatePhone: function(t) {
            var e = t.detail.value;
            /^1[3-9][0-9]\d{8}$/.test(e) ? this.setData({
                isPass: !0,
                phoneValue: e
            }) : this.setData({
                isPass: !1,
                phoneValue: e
            }), this.triggerEvent("confirmButtonChange", this.data);
        },
        getCode: function(t) {
            var e = t.detail.value;
            this.setData({
                codeValue: e
            }), this.triggerEvent("confirmButtonChange", this.data);
        }
    }
});
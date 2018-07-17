var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/wxqrcode"));

Component({
    properties: {
        options: {
            type: Object,
            value: {
                show: !1,
                title: "",
                expiry: "",
                code: "",
                surPlus: 0,
                showSur: !1,
                type: 0
            },
            observer: "createQrCode"
        }
    },
    data: {
        qrcode: "",
        show: !1
    },
    methods: {
        createQrCode: function() {
            var t = this;
            if (t.data.options.show) {
                var o = e.default.createQrCodeImg(t.data.options.code, {
                    size: 420
                });
                t.setData({
                    qrcode: o,
                    show: !0
                });
            }
        },
        stopScroll: function() {},
        close: function() {
            this.setData({
                "options.show": !1
            }), this.triggerEvent("close", "");
        }
    },
    ready: function() {}
});
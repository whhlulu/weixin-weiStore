Component({
    properties: {
        option: {
            type: Object,
            value: {
                title: "",
                content: "提示内容",
                btnText: "确定",
                showModal: !1
            },
            observer: "showAlert"
        }
    },
    data: {
        showModal: !1
    },
    methods: {
        closeAlert: function(t) {
            this.triggerEvent("alertCallBack"), this.setData({
                showAlert: !1
            });
        },
        showAlert: function() {
            this.setData({
                showAlert: !0
            });
        },
        cancel: function() {
            this.triggerEvent("cancelEvent"), this.setData({
                showAlert: !1
            });
        },
        ok: function() {
            this.triggerEvent("okEvent"), this.setData({
                showAlert: !1
            });
        },
        stop: function() {}
    }
});
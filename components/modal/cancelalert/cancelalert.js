Component({
    properties: {
        option: {
            type: Object,
            value: {
                title: "",
                content: "提示内容",
                btnText: "知道了",
                showModal: !1
            },
            observer: "showAlert"
        },
        info: {
            type: Object,
            value: ""
        }
    },
    data: {
        showModal: !1
    },
    methods: {
        see: function() {
            console.log(this.data.option);
        },
        closeAlert: function(t) {
            var e = t.currentTarget.dataset.result;
            this.triggerEvent("alertCallBack", {
                result: e
            }), this.setData({
                showAlert: !1
            });
        },
        showAlert: function() {
            this.data.option.showModal && this.setData({
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
var t = null;

Component({
    properties: {
        option: {
            type: Object,
            value: {
                content: "",
                timer: 2e3,
                type: "",
                showToast: !1
            },
            observer: "showToast"
        }
    },
    data: {
        showToast: !1
    },
    methods: {
        showToast: function() {
          var o = this, s = this.properties.option, e = s.value.showToast, i = s.value.timer;
            e && (this.setData({
                showToast: e
            }), i && (t && (clearTimeout(t), t = null), t = setTimeout(function() {
                o.hideToast();
            }, Number(i))));
        },
        hideToast: function() {
            this.setData({
                "option.showToast": !1
            }), t && (clearTimeout(t), t = null);
        },
        stop: function() {}
    }
});
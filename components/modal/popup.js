Component({
    properties: {
        show: {
            type: Boolean,
            value: !1
        },
        clickModalToClose: {
            type: null,
            value: "false"
        },
        timeClass: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    methods: {
        close: function(o) {
            o || this.setData({
                show: !1
            }), "false" !== this.data.clickModalToClose && !1 !== this.data.clickModalToClose && this.setData({
                show: !1
            });
        },
        contentClick: function() {},
        stop: function() {}
    }
});
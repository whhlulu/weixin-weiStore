Component({
    properties: {
        title: {
            type: String,
            value: ""
        },
        show: {
            type: Boolean,
            value: !1,
            observer: "showModal"
        },
        height: {
            type: Boolean,
            value: !1
        },
        balance: {
            type: Boolean,
            value: !1
        },
        isPadding: {
            type: Boolean,
            value: !1
        },
        fontStyle: {
            type: String,
            value: "s-fb"
        },
        balancePb: {
            type: null,
            value: !1
        }
    },
    data: {},
    methods: {
        showModal: function() {
            console.log(this.data.show);
        },
        close: function() {
            this.setData({
                show: !1
            });
        }
    }
});
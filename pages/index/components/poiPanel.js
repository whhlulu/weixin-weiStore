Component({
    properties: {
        title: {
            type: null
        },
        isCoupon: {
            type: null,
            value: "false"
        },
        noMore: {
            type: null,
            value: "false"
        },
        noBorder: {
            type: null,
            value: "false"
        },
        moreText: {
            type: null,
            value: ""
        },
        noPadding: {
            type: null,
            value: ""
        },
        moreFlg: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    methods: {
        loadMore: function() {
            this.triggerEvent("loadMore", this.data);
        }
    }
});
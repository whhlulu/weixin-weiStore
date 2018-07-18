Component({
    properties: {
        title: {
            type: String,
            value: "已完成"
        },
        status: {
            type: String,
            value: "complete"
        },
        detail: {
            type: String,
            value: "已完成"
        },
        icon: {
            type: String
        },
        code: {
            type: String
        },
        order: {
            type: Object,
            value: null,
            observer: "orderChange"
        }
    },
    data: {
        detailObj: null
    },
    methods: {
        orderChange: function() {
            this.setData({
                detailObj: this.data.order
            });
        }
    },
    ready: function() {
        console.log("<<<<<<<<<<", this.data.order);
    }
});
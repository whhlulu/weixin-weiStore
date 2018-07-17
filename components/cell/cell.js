Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        isLink: {
            type: String,
            value: "false"
        },
        title: {
            type: null,
            value: ""
        },
        icon: {
            type: String,
            value: ""
        },
        titleCls: {
            type: null,
            value: ""
        },
        content: {
            type: null,
            value: ""
        },
        url: {
            type: String,
            value: ""
        },
        titleClass: {
            type: Array,
            value: []
        },
        titleStyle: {
            type: Object,
            value: {}
        },
        contentClass: {
            type: Array,
            value: []
        },
        contentStyle: {
            type: Object,
            value: {}
        },
        noBorder: {
            type: null,
            value: "false"
        },
        disabled: {
            type: null,
            value: "false"
        },
        noPadding: {
            type: null,
            value: "false"
        },
        colorType: {
            type: null,
            value: "s-fc-3"
        },
        tapDetail: {
            type: null
        }
    },
    data: {},
    methods: {
        cellClick: function() {
            this.data.url ? getCurrentPages()[getCurrentPages().length - 1].jumpUrl(this.data.url) : this.triggerEvent("cellClick", this.data);
        }
    }
});
Component({
    properties: {
        storeInfo: {
            type: Object,
            value: {}
        },
        mini: {
            type: null,
            value: "false"
        }
    },
    data: {},
    methods: {
        toStoreList: function() {
            wx.rprm.rec({
                elementid: "store_switch",
                eventtype: "tap"
            }), getCurrentPages()[getCurrentPages().length - 1].jumpUrl("/pages/index/storeList?from=index");
        }
    }
});
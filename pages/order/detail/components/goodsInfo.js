Component({
    properties: {
        storeInfo: {
            type: Object
        },
        goodsInfo: {
            type: Object
        }
    },
    data: {},
    methods: {
        gotoStoreList: function() {
            this.triggerEvent("toPoiPage", this.data);
        }
    }
});
Component({
    properties: {
        storeInfo: {
            type: Object
        },
        goodsInfo: {
            type: Object
        },
        goodsSkuVo: {
            type: Object
        },
        goodsComboVos: {
            type: Object
        }
    },
    data: {},
    methods: {
        toPoiPage: function() {
            this.triggerEvent("toPoiPage", this.data);
        }
    }
});
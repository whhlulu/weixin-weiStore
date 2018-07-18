Component({
    properties: {
        type: {
            type: Number,
            value: 0
        },
        cardNumber: {
            type: String,
            value: ""
        },
        total: {
            type: Number,
            value: 0
        },
        surplus: {
            type: Number,
            value: 0
        },
        status: {
            type: Number,
            value: 0
        }
    },
    data: {},
    methods: {
        useCard: function() {
            this.triggerEvent("useCard", this.data);
        },
        showUseLog: function() {
            getCurrentPages()[getCurrentPages().length - 1].jumpUrl("/pages/order/detail/cardUseRecord?code=" + this.properties.cardNumber);
        }
    }
});
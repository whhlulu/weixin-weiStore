Component({
    properties: {
        info: {
            type: Object,
            value: {
                duePrice: "",
                discount: "",
                shipDiscount: "",
                couponDiscount: "",
                pointDiscount: "",
                balanceDiscount: "",
                realPay: ""
            }
        },
        type: {
            type: String
        },
        orderStatus: {
            type: Number
        }
    },
    data: {},
    methods: {}
});
Component({
    properties: {
        first: {
            type: null,
            value: "false"
        },
        info: {
            type: Object
        },
        noBorder: {
            type: null,
            value: "false"
        }
    },
    data: {},
    methods: {
        toPay: function(e) {
            getCurrentPages()[getCurrentPages().length - 1].app.auth.isVerifyAuth(e).then(function(e) {
                getCurrentPages()[getCurrentPages().length - 1].rprm("pay", "tap"), getCurrentPages()[getCurrentPages().length - 1].jumpUrl("/pages/payment/storePay");
            });
        }
    }
});
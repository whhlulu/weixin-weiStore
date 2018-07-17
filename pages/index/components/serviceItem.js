Component({
    properties: {
        info: {
            type: Object
        },
        btnText: {
            type: String
        }
    },
    data: {},
    methods: {
        toReserve: function(e) {
            var t = this, r = this;
            getCurrentPages()[getCurrentPages().length - 1].app.auth.isVerifyAuth(e).then(function(e) {
                getCurrentPages()[getCurrentPages().length - 1].rprm("serviceBook", "tap", {
                    serviceId: r.data.info.productId
                }), getCurrentPages()[getCurrentPages().length - 1].jumpUrl("/pages/service/serviceDetail?productId=" + t.data.info.productId + "&isDisplay=true");
            });
        }
    }
});
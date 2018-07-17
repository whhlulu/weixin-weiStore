Component({
    properties: {
        first: {
            type: null,
            value: "false"
        },
        info: {
            type: Object
        },
        index: {
            type: Number
        }
    },
    methods: {
        receiveCoupon: function(e) {
            var t = this;
            getCurrentPages()[getCurrentPages().length - 1].app.auth.isVerifyAuth(e).then(function(e) {
                if ("-1" == t.data.info.status) {
                    var n = t.data.info.cardTemplateId;
                    t.triggerEvent("receiveCoupon", {
                        cardTemplateId: n,
                        index: t.data.index
                    });
                }
            });
        }
    }
});
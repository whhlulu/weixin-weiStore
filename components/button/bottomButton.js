var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (e[a] = r[a]);
    }
    return e;
}, t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../store/store"));

Component({
    properties: {
        buttonText: {
            type: null
        },
        salePrice: {
            type: null,
            value: "1"
        },
        originalPrice: {
            type: null,
            value: ""
        },
        buttonType: {
            type: null
        },
        isBuy: {
            type: null
        },
        productId: {
            type: null
        },
        cardTemplateId: {
            type: null
        },
        appointType: {
            type: null
        },
        skuId: {
            type: null
        },
        stock: {
            type: null
        }
    },
    data: e({}, t.default.mapState()),
    methods: {
        toDetailPage: function(e) {
            var t = this;
            getCurrentPages()[getCurrentPages().length - 1].app.auth.isVerifyAuth(e).then(function(e) {
                "团购" === t.data.buttonType && (t.triggerEvent("toCheckTeamBuy", t.data), t.properties.isBuy && (wx.rprm.rec({
                    elementid: "buyButtom",
                    eventtype: "tap"
                }), getCurrentPages()[getCurrentPages().length - 1].jumpUrl("/pages/team/submitOrder?cardTemplateId=" + t.properties.cardTemplateId))), 
                "预约" === t.properties.buttonType && t.triggerEvent("toReserve", t.data), "购买" === t.properties.buttonType && t.triggerEvent("toBuyCard", t.data), 
                "去下单" === t.properties.buttonType && t.triggerEvent("toPlaceOrder", t.data), "服务" === t.properties.buttonType && t.triggerEvent("toService", t.data);
            });
        }
    }
});
Component({
    properties: {
        active: {
            type: Number,
            value: 0
        },
        cardList: {
            type: Array,
            value: []
        }
    },
    data: {
        transaction: 0,
        left: 0,
        width: 0,
        inX: 0,
        tempTransaction: 0,
        moving: !1
    },
    methods: {
        toImmediatelyBuy: function(t) {
            getCurrentPages()[getCurrentPages().length - 1].jumpUrl("/pages/card/placeOrder");
        },
        handSown: function(t) {
            this.setData({
                inX: t.changedTouches[0].pageX,
                tempTransaction: this.data.transaction
            });
        },
        handMove: function(t) {
            this.setData({
                moving: !0
            });
            var e = this, a = this.data.inX, r = t.changedTouches[0].pageX - a, n = this.data.tempTransaction;
            (n -= r) <= 0 && (n = 0), e.setData({
                transaction: n
            });
        },
        handUp: function(t) {
            this.setData({
                moving: !1
            });
            var e = t.changedTouches[0].pageX, a = this.data.inX, r = e - a, n = this.data.active;
            Math.abs(r) > 20 && (e < a ? n != this.data.cardList.length - 1 && n++ : n > 0 && n--), 
            this.setData({
                active: n
            }), this.setPosition();
        },
        setPosition: function(t) {
            var e = this, a = this.data.width * e.data.active + 5;
            e.setData({
                transaction: a
            });
        },
        toCardDetail: function(t) {
            getCurrentPages()[getCurrentPages().length - 1].rprm("cycleCard", "tap", {
                serviceId: t.currentTarget.dataset.item.productId
            }), getCurrentPages()[getCurrentPages().length - 1].jumpUrl("/pages/card/cardDetail?productId=" + t.currentTarget.dataset.item.productId);
        },
        toCardDetailBuy: function(t) {
            getCurrentPages()[getCurrentPages().length - 1].app.auth.isVerifyAuth(t).then(function(e) {
                getCurrentPages()[getCurrentPages().length - 1].rprm("cycleCardBuy", "tap", {
                    serviceId: t.currentTarget.dataset.item.productId
                }), getCurrentPages()[getCurrentPages().length - 1].jumpUrl("/pages/card/cardDetail?productId=" + t.currentTarget.dataset.item.productId);
            });
        }
    },
    ready: function() {
        var t = this;
        setTimeout(function() {
            var e = t, a = t.createSelectorQuery();
            a.select(".swiper-wapper").boundingClientRect(), a.selectViewport().scrollOffset(), 
            a.exec(function(t) {
                e.setData({
                    width: t[0].width
                });
            }), t.setPosition(!0);
        }, 200);
    }
});
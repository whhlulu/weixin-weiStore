function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var r in a) Object.prototype.hasOwnProperty.call(a, r) && (t[r] = a[r]);
    }
    return t;
}, a = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../store/store"));

Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        tabList: {
            type: Array
        },
        height: {
            type: Number
        },
        initIndex: {
            type: Number,
            value: 0
        }
    },
    data: e({}, a.default.mapState(), {
        active: "",
        current: 0
    }),
    methods: {
        tabChange: function(t) {
            var e = t.currentTarget.dataset, a = e.name, r = e.index;
            this.setData({
                active: a,
                current: r
            }), this.triggerEvent("tabChange", a);
        },
        swiperChange: function(t) {
            var e = t.detail, a = e.current, r = e.source, n = this.data.tabList[a].name;
            if (r) {
                this.setData({
                    active: n,
                    current: a
                });
                var i = {
                    currentTarget: {
                        dataset: {
                            name: n,
                            index: a
                        }
                    }
                };
                this.tabChange(i);
            }
        }
    },
    ready: function() {
        var e = this.properties.initIndex;
        this.setData(t({
            active: this.data.tabList[0].name,
            current: e
        }, "active", this.properties.tabList[e].name));
    }
});
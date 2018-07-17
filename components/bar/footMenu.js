var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var r = arguments[e];
        for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (t[a] = r[a]);
    }
    return t;
}, e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../store/store"));

Component({
    properties: {
        option: {
            type: Object
        }
    },
    data: t({}, e.default.mapState()),
    methods: {
        toPath: function(t) {
            "/pages/index/index" != t.currentTarget.dataset.url ? getCurrentPages()[getCurrentPages().length - 1].app.auth.isVerifyAuth(t).then(function(e) {
                getCurrentPages()[getCurrentPages().length - 1].jumpUrl(t.currentTarget.dataset.url);
            }) : getCurrentPages()[getCurrentPages().length - 1].jumpUrl(t.currentTarget.dataset.url);
        }
    }
});
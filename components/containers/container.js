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
        klass: {
            type: String,
            value: ""
        }
    },
    data: t({}, e.default.mapState())
});
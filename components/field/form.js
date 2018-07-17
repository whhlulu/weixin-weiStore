function t(t) {
    if (Array.isArray(t)) {
        for (var e = 0, r = Array(t.length); e < t.length; e++) r[e] = t[e];
        return r;
    }
    return Array.from(t);
}

var e = require("./formCtl");

Component({
    relations: {
        formCtl: {
            type: "descendant",
            target: e
        }
    },
    properties: {
        class: {
            type: String,
            value: ""
        }
    },
    data: {},
    methods: {
        validate: function() {
            var t = this.getRelationNodes("formCtl"), e = 0;
            return t.forEach(function(t) {
                t.validate() && (e += 1);
            }), e == t.length;
        },
        getValue: function() {
            var t = {};
            return this.getRelationNodes("formCtl").forEach(function(e) {
                Object.assign(t, e.getValue());
            }), this.validate() && (t.inputPass = !0), t;
        },
        getValueList: function() {
            if (this.validate()) {
                var e = [];
                return this.getRelationNodes("formCtl").forEach(function(r) {
                    e.push.apply(e, t(r.getValueObj()));
                }), e;
            }
            return !1;
        }
    }
});
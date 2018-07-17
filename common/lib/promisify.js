Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./es6-promise.min"));

e.default.prototype.finally = function(e) {
    var t = this.constructor;
    return this.then(function(r) {
        return t.resolve(e()).then(function() {
            return r;
        });
    }, function(r) {
        return t.resolve(e()).then(function() {
            throw r;
        });
    });
}, exports.default = e.default;
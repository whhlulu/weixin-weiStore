Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = wx.getExtConfigSync ? wx.getExtConfigSync() : {};

exports.default = t;

exports.getApiUrl = function(e) {
    return "" + t.api.host + (t.api.prefix || "") + e;
}, exports.getAdapterApiUrl = function(e) {
    return "" + t.api.adaptertUrl + e;
};
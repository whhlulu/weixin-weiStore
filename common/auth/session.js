Object.defineProperty(exports, "__esModule", {
    value: !0
});

!function(e) {
    e && e.__esModule;
}(require("./constants"));

var e = {
    get: function(e) {
        return wx.getStorageSync(e) || null;
    },
    set: function(e, t) {
        wx.setStorageSync(e, t);
    },
    clear: function(e) {
        wx.removeStorageSync(e);
    }
};

exports.default = e;
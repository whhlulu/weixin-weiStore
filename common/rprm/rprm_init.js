function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("./rprm_wechat")), u = e(require("../../config/config")), a = (e(require("../auth/constants")), 
e(require("../auth/session"))), d = (u.default.form, {});

a.default.get("WX_SESSION_WXAPP_SESSION") && (d = {
    wid: a.default.get("WX_SESSION_WXAPP_SESSION").wid,
    pid: a.default.get("WX_SESSION_WXAPP_SESSION").pid
}), t.default.init({
    appName: "saaso2oxcx",
    statType: "saaso2oxcx"
}), t.default.public({
    wid: d.wid || "NA",
    pid: d.pid || "NA",
    business: "kld"
}, "new"), wx.rprm = t.default, exports.default = t.default;
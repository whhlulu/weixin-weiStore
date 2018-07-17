function t(t, s) {
    if (!(t instanceof s)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var s = function() {
    function t(t, s) {
        for (var i = 0; i < s.length; i++) {
            var e = s[i];
            e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), 
            Object.defineProperty(t, e.key, e);
        }
    }
    return function(s, i, e) {
        return i && t(s.prototype, i), e && t(s, e), s;
    };
}(), i = function() {
    function i() {
        t(this, i), this.chooseType = 3;
    }
    return s(i, [ {
        key: "drawCle",
        value: function(t, s) {
            this.ctx.setStrokeStyle("#00abdc"), this.ctx.setLineWidth(1), this.ctx.beginPath(), 
            this.ctx.arc(t, s, this.r, 0, 2 * Math.PI, !0), this.ctx.closePath(), this.ctx.stroke();
        }
    }, {
        key: "drawPoint",
        value: function() {
            for (var t = 0; t < this.lastPoint.length; t++) this.ctx.setFillStyle("#00abdc"), 
            this.ctx.beginPath(), this.ctx.arc(this.lastPoint[t].x, this.lastPoint[t].y, this.r / 2, 0, 2 * Math.PI, !0), 
            this.ctx.closePath(), this.ctx.fill();
        }
    }, {
        key: "drawStatusPoint",
        value: function(t) {
            for (var s = 0; s < this.lastPoint.length; s++) this.ctx.setStrokeStyle(t), this.ctx.setLineWidth(5), 
            this.ctx.beginPath(), this.ctx.arc(this.lastPoint[s].x, this.lastPoint[s].y, this.r, 0, 2 * Math.PI, !0), 
            this.ctx.closePath(), this.ctx.stroke();
            wx.drawCanvas({
                canvasId: "locker",
                actions: this.ctx.getActions(),
                reserve: !0
            });
        }
    }, {
        key: "drawLine",
        value: function(t, s) {
            this.ctx.beginPath(), this.ctx.setLineWidth(3), this.ctx.moveTo(this.lastPoint[0].x, this.lastPoint[0].y);
            for (var i = 1; i < this.lastPoint.length; i++) this.ctx.lineTo(this.lastPoint[i].x, this.lastPoint[i].y);
            this.ctx.lineTo(t.x, t.y), this.ctx.stroke(), this.ctx.closePath();
        }
    }, {
        key: "createCircle",
        value: function() {
            var t = this.setCanvasSize().w, s = (this.setCanvasSize().h, this.chooseType), i = 0;
            this.r = t / (2 + 3 * s), this.lastPoint = [], this.arr = [], this.restPoint = [];
            for (var e = this.r, a = 0; a < s; a++) for (var r = 0; r < s; r++) {
                var h = {
                    x: 3 * r * e + 2.5 * e,
                    y: 3 * a * e + 2.5 * e,
                    index: ++i
                };
                this.arr.push(h), this.restPoint.push(h);
            }
            for (a = 0; a < this.arr.length; a++) this.drawCle(this.arr[a].x, this.arr[a].y);
            wx.drawCanvas({
                canvasId: "locker",
                actions: this.ctx.getActions(),
                reserve: !1
            });
        }
    }, {
        key: "getPosition",
        value: function(t) {
            return {
                x: t.touches[0].x,
                y: t.touches[0].y
            };
        }
    }, {
        key: "update",
        value: function(t) {
            var s = this.setCanvasSize().w, i = this.setCanvasSize().h;
            this.ctx.clearRect(0, 0, s, i);
            for (e = 0; e < this.arr.length; e++) this.drawCle(this.arr[e].x, this.arr[e].y);
            this.drawPoint(), this.drawLine(t, this.lastPoint);
            for (var e = 0; e < this.restPoint.length; e++) if (Math.abs(t.x - this.restPoint[e].x) < this.r && Math.abs(t.y - this.restPoint[e].y) < this.r) {
                this.drawPoint(), this.lastPoint.push(this.restPoint[e]), this.restPoint.splice(e, 1);
                break;
            }
        }
    }, {
        key: "checkPass",
        value: function(t, s) {
            for (var i = "", e = "", a = 0; a < t.length; a++) i += t[a].index + t[a].index;
            for (a = 0; a < s.length; a++) e += s[a].index + s[a].index;
            return i === e;
        }
    }, {
        key: "storePass",
        value: function(t, s) {
            if (1 == this.pswObj.step) this.checkPass(this.pswObj.fpassword, t) ? (this.pswObj.step = 2, 
            this.pswObj.spassword = t, this.resetHidden = !1, this.title = "密码保存成功", this.titleColor = "succ", 
            this.drawStatusPoint("#09bb07"), s(), wx.setStorageSync("passwordxx", JSON.stringify(this.pswObj.spassword))) : (this.title = "密码不一致，请重新设置", 
            this.titleColor = "error", this.drawStatusPoint("#e64340"), delete this.pswObj.step); else if (2 == this.pswObj.step) this.checkPass(this.pswObj.spassword, t) ? (this.title = "解锁成功", 
            this.titleColor = "succ", this.drawStatusPoint("#09bb07"), s()) : (this.title = "解锁失败", 
            this.titleColor = "error", this.drawStatusPoint("#e64340")); else {
                if (this.lastPoint.length < 4) return this.title = "密码过于简单，请至少连接4个点", this.resetHidden = !0, 
                this.titleColor = "error", !1;
                this.pswObj.step = 1, this.pswObj.fpassword = t, this.titleColor = "", this.title = "再次输入";
            }
        }
    }, {
        key: "makeState",
        value: function() {
            2 == this.pswObj.step ? (this.resetHidden = !1, this.title = "请输入手势密码", this.titleColor = "") : (this.pswObj.step, 
            this.title = "请设置手势密码", this.resetHidden = !0, this.titleColor = "");
        }
    }, {
        key: "updatePassword",
        value: function() {
            wx.removeStorageSync("passwordxx"), this.pswObj = {}, this.title = "请设置手势密码", this.resetHidden = !0, 
            this.titleColor = "", this.reset();
        }
    }, {
        key: "init",
        value: function() {
            this.pswObj = wx.getStorageSync("passwordxx") ? {
                step: 2,
                spassword: JSON.parse(wx.getStorageSync("passwordxx"))
            } : {}, this.lastPoint = [], this.makeState(), this.touchFlag = !1, this.ctx = wx.createContext(), 
            this.createCircle();
        }
    }, {
        key: "reset",
        value: function() {
            this.createCircle();
        }
    }, {
        key: "setCanvasSize",
        value: function() {
            var t = {};
            try {
                var s = wx.getSystemInfoSync().windowWidth / (750 / 720), i = s;
                t.w = s, t.h = i;
            } catch (t) {
                console.log("获取设备信息失败" + t);
            }
            return t;
        }
    }, {
        key: "bindtouchstart",
        value: function(t) {
            if (1 == t.touches.length) for (var s = this, i = s.getPosition(t), e = 0; e < s.arr.length; e++) if (Math.abs(i.x - s.arr[e].x) < s.r && Math.abs(i.y - s.arr[e].y) < s.r) {
                s.touchFlag = !0, s.drawPoint(), s.lastPoint.push(s.arr[e]), s.restPoint.splice(e, 1);
                break;
            }
            wx.drawCanvas({
                canvasId: "locker",
                actions: this.ctx.getActions(),
                reserve: !0
            });
        }
    }, {
        key: "bindtouchmove",
        value: function(t) {
            if (1 == t.touches.length) {
                var s = this;
                s.touchFlag && s.update(s.getPosition(t));
            }
            wx.drawCanvas({
                canvasId: "locker",
                actions: this.ctx.getActions(),
                reserve: !0
            });
        }
    }, {
        key: "bindtouchend",
        value: function(t, s) {
            var i = this;
            i.touchFlag && (i.touchFlag = !1, i.storePass(i.lastPoint, s), setTimeout(function() {
                i.reset();
            }, 500));
        }
    } ]), i;
}();

exports.default = new i();
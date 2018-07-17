function e(e) {
    return (e = e.toString())[1] ? e : "0" + e;
}

module.exports = {
    formatTime: function(t) {
        var n = t.getFullYear(), r = t.getMonth() + 1, s = t.getDate(), a = t.getHours(), u = t.getMinutes(), g = t.getSeconds();
        return [ n, r, s ].map(e).join("/") + " " + [ a, u, g ].map(e).join(":");
    },
    formatDate: function(e, t) {
        t || (t = "YYYY-MM-DD HH:mm"), "string" == typeof e ? (e = e.replace(/\-/g, "/"), 
        e = new Date(e)) : "number" == typeof e ? e = new Date(1e3 * e) : e instanceof Date || (e = new Date());
        var n = [ "日", "一", "二", "三", "四", "五", "六" ];
        return t.replace(/YYYY|YY|MM|DD|HH|hh|mm|SS|ss|week/g, function(t) {
            switch (t) {
              case "YYYY":
                return e.getFullYear();

              case "YY":
                return (e.getFullYear() + "").slice(2);

              case "MM":
                return e.getMonth() + 1 < 10 ? "0" + (e.getMonth() + 1) : e.getMonth() + 1;

              case "DD":
                return e.getDate() < 10 ? "0" + e.getDate() : e.getDate();

              case "HH":
              case "hh":
                return e.getHours() < 10 ? "0" + e.getHours() : e.getHours();

              case "mm":
                return e.getMinutes() < 10 ? "0" + e.getMinutes() : e.getMinutes();

              case "SS":
              case "ss":
                return e.getSeconds() < 10 ? "0" + e.getSeconds() : e.getSeconds();

              case "week":
                return n[e.getDay()];
            }
        });
    }
};
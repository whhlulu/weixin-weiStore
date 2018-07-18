Component({
    properties: {
        info: {
            type: Object
        }
    },
    data: {},
    methods: {
        toOrderDetail: function() {
            var e = this.data.info, t = e.orderType, r = e.orderNo, o = e.orderSubType;
            console.log(t), console.log(r);
            var a = "/pages/order/detail/", s = t + "_" + o;
            switch (console.log(s), s) {
              case "41_3":
              case "41_4":
                a += "card";
                break;

              case "4_0":
                a += "store";
                break;

              case "41_2":
              case "41_1":
                a += "service";
                break;

              case "5_0":
                a += "team";
            }
            a += "?orderNo=" + r, getCurrentPages()[getCurrentPages().length - 1].jumpUrl(a);
        },
        toStoreIndex: function() {
            -1 != this.data.info.storeId && (wx.setStorageSync("storeId", this.data.info.storeId), 
            getCurrentPages()[getCurrentPages().length - 1].jumpUrl("/pages/index/index"));
        }
    }
});
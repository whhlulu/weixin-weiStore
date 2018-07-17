Component({
    properties: {
        option: {
            type: "404",
            show: !1,
            msg: ""
        }
    },
    data: {},
    methods: {
        reLaunch: function() {
            wx.reLaunch({
                url: "/pages/index/index"
            });
        }
    }
});
Component({
    properties: {
        radio: {
            type: null,
            value: "false"
        },
        large: {
            type: null,
            value: "false"
        },
        options: {
            type: Array,
            value: []
        },
        value: {
            type: null,
            value: "",
            observer: "valueChange"
        },
        key: {
            type: String,
            value: "id"
        },
        display: {
            type: String,
            value: "name"
        },
        itemNoPadding: {
            type: null,
            value: "false"
        }
    },
    data: {
        inputValue: ""
    },
    methods: {
        itemClick: function(e) {
            var a = e.currentTarget.dataset.option, t = this.data, l = t.radio, i = t.inputValue, u = t.key, n = (t.options, 
            null);
            if ("false" === l || !1 === l) {
                var s = i.indexOf(a[u]);
                s >= 0 ? i.splice(s, 1) : i.push(a[u]), n = i;
            } else n = a[u];
            this.setData({
                inputValue: n
            }), this.triggerEvent("change", a);
        },
        valueChange: function() {
            this.setData({
                inputValue: this.data.value
            });
        }
    },
    ready: function() {
        this.setData({
            inputValue: this.data.value
        });
    }
});
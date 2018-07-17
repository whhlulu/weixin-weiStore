var e = require("./formCtl");

Component({
    behaviors: [ e ],
    relations: {
        "./form": {
            type: "ancestor"
        }
    },
    properties: {
        placeholder: {
            type: String,
            value: ""
        },
        title: {
            type: String,
            value: ""
        },
        value: {
            type: null,
            value: "",
            observer: "initValue"
        },
        required: {
            type: null,
            value: "false"
        },
        name: {
            type: String,
            value: ""
        },
        validation: {
            type: String,
            value: ""
        },
        type: {
            type: String,
            value: "text",
            observer: "initValue"
        },
        options: {
            type: Array,
            value: []
        },
        disabled: {
            type: null,
            value: "false"
        },
        noPadding: {
            type: null,
            value: "false"
        },
        paddingRight: {
            type: null,
            value: "false"
        },
        textAlign: {
            type: null,
            value: "left"
        },
        key: {
            type: String,
            value: ""
        },
        min: {
            type: null
        },
        max: {
            type: null
        },
        step: {
            type: Number,
            value: 1
        },
        noBorder: {
            type: null,
            value: "false"
        },
        grey: {
            type: null,
            value: "false"
        },
        length: {
            type: Number,
            value: -1
        },
        noCode: {
            type: null,
            value: "false"
        }
    },
    data: {
        inputValue: "",
        pass: !0,
        errMsg: "",
        sex: 0
    },
    methods: {
        plus: function() {
            var e = this.data.inputValue;
            ++e <= this.data.max && this.setData({
                inputValue: e
            }), this.triggerEvent("toParent", this.data);
        },
        sub: function() {
            var e = this.data.inputValue;
            --e >= 1 && this.setData({
                inputValue: e
            }), this.triggerEvent("toParent", this.data);
        },
        initValue: function() {
            "number" == this.data.type && console.log(this.data), this.setData({
                inputValue: this.data.value
            });
        }
    }
});
Component({
    properties: {
        selectDate: {
            type: Object
        }
    },
    data: {},
    methods: {
        weekClick: function(t) {
            this.triggerEvent("dateClick", t.currentTarget.dataset.date);
        }
    }
});
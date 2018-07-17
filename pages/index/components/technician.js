Component({
    properties: {
        technicianList: {
            type: Array
        }
    },
    data: {},
    methods: {
        toEmployeeDetail: function(e) {
            console.log(e), getCurrentPages()[getCurrentPages().length - 1].rprm("staff", "tap", {
                accountId: e.currentTarget.dataset.id
            }), getCurrentPages()[getCurrentPages().length - 1].jumpUrl("/pages/employee/detail?employeeId=" + e.currentTarget.dataset.id);
        }
    },
    ready: function() {
        this.setData({
            technicianList: this.data.technicianList.splice(0, 3)
        });
    }
});
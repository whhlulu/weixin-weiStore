function e(e, a, t) {
    return a in e ? Object.defineProperty(e, a, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = t, e;
}

var a;

module.exports = (a = {
    getOrderList: {
        api: "/beauty/ordercenter/mapi/orderModel/list",
        title: "订单列表"
    },
    getCardUseLog: {
        api: "/beauty/beauty/mapi/card/detailAndUseLog",
        title: "获取计次周期卡使用记录"
    },
    getStorePayOrderDetail: {
        api: "/beauty/o2o-payapp/mapi/offerPay-order/orderDetail",
        title: "优惠买单订单详情"
    },
    getTeamOrderDetail: {
        api: "/beauty/coupon-taking/mapi/cardorder-query/orderMessage",
        title: "团购订单详情"
    },
    getTeamApplyMessage: {
        api: "/beauty/coupon-taking/mapi/cardorder-query/orderApplyMessage",
        title: "团购订单退款申请详情页面查询接口"
    }
}, e(a, "getTeamOrderDetail", {
    api: "/beauty/coupon-taking/mapi/cardorder-query/orderMessage",
    title: "团购订单详情"
}), e(a, "fetchTeamPay", {
    api: "/beauty/coupon-taking/mapi/cardorder-opt/pay",
    title: "团购订单支付请求接口"
}), e(a, "getRefundMessage", {
    api: "/beauty/coupon-taking/mapi/cardrefund-query/refundMessage",
    title: "退款维权单查询接口"
}), e(a, "getOrderPayResult", {
    api: "/beauty/coupon-taking/mapi/cardorder-query/payResult",
    title: "支付结果查询"
}), e(a, "fetchCancelTeamOrder", {
    api: "/beauty/coupon-taking/mapi/cardorder-opt/cancel",
    title: "取消团购订单接口"
}), e(a, "fetchApplyRefund", {
    api: "/beauty/coupon-taking/mapi/cardorder-opt/refund",
    title: "退款申请接口"
}), e(a, "getCancelResultInfo", {
    api: "/beauty/beauty/mapi/card/cancelResult",
    title: "卡核销状态查询"
}), e(a, "getCycleOrderDetail", {
    api: "/beauty/beauty/mapi/order/details",
    title: "服务项目订单详情"
}), e(a, "fetchOrderCardPay", {
    api: "/beauty/beauty/mapi/order/pay",
    title: "记次周期卡支付请求接口"
}), e(a, "getCardOrderPayResult", {
    api: "/beauty/beauty/mapi/order/queryPayStatus",
    title: "记次周期卡支付结果查询"
}), e(a, "cancelOrderCardPay", {
    api: "/beauty/beauty/mapi/order/cancel",
    title: "记次周期卡取消订单接口"
}), e(a, "applyOrderCardRefound", {
    api: "/beauty/beauty/mapi/order/startRefund",
    title: "记次周期卡申请退款接口"
}), e(a, "getOrderCardRefoundMessage", {
    api: "/beauty/beauty/mapi/order/timeCycleDetailRefundBefore",
    title: "记次周期卡退款申请信息查询接口"
}), e(a, "fetchContinueStorePay", {
    api: "/beauty/o2o-payapp/mapi/offerPay-order/continuePay",
    title: "优惠买单继续支付"
}), a);
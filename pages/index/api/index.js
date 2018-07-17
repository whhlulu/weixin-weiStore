module.exports = {
    getStoreInfo: {
        api: "/beauty/store-server/mapi/store/poi/getStoreInfo",
        title: "POI主接口"
    },
    getActivityInfo: {
        api: "/beauty/store-server/mapi/store/poi/couponInfo",
        title: "POI活动信息"
    },
    getServiceInfo: {
        api: "/beauty/store-server/mapi/store/poi/biz-info",
        title: "获取服务项目，计次周期卡"
    },
    fetchReceiveCoupon: {
        api: "/beauty/coupon-taking/mapi/takecard-opt/takeCard",
        title: "领取优惠券"
    },
    getShareMiniAppCode: {
        api: "/beauty/o2o/mapi/share/getNewShareMiniAppCode",
        title: "获取海报图片"
    }
};
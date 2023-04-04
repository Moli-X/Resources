
/***********************************************
# 高德地图
# 原链接:https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/amap.js
***********************************************/	



// 2023-4-04 15:52

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/faas/amap-navigation/main-page")) {
  // 首页底部卡片
  if (obj.data.cardList) {
    obj.data.cardList = obj.data.cardList.filter(
      (i) =>
        i.dataKey === "ContinueNavigationCard" || // 继续导航
        i.dataKey === "FrequentLocation" || // 常去地点
        i.dataKey === "LoginCard" // 登陆卡片
    );
  }
  if (obj.data.mapBizList) {
    obj.data.mapBizList = obj.data.mapBizList.filter(
      (i) => i.dataKey === "FindCarVirtualCard" // 显示关联车辆位置
    );
  }
} else if (url.includes("/faas/amap-navigation/usr-profile-fc/")) {
  const item = [
    "bulletData",
    "cardList",
    "dataList",
    "homePageData",
    "privateData",
    "shareData",
    "upgradeDialogData"
  ];
  for (let i of item) {
    if (obj.data?.[i]) {
      obj.data[i] = [];
    }
  }
} else if (url.includes("/mapapi/poi/infolite")) {
  // 搜索结果 列表详情
  if (obj.data.district) {
    let poi = obj.data.district.poi_list[0];
    // 订票横幅 订票用高德 出行享低价
    if (poi?.transportation) {
      delete poi.transportation;
    }
    // 周边推荐 列表项 景点 酒店 美食
    if (poi?.feed_rec_tab) {
      delete poi.feed_rec_tab;
    }
  } else if (obj.data.list_data) {
    let list = obj.data.list_data.content[0];
    if (list?.bottom?.taxi_button) {
      list.bottom.taxi_button = 0;
    }
    // 底栏 酒店
    if (list?.map_bottom_bar?.hotel) {
      delete list.map_bottom_bar.hotel;
    }
    if (list?.poi?.item_info?.tips_bottombar_button?.hotel) {
      delete list.poi.item_info.tips_bottombar_button.hotel;
    }
    if (list?.tips_operation_info) {
      delete list.tips_operation_info;
    }
    if (list?.bottom?.bottombar_button?.hotel) {
      delete list.bottom.bottombar_button.hotel;
    }
    // 底栏 打车
    //if (list?.bottom?.bottombar_button?.takeCar) {
      //delete list.bottom.bottombar_button.takeCar;
    //}
    // 预览信息中的优惠推广
    if (list?.promotion_wrap_card) {
      delete list.promotion_wrap_card;
    }
    // 预览信息中的推广
    if (list?.hookInfo) {
      delete list.hookInfo;
    }
  }
} else if (url.includes("/promotion-web/resource")) {
  // 打车页面
  let item = [
    "alpha", // 出行优惠套餐
    "banner",
    "bravo", // 第三方推广 喜马拉雅月卡
    "bubble",
    "charlie", // 横版推广 单单立减 领专属优惠 体验问卷
    "icon",
    "popup",
    "push", // 顶部通知 发单立享优惠
    "tips"
  ];
  if (obj.data) {
    item.forEach((i) => {
      delete obj.data[i];
    });
  }
} else if (url.includes("/sharedtrip/taxi/order_detail_car_tips")) {
  if (obj.data?.carTips?.data?.popupInfo) {
    delete obj.data.carTips.data.popupInfo;
  }
} else if (url.includes("/shield/dsp/profile/index/nodefaasv3")) {
  // 我的页面
  if (obj.data.cardList) {
    obj.data.cardList = obj.data.cardList.filter(
      (i) => i.dataKey === "MyOrderCard"
    );
  }
  if (obj.data.tipData) {
    delete obj.data.tipData;
  }
  // 足迹
   if (obj.data.footPrintV2) {
     delete obj.data.footPrintV2;
   }
  // 成就勋章 lv1见习达人
  if (obj.data.memberInfo) {
    delete obj.data.memberInfo;
  }
} else if (url.includes("/shield/frogserver/aocs")) {
  // 整体图层
  const item = [
    "collect",
    "footprint", // 足迹
    "gd_notch_logo",
    "his_input_tip",
    "home_business_position_config", // 首页右上角动图
    "hotel_activity",
    "hotel_loop",
    "hotel_tipsicon",
    "icon_show",
    "isNewSearchMapCard", // 可能是足迹
    "operation_layer", // 首页右上角图层
    "photo_with_location",
    "profileHeaderPic",
    "profiletTopBtn",
    "splashscreen",
    "testflight_adiu",
    "vip",
    "_user_profile_"
  ];
  for (let i of item) {
    if (obj.data?.[i]) {
      obj.data[i] = { status: 1, version: "", value: "" };
    }
  }
} else if (url.includes("/shield/search/nearbyrec_smart")) {
  // 附近页面
  if (obj.data.modules) {
    obj.data.modules = obj.data.modules.filter(
      (i) => i === "head" || i === "search_hot_words" || i === "feed_rec"
    );
  }
} else if (url.includes("/shield/search/poi/detail")) {
  // 搜索结果 模块详情
  const item = [
    // "anchor",
    "adv_compliance_info", // 服务提供方
    "adv_gift",
    // "base_info",
    "bigListBizRec", // 周边景点推荐 三张景点大图
    // "brand_introduction",
    "brand_shop_bar",
    // "brand_story",
    "checkIn",
    "check_in", // 足迹打卡
    "city_discount", // 专业老师在线答疑
    "claim", // 立即认领 管理店铺
    "co_branded_card",
    "collector_guide", // 游玩的图文指南
    "common_coupon_bar", // 领券条幅 新客专享 省钱卡
    // "consultancy",
    "contributor", // 地点贡献
    // "coupon_allowance",
    // "coupon_entrance",
    "cpt_service_shop", //买卖二手房
    // "craftsman_entry",
    // "crowd_index", // 人流量情况
    // "detailFeedCommodity",
    // "detail_bottom_shop_service",
    "divergentRecommendModule", // 你可能还喜欢
    // "evaluate", // 高德出行评分
    // "events",
    "everyOneToSee", // 大家还在看
    "feedback", // 问题反馈
    "first_surround_estate_tab", // 周边小区
    // "footer_logo",
    // "foreclosurehouse",
    // "gallery_info", // 现场照片
    // "ggc_entry",
    // "hkfMiniPortal", // 订票页面 飞机 火车 汽车
    "horizontalGoodsShelf",
    "hot_new_house_estate",
    "hot_shop",
    "hotelCoupon",
    // "hotelRooms", // 酒店所有房间
    // "hourHotelRooms", // 钟点房
    "houseList",
    "houseOfficeBrandIntroduction",
    "houseOfficeInfo",
    "houseOfficeNotice",
    "houseOfficeService",
    "house_apart_info",
    "house_buying_agent",
    "house_coupon",
    "house_cp_clues",
    "house_cpt_coupon",
    "house_cpt_grab",
    "house_price",
    "house_rent_sale_agency",
    // "human_traffic", // 人流量情况 有统计图
    "image_banner",
    "legal_document", // 房源法律信息
    "listBizRec_1",
    "listBizRec_2", // 周边餐饮
    "membership", // 高德菲住卡 会员项目
    "movie_info", // 优惠购票 景点宣传片
    "multi_page_anchor", // 二级导航菜单 门票 评论 推荐
    "nearbyRecommendModule", // 周边推荐
    "nearby_house",
    "nearby_new_house_estate",
    "nearby_office_estate",
    "nearby_old_sell_estate",
    "nearby_play_rec", // 附近玩乐项目
    "newGuest", // 新客专享
    "newRelatedRecommends", // 探索周边
    "new_operation_banner", // 精选活动 高德的推广
    "newsellhouse",
    // "normal_nav_bar", // 右上角图标 客服 反馈
    // "notification",
    "officerenthouse",
    "officesellhouse",
    "official_account", // 其他平台官方账号
    "oldsellhouse",
    // "opentime", // 营业时间
    "operation_banner", // 横版图片推广
    "operator_card",
    // "packageShelf",
    "parentBizRec",
    "poster_banner",
    // "poi_intercept",
    "portal_entrance", // 高德旅游版块 引流到旅游频道
    // "question_answer_card", // 问问 地点附近的热门问题
    "relatedRecommends", // 附近同类型酒店
    // "realtorRealStep",
    "renthouse",
    "rentsaleagencyv2",
    "rentsaleagencyv3",
    "rentsalehouse",
    "residentialOwners", // 小区业主
    "reviews", // 用户评价
    // "roomSelect", // 选择订房日期 悬浮菜单
    "sameIndustryRecommendModule",
    "sameIndustry2RecommendModule",
    // "same_price_new_estate",
    "scenic_coupon", // 优惠券过期提示
    "scenic_filter", // 购票悬浮菜单 可定明日 随时退
    // "scenic_guide",
    // "scenic_helper", // 景区助手 开放时间 旺季 淡季
    // "scenic_knowledge",
    "scenic_lifeservices", // 吃住购娱 餐厅 购物
    "scenic_mustplay", // 必游景点 四张景点大图
    // "scenic_parking",
    "scenic_play_guide", // 景区攻略 游玩攻略 交通攻略
    "scenic_recommend", // 景点建议
    // "scenic_route",
    // "scenic_route_intelligent", // 推荐游玩线路
    // "scenic_service",
    // "scenic_ski", // 滑雪攻略 雪道数量 设施及服务
    // "scenic_story",
    // "scenic_ticket", // 购票
    // "scenic_ticket_activity", // 购票活动
    "scenic_voice", // 语音讲解 付费的项目
    "second_surround_estate_tab", // 周边房产
    "service_shop", // 中介门店
    // "shop_news",
    "smallListBizRec", // 周边热门酒店
    "smallOrListBizRec",
    "surround_facility",
    "surround_facility_new",
    "surround_house_tab",
    "surround_oldsellhouse",
    "surround_renthouse",
    "surround_rentoffice",
    "surround_selloffice",
    // "traffic", // 交通出行 地铁站 公交站 停车场
    "uploadBar",
    "upload_bar", // 上传照片
    "verification" // 商家已入驻
    // "video",
  ];
  if (obj.data.modules) {
    item.forEach((i) => {
      delete obj.data.modules[i];
    });
  }
} else if (url.includes("/shield/search_poi/search/sp")) {
  if (obj.data.list_data) {
    let list = obj.data.list_data.content[0];
    // 详情页 底部 房产推广
    if (list?.hookInfo) {
      let hookData = list.hookInfo.data;
      if (hookData?.header) {
        delete hookData.header;
      }
      if (hookData?.house_info) {
        delete hookData.house_info;
      }
    }
    // 详情页 底部 订酒店
    if (list?.map_bottom_bar?.hotel) {
      delete list.map_bottom_bar.hotel;
    }
    if (list?.poi?.item_info?.tips_bottombar_button?.hotel) {
      delete list.poi.item_info.tips_bottombar_button.hotel;
    }
    if (list?.tips_operation_info) {
      delete list.tips_operation_info;
    }
    if (list?.bottom?.bottombar_button?.hotel) {
      delete list.bottom.bottombar_button.hotel;
    }
  }
} else if (url.includes("/shield/search_poi/tips_operation_location")) {
  // 搜索页面 底部结果上方窄横幅
  if (obj.data.coupon) {
    delete obj.data.coupon;
  }
  const bar = [
    "belt",
    "common_float_bar",
    "common_image_banner",
    "coupon_discount_float_bar",
    "coupon_float_bar",
    "discount_coupon",
    "image_cover_bar",
    "mood_coupon_banner",
    "operation_brand",
    "promotion_wrap_card",
    "tips_top_banner"
  ];
  if (obj.data.modules) {
    bar.forEach((i) => {
      delete obj.data.modules[i];
    });
  }
} else if (url.includes("/valueadded/alimama/splash_screen")) {
  // 开屏广告
  if (obj.data.ad) {
    for (let item of obj.data.ad) {
      item.set.setting.display_time = 0;
      item.creative[0].start_time = 2208960000; // Unix 时间戳 2040-01-01 00:00:00
      item.creative[0].end_time = 2209046399; // Unix 时间戳 2040-01-01 23:59:59
    }
  }
}

$done({ body: JSON.stringify(obj) });

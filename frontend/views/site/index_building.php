<?php
/**
 * Created by PhpStorm.
 * User: Ydz
 * Date: 2017/3/9
 * Time: 19:44
 */
use yii\helpers\Html;
use yii\bootstrap\ActiveForm;
use yii\captcha\Captcha;

$this->title = '承德山水御园居住小区：全新装修+地暖+新风+软水+家私全赠送 御园,山水御园居住小区';
$this->params['breadcrumbs'][] = $this->title;
?>

<a href="javascript:history.back();" id="vr-back" class="goback pos_abso"></a>
<input type="hidden" value="A1049250940" name="house-id"/>
<input type="hidden" value="esf" name="business-id"/>
<div class="container">
    <div id="comm_list">
        <div class="itm">
            <div class="imgblock" id="imgblock">
                <div id="imgwrapper" class="imgwrapper">
                    <ul class="imglist" id="imglist">
                        <li>
                            <img class="imglazyload"
                                 src="/frontend/web/images/l1.jpg"
                                 data-src=""
                                 data-origin="true"/>
                        </li>
                        <li>
                            <img class="imglazyload"
                                 src="/frontend/web/images/l2.jpg"
                                 data-src=""
                                 data-origin="true"/>
                        </li>
                    </ul>
                </div>
                <div class="pintro">
                    <ul class="pnav" id="pnav">
                        <li class="focus"></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
            <div class="pro-title" data-trace="{exp_esf_page_middle_1:1}">
                <span><?= $this->title; ?></span>

                <div class="collectinfo" id="view-info-collect" type="add">
                </div>
            </div>
            <div class="ax-txt"></div>
            <div class="article pro-detail">
                <label><i>均价：</i><span class="price"><em>9500-11500</em></span></label>
                <label><i>月供：</i>1172元<a href="https://m.anjuke.com/bj/caculator/?price=2560" class="i_cal"
                                         data-soj="prop_page"></a></label>
                <label><i>房型：</i>两室/三室</label>
                <label><i>面积：</i>80-130平</label>
                <label><i>朝向：</i>南北</label>
                <label><i>楼层：</i>小高层</label>

                <!-- && $iswuba_comm == false 没有用了 -->
                <label class="pro-w"><i>小区：</i>
                    <a href="https://m.anjuke.com/bj/community/52407/" class="i_pos"
                       data-soj="prop_list">承德山水御园居住小区<i></i>
                    </a><em></em></label>

            </div>
            <!-- 服务担保 -->
            <div class="article pro-desc pro-desc-layer">
                <h4>核心卖点</h4>

                <p>
                    独立底商独立底商独立底商</p>
                <h4>楼盘介绍</h4>

                <p>
                    城心向西 百亿门户
                    200亿北京德铭大数据中心、10万就业华明服务外包产业园、承实学校、国际疗养中心，国家图书馆、海南航空、LG、移动、美团网、艺龙网等知名企业入驻!
                    金牛大道 吸金中轴
                    金牛环岛向南，三馆一中心、君安凯莱、第四小学、县医院，6万财富居住人群，9万日均人流，汇聚财金人气!
                    品牌租户 做大品牌房东
                    中国工商银行、中国农业银行、中国移动、中国电信、车爵士、北京大碗面等品牌火爆经营! 呷哺呷哺、西贝莜面村、永和大王全国知名餐饮意向入驻!
                    超大面宽 超高实得
                    6.9米超大面宽、97%超高得房率，石材立面，御园金牌物业，58-120平米一线临街商铺!</p>
                <h4>商圈</h4>

                <p>
                    环首都经济圈、京津冀都市圈、环渤海经济圈三大国家经济发展战略经济圈交汇区域</p>
                <h4>交通</h4>

                <p>
                    京承、锦承2条铁路，承唐、承朝、承秦、承赤4条高速公路与在建的京沈客运专线、承德机场、张唐铁路构成了陆空立体交通体系!</p>
            </div>
            <!-- 依赖足组件User_Touch_Broker_BrokerCard-->

            <div class="tel-float-seat">
                <div class="tel-float-layer">
                    <a data-tel href="tel:18222252130" class="tel-debris " data-uid="0" data-guid=""
                       data-brokerid="1818705" data-broker-phone="18222252130"
                       data-track="track_Anjuke_Prop_View_phone_call" data-houseid="A1049250940">
                        <i class="icon tel-icon"></i>
                        18222252130
                        </a>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="seo-item">
    <div class="bd">
        <div class="trigger">
            <a href="https://m.anjuke.com/bj/sale/chaoyang/">朝阳</a>
            <a href="https://m.anjuke.com/bj/sale/haidian/">海淀</a>
            <a href="https://m.anjuke.com/bj/sale/dongchenga/">东城</a>
            <a href="https://m.anjuke.com/bj/sale/xicheng/">西城</a>
            <a href="https://m.anjuke.com/bj/sale/fengtai/">丰台</a>
            <a href="https://m.anjuke.com/bj/sale/tongzhou/">通州</a>
            <a href="https://m.anjuke.com/bj/sale/shijingshan/">石景山</a>
            <a href="https://m.anjuke.com/bj/sale/changping/">昌平</a>
            <a href="https://m.anjuke.com/bj/sale/daxing/">大兴</a>
            <a href="https://m.anjuke.com/bj/sale/shunyi/">顺义</a>
            <a href="https://m.anjuke.com/bj/sale/fangshan/">房山</a>
            <a href="https://m.anjuke.com/bj/sale/mentougou/">门头沟</a>
            <a href="https://m.anjuke.com/bj/sale/miyun/">密云</a>
            <a href="https://m.anjuke.com/bj/sale/huairou/">怀柔</a>
            <a href="https://m.anjuke.com/bj/sale/pinggua/">平谷</a>
            <a href="https://m.anjuke.com/bj/sale/yanqing/">延庆</a>
            <a href="https://m.anjuke.com/bj/sale/beijingzhoubiana/">北京周边</a>

        </div>
        <div class="content">



        </div>
    </div>
</div>

<div class="footer">
    <div class="foot_icon"><i onclick="window.scrollTo(0,1)"></i></div>
    <div class="flink">
        <a href="https://m.anjuke.com/bj/xiaoqu/">小区大全</a><em>|</em>
        <a href="https://m.anjuke.com/bj/sitemap/">网站地图</a><em>|</em>
        <a href="https://m.anjuke.com/bj/propsitemap/esf/">最新房源</a><em>|</em>
        <a rel="nofollow" href="https://m.anjuke.com/bj/caculator/" data-soj="tw_footer">房贷计算器</a><em>|</em>
        <a rel="nofollow" href="https://m.anjuke.com/assess/form/?city_id=14" data-soj="tw_dbdh_gujia">估价</a><br/>
        <a href="javascript:void(0);">手机版</a><em>|</em>
        <a id="pcPage" href="https://beijing.anjuke.com/sale/?twe=4">电脑版</a><em>|</em>
        <a rel="nofollow" href="//android.anjuke.com/download/anjuke/b190" id="footerApp">客户端</a>
        <em>|</em>
        <!--        <a rel="nofollow" href="/feedback/">意见反馈</a><em>|</em>-->
        <a rel="nofollow" href="/user-agreement/">免责声明</a><br>
        <span>Copyright&nbsp;©&nbsp;2007-2017&nbsp;Anjuke.com&nbsp;沪B2-20090008</span>
    </div>
</div>

<script type="text/javascript">
    window.ctid = '14';
</script>


<script type="text/javascript" crossorigin
        src="//pages.anjukestatic.com/usersite/touch/js/zeptov2/zepto-1.1.3.0.min.js"></script>
<script type="text/javascript" crossorigin src="//pages.anjukestatic.com/usersite/touch/js/swipe/swipeV2.js"></script>
<script type="text/javascript" crossorigin
        src="https://include.anjukestatic.com/tw/res/20171128.953.1/b/User_Touch_Anjuke_Property_ViewRevision.js"></script>
<script type="text/javascript">

    user.touch.common.appDownloadDialog.config = {
        'ios': 'https://itunes.apple.com/cn/app/id415606289',
        'android': '//android.anjuke.com/download/anjuke/b679',
        'config_pop': {"pagename": ["rent_view", "sale_view", "xinfang_view", "haiwai_view"], "limit": 5},
        'current_page': 'sale_view',
        'img_url': '//pages.anjukestatic.com/usersite/touch/img/appdownload/dialog/',
        'seo_source_type': '0'
    };

    user.touch.common.appDownloadV2.config = {
        'ios': 'https://itunes.apple.com/cn/app/id415606289',
        'android': '//android.anjuke.com/download/anjuke/',
        allow_wake: true
    };

    var backbtn00 = document.getElementById('vr-back');
    if (!document.referrer || document.referrer.length <= 0) {
        var url00 = window.location.href;
        var str00 = url00.split('/sale')[0];
        if (str00 && str00.length > 0) {
            backbtn00.setAttribute('href', str00 + '/sale');
            backbtn00.href = str00 + "/sale";
        }
    }
    new user.touch.common.appDownloadV2({
        'showbottombar': false,
        'bbartxt': '专享11月北京特价二手房',
        'bag_num': 'b560',
        'data-track-soj': 'track_viewrevision_download_bot_bar'
    });
    new touch.ershoufnag.ViewRevision({
        xh_city: 0,
        is_open_tw_phone_layer: true,

        xhurl_new: '',//安全通话请求小号的接口
        xhck_url: '',//非选择安全通话查询小号的接口（小号查看url）
        house_id: "A1049250940",
        business_id: 'esf',
        pagename: 'Anjuke_Prop_View',

        city_name: '北京',
        city_id: "14",
        guid: "D9B25AC1-B0BA-FA8B-3538-DECAE0A34234",
        uid: "0",
        prop_id: "1049250940",
        prop_type: "1",
        owner_id: "1818705",
        defaultimg: 'https://pages.anjukestatic.com/usersite/touch/img/global/defaultImg/big-load-img2.png',
        area_id: "837",
        block_id: "2246",
        price: "25600000",
        seo_source_type: "0"
    });
    new touch.component.module.XhPhone({
        url: '',
        businessId: 'esf',
        isXh: 0,
        tipDom: '.tip',
        triangleDom: '.triangle',
        select: 'a[data-tel]',
        xhck_url: '',
        brokerId: '1818705'
    });
</script>
<!--百度统计-->
<script type="text/javascript">
    var _hmt = _hmt || [];
    window._hmt = _hmt;
    window.perfConfig = {
        pageName: "Anjuke_Prop_View",
        siteName: 'ershoutouch',
    };
</script>
<script src="//pages.anjukestatic.com/prism/performance.js?v=1486701275" async defer></script>
<script type="text/javascript">
    (function () {
        try {
            var performance = window.performance,
                list,
                length,
                item,
                i;
            if (performance && $.type(performance.getEntries) === 'function') {
                list = performance.getEntries();
                for (i = 0, length = list.length; i < length; i++) {
                    item = list[i];
                    if (item.initiatorType !== 'css' && item.initiatorType !== 'script') {
                        continue;
                    }
                    if (!/include/i.test(item.name)) {
                        continue;
                    }
                    if (/dev|test|usjs|uscss/.test(item.name)) {
                        continue;
                    }
                    if (item.transferSize !== 0) {
                        continue;
                    }
                    var image = new Image();
                    image.src = '//prism.anjuke.com/ts.html?tp=resource&site=touch&msg=' + encodeURIComponent(item.name);
                }
            }
        } catch (e) {

        }
    })();
</script>
<script type="text/javascript">
    try {
        window._domainConfig = {
            "domianwhitelist": ["\\.test$", "\\.anjuke\\.com$", "\\.anjukestatic\\.com$", "\\.ajkimg\\.com$", "\\.ajkcdn\\.com$", "\\.aifcdn\\.com$", "\\.58ganji\\.com$", "\\.58\\.com$", "\\.ganji\\.com$", "\\.58cdn\\.com\\.cn$", "\\.map\\.bdimg\\.com$", "\\.baidu\\.com$", "\\.bdstatic\\.com$", "\\.gtags\\.com$", "\\.gtags\\.net$", "\\.zampda\\.net$", "\\.chinauma\\.net$", "\\.mediav\\.com$", "\\.googleadservices\\.com$", "\\.googleadsserving\\.cn$", "\\.googlesyndication\\.com$", "\\.google-analytics\\.com$", "\\.doubleclick\\.net$", "\\.qq\\.com$", "\\.sogou\\.com$", "\\.pstatp\\.com$", "\\.toutiao\\.com$", "\\.tjqonline\\.cn$"],
            "site": "tw",
            "transferprotocol": "^http|^https",
            "catchcontent": "yes",
            "catchurlorigin": "",
            "catchurlpathname": "\/xinfang\/bayeswordguess\/collectpost\/",
            "checkiplist": "",
            "zIndex": "2999"
        } || "";
    } catch (e) {
        window._domainConfig = "";
    }
    (function (f) {
        try {
            var b = f["site"];
            var l = f["domianwhitelist"];
            var n = f["transferprotocol"];
            f["catchcontent"] = f["catchcontent"] == "yes" ? true : false;
            var o = new RegExp(l.join("|"));
            var h = function (r, p, t, s, q) {
                if (!window.performance || !window.performance.getEntries) {
                    return false
                }
                var e = s || "<|>";
                if (t != "") {
                    var t = t.constructor == RegExp ? t : new RegExp(t)
                }
                window.addEventListener("load", function () {
                    setTimeout(function () {
                        var u = i(p, t, q);
                        g(r, u, e)
                    }, 1000)
                })
            };
            var g = function (q, u, t) {
                if (u && u.length && u.length > 0) {
                    var v = document;
                    var r = v.getElementsByTagName("head")[0];
                    var p = "//prism.anjuke.com/resource.html";
                    var s = v.createElement("script");
                    var e = encodeURI(u.join(t));
                    s.type = "text/javascript";
                    s.src = p + "?site=" + q + "&domain=" + e;
                    r.appendChild(s);
                    r.removeChild(s)
                }
            };
            var j = function (q) {
                if (q["catchcontent"] && q["catchurlpathname"] != "" && q["catchurlpathname"] != undefined) {
                    var p = q["catchurlorigin"] != "" && q["catchurlorigin"] != undefined ? q["catchurlorigin"] : location.origin;
                    var e = p + q["catchurlpathname"];
                    $.post(e, {
                        content: document.getElementsByTagName("html")[0].outerHTML,
                        guid: APF.Utils.getCookie('aQQ_ajkguid')
                    }, function (r, t, s) {
                    })
                }
            };
            var m = function (p) {
                if (!p || !p["split"]) {
                    return false
                }
                var e = p.split("/");
                return e[2]
            };
            var i = function (s, y, e) {
                var v = performance.getEntries();
                var u = [];
                var r = !s ? [] : s.map(function (z) {
                    return z.constructor == RegExp ? z : new RegExp(z)
                });
                var t = false;
                for (var q = 0; q < v.length; q++) {
                    var x = v[q];
                    var p = x.name;
                    if (x.initiatorType != undefined && c(p, y)) {
                        var w = m(p);
                        if (w && p && !a(w, r)) {
                            u.push(x.initiatorType + p);
                            if (x.initiatorType == "iframe" && d(e)) {
                                t = true
                            }
                        }
                    }
                }
                if (t) {
                    j(e)
                }
                return u
            };
            var d = function (e) {
                if (e["checkiplist"] == undefined || e["checkiplist"] == "") {
                    return true
                }
                return true
            };
            var c = function (e, p) {
                if (p == "") {
                    return true
                }
                return p.test(e)
            };
            var a = function (q, e) {
                var p = false;
                if (o.test(q)) {
                    p = true
                }
                return p
            };
            h(b, l, n, "<|>", f)
        } catch (k) {
        }
    })(window._domainConfig);
    !function (e, d, a) {
        var f = a["zIndex"] == undefined ? 99999 : a["zIndex"];
        var c = function () {
            function o(i) {
                i && i.style && (i.style.display = "none")
            }

            function q(t) {
                if (typeof(e.getComputedStyle) == "function") {
                    var i = e.getComputedStyle(t, null);
                    if (i.getPropertyValue("z-index") > Number(f)) {
                        o(t)
                    }
                } else {
                    if (typeof(t.currentStyle) != "undefined") {
                        var s = t.currentStyle;
                        if (s["z-index"] > Number(f)) {
                            o(t)
                        }
                    }
                }
            }

            if (e.self != e.top) {
                var j = e.top.document, h = j.body, l = h.children, m, k;
                if (h && h.getAttribute("data-page")) {
                    return
                }
                for (k = l.length; k; k--) {
                    m = l[k - 1];
                    if (m.nodeName.toLowerCase() !== "iframe") {
                        o(m)
                    }
                }
            } else {
                try {
                    var g = d.getElementsByTagName("*");
                    for (var n = g.length - 1; n >= 0; n--) {
                        var r = g[n];
                        if (/html|head|body|script|meta|textarea/i.test(r.nodeName)) {
                            continue
                        }
                        q(r)
                    }
                } catch (p) {
                    console.log("基于iframe的检查异常. error: " + p)
                }
            }
        };

        function b() {
            try {
                setTimeout(c, 0)
            } catch (g) {
                console.log("ready:" + g)
            }
        }

        d.addEventListener("load", b)
    }(window, document, window._domainConfig);
</script>
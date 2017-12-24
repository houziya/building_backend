/**
 * Created by Administrator on 2017/12/24.
 */
var SiteTracker = function(s, p, r, u) {
    if (s != undefined && s != null) {
        this.site = s;
    }

    if (p != undefined && p != null) {
        this.page = p;
    }

    if (r != undefined && r != null) {
        this.referer = r;
    }

    if (u != undefined && u != null) {
        this.uid = u;
    }
};

SiteTracker.prototype.getCookie = function(sKey) {
    if (!sKey || !this.hasItem(sKey)) {
        return null;
    }
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
};

SiteTracker.prototype.hasItem = function(sKey) {
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
};

SiteTracker.prototype.track = function(t_params) {
    this.buildParams();

    var src = "",
        script,
        params = [],
        content;

    if (typeof(t_params) == "undefined" || typeof(t_params.target_url) == "undefined") {
        src = location.protocol + "//s.anjuke.com/st?__site=" + encodeURIComponent(this.params['site']) + "&";
    } else {
        src = t_params.target_url + '?';
    }

    for (var k in this.params) {
        params.push(k + "=" + encodeURIComponent(this.params[k]));
    }
    src += params.join('&');
    script = document.createElement("script");
    script.src = src;
    script.async = true;
    content = (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]);
    script.onload = function() {
        content.removeChild(script);
    }
    content.appendChild(script);
};

SiteTracker.prototype.buildParams = function() {
    var href = document.location.href;

    var guid = this.getCookie(this.nGuid || "aQQ_ajkguid");
    var ctid = this.nCtid || this.getCookie(this.nCtid || "ctid");
    var luid = this.getCookie(this.nLiu || "lui");
    var ssid = this.getCookie(this.nSessid || "sessid");
    var uid = this.getCookie(this.nUid || "ajk_member_id");

    if (this.uid != undefined && this.uid != null) {
        uid = this.uid;
    }

    if (uid == undefined || uid == null | uid == "") {
        uid = 0;
    }

    var method = "";
    if (this.method != undefined && this.method != null) {
        method = this.method;
    }

    this.params = new Object();
    this.params.p = this.page;
    this.params.h = href;
    this.params.r = this.referer;
    this.params.site = this.site;
    this.params.guid = guid;
    this.params.ssid = ssid;
    this.params.uid = uid;
    this.params.t = new Date().getTime();
    this.params.ctid = ctid;
    this.params.luid = luid;
    this.params.m = method;

    if (this.screen != undefined) {
        this.params.sc = JSON.stringify(this.screen);
    }

    if (this.cst != undefined && /[0-9]{13}/.test(this.cst)) {
        this.params.lt = this.params.t - parseInt(this.cst);
    }

    if (this.pageName != undefined) {
        this.params.pn = this.pageName;
    }

    if (this.customParam != undefined) {
        this.params.cp = this.customParam;
    }

    if(window.is_newversion_soj=='1'){
        if (this.plat != undefined) {
            this.params.plat = this.plat;
        }
        if (this.type != undefined) {
            this.params.type = this.type;
        }
        if (this.action != undefined) {
            this.params.action = this.action;
        }
    }
};

SiteTracker.prototype.setSite = function(s) {
    this.site = s;
};

SiteTracker.prototype.setPage = function(p) {
    this.page = p;
};

SiteTracker.prototype.setPageName = function(n) {
    this.pageName = n;
};

SiteTracker.prototype.setCookieNames = function(c) {
    this.cookNames = c;
};

SiteTracker.prototype.setReferer = function(r) {
    this.referer = r;
};

SiteTracker.prototype.setUid = function(u) {
    this.uid = u;
};

SiteTracker.prototype.setMethod = function(m) {
    this.method = m;
};

SiteTracker.prototype.setNGuid = function(n) {
    this.nGuid = n;
};

SiteTracker.prototype.setNCtid = function(n) {
    this.nCtid = n;
};

SiteTracker.prototype.setNLiu = function(n) {
    this.nLiu = n;
};

SiteTracker.prototype.setNSessid = function(n) {
    this.nSessid = n;
};

SiteTracker.prototype.setNUid = function(n) {
    this.nUid = n;
};

SiteTracker.prototype.setCst = function(n) {
    this.cst = n;
};

SiteTracker.prototype.setScreen = function(v) {
    this.screen = v;
}

SiteTracker.prototype.setCustomParam = function(v) {
    try{
        if(!v){
            var v=JSON.stringify({'source_h5':APF.soj_source_h5});
        }else{
            if(!$.isPlainObject(v)){
                var jsondata = JSON.parse(v);
            }else{
                var jsondata = v;
            }
            if(!jsondata.hasOwnProperty('source_h5')){
                jsondata.source_h5=APF.soj_source_h5;
                v=JSON.stringify(jsondata)
            }
        }
    }catch(e){
        if(!v){
            var v=JSON.stringify({'source_h5':APF.soj_source_h5});
        }else{
            if($.isPlainObject(v)){
                v=JSON.stringify(v);
            }
            var a=v.split('');
            a[0]=a[0]+'source_h5:'+JSON.stringify(APF.soj_source_h5);
            v=a.join('');
        }
    }
    this.customParam = v;
}
SiteTracker.prototype.getParams = function() {
    return this.params;
};
(function(win, doc, $) {

    var apf = win.APF || {};

    apf.Config = { // 鍚勭url
        devLogURL: '//s.anjuke.test/ts.html?',
        logURL: location.protocol + '//prism.anjuke.com/ts.html?',
        devSojURL: '//s.anjuke.test/stb',
        isDev: /dev|test/.test(doc.domain),
        blackList: ['Player', 'baiduboxapphomepagetag', 'onTouchMoveInPage']
    };

    function isblack(str) {
        var i,
            reg,
            length,
            blackList = apf.Config.blackList;
        if (typeof str !== 'string') { // 瀵逛簬闈炲瓧绗︿覆榛樿榛戝悕鍗�
            return true;
        }
        for (i = 0, length = blackList.length; i < length; i++) {
            reg = new RegExp(blackList[i], 'g');
            if (reg.test(str)) {
                return true;
            }
        };
    }

    function log(params) {
        var errorinfo = 'tp=error&site=touch&msg=',
            key,
            url,
            arr = [],
            image,
            msg;
        if (typeof params === 'string') {
            msg = params;
        }
        if (typeof params === 'object') {
            for (key in params) {
                if (params.hasOwnProperty(key)) {
                    arr.push(key + ':' + encodeURIComponent(JSON.stringify(params[key])));
                }
            }
            msg = arr.join(',');
        }
        if (isblack(msg)) {
            return false;
        }
        image = new Image();
        if (apf.Config.isDev) {
            url = apf.Config.devLogURL + errorinfo + msg;
        } else {
            url = apf.Config.logURL + errorinfo + msg;
        }
        image.src = url;
        return true;
    }

    //璇ユ柟娉曞湪app鍐呭祵椤典腑闇€瑕佺敤鍒帮紝濡傛灉娌℃湁璇ユ柟娉曞唴宓岄〉浼歫s鎶ラ敊
    if(!$.isFunction(win.getShareContents)){
        win.getShareContents = function (){
            return '';
        }
    }

    win.onerror = function(msg, url, line) {
        log({
            message: msg,
            url: url,
            line: line
        });
    }

    function preventDefault(event) {
        event.preventDefault();
    }

    function sendSoj(action, customparam, type, site, plat, page) {
        if(window.is_newversion_soj=='1'){
            var _site = site || 'anjuke',
                soj = new SiteTracker(),
                t_params;
            soj.setPlat = function (v){
                this.plat = v;
            }
            soj.setType = function (v){
                this.type = v;
            }
            soj.setAction = function (v){
                this.action = v;
            }
            var head = $('head');
            var pageName = head.data('page');
            //if (customparam) {
            soj.setCustomParam(customparam);
            //}
            if(window.ctid) {
                soj.setNCtid(window.ctid);
            }
            if (apf.Config.isDev) {
                t_params = {
                    'target_url': apf.Config.devSojURL
                }
            }
            soj.setPage(pageName);
            //soj.setPageName(action||'');
            soj.setSite(_site);
            soj.setScreen(getScreen());
            soj.setReferer(doc.referrer);

            soj.setPlat(plat||2);
            //杩欓噷鏄负浜嗗吋瀹逛笟鍔′唬鐮佷腑鍒╃敤sendsoj鐩存帴鍙憄v,鍏ヤ簩鎵嬫埧鍗曢〉
            if(!type) {
                type=1;
                soj.setPage(action);
            }
            soj.setType(type);

            if(action && typeof action=='string' && action.length>0)
                soj.setAction(action);
        }else{
            var _site = type || 'm_anjuke',
                soj = new SiteTracker(),
                t_params;
            //if (customparam) {
            soj.setCustomParam(customparam);
            //}
            if(window.ctid) {
                soj.setNCtid(window.ctid);
            }
            if (apf.Config.isDev) {
                t_params = {
                    'target_url': apf.Config.devSojURL
                }
            }
            soj.setPage(action);
            soj.setPageName(action);
            soj.setSite(_site);
            soj.setScreen(getScreen());
            soj.setReferer(doc.referrer);
        }

        soj.track(t_params);
        if (!/npv/.test(_site)) {
            var _trackURL = soj.getParams();
            delete _trackURL.cp;
            delete _trackURL.sc;
            window._trackURL = JSON.stringify(_trackURL);
            var _ckurl = window._trackURL = JSON.stringify(_trackURL);
            loadTrackjs();
        }
        function loadTrackjs() {
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = location.protocol + '//tracklog.58.com/referrer_anjuke_m.js?_=' + Math.random();
            var b = document.body;
            b.appendChild(s);
        }
    }

    function pad(source) {
        return ('00' + source).match(/\d{2}$/)[0];
    }

    var getScreen = function() {
        var sinfo = {};
        sinfo.w = (win.screen.width).toString();
        sinfo.h = (win.screen.height).toString();
        sinfo.r = (win.devicePixelRatio >= 2 ? 1 : 0).toString();
        getScreen = function() {
            return sinfo;
        };
        return sinfo;
    };

    apf.Namespace = {
        register: function(ns) {
            var nsParts = ns.split("."),
                root = win,
                length,
                i;
            for (i = 0, length = nsParts.length; i < length; i++) {
                if (typeof root[nsParts[i]] == "undefined") {
                    root[nsParts[i]] = {};
                }
                root = root[nsParts[i]];
            }
            return root;
        }
    };
    var guid = null;
    apf.Utils = {

        // http://techpatterns.com/downloads/javascript_cookies.php
        setCookie: function(name, value, expires, path, domain, secure) {
            // set time, it's in milliseconds
            var today = new Date();
            today.setTime(today.getTime());
            /*
             if the expires variable is set, make the correct
             expires time, the current script below will set
             it for x number of days, to make it for hours,
             delete * 24, for minutes, delete * 60 * 24
             */
            if (expires) {
                expires = expires * 1000 * 60 * 60 * 24;
            }
            var expires_date = new Date(today.getTime() + (expires));

            doc.cookie = name + "=" + escape(value) +
            ((expires) ? ";expires=" + expires_date.toGMTString() : "") +
            ((path) ? ";path=" + path : "") +
            ((domain) ? ";domain=" + domain : "") +
            ((secure) ? ";secure" : "");
        },

        // this fixes an issue with the old method, ambiguous values
        // with this test document.cookie.indexOf( name + "=" );
        getCookie: function(check_name) {
            // first we'll split this cookie up into name/value pairs
            // note: document.cookie only returns name=value, not the other components
            var a_all_cookies = doc.cookie.split(';'),
                a_temp_cookie = '',
                cookie_name = '',
                cookie_value = '',
                length,
                b_cookie_found = false; // set boolean t/f default f

            for (i = 0, length = a_all_cookies.length; i < length; i++) {
                // now we'll split apart each name=value pair
                a_temp_cookie = a_all_cookies[i].split('=');
                // and trim left/right whitespace while we're at it
                cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

                // if the extracted name matches passed check_name
                if (cookie_name == check_name) {
                    b_cookie_found = true;
                    // we need to handle case where cookie has no value but exists (no = sign, that is):
                    if (a_temp_cookie.length > 1) {
                        cookie_value = decodeURIComponent(a_temp_cookie[1].replace(/^\s+|\s+$/g, ''));
                    }
                    // note that in cases where cookie is initialized but no value, null is returned
                    return cookie_value;
                    break;
                }
                a_temp_cookie = null;
                cookie_name = '';
            }
            if (!b_cookie_found) {
                return null;
            }
        },

        // this deletes the cookie when called
        deleteCookie: function(name, path, domain) {
            if (this.getCookie(name)) {
                doc.cookie = name + "=" +
                ((path) ? ";path=" + path : "") +
                ((domain) ? ";domain=" + domain : "") + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
            }
        },
        touchClick: function() {
            var status = true;
            $(doc).on('touchmove', function() {
                if (status) {
                    doc.addEventListener('click', preventDefault, true);
                    status = false;
                }
            });

            $(doc).on('touchend', function() {
                doc.removeEventListener('click', preventDefault, true);
                status = true;
            });
        },
        checkPhone: function(val) {
            var telpattern = /^1[3|4|5|7|8][0-9]\d{8}$/;
            if (telpattern.test(val)) {
                return true;
            }
            return false;
        },
        trackEvent: function(action, customparam, type) {
            var cp = customparam;
            if ($.isPlainObject(customparam)) {
                cp = JSON.stringify(customparam);
            }
            if(window.is_newversion_soj=='1'){
                sendSoj(action, cp, type||2);
            }else{
                sendSoj(action, cp, 'm_anjuke-npv');
            }
        },
        /**
         * [getGuid 鍦ㄧ粺璁＄數璇濇椂闀跨殑鏃跺€欎负浜嗕繚鎸佸敮涓€鍏宠仈鎬э紝闃叉鐢ㄦ埛闂撮殧鏃堕棿闀挎垨鑰呮竻闄ookie鍚庝袱涓猻oj鏃犳硶鍏宠仈璧锋潵]
         * @param  {[String]} sType
         * @return {[String]}
         */
        _getGuid: function() {
            var date = new Date(),
                month = date.getMonth() + 1,
                date2 = date.getDate(),
                hours = date.getHours(),
                minutes = date.getMinutes(),
                d = date.getTime();
            var uuid = ('xxxxxxxx-yxxx-yxxx-yxxx-Txxx').replace(/[xy]/g, function(c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 0x3);
                return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
            });
            return (uuid + pad(month) + pad(date2) + pad(hours) + pad(minutes)).toUpperCase();
        },
        getGuid: function(status) {
            if(status === 1) {
                guid = this._getGuid();
                return guid;
            }
            if(!guid) {
                guid = this._getGuid();
            }
            return guid;
        },
        log: function(params) {
            return log(params);
        },
        getCookieGuid: function() {
            return this.getCookie('aQQ_ajkguid');
        },
        addLinkSoj: function(selector, attr, param) {
            var $body = $("body");
            $body.on('click', selector, function(e) {
                var soj = $(this).data(attr || 'soj'),
                    _soj = $.trim(soj), // 鍘荤┖鏍�
                    href = $.trim($(this).attr('href')),
                    _param = param || 'from'; // 榛樿鏄痜rom

                if (!href) { // 姝ゅ閾炬帴涓嶅仛鍚堟硶鎬ф鏌�
                    return;
                }

                if(/javascript|tel|history.back/i.test(href)) {
                    return ;
                }

                e.preventDefault();
                e.stopPropagation();
                if (!_soj) { // 濡傛灉鏃爏oj,鐩存帴璺宠浆
                    location.href = href;
                    return;
                }
                if (href.indexOf('?') !== -1) {
                    location.href = href + '&' + _param + '=' + _soj;
                } else {
                    location.href = href + '?' + _param + '=' + _soj;
                }
            });

            // 淇濊瘉npv鐮佸彧缁戝畾涓€娆�
            if (+$body.data('track-npv') !== 1) {
                $body.data('track-npv', 1);
                $body.on("click", "[data-track-npv]", function(e) {
                    var trackVal = $(this).data("track-npv"); // 琚彂鍑哄幓鐨勭爜
                    if (trackVal.replace(/\s/g, '').length === 0) {
                        return;
                    }
                    if(window.is_newversion_soj=='1'){
                        sendSoj(trackVal, undefined, 2);
                    }else{
                        sendSoj(trackVal,'',"m_anjuke-npv");
                    }
                });
            }
        },
        replaceImg: function(v, attrName, watermark) {
            attrName = attrName ? attrName : 'data-src';
            watermark = watermark === false ? false : true;
            if (!v) return false;
            var s = v.getAttribute(attrName);
            if (s != "" && s != null) {
                var re = s.split('/').pop().match(/\d+x\d+/g);
                if (re) {
                    var w = parseInt(v.clientWidth),
                        h = parseInt(v.clientHeight),
                        ratio = 0,
                        suffix = '';
                    if (window.devicePixelRatio && window.devicePixelRatio != 1) {
                        w = parseInt(w * window.devicePixelRatio);
                        h = parseInt(h * window.devicePixelRatio);
                    }
                    if (!watermark) {
                        if (w > 220 || h > 220) { //瀹芥垨楂樺ぇ浜�220px灏嗚缃按鍗�
                            var wRatio = w / 220,
                                hRatio = h / 220,
                                ratio = wRatio > hRatio ? wRatio : hRatio;
                            ratio = Math.ceil(ratio);
                            w = Math.floor(w / ratio);
                            h = Math.floor(h / ratio);
                        }
                        if (ratio !== 0) {
                            s = s.replace(/(\.\w+)$/g, '@' + ratio + 'x$1');
                        }
                    }
                    size = w + 'x' + h;
                    if (w && h) {
                        s = s.replace(re, w + 'x' + h);
                    }
                }
                var pic = new Image();
                pic.src = s;

                pic.onerror = function(e) {
                    v.setAttribute(attrName, '');
                    return false;
                }
                pic.onload = function() {
                    v.setAttribute('src', s);
                    // v.setAttribute(attrName, '');
                }
            }
        },
        LocalStorageHelper: function(action, key, val) {
            try {
                if (action == "setItem") {
                    localStorage[action](key, val);
                    return true;
                } else {
                    var result = localStorage[action](key);
                    return result;
                }
            } catch (e) {
                return false;
            }
        },
        //鏇夸唬鍘熺敓scroll浜嬩欢
        scrollHelper: function(selector){
            var record = {};
            $('body').on("touchstart", selector, function(e) {
                record.startTop = e.targetTouches[0].screenY; // 瑙︽懜寮€濮嬫椂瑙︽懜鐐圭殑浣嶇疆
                record.startScrollTop = $(this).scrollTop();  // 瑙︽懜寮€濮嬫椂鍐卍iv鐨剆crollTop
            });
            $('body').on("touchmove", selector, function(e) {
                e.preventDefault();
                var curY = e.targetTouches[0].screenY;
                $(this).scrollTop( record.startScrollTop + record.startTop - curY ); // js鎺у埗婊氬姩
            });
        },
        sendSoj: sendSoj
    };
    (function() { // 鍒濆鍖栧彂閫乻oj
        var pageName,
            cp,
            ppc,
            url,
            head = $('head');
        pageName = head.data('page');
        ppc = head.data('ppc');
        cp = head.data('new-ppc'); // 濡傛灉鏄痡son鏍煎紡锛屼細鑷姩杞寲
        if (!cp) {
            cp = {};
            if (ppc) {
                (new Image()).src = ppc + '&userid=' + APF.Utils.getCookie('ajk_member_id');
            }
        }
        if (head.data('kw')) { // 绉熸埧鍒楄〃鎼滅储鍏抽敭瀛楃粺璁�
            cp.kw = head.data('kw');
        }
        if (head.data('soj-php')) { // 浜屾墜鎴垮崟椤� php 娴嬭瘯
            cp.test = head.data('soj-php');
        }

        // 鎴挎簮鍗曢〉,鍙憇oj鏃跺鍔燿atappc,浠ョ粺璁pc涓巗oj鐨勬暟鎹樊寮�
        if (pageName == 'Anjuke_Prop_View') {
            cp.datappc = ppc;
        }
        url = location.href;
        if ((url.indexOf("lat") != -1) && (url.indexOf("lng") != -1) && (url.indexOf("map") == -1)) {
            cp.locate = 'locate';
        }
        if(window.is_newversion_soj=='1'){
            sendSoj('', JSON.stringify(cp), 1);
        }else{
            sendSoj(pageName, JSON.stringify(cp));
        }
    })();

    win.APF = apf;
    win.T = apf.Utils;
    APF.Utils.addLinkSoj('a[data-soj]'); // soj from 鍔犵爜
    $(function(){
        if(!window.localStorage) {
            T.trackEvent('localStorage_unsupport');
            return;
        }
        var result = T.LocalStorageHelper('setItem','ajk_storage_test',1);
        if(result === false) {
            T.trackEvent('localStorage_write_unsupport');
        }
    });
})(window, document, Zepto);
;
(function($, C, win, apf) {

    C.Exposure = function(op) {
        var defaults = {
            trackTag: 'data-trace',
            delay: 50,
            pageName: apf.info.pageName,
            prefix: 'Exp_'
        };
        this.ops = $.extend(defaults, op);
        this.domCache = []; // 淇濆瓨鍐呭
        this.pageViewHeight = $(win).height(); // 椤甸潰鍙鍖哄煙楂樺害
        this.timer = null;
        this.dataCache = [];
        this.expStatus = false;
        this.init();
    };
    C.Exposure.prototype = {
        constructor: C.Exposure,
        add: function(list) {
            var _this = this;
            this.expStatus = true;
            list.each(function(index, el) {
                _this.domCache.push($(el));
            });
            $(win).scroll();
        },
        init: function() {
            var wd = $(win);
            wd.resize($.proxy(this.resize, this)); // resize
            wd.on('beforeunload', $.proxy(this.beforeunload, this));
            $(win).scroll($.proxy(this.scroll, this));
        },
        resize: function() {
            this.pageViewHeight = $(win).height();
        },
        beforeunload: function() {
            this.buildData();
        },
        scroll: function() {
            if (!this.expStatus) {
                return;
            }
            clearTimeout(this.timer);
            if (this.domCache.length === 0) {
                this.expStatus = false;
                this.buildData();
                return;
            }
            this.timer = setTimeout($.proxy(this.addData, this), this.ops.delay);
        },
        sendExp: function(result) {
            apf.Utils.trackEvent(this.ops.prefix + this.ops.pageName, result,3);
        },
        addData: function() {
            var pageViewHeight = this.pageViewHeight,
                topY = $(win).scrollTop(),
                botY = topY + pageViewHeight,
                _this = this;
            if (this.domCache.length === 0) {
                return;
            }
            $.each(this.domCache, function(index, val) {
                var _topY,
                    attr;
                if (!val) {
                    return;
                }
                _topY = val.offset ? val.offset().top : 0;
                if (_topY > topY && _topY < botY) {
                    attr = val.attr(_this.ops.trackTag);
                    if (attr) {
                        _this.dataCache.push(attr);
                    }
                    delete _this.domCache[index];
                }
            });
            this.buildData();
        },
        buildData: function() {
            var _this = this,
                result = {},
                r = [],
                exp,
                key,
                length,
                tar = {},
                i;
            /**
             * "{aa:'123'}"
             * 杩欑鏍煎紡鐨勬暟鎹甁SON.parse瑙ｆ瀽涓嶄簡锛屽繀椤荤敤eval鎵嶈兘杞垚json
             */
            if (this.dataCache.length === 0) { // 濡傛灉娌℃湁鏁版嵁灏变笉鍙戦€�
                return;
            }
            exp = eval('([' + this.dataCache.join(',') + '])');
            this.dataCache = []; // 娓呴櫎瑕佸彂閫佺殑鏁版嵁
            for (i = 0, length = exp.length; i < length; i++) {
                for (key in exp[i]) {
                    if (!result[key]) {
                        result[key] = [];
                    }
                    result[key].push(exp[i][key]);
                }
            }
            tar.exposure = result;
            this.sendExp(JSON.stringify(tar));
            $.each(this.domCache, function(index, val) {
                if (!val) {
                    _this.domCache.splice(index, 1); // 鍒犻櫎宸茬粺璁¤繃鐨刣om
                }
            });
        }
    };
})(Zepto, APF.Namespace.register('touch.component.module'), window, APF);;
(function(win, doc, $) {

    var apf = win.APF || {};

    apf.Config = { // 鍚勭url
        devLogURL: location.protocol + '//soj.dev.anjuke.com/ts.html?',
        logURL: location.protocol + '//m.anjuke.com/ts.html?',
        devSojURL: location.protocol + '//soj.dev.aifang.com/stb',
        isDev: /dev|test/.test(doc.domain),
        blackList: ['Player', 'baiduboxapphomepagetag', 'onTouchMoveInPage']
    };

    apf.Namespace = {
        register: function(ns) {
            var nsParts = ns.split("."),
                root = win,
                length,
                i;
            for (i = 0, length = nsParts.length; i < length; i++) {
                if (typeof root[nsParts[i]] == "undefined") {
                    root[nsParts[i]] = {};
                }
                root = root[nsParts[i]];
            }
            return root;
        }
    };

    win.APF = apf;
})(window, document, Zepto);
;APF.Namespace.register("zufang.seo");
(function($, SEO) {
    SEO.Index = function(option) {
        this.ops = option;
        this.init();
    };
    SEO.Index.prototype = {
        constructor: SEO.Index,
        init: function() {
            $('.seo-item').on('click','.hd',function(){
                $(this).parent().toggleClass('open');
            })
            $('.trigger').on('click','a',function(e){
                e.preventDefault();
                var index = $(this).index(),
                    item = $('.content .item');
                $('.trigger').find('a').removeClass('selected');
                $(this).addClass('selected');
                item.removeClass('selected');
                item.eq(index).addClass('selected');
            })
        }
    };
})(Zepto, zufang.seo);
;
(function($, C) {

    var getDevicePixelRatio = function() {
        var dpr = Math.floor(window.devicePixelRatio);
        dpr = dpr >= 2 ? 2 : 1;
        getDevicePixelRatio = function() {
            return dpr;
        };
        return dpr;
    };

    // 鎯版€ф鏌�
    var is_support_webp = function() {
        return false;

        var img = new Image(),
            support = false;
        img.onload = function() {
            support = true;
        };
        img.onerror = function(){
            T.trackEvent(APF.info.pageName + '_webp_support_error');
        };
        img.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        is_support_webp = function() {
            return support;
        };
        return support;
    };

    C.LazyLoadImg = function(opt) {
        var defaults = {
            min: 0,
            max: -1,
            select: 'img',
            attr: 'data-src',
            ratioAttr: 'origin',
            isClip: false,
            imgRange: 1
        };
        this.ops = {};
        $.extend(this.ops, defaults, opt);
        this.init();
    };
    C.LazyLoadImg.prototype = {
        constructor: C.LazyLoadImg,
        init: function() {
            var _this = this,
                rafStatus = false;

            // 浣跨敤raf浠ｇ爜scoll鍜宼ouchmove
            rAf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };

            function imgHander() {
                var $window = $(window),
                    min = _this.ops.min,
                    max = _this.ops.max,
                    wheight = $window.height(),
                    scrolltop = $window.scrollTop();
                if (_this.ops.min < scrolltop) {
                    min = scrolltop;
                }
                if (_this.ops.max === -1 || wheight * _this.ops.imgRange + scrolltop < _this.ops.max) {
                    max = wheight * _this.ops.imgRange + scrolltop;
                }
                _this.refreshImg(min, max);
                rafStatus = false;
            }

            function scrollHander() {
                if (rafStatus === true) {
                    return;
                }
                rafStatus = true;
                rAf(imgHander);
            }
            $(window).scroll(scrollHander);
            $(document).on('touchmove', scrollHander);
            // rAf(imgHander);
            $(window).trigger('scroll');
        },
        refreshImg: function(min, max) {
            var _this = this,
                style,
                top;
            style = this.ops.select.replace('.', '');
            $(this.ops.select).each(function(index, el) {
                var $this = $(el);
                top = $this.offset().top;
                if (top >= min && top <= max || top <= 0) {
                    _this.imgReplace($this, _this.ops.attr, _this.ops.ratioAttr, _this.ops.isClip);
                    $this.removeClass(style);
                }
            });
        },
        imgReplace: function(dom, attr, ratioAttr, isClip) {
            var _this = this,
                attrName = attr || 'data-src',
                url = dom.attr(attrName),
                ext,
                w,
                h,
                r,
                ratio,
                arr,
                imgWidth,
                imgHeigh,
                support = ratioAttr ? dom.data(ratioAttr) : false,
                imgext,
                routeArr,
                img;
            if (!url) {
                return;
            }
            ext = url.split('/').pop().match(/\d+x\d+/g);
            if (ext) {
                if(support === 'parent') {
                    w = parseInt(dom.parent().width(), 10); // 鑾峰彇鐖跺厓绱犵殑瀹�
                    h = parseInt(dom.parent().height(), 10); // 鑾峰彇鐖跺厓绱犵殑楂�
                } else if (support) {
                    w = parseInt(dom.parent().width(), 10); // 鑾峰彇鐖跺厓绱犵殑瀹�
                    h = parseInt(dom.parent().height(), 10); // 鑾峰彇鐖跺厓绱犵殑楂�
                    arr = ext[0].split('x');
                    imgWidth = parseInt(arr[0], 10);
                    imgHeigh = parseInt(arr[1], 10);
                    ratio = imgHeigh / imgWidth;
                    if (ratio > h / w) {
                        w = parseInt(h / ratio, 10);
                    } else {
                        h = parseInt(w * ratio, 10);
                    }

                } else {
                    w = parseInt(dom.width(), 10);
                    h = parseInt(dom.height(), 10);
                }

                // img position: absolute; 鎴栬€卍isplay: none;鐨勫厓绱犳楂橀兘涓�0
                if ( (w < 1 || h < 1) && !(dom).data("src") ) {
                    return;
                }
                r = getDevicePixelRatio();
                var size = w + 'x' + h;
                if (isClip === true) {
                    size += 'c';
                }
                var url_partA = url.substring(0, url.lastIndexOf(ext));
                var url_partB = url.substring(url.lastIndexOf(ext));
                url = url_partA + url_partB.replace(ext, Math.floor(w * r) + 'x' + Math.floor(h * r));
            }
            if (url) {
                img = new Image();
                img.onerror = function() {
                    // dom.removeAttr('data-src');
                    return false;
                };
                if (is_support_webp()) {
                    url && (/pic1\.ajkimg\.com(.*)\.(jpg|png)/.test(url)) && !(url.match(/\?t=(\d)/i) > 0) && (url += "?t=5");
                }
                img.onload = function() {
                    // dom.removeAttr('data-src');

                    var aImgWrap = dom.parent();
                    var imgWrapWidth = aImgWrap.width();
                    var imgWrapHeight = aImgWrap.height();
                    var imgWidth = this.width;
                    var imgHeight = this.height;
                    if ( imgWidth / imgHeight > imgWrapWidth / imgWrapHeight ) { // 瓒呭鍥惧姞鏍囪
                        aImgWrap.addClass("super-wide-img-wrap");
                    }

                    dom.attr('src', url);
                };

                img.src = url;
            }
        }
    };
})(window.Zepto || window.jQuery, APF.Namespace.register('module.utils'));;(function ($,N){
    N.fixIphoneX = function (options){
        this.ops = $.extend({
            pnode: '',
            ifBtomGuid: false
        },options);
        this.bottomHieght = 34;
        this.scrolltop=$(window).scrollTop();
        this.bisIphoneX = this.isIphoneX();
        self.lastarrow='';
        this.init();
    }
    N.fixIphoneX.prototype = {
        constructor: N.fixIphoneX,
        init: function (){
            if(!this.bisIphoneX||this.ops.pnode.length<=0) return false;
            this.fixIphoneX();
        },
        isIphoneX: function (){
            var u = navigator.userAgent;
            if(u.indexOf('iPhone') < 0) return false;
            //妯睆
            if (window.orientation == 90 || window.orientation == -90){
                return window.matchMedia("only screen and (device-width: 812px) and (device-height: 375px) and (-webkit-device-pixel-ratio: 3)").matches;
                //绔栧睆
            }else if (window.orientation == 0 || window.orientation == 180) {
                return window.matchMedia("only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)").matches;
            }else{
                return false;
            }
        },
        fixIphoneX: function (){
            var self = this;
            var dom = $('<div class="btom-dis"></div>').css({
                'height': this.bottomHieght+'px',
                //'background': 'rgba(51,51,51,0.9)',
                'width': '100%',
                'position': 'absolute',
                'bottom': 0,
                'left': 0,
                'z-index': 20
            });
            if(!this.ops.ifBtomGuid){
                dom.css({
                    'background': '#f6f6f6'
                });
            }
            if(this.ops.ifBtomGuid){
                this.ops.pnode.find('.ajkdown-inner').css({
                    'margin-top': '10px'
                });
                this.ops.pnode.find('.ajk_anjuke').css({
                    'top': '15px'
                });
                $('.floatlayer')&&$('.floatlayer').css({
                    'bottom': '58px'
                });
            }

            //var pnodedisplay = this.ops.pnode.css('display');
            var pnodeh = this.ops.pnode.height();
            var allheight = pnodeh+this.bottomHieght;
            this.ops.pnode.append(dom).css({
                'height': allheight+'px'
            });
            //if((/^((?!chrome|android).)*safari/i).test(navigator.userAgent.toLowerCase())) return;
            //var lastarrow = '';
            //$(window).scroll(function (){
            //self.resetPos();
            //     var top = $(window).scrollTop();
            //     if(top==0||top==1){
            //         self.hideBottom(pnodeh);
            //         self.scrolltop=top;
            //         return;
            //     }
            //     if(top>self.scrolltop){
            //         if(lastarrow!='down'){
            //             self.hideBottom(pnodeh);
            //             lastarrow='down';
            //         }
            //     }
            //     if(top<self.scrolltop){
            //         if(lastarrow!='up'){
            //             self.displayBottom(pnodedisplay, allheight);
            //             lastarrow='up';
            //         }

            //     }
            //     self.scrolltop=top;
            //});
            //$(window).on('touchmove', function (){
            //self.resetPos();
            //});
        }
        //     resetPos: function (){
        //         var self=this;
        //         var top = $(window).scrollTop();
        //         if(top==0||top==1){
        //             self.hideBottom(self.pnodeh);
        //             self.scrolltop=top;
        //             return;
        //         }
        //         if(top>self.scrolltop){
        //             if(lastarrow!='down'){
        //                 self.displayBottom(self.pnodedisplay, self.allheight);
        //                 lastarrow='down';
        //             }
        //         }
        //         if(top<self.scrolltop){
        //             if(lastarrow!='up'){
        //                 self.hideBottom(self.pnodeh);
        //                 lastarrow='up';
        //             }

        //         }
        //         self.scrolltop=top;
        //     },
        //     hideBottom: function (h){
        //     	var self=this;
        //     	self.ops.pnode.find('.btom-dis').css({
        //             'display': 'none'
        //         });
        //         self.ops.pnode.css({
        // 'height': h+'px'
        //         });
        //     },
        //     displayBottom: function (dis,h){
        //         var self=this;
        //     	self.ops.pnode.find('.btom-dis').css({
        //             'display': dis
        //         });
        //         self.ops.pnode.css({
        // 'height': h+'px'
        //         });
        //     }
    }
})(Zepto, APF.Namespace.register('user.touch.common'));(function($, NS) {
    NS.appDownloadV2 = function(ops){
        this.ops = $.extend({
            rounds : 200,
            max:2,
            bag_num:'b1112',
            wxLink : 'http://app.anjuke.com/url?url=http%3A%2F%2Fa.app.qq.com%2Fo%2Fsimple.jsp%3Fpkgname%3Dcom.anjuke.android.app%26g_f%3D991653&ipm=touch'
        }, NS.appDownloadV2.config, ops);
        this.data = {
            dl_dom: $('.dl_dom_js'),
            clo_dom: $('#xajk_fork'),
            app_down_dom: $('#xajk_down_dom'),
            app_desc: $('.ajk_desc'),
            app_down_bbar: $('#xajk_down')
        };
        this.downSelects = {
            listDataCard : '.dl_dom_js'
        }

        this.link = {
            android : '',
            ios : ''
        }

        this.downloadtype= 'big_mark';
        this.isclose=true;

        this.browser = {
            versions: function () {
                var u = navigator.userAgent, app = navigator.appVersion;
                return { //绉诲姩缁堢娴忚鍣ㄧ増鏈俊鎭�
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios缁堢
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android缁堢鎴杣c娴忚鍣�
                    iPhone: u.indexOf('iPhone') > -1, //鏄惁涓篿Phone鎴栬€匭QHD娴忚鍣�
                    iPad: u.indexOf('iPad') > -1, //鏄惁iPad
                    isWx : u.indexOf('MicroMessenger') > -1, //鏄井淇℃父瑙堝櫒
                };
            }(),
        }

        this.track = 'track_' + APF.info.pageName + '_wake';
        this._domain = '';

        this.refer = 'track_'+$('head').attr('data-page')+'_app_show';
        // 鎵撳紑瀹㈡埛绔� anjuke app
        this.openAppSrc = "openanjuke://app.anjuke.com/home/?guid=" + APF.Utils.getCookie('aQQ_ajkguid') + "&refer="+this.refer;

        this.init();
    }
    NS.appDownloadV2.prototype = {

        init: function(){
            this.appDownloadFixedEvent();
            this.sendExposure();
            this.ops.allow_wake && this.ops.wake && this.wakeUpOnly();
        },

        sendExposure: function(){
            this.exposure = new touch.component.module.Exposure();
            this.exposure.add($('#xajk_down_new'));
        },
        //鏇存敼click浜嬩欢
        appDownloadFixedEvent: function(){
            var _this = this;
            var isShow_date   = _this.appFixedDate();
            var isShow_market = _this.fromMarket();
            //if (this.ops.showbottombar && isShow_date && !isShow_market) {
            if (this.ops.showbottombar&&!isShow_market) {
                T.trackEvent(this.refer);
                $(_this.data.app_desc).html('涓嬭浇瀹夊眳瀹PP<em>'+this.ops.bbartxt+'</em>');
                $(_this.data.app_down_bbar).attr('bagnum',this.ops['bag_num']);
                $(_this.data.app_down_bbar).attr('ver',this.ops['ver']);
                $(_this.data.app_down_bbar).attr('data-track-soj',this.ops['data-track-soj']);
                //_this.data.app_down_dom.show();
                //_this.isclose=false;
                try{
                    if(window.localStorage.getItem('clicked_close') == '1'){
                        _this.data.app_down_dom.hide();
                        $('.floatlayer').show();
                        _this.downloadtype= 'small_mark';
                        T.trackEvent($('head').attr('data-page')+'_small_mark');
                    }else{
                        _this.data.app_down_dom.show();
                        $('.floatlayer').hide();
                        T.trackEvent($('head').attr('data-page')+'_bottom_bigmark');
                    }
                }catch(e){
                    var cookie = T.getCookie('clicked_close');
                    if(cookie=='1'){
                        _this.data.app_down_dom.hide();
                        $('.floatlayer').show();
                        _this.downloadtype= 'small_mark';
                        T.trackEvent($('head').attr('data-page')+'_small_mark');
                    }else{
                        _this.data.app_down_dom.show();
                        $('.floatlayer').hide();
                        T.trackEvent($('head').attr('data-page')+'_bottom_bigmark');
                    }
                }
            }
            if(isShow_market) {
                this.setDownloadCookie(this.ops.max);
                //_this.isclose=true;
            }
            _this.data.clo_dom.on('click',function (e){
                e.stopPropagation();
                _this.data.app_down_dom.css({"display":"none"});
                $('.floatlayer').show();
                //_this.isclose=true;
                if(window.localStorage&&window.localStorage.setItem){
                    try{
                        window.localStorage.setItem('clicked_close', '1');
                    }catch(e){
                        _this.setCookieCommon('clicked_close', '1', 5000, '/', _this.getDomain());
                    }
                }else{
                    _this.setCookieCommon('clicked_close', '1', 5000, '/', _this.getDomain());
                }
                // var time = _this.getCookieTime();
                T.trackEvent('track_'+ $('head').attr('data-page') +'_app_close');
                // if(!time.time) {
                //   _this.setDownloadCookie(1);
                //   _this.show();
                //   return ;
                // }
                // _this.setDownloadCookie(_this.ops.max);
            });
            $('body').on('click',_this.downSelects.listDataCard,function(){
                var num  = $(this).attr('bagnum')||_this.ops['bag_num'],ver = _this.ops['ver'];
                var downonly = $(this).attr('downonly');
                _this.track = $(this).data('track-soj')||$(this).data('track')||_this.ops['data-track-soj']; //鑾峰彇鍙戠爜瀛愪覆
                _this.refer = 'track_'+_this.track+'_app_show';
                var params = '';
                _this.openAppSrc = "openanjuke://app.anjuke.com/home/?guid=" + APF.Utils.getCookie('aQQ_ajkguid') + "&refer="+_this.refer;
                _this.link.android = _this.ops.android+num;
                _this.link.ios = _this.ops.ios;
                downonly == 'true' ? _this.downloadOnly(params) : _this.wakeAndDownload(params);
            });
            $('body').on('click','.floatlayer',function(){
                var num  = $(this).prev().find('a.dl_dom_js').attr('bagnum')||_this.ops['bag_num'],ver = _this.ops['ver'];
                var downonly = $(this).prev().find('a.dl_dom_js').attr('downonly');
                _this.track = $(this).prev().find('a.dl_dom_js').data('track-soj')||$(this).prev().find('a.dl_dom_js').data('track')||_this.ops['data-track-soj']; //鑾峰彇鍙戠爜瀛愪覆
                _this.refer = 'track_'+_this.track+'_smallMark_app_show';
                var params = 'smallmark';
                //T.trackEvent(_this.track+'_smallMarket_'+_this.device);
                num = _this.ops.bagnum_smallMark||num;

                _this.openAppSrc = "openanjuke://app.anjuke.com/home/?guid=" + APF.Utils.getCookie('aQQ_ajkguid') + "&refer="+_this.refer;
                _this.link.android = _this.ops.android+num;
                _this.link.ios = _this.ops.ios;
                downonly == 'true' ? _this.downloadOnly(params) : _this.wakeAndDownload(params);
            });
            //鍏煎iphoneX鏍峰紡
            if($('#xajk_down_dom').length>0&&$('#xajk_down_dom').css('display')!='none'){
                this.fixphonex=new user.touch.common.fixIphoneX({
                    pnode: $('#xajk_down_dom'),
                    ifBtomGuid: true
                });
            }
            //鍏煎iphoneX鏍峰紡 end
        },

        // abort link and trackEvent
        wakeAndDownload : function (param) {
            var _this = this;
            var browser = _this.browser;

            //bug fix 涓存椂璋冩暣寰俊涓笅杞介€昏緫
            if(browser.versions.isWx) {
                if (browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
                    if(param == 'smallmark'){
                        T.trackEvent(_this.track+'_smallMarket_ios');
                    }else{
                        T.trackEvent(this.track+'_ios');
                    }

                }

                if (browser.versions.android) {
                    if(param == 'smallmark'){
                        T.trackEvent(_this.track+'_smallMarket_android');
                    }else{
                        T.trackEvent(this.track+'_android');
                    }
                }
                window.location.href = _this.ops.wxLink;
                return;
            }

            if (browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
                if(param == 'smallmark'){
                    T.trackEvent(_this.track+'_smallMarket_ios');
                }else{
                    T.trackEvent(this.track+'_ios');
                }
                window.location = _this.openAppSrc;
                _this.checkHasApp(Date.now(),'ios');
            }

            if (browser.versions.android) {
                if(param == 'smallmark'){
                    T.trackEvent(_this.track+'_smallMarket_android');
                }else{
                    T.trackEvent(this.track+'_android');
                }
                var ifr = document.createElement('iframe');
                ifr.src = _this.openAppSrc;
                ifr.style.width = '0px';
                ifr.style.height = '0px';
                document.body.appendChild(ifr);
                _this.checkHasApp(Date.now(),'android');
            }
        },
        getNowTime:function() {
            var nowDate = new Date();
            var now = nowDate.getFullYear() + "-" + (nowDate.getMonth()+1) + "-" + nowDate.getDate();
            return now;
        },
        show:function() {
            var _this = this;
            setTimeout(function(){
                _this.data.app_down_dom.show();
                //_this.isclose=false;
            },5000);
        },
        setDownloadCookie:function(count) {
            count = count || this.ops.count;
            var now = this.getNowTime() + '|' + count,
                domain = this.getDomain();
            APF.Utils.setCookie("app_download_date", now, "1",'/',domain);
        },
        getDomain:function() {
            if(this._domain) {
                return this._domain;
            }
            var arr = location.host.split('.');
            this._domain = arr.slice(-2).join('.');
            return this._domain;
        },
        // abort close
        appFixedDate: function(){
            var now = this.getNowTime();
            var time = this.getCookieTime();
            if (!time.time) {
                return true;
            }
            if (now == time.time && time.count >= this.ops.max) {
                return false;
            }
            return true;
        },
        getCookieTime:function() {
            var cookie = APF.Utils.getCookie("app_download_date");
            if(!cookie) {
                return {
                    time:false,
                    count:0
                };
            }
            cookie = cookie.split('|');
            var last = cookie[0];
            var count = parseInt(cookie[1],10) || 1; // 鍏煎鑰佹暟鎹�
            return {
                time:last,
                count:count
            };
        },

        //鍒ゆ柇鏄惁鏄競鍦烘姇鏀�
        fromMarket: function(){
            return (window.location.href.indexOf('from=marketing') > 0) || (window.location.href.indexOf('from=51gjj') > 0);
        },

        //浠呬笅杞�
        downloadOnly: function(param){
            var _this = this;
            var browser = _this.browser;

            //bug fix 涓存椂璋冩暣寰俊涓笅杞介€昏緫
            if(browser.versions.isWx) {
                if (browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
                    if(param == 'smallmark'){
                        T.trackEvent(_this.track+'_smallMarket_ios');
                    }else{
                        T.trackEvent(_this.track+'_ios');
                    }
                }

                if (browser.versions.android) {
                    if(param == 'smallmark'){
                        T.trackEvent(_this.track+'_smallMarket_android');
                    }else{
                        T.trackEvent(_this.track+'_android');
                    }
                }
                window.location.href = _this.ops.wxLink;
                return;
            }

            if (browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
                if(param == 'smallmark'){
                    T.trackEvent(_this.track+'_smallMarket_ios');
                }else{
                    T.trackEvent(_this.track+'_ios');
                }
                window.location = _this.link.ios;
            }

            if (browser.versions.android) {
                if(param == 'smallmark'){
                    T.trackEvent(_this.track+'_smallMarket_android');
                }else{
                    T.trackEvent(_this.track+'_android');
                }
                window.location = _this.link.android;
            }
        },

        //浠呭敜璧穉pp,姣忓ぉ闄愪竴娆�
        wakeUpOnly: function(){
            var self = this;
            if(window.localStorage&&window.localStorage.setItem){
                try{
                    window.localStorage.setItem('testLocalstorage',1);
                    self.wakeUpByLocalstorage();
                }catch(e){
                    self.wakeUpByCookie();
                }
            }else{
                self.wakeUpByCookie();
            }
        },

        wakeUpByCookie: function (){
            var _this       = this;
            var wakeUpCode  = '_wakeUpOnly';
            var currentPage = $('head').attr('data-page');
            var ck = T.getCookie('ajk_app_wakeup');
            if(ck){
                if(ck>=2) return;
                ck++;
                _this.setCookieVals('ajk_app_wakeup',ck);
                _this.wakeCommonCode(wakeUpCode);
                return;
            }
            _this.setCookieVals('ajk_app_wakeup',0);
            _this.wakeCommonCode(wakeUpCode);
        },

        setCookieVals: function (key,val){
            var domain = this.getDomain();
            var d = new Date();
            var str = d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate();
            var d2 = new Date(str+ ' 24:00');
            this.setCookieCommon(key,val,d2,'/',domain);
        },

        setCookieCommon: function(name, value, expires, path, domain, secure) {
            document.cookie = name + "=" + escape(value) +
            ((expires) ? ";expires=" + expires.toGMTString() : "") +
            ((path) ? ";path=" + path : "") +
            ((domain) ? ";domain=" + domain : "") +
            ((secure) ? ";secure" : "");
        },

        wakeUpByLocalstorage: function (){
            var _this       = this;
            var browser     = _this.browser;
            var wakeUpCode  = '_wakeUpOnly';
            var history     = JSON.parse(T.LocalStorageHelper('getItem', 'ajk_app_wakeup')) || {},
                now         = new Date(),
                year        = now.getFullYear(),
                month       = now.getMonth() + 1,
                date        = now.getDate(),
                today       = year + '/' + month + '/' + date,
                currentPage = $('head').attr('data-page');
            if ( history.timeStamp && history.timeStamp !== today) {
                history = {};
            }
            history.timeStamp = today;
            history[currentPage] = history[currentPage] || 0;
            var count = 0;
            $.each(history,function(key,val){
                if(key === 'timeStamp') {
                    return ;
                }
                count += val;
            });
            if(count >=2) {
                return;
            }
            history[currentPage]++;
            _this.wakeCommonCode(wakeUpCode);
            T.LocalStorageHelper('setItem', 'ajk_app_wakeup', JSON.stringify(history));
        },

        wakeCommonCode: function (wakeUpCode){
            var _this=this;
            var browser = this.browser;
            if (browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
                T.trackEvent(this.track+'_'+_this.downloadtype+'_ios');
                window.location = _this.openAppSrc + wakeUpCode;
            }else{
                T.trackEvent(this.track+'_'+_this.downloadtype+'_android');
                var ifr = document.createElement('iframe');
                ifr.src = _this.openAppSrc + wakeUpCode;
                // ifr.style.display = 'none';
                ifr.width  = 0 + 'px';
                ifr.height = 0 + 'px';
                document.body.appendChild(ifr);
            }
        },

        // 鍒ゆ柇鏄惁璋冭捣浜哸pp
        checkHasApp: function(originTime,sys){
            var _this        = this,
                displayTime  = originTime,
                delay = 500,
                firstClick   = true;

            if(_this.browser.versions.android) {
                delay = 600;
            }
            setTimeout(function(){
                var time = setInterval(function(){
                    var dd = Date.now();
                    if(firstClick){
                        firstClick  = false;
                        displayTime = dd;
                        return;
                    }
                    if(dd - displayTime  > 200){
                        _this.ops.hasApp = true;
                        clearInterval(time);
                        return;
                    }else{
                        _this.ops.hasApp = false;
                        displayTime      = dd;
                    }
                    if(displayTime > originTime + delay){
                        clearInterval(time);
                        if(Date.now() - originTime > 4000){
                            _this.ops.hasApp = true;
                        }
                        if(!_this.ops.hasApp){
                            sys == 'ios' ? window.location = _this.link.ios : window.location = _this.link.android;
                        }
                    }
                },100);
            },200);
        }
    }

})(Zepto, APF.Namespace.register('user.touch.common'));
(function($, module) {
    module.Observer = {
        listener: {
            defaults: []
        },
        data_status: {},
        on: function(type, fn) {
            if ($.type(type) === 'function') {
                type = 'defaults';
                fn = type;
            }
            if ($.type(fn) !== 'function') {
                return;
            }
            if (!this.listener[type]) {
                this.listener[type] = [];
            }
            this.listener[type].push(fn);
        },
        off: function(type, fn) {
            var sub,
                i,
                max;
            if ($.type(type) === 'function') {
                fn = type;
                type = 'defaults';
            }
            if (!type) {
                return;
            }
            sub = this.listener[type];
            max = sub ? sub.length : 0;
            if ($.type(fn) === 'function') {
                for (i = 0; i < max; i++) {
                    if (sub[i] === fn) {
                        sub.splice(i, 1);
                    }
                }
                this.listener[type] = sub;
                return;
            }
            this.listener[type] = [];
        },
        trigger: function() {
            var length = arguments.length,
                type,
                sub,
                args = [],
                max,
                result,
                i;
            if (length <= 1) {
                type = $.type(arguments[0]);
                if (type === 'array') {
                    type = 'defaults';
                    args = type;
                } else if (type !== 'string') {
                    return;
                } else {
                    type = arguments[0];
                }
            } else {
                args = [].concat.apply([],arguments); // 淇濊瘉apply鍙傛暟涓烘暟缁�
                type = args.splice(0, 1);
            }
            sub = this.listener[type];
            max = sub ? sub.length : 0;
            for (i = 0; i < max; i++) {
                result = sub[i].apply(null, args);
                if (result === false) {
                    break;
                }
            }
        },
        get_data: function(key) {
            return this.data_status[key];
        },
        set_data: function(key, data) {
            this.data_status[key] = data;
        }
    };

    module.Observer.addPublisher = function(o) {
        $.extend(true, o, module.Observer);
    };
})(Zepto, APF.Namespace.register('touch.component.module'));;
(function(module) {
    module.Dialog = function(opt) {
        var defaults = {
            clazz: 'g-d-dialog',
            action: 'click',
            target: '',
            bgClose: false
        };
        this.ops = $.extend(defaults, opt);
        this.dom = {};
        this.init();
    };

    module.Dialog.prototype = $.extend({}, module.Observer, {
        constructor: module.Dialog,
        init: function() {
            var frame = $(document.createDocumentFragment()),
                _this = this,
                content,
                div = $('<div></div>');
            div.addClass(this.ops.clazz);
            frame.append(div);
            if (this.ops.select) {
                content = $(this.ops.select);
            }
            div.append(content || '');
            $('body').append(frame);
            this.dom.dialog = div;

            // 绂佹寮瑰眰涓婇潰鐨則ouchmove
            this.dom.dialog.on('touchmove', function(e) {
                e.preventDefault();
            });

            // 鍏抽棴鎸夐挳
            $(this.ops.closeSelect).click(function(event) { // 鍒濆鍖栧叧闂寜閽�
                event.stopPropagation();
                _this.trigger('dialogClose');
                _this.close();
            });

            // 鐐瑰嚮鑳屾櫙鍏抽棴
            if (this.ops.bgClose) {
                div.click(function(event) { // 鐐瑰嚮鑳屾櫙鍏抽棴
                    if (event.target === this) {
                        event.stopPropagation();
                        _this.trigger('bgClose');
                        _this.close();
                    }
                });
            }
            // 杈撳叆妗�
            div.find('input').blur(function(event) {
                event.stopPropagation();
                _this.fixDrawSlow();
            });

            // 鎵撳紑寮规
            if (this.ops.target) {
                $(this.ops.target).on(this.ops.action, function(event) {
                    event.stopPropagation();
                    var arr = [].slice.call(arguments);
                    _this.open(arr.slice(1));
                });
            }
        },
        open: function(arg) {
            this.trigger('open', arg);
            this.dom.dialog.css('display', '-webkit-box');
            this.trigger('afteropen', arg);
        },
        close: function(arg) {
            this.dom.dialog.hide();
            this.trigger('close', arg);
        },
        getDialog: function() {
            return this.dom.dialog;
        },
        fixDrawSlow: function() {
            var top = $(window).scrollTop();
            setTimeout(function() {
                $(window).scrollTop(top + 1);
                setTimeout(function() {
                    $(window).scrollTop(top);
                }, 10);
            }, 1);
        },
    });
})(APF.Namespace.register('touch.component.module'));
;(function ($, NS, myModule) {
    var Dialog = myModule.Dialog;

    NS.appDownloadDialog = function (ops) {
        this.ops = $.extend({}, NS.appDownloadDialog.config, ops);
        this.init();
    }

    NS.appDownloadDialog.prototype = {
        init: function(){
            var _this = this,
                visit = JSON.parse(T.LocalStorageHelper('getItem', 'ajk_view_visit')) || {},
                now = new Date(),
                year = now.getFullYear(),
                month = now.getMonth() + 1,
                date = now.getDate(),
                today = year + '/' + month + '/' + date,
                currentPage = this.ops.current_page,
                limit = this.ops.config_pop.limit,
                pages = this.ops.config_pop.pagename,
                count = 0,
                dialogAppdownload = new Dialog({
                    select: '#dialogdownload',
                    closeSelect: '.continue-visit',
                    bgClose: true
                }),
                dialogDepthAppdownload = new Dialog({
                    select: '#dialogdownload-depth',
                    bgClose: true,
                    clazz: 'g-d-dialog depth-dialog'
                }),
            //绔欏鎶曟斁寮圭獥
            //typeArr = _this.ops.typeArr,
                typeArr = {
                    'home':{pm:{
                        1  : 'b762',
                        7  : 'b810',
                        9  : 'b820',
                        11 : 'b830',
                        12 : 'b886',
                        14 : 'b896',
                        16 : 'b906'
                    },track:'track_shouq_download_tanchuang',img:'dialog_home',text:{
                        1  : '鎵鹃檮杩戯紝鎵炬渶鏂帮紝鎵剧儹闂ㄦ埧婧�',
                        7  : '&nbsp;&nbsp;&nbsp;浜屾墜鎴裤€佹柊鎴裤€佺鎴裤€佸晢涓氬湴浜�</br>鎵炬埧闈犺氨渚垮疁!',
                        9  : '浜屾墜鎴裤€佹柊鎴裤€佺鎴裤€佸晢涓氬湴浜э紝杞绘澗鎵炬埧',
                        11 : '&nbsp;&nbsp;&nbsp;鏈湀鎴挎簮宸叉洿鏂帮紝鐗逛环鎴挎簮绛変綘鎸�!',
                        12 : ' 鏈€鏂版埧浠蜂竴鎵嬫帉鎻★紝鐪佸績缃笟涓€姝ュ埌浣�!',
                        14 : ' 鏈€鏂版埧浠蜂竴鎵嬫帉鎻★紝鐪佸績缃笟涓€姝ュ埌浣�!'
                    }},
                    'esf':{pm:{
                        1  :'b763',
                        7  : 'b811',
                        9  : 'b821',
                        11 : 'b831',
                        12 : 'b887',
                        14 : 'b897',
                        16 : 'b907'
                    },track:'track_shouq_download_tanchuang',img:'dialog_esf',text:{
                        1  : '浜屾墜鎴挎簮宸叉洿鏂帮紝鎬ュ敭鎴挎簮绛変綘鎸�',
                        7  : '灞呭蹇呴€夛紝鍗楀寳閫氬弻闃冲彴</br>璧�30涓囪淇�!',
                        9  : '姣斿井淇¤繕濂界敤鐨勫井鑱婏紝鎵炬埧閬垮厤鐢佃瘽楠氭壈',
                        11 : '&nbsp;&nbsp;&nbsp;娴烽噺绮捐浜屾墜鎴匡紝闄嶄环鍑哄敭!',
                        12 : '鎴夸笢鎬ュ崠锛屼环鏍肩洿闄�30涓囷紝涓嶈閿欒繃!',
                        14 : ' 鎴夸笢鎬ュ崠锛屼环鏍肩洿闄�30涓囷紝涓嶈閿欒繃!'
                    }},
                    'biz':{pm:{
                        1  : 'b766',
                        7  : 'b814',
                        9  : 'b824',
                        11 : 'b834',
                        12 : 'b890',
                        14 : 'b900',
                        16 : 'b910'
                    },track:'track_shouq_download_tanchuang',img:'dialog_biz',text:{
                        1  : '鐢茬骇鍐欏瓧妤硷紝鍚嶄紒鍏ラ┗锛屾璐粠閫�',
                        7  : '&nbsp;&nbsp;&nbsp;楂樺搧璐ㄥ啓瀛楁ゼ锛岃溅浣嶉綈鍏�</br>浣庝环鐑攢涓�!',
                        9  : '鐢茬骇鍐欏瓧妤硷紝浣庡粔浠锋牸锛岄珮绔韩鍙�',
                        11 : '&nbsp;&nbsp;&nbsp;鍥介檯鍝佽川鍐欏瓧妤硷紝鐏垎鎷涘晢涓�!',
                        12 : '5A鍐欏瓧妤硷紝鍏ㄥ鍔炲叕璁惧鍏嶈垂閫�!',
                        14 : '5A鍐欏瓧妤硷紝鍏ㄥ鍔炲叕璁惧鍏嶈垂閫�!'
                    }},
                    'rent':{pm:{
                        1  : 'b765',
                        7  : 'b813',
                        9  : 'b823',
                        11 : 'b833',
                        12 : 'b889',
                        14 : 'b899',
                        16 : 'b909'
                    },track:'track_shouq_download_tanchuang',img:'dialog_rent',text:{
                        1  : '娴烽噺鎴挎簮锛屽厤涓粙璐癸紝绉熸埧鏇寸渷閽�',
                        7  : '&nbsp;&nbsp;&nbsp;鎴夸笢鎬ョ!娓呯埥骞插噣</br>浠呴渶25鍏�/鏃ヨ捣!',
                        9  : '棣栨鍑虹锛屽厤涓粙璐癸紝鎷庡寘鍏ヤ綇',
                        11 : '&nbsp;&nbsp;&nbsp;濂芥埧棣栨鍑虹锛屾嫀鍖呭叆浣�!',
                        12 : '涓汉鎴挎簮锛�0涓粙0鎶奸噾锛屾绉熶粠閫�!',
                        14 : '涓汉鎴挎簮锛�0涓粙0鎶奸噾锛屾绉熶粠閫�!'
                    }}
                };
            arguments = GetQueryString("tanchuang");
            var styleType = this.ops.styleType = GetQueryString("style") =='noParameter' ? 1 : GetQueryString("style");
            if(arguments !== 'noParameter'){
                var dom = $('#dialogdownload'),
                    child = dom.find('.dl_dom_js');
                child.data('track-soj',typeArr[arguments].track+'_'+_this.ops.styleType);
                child.attr('bagnum',typeArr[arguments].pm[styleType]);
                dom.find('img').attr('src',this.ops.img_url+typeArr[arguments].img+'-st'+styleType+'.png');
                dom.find('.tip-ul').html(typeArr[arguments].text[styleType]);
                dialogAppdownload.open();
                dialogAppdownload.getDialog().find('#dialogdownload').show();
                resetDialog();
            }
            $('.close-dialogdownload').on('click', function (e) {
                dialogAppdownload.close();
                T.trackEvent('track_download_popup_shut_2');
                e.stopPropagation();
            });
            $('.continue-visit,.appdown-close').on('click', function (e) {
                T.trackEvent('track_download_popup_shut_1');
                dialogAppdownload.close();
                dialogDepthAppdownload.close();
                e.stopPropagation();
            });
            dialogAppdownload.on('bgClose', function(){
                T.trackEvent('track_download_popup_shut_3');
            });
            dialogDepthAppdownload.on('bgClose', function(){
                T.trackEvent('track_download_popup_shut_3');
            });
            //绔欏唴璁块棶娣卞害寮圭獥
            if ( visit.timeStamp && visit.timeStamp !== today) {
                visit = {};
            }
            visit.timeStamp = today;
            visit[currentPage] = visit[currentPage] || 0;
            visit[currentPage] ++;
            for (var i = 0; i < pages.length; i++) {
                count += visit[pages[i]] || 0;
            }
            // seo娓犻亾鍒犻櫎骞垮憡浣�
            if (count == limit && pages.indexOf(currentPage) !== -1 && _this.ops.seo_source_type == '0') {
                dialogDepthAppdownload.open();
                dialogDepthAppdownload.getDialog().find('.dialogdownload-depth').show();
                T.trackEvent('exp_app_download_popup');
            }
            T.LocalStorageHelper('setItem', 'ajk_view_visit', JSON.stringify(visit));
            function GetQueryString(name){
                // var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
                // var r = window.location.search.substr(1).match(reg);
                // if(r!=null)return  unescape(r[2]);
                return 'noParameter';
            }
            function resetDialog(){
                if(_this.ops.styleType == 7){
                    $('#dialogdownload img').css('marginTop','-69px');
                    $('#dialogdownload .close-dialogdownload').css('top','-8px');
                }
                if(_this.ops.styleType != 1){
                    $('#dialogdownload').addClass('dialog-b');
                }
                $('#dialogdownload img').show();
            }
        }
    }
})(Zepto, APF.Namespace.register('user.touch.common'), touch.component.module);
/**
 * [寮瑰嚭灞傦紝鐢ㄦ潵鏄剧ず瑙ｉ噴鎬ф枃妗堬紝tw绔娇鐢紝鍏蜂綋妗堜緥鐩綍  tools/tax/esf/]
 * 璇ュ簱渚濊禆浜嶼epto.js搴�
 * defaults鍙傛暟锛�
 * wrap_maxheight涓哄脊妗嗗尯鍩熺殑鏈€澶ч珮搴︼紝
 * title_height涓哄ご閮ㄥ叧闂寜閽殑楂樺害锛�
 * cont涓烘彃鍏ュ唴瀹圭殑jquery瀵硅薄銆�
 */
;(function (module){
    module.introDialog = function (op){
        var defaults = {
            'wrap_maxheight': '390px',
            'title_height': '40px',
            'cont': $('<div></div>')//jquery瀵硅薄
        }

        this.dom = {},
            this.ops = $.extend({}, defaults, op);
        this.init();
    }

    module.introDialog.prototype = {
        constructor: module.introDialog,

        init: function (){
            var self = this;
            self.dom.mask = $('<div class="ui-tw-idmask"></div>');
            self.dom.contdiv = $('<div class="ui-tw-idcon"></div>');
            self.dom.header = $('<div class="ui-tw-idcon-title"><i></i></div>');
            self.dom.contbody = $('<div class="ui-tw-idcon-body"></div>').append(self.ops.cont.show());
            self.dom.contdiv.append(self.dom.header).append(self.dom.contbody);
            $('body').append(self.dom.mask).append(self.dom.contdiv);

            self.dom.contdiv.css({
                'max-height': self.ops.wrap_maxheight
            });

            self.dom.header.css({
                'height': self.ops.title_height,
                'line-height': self.ops.title_height
            });

            self.dom.contbody.css({
                'max-height': parseInt(self.ops.wrap_maxheight)-parseInt(self.ops.title_height)
            });

            T.scrollHelper('.'+self.dom.contbody.attr('class'));
            self._bindEvent();
        },
        //缁戝畾浜嬩欢
        _bindEvent: function (){
            var self = this;
            self.dom.mask.on('click', function (){
                self.close();
            });

            self.dom.mask.on('touchmove', function (evt){
                evt.preventDefault();
            });

            self.dom.header.on('click', function (){
                self.close();
            });
        },
        //渚涘閮ㄨ皟鐢ㄧ殑鏀瑰彉鐜板疄鍐呭鐨勬柟娉�
        _appendCont: function (cont){
            this.dom.contbody.append(cont);
        },
        //鎵撳紑寮圭獥
        open: function (){
            var self = this;
            self.dom.mask.show();
            self.dom.contdiv.show();
            setTimeout(function(){
                self.dom.contdiv.addClass('ui-tw-idconShow');
            },0);
        },
        //鍏抽棴寮圭獥
        close: function (){
            var self = this;
            self.dom.contdiv.removeClass('ui-tw-idconShow');
            setTimeout(function(){
                self.dom.contdiv.hide();
                self.dom.mask.hide();
            },400);
        }
    }

})(APF.Namespace.register('touch.component.module'));;
(function($) {
    var _ = {}
    // Is a given variable an object?
    _.isObject = function(obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    };
    _.isFunction = function(obj) {
        return typeof obj == 'function' || false;
    };


    // Shortcut function for checking if an object has a given property directly
    // on itself (in other words, not on a prototype).
    _.has = function(obj, key) {
        return obj != null && Object.prototype.hasOwnProperty.call(obj, key);
    };

    //鍏煎涓嶆敮鎸丱bject.keys鐨勭幆澧�
    if (!Object.keys) {
        Object.keys = (function() {
            var hasOwnProperty = Object.prototype.hasOwnProperty,
                hasDontEnumBug = !({
                    toString: null
                }).propertyIsEnumerable('toString'),
                dontEnums = [
                    'toString',
                    'toLocaleString',
                    'valueOf',
                    'hasOwnProperty',
                    'isPrototypeOf',
                    'propertyIsEnumerable',
                    'constructor'
                ],
                dontEnumsLength = dontEnums.length;

            return function(obj) {
                if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object');

                var result = [];

                for (var prop in obj) {
                    if (hasOwnProperty.call(obj, prop)) result.push(prop);
                }

                if (hasDontEnumBug) {
                    for (var i = 0; i < dontEnumsLength; i++) {
                        if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
                    }
                }
                return result;
            }
        })()
    };
    // Retrieve all the property names of an object.
    _.allKeys = function(obj) {
        if (!_.isObject(obj)) return [];
        return Object.keys(obj);
        // if (Object.keys) return Object.keys(obj);
        // var keys = [];
        // for (var key in obj) keys.push(key);
        // Ahem, IE < 9.
        // if (hasEnumBug) collectNonEnumProps(obj, keys);
        // return keys;
    };
    // Retrieve the names of an object's own properties.
    // Delegates to **ECMAScript 5**'s native `Object.keys`.
    _.keys = function(obj) {
        if (!_.isObject(obj)) return [];
        return Object.keys(obj);
        // if (Object.keys) return Object.keys(obj);
        // var keys = [];
        // for (var key in obj) if (_.has(obj, key)) keys.push(key);
        // Ahem, IE < 9.
        // if (hasEnumBug) collectNonEnumProps(obj, keys);
        // return keys;
    };

    // An internal function for creating assigner functions.
    var createAssigner = function(keysFunc, defaults) {
        return function(obj) {
            var length = arguments.length;
            if (defaults) obj = Object(obj);
            if (length < 2 || obj == null) return obj;
            for (var index = 1; index < length; index++) {
                var source = arguments[index],
                    keys = keysFunc(source),
                    l = keys.length;
                for (var i = 0; i < l; i++) {
                    var key = keys[i];
                    if (!defaults || obj[key] === void 0) obj[key] = source[key];
                }
            }
            return obj;
        };
    };
    // Fill in a given object with default properties.
    _.defaults = createAssigner(_.allKeys, true);
    // List of HTML entities for escaping.
    var escapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '`': '&#x60;'
    };
    // Functions for escaping and unescaping strings to/from HTML interpolation.
    var createEscaper = function(map) {
        var escaper = function(match) {
            return map[match];
        };
        // Regexes for identifying a key that needs to be escaped.
        var source = '(?:' + _.keys(map).join('|') + ')';
        var testRegexp = RegExp(source);
        var replaceRegexp = RegExp(source, 'g');
        return function(string) {
            string = string == null ? '' : '' + string;
            return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
        };
    };
    _.escape = createEscaper(escapeMap);
    // By default, Underscore uses ERB-style template delimiters, change the
    // following template settings to use alternative delimiters.
    var templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };

    // When customizing `templateSettings`, if you don't want to define an
    // interpolation, evaluation or escaping regex, we need one that is
    // guaranteed not to match.
    var noMatch = /(.)^/;

    // Certain characters need to be escaped so that they can be put into a
    // string literal.
    var escapes = {
        "'": "'",
        '\\': '\\',
        '\r': 'r',
        '\n': 'n',
        '\u2028': 'u2028',
        '\u2029': 'u2029'
    };

    var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;

    var escapeChar = function(match) {
        return '\\' + escapes[match];
    };

    // JavaScript micro-templating, similar to John Resig's implementation.
    // Underscore templating handles arbitrary delimiters, preserves whitespace,
    // and correctly escapes quotes within interpolated code.
    // NB: `oldSettings` only exists for backwards compatibility.
    _.template = function(text, settings, oldSettings) {
        if (!settings && oldSettings) settings = oldSettings;
        settings = _.defaults({}, settings, templateSettings);

        // Combine delimiters into one regular expression via alternation.
        var matcher = RegExp([
            (settings.escape || noMatch).source,
            (settings.interpolate || noMatch).source,
            (settings.evaluate || noMatch).source
        ].join('|') + '|$', 'g');

        // Compile the template source, escaping string literals appropriately.
        var index = 0;
        var source = "__p+='";
        text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
            source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
            index = offset + match.length;

            if (escape) {
                source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
            } else if (interpolate) {
                source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
            } else if (evaluate) {
                source += "';\n" + evaluate + "\n__p+='";
            }

            // Adobe VMs need the match returned to produce the correct offset.
            return match;
        });
        source += "';\n";

        // If a variable is not specified, place data values in local scope.
        if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

        source = "var __t,__p='',__j=Array.prototype.join," +
        "print=function(){__p+=__j.call(arguments,'');};\n" +
        source + 'return __p;\n';

        var render;
        try {
            render = new Function(settings.variable || 'obj', '_', source);
        } catch (e) {
            e.source = source;
            throw e;
        }

        var template = function(data) {
            return render.call(this, data, _);
        };

        // Provide the compiled source as a convenience for precompilation.
        var argument = settings.variable || 'obj';
        template.source = 'function(' + argument + '){\n' + source + '}';

        return template;
    };
    //add to the $
    $.fn.template = function(datas, settings, oldSettings) {
        return _.template($(this).html(), settings, oldSettings)(datas)
    }
    window._ = _;
})(window.jQuery || window.Zepto);;(function ($){
    $(function (){
        var tpl = _.template("<div id=\"commit-intro\" class=\"commit-intro\">\n    <h3>\u7ecf\u7eaa\u4eba\u670d\u52a1\u627f\u8bfa<\/h3>\n    <p>\u7ecf\u7eaa\u4eba\u5df2\u7f34\u7eb3\u8bda\u4fe1\u4fdd\u8bc1\u91d1\uff0c\u627f\u8bfa\u5728\u4ee5\u4e0b\u73af\u8282\u63d0\u4f9b\u4f18\u8d28\u670d\u52a1\uff0c\u4fdd\u969c\u60a8\u987a\u5229\u4ea4\u6613<\/p>\n    <dl>\n        <dt>\n            <i class=\"bu-icon bu-icon-prop_verify\"><\/i>\n            \u5b9e\u5730\u5e26\u770b\n        <\/dt>\n        <dd>\u5c55\u793a\u623f\u5c4b\u771f\u5b9e\u72b6\u51b5<\/dd>\n        <dd>\u4e0d\u9690\u7792\u623f\u5c4b\u8d28\u91cf\u95ee\u9898<\/dd>\n        <dd>\u6839\u636e\u4e70\u5bb6\u7684\u9700\u6c42\u63a8\u8350\u623f\u6e90\uff08\u6237\u578b\u3001\u4ef7\u683c\u3001\u5730\u6bb5\uff09<\/dd>\n        <dd>\u53cd\u9988\u623f\u4e1c\u771f\u5b9e\u610f\u613f\uff0c\u4e0d\u5236\u9020\u5dee\u4ef7<\/dd>\n        <dd>\u4ecb\u7ecd\u623f\u5c4b\u7269\u4e1a\u60c5\u51b5\u3001\u5468\u8fb9\u914d\u5957<\/dd>\n        <dt>\n            <i class=\"bu-icon bu-icon-daikan\"><\/i>\n            \u4ea7\u6743\u6838\u9a8c\n        <\/dt>\n        <dd>\u4fdd\u8bc1\u4ea7\u8c03\u62a5\u544a\u7684\u771f\u5b9e\u6027<\/dd>\n        <dd>\u4e0d\u9690\u7792\u623f\u5c4b\u5c5e\u6027\u3001\u5e74\u9650\u3001\u4ea7\u6743\u95ee\u9898<\/dd>\n        <dd>\u4e0d\u9690\u7792\u5b66\u4f4d\u4f7f\u7528\u60c5\u51b5<\/dd>\n        <dd>\u4e0d\u9690\u7792\u623f\u5c4b\u51fa\u79df\u60c5\u51b5<\/dd>\n        <dt>\n            <i class=\"bu-icon bu-icon-ghdb\"><\/i>\n            \u8fc7\u6237\u534f\u529e\n        <\/dt>\n        <dd>\u4e3a\u60a8\u8bf4\u660e\u76f8\u5173\u6d41\u7a0b\u548c\u6cd5\u89c4<\/dd>\n        <dd>\u534f\u52a9\u51c6\u5907\u6750\u6599<\/dd>\n        <dd>\u5982\u6709\u9700\u8981\uff0c\u4f1a\u534f\u52a9\u529e\u7406\u5ba1\u7a0e\u3001\u8d37\u6b3e\u624b\u7eed<\/dd>\n        <dt>\n            <i class=\"bu-icon bu-icon-wyjg\"><\/i>\n            \u7269\u4e1a\u4ea4\u5272\n        <\/dt>\n        <dd>\u5b8c\u6210\u6c34\u3001\u7535\u3001\u7164\u6c14\u7684\u8d39\u7528\u4ea4\u5272<\/dd>\n        <dd>\u5b8c\u6210\u7269\u4e1a\u3001\u7535\u89c6\u3001\u7535\u8bdd\u7684\u8d39\u7528\u4ea4\u5272<\/dd>\n        <dd>\u5b8c\u6210\u5356\u5bb6\u6240\u627f\u8bfa\u5bb6\u5177\u3001\u5bb6\u7535\u7684\u4ea4\u5272<\/dd>\n    <\/dl>\n<\/div>");
        $body = $('body');
        $body.append(tpl());
        var dom = $('#commit-intro');
        var dialog = new touch.component.module.introDialog({'cont':dom });
        $body.on('click', '.servicewrap', function (){
            var self = $(this);
            if(!self.hasClass('g-next')) {
                return ;
            }
            dialog.open();
            var soj = $(this).data('tracksoj');
            if(soj) {
                T.trackEvent(soj);
            }
        });
    });
})(Zepto);/*鎷ㄦ墦鐢佃瘽鍔犵爜缁勪欢*/
/*
 **track鍙傛暟涓ょ鏂瑰紡娣诲姞 1. 鍒濆鍖栨湰瀵硅薄鏄紶鍏� 2.鍦ㄦ嫧鎵撶數璇濈殑a鏍囩涓€氳繃data-track灞炴€т紶鍏�
 **tag鍙傛暟娣诲姞鏂瑰紡濡倀rack涓€鏍�
 **phone鍙傛暟閫氳繃a鏍囩鐨刪ref鑷姩鑾峰彇,涓€鑸棤闇€浼犲叆
 **phone_select鍙傛暟涓篴鏍囩鐨勯€夋嫨鍣�,閫氳繃浠ｇ悊鏂瑰紡缁戝畾,鐩殑鏄吋瀹筧jax娣诲姞鐨勬柊a鏍囩
 **select鍙傛暟涓篴鏍囩dom node
 **
 */

;
(function($, module) {
    module.Phone = function(opt) {
        var defaults = {
            select: '',
            track: 'track_' + APF.info.pageName + '_phone_call',
            phone_select: '', //浣跨敤浠ｇ悊鏂瑰紡缁戝畾浜嬩欢,鍏煎ajax娣诲姞鐨勫厓绱�
            tag: 0,
            phoneNum: ''
        };
        this.ops = $.extend({}, defaults, opt || {});
        this.guid = T.getGuid();
        this.timeSojStatus = false;
        this.track = this.ops.track;
        this.tag = 0;
        this.param = {};
        this.init();
    };
    var u = navigator.userAgent,
        isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    module.Phone.prototype = {
        constructor: module.Phone,
        init: function() {
            var _this = this;
            // 鐩存帴缁戝畾鏂瑰紡
            $(_this.ops.select).click(function(e) {
                _this.handle($(this), e);
            });
            //浠ｇ悊鏂瑰紡
            if (_this.ops.phone_select) {
                $('body').on('click', this.ops.phone_select, function(e) {
                    _this.handle($(this), e);
                });
            };
        },
        handle: function(dom, e) {
            this.guid = T.getGuid();
            this.phoneNum = dom.attr('href').slice(4) || this.ops.phoneNum;
            this.tag = dom.data('tag') || this.ops.tag;
            this.param = eval("(" + dom.data('param') + ")") || {};
            this.track = dom.data('track') || this.ops.track;
            this.timeSojStatus = true;
            this.addPhoneEvent();
            T.trackEvent(this.track, JSON.stringify(this.getSoj({})));
            e.stopPropagation();
            if (isAndroid) {
                e.preventDefault();
                location.href = dom.attr('href');
            }
        },
        addPhoneEvent: function() {
            var fun = $.proxy(this.sendTimeSoj, this);
            $(document).on('touchstart.phonesoj', function() {
                fun();
            });
            $(window).on('popstate.phone', function() {
                fun();
            });
        },
        sendTimeSoj: function() {
            if (!this.timeSojStatus) {
                return;
            }
            this.timeSojStatus = false;
            var time = (new Date()).getTime();
            T.trackEvent(this.track, JSON.stringify(this.getSoj({
                pt: time
            })));
            $(document).off('touchstart.phonesoj');
            $(window).off('popstate.phone');
            T.getGuid(1);
        },
        getSoj: function(extend) {
            var _this = this,
                result,
                soj = {
                    puid: _this.guid,
                    phone: _this.phoneNum,
                    tag: _this.tag
                };
            result = $.extend(soj, extend || {}, _this.param);
            if ('phone' in result) {
                return result;
            }
            return soj;
        }
    };
})(Zepto, APF.Namespace.register('touch.component.module'));;
APF.Namespace.register('touch.component');
(function($, C) {

    var Observer = {
        listener: {
            defaults: []
        },
        on: function(type, fn, context) {
            var _type,
                _fn;
            if (typeof type !== 'string' && typeof type !== 'undefined') {
                return;
            }
            if (typeof fn !== 'function' && typeof context[fn] !== 'function') {
                return;
            }
            _type = type || 'defaults';
            _fn = typeof fn === 'function' ? fn : context[fn];
            if (typeof this.listener[_type] === 'undefined') {
                this.listener[_type] = [];
            }
            this.listener[_type].push({
                fn: _fn,
                context: context || this
            });
        },
        off: function(type, fn, context) {
            var _type = type || 'defaults',
                sub = this.listener[_type],
                i,
                _context = context || this,
                max = sub ? sub.length : 0;

            for (i = 0; i < max; i++) {
                if (sub[i].fn === fn && sub[i].context === _context) {
                    sub.splice(i, 1);
                }
            }
        },
        trigger: function(type, args) {
            var _type = type || 'defaults',
                sub = this.listener[_type],
                i,
                _args,
                max = sub ? sub.length : 0;
            if (!$.isArray(args)) { // 涓轰簡鍏煎鑰佺殑浠ｇ爜锛岃繖閲屽繀椤昏浆涓€涓�
                if (args) {
                    _args = [args];
                } else {
                    _args = [];
                }
            }
            for (i = 0; i < max; i++) {
                sub[i].fn.apply(sub[i].context, _args);
            }
        }
    };

    function addPublisher(o) {
        $.extend(true, o, Observer);
    }

    C.Dialog = function(opt) {
        var defaults = {
            className: 'g-d-dialog',
            actionEvent: 'click',
            bgClose: false,
            targetNode: ''
        };
        this.ops = $.extend(defaults, opt);
        this.dom = {};
        addPublisher(this);
        this.init();
    };

    C.Dialog.prototype = {
        constructor: C.Dialog,
        init: function() {
            var frame = $(document.createDocumentFragment()),
                _this = this,
                content,
                div = $('<div></div>');
            div.addClass(this.ops.className);
            frame.append(div);
            if(this.ops.select){
                content = $(this.ops.select);
            }
            div.append(content||'');
            $('body').append(frame);
            content.show();
            this.dom.dialog = div;

            // 绂佹寮瑰眰涓婇潰鐨則ouchmove
            this.dom.dialog.on('touchmove', function(e) {
                e.preventDefault();
            });

            // 鍏抽棴鎸夐挳
            $(this.ops.closeSelect).click(function(event) { // 鍒濆鍖栧叧闂寜閽�
                event.stopPropagation();
                _this.trigger('dialogClose');
                _this.close();
            });

            // 鐐瑰嚮鑳屾櫙鍏抽棴
            if (this.ops.bgClose) {
                div.click(function(event) { // 鐐瑰嚮鑳屾櫙鍏抽棴
                    if (event.target === this) {
                        event.stopPropagation();
                        _this.trigger('bgClose');
                        _this.close();
                    }
                });
            }

            // 杈撳叆妗�
            div.find('input').blur(function(event) {
                event.stopPropagation();
                _this.fixDrawSlow();
            });

            // 鎵撳紑寮规
            if (this.ops.targetNode) {
                $(this.ops.targetNode).on(this.ops.actionEvent, function(event) {
                    event.stopPropagation();
                    var arr = [].slice.call(arguments);
                    _this.open(arr.slice(1));
                });
            }
        },
        open: function(arg) {
            this.trigger('open', arg);
            this.dom.dialog.css('display', '-webkit-box');
            this.trigger('afteropen', arg);
        },
        close: function(arg) {
            this.dom.dialog.hide();
            this.trigger('close', arg);
        },
        getDialog: function() {
            return this.dom.dialog;
        },
        fixDrawSlow: function() {
            var top = $(window).scrollTop();
            setTimeout(function() {
                $(window).scrollTop(top + 1);
                setTimeout(function() {
                    $(window).scrollTop(top);
                }, 10);
            }, 1);
        },
    };
})(Zepto, touch.component);
;
(function($, module, info) {
    var hasInstance = false,
        tpl = '<a href="javascript:;" id="safe-call-delegate" class="safe-call-delegate">纭畾</a>' +
            '<div class="dialog-phone" id="dialog-phone">' +
            '<i class="safe"></i>' +
            '<i class="bu-icon bu-icon-close"></i>' +
            '<p class="title">' +
            '<strong>鍙风爜淇濇姢</strong>' +
            '&nbsp;&nbsp;&nbsp;&nbsp;' +
            '<strong>瀹夊績鎺ユ墦</strong>' +
            '</p>' +
            '<p class="desc">' +
            '鎮ㄥ皢浣跨敤鈥滆櫄鎷熷彿鈥濅笌缁忕邯浜鸿仈绯�<br/>' +
            '鎮ㄧ殑鐪熷疄鍙风爜灏嗚闅愯棌瀵规柟鏃犳硶鐪嬪埌' +
            '</p>' +
            '<div class="bu-button-group bu-button-group-col bu-button-group-gap">' +
            '<a id="custom-call" class="bu-button bu-button-minory bu-button-large bu-button-outline" href="javascript:;">鏅€氱數璇濇嫧鎵�</a>' +
            '<a id="safe-call" class="bu-button bu-button-primary bu-button-large" href="javascript:;">瀹夊叏鍛煎彨</a>' +
            '</div>' +
            '</div>' +
            '<div id="safe-call-tips" class="safe-call-tips"><span class=desc></span></div>';

    var pageName = info.pageName;
    module.XhPhone = function(op) {
        var defaults = {
            select: 'a[data-tel]',
            track: 'track_' + pageName + '_dialog_phone_call',
            safeTrack: 'track_' + pageName + '_safe_phone_call',
            clickTrack: 'track_' + pageName + '_safe_btn_click',
            delay: 2000,
            delegateCall: '#safe-call-delegate',
            safeCall: '#safe-call',
            customCall: '#custom-call',
            tips: '#safe-call-tips',
            tag: 0,
            brokerId:'',
            houseId:''
        };
        this._op = $.extend(true, {}, defaults, op || {});
        this._data = {};
        if($(this._op.callDom).length>0){
            this.getPhoneEvent();//鑾峰彇灏忓彿浜嬩欢缁戝畾
        }else{
            this.bindEvent();//瀹夊叏閫氳瘽浜嬩欢缁戝畾
        }
    };
    module.XhPhone.prototype = {
        constructor: module.XhPhone,
        getPhoneEvent:function(){
            var self =this;
            var fakeTelDiv = '<a href="javascript:;" id="xhDialFakeBtn" data-initedphonetrack="0" style="position: fixed;top:0;left:9999px;">纭畾</a>';
            $('body').append(fakeTelDiv);
            self._op.delegateCall = '#xhDialFakeBtn';
            $(document).on('click',function(e){
                e.stopPropagation();
                $(self._op.callDom).parent().find(self._op.tipDom).hide();
                $(self._op.callDom).find(self._op.triangleDom).hide();

            });
            $(document).on('touchmove',function(e){
                $(self._op.callDom).parent().find(self._op.tipDom).hide();
                $(self._op.callDom).find(self._op.triangleDom).hide();

            });
            new touch.component.module.Phone({
                phone_select: [self._op.delegateCall, self._op.customCall].join(',')
            });
            $("body").delegate(self._op.callDom,"click",function(e){
                e.stopPropagation();
                if($(e.target).hasClass('bu-icon-close')){
                    $(e.target).parent().hide();
                    return;
                }
                var href = $(this).attr('href');
                if(/javascript/i.test(href)){
                    phone = $(this).data('broker-phone');
                }else{
                    phone = href.substr(4);
                }
                $(this).parent().find(self._op.tipDom).show();
                $(this).find(self._op.triangleDom).show();
                var param = {
                    broker_id    : $(this).data('brokerid')||self._op.brokerId,
                    broker_phone : phone,
                    house_id     : $(this).data('houseid') || self._op.houseId,
                    business_id  : self._op.businessId
                };
                $.ajax({
                    url: self._op.xhck_url,
                    type: 'get',
                    dataType: 'json',
                    data: param,
                    timeout: 2000,
                    success: function(data){
                        // 宸茬粡鎷ㄦ墦浜嗗ぇ鍙凤紙瓒呮椂锛�
                        if(self.timeoutDialed) {
                            return;
                        }
                        self.ajaxGetXHSuccess = true;

                        // 灏忓彿璇锋眰鎴愬姛
                        if(data.code == 0){
                            self.call(data.val.secret_phone);
                        }else{ // 灏忓彿鏈姹傛垚鍔燂細鐢ㄧ湡瀹炲彿鐮�
                            self.call(phone);
                        }
                    },
                    error: function(){
                        window.console && console.log("鎺ュ彛璇锋眰鍑洪敊");
                        self.ajaxGetXHSuccess = true;
                        if (!self.timeoutDialed) {
                            self.call(phone);
                        }
                    }
                });

            });
        },
        bindEvent: function() {

            // 涓轰簡纭繚鍙疄渚嬪寲涓€娆�
            if (hasInstance) {
                return;
            }
            hasInstance = true;
            var self = this,
                op = this._op;
            if (!op.isXh) {
                new touch.component.module.Phone({
                    phone_select: op.select
                });
                return;
            }
            new touch.component.module.Phone({
                phone_select: [op.delegateCall, op.customCall].join(',')
            });
            var body = $('body');
            body.append(_.template(tpl)());
            customCall = $(op.customCall);
            self._dialog = new touch.component.Dialog({
                select: '#dialog-phone',
                className: 'bu-mask',
                bgClose: true,
                closeSelect: '#dialog-phone .bu-icon-close'
            });
            body.on('click', op.select, function(e) {
                e.preventDefault();
                e.stopPropagation();
                self._dialog.open();
                T.trackEvent(op.clickTrack, {
                    puid: T.getGuid(1)
                });
                var $this = $(this),
                    tag = $this.data('tag') || op.tag,
                    track = $this.data('track'),
                    href = $this.attr('href');
                if(/javascript/i.test(href)){
                    phone = $this.data('broker-phone');
                }else{
                    phone = href.substr(4);
                }
                self._data = {
                    tag: tag,
                    track: track || op.safeTrack,
                    phone: phone,
                    brokerId: $this.data('brokerid') || op.brokerId,
                    houseId: $this.data('houseid') || op.houseId
                };

                customCall.data('track', op.track);
                customCall.data('tag', tag);
                customCall.attr('href', 'tel:' + phone);
            });
            customCall.click(function() {
                setTimeout(function() {
                    self._dialog.close();
                }, 50);

            });

            $(op.safeCall).on('click', function() {
                console.log(self._data.phone);
                self.getXh(self._data);
                self._dialog.close();
            });

            self._dialog.on('bgClose', function() {
                T.trackEvent('track_' + pageName + '_xh_bgclose');
            });

            self._dialog.on('dialogClose', function() {
                T.trackEvent('track_' + pageName + '_xh_close');
            });
        },
        getXh: function(telInfo) {
            var self = this,
                op = self._op;
            self.display('鍔犲瘑杞帴涓�...');
            $.ajax({
                url: op.url,
                dataType: 'json',
                timeout: op.delay,
                data: {
                    broker_id: telInfo.brokerId || op.brokerId,
                    broker_phone: telInfo.phone,
                    house_id: telInfo.houseId || op.houseId,
                    business_id: op.businessId
                },
                success: function(data) {
                    var tel = telInfo.phone;
                    if (data && data.code == 0) {
                        tel = data.val.secret_phone;
                    }
                    self.display();
                    self.call(tel, telInfo.track, telInfo.tag);
                },
                error: function() {
                    self.display();
                    self.call(telInfo.phone, telInfo.track, telInfo.tag);
                }
            });
        },
        call: function(phone, track, tag) {
            var event = new Event('click', {
                    bubbles: true
                }),
                delegateCall = $(this._op.delegateCall);
            this.display();
            delegateCall.attr('href', 'tel:' + phone);
            delegateCall.data('track', track);
            delegateCall.data('tag', tag);
            delegateCall.get(0).dispatchEvent(event);
            delegateCall.attr('href', 'javascript:;');
        },

        display: function(msg) {
            var dom = $(this._op.tips);
            if (!msg) {
                dom.hide();
                return;
            }
            dom.show().find('span').html(msg);
        }
    };
})(Zepto, APF.Namespace.register('touch.component.module'), APF.info);;
(function($, module) {
    module.ChatPop = function(opt) {
        this.opt = $.extend({ id: 'chat_popu' }, opt || {});
        this.init();
    }
    module.ChatPop.prototype = {
        constructor: module.ChatPop,
        init: function() {

            // 鐐归伄缃╂垨鑰呭叧闂寜閽叧闂井鑱婂脊灞�
            var _this = this;
            $('#' + this.opt.id).on('click', function(e) {
                var target = e.target,
                    track = 'track_' + APF.info.pageName + '_chat_appdown_';
                if (target.id == _this.opt.id || target.id === 'close_btn') {
                    $(this).hide();
                    if(target.id === 'close_btn') {
                        T.trackEvent(track + 'close');
                        return;
                    }
                    T.trackEvent(track + 'bgclose');
                }
            });
        }
    }
})(Zepto, APF.Namespace.register('touch.component'));
;
$(function () {
    var exposure = new touch.component.module.Exposure();
    $("#bc-i-chat-btn,.weil_zixun .weiliao").on('click', function() {
        var track = $(this).data('track') || "track_prop_view_chat_click";
        T.trackEvent(track);
        exposure.add($('.chat_appdown'));
        if ($('#chat-pop').css("display") == 'none') {
            $('#chat-pop').css({ "display": "-webkit-box" });
        }
    })
});

// 鐢ㄤ簬鎷ㄦ墦灏忓彿鐨勭被
;(function($,module){
    module.TriPhonePop = function(ops){
        this.ops = ops;
        this.init();
    }
    module.TriPhonePop.prototype = {
        init: function () {

            //灏忓彿鍩庡競: 鐢佃瘽鍔犵爜鍦≒honePop鍐呴儴鎵ц
            if (this.ops.xh_city && this.ops.xh_city+'' !== '0') {
                new touch.component.xh.PhonePop(this.ops);
            } else {

                // 闈炲皬鍙峰煄甯傚湪姝ゅ鍒濆鍖栫數璇濆姞鐮侊紙鐮佸湪data-track涓婏級
                new touch.component.module.Phone({
                    phone_select:'.bc-i-phone,.tel-debris'
                });
            }
        }
    }
})(Zepto, APF.Namespace.register('touch.component'));
(function(zu, window, document, myModule) {

    var Dialog = myModule.Dialog;
    zu.ViewRevision = function(op) {
        this.op = op;
        this.init();
    };
    zu.ViewRevision.prototype = {
        constructor: zu.ViewRevision,
        init: function() {
            var self = this;
            this.swipe = {};
            this.domCache = [];
            this.picArray = [];
            this.expStauts = false;
            this.timeSojStatus = false;
            this.callPhone = '';
            this.timer = null;
            this.list = $('.itm'); // 鎴挎簮鍒楄〃
            //this.collection(); //鏀惰棌鎴挎簮,鏀惰棌鍔熻兘鎷挎帀锛宲mt-40482
            this.ajaxCommfy(); //鍔犺浇鎺ㄨ崘鎴挎簮
            this.picHChanger(); //鐒︾偣鍥鹃珮搴�
            this.exposure    = new touch.component.module.Exposure();
            this.exposure.add($('.pro-title'));
            this.exposure.add($('#esf-middle-appDown'));
            this.exposure.add($('.videoexp'));
            this.LazyLoadImg = new module.utils.LazyLoadImg({ // 鍥剧墖鎳掑姞杞�
                select: '.imglazyload'
            });

            var axDialog = $('#ax-dailog');
            // 瀹夐€夊脊灞�
            // $('body').on('click','.ax-icon',function(){
            //     axDialog.show();
            // });

            // axDialog.click(function(){
            //     axDialog.hide();
            // });

            //鎺ㄨ崘鎴挎簮鍔犵爜
            $(window).scroll($.proxy(this.scroll, this));
            $(window).on('touchmove',function(){
                self.floatSwitchMenu();
            });
            self.floatSwitchMenu();
            // 婊戝姩鏁堟灉
            this.bindSwipe($('#imgwrapper').get(0), 'pageImg', {
                continuous: true,
                callback: function(index, ele) {
                    var list = $('#pnav li'),
                        img = $(ele).find('img');
                    self.LazyLoadImg.imgReplace.call(null, img, null, 'origin', true);
                    list.removeClass('focus');
                    list.eq(index).addClass('focus');
                }
            });
            new touch.component.ChatPop({
                id: 'chat-pop'
            });
            //涓嬭浇寮瑰眰
            $(".container").on('click', '.j-i-chart', function() {
                var phone = $(this).data('phone');
                T.trackEvent('track_prop_view_chat_click');
                if ($('#chat-pop').css("display") == 'none') {
                    $('#chat-pop').css({ "display": "-webkit-box" });
                    $('#chat-pop').find('.phone_btn').attr('href', 'tel:' + phone);
                }
            })
            // $('.container').on('click','.pro-w a',function(evt){
            //     evt.stopPropagation();
            // });
            // $('.container').on('click','.pro-w',function(){
            //     if($(this).find('a').length) $(this).find('a')[0].click();
            // });

            // SEO-鏁堟灉
            $('.seo-item').on('click', '.hd', function() {
                $(this).parent().toggleClass('open');
            })
            $('.trigger').on('click', 'a', function(e) {
                e.preventDefault();
                var index = $(this).index(),
                    item = $('.content .item');
                $('.trigger').find('a').removeClass('selected');
                $(this).addClass('selected');
                item.removeClass('selected');
                item.eq(index).addClass('selected');
            })

            // 鍏抽棴鐩稿唽
            $('#photoclose').on("click", function() {
                var index = self.swipe['dialogImg'].getPos();
                $('#picpopu').hide();
                self.swipe['pageImg'].slide(index, 400);
            });

            // 鎵撳紑鐩稿唽
            $('#imglist').on('click', function(event) {
                if($(event.target).parent().hasClass('img-appdownload')) return;
                var index = self.swipe['pageImg'].getPos();
                $('#picpopu').css('display', '-webkit-box');
                self.LazyLoadImg.imgReplace.call(null, $('#slipe-img img').eq(0), null, 'origin', true); // 鏇挎崲绗竴寮犲浘鐗�
                self.bindSwipe($('#slipe-img').get(0), 'dialogImg', {
                    callback: function(index, ele) {
                        var list = $('#wrap-img figure'),
                            img = $(ele).find('img');
                        self.LazyLoadImg.imgReplace.call(null, img, null, 'origin', true);
                        $("#pd_current").html(index + 1);
                    }
                });
                self.swipe['dialogImg'].slide(index, 400);
                var current = self.swipe['dialogImg'].getPos() + 1;
                var total = self.swipe['dialogImg'].getNumSlides();
                $("#pd_current").html(current);
                $(".p_total").html(total);
            });
        },
        picHChanger: function() {
            var picWidth  = $(window).width(),
                picHeight = Math.round(picWidth / 4) * 3,
                maxHeight = Math.round(540 / 4) * 3;
            $(".imgblock").css({
                "height": picHeight,
                "maxHeight" : maxHeight
            });
            $(".imglist").css({
                "height": picHeight,
                "maxHeight" : maxHeight
            });
            $(".imglist li").css({
                "height": picHeight,
                "maxHeight" : maxHeight
            });
            $('.imglist img').css({
                'height': picHeight,
                "maxHeight" : maxHeight
            });
        },
        scroll: function() {
            var self = this;
            this.floatSwitchMenu();
            if (!self.expStauts) {
                return;
            }
            clearTimeout(self.timer);
            if (self.domCache.length === 0) {
                self.expStauts = false;
                return;
            }
            self.timer = setTimeout($.proxy(self.addData, this), 800);
        },
        floatSwitchMenu: function() {
            var self = this,
                winHeight = $(window).height(),
                scrollTop = $(window).scrollTop(),
                botY = scrollTop + winHeight,
                top,
                height,
                itemTel;
            $.each(self.list,function(index,val){
                var dom = $(val);
                height = dom.height();
                top = dom.offset().top;
                itemTel = dom.find('.tel-float-layer');
                if (botY < top + height && scrollTop >= top) {
                    itemTel.addClass('j-fix-tel');
                } else {
                    itemTel.removeClass('j-fix-tel');
                }

            });
        },
        addData: function() {
            var self = this,
                winHeight = $(window).height(),
                scrollTop = $(window).scrollTop(),
                botY = scrollTop + winHeight,
                soj, pn, top;
            $.each(self.domCache, function(index, val) {
                top = $(this).offset().top;
                soj = $(this).data('soj');
                pn = $(this).data('pn');
                if(!pn) {
                    return;
                }
                if (botY >= top && top >= scrollTop) {
                    var send = $(this).data('send');
                    if (send !== '1') {
                        APF.Utils.sendSoj(pn, JSON.stringify(soj));
                        $(this).attr('data-send', '1');
                    }
                    self.domCache.splice(index, 1);
                }
            })
        },
        addElm: function() {
            var self = this,
                dom = $('#comm_list').find('.pro-title');
            dom.each(function(index, el) {
                self.domCache.push($(el));
            })
        },
        bindSwipe: function(swipe, key, op) {
            var defaults = {
                startSlide: 0,
                speed: 400,
                continuous: true,
                disableScroll: false,
                stopPropagation: false,
                callback: function(index, elem) {},
                transitionEnd: function(index, elem) {}
            };
            this.swipe[key] = new Swipe(swipe, $.extend(defaults, op));
        },
        ajaxCommfy: function() {
            var self = this;
            $.ajax({
                url: '/ajax/ershou/ershouviewlike',
                type: 'get',
                dataType: 'json',
                data: {
                    area_id: self.op.area_id,
                    block_id: self.op.block_id,
                    price: self.op.price,
                    city_id: self.op.city_id,
                    prop_id: self.op.prop_id,
                    prop_type: self.op.prop_type,
                    guid: self.op.guid,
                    owner_id: self.op.owner_id
                },
                success: function(data) {
                    var arr = [];
                    var is_open_layer = self.op.is_open_tw_phone_layer;
                    var seo_source_type = self.op.seo_source_type;
                    $.each(data.recommend_property, function(index, val) {
                        var html = '',
                            d = val.property_data;
                        html += '<div class="itm" data-trace="{exp_esf_page_middle_'+(index+2)+':1}"><div class="next_spe"><em>涓嬩竴濂楁埧婧�</em></div>';
                        html += '<div class="head"><label>鐚滀綘鍠滄</label><span>' + d.comm_name + '</span><em>' + d.prop_price + '涓�</em></div>';
                        html += '<div class="imgblock">';
                        html += '<div id="h_img_' + index + '" class="imgwrapper" style="visibility: visible;">';
                        html += '<ul class="imglist">';
                        self.picArray.push(index);
                        if(d.prop_image&&d.prop_image.length>0&&d.is_video+''=='1'){
                            if(seo_source_type == '0'){
                                html += '<li data-index="0"><a href="'+d.video_url+'" class=""><img class="imglazyload" src="' + self.op.defaultimg + '" data-src="' + d.prop_image[0] + '" data-origin="true"><i class="video-icon"></i></a></li>';
                            }
                        }
                        $.each(d.prop_image, function(i, v) {
                            if(d.is_video+''=='1') i++;
                            html += '<li data-index="' + i + '"><img class="imglazyload" src="' + self.op.defaultimg + '" data-src="' + v + '" data-origin="true"></li>';
                        })
                        html += '</ul></div>';
                        html += '<div class="pintro"><ul class="pnav" id="pnav_' + index + '">';
                        $.each(d.prop_image, function(i, v) {
                            if (i == 0) {
                                html += '<li class="focus"></li>';
                            } else {
                                html += '<li></li>';
                            }
                        })
                        html += '</ul></div>';
                        html += '</div>';
                        html += '<div class="pro-title" data-pn="' + d.pn + '" data-soj=' + JSON.stringify(val.property_soj_data) + '>';
                        html += '<span>' + d.title + '</span></div>';
                        if(d.is_guarantee) {
                            html+= '<div class="ax-icon"></div>';
                        }else{
                            html+= '<div class="ax-txt">瀹夊眳瀹㈡彁绀猴細闈炲畨閫夋埧婧愶紝鍦ㄥ敭鐘舵€佽涓庣粡绾汉纭</div>';
                        }
                        html += '<div class="article pro-detail">';
                        html += '<label><i>鏈堜緵锛�</i>' + d.month_pay + '鍏�<a href="' + d.caculator_url + '" class="i_cal"></a></label>';
                        html += '<label><i>鎴垮瀷锛�</i>' + d.room_num + '瀹�' + d.hall_num + '鍘�' + d.toilet_num + '鍗�</label>';
                        html += '<label><i>鍗曚环锛�</i>' + d.unit_price + '鍏�/骞崇背</label>';
                        html += '<label><i>闈㈢Н锛�</i>' + d.area_num + '骞崇背</label>';
                        html += '<label><i>鏈濆悜锛�</i>' + d.house_orient + '</label>';
                        html += '<label><i>妤煎眰锛�</i>' + d.floor_str  + '</label>';
                        html += '<label><i>骞翠唬锛�</i>' + d.build_year + '骞�</label>';
                        html += '<label><i>鍖哄煙锛�</i>' + d.area_name + '&nbsp;' + d.block_name + '</label>';
                        html += '<label class="pro-w"><i>灏忓尯锛�</i>';
                        if (!d.comm_id || d.comm_name === null || d.comm_name === '') {
                            html += '鏆傛棤灏忓尯';
                        } else {
                            html += '<a href="' + d.prop_url + '" class="i_pos" data-soj="prop_list">' + d.comm_name + '<i></i></a>';
                        }
                        html += '<em></em></label></div>';

                        // seo娓犻亾鍒犻櫎骞垮憡浣�
                        if(seo_source_type == '0'){
                            html += '<div class="appdown_load dl_dom_js" downonly="false" data-trace="{exp_esf_page_middle_download_'+(index+2)+':1}" data-track="track_esfpage_download_broker_' + (parseInt(index) + 2) + '" bagnum="b637"><i></i>涓嬭浇瀹夊眳瀹PP锛屼笌' + self.op.city_name +  '缁忕邯浜鸿亰鎴夸环锛�</div>';
                        }
                        var shop_url = d.shop_url ? d.shop_url:'javascript:;';
                        html += '<a href="' + shop_url + '" class="broker-card">';
                        html += '<div class="broker-photo-wrap"><img class="broker-card-photo" src="' + d.user_photo + '"></div>';
                        html += '<div class="broker-card-intro">';
                        html += '<div class="broker-card-info">' +
                        '<p class="broker-card-desc">' +
                        d.broker_name + '<span class="broker-card-company">' + d.company + '</span>' +
                        '</p>' +
                        '</div>';

                        if(d.level) {
                            var $n = parseInt(d.level) / 20;//鍚庣浼犲€兼槸10,20鐨勬暣鏁�
                            var $width1 = $n*18;
                            var $width2 = Math.ceil(parseInt(d.level) / 20)*18;
                            html+='<div class="broker-level clearfix" style="display:inline-block;width:'+$width2+'px">'
                            html+='<span class="stars-title"></span>'

                            html+='<div class="stars-wrap-bk" style="width:'+$width1+'px">'
                            html+='<p class="stars-bg" style="width:'+$width2+'px"><i class="bu-icon bu-icon-star-empty"></i><i class="bu-icon bu-icon-star-empty"></i><i class="bu-icon bu-icon-star-empty"></i><i class="bu-icon bu-icon-star-empty"></i><i class="bu-icon bu-icon-star-empty"></i></p>'
                            html+='<p class="stars-solid" style="width:'+$width1+'px"><i class="bu-icon bu-icon-star-full"></i><i class="bu-icon bu-icon-star-full"></i><i class="bu-icon bu-icon-star-full"></i><i class="bu-icon bu-icon-star-full"></i><i class="bu-icon bu-icon-star-full"></i></p></div></div>'
                        }
                        html += '</div>';
                        if(d.level && d.is_evaluate_open) {
                            // 鎴挎簮鐪熷疄
                            var info_quality_clazz = '';
                            var info_quality_txt = '';
                            if(d.info_quality > d.info_quality_industry) {
                                info_quality_txt = '楂�';
                                info_quality_clazz = 'score-level-high';
                            }else if(d.info_quality == d.info_quality_industry) {
                                info_quality_txt = '骞�';
                                info_quality_clazz = 'score-level-equal';
                            }else{
                                info_quality_txt = '浣�';
                                info_quality_clazz = 'score-level-low';
                            }

                            // 鏈嶅姟鏁堢巼
                            var service_level_clazz = '';
                            var service_level_txt = '';
                            if(d.service_level > d.service_level_industry) {
                                service_level_txt = '楂�';
                                service_level_clazz = 'score-level-high';
                            }else if(d.service_level == d.service_level_industry) {
                                service_level_txt = '骞�';
                                service_level_clazz = 'score-level-equal';
                            }else{
                                service_level_txt = '浣�';
                                service_level_clazz = 'score-level-low';
                            }

                            // 鐢ㄦ埛璇勪环
                            var credit_clazz = '';
                            var credit_txt = '';
                            if(d.credit > d.credit_industry) {
                                credit_txt = '楂�';
                                credit_clazz = 'score-level-high';
                            }else if(d.credit == d.credit_industry) {
                                credit_txt = '骞�';
                                credit_clazz = 'score-level-equal';
                            }else{
                                credit_txt = '浣�';
                                credit_clazz = 'score-level-low';
                            }

                            html += '<ul class="score-level-list">' +
                            '<li>' +
                            '鎴挎簮鐪熷疄锛�' +
                            '<span class="' + info_quality_clazz + '">' +
                            '<em>' + (d.info_quality || 0) + '</em>' +
                            '<strong>' + info_quality_txt + '</strong>' +
                            '</span>' +
                            '</li>' +
                            '<li>' +
                            '鏈嶅姟鏁堢巼锛�' +
                            '<span class="' + service_level_clazz + '">' +
                            '<em>' + (d.service_level || 0) + '</em>' +
                            '<strong>' + service_level_txt + '</strong>' +
                            '</span>' +
                            '</li>' +
                            '<li>' +
                            '鐢ㄦ埛璇勪环锛�' +
                            '<span class="' + credit_clazz + '">' +
                            '<em>' + (d.credit || 0) + '</em>' +
                            '<strong>' + credit_txt + '</strong>' +
                            '</span>' +
                            '</li>' +
                            '</ul>';
                        }else if(d.is_shop_open) {
                            html += '<span class="broker-shop-link g-next">鏌ョ湅TA鐨勫簵閾�</span>'
                        }
                        html += '</a>';

                        //鏈嶅姟鎷呬繚妯″潡--begin
                        if(d.broker_service_labels&&d.broker_service_labels.length>0){
                            html+='<div class="servicewrap g-next" data-tracksoj="Click_fydy_fwcn">'+
                            '<div class="sw-txt"><i></i>鏈嶅姟鎵胯<span>淇濋殰鎮ㄧ殑浜ゆ槗</span></div>'+
                            '<ul class="sw-item clearfix">';

                            for(var k=0;k<d.broker_service_labels.length;k++){
                                var itms = d.broker_service_labels[k];
                                html+='<li data-name="'+itms.name+'" data-desc="'+itms.description+'">'+itms.name+'</li>';
                            }
                            if(d.broker_service_labels.length == 1){
                                html+='<li>鎴挎簮鎻忚堪灞炲疄</li><li>涓撲笟鍜ㄨ鏈嶅姟</li>';
                            }else if(d.broker_service_labels.length == 2){
                                html+='<li>鎴挎簮鎻忚堪灞炲疄</li>';
                            }
                            html+='</ul>'+'</div>'
                        }
                        //鏈嶅姟鎷呬繚妯″潡--end

                        var pro_desc_clazz = 'pro-desc-layer';

                        html += '<div class="article pro-desc down ' + pro_desc_clazz +'">';
                        html += '<div class="title">'
                        if(d.add_explain!=undefined&&d.add_explain.length>0){
                            html += '<h4>鏍稿績鍗栫偣</h4>';
                            if(d.is_commercial) {
                                html += '<p class="ajk-hint">瀹夊眳瀹㈡彁绀猴細姝ゅ皬鍖哄惈鍟嗗姙鎬ц川锛屽晢鍔炴€ц川鐨勬埧婧愪笉鍙敤浜庡眳浣忋€�</p>';
                            }
                            html += '<p>' + d.add_explain + '</p>';
                        }
                        if(d.owner_mind!=undefined&&d.owner_mind.length>0){
                            html += '<h4>涓氫富蹇冩€�</h4>';
                            html += '<p>' + d.owner_mind + '</p>';
                        }
                        if(d.comm_supporting!=undefined&&d.comm_supporting.length>0){
                            html += '<h4>灏忓尯閰嶅</h4>';
                            html += '<p>' + d.comm_supporting + '</p>';
                        }
                        if(d.service_introduce!=undefined&&d.service_introduce.length>0){
                            html += '<h4>鏈嶅姟浠嬬粛</h4>';
                            html += '<p>' + d.service_introduce + '</p>';
                        }
                        html += '</div></div>';
                        if (is_open_layer) {
                            var telclassName = 'xh-debris-phone';
                            var telIcon;
                            var iconClass = 'tel-icon';
                            var iconTxt = '鐢佃瘽鍜ㄨ';
                            var track = 'track_' + APF.info.pageName + '_phone_call';
                            var triangleDiv ='';
                            var tipDiv ='';

                            //濡傛灉鏄洿鎺ユ嫧鍙�
                            if (self.op.xh_city == 0){
                                telclassName = "bc-i-phone";
                                telIcon = 'tel:' + d.mobile;
                            }
                            //濡傛灉鏄畨鍏ㄩ€氳瘽
                            if (self.op.xh_city == 1) {
                                track = 'track_' + APF.info.pageName + '_safe_phone_call';
                                iconClass = 'trumpet-icon';
                                iconTxt = '瀹夊叏閫氳瘽';
                                telIcon = 'javascript:;'
                            }
                            //濡傛灉鏄皟鐢ㄥ皬鍙�
                            if (self.op.xh_city == 2){
                                telclassName = "xh-phone";
                                track = 'track_' + APF.info.pageName + '_xiaohao_phone_call';
                                telIcon = 'javascript:;';
                                triangleDiv = '<span class="triangle"></span>';
                                tipDiv = '<p class="tip">璇ョ數璇�24灏忔椂鍚庡け鏁�,璇锋敞鎰忔嫧鎵撴椂闂�<i class="iconfont">&#xe073;</i></p>';
                            }
                            html += '<div class="tel-float-seat"><div class="tel-float-layer">';
                            html += '<a href="' + d.ask_url + '" class="ask-debris" data-soj="m_fydy_ask" data-bid="' + d.broker_id + '">' + d.broker_name + '<em>鍚慣A鎻愰棶&gt;</em></a><a href="javascript:;" class="chat-debris j-i-chart" data-phone="' +
                            d.mobile + '"><i class="icon chat-icon"></i>寰亰</a><a data-tel href="' + telIcon + '" class="tel-debris ' + telclassName + '"' + 'data-uid="' + self.op.uid + '" data-guid="' + self.op.guid + '" data-brokerid="' + d.broker_id + '"data-track="' + track + '" data-broker-phone="' + d.mobile + '" data-houseid="' + d.house_id +  '"><i class="icon ' + iconClass + '"></i>' + iconTxt +triangleDiv+ '</a>';
                            html += tipDiv+'</div></div>';
                        }
                        html += '</div>';
                        arr.push(html);
                    })
                    $('#comm_list').append(arr.join(''));
                    self.expStauts = true;
                    self.addElm();
                    self.picHChanger();
                    self.picSwipe();
                    var list = $('.itm');
                    var maxZindex = 140;
                    list.each(function(index){
                        var dom = $(this);
                        // fix safari 婊戝姩鏃朵慨鏀规牱寮忎笉鐢熸晥
                        dom.find('.tel-float-layer').css('z-index',maxZindex-index).addClass('j-fix-tel');
                    });
                    self.list = list; // 鎴挎簮鍒楄〃
                    //澧炲姞鏇濆厜
                    self.exposure.add(list);
                    self.exposure.add($('.itm .dl_dom_js'));
                    new user.touch.common.appDownloadDialog();

                    // 鍒濆鍖栨嫧鎵撳皬鍙风殑浜嬩欢锛�'TriPhonePop'鍦˙rokerCard.js閲岋級

                },
            });
        },
        // 婊戝姩鏁堟灉
        picSwipe: function() {
            var self = this;
            $.each(self.picArray, function(index, val) {
                self.bindSwipe($('#h_img_' + index).get(0), 'pageImg' + index, {
                    continuous: true,
                    callback: function(i, ele) {
                        var list = $('#pnav_' + index + ' li'),
                            img = $(ele).find('img');
                        self.LazyLoadImg.imgReplace.call(null, img, null, 'origin', true);
                        list.removeClass('focus');
                        list.eq(i).addClass('focus');
                    }
                });
            })
        },
        collection: function() {
            var self = this;
            $('#view-info-collect').click(function() {
                var type = $(this).attr('type'), //add del
                    fangyuanID = self.op.prop_id,
                    guid = T.getCookie("aQQ_ajkguid");
                $.ajax({
                    url: '/ajax/favorite',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        type: type,
                        fid: fangyuanID,
                        guid: guid
                    },
                    success: function(data) {
                        var html, text,
                            el = $('#view-info-collect');
                        if (data.status === 'ok' && type === 'add') {
                            text = '鏀惰棌鎴愬姛';
                            el.attr('type', 'del');
                            el.addClass('collected');
                            el.find('em').text('宸叉敹钘�');
                            T.trackEvent("track_Anjuke_Prop_View_collection", "{tag:1}");
                        } else {
                            text = '宸插彇娑堟敹钘�';
                            el.attr('type', 'add');
                            el.removeClass('collected');
                            el.find('em').text('鏀惰棌');
                            T.trackEvent("track_Anjuke_Prop_View_cancel", "{tag:1}");
                        }
                        html = '<div class="prompt">' + text + '</div>';
                        $('body').append(html)
                        setTimeout(function() {
                            $('.prompt').remove();
                        }, 3000);
                    },
                });
            });
        }
    };

})(APF.Namespace.register('touch.ershoufnag'), window, document, touch.component.module);

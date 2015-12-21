(function(){

if (!window.qx) window.qx = {};

qx.$$start = new Date();
  
if (!window.qxsettings) qxsettings = {};
var settings = {"qx.application":"demobrowser.Application","qx.theme":"demobrowser.Theme","qx.version":"1.3.1"};
for (var k in settings) qxsettings[k] = settings[k];

if (!window.qxvariants) qxvariants = {};
var variants = {"qx.contrib":"off"};
for (var k in variants) qxvariants[k] = variants[k];

if (!qx.$$libraries) qx.$$libraries = {};
var libinfo = {"__out__":{"sourceUri":"script"},"demobrowser":{"resourceUri":"resource","sourceUri":"script","version":"trunk"},"qx":{"resourceUri":"resource","sourceUri":"script","version":"1.3.1"}};
for (var k in libinfo) qx.$$libraries[k] = libinfo[k];

qx.$$resources = {};
qx.$$translations = {};
qx.$$locales = {};
qx.$$packageData = {};

qx.$$loader = {
  parts : {"boot":[0]},
  uris : [["__out__:demobrowser.js"]],
  urisBefore : [],
  packageHashes : {"0":"b76d75da2034"},
  boot : "boot",
  closureParts : {},
  bootIsInline : true,
  addNoCacheParam : true,
  
  decodeUris : function(compressedUris)
  {
    var libs = qx.$$libraries;
    var uris = [];
    for (var i=0; i<compressedUris.length; i++)
    {
      var uri = compressedUris[i].split(":");
      var euri;
      if (uri.length==2 && uri[0] in libs) {
        var prefix = libs[uri[0]].sourceUri;
        euri = prefix + "/" + uri[1];
      } else {
        euri = compressedUris[i];
      }
      if (qx.$$loader.addNoCacheParam) {
        euri += "?nocache=" + Math.random();
      }
      
      uris.push(euri);
    }
    return uris;      
  }
};  

function loadScript(uri, callback) {
  var elem = document.createElement("script");
  elem.charset = "utf-8";
  elem.src = uri;
  elem.onreadystatechange = elem.onload = function()
  {
    if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")
    {
      elem.onreadystatechange = elem.onload = null;
      callback();
    }
  };
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(elem);
}

var isWebkit = /AppleWebKit\/([^ ]+)/.test(navigator.userAgent);

function loadScriptList(list, callback) {
  if (list.length == 0) {
    callback();
    return;
  }
  loadScript(list.shift(), function() {
    if (isWebkit) {
      // force asynchronous load
      // Safari fails with an "maximum recursion depth exceeded" error if it is
      // called sync.      
      window.setTimeout(function() {
        loadScriptList(list, callback);
      }, 0);
    } else {
      loadScriptList(list, callback);
    }
  });
}

var fireContentLoadedEvent = function() {
  qx.$$domReady = true;
  document.removeEventListener('DOMContentLoaded', fireContentLoadedEvent, false);
};
if (document.addEventListener) {
  document.addEventListener('DOMContentLoaded', fireContentLoadedEvent, false);
}

qx.$$loader.importPackageData = function (dataMap) {
  if (dataMap["resources"]){
    var resMap = dataMap["resources"];
    for (var k in resMap) qx.$$resources[k] = resMap[k];
  }
  if (dataMap["locales"]){
    var locMap = dataMap["locales"];
    var qxlocs = qx.$$locales;
    for (var lang in locMap){
      if (!qxlocs[lang]) qxlocs[lang] = locMap[lang];
      else 
        for (var k in locMap[lang]) qxlocs[lang][k] = locMap[lang][k];
    }
  }
  if (dataMap["translations"]){
    var trMap   = dataMap["translations"];
    var qxtrans = qx.$$translations;
    for (var lang in trMap){
      if (!qxtrans[lang]) qxtrans[lang] = trMap[lang];
      else 
        for (var k in trMap[lang]) qxtrans[lang][k] = trMap[lang][k];
    }
  }
}

qx.$$loader.signalStartup = function () 
{
  qx.$$loader.scriptLoaded = true;
  if (window.qx && qx.event && qx.event.handler && qx.event.handler.Application) {
    qx.event.handler.Application.onScriptLoaded();
    qx.$$loader.applicationHandlerReady = true; 
  } else {
    qx.$$loader.applicationHandlerReady = false;
  }
}

qx.$$loader.init = function(){
  var l=qx.$$loader;
  if (l.urisBefore.length>0){
    loadScriptList(l.urisBefore, function(){
      l.initUris();
    });
  } else {
    l.initUris();
  }
}

qx.$$loader.initUris = function(){
  var l=qx.$$loader;
  var bootPackageHash=l.packageHashes[l.parts[l.boot][0]];
  if (l.bootIsInline){
    l.importPackageData(qx.$$packageData[bootPackageHash]);
    l.signalStartup();
  } else {
    loadScriptList(l.decodeUris(l.uris[l.parts[l.boot]]), function(){
      // Opera needs this extra time to parse the scripts
      window.setTimeout(function(){
        l.importPackageData(qx.$$packageData[bootPackageHash] || {});
        l.signalStartup();
      }, 0);
    });
  }
}
})();

qx.$$packageData['b76d75da2034']={"locales":{"C":{"alternateQuotationEnd":"’","alternateQuotationStart":"‘","cldr_am":"AM","cldr_date_format_full":"EEEE, MMMM d, y","cldr_date_format_long":"MMMM d, y","cldr_date_format_medium":"MMM d, y","cldr_date_format_short":"M/d/yy","cldr_date_time_format_EEEd":"d EEE","cldr_date_time_format_Hm":"H:mm","cldr_date_time_format_Hms":"H:mm:ss","cldr_date_time_format_M":"L","cldr_date_time_format_MEd":"E, M/d","cldr_date_time_format_MMM":"LLL","cldr_date_time_format_MMMEd":"E, MMM d","cldr_date_time_format_MMMMEd":"E, MMMM d","cldr_date_time_format_MMMMd":"MMMM d","cldr_date_time_format_MMMd":"MMM d","cldr_date_time_format_Md":"M/d","cldr_date_time_format_d":"d","cldr_date_time_format_hm":"h:mm a","cldr_date_time_format_ms":"mm:ss","cldr_date_time_format_y":"y","cldr_date_time_format_yM":"M/yyyy","cldr_date_time_format_yMEd":"EEE, M/d/yyyy","cldr_date_time_format_yMMM":"MMM y","cldr_date_time_format_yMMMEd":"EEE, MMM d, y","cldr_date_time_format_yMMMM":"MMMM y","cldr_date_time_format_yQ":"Q yyyy","cldr_date_time_format_yQQQ":"QQQ y","cldr_day_format_abbreviated_fri":"Fri","cldr_day_format_abbreviated_mon":"Mon","cldr_day_format_abbreviated_sat":"Sat","cldr_day_format_abbreviated_sun":"Sun","cldr_day_format_abbreviated_thu":"Thu","cldr_day_format_abbreviated_tue":"Tue","cldr_day_format_abbreviated_wed":"Wed","cldr_day_format_narrow_fri":"F","cldr_day_format_narrow_mon":"M","cldr_day_format_narrow_sat":"S","cldr_day_format_narrow_sun":"S","cldr_day_format_narrow_thu":"T","cldr_day_format_narrow_tue":"T","cldr_day_format_narrow_wed":"W","cldr_day_format_wide_fri":"Friday","cldr_day_format_wide_mon":"Monday","cldr_day_format_wide_sat":"Saturday","cldr_day_format_wide_sun":"Sunday","cldr_day_format_wide_thu":"Thursday","cldr_day_format_wide_tue":"Tuesday","cldr_day_format_wide_wed":"Wednesday","cldr_day_stand-alone_abbreviated_fri":"Fri","cldr_day_stand-alone_abbreviated_mon":"Mon","cldr_day_stand-alone_abbreviated_sat":"Sat","cldr_day_stand-alone_abbreviated_sun":"Sun","cldr_day_stand-alone_abbreviated_thu":"Thu","cldr_day_stand-alone_abbreviated_tue":"Tue","cldr_day_stand-alone_abbreviated_wed":"Wed","cldr_day_stand-alone_narrow_fri":"F","cldr_day_stand-alone_narrow_mon":"M","cldr_day_stand-alone_narrow_sat":"S","cldr_day_stand-alone_narrow_sun":"S","cldr_day_stand-alone_narrow_thu":"T","cldr_day_stand-alone_narrow_tue":"T","cldr_day_stand-alone_narrow_wed":"W","cldr_day_stand-alone_wide_fri":"Friday","cldr_day_stand-alone_wide_mon":"Monday","cldr_day_stand-alone_wide_sat":"Saturday","cldr_day_stand-alone_wide_sun":"Sunday","cldr_day_stand-alone_wide_thu":"Thursday","cldr_day_stand-alone_wide_tue":"Tuesday","cldr_day_stand-alone_wide_wed":"Wednesday","cldr_month_format_abbreviated_1":"Jan","cldr_month_format_abbreviated_10":"Oct","cldr_month_format_abbreviated_11":"Nov","cldr_month_format_abbreviated_12":"Dec","cldr_month_format_abbreviated_2":"Feb","cldr_month_format_abbreviated_3":"Mar","cldr_month_format_abbreviated_4":"Apr","cldr_month_format_abbreviated_5":"May","cldr_month_format_abbreviated_6":"Jun","cldr_month_format_abbreviated_7":"Jul","cldr_month_format_abbreviated_8":"Aug","cldr_month_format_abbreviated_9":"Sep","cldr_month_format_wide_1":"January","cldr_month_format_wide_10":"October","cldr_month_format_wide_11":"November","cldr_month_format_wide_12":"December","cldr_month_format_wide_2":"February","cldr_month_format_wide_3":"March","cldr_month_format_wide_4":"April","cldr_month_format_wide_5":"May","cldr_month_format_wide_6":"June","cldr_month_format_wide_7":"July","cldr_month_format_wide_8":"August","cldr_month_format_wide_9":"September","cldr_month_stand-alone_narrow_1":"J","cldr_month_stand-alone_narrow_10":"O","cldr_month_stand-alone_narrow_11":"N","cldr_month_stand-alone_narrow_12":"D","cldr_month_stand-alone_narrow_2":"F","cldr_month_stand-alone_narrow_3":"M","cldr_month_stand-alone_narrow_4":"A","cldr_month_stand-alone_narrow_5":"M","cldr_month_stand-alone_narrow_6":"J","cldr_month_stand-alone_narrow_7":"J","cldr_month_stand-alone_narrow_8":"A","cldr_month_stand-alone_narrow_9":"S","cldr_number_decimal_separator":".","cldr_number_group_separator":",","cldr_number_percent_format":"#,##0%","cldr_pm":"PM","cldr_time_format_full":"h:mm:ss a zzzz","cldr_time_format_long":"h:mm:ss a z","cldr_time_format_medium":"h:mm:ss a","cldr_time_format_short":"h:mm a","quotationEnd":"”","quotationStart":"“"}},"resources":{"demobrowser/backend/remote_table.php":"demobrowser","demobrowser/css/sourceview.css":"demobrowser","demobrowser/css/style.css":"demobrowser","demobrowser/demo/background/gradient-pressed.png":[250,18,"png","demobrowser"],"demobrowser/demo/background/gradient.png":[250,34,"png","demobrowser"],"demobrowser/demo/background/gradients.svg":"demobrowser","demobrowser/demo/data/finder.json":"demobrowser","demobrowser/demo/data/list.json":"demobrowser","demobrowser/demo/data/persons.json":"demobrowser","demobrowser/demo/data/tree.json":"demobrowser","demobrowser/demo/flash/FlashVersion.swf":"demobrowser","demobrowser/demo/flash/TestFlash.mxml":"demobrowser","demobrowser/demo/flash/TestFlash.swf":"demobrowser","demobrowser/demo/flash/build.xml":"demobrowser","demobrowser/demo/flash/fo_tester.fla":"demobrowser","demobrowser/demo/flash/fo_tester.swf":"demobrowser","demobrowser/demo/html/ModalWindow.html":"demobrowser","demobrowser/demo/icons/feed-reader.png":[48,48,"png","demobrowser"],"demobrowser/demo/icons/format-indent-less.png":[16,16,"png","demobrowser"],"demobrowser/demo/icons/format-indent-more.png":[16,16,"png","demobrowser"],"demobrowser/demo/icons/format-justify-center.png":[16,16,"png","demobrowser"],"demobrowser/demo/icons/format-justify-fill.png":[16,16,"png","demobrowser"],"demobrowser/demo/icons/format-justify-left.png":[16,16,"png","demobrowser"],"demobrowser/demo/icons/format-justify-right.png":[16,16,"png","demobrowser"],"demobrowser/demo/icons/format.png":[96,16,"png","demobrowser"],"demobrowser/demo/icons/graphics-viewer-document.png":[48,48,"png","demobrowser"],"demobrowser/demo/icons/htmlarea/format-fill-color.png":[16,16,"png","demobrowser"],"demobrowser/demo/icons/htmlarea/format-list-ordered.png":[16,16,"png","demobrowser"],"demobrowser/demo/icons/htmlarea/format-list-unordered.png":[16,16,"png","demobrowser"],"demobrowser/demo/icons/htmlarea/format-text-color.png":[16,16,"png","demobrowser"],"demobrowser/demo/icons/htmlarea/insert-horizontal-rule.png":[16,16,"png","demobrowser"],"demobrowser/demo/icons/htmlarea/insert-table.png":[16,16,"png","demobrowser"],"demobrowser/demo/icons/htmlarea/insert-text.png":[16,16,"png","demobrowser"],"demobrowser/demo/icons/htmlarea/qooxdoo_logo.png":[136,41,"png","demobrowser"],"demobrowser/demo/icons/imicons/christian_schmidt.png":[52,64,"png","demobrowser"],"demobrowser/demo/icons/imicons/fabian_jakobs.png":[70,70,"png","demobrowser"],"demobrowser/demo/icons/imicons/jonathan_weiss.png":[218,218,"png","demobrowser"],"demobrowser/demo/icons/imicons/martin_wittemann.png":[52,52,"png","demobrowser"],"demobrowser/demo/icons/imicons/readme.txt":"demobrowser","demobrowser/demo/icons/imicons/status_away.png":[16,16,"png","demobrowser"],"demobrowser/demo/icons/imicons/status_busy.png":[16,16,"png","demobrowser"],"demobrowser/demo/icons/imicons/status_offline.png":[16,16,"png","demobrowser"],"demobrowser/demo/icons/imicons/status_online.png":[16,16,"png","demobrowser"],"demobrowser/demo/icons/imicons/user_add.png":[16,16,"png","demobrowser"],"demobrowser/demo/icons/imicons/user_delete.png":[16,16,"png","demobrowser"],"demobrowser/demo/icons/multimedia-player-disabled.png":[128,128,"png","demobrowser"],"demobrowser/demo/icons/multimedia-player.png":[128,128,"png","demobrowser"],"demobrowser/demo/mobile/qooxdoo-logo.png":[200,59,"png","demobrowser"],"demobrowser/demo/test/alphaPNG.png":[20,20,"png","demobrowser"],"demobrowser/demo/test/combined/icons22.png":[22,176,"png","demobrowser"],"demobrowser/demo/test/combined/thumbs.png":[218,65,"png","demobrowser"],"demobrowser/demo/test/demobrowser_thumb.png":[113,65,"png","demobrowser","demobrowser/demo/test/combined/thumbs.png",-105,0],"demobrowser/demo/test/feedreader_thumb.png":[105,65,"png","demobrowser","demobrowser/demo/test/combined/thumbs.png",0,0],"demobrowser/demo/test/logo.gif":[136,41,"gif","demobrowser"],"demobrowser/demo/theme/tag-hor-c.png":[6,12,"png","demobrowser"],"demobrowser/demo/theme/tag-hor-l.png":[6,12,"png","demobrowser"],"demobrowser/demo/theme/tag-hor-r.png":[6,12,"png","demobrowser"],"demobrowser/demo/theme/tag-hor.png":[18,12,"png","demobrowser"],"demobrowser/demo/theme/tag-vert-b.png":[12,6,"png","demobrowser"],"demobrowser/demo/theme/tag-vert-c.png":[12,6,"png","demobrowser"],"demobrowser/demo/theme/tag-vert-t.png":[12,6,"png","demobrowser"],"demobrowser/demo/theme/tag-vert.png":[12,18,"png","demobrowser"],"demobrowser/demo/ui/FsmMiceMaze.flw":"demobrowser","demobrowser/demo/ui/FsmMiceMaze.png":[962,600,"png","demobrowser"],"demobrowser/demo/ui/mouse-east.gif":[50,50,"gif","demobrowser"],"demobrowser/demo/ui/mouse-north.gif":[50,50,"gif","demobrowser"],"demobrowser/demo/ui/mouse-south.gif":[50,50,"gif","demobrowser"],"demobrowser/demo/ui/mouse-west.gif":[50,50,"gif","demobrowser"],"demobrowser/welcome/feedreader.png":[250,185,"png","demobrowser"],"demobrowser/welcome/playground.png":[250,185,"png","demobrowser"],"demobrowser/welcome/portal.png":[250,185,"png","demobrowser"],"demobrowser/welcome/showcase.png":[250,185,"png","demobrowser"],"qx/decoration/Modern/app-header.png":[110,20,"png","qx"],"qx/decoration/Modern/arrows-combined.png":[87,8,"png","qx"],"qx/decoration/Modern/arrows/down-invert.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-74,0],"qx/decoration/Modern/arrows/down-small-invert.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-69,0],"qx/decoration/Modern/arrows/down-small.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-49,0],"qx/decoration/Modern/arrows/down.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-20,0],"qx/decoration/Modern/arrows/forward.png":[10,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-59,0],"qx/decoration/Modern/arrows/left-invert.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",0,0],"qx/decoration/Modern/arrows/left.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-44,0],"qx/decoration/Modern/arrows/rewind.png":[10,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-10,0],"qx/decoration/Modern/arrows/right-invert.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-5,0],"qx/decoration/Modern/arrows/right.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-54,0],"qx/decoration/Modern/arrows/up-invert.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-28,0],"qx/decoration/Modern/arrows/up-small.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-82,0],"qx/decoration/Modern/arrows/up.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-36,0],"qx/decoration/Modern/button-lr-combined.png":[72,52,"png","qx"],"qx/decoration/Modern/button-tb-combined.png":[4,216,"png","qx"],"qx/decoration/Modern/checkradio-combined.png":[504,14,"png","qx"],"qx/decoration/Modern/colorselector-combined.gif":[46,11,"gif","qx"],"qx/decoration/Modern/colorselector/brightness-field.png":[19,256,"png","qx"],"qx/decoration/Modern/colorselector/brightness-handle.gif":[35,11,"gif","qx","qx/decoration/Modern/colorselector-combined.gif",0,0],"qx/decoration/Modern/colorselector/huesaturation-field.jpg":[256,256,"jpeg","qx"],"qx/decoration/Modern/colorselector/huesaturation-handle.gif":[11,11,"gif","qx","qx/decoration/Modern/colorselector-combined.gif",-35,0],"qx/decoration/Modern/cursors-combined.gif":[71,20,"gif","qx"],"qx/decoration/Modern/cursors/alias.gif":[19,15,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-52,0],"qx/decoration/Modern/cursors/copy.gif":[19,15,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-33,0],"qx/decoration/Modern/cursors/move.gif":[13,9,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-20,0],"qx/decoration/Modern/cursors/nodrop.gif":[20,20,"gif","qx","qx/decoration/Modern/cursors-combined.gif",0,0],"qx/decoration/Modern/form/button-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-72],"qx/decoration/Modern/form/button-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-204],"qx/decoration/Modern/form/button-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-188],"qx/decoration/Modern/form/button-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-checked-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-36],"qx/decoration/Modern/form/button-checked-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-84],"qx/decoration/Modern/form/button-checked-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-184],"qx/decoration/Modern/form/button-checked-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-checked-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-156],"qx/decoration/Modern/form/button-checked-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-208],"qx/decoration/Modern/form/button-checked-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-160],"qx/decoration/Modern/form/button-checked-focused-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-checked-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-40,0],"qx/decoration/Modern/form/button-checked-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-32,0],"qx/decoration/Modern/form/button-checked-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-28],"qx/decoration/Modern/form/button-checked-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-24],"qx/decoration/Modern/form/button-checked-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-48],"qx/decoration/Modern/form/button-checked-focused.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-checked-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-16,0],"qx/decoration/Modern/form/button-checked-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-60,0],"qx/decoration/Modern/form/button-checked-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-140],"qx/decoration/Modern/form/button-checked-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-56],"qx/decoration/Modern/form/button-checked-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-112],"qx/decoration/Modern/form/button-checked.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-disabled-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-40],"qx/decoration/Modern/form/button-disabled-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-136],"qx/decoration/Modern/form/button-disabled-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-16],"qx/decoration/Modern/form/button-disabled-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-disabled-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-68,0],"qx/decoration/Modern/form/button-disabled-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-4,0],"qx/decoration/Modern/form/button-disabled-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-116],"qx/decoration/Modern/form/button-disabled-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-168],"qx/decoration/Modern/form/button-disabled-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-60],"qx/decoration/Modern/form/button-disabled.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-68],"qx/decoration/Modern/form/button-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-144],"qx/decoration/Modern/form/button-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-8],"qx/decoration/Modern/form/button-focused-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-24,0],"qx/decoration/Modern/form/button-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-44,0],"qx/decoration/Modern/form/button-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-192],"qx/decoration/Modern/form/button-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-148],"qx/decoration/Modern/form/button-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-104],"qx/decoration/Modern/form/button-focused.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-hovered-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-108],"qx/decoration/Modern/form/button-hovered-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-32],"qx/decoration/Modern/form/button-hovered-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-128],"qx/decoration/Modern/form/button-hovered-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-hovered-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-20,0],"qx/decoration/Modern/form/button-hovered-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-48,0],"qx/decoration/Modern/form/button-hovered-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-44],"qx/decoration/Modern/form/button-hovered-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-76],"qx/decoration/Modern/form/button-hovered-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-88],"qx/decoration/Modern/form/button-hovered.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-56,0],"qx/decoration/Modern/form/button-preselected-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-124],"qx/decoration/Modern/form/button-preselected-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-176],"qx/decoration/Modern/form/button-preselected-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-200],"qx/decoration/Modern/form/button-preselected-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-preselected-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,0],"qx/decoration/Modern/form/button-preselected-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-4],"qx/decoration/Modern/form/button-preselected-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-152],"qx/decoration/Modern/form/button-preselected-focused-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-preselected-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-28,0],"qx/decoration/Modern/form/button-preselected-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-36,0],"qx/decoration/Modern/form/button-preselected-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-196],"qx/decoration/Modern/form/button-preselected-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-164],"qx/decoration/Modern/form/button-preselected-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-212],"qx/decoration/Modern/form/button-preselected-focused.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-preselected-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-8,0],"qx/decoration/Modern/form/button-preselected-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-64,0],"qx/decoration/Modern/form/button-preselected-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-96],"qx/decoration/Modern/form/button-preselected-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-80],"qx/decoration/Modern/form/button-preselected-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-132],"qx/decoration/Modern/form/button-preselected.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-pressed-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-12],"qx/decoration/Modern/form/button-pressed-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-52],"qx/decoration/Modern/form/button-pressed-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-20],"qx/decoration/Modern/form/button-pressed-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-pressed-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-52,0],"qx/decoration/Modern/form/button-pressed-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-12,0],"qx/decoration/Modern/form/button-pressed-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-100],"qx/decoration/Modern/form/button-pressed-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-172],"qx/decoration/Modern/form/button-pressed-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-64],"qx/decoration/Modern/form/button-pressed.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",0,0],"qx/decoration/Modern/form/button-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-92],"qx/decoration/Modern/form/button-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-120],"qx/decoration/Modern/form/button-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-180],"qx/decoration/Modern/form/button.png":[80,60,"png","qx"],"qx/decoration/Modern/form/checkbox-checked-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-126,0],"qx/decoration/Modern/form/checkbox-checked-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-322,0],"qx/decoration/Modern/form/checkbox-checked-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-294,0],"qx/decoration/Modern/form/checkbox-checked-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-364,0],"qx/decoration/Modern/form/checkbox-checked-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-490,0],"qx/decoration/Modern/form/checkbox-checked-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-224,0],"qx/decoration/Modern/form/checkbox-checked-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-378,0],"qx/decoration/Modern/form/checkbox-checked-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-84,0],"qx/decoration/Modern/form/checkbox-checked.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-182,0],"qx/decoration/Modern/form/checkbox-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-42,0],"qx/decoration/Modern/form/checkbox-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-392,0],"qx/decoration/Modern/form/checkbox-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-210,0],"qx/decoration/Modern/form/checkbox-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-14,0],"qx/decoration/Modern/form/checkbox-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-238,0],"qx/decoration/Modern/form/checkbox-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-462,0],"qx/decoration/Modern/form/checkbox-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-112,0],"qx/decoration/Modern/form/checkbox-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-448,0],"qx/decoration/Modern/form/checkbox-undetermined-disabled.png":[14,14,"png","qx"],"qx/decoration/Modern/form/checkbox-undetermined-focused-invalid.png":[14,14,"png","qx"],"qx/decoration/Modern/form/checkbox-undetermined-focused.png":[14,14,"png","qx"],"qx/decoration/Modern/form/checkbox-undetermined-hovered-invalid.png":[14,14,"png","qx"],"qx/decoration/Modern/form/checkbox-undetermined-hovered.png":[14,14,"png","qx"],"qx/decoration/Modern/form/checkbox-undetermined-invalid.png":[14,14,"png","qx"],"qx/decoration/Modern/form/checkbox-undetermined.png":[14,14,"png","qx"],"qx/decoration/Modern/form/checkbox.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-140,0],"qx/decoration/Modern/form/input-focused.png":[40,12,"png","qx"],"qx/decoration/Modern/form/input.png":[84,12,"png","qx"],"qx/decoration/Modern/form/radiobutton-checked-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-196,0],"qx/decoration/Modern/form/radiobutton-checked-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-168,0],"qx/decoration/Modern/form/radiobutton-checked-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-98,0],"qx/decoration/Modern/form/radiobutton-checked-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-308,0],"qx/decoration/Modern/form/radiobutton-checked-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-406,0],"qx/decoration/Modern/form/radiobutton-checked-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-28,0],"qx/decoration/Modern/form/radiobutton-checked-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-350,0],"qx/decoration/Modern/form/radiobutton-checked-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-266,0],"qx/decoration/Modern/form/radiobutton-checked.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-252,0],"qx/decoration/Modern/form/radiobutton-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-336,0],"qx/decoration/Modern/form/radiobutton-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-476,0],"qx/decoration/Modern/form/radiobutton-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-420,0],"qx/decoration/Modern/form/radiobutton-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-56,0],"qx/decoration/Modern/form/radiobutton-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",0,0],"qx/decoration/Modern/form/radiobutton-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-154,0],"qx/decoration/Modern/form/radiobutton-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-434,0],"qx/decoration/Modern/form/radiobutton-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-280,0],"qx/decoration/Modern/form/radiobutton.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-70,0],"qx/decoration/Modern/form/tooltip-error-arrow.png":[11,14,"png","qx"],"qx/decoration/Modern/form/tooltip-error-b.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-30],"qx/decoration/Modern/form/tooltip-error-bl.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-24],"qx/decoration/Modern/form/tooltip-error-br.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,0],"qx/decoration/Modern/form/tooltip-error-c.png":[40,18,"png","qx"],"qx/decoration/Modern/form/tooltip-error-l.png":[6,18,"png","qx","qx/decoration/Modern/tooltip-error-lr-combined.png",-6,0],"qx/decoration/Modern/form/tooltip-error-r.png":[6,18,"png","qx","qx/decoration/Modern/tooltip-error-lr-combined.png",0,0],"qx/decoration/Modern/form/tooltip-error-t.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-6],"qx/decoration/Modern/form/tooltip-error-tl.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-18],"qx/decoration/Modern/form/tooltip-error-tr.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-12],"qx/decoration/Modern/form/tooltip-error.png":[127,30,"png","qx"],"qx/decoration/Modern/group-item.png":[110,20,"png","qx"],"qx/decoration/Modern/groupbox-lr-combined.png":[8,51,"png","qx"],"qx/decoration/Modern/groupbox-tb-combined.png":[4,24,"png","qx"],"qx/decoration/Modern/groupbox/groupbox-b.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-12],"qx/decoration/Modern/groupbox/groupbox-bl.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-16],"qx/decoration/Modern/groupbox/groupbox-br.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-8],"qx/decoration/Modern/groupbox/groupbox-c.png":[40,51,"png","qx"],"qx/decoration/Modern/groupbox/groupbox-l.png":[4,51,"png","qx","qx/decoration/Modern/groupbox-lr-combined.png",-4,0],"qx/decoration/Modern/groupbox/groupbox-r.png":[4,51,"png","qx","qx/decoration/Modern/groupbox-lr-combined.png",0,0],"qx/decoration/Modern/groupbox/groupbox-t.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-4],"qx/decoration/Modern/groupbox/groupbox-tl.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,0],"qx/decoration/Modern/groupbox/groupbox-tr.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-20],"qx/decoration/Modern/groupbox/groupbox.png":[255,59,"png","qx"],"qx/decoration/Modern/menu-background-combined.png":[80,49,"png","qx"],"qx/decoration/Modern/menu-checkradio-combined.gif":[64,7,"gif","qx"],"qx/decoration/Modern/menu/background.png":[40,49,"png","qx","qx/decoration/Modern/menu-background-combined.png",-40,0],"qx/decoration/Modern/menu/bar-background.png":[40,20,"png","qx","qx/decoration/Modern/menu-background-combined.png",0,0],"qx/decoration/Modern/menu/checkbox-invert.gif":[16,7,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-16,0],"qx/decoration/Modern/menu/checkbox.gif":[16,7,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-48,0],"qx/decoration/Modern/menu/radiobutton-invert.gif":[16,5,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-32,0],"qx/decoration/Modern/menu/radiobutton.gif":[16,5,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",0,0],"qx/decoration/Modern/pane-lr-combined.png":[12,238,"png","qx"],"qx/decoration/Modern/pane-tb-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/pane/pane-b.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-30],"qx/decoration/Modern/pane/pane-bl.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-18],"qx/decoration/Modern/pane/pane-br.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-12],"qx/decoration/Modern/pane/pane-c.png":[40,238,"png","qx"],"qx/decoration/Modern/pane/pane-l.png":[6,238,"png","qx","qx/decoration/Modern/pane-lr-combined.png",0,0],"qx/decoration/Modern/pane/pane-r.png":[6,238,"png","qx","qx/decoration/Modern/pane-lr-combined.png",-6,0],"qx/decoration/Modern/pane/pane-t.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,0],"qx/decoration/Modern/pane/pane-tl.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-24],"qx/decoration/Modern/pane/pane-tr.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-6],"qx/decoration/Modern/pane/pane.png":[185,250,"png","qx"],"qx/decoration/Modern/scrollbar-combined.png":[54,12,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-horizontal.png":[76,15,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-pressed-horizontal.png":[19,10,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-pressed-vertical.png":[10,19,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-vertical.png":[15,76,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-button-bg-horizontal.png":[12,10,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-34,0],"qx/decoration/Modern/scrollbar/scrollbar-button-bg-vertical.png":[10,12,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-6,0],"qx/decoration/Modern/scrollbar/scrollbar-down.png":[6,4,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-28,0],"qx/decoration/Modern/scrollbar/scrollbar-left.png":[4,6,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-50,0],"qx/decoration/Modern/scrollbar/scrollbar-right.png":[4,6,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-46,0],"qx/decoration/Modern/scrollbar/scrollbar-up.png":[6,4,"png","qx","qx/decoration/Modern/scrollbar-combined.png",0,0],"qx/decoration/Modern/scrollbar/slider-knob-background.png":[12,10,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-16,0],"qx/decoration/Modern/selection.png":[110,20,"png","qx"],"qx/decoration/Modern/shadow-lr-combined.png":[30,382,"png","qx"],"qx/decoration/Modern/shadow-small-lr-combined.png":[10,136,"png","qx"],"qx/decoration/Modern/shadow-small-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/shadow-tb-combined.png":[15,90,"png","qx"],"qx/decoration/Modern/shadow/shadow-b.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-30],"qx/decoration/Modern/shadow/shadow-bl.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-15],"qx/decoration/Modern/shadow/shadow-br.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-45],"qx/decoration/Modern/shadow/shadow-c.png":[40,382,"png","qx"],"qx/decoration/Modern/shadow/shadow-l.png":[15,382,"png","qx","qx/decoration/Modern/shadow-lr-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-r.png":[15,382,"png","qx","qx/decoration/Modern/shadow-lr-combined.png",-15,0],"qx/decoration/Modern/shadow/shadow-small-b.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-20],"qx/decoration/Modern/shadow/shadow-small-bl.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-15],"qx/decoration/Modern/shadow/shadow-small-br.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-10],"qx/decoration/Modern/shadow/shadow-small-c.png":[40,136,"png","qx"],"qx/decoration/Modern/shadow/shadow-small-l.png":[5,136,"png","qx","qx/decoration/Modern/shadow-small-lr-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-small-r.png":[5,136,"png","qx","qx/decoration/Modern/shadow-small-lr-combined.png",-5,0],"qx/decoration/Modern/shadow/shadow-small-t.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-5],"qx/decoration/Modern/shadow/shadow-small-tl.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-small-tr.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-25],"qx/decoration/Modern/shadow/shadow-small.png":[114,146,"png","qx"],"qx/decoration/Modern/shadow/shadow-t.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-60],"qx/decoration/Modern/shadow/shadow-tl.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-75],"qx/decoration/Modern/shadow/shadow-tr.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,0],"qx/decoration/Modern/shadow/shadow.png":[381,412,"png","qx"],"qx/decoration/Modern/splitpane-knobs-combined.png":[8,9,"png","qx"],"qx/decoration/Modern/splitpane/knob-horizontal.png":[1,8,"png","qx","qx/decoration/Modern/splitpane-knobs-combined.png",0,-1],"qx/decoration/Modern/splitpane/knob-vertical.png":[8,1,"png","qx","qx/decoration/Modern/splitpane-knobs-combined.png",0,0],"qx/decoration/Modern/table-combined.png":[94,18,"png","qx"],"qx/decoration/Modern/table/ascending.png":[8,5,"png","qx","qx/decoration/Modern/table-combined.png",0,0],"qx/decoration/Modern/table/boolean-false.png":[14,14,"png","qx","qx/decoration/Modern/table-combined.png",-80,0],"qx/decoration/Modern/table/boolean-true.png":[14,14,"png","qx","qx/decoration/Modern/table-combined.png",-26,0],"qx/decoration/Modern/table/descending.png":[8,5,"png","qx","qx/decoration/Modern/table-combined.png",-18,0],"qx/decoration/Modern/table/header-cell.png":[40,18,"png","qx","qx/decoration/Modern/table-combined.png",-40,0],"qx/decoration/Modern/table/select-column-order.png":[10,9,"png","qx","qx/decoration/Modern/table-combined.png",-8,0],"qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png":[10,14,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png":[6,15,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-left-active-lr-combined.png":[10,37,"png","qx"],"qx/decoration/Modern/tabview-button-left-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png":[6,39,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-right-active-lr-combined.png":[10,37,"png","qx"],"qx/decoration/Modern/tabview-button-right-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png":[6,39,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-top-active-lr-combined.png":[10,12,"png","qx"],"qx/decoration/Modern/tabview-button-top-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png":[6,15,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-pane-lr-combined.png":[60,2,"png","qx"],"qx/decoration/Modern/tabview-pane-tb-combined.png":[30,180,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-bottom-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-bottom-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-bottom-active-c.png":[40,14,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-active-l.png":[5,14,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-active-r.png":[5,14,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-bottom-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-bottom-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-bottom-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-active.png":[49,24,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-c.png":[40,15,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-l.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-r.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-bottom-inactive.png":[45,21,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-left-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-left-active-c.png":[40,37,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-active-l.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-left-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-active-r.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-left-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-left-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-left-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-left-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-left-active.png":[22,47,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-left-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-left-inactive-c.png":[40,39,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-inactive-l.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-r.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-left-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-left-inactive.png":[20,45,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-right-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-right-active-c.png":[40,37,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-active-l.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-right-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-active-r.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-right-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-right-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-right-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-right-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-right-active.png":[22,47,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-right-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-right-inactive-c.png":[40,39,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-inactive-l.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-r.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-right-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-right-inactive.png":[20,45,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-top-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-top-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-top-active-c.png":[40,14,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-active-l.png":[5,12,"png","qx","qx/decoration/Modern/tabview-button-top-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-active-r.png":[5,12,"png","qx","qx/decoration/Modern/tabview-button-top-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-top-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-top-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-top-active.png":[48,22,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-top-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-top-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-c.png":[40,15,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-inactive-l.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-r.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-top-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-top-inactive.png":[45,21,"png","qx"],"qx/decoration/Modern/tabview/tabview-pane-b.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-60],"qx/decoration/Modern/tabview/tabview-pane-bl.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tabview-pane-br.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-120],"qx/decoration/Modern/tabview/tabview-pane-c.png":[40,120,"png","qx"],"qx/decoration/Modern/tabview/tabview-pane-l.png":[30,2,"png","qx","qx/decoration/Modern/tabview-pane-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tabview-pane-r.png":[30,2,"png","qx","qx/decoration/Modern/tabview-pane-lr-combined.png",-30,0],"qx/decoration/Modern/tabview/tabview-pane-t.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-150],"qx/decoration/Modern/tabview/tabview-pane-tl.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-30],"qx/decoration/Modern/tabview/tabview-pane-tr.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-90],"qx/decoration/Modern/tabview/tabview-pane.png":[185,250,"png","qx"],"qx/decoration/Modern/toolbar-combined.png":[80,130,"png","qx"],"qx/decoration/Modern/toolbar/toolbar-gradient-blue.png":[40,130,"png","qx","qx/decoration/Modern/toolbar-combined.png",-40,0],"qx/decoration/Modern/toolbar/toolbar-gradient.png":[40,130,"png","qx","qx/decoration/Modern/toolbar-combined.png",0,0],"qx/decoration/Modern/toolbar/toolbar-handle-knob.gif":[1,8,"gif","qx"],"qx/decoration/Modern/toolbar/toolbar-part.gif":[7,1,"gif","qx"],"qx/decoration/Modern/tooltip-error-lr-combined.png":[12,18,"png","qx"],"qx/decoration/Modern/tooltip-error-tb-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/tree-combined.png":[32,8,"png","qx"],"qx/decoration/Modern/tree/closed-selected.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-24,0],"qx/decoration/Modern/tree/closed.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-16,0],"qx/decoration/Modern/tree/open-selected.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-8,0],"qx/decoration/Modern/tree/open.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",0,0],"qx/decoration/Modern/window-captionbar-buttons-combined.png":[108,9,"png","qx"],"qx/decoration/Modern/window-captionbar-lr-active-combined.png":[12,9,"png","qx"],"qx/decoration/Modern/window-captionbar-lr-inactive-combined.png":[12,9,"png","qx"],"qx/decoration/Modern/window-captionbar-tb-active-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/window-captionbar-tb-inactive-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/window-statusbar-lr-combined.png":[8,7,"png","qx"],"qx/decoration/Modern/window-statusbar-tb-combined.png":[4,24,"png","qx"],"qx/decoration/Modern/window/captionbar-active-b.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-18],"qx/decoration/Modern/window/captionbar-active-bl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-24],"qx/decoration/Modern/window/captionbar-active-br.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-12],"qx/decoration/Modern/window/captionbar-active-c.png":[40,9,"png","qx"],"qx/decoration/Modern/window/captionbar-active-l.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-active-combined.png",-6,0],"qx/decoration/Modern/window/captionbar-active-r.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-active-combined.png",0,0],"qx/decoration/Modern/window/captionbar-active-t.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-6],"qx/decoration/Modern/window/captionbar-active-tl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,0],"qx/decoration/Modern/window/captionbar-active-tr.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-30],"qx/decoration/Modern/window/captionbar-active.png":[69,21,"png","qx"],"qx/decoration/Modern/window/captionbar-inactive-b.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-24],"qx/decoration/Modern/window/captionbar-inactive-bl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-6],"qx/decoration/Modern/window/captionbar-inactive-br.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-30],"qx/decoration/Modern/window/captionbar-inactive-c.png":[40,9,"png","qx"],"qx/decoration/Modern/window/captionbar-inactive-l.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-inactive-combined.png",0,0],"qx/decoration/Modern/window/captionbar-inactive-r.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-inactive-combined.png",-6,0],"qx/decoration/Modern/window/captionbar-inactive-t.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,0],"qx/decoration/Modern/window/captionbar-inactive-tl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-12],"qx/decoration/Modern/window/captionbar-inactive-tr.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-18],"qx/decoration/Modern/window/captionbar-inactive.png":[69,21,"png","qx"],"qx/decoration/Modern/window/close-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-27,0],"qx/decoration/Modern/window/close-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-9,0],"qx/decoration/Modern/window/close-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-90,0],"qx/decoration/Modern/window/maximize-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-18,0],"qx/decoration/Modern/window/maximize-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-81,0],"qx/decoration/Modern/window/maximize-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-54,0],"qx/decoration/Modern/window/minimize-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-63,0],"qx/decoration/Modern/window/minimize-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-72,0],"qx/decoration/Modern/window/minimize-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-36,0],"qx/decoration/Modern/window/restore-active-hovered.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",0,0],"qx/decoration/Modern/window/restore-active.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-99,0],"qx/decoration/Modern/window/restore-inactive.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-45,0],"qx/decoration/Modern/window/statusbar-b.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-16],"qx/decoration/Modern/window/statusbar-bl.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-20],"qx/decoration/Modern/window/statusbar-br.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-4],"qx/decoration/Modern/window/statusbar-c.png":[40,7,"png","qx"],"qx/decoration/Modern/window/statusbar-l.png":[4,7,"png","qx","qx/decoration/Modern/window-statusbar-lr-combined.png",-4,0],"qx/decoration/Modern/window/statusbar-r.png":[4,7,"png","qx","qx/decoration/Modern/window-statusbar-lr-combined.png",0,0],"qx/decoration/Modern/window/statusbar-t.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,0],"qx/decoration/Modern/window/statusbar-tl.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-8],"qx/decoration/Modern/window/statusbar-tr.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-12],"qx/decoration/Modern/window/statusbar.png":[369,15,"png","qx"],"qx/icon/Tango/16/actions/dialog-cancel.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/dialog-ok.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/edit-find.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/view-refresh.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/window-close.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/office-calendar.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/utilities-color-chooser.png":[16,16,"png","qx"],"qx/icon/Tango/16/mimetypes/office-document.png":[16,16,"png","qx"],"qx/icon/Tango/16/places/folder-open.png":[16,16,"png","qx"],"qx/icon/Tango/16/places/folder.png":[16,16,"png","qx"],"qx/icon/Tango/22/actions/application-exit.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/edit-clear.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/edit-redo.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/go-next.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/go-previous.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/media-playback-start.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/media-playback-stop.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/internet-web-browser.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/office-spreadsheet.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/utilities-color-chooser.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/utilities-log-viewer.png":[22,22,"png","qx"],"qx/icon/Tango/22/mimetypes/executable.png":[22,22,"png","qx"],"qx/icon/Tango/22/mimetypes/office-document.png":[22,22,"png","qx"],"qx/icon/Tango/22/places/folder-open.png":[22,22,"png","qx","demobrowser/demo/test/combined/icons22.png",0,-44],"qx/icon/Tango/22/places/folder.png":[22,22,"png","qx","demobrowser/demo/test/combined/icons22.png",0,-22],"qx/icon/Tango/32/mimetypes/office-document.png":[32,32,"png","qx"],"qx/icon/Tango/32/places/folder-open.png":[32,32,"png","qx"],"qx/icon/Tango/32/places/folder.png":[32,32,"png","qx"],"qx/static/blank.gif":[1,1,"gif","qx"],"qx/static/blank.html":"qx"},"translations":{"C":{}}};
(function(){var m="toString",k=".",j="default",h="Object",g='"',f="Array",e="()",d="String",c="Function",b=".prototype",L="function",K="Boolean",J="Error",I="constructor",H="warn",G="hasOwnProperty",F="string",E="toLocaleString",D="RegExp",C='\", "',t="info",u="BROKEN_IE",r="isPrototypeOf",s="Date",p="",q="qx.Bootstrap",n="]",o="Class",v="error",w="[Class ",y="valueOf",x="Number",A="count",z="debug",B="ES5";
if(!window.qx){window.qx={};
}qx.Bootstrap={genericToString:function(){return w+this.classname+n;
},createNamespace:function(name,M){var O=name.split(k);
var parent=window;
var N=O[0];

for(var i=0,P=O.length-1;i<P;i++,N=O[i]){if(!parent[N]){parent=parent[N]={};
}else{parent=parent[N];
}}parent[N]=M;
return N;
},setDisplayName:function(Q,R,name){Q.displayName=R+k+name+e;
},setDisplayNames:function(S,T){for(var name in S){var U=S[name];

if(U instanceof Function){U.displayName=T+k+name+e;
}}},define:function(name,V){if(!V){var V={statics:{}};
}var bb;
var Y=null;
qx.Bootstrap.setDisplayNames(V.statics,name);

if(V.members||V.extend){qx.Bootstrap.setDisplayNames(V.members,name+b);
bb=V.construct||new Function;

if(V.extend){this.extendClass(bb,bb,V.extend,name,ba);
}var W=V.statics||{};
for(var i=0,bc=qx.Bootstrap.getKeys(W),l=bc.length;i<l;i++){var bd=bc[i];
bb[bd]=W[bd];
}Y=bb.prototype;
var X=V.members||{};
for(var i=0,bc=qx.Bootstrap.getKeys(X),l=bc.length;i<l;i++){var bd=bc[i];
Y[bd]=X[bd];
}}else{bb=V.statics||{};
}var ba=this.createNamespace(name,bb);
bb.name=bb.classname=name;
bb.basename=ba;
bb.$$type=o;
if(!bb.hasOwnProperty(m)){bb.toString=this.genericToString;
}if(V.defer){V.defer(bb,Y);
}qx.Bootstrap.$$registry[name]=V.statics;
return bb;
}};
qx.Bootstrap.define(q,{statics:{LOADSTART:qx.$$start||new Date(),createNamespace:qx.Bootstrap.createNamespace,define:qx.Bootstrap.define,setDisplayName:qx.Bootstrap.setDisplayName,setDisplayNames:qx.Bootstrap.setDisplayNames,genericToString:qx.Bootstrap.genericToString,extendClass:function(be,bf,bg,name,bh){var bk=bg.prototype;
var bj=new Function;
bj.prototype=bk;
var bi=new bj;
be.prototype=bi;
bi.name=bi.classname=name;
bi.basename=bh;
bf.base=be.superclass=bg;
bf.self=be.constructor=bi.constructor=be;
},getByName:function(name){return qx.Bootstrap.$$registry[name];
},$$registry:{},objectGetLength:({"count":function(bl){return bl.__count__;
},"default":function(bm){var length=0;

for(var bn in bm){length++;
}return length;
}})[(({}).__count__==0)?A:j],objectMergeWith:function(bo,bp,bq){if(bq===undefined){bq=true;
}
for(var br in bp){if(bq||bo[br]===undefined){bo[br]=bp[br];
}}return bo;
},__a:[r,G,E,m,y,I],getKeys:({"ES5":Object.keys,"BROKEN_IE":function(bs){var bt=[];
var bv=Object.prototype.hasOwnProperty;

for(var bw in bs){if(bv.call(bs,bw)){bt.push(bw);
}}var bu=qx.Bootstrap.__a;

for(var i=0,a=bu,l=a.length;i<l;i++){if(bv.call(bs,a[i])){bt.push(a[i]);
}}return bt;
},"default":function(bx){var by=[];
var bz=Object.prototype.hasOwnProperty;

for(var bA in bx){if(bz.call(bx,bA)){by.push(bA);
}}return by;
}})[typeof (Object.keys)==
L?B:
(function(){for(var bB in {toString:1}){return bB;
}})()!==m?u:j],getKeysAsString:function(bC){var bD=qx.Bootstrap.getKeys(bC);

if(bD.length==0){return p;
}return g+bD.join(C)+g;
},__b:{"[object String]":d,"[object Array]":f,"[object Object]":h,"[object RegExp]":D,"[object Number]":x,"[object Boolean]":K,"[object Date]":s,"[object Function]":c,"[object Error]":J},bind:function(bE,self,bF){var bG=Array.prototype.slice.call(arguments,2,arguments.length);
return function(){var bH=Array.prototype.slice.call(arguments,0,arguments.length);
return bE.apply(self,bG.concat(bH));
};
},firstUp:function(bI){return bI.charAt(0).toUpperCase()+bI.substr(1);
},firstLow:function(bJ){return bJ.charAt(0).toLowerCase()+bJ.substr(1);
},getClass:function(bK){var bL=Object.prototype.toString.call(bK);
return (qx.Bootstrap.__b[bL]||bL.slice(8,-1));
},isString:function(bM){return (bM!==null&&(typeof bM===F||qx.Bootstrap.getClass(bM)==d||bM instanceof String||(!!bM&&!!bM.$$isString)));
},isArray:function(bN){return (bN!==null&&(bN instanceof Array||(bN&&qx.data&&qx.data.IListData&&qx.Bootstrap.hasInterface(bN.constructor,qx.data.IListData))||qx.Bootstrap.getClass(bN)==f||(!!bN&&!!bN.$$isArray)));
},isObject:function(bO){return (bO!==undefined&&bO!==null&&qx.Bootstrap.getClass(bO)==h);
},isFunction:function(bP){return qx.Bootstrap.getClass(bP)==c;
},classIsDefined:function(name){return qx.Bootstrap.getByName(name)!==undefined;
},getPropertyDefinition:function(bQ,name){while(bQ){if(bQ.$$properties&&bQ.$$properties[name]){return bQ.$$properties[name];
}bQ=bQ.superclass;
}return null;
},hasProperty:function(bR,name){return !!qx.Bootstrap.getPropertyDefinition(bR,name);
},getEventType:function(bS,name){var bS=bS.constructor;

while(bS.superclass){if(bS.$$events&&bS.$$events[name]!==undefined){return bS.$$events[name];
}bS=bS.superclass;
}return null;
},supportsEvent:function(bT,name){return !!qx.Bootstrap.getEventType(bT,name);
},getByInterface:function(bU,bV){var bW,i,l;

while(bU){if(bU.$$implements){bW=bU.$$flatImplements;

for(i=0,l=bW.length;i<l;i++){if(bW[i]===bV){return bU;
}}}bU=bU.superclass;
}return null;
},hasInterface:function(bX,bY){return !!qx.Bootstrap.getByInterface(bX,bY);
},getMixins:function(ca){var cb=[];

while(ca){if(ca.$$includes){cb.push.apply(cb,ca.$$flatIncludes);
}ca=ca.superclass;
}return cb;
},$$logs:[],debug:function(cc,cd){qx.Bootstrap.$$logs.push([z,arguments]);
},info:function(ce,cf){qx.Bootstrap.$$logs.push([t,arguments]);
},warn:function(cg,ch){qx.Bootstrap.$$logs.push([H,arguments]);
},error:function(ci,cj){qx.Bootstrap.$$logs.push([v,arguments]);
},trace:function(ck){}}});
})();
(function(){var h="qx.allowUrlSettings",g="&",f="qx.core.Setting",e="qx.allowUrlVariants",d="qx.propertyDebugLevel",c="qxsetting",b=":",a=".";
qx.Bootstrap.define(f,{statics:{__e:{},define:function(j,k){if(k===undefined){throw new Error('Default value of setting "'+j+'" must be defined!');
}
if(!this.__e[j]){this.__e[j]={};
}else if(this.__e[j].defaultValue!==undefined){throw new Error('Setting "'+j+'" is already defined!');
}this.__e[j].defaultValue=k;
},get:function(l){var m=this.__e[l];

if(m===undefined){throw new Error('Setting "'+l+'" is not defined.');
}
if(m.value!==undefined){return m.value;
}return m.defaultValue;
},set:function(n,o){if((n.split(a)).length<2){throw new Error('Malformed settings key "'+n+'". Must be following the schema "namespace.key".');
}
if(!this.__e[n]){this.__e[n]={};
}this.__e[n].value=o;
},__f:function(){if(window.qxsettings){for(var p in window.qxsettings){this.set(p,window.qxsettings[p]);
}window.qxsettings=undefined;

try{delete window.qxsettings;
}catch(q){}this.__g();
}},__g:function(){if(this.get(h)!=true){return;
}var s=document.location.search.slice(1).split(g);

for(var i=0;i<s.length;i++){var r=s[i].split(b);

if(r.length!=3||r[0]!=c){continue;
}this.set(r[1],decodeURIComponent(r[2]));
}}},defer:function(t){t.define(h,false);
t.define(e,false);
t.define(d,0);
t.__f();
}});
})();
(function(){var u="gecko",t="1.9.0.0",s=".",r="[object Opera]",q="function",p="[^\\.0-9]",o="525.26",n="",m="mshtml",l="AppleWebKit/",e="9.0",k="unknown",h="9.6.0",c="4.0",b="Gecko",g="opera",f="webkit",i="0.0.0",a="5.0",j="8.0",d="qx.bom.client.Engine";
qx.Bootstrap.define(d,{statics:{NAME:"",FULLVERSION:"0.0.0",VERSION:0.0,OPERA:false,WEBKIT:false,GECKO:false,MSHTML:false,UNKNOWN_ENGINE:false,UNKNOWN_VERSION:false,DOCUMENT_MODE:null,__bc:function(){var v=k;
var z=i;
var y=window.navigator.userAgent;
var B=false;
var x=false;

if(window.opera&&Object.prototype.toString.call(window.opera)==r){v=g;
this.OPERA=true;
if(/Opera[\s\/]([0-9]+)\.([0-9])([0-9]*)/.test(y)){z=RegExp.$1+s+RegExp.$2;

if(RegExp.$3!=n){z+=s+RegExp.$3;
}}else{x=true;
z=h;
}}else if(window.navigator.userAgent.indexOf(l)!=-1){v=f;
this.WEBKIT=true;

if(/AppleWebKit\/([^ ]+)/.test(y)){z=RegExp.$1;
var A=RegExp(p).exec(z);

if(A){z=z.slice(0,A.index);
}}else{x=true;
z=o;
}}else if(window.controllers&&window.navigator.product===b){v=u;
this.GECKO=true;
if(/rv\:([^\);]+)(\)|;)/.test(y)){z=RegExp.$1;
}else{x=true;
z=t;
}}else if(window.navigator.cpuClass&&/MSIE\s+([^\);]+)(\)|;)/.test(y)){v=m;
z=RegExp.$1;

if(document.documentMode){this.DOCUMENT_MODE=document.documentMode;
}if(z<8&&/Trident\/([^\);]+)(\)|;)/.test(y)){if(RegExp.$1==c){z=j;
}else if(RegExp.$1==a){z=e;
}}this.MSHTML=true;
}else{var w=window.qxFail;

if(w&&typeof w===q){var v=w();

if(v.NAME&&v.FULLVERSION){v=v.NAME;
this[v.toUpperCase()]=true;
z=v.FULLVERSION;
}}else{B=true;
x=true;
z=t;
v=u;
this.GECKO=true;
qx.Bootstrap.warn("Unsupported client: "+y+"! Assumed gecko version 1.9.0.0 (Firefox 3.0).");
}}this.UNKNOWN_ENGINE=B;
this.UNKNOWN_VERSION=x;
this.NAME=v;
this.FULLVERSION=z;
this.VERSION=parseFloat(z);
}},defer:function(C){C.__bc();
}});
})();
(function(){var k="on",j="off",h="qx.debug",g="default",f="|",e="object",d="qxvariant",c="qx.client",b="qx.aspects",a=":",y="mshtml",x="qx.mobile.emulatetouch",w="qx.dynlocale",u=".",t="qx.core.Variant",s="gecko",r="opera",q="&",p="qx.mobile.nativescroll",o="$",m="qx.allowUrlVariants",n="webkit";
qx.Bootstrap.define(t,{statics:{__bd:{},__be:{},compilerIsSet:function(){return true;
},define:function(z,A,B){if(qx.core.Variant.compilerIsSet(h,k)){if(!this.__bh(A)){throw new Error('Allowed values of variant "'+z+'" must be defined!');
}
if(B===undefined){throw new Error('Default value of variant "'+z+'" must be defined!');
}}
if(!this.__bd[z]){this.__bd[z]={};
}else if(qx.core.Variant.compilerIsSet(h,k)){if(this.__bd[z].defaultValue!==undefined){throw new Error('Variant "'+z+'" is already defined!');
}}this.__bd[z].allowedValues=A;
this.__bd[z].defaultValue=B;
},get:function(C){var D=this.__bd[C];

if(qx.core.Variant.compilerIsSet(h,k)){if(D===undefined){throw new Error('Variant "'+C+'" is not defined.');
}}
if(D.value!==undefined){return D.value;
}return D.defaultValue;
},__bf:function(){if(window.qxvariants){for(var E in qxvariants){if(qx.core.Variant.compilerIsSet(h,k)){if((E.split(u)).length<2){throw new Error('Malformed settings key "'+E+'". Must be following the schema "namespace.key".');
}}
if(!this.__bd[E]){this.__bd[E]={};
}this.__bd[E].value=qxvariants[E];
}window.qxvariants=undefined;

try{delete window.qxvariants;
}catch(F){}this.__bg(this.__bd);
}},__bg:function(){if(qx.core.Setting.get(m)!=true){return;
}var G=document.location.search.slice(1).split(q);

for(var i=0;i<G.length;i++){var H=G[i].split(a);

if(H.length!=3||H[0]!=d){continue;
}var I=H[1];

if(!this.__bd[I]){this.__bd[I]={};
}this.__bd[I].value=decodeURIComponent(H[2]);
}},select:function(J,K){if(qx.core.Variant.compilerIsSet(h,k)){if(!this.__bi(this.__bd[J])){throw new Error("Variant \""+J+"\" is not defined");
}
if(!this.__bi(K)){throw new Error("the second parameter must be a map!");
}}
for(var L in K){if(this.isSet(J,L)){return K[L];
}}
if(K[g]!==undefined){return K[g];
}
if(qx.core.Variant.compilerIsSet(h,k)){throw new Error('No match for variant "'+J+'" in variants ['+qx.Bootstrap.getKeysAsString(K)+'] found, and no default ("default") given');
}},isSet:function(M,N){var O=M+o+N;

if(this.__be[O]!==undefined){return this.__be[O];
}var Q=false;
if(N.indexOf(f)<0){Q=this.get(M)===N;
}else{var P=N.split(f);

for(var i=0,l=P.length;i<l;i++){if(this.get(M)===P[i]){Q=true;
break;
}}}this.__be[O]=Q;
return Q;
},__bh:function(v){return typeof v===e&&v!==null&&v instanceof Array;
},__bi:function(v){return typeof v===e&&v!==null&&!(v instanceof Array);
},__bj:function(R,S){for(var i=0,l=R.length;i<l;i++){if(R[i]==S){return true;
}}return false;
}},defer:function(T){T.define(c,[s,y,r,n],qx.bom.client.Engine.NAME);
T.define(h,[k,j],k);
T.define(b,[k,j],j);
T.define(w,[k,j],k);
T.define(x,[k,j],j);
T.define(p,[k,j],j);
T.__bf();
}});
})();
(function(){var r="object",q="qx.debug",p="function",o="Mixin",n="qx.Mixin",m=".prototype",k="constructor",j="[Mixin ",h="]",g="members",d="destruct",f="events",e="on",c="properties",b="statics";
qx.Bootstrap.define(n,{statics:{define:function(name,s){if(s){if(s.include&&!(s.include instanceof Array)){s.include=[s.include];
}if(qx.core.Variant.isSet(q,e)){this.__d(name,s);
}var u=s.statics?s.statics:{};
qx.Bootstrap.setDisplayNames(u,name);

for(var t in u){if(u[t] instanceof Function){u[t].$$mixin=u;
}}if(s.construct){u.$$constructor=s.construct;
qx.Bootstrap.setDisplayName(s.construct,name,k);
}
if(s.include){u.$$includes=s.include;
}
if(s.properties){u.$$properties=s.properties;
}
if(s.members){u.$$members=s.members;
qx.Bootstrap.setDisplayNames(s.members,name+m);
}
for(var t in u.$$members){if(u.$$members[t] instanceof Function){u.$$members[t].$$mixin=u;
}}
if(s.events){u.$$events=s.events;
}
if(s.destruct){u.$$destructor=s.destruct;
qx.Bootstrap.setDisplayName(s.destruct,name,d);
}}else{var u={};
}u.$$type=o;
u.name=name;
u.toString=this.genericToString;
u.basename=qx.Bootstrap.createNamespace(name,u);
this.$$registry[name]=u;
return u;
},checkCompatibility:function(v){var y=this.flatten(v);
var z=y.length;

if(z<2){return true;
}var C={};
var B={};
var A={};
var x;

for(var i=0;i<z;i++){x=y[i];

for(var w in x.events){if(A[w]){throw new Error('Conflict between mixin "'+x.name+'" and "'+A[w]+'" in member "'+w+'"!');
}A[w]=x.name;
}
for(var w in x.properties){if(C[w]){throw new Error('Conflict between mixin "'+x.name+'" and "'+C[w]+'" in property "'+w+'"!');
}C[w]=x.name;
}
for(var w in x.members){if(B[w]){throw new Error('Conflict between mixin "'+x.name+'" and "'+B[w]+'" in member "'+w+'"!');
}B[w]=x.name;
}}return true;
},isCompatible:function(D,E){var F=qx.Bootstrap.getMixins(E);
F.push(D);
return qx.Mixin.checkCompatibility(F);
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},flatten:function(G){if(!G){return [];
}var H=G.concat();

for(var i=0,l=G.length;i<l;i++){if(G[i].$$includes){H.push.apply(H,this.flatten(G[i].$$includes));
}}return H;
},genericToString:function(){return j+this.name+h;
},$$registry:{},__c:qx.core.Variant.select(q,{"on":{"include":r,"statics":r,"members":r,"properties":r,"events":r,"destruct":p,"construct":p},"default":null}),__d:qx.core.Variant.select(q,{"on":function(name,I){var L=this.__c;

for(var K in I){if(!L[K]){throw new Error('The configuration key "'+K+'" in mixin "'+name+'" is not allowed!');
}
if(I[K]==null){throw new Error('Invalid key "'+K+'" in mixin "'+name+'"! The value is undefined/null!');
}
if(L[K]!==null&&typeof I[K]!==L[K]){throw new Error('Invalid type of key "'+K+'" in mixin "'+name+'"! The type of the key must be "'+L[K]+'"!');
}}var J=[b,g,c,f];

for(var i=0,l=J.length;i<l;i++){var K=J[i];

if(I[K]!==undefined&&(I[K] instanceof Array||I[K] instanceof RegExp||I[K] instanceof Date||I[K].classname!==undefined)){throw new Error('Invalid key "'+K+'" in mixin "'+name+'"! The value needs to be a map!');
}}if(I.include){for(var i=0,a=I.include,l=a.length;i<l;i++){if(a[i]==null){throw new Error("Includes of mixins must be mixins. The include number '"+(i+1)+"' in mixin '"+name+"'is undefined/null!");
}
if(a[i].$$type!==o){throw new Error("Includes of mixins must be mixins. The include number '"+(i+1)+"' in mixin '"+name+"'is not a mixin!");
}}this.checkCompatibility(I.include);
}},"default":function(){}})}});
})();
(function(){var u="qx.debug",t="object",s="Interface",r="on",q="string",p="function",o="Boolean",n="qx.Interface",m="events",k="toggle",d="properties",j="]",g="members",c="number",b="boolean",f="is",e="[Interface ",h="statics";
qx.Bootstrap.define(n,{statics:{define:function(name,v){if(v){if(v.extend&&!(v.extend instanceof Array)){v.extend=[v.extend];
}if(qx.core.Variant.isSet(u,r)){this.__n(name,v);
}var w=v.statics?v.statics:{};
if(v.extend){w.$$extends=v.extend;
}
if(v.properties){w.$$properties=v.properties;
}
if(v.members){w.$$members=v.members;
}
if(v.events){w.$$events=v.events;
}}else{var w={};
}w.$$type=s;
w.name=name;
w.toString=this.genericToString;
w.basename=qx.Bootstrap.createNamespace(name,w);
qx.Interface.$$registry[name]=w;
return w;
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},flatten:function(x){if(!x){return [];
}var y=x.concat();

for(var i=0,l=x.length;i<l;i++){if(x[i].$$extends){y.push.apply(y,this.flatten(x[i].$$extends));
}}return y;
},__h:function(z,A,B,C){var G=B.$$members;

if(G){for(var F in G){if(qx.Bootstrap.isFunction(G[F])){var E=this.__i(A,F);
var D=E||qx.Bootstrap.isFunction(z[F]);

if(!D){throw new Error('Implementation of method "'+F+'" is missing in class "'+A.classname+'" required by interface "'+B.name+'"');
}var H=C===true&&!E&&!qx.Bootstrap.hasInterface(A,B);

if(H){z[F]=this.__l(B,z[F],F,G[F]);
}}else{if(typeof z[F]===undefined){if(typeof z[F]!==p){throw new Error('Implementation of member "'+F+'" is missing in class "'+A.classname+'" required by interface "'+B.name+'"');
}}}}}},__i:function(I,J){var N=J.match(/^(is|toggle|get|set|reset)(.*)$/);

if(!N){return false;
}var K=qx.Bootstrap.firstLow(N[2]);
var L=qx.Bootstrap.getPropertyDefinition(I,K);

if(!L){return false;
}var M=N[0]==f||N[0]==k;

if(M){return qx.Bootstrap.getPropertyDefinition(I,K).check==o;
}return true;
},__j:function(O,P){if(P.$$properties){for(var Q in P.$$properties){if(!qx.Bootstrap.getPropertyDefinition(O,Q)){throw new Error('The property "'+Q+'" is not supported by Class "'+O.classname+'"!');
}}}},__k:function(R,S){if(S.$$events){for(var T in S.$$events){if(!qx.Bootstrap.supportsEvent(R,T)){throw new Error('The event "'+T+'" is not supported by Class "'+R.classname+'"!');
}}}},assertObject:function(U,V){var X=U.constructor;
this.__h(U,X,V,false);
this.__j(X,V);
this.__k(X,V);
var W=V.$$extends;

if(W){for(var i=0,l=W.length;i<l;i++){this.assertObject(U,W[i]);
}}},assert:function(Y,ba,bb){this.__h(Y.prototype,Y,ba,bb);
this.__j(Y,ba);
this.__k(Y,ba);
var bc=ba.$$extends;

if(bc){for(var i=0,l=bc.length;i<l;i++){this.assert(Y,bc[i],bb);
}}},genericToString:function(){return e+this.name+j;
},$$registry:{},__l:qx.core.Variant.select(u,{"on":function(bd,be,bf,bg){function bh(){bg.apply(this,arguments);
return be.apply(this,arguments);
}be.wrapper=bh;
return bh;
},"default":function(){}}),__m:qx.core.Variant.select(u,{"on":{"extend":t,"statics":t,"members":t,"properties":t,"events":t},"default":null}),__n:qx.core.Variant.select(u,{"on":function(name,bi){if(qx.core.Variant.isSet(u,r)){var bl=this.__m;

for(var bk in bi){if(bl[bk]===undefined){throw new Error('The configuration key "'+bk+'" in class "'+name+'" is not allowed!');
}
if(bi[bk]==null){throw new Error("Invalid key '"+bk+"' in interface '"+name+"'! The value is undefined/null!");
}
if(bl[bk]!==null&&typeof bi[bk]!==bl[bk]){throw new Error('Invalid type of key "'+bk+'" in interface "'+name+'"! The type of the key must be "'+bl[bk]+'"!');
}}var bj=[h,g,d,m];

for(var i=0,l=bj.length;i<l;i++){var bk=bj[i];

if(bi[bk]!==undefined&&(bi[bk] instanceof Array||bi[bk] instanceof RegExp||bi[bk] instanceof Date||bi[bk].classname!==undefined)){throw new Error('Invalid key "'+bk+'" in interface "'+name+'"! The value needs to be a map!');
}}if(bi.extend){for(var i=0,a=bi.extend,l=a.length;i<l;i++){if(a[i]==null){throw new Error("Extends of interfaces must be interfaces. The extend number '"+i+1+"' in interface '"+name+"' is undefined/null!");
}
if(a[i].$$type!==s){throw new Error("Extends of interfaces must be interfaces. The extend number '"+i+1+"' in interface '"+name+"' is not an interface!");
}}}if(bi.statics){for(var bk in bi.statics){if(bk.toUpperCase()!==bk){throw new Error('Invalid key "'+bk+'" in interface "'+name+'"! Static constants must be all uppercase.');
}
switch(typeof bi.statics[bk]){case b:case q:case c:break;
default:throw new Error('Invalid key "'+bk+'" in interface "'+name+'"! Static constants must be all of a primitive type.');
}}}}},"default":function(){}})}});
})();
(function(){var d="qx.core.Aspect",c="before",b="*",a="static";
qx.Bootstrap.define(d,{statics:{__yB:[],wrap:function(e,f,g){var m=[];
var h=[];
var l=this.__yB;
var k;

for(var i=0;i<l.length;i++){k=l[i];

if((k.type==null||g==k.type||k.type==b)&&(k.name==null||e.match(k.name))){k.pos==-1?m.push(k.fcn):h.push(k.fcn);
}}
if(m.length===0&&h.length===0){return f;
}var j=function(){for(var i=0;i<m.length;i++){m[i].call(this,e,f,g,arguments);
}var n=f.apply(this,arguments);

for(var i=0;i<h.length;i++){h[i].call(this,e,f,g,arguments,n);
}return n;
};

if(g!==a){j.self=f.self;
j.base=f.base;
}f.wrapper=j;
j.original=f;
return j;
},addAdvice:function(o,p,q,name){this.__yB.push({fcn:o,pos:p===c?-1:1,type:q,name:name});
}}});
})();
(function(){var g="emulated",f="native",e='"',d="qx.lang.Core",c="\\\\",b="\\\"",a="[object Error]";
qx.Bootstrap.define(d,{statics:{errorToString:{"native":Error.prototype.toString,"emulated":function(){return this.message;
}}[(!Error.prototype.toString||Error.prototype.toString()==a)?g:f],arrayIndexOf:{"native":Array.prototype.indexOf,"emulated":function(h,j){if(j==null){j=0;
}else if(j<0){j=Math.max(0,this.length+j);
}
for(var i=j;i<this.length;i++){if(this[i]===h){return i;
}}return -1;
}}[Array.prototype.indexOf?f:g],arrayLastIndexOf:{"native":Array.prototype.lastIndexOf,"emulated":function(k,m){if(m==null){m=this.length-1;
}else if(m<0){m=Math.max(0,this.length+m);
}
for(var i=m;i>=0;i--){if(this[i]===k){return i;
}}return -1;
}}[Array.prototype.lastIndexOf?f:g],arrayForEach:{"native":Array.prototype.forEach,"emulated":function(n,o){var l=this.length;

for(var i=0;i<l;i++){var p=this[i];

if(p!==undefined){n.call(o||window,p,i,this);
}}}}[Array.prototype.forEach?f:g],arrayFilter:{"native":Array.prototype.filter,"emulated":function(q,r){var s=[];
var l=this.length;

for(var i=0;i<l;i++){var t=this[i];

if(t!==undefined){if(q.call(r||window,t,i,this)){s.push(this[i]);
}}}return s;
}}[Array.prototype.filter?f:g],arrayMap:{"native":Array.prototype.map,"emulated":function(u,v){var w=[];
var l=this.length;

for(var i=0;i<l;i++){var x=this[i];

if(x!==undefined){w[i]=u.call(v||window,x,i,this);
}}return w;
}}[Array.prototype.map?f:g],arraySome:{"native":Array.prototype.some,"emulated":function(y,z){var l=this.length;

for(var i=0;i<l;i++){var A=this[i];

if(A!==undefined){if(y.call(z||window,A,i,this)){return true;
}}}return false;
}}[Array.prototype.some?f:g],arrayEvery:{"native":Array.prototype.every,"emulated":function(B,C){var l=this.length;

for(var i=0;i<l;i++){var D=this[i];

if(D!==undefined){if(!B.call(C||window,D,i,this)){return false;
}}}return true;
}}[Array.prototype.every?f:g],stringQuote:{"native":String.prototype.quote,"emulated":function(){return e+this.replace(/\\/g,c).replace(/\"/g,b)+e;
}}[String.prototype.quote?f:g]}});
Error.prototype.toString=qx.lang.Core.errorToString;
Array.prototype.indexOf=qx.lang.Core.arrayIndexOf;
Array.prototype.lastIndexOf=qx.lang.Core.arrayLastIndexOf;
Array.prototype.forEach=qx.lang.Core.arrayForEach;
Array.prototype.filter=qx.lang.Core.arrayFilter;
Array.prototype.map=qx.lang.Core.arrayMap;
Array.prototype.some=qx.lang.Core.arraySome;
Array.prototype.every=qx.lang.Core.arrayEvery;
String.prototype.quote=qx.lang.Core.stringQuote;
})();
(function(){var bI=';',bH="on",bG='return this.',bF="string",bE="qx.debug",bD="",bC="boolean",bB="setThemed",bA='!==undefined)',bz="this.",bo="set",bn="resetThemed",bm="setRuntime",bl="init",bk="qx.propertyDebugLevel",bj='else if(this.',bi="resetRuntime",bh="reset",bg="();",bf='else ',bP='if(this.',bQ="return this.",bN="get",bO=";",bL="(a[",bM="value",bJ=' of an instance of ',bK="refresh",bR=' is not (yet) ready!");',bS="]);",bs='qx.lang.Type.isString(value) && qx.util.ColorUtil.isValidPropertyValue(value)',br='value !== null && qx.theme.manager.Font.getInstance().isDynamic(value)',bu='value !== null && value.nodeType === 9 && value.documentElement',bt='value !== null && value.$$type === "Mixin"',bw='return init;',bv='var init=this.',by='value !== null && value.nodeType === 1 && value.attributes',bx="var parent = this.getLayoutParent();",bq="Error in property ",bp="property",b='qx.core.Assert.assertInstance(value, Date, msg) || true',c="if (!parent) return;",d=" in method ",e='qx.core.Assert.assertInstance(value, Error, msg) || true',f='Undefined value is not allowed!',g="inherit",h='Is invalid!',j="MSIE 6.0",k="': ",m=" of class ",bW='value !== null && value.nodeType !== undefined',bV='value !== null && qx.theme.manager.Decoration.getInstance().isValidPropertyValue(value)',bU='qx.core.Assert.assertPositiveInteger(value, msg) || true',bT='if(init==qx.core.Property.$$inherit)init=null;',cb='value !== null && value.$$type === "Interface"',ca='var inherit=prop.$$inherit;',bY="var value = parent.",bX="$$useinit_",cd="(value);",cc='Requires exactly one argument!',L="$$runtime_",M="$$user_",J='qx.core.Assert.assertArray(value, msg) || true',K='qx.core.Assert.assertPositiveNumber(value, msg) || true',P=".prototype",Q="Boolean",N='return value;',O='if(init==qx.core.Property.$$inherit)throw new Error("Inheritable property ',H='Does not allow any arguments!',I="()",u="var a=arguments[0] instanceof Array?arguments[0]:arguments;",t='value !== null && value.$$type === "Theme"',w="())",v='return null;',q='qx.core.Assert.assertObject(value, msg) || true',p='qx.core.Assert.assertString(value, msg) || true',s="if (value===undefined) value = parent.",r='value !== null && value.$$type === "Class"',o='qx.core.Assert.assertFunction(value, msg) || true',n=".",V="object",W="$$init_",X="$$theme_",Y='qx.core.Assert.assertMap(value, msg) || true',R="qx.aspects",S='qx.core.Assert.assertNumber(value, msg) || true',T='Null value is not allowed!',U='qx.core.Assert.assertInteger(value, msg) || true',ba="rv:1.8.1",bb="shorthand",E='qx.core.Assert.assertInstance(value, RegExp, msg) || true',D='value !== null && value.type !== undefined',C='value !== null && value.document',B='throw new Error("Property ',A="(!this.",z='qx.core.Assert.assertBoolean(value, msg) || true',y="toggle",x="$$inherit_",G=" with incoming value '",F="a=qx.lang.Array.fromShortHand(qx.lang.Array.fromArguments(a));",bc="qx.core.Property",bd="is",be='Could not change or apply init value after constructing phase!';
qx.Bootstrap.define(bc,{statics:{__o:{"Boolean":z,"String":p,"Number":S,"Integer":U,"PositiveNumber":K,"PositiveInteger":bU,"Error":e,"RegExp":E,"Object":q,"Array":J,"Map":Y,"Function":o,"Date":b,"Node":bW,"Element":by,"Document":bu,"Window":C,"Event":D,"Class":r,"Mixin":bt,"Interface":cb,"Theme":t,"Color":bs,"Decorator":bV,"Font":br},__p:{"Node":true,"Element":true,"Document":true,"Window":true,"Event":true},$$inherit:g,$$store:{runtime:{},user:{},theme:{},inherit:{},init:{},useinit:{}},$$method:{get:{},set:{},reset:{},init:{},refresh:{},setRuntime:{},resetRuntime:{},setThemed:{},resetThemed:{}},$$allowedKeys:{name:bF,dereference:bC,inheritable:bC,nullable:bC,themeable:bC,refine:bC,init:null,apply:bF,event:bF,check:null,transform:bF,deferredInit:bC,validate:null},$$allowedGroupKeys:{name:bF,group:V,mode:bF,themeable:bC},$$inheritable:{},__q:function(ce){var cf=this.__r(ce);

if(!cf.length){var cg=qx.lang.Function.empty;
}else{cg=this.__s(cf);
}ce.prototype.$$refreshInheritables=cg;
},__r:function(ch){var cj=[];

while(ch){var ci=ch.$$properties;

if(ci){for(var name in this.$$inheritable){if(ci[name]&&ci[name].inheritable){cj.push(name);
}}}ch=ch.superclass;
}return cj;
},__s:function(ck){var co=this.$$store.inherit;
var cn=this.$$store.init;
var cm=this.$$method.refresh;
var cl=[bx,c];

for(var i=0,l=ck.length;i<l;i++){var name=ck[i];
cl.push(bY,co[name],bO,s,cn[name],bO,bz,cm[name],cd);
}return new Function(cl.join(bD));
},attachRefreshInheritables:function(cp){cp.prototype.$$refreshInheritables=function(){qx.core.Property.__q(cp);
return this.$$refreshInheritables();
};
},attachMethods:function(cq,name,cr){cr.group?this.__t(cq,cr,name):this.__u(cq,cr,name);
},__t:function(cs,ct,name){var cA=qx.Bootstrap.firstUp(name);
var cz=cs.prototype;
var cB=ct.themeable===true;

if(qx.core.Variant.isSet(bE,bH)){if(qx.core.Setting.get(bk)>1){qx.Bootstrap.debug("Generating property group: "+name);
}}var cC=[];
var cw=[];

if(cB){var cu=[];
var cy=[];
}var cx=u;
cC.push(cx);

if(cB){cu.push(cx);
}
if(ct.mode==bb){var cv=F;
cC.push(cv);

if(cB){cu.push(cv);
}}
for(var i=0,a=ct.group,l=a.length;i<l;i++){if(qx.core.Variant.isSet(bE,bH)){if(!this.$$method.set[a[i]]||!this.$$method.reset[a[i]]){throw new Error("Cannot create property group '"+name+"' including non-existing property '"+a[i]+"'!");
}}cC.push(bz,this.$$method.set[a[i]],bL,i,bS);
cw.push(bz,this.$$method.reset[a[i]],bg);

if(cB){if(qx.core.Variant.isSet(bE,bH)){if(!this.$$method.setThemed[a[i]]){throw new Error("Cannot add the non themable property '"+a[i]+"' to the themable property group '"+name+"'");
}}cu.push(bz,this.$$method.setThemed[a[i]],bL,i,bS);
cy.push(bz,this.$$method.resetThemed[a[i]],bg);
}}this.$$method.set[name]=bo+cA;
cz[this.$$method.set[name]]=new Function(cC.join(bD));
this.$$method.reset[name]=bh+cA;
cz[this.$$method.reset[name]]=new Function(cw.join(bD));

if(cB){this.$$method.setThemed[name]=bB+cA;
cz[this.$$method.setThemed[name]]=new Function(cu.join(bD));
this.$$method.resetThemed[name]=bn+cA;
cz[this.$$method.resetThemed[name]]=new Function(cy.join(bD));
}},__u:function(cD,cE,name){var cG=qx.Bootstrap.firstUp(name);
var cI=cD.prototype;

if(qx.core.Variant.isSet(bE,bH)){if(qx.core.Setting.get(bk)>1){qx.Bootstrap.debug("Generating property wrappers: "+name);
}}if(cE.dereference===undefined&&typeof cE.check===bF){cE.dereference=this.__v(cE.check);
}var cH=this.$$method;
var cF=this.$$store;
cF.runtime[name]=L+name;
cF.user[name]=M+name;
cF.theme[name]=X+name;
cF.init[name]=W+name;
cF.inherit[name]=x+name;
cF.useinit[name]=bX+name;
cH.get[name]=bN+cG;
cI[cH.get[name]]=function(){return qx.core.Property.executeOptimizedGetter(this,cD,name,bN);
};
cH.set[name]=bo+cG;
cI[cH.set[name]]=function(cJ){return qx.core.Property.executeOptimizedSetter(this,cD,name,bo,arguments);
};
cH.reset[name]=bh+cG;
cI[cH.reset[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,cD,name,bh);
};

if(cE.inheritable||cE.apply||cE.event||cE.deferredInit){cH.init[name]=bl+cG;
cI[cH.init[name]]=function(cK){return qx.core.Property.executeOptimizedSetter(this,cD,name,bl,arguments);
};
}
if(cE.inheritable){cH.refresh[name]=bK+cG;
cI[cH.refresh[name]]=function(cL){return qx.core.Property.executeOptimizedSetter(this,cD,name,bK,arguments);
};
}cH.setRuntime[name]=bm+cG;
cI[cH.setRuntime[name]]=function(cM){return qx.core.Property.executeOptimizedSetter(this,cD,name,bm,arguments);
};
cH.resetRuntime[name]=bi+cG;
cI[cH.resetRuntime[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,cD,name,bi);
};

if(cE.themeable){cH.setThemed[name]=bB+cG;
cI[cH.setThemed[name]]=function(cN){return qx.core.Property.executeOptimizedSetter(this,cD,name,bB,arguments);
};
cH.resetThemed[name]=bn+cG;
cI[cH.resetThemed[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,cD,name,bn);
};
}
if(cE.check===Q){cI[y+cG]=new Function(bQ+cH.set[name]+A+cH.get[name]+w);
cI[bd+cG]=new Function(bQ+cH.get[name]+I);
}},__v:function(cO){return !!this.__p[cO];
},__w:function(cP){return this.__p[cP]||qx.Bootstrap.classIsDefined(cP)||(qx.Interface&&qx.Interface.isDefined(cP));
},__x:{0:be,1:cc,2:f,3:H,4:T,5:h},error:function(cQ,cR,cS,cT,cU){var cV=cQ.constructor.classname;
var cW=bq+cS+m+cV+d+this.$$method[cT][cS]+G+cU+k;
throw new Error(cW+(this.__x[cR]||"Unknown reason: "+cR));
},__y:function(cX,cY,name,da,db,dc){var dd=this.$$method[da][name];
if(qx.core.Variant.isSet(bE,bH)){if(qx.core.Setting.get(bk)>1){qx.Bootstrap.debug("Code["+this.$$method[da][name]+"]: "+db.join(""));
}try{cY[dd]=new Function(bM,db.join(bD));
}catch(de){throw new Error("Malformed generated code to unwrap method: "+this.$$method[da][name]+"\n"+db.join(""));
}}else{cY[dd]=new Function(bM,db.join(bD));
}if(qx.core.Variant.isSet(R,bH)){cY[dd]=qx.core.Aspect.wrap(cX.classname+n+dd,cY[dd],bp);
}qx.Bootstrap.setDisplayName(cY[dd],cX.classname+P,dd);
if(dc===undefined){return cX[dd]();
}else if(qx.core.Variant.isSet(bE,bH)){return cX[dd].apply(cX,dc);
}else{return cX[dd](dc[0]);
}},executeOptimizedGetter:function(df,dg,name,dh){var dj=dg.$$properties[name];
var dl=dg.prototype;
var di=[];
var dk=this.$$store;
di.push(bP,dk.runtime[name],bA);
di.push(bG,dk.runtime[name],bI);

if(dj.inheritable){di.push(bj,dk.inherit[name],bA);
di.push(bG,dk.inherit[name],bI);
di.push(bf);
}di.push(bP,dk.user[name],bA);
di.push(bG,dk.user[name],bI);

if(dj.themeable){di.push(bj,dk.theme[name],bA);
di.push(bG,dk.theme[name],bI);
}
if(dj.deferredInit&&dj.init===undefined){di.push(bj,dk.init[name],bA);
di.push(bG,dk.init[name],bI);
}di.push(bf);

if(dj.init!==undefined){if(dj.inheritable){di.push(bv,dk.init[name],bI);

if(dj.nullable){di.push(bT);
}else if(dj.init!==undefined){di.push(bG,dk.init[name],bI);
}else{di.push(O,name,bJ,dg.classname,bR);
}di.push(bw);
}else{di.push(bG,dk.init[name],bI);
}}else if(dj.inheritable||dj.nullable){di.push(v);
}else{di.push(B,name,bJ,dg.classname,bR);
}return this.__y(df,dl,name,dh,di);
},executeOptimizedSetter:function(dm,dn,name,dp,dq){var dv=dn.$$properties[name];
var du=dn.prototype;
var ds=[];
var dr=dp===bo||dp===bB||dp===bm||(dp===bl&&dv.init===undefined);
var dt=dv.apply||dv.event||dv.inheritable;
var dw=this.__z(dp,name);
this.__A(ds,dv,name,dp,dr);

if(dr){this.__B(ds,dn,dv,name);
}
if(dt){this.__C(ds,dr,dw,dp);
}
if(dv.inheritable){ds.push(ca);
}
if(qx.core.Variant.isSet(bE,bH)){if(dr){this.__D(ds,dv,dn,name,dp);
}}
if(!dt){this.__E(ds,name,dp,dr);
}else{this.__F(ds,dv,name,dp,dr);
}
if(dv.inheritable){this.__G(ds,dv,name,dp);
}else if(dt){this.__H(ds,dv,name,dp);
}
if(dt){this.__I(ds,dv,name);
if(dv.inheritable&&du._getChildren){this.__J(ds,name);
}}if(dr){ds.push(N);
}return this.__y(dm,du,name,dp,ds,dq);
},__z:function(dx,name){if(dx===bm||dx===bi){var dy=this.$$store.runtime[name];
}else if(dx===bB||dx===bn){dy=this.$$store.theme[name];
}else if(dx===bl){dy=this.$$store.init[name];
}else{dy=this.$$store.user[name];
}return dy;
},__A:function(dz,dA,name,dB,dC){if(qx.core.Variant.isSet("qx.debug","on")){dz.push('var prop=qx.core.Property;');

if(dB==="init"){dz.push('if(this.$$initialized)prop.error(this,0,"',name,'","',dB,'",value);');
}
if(dB==="refresh"){}else if(dC){dz.push('if(arguments.length!==1)prop.error(this,1,"',name,'","',dB,'",value);');
dz.push('if(value===undefined)prop.error(this,2,"',name,'","',dB,'",value);');
}else{dz.push('if(arguments.length!==0)prop.error(this,3,"',name,'","',dB,'",value);');
}}else{if(!dA.nullable||dA.check||dA.inheritable){dz.push('var prop=qx.core.Property;');
}if(dB==="set"){dz.push('if(value===undefined)prop.error(this,2,"',name,'","',dB,'",value);');
}}},__B:function(dD,dE,dF,name){if(dF.transform){dD.push('value=this.',dF.transform,'(value);');
}if(dF.validate){if(typeof dF.validate==="string"){dD.push('this.',dF.validate,'(value);');
}else if(dF.validate instanceof Function){dD.push(dE.classname,'.$$properties.',name);
dD.push('.validate.call(this, value);');
}}},__C:function(dG,dH,dI,dJ){var dK=(dJ==="reset"||dJ==="resetThemed"||dJ==="resetRuntime");

if(dH){dG.push('if(this.',dI,'===value)return value;');
}else if(dK){dG.push('if(this.',dI,'===undefined)return;');
}},__D:qx.core.Variant.select("qx.debug",{"on":function(dL,dM,dN,name,dO){if(!dM.nullable){dL.push('if(value===null)prop.error(this,4,"',name,'","',dO,'",value);');
}if(dM.check!==undefined){dL.push('var msg = "Invalid incoming value for property \''+name+'\' of class \''+dN.classname+'\'";');
if(dM.nullable){dL.push('if(value!==null)');
}if(dM.inheritable){dL.push('if(value!==inherit)');
}dL.push('if(');

if(this.__o[dM.check]!==undefined){dL.push('!(',this.__o[dM.check],')');
}else if(qx.Class.isDefined(dM.check)){dL.push('qx.core.Assert.assertInstance(value, qx.Class.getByName("',dM.check,'"), msg)');
}else if(qx.Interface&&qx.Interface.isDefined(dM.check)){dL.push('qx.core.Assert.assertInterface(value, qx.Interface.getByName("',dM.check,'"), msg)');
}else if(typeof dM.check==="function"){dL.push('!',dN.classname,'.$$properties.',name);
dL.push('.check.call(this, value)');
}else if(typeof dM.check==="string"){dL.push('!(',dM.check,')');
}else if(dM.check instanceof Array){dL.push('qx.core.Assert.assertInArray(value, ',dN.classname,'.$$properties.',name,'.check, msg)');
}else{throw new Error("Could not add check to property "+name+" of class "+dN.classname);
}dL.push(')prop.error(this,5,"',name,'","',dO,'",value);');
}},"off":undefined}),__E:function(dP,name,dQ,dR){if(dQ==="setRuntime"){dP.push('this.',this.$$store.runtime[name],'=value;');
}else if(dQ==="resetRuntime"){dP.push('if(this.',this.$$store.runtime[name],'!==undefined)');
dP.push('delete this.',this.$$store.runtime[name],';');
}else if(dQ==="set"){dP.push('this.',this.$$store.user[name],'=value;');
}else if(dQ==="reset"){dP.push('if(this.',this.$$store.user[name],'!==undefined)');
dP.push('delete this.',this.$$store.user[name],';');
}else if(dQ==="setThemed"){dP.push('this.',this.$$store.theme[name],'=value;');
}else if(dQ==="resetThemed"){dP.push('if(this.',this.$$store.theme[name],'!==undefined)');
dP.push('delete this.',this.$$store.theme[name],';');
}else if(dQ==="init"&&dR){dP.push('this.',this.$$store.init[name],'=value;');
}},__F:function(dS,dT,name,dU,dV){if(dT.inheritable){dS.push('var computed, old=this.',this.$$store.inherit[name],';');
}else{dS.push('var computed, old;');
}dS.push('if(this.',this.$$store.runtime[name],'!==undefined){');

if(dU==="setRuntime"){dS.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(dU==="resetRuntime"){dS.push('delete this.',this.$$store.runtime[name],';');
dS.push('if(this.',this.$$store.user[name],'!==undefined)');
dS.push('computed=this.',this.$$store.user[name],';');
dS.push('else if(this.',this.$$store.theme[name],'!==undefined)');
dS.push('computed=this.',this.$$store.theme[name],';');
dS.push('else if(this.',this.$$store.init[name],'!==undefined){');
dS.push('computed=this.',this.$$store.init[name],';');
dS.push('this.',this.$$store.useinit[name],'=true;');
dS.push('}');
}else{dS.push('old=computed=this.',this.$$store.runtime[name],';');
if(dU==="set"){dS.push('this.',this.$$store.user[name],'=value;');
}else if(dU==="reset"){dS.push('delete this.',this.$$store.user[name],';');
}else if(dU==="setThemed"){dS.push('this.',this.$$store.theme[name],'=value;');
}else if(dU==="resetThemed"){dS.push('delete this.',this.$$store.theme[name],';');
}else if(dU==="init"&&dV){dS.push('this.',this.$$store.init[name],'=value;');
}}dS.push('}');
dS.push('else if(this.',this.$$store.user[name],'!==undefined){');

if(dU==="set"){if(!dT.inheritable){dS.push('old=this.',this.$$store.user[name],';');
}dS.push('computed=this.',this.$$store.user[name],'=value;');
}else if(dU==="reset"){if(!dT.inheritable){dS.push('old=this.',this.$$store.user[name],';');
}dS.push('delete this.',this.$$store.user[name],';');
dS.push('if(this.',this.$$store.runtime[name],'!==undefined)');
dS.push('computed=this.',this.$$store.runtime[name],';');
dS.push('if(this.',this.$$store.theme[name],'!==undefined)');
dS.push('computed=this.',this.$$store.theme[name],';');
dS.push('else if(this.',this.$$store.init[name],'!==undefined){');
dS.push('computed=this.',this.$$store.init[name],';');
dS.push('this.',this.$$store.useinit[name],'=true;');
dS.push('}');
}else{if(dU==="setRuntime"){dS.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(dT.inheritable){dS.push('computed=this.',this.$$store.user[name],';');
}else{dS.push('old=computed=this.',this.$$store.user[name],';');
}if(dU==="setThemed"){dS.push('this.',this.$$store.theme[name],'=value;');
}else if(dU==="resetThemed"){dS.push('delete this.',this.$$store.theme[name],';');
}else if(dU==="init"&&dV){dS.push('this.',this.$$store.init[name],'=value;');
}}dS.push('}');
if(dT.themeable){dS.push('else if(this.',this.$$store.theme[name],'!==undefined){');

if(!dT.inheritable){dS.push('old=this.',this.$$store.theme[name],';');
}
if(dU==="setRuntime"){dS.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(dU==="set"){dS.push('computed=this.',this.$$store.user[name],'=value;');
}else if(dU==="setThemed"){dS.push('computed=this.',this.$$store.theme[name],'=value;');
}else if(dU==="resetThemed"){dS.push('delete this.',this.$$store.theme[name],';');
dS.push('if(this.',this.$$store.init[name],'!==undefined){');
dS.push('computed=this.',this.$$store.init[name],';');
dS.push('this.',this.$$store.useinit[name],'=true;');
dS.push('}');
}else if(dU==="init"){if(dV){dS.push('this.',this.$$store.init[name],'=value;');
}dS.push('computed=this.',this.$$store.theme[name],';');
}else if(dU==="refresh"){dS.push('computed=this.',this.$$store.theme[name],';');
}dS.push('}');
}dS.push('else if(this.',this.$$store.useinit[name],'){');

if(!dT.inheritable){dS.push('old=this.',this.$$store.init[name],';');
}
if(dU==="init"){if(dV){dS.push('computed=this.',this.$$store.init[name],'=value;');
}else{dS.push('computed=this.',this.$$store.init[name],';');
}}else if(dU==="set"||dU==="setRuntime"||dU==="setThemed"||dU==="refresh"){dS.push('delete this.',this.$$store.useinit[name],';');

if(dU==="setRuntime"){dS.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(dU==="set"){dS.push('computed=this.',this.$$store.user[name],'=value;');
}else if(dU==="setThemed"){dS.push('computed=this.',this.$$store.theme[name],'=value;');
}else if(dU==="refresh"){dS.push('computed=this.',this.$$store.init[name],';');
}}dS.push('}');
if(dU==="set"||dU==="setRuntime"||dU==="setThemed"||dU==="init"){dS.push('else{');

if(dU==="setRuntime"){dS.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(dU==="set"){dS.push('computed=this.',this.$$store.user[name],'=value;');
}else if(dU==="setThemed"){dS.push('computed=this.',this.$$store.theme[name],'=value;');
}else if(dU==="init"){if(dV){dS.push('computed=this.',this.$$store.init[name],'=value;');
}else{dS.push('computed=this.',this.$$store.init[name],';');
}dS.push('this.',this.$$store.useinit[name],'=true;');
}dS.push('}');
}},__G:function(dW,dX,name,dY){dW.push('if(computed===undefined||computed===inherit){');

if(dY==="refresh"){dW.push('computed=value;');
}else{dW.push('var pa=this.getLayoutParent();if(pa)computed=pa.',this.$$store.inherit[name],';');
}dW.push('if((computed===undefined||computed===inherit)&&');
dW.push('this.',this.$$store.init[name],'!==undefined&&');
dW.push('this.',this.$$store.init[name],'!==inherit){');
dW.push('computed=this.',this.$$store.init[name],';');
dW.push('this.',this.$$store.useinit[name],'=true;');
dW.push('}else{');
dW.push('delete this.',this.$$store.useinit[name],';}');
dW.push('}');
dW.push('if(old===computed)return value;');
dW.push('if(computed===inherit){');
dW.push('computed=undefined;delete this.',this.$$store.inherit[name],';');
dW.push('}');
dW.push('else if(computed===undefined)');
dW.push('delete this.',this.$$store.inherit[name],';');
dW.push('else this.',this.$$store.inherit[name],'=computed;');
dW.push('var backup=computed;');
if(dX.init!==undefined&&dY!=="init"){dW.push('if(old===undefined)old=this.',this.$$store.init[name],";");
}else{dW.push('if(old===undefined)old=null;');
}dW.push('if(computed===undefined||computed==inherit)computed=null;');
},__H:function(ea,eb,name,ec){if(ec!=="set"&&ec!=="setRuntime"&&ec!=="setThemed"){ea.push('if(computed===undefined)computed=null;');
}ea.push('if(old===computed)return value;');
if(eb.init!==undefined&&ec!=="init"){ea.push('if(old===undefined)old=this.',this.$$store.init[name],";");
}else{ea.push('if(old===undefined)old=null;');
}},__I:function(ed,ee,name){if(ee.apply){ed.push('this.',ee.apply,'(computed, old, "',name,'");');
}if(ee.event){ed.push("var reg=qx.event.Registration;","if(reg.hasListener(this, '",ee.event,"')){","reg.fireEvent(this, '",ee.event,"', qx.event.type.Data, [computed, old]",")}");
}},__J:function(ef,name){ef.push('var a=this._getChildren();if(a)for(var i=0,l=a.length;i<l;i++){');
ef.push('if(a[i].',this.$$method.refresh[name],')a[i].',this.$$method.refresh[name],'(backup);');
ef.push('}');
}},defer:function(eg){var ei=navigator.userAgent.indexOf(j)!=-1;
var eh=navigator.userAgent.indexOf(ba)!=-1;
if(ei||eh){eg.__v=eg.__w;
}}});
})();
(function(){var p="on",o="qx.debug",n="qx.aspects",m=".",k="static",j="[Class ",h="]",g="abstract",f="constructor",e="extend",b="qx.Class",d="singleton",c='Assumed static class because no "extend" key was found. ';
qx.Bootstrap.define(b,{statics:{define:function(name,q){if(!q){var q={};
}if(q.include&&!(q.include instanceof Array)){q.include=[q.include];
}if(q.implement&&!(q.implement instanceof Array)){q.implement=[q.implement];
}var r=false;

if(!q.hasOwnProperty(e)&&!q.type){q.type=k;
r=true;
}if(qx.core.Variant.isSet(o,p)){try{this.__M(name,q);
}catch(u){if(r){u.message=c+u.message;
}throw u;
}}var s=this.__O(name,q.type,q.extend,q.statics,q.construct,q.destruct,q.include);
if(q.extend){if(q.properties){this.__Q(s,q.properties,true);
}if(q.members){this.__S(s,q.members,true,true,false);
}if(q.events){this.__P(s,q.events,true);
}if(q.include){for(var i=0,l=q.include.length;i<l;i++){this.__W(s,q.include[i],false);
}}}if(q.settings){for(var t in q.settings){qx.core.Setting.define(t,q.settings[t]);
}}if(q.variants){for(var t in q.variants){qx.core.Variant.define(t,q.variants[t].allowedValues,q.variants[t].defaultValue);
}}if(q.implement){for(var i=0,l=q.implement.length;i<l;i++){this.__U(s,q.implement[i]);
}}
if(qx.core.Variant.isSet(o,p)){this.__N(s);
}if(q.defer){q.defer.self=s;
q.defer(s,s.prototype,{add:function(name,v){var w={};
w[name]=v;
qx.Class.__Q(s,w,true);
}});
}return s;
},undefine:function(name){delete this.$$registry[name];
var x=name.split(m);
var z=[window];

for(var i=0;i<x.length;i++){z.push(z[i][x[i]]);
}for(var i=z.length-1;i>=1;i--){var y=z[i];
var parent=z[i-1];

if(qx.Bootstrap.isFunction(y)||qx.Bootstrap.objectGetLength(y)===0){delete parent[x[i-1]];
}else{break;
}}},isDefined:qx.Bootstrap.classIsDefined,getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},getByName:qx.Bootstrap.getByName,include:function(A,B){if(qx.core.Variant.isSet(o,p)){if(!B){throw new Error("The mixin to include into class '"+A.classname+"' is undefined/null!");
}qx.Mixin.isCompatible(B,A);
}qx.Class.__W(A,B,false);
},patch:function(C,D){if(qx.core.Variant.isSet(o,p)){if(!D){throw new Error("The mixin to patch class '"+C.classname+"' is undefined/null!");
}qx.Mixin.isCompatible(D,C);
}qx.Class.__W(C,D,true);
},isSubClassOf:function(E,F){if(!E){return false;
}
if(E==F){return true;
}
if(E.prototype instanceof F){return true;
}return false;
},getPropertyDefinition:qx.Bootstrap.getPropertyDefinition,getProperties:function(G){var H=[];

while(G){if(G.$$properties){H.push.apply(H,qx.Bootstrap.getKeys(G.$$properties));
}G=G.superclass;
}return H;
},getByProperty:function(I,name){while(I){if(I.$$properties&&I.$$properties[name]){return I;
}I=I.superclass;
}return null;
},hasProperty:qx.Bootstrap.hasProperty,getEventType:qx.Bootstrap.getEventType,supportsEvent:qx.Bootstrap.supportsEvent,hasOwnMixin:function(J,K){return J.$$includes&&J.$$includes.indexOf(K)!==-1;
},getByMixin:function(L,M){var N,i,l;

while(L){if(L.$$includes){N=L.$$flatIncludes;

for(i=0,l=N.length;i<l;i++){if(N[i]===M){return L;
}}}L=L.superclass;
}return null;
},getMixins:qx.Bootstrap.getMixins,hasMixin:function(O,P){return !!this.getByMixin(O,P);
},hasOwnInterface:function(Q,R){return Q.$$implements&&Q.$$implements.indexOf(R)!==-1;
},getByInterface:qx.Bootstrap.getByInterface,getInterfaces:function(S){var T=[];

while(S){if(S.$$implements){T.push.apply(T,S.$$flatImplements);
}S=S.superclass;
}return T;
},hasInterface:qx.Bootstrap.hasInterface,implementsInterface:function(U,V){var W=U.constructor;

if(this.hasInterface(W,V)){return true;
}
try{qx.Interface.assertObject(U,V);
return true;
}catch(X){}
try{qx.Interface.assert(W,V,false);
return true;
}catch(Y){}return false;
},getInstance:function(){if(!this.$$instance){this.$$allowconstruct=true;
this.$$instance=new this;
delete this.$$allowconstruct;
}return this.$$instance;
},genericToString:function(){return j+this.classname+h;
},$$registry:qx.Bootstrap.$$registry,__K:qx.core.Variant.select("qx.debug",{"on":{"type":"string","extend":"function","implement":"object","include":"object","construct":"function","statics":"object","properties":"object","members":"object","settings":"object","variants":"object","events":"object","defer":"function","destruct":"function"},"default":null}),__L:qx.core.Variant.select("qx.debug",{"on":{"type":"string","statics":"object","settings":"object","variants":"object","defer":"function"},"default":null}),__M:qx.core.Variant.select("qx.debug",{"on":function(name,ba){if(ba.type&&!(ba.type==="static"||ba.type==="abstract"||ba.type==="singleton")){throw new Error('Invalid type "'+ba.type+'" definition for class "'+name+'"!');
}if(ba.type&&ba.type!=="static"&&!ba.extend){throw new Error('Invalid config in class "'+name+'"! Every non-static class has to extend at least the "qx.core.Object" class.');
}var bd=ba.type==="static"?this.__L:this.__K;

for(var bc in ba){if(!bd[bc]){throw new Error('The configuration key "'+bc+'" in class "'+name+'" is not allowed!');
}
if(ba[bc]==null){throw new Error('Invalid key "'+bc+'" in class "'+name+'"! The value is undefined/null!');
}
if(typeof ba[bc]!==bd[bc]){throw new Error('Invalid type of key "'+bc+'" in class "'+name+'"! The type of the key must be "'+bd[bc]+'"!');
}}var bb=["statics","properties","members","settings","variants","events"];

for(var i=0,l=bb.length;i<l;i++){var bc=bb[i];

if(ba[bc]!==undefined&&(ba[bc].$$hash!==undefined||!qx.Bootstrap.isObject(ba[bc]))){throw new Error('Invalid key "'+bc+'" in class "'+name+'"! The value needs to be a map!');
}}if(ba.include){if(ba.include instanceof Array){for(var i=0,a=ba.include,l=a.length;i<l;i++){if(a[i]==null||a[i].$$type!=="Mixin"){throw new Error('The include definition in class "'+name+'" contains an invalid mixin at position '+i+': '+a[i]);
}}}else{throw new Error('Invalid include definition in class "'+name+'"! Only mixins and arrays of mixins are allowed!');
}}if(ba.implement){if(ba.implement instanceof Array){for(var i=0,a=ba.implement,l=a.length;i<l;i++){if(a[i]==null||a[i].$$type!=="Interface"){throw new Error('The implement definition in class "'+name+'" contains an invalid interface at position '+i+': '+a[i]);
}}}else{throw new Error('Invalid implement definition in class "'+name+'"! Only interfaces and arrays of interfaces are allowed!');
}}if(ba.include){try{qx.Mixin.checkCompatibility(ba.include);
}catch(be){throw new Error('Error in include definition of class "'+name+'"! '+be.message);
}}if(ba.settings){for(var bc in ba.settings){if(bc.substr(0,bc.indexOf("."))!=name.substr(0,name.indexOf("."))){throw new Error('Forbidden setting "'+bc+'" found in "'+name+'". It is forbidden to define a default setting for an external namespace!');
}}}if(ba.variants){for(var bc in ba.variants){if(bc.substr(0,bc.indexOf("."))!=name.substr(0,name.indexOf("."))){throw new Error('Forbidden variant "'+bc+'" found in "'+name+'". It is forbidden to define a variant for an external namespace!');
}}}},"default":function(){}}),__N:qx.core.Variant.select("qx.debug",{"on":function(bf){var bh=bf.superclass;

while(bh){if(bh.$$classtype!=="abstract"){break;
}var bg=bh.$$implements;

if(bg){for(var i=0;i<bg.length;i++){qx.Interface.assert(bf,bg[i],true);
}}bh=bh.superclass;
}},"default":function(){}}),__O:function(name,bi,bj,bk,bl,bm,bn){var bq;

if(!bj&&qx.core.Variant.isSet("qx.aspects","off")){bq=bk||{};
qx.Bootstrap.setDisplayNames(bq,name);
}else{var bq={};

if(bj){if(!bl){bl=this.__X();
}
if(this.__ba(bj,bn)){bq=this.__bb(bl,name,bi);
}else{bq=bl;
}if(bi==="singleton"){bq.getInstance=this.getInstance;
}qx.Bootstrap.setDisplayName(bl,name,"constructor");
}if(bk){qx.Bootstrap.setDisplayNames(bk,name);
var br;

for(var i=0,a=qx.Bootstrap.getKeys(bk),l=a.length;i<l;i++){br=a[i];
var bo=bk[br];

if(qx.core.Variant.isSet("qx.aspects","on")){if(bo instanceof Function){bo=qx.core.Aspect.wrap(name+"."+br,bo,"static");
}bq[br]=bo;
}else{bq[br]=bo;
}}}}var bp=qx.Bootstrap.createNamespace(name,bq);
bq.name=bq.classname=name;
bq.basename=bp;
bq.$$type="Class";

if(bi){bq.$$classtype=bi;
}if(!bq.hasOwnProperty("toString")){bq.toString=this.genericToString;
}
if(bj){qx.Bootstrap.extendClass(bq,bl,bj,name,bp);
if(bm){if(qx.core.Variant.isSet("qx.aspects","on")){bm=qx.core.Aspect.wrap(name,bm,"destructor");
}bq.$$destructor=bm;
qx.Bootstrap.setDisplayName(bm,name,"destruct");
}}this.$$registry[name]=bq;
return bq;
},__P:function(bs,bt,bu){if(qx.core.Variant.isSet("qx.debug","on")){if(typeof bt!=="object"||bt instanceof Array){throw new Error(bs.classname+": the events must be defined as map!");
}
for(var bv in bt){if(typeof bt[bv]!=="string"){throw new Error(bs.classname+"/"+bv+": the event value needs to be a string with the class name of the event object which will be fired.");
}}if(bs.$$events&&bu!==true){for(var bv in bt){if(bs.$$events[bv]!==undefined&&bs.$$events[bv]!==bt[bv]){throw new Error(bs.classname+"/"+bv+": the event value/type cannot be changed from "+bs.$$events[bv]+" to "+bt[bv]);
}}}}
if(bs.$$events){for(var bv in bt){bs.$$events[bv]=bt[bv];
}}else{bs.$$events=bt;
}},__Q:function(bw,bx,by){var bz;

if(by===undefined){by=false;
}var bA=bw.prototype;

for(var name in bx){bz=bx[name];
if(qx.core.Variant.isSet("qx.debug","on")){this.__R(bw,name,bz,by);
}bz.name=name;
if(!bz.refine){if(bw.$$properties===undefined){bw.$$properties={};
}bw.$$properties[name]=bz;
}if(bz.init!==undefined){bw.prototype["$$init_"+name]=bz.init;
}if(bz.event!==undefined){var event={};
event[bz.event]="qx.event.type.Data";
this.__P(bw,event,by);
}if(bz.inheritable){qx.core.Property.$$inheritable[name]=true;

if(!bA.$$refreshInheritables){qx.core.Property.attachRefreshInheritables(bw);
}}
if(!bz.refine){qx.core.Property.attachMethods(bw,name,bz);
}}},__R:qx.core.Variant.select("qx.debug",{"on":function(bB,name,bC,bD){var bF=this.hasProperty(bB,name);

if(bF){var bE=this.getPropertyDefinition(bB,name);

if(bC.refine&&bE.init===undefined){throw new Error("Could not refine an init value if there was previously no init value defined. Property '"+name+"' of class '"+bB.classname+"'.");
}}
if(!bF&&bC.refine){throw new Error("Could not refine non-existent property: '"+name+"' of class: '"+bB.classname+"'!");
}
if(bF&&!bD){throw new Error("Class "+bB.classname+" already has a property: "+name+"!");
}
if(bF&&bD){if(!bC.refine){throw new Error('Could not refine property "'+name+'" without a "refine" flag in the property definition! This class: '+bB.classname+', original class: '+this.getByProperty(bB,name).classname+'.');
}
for(var bG in bC){if(bG!=="init"&&bG!=="refine"){throw new Error("Class "+bB.classname+" could not refine property: "+name+"! Key: "+bG+" could not be refined!");
}}}var bH=bC.group?qx.core.Property.$$allowedGroupKeys:qx.core.Property.$$allowedKeys;

for(var bG in bC){if(bH[bG]===undefined){throw new Error('The configuration key "'+bG+'" of property "'+name+'" in class "'+bB.classname+'" is not allowed!');
}
if(bC[bG]===undefined){throw new Error('Invalid key "'+bG+'" of property "'+name+'" in class "'+bB.classname+'"! The value is undefined: '+bC[bG]);
}
if(bH[bG]!==null&&typeof bC[bG]!==bH[bG]){throw new Error('Invalid type of key "'+bG+'" of property "'+name+'" in class "'+bB.classname+'"! The type of the key must be "'+bH[bG]+'"!');
}}
if(bC.transform!=null){if(!(typeof bC.transform=="string")){throw new Error('Invalid transform definition of property "'+name+'" in class "'+bB.classname+'"! Needs to be a String.');
}}
if(bC.check!=null){if(!qx.Bootstrap.isString(bC.check)&&!qx.Bootstrap.isArray(bC.check)&&!qx.Bootstrap.isFunction(bC.check)){throw new Error('Invalid check definition of property "'+name+'" in class "'+bB.classname+'"! Needs to be a String, Array or Function.');
}}},"default":null}),__S:function(bI,bJ,bK,bL,bM){var bN=bI.prototype;
var bP,bO;
qx.Bootstrap.setDisplayNames(bJ,bI.classname+".prototype");

for(var i=0,a=qx.Bootstrap.getKeys(bJ),l=a.length;i<l;i++){bP=a[i];
bO=bJ[bP];

if(qx.core.Variant.isSet("qx.debug","on")){if(bN[bP]!==undefined&&bP.charAt(0)=="_"&&bP.charAt(1)=="_"){throw new Error('Overwriting private member "'+bP+'" of Class "'+bI.classname+'" is not allowed!');
}
if(bK!==true&&bN.hasOwnProperty(bP)){throw new Error('Overwriting member "'+bP+'" of Class "'+bI.classname+'" is not allowed!');
}}if(bL!==false&&bO instanceof Function&&bO.$$type==null){if(bM==true){bO=this.__T(bO,bN[bP]);
}else{if(bN[bP]){bO.base=bN[bP];
}bO.self=bI;
}
if(qx.core.Variant.isSet("qx.aspects","on")){bO=qx.core.Aspect.wrap(bI.classname+"."+bP,bO,"member");
}}bN[bP]=bO;
}},__T:function(bQ,bR){if(bR){return function(){var bT=bQ.base;
bQ.base=bR;
var bS=bQ.apply(this,arguments);
bQ.base=bT;
return bS;
};
}else{return bQ;
}},__U:function(bU,bV){if(qx.core.Variant.isSet("qx.debug","on")){if(!bU||!bV){throw new Error("Incomplete parameters!");
}if(this.hasOwnInterface(bU,bV)){throw new Error('Interface "'+bV.name+'" is already used by Class "'+bU.classname+'!');
}if(bU.$$classtype!=="abstract"){qx.Interface.assert(bU,bV,true);
}}var bW=qx.Interface.flatten([bV]);

if(bU.$$implements){bU.$$implements.push(bV);
bU.$$flatImplements.push.apply(bU.$$flatImplements,bW);
}else{bU.$$implements=[bV];
bU.$$flatImplements=bW;
}},__V:function(bX){var name=bX.classname;
var bY=this.__bb(bX,name,bX.$$classtype);
for(var i=0,a=qx.Bootstrap.getKeys(bX),l=a.length;i<l;i++){ca=a[i];
bY[ca]=bX[ca];
}bY.prototype=bX.prototype;
var cc=bX.prototype;

for(var i=0,a=qx.Bootstrap.getKeys(cc),l=a.length;i<l;i++){ca=a[i];
var cd=cc[ca];
if(cd&&cd.self==bX){cd.self=bY;
}}for(var ca in this.$$registry){var cb=this.$$registry[ca];

if(!cb){continue;
}
if(cb.base==bX){cb.base=bY;
}
if(cb.superclass==bX){cb.superclass=bY;
}
if(cb.$$original){if(cb.$$original.base==bX){cb.$$original.base=bY;
}
if(cb.$$original.superclass==bX){cb.$$original.superclass=bY;
}}}qx.Bootstrap.createNamespace(name,bY);
this.$$registry[name]=bY;
return bY;
},__W:function(ce,cf,cg){if(qx.core.Variant.isSet("qx.debug","on")){if(!ce||!cf){throw new Error("Incomplete parameters!");
}}
if(this.hasMixin(ce,cf)){return;
}var cj=ce.$$original;

if(cf.$$constructor&&!cj){ce=this.__V(ce);
}var ci=qx.Mixin.flatten([cf]);
var ch;

for(var i=0,l=ci.length;i<l;i++){ch=ci[i];
if(ch.$$events){this.__P(ce,ch.$$events,cg);
}if(ch.$$properties){this.__Q(ce,ch.$$properties,cg);
}if(ch.$$members){this.__S(ce,ch.$$members,cg,cg,cg);
}}if(ce.$$includes){ce.$$includes.push(cf);
ce.$$flatIncludes.push.apply(ce.$$flatIncludes,ci);
}else{ce.$$includes=[cf];
ce.$$flatIncludes=ci;
}},__X:function(){function ck(){ck.base.apply(this,arguments);
}return ck;
},__Y:function(){return function(){};
},__ba:function(cl,cm){if(qx.core.Variant.isSet(o,p)){return true;
}if(cl&&cl.$$includes){var cn=cl.$$flatIncludes;

for(var i=0,l=cn.length;i<l;i++){if(cn[i].$$constructor){return true;
}}}if(cm){var co=qx.Mixin.flatten(cm);

for(var i=0,l=co.length;i<l;i++){if(co[i].$$constructor){return true;
}}}return false;
},__bb:function(cp,name,cq){var cs=function(){var cv=cs;

if(qx.core.Variant.isSet(o,p)){if(!(this instanceof cv)){throw new Error("Please initialize '"+name+"' objects using the new keyword!");
}if(cq===g){if(this.classname===name){throw new Error("The class ',"+name+"' is abstract! It is not possible to instantiate it.");
}}else if(cq===d){if(!cv.$$allowconstruct){throw new Error("The class '"+name+"' is a singleton! It is not possible to instantiate it directly. Use the static getInstance() method instead.");
}}}var cu=cv.$$original.apply(this,arguments);
if(cv.$$includes){var ct=cv.$$flatIncludes;

for(var i=0,l=ct.length;i<l;i++){if(ct[i].$$constructor){ct[i].$$constructor.apply(this,arguments);
}}}
if(qx.core.Variant.isSet(o,p)){if(this.classname===name){this.$$initialized=true;
}}return cu;
};

if(qx.core.Variant.isSet(n,p)){var cr=qx.core.Aspect.wrap(name,cs,f);
cs.$$original=cp;
cs.constructor=cr;
cs=cr;
}cs.$$original=cp;
cp.wrapper=cs;
return cs;
}},defer:function(){if(qx.core.Variant.isSet(n,p)){for(var cw in qx.Bootstrap.$$registry){var cx=qx.Bootstrap.$$registry[cw];

for(var cy in cx){if(cx[cy] instanceof Function){cx[cy]=qx.core.Aspect.wrap(cw+m+cy,cx[cy],k);
}}}}}});
})();
(function(){var g="on",f="qx.debug",e="$$hash",d="",c="qx.core.ObjectRegistry";
qx.Class.define(c,{statics:{inShutDown:false,__by:{},__bz:0,__bA:[],register:function(h){var m=this.__by;

if(!m){return;
}var k=h.$$hash;

if(k==null){var j=this.__bA;

if(j.length>0){k=j.pop();
}else{k=(this.__bz++)+d;
}h.$$hash=k;
}
if(qx.core.Variant.isSet(f,g)){if(!h.dispose){throw new Error("Invalid object: "+h);
}}m[k]=h;
},unregister:function(n){var o=n.$$hash;

if(o==null){return;
}var p=this.__by;

if(p&&p[o]){delete p[o];
this.__bA.push(o);
}try{delete n.$$hash;
}catch(q){if(n.removeAttribute){n.removeAttribute(e);
}}},toHashCode:function(r){if(qx.core.Variant.isSet(f,g)){if(r==null){throw new Error("Invalid object: "+r);
}}var t=r.$$hash;

if(t!=null){return t;
}var s=this.__bA;

if(s.length>0){t=s.pop();
}else{t=(this.__bz++)+d;
}return r.$$hash=t;
},clearHashCode:function(u){if(qx.core.Variant.isSet(f,g)){if(u==null){throw new Error("Invalid object: "+u);
}}var v=u.$$hash;

if(v!=null){this.__bA.push(v);
try{delete u.$$hash;
}catch(w){if(u.removeAttribute){u.removeAttribute(e);
}}}},fromHashCode:function(x){return this.__by[x]||null;
},shutdown:function(){this.inShutDown=true;
var z=this.__by;
var B=[];

for(var A in z){B.push(A);
}B.sort(function(a,b){return parseInt(b,10)-parseInt(a,10);
});
var y,i=0,l=B.length;

while(true){try{for(;i<l;i++){A=B[i];
y=z[A];

if(y&&y.dispose){y.dispose();
}}}catch(C){qx.Bootstrap.error(this,"Could not dispose object "+y.toString()+": "+C);

if(i!==l){i++;
continue;
}}break;
}qx.Bootstrap.debug(this,"Disposed "+l+" objects");
delete this.__by;
},getRegistry:function(){return this.__by;
}}});
})();
(function(){var f="qx.lang.Type",e="Error",d="RegExp",c="Date",b="Number",a="Boolean";
qx.Class.define(f,{statics:{getClass:qx.Bootstrap.getClass,isString:qx.Bootstrap.isString,isArray:qx.Bootstrap.isArray,isObject:qx.Bootstrap.isObject,isFunction:qx.Bootstrap.isFunction,isRegExp:function(g){return this.getClass(g)==d;
},isNumber:function(h){return (h!==null&&(this.getClass(h)==b||h instanceof Number));
},isBoolean:function(i){return (i!==null&&(this.getClass(i)==a||i instanceof Boolean));
},isDate:function(j){return (j!==null&&(this.getClass(j)==c||j instanceof Date));
},isError:function(k){return (k!==null&&(this.getClass(k)==e||k instanceof Error));
}}});
})();
(function(){var n="qx.debug",m="on",k="The second parameter must be an array.",j="mshtml",h="The first parameter must be an array.",g="Parameter must be an array.",f="qx.client",e="[object Array]",d="qx.lang.Array",c="qx",a="number",b="string";
qx.Class.define(d,{statics:{toArray:function(o,p){return this.cast(o,Array,p);
},cast:function(q,r,s){if(q.constructor===r){return q;
}
if(qx.Class.hasInterface(q,qx.data.IListData)){var q=q.toArray();
}var t=new r;
if(qx.core.Variant.isSet(f,j)){if(q.item){for(var i=s||0,l=q.length;i<l;i++){t.push(q[i]);
}return t;
}}if(Object.prototype.toString.call(q)===e&&s==null){t.push.apply(t,q);
}else{t.push.apply(t,Array.prototype.slice.call(q,s||0));
}return t;
},fromArguments:function(u,v){return Array.prototype.slice.call(u,v||0);
},fromCollection:function(w){if(qx.core.Variant.isSet(f,j)){if(w.item){var x=[];

for(var i=0,l=w.length;i<l;i++){x[i]=w[i];
}return x;
}}return Array.prototype.slice.call(w,0);
},fromShortHand:function(y){var A=y.length;
var z=qx.lang.Array.clone(y);
switch(A){case 1:z[1]=z[2]=z[3]=z[0];
break;
case 2:z[2]=z[0];
case 3:z[3]=z[1];
}return z;
},clone:function(B){return B.concat();
},insertAt:function(C,D,i){C.splice(i,0,D);
return C;
},insertBefore:function(E,F,G){var i=E.indexOf(G);

if(i==-1){E.push(F);
}else{E.splice(i,0,F);
}return E;
},insertAfter:function(H,I,J){var i=H.indexOf(J);

if(i==-1||i==(H.length-1)){H.push(I);
}else{H.splice(i+1,0,I);
}return H;
},removeAt:function(K,i){return K.splice(i,1)[0];
},removeAll:function(L){L.length=0;
return this;
},append:function(M,N){if(qx.core.Variant.isSet(n,m)){qx.core.Assert&&qx.core.Assert.assertArray(M,h);
qx.core.Assert&&qx.core.Assert.assertArray(N,k);
}Array.prototype.push.apply(M,N);
return M;
},exclude:function(O,P){if(qx.core.Variant.isSet(n,m)){qx.core.Assert&&qx.core.Assert.assertArray(O,h);
qx.core.Assert&&qx.core.Assert.assertArray(P,k);
}
for(var i=0,R=P.length,Q;i<R;i++){Q=O.indexOf(P[i]);

if(Q!=-1){O.splice(Q,1);
}}return O;
},remove:function(S,T){var i=S.indexOf(T);

if(i!=-1){S.splice(i,1);
return T;
}},contains:function(U,V){return U.indexOf(V)!==-1;
},equals:function(W,X){var length=W.length;

if(length!==X.length){return false;
}
for(var i=0;i<length;i++){if(W[i]!==X[i]){return false;
}}return true;
},sum:function(Y){var ba=0;

for(var i=0,l=Y.length;i<l;i++){ba+=Y[i];
}return ba;
},max:function(bb){if(qx.core.Variant.isSet(n,m)){qx.core.Assert&&qx.core.Assert.assertArray(bb,g);
}var i,bd=bb.length,bc=bb[0];

for(i=1;i<bd;i++){if(bb[i]>bc){bc=bb[i];
}}return bc===undefined?null:bc;
},min:function(be){if(qx.core.Variant.isSet(n,m)){qx.core.Assert&&qx.core.Assert.assertArray(be,g);
}var i,bg=be.length,bf=be[0];

for(i=1;i<bg;i++){if(be[i]<bf){bf=be[i];
}}return bf===undefined?null:bf;
},unique:function(bh){var br=[],bj={},bm={},bo={};
var bn,bi=0;
var bs=c+qx.lang.Date.now();
var bk=false,bq=false,bt=false;
for(var i=0,bp=bh.length;i<bp;i++){bn=bh[i];
if(bn===null){if(!bk){bk=true;
br.push(bn);
}}else if(bn===undefined){}else if(bn===false){if(!bq){bq=true;
br.push(bn);
}}else if(bn===true){if(!bt){bt=true;
br.push(bn);
}}else if(typeof bn===b){if(!bj[bn]){bj[bn]=1;
br.push(bn);
}}else if(typeof bn===a){if(!bm[bn]){bm[bn]=1;
br.push(bn);
}}else{bl=bn[bs];

if(bl==null){bl=bn[bs]=bi++;
}
if(!bo[bl]){bo[bl]=bn;
br.push(bn);
}}}for(var bl in bo){try{delete bo[bl][bs];
}catch(bu){try{bo[bl][bs]=null;
}catch(bv){throw new Error("Cannot clean-up map entry doneObjects["+bl+"]["+bs+"]");
}}}return br;
}}});
})();
(function(){var k="()",j="qx.debug",i=".",h=".prototype.",g="on",f="Invalid parameter 'func'.",e='anonymous()',d="Trying to call a bound function with a disposed object as context: ",c=" :: ",b="qx.lang.Function",a=".constructor()";
qx.Class.define(b,{statics:{getCaller:function(l){return l.caller?l.caller.callee:l.callee.caller;
},getName:function(m){if(m.displayName){return m.displayName;
}
if(m.$$original||m.wrapper||m.classname){return m.classname+a;
}
if(m.$$mixin){for(var o in m.$$mixin.$$members){if(m.$$mixin.$$members[o]==m){return m.$$mixin.name+h+o+k;
}}for(var o in m.$$mixin){if(m.$$mixin[o]==m){return m.$$mixin.name+i+o+k;
}}}
if(m.self){var p=m.self.constructor;

if(p){for(var o in p.prototype){if(p.prototype[o]==m){return p.classname+h+o+k;
}}for(var o in p){if(p[o]==m){return p.classname+i+o+k;
}}}}var n=m.toString().match(/function\s*(\w*)\s*\(.*/);

if(n&&n.length>=1&&n[1]){return n[1]+k;
}return e;
},globalEval:function(q){if(window.execScript){return window.execScript(q);
}else{return eval.call(window,q);
}},empty:function(){},returnTrue:function(){return true;
},returnFalse:function(){return false;
},returnNull:function(){return null;
},returnThis:function(){return this;
},returnZero:function(){return 0;
},create:function(r,s){if(qx.core.Variant.isSet(j,g)){qx.core.Assert&&qx.core.Assert.assertFunction(r,f);
}if(!s){return r;
}if(!(s.self||s.args||s.delay!=null||s.periodical!=null||s.attempt)){return r;
}return function(event){if(qx.core.Variant.isSet(j,g)){if(s.self instanceof qx.core.Object){qx.core.Assert&&qx.core.Assert.assertFalse(s.self.isDisposed(),d+s.self.toString()+c+qx.lang.Function.getName(r));
}}var u=qx.lang.Array.fromArguments(arguments);
if(s.args){u=s.args.concat(u);
}
if(s.delay||s.periodical){var t=qx.event.GlobalError.observeMethod(function(){return r.apply(s.self||this,u);
});

if(s.delay){return window.setTimeout(t,s.delay);
}
if(s.periodical){return window.setInterval(t,s.periodical);
}}else if(s.attempt){var v=false;

try{v=r.apply(s.self||this,u);
}catch(w){}return v;
}else{return r.apply(s.self||this,u);
}};
},bind:function(x,self,y){return this.create(x,{self:self,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null});
},curry:function(z,A){return this.create(z,{args:arguments.length>1?qx.lang.Array.fromArguments(arguments,1):null});
},listener:function(B,self,C){if(arguments.length<3){return function(event){return B.call(self||this,event||window.event);
};
}else{var D=qx.lang.Array.fromArguments(arguments,2);
return function(event){var E=[event||window.event];
E.push.apply(E,D);
B.apply(self||this,E);
};
}},attempt:function(F,self,G){return this.create(F,{self:self,attempt:true,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null})();
},delay:function(H,I,self,J){return this.create(H,{delay:I,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();
},periodical:function(K,L,self,M){return this.create(K,{periodical:L,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();
}}});
})();
(function(){var d="on",c="qx.debug",b="GlobalError: ",a="qx.core.GlobalError";
qx.Bootstrap.define(a,{extend:Error,construct:function(e,f){if(qx.core.Variant.isSet(c,d)){qx.core.Assert.assertNotUndefined(e);
}this.__cm=b+(e&&e.message?e.message:e);
Error.call(this,this.__cm);
this.__cn=f;
this.__co=e;
},members:{__co:null,__cn:null,__cm:null,toString:function(){return this.__cm;
},getArguments:function(){return this.__cn;
},getSourceException:function(){return this.__co;
}},destruct:function(){this.__co=null;
this.__cn=null;
this.__cm=null;
}});
})();
(function(){var p='',o='"',m=':',l=']',h='null',g=': ',f='object',e='function',d=',',b='\n',ba='\\u',Y=',\n',X='0000',W='string',V="Cannot stringify a recursive object.",U='0',T='-',S='}',R='String',Q='Boolean',x='\\\\',y='\\f',u='\\t',w='{\n',s='[]',t="qx.lang.JsonImpl",q='Z',r='\\n',z='Object',A='{}',H='@',F='.',K='(',J='Array',M='T',L='\\r',C='{',P='JSON.parse',O=' ',N='[',B='Number',D=')',E='[\n',G='\\"',I='\\b';
qx.Class.define(t,{extend:Object,construct:function(){this.stringify=qx.lang.Function.bind(this.stringify,this);
this.parse=qx.lang.Function.bind(this.parse,this);
},members:{__rI:null,__rJ:null,__rK:null,__rL:null,stringify:function(bb,bc,bd){this.__rI=p;
this.__rJ=p;
this.__rL=[];

if(qx.lang.Type.isNumber(bd)){var bd=Math.min(10,Math.floor(bd));

for(var i=0;i<bd;i+=1){this.__rJ+=O;
}}else if(qx.lang.Type.isString(bd)){if(bd.length>10){bd=bd.slice(0,10);
}this.__rJ=bd;
}if(bc&&(qx.lang.Type.isFunction(bc)||qx.lang.Type.isArray(bc))){this.__rK=bc;
}else{this.__rK=null;
}return this.__rM(p,{'':bb});
},__rM:function(be,bf){var bi=this.__rI,bg,bj=bf[be];
if(bj&&qx.lang.Type.isFunction(bj.toJSON)){bj=bj.toJSON(be);
}else if(qx.lang.Type.isDate(bj)){bj=this.dateToJSON(bj);
}if(typeof this.__rK===e){bj=this.__rK.call(bf,be,bj);
}
if(bj===null){return h;
}
if(bj===undefined){return undefined;
}switch(qx.lang.Type.getClass(bj)){case R:return this.__rN(bj);
case B:return isFinite(bj)?String(bj):h;
case Q:return String(bj);
case J:this.__rI+=this.__rJ;
bg=[];

if(this.__rL.indexOf(bj)!==-1){throw new TypeError(V);
}this.__rL.push(bj);
var length=bj.length;

for(var i=0;i<length;i+=1){bg[i]=this.__rM(i,bj)||h;
}this.__rL.pop();
if(bg.length===0){var bh=s;
}else if(this.__rI){bh=E+this.__rI+bg.join(Y+this.__rI)+b+bi+l;
}else{bh=N+bg.join(d)+l;
}this.__rI=bi;
return bh;
case z:this.__rI+=this.__rJ;
bg=[];

if(this.__rL.indexOf(bj)!==-1){throw new TypeError(V);
}this.__rL.push(bj);
if(this.__rK&&typeof this.__rK===f){var length=this.__rK.length;

for(var i=0;i<length;i+=1){var k=this.__rK[i];

if(typeof k===W){var v=this.__rM(k,bj);

if(v){bg.push(this.__rN(k)+(this.__rI?g:m)+v);
}}}}else{for(var k in bj){if(Object.hasOwnProperty.call(bj,k)){var v=this.__rM(k,bj);

if(v){bg.push(this.__rN(k)+(this.__rI?g:m)+v);
}}}}this.__rL.pop();
if(bg.length===0){var bh=A;
}else if(this.__rI){bh=w+this.__rI+bg.join(Y+this.__rI)+b+bi+S;
}else{bh=C+bg.join(d)+S;
}this.__rI=bi;
return bh;
}},dateToJSON:function(bk){var bl=function(n){return n<10?U+n:n;
};
var bm=function(n){var bn=bl(n);
return n<100?U+bn:bn;
};
return isFinite(bk.valueOf())?bk.getUTCFullYear()+T+bl(bk.getUTCMonth()+1)+T+bl(bk.getUTCDate())+M+bl(bk.getUTCHours())+m+bl(bk.getUTCMinutes())+m+bl(bk.getUTCSeconds())+F+bm(bk.getUTCMilliseconds())+q:null;
},__rN:function(bo){var bp={'\b':I,'\t':u,'\n':r,'\f':y,'\r':L,'"':G,'\\':x};
var bq=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
bq.lastIndex=0;

if(bq.test(bo)){return o+
bo.replace(bq,function(a){var c=bp[a];
return typeof c===W?c:ba+(X+a.charCodeAt(0).toString(16)).slice(-4);
})+o;
}else{return o+bo+o;
}},parse:function(br,bs){var bt=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
bt.lastIndex=0;
if(bt.test(br)){br=br.replace(bt,function(a){return ba+(X+a.charCodeAt(0).toString(16)).slice(-4);
});
}if(/^[\],:{}\s]*$/.test(br.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,H).replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,l).replace(/(?:^|:|,)(?:\s*\[)+/g,p))){var j=eval(K+br+D);
return typeof bs===e?this.__rO({'':j},p,bs):j;
}throw new SyntaxError(P);
},__rO:function(bu,bv,bw){var bx=bu[bv];

if(bx&&typeof bx===f){for(var k in bx){if(Object.hasOwnProperty.call(bx,k)){var v=this.__rO(bx,k,bw);

if(v!==undefined){bx[k]=v;
}else{delete bx[k];
}}}}return bw.call(bu,bv,bx);
}}});
})();
(function(){var c="qx.globalErrorHandling",b="on",a="qx.event.GlobalError";
qx.Bootstrap.define(a,{statics:{setErrorHandler:function(d,e){this.__cf=d||null;
this.__cg=e||window;

if(qx.core.Setting.get(c)===b){if(d&&window.onerror){var f=qx.Bootstrap.bind(this.__ci,this);

if(this.__ch==null){this.__ch=window.onerror;
}var self=this;
window.onerror=function(g,h,i){self.__ch(g,h,i);
f(g,h,i);
};
}
if(d&&!window.onerror){window.onerror=qx.Bootstrap.bind(this.__ci,this);
}if(this.__cf==null){if(this.__ch!=null){window.onerror=this.__ch;
this.__ch=null;
}else{window.onerror=null;
}}}},__ci:function(j,k,l){if(this.__cf){this.handleError(new qx.core.WindowError(j,k,l));
return true;
}},observeMethod:function(m){if(qx.core.Setting.get(c)===b){var self=this;
return function(){if(!self.__cf){return m.apply(this,arguments);
}
try{return m.apply(this,arguments);
}catch(n){self.handleError(new qx.core.GlobalError(n,arguments));
}};
}else{return m;
}},handleError:function(o){if(this.__cf){this.__cf.call(this.__cg,o);
}}},defer:function(p){qx.core.Setting.define(c,b);
p.setErrorHandler(null,null);
}});
})();
(function(){var a="qx.lang.Json";
qx.Class.define(a,{statics:{JSON:(qx.lang.Type.getClass(window.JSON)=="JSON"&&JSON.parse('{"x":1}').x===1)?window.JSON:new qx.lang.JsonImpl(),stringify:null,parse:null},defer:function(b){b.stringify=b.JSON.stringify;
b.parse=b.JSON.parse;
}});
})();
(function(){var m=":",l="qx.client",k="Error created at",j="anonymous",h="...",g="qx.dev.StackTrace",f="",e="\n",d="?",c="/source/class/",a="of linked script",b=".";
qx.Class.define(g,{statics:{getStackTrace:qx.core.Variant.select(l,{"gecko":function(){try{throw new Error();
}catch(A){var u=this.getStackTraceFromError(A);
qx.lang.Array.removeAt(u,0);
var s=this.getStackTraceFromCaller(arguments);
var q=s.length>u.length?s:u;

for(var i=0;i<Math.min(s.length,u.length);i++){var r=s[i];

if(r.indexOf(j)>=0){continue;
}var y=r.split(m);

if(y.length!=2){continue;
}var w=y[0];
var p=y[1];
var o=u[i];
var z=o.split(m);
var v=z[0];
var n=z[1];

if(qx.Class.getByName(v)){var t=v;
}else{t=w;
}var x=t+m;

if(p){x+=p+m;
}x+=n;
q[i]=x;
}return q;
}},"mshtml|webkit":function(){return this.getStackTraceFromCaller(arguments);
},"opera":function(){var B;

try{B.bar();
}catch(D){var C=this.getStackTraceFromError(D);
qx.lang.Array.removeAt(C,0);
return C;
}return [];
}}),getStackTraceFromCaller:qx.core.Variant.select(l,{"opera":function(E){return [];
},"default":function(F){var K=[];
var J=qx.lang.Function.getCaller(F);
var G={};

while(J){var H=qx.lang.Function.getName(J);
K.push(H);

try{J=J.caller;
}catch(L){break;
}
if(!J){break;
}var I=qx.core.ObjectRegistry.toHashCode(J);

if(G[I]){K.push(h);
break;
}G[I]=J;
}return K;
}}),getStackTraceFromError:qx.core.Variant.select(l,{"gecko":function(M){if(!M.stack){return [];
}var S=/@(.+):(\d+)$/gm;
var N;
var O=[];

while((N=S.exec(M.stack))!=null){var P=N[1];
var R=N[2];
var Q=this.__bI(P);
O.push(Q+m+R);
}return O;
},"webkit":function(T){if(T.stack){var bb=/at (.*)/gm;
var ba=/\((.*?)(:[^\/].*)\)/;
var X=/(.*?)(:[^\/].*)/;
var U;
var V=[];

while((U=bb.exec(T.stack))!=null){var W=ba.exec(U[1]);

if(!W){W=X.exec(U[1]);
}
if(W){var Y=this.__bI(W[1]);
V.push(Y+W[2]);
}else{V.push(U[1]);
}}return V;
}else if(T.sourceURL&&T.line){return [this.__bI(T.sourceURL)+m+T.line];
}else{return [];
}},"opera":function(bc){if(bc.stacktrace){var be=bc.stacktrace;

if(be.indexOf(k)>=0){be=be.split(k)[0];
}if(be.indexOf(a)>=0){var bo=/Line\ (\d+?)\ of\ linked\ script\ (.*?)$/gm;
var bf;
var bg=[];

while((bf=bo.exec(be))!=null){var bn=bf[1];
var bi=bf[2];
var bm=this.__bI(bi);
bg.push(bm+m+bn);
}}else{var bo=/line\ (\d+?),\ column\ (\d+?)\ in\ (?:.*?)\ in\ (.*?):[^\/]/gm;
var bf;
var bg=[];

while((bf=bo.exec(be))!=null){var bn=bf[1];
var bh=bf[2];
var bi=bf[3];
var bm=this.__bI(bi);
bg.push(bm+m+bn+m+bh);
}}return bg;
}else if(bc.message.indexOf("Backtrace:")>=0){var bg=[];
var bj=qx.lang.String.trim(bc.message.split("Backtrace:")[1]);
var bk=bj.split(e);

for(var i=0;i<bk.length;i++){var bd=bk[i].match(/\s*Line ([0-9]+) of.* (\S.*)/);

if(bd&&bd.length>=2){var bn=bd[1];
var bl=this.__bI(bd[2]);
bg.push(bl+m+bn);
}}return bg;
}else{return [];
}},"default":function(){return [];
}}),__bI:function(bp){var bt=c;
var bq=bp.indexOf(bt);
var bs=bp.indexOf(d);

if(bs>=0){bp=bp.substring(0,bs);
}var br=(bq==-1)?bp:bp.substring(bq+bt.length).replace(/\//g,b).replace(/\.js$/,f);
return br;
}}});
})();
(function(){var k="",j="g",h="0",g='\\$1',f="%",e='-',d="qx.lang.String",c=' ',b='\n',a="undefined";
qx.Class.define(d,{statics:{camelCase:function(l){return l.replace(/\-([a-z])/g,function(m,n){return n.toUpperCase();
});
},hyphenate:function(o){return o.replace(/[A-Z]/g,function(p){return (e+p.charAt(0).toLowerCase());
});
},capitalize:function(q){return q.replace(/\b[a-z]/g,function(r){return r.toUpperCase();
});
},clean:function(s){return this.trim(s.replace(/\s+/g,c));
},trimLeft:function(t){return t.replace(/^\s+/,k);
},trimRight:function(u){return u.replace(/\s+$/,k);
},trim:function(v){return v.replace(/^\s+|\s+$/g,k);
},startsWith:function(w,x){return w.indexOf(x)===0;
},endsWith:function(y,z){return y.substring(y.length-z.length,y.length)===z;
},repeat:function(A,B){return A.length>0?new Array(B+1).join(A):k;
},pad:function(C,length,D){var E=length-C.length;

if(E>0){if(typeof D===a){D=h;
}return this.repeat(D,E)+C;
}else{return C;
}},firstUp:qx.Bootstrap.firstUp,firstLow:qx.Bootstrap.firstLow,contains:function(F,G){return F.indexOf(G)!=-1;
},format:function(H,I){var J=H;

for(var i=0;i<I.length;i++){J=J.replace(new RegExp(f+(i+1),j),I[i]+k);
}return J;
},escapeRegexpChars:function(K){return K.replace(/([.*+?^${}()|[\]\/\\])/g,g);
},toArray:function(L){return L.split(/\B|\b/g);
},stripTags:function(M){return M.replace(/<\/?[^>]+>/gi,k);
},stripScripts:function(N,O){var Q=k;
var P=N.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi,function(){Q+=arguments[1]+b;
return k;
});

if(O===true){qx.lang.Function.globalEval(Q);
}return P;
}}});
})();
(function(){var c=": ",b="qx.type.BaseError",a="";
qx.Class.define(b,{extend:Error,construct:function(d,e){Error.call(this,e);
this.__cE=d||a;
this.message=e||qx.type.BaseError.DEFAULTMESSAGE;
},statics:{DEFAULTMESSAGE:"error"},members:{__cE:null,message:null,getComment:function(){return this.__cE;
},toString:function(){return this.__cE+c+this.message;
}}});
})();
(function(){var a="qx.core.AssertionError";
qx.Class.define(a,{extend:qx.type.BaseError,construct:function(b,c){qx.type.BaseError.call(this,b,c);
this.__cF=qx.dev.StackTrace.getStackTrace();
},members:{__cF:null,getStackTrace:function(){return this.__cF;
}}});
})();
(function(){var p="",o="!",n="'!",m="'",k="Expected '",j="' (rgb(",h=",",g=")), but found value '",f="Event (",d="Expected value to be the CSS color '",bw="' but found ",bv="The value '",bu=" != ",bt="qx.core.Object",bs="Expected value to be an array but found ",br=") was fired.",bq="Expected value to be an integer >= 0 but found ",bp="' to be not equal with '",bo="' to '",bn="qx.ui.core.Widget",w="Called assertTrue with '",x="Expected value to be a map but found ",u="The function did not raise an exception!",v="Expected value to be undefined but found ",s="Expected value to be a DOM element but found  '",t="Expected value to be a regular expression but found ",q="' to implement the interface '",r="Expected value to be null but found ",E="Invalid argument 'type'",F="Called assert with 'false'",R="Assertion error! ",N="Expected value to be a string but found ",ba="null",U="' but found '",bj="' must must be a key of the map '",bf="The String '",J="Expected value not to be undefined but found ",bm="qx.util.ColorUtil",bl=": ",bk="The raised exception does not have the expected type! ",I=") not fired.",L="qx.core.Assert",M="Expected value to be typeof object but found ",P="' (identical) but found '",S="' must have any of the values defined in the array '",V="Expected value to be a number but found ",bc="Called assertFalse with '",bh="]",y="Expected value to be a qooxdoo object but found ",z="' arguments.",K="Expected value not to be null but found ",Y="Array[",X="' does not match the regular expression '",W="' to be not identical with '",be="' arguments but found '",bd="', which cannot be converted to a CSS color!",T="Expected object '",bb="qx.core.AssertionError",a="Expected value to be a boolean but found ",bg="))!",A="Expected value to be a qooxdoo widget but found ",B="Expected value '%1' to be in the range '%2'..'%3'!",O="Expected value to be typeof '",b="Expected value to be typeof function but found ",c="Expected value to be an integer but found ",H="Called fail().",C="The parameter 're' must be a string or a regular expression.",D="Expected value to be a number >= 0 but found ",G="Expected value to be instanceof '",Q="Wrong number of arguments given. Expected '",bi="object";
qx.Class.define(L,{statics:{__rE:true,__rF:function(bx,by){var bz=p;

for(var i=1,l=arguments.length;i<l;i++){bz=bz+this.__rG(arguments[i]);
}var bB=R+bx+bl+bz;

if(this.__rE){qx.Bootstrap.error(bB);
}
if(qx.Class.isDefined(bb)){var bA=new qx.core.AssertionError(bx,bz);

if(this.__rE){qx.Bootstrap.error("Stack trace: \n"+bA.getStackTrace());
}throw bA;
}else{throw new Error(bB);
}},__rG:function(bC){var bD;

if(bC===null){bD=ba;
}else if(qx.lang.Type.isArray(bC)&&bC.length>10){bD=Y+bC.length+bh;
}else if((bC instanceof Object)&&(bC.toString==null)){bD=qx.lang.Json.stringify(bC,null,2);
}else{try{bD=bC.toString();
}catch(e){bD=p;
}}return bD;
},assert:function(bE,bF){bE==true||this.__rF(bF||p,F);
},fail:function(bG){this.__rF(bG||p,H);
},assertTrue:function(bH,bI){(bH===true)||this.__rF(bI||p,w,bH,m);
},assertFalse:function(bJ,bK){(bJ===false)||this.__rF(bK||p,bc,bJ,m);
},assertEquals:function(bL,bM,bN){bL==bM||this.__rF(bN||p,k,bL,U,bM,n);
},assertNotEquals:function(bO,bP,bQ){bO!=bP||this.__rF(bQ||p,k,bO,bp,bP,n);
},assertIdentical:function(bR,bS,bT){bR===bS||this.__rF(bT||p,k,bR,P,bS,n);
},assertNotIdentical:function(bU,bV,bW){bU!==bV||this.__rF(bW||p,k,bU,W,bV,n);
},assertNotUndefined:function(bX,bY){bX!==undefined||this.__rF(bY||p,J,bX,o);
},assertUndefined:function(ca,cb){ca===undefined||this.__rF(cb||p,v,ca,o);
},assertNotNull:function(cc,cd){cc!==null||this.__rF(cd||p,K,cc,o);
},assertNull:function(ce,cf){ce===null||this.__rF(cf||p,r,ce,o);
},assertJsonEquals:function(cg,ch,ci){this.assertEquals(qx.lang.Json.stringify(cg),qx.lang.Json.stringify(ch),ci);
},assertMatch:function(cj,ck,cl){this.assertString(cj);
this.assert(qx.lang.Type.isRegExp(ck)||qx.lang.Type.isString(ck),C);
cj.search(ck)>=0||this.__rF(cl||p,bf,cj,X,ck.toString(),n);
},assertArgumentsCount:function(cm,cn,co,cp){var cq=cm.length;
(cq>=cn&&cq<=co)||this.__rF(cp||p,Q,cn,bo,co,be,arguments.length,z);
},assertEventFired:function(cr,event,cs,ct,cu){var cw=false;
var cv=function(e){if(ct){ct.call(cr,e);
}cw=true;
};
var cx;

try{cx=cr.addListener(event,cv,cr);
cs.call();
}catch(cy){throw cy;
}finally{try{cr.removeListenerById(cx);
}catch(cz){}}cw===true||this.__rF(cu||p,f,event,I);
},assertEventNotFired:function(cA,event,cB,cC){var cE=false;
var cD=function(e){cE=true;
};
var cF=cA.addListener(event,cD,cA);
cB.call();
cE===false||this.__rF(cC||p,f,event,br);
cA.removeListenerById(cF);
},assertException:function(cG,cH,cI,cJ){var cH=cH||Error;
var cK;

try{this.__rE=false;
cG();
}catch(cL){cK=cL;
}finally{this.__rE=true;
}
if(cK==null){this.__rF(cJ||p,u);
}cK instanceof cH||this.__rF(cJ||p,bk,cH,bu,cK);

if(cI){this.assertMatch(cK.toString(),cI,cJ);
}},assertInArray:function(cM,cN,cO){cN.indexOf(cM)!==-1||this.__rF(cO||p,bv,cM,S,cN,m);
},assertArrayEquals:function(cP,cQ,cR){this.assertArray(cP,cR);
this.assertArray(cQ,cR);
this.assertEquals(cP.length,cQ.length,cR);

for(var i=0;i<cP.length;i++){this.assertIdentical(cP[i],cQ[i],cR);
}},assertKeyInMap:function(cS,cT,cU){cT[cS]!==undefined||this.__rF(cU||p,bv,cS,bj,cT,m);
},assertFunction:function(cV,cW){qx.lang.Type.isFunction(cV)||this.__rF(cW||p,b,cV,o);
},assertString:function(cX,cY){qx.lang.Type.isString(cX)||this.__rF(cY||p,N,cX,o);
},assertBoolean:function(da,db){qx.lang.Type.isBoolean(da)||this.__rF(db||p,a,da,o);
},assertNumber:function(dc,dd){(qx.lang.Type.isNumber(dc)&&isFinite(dc))||this.__rF(dd||p,V,dc,o);
},assertPositiveNumber:function(de,df){(qx.lang.Type.isNumber(de)&&isFinite(de)&&de>=0)||this.__rF(df||p,D,de,o);
},assertInteger:function(dg,dh){(qx.lang.Type.isNumber(dg)&&isFinite(dg)&&dg%1===0)||this.__rF(dh||p,c,dg,o);
},assertPositiveInteger:function(di,dj){var dk=(qx.lang.Type.isNumber(di)&&isFinite(di)&&di%1===0&&di>=0);
dk||this.__rF(dj||p,bq,di,o);
},assertInRange:function(dl,dm,dn,dp){(dl>=dm&&dl<=dn)||this.__rF(dp||p,qx.lang.String.format(B,[dl,dm,dn]));
},assertObject:function(dq,dr){var ds=dq!==null&&(qx.lang.Type.isObject(dq)||typeof dq===bi);
ds||this.__rF(dr||p,M,(dq),o);
},assertArray:function(dt,du){qx.lang.Type.isArray(dt)||this.__rF(du||p,bs,dt,o);
},assertMap:function(dv,dw){qx.lang.Type.isObject(dv)||this.__rF(dw||p,x,dv,o);
},assertRegExp:function(dx,dy){qx.lang.Type.isRegExp(dx)||this.__rF(dy||p,t,dx,o);
},assertType:function(dz,dA,dB){this.assertString(dA,E);
typeof (dz)===dA||this.__rF(dB||p,O,dA,bw,dz,o);
},assertInstance:function(dC,dD,dE){var dF=dD.classname||dD+p;
dC instanceof dD||this.__rF(dE||p,G,dF,bw,dC,o);
},assertInterface:function(dG,dH,dI){qx.Class.implementsInterface(dG,dH)||this.__rF(dI||p,T,dG,q,dH,n);
},assertCssColor:function(dJ,dK,dL){var dM=qx.Class.getByName(bm);

if(!dM){throw new Error("qx.util.ColorUtil not available! Your code must have a dependency on 'qx.util.ColorUtil'");
}var dO=dM.stringToRgb(dJ);

try{var dN=dM.stringToRgb(dK);
}catch(dQ){this.__rF(dL||p,d,dJ,j,dO.join(h),g,dK,bd);
}var dP=dO[0]==dN[0]&&dO[1]==dN[1]&&dO[2]==dN[2];
dP||this.__rF(dL||p,d,dO,j,dO.join(h),g,dK,j,dN.join(h),bg);
},assertElement:function(dR,dS){!!(dR&&dR.nodeType===1)||this.__rF(dS||p,s,dR,n);
},assertQxObject:function(dT,dU){this.__rH(dT,bt)||this.__rF(dU||p,y,dT,o);
},assertQxWidget:function(dV,dW){this.__rH(dV,bn)||this.__rF(dW||p,A,dV,o);
},__rH:function(dX,dY){if(!dX){return false;
}var ea=dX.constructor;

while(ea){if(ea.classname===dY){return true;
}ea=ea.superclass;
}return false;
}}});
})();
(function(){var d="qx.dom.Node",c="qx.client",b="";
qx.Class.define(d,{statics:{ELEMENT:1,ATTRIBUTE:2,TEXT:3,CDATA_SECTION:4,ENTITY_REFERENCE:5,ENTITY:6,PROCESSING_INSTRUCTION:7,COMMENT:8,DOCUMENT:9,DOCUMENT_TYPE:10,DOCUMENT_FRAGMENT:11,NOTATION:12,getDocument:function(e){return e.nodeType===
this.DOCUMENT?e:
e.ownerDocument||e.document;
},getWindow:qx.core.Variant.select(c,{"mshtml":function(f){if(f.nodeType==null){return f;
}if(f.nodeType!==this.DOCUMENT){f=f.ownerDocument;
}return f.parentWindow;
},"default":function(g){if(g.nodeType==null){return g;
}if(g.nodeType!==this.DOCUMENT){g=g.ownerDocument;
}return g.defaultView;
}}),getDocumentElement:function(h){return this.getDocument(h).documentElement;
},getBodyElement:function(j){return this.getDocument(j).body;
},isNode:function(k){return !!(k&&k.nodeType!=null);
},isElement:function(l){return !!(l&&l.nodeType===this.ELEMENT);
},isDocument:function(m){return !!(m&&m.nodeType===this.DOCUMENT);
},isText:function(n){return !!(n&&n.nodeType===this.TEXT);
},isWindow:function(o){return !!(o&&o.history&&o.location&&o.document);
},isNodeName:function(p,q){if(!q||!p||!p.nodeName){return false;
}return q.toLowerCase()==qx.dom.Node.getName(p);
},getName:function(r){if(!r||!r.nodeName){return null;
}return r.nodeName.toLowerCase();
},getText:function(s){if(!s||!s.nodeType){return null;
}
switch(s.nodeType){case 1:var i,a=[],t=s.childNodes,length=t.length;

for(i=0;i<length;i++){a[i]=this.getText(t[i]);
}return a.join(b);
case 2:case 3:case 4:return s.nodeValue;
}return null;
},isBlockNode:function(u){if(!qx.dom.Node.isElement(u)){return false;
}u=qx.dom.Node.getName(u);
return /^(body|form|textarea|fieldset|ul|ol|dl|dt|dd|li|div|hr|p|h[1-6]|quote|pre|table|thead|tbody|tfoot|tr|td|th|iframe|address|blockquote)$/.test(u);
}}});
})();
(function(){var j="on",i="qx.client",h="gecko",g="function",f="HTMLEvents",d="mousedown",c="qx.bom.Event",b="return;",a="mouseover";
qx.Class.define(c,{statics:{addNativeListener:function(k,l,m,n){if(k.addEventListener){k.addEventListener(l,m,!!n);
}else if(k.attachEvent){k.attachEvent(j+l,m);
}},removeNativeListener:function(o,p,q,r){if(o.removeEventListener){o.removeEventListener(p,q,!!r);
}else if(o.detachEvent){try{o.detachEvent(j+p,q);
}catch(e){if(e.number!==-2146828218){throw e;
}}}},getTarget:function(e){return e.target||e.srcElement;
},getRelatedTarget:function(e){if(e.relatedTarget!==undefined){if(qx.core.Variant.isSet(i,h)){try{e.relatedTarget&&e.relatedTarget.nodeType;
}catch(e){return null;
}}return e.relatedTarget;
}else if(e.fromElement!==undefined&&e.type===a){return e.fromElement;
}else if(e.toElement!==undefined){return e.toElement;
}else{return null;
}},preventDefault:function(e){if(e.preventDefault){if(qx.core.Variant.isSet(i,h)&&qx.bom.client.Engine.VERSION>=1.9&&e.type==d&&e.button==2){return;
}e.preventDefault();
if(qx.core.Variant.isSet(i,h)&&qx.bom.client.Engine.VERSION<1.9){try{e.keyCode=0;
}catch(s){}}}else{try{e.keyCode=0;
}catch(t){}e.returnValue=false;
}},stopPropagation:function(e){if(e.stopPropagation){e.stopPropagation();
}else{e.cancelBubble=true;
}},fire:function(u,v){if(document.createEvent){var w=document.createEvent(f);
w.initEvent(v,true,true);
return !u.dispatchEvent(w);
}else{var w=document.createEventObject();
return u.fireEvent(j+v,w);
}},supportsEvent:qx.core.Variant.select(i,{"webkit":function(x,y){return x.hasOwnProperty(j+y);
},"default":function(z,A){var B=j+A;
var C=(B in z);

if(!C){C=typeof z[B]==g;

if(!C&&z.setAttribute){z.setAttribute(B,b);
C=typeof z[B]==g;
z.removeAttribute(B);
}}return C;
}})}});
})();
(function(){var k="qx.debug",j="on",h="|bubble",g="|capture",f="|",e="': ",d="'",c="",b="_",a="Invalid Target.",L="Invalid event type.",K="Invalid event target.",J=" from the target '",I="Invalid callback function",H="unload",G="Failed to remove event listener for id '",F="Invalid context for callback.",E="Invalid capture flag.",D="Failed to add event listener for type '",C="UNKNOWN_",s="capture",t="__bp",q="qx.event.Manager",r="' on target '",o="Could not dispatch event '",p="DOM_",m="__bo",n="QX_",u=" to the target '",v="Failed to remove event listener for type '",x="Invalid capture falg.",w="c",z="Invalid id type.",y="DOCUMENT_",B="WIN_",A="Invalid event object.";
qx.Class.define(q,{extend:Object,construct:function(M,N){this.__bk=M;
this.__bl=qx.core.ObjectRegistry.toHashCode(M);
this.__bm=N;
if(M.qx!==qx){var self=this;
qx.bom.Event.addNativeListener(M,H,qx.event.GlobalError.observeMethod(function(){qx.bom.Event.removeNativeListener(M,H,arguments.callee);
self.dispose();
}));
}this.__bn={};
this.__bo={};
this.__bp={};
this.__bq={};
},statics:{__br:0,getNextUniqueId:function(){return (this.__br++)+c;
}},members:{__bm:null,__bn:null,__bp:null,__bs:null,__bo:null,__bq:null,__bk:null,__bl:null,getWindow:function(){return this.__bk;
},getWindowId:function(){return this.__bl;
},getHandler:function(O){var P=this.__bo[O.classname];

if(P){return P;
}return this.__bo[O.classname]=new O(this);
},getDispatcher:function(Q){var R=this.__bp[Q.classname];

if(R){return R;
}return this.__bp[Q.classname]=new Q(this,this.__bm);
},getListeners:function(S,T,U){var V=S.$$hash||qx.core.ObjectRegistry.toHashCode(S);
var X=this.__bn[V];

if(!X){return null;
}var Y=T+(U?g:h);
var W=X[Y];
return W?W.concat():null;
},serializeListeners:function(ba){var bh=ba.$$hash||qx.core.ObjectRegistry.toHashCode(ba);
var bj=this.__bn[bh];
var bf=[];

if(bj){var bd,bi,bb,be,bg;

for(var bc in bj){bd=bc.indexOf(f);
bi=bc.substring(0,bd);
bb=bc.charAt(bd+1)==w;
be=bj[bc];

for(var i=0,l=be.length;i<l;i++){bg=be[i];
bf.push({self:bg.context,handler:bg.handler,type:bi,capture:bb});
}}}return bf;
},toggleAttachedEvents:function(bk,bl){var bq=bk.$$hash||qx.core.ObjectRegistry.toHashCode(bk);
var bs=this.__bn[bq];

if(bs){var bn,br,bm,bo;

for(var bp in bs){bn=bp.indexOf(f);
br=bp.substring(0,bn);
bm=bp.charCodeAt(bn+1)===99;
bo=bs[bp];

if(bl){this.__bt(bk,br,bm);
}else{this.__bu(bk,br,bm);
}}}},hasListener:function(bt,bu,bv){if(qx.core.Variant.isSet(k,j)){if(bt==null){qx.log.Logger.trace(this);
throw new Error("Invalid object: "+bt);
}}var bw=bt.$$hash||qx.core.ObjectRegistry.toHashCode(bt);
var by=this.__bn[bw];

if(!by){return false;
}var bz=bu+(bv?g:h);
var bx=by[bz];
return !!(bx&&bx.length>0);
},importListeners:function(bA,bB){if(qx.core.Variant.isSet(k,j)){if(bA==null){qx.log.Logger.trace(this);
throw new Error("Invalid object: "+bA);
}}var bH=bA.$$hash||qx.core.ObjectRegistry.toHashCode(bA);
var bI=this.__bn[bH]={};
var bE=qx.event.Manager;

for(var bC in bB){var bF=bB[bC];
var bG=bF.type+(bF.capture?g:h);
var bD=bI[bG];

if(!bD){bD=bI[bG]=[];
this.__bt(bA,bF.type,bF.capture);
}bD.push({handler:bF.listener,context:bF.self,unique:bF.unique||(bE.__br++)+c});
}},addListener:function(bJ,bK,bL,self,bM){if(qx.core.Variant.isSet(k,j)){var bQ=D+bK+d+u+bJ.classname+e;
qx.core.Assert.assertObject(bJ,bQ+a);
qx.core.Assert.assertString(bK,bQ+L);
qx.core.Assert.assertFunction(bL,bQ+I);

if(bM!==undefined){qx.core.Assert.assertBoolean(bM,E);
}}var bR=bJ.$$hash||qx.core.ObjectRegistry.toHashCode(bJ);
var bT=this.__bn[bR];

if(!bT){bT=this.__bn[bR]={};
}var bP=bK+(bM?g:h);
var bO=bT[bP];

if(!bO){bO=bT[bP]=[];
}if(bO.length===0){this.__bt(bJ,bK,bM);
}var bS=(qx.event.Manager.__br++)+c;
var bN={handler:bL,context:self,unique:bS};
bO.push(bN);
return bP+f+bS;
},findHandler:function(bU,bV){var ci=false,ca=false,cj=false,bW=false;
var cg;

if(bU.nodeType===1){ci=true;
cg=p+bU.tagName.toLowerCase()+b+bV;
}else if(bU.nodeType===9){bW=true;
cg=y+bV;
}else if(bU==this.__bk){ca=true;
cg=B+bV;
}else if(bU.classname){cj=true;
cg=n+bU.classname+b+bV;
}else{cg=C+bU+b+bV;
}var cc=this.__bq;

if(cc[cg]){return cc[cg];
}var cf=this.__bm.getHandlers();
var cb=qx.event.IEventHandler;
var cd,ce,bY,bX;

for(var i=0,l=cf.length;i<l;i++){cd=cf[i];
bY=cd.SUPPORTED_TYPES;

if(bY&&!bY[bV]){continue;
}bX=cd.TARGET_CHECK;

if(bX){var ch=false;

if(ci&&((bX&cb.TARGET_DOMNODE)!=0)){ch=true;
}else if(ca&&((bX&cb.TARGET_WINDOW)!=0)){ch=true;
}else if(cj&&((bX&cb.TARGET_OBJECT)!=0)){ch=true;
}else if(bW&&((bX&cb.TARGET_DOCUMENT)!=0)){ch=true;
}
if(!ch){continue;
}}ce=this.getHandler(cf[i]);

if(cd.IGNORE_CAN_HANDLE||ce.canHandleEvent(bU,bV)){cc[cg]=ce;
return ce;
}}return null;
},__bt:function(ck,cl,cm){var cn=this.findHandler(ck,cl);

if(cn){cn.registerEvent(ck,cl,cm);
return;
}
if(qx.core.Variant.isSet(k,j)){qx.log.Logger.warn(this,"There is no event handler for the event '"+cl+"' on target '"+ck+"'!");
}},removeListener:function(co,cp,cq,self,cr){if(qx.core.Variant.isSet(k,j)){var cv=v+cp+d+J+co.classname+e;
qx.core.Assert.assertObject(co,cv+a);
qx.core.Assert.assertString(cp,cv+L);
qx.core.Assert.assertFunction(cq,cv+I);

if(self!==undefined){qx.core.Assert.assertObject(self,F);
}
if(cr!==undefined){qx.core.Assert.assertBoolean(cr,x);
}}var cw=co.$$hash||qx.core.ObjectRegistry.toHashCode(co);
var cx=this.__bn[cw];

if(!cx){return false;
}var cs=cp+(cr?g:h);
var ct=cx[cs];

if(!ct){return false;
}var cu;

for(var i=0,l=ct.length;i<l;i++){cu=ct[i];

if(cu.handler===cq&&cu.context===self){qx.lang.Array.removeAt(ct,i);

if(ct.length==0){this.__bu(co,cp,cr);
}return true;
}}return false;
},removeListenerById:function(cy,cz){if(qx.core.Variant.isSet(k,j)){var cF=G+cz+d+J+cy.classname+e;
qx.core.Assert.assertObject(cy,cF+a);
qx.core.Assert.assertString(cz,cF+z);
}var cD=cz.split(f);
var cI=cD[0];
var cA=cD[1].charCodeAt(0)==99;
var cH=cD[2];
var cG=cy.$$hash||qx.core.ObjectRegistry.toHashCode(cy);
var cJ=this.__bn[cG];

if(!cJ){return false;
}var cE=cI+(cA?g:h);
var cC=cJ[cE];

if(!cC){return false;
}var cB;

for(var i=0,l=cC.length;i<l;i++){cB=cC[i];

if(cB.unique===cH){qx.lang.Array.removeAt(cC,i);

if(cC.length==0){this.__bu(cy,cI,cA);
}return true;
}}return false;
},removeAllListeners:function(cK){var cO=cK.$$hash||qx.core.ObjectRegistry.toHashCode(cK);
var cQ=this.__bn[cO];

if(!cQ){return false;
}var cM,cP,cL;

for(var cN in cQ){if(cQ[cN].length>0){cM=cN.split(f);
cP=cM[0];
cL=cM[1]===s;
this.__bu(cK,cP,cL);
}}delete this.__bn[cO];
return true;
},deleteAllListeners:function(cR){delete this.__bn[cR];
},__bu:function(cS,cT,cU){var cV=this.findHandler(cS,cT);

if(cV){cV.unregisterEvent(cS,cT,cU);
return;
}
if(qx.core.Variant.isSet(k,j)){qx.log.Logger.warn(this,"There is no event handler for the event '"+cT+"' on target '"+cS+"'!");
}},dispatchEvent:function(cW,event){if(qx.core.Variant.isSet(k,j)){var dc=o+event+r+cW.classname+e;
qx.core.Assert.assertNotUndefined(cW,dc+K);
qx.core.Assert.assertNotNull(cW,dc+K);
qx.core.Assert.assertInstance(event,qx.event.type.Event,dc+A);
}var dd=event.getType();

if(!event.getBubbles()&&!this.hasListener(cW,dd)){qx.event.Pool.getInstance().poolObject(event);
return true;
}
if(!event.getTarget()){event.setTarget(cW);
}var db=this.__bm.getDispatchers();
var da;
var cY=false;

for(var i=0,l=db.length;i<l;i++){da=this.getDispatcher(db[i]);
if(da.canDispatchEvent(cW,event,dd)){da.dispatchEvent(cW,event,dd);
cY=true;
break;
}}
if(!cY){if(qx.core.Variant.isSet(k,j)){qx.log.Logger.error(this,"No dispatcher can handle event of type "+dd+" on "+cW);
}return true;
}var cX=event.getDefaultPrevented();
qx.event.Pool.getInstance().poolObject(event);
return !cX;
},dispose:function(){this.__bm.removeManager(this);
qx.util.DisposeUtil.disposeMap(this,m);
qx.util.DisposeUtil.disposeMap(this,t);
this.__bn=this.__bk=this.__bs=null;
this.__bm=this.__bq=null;
}}});
})();
(function(){var l="qx.debug",k="on",j="Invalid event target.",i="Invalid event dispatcher!",h="': ",g="Invalid event handler.",f="' on target '",e="Could not fire event '",d="undefined",c="qx.event.Registration";
qx.Class.define(c,{statics:{__bv:{},getManager:function(m){if(m==null){if(qx.core.Variant.isSet(l,k)){qx.log.Logger.error("qx.event.Registration.getManager(null) was called!");
qx.log.Logger.trace(this);
}m=window;
}else if(m.nodeType){m=qx.dom.Node.getWindow(m);
}else if(!qx.dom.Node.isWindow(m)){m=window;
}var o=m.$$hash||qx.core.ObjectRegistry.toHashCode(m);
var n=this.__bv[o];

if(!n){n=new qx.event.Manager(m,this);
this.__bv[o]=n;
}return n;
},removeManager:function(p){var q=p.getWindowId();
delete this.__bv[q];
},addListener:function(r,s,t,self,u){return this.getManager(r).addListener(r,s,t,self,u);
},removeListener:function(v,w,x,self,y){return this.getManager(v).removeListener(v,w,x,self,y);
},removeListenerById:function(z,A){return this.getManager(z).removeListenerById(z,A);
},removeAllListeners:function(B){return this.getManager(B).removeAllListeners(B);
},deleteAllListeners:function(C){var D=C.$$hash;

if(D){this.getManager(C).deleteAllListeners(D);
}},hasListener:function(E,F,G){return this.getManager(E).hasListener(E,F,G);
},serializeListeners:function(H){return this.getManager(H).serializeListeners(H);
},createEvent:function(I,J,K){if(qx.core.Variant.isSet(l,k)){if(arguments.length>1&&J===undefined){throw new Error("Create event of type "+I+" with undefined class. Please use null to explicit fallback to default event type!");
}}if(J==null){J=qx.event.type.Event;
}var L=qx.event.Pool.getInstance().getObject(J);
K?L.init.apply(L,K):L.init();
if(I){L.setType(I);
}return L;
},dispatchEvent:function(M,event){return this.getManager(M).dispatchEvent(M,event);
},fireEvent:function(N,O,P,Q){if(qx.core.Variant.isSet(l,k)){if(arguments.length>2&&P===undefined&&Q!==undefined){throw new Error("Create event of type "+O+" with undefined class. Please use null to explicit fallback to default event type!");
}var R=e+O+f+(N?N.classname:d)+h;
qx.core.Assert.assertNotUndefined(N,R+j);
qx.core.Assert.assertNotNull(N,R+j);
}var S=this.createEvent(O,P||null,Q);
return this.getManager(N).dispatchEvent(N,S);
},fireNonBubblingEvent:function(T,U,V,W){if(qx.core.Variant.isSet(l,k)){if(arguments.length>2&&V===undefined&&W!==undefined){throw new Error("Create event of type "+U+" with undefined class. Please use null to explicit fallback to default event type!");
}}var X=this.getManager(T);

if(!X.hasListener(T,U,false)){return true;
}var Y=this.createEvent(U,V||null,W);
return X.dispatchEvent(T,Y);
},PRIORITY_FIRST:-32000,PRIORITY_NORMAL:0,PRIORITY_LAST:32000,__bw:[],addHandler:function(ba){if(qx.core.Variant.isSet(l,k)){qx.core.Assert.assertInterface(ba,qx.event.IEventHandler,g);
}this.__bw.push(ba);
this.__bw.sort(function(a,b){return a.PRIORITY-b.PRIORITY;
});
},getHandlers:function(){return this.__bw;
},__bx:[],addDispatcher:function(bb,bc){if(qx.core.Variant.isSet(l,k)){qx.core.Assert.assertInterface(bb,qx.event.IEventDispatcher,i);
}this.__bx.push(bb);
this.__bx.sort(function(a,b){return a.PRIORITY-b.PRIORITY;
});
},getDispatchers:function(){return this.__bx;
}}});
})();
(function(){var a="qx.event.IEventDispatcher";
qx.Interface.define(a,{members:{canDispatchEvent:function(b,event,c){this.assertInstance(event,qx.event.type.Event);
this.assertString(c);
},dispatchEvent:function(d,event,e){this.assertInstance(event,qx.event.type.Event);
this.assertString(e);
}}});
})();
(function(){var c="qx.event.type.Data",b="qx.event.type.Event",a="qx.data.IListData";
qx.Interface.define(a,{events:{"change":c,"changeLength":b},members:{getItem:function(d){},setItem:function(e,f){},splice:function(g,h,i){},contains:function(j){},getLength:function(){},toArray:function(){}}});
})();
(function(){var a="qx.data.MBinding";
qx.Mixin.define(a,{members:{bind:function(b,c,d,e){return qx.data.SingleValueBinding.bind(this,b,c,d,e);
},removeBinding:function(f){qx.data.SingleValueBinding.removeBindingFromObject(this,f);
},removeAllBindings:function(){qx.data.SingleValueBinding.removeAllBindingsForObject(this);
},getBindings:function(){return qx.data.SingleValueBinding.getAllBindingsForObject(this);
}}});
})();
(function(){var a="qx.core.MAssert";
qx.Mixin.define(a,{members:{assert:function(b,c){qx.core.Assert.assert(b,c);
},fail:function(d){qx.core.Assert.fail(d);
},assertTrue:function(e,f){qx.core.Assert.assertTrue(e,f);
},assertFalse:function(g,h){qx.core.Assert.assertFalse(g,h);
},assertEquals:function(i,j,k){qx.core.Assert.assertEquals(i,j,k);
},assertNotEquals:function(l,m,n){qx.core.Assert.assertNotEquals(l,m,n);
},assertIdentical:function(o,p,q){qx.core.Assert.assertIdentical(o,p,q);
},assertNotIdentical:function(r,s,t){qx.core.Assert.assertNotIdentical(r,s,t);
},assertNotUndefined:function(u,v){qx.core.Assert.assertNotUndefined(u,v);
},assertUndefined:function(w,x){qx.core.Assert.assertUndefined(w,x);
},assertNotNull:function(y,z){qx.core.Assert.assertNotNull(y,z);
},assertNull:function(A,B){qx.core.Assert.assertNull(A,B);
},assertJsonEquals:function(C,D,E){qx.core.Assert.assertJsonEquals(C,D,E);
},assertMatch:function(F,G,H){qx.core.Assert.assertMatch(F,G,H);
},assertArgumentsCount:function(I,J,K,L){qx.core.Assert.assertArgumentsCount(I,J,K,L);
},assertEventFired:function(M,event,N,O,P){qx.core.Assert.assertEventFired(M,event,N,O,P);
},assertEventNotFired:function(Q,event,R,S){qx.core.Assert.assertEventNotFired(Q,event,R,S);
},assertException:function(T,U,V,W){qx.core.Assert.assertException(T,U,V,W);
},assertInArray:function(X,Y,ba){qx.core.Assert.assertInArray(X,Y,ba);
},assertArrayEquals:function(bb,bc,bd){qx.core.Assert.assertArrayEquals(bb,bc,bd);
},assertKeyInMap:function(be,bf,bg){qx.core.Assert.assertKeyInMap(be,bf,bg);
},assertFunction:function(bh,bi){qx.core.Assert.assertFunction(bh,bi);
},assertString:function(bj,bk){qx.core.Assert.assertString(bj,bk);
},assertBoolean:function(bl,bm){qx.core.Assert.assertBoolean(bl,bm);
},assertNumber:function(bn,bo){qx.core.Assert.assertNumber(bn,bo);
},assertPositiveNumber:function(bp,bq){qx.core.Assert.assertPositiveNumber(bp,bq);
},assertInteger:function(br,bs){qx.core.Assert.assertInteger(br,bs);
},assertPositiveInteger:function(bt,bu){qx.core.Assert.assertPositiveInteger(bt,bu);
},assertInRange:function(bv,bw,bx,by){qx.core.Assert.assertInRange(bv,bw,bx,by);
},assertObject:function(bz,bA){qx.core.Assert.assertObject(bz,bA);
},assertArray:function(bB,bC){qx.core.Assert.assertArray(bB,bC);
},assertMap:function(bD,bE){qx.core.Assert.assertMap(bD,bE);
},assertRegExp:function(bF,bG){qx.core.Assert.assertRegExp(bF,bG);
},assertType:function(bH,bI,bJ){qx.core.Assert.assertType(bH,bI,bJ);
},assertInstance:function(bK,bL,bM){qx.core.Assert.assertInstance(bK,bL,bM);
},assertInterface:function(bN,bO,bP){qx.core.Assert.assertInterface(bN,bO,bP);
},assertCssColor:function(bQ,bR,bS){qx.core.Assert.assertCssColor(bQ,bR,bS);
},assertElement:function(bT,bU){qx.core.Assert.assertElement(bT,bU);
},assertQxObject:function(bV,bW){qx.core.Assert.assertQxObject(bV,bW);
},assertQxWidget:function(bX,bY){qx.core.Assert.assertQxWidget(bX,bY);
}}});
})();
(function(){var a="qx.lang.RingBuffer";
qx.Class.define(a,{extend:Object,construct:function(b){this.setMaxEntries(b||50);
},members:{__bB:0,__bC:0,__bD:false,__bE:0,__bF:null,__bG:null,setMaxEntries:function(c){this.__bG=c;
this.clear();
},getMaxEntries:function(){return this.__bG;
},addEntry:function(d){this.__bF[this.__bB]=d;
this.__bB=this.__bH(this.__bB,1);
var e=this.getMaxEntries();

if(this.__bC<e){this.__bC++;
}if(this.__bD&&(this.__bE<e)){this.__bE++;
}},mark:function(){this.__bD=true;
this.__bE=0;
},clearMark:function(){this.__bD=false;
},getAllEntries:function(){return this.getEntries(this.getMaxEntries(),false);
},getEntries:function(f,g){if(f>this.__bC){f=this.__bC;
}if(g&&this.__bD&&(f>this.__bE)){f=this.__bE;
}
if(f>0){var i=this.__bH(this.__bB,-1);
var h=this.__bH(i,-f+1);
var j;

if(h<=i){j=this.__bF.slice(h,i+1);
}else{j=this.__bF.slice(h,this.__bC).concat(this.__bF.slice(0,i+1));
}}else{j=[];
}return j;
},clear:function(){this.__bF=new Array(this.getMaxEntries());
this.__bC=0;
this.__bE=0;
this.__bB=0;
},__bH:function(k,l){var m=this.getMaxEntries();
var n=(k+l)%m;
if(n<0){n+=m;
}return n;
}}});
})();
(function(){var a="qx.log.appender.RingBuffer";
qx.Class.define(a,{extend:qx.lang.RingBuffer,construct:function(b){this.setMaxMessages(b||50);
},members:{setMaxMessages:function(c){this.setMaxEntries(c);
},getMaxMessages:function(){return this.getMaxEntries();
},process:function(d){this.addEntry(d);
},getAllLogEvents:function(){return this.getAllEntries();
},retrieveLogEvents:function(e,f){return this.getEntries(e,f);
},clearHistory:function(){this.clear();
}}});
})();
(function(){var k="qx.debug",j="on",h="unknown",g="node",f="error",e="...(+",d="array",c=")",b="info",a="instance",J="string",I="null",H="class",G="number",F="stringify",E="]",D="date",C="function",B="boolean",A="debug",s="map",t="undefined",q="qx.log.Logger",r="[",o="#",p="warn",m="document",n="{...(",u="text[",v="[...(",x="\n",w=")}",z=")]",y="object";
qx.Class.define(q,{statics:{__bJ:A,setLevel:function(K){this.__bJ=K;
},getLevel:function(){return this.__bJ;
},setTreshold:function(L){this.__bM.setMaxMessages(L);
},getTreshold:function(){return this.__bM.getMaxMessages();
},__bK:{},__bL:0,register:function(M){if(M.$$id){return;
}var O=this.__bL++;
this.__bK[O]=M;
M.$$id=O;
var N=this.__bN;
var P=this.__bM.getAllLogEvents();

for(var i=0,l=P.length;i<l;i++){if(N[P[i].level]>=N[this.__bJ]){M.process(P[i]);
}}},unregister:function(Q){var R=Q.$$id;

if(R==null){return;
}delete this.__bK[R];
delete Q.$$id;
},debug:function(S,T){qx.log.Logger.__bO(A,arguments);
},info:function(U,V){qx.log.Logger.__bO(b,arguments);
},warn:function(W,X){qx.log.Logger.__bO(p,arguments);
},error:function(Y,ba){qx.log.Logger.__bO(f,arguments);
},trace:function(bb){qx.log.Logger.__bO(b,[bb,qx.dev.StackTrace.getStackTrace().join(x)]);
},deprecatedMethodWarning:function(bc,bd){if(qx.core.Variant.isSet(k,j)){var be=qx.lang.Function.getName(bc);
this.warn("The method '"+be+"' is deprecated: "+(bd||"Please consult the API documentation of this method for alternatives."));
this.trace();
}},deprecatedClassWarning:function(bf,bg){if(qx.core.Variant.isSet(k,j)){var bh=bf.classname||h;
this.warn("The class '"+bh+"' is deprecated: "+(bg||"Please consult the API documentation of this class for alternatives."));
this.trace();
}},deprecatedEventWarning:function(bi,event,bj){if(qx.core.Variant.isSet(k,j)){var bk=bi.self?bi.self.classname:h;
this.warn("The event '"+(event||"unknown")+"' from class '"+bk+"' is deprecated: "+(bj||"Please consult the API documentation of this class for alternatives."));
this.trace();
}},deprecatedMixinWarning:function(bl,bm){if(qx.core.Variant.isSet(k,j)){var bn=bl?bl.name:h;
this.warn("The mixin '"+bn+"' is deprecated: "+(bm||"Please consult the API documentation of this class for alternatives."));
this.trace();
}},deprecatedConstantWarning:function(bo,bp,bq){if(qx.core.Variant.isSet(k,j)){if(bo.__defineGetter__){var self=this;
var br=bo[bp];
bo.__defineGetter__(bp,function(){self.warn("The constant '"+bp+"' is deprecated: "+(bq||"Please consult the API documentation for alternatives."));
self.trace();
return br;
});
}}},deprecateMethodOverriding:function(bs,bt,bu,bv){if(qx.core.Variant.isSet(k,j)){var bw=bs.constructor;

while(bw.classname!==bt.classname){if(bw.prototype.hasOwnProperty(bu)){this.warn("The method '"+qx.lang.Function.getName(bs[bu])+"' overrides a deprecated method: "+(bv||"Please consult the API documentation for alternatives."));
this.trace();
break;
}bw=bw.superclass;
}}},clear:function(){this.__bM.clearHistory();
},__bM:new qx.log.appender.RingBuffer(50),__bN:{debug:0,info:1,warn:2,error:3},__bO:function(bx,by){var bD=this.__bN;

if(bD[bx]<bD[this.__bJ]){return;
}var bA=by.length<2?null:by[0];
var bC=bA?1:0;
var bz=[];

for(var i=bC,l=by.length;i<l;i++){bz.push(this.__bQ(by[i],true));
}var bE=new Date;
var bF={time:bE,offset:bE-qx.Bootstrap.LOADSTART,level:bx,items:bz,win:window};
if(bA){if(bA.$$hash!==undefined){bF.object=bA.$$hash;
}else if(bA.$$type){bF.clazz=bA;
}}this.__bM.process(bF);
var bG=this.__bK;

for(var bB in bG){bG[bB].process(bF);
}},__bP:function(bH){if(bH===undefined){return t;
}else if(bH===null){return I;
}
if(bH.$$type){return H;
}var bI=typeof bH;

if(bI===C||bI==J||bI===G||bI===B){return bI;
}else if(bI===y){if(bH.nodeType){return g;
}else if(bH.classname){return a;
}else if(bH instanceof Array){return d;
}else if(bH instanceof Error){return f;
}else if(bH instanceof Date){return D;
}else{return s;
}}
if(bH.toString){return F;
}return h;
},__bQ:function(bJ,bK){var bR=this.__bP(bJ);
var bN=h;
var bM=[];

switch(bR){case I:case t:bN=bR;
break;
case J:case G:case B:case D:bN=bJ;
break;
case g:if(bJ.nodeType===9){bN=m;
}else if(bJ.nodeType===3){bN=u+bJ.nodeValue+E;
}else if(bJ.nodeType===1){bN=bJ.nodeName.toLowerCase();

if(bJ.id){bN+=o+bJ.id;
}}else{bN=g;
}break;
case C:bN=qx.lang.Function.getName(bJ)||bR;
break;
case a:bN=bJ.basename+r+bJ.$$hash+E;
break;
case H:case F:bN=bJ.toString();
break;
case f:bM=qx.dev.StackTrace.getStackTraceFromError(bJ);
bN=bJ.toString();
break;
case d:if(bK){bN=[];

for(var i=0,l=bJ.length;i<l;i++){if(bN.length>20){bN.push(e+(l-i)+c);
break;
}bN.push(this.__bQ(bJ[i],false));
}}else{bN=v+bJ.length+z;
}break;
case s:if(bK){var bL;
var bQ=[];

for(var bP in bJ){bQ.push(bP);
}bQ.sort();
bN=[];

for(var i=0,l=bQ.length;i<l;i++){if(bN.length>20){bN.push(e+(l-i)+c);
break;
}bP=bQ[i];
bL=this.__bQ(bJ[bP],false);
bL.key=bP;
bN.push(bL);
}}else{var bO=0;

for(var bP in bJ){bO++;
}bN=n+bO+w;
}break;
}return {type:bR,text:bN,trace:bM};
}},defer:function(bS){var bT=qx.Bootstrap.$$logs;

for(var i=0;i<bT.length;i++){bS.__bO(bT[i][0],bT[i][1]);
}qx.Bootstrap.debug=bS.debug;
qx.Bootstrap.info=bS.info;
qx.Bootstrap.warn=bS.warn;
qx.Bootstrap.error=bS.error;
qx.Bootstrap.trace=bS.trace;
}});
})();
(function(){var u="qx.debug",t="on",s="qx.disposerDebugLevel",r="set",q="MSIE 6.0",p="rv:1.8.1",o="get",n="reset",m="info",k="qx.core.Object",c="error",j="warn",g="]",b="debug",a="[",f="$$user_",d="object",h="Object";
qx.Class.define(k,{extend:Object,include:[qx.data.MBinding],construct:function(){qx.core.ObjectRegistry.register(this);
},statics:{$$type:h},members:{toHashCode:function(){return this.$$hash;
},toString:function(){return this.classname+a+this.$$hash+g;
},base:function(v,w){if(qx.core.Variant.isSet(u,t)){if(!qx.Bootstrap.isFunction(v.callee.base)){throw new Error("Cannot call super class. Method is not derived: "+v.callee.displayName);
}}
if(arguments.length===1){return v.callee.base.call(this);
}else{return v.callee.base.apply(this,Array.prototype.slice.call(arguments,1));
}},self:function(x){return x.callee.self;
},clone:function(){var z=this.constructor;
var y=new z;
var B=qx.Class.getProperties(z);
var A=qx.core.Property.$$store.user;
var C=qx.core.Property.$$method.set;
var name;
for(var i=0,l=B.length;i<l;i++){name=B[i];

if(this.hasOwnProperty(A[name])){y[C[name]](this[A[name]]);
}}return y;
},set:function(D,E){var G=qx.core.Property.$$method.set;

if(qx.Bootstrap.isString(D)){if(!this[G[D]]){if(this[r+qx.Bootstrap.firstUp(D)]!=undefined){this[r+qx.Bootstrap.firstUp(D)](E);
return this;
}
if(qx.core.Variant.isSet(u,t)){qx.Bootstrap.error(new Error("No such property: "+D));
return this;
}}return this[G[D]](E);
}else{for(var F in D){if(!this[G[F]]){if(this[r+qx.Bootstrap.firstUp(F)]!=undefined){this[r+qx.Bootstrap.firstUp(F)](D[F]);
continue;
}
if(qx.core.Variant.isSet(u,t)){qx.Bootstrap.error(new Error("No such property: "+F));
return this;
}}this[G[F]](D[F]);
}return this;
}},get:function(H){var I=qx.core.Property.$$method.get;

if(!this[I[H]]){if(this[o+qx.Bootstrap.firstUp(H)]!=undefined){return this[o+qx.Bootstrap.firstUp(H)]();
}
if(qx.core.Variant.isSet(u,t)){qx.Bootstrap.error(new Error("No such property: "+H));
return this;
}}return this[I[H]]();
},reset:function(J){var K=qx.core.Property.$$method.reset;

if(!this[K[J]]){if(this[n+qx.Bootstrap.firstUp(J)]!=undefined){this[n+qx.Bootstrap.firstUp(J)]();
return;
}
if(qx.core.Variant.isSet(u,t)){qx.Bootstrap.error(new Error("No such property: "+J));
return;
}}this[K[J]]();
},__bR:qx.event.Registration,addListener:function(L,M,self,N){if(!this.$$disposed){return this.__bR.addListener(this,L,M,self,N);
}return null;
},addListenerOnce:function(O,P,self,Q){var R=function(e){this.removeListener(O,R,this,Q);
P.call(self||this,e);
};
return this.addListener(O,R,this,Q);
},removeListener:function(S,T,self,U){if(!this.$$disposed){return this.__bR.removeListener(this,S,T,self,U);
}return false;
},removeListenerById:function(V){if(!this.$$disposed){return this.__bR.removeListenerById(this,V);
}return false;
},hasListener:function(W,X){return this.__bR.hasListener(this,W,X);
},dispatchEvent:function(Y){if(!this.$$disposed){return this.__bR.dispatchEvent(this,Y);
}return true;
},fireEvent:function(ba,bb,bc){if(!this.$$disposed){return this.__bR.fireEvent(this,ba,bb,bc);
}return true;
},fireNonBubblingEvent:function(bd,be,bf){if(!this.$$disposed){return this.__bR.fireNonBubblingEvent(this,bd,be,bf);
}return true;
},fireDataEvent:function(bg,bh,bi,bj){if(!this.$$disposed){if(bi===undefined){bi=null;
}return this.__bR.fireNonBubblingEvent(this,bg,qx.event.type.Data,[bh,bi,!!bj]);
}return true;
},__bS:null,setUserData:function(bk,bl){if(!this.__bS){this.__bS={};
}this.__bS[bk]=bl;
},getUserData:function(bm){if(!this.__bS){return null;
}var bn=this.__bS[bm];
return bn===undefined?null:bn;
},__bT:qx.log.Logger,debug:function(bo){this.__bU(b,arguments);
},info:function(bp){this.__bU(m,arguments);
},warn:function(bq){this.__bU(j,arguments);
},error:function(br){this.__bU(c,arguments);
},trace:function(){this.__bT.trace(this);
},__bU:function(bs,bt){var bu=qx.lang.Array.fromArguments(bt);
bu.unshift(this);
this.__bT[bs].apply(this.__bT,bu);
},isDisposed:function(){return this.$$disposed||false;
},dispose:function(){if(this.$$disposed){return;
}this.$$disposed=true;
this.$$instance=null;
this.$$allowconstruct=null;
if(qx.core.Variant.isSet(u,t)){if(qx.core.Setting.get(s)>2){qx.Bootstrap.debug(this,"Disposing "+this.classname+"["+this.toHashCode()+"]");
}}var bx=this.constructor;
var bv;

while(bx.superclass){if(bx.$$destructor){bx.$$destructor.call(this);
}if(bx.$$includes){bv=bx.$$flatIncludes;

for(var i=0,l=bv.length;i<l;i++){if(bv[i].$$destructor){bv[i].$$destructor.call(this);
}}}bx=bx.superclass;
}if(this.__bV){this.__bV();
}if(qx.core.Variant.isSet(u,t)){if(qx.core.Setting.get(s)>0){var by,bw;

for(by in this){bw=this[by];
if(bw!==null&&typeof bw===d&&!(qx.Bootstrap.isString(bw))){if(this.constructor.prototype[by]!=null){continue;
}var bA=navigator.userAgent.indexOf(p)!=-1;
var bz=navigator.userAgent.indexOf(q)!=-1;
if(bA||bz){if(bw instanceof qx.core.Object||qx.core.Setting.get(s)>1){qx.Bootstrap.warn(this,"Missing destruct definition for '"+by+"' in "+this.classname+"["+this.toHashCode()+"]: "+bw);
delete this[by];
}}else{if(qx.core.Setting.get(s)>1){qx.Bootstrap.warn(this,"Missing destruct definition for '"+by+"' in "+this.classname+"["+this.toHashCode()+"]: "+bw);
delete this[by];
}}}}}}},__bV:null,__bW:function(){var bB=qx.Class.getProperties(this.constructor);

for(var i=0,l=bB.length;i<l;i++){delete this[f+bB[i]];
}},_disposeObjects:function(bC){qx.util.DisposeUtil.disposeObjects(this,arguments);
},_disposeSingletonObjects:function(bD){qx.util.DisposeUtil.disposeObjects(this,arguments,true);
},_disposeArray:function(bE){qx.util.DisposeUtil.disposeArray(this,bE);
},_disposeMap:function(bF){qx.util.DisposeUtil.disposeMap(this,bF);
}},settings:{"qx.disposerDebugLevel":0},defer:function(bG,bH){if(qx.core.Variant.isSet(u,t)){qx.Class.include(bG,qx.core.MAssert);
}var bJ=navigator.userAgent.indexOf(q)!=-1;
var bI=navigator.userAgent.indexOf(p)!=-1;
if(bJ||bI){bH.__bV=bH.__bW;
}},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){qx.event.Registration.removeAllListeners(this);
}else{qx.event.Registration.deleteAllListeners(this);
}qx.core.ObjectRegistry.unregister(this);
this.__bS=null;
var bM=this.constructor;
var bQ;
var bR=qx.core.Property.$$store;
var bO=bR.user;
var bP=bR.theme;
var bK=bR.inherit;
var bN=bR.useinit;
var bL=bR.init;

while(bM){bQ=bM.$$properties;

if(bQ){for(var name in bQ){if(bQ[name].dereference){this[bO[name]]=this[bP[name]]=this[bK[name]]=this[bN[name]]=this[bL[name]]=undefined;
}}}bM=bM.superclass;
}}});
})();
(function(){var c="on",b="qx.debug",a="qx.event.dispatch.Direct";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,construct:function(d){this._manager=d;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST},members:{canDispatchEvent:function(e,event,f){return !event.getBubbles();
},dispatchEvent:function(g,event,h){if(qx.core.Variant.isSet(b,c)){if(g instanceof qx.core.Object){var m=qx.Class.getEventType(g.constructor,h);
var j=qx.Class.getByName(m);

if(!j){this.error("The event type '"+h+"' declared in the class '"+g.constructor+" is not an available class': "+m);
}else if(!(event instanceof j)){this.error("Expected event type to be instanceof '"+m+"' but found '"+event.classname+"'");
}}}event.setEventPhase(qx.event.type.Event.AT_TARGET);
var n=this._manager.getListeners(g,h,false);

if(n){for(var i=0,l=n.length;i<l;i++){var k=n[i].context||g;
n[i].handler.call(k,event);
}}}},defer:function(o){qx.event.Registration.addDispatcher(o);
}});
})();
(function(){var a="qx.event.IEventHandler";
qx.Interface.define(a,{statics:{TARGET_DOMNODE:1,TARGET_WINDOW:2,TARGET_OBJECT:4,TARGET_DOCUMENT:8},members:{canHandleEvent:function(b,c){},registerEvent:function(d,e,f){},unregisterEvent:function(g,h,i){}}});
})();
(function(){var m="ready",l="qx.client",k="mshtml",j="load",i="unload",h="qx.event.handler.Application",g="complete",f="qx.application",d="gecko|opera|webkit",c="left",a="DOMContentLoaded",b="shutdown";
qx.Class.define(h,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(n){qx.core.Object.call(this);
this._window=n.getWindow();
this.__hz=false;
this.__hA=false;
this._initObserver();
qx.event.handler.Application.$$instance=this;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{ready:1,shutdown:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true,onScriptLoaded:function(){var o=qx.event.handler.Application.$$instance;

if(o){o.__hD();
}}},members:{canHandleEvent:function(p,q){},registerEvent:function(r,s,t){},unregisterEvent:function(u,v,w){},__hB:null,__hz:null,__hA:null,__hC:null,__hD:function(){if(!this.__hB&&this.__hz&&qx.$$loader.scriptLoaded){try{var x=qx.core.Setting.get(f);

if(!qx.Class.getByName(x)){return;
}}catch(e){}if(qx.core.Variant.isSet(l,k)){if(qx.event.Registration.hasListener(this._window,m)){this.__hB=true;
qx.event.Registration.fireEvent(this._window,m);
}}else{this.__hB=true;
qx.event.Registration.fireEvent(this._window,m);
}}},isApplicationReady:function(){return this.__hB;
},_initObserver:function(){if(qx.$$domReady||document.readyState==g||document.readyState==m){this.__hz=true;
this.__hD();
}else{this._onNativeLoadWrapped=qx.lang.Function.bind(this._onNativeLoad,this);

if(qx.core.Variant.isSet(l,d)){qx.bom.Event.addNativeListener(this._window,a,this._onNativeLoadWrapped);
}else if(qx.core.Variant.isSet(l,k)){var self=this;
var y=function(){try{document.documentElement.doScroll(c);

if(document.body){self._onNativeLoadWrapped();
}}catch(z){window.setTimeout(y,100);
}};
y();
}qx.bom.Event.addNativeListener(this._window,j,this._onNativeLoadWrapped);
}this._onNativeUnloadWrapped=qx.lang.Function.bind(this._onNativeUnload,this);
qx.bom.Event.addNativeListener(this._window,i,this._onNativeUnloadWrapped);
},_stopObserver:function(){if(this._onNativeLoadWrapped){qx.bom.Event.removeNativeListener(this._window,j,this._onNativeLoadWrapped);
}qx.bom.Event.removeNativeListener(this._window,i,this._onNativeUnloadWrapped);
this._onNativeLoadWrapped=null;
this._onNativeUnloadWrapped=null;
},_onNativeLoad:qx.event.GlobalError.observeMethod(function(){this.__hz=true;
this.__hD();
}),_onNativeUnload:qx.event.GlobalError.observeMethod(function(){if(!this.__hC){this.__hC=true;

try{qx.event.Registration.fireEvent(this._window,b);
}catch(e){throw e;
}finally{qx.core.ObjectRegistry.shutdown();
}}})},destruct:function(){this._stopObserver();
this._window=null;
},defer:function(A){qx.event.Registration.addHandler(A);
}});
})();
(function(){var a="qx.event.handler.Window";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(b){qx.core.Object.call(this);
this._manager=b;
this._window=b.getWindow();
this._initWindowObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{error:1,load:1,beforeunload:1,unload:1,resize:1,scroll:1,beforeshutdown:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(c,d){},registerEvent:function(f,g,h){},unregisterEvent:function(i,j,k){},_initWindowObserver:function(){this._onNativeWrapper=qx.lang.Function.listener(this._onNative,this);
var m=qx.event.handler.Window.SUPPORTED_TYPES;

for(var l in m){qx.bom.Event.addNativeListener(this._window,l,this._onNativeWrapper);
}},_stopWindowObserver:function(){var o=qx.event.handler.Window.SUPPORTED_TYPES;

for(var n in o){qx.bom.Event.removeNativeListener(this._window,n,this._onNativeWrapper);
}},_onNative:qx.event.GlobalError.observeMethod(function(e){if(this.isDisposed()){return;
}var q=this._window;

try{var t=q.document;
}catch(e){return ;
}var r=t.documentElement;
var p=qx.bom.Event.getTarget(e);

if(p==null||p===q||p===t||p===r){var event=qx.event.Registration.createEvent(e.type,qx.event.type.Native,[e,q]);
qx.event.Registration.dispatchEvent(q,event);
var s=event.getReturnValue();

if(s!=null){e.returnValue=s;
return s;
}}})},destruct:function(){this._stopWindowObserver();
this._manager=this._window=null;
},defer:function(u){qx.event.Registration.addHandler(u);
}});
})();
(function(){var f="ready",d="qx.application",c="beforeunload",b="qx.core.Init",a="shutdown";
qx.Class.define(b,{statics:{getApplication:function(){return this.__hE||null;
},ready:function(){if(this.__hE){return;
}
if(qx.bom.client.Engine.UNKNOWN_ENGINE){qx.log.Logger.warn("Could not detect engine!");
}
if(qx.bom.client.Engine.UNKNOWN_VERSION){qx.log.Logger.warn("Could not detect the version of the engine!");
}
if(qx.bom.client.Platform.UNKNOWN_PLATFORM){qx.log.Logger.warn("Could not detect platform!");
}
if(qx.bom.client.System.UNKNOWN_SYSTEM){qx.log.Logger.warn("Could not detect system!");
}qx.log.Logger.debug(this,"Load runtime: "+(new Date-qx.Bootstrap.LOADSTART)+"ms");
var h=qx.core.Setting.get(d);
var i=qx.Class.getByName(h);

if(i){this.__hE=new i;
var g=new Date;
this.__hE.main();
qx.log.Logger.debug(this,"Main runtime: "+(new Date-g)+"ms");
var g=new Date;
this.__hE.finalize();
qx.log.Logger.debug(this,"Finalize runtime: "+(new Date-g)+"ms");
}else{qx.log.Logger.warn("Missing application class: "+h);
}},__hF:function(e){var j=this.__hE;

if(j){e.setReturnValue(j.close());
}},__hG:function(){var k=this.__hE;

if(k){k.terminate();
}}},defer:function(l){qx.event.Registration.addListener(window,f,l.ready,l);
qx.event.Registration.addListener(window,a,l.__hG,l);
qx.event.Registration.addListener(window,c,l.__hF,l);
}});
})();
(function(){var a="qx.application.IApplication";
qx.Interface.define(a,{members:{main:function(){},finalize:function(){},close:function(){},terminate:function(){}}});
})();
(function(){var a="qx.locale.MTranslation";
qx.Mixin.define(a,{members:{tr:function(b,c){var d=qx.locale.Manager;

if(d){return d.tr.apply(d,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
},trn:function(e,f,g,h){var i=qx.locale.Manager;

if(i){return i.trn.apply(i,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
},trc:function(j,k,l){var m=qx.locale.Manager;

if(m){return m.trc.apply(m,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
},marktr:function(n){var o=qx.locale.Manager;

if(o){return o.marktr.apply(o,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
}}});
})();
(function(){var b="abstract",a="qx.application.AbstractGui";
qx.Class.define(a,{type:b,extend:qx.core.Object,implement:[qx.application.IApplication],include:qx.locale.MTranslation,members:{__sW:null,_createRootWidget:function(){throw new Error("Abstract method call");
},getRoot:function(){return this.__sW;
},main:function(){qx.theme.manager.Meta.getInstance().initialize();
qx.ui.tooltip.Manager.getInstance();
this.__sW=this._createRootWidget();
},finalize:function(){this.render();
},render:function(){qx.ui.core.queue.Manager.flush();
},close:function(c){},terminate:function(){}},destruct:function(){this.__sW=null;
}});
})();
(function(){var a="qx.application.Standalone";
qx.Class.define(a,{extend:qx.application.AbstractGui,members:{_createRootWidget:function(){return new qx.ui.root.Application(document);
}}});
})();
(function(){var g="demobrowser.Application",f="viewer",e="qx.debug",d="demobrowser/css/sourceview.css",c="script/demodata.json",b="on",a="demobrowser/css/style.css";
qx.Class.define(g,{extend:qx.application.Standalone,construct:function(){qx.application.Standalone.call(this);
qx.bom.Stylesheet.includeFile(a);
qx.bom.Stylesheet.includeFile(d);
},members:{main:function(){qx.application.Standalone.prototype.main.call(this);
if(qx.core.Variant.isSet(e,b)){qx.log.appender.Native;
qx.log.appender.Console;
}this.viewer=new demobrowser.DemoBrowser;
this.getRoot().add(this.viewer,{edge:0});
},finalize:function(){qx.application.Standalone.prototype.finalize.call(this);
this.viewer.dataLoader(c);
}},destruct:function(){this._disposeObjects(f);
}});
})();
(function(){var g="qx.debug",f="on",e="Cannot stop propagation on a non bubbling event: ",d="Invalid argument value 'cancelable'.",c="Cannot prevent default action on a non cancelable event: ",b="Invalid argument value 'canBubble'.",a="qx.event.type.Event";
qx.Class.define(a,{extend:qx.core.Object,statics:{CAPTURING_PHASE:1,AT_TARGET:2,BUBBLING_PHASE:3},members:{init:function(h,i){if(qx.core.Variant.isSet(g,f)){if(h!==undefined){qx.core.Assert.assertBoolean(h,b);
}
if(i!==undefined){qx.core.Assert.assertBoolean(i,d);
}}this._type=null;
this._target=null;
this._currentTarget=null;
this._relatedTarget=null;
this._originalTarget=null;
this._stopPropagation=false;
this._preventDefault=false;
this._bubbles=!!h;
this._cancelable=!!i;
this._timeStamp=(new Date()).getTime();
this._eventPhase=null;
return this;
},clone:function(j){if(j){var k=j;
}else{var k=qx.event.Pool.getInstance().getObject(this.constructor);
}k._type=this._type;
k._target=this._target;
k._currentTarget=this._currentTarget;
k._relatedTarget=this._relatedTarget;
k._originalTarget=this._originalTarget;
k._stopPropagation=this._stopPropagation;
k._bubbles=this._bubbles;
k._preventDefault=this._preventDefault;
k._cancelable=this._cancelable;
return k;
},stop:function(){if(this._bubbles){this.stopPropagation();
}
if(this._cancelable){this.preventDefault();
}},stopPropagation:function(){if(qx.core.Variant.isSet(g,f)){this.assertTrue(this._bubbles,e+this.getType());
}this._stopPropagation=true;
},getPropagationStopped:function(){return !!this._stopPropagation;
},preventDefault:function(){if(qx.core.Variant.isSet(g,f)){this.assertTrue(this._cancelable,c+this.getType());
}this._preventDefault=true;
},getDefaultPrevented:function(){return !!this._preventDefault;
},getType:function(){return this._type;
},setType:function(l){this._type=l;
},getEventPhase:function(){return this._eventPhase;
},setEventPhase:function(m){this._eventPhase=m;
},getTimeStamp:function(){return this._timeStamp;
},getTarget:function(){return this._target;
},setTarget:function(n){this._target=n;
},getCurrentTarget:function(){return this._currentTarget||this._target;
},setCurrentTarget:function(o){this._currentTarget=o;
},getRelatedTarget:function(){return this._relatedTarget;
},setRelatedTarget:function(p){this._relatedTarget=p;
},getOriginalTarget:function(){return this._originalTarget;
},setOriginalTarget:function(q){this._originalTarget=q;
},getBubbles:function(){return this._bubbles;
},setBubbles:function(r){this._bubbles=r;
},isCancelable:function(){return this._cancelable;
},setCancelable:function(s){this._cancelable=s;
}},destruct:function(){this._target=this._currentTarget=this._relatedTarget=this._originalTarget=null;
}});
})();
(function(){var a="qx.event.type.Data";
qx.Class.define(a,{extend:qx.event.type.Event,members:{__cd:null,__ce:null,init:function(b,c,d){qx.event.type.Event.prototype.init.call(this,false,d);
this.__cd=b;
this.__ce=c;
return this;
},clone:function(e){var f=qx.event.type.Event.prototype.clone.call(this,e);
f.__cd=this.__cd;
f.__ce=this.__ce;
return f;
},getData:function(){return this.__cd;
},getOldData:function(){return this.__ce;
}},destruct:function(){this.__cd=this.__ce=null;
}});
})();
(function(){var m="get",l="",k="[",h=".",g="last",f="change",d="]",c="Number",b="String",a="set",I="deepBinding",H="item",G="reset",F="qx.debug",E="' (",D="on",C="Boolean",B=") to the object '",A="Integer",z=" of object ",t="qx.event.type.Data",u="qx.data.SingleValueBinding",r="Binding property ",s="Can not remove the bindings for null object!",p="Binding from '",q="PositiveNumber",n=" not possible: No event available. ",o="PositiveInteger",v="Binding does not exist!",w=" is not an data (qx.event.type.Data) event on ",y=").",x="Date";
qx.Class.define(u,{statics:{DEBUG_ON:false,__cq:{},bind:function(J,K,L,M,N){var Y=this.__cs(J,K,L,M,N);
var T=K.split(h);
var P=this.__cy(T);
var X=[];
var U=[];
var V=[];
var R=[];
var S=J;
try{for(var i=0;i<T.length;i++){if(P[i]!==l){R.push(f);
}else{R.push(this.__ct(S,T[i]));
}X[i]=S;
if(i==T.length-1){if(P[i]!==l){var bd=P[i]===g?S.length-1:P[i];
var O=S.getItem(bd);
this.__cx(O,L,M,N,J);
V[i]=this.__cz(S,R[i],L,M,N,P[i]);
}else{if(T[i]!=null&&S[m+qx.lang.String.firstUp(T[i])]!=null){var O=S[m+qx.lang.String.firstUp(T[i])]();
this.__cx(O,L,M,N,J);
}V[i]=this.__cz(S,R[i],L,M,N);
}}else{var ba={index:i,propertyNames:T,sources:X,listenerIds:V,arrayIndexValues:P,targetObject:L,targetPropertyChain:M,options:N,listeners:U};
var W=qx.lang.Function.bind(this.__cr,this,ba);
U.push(W);
V[i]=S.addListener(R[i],W);
}if(S[m+qx.lang.String.firstUp(T[i])]==null){S=null;
}else if(P[i]!==l){S=S[m+qx.lang.String.firstUp(T[i])](P[i]);
}else{S=S[m+qx.lang.String.firstUp(T[i])]();
}
if(!S){break;
}}}catch(be){for(var i=0;i<X.length;i++){if(X[i]&&V[i]){X[i].removeListenerById(V[i]);
}}var bc=Y.targets;
var Q=Y.listenerIds[i];
for(var i=0;i<bc.length;i++){if(bc[i]&&Q[i]){bc[i].removeListenerById(Q[i]);
}}throw be;
}var bb={type:I,listenerIds:V,sources:X,targetListenerIds:Y.listenerIds,targets:Y.targets};
this.__cA(bb,J,K,L,M);
return bb;
},__cr:function(bf){if(bf.options&&bf.options.onUpdate){bf.options.onUpdate(bf.sources[bf.index],bf.targetObject);
}for(var j=bf.index+1;j<bf.propertyNames.length;j++){var bj=bf.sources[j];
bf.sources[j]=null;

if(!bj){continue;
}bj.removeListenerById(bf.listenerIds[j]);
}var bj=bf.sources[bf.index];
for(var j=bf.index+1;j<bf.propertyNames.length;j++){if(bf.arrayIndexValues[j-1]!==l){bj=bj[m+qx.lang.String.firstUp(bf.propertyNames[j-1])](bf.arrayIndexValues[j-1]);
}else{bj=bj[m+qx.lang.String.firstUp(bf.propertyNames[j-1])]();
}bf.sources[j]=bj;
if(!bj){this.__cu(bf.targetObject,bf.targetPropertyChain);
break;
}if(j==bf.propertyNames.length-1){if(qx.Class.implementsInterface(bj,qx.data.IListData)){var bk=bf.arrayIndexValues[j]===g?bj.length-1:bf.arrayIndexValues[j];
var bh=bj.getItem(bk);
this.__cx(bh,bf.targetObject,bf.targetPropertyChain,bf.options,bf.sources[bf.index]);
bf.listenerIds[j]=this.__cz(bj,f,bf.targetObject,bf.targetPropertyChain,bf.options,bf.arrayIndexValues[j]);
}else{if(bf.propertyNames[j]!=null&&bj[m+qx.lang.String.firstUp(bf.propertyNames[j])]!=null){var bh=bj[m+qx.lang.String.firstUp(bf.propertyNames[j])]();
this.__cx(bh,bf.targetObject,bf.targetPropertyChain,bf.options,bf.sources[bf.index]);
}var bi=this.__ct(bj,bf.propertyNames[j]);
bf.listenerIds[j]=this.__cz(bj,bi,bf.targetObject,bf.targetPropertyChain,bf.options);
}}else{if(bf.listeners[j]==null){var bg=qx.lang.Function.bind(this.__cr,this,bf);
bf.listeners.push(bg);
}if(qx.Class.implementsInterface(bj,qx.data.IListData)){var bi=f;
}else{var bi=this.__ct(bj,bf.propertyNames[j]);
}bf.listenerIds[j]=bj.addListener(bi,bf.listeners[j]);
}}},__cs:function(bl,bm,bn,bo,bp){var bt=bo.split(h);
var br=this.__cy(bt);
var by=[];
var bx=[];
var bv=[];
var bu=[];
var bs=bn;
for(var i=0;i<bt.length-1;i++){if(br[i]!==l){bu.push(f);
}else{try{bu.push(this.__ct(bs,bt[i]));
}catch(e){break;
}}by[i]=bs;
var bw=function(){for(var j=i+1;j<bt.length-1;j++){var bB=by[j];
by[j]=null;

if(!bB){continue;
}bB.removeListenerById(bv[j]);
}var bB=by[i];
for(var j=i+1;j<bt.length-1;j++){var bz=qx.lang.String.firstUp(bt[j-1]);
if(br[j-1]!==l){var bC=br[j-1]===g?bB.getLength()-1:br[j-1];
bB=bB[m+bz](bC);
}else{bB=bB[m+bz]();
}by[j]=bB;
if(bx[j]==null){bx.push(bw);
}if(qx.Class.implementsInterface(bB,qx.data.IListData)){var bA=f;
}else{try{var bA=qx.data.SingleValueBinding.__ct(bB,bt[j]);
}catch(e){break;
}}bv[j]=bB.addListener(bA,bx[j]);
}qx.data.SingleValueBinding.updateTarget(bl,bm,bn,bo,bp);
};
bx.push(bw);
bv[i]=bs.addListener(bu[i],bw);
var bq=qx.lang.String.firstUp(bt[i]);
if(bs[m+bq]==null){bs=null;
}else if(br[i]!==l){bs=bs[m+bq](br[i]);
}else{bs=bs[m+bq]();
}
if(!bs){break;
}}return {listenerIds:bv,targets:by};
},updateTarget:function(bD,bE,bF,bG,bH){var bL=this.__cw(bD,bE);

if(bL!=null){var bN=bE.substring(bE.lastIndexOf(h)+1,bE.length);
if(bN.charAt(bN.length-1)==d){var bI=bN.substring(bN.lastIndexOf(k)+1,bN.length-1);
var bK=bN.substring(0,bN.lastIndexOf(k));
var bM=bL[m+qx.lang.String.firstUp(bK)]();

if(bI==g){bI=bM.length-1;
}
if(bM!=null){var bJ=bM.getItem(bI);
}}else{var bJ=bL[m+qx.lang.String.firstUp(bN)]();
}}bJ=qx.data.SingleValueBinding.__cB(bJ,bF,bG,bH);
this.__cv(bF,bG,bJ);
},__ct:function(bO,bP){var bQ=this.__cC(bO,bP);
if(bQ==null){if(qx.Class.supportsEvent(bO.constructor,bP)){bQ=bP;
}else if(qx.Class.supportsEvent(bO.constructor,f+qx.lang.String.firstUp(bP))){bQ=f+qx.lang.String.firstUp(bP);
}else{throw new qx.core.AssertionError(r+bP+z+bO+n);
}}return bQ;
},__cu:function(bR,bS){var bT=this.__cw(bR,bS);

if(bT!=null){var bU=bS.substring(bS.lastIndexOf(h)+1,bS.length);
if(bU.charAt(bU.length-1)==d){this.__cv(bR,bS,null);
return;
}if(bT[G+qx.lang.String.firstUp(bU)]!=undefined){bT[G+qx.lang.String.firstUp(bU)]();
}else{bT[a+qx.lang.String.firstUp(bU)](null);
}}},__cv:function(bV,bW,bX){var cc=this.__cw(bV,bW);

if(cc!=null){var cd=bW.substring(bW.lastIndexOf(h)+1,bW.length);
if(cd.charAt(cd.length-1)==d){var bY=cd.substring(cd.lastIndexOf(k)+1,cd.length-1);
var cb=cd.substring(0,cd.lastIndexOf(k));
var ca=bV;

if(!qx.Class.implementsInterface(ca,qx.data.IListData)){ca=cc[m+qx.lang.String.firstUp(cb)]();
}
if(bY==g){bY=ca.length-1;
}
if(ca!=null){ca.setItem(bY,bX);
}}else{cc[a+qx.lang.String.firstUp(cd)](bX);
}}},__cw:function(ce,cf){var ci=cf.split(h);
var cj=ce;
for(var i=0;i<ci.length-1;i++){try{var ch=ci[i];
if(ch.indexOf(d)==ch.length-1){var cg=ch.substring(ch.indexOf(k)+1,ch.length-1);
ch=ch.substring(0,ch.indexOf(k));
}if(ch!=l){cj=cj[m+qx.lang.String.firstUp(ch)]();
}if(cg!=null){if(cg==g){cg=cj.length-1;
}cj=cj.getItem(cg);
cg=null;
}}catch(ck){return null;
}}return cj;
},__cx:function(cl,cm,cn,co,cp){cl=this.__cB(cl,cm,cn,co);
if(cl===undefined){this.__cu(cm,cn);
}if(cl!==undefined){try{this.__cv(cm,cn,cl);
if(co&&co.onUpdate){co.onUpdate(cp,cm,cl);
}}catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;
}
if(co&&co.onSetFail){co.onSetFail(e);
}else{qx.log.Logger.warn("Failed so set value "+cl+" on "+cm+". Error message: "+e);
}}}},__cy:function(cq){var cr=[];
for(var i=0;i<cq.length;i++){var name=cq[i];
if(qx.lang.String.endsWith(name,d)){var cs=name.substring(name.indexOf(k)+1,name.indexOf(d));
if(name.indexOf(d)!=name.length-1){throw new Error("Please use only one array at a time: "+name+" does not work.");
}
if(cs!==g){if(cs==l||isNaN(parseInt(cs,10))){throw new Error("No number or 'last' value hast been given"+" in an array binding: "+name+" does not work.");
}}if(name.indexOf(k)!=0){cq[i]=name.substring(0,name.indexOf(k));
cr[i]=l;
cr[i+1]=cs;
cq.splice(i+1,0,H);
i++;
}else{cr[i]=cs;
cq.splice(i,1,H);
}}else{cr[i]=l;
}}return cr;
},__cz:function(ct,cu,cv,cw,cx,cy){if(qx.core.Variant.isSet(F,D)){var cz=qx.Class.getEventType(ct.constructor,cu);
qx.core.Assert.assertEquals(t,cz,cu+w+ct+h);
}var cB=function(cC,e){if(cC!==l){if(cC===g){cC=ct.length-1;
}var cF=ct.getItem(cC);
if(cF===undefined){qx.data.SingleValueBinding.__cu(cv,cw);
}var cD=e.getData().start;
var cE=e.getData().end;

if(cC<cD||cC>cE){return;
}}else{var cF=e.getData();
}if(qx.data.SingleValueBinding.DEBUG_ON){qx.log.Logger.debug("Binding executed from "+ct+" by "+cu+" to "+cv+" ("+cw+")");
qx.log.Logger.debug("Data before conversion: "+cF);
}cF=qx.data.SingleValueBinding.__cB(cF,cv,cw,cx);
if(qx.data.SingleValueBinding.DEBUG_ON){qx.log.Logger.debug("Data after conversion: "+cF);
}try{if(cF!==undefined){qx.data.SingleValueBinding.__cv(cv,cw,cF);
}else{qx.data.SingleValueBinding.__cu(cv,cw);
}if(cx&&cx.onUpdate){cx.onUpdate(ct,cv,cF);
}}catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;
}
if(cx&&cx.onSetFail){cx.onSetFail(e);
}else{qx.log.Logger.warn("Failed so set value "+cF+" on "+cv+". Error message: "+e);
}}};
if(!cy){cy=l;
}cB=qx.lang.Function.bind(cB,ct,cy);
var cA=ct.addListener(cu,cB);
return cA;
},__cA:function(cG,cH,cI,cJ,cK){if(this.__cq[cH.toHashCode()]===undefined){this.__cq[cH.toHashCode()]=[];
}this.__cq[cH.toHashCode()].push([cG,cH,cI,cJ,cK]);
},__cB:function(cL,cM,cN,cO){if(cO&&cO.converter){var cQ;

if(cM.getModel){cQ=cM.getModel();
}return cO.converter(cL,cQ);
}else{var cS=this.__cw(cM,cN);
var cT=cN.substring(cN.lastIndexOf(h)+1,cN.length);
if(cS==null){return cL;
}var cR=qx.Class.getPropertyDefinition(cS.constructor,cT);
var cP=cR==null?l:cR.check;
return this.__cD(cL,cP);
}},__cC:function(cU,cV){var cW=qx.Class.getPropertyDefinition(cU.constructor,cV);

if(cW==null){return null;
}return cW.event;
},__cD:function(cX,cY){var da=qx.lang.Type.getClass(cX);
if((da==c||da==b)&&(cY==A||cY==o)){cX=parseInt(cX,10);
}if((da==C||da==c||da==x)&&cY==b){cX=cX+l;
}if((da==c||da==b)&&(cY==c||cY==q)){cX=parseFloat(cX);
}return cX;
},removeBindingFromObject:function(db,dc){if(dc.type==I){for(var i=0;i<dc.sources.length;i++){if(dc.sources[i]){dc.sources[i].removeListenerById(dc.listenerIds[i]);
}}for(var i=0;i<dc.targets.length;i++){if(dc.targets[i]){dc.targets[i].removeListenerById(dc.targetListenerIds[i]);
}}}else{db.removeListenerById(dc);
}var dd=this.__cq[db.toHashCode()];
if(dd!=undefined){for(var i=0;i<dd.length;i++){if(dd[i][0]==dc){qx.lang.Array.remove(dd,dd[i]);
return;
}}}throw new Error("Binding could not be found!");
},removeAllBindingsForObject:function(de){if(qx.core.Variant.isSet(F,D)){qx.core.Assert.assertNotNull(de,s);
}var df=this.__cq[de.toHashCode()];

if(df!=undefined){for(var i=df.length-1;i>=0;i--){this.removeBindingFromObject(de,df[i][0]);
}}},getAllBindingsForObject:function(dg){if(this.__cq[dg.toHashCode()]===undefined){this.__cq[dg.toHashCode()]=[];
}return this.__cq[dg.toHashCode()];
},removeAllBindings:function(){for(var di in this.__cq){var dh=qx.core.ObjectRegistry.fromHashCode(di);
if(dh==null){delete this.__cq[di];
continue;
}this.removeAllBindingsForObject(dh);
}this.__cq={};
},getAllBindings:function(){return this.__cq;
},showBindingInLog:function(dj,dk){var dm;
for(var i=0;i<this.__cq[dj.toHashCode()].length;i++){if(this.__cq[dj.toHashCode()][i][0]==dk){dm=this.__cq[dj.toHashCode()][i];
break;
}}
if(dm===undefined){var dl=v;
}else{var dl=p+dm[1]+E+dm[2]+B+dm[3]+E+dm[4]+y;
}qx.log.Logger.debug(dl);
},showAllBindingsInLog:function(){for(var dp in this.__cq){var dn=qx.core.ObjectRegistry.fromHashCode(dp);

for(var i=0;i<this.__cq[dp].length;i++){this.showBindingInLog(dn,this.__cq[dp][i][0]);
}}}}});
})();
(function(){var b="",a="qx.core.WindowError";
qx.Bootstrap.define(a,{extend:Error,construct:function(c,d,e){Error.call(this,c);
this.__cj=c;
this.__ck=d||b;
this.__cl=e===undefined?-1:e;
},members:{__cj:null,__ck:null,__cl:null,toString:function(){return this.__cj;
},getUri:function(){return this.__ck;
},getLineNumber:function(){return this.__cl;
}}});
})();
(function(){var a="qx.lang.Date";
qx.Class.define(a,{statics:{now:function(){return +new Date;
}}});
})();
(function(){var a="qx.core.ValidationError";
qx.Class.define(a,{extend:qx.type.BaseError});
})();
(function(){var b="qx.util.ObjectPool",a="Integer";
qx.Class.define(b,{extend:qx.core.Object,construct:function(c){qx.core.Object.call(this);
this.__cp={};

if(c!=null){this.setSize(c);
}},properties:{size:{check:a,init:Infinity}},members:{__cp:null,getObject:function(d){if(this.$$disposed){return new d;
}
if(!d){throw new Error("Class needs to be defined!");
}var e=null;
var f=this.__cp[d.classname];

if(f){e=f.pop();
}
if(e){e.$$pooled=false;
}else{e=new d;
}return e;
},poolObject:function(g){if(!this.__cp){return;
}var h=g.classname;
var j=this.__cp[h];

if(g.$$pooled){throw new Error("Object is already pooled: "+g);
}
if(!j){this.__cp[h]=j=[];
}if(j.length>this.getSize()){if(g.destroy){g.destroy();
}else{g.dispose();
}return;
}g.$$pooled=true;
j.push(g);
}},destruct:function(){var n=this.__cp;
var k,m,i,l;

for(k in n){m=n[k];

for(i=0,l=m.length;i<l;i++){m[i].dispose();
}}delete this.__cp;
}});
})();
(function(){var b="singleton",a="qx.event.Pool";
qx.Class.define(a,{extend:qx.util.ObjectPool,type:b,construct:function(){qx.util.ObjectPool.call(this,30);
}});
})();
(function(){var a="qx.util.DisposeUtil";
qx.Class.define(a,{statics:{disposeObjects:function(b,c,d){var name;

for(var i=0,l=c.length;i<l;i++){name=c[i];

if(b[name]==null||!b.hasOwnProperty(name)){continue;
}
if(!qx.core.ObjectRegistry.inShutDown){if(b[name].dispose){if(!d&&b[name].constructor.$$instance){throw new Error("The object stored in key "+name+" is a singleton! Please use disposeSingleton instead.");
}else{b[name].dispose();
}}else{throw new Error("Has no disposable object under key: "+name+"!");
}}b[name]=null;
}},disposeArray:function(e,f){var h=e[f];

if(!h){return;
}if(qx.core.ObjectRegistry.inShutDown){e[f]=null;
return;
}try{var g;

for(var i=h.length-1;i>=0;i--){g=h[i];

if(g){g.dispose();
}}}catch(j){throw new Error("The array field: "+f+" of object: "+e+" has non disposable entries: "+j);
}h.length=0;
e[f]=null;
},disposeMap:function(k,m){var o=k[m];

if(!o){return;
}if(qx.core.ObjectRegistry.inShutDown){k[m]=null;
return;
}try{var n;

for(var p in o){n=o[p];

if(o.hasOwnProperty(p)&&n){n.dispose();
}}}catch(q){throw new Error("The map field: "+m+" of object: "+k+" has non disposable entries: "+q);
}k[m]=null;
},disposeTriggeredBy:function(r,s){var t=s.dispose;
s.dispose=function(){t.call(s);
r.dispose();
};
}}});
})();
(function(){var a="qx.event.handler.Object";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST,SUPPORTED_TYPES:null,TARGET_CHECK:qx.event.IEventHandler.TARGET_OBJECT,IGNORE_CAN_HANDLE:false},members:{canHandleEvent:function(b,c){return qx.Class.supportsEvent(b.constructor,c);
},registerEvent:function(d,e,f){},unregisterEvent:function(g,h,i){}},defer:function(j){qx.event.Registration.addHandler(j);
}});
})();
(function(){var k="indexOf",j="lastIndexOf",h="slice",g="concat",f="join",e="toLocaleUpperCase",d="shift",c="substr",b="filter",a="unshift",I="match",H="quote",G="qx.lang.Generics",F="localeCompare",E="sort",D="some",C="charAt",B="split",A="substring",z="pop",t="toUpperCase",u="replace",q="push",r="charCodeAt",o="every",p="reverse",m="search",n="forEach",v="map",w="toLowerCase",y="splice",x="toLocaleLowerCase";
qx.Class.define(G,{statics:{__cG:{"Array":[f,p,E,q,z,d,a,y,g,h,k,j,n,v,b,D,o],"String":[H,A,w,t,C,r,k,j,x,e,F,I,m,u,B,c,g,h]},__cH:function(J,K){return function(s){return J.prototype[K].apply(s,Array.prototype.slice.call(arguments,1));
};
},__cI:function(){var L=qx.lang.Generics.__cG;

for(var P in L){var N=window[P];
var M=L[P];

for(var i=0,l=M.length;i<l;i++){var O=M[i];

if(!N[O]){N[O]=qx.lang.Generics.__cH(N,O);
}}}}},defer:function(Q){Q.__cI();
}});
})();
(function(){var a="qx.event.type.Native";
qx.Class.define(a,{extend:qx.event.type.Event,members:{init:function(b,c,d,e,f){qx.event.type.Event.prototype.init.call(this,e,f);
this._target=c||qx.bom.Event.getTarget(b);
this._relatedTarget=d||qx.bom.Event.getRelatedTarget(b);

if(b.timeStamp){this._timeStamp=b.timeStamp;
}this._native=b;
this._returnValue=null;
return this;
},clone:function(g){var h=qx.event.type.Event.prototype.clone.call(this,g);
var i={};
h._native=this._cloneNativeEvent(this._native,i);
h._returnValue=this._returnValue;
return h;
},_cloneNativeEvent:function(j,k){k.preventDefault=qx.lang.Function.empty;
return k;
},preventDefault:function(){qx.event.type.Event.prototype.preventDefault.call(this);
qx.bom.Event.preventDefault(this._native);
},getNativeEvent:function(){return this._native;
},setReturnValue:function(l){this._returnValue=l;
},getReturnValue:function(){return this._returnValue;
}},destruct:function(){this._native=this._returnValue=null;
}});
})();
(function(){var n="iPod",m="Win32",l="",k="Win64",j="Linux",i="BSD",h="Macintosh",g="iPhone",f="Windows",e="qx.bom.client.Platform",b="iPad",d="X11",c="MacIntel",a="MacPPC";
qx.Class.define(e,{statics:{NAME:"",WIN:false,MAC:false,UNIX:false,UNKNOWN_PLATFORM:false,__eo:function(){var o=navigator.platform;
if(o==null||o===l){o=navigator.userAgent;
}
if(o.indexOf(f)!=-1||o.indexOf(m)!=-1||o.indexOf(k)!=-1){this.WIN=true;
this.NAME="win";
}else if(o.indexOf(h)!=-1||o.indexOf(a)!=-1||o.indexOf(c)!=-1||o.indexOf(n)!=-1||o.indexOf(g)!=-1||o.indexOf(b)!=-1){this.MAC=true;
this.NAME="mac";
}else if(o.indexOf(d)!=-1||o.indexOf(j)!=-1||o.indexOf(i)!=-1){this.UNIX=true;
this.NAME="unix";
}else{this.UNKNOWN_PLATFORM=true;
this.WIN=true;
this.NAME="win";
}}},defer:function(p){p.__eo();
}});
})();
(function(){var j="win98",i="osx2",h="osx0",g="osx4",f="win95",e="win2000",d="osx1",c="osx5",b="osx3",a="Windows NT 5.01",I=")",H="winxp",G="freebsd",F="sunos",E="SV1",D="|",C="nintendods",B="winnt4",A="wince",z="winme",q="os9",r="\.",o="osx",p="linux",m="netbsd",n="winvista",k="openbsd",l="(",s="win2003",t="iPad",v="symbian",u="win7",x="g",w="qx.bom.client.System",y=" Mobile/";
qx.Bootstrap.define(w,{statics:{NAME:"",SP1:false,SP2:false,WIN95:false,WIN98:false,WINME:false,WINNT4:false,WIN2000:false,WINXP:false,WIN2003:false,WINVISTA:false,WIN7:false,WINCE:false,LINUX:false,SUNOS:false,FREEBSD:false,NETBSD:false,OPENBSD:false,OSX:false,OS9:false,SYMBIAN:false,NINTENDODS:false,PSP:false,IPHONE:false,IPAD:false,UNKNOWN_SYSTEM:false,__ep:{"Windows NT 6.1":u,"Windows NT 6.0":n,"Windows NT 5.2":s,"Windows NT 5.1":H,"Windows NT 5.0":e,"Windows 2000":e,"Windows NT 4.0":B,"Win 9x 4.90":z,"Windows CE":A,"Windows 98":j,"Win98":j,"Windows 95":f,"Win95":f,"Linux":p,"FreeBSD":G,"NetBSD":m,"OpenBSD":k,"SunOS":F,"Symbian System":v,"Nitro":C,"PSP":"sonypsp","Mac OS X 10_5":c,"Mac OS X 10.5":c,"Mac OS X 10_4":g,"Mac OS X 10.4":g,"Mac OS X 10_3":b,"Mac OS X 10.3":b,"Mac OS X 10_2":i,"Mac OS X 10.2":i,"Mac OS X 10_1":d,"Mac OS X 10.1":d,"Mac OS X 10_0":h,"Mac OS X 10.0":h,"Mac OS X":o,"Mac OS 9":q},__eq:function(){var L=navigator.userAgent;
var K=[];

for(var J in this.__ep){K.push(J);
}var M=new RegExp(l+K.join(D).replace(/\./g,r)+I,x);

if(!M.test(L)){this.UNKNOWN_SYSTEM=true;

if(!qx.bom.client.Platform.UNKNOWN_PLATFORM){if(qx.bom.client.Platform.UNIX){this.NAME="linux";
this.LINUX=true;
}else if(qx.bom.client.Platform.MAC){this.NAME="osx5";
this.OSX=true;
}else{this.NAME="winxp";
this.WINXP=true;
}}else{this.NAME="winxp";
this.WINXP=true;
}return;
}
if(qx.bom.client.Engine.WEBKIT&&RegExp(y).test(navigator.userAgent)){if(RegExp(t).test(navigator.userAgent)){this.IPAD=true;
this.NAME="ipad";
}else{this.IPHONE=true;
this.NAME="iphone";
}}else{this.NAME=this.__ep[RegExp.$1];
this[this.NAME.toUpperCase()]=true;

if(qx.bom.client.Platform.WIN){if(L.indexOf(a)!==-1){this.SP1=true;
}else if(qx.bom.client.Engine.MSHTML&&L.indexOf(E)!==-1){this.SP2=true;
}}}}},defer:function(N){N.__eq();
}});
})();
(function(){var f="_applyTheme",e="qx.theme",d="qx.theme.manager.Meta",c="qx.theme.Modern",b="Theme",a="singleton";
qx.Class.define(d,{type:a,extend:qx.core.Object,properties:{theme:{check:b,nullable:true,apply:f}},members:{_applyTheme:function(g,h){var k=null;
var n=null;
var q=null;
var r=null;
var m=null;

if(g){k=g.meta.color||null;
n=g.meta.decoration||null;
q=g.meta.font||null;
r=g.meta.icon||null;
m=g.meta.appearance||null;
}var o=qx.theme.manager.Color.getInstance();
var p=qx.theme.manager.Decoration.getInstance();
var i=qx.theme.manager.Font.getInstance();
var l=qx.theme.manager.Icon.getInstance();
var j=qx.theme.manager.Appearance.getInstance();
o.setTheme(k);
p.setTheme(n);
i.setTheme(q);
l.setTheme(r);
j.setTheme(m);
},initialize:function(){var t=qx.core.Setting;
var s,u;
s=t.get(e);

if(s){u=qx.Theme.getByName(s);

if(!u){throw new Error("The theme to use is not available: "+s);
}this.setTheme(u);
}}},settings:{"qx.theme":c}});
})();
(function(){var b="qx.util.ValueManager",a="abstract";
qx.Class.define(b,{type:a,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this._dynamic={};
},members:{_dynamic:null,resolveDynamic:function(c){return this._dynamic[c];
},isDynamic:function(d){return !!this._dynamic[d];
},resolve:function(e){if(e&&this._dynamic[e]){return this._dynamic[e];
}return e;
},_setDynamic:function(f){this._dynamic=f;
},_getDynamic:function(){return this._dynamic;
}},destruct:function(){this._dynamic=null;
}});
})();
(function(){var f="_applyTheme",e="qx.theme.manager.Color",d="Theme",c="changeTheme",b="string",a="singleton";
qx.Class.define(e,{type:a,extend:qx.util.ValueManager,properties:{theme:{check:d,nullable:true,apply:f,event:c}},members:{_applyTheme:function(g){var h={};

if(g){var i=g.colors;
var j=qx.util.ColorUtil;
var k;

for(var l in i){k=i[l];

if(typeof k===b){if(!j.isCssString(k)){throw new Error("Could not parse color: "+k);
}}else if(k instanceof Array){k=j.rgbToRgbString(k);
}else{throw new Error("Could not parse color: "+k);
}h[l]=k;
}}this._setDynamic(h);
},resolve:function(m){var p=this._dynamic;
var n=p[m];

if(n){return n;
}var o=this.getTheme();

if(o!==null&&o.colors[m]){return p[m]=o.colors[m];
}return m;
},isDynamic:function(q){var s=this._dynamic;

if(q&&(s[q]!==undefined)){return true;
}var r=this.getTheme();

if(r!==null&&q&&(r.colors[q]!==undefined)){s[q]=r.colors[q];
return true;
}return false;
}}});
})();
(function(){var h=",",e="rgb(",d=")",c="qx.theme.manager.Color",a="qx.util.ColorUtil";
qx.Class.define(a,{statics:{REGEXP:{hex3:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,rgb:/^rgb\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/,rgba:/^rgba\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/},SYSTEM:{activeborder:true,activecaption:true,appworkspace:true,background:true,buttonface:true,buttonhighlight:true,buttonshadow:true,buttontext:true,captiontext:true,graytext:true,highlight:true,highlighttext:true,inactiveborder:true,inactivecaption:true,inactivecaptiontext:true,infobackground:true,infotext:true,menu:true,menutext:true,scrollbar:true,threeddarkshadow:true,threedface:true,threedhighlight:true,threedlightshadow:true,threedshadow:true,window:true,windowframe:true,windowtext:true},NAMED:{black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255],transparent:[-1,-1,-1],magenta:[255,0,255],orange:[255,165,0],brown:[165,42,42]},isNamedColor:function(j){return this.NAMED[j]!==undefined;
},isSystemColor:function(k){return this.SYSTEM[k]!==undefined;
},supportsThemes:function(){return qx.Class.isDefined(c);
},isThemedColor:function(l){if(!this.supportsThemes()){return false;
}return qx.theme.manager.Color.getInstance().isDynamic(l);
},stringToRgb:function(m){if(this.supportsThemes()&&this.isThemedColor(m)){var m=qx.theme.manager.Color.getInstance().resolveDynamic(m);
}
if(this.isNamedColor(m)){return this.NAMED[m];
}else if(this.isSystemColor(m)){throw new Error("Could not convert system colors to RGB: "+m);
}else if(this.isRgbString(m)){return this.__iA();
}else if(this.isHex3String(m)){return this.__iC();
}else if(this.isHex6String(m)){return this.__iD();
}throw new Error("Could not parse color: "+m);
},cssStringToRgb:function(n){if(this.isNamedColor(n)){return this.NAMED[n];
}else if(this.isSystemColor(n)){throw new Error("Could not convert system colors to RGB: "+n);
}else if(this.isRgbString(n)){return this.__iA();
}else if(this.isRgbaString(n)){return this.__iB();
}else if(this.isHex3String(n)){return this.__iC();
}else if(this.isHex6String(n)){return this.__iD();
}throw new Error("Could not parse color: "+n);
},stringToRgbString:function(o){return this.rgbToRgbString(this.stringToRgb(o));
},rgbToRgbString:function(s){return e+s[0]+h+s[1]+h+s[2]+d;
},rgbToHexString:function(u){return (qx.lang.String.pad(u[0].toString(16).toUpperCase(),2)+qx.lang.String.pad(u[1].toString(16).toUpperCase(),2)+qx.lang.String.pad(u[2].toString(16).toUpperCase(),2));
},isValidPropertyValue:function(v){return this.isThemedColor(v)||this.isNamedColor(v)||this.isHex3String(v)||this.isHex6String(v)||this.isRgbString(v);
},isCssString:function(w){return this.isSystemColor(w)||this.isNamedColor(w)||this.isHex3String(w)||this.isHex6String(w)||this.isRgbString(w);
},isHex3String:function(x){return this.REGEXP.hex3.test(x);
},isHex6String:function(y){return this.REGEXP.hex6.test(y);
},isRgbString:function(z){return this.REGEXP.rgb.test(z);
},isRgbaString:function(A){return this.REGEXP.rgba.test(A);
},__iA:function(){var D=parseInt(RegExp.$1,10);
var C=parseInt(RegExp.$2,10);
var B=parseInt(RegExp.$3,10);
return [D,C,B];
},__iB:function(){var G=parseInt(RegExp.$1,10);
var F=parseInt(RegExp.$2,10);
var E=parseInt(RegExp.$3,10);
return [G,F,E];
},__iC:function(){var J=parseInt(RegExp.$1,16)*17;
var I=parseInt(RegExp.$2,16)*17;
var H=parseInt(RegExp.$3,16)*17;
return [J,I,H];
},__iD:function(){var M=(parseInt(RegExp.$1,16)*16)+parseInt(RegExp.$2,16);
var L=(parseInt(RegExp.$3,16)*16)+parseInt(RegExp.$4,16);
var K=(parseInt(RegExp.$5,16)*16)+parseInt(RegExp.$6,16);
return [M,L,K];
},hex3StringToRgb:function(N){if(this.isHex3String(N)){return this.__iC(N);
}throw new Error("Invalid hex3 value: "+N);
},hex6StringToRgb:function(O){if(this.isHex6String(O)){return this.__iD(O);
}throw new Error("Invalid hex6 value: "+O);
},hexStringToRgb:function(P){if(this.isHex3String(P)){return this.__iC(P);
}
if(this.isHex6String(P)){return this.__iD(P);
}throw new Error("Invalid hex value: "+P);
},rgbToHsb:function(Q){var S,T,V;
var bc=Q[0];
var Y=Q[1];
var R=Q[2];
var bb=(bc>Y)?bc:Y;

if(R>bb){bb=R;
}var U=(bc<Y)?bc:Y;

if(R<U){U=R;
}V=bb/255.0;

if(bb!=0){T=(bb-U)/bb;
}else{T=0;
}
if(T==0){S=0;
}else{var X=(bb-bc)/(bb-U);
var ba=(bb-Y)/(bb-U);
var W=(bb-R)/(bb-U);

if(bc==bb){S=W-ba;
}else if(Y==bb){S=2.0+X-W;
}else{S=4.0+ba-X;
}S=S/6.0;

if(S<0){S=S+1.0;
}}return [Math.round(S*360),Math.round(T*100),Math.round(V*100)];
},hsbToRgb:function(bd){var i,f,p,q,t;
var be=bd[0]/360;
var bf=bd[1]/100;
var bg=bd[2]/100;

if(be>=1.0){be%=1.0;
}
if(bf>1.0){bf=1.0;
}
if(bg>1.0){bg=1.0;
}var bh=Math.floor(255*bg);
var bi={};

if(bf==0.0){bi.red=bi.green=bi.blue=bh;
}else{be*=6.0;
i=Math.floor(be);
f=be-i;
p=Math.floor(bh*(1.0-bf));
q=Math.floor(bh*(1.0-(bf*f)));
t=Math.floor(bh*(1.0-(bf*(1.0-f))));

switch(i){case 0:bi.red=bh;
bi.green=t;
bi.blue=p;
break;
case 1:bi.red=q;
bi.green=bh;
bi.blue=p;
break;
case 2:bi.red=p;
bi.green=bh;
bi.blue=t;
break;
case 3:bi.red=p;
bi.green=q;
bi.blue=bh;
break;
case 4:bi.red=t;
bi.green=p;
bi.blue=bh;
break;
case 5:bi.red=bh;
bi.green=p;
bi.blue=q;
break;
}}return [bi.red,bi.green,bi.blue];
},randomColor:function(){var r=Math.round(Math.random()*255);
var g=Math.round(Math.random()*255);
var b=Math.round(Math.random()*255);
return this.rgbToRgbString([r,g,b]);
}}});
})();
(function(){var h="object",g="_applyTheme",f="__hH",e="qx.theme.manager.Decoration",d="Theme",c="changeTheme",b="string",a="singleton";
qx.Class.define(e,{type:a,extend:qx.core.Object,properties:{theme:{check:d,nullable:true,apply:g,event:c}},members:{__hH:null,resolve:function(i){if(!i){return null;
}
if(typeof i===h){return i;
}var l=this.getTheme();

if(!l){return null;
}var l=this.getTheme();

if(!l){return null;
}var m=this.__hH;

if(!m){m=this.__hH={};
}var j=m[i];

if(j){return j;
}var k=l.decorations[i];

if(!k){return null;
}var n=k.decorator;

if(n==null){throw new Error("Missing definition of which decorator to use in entry: "+i+"!");
}return m[i]=(new n).set(k.style);
},isValidPropertyValue:function(o){if(typeof o===b){return this.isDynamic(o);
}else if(typeof o===h){var p=o.constructor;
return qx.Class.hasInterface(p,qx.ui.decoration.IDecorator);
}return false;
},isDynamic:function(q){if(!q){return false;
}var r=this.getTheme();

if(!r){return false;
}return !!r.decorations[q];
},_applyTheme:function(s,t){var v=qx.util.AliasManager.getInstance();

if(t){for(var u in t.aliases){v.remove(u);
}}
if(s){for(var u in s.aliases){v.add(u,s.aliases[u]);
}}
if(!s){this.__hH={};
}}},destruct:function(){this._disposeMap(f);
}});
})();
(function(){var a="qx.ui.decoration.IDecorator";
qx.Interface.define(a,{members:{getMarkup:function(){},resize:function(b,c,d){},tint:function(e,f){},getInsets:function(){}}});
})();
(function(){var j="/",i="0",h="qx/static",g="http://",f="https://",e="file://",d="qx.util.AliasManager",c="singleton",b=".",a="static";
qx.Class.define(d,{type:c,extend:qx.util.ValueManager,construct:function(){qx.util.ValueManager.call(this);
this.__hI={};
this.add(a,h);
},members:{__hI:null,_preprocess:function(k){var n=this._getDynamic();

if(n[k]===false){return k;
}else if(n[k]===undefined){if(k.charAt(0)===j||k.charAt(0)===b||k.indexOf(g)===0||k.indexOf(f)===i||k.indexOf(e)===0){n[k]=false;
return k;
}
if(this.__hI[k]){return this.__hI[k];
}var m=k.substring(0,k.indexOf(j));
var l=this.__hI[m];

if(l!==undefined){n[k]=l+k.substring(m.length);
}}return k;
},add:function(o,p){this.__hI[o]=p;
var r=this._getDynamic();
for(var q in r){if(q.substring(0,q.indexOf(j))===o){r[q]=p+q.substring(o.length);
}}},remove:function(s){delete this.__hI[s];
},resolve:function(t){var u=this._getDynamic();

if(t!=null){t=this._preprocess(t);
}return u[t]||t;
}},destruct:function(){this.__hI=null;
}});
})();
(function(){var e="qx.theme.manager.Font",d="Theme",c="changeTheme",b="_applyTheme",a="singleton";
qx.Class.define(e,{type:a,extend:qx.util.ValueManager,properties:{theme:{check:d,nullable:true,apply:b,event:c}},members:{resolveDynamic:function(f){var g=this._dynamic;
return f instanceof qx.bom.Font?f:g[f];
},resolve:function(h){var k=this._dynamic;
var i=k[h];

if(i){return i;
}var j=this.getTheme();

if(j!==null&&j.fonts[h]){return k[h]=(new qx.bom.Font).set(j.fonts[h]);
}return h;
},isDynamic:function(l){var n=this._dynamic;

if(l&&(l instanceof qx.bom.Font||n[l]!==undefined)){return true;
}var m=this.getTheme();

if(m!==null&&l&&m.fonts[l]){n[l]=(new qx.bom.Font).set(m.fonts[l]);
return true;
}return false;
},__ka:function(o,p){if(o[p].include){var q=o[o[p].include];
o[p].include=null;
delete o[p].include;
o[p]=qx.lang.Object.mergeWith(o[p],q,false);
this.__ka(o,p);
}},_applyTheme:function(r){var s=this._getDynamic();

for(var v in s){if(s[v].themed){s[v].dispose();
delete s[v];
}}
if(r){var t=r.fonts;
var u=qx.bom.Font;

for(var v in t){if(t[v].include&&t[t[v].include]){this.__ka(t,v);
}s[v]=(new u).set(t[v]);
s[v].themed=true;
}}this._setDynamic(s);
}}});
})();
(function(){var k="",j="underline",h="Boolean",g="px",f='"',e="italic",d="normal",c="bold",b="_applyItalic",a="_applyBold",x="Integer",w="_applyFamily",v="_applyLineHeight",u="Array",t="overline",s="line-through",r="qx.bom.Font",q="Number",p="_applyDecoration",o=" ",m="_applySize",n=",";
qx.Class.define(r,{extend:qx.core.Object,construct:function(y,z){qx.core.Object.call(this);

if(y!==undefined){this.setSize(y);
}
if(z!==undefined){this.setFamily(z);
}},statics:{fromString:function(A){var E=new qx.bom.Font();
var C=A.split(/\s+/);
var name=[];
var D;

for(var i=0;i<C.length;i++){switch(D=C[i]){case c:E.setBold(true);
break;
case e:E.setItalic(true);
break;
case j:E.setDecoration(j);
break;
default:var B=parseInt(D,10);

if(B==D||qx.lang.String.contains(D,g)){E.setSize(B);
}else{name.push(D);
}break;
}}
if(name.length>0){E.setFamily(name);
}return E;
},fromConfig:function(F){var G=new qx.bom.Font;
G.set(F);
return G;
},__kb:{fontFamily:k,fontSize:k,fontWeight:k,fontStyle:k,textDecoration:k,lineHeight:1.2},getDefaultStyles:function(){return this.__kb;
}},properties:{size:{check:x,nullable:true,apply:m},lineHeight:{check:q,nullable:true,apply:v},family:{check:u,nullable:true,apply:w},bold:{check:h,nullable:true,apply:a},italic:{check:h,nullable:true,apply:b},decoration:{check:[j,s,t],nullable:true,apply:p}},members:{__kc:null,__kd:null,__ke:null,__kf:null,__kg:null,__kh:null,_applySize:function(H,I){this.__kc=H===null?null:H+g;
},_applyLineHeight:function(J,K){this.__kh=J===null?null:J;
},_applyFamily:function(L,M){var N=k;

for(var i=0,l=L.length;i<l;i++){if(L[i].indexOf(o)>0){N+=f+L[i]+f;
}else{N+=L[i];
}
if(i!==l-1){N+=n;
}}this.__kd=N;
},_applyBold:function(O,P){this.__ke=O===null?null:O?c:d;
},_applyItalic:function(Q,R){this.__kf=Q===null?null:Q?e:d;
},_applyDecoration:function(S,T){this.__kg=S===null?null:S;
},getStyles:function(){return {fontFamily:this.__kd,fontSize:this.__kc,fontWeight:this.__ke,fontStyle:this.__kf,textDecoration:this.__kg,lineHeight:this.__kh};
}}});
})();
(function(){var g="qx.bom.client.Feature",f="CSS1Compat",d="label",c="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",b="input",a="pointerEvents";
qx.Bootstrap.define(g,{statics:{STANDARD_MODE:false,QUIRKS_MODE:false,CONTENT_BOX:false,BORDER_BOX:false,SVG:false,CANVAS:!!window.CanvasRenderingContext2D,VML:false,XPATH:!!document.evaluate,AIR:navigator.userAgent.indexOf("adobeair")!==-1,GEARS:!!(window.google&&window.google.gears),SSL:window.location.protocol==="https:",ECMA_OBJECT_COUNT:(({}).__count__==0),CSS_POINTER_EVENTS:false,XUL:false,CSS_TEXT_OVERFLOW:("textOverflow" in document.documentElement.style||"OTextOverflow" in document.documentElement.style),HTML5_CLASSLIST:!!(document.documentElement.classList&&qx.Bootstrap.getClass(document.documentElement.classList)==="DOMTokenList"),TOUCH:("ontouchstart" in window),PLACEHOLDER:false,__dB:function(){this.QUIRKS_MODE=this.__dC();
this.STANDARD_MODE=!this.QUIRKS_MODE;
this.CONTENT_BOX=!qx.bom.client.Engine.MSHTML||this.STANDARD_MODE;
this.BORDER_BOX=!this.CONTENT_BOX;
this.SVG=document.implementation&&document.implementation.hasFeature&&(document.implementation.hasFeature("org.w3c.dom.svg","1.0")||document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1"));
this.VML=qx.bom.client.Engine.MSHTML;

try{document.createElementNS(c,d);
this.XUL=true;
}catch(e){this.XUL=false;
}var i=document.createElement(b);
this.PLACEHOLDER="placeholder" in i;
if(a in document.documentElement.style){if(qx.bom.client.Engine.OPERA||qx.bom.client.Engine.MSHTML){this.CSS_POINTER_EVENTS=false;
}else{this.CSS_POINTER_EVENTS=true;
}}},__dC:function(){if(qx.bom.client.Engine.MSHTML&&qx.bom.client.Engine.VERSION>=8){return qx.bom.client.Engine.DOCUMENT_MODE===5;
}else{return document.compatMode!==f;
}}},defer:function(h){h.__dB();
}});
})();
(function(){var m="qx.debug",k="on",j="Invalid argument 'map'",h="Invalid argument 'minLength'",g="Invalid argument 'source'",f="Invalid argument 'target'",e="function",d="Invalid argument 'array'",c="qx.lang.Object",b="undefined",a="object";
qx.Class.define(c,{statics:{empty:function(n){if(qx.core.Variant.isSet(m,k)){qx.core.Assert&&qx.core.Assert.assertMap(n,j);
}
for(var o in n){if(n.hasOwnProperty(o)){delete n[o];
}}},isEmpty:(qx.bom.client.Feature.ECMA_OBJECT_COUNT)?
function(p){if(qx.core.Variant.isSet(m,k)){qx.core.Assert&&qx.core.Assert.assertMap(p,j);
}return p.__count__===0;
}:
function(q){if(qx.core.Variant.isSet(m,k)){qx.core.Assert&&qx.core.Assert.assertMap(q,j);
}
for(var r in q){return false;
}return true;
},hasMinLength:(qx.bom.client.Feature.ECMA_OBJECT_COUNT)?
function(s,t){if(qx.core.Variant.isSet(m,k)){qx.core.Assert&&qx.core.Assert.assertMap(s,j);
qx.core.Assert&&qx.core.Assert.assertInteger(t,h);
}return s.__count__>=t;
}:
function(u,v){if(qx.core.Variant.isSet(m,k)){qx.core.Assert&&qx.core.Assert.assertMap(u,j);
qx.core.Assert&&qx.core.Assert.assertInteger(v,h);
}
if(v<=0){return true;
}var length=0;

for(var w in u){if((++length)>=v){return true;
}}return false;
},getLength:qx.Bootstrap.objectGetLength,getKeys:qx.Bootstrap.getKeys,getKeysAsString:qx.Bootstrap.getKeysAsString,getValues:function(x){if(qx.core.Variant.isSet(m,k)){qx.core.Assert&&qx.core.Assert.assertMap(x,j);
}var z=[];
var y=this.getKeys(x);

for(var i=0,l=y.length;i<l;i++){z.push(x[y[i]]);
}return z;
},mergeWith:qx.Bootstrap.objectMergeWith,carefullyMergeWith:function(A,B){if(qx.core.Variant.isSet(m,k)){qx.core.Assert&&qx.core.Assert.assertMap(A,f);
qx.core.Assert&&qx.core.Assert.assertMap(B,g);
}return qx.lang.Object.mergeWith(A,B,false);
},merge:function(C,D){if(qx.core.Variant.isSet(m,k)){qx.core.Assert&&qx.core.Assert.assertMap(C,f);
}var E=arguments.length;

for(var i=1;i<E;i++){qx.lang.Object.mergeWith(C,arguments[i]);
}return C;
},clone:function(F){if(qx.core.Variant.isSet(m,k)){qx.core.Assert&&qx.core.Assert.assertMap(F,g);
}var G={};

for(var H in F){G[H]=F[H];
}return G;
},invert:function(I){if(qx.core.Variant.isSet(m,k)){qx.core.Assert&&qx.core.Assert.assertMap(I,j);
}var J={};

for(var K in I){J[I[K].toString()]=K;
}return J;
},getKeyFromValue:function(L,M){if(qx.core.Variant.isSet(m,k)){qx.core.Assert&&qx.core.Assert.assertMap(L,j);
}
for(var N in L){if(L.hasOwnProperty(N)&&L[N]===M){return N;
}}return null;
},contains:function(O,P){if(qx.core.Variant.isSet(m,k)){qx.core.Assert&&qx.core.Assert.assertMap(O,j);
}return this.getKeyFromValue(O,P)!==null;
},select:function(Q,R){if(qx.core.Variant.isSet(m,k)){qx.core.Assert&&qx.core.Assert.assertMap(R,j);
}return R[Q];
},fromArray:function(S){if(qx.core.Variant.isSet(m,k)){qx.core.Assert&&qx.core.Assert.assertArray(S,d);
}var T={};

for(var i=0,l=S.length;i<l;i++){if(qx.core.Variant.isSet(m,k)){switch(typeof S[i]){case a:case e:case b:throw new Error("Could not convert complex objects like "+S[i]+" at array index "+i+" to map syntax");
}}T[S[i].toString()]=true;
}return T;
}}});
})();
(function(){var e="qx.theme.manager.Icon",d="Theme",c="changeTheme",b="_applyTheme",a="singleton";
qx.Class.define(e,{type:a,extend:qx.core.Object,properties:{theme:{check:d,nullable:true,apply:b,event:c}},members:{_applyTheme:function(f,g){var i=qx.util.AliasManager.getInstance();

if(g){for(var h in g.aliases){i.remove(h);
}}
if(f){for(var h in f.aliases){i.add(h,f.aliases[h]);
}}}}});
})();
(function(){var h="string",g="_applyTheme",f="qx.theme.manager.Appearance",e=":",d="Theme",c="changeTheme",b="/",a="singleton";
qx.Class.define(f,{type:a,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__iE={};
this.__iF={};
},properties:{theme:{check:d,nullable:true,event:c,apply:g}},members:{__iG:{},__iE:null,__iF:null,_applyTheme:function(j,k){this.__iF={};
this.__iE={};
},__iH:function(l,m,n){var s=m.appearances;
var v=s[l];

if(!v){var w=b;
var p=[];
var u=l.split(w);
var t;

while(!v&&u.length>0){p.unshift(u.pop());
var q=u.join(w);
v=s[q];

if(v){t=v.alias||v;

if(typeof t===h){var r=t+w+p.join(w);
return this.__iH(r,m,n);
}}}for(var i=0;i<p.length-1;i++){p.shift();
var q=p.join(w);
var o=this.__iH(q,m);

if(o){return o;
}}if(n!=null){return this.__iH(n,m);
}return null;
}else if(typeof v===h){return this.__iH(v,m,n);
}else if(v.include&&!v.style){return this.__iH(v.include,m,n);
}return l;
},styleFrom:function(x,y,z,A){if(!z){z=this.getTheme();
}var G=this.__iF;
var B=G[x];

if(!B){B=G[x]=this.__iH(x,z,A);
}var L=z.appearances[B];

if(!L){this.warn("Missing appearance: "+x);
return null;
}if(!L.style){return null;
}var M=B;

if(y){var N=L.$$bits;

if(!N){N=L.$$bits={};
L.$$length=0;
}var E=0;

for(var H in y){if(!y[H]){continue;
}
if(N[H]==null){N[H]=1<<L.$$length++;
}E+=N[H];
}if(E>0){M+=e+E;
}}var F=this.__iE;

if(F[M]!==undefined){return F[M];
}if(!y){y=this.__iG;
}var J;
if(L.include||L.base){var D=L.style(y);
var C;

if(L.include){C=this.styleFrom(L.include,y,z,A);
}J={};
if(L.base){var I=this.styleFrom(B,y,L.base,A);

if(L.include){for(var K in I){if(!C.hasOwnProperty(K)&&!D.hasOwnProperty(K)){J[K]=I[K];
}}}else{for(var K in I){if(!D.hasOwnProperty(K)){J[K]=I[K];
}}}}if(L.include){for(var K in C){if(!D.hasOwnProperty(K)){J[K]=C[K];
}}}for(var K in D){J[K]=D[K];
}}else{J=L.style(y);
}return F[M]=J||null;
}},destruct:function(){this.__iE=this.__iF=null;
}});
})();
(function(){var u="object",t="qx.debug",s="Theme",r="widgets",q="undefined",p="fonts",o="string",n="colors",m="decorations",k="on",d="meta",j="appearances",g="borders",c="icons",b="other",f="qx.Theme",e="]",h="[Theme ";
qx.Bootstrap.define(f,{statics:{define:function(name,v){if(!v){var v={};
}v.include=this.__sM(v.include);
v.patch=this.__sM(v.patch);
if(qx.core.Variant.isSet(t,k)){this.__sT(name,v);
}var w={$$type:s,name:name,title:v.title,toString:this.genericToString};
if(v.extend){w.supertheme=v.extend;
}w.basename=qx.Bootstrap.createNamespace(name,w);
this.__sP(w,v);
this.__sN(w,v);
this.$$registry[name]=w;
for(var i=0,a=v.include,l=a.length;i<l;i++){this.include(w,a[i]);
}
for(var i=0,a=v.patch,l=a.length;i<l;i++){this.patch(w,a[i]);
}},__sM:function(x){if(!x){return [];
}
if(qx.Bootstrap.isArray(x)){return x;
}else{return [x];
}},__sN:function(y,z){var A=z.aliases||{};

if(z.extend&&z.extend.aliases){qx.Bootstrap.objectMergeWith(A,z.extend.aliases,false);
}y.aliases=A;
},getAll:function(){return this.$$registry;
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},genericToString:function(){return h+this.name+e;
},__sO:function(B){for(var i=0,C=this.__sQ,l=C.length;i<l;i++){if(B[C[i]]){return C[i];
}}},__sP:function(D,E){var H=this.__sO(E);
if(E.extend&&!H){H=E.extend.type;
}D.type=H||b;
if(!H){return;
}var J=function(){};
if(E.extend){J.prototype=new E.extend.$$clazz;
}var I=J.prototype;
var G=E[H];
for(var F in G){I[F]=G[F];
if(I[F].base){if(qx.core.Variant.isSet(t,k)){if(!E.extend){throw new Error("Found base flag in entry '"+F+"' of theme '"+E.name+"'. Base flags are not allowed for themes without a valid super theme!");
}}I[F].base=E.extend;
}}D.$$clazz=J;
D[H]=new J;
},$$registry:{},__sQ:[n,g,m,p,c,r,j,d],__sR:qx.core.Variant.select(t,{"on":{"title":o,"aliases":u,"type":o,"extend":u,"colors":u,"borders":u,"decorations":u,"fonts":u,"icons":u,"widgets":u,"appearances":u,"meta":u,"include":u,"patch":u},"default":null}),__sS:qx.core.Variant.select(t,{"on":{"color":u,"border":u,"decoration":u,"font":u,"icon":u,"appearance":u,"widget":u},"default":null}),__sT:qx.core.Variant.select(t,{"on":function(name,K){var P=this.__sR;

for(var O in K){if(P[O]===undefined){throw new Error('The configuration key "'+O+'" in theme "'+name+'" is not allowed!');
}
if(K[O]==null){throw new Error('Invalid key "'+O+'" in theme "'+name+'"! The value is undefined/null!');
}
if(P[O]!==null&&typeof K[O]!==P[O]){throw new Error('Invalid type of key "'+O+'" in theme "'+name+'"! The type of the key must be "'+P[O]+'"!');
}}var N=[n,g,m,p,c,r,j,d];

for(var i=0,l=N.length;i<l;i++){var O=N[i];

if(K[O]!==undefined&&(K[O] instanceof Array||K[O] instanceof RegExp||K[O] instanceof Date||K[O].classname!==undefined)){throw new Error('Invalid key "'+O+'" in theme "'+name+'"! The value needs to be a map!');
}}var L=0;

for(var i=0,l=N.length;i<l;i++){var O=N[i];

if(K[O]){L++;
}
if(L>1){throw new Error("You can only define one theme category per file! Invalid theme: "+name);
}}if(!K.extend&&L===0){throw new Error("You must define at least one entry in your theme configuration :"+name);
}if(K.meta){var M;

for(var O in K.meta){M=K.meta[O];

if(this.__sS[O]===undefined){throw new Error('The key "'+O+'" is not allowed inside a meta theme block.');
}
if(typeof M!==this.__sS[O]){throw new Error('The type of the key "'+O+'" inside the meta block is wrong.');
}
if(!(typeof M===u&&M!==null&&M.$$type===s)){throw new Error('The content of a meta theme must reference to other themes. The value for "'+O+'" in theme "'+name+'" is invalid: '+M);
}}}if(K.extend&&K.extend.$$type!==s){throw new Error('Invalid extend in theme "'+name+'": '+K.extend);
}if(K.include){for(var i=0,l=K.include.length;i<l;i++){if(typeof (K.include[i])==q||K.include[i].$$type!==s){throw new Error('Invalid include in theme "'+name+'": '+K.include[i]);
}}}if(K.patch){for(var i=0,l=K.patch.length;i<l;i++){if(typeof (K.patch[i])==q||K.patch[i].$$type!==s){throw new Error('Invalid patch in theme "'+name+'": '+K.patch[i]);
}}}},"default":function(){}}),patch:function(Q,R){var T=this.__sO(R);

if(T!==this.__sO(Q)){throw new Error("The mixins '"+Q.name+"' are not compatible '"+R.name+"'!");
}var S=R[T];
var U=Q.$$clazz.prototype;

for(var V in S){U[V]=S[V];
}},include:function(W,X){var ba=X.type;

if(ba!==W.type){throw new Error("The mixins '"+W.name+"' are not compatible '"+X.name+"'!");
}var Y=X[ba];
var bb=W.$$clazz.prototype;

for(var bc in Y){if(bb[bc]!==undefined){continue;
}bb[bc]=Y[bc];
}}}});
})();
(function(){var p="Boolean",o="focusout",n="interval",m="mouseover",l="mouseout",k="mousemove",j="widget",i="__sX",h="qx.ui.tooltip.ToolTip",g="__tb",c="_applyCurrent",f="qx.ui.tooltip.Manager",d="__sY",b="tooltip-error",a="singleton";
qx.Class.define(f,{type:a,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
qx.event.Registration.addListener(document.body,m,this.__ti,this,true);
this.__sX=new qx.event.Timer();
this.__sX.addListener(n,this.__tf,this);
this.__sY=new qx.event.Timer();
this.__sY.addListener(n,this.__tg,this);
this.__ta={left:0,top:0};
},properties:{current:{check:h,nullable:true,apply:c},showInvalidToolTips:{check:p,init:true},showToolTips:{check:p,init:true}},members:{__ta:null,__sY:null,__sX:null,__tb:null,__tc:null,__td:function(){if(!this.__tb){this.__tb=new qx.ui.tooltip.ToolTip().set({rich:true});
}return this.__tb;
},__te:function(){if(!this.__tc){this.__tc=new qx.ui.tooltip.ToolTip().set({appearance:b});
this.__tc.syncAppearance();
}return this.__tc;
},_applyCurrent:function(q,r){if(r&&qx.ui.core.Widget.contains(r,q)){return;
}if(r){if(!r.isDisposed()){r.exclude();
}this.__sX.stop();
this.__sY.stop();
}var t=qx.event.Registration;
var s=document.body;
if(q){this.__sX.startWith(q.getShowTimeout());
t.addListener(s,l,this.__tj,this,true);
t.addListener(s,o,this.__tk,this,true);
t.addListener(s,k,this.__th,this,true);
}else{t.removeListener(s,l,this.__tj,this,true);
t.removeListener(s,o,this.__tk,this,true);
t.removeListener(s,k,this.__th,this,true);
}},__tf:function(e){var u=this.getCurrent();

if(u&&!u.isDisposed()){this.__sY.startWith(u.getHideTimeout());

if(u.getPlaceMethod()==j){u.placeToWidget(u.getOpener());
}else{u.placeToPoint(this.__ta);
}u.show();
}this.__sX.stop();
},__tg:function(e){var v=this.getCurrent();

if(v&&!v.isDisposed()){v.exclude();
}this.__sY.stop();
this.resetCurrent();
},__th:function(e){var w=this.__ta;
w.left=e.getDocumentLeft();
w.top=e.getDocumentTop();
},__ti:function(e){var z=qx.ui.core.Widget.getWidgetByElement(e.getTarget());

if(!z){return;
}var A,B,y,x;
while(z!=null){A=z.getToolTip();
B=z.getToolTipText()||null;
y=z.getToolTipIcon()||null;

if(qx.Class.hasInterface(z.constructor,qx.ui.form.IForm)&&!z.isValid()){x=z.getInvalidMessage();
}
if(A||B||y||x){break;
}z=z.getLayoutParent();
}if(!z||
!z.getEnabled()||
z.isBlockToolTip()||
(!x&&!this.getShowToolTips())||(x&&!this.getShowInvalidToolTips())){return;
}
if(x){A=this.__te().set({label:x});
}
if(!A){A=this.__td().set({label:B,icon:y});
}this.setCurrent(A);
A.setOpener(z);
},__tj:function(e){var C=qx.ui.core.Widget.getWidgetByElement(e.getTarget());

if(!C){return;
}var D=qx.ui.core.Widget.getWidgetByElement(e.getRelatedTarget());

if(!D){return;
}var E=this.getCurrent();
if(E&&(D==E||qx.ui.core.Widget.contains(E,D))){return;
}if(D&&C&&qx.ui.core.Widget.contains(C,D)){return;
}if(E&&!D){this.setCurrent(null);
}else{this.resetCurrent();
}},__tk:function(e){var F=qx.ui.core.Widget.getWidgetByElement(e.getTarget());

if(!F){return;
}var G=this.getCurrent();
if(G&&G==F.getToolTip()){this.setCurrent(null);
}}},destruct:function(){qx.event.Registration.removeListener(document.body,m,this.__ti,this,true);
this._disposeObjects(i,d,g);
this.__ta=null;
}});
})();
(function(){var l="interval",k="qx.event.Timer",j="_applyInterval",i="func is not a function",h="Boolean",g="qx.debug",f="No timeout given",d="Integer",c="qx.event.type.Event",b="on",a="_applyEnabled";
qx.Class.define(k,{extend:qx.core.Object,construct:function(m){qx.core.Object.call(this);
this.setEnabled(false);

if(m!=null){this.setInterval(m);
}var self=this;
this.__gg=function(){self._oninterval.call(self);
};
},events:{"interval":c},statics:{once:function(n,o,p){if(qx.core.Variant.isSet(g,b)){qx.core.Assert.assertFunction(n,i);
qx.core.Assert.assertNotUndefined(p,f);
}var q=new qx.event.Timer(p);
q.__gh=n;
q.addListener(l,function(e){q.stop();
n.call(o,e);
q.dispose();
o=null;
},o);
q.start();
return q;
}},properties:{enabled:{init:true,check:h,apply:a},interval:{check:d,init:1000,apply:j}},members:{__gi:null,__gg:null,_applyInterval:function(r,s){if(this.getEnabled()){this.restart();
}},_applyEnabled:function(t,u){if(u){window.clearInterval(this.__gi);
this.__gi=null;
}else if(t){this.__gi=window.setInterval(this.__gg,this.getInterval());
}},start:function(){this.setEnabled(true);
},startWith:function(v){this.setInterval(v);
this.start();
},stop:function(){this.setEnabled(false);
},restart:function(){this.stop();
this.start();
},restartWith:function(w){this.stop();
this.startWith(w);
},_oninterval:qx.event.GlobalError.observeMethod(function(){if(this.$$disposed){return;
}
if(this.getEnabled()){this.fireEvent(l);
}})},destruct:function(){if(this.__gi){window.clearInterval(this.__gi);
}this.__gi=this.__gg=null;
}});
})();
(function(){var j="Integer",i="interval",h="keep-align",g="disappear",f="best-fit",e="mouse",d="bottom-left",c="direct",b="Boolean",a="bottom-right",x="widget",w="qx.ui.core.MPlacement",v="left-top",u="offsetRight",t="shorthand",s="offsetLeft",r="top-left",q="appear",p="offsetBottom",o="top-right",m="offsetTop",n="right-bottom",k="right-top",l="left-bottom";
qx.Mixin.define(w,{statics:{__iX:null,setVisibleElement:function(y){this.__iX=y;
},getVisibleElement:function(){return this.__iX;
}},properties:{position:{check:[r,o,d,a,v,l,k,n],init:d,themeable:true},placeMethod:{check:[x,e],init:e,themeable:true},domMove:{check:b,init:false},placementModeX:{check:[c,h,f],init:h,themeable:true},placementModeY:{check:[c,h,f],init:h,themeable:true},offsetLeft:{check:j,init:0,themeable:true},offsetTop:{check:j,init:0,themeable:true},offsetRight:{check:j,init:0,themeable:true},offsetBottom:{check:j,init:0,themeable:true},offset:{group:[m,u,p,s],mode:t,themeable:true}},members:{__iY:null,__ja:null,__jb:null,getLayoutLocation:function(z){var C,B,D,top;
B=z.getBounds();
D=B.left;
top=B.top;
var E=B;
z=z.getLayoutParent();

while(z&&!z.isRootWidget()){B=z.getBounds();
D+=B.left;
top+=B.top;
C=z.getInsets();
D+=C.left;
top+=C.top;
z=z.getLayoutParent();
}if(z.isRootWidget()){var A=z.getContainerLocation();

if(A){D+=A.left;
top+=A.top;
}}return {left:D,top:top,right:D+E.width,bottom:top+E.height};
},moveTo:function(F,top){var H=qx.ui.core.MPlacement.getVisibleElement();
if(H){var J=this.getBounds();
var G=H.getContentLocation();
if(J&&G){var K=top+J.height;
var I=F+J.width;
if((I>G.left&&F<G.right)&&(K>G.top&&top<G.bottom)){F=Math.max(G.left-J.width,0);
}}}
if(this.getDomMove()){this.setDomPosition(F,top);
}else{this.setLayoutProperties({left:F,top:top});
}},placeToWidget:function(L,M){if(M){this.__jc();
this.__iY=qx.lang.Function.bind(this.placeToWidget,this,L,false);
qx.event.Idle.getInstance().addListener(i,this.__iY);
this.__jb=function(){this.__jc();
};
this.addListener(g,this.__jb,this);
}var N=L.getContainerLocation()||this.getLayoutLocation(L);
this.__je(N);
},__jc:function(){if(this.__iY){qx.event.Idle.getInstance().removeListener(i,this.__iY);
this.__iY=null;
}
if(this.__jb){this.removeListener(g,this.__jb,this);
this.__jb=null;
}},placeToMouse:function(event){var P=event.getDocumentLeft();
var top=event.getDocumentTop();
var O={left:P,top:top,right:P,bottom:top};
this.__je(O);
},placeToElement:function(Q,R){var location=qx.bom.element.Location.get(Q);
var S={left:location.left,top:location.top,right:location.left+Q.offsetWidth,bottom:location.top+Q.offsetHeight};
if(R){this.__iY=qx.lang.Function.bind(this.placeToElement,this,Q,false);
qx.event.Idle.getInstance().addListener(i,this.__iY);
this.addListener(g,function(){if(this.__iY){qx.event.Idle.getInstance().removeListener(i,this.__iY);
this.__iY=null;
}},this);
}this.__je(S);
},placeToPoint:function(T){var U={left:T.left,top:T.top,right:T.left,bottom:T.top};
this.__je(U);
},_getPlacementOffsets:function(){return {left:this.getOffsetLeft(),top:this.getOffsetTop(),right:this.getOffsetRight(),bottom:this.getOffsetBottom()};
},__jd:function(V){var W=null;

if(this._computePlacementSize){var W=this._computePlacementSize();
}else if(this.isVisible()){var W=this.getBounds();
}
if(W==null){this.addListenerOnce(q,function(){this.__jd(V);
},this);
}else{V.call(this,W);
}},__je:function(X){this.__jd(function(Y){var ba=qx.util.placement.Placement.compute(Y,this.getLayoutParent().getBounds(),X,this._getPlacementOffsets(),this.getPosition(),this.getPlacementModeX(),this.getPlacementModeY());
this.moveTo(ba.left,ba.top);
});
}},destruct:function(){this.__jc();
}});
})();
(function(){var a="qx.ui.core.MChildrenHandling";
qx.Mixin.define(a,{members:{getChildren:function(){return this._getChildren();
},hasChildren:function(){return this._hasChildren();
},indexOf:function(b){return this._indexOf(b);
},add:function(c,d){this._add(c,d);
},addAt:function(e,f,g){this._addAt(e,f,g);
},addBefore:function(h,i,j){this._addBefore(h,i,j);
},addAfter:function(k,l,m){this._addAfter(k,l,m);
},remove:function(n){this._remove(n);
},removeAt:function(o){return this._removeAt(o);
},removeAll:function(){this._removeAll();
}},statics:{remap:function(p){p.getChildren=p._getChildren;
p.hasChildren=p._hasChildren;
p.indexOf=p._indexOf;
p.add=p._add;
p.addAt=p._addAt;
p.addBefore=p._addBefore;
p.addAfter=p._addAfter;
p.remove=p._remove;
p.removeAt=p._removeAt;
p.removeAll=p._removeAll;
}}});
})();
(function(){var a="qx.ui.core.MLayoutHandling";
qx.Mixin.define(a,{members:{setLayout:function(b){return this._setLayout(b);
},getLayout:function(){return this._getLayout();
}},statics:{remap:function(c){c.getLayout=c._getLayout;
c.setLayout=c._setLayout;
}}});
})();
(function(){var j="Integer",i="_applyDimension",h="Boolean",g="_applyStretching",f="_applyMargin",e="shorthand",d="_applyAlign",c="qx.debug",b="on",a="allowShrinkY",F="Wrong 'width' argument. ",E="Something went wrong with the layout of ",D="bottom",C="Wrong 'left' argument. ",B="baseline",A="marginBottom",z="qx.ui.core.LayoutItem",y="center",x="marginTop",w="!",q="allowGrowX",r="middle",o="marginLeft",p="allowShrinkX",m="top",n="right",k="marginRight",l="abstract",s="Wrong 'top' argument. ",t="Wrong 'height' argument. ",v="allowGrowY",u="left";
qx.Class.define(z,{type:l,extend:qx.core.Object,properties:{minWidth:{check:j,nullable:true,apply:i,init:null,themeable:true},width:{check:j,nullable:true,apply:i,init:null,themeable:true},maxWidth:{check:j,nullable:true,apply:i,init:null,themeable:true},minHeight:{check:j,nullable:true,apply:i,init:null,themeable:true},height:{check:j,nullable:true,apply:i,init:null,themeable:true},maxHeight:{check:j,nullable:true,apply:i,init:null,themeable:true},allowGrowX:{check:h,apply:g,init:true,themeable:true},allowShrinkX:{check:h,apply:g,init:true,themeable:true},allowGrowY:{check:h,apply:g,init:true,themeable:true},allowShrinkY:{check:h,apply:g,init:true,themeable:true},allowStretchX:{group:[q,p],mode:e,themeable:true},allowStretchY:{group:[v,a],mode:e,themeable:true},marginTop:{check:j,init:0,apply:f,themeable:true},marginRight:{check:j,init:0,apply:f,themeable:true},marginBottom:{check:j,init:0,apply:f,themeable:true},marginLeft:{check:j,init:0,apply:f,themeable:true},margin:{group:[x,k,A,o],mode:e,themeable:true},alignX:{check:[u,y,n],nullable:true,apply:d,themeable:true},alignY:{check:[m,r,D,B],nullable:true,apply:d,themeable:true}},members:{__gR:null,__gS:null,__gT:null,__gU:null,__gV:null,__gW:null,__gX:null,getBounds:function(){return this.__gW||this.__gS||null;
},clearSeparators:function(){},renderSeparator:function(G,H){},renderLayout:function(I,top,J,K){if(qx.core.Variant.isSet(c,b)){var L=E+this.toString()+w;
this.assertInteger(I,C+L);
this.assertInteger(top,s+L);
this.assertInteger(J,F+L);
this.assertInteger(K,t+L);
}var M=null;

if(this.getHeight()==null&&this._hasHeightForWidth()){var M=this._getHeightForWidth(J);
}
if(M!=null&&M!==this.__gR){this.__gR=M;
qx.ui.core.queue.Layout.add(this);
return null;
}var O=this.__gS;

if(!O){O=this.__gS={};
}var N={};

if(I!==O.left||top!==O.top){N.position=true;
O.left=I;
O.top=top;
}
if(J!==O.width||K!==O.height){N.size=true;
O.width=J;
O.height=K;
}if(this.__gT){N.local=true;
delete this.__gT;
}
if(this.__gV){N.margin=true;
delete this.__gV;
}return N;
},isExcluded:function(){return false;
},hasValidLayout:function(){return !this.__gT;
},scheduleLayoutUpdate:function(){qx.ui.core.queue.Layout.add(this);
},invalidateLayoutCache:function(){this.__gT=true;
this.__gU=null;
},getSizeHint:function(P){var Q=this.__gU;

if(Q){return Q;
}
if(P===false){return null;
}Q=this.__gU=this._computeSizeHint();
if(this._hasHeightForWidth()&&this.__gR&&this.getHeight()==null){Q.height=this.__gR;
}if(Q.minWidth>Q.width){Q.width=Q.minWidth;
}
if(Q.maxWidth<Q.width){Q.width=Q.maxWidth;
}
if(!this.getAllowGrowX()){Q.maxWidth=Q.width;
}
if(!this.getAllowShrinkX()){Q.minWidth=Q.width;
}if(Q.minHeight>Q.height){Q.height=Q.minHeight;
}
if(Q.maxHeight<Q.height){Q.height=Q.maxHeight;
}
if(!this.getAllowGrowY()){Q.maxHeight=Q.height;
}
if(!this.getAllowShrinkY()){Q.minHeight=Q.height;
}return Q;
},_computeSizeHint:function(){var V=this.getMinWidth()||0;
var S=this.getMinHeight()||0;
var W=this.getWidth()||V;
var U=this.getHeight()||S;
var R=this.getMaxWidth()||Infinity;
var T=this.getMaxHeight()||Infinity;
return {minWidth:V,width:W,maxWidth:R,minHeight:S,height:U,maxHeight:T};
},_hasHeightForWidth:function(){var X=this._getLayout();

if(X){return X.hasHeightForWidth();
}return false;
},_getHeightForWidth:function(Y){var ba=this._getLayout();

if(ba&&ba.hasHeightForWidth()){return ba.getHeightForWidth(Y);
}return null;
},_getLayout:function(){return null;
},_applyMargin:function(){this.__gV=true;
var parent=this.$$parent;

if(parent){parent.updateLayoutProperties();
}},_applyAlign:function(){var parent=this.$$parent;

if(parent){parent.updateLayoutProperties();
}},_applyDimension:function(){qx.ui.core.queue.Layout.add(this);
},_applyStretching:function(){qx.ui.core.queue.Layout.add(this);
},hasUserBounds:function(){return !!this.__gW;
},setUserBounds:function(bb,top,bc,bd){this.__gW={left:bb,top:top,width:bc,height:bd};
qx.ui.core.queue.Layout.add(this);
},resetUserBounds:function(){delete this.__gW;
qx.ui.core.queue.Layout.add(this);
},__gY:{},setLayoutProperties:function(be){if(be==null){return;
}var bf=this.__gX;

if(!bf){bf=this.__gX={};
}var parent=this.getLayoutParent();

if(parent){parent.updateLayoutProperties(be);
}for(var bg in be){if(be[bg]==null){delete bf[bg];
}else{bf[bg]=be[bg];
}}},getLayoutProperties:function(){return this.__gX||this.__gY;
},clearLayoutProperties:function(){delete this.__gX;
},updateLayoutProperties:function(bh){var bi=this._getLayout();

if(bi){if(qx.core.Variant.isSet(c,b)){if(bh){for(var bj in bh){if(bh[bj]!==null){bi.verifyLayoutProperty(this,bj,bh[bj]);
}}}}bi.invalidateChildrenCache();
}qx.ui.core.queue.Layout.add(this);
},getApplicationRoot:function(){return qx.core.Init.getApplication().getRoot();
},getLayoutParent:function(){return this.$$parent||null;
},setLayoutParent:function(parent){if(this.$$parent===parent){return;
}this.$$parent=parent||null;
qx.ui.core.queue.Visibility.add(this);
},isRootWidget:function(){return false;
},_getRoot:function(){var parent=this;

while(parent){if(parent.isRootWidget()){return parent;
}parent=parent.$$parent;
}return null;
},clone:function(){var bk=qx.core.Object.prototype.clone.call(this);
var bl=this.__gX;

if(bl){bk.__gX=qx.lang.Object.clone(bl);
}return bk;
}},destruct:function(){this.$$parent=this.$$subparent=this.__gX=this.__gS=this.__gW=this.__gU=null;
}});
})();
(function(){var k="qx.debug",j="qx.ui.core.DecoratorFactory",i="qxType",h="",g="decorator",f="$$nopool$$",e="qx.ui.core.DecoratorFactory[",d="] ",c="on",b="keys: ",a=", elements: ";
qx.Class.define(j,{extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__ha={};
},statics:{MAX_SIZE:15,__hb:f},members:{__ha:null,getDecoratorElement:function(l){var q=qx.ui.core.DecoratorFactory;

if(qx.lang.Type.isString(l)){var o=l;
var n=qx.theme.manager.Decoration.getInstance().resolve(l);
}else{var o=q.__hb;
n=l;
}var p=this.__ha;

if(p[o]&&p[o].length>0){var m=p[o].pop();
}else{var m=this._createDecoratorElement(n,o);
}m.$$pooled=false;
return m;
},poolDecorator:function(r){if(!r||r.$$pooled||r.isDisposed()){return;
}var u=qx.ui.core.DecoratorFactory;
var s=r.getId();

if(s==u.__hb){r.dispose();
return;
}var t=this.__ha;

if(!t[s]){t[s]=[];
}
if(t[s].length>u.MAX_SIZE){r.dispose();
}else{r.$$pooled=true;
t[s].push(r);
}},_createDecoratorElement:function(v,w){var x=new qx.html.Decorator(v,w);

if(qx.core.Variant.isSet(k,c)){x.setAttribute(i,g);
}return x;
},toString:qx.core.Variant.select(k,{"on":function(){var y=0;
var z=0;

for(var A in this.__ha){y+=1;
z+=this.__ha[A].length;
}return [e,this.$$hash,d,b,y,a,z].join(h);
},"off":function(){return qx.core.Object.prototype.toString.call(this);
}})},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){var C=this.__ha;

for(var B in C){qx.util.DisposeUtil.disposeArray(C,B);
}}this.__ha=null;
}});
})();
(function(){var cs="on",cr="px",cq="qx.debug",cp="Boolean",co="qx.event.type.Drag",cn="qx.event.type.Mouse",cm="visible",cl="qx.event.type.Focus",ck="Integer",cj="qx.event.type.Touch",bx="excluded",bw="qx.event.type.Data",bv="_applyPadding",bu="qx.event.type.Event",bt="hidden",bs="contextmenu",br="String",bq="tabIndex",bp="focused",bo="changeVisibility",cz="mshtml",cA="hovered",cx="qx.event.type.KeySequence",cy="qx.client",cv="absolute",cw="backgroundColor",ct="drag",cu="div",cB="object",cC="disabled",bV="move",bU="dragstart",bX="qx.dynlocale",bW="dragchange",ca="dragend",bY="resize",cc="Decorator",cb="zIndex",bT="opacity",bS="default",c="Color",d="qxType",f="changeToolTipText",g="beforeContextmenuOpen",h="_applyNativeContextMenu",j="content",k="_applyBackgroundColor",m="__hp",n="_applyFocusable",o="changeShadow",cG="qx.event.type.KeyInput",cF="__hh",cE="createChildControl",cD="__hd",cK="Invalid left decorator inset detected: ",cJ="Font",cI="_applyShadow",cH="Invalid layout data: ",cM="Could not add widget to itself: ",cL="_applyEnabled",N="_applySelectable",O="Number",L="_applyKeepActive",M="__hi",R="_applyVisibility",S="The 'after' widget is not a child of this widget!",P="repeat",Q="qxDraggable",J="syncAppearance",K="paddingLeft",w="_applyDroppable",v="Wrong 'left' argument. ",y="protector",x="#",s="qx.event.type.MouseWheel",r="_applyCursor",u="_applyDraggable",t="changeTextColor",q="$$widget",p="changeContextMenu",X="paddingTop",Y="changeSelectable",ba="hideFocus",bb="Invalid top decorator inset detected: ",T="none",U="outline",V="The 'before' widget is not a child of this widget!",W="_applyAppearance",bc=" returned an invalid size hint!",bd="__hg",G="_applyOpacity",F="url(",E=")",D="qx.ui.core.Widget",C="minHeight is larger than maxHeight!",B="_applyFont",A="__hc",z="cursor",I="qxDroppable",H="__hl",be="changeZIndex",bf="changeEnabled",bg="changeFont",bh="_applyDecorator",bi="_applyZIndex",bj="_applyTextColor",bk="qx.ui.menu.Menu",bl="Invalid right decorator inset detected: ",bm="Invalid widget to add: ",bn="_applyToolTipText",bB="The layout of the widget",bA="true",bz="widget",by="Wrong 'top' argument. ",bF="changeDecorator",bE="changeBackgroundColor",bD="_applyTabIndex",bC="Invalid bottom decorator inset detected: ",bH="changeAppearance",bG="__hn",bO="shorthand",bP="/",bM="",bN="_applyContextMenu",bK="container",bL="paddingBottom",bI="changeNativeContextMenu",bJ="undefined",bQ="qx.ui.tooltip.ToolTip",bR="qxKeepActive",ce="_applyKeepFocus",cd="paddingRight",cg="minWidth is larger than maxWidth!",cf="changeLocale",ci="qxKeepFocus",ch="qx/static/blank.gif";
qx.Class.define(D,{extend:qx.ui.core.LayoutItem,include:[qx.locale.MTranslation],construct:function(){qx.ui.core.LayoutItem.call(this);
this.__hc=this._createContainerElement();
this.__hd=this.__ho();
this.__hc.add(this.__hd);
this.initFocusable();
this.initSelectable();
this.initNativeContextMenu();
},events:{appear:bu,disappear:bu,createChildControl:bw,resize:bw,move:bw,syncAppearance:bw,mousemove:cn,mouseover:cn,mouseout:cn,mousedown:cn,mouseup:cn,click:cn,dblclick:cn,contextmenu:cn,beforeContextmenuOpen:bw,mousewheel:s,touchstart:cj,touchend:cj,touchmove:cj,touchcancel:cj,tap:cj,swipe:cj,keyup:cx,keydown:cx,keypress:cx,keyinput:cG,focus:cl,blur:cl,focusin:cl,focusout:cl,activate:cl,deactivate:cl,capture:bu,losecapture:bu,drop:co,dragleave:co,dragover:co,drag:co,dragstart:co,dragend:co,dragchange:co,droprequest:co},properties:{paddingTop:{check:ck,init:0,apply:bv,themeable:true},paddingRight:{check:ck,init:0,apply:bv,themeable:true},paddingBottom:{check:ck,init:0,apply:bv,themeable:true},paddingLeft:{check:ck,init:0,apply:bv,themeable:true},padding:{group:[X,cd,bL,K],mode:bO,themeable:true},zIndex:{nullable:true,init:null,apply:bi,event:be,check:ck,themeable:true},decorator:{nullable:true,init:null,apply:bh,event:bF,check:cc,themeable:true},shadow:{nullable:true,init:null,apply:cI,event:o,check:cc,themeable:true},backgroundColor:{nullable:true,check:c,apply:k,event:bE,themeable:true},textColor:{nullable:true,check:c,apply:bj,event:t,themeable:true,inheritable:true},font:{nullable:true,apply:B,check:cJ,event:bg,themeable:true,inheritable:true,dereference:true},opacity:{check:O,apply:G,themeable:true,nullable:true,init:null},cursor:{check:br,apply:r,themeable:true,inheritable:true,nullable:true,init:null},toolTip:{check:bQ,nullable:true},toolTipText:{check:br,nullable:true,event:f,apply:bn},toolTipIcon:{check:br,nullable:true,event:f},blockToolTip:{check:cp,init:false},visibility:{check:[cm,bt,bx],init:cm,apply:R,event:bo},enabled:{init:true,check:cp,inheritable:true,apply:cL,event:bf},anonymous:{init:false,check:cp},tabIndex:{check:ck,nullable:true,apply:bD},focusable:{check:cp,init:false,apply:n},keepFocus:{check:cp,init:false,apply:ce},keepActive:{check:cp,init:false,apply:L},draggable:{check:cp,init:false,apply:u},droppable:{check:cp,init:false,apply:w},selectable:{check:cp,init:false,event:Y,apply:N},contextMenu:{check:bk,apply:bN,nullable:true,event:p},nativeContextMenu:{check:cp,init:false,themeable:true,event:bI,apply:h},appearance:{check:br,init:bz,apply:W,event:bH}},statics:{DEBUG:false,getWidgetByElement:function(cN,cO){while(cN){var cP=cN.$$widget;
if(cP!=null){var cQ=qx.core.ObjectRegistry.fromHashCode(cP);
if(!cO||!cQ.getAnonymous()){return cQ;
}}try{cN=cN.parentNode;
}catch(e){return null;
}}return null;
},contains:function(parent,cR){while(cR){if(parent==cR){return true;
}cR=cR.getLayoutParent();
}return false;
},__he:new qx.ui.core.DecoratorFactory(),__hf:new qx.ui.core.DecoratorFactory()},members:{__hc:null,__hd:null,__hg:null,__hh:null,__hi:null,__hj:null,__hk:null,__hl:null,_getLayout:function(){return this.__hl;
},_setLayout:function(cS){if(qx.core.Variant.isSet(cq,cs)){if(cS){this.assertInstance(cS,qx.ui.layout.Abstract);
}}
if(this.__hl){this.__hl.connectToWidget(null);
}
if(cS){cS.connectToWidget(this);
}this.__hl=cS;
qx.ui.core.queue.Layout.add(this);
},setLayoutParent:function(parent){if(this.$$parent===parent){return;
}var cT=this.getContainerElement();

if(this.$$parent&&!this.$$parent.$$disposed){this.$$parent.getContentElement().remove(cT);
}this.$$parent=parent||null;

if(parent&&!parent.$$disposed){this.$$parent.getContentElement().add(cT);
}this.$$refreshInheritables();
qx.ui.core.queue.Visibility.add(this);
},_updateInsets:null,__hm:function(a,b){if(a==b){return false;
}
if(a==null||b==null){return true;
}var cU=qx.theme.manager.Decoration.getInstance();
var cW=cU.resolve(a).getInsets();
var cV=cU.resolve(b).getInsets();

if(cW.top!=cV.top||cW.right!=cV.right||cW.bottom!=cV.bottom||cW.left!=cV.left){return true;
}return false;
},renderLayout:function(cX,top,cY,da){var dj=qx.ui.core.LayoutItem.prototype.renderLayout.call(this,cX,top,cY,da);
if(!dj){return null;
}var dc=this.getContainerElement();
var content=this.getContentElement();
var dg=dj.size||this._updateInsets;
var dk=cr;
var dh={};
if(dj.position){dh.left=cX+dk;
dh.top=top+dk;
}if(dj.size){dh.width=cY+dk;
dh.height=da+dk;
}
if(dj.position||dj.size){dc.setStyles(dh);
}
if(dg||dj.local||dj.margin){var db=this.getInsets();
var innerWidth=cY-db.left-db.right;
var innerHeight=da-db.top-db.bottom;
innerWidth=innerWidth<0?0:innerWidth;
innerHeight=innerHeight<0?0:innerHeight;
}var de={};

if(this._updateInsets){de.left=db.left+dk;
de.top=db.top+dk;
}
if(dg){de.width=innerWidth+dk;
de.height=innerHeight+dk;
}
if(dg||this._updateInsets){content.setStyles(de);
}
if(dj.size){var di=this.__hi;

if(di){di.setStyles({width:cY+cr,height:da+cr});
}}
if(dj.size||this._updateInsets){if(this.__hg){this.__hg.resize(cY,da);
}}
if(dj.size){if(this.__hh){var db=this.__hh.getInsets();
var df=cY+db.left+db.right;
var dd=da+db.top+db.bottom;
this.__hh.resize(df,dd);
}}
if(dg||dj.local||dj.margin){if(this.__hl&&this.hasLayoutChildren()){this.__hl.renderLayout(innerWidth,innerHeight);
}else if(this.hasLayoutChildren()){throw new Error("At least one child in control "+this._findTopControl()+" requires a layout, but no one was defined!");
}}if(dj.position&&this.hasListener(bV)){this.fireDataEvent(bV,this.getBounds());
}
if(dj.size&&this.hasListener(bY)){this.fireDataEvent(bY,this.getBounds());
}delete this._updateInsets;
return dj;
},__hn:null,clearSeparators:function(){var dm=this.__hn;

if(!dm){return;
}var dn=qx.ui.core.Widget.__he;
var content=this.getContentElement();
var dl;

for(var i=0,l=dm.length;i<l;i++){dl=dm[i];
dn.poolDecorator(dl);
content.remove(dl);
}dm.length=0;
},renderSeparator:function(dp,dq){var dr=qx.ui.core.Widget.__he.getDecoratorElement(dp);
this.getContentElement().add(dr);
dr.resize(dq.width,dq.height);
dr.setStyles({left:dq.left+cr,top:dq.top+cr});
if(!this.__hn){this.__hn=[dr];
}else{this.__hn.push(dr);
}},_computeSizeHint:function(){var dy=this.getWidth();
var dx=this.getMinWidth();
var dt=this.getMaxWidth();
var dw=this.getHeight();
var du=this.getMinHeight();
var dv=this.getMaxHeight();

if(qx.core.Variant.isSet(cq,cs)){if(dx!==null&&dt!==null){this.assert(dx<=dt,cg);
}
if(du!==null&&dv!==null){this.assert(du<=dv,C);
}}var dz=this._getContentHint();
var ds=this.getInsets();
var dB=ds.left+ds.right;
var dA=ds.top+ds.bottom;

if(dy==null){dy=dz.width+dB;
}
if(dw==null){dw=dz.height+dA;
}
if(dx==null){dx=dB;

if(dz.minWidth!=null){dx+=dz.minWidth;
}}
if(du==null){du=dA;

if(dz.minHeight!=null){du+=dz.minHeight;
}}
if(dt==null){if(dz.maxWidth==null){dt=Infinity;
}else{dt=dz.maxWidth+dB;
}}
if(dv==null){if(dz.maxHeight==null){dv=Infinity;
}else{dv=dz.maxHeight+dA;
}}return {width:dy,minWidth:dx,maxWidth:dt,height:dw,minHeight:du,maxHeight:dv};
},invalidateLayoutCache:function(){qx.ui.core.LayoutItem.prototype.invalidateLayoutCache.call(this);

if(this.__hl){this.__hl.invalidateLayoutCache();
}},_getContentHint:function(){var dD=this.__hl;

if(dD){if(this.hasLayoutChildren()){var dE=dD.getSizeHint();

if(qx.core.Variant.isSet(cq,cs)){var dC=bB+this.toString()+bc;
this.assertInteger(dE.width,v+dC);
this.assertInteger(dE.height,by+dC);
}return dE;
}else{return {width:0,height:0};
}}else{return {width:100,height:50};
}},_getHeightForWidth:function(dF){var dJ=this.getInsets();
var dM=dJ.left+dJ.right;
var dL=dJ.top+dJ.bottom;
var dK=dF-dM;
var dH=this._getLayout();

if(dH&&dH.hasHeightForWidth()){var dG=dH.getHeightForWidth(dF);
}else{dG=this._getContentHeightForWidth(dK);
}var dI=dG+dL;
return dI;
},_getContentHeightForWidth:function(dN){throw new Error("Abstract method call: _getContentHeightForWidth()!");
},getInsets:function(){var top=this.getPaddingTop();
var dP=this.getPaddingRight();
var dR=this.getPaddingBottom();
var dQ=this.getPaddingLeft();

if(this.__hg){var dO=this.__hg.getInsets();

if(qx.core.Variant.isSet(cq,cs)){this.assertNumber(dO.top,bb+dO.top);
this.assertNumber(dO.right,bl+dO.right);
this.assertNumber(dO.bottom,bC+dO.bottom);
this.assertNumber(dO.left,cK+dO.left);
}top+=dO.top;
dP+=dO.right;
dR+=dO.bottom;
dQ+=dO.left;
}return {"top":top,"right":dP,"bottom":dR,"left":dQ};
},getInnerSize:function(){var dT=this.getBounds();

if(!dT){return null;
}var dS=this.getInsets();
return {width:dT.width-dS.left-dS.right,height:dT.height-dS.top-dS.bottom};
},show:function(){this.setVisibility(cm);
},hide:function(){this.setVisibility(bt);
},exclude:function(){this.setVisibility(bx);
},isVisible:function(){return this.getVisibility()===cm;
},isHidden:function(){return this.getVisibility()!==cm;
},isExcluded:function(){return this.getVisibility()===bx;
},isSeeable:function(){var dV=this.getContainerElement().getDomElement();

if(dV){return dV.offsetWidth>0;
}var dU=this;

do{if(!dU.isVisible()){return false;
}
if(dU.isRootWidget()){return true;
}dU=dU.getLayoutParent();
}while(dU);
return false;
},_createContainerElement:function(){var dX={"$$widget":this.toHashCode()};

if(qx.core.Variant.isSet(cq,cs)){dX.qxType=bK;
dX.qxClass=this.classname;
}var dW={zIndex:0,position:cv};
return new qx.html.Element(cu,dW,dX);
},__ho:function(){var dY=this._createContentElement();

if(qx.core.Variant.isSet(cq,cs)){dY.setAttribute(d,j);
}dY.setStyles({"position":cv,"zIndex":10});
return dY;
},_createContentElement:function(){return new qx.html.Element(cu,{overflowX:bt,overflowY:bt});
},getContainerElement:function(){return this.__hc;
},getContentElement:function(){return this.__hd;
},getDecoratorElement:function(){return this.__hg||null;
},getShadowElement:function(){return this.__hh||null;
},__hp:null,getLayoutChildren:function(){var eb=this.__hp;

if(!eb){return this.__hq;
}var ec;

for(var i=0,l=eb.length;i<l;i++){var ea=eb[i];

if(ea.hasUserBounds()||ea.isExcluded()){if(ec==null){ec=eb.concat();
}qx.lang.Array.remove(ec,ea);
}}return ec||eb;
},scheduleLayoutUpdate:function(){qx.ui.core.queue.Layout.add(this);
},invalidateLayoutChildren:function(){var ed=this.__hl;

if(ed){ed.invalidateChildrenCache();
}qx.ui.core.queue.Layout.add(this);
},hasLayoutChildren:function(){var ee=this.__hp;

if(!ee){return false;
}var ef;

for(var i=0,l=ee.length;i<l;i++){ef=ee[i];

if(!ef.hasUserBounds()&&!ef.isExcluded()){return true;
}}return false;
},getChildrenContainer:function(){return this;
},__hq:[],_getChildren:function(){return this.__hp||this.__hq;
},_indexOf:function(eg){var eh=this.__hp;

if(!eh){return -1;
}return eh.indexOf(eg);
},_hasChildren:function(){var ei=this.__hp;
return ei!=null&&(!!ei[0]);
},addChildrenToQueue:function(ej){var ek=this.__hp;

if(!ek){return;
}var em;

for(var i=0,l=ek.length;i<l;i++){em=ek[i];
ej.push(em);
em.addChildrenToQueue(ej);
}},_add:function(en,eo){if(en.getLayoutParent()==this){qx.lang.Array.remove(this.__hp,en);
}
if(this.__hp){this.__hp.push(en);
}else{this.__hp=[en];
}this.__hr(en,eo);
},_addAt:function(ep,eq,er){if(!this.__hp){this.__hp=[];
}if(ep.getLayoutParent()==this){qx.lang.Array.remove(this.__hp,ep);
}var es=this.__hp[eq];

if(es===ep){ep.setLayoutProperties(er);
}
if(es){qx.lang.Array.insertBefore(this.__hp,ep,es);
}else{this.__hp.push(ep);
}this.__hr(ep,er);
},_addBefore:function(et,eu,ev){if(qx.core.Variant.isSet(cq,cs)){this.assertInArray(eu,this._getChildren(),V);
}
if(et==eu){return;
}
if(!this.__hp){this.__hp=[];
}if(et.getLayoutParent()==this){qx.lang.Array.remove(this.__hp,et);
}qx.lang.Array.insertBefore(this.__hp,et,eu);
this.__hr(et,ev);
},_addAfter:function(ew,ex,ey){if(qx.core.Variant.isSet(cq,cs)){this.assertInArray(ex,this._getChildren(),S);
}
if(ew==ex){return;
}
if(!this.__hp){this.__hp=[];
}if(ew.getLayoutParent()==this){qx.lang.Array.remove(this.__hp,ew);
}qx.lang.Array.insertAfter(this.__hp,ew,ex);
this.__hr(ew,ey);
},_remove:function(ez){if(!this.__hp){throw new Error("This widget has no children!");
}qx.lang.Array.remove(this.__hp,ez);
this.__hs(ez);
},_removeAt:function(eA){if(!this.__hp){throw new Error("This widget has no children!");
}var eB=this.__hp[eA];
qx.lang.Array.removeAt(this.__hp,eA);
this.__hs(eB);
return eB;
},_removeAll:function(){if(!this.__hp){return;
}var eC=this.__hp.concat();
this.__hp.length=0;

for(var i=eC.length-1;i>=0;i--){this.__hs(eC[i]);
}qx.ui.core.queue.Layout.add(this);
},_afterAddChild:null,_afterRemoveChild:null,__hr:function(eD,eE){if(qx.core.Variant.isSet(cq,cs)){this.assertInstance(eD,qx.ui.core.LayoutItem,bm+eD);
this.assertNotIdentical(eD,this,cM+eD);

if(eE!=null){this.assertType(eE,cB,cH+eE);
}}var parent=eD.getLayoutParent();

if(parent&&parent!=this){parent._remove(eD);
}eD.setLayoutParent(this);
if(eE){eD.setLayoutProperties(eE);
}else{this.updateLayoutProperties();
}if(this._afterAddChild){this._afterAddChild(eD);
}},__hs:function(eF){if(qx.core.Variant.isSet(cq,cs)){this.assertNotUndefined(eF);
}
if(eF.getLayoutParent()!==this){throw new Error("Remove Error: "+eF+" is not a child of this widget!");
}eF.setLayoutParent(null);
if(this.__hl){this.__hl.invalidateChildrenCache();
}qx.ui.core.queue.Layout.add(this);
if(this._afterRemoveChild){this._afterRemoveChild(eF);
}},capture:function(eG){this.getContainerElement().capture(eG);
},releaseCapture:function(){this.getContainerElement().releaseCapture();
},_applyPadding:function(eH,eI,name){this._updateInsets=true;
qx.ui.core.queue.Layout.add(this);
},_createProtectorElement:function(){if(this.__hi){return;
}var eJ=this.__hi=new qx.html.Element;

if(qx.core.Variant.isSet(cq,cs)){eJ.setAttribute(d,y);
}eJ.setStyles({position:cv,top:0,left:0,zIndex:7});
var eK=this.getBounds();

if(eK){this.__hi.setStyles({width:eK.width+cr,height:eK.height+cr});
}if(qx.core.Variant.isSet(cy,cz)){eJ.setStyles({backgroundImage:F+qx.util.ResourceManager.getInstance().toUri(ch)+E,backgroundRepeat:P});
}this.getContainerElement().add(eJ);
},_applyDecorator:function(eL,eM){if(qx.core.Variant.isSet(cq,cs)){if(eL&&typeof eL===cB){if(qx.ui.core.Widget.DEBUG){this.warn("Decorator instances may increase memory usage and "+"processing time. Often it is better to lay them out to a "+"theme file. Hash code of decorator object: "+eL);
}}}var eP=qx.ui.core.Widget.__he;
var eN=this.getContainerElement();
if(!this.__hi&&!qx.bom.client.Feature.CSS_POINTER_EVENTS){this._createProtectorElement();
}if(eM){eN.remove(this.__hg);
eP.poolDecorator(this.__hg);
}if(eL){var eO=this.__hg=eP.getDecoratorElement(eL);
eO.setStyle(cb,5);
eN.add(eO);
}else{delete this.__hg;
}this._applyBackgroundColor(this.getBackgroundColor());
if(this.__hm(eM,eL)){this._updateInsets=true;
qx.ui.core.queue.Layout.add(this);
}else if(eL){var eQ=this.getBounds();

if(eQ){eO.resize(eQ.width,eQ.height);
this.__hi&&
this.__hi.setStyles({width:eQ.width+cr,height:eQ.height+cr});
}}},_applyShadow:function(eR,eS){var fa=qx.ui.core.Widget.__hf;
var eU=this.getContainerElement();
if(eS){eU.remove(this.__hh);
fa.poolDecorator(this.__hh);
}if(eR){var eW=this.__hh=fa.getDecoratorElement(eR);
eU.add(eW);
var eY=eW.getInsets();
eW.setStyles({left:(-eY.left)+cr,top:(-eY.top)+cr});
var eX=this.getBounds();

if(eX){var eV=eX.width+eY.left+eY.right;
var eT=eX.height+eY.top+eY.bottom;
eW.resize(eV,eT);
}eW.tint(null);
}else{delete this.__hh;
}},_applyToolTipText:function(fb,fc){if(qx.core.Variant.isSet(bX,cs)){if(this.__hk){return;
}var fd=qx.locale.Manager.getInstance();
this.__hk=fd.addListener(cf,function(){var fe=this.getToolTipText();

if(fe&&fe.translate){this.setToolTipText(fe.translate());
}},this);
}},_applyTextColor:function(ff,fg){},_applyZIndex:function(fh,fi){this.getContainerElement().setStyle(cb,fh==null?0:fh);
},_applyVisibility:function(fj,fk){var fl=this.getContainerElement();

if(fj===cm){fl.show();
}else{fl.hide();
}var parent=this.$$parent;

if(parent&&(fk==null||fj==null||fk===bx||fj===bx)){parent.invalidateLayoutChildren();
}qx.ui.core.queue.Visibility.add(this);
},_applyOpacity:function(fm,fn){this.getContainerElement().setStyle(bT,fm==1?null:fm);
if(qx.core.Variant.isSet(cy,cz)&&qx.bom.element.Decoration.isAlphaImageLoaderEnabled()){if(!qx.Class.isSubClassOf(this.getContentElement().constructor,qx.html.Image)){var fo=(fm==1||fm==null)?null:0.99;
this.getContentElement().setStyle(bT,fo);
}}},_applyCursor:function(fp,fq){if(fp==null&&!this.isSelectable()){fp=bS;
}this.getContainerElement().setStyle(z,fp,qx.bom.client.Engine.OPERA);
},_applyBackgroundColor:function(fr,fs){var ft=this.getBackgroundColor();
var fv=this.getContainerElement();

if(this.__hg){this.__hg.tint(ft);
fv.setStyle(cw,null);
}else{var fu=qx.theme.manager.Color.getInstance().resolve(ft);
fv.setStyle(cw,fu);
}},_applyFont:function(fw,fx){},__ht:null,$$stateChanges:null,_forwardStates:null,hasState:function(fy){var fz=this.__ht;
return !!fz&&!!fz[fy];
},addState:function(fA){var fB=this.__ht;

if(!fB){fB=this.__ht={};
}
if(fB[fA]){return;
}this.__ht[fA]=true;
if(fA===cA){this.syncAppearance();
}else if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;
}else{qx.ui.core.queue.Appearance.add(this);
}var forward=this._forwardStates;
var fE=this.__hw;

if(forward&&forward[fA]&&fE){var fC;

for(var fD in fE){fC=fE[fD];

if(fC instanceof qx.ui.core.Widget){fE[fD].addState(fA);
}}}},removeState:function(fF){var fG=this.__ht;

if(!fG||!fG[fF]){return;
}delete this.__ht[fF];
if(fF===cA){this.syncAppearance();
}else if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;
}else{qx.ui.core.queue.Appearance.add(this);
}var forward=this._forwardStates;
var fJ=this.__hw;

if(forward&&forward[fF]&&fJ){for(var fI in fJ){var fH=fJ[fI];

if(fH instanceof qx.ui.core.Widget){fH.removeState(fF);
}}}},replaceState:function(fK,fL){var fM=this.__ht;

if(!fM){fM=this.__ht={};
}
if(!fM[fL]){fM[fL]=true;
}
if(fM[fK]){delete fM[fK];
}
if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;
}else{qx.ui.core.queue.Appearance.add(this);
}var forward=this._forwardStates;
var fP=this.__hw;

if(forward&&forward[fL]&&fP){for(var fO in fP){var fN=fP[fO];

if(fN instanceof qx.ui.core.Widget){fN.replaceState(fK,fL);
}}}},__hu:null,__hv:null,syncAppearance:function(){var fU=this.__ht;
var fT=this.__hu;
var fV=qx.theme.manager.Appearance.getInstance();
var fR=qx.core.Property.$$method.setThemed;
var ga=qx.core.Property.$$method.resetThemed;
if(this.__hv){delete this.__hv;
if(fT){var fQ=fV.styleFrom(fT,fU,null,this.getAppearance());
fT=null;
}}if(!fT){var fS=this;
var fY=[];

do{fY.push(fS.$$subcontrol||fS.getAppearance());
}while(fS=fS.$$subparent);
fT=fY.reverse().join(bP).replace(/#[0-9]+/g,bM);
this.__hu=fT;
}var fW=fV.styleFrom(fT,fU,null,this.getAppearance());

if(fW){if(fQ){for(var fX in fQ){if(fW[fX]===undefined){this[ga[fX]]();
}}}if(qx.core.Variant.isSet(cq,cs)){for(var fX in fW){if(!this[fR[fX]]){throw new Error(this.classname+' has no themeable property "'+fX+'" while styling '+fT);
}}}for(var fX in fW){fW[fX]===undefined?this[ga[fX]]():this[fR[fX]](fW[fX]);
}}else if(fQ){for(var fX in fQ){this[ga[fX]]();
}}this.fireDataEvent(J,this.__ht);
},_applyAppearance:function(gb,gc){this.updateAppearance();
},checkAppearanceNeeds:function(){if(!this.__hj){qx.ui.core.queue.Appearance.add(this);
this.__hj=true;
}else if(this.$$stateChanges){qx.ui.core.queue.Appearance.add(this);
delete this.$$stateChanges;
}},updateAppearance:function(){this.__hv=true;
qx.ui.core.queue.Appearance.add(this);
var gf=this.__hw;

if(gf){var gd;

for(var ge in gf){gd=gf[ge];

if(gd instanceof qx.ui.core.Widget){gd.updateAppearance();
}}}},syncWidget:function(){},getEventTarget:function(){var gg=this;

while(gg.getAnonymous()){gg=gg.getLayoutParent();

if(!gg){return null;
}}return gg;
},getFocusTarget:function(){var gh=this;

if(!gh.getEnabled()){return null;
}
while(gh.getAnonymous()||!gh.getFocusable()){gh=gh.getLayoutParent();

if(!gh||!gh.getEnabled()){return null;
}}return gh;
},getFocusElement:function(){return this.getContainerElement();
},isTabable:function(){return (!!this.getContainerElement().getDomElement())&&this.isFocusable();
},_applyFocusable:function(gi,gj){var gk=this.getFocusElement();
if(gi){var gl=this.getTabIndex();

if(gl==null){gl=1;
}gk.setAttribute(bq,gl);
if(qx.core.Variant.isSet(cy,cz)){gk.setAttribute(ba,bA);
}else{gk.setStyle(U,T);
}}else{if(gk.isNativelyFocusable()){gk.setAttribute(bq,-1);
}else if(gj){gk.setAttribute(bq,null);
}}},_applyKeepFocus:function(gm){var gn=this.getFocusElement();
gn.setAttribute(ci,gm?cs:null);
},_applyKeepActive:function(go){var gp=this.getContainerElement();
gp.setAttribute(bR,go?cs:null);
},_applyTabIndex:function(gq){if(gq==null){gq=1;
}else if(gq<1||gq>32000){throw new Error("TabIndex property must be between 1 and 32000");
}
if(this.getFocusable()&&gq!=null){this.getFocusElement().setAttribute(bq,gq);
}},_applySelectable:function(gr,gs){if(gs!==null){this._applyCursor(this.getCursor());
}this.getContentElement().setSelectable(gr);
},_applyEnabled:function(gt,gu){if(gt===false){this.addState(cC);
this.removeState(cA);
if(this.isFocusable()){this.removeState(bp);
this._applyFocusable(false,true);
}if(this.isDraggable()){this._applyDraggable(false,true);
}if(this.isDroppable()){this._applyDroppable(false,true);
}}else{this.removeState(cC);
if(this.isFocusable()){this._applyFocusable(true,false);
}if(this.isDraggable()){this._applyDraggable(true,false);
}if(this.isDroppable()){this._applyDroppable(true,false);
}}},_applyNativeContextMenu:function(gv,gw,name){},_applyContextMenu:function(gx,gy){if(gy){gy.removeState(bs);

if(gy.getOpener()==this){gy.resetOpener();
}
if(!gx){this.removeListener(bs,this._onContextMenuOpen);
gy.removeListener(bo,this._onBeforeContextMenuOpen,this);
}}
if(gx){gx.setOpener(this);
gx.addState(bs);

if(!gy){this.addListener(bs,this._onContextMenuOpen);
gx.addListener(bo,this._onBeforeContextMenuOpen,this);
}}},_onContextMenuOpen:function(e){this.getContextMenu().openAtMouse(e);
e.stop();
},_onBeforeContextMenuOpen:function(e){if(e.getData()==cm&&this.hasListener(g)){this.fireDataEvent(g,e);
}},_onStopEvent:function(e){e.stopPropagation();
},_applyDraggable:function(gz,gA){if(!this.isEnabled()&&gz===true){gz=false;
}qx.ui.core.DragDropCursor.getInstance();
if(gz){this.addListener(bU,this._onDragStart);
this.addListener(ct,this._onDrag);
this.addListener(ca,this._onDragEnd);
this.addListener(bW,this._onDragChange);
}else{this.removeListener(bU,this._onDragStart);
this.removeListener(ct,this._onDrag);
this.removeListener(ca,this._onDragEnd);
this.removeListener(bW,this._onDragChange);
}this.getContainerElement().setAttribute(Q,gz?cs:null);
},_applyDroppable:function(gB,gC){if(!this.isEnabled()&&gB===true){gB=false;
}this.getContainerElement().setAttribute(I,gB?cs:null);
},_onDragStart:function(e){qx.ui.core.DragDropCursor.getInstance().placeToMouse(e);
this.getApplicationRoot().setGlobalCursor(bS);
},_onDrag:function(e){qx.ui.core.DragDropCursor.getInstance().placeToMouse(e);
},_onDragEnd:function(e){qx.ui.core.DragDropCursor.getInstance().moveTo(-1000,-1000);
this.getApplicationRoot().resetGlobalCursor();
},_onDragChange:function(e){var gD=qx.ui.core.DragDropCursor.getInstance();
var gE=e.getCurrentAction();
gE?gD.setAction(gE):gD.resetAction();
},visualizeFocus:function(){this.addState(bp);
},visualizeBlur:function(){this.removeState(bp);
},scrollChildIntoView:function(gF,gG,gH,gI){gI=typeof gI==bJ?true:gI;
var gJ=qx.ui.core.queue.Layout;
var parent;
if(gI){gI=!gJ.isScheduled(gF);
parent=gF.getLayoutParent();
if(gI&&parent){gI=!gJ.isScheduled(parent);
if(gI){parent.getChildren().forEach(function(gK){gI=gI&&!gJ.isScheduled(gK);
});
}}}this.scrollChildIntoViewX(gF,gG,gI);
this.scrollChildIntoViewY(gF,gH,gI);
},scrollChildIntoViewX:function(gL,gM,gN){this.getContentElement().scrollChildIntoViewX(gL.getContainerElement(),gM,gN);
},scrollChildIntoViewY:function(gO,gP,gQ){this.getContentElement().scrollChildIntoViewY(gO.getContainerElement(),gP,gQ);
},focus:function(){if(this.isFocusable()){this.getFocusElement().focus();
}else{throw new Error("Widget is not focusable!");
}},blur:function(){if(this.isFocusable()){this.getFocusElement().blur();
}else{throw new Error("Widget is not focusable!");
}},activate:function(){this.getContainerElement().activate();
},deactivate:function(){this.getContainerElement().deactivate();
},tabFocus:function(){this.getFocusElement().focus();
},hasChildControl:function(gR){if(!this.__hw){return false;
}return !!this.__hw[gR];
},__hw:null,_getCreatedChildControls:function(){return this.__hw;
},getChildControl:function(gS,gT){if(!this.__hw){if(gT){return null;
}this.__hw={};
}var gU=this.__hw[gS];

if(gU){return gU;
}
if(gT===true){return null;
}return this._createChildControl(gS);
},_showChildControl:function(gV){var gW=this.getChildControl(gV);
gW.show();
return gW;
},_excludeChildControl:function(gX){var gY=this.getChildControl(gX,true);

if(gY){gY.exclude();
}},_isChildControlVisible:function(ha){var hb=this.getChildControl(ha,true);

if(hb){return hb.isVisible();
}return false;
},_createChildControl:function(hc){if(!this.__hw){this.__hw={};
}else if(this.__hw[hc]){throw new Error("Child control '"+hc+"' already created!");
}var hg=hc.indexOf(x);

if(hg==-1){var hd=this._createChildControlImpl(hc);
}else{var hd=this._createChildControlImpl(hc.substring(0,hg),hc.substring(hg+1,hc.length));
}
if(!hd){throw new Error("Unsupported control: "+hc);
}hd.$$subcontrol=hc;
hd.$$subparent=this;
var he=this.__ht;
var forward=this._forwardStates;

if(he&&forward&&hd instanceof qx.ui.core.Widget){for(var hf in he){if(forward[hf]){hd.addState(hf);
}}}this.fireDataEvent(cE,hd);
return this.__hw[hc]=hd;
},_createChildControlImpl:function(hh,hi){return null;
},_disposeChildControls:function(){var hm=this.__hw;

if(!hm){return;
}var hk=qx.ui.core.Widget;

for(var hl in hm){var hj=hm[hl];

if(!hk.contains(this,hj)){hj.destroy();
}else{hj.dispose();
}}delete this.__hw;
},_findTopControl:function(){var hn=this;

while(hn){if(!hn.$$subparent){return hn;
}hn=hn.$$subparent;
}return null;
},getContainerLocation:function(ho){var hp=this.getContainerElement().getDomElement();
return hp?qx.bom.element.Location.get(hp,ho):null;
},getContentLocation:function(hq){var hr=this.getContentElement().getDomElement();
return hr?qx.bom.element.Location.get(hr,hq):null;
},setDomLeft:function(hs){var ht=this.getContainerElement().getDomElement();

if(ht){ht.style.left=hs+cr;
}else{throw new Error("DOM element is not yet created!");
}},setDomTop:function(hu){var hv=this.getContainerElement().getDomElement();

if(hv){hv.style.top=hu+cr;
}else{throw new Error("DOM element is not yet created!");
}},setDomPosition:function(hw,top){var hx=this.getContainerElement().getDomElement();

if(hx){hx.style.left=hw+cr;
hx.style.top=top+cr;
}else{throw new Error("DOM element is not yet created!");
}},destroy:function(){if(this.$$disposed){return;
}var parent=this.$$parent;

if(parent){parent._remove(this);
}qx.ui.core.queue.Dispose.add(this);
},clone:function(){var hy=qx.ui.core.LayoutItem.prototype.clone.call(this);

if(this.getChildren){var hz=this.getChildren();

for(var i=0,l=hz.length;i<l;i++){hy.add(hz[i].clone());
}}return hy;
}},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){if(qx.core.Variant.isSet(bX,cs)){if(this.__hk){qx.locale.Manager.getInstance().removeListenerById(this.__hk);
}}this.getContainerElement().setAttribute(q,null,true);
this._disposeChildControls();
qx.ui.core.queue.Appearance.remove(this);
qx.ui.core.queue.Layout.remove(this);
qx.ui.core.queue.Visibility.remove(this);
qx.ui.core.queue.Widget.remove(this);
}if(!qx.core.ObjectRegistry.inShutDown){var hB=qx.ui.core.Widget;
var hA=this.getContainerElement();

if(this.__hg){hA.remove(this.__hg);
hB.__he.poolDecorator(this.__hg);
}
if(this.__hh){hA.remove(this.__hh);
hB.__hf.poolDecorator(this.__hh);
}this.clearSeparators();
this.__hg=this.__hh=this.__hn=null;
}else{this._disposeArray(bG);
this._disposeObjects(bd,cF);
}this._disposeArray(m);
this.__ht=this.__hw=null;
this._disposeObjects(H,A,cD,M);
}});
})();
(function(){var d="qx.event.type.Data",c="qx.ui.container.Composite",b="addChildWidget",a="removeChildWidget";
qx.Class.define(c,{extend:qx.ui.core.Widget,include:[qx.ui.core.MChildrenHandling,qx.ui.core.MLayoutHandling],construct:function(e){qx.ui.core.Widget.call(this);

if(e!=null){this._setLayout(e);
}},events:{addChildWidget:d,removeChildWidget:d},members:{_afterAddChild:function(f){this.fireNonBubblingEvent(b,qx.event.type.Data,[f]);
},_afterRemoveChild:function(g){this.fireNonBubblingEvent(a,qx.event.type.Data,[g]);
}},defer:function(h,i){qx.ui.core.MChildrenHandling.remap(i);
qx.ui.core.MLayoutHandling.remap(i);
}});
})();
(function(){var e="qx.ui.popup.Popup",d="visible",c="excluded",b="popup",a="Boolean";
qx.Class.define(e,{extend:qx.ui.container.Composite,include:qx.ui.core.MPlacement,construct:function(f){qx.ui.container.Composite.call(this,f);
this.initVisibility();
},properties:{appearance:{refine:true,init:b},visibility:{refine:true,init:c},autoHide:{check:a,init:true}},members:{show:function(){if(this.getLayoutParent()==null){qx.core.Init.getApplication().getRoot().add(this);
}qx.ui.container.Composite.prototype.show.call(this);
},_applyVisibility:function(g,h){qx.ui.container.Composite.prototype._applyVisibility.call(this,g,h);
var i=qx.ui.popup.Manager.getInstance();
g===d?i.add(this):i.remove(this);
}},destruct:function(){qx.ui.popup.Manager.getInstance().remove(this);
}});
})();
(function(){var l="atom",k="Integer",j="String",i="_applyRich",h="qx.ui.tooltip.ToolTip",g="_applyIcon",f="tooltip",d="qx.ui.core.Widget",c="mouseover",b="Boolean",a="_applyLabel";
qx.Class.define(h,{extend:qx.ui.popup.Popup,construct:function(m,n){qx.ui.popup.Popup.call(this);
this.setLayout(new qx.ui.layout.Grow);
this._createChildControl(l);
if(m!=null){this.setLabel(m);
}
if(n!=null){this.setIcon(n);
}this.addListener(c,this._onMouseOver,this);
},properties:{appearance:{refine:true,init:f},showTimeout:{check:k,init:700,themeable:true},hideTimeout:{check:k,init:4000,themeable:true},label:{check:j,nullable:true,apply:a},icon:{check:j,nullable:true,apply:g,themeable:true},rich:{check:b,init:false,apply:i},opener:{check:d,nullable:true}},members:{_createChildControlImpl:function(o,p){var q;

switch(o){case l:q=new qx.ui.basic.Atom;
this._add(q);
break;
}return q||qx.ui.popup.Popup.prototype._createChildControlImpl.call(this,o);
},_onMouseOver:function(e){this.hide();
},_applyIcon:function(r,s){var t=this.getChildControl(l);
r==null?t.resetIcon():t.setIcon(r);
},_applyLabel:function(u,v){var w=this.getChildControl(l);
u==null?w.resetLabel():w.setLabel(u);
},_applyRich:function(x,y){var z=this.getChildControl(l);
z.setRich(x);
}}});
})();
(function(){var f="interval",e="Number",d="_applyTimeoutInterval",c="qx.event.type.Event",b="qx.event.Idle",a="singleton";
qx.Class.define(b,{extend:qx.core.Object,type:a,construct:function(){qx.core.Object.call(this);
var g=new qx.event.Timer(this.getTimeoutInterval());
g.addListener(f,this._onInterval,this);
g.start();
this.__jf=g;
},events:{"interval":c},properties:{timeoutInterval:{check:e,init:100,apply:d}},members:{__jf:null,_applyTimeoutInterval:function(h){this.__jf.setInterval(h);
},_onInterval:function(){this.fireEvent(f);
}},destruct:function(){if(this.__jf){this.__jf.stop();
}this.__jf=null;
}});
})();
(function(){var j="borderTopWidth",i="borderLeftWidth",h="marginTop",g="marginLeft",f="scroll",e="qx.client",d="border-box",c="borderBottomWidth",b="borderRightWidth",a="auto",y="padding",x="qx.bom.element.Location",w="paddingLeft",v="static",u="marginBottom",t="visible",s="BODY",r="paddingBottom",q="paddingTop",p="marginRight",n="position",o="margin",l="overflow",m="paddingRight",k="border";
qx.Class.define(x,{statics:{__gB:function(z,A){return qx.bom.element.Style.get(z,A,qx.bom.element.Style.COMPUTED_MODE,false);
},__gC:function(B,C){return parseInt(qx.bom.element.Style.get(B,C,qx.bom.element.Style.COMPUTED_MODE,false),10)||0;
},__gD:function(D){var G=0,top=0;
if(D.getBoundingClientRect&&!qx.bom.client.Engine.OPERA){var F=qx.dom.Node.getWindow(D);
G-=qx.bom.Viewport.getScrollLeft(F);
top-=qx.bom.Viewport.getScrollTop(F);
}else{var E=qx.dom.Node.getDocument(D).body;
D=D.parentNode;
while(D&&D!=E){G+=D.scrollLeft;
top+=D.scrollTop;
D=D.parentNode;
}}return {left:G,top:top};
},__gE:qx.core.Variant.select(e,{"mshtml":function(H){var J=qx.dom.Node.getDocument(H);
var I=J.body;
var K=0;
var top=0;
K-=I.clientLeft+J.documentElement.clientLeft;
top-=I.clientTop+J.documentElement.clientTop;

if(qx.bom.client.Feature.STANDARD_MODE){K+=this.__gC(I,i);
top+=this.__gC(I,j);
}return {left:K,top:top};
},"webkit":function(L){var N=qx.dom.Node.getDocument(L);
var M=N.body;
var O=M.offsetLeft;
var top=M.offsetTop;
if(qx.bom.client.Engine.VERSION<530.17){O+=this.__gC(M,i);
top+=this.__gC(M,j);
}return {left:O,top:top};
},"gecko":function(P){var Q=qx.dom.Node.getDocument(P).body;
var R=Q.offsetLeft;
var top=Q.offsetTop;
if(qx.bom.client.Engine.VERSION<1.9){R+=this.__gC(Q,g);
top+=this.__gC(Q,h);
}if(qx.bom.element.BoxSizing.get(Q)!==d){R+=this.__gC(Q,i);
top+=this.__gC(Q,j);
}return {left:R,top:top};
},"default":function(S){var T=qx.dom.Node.getDocument(S).body;
var U=T.offsetLeft;
var top=T.offsetTop;
return {left:U,top:top};
}}),__gF:qx.core.Variant.select(e,{"mshtml|webkit":function(V){var X=qx.dom.Node.getDocument(V);
if(V.getBoundingClientRect){var Y=V.getBoundingClientRect();
var ba=Y.left;
var top=Y.top;
}else{var ba=V.offsetLeft;
var top=V.offsetTop;
V=V.offsetParent;
var W=X.body;
while(V&&V!=W){ba+=V.offsetLeft;
top+=V.offsetTop;
ba+=this.__gC(V,i);
top+=this.__gC(V,j);
V=V.offsetParent;
}}return {left:ba,top:top};
},"gecko":function(bb){if(bb.getBoundingClientRect){var be=bb.getBoundingClientRect();
var bf=Math.round(be.left);
var top=Math.round(be.top);
}else{var bf=0;
var top=0;
var bc=qx.dom.Node.getDocument(bb).body;
var bd=qx.bom.element.BoxSizing;

if(bd.get(bb)!==d){bf-=this.__gC(bb,i);
top-=this.__gC(bb,j);
}
while(bb&&bb!==bc){bf+=bb.offsetLeft;
top+=bb.offsetTop;
if(bd.get(bb)!==d){bf+=this.__gC(bb,i);
top+=this.__gC(bb,j);
}if(bb.parentNode&&this.__gB(bb.parentNode,l)!=t){bf+=this.__gC(bb.parentNode,i);
top+=this.__gC(bb.parentNode,j);
}bb=bb.offsetParent;
}}return {left:bf,top:top};
},"default":function(bg){var bi=0;
var top=0;
var bh=qx.dom.Node.getDocument(bg).body;
while(bg&&bg!==bh){bi+=bg.offsetLeft;
top+=bg.offsetTop;
bg=bg.offsetParent;
}return {left:bi,top:top};
}}),get:function(bj,bk){if(bj.tagName==s){var location=this.__gG(bj);
var br=location.left;
var top=location.top;
}else{var bl=this.__gE(bj);
var bq=this.__gF(bj);
var scroll=this.__gD(bj);
var br=bq.left+bl.left-scroll.left;
var top=bq.top+bl.top-scroll.top;
}var bm=br+bj.offsetWidth;
var bn=top+bj.offsetHeight;

if(bk){if(bk==y||bk==f){var bo=qx.bom.element.Overflow.getX(bj);

if(bo==f||bo==a){bm+=bj.scrollWidth-bj.offsetWidth+this.__gC(bj,i)+this.__gC(bj,b);
}var bp=qx.bom.element.Overflow.getY(bj);

if(bp==f||bp==a){bn+=bj.scrollHeight-bj.offsetHeight+this.__gC(bj,j)+this.__gC(bj,c);
}}
switch(bk){case y:br+=this.__gC(bj,w);
top+=this.__gC(bj,q);
bm-=this.__gC(bj,m);
bn-=this.__gC(bj,r);
case f:br-=bj.scrollLeft;
top-=bj.scrollTop;
bm-=bj.scrollLeft;
bn-=bj.scrollTop;
case k:br+=this.__gC(bj,i);
top+=this.__gC(bj,j);
bm-=this.__gC(bj,b);
bn-=this.__gC(bj,c);
break;
case o:br-=this.__gC(bj,g);
top-=this.__gC(bj,h);
bm+=this.__gC(bj,p);
bn+=this.__gC(bj,u);
break;
}}return {left:br,top:top,right:bm,bottom:bn};
},__gG:qx.core.Variant.select(e,{"default":function(bs){var top=bs.offsetTop+this.__gC(bs,h);
var bt=bs.offsetLeft+this.__gC(bs,g);
return {left:bt,top:top};
},"mshtml":function(bu){var top=bu.offsetTop;
var bv=bu.offsetLeft;

if(!((qx.bom.client.Engine.VERSION<8||qx.bom.client.Engine.DOCUMENT_MODE<8)&&!qx.bom.client.Feature.QUIRKS_MODE)){top+=this.__gC(bu,h);
bv+=this.__gC(bu,g);
}return {left:bv,top:top};
},"gecko":function(bw){var top=bw.offsetTop+this.__gC(bw,h)+this.__gC(bw,i);
var bx=bw.offsetLeft+this.__gC(bw,g)+this.__gC(bw,j);
return {left:bx,top:top};
}}),getLeft:function(by,bz){return this.get(by,bz).left;
},getTop:function(bA,bB){return this.get(bA,bB).top;
},getRight:function(bC,bD){return this.get(bC,bD).right;
},getBottom:function(bE,bF){return this.get(bE,bF).bottom;
},getRelative:function(bG,bH,bI,bJ){var bL=this.get(bG,bI);
var bK=this.get(bH,bJ);
return {left:bL.left-bK.left,top:bL.top-bK.top,right:bL.right-bK.right,bottom:bL.bottom-bK.bottom};
},getPosition:function(bM){return this.getRelative(bM,this.getOffsetParent(bM));
},getOffsetParent:function(bN){var bP=bN.offsetParent||document.body;
var bO=qx.bom.element.Style;

while(bP&&(!/^body|html$/i.test(bP.tagName)&&bO.get(bP,n)===v)){bP=bP.offsetParent;
}return bP;
}}});
})();
(function(){var k="",j="qx.client",i="hidden",h="-moz-scrollbars-none",g="overflow",f=";",e="overflowY",d=":",b="overflowX",a="overflow:",y="none",x="scroll",w="borderLeftStyle",v="borderRightStyle",u="div",r="borderRightWidth",q="overflow-y",p="borderLeftWidth",o="-moz-scrollbars-vertical",n="100px",l="qx.bom.element.Overflow",m="overflow-x";
qx.Class.define(l,{statics:{__go:null,getScrollbarWidth:function(){if(this.__go!==null){return this.__go;
}var z=qx.bom.element.Style;
var B=function(F,G){return parseInt(z.get(F,G),10)||0;
};
var C=function(H){return (z.get(H,v)==y?0:B(H,r));
};
var A=function(I){return (z.get(I,w)==y?0:B(I,p));
};
var E=qx.core.Variant.select(j,{"mshtml":function(J){if(z.get(J,e)==i||J.clientWidth==0){return C(J);
}return Math.max(0,J.offsetWidth-J.clientLeft-J.clientWidth);
},"default":function(K){if(K.clientWidth==0){var L=z.get(K,g);
var M=(L==x||L==o?16:0);
return Math.max(0,C(K)+M);
}return Math.max(0,(K.offsetWidth-K.clientWidth-A(K)));
}});
var D=function(N){return E(N)-C(N);
};
var t=document.createElement(u);
var s=t.style;
s.height=s.width=n;
s.overflow=x;
document.body.appendChild(t);
var c=D(t);
this.__go=c?c:16;
document.body.removeChild(t);
return this.__go;
},_compile:qx.core.Variant.select(j,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(O,P){if(P==i){P=h;
}return a+P+f;
}:
function(Q,R){return Q+d+R+f;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(S,T){return a+T+f;
}:
function(U,V){return U+d+V+f;
},"default":function(W,X){return W+d+X+f;
}}),compileX:function(Y){return this._compile(m,Y);
},compileY:function(ba){return this._compile(q,ba);
},getX:qx.core.Variant.select(j,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bb,bc){var bd=qx.bom.element.Style.get(bb,g,bc,false);

if(bd===h){bd=i;
}return bd;
}:
function(be,bf){return qx.bom.element.Style.get(be,b,bf,false);
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(bg,bh){return qx.bom.element.Style.get(bg,g,bh,false);
}:
function(bi,bj){return qx.bom.element.Style.get(bi,b,bj,false);
},"default":function(bk,bl){return qx.bom.element.Style.get(bk,b,bl,false);
}}),setX:qx.core.Variant.select(j,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bm,bn){if(bn==i){bn=h;
}bm.style.overflow=bn;
}:
function(bo,bp){bo.style.overflowX=bp;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(bq,br){bq.style.overflow=br;
}:
function(bs,bt){bs.style.overflowX=bt;
},"default":function(bu,bv){bu.style.overflowX=bv;
}}),resetX:qx.core.Variant.select(j,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bw){bw.style.overflow=k;
}:
function(bx){bx.style.overflowX=k;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(by,bz){by.style.overflow=k;
}:
function(bA,bB){bA.style.overflowX=k;
},"default":function(bC){bC.style.overflowX=k;
}}),getY:qx.core.Variant.select(j,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bD,bE){var bF=qx.bom.element.Style.get(bD,g,bE,false);

if(bF===h){bF=i;
}return bF;
}:
function(bG,bH){return qx.bom.element.Style.get(bG,e,bH,false);
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(bI,bJ){return qx.bom.element.Style.get(bI,g,bJ,false);
}:
function(bK,bL){return qx.bom.element.Style.get(bK,e,bL,false);
},"default":function(bM,bN){return qx.bom.element.Style.get(bM,e,bN,false);
}}),setY:qx.core.Variant.select(j,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bO,bP){if(bP===i){bP=h;
}bO.style.overflow=bP;
}:
function(bQ,bR){bQ.style.overflowY=bR;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(bS,bT){bS.style.overflow=bT;
}:
function(bU,bV){bU.style.overflowY=bV;
},"default":function(bW,bX){bW.style.overflowY=bX;
}}),resetY:qx.core.Variant.select(j,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bY){bY.style.overflow=k;
}:
function(ca){ca.style.overflowY=k;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(cb,cc){cb.style.overflow=k;
}:
function(cd,ce){cd.style.overflowY=k;
},"default":function(cf){cf.style.overflowY=k;
}})}});
})();
(function(){var o="auto",n="px",m=",",l="clip:auto;",k="rect(",j=");",i="",h=")",g="qx.bom.element.Clip",f="string",c="clip:rect(",e=" ",d="clip",b="rect(auto,auto,auto,auto)",a="rect(auto, auto, auto, auto)";
qx.Class.define(g,{statics:{compile:function(p){if(!p){return l;
}var u=p.left;
var top=p.top;
var t=p.width;
var s=p.height;
var q,r;

if(u==null){q=(t==null?o:t+n);
u=o;
}else{q=(t==null?o:u+t+n);
u=u+n;
}
if(top==null){r=(s==null?o:s+n);
top=o;
}else{r=(s==null?o:top+s+n);
top=top+n;
}return c+top+m+q+m+r+m+u+j;
},get:function(v,w){var y=qx.bom.element.Style.get(v,d,w,false);
var E,top,C,B;
var x,z;

if(typeof y===f&&y!==o&&y!==i){y=qx.lang.String.trim(y);
if(/\((.*)\)/.test(y)){var D=RegExp.$1;
if(/,/.test(D)){var A=D.split(m);
}else{var A=D.split(e);
}top=qx.lang.String.trim(A[0]);
x=qx.lang.String.trim(A[1]);
z=qx.lang.String.trim(A[2]);
E=qx.lang.String.trim(A[3]);
if(E===o){E=null;
}
if(top===o){top=null;
}
if(x===o){x=null;
}
if(z===o){z=null;
}if(top!=null){top=parseInt(top,10);
}
if(x!=null){x=parseInt(x,10);
}
if(z!=null){z=parseInt(z,10);
}
if(E!=null){E=parseInt(E,10);
}if(x!=null&&E!=null){C=x-E;
}else if(x!=null){C=x;
}
if(z!=null&&top!=null){B=z-top;
}else if(z!=null){B=z;
}}else{throw new Error("Could not parse clip string: "+y);
}}return {left:E||null,top:top||null,width:C||null,height:B||null};
},set:function(F,G){if(!G){F.style.clip=b;
return;
}var L=G.left;
var top=G.top;
var K=G.width;
var J=G.height;
var H,I;

if(L==null){H=(K==null?o:K+n);
L=o;
}else{H=(K==null?o:L+K+n);
L=L+n;
}
if(top==null){I=(J==null?o:J+n);
top=o;
}else{I=(J==null?o:top+J+n);
top=top+n;
}F.style.clip=k+top+m+H+m+I+m+L+h;
},reset:function(M){M.style.clip=a;
}}});
})();
(function(){var m="",l="qx.client",k=";",j="opacity:",i="opacity",h="filter",g="MozOpacity",f=");",e=")",d="zoom:1;filter:alpha(opacity=",a="qx.bom.element.Opacity",c="alpha(opacity=",b="-moz-opacity:";
qx.Class.define(a,{statics:{SUPPORT_CSS3_OPACITY:false,compile:qx.core.Variant.select(l,{"mshtml":function(n){if(n>=1){n=1;
}
if(n<0.00001){n=0;
}
if(qx.bom.element.Opacity.SUPPORT_CSS3_OPACITY){return j+n+k;
}else{return d+(n*100)+f;
}},"gecko":function(o){if(o>=1){o=0.999999;
}
if(!qx.bom.element.Opacity.SUPPORT_CSS3_OPACITY){return b+o+k;
}else{return j+o+k;
}},"default":function(p){if(p>=1){return m;
}return j+p+k;
}}),set:qx.core.Variant.select(l,{"mshtml":function(q,r){if(qx.bom.element.Opacity.SUPPORT_CSS3_OPACITY){if(r>=1){r=m;
}q.style.opacity=r;
}else{var s=qx.bom.element.Style.get(q,h,qx.bom.element.Style.COMPUTED_MODE,false);

if(r>=1){r=1;
}
if(r<0.00001){r=0;
}if(!q.currentStyle||!q.currentStyle.hasLayout){q.style.zoom=1;
}q.style.filter=s.replace(/alpha\([^\)]*\)/gi,m)+c+r*100+e;
}},"gecko":function(t,u){if(u>=1){u=0.999999;
}
if(!qx.bom.element.Opacity.SUPPORT_CSS3_OPACITY){t.style.MozOpacity=u;
}else{t.style.opacity=u;
}},"default":function(v,w){if(w>=1){w=m;
}v.style.opacity=w;
}}),reset:qx.core.Variant.select(l,{"mshtml":function(x){if(qx.bom.element.Opacity.SUPPORT_CSS3_OPACITY){x.style.opacity=m;
}else{var y=qx.bom.element.Style.get(x,h,qx.bom.element.Style.COMPUTED_MODE,false);
x.style.filter=y.replace(/alpha\([^\)]*\)/gi,m);
}},"gecko":function(z){if(!qx.bom.element.Opacity.SUPPORT_CSS3_OPACITY){z.style.MozOpacity=m;
}else{z.style.opacity=m;
}},"default":function(A){A.style.opacity=m;
}}),get:qx.core.Variant.select(l,{"mshtml":function(B,C){if(qx.bom.element.Opacity.SUPPORT_CSS3_OPACITY){var D=qx.bom.element.Style.get(B,i,C,false);

if(D!=null){return parseFloat(D);
}return 1.0;
}else{var E=qx.bom.element.Style.get(B,h,C,false);

if(E){var D=E.match(/alpha\(opacity=(.*)\)/);

if(D&&D[1]){return parseFloat(D[1])/100;
}}return 1.0;
}},"gecko":function(F,G){var H=qx.bom.element.Style.get(F,!qx.bom.element.Opacity.SUPPORT_CSS3_OPACITY?g:i,G,false);

if(H==0.999999){H=1.0;
}
if(H!=null){return parseFloat(H);
}return 1.0;
},"default":function(I,J){var K=qx.bom.element.Style.get(I,i,J,false);

if(K!=null){return parseFloat(K);
}return 1.0;
}})},defer:function(L){L.SUPPORT_CSS3_OPACITY=(typeof document.documentElement.style.opacity=="string");
}});
})();
(function(){var k="n-resize",j="e-resize",i="nw-resize",h="ne-resize",g="",f="cursor:",e="qx.client",d=";",c="qx.bom.element.Cursor",b="cursor",a="hand";
qx.Class.define(c,{statics:{__gt:qx.core.Variant.select(e,{"mshtml":{"cursor":a,"ew-resize":j,"ns-resize":k,"nesw-resize":h,"nwse-resize":i},"opera":{"col-resize":j,"row-resize":k,"ew-resize":j,"ns-resize":k,"nesw-resize":h,"nwse-resize":i},"default":{}}),compile:function(l){return f+(this.__gt[l]||l)+d;
},get:function(m,n){return qx.bom.element.Style.get(m,b,n,false);
},set:function(o,p){o.style.cursor=this.__gt[p]||p;
},reset:function(q){q.style.cursor=g;
}}});
})();
(function(){var s="qx.client",r="",q="qx.debug",p="boxSizing",o="on",n="box-sizing",m=":",k="border-box",j="qx.bom.element.BoxSizing",h="KhtmlBoxSizing",c="-moz-box-sizing",g="WebkitBoxSizing",f=";",b="-khtml-box-sizing",a="content-box",e="-webkit-box-sizing",d="MozBoxSizing";
qx.Class.define(j,{statics:{__gp:qx.core.Variant.select(s,{"mshtml":null,"webkit":[p,h,g],"gecko":[d],"opera":[p]}),__gq:qx.core.Variant.select(s,{"mshtml":null,"webkit":[n,b,e],"gecko":[c],"opera":[n]}),__gr:{tags:{button:true,select:true},types:{search:true,button:true,submit:true,reset:true,checkbox:true,radio:true}},__gs:function(t){var u=this.__gr;
return u.tags[t.tagName.toLowerCase()]||u.types[t.type];
},compile:qx.core.Variant.select(s,{"mshtml":function(v){if(qx.core.Variant.isSet(q,o)){qx.log.Logger.warn(this,"This client do not support the dynamic modification of the box-sizing property.");
qx.log.Logger.trace();
}},"default":function(w){var y=this.__gq;
var x=r;

if(y){for(var i=0,l=y.length;i<l;i++){x+=y[i]+m+w+f;
}}return x;
}}),get:qx.core.Variant.select(s,{"mshtml":function(z){if(qx.bom.Document.isStandardMode(qx.dom.Node.getDocument(z))){if(!this.__gs(z)){return a;
}}return k;
},"default":function(A){var C=this.__gp;
var B;

if(C){for(var i=0,l=C.length;i<l;i++){B=qx.bom.element.Style.get(A,C[i],null,false);

if(B!=null&&B!==r){return B;
}}}return r;
}}),set:qx.core.Variant.select(s,{"mshtml":function(D,E){if(qx.core.Variant.isSet(q,o)){qx.log.Logger.warn(this,"This client do not support the dynamic modification of the box-sizing property.");
}},"default":function(F,G){var H=this.__gp;

if(H){for(var i=0,l=H.length;i<l;i++){F.style[H[i]]=G;
}}}}),reset:function(I){this.set(I,r);
}}});
})();
(function(){var m="",k="qx.client",h="userSelect",g="qx.debug",f="on",e="Invalid argument 'smart'",d="style",c="Invalid argument 'element'",b="MozUserModify",a="px",L="float",K="borderImage",J="styleFloat",I="appearance",H="pixelHeight",G='Ms',F=":",E="cssFloat",D="pixelTop",C="Invalid argument 'name'",t="pixelLeft",u='O',r="Invalid argument 'styles'",s="qx.bom.element.Style",p='Khtml',q='string',n="pixelRight",o='Moz',v="pixelWidth",w="pixelBottom",y=";",x="textOverflow",A="userModify",z='Webkit',B="WebkitUserModify";
qx.Class.define(s,{statics:{__gu:function(){var M=[I,h,x,K];
var Q={};
var N=document.documentElement.style;
var R=[o,z,p,u,G];

for(var i=0,l=M.length;i<l;i++){var S=M[i];
var O=S;

if(N[S]){Q[O]=S;
continue;
}S=qx.lang.String.firstUp(S);

for(var j=0,T=R.length;j<T;j++){var P=R[j]+S;

if(typeof N[P]==q){Q[O]=P;
break;
}}}this.__gv=Q;
this.__gv[A]=qx.core.Variant.select(k,{"gecko":b,"webkit":B,"default":h});
this.__gw={};

for(var O in Q){this.__gw[O]=this.__gA(Q[O]);
}this.__gv[L]=qx.core.Variant.select(k,{"mshtml":J,"default":E});
},__gx:{width:v,height:H,left:t,right:n,top:D,bottom:w},__gy:{clip:qx.bom.element.Clip,cursor:qx.bom.element.Cursor,opacity:qx.bom.element.Opacity,boxSizing:qx.bom.element.BoxSizing,overflowX:{set:qx.lang.Function.bind(qx.bom.element.Overflow.setX,qx.bom.element.Overflow),get:qx.lang.Function.bind(qx.bom.element.Overflow.getX,qx.bom.element.Overflow),reset:qx.lang.Function.bind(qx.bom.element.Overflow.resetX,qx.bom.element.Overflow),compile:qx.lang.Function.bind(qx.bom.element.Overflow.compileX,qx.bom.element.Overflow)},overflowY:{set:qx.lang.Function.bind(qx.bom.element.Overflow.setY,qx.bom.element.Overflow),get:qx.lang.Function.bind(qx.bom.element.Overflow.getY,qx.bom.element.Overflow),reset:qx.lang.Function.bind(qx.bom.element.Overflow.resetY,qx.bom.element.Overflow),compile:qx.lang.Function.bind(qx.bom.element.Overflow.compileY,qx.bom.element.Overflow)}},compile:function(U){var W=[];
var Y=this.__gy;
var X=this.__gw;
var name,V;

for(name in U){V=U[name];

if(V==null){continue;
}name=X[name]||name;
if(Y[name]){W.push(Y[name].compile(V));
}else{W.push(this.__gA(name),F,V,y);
}}return W.join(m);
},__gz:{},__gA:function(ba){var bb=this.__gz;
var bc=bb[ba];

if(!bc){bc=bb[ba]=qx.lang.String.hyphenate(ba);
}return bc;
},setCss:qx.core.Variant.select(k,{"mshtml":function(bd,be){bd.style.cssText=be;
},"default":function(bf,bg){bf.setAttribute(d,bg);
}}),getCss:qx.core.Variant.select(k,{"mshtml":function(bh){return bh.style.cssText.toLowerCase();
},"default":function(bi){return bi.getAttribute(d);
}}),isPropertySupported:function(bj){return (this.__gy[bj]||this.__gv[bj]||bj in document.documentElement.style);
},COMPUTED_MODE:1,CASCADED_MODE:2,LOCAL_MODE:3,set:function(bk,name,bl,bm){if(qx.core.Variant.isSet(g,f)){qx.core.Assert.assertElement(bk,c);
qx.core.Assert.assertString(name,C);

if(bm!==undefined){qx.core.Assert.assertBoolean(bm,e);
}}name=this.__gv[name]||name;
if(bm!==false&&this.__gy[name]){return this.__gy[name].set(bk,bl);
}else{bk.style[name]=bl!==null?bl:m;
}},setStyles:function(bn,bo,bp){if(qx.core.Variant.isSet(g,f)){qx.core.Assert.assertElement(bn,c);
qx.core.Assert.assertMap(bo,r);

if(bp!==undefined){qx.core.Assert.assertBoolean(bp,e);
}}var bs=this.__gv;
var bu=this.__gy;
var bq=bn.style;

for(var bt in bo){var br=bo[bt];
var name=bs[bt]||bt;

if(br===undefined){if(bp!==false&&bu[name]){bu[name].reset(bn);
}else{bq[name]=m;
}}else{if(bp!==false&&bu[name]){bu[name].set(bn,br);
}else{bq[name]=br!==null?br:m;
}}}},reset:function(bv,name,bw){name=this.__gv[name]||name;
if(bw!==false&&this.__gy[name]){return this.__gy[name].reset(bv);
}else{bv.style[name]=m;
}},get:qx.core.Variant.select(k,{"mshtml":function(bx,name,by,bz){name=this.__gv[name]||name;
if(bz!==false&&this.__gy[name]){return this.__gy[name].get(bx,by);
}if(!bx.currentStyle){return bx.style[name]||m;
}switch(by){case this.LOCAL_MODE:return bx.style[name]||m;
case this.CASCADED_MODE:return bx.currentStyle[name]||m;
default:var bD=bx.currentStyle[name]||m;
if(/^-?[\.\d]+(px)?$/i.test(bD)){return bD;
}var bC=this.__gx[name];

if(bC){var bA=bx.style[name];
bx.style[name]=bD||0;
var bB=bx.style[bC]+a;
bx.style[name]=bA;
return bB;
}if(/^-?[\.\d]+(em|pt|%)?$/i.test(bD)){throw new Error("Untranslated computed property value: "+name+". Only pixel values work well across different clients.");
}return bD;
}},"default":function(bE,name,bF,bG){name=this.__gv[name]||name;
if(bG!==false&&this.__gy[name]){return this.__gy[name].get(bE,bF);
}switch(bF){case this.LOCAL_MODE:return bE.style[name]||m;
case this.CASCADED_MODE:if(bE.currentStyle){return bE.currentStyle[name]||m;
}throw new Error("Cascaded styles are not supported in this browser!");
default:var bH=qx.dom.Node.getDocument(bE);
var bI=bH.defaultView.getComputedStyle(bE,null);
return bI?bI[name]:m;
}}})},defer:function(bJ){bJ.__gu();
}});
})();
(function(){var f="CSS1Compat",e="position:absolute;width:0;height:0;width:1",d="qx.bom.Document",c="1px",b="qx.client",a="div";
qx.Class.define(d,{statics:{isQuirksMode:qx.core.Variant.select(b,{"mshtml":function(g){if(qx.bom.client.Engine.VERSION>=8){return (g||window).document.documentMode===5;
}else{return (g||window).document.compatMode!==f;
}},"webkit":function(h){if(document.compatMode===undefined){var i=(h||window).document.createElement(a);
i.style.cssText=e;
return i.style.width===c?true:false;
}else{return (h||window).document.compatMode!==f;
}},"default":function(j){return (j||window).document.compatMode!==f;
}}),isStandardMode:function(k){return !this.isQuirksMode(k);
},getWidth:function(l){var m=(l||window).document;
var n=qx.bom.Viewport.getWidth(l);
var scroll=this.isStandardMode(l)?m.documentElement.scrollWidth:m.body.scrollWidth;
return Math.max(scroll,n);
},getHeight:function(o){var p=(o||window).document;
var q=qx.bom.Viewport.getHeight(o);
var scroll=this.isStandardMode(o)?p.documentElement.scrollHeight:p.body.scrollHeight;
return Math.max(scroll,q);
}}});
})();
(function(){var b="qx.client",a="qx.bom.Viewport";
qx.Class.define(a,{statics:{getWidth:qx.core.Variant.select(b,{"opera":function(c){if(qx.bom.client.Engine.VERSION<9.5){return (c||window).document.body.clientWidth;
}else{var d=(c||window).document;
return qx.bom.Document.isStandardMode(c)?d.documentElement.clientWidth:d.body.clientWidth;
}},"webkit":function(e){if(qx.bom.client.Engine.VERSION<523.15){return (e||window).innerWidth;
}else{var f=(e||window).document;
return qx.bom.Document.isStandardMode(e)?f.documentElement.clientWidth:f.body.clientWidth;
}},"default":function(g){var h=(g||window).document;
return qx.bom.Document.isStandardMode(g)?h.documentElement.clientWidth:h.body.clientWidth;
}}),getHeight:qx.core.Variant.select(b,{"opera":function(i){if(qx.bom.client.Engine.VERSION<9.5){return (i||window).document.body.clientHeight;
}else{var j=(i||window).document;
return qx.bom.Document.isStandardMode(i)?j.documentElement.clientHeight:j.body.clientHeight;
}},"webkit":function(k){if(qx.bom.client.Engine.VERSION<523.15){return (k||window).innerHeight;
}else{var l=(k||window).document;
return qx.bom.Document.isStandardMode(k)?l.documentElement.clientHeight:l.body.clientHeight;
}},"default":function(m){var n=(m||window).document;
return qx.bom.Document.isStandardMode(m)?n.documentElement.clientHeight:n.body.clientHeight;
}}),getScrollLeft:qx.core.Variant.select(b,{"mshtml":function(o){var p=(o||window).document;
return p.documentElement.scrollLeft||p.body.scrollLeft;
},"default":function(q){return (q||window).pageXOffset;
}}),getScrollTop:qx.core.Variant.select(b,{"mshtml":function(r){var s=(r||window).document;
return s.documentElement.scrollTop||s.body.scrollTop;
},"default":function(t){return (t||window).pageYOffset;
}}),getOrientation:function(u){var v=(u||window).orientation;

if(v==null){v=this.getWidth(u)>this.getHeight(u)?90:0;
}return v;
},isLandscape:function(w){return Math.abs(this.getOrientation(w))==90;
},isPortrait:function(x){var y=this.getOrientation(x);
return (y==0||y==180);
}}});
})();
(function(){var j="top",i="right",h="bottom",g="left",f="edge-start",e="align-start",d="align-end",c="edge-end",b="qx.util.placement.AbstractAxis",a="-",G="best-fit",F="size",E="target.bottom",D="offsets",C="size.width",B='__jg',A="offsets.bottom",z="qx.util.placement.Placement",y="qx.debug",x="keep-align",q="target.right",r="direct",o="offsets.right",p="target",m="offsets.left",n="area",k="target.top",l="area.height",s="target.left",t="area.width",v="on",u="size.height",w="offsets.top";
qx.Class.define(z,{extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__jg=new qx.util.placement.DirectAxis();
},properties:{axisX:{check:b},axisY:{check:b},edge:{check:[j,i,h,g],init:j},align:{check:[j,i,h,g],init:i}},statics:{__jh:null,compute:function(H,I,J,K,L,M,N){this.__jh=this.__jh||new qx.util.placement.Placement();
var Q=L.split(a);
var P=Q[0];
var O=Q[1];
this.__jh.set({axisX:this.__jl(M),axisY:this.__jl(N),edge:P,align:O});
return this.__jh.compute(H,I,J,K);
},__ji:null,__jj:null,__jk:null,__jl:function(R){switch(R){case r:this.__ji=this.__ji||new qx.util.placement.DirectAxis();
return this.__ji;
case x:this.__jj=this.__jj||new qx.util.placement.KeepAlignAxis();
return this.__jj;
case G:this.__jk=this.__jk||new qx.util.placement.BestFitAxis();
return this.__jk;
default:throw new Error("Invalid 'mode' argument!'");
}}},members:{__jg:null,compute:function(S,T,U,V){if(qx.core.Variant.isSet(y,v)){this.assertObject(S,F);
this.assertNumber(S.width,C);
this.assertNumber(S.height,u);
this.assertObject(T,n);
this.assertNumber(T.width,t);
this.assertNumber(T.height,l);
this.assertObject(U,p);
this.assertNumber(U.top,k);
this.assertNumber(U.right,q);
this.assertNumber(U.bottom,E);
this.assertNumber(U.left,s);
this.assertObject(V,D);
this.assertNumber(V.top,w);
this.assertNumber(V.right,o);
this.assertNumber(V.bottom,A);
this.assertNumber(V.left,m);
}var W=this.getAxisX()||this.__jg;
var Y=W.computeStart(S.width,{start:U.left,end:U.right},{start:V.left,end:V.right},T.width,this.__jm());
var X=this.getAxisY()||this.__jg;
var top=X.computeStart(S.height,{start:U.top,end:U.bottom},{start:V.top,end:V.bottom},T.height,this.__jn());
return {left:Y,top:top};
},__jm:function(){var bb=this.getEdge();
var ba=this.getAlign();

if(bb==g){return f;
}else if(bb==i){return c;
}else if(ba==g){return e;
}else if(ba==i){return d;
}},__jn:function(){var bd=this.getEdge();
var bc=this.getAlign();

if(bd==j){return f;
}else if(bd==h){return c;
}else if(bc==j){return e;
}else if(bc==h){return d;
}}},destruct:function(){this._disposeObjects(B);
}});
})();
(function(){var e="edge-start",d="align-start",c="align-end",b="edge-end",a="qx.util.placement.AbstractAxis";
qx.Class.define(a,{extend:qx.core.Object,members:{computeStart:function(f,g,h,i,j){throw new Error("abstract method call!");
},_moveToEdgeAndAlign:function(k,l,m,n){switch(n){case e:return l.start-m.end-k;
case b:return l.end+m.start;
case d:return l.start+m.start;
case c:return l.end-m.end-k;
}},_isInRange:function(o,p,q){return o>=0&&o+p<=q;
}}});
})();
(function(){var a="qx.util.placement.DirectAxis";
qx.Class.define(a,{extend:qx.util.placement.AbstractAxis,members:{computeStart:function(b,c,d,e,f){return this._moveToEdgeAndAlign(b,c,d,f);
}}});
})();
(function(){var c="qx.util.placement.KeepAlignAxis",b="edge-start",a="edge-end";
qx.Class.define(c,{extend:qx.util.placement.AbstractAxis,members:{computeStart:function(d,e,f,g,h){var i=this._moveToEdgeAndAlign(d,e,f,h);
var j,k;

if(this._isInRange(i,d,g)){return i;
}
if(h==b||h==a){j=e.start-f.end;
k=e.end+f.start;
}else{j=e.end-f.end;
k=e.start+f.start;
}
if(j>g-k){i=j-d;
}else{i=k;
}return i;
}}});
})();
(function(){var a="qx.util.placement.BestFitAxis";
qx.Class.define(a,{extend:qx.util.placement.AbstractAxis,members:{computeStart:function(b,c,d,e,f){var g=this._moveToEdgeAndAlign(b,c,d,f);

if(this._isInRange(g,b,e)){return g;
}
if(g<0){g=Math.min(0,e-b);
}
if(g+b>e){g=Math.max(0,e-b);
}return g;
}}});
})();
(function(){var b="qx.ui.core.queue.Layout",a="layout";
qx.Class.define(b,{statics:{__gM:{},remove:function(c){delete this.__gM[c.$$hash];
},add:function(d){this.__gM[d.$$hash]=d;
qx.ui.core.queue.Manager.scheduleFlush(a);
},isScheduled:function(e){return !!this.__gM[e.$$hash];
},flush:function(){var f=this.__gP();
for(var i=f.length-1;i>=0;i--){var g=f[i];
if(g.hasValidLayout()){continue;
}if(g.isRootWidget()&&!g.hasUserBounds()){var j=g.getSizeHint();
g.renderLayout(0,0,j.width,j.height);
}else{var h=g.getBounds();
g.renderLayout(h.left,h.top,h.width,h.height);
}}},getNestingLevel:function(k){var l=this.__gO;
var n=0;
var parent=k;
while(true){if(l[parent.$$hash]!=null){n+=l[parent.$$hash];
break;
}
if(!parent.$$parent){break;
}parent=parent.$$parent;
n+=1;
}var m=n;

while(k&&k!==parent){l[k.$$hash]=m--;
k=k.$$parent;
}return n;
},__gN:function(){var t=qx.ui.core.queue.Visibility;
this.__gO={};
var s=[];
var r=this.__gM;
var o,q;

for(var p in r){o=r[p];

if(t.isVisible(o)){q=this.getNestingLevel(o);
if(!s[q]){s[q]={};
}s[q][p]=o;
delete r[p];
}}return s;
},__gP:function(){var x=[];
var z=this.__gN();

for(var w=z.length-1;w>=0;w--){if(!z[w]){continue;
}
for(var v in z[w]){var u=z[w][v];
if(w==0||u.isRootWidget()||u.hasUserBounds()){x.push(u);
u.invalidateLayoutCache();
continue;
}var B=u.getSizeHint(false);

if(B){u.invalidateLayoutCache();
var y=u.getSizeHint();
var A=(!u.getBounds()||B.minWidth!==y.minWidth||B.width!==y.width||B.maxWidth!==y.maxWidth||B.minHeight!==y.minHeight||B.height!==y.height||B.maxHeight!==y.maxHeight);
}else{A=true;
}
if(A){var parent=u.getLayoutParent();

if(!z[w-1]){z[w-1]={};
}z[w-1][parent.$$hash]=parent;
}else{x.push(u);
}}}return x;
}}});
})();
(function(){var b="qx.util.DeferredCallManager",a="singleton";
qx.Class.define(b,{extend:qx.core.Object,type:a,construct:function(){this.__cJ={};
this.__cK=qx.lang.Function.bind(this.__cO,this);
this.__cL=false;
},members:{__cM:null,__cN:null,__cJ:null,__cL:null,__cK:null,schedule:function(c){if(this.__cM==null){this.__cM=window.setTimeout(this.__cK,0);
}var d=c.toHashCode();
if(this.__cN&&this.__cN[d]){return;
}this.__cJ[d]=c;
this.__cL=true;
},cancel:function(e){var f=e.toHashCode();
if(this.__cN&&this.__cN[f]){this.__cN[f]=null;
return;
}delete this.__cJ[f];
if(qx.lang.Object.isEmpty(this.__cJ)&&this.__cM!=null){window.clearTimeout(this.__cM);
this.__cM=null;
}},__cO:qx.event.GlobalError.observeMethod(function(){this.__cM=null;
while(this.__cL){this.__cN=qx.lang.Object.clone(this.__cJ);
this.__cJ={};
this.__cL=false;

for(var h in this.__cN){var g=this.__cN[h];

if(g){this.__cN[h]=null;
g.call();
}}}this.__cN=null;
})},destruct:function(){if(this.__cM!=null){window.clearTimeout(this.__cM);
}this.__cK=this.__cJ=null;
}});
})();
(function(){var a="qx.util.DeferredCall";
qx.Class.define(a,{extend:qx.core.Object,construct:function(b,c){qx.core.Object.call(this);
this.__cP=b;
this.__cQ=c||null;
this.__cR=qx.util.DeferredCallManager.getInstance();
},members:{__cP:null,__cQ:null,__cR:null,cancel:function(){this.__cR.cancel(this);
},schedule:function(){this.__cR.schedule(this);
},call:function(){this.__cQ?this.__cP.apply(this.__cQ):this.__cP();
}},destruct:function(d,e){this.cancel();
this.__cQ=this.__cP=this.__cR=null;
}});
})();
(function(){var m="on",k="element",j="qx.debug",h="qx.client",g="qxSelectable",f="off",d="text",c="': ",b="Invalid context for callback.",a="div",R="'",Q="Invalid event type.",P="Invalid callback function",O="",N="mshtml",M="none",L="scroll",K="|bubble|",J="qx.html.Element",I="|capture|",t="Invalid capture flag.",u="activate",r="Failed to add event listener for type '",s="blur",p="deactivate",q="capture",n="userSelect",o=" from the target '",v="-moz-none",w="visible",B="releaseCapture",A="tabIndex",D="focus",C="MozUserSelect",F=" to the target '",E="Failed to remove event listener for type '",z="__dp",H="Invalid capture falg.",G="hidden";
qx.Class.define(J,{extend:qx.core.Object,construct:function(S,T,U){qx.core.Object.call(this);
this.__cS=S||a;
this.__cT=T||null;
this.__cU=U||null;
},statics:{DEBUG:false,_modified:{},_visibility:{},_scroll:{},_actions:[],__cV:{},_scheduleFlush:function(V){qx.html.Element.__dA.schedule();
},flush:function(){var bh;

if(qx.core.Variant.isSet(j,m)){if(this.DEBUG){qx.log.Logger.debug(this,"Flushing elements...");
}}var Y=this.__cW();
var X=Y.getFocus();

if(X&&this.__db(X)){Y.blur(X);
}var bo=Y.getActive();

if(bo&&this.__db(bo)){qx.bom.Element.deactivate(bo);
}var bc=this.__cY();

if(bc&&this.__db(bc)){qx.bom.Element.releaseCapture(bc);
}var bi=[];
var bj=this._modified;

for(var bg in bj){bh=bj[bg];
if(bh.__dt()){if(bh.__dc&&qx.dom.Hierarchy.isRendered(bh.__dc)){bi.push(bh);
}else{if(qx.core.Variant.isSet(j,m)){if(this.DEBUG){bh.debug("Flush invisible element");
}}bh.__ds();
}delete bj[bg];
}}
for(var i=0,l=bi.length;i<l;i++){bh=bi[i];

if(qx.core.Variant.isSet(j,m)){if(this.DEBUG){bh.debug("Flush rendered element");
}}bh.__ds();
}var be=this._visibility;

for(var bg in be){bh=be[bg];
var bk=bh.__dc;

if(!bk){delete be[bg];
continue;
}
if(qx.core.Variant.isSet(j,m)){if(this.DEBUG){qx.log.Logger.debug(this,"Switching visibility to: "+bh.__df);
}}if(!bh.$$disposed){bk.style.display=bh.__df?O:M;
if(qx.core.Variant.isSet(h,N)){if(!(document.documentMode>=8)){bk.style.visibility=bh.__df?w:G;
}}}delete be[bg];
}var scroll=this._scroll;

for(var bg in scroll){bh=scroll[bg];
var bp=bh.__dc;

if(bp&&bp.offsetWidth){var bb=true;
if(bh.__di!=null){bh.__dc.scrollLeft=bh.__di;
delete bh.__di;
}if(bh.__dj!=null){bh.__dc.scrollTop=bh.__dj;
delete bh.__dj;
}var bl=bh.__dg;

if(bl!=null){var bf=bl.element.getDomElement();

if(bf&&bf.offsetWidth){qx.bom.element.Scroll.intoViewX(bf,bp,bl.align);
delete bh.__dg;
}else{bb=false;
}}var bm=bh.__dh;

if(bm!=null){var bf=bm.element.getDomElement();

if(bf&&bf.offsetWidth){qx.bom.element.Scroll.intoViewY(bf,bp,bm.align);
delete bh.__dh;
}else{bb=false;
}}if(bb){delete scroll[bg];
}}}var ba={"releaseCapture":1,"blur":1,"deactivate":1};
for(var i=0;i<this._actions.length;i++){var bn=this._actions[i];
var bk=bn.element.__dc;

if(!bk||!ba[bn.type]&&!bn.element.__dt()){continue;
}var bd=bn.args;
bd.unshift(bk);
qx.bom.Element[bn.type].apply(qx.bom.Element,bd);
}this._actions=[];
for(var bg in this.__cV){var W=this.__cV[bg];
var bp=W.element.__dc;

if(bp){qx.bom.Selection.set(bp,W.start,W.end);
delete this.__cV[bg];
}}qx.event.handler.Appear.refresh();
},__cW:function(){if(!this.__cX){var bq=qx.event.Registration.getManager(window);
this.__cX=bq.getHandler(qx.event.handler.Focus);
}return this.__cX;
},__cY:function(){if(!this.__da){var br=qx.event.Registration.getManager(window);
this.__da=br.getDispatcher(qx.event.dispatch.MouseCapture);
}return this.__da.getCaptureElement();
},__db:function(bs){var bt=qx.core.ObjectRegistry.fromHashCode(bs.$$element);
return bt&&!bt.__dt();
}},members:{__cS:null,__dc:null,__dd:false,__de:true,__df:true,__dg:null,__dh:null,__di:null,__dj:null,__dk:null,__dl:null,__dm:null,__cT:null,__cU:null,__dn:null,__do:null,__dp:null,__dq:null,__dr:null,_scheduleChildrenUpdate:function(){if(this.__dq){return;
}this.__dq=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(k);
},_createDomElement:function(){return qx.bom.Element.create(this.__cS);
},__ds:function(){if(qx.core.Variant.isSet(j,m)){if(this.DEBUG){this.debug("Flush: "+this.getAttribute("id"));
}}var length;
var bu=this.__dp;

if(bu){length=bu.length;
var bv;

for(var i=0;i<length;i++){bv=bu[i];

if(bv.__df&&bv.__de&&!bv.__dc){bv.__ds();
}}}
if(!this.__dc){this.__dc=this._createDomElement();
this.__dc.$$element=this.$$hash;
this._copyData(false);

if(bu&&length>0){this._insertChildren();
}}else{this._syncData();

if(this.__dq){this._syncChildren();
}}delete this.__dq;
},_insertChildren:function(){var bw=this.__dp;
var length=bw.length;
var by;

if(length>2){var bx=document.createDocumentFragment();

for(var i=0;i<length;i++){by=bw[i];

if(by.__dc&&by.__de){bx.appendChild(by.__dc);
}}this.__dc.appendChild(bx);
}else{var bx=this.__dc;

for(var i=0;i<length;i++){by=bw[i];

if(by.__dc&&by.__de){bx.appendChild(by.__dc);
}}}},_syncChildren:function(){var bI=qx.core.ObjectRegistry;
var bz=this.__dp;
var bG=bz.length;
var bA;
var bE;
var bC=this.__dc;
var bF=bC.childNodes;
var bB=0;
var bD;

if(qx.core.Variant.isSet(j,m)){var bH=0;
}for(var i=bF.length-1;i>=0;i--){bD=bF[i];
bE=bI.fromHashCode(bD.$$element);

if(!bE||!bE.__de||bE.__dr!==this){bC.removeChild(bD);

if(qx.core.Variant.isSet(j,m)){bH++;
}}}for(var i=0;i<bG;i++){bA=bz[i];
if(bA.__de){bE=bA.__dc;
bD=bF[bB];

if(!bE){continue;
}if(bE!=bD){if(bD){bC.insertBefore(bE,bD);
}else{bC.appendChild(bE);
}
if(qx.core.Variant.isSet(j,m)){bH++;
}}bB++;
}}if(qx.core.Variant.isSet(j,m)){if(qx.html.Element.DEBUG){this.debug("Synced DOM with "+bH+" operations");
}}},_copyData:function(bJ){var bN=this.__dc;
var bM=this.__cU;

if(bM){var bK=qx.bom.element.Attribute;

for(var bO in bM){bK.set(bN,bO,bM[bO]);
}}var bM=this.__cT;

if(bM){var bL=qx.bom.element.Style;

if(bJ){bL.setStyles(bN,bM);
}else{bL.setCss(bN,bL.compile(bM));
}}var bM=this.__dn;

if(bM){for(var bO in bM){this._applyProperty(bO,bM[bO]);
}}var bM=this.__do;

if(bM){qx.event.Registration.getManager(bN).importListeners(bN,bM);
delete this.__do;
}},_syncData:function(){var bT=this.__dc;
var bS=qx.bom.element.Attribute;
var bQ=qx.bom.element.Style;
var bR=this.__dl;

if(bR){var bW=this.__cU;

if(bW){var bU;

for(var bV in bR){bU=bW[bV];

if(bU!==undefined){bS.set(bT,bV,bU);
}else{bS.reset(bT,bV);
}}}this.__dl=null;
}var bR=this.__dk;

if(bR){var bW=this.__cT;

if(bW){var bP={};

for(var bV in bR){bP[bV]=bW[bV];
}bQ.setStyles(bT,bP);
}this.__dk=null;
}var bR=this.__dm;

if(bR){var bW=this.__dn;

if(bW){var bU;

for(var bV in bR){this._applyProperty(bV,bW[bV]);
}}this.__dm=null;
}},__dt:function(){var bX=this;
while(bX){if(bX.__dd){return true;
}
if(!bX.__de||!bX.__df){return false;
}bX=bX.__dr;
}return false;
},__du:function(bY){if(bY.__dr===this){throw new Error("Child is already in: "+bY);
}
if(bY.__dd){throw new Error("Root elements could not be inserted into other ones.");
}if(bY.__dr){bY.__dr.remove(bY);
}bY.__dr=this;
if(!this.__dp){this.__dp=[];
}if(this.__dc){this._scheduleChildrenUpdate();
}},__dv:function(ca){if(ca.__dr!==this){throw new Error("Has no child: "+ca);
}if(this.__dc){this._scheduleChildrenUpdate();
}delete ca.__dr;
},__dw:function(cb){if(cb.__dr!==this){throw new Error("Has no child: "+cb);
}if(this.__dc){this._scheduleChildrenUpdate();
}},getChildren:function(){return this.__dp||null;
},getChild:function(cc){var cd=this.__dp;
return cd&&cd[cc]||null;
},hasChildren:function(){var ce=this.__dp;
return ce&&ce[0]!==undefined;
},indexOf:function(cf){var cg=this.__dp;
return cg?cg.indexOf(cf):-1;
},hasChild:function(ch){var ci=this.__dp;
return ci&&ci.indexOf(ch)!==-1;
},add:function(cj){if(arguments[1]){for(var i=0,l=arguments.length;i<l;i++){this.__du(arguments[i]);
}this.__dp.push.apply(this.__dp,arguments);
}else{this.__du(cj);
this.__dp.push(cj);
}return this;
},addAt:function(ck,cl){this.__du(ck);
qx.lang.Array.insertAt(this.__dp,ck,cl);
return this;
},remove:function(cm){var cn=this.__dp;

if(!cn){return;
}
if(arguments[1]){var co;

for(var i=0,l=arguments.length;i<l;i++){co=arguments[i];
this.__dv(co);
qx.lang.Array.remove(cn,co);
}}else{this.__dv(cm);
qx.lang.Array.remove(cn,cm);
}return this;
},removeAt:function(cp){var cq=this.__dp;

if(!cq){throw new Error("Has no children!");
}var cr=cq[cp];

if(!cr){throw new Error("Has no child at this position!");
}this.__dv(cr);
qx.lang.Array.removeAt(this.__dp,cp);
return this;
},removeAll:function(){var cs=this.__dp;

if(cs){for(var i=0,l=cs.length;i<l;i++){this.__dv(cs[i]);
}cs.length=0;
}return this;
},getParent:function(){return this.__dr||null;
},insertInto:function(parent,ct){parent.__du(this);

if(ct==null){parent.__dp.push(this);
}else{qx.lang.Array.insertAt(this.__dp,this,ct);
}return this;
},insertBefore:function(cu){var parent=cu.__dr;
parent.__du(this);
qx.lang.Array.insertBefore(parent.__dp,this,cu);
return this;
},insertAfter:function(cv){var parent=cv.__dr;
parent.__du(this);
qx.lang.Array.insertAfter(parent.__dp,this,cv);
return this;
},moveTo:function(cw){var parent=this.__dr;
parent.__dw(this);
var cx=parent.__dp.indexOf(this);

if(cx===cw){throw new Error("Could not move to same index!");
}else if(cx<cw){cw--;
}qx.lang.Array.removeAt(parent.__dp,cx);
qx.lang.Array.insertAt(parent.__dp,this,cw);
return this;
},moveBefore:function(cy){var parent=this.__dr;
return this.moveTo(parent.__dp.indexOf(cy));
},moveAfter:function(cz){var parent=this.__dr;
return this.moveTo(parent.__dp.indexOf(cz)+1);
},free:function(){var parent=this.__dr;

if(!parent){throw new Error("Has no parent to remove from.");
}
if(!parent.__dp){return;
}parent.__dv(this);
qx.lang.Array.remove(parent.__dp,this);
return this;
},getDomElement:function(){return this.__dc||null;
},getNodeName:function(){return this.__cS;
},setNodeName:function(name){this.__cS=name;
},setRoot:function(cA){this.__dd=cA;
},useMarkup:function(cB){if(this.__dc){throw new Error("Could not overwrite existing element!");
}if(qx.core.Variant.isSet(h,N)){var cC=document.createElement(a);
}else{var cC=qx.bom.Element.getHelperElement();
}cC.innerHTML=cB;
this.useElement(cC.firstChild);
return this.__dc;
},useElement:function(cD){if(this.__dc){throw new Error("Could not overwrite existing element!");
}this.__dc=cD;
this.__dc.$$element=this.$$hash;
this._copyData(true);
},isFocusable:function(){var cF=this.getAttribute(A);

if(cF>=1){return true;
}var cE=qx.event.handler.Focus.FOCUSABLE_ELEMENTS;

if(cF>=0&&cE[this.__cS]){return true;
}return false;
},setSelectable:qx.core.Variant.select(h,{"webkit":function(cG){this.setAttribute(g,cG?m:f);
this.setStyle(n,cG?d:M);
},"gecko":function(cH){this.setAttribute(g,cH?m:f);
this.setStyle(C,cH?d:v);
},"default":function(cI){this.setAttribute(g,cI?m:f);
}}),isNativelyFocusable:function(){return !!qx.event.handler.Focus.FOCUSABLE_ELEMENTS[this.__cS];
},include:function(){if(this.__de){return;
}delete this.__de;

if(this.__dr){this.__dr._scheduleChildrenUpdate();
}return this;
},exclude:function(){if(!this.__de){return;
}this.__de=false;

if(this.__dr){this.__dr._scheduleChildrenUpdate();
}return this;
},isIncluded:function(){return this.__de===true;
},show:function(){if(this.__df){return;
}
if(this.__dc){qx.html.Element._visibility[this.$$hash]=this;
qx.html.Element._scheduleFlush(k);
}if(this.__dr){this.__dr._scheduleChildrenUpdate();
}delete this.__df;
},hide:function(){if(!this.__df){return;
}
if(this.__dc){qx.html.Element._visibility[this.$$hash]=this;
qx.html.Element._scheduleFlush(k);
}this.__df=false;
},isVisible:function(){return this.__df===true;
},scrollChildIntoViewX:function(cJ,cK,cL){var cM=this.__dc;
var cN=cJ.getDomElement();

if(cL!==false&&cM&&cM.offsetWidth&&cN&&cN.offsetWidth){qx.bom.element.Scroll.intoViewX(cN,cM,cK);
}else{this.__dg={element:cJ,align:cK};
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(k);
}delete this.__di;
},scrollChildIntoViewY:function(cO,cP,cQ){var cR=this.__dc;
var cS=cO.getDomElement();

if(cQ!==false&&cR&&cR.offsetWidth&&cS&&cS.offsetWidth){qx.bom.element.Scroll.intoViewY(cS,cR,cP);
}else{this.__dh={element:cO,align:cP};
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(k);
}delete this.__dj;
},scrollToX:function(x,cT){var cU=this.__dc;

if(cT!==true&&cU&&cU.offsetWidth){cU.scrollLeft=x;
delete this.__di;
}else{this.__di=x;
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(k);
}delete this.__dg;
},getScrollX:function(){var cV=this.__dc;

if(cV){return cV.scrollLeft;
}return this.__di||0;
},scrollToY:function(y,cW){var cX=this.__dc;

if(cW!==true&&cX&&cX.offsetWidth){cX.scrollTop=y;
delete this.__dj;
}else{this.__dj=y;
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(k);
}delete this.__dh;
},getScrollY:function(){var cY=this.__dc;

if(cY){return cY.scrollTop;
}return this.__dj||0;
},disableScrolling:function(){this.enableScrolling();
this.scrollToX(0);
this.scrollToY(0);
this.addListener(L,this.__dy,this);
},enableScrolling:function(){this.removeListener(L,this.__dy,this);
},__dx:null,__dy:function(e){if(!this.__dx){this.__dx=true;
this.__dc.scrollTop=0;
this.__dc.scrollLeft=0;
delete this.__dx;
}},getTextSelection:function(){var da=this.__dc;

if(da){return qx.bom.Selection.get(da);
}return null;
},getTextSelectionLength:function(){var dc=this.__dc;

if(dc){return qx.bom.Selection.getLength(dc);
}return null;
},getTextSelectionStart:function(){var dd=this.__dc;

if(dd){return qx.bom.Selection.getStart(dd);
}return null;
},getTextSelectionEnd:function(){var de=this.__dc;

if(de){return qx.bom.Selection.getEnd(de);
}return null;
},setTextSelection:function(df,dg){var dh=this.__dc;

if(dh){qx.bom.Selection.set(dh,df,dg);
return;
}qx.html.Element.__cV[this.toHashCode()]={element:this,start:df,end:dg};
qx.html.Element._scheduleFlush(k);
},clearTextSelection:function(){var di=this.__dc;

if(di){qx.bom.Selection.clear(di);
}delete qx.html.Element.__cV[this.toHashCode()];
},__dz:function(dj,dk){var dl=qx.html.Element._actions;
dl.push({type:dj,element:this,args:dk||[]});
qx.html.Element._scheduleFlush(k);
},focus:function(){this.__dz(D);
},blur:function(){this.__dz(s);
},activate:function(){this.__dz(u);
},deactivate:function(){this.__dz(p);
},capture:function(dm){this.__dz(q,[dm!==false]);
},releaseCapture:function(){this.__dz(B);
},setStyle:function(dn,dp,dq){if(!this.__cT){this.__cT={};
}
if(this.__cT[dn]==dp){return;
}
if(dp==null){delete this.__cT[dn];
}else{this.__cT[dn]=dp;
}if(this.__dc){if(dq){qx.bom.element.Style.set(this.__dc,dn,dp);
return this;
}if(!this.__dk){this.__dk={};
}this.__dk[dn]=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(k);
}return this;
},setStyles:function(dr,ds){var dt=qx.bom.element.Style;

if(!this.__cT){this.__cT={};
}
if(this.__dc){if(!this.__dk){this.__dk={};
}
for(var dv in dr){var du=dr[dv];

if(this.__cT[dv]==du){continue;
}
if(du==null){delete this.__cT[dv];
}else{this.__cT[dv]=du;
}if(ds){dt.set(this.__dc,dv,du);
continue;
}this.__dk[dv]=true;
}qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(k);
}else{for(var dv in dr){var du=dr[dv];

if(this.__cT[dv]==du){continue;
}
if(du==null){delete this.__cT[dv];
}else{this.__cT[dv]=du;
}}}return this;
},removeStyle:function(dw,dx){this.setStyle(dw,null,dx);
},getStyle:function(dy){return this.__cT?this.__cT[dy]:null;
},getAllStyles:function(){return this.__cT||null;
},setAttribute:function(dz,dA,dB){if(!this.__cU){this.__cU={};
}
if(this.__cU[dz]==dA){return;
}
if(dA==null){delete this.__cU[dz];
}else{this.__cU[dz]=dA;
}if(this.__dc){if(dB){qx.bom.element.Attribute.set(this.__dc,dz,dA);
return this;
}if(!this.__dl){this.__dl={};
}this.__dl[dz]=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(k);
}return this;
},setAttributes:function(dC,dD){for(var dE in dC){this.setAttribute(dE,dC[dE],dD);
}return this;
},removeAttribute:function(dF,dG){this.setAttribute(dF,null,dG);
},getAttribute:function(dH){return this.__cU?this.__cU[dH]:null;
},_applyProperty:function(name,dI){},_setProperty:function(dJ,dK,dL){if(!this.__dn){this.__dn={};
}
if(this.__dn[dJ]==dK){return;
}
if(dK==null){delete this.__dn[dJ];
}else{this.__dn[dJ]=dK;
}if(this.__dc){if(dL){this._applyProperty(dJ,dK);
return this;
}if(!this.__dm){this.__dm={};
}this.__dm[dJ]=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(k);
}return this;
},_removeProperty:function(dM,dN){this._setProperty(dM,null,dN);
},_getProperty:function(dO){var dP=this.__dn;

if(!dP){return null;
}var dQ=dP[dO];
return dQ==null?null:dQ;
},addListener:function(dR,dS,self,dT){if(this.$$disposed){return null;
}
if(qx.core.Variant.isSet(j,m)){var dU=r+dR+R+F+this+c;
this.assertString(dR,dU+Q);
this.assertFunction(dS,dU+P);

if(self!==undefined){this.assertObject(self,b);
}
if(dT!==undefined){this.assertBoolean(dT,H);
}}
if(this.__dc){return qx.event.Registration.addListener(this.__dc,dR,dS,self,dT);
}
if(!this.__do){this.__do={};
}
if(dT==null){dT=false;
}var dV=qx.event.Manager.getNextUniqueId();
var dW=dR+(dT?I:K)+dV;
this.__do[dW]={type:dR,listener:dS,self:self,capture:dT,unique:dV};
return dW;
},removeListener:function(dX,dY,self,ea){if(this.$$disposed){return null;
}
if(qx.core.Variant.isSet(j,m)){var eb=E+dX+R+o+this+c;
this.assertString(dX,eb+Q);
this.assertFunction(dY,eb+P);

if(self!==undefined){this.assertObject(self,b);
}
if(ea!==undefined){this.assertBoolean(ea,t);
}}
if(this.__dc){qx.event.Registration.removeListener(this.__dc,dX,dY,self,ea);
}else{var ed=this.__do;
var ec;

if(ea==null){ea=false;
}
for(var ee in ed){ec=ed[ee];
if(ec.listener===dY&&ec.self===self&&ec.capture===ea&&ec.type===dX){delete ed[ee];
break;
}}}return this;
},removeListenerById:function(ef){if(this.$$disposed){return null;
}
if(this.__dc){qx.event.Registration.removeListenerById(this.__dc,ef);
}else{delete this.__do[ef];
}return this;
},hasListener:function(eg,eh){if(this.$$disposed){return false;
}
if(this.__dc){return qx.event.Registration.hasListener(this.__dc,eg,eh);
}var ej=this.__do;
var ei;

if(eh==null){eh=false;
}
for(var ek in ej){ei=ej[ek];
if(ei.capture===eh&&ei.type===eg){return true;
}}return false;
}},defer:function(em){em.__dA=new qx.util.DeferredCall(em.flush,em);
},destruct:function(){var en=this.__dc;

if(en){qx.event.Registration.getManager(en).removeAllListeners(en);
en.$$element=O;
}
if(!qx.core.ObjectRegistry.inShutDown){var parent=this.__dr;

if(parent&&!parent.$$disposed){parent.remove(this);
}}this._disposeArray(z);
this.__cU=this.__cT=this.__do=this.__dn=this.__dl=this.__dk=this.__dm=this.__dc=this.__dr=this.__dg=this.__dh=null;
}});
})();
(function(){var a="qx.event.handler.UserAction";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(b){qx.core.Object.call(this);
this.__dD=b;
this.__dE=b.getWindow();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{useraction:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__dD:null,__dE:null,canHandleEvent:function(c,d){},registerEvent:function(e,f,g){},unregisterEvent:function(h,i,j){}},destruct:function(){this.__dD=this.__dE=null;
},defer:function(k){qx.event.Registration.addHandler(k);
}});
})();
(function(){var g="qx.debug",f="useraction",d="touchend",c='ie',b="on",a="qx.ui.core.queue.Manager";
qx.Class.define(a,{statics:{__dF:false,__dG:{},__dH:0,MAX_RETRIES:10,scheduleFlush:function(h){var self=qx.ui.core.queue.Manager;
self.__dG[h]=true;

if(!self.__dF){self.__dM.schedule();
self.__dF=true;
}},flush:function(){if(qx.ui.core.queue.Manager.PAUSE){return;
}var self=qx.ui.core.queue.Manager;
if(self.__dI){return;
}self.__dI=true;
self.__dM.cancel();
var i=self.__dG;
self.__dJ(function(){while(i.visibility||i.widget||i.appearance||i.layout||i.element){if(i.widget){delete i.widget;
qx.ui.core.queue.Widget.flush();
}
if(i.visibility){delete i.visibility;
qx.ui.core.queue.Visibility.flush();
}
if(i.appearance){delete i.appearance;
qx.ui.core.queue.Appearance.flush();
}if(i.widget||i.visibility||i.appearance){continue;
}
if(i.layout){delete i.layout;
qx.ui.core.queue.Layout.flush();
}if(i.widget||i.visibility||i.appearance||i.layout){continue;
}
if(i.element){delete i.element;
qx.html.Element.flush();
}}},function(){self.__dF=false;
});
self.__dJ(function(){if(i.dispose){delete i.dispose;
qx.ui.core.queue.Dispose.flush();
}},function(){self.__dI=false;
});
self.__dH=0;
},__dJ:qx.core.Variant.select(g,{"on":function(j,k){j();
k();
},"off":function(l,m){var self=qx.ui.core.queue.Manager;

try{l();
}catch(e){if(qx.core.Variant.isSet(g,b)){qx.log.Logger.error("Error while layout flush: "+e+"\n"+"Stack trace: \n"+qx.dev.StackTrace.getStackTraceFromError(e));
}self.__dF=false;
self.__dI=false;
self.__dH+=1;
if(qx.bom.client.Browser.NAME==c&&qx.bom.client.Browser.VERSION<=7){m();
}
if(self.__dH<=self.MAX_RETRIES){self.scheduleFlush();
}else{throw new Error("Fatal Error: Flush terminated "+(self.__dH-1)+" times in a row"+" due to exceptions in user code. The application has to be reloaded!");
}throw e;
}finally{m();
}}}),__dK:function(e){var n=qx.ui.core.queue.Manager;
if(e.getData()==d){n.PAUSE=true;

if(n.__dL){window.clearTimeout(n.__dL);
}n.__dL=window.setTimeout(function(){n.PAUSE=false;
n.__dL=null;
n.flush();
},500);
}else{n.flush();
}}},defer:function(o){o.__dM=new qx.util.DeferredCall(o.flush);
qx.html.Element._scheduleFlush=o.scheduleFlush;
qx.event.Registration.addListener(window,f,qx.bom.client.Feature.TOUCH?o.__dK:o.flush);
}});
})();
(function(){var b="-",a="qx.event.handler.Element";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(c){qx.core.Object.call(this);
this._manager=c;
this._registeredEvents={};
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{abort:true,scroll:true,select:true,reset:true,submit:true},CANCELABLE:{selectstart:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(d,e){},registerEvent:function(f,g,h){var k=qx.core.ObjectRegistry.toHashCode(f);
var i=k+b+g;
var j=qx.lang.Function.listener(this._onNative,this,i);
qx.bom.Event.addNativeListener(f,g,j);
this._registeredEvents[i]={element:f,type:g,listener:j};
},unregisterEvent:function(l,m,n){var q=this._registeredEvents;

if(!q){return;
}var r=qx.core.ObjectRegistry.toHashCode(l);
var o=r+b+m;
var p=this._registeredEvents[o];

if(p){qx.bom.Event.removeNativeListener(l,m,p.listener);
}delete this._registeredEvents[o];
},_onNative:qx.event.GlobalError.observeMethod(function(s,t){var v=this._registeredEvents;

if(!v){return;
}var u=v[t];
var w=this.constructor.CANCELABLE[u.type];
qx.event.Registration.fireNonBubblingEvent(u.element,u.type,qx.event.type.Native,[s,undefined,undefined,undefined,w]);
})},destruct:function(){var x;
var y=this._registeredEvents;

for(var z in y){x=y[z];
qx.bom.Event.removeNativeListener(x.element,x.type,x.listener);
}this._manager=this._registeredEvents=null;
},defer:function(A){qx.event.Registration.addHandler(A);
}});
})();
(function(){var e="orientationchange",d="resize",c="landscape",b="portrait",a="qx.event.handler.Orientation";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(f){qx.core.Object.call(this);
this.__dN=f;
this.__dO=f.getWindow();
this._initObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{orientationchange:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__dN:null,__dO:null,__dP:null,__dQ:null,__dR:null,canHandleEvent:function(g,h){},registerEvent:function(i,j,k){},unregisterEvent:function(l,m,n){},_initObserver:function(){this.__dR=qx.lang.Function.listener(this._onNative,this);
this.__dP=qx.bom.Event.supportsEvent(this.__dO,e)?e:d;
var Event=qx.bom.Event;
Event.addNativeListener(this.__dO,this.__dP,this.__dR);
},_stopObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__dO,this.__dP,this.__dR);
},_onNative:qx.event.GlobalError.observeMethod(function(o){var q=qx.bom.Viewport;
var p=q.getOrientation();

if(this.__dQ!=p){this.__dQ=p;
var r=q.isLandscape()?c:b;
qx.event.Registration.fireEvent(this.__dO,e,qx.event.type.Orientation,[p,r]);
}})},destruct:function(){this._stopObserver();
this.__dN=this.__dO=null;
},defer:function(s){qx.event.Registration.addHandler(s);
}});
})();
(function(){var t="qx.mobile.emulatetouch",s="touchend",r="touchstart",q="touchmove",p="mousemove",o="touchcancel",n="mouseup",m="mousedown",l="qx.client",k="mshtml",d="qx.event.handler.Touch",j="useraction",h="swipe",c="qx.mobile.nativescroll",b="webkit",g="off",f="tap",i="x",a="y";
qx.Class.define(d,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(u){qx.core.Object.call(this);
this.__dS=u;
this.__dT=u.getWindow();
this.__dU=this.__dT.document;
this._initTouchObserver();
this._initMouseObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{touchstart:1,touchmove:1,touchend:1,touchcancel:1,tap:1,swipe:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE+qx.event.IEventHandler.TARGET_DOCUMENT,IGNORE_CAN_HANDLE:true,MOUSE_TO_TOUCH_MAPPING:{"mousedown":"touchstart","mousemove":"touchmove","mouseup":"touchend"},SWIPE_DIRECTION:{x:["left","right"],y:["up","down"]},TAP_MAX_DISTANCE:10,SWIPE_MIN_DISTANCE:11,SWIPE_MIN_VELOCITY:0},members:{__dV:null,__dW:null,__dS:null,__dT:null,__dU:null,__dX:null,__dY:null,__ea:null,__eb:null,__ec:false,__ed:null,canHandleEvent:function(v,w){},registerEvent:function(x,y,z){},unregisterEvent:function(A,B,C){},__ee:function(D){var E=qx.bom.Event.getTarget(D);
if(qx.core.Variant.isSet(l,b)){if(E&&E.nodeType==3){E=E.parentNode;
}}return E;
},__ef:function(F,G,H,I){if(!H){H=this.__ee(F);
}var G=G||F.type;

if(H&&H.nodeType){qx.event.Registration.fireEvent(H,G,I||qx.event.type.Touch,[F,H,null,true,true]);
}qx.event.Registration.fireEvent(this.__dT,j,qx.event.type.Data,[G]);
},__eg:function(J,K,L){if(!L){L=this.__ee(J);
}var K=K||J.type;

if(K==r){this.__eh(J,L);
}else if(K==q){this.__ei(J,L);
}else if(K==s){this.__ej(J,L);
}},__eh:function(M,N){var O=M.changedTouches[0];
this.__dX=O.screenX;
this.__dY=O.screenY;
this.__ea=new Date().getTime();
this.__eb=M.changedTouches.length===1;
},__ei:function(P,Q){if(this.__eb&&P.changedTouches.length>1){this.__eb=false;
}},__ej:function(R,S){if(this.__eb){var T=R.changedTouches[0];
var V={x:T.screenX-this.__dX,y:T.screenY-this.__dY};
var W=qx.event.handler.Touch;

if(this.__ed==S&&Math.abs(V.x)<=W.TAP_MAX_DISTANCE&&Math.abs(V.y)<=W.TAP_MAX_DISTANCE){this.__ef(R,f,S,qx.event.type.Tap);
}else{var U=this.__ek(R,S,V);

if(U){R.swipe=U;
this.__ef(R,h,S,qx.event.type.Swipe);
}}}},__ek:function(X,Y,ba){var be=qx.event.handler.Touch;
var bf=new Date().getTime()-this.__ea;
var bh=(Math.abs(ba.x)>=Math.abs(ba.y))?i:a;
var bb=ba[bh];
var bc=be.SWIPE_DIRECTION[bh][bb<0?0:1];
var bg=(bf!==0)?bb/bf:0;
var bd=null;

if(Math.abs(bg)>=be.SWIPE_MIN_VELOCITY&&Math.abs(bb)>=be.SWIPE_MIN_DISTANCE){bd={startTime:this.__ea,duration:bf,axis:bh,direction:bc,distance:bb,velocity:bg};
}return bd;
},__el:qx.core.Variant.select(t,{"on":function(bi){var bj=bi.type;
var bl=qx.event.handler.Touch.MOUSE_TO_TOUCH_MAPPING;

if(bl[bj]){bj=bl[bj];
if(bj==r&&this.__em(bi)){this.__ec=true;
}else if(bj==s){this.__ec=false;
}var bm=this.__en(bi);
var bk=(bj==s?[]:[bm]);
bi.touches=bk;
bi.targetTouches=bk;
bi.changedTouches=[bm];
}return bj;
},"default":qx.lang.Function.empty}),__em:qx.core.Variant.select(t,{"on":function(bn){if(qx.core.Variant.isSet(l,k)){var bo=1;
}else{var bo=0;
}return bn.button==bo;
},"default":qx.lang.Function.empty}),__en:qx.core.Variant.select(t,{"on":function(bp){var bq=this.__ee(bp);
return {clientX:bp.clientX,clientY:bp.clientY,screenX:bp.screenX,screenY:bp.screenY,pageX:bp.pageX,pageY:bp.pageY,identifier:1,target:bq};
},"default":qx.lang.Function.empty}),_initTouchObserver:function(){this.__dV=qx.lang.Function.listener(this._onTouchEvent,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__dU,r,this.__dV);
Event.addNativeListener(this.__dU,q,this.__dV);
Event.addNativeListener(this.__dU,s,this.__dV);
Event.addNativeListener(this.__dU,o,this.__dV);
},_initMouseObserver:qx.core.Variant.select(t,{"on":function(){if(!qx.bom.client.Feature.TOUCH){this.__dW=qx.lang.Function.listener(this._onMouseEvent,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__dU,m,this.__dW);
Event.addNativeListener(this.__dU,p,this.__dW);
Event.addNativeListener(this.__dU,n,this.__dW);
}},"default":qx.lang.Function.empty}),_stopTouchObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__dU,r,this.__dV);
Event.removeNativeListener(this.__dU,q,this.__dV);
Event.removeNativeListener(this.__dU,s,this.__dV);
Event.removeNativeListener(this.__dU,o,this.__dV);
},_stopMouseObserver:qx.core.Variant.select(t,{"on":function(){if(!qx.bom.client.Feature.TOUCH){var Event=qx.bom.Event;
Event.removeNativeListener(this.__dU,m,this.__dW);
Event.removeNativeListener(this.__dU,p,this.__dW);
Event.removeNativeListener(this.__dU,n,this.__dW);
}},"default":qx.lang.Function.empty}),_onTouchEvent:qx.event.GlobalError.observeMethod(function(br){this._commonTouchEventHandler(br);
}),_onMouseEvent:qx.core.Variant.select(t,{"on":qx.event.GlobalError.observeMethod(function(bs){if(!qx.bom.client.Feature.TOUCH){if(bs.type==p&&!this.__ec){return;
}var bt=this.__el(bs);
this._commonTouchEventHandler(bs,bt);
}}),"default":qx.lang.Function.empty}),_commonTouchEventHandler:function(bu,bv){var bv=bv||bu.type;

if(bv==r){this.__ed=this.__ee(bu);
}this.__ef(bu,bv);
this.__eg(bu,bv);
}},destruct:function(){this._stopTouchObserver();
this._stopMouseObserver();
this.__dS=this.__dT=this.__dU=this.__ed=null;
},defer:function(bw){qx.event.Registration.addHandler(bw);
if(qx.bom.client.Feature.TOUCH){if(qx.core.Variant.isSet(c,g)){document.addEventListener(q,function(e){e.preventDefault();
});
}qx.event.Registration.getManager(document).getHandler(bw);
}}});
})();
(function(){var p="mouseup",o="click",n="qx.client",m="mousedown",l="contextmenu",k="mousewheel",j="dblclick",h="mouseover",g="mouseout",f="mousemove",c="on",e="useraction",d="DOMMouseScroll",b="gecko|webkit",a="qx.event.handler.Mouse";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(q){qx.core.Object.call(this);
this.__er=q;
this.__es=q.getWindow();
this.__et=this.__es.document;
this._initButtonObserver();
this._initMoveObserver();
this._initWheelObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{mousemove:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,click:1,dblclick:1,contextmenu:1,mousewheel:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{__eu:null,__ev:null,__ew:null,__ex:null,__ey:null,__er:null,__es:null,__et:null,canHandleEvent:function(r,s){},registerEvent:qx.bom.client.System.IPHONE||
qx.bom.client.System.IPAD?
function(t,u,v){t[c+u]=qx.lang.Function.returnNull;
}:qx.lang.Function.returnNull,unregisterEvent:qx.bom.client.System.IPHONE||
qx.bom.client.System.IPAD?
function(w,x,y){w[c+x]=undefined;
}:qx.lang.Function.returnNull,__ez:function(z,A,B){if(!B){B=qx.bom.Event.getTarget(z);
}if(B&&B.nodeType){qx.event.Registration.fireEvent(B,A||z.type,A==k?qx.event.type.MouseWheel:qx.event.type.Mouse,[z,B,null,true,true]);
}qx.event.Registration.fireEvent(this.__es,e,qx.event.type.Data,[A||z.type]);
},__eA:function(){var D=[this.__es,this.__et,this.__et.body];
var E=this.__es;
var C=d;

for(var i=0;i<D.length;i++){if(qx.bom.Event.supportsEvent(D[i],k)){C=k;
E=D[i];
break;
}}return {type:C,target:E};
},_initButtonObserver:function(){this.__eu=qx.lang.Function.listener(this._onButtonEvent,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__et,m,this.__eu);
Event.addNativeListener(this.__et,p,this.__eu);
Event.addNativeListener(this.__et,o,this.__eu);
Event.addNativeListener(this.__et,j,this.__eu);
Event.addNativeListener(this.__et,l,this.__eu);
},_initMoveObserver:function(){this.__ev=qx.lang.Function.listener(this._onMoveEvent,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__et,f,this.__ev);
Event.addNativeListener(this.__et,h,this.__ev);
Event.addNativeListener(this.__et,g,this.__ev);
},_initWheelObserver:function(){this.__ew=qx.lang.Function.listener(this._onWheelEvent,this);
var F=this.__eA();
qx.bom.Event.addNativeListener(F.target,F.type,this.__ew);
},_stopButtonObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__et,m,this.__eu);
Event.removeNativeListener(this.__et,p,this.__eu);
Event.removeNativeListener(this.__et,o,this.__eu);
Event.removeNativeListener(this.__et,j,this.__eu);
Event.removeNativeListener(this.__et,l,this.__eu);
},_stopMoveObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__et,f,this.__ev);
Event.removeNativeListener(this.__et,h,this.__ev);
Event.removeNativeListener(this.__et,g,this.__ev);
},_stopWheelObserver:function(){var G=this.__eA();
qx.bom.Event.removeNativeListener(G.target,G.type,this.__ew);
},_onMoveEvent:qx.event.GlobalError.observeMethod(function(H){this.__ez(H);
}),_onButtonEvent:qx.event.GlobalError.observeMethod(function(I){var J=I.type;
var K=qx.bom.Event.getTarget(I);
if(qx.core.Variant.isSet(n,b)){if(K&&K.nodeType==3){K=K.parentNode;
}}
if(this.__eB){this.__eB(I,J,K);
}
if(this.__eD){this.__eD(I,J,K);
}this.__ez(I,J,K);

if(this.__eC){this.__eC(I,J,K);
}
if(this.__eE){this.__eE(I,J,K);
}this.__ex=J;
}),_onWheelEvent:qx.event.GlobalError.observeMethod(function(L){this.__ez(L,k);
}),__eB:qx.core.Variant.select(n,{"webkit":function(M,N,O){if(qx.bom.client.Engine.VERSION<530){if(N==l){this.__ez(M,p,O);
}}},"default":null}),__eC:qx.core.Variant.select(n,{"opera":function(P,Q,R){if(Q==p&&P.button==2){this.__ez(P,l,R);
}},"default":null}),__eD:qx.core.Variant.select(n,{"mshtml":function(S,T,U){if(S.target!==undefined){return;
}
if(T==p&&this.__ex==o){this.__ez(S,m,U);
}else if(T==j){this.__ez(S,o,U);
}},"default":null}),__eE:qx.core.Variant.select(n,{"mshtml":null,"default":function(V,W,X){switch(W){case m:this.__ey=X;
break;
case p:if(X!==this.__ey){var Y=qx.dom.Hierarchy.getCommonParent(X,this.__ey);
this.__ez(V,o,Y);
}}}})},destruct:function(){this._stopButtonObserver();
this._stopMoveObserver();
this._stopWheelObserver();
this.__er=this.__es=this.__et=this.__ey=null;
},defer:function(ba){qx.event.Registration.addHandler(ba);
}});
})();
(function(){var m="keydown",l="qx.client",k="keypress",j="NumLock",i="keyup",h="Enter",g="0",f="9",e="-",d="PageUp",bu="+",bt="PrintScreen",bs="gecko",br="A",bq="Z",bp="Left",bo="F5",bn="Down",bm="Up",bl="F11",t="F6",u="useraction",r="F3",s="keyinput",p="Insert",q="F8",n="End",o="/",B="Delete",C="*",O="cmd",K="F1",W="F4",R="Home",bh="F2",bc="F12",G="PageDown",bk="F7",bj="Win",bi="F9",F="F10",I="Right",J="text",M="Escape",P="webkit",S="5",Y="3",be="Meta",v="7",w="CapsLock",H="input",V="Control",U="Space",T="Tab",bb="Shift",ba="Pause",Q="Unidentified",X="qx.event.handler.Keyboard",a="mshtml|webkit",bd="6",x="off",y="Apps",L="4",b="Alt",c="mshtml",E="2",z="Scroll",A="1",D="8",N="autoComplete",bg=",",bf="Backspace";
qx.Class.define(X,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(bv){qx.core.Object.call(this);
this.__eF=bv;
this.__eG=bv.getWindow();
if(qx.core.Variant.isSet(l,bs)){this.__eH=this.__eG;
}else{this.__eH=this.__eG.document.documentElement;
}this.__eI={};
this._initKeyObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{keyup:1,keydown:1,keypress:1,keyinput:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,isValidKeyIdentifier:function(bw){if(this._identifierToKeyCodeMap[bw]){return true;
}
if(bw.length!=1){return false;
}
if(bw>=g&&bw<=f){return true;
}
if(bw>=br&&bw<=bq){return true;
}
switch(bw){case bu:case e:case C:case o:return true;
default:return false;
}}},members:{__eJ:null,__eF:null,__eG:null,__eH:null,__eI:null,__eK:null,__eL:null,__eM:null,canHandleEvent:function(bx,by){},registerEvent:function(bz,bA,bB){},unregisterEvent:function(bC,bD,bE){},_fireInputEvent:function(bF,bG){var bH=this.__eN();
if(bH&&bH.offsetWidth!=0){var event=qx.event.Registration.createEvent(s,qx.event.type.KeyInput,[bF,bH,bG]);
this.__eF.dispatchEvent(bH,event);
}if(this.__eG){qx.event.Registration.fireEvent(this.__eG,u,qx.event.type.Data,[s]);
}},_fireSequenceEvent:function(bI,bJ,bK){var bL=this.__eN();
var bM=bI.keyCode;
var event=qx.event.Registration.createEvent(bJ,qx.event.type.KeySequence,[bI,bL,bK]);
this.__eF.dispatchEvent(bL,event);
if(qx.core.Variant.isSet(l,a)){if(bJ==m&&event.getDefaultPrevented()){if(!this._isNonPrintableKeyCode(bM)&&!this._emulateKeyPress[bM]){this._fireSequenceEvent(bI,k,bK);
}}}if(this.__eG){qx.event.Registration.fireEvent(this.__eG,u,qx.event.type.Data,[bJ]);
}},__eN:function(){var bN=this.__eF.getHandler(qx.event.handler.Focus);
var bO=bN.getActive();
if(!bO||bO.offsetWidth==0){bO=bN.getFocus();
}if(!bO||bO.offsetWidth==0){bO=this.__eF.getWindow().document.body;
}return bO;
},_initKeyObserver:function(){this.__eJ=qx.lang.Function.listener(this.__eO,this);
this.__eM=qx.lang.Function.listener(this.__eQ,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__eH,i,this.__eJ);
Event.addNativeListener(this.__eH,m,this.__eJ);
Event.addNativeListener(this.__eH,k,this.__eM);
},_stopKeyObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__eH,i,this.__eJ);
Event.removeNativeListener(this.__eH,m,this.__eJ);
Event.removeNativeListener(this.__eH,k,this.__eM);

for(var bQ in (this.__eL||{})){var bP=this.__eL[bQ];
Event.removeNativeListener(bP.target,k,bP.callback);
}delete (this.__eL);
},__eO:qx.event.GlobalError.observeMethod(qx.core.Variant.select(l,{"mshtml":function(bR){bR=window.event||bR;
var bU=bR.keyCode;
var bS=0;
var bT=bR.type;
if(!(this.__eI[bU]==m&&bT==m)){this._idealKeyHandler(bU,bS,bT,bR);
}if(bT==m){if(this._isNonPrintableKeyCode(bU)||this._emulateKeyPress[bU]){this._idealKeyHandler(bU,bS,k,bR);
}}this.__eI[bU]=bT;
},"gecko":function(bV){var ca=this._keyCodeFix[bV.keyCode]||bV.keyCode;
var bX=0;
var bY=bV.type;
if(qx.bom.client.Platform.WIN){var bW=ca?this._keyCodeToIdentifier(ca):this._charCodeToIdentifier(bX);

if(!(this.__eI[bW]==m&&bY==m)){this._idealKeyHandler(ca,bX,bY,bV);
}this.__eI[bW]=bY;
}else{this._idealKeyHandler(ca,bX,bY,bV);
}this.__eP(bV.target,bY,ca);
},"webkit":function(cb){var ce=0;
var cc=0;
var cd=cb.type;
if(qx.bom.client.Engine.VERSION<525.13){if(cd==i||cd==m){ce=this._charCode2KeyCode[cb.charCode]||cb.keyCode;
}else{if(this._charCode2KeyCode[cb.charCode]){ce=this._charCode2KeyCode[cb.charCode];
}else{cc=cb.charCode;
}}this._idealKeyHandler(ce,cc,cd,cb);
}else{ce=cb.keyCode;
this._idealKeyHandler(ce,cc,cd,cb);
if(cd==m){if(this._isNonPrintableKeyCode(ce)||this._emulateKeyPress[ce]){this._idealKeyHandler(ce,cc,k,cb);
}}this.__eI[ce]=cd;
}},"opera":function(cf){this.__eK=cf.keyCode;
this._idealKeyHandler(cf.keyCode,0,cf.type,cf);
}})),__eP:qx.core.Variant.select(l,{"gecko":function(cg,ch,ci){if(ch===m&&(ci==33||ci==34||ci==38||ci==40)&&cg.type==J&&cg.tagName.toLowerCase()===H&&cg.getAttribute(N)!==x){if(!this.__eL){this.__eL={};
}var ck=qx.core.ObjectRegistry.toHashCode(cg);

if(this.__eL[ck]){return;
}var self=this;
this.__eL[ck]={target:cg,callback:function(cl){qx.bom.Event.stopPropagation(cl);
self.__eQ(cl);
}};
var cj=qx.event.GlobalError.observeMethod(this.__eL[ck].callback);
qx.bom.Event.addNativeListener(cg,k,cj);
}},"default":null}),__eQ:qx.event.GlobalError.observeMethod(qx.core.Variant.select(l,{"mshtml":function(cm){cm=window.event||cm;

if(this._charCode2KeyCode[cm.keyCode]){this._idealKeyHandler(this._charCode2KeyCode[cm.keyCode],0,cm.type,cm);
}else{this._idealKeyHandler(0,cm.keyCode,cm.type,cm);
}},"gecko":function(cn){var cq=this._keyCodeFix[cn.keyCode]||cn.keyCode;
var co=cn.charCode;
var cp=cn.type;
this._idealKeyHandler(cq,co,cp,cn);
},"webkit":function(cr){if(qx.bom.client.Engine.VERSION<525.13){var cu=0;
var cs=0;
var ct=cr.type;

if(ct==i||ct==m){cu=this._charCode2KeyCode[cr.charCode]||cr.keyCode;
}else{if(this._charCode2KeyCode[cr.charCode]){cu=this._charCode2KeyCode[cr.charCode];
}else{cs=cr.charCode;
}}this._idealKeyHandler(cu,cs,ct,cr);
}else{if(this._charCode2KeyCode[cr.keyCode]){this._idealKeyHandler(this._charCode2KeyCode[cr.keyCode],0,cr.type,cr);
}else{this._idealKeyHandler(0,cr.keyCode,cr.type,cr);
}}},"opera":function(cv){var cx=cv.keyCode;
var cw=cv.type;
if(cx!=this.__eK){this._idealKeyHandler(0,this.__eK,cw,cv);
}else{if(this._keyCodeToIdentifierMap[cv.keyCode]){this._idealKeyHandler(cv.keyCode,0,cv.type,cv);
}else{this._idealKeyHandler(0,cv.keyCode,cv.type,cv);
}}}})),_idealKeyHandler:function(cy,cz,cA,cB){var cC;
if(cy||(!cy&&!cz)){cC=this._keyCodeToIdentifier(cy);
this._fireSequenceEvent(cB,cA,cC);
}else{cC=this._charCodeToIdentifier(cz);
this._fireSequenceEvent(cB,k,cC);
this._fireInputEvent(cB,cz);
}},_specialCharCodeMap:{8:bf,9:T,13:h,27:M,32:U},_emulateKeyPress:qx.core.Variant.select(l,{"mshtml":{8:true,9:true},"webkit":{8:true,9:true,27:true},"default":{}}),_keyCodeToIdentifierMap:{16:bb,17:V,18:b,20:w,224:be,37:bp,38:bm,39:I,40:bn,33:d,34:G,35:n,36:R,45:p,46:B,112:K,113:bh,114:r,115:W,116:bo,117:t,118:bk,119:q,120:bi,121:F,122:bl,123:bc,144:j,44:bt,145:z,19:ba,91:qx.bom.client.Platform.MAC?O:bj,92:bj,93:qx.bom.client.Platform.MAC?O:y},_numpadToCharCode:{96:g.charCodeAt(0),97:A.charCodeAt(0),98:E.charCodeAt(0),99:Y.charCodeAt(0),100:L.charCodeAt(0),101:S.charCodeAt(0),102:bd.charCodeAt(0),103:v.charCodeAt(0),104:D.charCodeAt(0),105:f.charCodeAt(0),106:C.charCodeAt(0),107:bu.charCodeAt(0),109:e.charCodeAt(0),110:bg.charCodeAt(0),111:o.charCodeAt(0)},_charCodeA:br.charCodeAt(0),_charCodeZ:bq.charCodeAt(0),_charCode0:g.charCodeAt(0),_charCode9:f.charCodeAt(0),_isNonPrintableKeyCode:function(cD){return this._keyCodeToIdentifierMap[cD]?true:false;
},_isIdentifiableKeyCode:function(cE){if(cE>=this._charCodeA&&cE<=this._charCodeZ){return true;
}if(cE>=this._charCode0&&cE<=this._charCode9){return true;
}if(this._specialCharCodeMap[cE]){return true;
}if(this._numpadToCharCode[cE]){return true;
}if(this._isNonPrintableKeyCode(cE)){return true;
}return false;
},_keyCodeToIdentifier:function(cF){if(this._isIdentifiableKeyCode(cF)){var cG=this._numpadToCharCode[cF];

if(cG){return String.fromCharCode(cG);
}return (this._keyCodeToIdentifierMap[cF]||this._specialCharCodeMap[cF]||String.fromCharCode(cF));
}else{return Q;
}},_charCodeToIdentifier:function(cH){return this._specialCharCodeMap[cH]||String.fromCharCode(cH).toUpperCase();
},_identifierToKeyCode:function(cI){return qx.event.handler.Keyboard._identifierToKeyCodeMap[cI]||cI.charCodeAt(0);
}},destruct:function(){this._stopKeyObserver();
this.__eK=this.__eF=this.__eG=this.__eH=this.__eI=null;
},defer:function(cJ,cK){qx.event.Registration.addHandler(cJ);
if(!cJ._identifierToKeyCodeMap){cJ._identifierToKeyCodeMap={};

for(var cL in cK._keyCodeToIdentifierMap){cJ._identifierToKeyCodeMap[cK._keyCodeToIdentifierMap[cL]]=parseInt(cL,10);
}
for(var cL in cK._specialCharCodeMap){cJ._identifierToKeyCodeMap[cK._specialCharCodeMap[cL]]=parseInt(cL,10);
}}
if(qx.core.Variant.isSet(l,c)){cK._charCode2KeyCode={13:13,27:27};
}else if(qx.core.Variant.isSet(l,bs)){cK._keyCodeFix={12:cK._identifierToKeyCode(j)};
}else if(qx.core.Variant.isSet(l,P)){if(qx.bom.client.Engine.VERSION<525.13){cK._charCode2KeyCode={63289:cK._identifierToKeyCode(j),63276:cK._identifierToKeyCode(d),63277:cK._identifierToKeyCode(G),63275:cK._identifierToKeyCode(n),63273:cK._identifierToKeyCode(R),63234:cK._identifierToKeyCode(bp),63232:cK._identifierToKeyCode(bm),63235:cK._identifierToKeyCode(I),63233:cK._identifierToKeyCode(bn),63272:cK._identifierToKeyCode(B),63302:cK._identifierToKeyCode(p),63236:cK._identifierToKeyCode(K),63237:cK._identifierToKeyCode(bh),63238:cK._identifierToKeyCode(r),63239:cK._identifierToKeyCode(W),63240:cK._identifierToKeyCode(bo),63241:cK._identifierToKeyCode(t),63242:cK._identifierToKeyCode(bk),63243:cK._identifierToKeyCode(q),63244:cK._identifierToKeyCode(bi),63245:cK._identifierToKeyCode(F),63246:cK._identifierToKeyCode(bl),63247:cK._identifierToKeyCode(bc),63248:cK._identifierToKeyCode(bt),3:cK._identifierToKeyCode(h),12:cK._identifierToKeyCode(j),13:cK._identifierToKeyCode(h)};
}else{cK._charCode2KeyCode={13:13,27:27};
}}}});
})();
(function(){var a="qx.event.handler.Capture";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{capture:true,losecapture:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(b,c){},registerEvent:function(d,e,f){},unregisterEvent:function(g,h,i){}},defer:function(j){qx.event.Registration.addHandler(j);
}});
})();
(function(){var k="alias",j="copy",i="blur",h="mouseout",g="keydown",f="Ctrl",d="Shift",c="mousemove",b="move",a="mouseover",A="Alt",z="keyup",y="mouseup",x="dragend",w="on",v="mousedown",u="qxDraggable",t="drag",s="drop",r="qxDroppable",p="qx.event.handler.DragDrop",q="droprequest",n="dragstart",o="dragchange",l="dragleave",m="dragover";
qx.Class.define(p,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(B){qx.core.Object.call(this);
this.__eR=B;
this.__eS=B.getWindow().document.documentElement;
this.__eR.addListener(this.__eS,v,this._onMouseDown,this);
this.__ff();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{dragstart:1,dragend:1,dragover:1,dragleave:1,drop:1,drag:1,dragchange:1,droprequest:1},IGNORE_CAN_HANDLE:true},members:{__eR:null,__eS:null,__eT:null,__eU:null,__eV:null,__eW:null,__eX:null,__eY:null,__fa:null,__fb:null,__fc:false,__fd:0,__fe:0,canHandleEvent:function(C,D){},registerEvent:function(E,F,G){},unregisterEvent:function(H,I,J){},addType:function(K){this.__eV[K]=true;
},addAction:function(L){this.__eW[L]=true;
},supportsType:function(M){return !!this.__eV[M];
},supportsAction:function(N){return !!this.__eW[N];
},getData:function(O){if(!this.__fm||!this.__eT){throw new Error("This method must not be used outside the drop event listener!");
}
if(!this.__eV[O]){throw new Error("Unsupported data type: "+O+"!");
}
if(!this.__eY[O]){this.__fa=O;
this.__fh(q,this.__eU,this.__eT,false);
}
if(!this.__eY[O]){throw new Error("Please use a droprequest listener to the drag source to fill the manager with data!");
}return this.__eY[O]||null;
},getCurrentAction:function(){return this.__fb;
},addData:function(P,Q){this.__eY[P]=Q;
},getCurrentType:function(){return this.__fa;
},isSessionActive:function(){return this.__fc;
},__ff:function(){this.__eV={};
this.__eW={};
this.__eX={};
this.__eY={};
},__fg:function(){if(this.__eU==null){return;
}var T=this.__eW;
var R=this.__eX;
var S=null;

if(this.__fm){if(R.Shift&&R.Ctrl&&T.alias){S=k;
}else if(R.Shift&&R.Alt&&T.copy){S=j;
}else if(R.Shift&&T.move){S=b;
}else if(R.Alt&&T.alias){S=k;
}else if(R.Ctrl&&T.copy){S=j;
}else if(T.move){S=b;
}else if(T.copy){S=j;
}else if(T.alias){S=k;
}}
if(S!=this.__fb){this.__fb=S;
this.__fh(o,this.__eU,this.__eT,false);
}},__fh:function(U,V,W,X,Y){var bb=qx.event.Registration;
var ba=bb.createEvent(U,qx.event.type.Drag,[X,Y]);

if(V!==W){ba.setRelatedTarget(W);
}return bb.dispatchEvent(V,ba);
},__fi:function(bc){while(bc&&bc.nodeType==1){if(bc.getAttribute(u)==w){return bc;
}bc=bc.parentNode;
}return null;
},__fj:function(bd){while(bd&&bd.nodeType==1){if(bd.getAttribute(r)==w){return bd;
}bd=bd.parentNode;
}return null;
},__fk:function(){this.__eU=null;
this.__eR.removeListener(this.__eS,c,this._onMouseMove,this,true);
this.__eR.removeListener(this.__eS,y,this._onMouseUp,this,true);
qx.event.Registration.removeListener(window,i,this._onWindowBlur,this);
this.__ff();
},__fl:function(){if(this.__fc){this.__eR.removeListener(this.__eS,a,this._onMouseOver,this,true);
this.__eR.removeListener(this.__eS,h,this._onMouseOut,this,true);
this.__eR.removeListener(this.__eS,g,this._onKeyDown,this,true);
this.__eR.removeListener(this.__eS,z,this._onKeyUp,this,true);
this.__fh(x,this.__eU,this.__eT,false);
this.__fc=false;
}this.__fm=false;
this.__eT=null;
this.__fk();
},__fm:false,_onWindowBlur:function(e){this.__fl();
},_onKeyDown:function(e){var be=e.getKeyIdentifier();

switch(be){case A:case f:case d:if(!this.__eX[be]){this.__eX[be]=true;
this.__fg();
}}},_onKeyUp:function(e){var bf=e.getKeyIdentifier();

switch(bf){case A:case f:case d:if(this.__eX[bf]){this.__eX[bf]=false;
this.__fg();
}}},_onMouseDown:function(e){if(this.__fc){return;
}var bg=this.__fi(e.getTarget());

if(bg){this.__fd=e.getDocumentLeft();
this.__fe=e.getDocumentTop();
this.__eU=bg;
this.__eR.addListener(this.__eS,c,this._onMouseMove,this,true);
this.__eR.addListener(this.__eS,y,this._onMouseUp,this,true);
qx.event.Registration.addListener(window,i,this._onWindowBlur,this);
}},_onMouseUp:function(e){if(this.__fm){this.__fh(s,this.__eT,this.__eU,false,e);
}if(this.__fc){e.stopPropagation();
}this.__fl();
},_onMouseMove:function(e){if(this.__fc){if(!this.__fh(t,this.__eU,this.__eT,true,e)){this.__fl();
}}else{if(Math.abs(e.getDocumentLeft()-this.__fd)>3||Math.abs(e.getDocumentTop()-this.__fe)>3){if(this.__fh(n,this.__eU,this.__eT,true,e)){this.__fc=true;
this.__eR.addListener(this.__eS,a,this._onMouseOver,this,true);
this.__eR.addListener(this.__eS,h,this._onMouseOut,this,true);
this.__eR.addListener(this.__eS,g,this._onKeyDown,this,true);
this.__eR.addListener(this.__eS,z,this._onKeyUp,this,true);
var bh=this.__eX;
bh.Ctrl=e.isCtrlPressed();
bh.Shift=e.isShiftPressed();
bh.Alt=e.isAltPressed();
this.__fg();
}else{this.__fh(x,this.__eU,this.__eT,false);
this.__fk();
}}}},_onMouseOver:function(e){var bi=e.getTarget();
var bj=this.__fj(bi);

if(bj&&bj!=this.__eT){this.__fm=this.__fh(m,bj,this.__eU,true,e);
this.__eT=bj;
this.__fg();
}},_onMouseOut:function(e){var bl=this.__fj(e.getTarget());
var bk=this.__fj(e.getRelatedTarget());

if(bl&&bl!==bk&&bl==this.__eT){this.__fh(l,this.__eT,bk,false,e);
this.__eT=null;
this.__fm=false;
qx.event.Timer.once(this.__fg,this,0);
}}},destruct:function(){this.__eU=this.__eT=this.__eR=this.__eS=this.__eV=this.__eW=this.__eX=this.__eY=null;
},defer:function(bm){qx.event.Registration.addHandler(bm);
}});
})();
(function(){var c="qx.event.handler.Appear",b="disappear",a="appear";
qx.Class.define(c,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(d){qx.core.Object.call(this);
this.__fn=d;
this.__fo={};
qx.event.handler.Appear.__fp[this.$$hash]=this;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{appear:true,disappear:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,__fp:{},refresh:function(){var e=this.__fp;

for(var f in e){e[f].refresh();
}}},members:{__fn:null,__fo:null,canHandleEvent:function(g,h){},registerEvent:function(i,j,k){var l=qx.core.ObjectRegistry.toHashCode(i)+j;
var m=this.__fo;

if(m&&!m[l]){m[l]=i;
i.$$displayed=i.offsetWidth>0;
}},unregisterEvent:function(n,o,p){var q=qx.core.ObjectRegistry.toHashCode(n)+o;
var r=this.__fo;

if(!r){return;
}
if(r[q]){delete r[q];
}},refresh:function(){var v=this.__fo;
var w;

for(var u in v){w=v[u];
var s=w.offsetWidth>0;

if((!!w.$$displayed)!==s){w.$$displayed=s;
var t=qx.event.Registration.createEvent(s?a:b);
this.__fn.dispatchEvent(w,t);
}}}},destruct:function(){this.__fn=this.__fo=null;
delete qx.event.handler.Appear.__fp[this.$$hash];
},defer:function(x){qx.event.Registration.addHandler(x);
}});
})();
(function(){var b="abstract",a="qx.event.dispatch.AbstractBubbling";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,type:b,construct:function(c){this._manager=c;
},members:{_getParent:function(d){throw new Error("Missing implementation");
},canDispatchEvent:function(e,event,f){return event.getBubbles();
},dispatchEvent:function(g,event,h){var parent=g;
var s=this._manager;
var p,w;
var n;
var r,u;
var t;
var v=[];
p=s.getListeners(g,h,true);
w=s.getListeners(g,h,false);

if(p){v.push(p);
}
if(w){v.push(w);
}var parent=this._getParent(g);
var l=[];
var k=[];
var m=[];
var q=[];
while(parent!=null){p=s.getListeners(parent,h,true);

if(p){m.push(p);
q.push(parent);
}w=s.getListeners(parent,h,false);

if(w){l.push(w);
k.push(parent);
}parent=this._getParent(parent);
}event.setEventPhase(qx.event.type.Event.CAPTURING_PHASE);

for(var i=m.length-1;i>=0;i--){t=q[i];
event.setCurrentTarget(t);
n=m[i];

for(var j=0,o=n.length;j<o;j++){r=n[j];
u=r.context||t;
r.handler.call(u,event);
}
if(event.getPropagationStopped()){return;
}}event.setEventPhase(qx.event.type.Event.AT_TARGET);
event.setCurrentTarget(g);

for(var i=0,x=v.length;i<x;i++){n=v[i];

for(var j=0,o=n.length;j<o;j++){r=n[j];
u=r.context||g;
r.handler.call(u,event);
}
if(event.getPropagationStopped()){return;
}}event.setEventPhase(qx.event.type.Event.BUBBLING_PHASE);

for(var i=0,x=l.length;i<x;i++){t=k[i];
event.setCurrentTarget(t);
n=l[i];

for(var j=0,o=n.length;j<o;j++){r=n[j];
u=r.context||t;
r.handler.call(u,event);
}
if(event.getPropagationStopped()){return;
}}}}});
})();
(function(){var a="qx.event.dispatch.DomBubbling";
qx.Class.define(a,{extend:qx.event.dispatch.AbstractBubbling,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL},members:{_getParent:function(b){return b.parentNode;
},canDispatchEvent:function(c,event,d){return c.nodeType!==undefined&&event.getBubbles();
}},defer:function(e){qx.event.Registration.addDispatcher(e);
}});
})();
(function(){var q="mshtml",p="",o="qx.client",n=" ",m=">",k="<",h="='",g="none",f="<INPUT TYPE='RADIO' NAME='RADIOTEST' VALUE='Second Choice'>",d="qx.bom.Element",a="' ",c="div",b="></";
qx.Class.define(d,{statics:{__fq:{"onload":true,"onpropertychange":true,"oninput":true,"onchange":true,"name":true,"type":true,"checked":true,"disabled":true},__fr:{},__fs:{},allowCreationWithMarkup:function(r){if(!r){r=window;
}var s=r.location.href;

if(qx.bom.Element.__fs[s]==undefined){try{r.document.createElement(f);
qx.bom.Element.__fs[s]=true;
}catch(e){qx.bom.Element.__fs[s]=false;
}}return qx.bom.Element.__fs[s];
},getHelperElement:function(t){if(!t){t=window;
}var v=t.location.href;

if(!qx.bom.Element.__fr[v]){var u=qx.bom.Element.__fr[v]=t.document.createElement(c);
if(qx.bom.client.Engine.WEBKIT){u.style.display=g;
t.document.body.appendChild(u);
}}return qx.bom.Element.__fr[v];
},create:function(name,w,x){if(!x){x=window;
}
if(!name){throw new Error("The tag name is missing!");
}var z=this.__fq;
var y=p;

for(var B in w){if(z[B]){y+=B+h+w[B]+a;
}}var C;
if(y!=p){if(qx.bom.Element.allowCreationWithMarkup(x)){C=x.document.createElement(k+name+n+y+m);
}else{var A=qx.bom.Element.getHelperElement(x);
A.innerHTML=k+name+n+y+b+name+m;
C=A.firstChild;
}}else{C=x.document.createElement(name);
}
for(var B in w){if(!z[B]){qx.bom.element.Attribute.set(C,B,w[B]);
}}return C;
},empty:function(D){return D.innerHTML=p;
},addListener:function(E,F,G,self,H){return qx.event.Registration.addListener(E,F,G,self,H);
},removeListener:function(I,J,K,self,L){return qx.event.Registration.removeListener(I,J,K,self,L);
},removeListenerById:function(M,N){return qx.event.Registration.removeListenerById(M,N);
},hasListener:function(O,P,Q){return qx.event.Registration.hasListener(O,P,Q);
},focus:function(R){qx.event.Registration.getManager(R).getHandler(qx.event.handler.Focus).focus(R);
},blur:function(S){qx.event.Registration.getManager(S).getHandler(qx.event.handler.Focus).blur(S);
},activate:function(T){qx.event.Registration.getManager(T).getHandler(qx.event.handler.Focus).activate(T);
},deactivate:function(U){qx.event.Registration.getManager(U).getHandler(qx.event.handler.Focus).deactivate(U);
},capture:function(V,W){qx.event.Registration.getManager(V).getDispatcher(qx.event.dispatch.MouseCapture).activateCapture(V,W);
},releaseCapture:function(X){qx.event.Registration.getManager(X).getDispatcher(qx.event.dispatch.MouseCapture).releaseCapture(X);
},matchesSelector:function(Y,ba){if(ba){return qx.bom.Selector.query(ba,Y.parentNode).length>0;
}else{return false;
}},clone:function(bb,bc){var bf;

if(bc||(qx.core.Variant.isSet(o,q)&&!qx.xml.Document.isXmlDocument(bb))){var bj=qx.event.Registration.getManager(bb);
var bd=qx.dom.Hierarchy.getDescendants(bb);
bd.push(bb);
}if(qx.core.Variant.isSet(o,q)){for(var i=0,l=bd.length;i<l;i++){bj.toggleAttachedEvents(bd[i],false);
}}var bf=bb.cloneNode(true);
if(qx.core.Variant.isSet(o,q)){for(var i=0,l=bd.length;i<l;i++){bj.toggleAttachedEvents(bd[i],true);
}}if(bc===true){var bm=qx.dom.Hierarchy.getDescendants(bf);
bm.push(bf);
var be,bh,bl,bg;

for(var i=0,bk=bd.length;i<bk;i++){bl=bd[i];
be=bj.serializeListeners(bl);

if(be.length>0){bh=bm[i];

for(var j=0,bi=be.length;j<bi;j++){bg=be[j];
bj.addListener(bh,bg.type,bg.handler,bg.self,bg.capture);
}}}}return bf;
}}});
})();
(function(){var c="landscape",b="qx.event.type.Orientation",a="portrait";
qx.Class.define(b,{extend:qx.event.type.Event,members:{__ft:null,__fu:null,init:function(d,e){qx.event.type.Event.prototype.init.call(this,false,false);
this.__ft=d;
this.__fu=e;
return this;
},clone:function(f){var g=qx.event.type.Event.prototype.clone.call(this,f);
g.__ft=this.__ft;
g.__fu=this.__fu;
return g;
},getOrientation:function(){return this.__ft;
},isLandscape:function(){return this.__fu==c;
},isPortrait:function(){return this.__fu==a;
}}});
})();
(function(){var a="qx.event.type.Dom";
qx.Class.define(a,{extend:qx.event.type.Native,statics:{SHIFT_MASK:1,CTRL_MASK:2,ALT_MASK:4,META_MASK:8},members:{_cloneNativeEvent:function(b,c){var c=qx.event.type.Native.prototype._cloneNativeEvent.call(this,b,c);
c.shiftKey=b.shiftKey;
c.ctrlKey=b.ctrlKey;
c.altKey=b.altKey;
c.metaKey=b.metaKey;
return c;
},getModifiers:function(){var e=0;
var d=this._native;

if(d.shiftKey){e|=qx.event.type.Dom.SHIFT_MASK;
}
if(d.ctrlKey){e|=qx.event.type.Dom.CTRL_MASK;
}
if(d.altKey){e|=qx.event.type.Dom.ALT_MASK;
}
if(d.metaKey){e|=qx.event.type.Dom.META_MASK;
}return e;
},isCtrlPressed:function(){return this._native.ctrlKey;
},isShiftPressed:function(){return this._native.shiftKey;
},isAltPressed:function(){return this._native.altKey;
},isMetaPressed:function(){return this._native.metaKey;
},isCtrlOrCommandPressed:function(){if(qx.bom.client.Platform.MAC){return this._native.metaKey;
}else{return this._native.ctrlKey;
}}}});
})();
(function(){var c="touchcancel",b="qx.event.type.Touch",a="touchend";
qx.Class.define(b,{extend:qx.event.type.Dom,members:{_cloneNativeEvent:function(d,e){var e=qx.event.type.Dom.prototype._cloneNativeEvent.call(this,d,e);
e.pageX=d.pageX;
e.pageY=d.pageY;
e.layerX=d.layerX;
e.layerY=d.layerY;
e.scale=d.scale;
e.rotation=d.rotation;
e.srcElement=d.srcElement;
e.targetTouches=[];

for(var i=0;i<d.targetTouches.length;i++){e.targetTouches[i]=d.targetTouches[i];
}e.changedTouches=[];

for(var i=0;i<d.changedTouches.length;i++){e.changedTouches[i]=d.changedTouches[i];
}e.touches=[];

for(var i=0;i<d.touches.length;i++){e.touches[i]=d.touches[i];
}return e;
},stop:function(){this.stopPropagation();
},getAllTouches:function(){return this._native.touches;
},getTargetTouches:function(){return this._native.targetTouches;
},getChangedTargetTouches:function(){return this._native.changedTouches;
},isMultiTouch:function(){return this.__fw().length>1;
},getScale:function(){return this._native.scale;
},getRotation:function(){return this._native.rotation;
},getDocumentLeft:function(f){return this.__fv(f).pageX;
},getDocumentTop:function(g){return this.__fv(g).pageY;
},getScreenLeft:function(h){return this.__fv(h).screenX;
},getScreenTop:function(j){return this.__fv(j).screenY;
},getViewportLeft:function(k){return this.__fv(k).clientX;
},getViewportTop:function(l){return this.__fv(l).clientY;
},getIdentifier:function(m){return this.__fv(m).identifier;
},__fv:function(n){n=n==null?0:n;
return this.__fw()[n];
},__fw:function(){var o=(this._isTouchEnd()?this.getChangedTargetTouches():this.getTargetTouches());
return o;
},_isTouchEnd:function(){return (this.getType()==a||this.getType()==c);
}}});
})();
(function(){var a="qx.event.type.Tap";
qx.Class.define(a,{extend:qx.event.type.Touch,members:{_isTouchEnd:function(){return true;
}}});
})();
(function(){var a="qx.event.type.Swipe";
qx.Class.define(a,{extend:qx.event.type.Touch,members:{_cloneNativeEvent:function(b,c){var c=qx.event.type.Touch.prototype._cloneNativeEvent.call(this,b,c);
c.swipe=b.swipe;
return c;
},_isTouchEnd:function(){return true;
},getStartTime:function(){return this._native.swipe.startTime;
},getDuration:function(){return this._native.swipe.duration;
},getAxis:function(){return this._native.swipe.axis;
},getDirection:function(){return this._native.swipe.direction;
},getVelocity:function(){return this._native.swipe.velocity;
},getDistance:function(){return this._native.swipe.distance;
}}});
})();
(function(){var h="left",g="right",f="middle",e="none",d="click",c="contextmenu",b="qx.event.type.Mouse",a="qx.client";
qx.Class.define(b,{extend:qx.event.type.Dom,members:{_cloneNativeEvent:function(i,j){var j=qx.event.type.Dom.prototype._cloneNativeEvent.call(this,i,j);
j.button=i.button;
j.clientX=i.clientX;
j.clientY=i.clientY;
j.pageX=i.pageX;
j.pageY=i.pageY;
j.screenX=i.screenX;
j.screenY=i.screenY;
j.wheelDelta=i.wheelDelta;
j.detail=i.detail;
j.srcElement=i.srcElement;
j.target=i.target;
return j;
},__fx:{0:h,2:g,1:f},__fy:{1:h,2:g,4:f},stop:function(){this.stopPropagation();
},getButton:function(){switch(this._type){case c:return g;
case d:if(this.__fz){return this.__fz();
}default:if(this._native.target!==undefined){return this.__fx[this._native.button]||e;
}else{return this.__fy[this._native.button]||e;
}}},__fz:qx.core.Variant.select(a,{"mshtml":function(){return h;
},"default":null}),isLeftPressed:function(){return this.getButton()===h;
},isMiddlePressed:function(){return this.getButton()===f;
},isRightPressed:function(){return this.getButton()===g;
},getRelatedTarget:function(){return this._relatedTarget;
},getViewportLeft:function(){return this._native.clientX;
},getViewportTop:function(){return this._native.clientY;
},getDocumentLeft:function(){if(this._native.pageX!==undefined){return this._native.pageX;
}else{var k=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientX+qx.bom.Viewport.getScrollLeft(k);
}},getDocumentTop:function(){if(this._native.pageY!==undefined){return this._native.pageY;
}else{var l=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientY+qx.bom.Viewport.getScrollTop(l);
}},getScreenLeft:function(){return this._native.screenX;
},getScreenTop:function(){return this._native.screenY;
}}});
})();
(function(){var c="qx.client",b="chrome",a="qx.event.type.MouseWheel";
qx.Class.define(a,{extend:qx.event.type.Mouse,members:{stop:function(){this.stopPropagation();
this.preventDefault();
},getWheelDelta:qx.core.Variant.select(c,{"default":function(){return -(this._native.wheelDelta/40);
},"gecko":function(){return this._native.detail;
},"webkit":function(){if(qx.bom.client.Browser.NAME==b){if(qx.bom.client.Platform.MAC){return -(this._native.wheelDelta/1200);
}else{return -(this._native.wheelDelta/120);
}}else{if(qx.bom.client.Platform.WIN){var d=120;
if(qx.bom.client.Engine.VERSION==533.16){d=1200;
}}else{d=40;
if(qx.bom.client.Engine.VERSION==533.16||qx.bom.client.Engine.VERSION==533.17||qx.bom.client.Engine.VERSION==533.18){d=1200;
}}return -(this._native.wheelDelta/d);
}}})}});
})();
(function(){var j="qx.client",i="ie",h="msie",g="android",f="operamini",e="mobile chrome",d=")(/| )([0-9]+\.[0-9])",c="iemobile",b="opera mobi",a="Mobile Safari",x="operamobile",w="mobile safari",v="IEMobile|Maxthon|MSIE",u="qx.bom.client.Browser",t="opera mini",s="(",r="opera",q="mshtml",p="Opera Mini|Opera Mobi|Opera",o="AdobeAIR|Titanium|Fluid|Chrome|Android|Epiphany|Konqueror|iCab|OmniWeb|Maxthon|Pre|Mobile Safari|Safari",m="webkit",n="5.0",k="prism|Fennec|Camino|Kmeleon|Galeon|Netscape|SeaMonkey|Firefox",l="Mobile/";
qx.Bootstrap.define(u,{statics:{UNKNOWN:true,NAME:"unknown",TITLE:"unknown 0.0",VERSION:0.0,FULLVERSION:"0.0.0",__fA:function(y){var z=navigator.userAgent;
var B=new RegExp(s+y+d);
var C=z.match(B);

if(!C){return;
}var name=C[1].toLowerCase();
var A=C[3];
if(z.match(/Version(\/| )([0-9]+\.[0-9])/)){A=RegExp.$2;
}
if(qx.core.Variant.isSet(j,m)){if(name===g){name=e;
}else if(z.indexOf(a)!==-1||z.indexOf(l)!==-1){name=w;
}}else if(qx.core.Variant.isSet(j,q)){if(name===h){name=i;
A=qx.bom.client.Engine.VERSION;
if(qx.bom.client.System.WINCE&&name===i){name=c;
A=n;
}}}else if(qx.core.Variant.isSet(j,r)){if(name===b){name=x;
}else if(name===t){name=f;
}}this.NAME=name;
this.FULLVERSION=A;
this.VERSION=parseFloat(A,10);
this.TITLE=name+" "+this.VERSION;
this.UNKNOWN=false;
}},defer:qx.core.Variant.select(j,{"webkit":function(D){D.__fA(o);
},"gecko":function(E){E.__fA(k);
},"mshtml":function(F){F.__fA(v);
},"opera":function(G){G.__fA(p);
}})});
})();
(function(){var f="qx.client",e="qx.dom.Hierarchy",d="previousSibling",c="*",b="nextSibling",a="parentNode";
qx.Class.define(e,{statics:{getNodeIndex:function(g){var h=0;

while(g&&(g=g.previousSibling)){h++;
}return h;
},getElementIndex:function(i){var j=0;
var k=qx.dom.Node.ELEMENT;

while(i&&(i=i.previousSibling)){if(i.nodeType==k){j++;
}}return j;
},getNextElementSibling:function(l){while(l&&(l=l.nextSibling)&&!qx.dom.Node.isElement(l)){continue;
}return l||null;
},getPreviousElementSibling:function(m){while(m&&(m=m.previousSibling)&&!qx.dom.Node.isElement(m)){continue;
}return m||null;
},contains:qx.core.Variant.select(f,{"webkit|mshtml|opera":function(n,o){if(qx.dom.Node.isDocument(n)){var p=qx.dom.Node.getDocument(o);
return n&&p==n;
}else if(qx.dom.Node.isDocument(o)){return false;
}else{return n.contains(o);
}},"gecko":function(q,r){return !!(q.compareDocumentPosition(r)&16);
},"default":function(s,t){while(t){if(s==t){return true;
}t=t.parentNode;
}return false;
}}),isRendered:qx.core.Variant.select(f,{"mshtml":function(u){if(!u.parentNode||!u.offsetParent){return false;
}var v=u.ownerDocument||u.document;
return v.body.contains(u);
},"gecko":function(w){var x=w.ownerDocument||w.document;
return !!(x.compareDocumentPosition(w)&16);
},"default":function(y){if(!y.parentNode||!y.offsetParent){return false;
}var z=y.ownerDocument||y.document;
return z.body.contains(y);
}}),isDescendantOf:function(A,B){return this.contains(B,A);
},getCommonParent:qx.core.Variant.select(f,{"mshtml|opera":function(C,D){if(C===D){return C;
}
while(C&&qx.dom.Node.isElement(C)){if(C.contains(D)){return C;
}C=C.parentNode;
}return null;
},"default":function(E,F){if(E===F){return E;
}var G={};
var J=qx.core.ObjectRegistry;
var I,H;

while(E||F){if(E){I=J.toHashCode(E);

if(G[I]){return G[I];
}G[I]=E;
E=E.parentNode;
}
if(F){H=J.toHashCode(F);

if(G[H]){return G[H];
}G[H]=F;
F=F.parentNode;
}}return null;
}}),getAncestors:function(K){return this._recursivelyCollect(K,a);
},getChildElements:function(L){L=L.firstChild;

if(!L){return [];
}var M=this.getNextSiblings(L);

if(L.nodeType===1){M.unshift(L);
}return M;
},getDescendants:function(N){return qx.lang.Array.fromCollection(N.getElementsByTagName(c));
},getFirstDescendant:function(O){O=O.firstChild;

while(O&&O.nodeType!=1){O=O.nextSibling;
}return O;
},getLastDescendant:function(P){P=P.lastChild;

while(P&&P.nodeType!=1){P=P.previousSibling;
}return P;
},getPreviousSiblings:function(Q){return this._recursivelyCollect(Q,d);
},getNextSiblings:function(R){return this._recursivelyCollect(R,b);
},_recursivelyCollect:function(S,T){var U=[];

while(S=S[T]){if(S.nodeType==1){U.push(S);
}}return U;
},getSiblings:function(V){return this.getPreviousSiblings(V).reverse().concat(this.getNextSiblings(V));
},isEmpty:function(W){W=W.firstChild;

while(W){if(W.nodeType===qx.dom.Node.ELEMENT||W.nodeType===qx.dom.Node.TEXT){return false;
}W=W.nextSibling;
}return true;
},cleanWhitespace:function(X){var Y=X.firstChild;

while(Y){var ba=Y.nextSibling;

if(Y.nodeType==3&&!/\S/.test(Y.nodeValue)){X.removeChild(Y);
}Y=ba;
}}}});
})();
(function(){var a="qx.event.type.KeyInput";
qx.Class.define(a,{extend:qx.event.type.Dom,members:{init:function(b,c,d){qx.event.type.Dom.prototype.init.call(this,b,c,null,true,true);
this._charCode=d;
return this;
},clone:function(e){var f=qx.event.type.Dom.prototype.clone.call(this,e);
f._charCode=this._charCode;
return f;
},getCharCode:function(){return this._charCode;
},getChar:function(){return String.fromCharCode(this._charCode);
}}});
})();
(function(){var a="qx.event.type.KeySequence";
qx.Class.define(a,{extend:qx.event.type.Dom,members:{init:function(b,c,d){qx.event.type.Dom.prototype.init.call(this,b,c,null,true,true);
this._keyCode=b.keyCode;
this._identifier=d;
return this;
},clone:function(e){var f=qx.event.type.Dom.prototype.clone.call(this,e);
f._keyCode=this._keyCode;
f._identifier=this._identifier;
return f;
},getKeyIdentifier:function(){return this._identifier;
},getKeyCode:function(){return this._keyCode;
}}});
})();
(function(){var j="qx.client",i="mousedown",h="mouseup",g="blur",f="focus",e="on",d="selectstart",c="DOMFocusOut",b="focusin",a="focusout",A="DOMFocusIn",z="draggesture",y="qx.event.handler.Focus",x="_applyFocus",w="11.0",v="deactivate",u="textarea",t="_applyActive",s='character',r="input",p="qxSelectable",q="tabIndex",n="off",o="activate",l="mshtml",m="qxKeepFocus",k="qxKeepActive";
qx.Class.define(y,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(B){qx.core.Object.call(this);
this._manager=B;
this._window=B.getWindow();
this._document=this._window.document;
this._root=this._document.documentElement;
this._body=this._document.body;
this._initObserver();
},properties:{active:{apply:t,nullable:true},focus:{apply:x,nullable:true}},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{focus:1,blur:1,focusin:1,focusout:1,activate:1,deactivate:1},IGNORE_CAN_HANDLE:true,FOCUSABLE_ELEMENTS:qx.core.Variant.select("qx.client",{"mshtml|gecko":{a:1,body:1,button:1,frame:1,iframe:1,img:1,input:1,object:1,select:1,textarea:1},"opera|webkit":{button:1,input:1,select:1,textarea:1}})},members:{__fB:null,__fC:null,__fD:null,__fE:null,__fF:null,__fG:null,__fH:null,__fI:null,__fJ:null,__fK:null,canHandleEvent:function(C,D){},registerEvent:function(E,F,G){},unregisterEvent:function(H,I,J){},focus:function(K){if(qx.core.Variant.isSet(j,l)){window.setTimeout(function(){try{K.focus();
var L=qx.bom.Selection.get(K);

if(L.length==0){var M=K.createTextRange();
M.moveStart(s,K.value.length);
M.collapse();
M.select();
}}catch(N){}},0);
}else{try{K.focus();
}catch(O){}}this.setFocus(K);
this.setActive(K);
},activate:function(P){this.setActive(P);
},blur:function(Q){try{Q.blur();
}catch(R){}
if(this.getActive()===Q){this.resetActive();
}
if(this.getFocus()===Q){this.resetFocus();
}},deactivate:function(S){if(this.getActive()===S){this.resetActive();
}},tryActivate:function(T){var U=this.__gb(T);

if(U){this.setActive(U);
}},__fL:function(V,W,X,Y){var bb=qx.event.Registration;
var ba=bb.createEvent(X,qx.event.type.Focus,[V,W,Y]);
bb.dispatchEvent(V,ba);
},_windowFocused:true,__fM:function(){if(this._windowFocused){this._windowFocused=false;
this.__fL(this._window,null,g,false);
}},__fN:function(){if(!this._windowFocused){this._windowFocused=true;
this.__fL(this._window,null,f,false);
}},_initObserver:qx.core.Variant.select(j,{"gecko":function(){this.__fB=qx.lang.Function.listener(this.__fT,this);
this.__fC=qx.lang.Function.listener(this.__fV,this);
this.__fD=qx.lang.Function.listener(this.__fS,this);
this.__fE=qx.lang.Function.listener(this.__fR,this);
this.__fF=qx.lang.Function.listener(this.__fO,this);
qx.bom.Event.addNativeListener(this._document,i,this.__fB,true);
qx.bom.Event.addNativeListener(this._document,h,this.__fC,true);
qx.bom.Event.addNativeListener(this._window,f,this.__fD,true);
qx.bom.Event.addNativeListener(this._window,g,this.__fE,true);
qx.bom.Event.addNativeListener(this._window,z,this.__fF,true);
},"mshtml":function(){this.__fB=qx.lang.Function.listener(this.__fT,this);
this.__fC=qx.lang.Function.listener(this.__fV,this);
this.__fH=qx.lang.Function.listener(this.__fP,this);
this.__fI=qx.lang.Function.listener(this.__fQ,this);
this.__fG=qx.lang.Function.listener(this.__fX,this);
qx.bom.Event.addNativeListener(this._document,i,this.__fB);
qx.bom.Event.addNativeListener(this._document,h,this.__fC);
qx.bom.Event.addNativeListener(this._document,b,this.__fH);
qx.bom.Event.addNativeListener(this._document,a,this.__fI);
qx.bom.Event.addNativeListener(this._document,d,this.__fG);
},"webkit":function(){this.__fB=qx.lang.Function.listener(this.__fT,this);
this.__fC=qx.lang.Function.listener(this.__fV,this);
this.__fI=qx.lang.Function.listener(this.__fQ,this);
this.__fD=qx.lang.Function.listener(this.__fS,this);
this.__fE=qx.lang.Function.listener(this.__fR,this);
this.__fG=qx.lang.Function.listener(this.__fX,this);
qx.bom.Event.addNativeListener(this._document,i,this.__fB,true);
qx.bom.Event.addNativeListener(this._document,h,this.__fC,true);
qx.bom.Event.addNativeListener(this._document,d,this.__fG,false);
qx.bom.Event.addNativeListener(this._window,c,this.__fI,true);
qx.bom.Event.addNativeListener(this._window,f,this.__fD,true);
qx.bom.Event.addNativeListener(this._window,g,this.__fE,true);
},"opera":function(){this.__fB=qx.lang.Function.listener(this.__fT,this);
this.__fC=qx.lang.Function.listener(this.__fV,this);
this.__fH=qx.lang.Function.listener(this.__fP,this);
this.__fI=qx.lang.Function.listener(this.__fQ,this);
qx.bom.Event.addNativeListener(this._document,i,this.__fB,true);
qx.bom.Event.addNativeListener(this._document,h,this.__fC,true);
qx.bom.Event.addNativeListener(this._window,A,this.__fH,true);
qx.bom.Event.addNativeListener(this._window,c,this.__fI,true);
}}),_stopObserver:qx.core.Variant.select(j,{"gecko":function(){qx.bom.Event.removeNativeListener(this._document,i,this.__fB,true);
qx.bom.Event.removeNativeListener(this._document,h,this.__fC,true);
qx.bom.Event.removeNativeListener(this._window,f,this.__fD,true);
qx.bom.Event.removeNativeListener(this._window,g,this.__fE,true);
qx.bom.Event.removeNativeListener(this._window,z,this.__fF,true);
},"mshtml":function(){qx.bom.Event.removeNativeListener(this._document,i,this.__fB);
qx.bom.Event.removeNativeListener(this._document,h,this.__fC);
qx.bom.Event.removeNativeListener(this._document,b,this.__fH);
qx.bom.Event.removeNativeListener(this._document,a,this.__fI);
qx.bom.Event.removeNativeListener(this._document,d,this.__fG);
},"webkit":function(){qx.bom.Event.removeNativeListener(this._document,i,this.__fB,true);
qx.bom.Event.removeNativeListener(this._document,h,this.__fC,true);
qx.bom.Event.removeNativeListener(this._document,d,this.__fG,false);
qx.bom.Event.removeNativeListener(this._window,c,this.__fI,true);
qx.bom.Event.removeNativeListener(this._window,f,this.__fD,true);
qx.bom.Event.removeNativeListener(this._window,g,this.__fE,true);
},"opera":function(){qx.bom.Event.removeNativeListener(this._document,i,this.__fB,true);
qx.bom.Event.removeNativeListener(this._document,h,this.__fC,true);
qx.bom.Event.removeNativeListener(this._window,A,this.__fH,true);
qx.bom.Event.removeNativeListener(this._window,c,this.__fI,true);
}}),__fO:qx.event.GlobalError.observeMethod(qx.core.Variant.select(j,{"gecko":function(bc){var bd=qx.bom.Event.getTarget(bc);

if(!this.__gc(bd)){qx.bom.Event.preventDefault(bc);
}},"default":null})),__fP:qx.event.GlobalError.observeMethod(qx.core.Variant.select(j,{"mshtml":function(be){this.__fN();
var bg=qx.bom.Event.getTarget(be);
var bf=this.__ga(bg);

if(bf){this.setFocus(bf);
}this.tryActivate(bg);
},"opera":function(bh){var bi=qx.bom.Event.getTarget(bh);

if(bi==this._document||bi==this._window){this.__fN();

if(this.__fJ){this.setFocus(this.__fJ);
delete this.__fJ;
}
if(this.__fK){this.setActive(this.__fK);
delete this.__fK;
}}else{this.setFocus(bi);
this.tryActivate(bi);
if(!this.__gc(bi)){bi.selectionStart=0;
bi.selectionEnd=0;
}}},"default":null})),__fQ:qx.event.GlobalError.observeMethod(qx.core.Variant.select(j,{"mshtml":function(bj){var bk=qx.bom.Event.getRelatedTarget(bj);
if(bk==null){this.__fM();
this.resetFocus();
this.resetActive();
}},"webkit":function(bl){var bm=qx.bom.Event.getTarget(bl);

if(bm===this.getFocus()){this.resetFocus();
}
if(bm===this.getActive()){this.resetActive();
}},"opera":function(bn){var bo=qx.bom.Event.getTarget(bn);

if(bo==this._document){this.__fM();
this.__fJ=this.getFocus();
this.__fK=this.getActive();
this.resetFocus();
this.resetActive();
}else{if(bo===this.getFocus()){this.resetFocus();
}
if(bo===this.getActive()){this.resetActive();
}}},"default":null})),__fR:qx.event.GlobalError.observeMethod(qx.core.Variant.select(j,{"gecko":function(bp){var bq=qx.bom.Event.getTarget(bp);

if(bq===this._window||bq===this._document){this.__fM();
this.resetActive();
this.resetFocus();
}},"webkit":function(br){var bs=qx.bom.Event.getTarget(br);

if(bs===this._window||bs===this._document){this.__fM();
this.__fJ=this.getFocus();
this.__fK=this.getActive();
this.resetActive();
this.resetFocus();
}},"default":null})),__fS:qx.event.GlobalError.observeMethod(qx.core.Variant.select(j,{"gecko":function(bt){var bu=qx.bom.Event.getTarget(bt);

if(bu===this._window||bu===this._document){this.__fN();
bu=this._body;
}this.setFocus(bu);
this.tryActivate(bu);
},"webkit":function(bv){var bw=qx.bom.Event.getTarget(bv);

if(bw===this._window||bw===this._document){this.__fN();

if(this.__fJ){this.setFocus(this.__fJ);
delete this.__fJ;
}
if(this.__fK){this.setActive(this.__fK);
delete this.__fK;
}}else{this.setFocus(bw);
this.tryActivate(bw);
}},"default":null})),__fT:qx.event.GlobalError.observeMethod(qx.core.Variant.select(j,{"gecko":function(bx){var bz=qx.bom.Event.getTarget(bx);
var by=this.__ga(bz);

if(!by){qx.bom.Event.preventDefault(bx);
}else if(by===this._body){this.setFocus(by);
}},"mshtml":function(bA){var bC=qx.bom.Event.getTarget(bA);
var bB=this.__ga(bC);

if(bB){if(!this.__gc(bC)){bC.unselectable=e;
try{document.selection.empty();
}catch(bD){}try{bB.focus();
}catch(bE){}}}else{qx.bom.Event.preventDefault(bA);
if(!this.__gc(bC)){bC.unselectable=e;
}}},"webkit":function(bF){this.__fU(bF);
},"opera":function(bG){if(qx.bom.client.Engine.VERSION==w){this.__fU(bG);
}else{var bJ=qx.bom.Event.getTarget(bG);
var bH=this.__ga(bJ);

if(!this.__gc(bJ)){qx.bom.Event.preventDefault(bG);
if(bH){var bI=this.getFocus();

if(bI&&bI.selectionEnd){bI.selectionStart=0;
bI.selectionEnd=0;
bI.blur();
}if(bH){this.setFocus(bH);
}}}else if(bH){this.setFocus(bH);
}}},"default":null})),__fU:function(bK){var bM=qx.bom.Event.getTarget(bK);
var bL=this.__ga(bM);
if(bL){this.setFocus(bL);
}else{qx.bom.Event.preventDefault(bK);
}},__fV:qx.event.GlobalError.observeMethod(qx.core.Variant.select(j,{"mshtml":function(bN){var bO=qx.bom.Event.getTarget(bN);

if(bO.unselectable){bO.unselectable=n;
}this.tryActivate(this.__fW(bO));
},"gecko":function(bP){var bQ=qx.bom.Event.getTarget(bP);

while(bQ&&bQ.offsetWidth===undefined){bQ=bQ.parentNode;
}
if(bQ){this.tryActivate(bQ);
}},"webkit|opera":function(bR){var bS=qx.bom.Event.getTarget(bR);
this.tryActivate(this.__fW(bS));
},"default":null})),__fW:qx.event.GlobalError.observeMethod(qx.core.Variant.select(j,{"mshtml|webkit":function(bT){var bU=this.getFocus();

if(bU&&bT!=bU&&(bU.nodeName.toLowerCase()===r||bU.nodeName.toLowerCase()===u)){bT=bU;
}return bT;
},"default":function(bV){return bV;
}})),__fX:qx.event.GlobalError.observeMethod(qx.core.Variant.select(j,{"mshtml|webkit":function(bW){var bX=qx.bom.Event.getTarget(bW);

if(!this.__gc(bX)){qx.bom.Event.preventDefault(bW);
}},"default":null})),__fY:function(bY){var ca=qx.bom.element.Attribute.get(bY,q);

if(ca>=1){return true;
}var cb=qx.event.handler.Focus.FOCUSABLE_ELEMENTS;

if(ca>=0&&cb[bY.tagName]){return true;
}return false;
},__ga:function(cc){while(cc&&cc.nodeType===1){if(cc.getAttribute(m)==e){return null;
}
if(this.__fY(cc)){return cc;
}cc=cc.parentNode;
}return this._body;
},__gb:function(cd){var ce=cd;

while(cd&&cd.nodeType===1){if(cd.getAttribute(k)==e){return null;
}cd=cd.parentNode;
}return ce;
},__gc:function(cf){while(cf&&cf.nodeType===1){var cg=cf.getAttribute(p);

if(cg!=null){return cg===e;
}cf=cf.parentNode;
}return true;
},_applyActive:function(ch,ci){if(ci){this.__fL(ci,ch,v,true);
}
if(ch){this.__fL(ch,ci,o,true);
}},_applyFocus:function(cj,ck){if(ck){this.__fL(ck,cj,a,true);
}
if(cj){this.__fL(cj,ck,b,true);
}if(ck){this.__fL(ck,cj,g,false);
}
if(cj){this.__fL(cj,ck,f,false);
}}},destruct:function(){this._stopObserver();
this._manager=this._window=this._document=this._root=this._body=this.__gd=null;
},defer:function(cl){qx.event.Registration.addHandler(cl);
var cm=cl.FOCUSABLE_ELEMENTS;

for(var cn in cm){cm[cn.toUpperCase()]=1;
}}});
})();
(function(){var k="qx.client",j="character",i="EndToEnd",h="input",g="textarea",f="StartToStart",e='character',d="qx.bom.Selection",c="button",b="#text",a="body";
qx.Class.define(d,{statics:{getSelectionObject:qx.core.Variant.select(k,{"mshtml":function(l){return l.selection;
},"default":function(m){return qx.dom.Node.getWindow(m).getSelection();
}}),get:qx.core.Variant.select(k,{"mshtml":function(n){var o=qx.bom.Range.get(qx.dom.Node.getDocument(n));
return o.text;
},"default":function(p){if(this.__ge(p)){return p.value.substring(p.selectionStart,p.selectionEnd);
}else{return this.getSelectionObject(qx.dom.Node.getDocument(p)).toString();
}}}),getLength:qx.core.Variant.select(k,{"mshtml":function(q){var s=this.get(q);
var r=qx.util.StringSplit.split(s,/\r\n/);
return s.length-(r.length-1);
},"opera":function(t){var y,w,u;

if(this.__ge(t)){var x=t.selectionStart;
var v=t.selectionEnd;
y=t.value.substring(x,v);
w=v-x;
}else{y=qx.bom.Selection.get(t);
w=y.length;
}u=qx.util.StringSplit.split(y,/\r\n/);
return w-(u.length-1);
},"default":function(z){if(this.__ge(z)){return z.selectionEnd-z.selectionStart;
}else{return this.get(z).length;
}}}),getStart:qx.core.Variant.select(k,{"mshtml":function(A){if(this.__ge(A)){var F=qx.bom.Range.get();
if(!A.contains(F.parentElement())){return -1;
}var G=qx.bom.Range.get(A);
var E=A.value.length;
G.moveToBookmark(F.getBookmark());
G.moveEnd(e,E);
return E-G.text.length;
}else{var G=qx.bom.Range.get(A);
var C=G.parentElement();
var H=qx.bom.Range.get();

try{H.moveToElementText(C);
}catch(J){return 0;
}var B=qx.bom.Range.get(qx.dom.Node.getBodyElement(A));
B.setEndPoint(f,G);
B.setEndPoint(i,H);
if(H.compareEndPoints(f,B)==0){return 0;
}var D;
var I=0;

while(true){D=B.moveStart(j,-1);
if(H.compareEndPoints(f,B)==0){break;
}if(D==0){break;
}else{I++;
}}return ++I;
}},"gecko|webkit":function(K){if(this.__ge(K)){return K.selectionStart;
}else{var M=qx.dom.Node.getDocument(K);
var L=this.getSelectionObject(M);
if(L.anchorOffset<L.focusOffset){return L.anchorOffset;
}else{return L.focusOffset;
}}},"default":function(N){if(this.__ge(N)){return N.selectionStart;
}else{return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(N)).anchorOffset;
}}}),getEnd:qx.core.Variant.select(k,{"mshtml":function(O){if(this.__ge(O)){var T=qx.bom.Range.get();
if(!O.contains(T.parentElement())){return -1;
}var U=qx.bom.Range.get(O);
var S=O.value.length;
U.moveToBookmark(T.getBookmark());
U.moveStart(e,-S);
return U.text.length;
}else{var U=qx.bom.Range.get(O);
var Q=U.parentElement();
var V=qx.bom.Range.get();

try{V.moveToElementText(Q);
}catch(X){return 0;
}var S=V.text.length;
var P=qx.bom.Range.get(qx.dom.Node.getBodyElement(O));
P.setEndPoint(i,U);
P.setEndPoint(f,V);
if(V.compareEndPoints(i,P)==0){return S-1;
}var R;
var W=0;

while(true){R=P.moveEnd(j,1);
if(V.compareEndPoints(i,P)==0){break;
}if(R==0){break;
}else{W++;
}}return S-(++W);
}},"gecko|webkit":function(Y){if(this.__ge(Y)){return Y.selectionEnd;
}else{var bb=qx.dom.Node.getDocument(Y);
var ba=this.getSelectionObject(bb);
if(ba.focusOffset>ba.anchorOffset){return ba.focusOffset;
}else{return ba.anchorOffset;
}}},"default":function(bc){if(this.__ge(bc)){return bc.selectionEnd;
}else{return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(bc)).focusOffset;
}}}),__ge:function(bd){return qx.dom.Node.isElement(bd)&&(bd.nodeName.toLowerCase()==h||bd.nodeName.toLowerCase()==g);
},set:qx.core.Variant.select(k,{"mshtml":function(be,bf,bg){var bh;
if(qx.dom.Node.isDocument(be)){be=be.body;
}
if(qx.dom.Node.isElement(be)||qx.dom.Node.isText(be)){switch(be.nodeName.toLowerCase()){case h:case g:case c:if(bg===undefined){bg=be.value.length;
}
if(bf>=0&&bf<=be.value.length&&bg>=0&&bg<=be.value.length){bh=qx.bom.Range.get(be);
bh.collapse(true);
bh.moveStart(j,bf);
bh.moveEnd(j,bg-bf);
bh.select();
return true;
}break;
case b:if(bg===undefined){bg=be.nodeValue.length;
}
if(bf>=0&&bf<=be.nodeValue.length&&bg>=0&&bg<=be.nodeValue.length){bh=qx.bom.Range.get(qx.dom.Node.getBodyElement(be));
bh.moveToElementText(be.parentNode);
bh.collapse(true);
bh.moveStart(j,bf);
bh.moveEnd(j,bg-bf);
bh.select();
return true;
}break;
default:if(bg===undefined){bg=be.childNodes.length-1;
}if(be.childNodes[bf]&&be.childNodes[bg]){bh=qx.bom.Range.get(qx.dom.Node.getBodyElement(be));
bh.moveToElementText(be.childNodes[bf]);
bh.collapse(true);
var bi=qx.bom.Range.get(qx.dom.Node.getBodyElement(be));
bi.moveToElementText(be.childNodes[bg]);
bh.setEndPoint(i,bi);
bh.select();
return true;
}}}return false;
},"default":function(bj,bk,bl){var bp=bj.nodeName.toLowerCase();

if(qx.dom.Node.isElement(bj)&&(bp==h||bp==g)){if(bl===undefined){bl=bj.value.length;
}if(bk>=0&&bk<=bj.value.length&&bl>=0&&bl<=bj.value.length){bj.focus();
bj.select();
bj.setSelectionRange(bk,bl);
return true;
}}else{var bn=false;
var bo=qx.dom.Node.getWindow(bj).getSelection();
var bm=qx.bom.Range.get(bj);
if(qx.dom.Node.isText(bj)){if(bl===undefined){bl=bj.length;
}
if(bk>=0&&bk<bj.length&&bl>=0&&bl<=bj.length){bn=true;
}}else if(qx.dom.Node.isElement(bj)){if(bl===undefined){bl=bj.childNodes.length-1;
}
if(bk>=0&&bj.childNodes[bk]&&bl>=0&&bj.childNodes[bl]){bn=true;
}}else if(qx.dom.Node.isDocument(bj)){bj=bj.body;

if(bl===undefined){bl=bj.childNodes.length-1;
}
if(bk>=0&&bj.childNodes[bk]&&bl>=0&&bj.childNodes[bl]){bn=true;
}}
if(bn){if(!bo.isCollapsed){bo.collapseToStart();
}bm.setStart(bj,bk);
if(qx.dom.Node.isText(bj)){bm.setEnd(bj,bl);
}else{bm.setEndAfter(bj.childNodes[bl]);
}if(bo.rangeCount>0){bo.removeAllRanges();
}bo.addRange(bm);
return true;
}}return false;
}}),setAll:function(bq){return qx.bom.Selection.set(bq,0);
},clear:qx.core.Variant.select(k,{"mshtml":function(br){var bs=qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(br));
var bt=qx.bom.Range.get(br);
var parent=bt.parentElement();
var bu=qx.bom.Range.get(qx.dom.Node.getDocument(br));
if(parent==bu.parentElement()&&parent==br){bs.empty();
}},"default":function(bv){var bx=qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(bv));
var bz=bv.nodeName.toLowerCase();
if(qx.dom.Node.isElement(bv)&&(bz==h||bz==g)){bv.setSelectionRange(0,0);
qx.bom.Element.blur(bv);
}else if(qx.dom.Node.isDocument(bv)||bz==a){bx.collapse(bv.body?bv.body:bv,0);
}else{var by=qx.bom.Range.get(bv);

if(!by.collapsed){var bA;
var bw=by.commonAncestorContainer;
if(qx.dom.Node.isElement(bv)&&qx.dom.Node.isText(bw)){bA=bw.parentNode;
}else{bA=bw;
}
if(bA==bv){bx.collapse(bv,0);
}}}}})}});
})();
(function(){var l="button",k="qx.bom.Range",j="text",i="password",h="file",g="submit",f="reset",e="textarea",d="input",c="hidden",a="qx.client",b="body";
qx.Class.define(k,{statics:{get:qx.core.Variant.select(a,{"mshtml":function(m){if(qx.dom.Node.isElement(m)){switch(m.nodeName.toLowerCase()){case d:switch(m.type){case j:case i:case c:case l:case f:case h:case g:return m.createTextRange();
break;
default:return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(m)).createRange();
}break;
case e:case b:case l:return m.createTextRange();
break;
default:return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(m)).createRange();
}}else{if(m==null){m=window;
}return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(m)).createRange();
}},"default":function(n){var o=qx.dom.Node.getDocument(n);
var p=qx.bom.Selection.getSelectionObject(o);

if(p.rangeCount>0){return p.getRangeAt(0);
}else{return o.createRange();
}}})}});
})();
(function(){var j="",h="m",g="g",f="^",e="qx.util.StringSplit",d="i",c="$(?!\\s)",b="[object RegExp]",a="y";
qx.Class.define(e,{statics:{split:function(k,l,m){if(Object.prototype.toString.call(l)!==b){return String.prototype.split.call(k,l,m);
}var t=[],n=0,r=(l.ignoreCase?d:j)+(l.multiline?h:j)+(l.sticky?a:j),l=RegExp(l.source,r+g),q,u,o,p,s=/()??/.exec(j)[1]===undefined;
k=k+j;

if(!s){q=RegExp(f+l.source+c,r);
}if(m===undefined||+m<0){m=Infinity;
}else{m=Math.floor(+m);

if(!m){return [];
}}
while(u=l.exec(k)){o=u.index+u[0].length;

if(o>n){t.push(k.slice(n,u.index));
if(!s&&u.length>1){u[0].replace(q,function(){for(var i=1;i<arguments.length-2;i++){if(arguments[i]===undefined){u[i]=undefined;
}}});
}
if(u.length>1&&u.index<k.length){Array.prototype.push.apply(t,u.slice(1));
}p=u[0].length;
n=o;

if(t.length>=m){break;
}}
if(l.lastIndex===u.index){l.lastIndex++;
}}
if(n===k.length){if(p||!l.test(j)){t.push(j);
}}else{t.push(k.slice(n));
}return t.length>m?t.slice(0,m):t;
}}});
})();
(function(){var a="qx.event.type.Focus";
qx.Class.define(a,{extend:qx.event.type.Event,members:{init:function(b,c,d){qx.event.type.Event.prototype.init.call(this,d,false);
this._target=b;
this._relatedTarget=c;
return this;
}}});
})();
(function(){var j="",i="undefined",h="qx.client",g="readOnly",f="accessKey",e="qx.bom.element.Attribute",d="rowSpan",c="vAlign",b="className",a="textContent",y="'",x="htmlFor",w="longDesc",v="cellSpacing",u="frameBorder",t="='",s="useMap",r="innerText",q="innerHTML",p="tabIndex",n="dateTime",o="maxLength",l="mshtml",m="cellPadding",k="colSpan";
qx.Class.define(e,{statics:{__gf:{names:{"class":b,"for":x,html:q,text:qx.core.Variant.isSet(h,l)?r:a,colspan:k,rowspan:d,valign:c,datetime:n,accesskey:f,tabindex:p,maxlength:o,readonly:g,longdesc:w,cellpadding:m,cellspacing:v,frameborder:u,usemap:s},runtime:{"html":1,"text":1},bools:{compact:1,nowrap:1,ismap:1,declare:1,noshade:1,checked:1,disabled:1,readOnly:1,multiple:1,selected:1,noresize:1,defer:1,allowTransparency:1},property:{$$html:1,$$widget:1,disabled:1,checked:1,readOnly:1,multiple:1,selected:1,value:1,maxLength:1,className:1,innerHTML:1,innerText:1,textContent:1,htmlFor:1,tabIndex:1},qxProperties:{$$widget:1,$$html:1},propertyDefault:{disabled:false,checked:false,readOnly:false,multiple:false,selected:false,value:j,className:j,innerHTML:j,innerText:j,textContent:j,htmlFor:j,tabIndex:0,maxLength:qx.core.Variant.select(h,{"mshtml":2147483647,"webkit":524288,"default":-1})},removeableProperties:{disabled:1,multiple:1,maxLength:1},original:{href:1,src:1,type:1}},compile:function(z){var A=[];
var C=this.__gf.runtime;

for(var B in z){if(!C[B]){A.push(B,t,z[B],y);
}}return A.join(j);
},get:qx.core.Variant.select(h,{"mshtml":function(D,name){var F=this.__gf;
var E;
name=F.names[name]||name;
if(F.original[name]){E=D.getAttribute(name,2);
}else if(F.property[name]){E=D[name];

if(typeof F.propertyDefault[name]!==i&&E==F.propertyDefault[name]){if(typeof F.bools[name]===i){return null;
}else{return E;
}}}else{E=D.getAttribute(name);
}if(F.bools[name]){return !!E;
}return E;
},"default":function(G,name){var I=this.__gf;
var H;
name=I.names[name]||name;
if(I.property[name]){H=G[name];

if(typeof I.propertyDefault[name]!==i&&H==I.propertyDefault[name]){if(typeof I.bools[name]===i){return null;
}else{return H;
}}}else{H=G.getAttribute(name);
}if(I.bools[name]){return !!H;
}return H;
}}),set:function(J,name,K){if(typeof K===i){return;
}var L=this.__gf;
name=L.names[name]||name;
if(L.bools[name]){K=!!K;
}if(L.property[name]&&(!(J[name]===undefined)||L.qxProperties[name])){if(K==null){if(L.removeableProperties[name]){J.removeAttribute(name);
return;
}else if(typeof L.propertyDefault[name]!==i){K=L.propertyDefault[name];
}}J[name]=K;
}else{if(K===true){J.setAttribute(name,name);
}else if(K===false||K===null){J.removeAttribute(name);
}else{J.setAttribute(name,K);
}}},reset:function(M,name){this.set(M,name,null);
}}});
})();
(function(){var a="qx.event.type.Drag";
qx.Class.define(a,{extend:qx.event.type.Event,members:{init:function(b,c){qx.event.type.Event.prototype.init.call(this,true,b);

if(c){this._native=c.getNativeEvent()||null;
this._originalTarget=c.getTarget()||null;
}else{this._native=null;
this._originalTarget=null;
}return this;
},clone:function(d){var e=qx.event.type.Event.prototype.clone.call(this,d);
e._native=this._native;
return e;
},getDocumentLeft:function(){if(this._native==null){return 0;
}
if(this._native.pageX!==undefined){return this._native.pageX;
}else{var f=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientX+qx.bom.Viewport.getScrollLeft(f);
}},getDocumentTop:function(){if(this._native==null){return 0;
}
if(this._native.pageY!==undefined){return this._native.pageY;
}else{var g=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientY+qx.bom.Viewport.getScrollTop(g);
}},getManager:function(){return qx.event.Registration.getManager(this.getTarget()).getHandler(qx.event.handler.DragDrop);
},addType:function(h){this.getManager().addType(h);
},addAction:function(i){this.getManager().addAction(i);
},supportsType:function(j){return this.getManager().supportsType(j);
},supportsAction:function(k){return this.getManager().supportsAction(k);
},addData:function(l,m){this.getManager().addData(l,m);
},getData:function(n){return this.getManager().getData(n);
},getCurrentType:function(){return this.getManager().getCurrentType();
},getCurrentAction:function(){return this.getManager().getCurrentAction();
}}});
})();
(function(){var h="losecapture",g="qx.client",f="blur",e="focus",d="click",c="qx.event.dispatch.MouseCapture",b="capture",a="scroll";
qx.Class.define(c,{extend:qx.event.dispatch.AbstractBubbling,construct:function(i,j){qx.event.dispatch.AbstractBubbling.call(this,i);
this.__gj=i.getWindow();
this.__gk=j;
i.addListener(this.__gj,f,this.releaseCapture,this);
i.addListener(this.__gj,e,this.releaseCapture,this);
i.addListener(this.__gj,a,this.releaseCapture,this);
},statics:{PRIORITY:qx.event.Registration.PRIORITY_FIRST},members:{__gk:null,__gl:null,__gm:true,__gj:null,_getParent:function(k){return k.parentNode;
},canDispatchEvent:function(l,event,m){return !!(this.__gl&&this.__gn[m]);
},dispatchEvent:function(n,event,o){if(o==d){event.stopPropagation();
this.releaseCapture();
return;
}
if(this.__gm||!qx.dom.Hierarchy.contains(this.__gl,n)){n=this.__gl;
}qx.event.dispatch.AbstractBubbling.prototype.dispatchEvent.call(this,n,event,o);
},__gn:{"mouseup":1,"mousedown":1,"click":1,"dblclick":1,"mousemove":1,"mouseout":1,"mouseover":1},activateCapture:function(p,q){var q=q!==false;

if(this.__gl===p&&this.__gm==q){return;
}
if(this.__gl){this.releaseCapture();
}this.nativeSetCapture(p,q);

if(this.hasNativeCapture){var self=this;
qx.bom.Event.addNativeListener(p,h,function(){qx.bom.Event.removeNativeListener(p,h,arguments.callee);
self.releaseCapture();
});
}this.__gm=q;
this.__gl=p;
this.__gk.fireEvent(p,b,qx.event.type.Event,[true,false]);
},getCaptureElement:function(){return this.__gl;
},releaseCapture:function(){var r=this.__gl;

if(!r){return;
}this.__gl=null;
this.__gk.fireEvent(r,h,qx.event.type.Event,[true,false]);
this.nativeReleaseCapture(r);
},hasNativeCapture:qx.bom.client.Engine.MSHTML,nativeSetCapture:qx.core.Variant.select(g,{"mshtml":function(s,t){s.setCapture(t!==false);
},"default":qx.lang.Function.empty}),nativeReleaseCapture:qx.core.Variant.select(g,{"mshtml":function(u){u.releaseCapture();
},"default":qx.lang.Function.empty})},destruct:function(){this.__gl=this.__gj=this.__gk=null;
},defer:function(v){qx.event.Registration.addDispatcher(v);
}});
})();
(function(){var c="qx.bom.Selector";
qx.Class.define(c,{statics:{query:null,matches:null}});
(function(){var o=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,v=0,r=Object.prototype.toString,p=false,x=true;
[0,0].sort(function(){x=false;
return 0;
});
var g=function(z,A,B,C){B=B||[];
A=A||document;
var L=A;

if(A.nodeType!==1&&A.nodeType!==9){return [];
}
if(!z||typeof z!=="string"){return B;
}var m,F,D,H,J,G,M,i,N=true,E=g.isXML(A),I=[],K=z;
do{o.exec("");
m=o.exec(K);

if(m){K=m[3];
I.push(m[1]);

if(m[2]){H=m[3];
break;
}}}while(m);

if(I.length>1&&q.exec(z)){if(I.length===2&&k.relative[I[0]]){F=h(I[0]+I[1],A);
}else{F=k.relative[I[0]]?[A]:g(I.shift(),A);

while(I.length){z=I.shift();

if(k.relative[z]){z+=I.shift();
}F=h(z,F);
}}}else{if(!C&&I.length>1&&A.nodeType===9&&!E&&k.match.ID.test(I[0])&&!k.match.ID.test(I[I.length-1])){J=g.find(I.shift(),A,E);
A=J.expr?g.filter(J.expr,J.set)[0]:J.set[0];
}
if(A){J=C?
{expr:I.pop(),set:f(C)}:g.find(I.pop(),I.length===1&&(I[0]==="~"||I[0]==="+")&&A.parentNode?A.parentNode:A,E);
F=J.expr?g.filter(J.expr,J.set):J.set;

if(I.length>0){D=f(F);
}else{N=false;
}
while(I.length){G=I.pop();
M=G;

if(!k.relative[G]){G="";
}else{M=I.pop();
}
if(M==null){M=A;
}k.relative[G](D,M,E);
}}else{D=I=[];
}}
if(!D){D=F;
}
if(!D){g.error(G||z);
}
if(r.call(D)==="[object Array]"){if(!N){B.push.apply(B,D);
}else if(A&&A.nodeType===1){for(i=0;D[i]!=null;i++){if(D[i]&&(D[i]===true||D[i].nodeType===1&&g.contains(A,D[i]))){B.push(F[i]);
}}}else{for(i=0;D[i]!=null;i++){if(D[i]&&D[i].nodeType===1){B.push(F[i]);
}}}}else{f(D,B);
}
if(H){g(H,L,B,C);
g.uniqueSort(B);
}return B;
};
g.uniqueSort=function(O){if(s){p=x;
O.sort(s);

if(p){for(var i=1;i<O.length;i++){if(O[i]===O[i-1]){O.splice(i--,1);
}}}}return O;
};
g.matches=function(P,Q){return g(P,null,null,Q);
};
g.matchesSelector=function(R,S){return g(S,null,null,[R]).length>0;
};
g.find=function(T,U,V){var W;

if(!T){return [];
}
for(var i=0,l=k.order.length;i<l;i++){var Y,X=k.order[i];

if((Y=k.leftMatch[X].exec(T))){var ba=Y[1];
Y.splice(1,1);

if(ba.substr(ba.length-1)!=="\\"){Y[1]=(Y[1]||"").replace(/\\/g,"");
W=k.find[X](Y,U,V);

if(W!=null){T=T.replace(k.match[X],"");
break;
}}}}
if(!W){W=U.getElementsByTagName("*");
}return {set:W,expr:T};
};
g.filter=function(bb,bc,bd,be){var br,bq,bf=bb,bk=[],bg=bc,bh=bc&&bc[0]&&g.isXML(bc[0]);

while(bb&&bc.length){for(var bo in k.filter){if((br=k.leftMatch[bo].exec(bb))!=null&&br[2]){var bn,bj,bi=k.filter[bo],bs=br[1];
bq=false;
br.splice(1,1);

if(bs.substr(bs.length-1)==="\\"){continue;
}
if(bg===bk){bk=[];
}
if(k.preFilter[bo]){br=k.preFilter[bo](br,bg,bd,bk,be,bh);

if(!br){bq=bn=true;
}else if(br===true){continue;
}}
if(br){for(var i=0;(bj=bg[i])!=null;i++){if(bj){bn=bi(bj,br,i,bg);
var bm=be^!!bn;

if(bd&&bn!=null){if(bm){bq=true;
}else{bg[i]=false;
}}else if(bm){bk.push(bj);
bq=true;
}}}}
if(bn!==undefined){if(!bd){bg=bk;
}bb=bb.replace(k.match[bo],"");

if(!bq){return [];
}break;
}}}if(bb===bf){if(bq==null){g.error(bb);
}else{break;
}}bf=bb;
}return bg;
};
g.error=function(bt){throw "Syntax error, unrecognized expression: "+bt;
};
var k=g.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+\-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(bu){return bu.getAttribute("href");
}},relative:{"+":function(bv,bw){var bx=typeof bw==="string",bz=bx&&!/\W/.test(bw),bA=bx&&!bz;

if(bz){bw=bw.toLowerCase();
}
for(var i=0,l=bv.length,by;i<l;i++){if((by=bv[i])){while((by=by.previousSibling)&&by.nodeType!==1){}bv[i]=bA||by&&by.nodeName.toLowerCase()===bw?by||false:by===bw;
}}
if(bA){g.filter(bw,bv,true);
}},">":function(bB,bC){var bE,bD=typeof bC==="string",i=0,l=bB.length;

if(bD&&!/\W/.test(bC)){bC=bC.toLowerCase();

for(;i<l;i++){bE=bB[i];

if(bE){var parent=bE.parentNode;
bB[i]=parent.nodeName.toLowerCase()===bC?parent:false;
}}}else{for(;i<l;i++){bE=bB[i];

if(bE){bB[i]=bD?bE.parentNode:bE.parentNode===bC;
}}
if(bD){g.filter(bC,bB,true);
}}},"":function(bF,bG,bH){var bK,bI=v++,bJ=w;

if(typeof bG==="string"&&!/\W/.test(bG)){bG=bG.toLowerCase();
bK=bG;
bJ=y;
}bJ("parentNode",bG,bI,bF,bK,bH);
},"~":function(bL,bM,bN){var bQ,bO=v++,bP=w;

if(typeof bM==="string"&&!/\W/.test(bM)){bM=bM.toLowerCase();
bQ=bM;
bP=y;
}bP("previousSibling",bM,bO,bL,bQ,bN);
}},find:{ID:function(bR,bS,bT){if(typeof bS.getElementById!=="undefined"&&!bT){var m=bS.getElementById(bR[1]);
return m&&m.parentNode?[m]:[];
}},NAME:function(bU,bV){if(typeof bV.getElementsByName!=="undefined"){var bX=[],bW=bV.getElementsByName(bU[1]);

for(var i=0,l=bW.length;i<l;i++){if(bW[i].getAttribute("name")===bU[1]){bX.push(bW[i]);
}}return bX.length===0?null:bX;
}},TAG:function(bY,ca){return ca.getElementsByTagName(bY[1]);
}},preFilter:{CLASS:function(cb,cc,cd,ce,cf,cg){cb=" "+cb[1].replace(/\\/g,"")+" ";

if(cg){return cb;
}
for(var i=0,ch;(ch=cc[i])!=null;i++){if(ch){if(cf^(ch.className&&(" "+ch.className+" ").replace(/[\t\n]/g," ").indexOf(cb)>=0)){if(!cd){ce.push(ch);
}}else if(cd){cc[i]=false;
}}}return false;
},ID:function(ci){return ci[1].replace(/\\/g,"");
},TAG:function(cj,ck){return cj[1].toLowerCase();
},CHILD:function(cl){if(cl[1]==="nth"){var cm=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(cl[2]==="even"&&"2n"||cl[2]==="odd"&&"2n+1"||!/\D/.test(cl[2])&&"0n+"+cl[2]||cl[2]);
cl[2]=(cm[1]+(cm[2]||1))-0;
cl[3]=cm[3]-0;
}cl[0]=v++;
return cl;
},ATTR:function(cn,co,cp,cq,cr,cs){var name=cn[1].replace(/\\/g,"");

if(!cs&&k.attrMap[name]){cn[1]=k.attrMap[name];
}
if(cn[2]==="~="){cn[4]=" "+cn[4]+" ";
}return cn;
},PSEUDO:function(ct,cu,cv,cw,cx){if(ct[1]==="not"){if((o.exec(ct[3])||"").length>1||/^\w/.test(ct[3])){ct[3]=g(ct[3],null,null,cu);
}else{var cy=g.filter(ct[3],cu,cv,true^cx);

if(!cv){cw.push.apply(cw,cy);
}return false;
}}else if(k.match.POS.test(ct[0])||k.match.CHILD.test(ct[0])){return true;
}return ct;
},POS:function(cz){cz.unshift(true);
return cz;
}},filters:{enabled:function(cA){return cA.disabled===false&&cA.type!=="hidden";
},disabled:function(cB){return cB.disabled===true;
},checked:function(cC){return cC.checked===true;
},selected:function(cD){cD.parentNode.selectedIndex;
return cD.selected===true;
},parent:function(cE){return !!cE.firstChild;
},empty:function(cF){return !cF.firstChild;
},has:function(cG,i,cH){return !!g(cH[3],cG).length;
},header:function(cI){return (/h\d/i).test(cI.nodeName);
},text:function(cJ){return "text"===cJ.type;
},radio:function(cK){return "radio"===cK.type;
},checkbox:function(cL){return "checkbox"===cL.type;
},file:function(cM){return "file"===cM.type;
},password:function(cN){return "password"===cN.type;
},submit:function(cO){return "submit"===cO.type;
},image:function(cP){return "image"===cP.type;
},reset:function(cQ){return "reset"===cQ.type;
},button:function(cR){return "button"===cR.type||cR.nodeName.toLowerCase()==="button";
},input:function(cS){return (/input|select|textarea|button/i).test(cS.nodeName);
}},setFilters:{first:function(cT,i){return i===0;
},last:function(cU,i,cV,cW){return i===cW.length-1;
},even:function(cX,i){return i%2===0;
},odd:function(cY,i){return i%2===1;
},lt:function(da,i,db){return i<db[3]-0;
},gt:function(dc,i,dd){return i>dd[3]-0;
},nth:function(de,i,df){return df[3]-0===i;
},eq:function(dg,i,dh){return dh[3]-0===i;
}},filter:{PSEUDO:function(di,dj,i,dk){var name=dj[1],dl=k.filters[name];

if(dl){return dl(di,i,dj,dk);
}else if(name==="contains"){return (di.textContent||di.innerText||g.getText([di])||"").indexOf(dj[3])>=0;
}else if(name==="not"){var dm=dj[3];

for(var j=0,l=dm.length;j<l;j++){if(dm[j]===di){return false;
}}return true;
}else{g.error("Syntax error, unrecognized expression: "+name);
}},CHILD:function(dn,dp){var dv=dp[1],dq=dn;

switch(dv){case "only":case "first":while((dq=dq.previousSibling)){if(dq.nodeType===1){return false;
}}
if(dv==="first"){return true;
}dq=dn;
case "last":while((dq=dq.nextSibling)){if(dq.nodeType===1){return false;
}}return true;
case "nth":var dw=dp[2],ds=dp[3];

if(dw===1&&ds===0){return true;
}var du=dp[0],parent=dn.parentNode;

if(parent&&(parent.sizcache!==du||!dn.nodeIndex)){var dr=0;

for(dq=parent.firstChild;dq;dq=dq.nextSibling){if(dq.nodeType===1){dq.nodeIndex=++dr;
}}parent.sizcache=du;
}var dt=dn.nodeIndex-ds;

if(dw===0){return dt===0;
}else{return (dt%dw===0&&dt/dw>=0);
}}},ID:function(dx,dy){return dx.nodeType===1&&dx.getAttribute("id")===dy;
},TAG:function(dz,dA){return (dA==="*"&&dz.nodeType===1)||dz.nodeName.toLowerCase()===dA;
},CLASS:function(dB,dC){return (" "+(dB.className||dB.getAttribute("class"))+" ").indexOf(dC)>-1;
},ATTR:function(dD,dE){var name=dE[1],dI=k.attrHandle[name]?k.attrHandle[name](dD):dD[name]!=null?dD[name]:dD.getAttribute(name),dH=dI+"",dG=dE[2],dF=dE[4];
return dI==null?dG==="!=":dG==="="?dH===dF:dG==="*="?dH.indexOf(dF)>=0:dG==="~="?(" "+dH+" ").indexOf(dF)>=0:!dF?dH&&dI!==false:dG==="!="?dH!==dF:dG==="^="?dH.indexOf(dF)===0:dG==="$="?dH.substr(dH.length-dF.length)===dF:dG==="|="?dH===dF||dH.substr(0,dF.length+1)===dF+"-":false;
},POS:function(dJ,dK,i,dL){var name=dK[2],dM=k.setFilters[name];

if(dM){return dM(dJ,i,dK,dL);
}}}};
var q=k.match.POS,d=function(dN,dO){return "\\"+(dO-0+1);
};

for(var u in k.match){k.match[u]=new RegExp(k.match[u].source+(/(?![^\[]*\])(?![^\(]*\))/.source));
k.leftMatch[u]=new RegExp(/(^(?:.|\r|\n)*?)/.source+k.match[u].source.replace(/\\(\d+)/g,d));
}var f=function(dP,dQ){dP=Array.prototype.slice.call(dP,0);

if(dQ){dQ.push.apply(dQ,dP);
return dQ;
}return dP;
};
try{Array.prototype.slice.call(document.documentElement.childNodes,0)[0].nodeType;
}catch(e){f=function(dR,dS){var i=0,dT=dS||[];

if(r.call(dR)==="[object Array]"){Array.prototype.push.apply(dT,dR);
}else{if(typeof dR.length==="number"){for(var l=dR.length;i<l;i++){dT.push(dR[i]);
}}else{for(;dR[i];i++){dT.push(dR[i]);
}}}return dT;
};
}var s,n;

if(document.documentElement.compareDocumentPosition){s=function(a,b){if(a===b){p=true;
return 0;
}
if(!a.compareDocumentPosition||!b.compareDocumentPosition){return a.compareDocumentPosition?-1:1;
}return a.compareDocumentPosition(b)&4?-1:1;
};
}else{s=function(a,b){var dY,dW,ea=[],eb=[],dV=a.parentNode,dX=b.parentNode,dU=dV;
if(a===b){p=true;
return 0;
}else if(dV===dX){return n(a,b);
}else if(!dV){return -1;
}else if(!dX){return 1;
}while(dU){ea.unshift(dU);
dU=dU.parentNode;
}dU=dX;

while(dU){eb.unshift(dU);
dU=dU.parentNode;
}dY=ea.length;
dW=eb.length;
for(var i=0;i<dY&&i<dW;i++){if(ea[i]!==eb[i]){return n(ea[i],eb[i]);
}}return i===dY?n(a,eb[i],-1):n(ea[i],b,1);
};
n=function(a,b,ec){if(a===b){return ec;
}var ed=a.nextSibling;

while(ed){if(ed===b){return -1;
}ed=ed.nextSibling;
}return 1;
};
}g.getText=function(ee){var eg="",ef;

for(var i=0;ee[i];i++){ef=ee[i];
if(ef.nodeType===3||ef.nodeType===4){eg+=ef.nodeValue;
}else if(ef.nodeType!==8){eg+=g.getText(ef.childNodes);
}}return eg;
};
(function(){var ej=document.createElement("div"),ei="script"+(new Date()).getTime(),eh=document.documentElement;
ej.innerHTML="<a name='"+ei+"'/>";
eh.insertBefore(ej,eh.firstChild);
if(document.getElementById(ei)){k.find.ID=function(ek,el,em){if(typeof el.getElementById!=="undefined"&&!em){var m=el.getElementById(ek[1]);
return m?m.id===ek[1]||typeof m.getAttributeNode!=="undefined"&&m.getAttributeNode("id").nodeValue===ek[1]?[m]:undefined:[];
}};
k.filter.ID=function(en,eo){var ep=typeof en.getAttributeNode!=="undefined"&&en.getAttributeNode("id");
return en.nodeType===1&&ep&&ep.nodeValue===eo;
};
}eh.removeChild(ej);
eh=ej=null;
})();
(function(){var eq=document.createElement("div");
eq.appendChild(document.createComment(""));
if(eq.getElementsByTagName("*").length>0){k.find.TAG=function(er,es){var eu=es.getElementsByTagName(er[1]);
if(er[1]==="*"){var et=[];

for(var i=0;eu[i];i++){if(eu[i].nodeType===1){et.push(eu[i]);
}}eu=et;
}return eu;
};
}eq.innerHTML="<a href='#'></a>";

if(eq.firstChild&&typeof eq.firstChild.getAttribute!=="undefined"&&eq.firstChild.getAttribute("href")!=="#"){k.attrHandle.href=function(ev){return ev.getAttribute("href",2);
};
}eq=null;
})();

if(document.querySelectorAll){(function(){var ex=g,ew=document.createElement("div"),ey="__sizzle__";
ew.innerHTML="<p class='TEST'></p>";
if(ew.querySelectorAll&&ew.querySelectorAll(".TEST").length===0){return;
}g=function(eA,eB,eC,eD){eB=eB||document;
eA=eA.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");
if(!eD&&!g.isXML(eB)){if(eB.nodeType===9){try{return f(eB.querySelectorAll(eA),eC);
}catch(eG){}}else if(eB.nodeType===1&&eB.nodeName.toLowerCase()!=="object"){var eE=eB.getAttribute("id"),eF=eE||ey;

if(!eE){eB.setAttribute("id",eF);
}
try{return f(eB.querySelectorAll("#"+eF+" "+eA),eC);
}catch(eH){}finally{if(!eE){eB.removeAttribute("id");
}}}}return ex(eA,eB,eC,eD);
};

for(var ez in ex){g[ez]=ex[ez];
}ew=null;
})();
}(function(){var eK=document.documentElement,eI=eK.matchesSelector||eK.mozMatchesSelector||eK.webkitMatchesSelector||eK.msMatchesSelector,eJ=false;

try{eI.call(document.documentElement,"[test!='']:sizzle");
}catch(eL){eJ=true;
}
if(eI){g.matchesSelector=function(eM,eN){eN=eN.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");

if(!g.isXML(eM)){try{if(eJ||!k.match.PSEUDO.test(eN)&&!/!=/.test(eN)){return eI.call(eM,eN);
}}catch(e){}}return g(eN,null,null,[eM]).length>0;
};
}})();
(function(){var eO=document.createElement("div");
eO.innerHTML="<div class='test e'></div><div class='test'></div>";
if(!eO.getElementsByClassName||eO.getElementsByClassName("e").length===0){return;
}eO.lastChild.className="e";

if(eO.getElementsByClassName("e").length===1){return;
}k.order.splice(1,0,"CLASS");
k.find.CLASS=function(eP,eQ,eR){if(typeof eQ.getElementsByClassName!=="undefined"&&!eR){return eQ.getElementsByClassName(eP[1]);
}};
eO=null;
})();
function y(eS,eT,eU,eV,eW,eX){for(var i=0,l=eV.length;i<l;i++){var fa=eV[i];

if(fa){var eY=false;
fa=fa[eS];

while(fa){if(fa.sizcache===eU){eY=eV[fa.sizset];
break;
}
if(fa.nodeType===1&&!eX){fa.sizcache=eU;
fa.sizset=i;
}
if(fa.nodeName.toLowerCase()===eT){eY=fa;
break;
}fa=fa[eS];
}eV[i]=eY;
}}}function w(fb,fc,fd,fe,ff,fg){for(var i=0,l=fe.length;i<l;i++){var fi=fe[i];

if(fi){var fh=false;
fi=fi[fb];

while(fi){if(fi.sizcache===fd){fh=fe[fi.sizset];
break;
}
if(fi.nodeType===1){if(!fg){fi.sizcache=fd;
fi.sizset=i;
}
if(typeof fc!=="string"){if(fi===fc){fh=true;
break;
}}else if(g.filter(fc,[fi]).length>0){fh=fi;
break;
}}fi=fi[fb];
}fe[i]=fh;
}}}
if(document.documentElement.contains){g.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):true);
};
}else if(document.documentElement.compareDocumentPosition){g.contains=function(a,b){return !!(a.compareDocumentPosition(b)&16);
};
}else{g.contains=function(){return false;
};
}g.isXML=function(fj){var fk=(fj?fj.ownerDocument||fj:0).documentElement;
return fk?fk.nodeName!=="HTML":false;
};
var h=function(fl,fm){var fq,fo=[],fn="",fp=fm.nodeType?[fm]:fm;
while((fq=k.match.PSEUDO.exec(fl))){fn+=fq[0];
fl=fl.replace(k.match.PSEUDO,"");
}fl=k.relative[fl]?fl+"*":fl;

for(var i=0,l=fp.length;i<l;i++){g(fl,fp[i],fo);
}return g.filter(fn,fo);
};
var t=qx.bom.Selector;
t.query=function(fr,fs){return g(fr,fs);
};
t.matches=function(ft,fu){return g(ft,null,null,fu);
};
})();
})();
(function(){var r="qx.client",q="MSXML2.DOMDocument.3.0",p="",o="mshtml",n='<\?xml version="1.0" encoding="utf-8"?>\n<',m="qx.xml.Document",k=" />",j="SelectionLanguage",h="'",g="MSXML2.XMLHTTP.3.0",c="MSXML2.XMLHTTP.6.0",f=" xmlns='",e="text/xml",b="XPath",a="MSXML2.DOMDocument.6.0",d="HTML";
qx.Class.define(m,{statics:{DOMDOC:null,XMLHTTP:null,isXmlDocument:function(s){if(s.nodeType===9){return s.documentElement.nodeName!==d;
}else if(s.ownerDocument){return this.isXmlDocument(s.ownerDocument);
}else{return false;
}},create:qx.core.Variant.select(r,{"mshtml":function(t,u){var v=new ActiveXObject(this.DOMDOC);
if(this.DOMDOC==q){v.setProperty(j,b);
}
if(u){var w=n;
w+=u;

if(t){w+=f+t+h;
}w+=k;
v.loadXML(w);
}return v;
},"default":function(x,y){return document.implementation.createDocument(x||p,y||p,null);
}}),fromString:qx.core.Variant.select(r,{"mshtml":function(z){var A=qx.xml.Document.create();
A.loadXML(z);
return A;
},"default":function(B){var C=new DOMParser();
return C.parseFromString(B,e);
}})},defer:function(D){if(qx.core.Variant.isSet(r,o)){var E=[a,q];
var F=[c,g];

for(var i=0,l=E.length;i<l;i++){try{new ActiveXObject(E[i]);
new ActiveXObject(F[i]);
}catch(G){continue;
}D.DOMDOC=E[i];
D.XMLHTTP=F[i];
break;
}}}});
})();
(function(){var k="visible",j="scroll",i="borderBottomWidth",h="borderTopWidth",g="left",f="borderLeftWidth",e="bottom",d="top",c="right",b="qx.bom.element.Scroll",a="borderRightWidth";
qx.Class.define(b,{statics:{intoViewX:function(l,stop,m){var parent=l.parentNode;
var r=qx.dom.Node.getDocument(l);
var n=r.body;
var z,x,u;
var B,s,C;
var v,D,G;
var E,p,y,o;
var t,F,w;
var q=m===g;
var A=m===c;
stop=stop?stop.parentNode:r;
while(parent&&parent!=stop){if(parent.scrollWidth>parent.clientWidth&&(parent===n||qx.bom.element.Overflow.getY(parent)!=k)){if(parent===n){x=parent.scrollLeft;
u=x+qx.bom.Viewport.getWidth();
B=qx.bom.Viewport.getWidth();
s=parent.clientWidth;
C=parent.scrollWidth;
v=0;
D=0;
G=0;
}else{z=qx.bom.element.Location.get(parent);
x=z.left;
u=z.right;
B=parent.offsetWidth;
s=parent.clientWidth;
C=parent.scrollWidth;
v=parseInt(qx.bom.element.Style.get(parent,f),10)||0;
D=parseInt(qx.bom.element.Style.get(parent,a),10)||0;
G=B-s-v-D;
}E=qx.bom.element.Location.get(l);
p=E.left;
y=E.right;
o=l.offsetWidth;
t=p-x-v;
F=y-u+D;
w=0;
if(q){w=t;
}else if(A){w=F+G;
}else if(t<0||o>s){w=t;
}else if(F>0){w=F+G;
}parent.scrollLeft+=w;
qx.event.Registration.fireNonBubblingEvent(parent,j);
}
if(parent===n){break;
}parent=parent.parentNode;
}},intoViewY:function(H,stop,I){var parent=H.parentNode;
var O=qx.dom.Node.getDocument(H);
var J=O.body;
var W,K,S;
var Y,V,Q;
var M,N,L;
var bb,bc,X,R;
var U,P,bd;
var ba=I===d;
var T=I===e;
stop=stop?stop.parentNode:O;
while(parent&&parent!=stop){if(parent.scrollHeight>parent.clientHeight&&(parent===J||qx.bom.element.Overflow.getY(parent)!=k)){if(parent===J){K=parent.scrollTop;
S=K+qx.bom.Viewport.getHeight();
Y=qx.bom.Viewport.getHeight();
V=parent.clientHeight;
Q=parent.scrollHeight;
M=0;
N=0;
L=0;
}else{W=qx.bom.element.Location.get(parent);
K=W.top;
S=W.bottom;
Y=parent.offsetHeight;
V=parent.clientHeight;
Q=parent.scrollHeight;
M=parseInt(qx.bom.element.Style.get(parent,h),10)||0;
N=parseInt(qx.bom.element.Style.get(parent,i),10)||0;
L=Y-V-M-N;
}bb=qx.bom.element.Location.get(H);
bc=bb.top;
X=bb.bottom;
R=H.offsetHeight;
U=bc-K-M;
P=X-S+N;
bd=0;
if(ba){bd=U;
}else if(T){bd=P+L;
}else if(U<0||R>V){bd=U;
}else if(P>0){bd=P+L;
}parent.scrollTop+=bd;
qx.event.Registration.fireNonBubblingEvent(parent,j);
}
if(parent===J){break;
}parent=parent.parentNode;
}},intoView:function(be,stop,bf,bg){this.intoViewX(be,stop,bf);
this.intoViewY(be,stop,bg);
}}});
})();
(function(){var b="qx.ui.core.queue.Widget",a="widget";
qx.Class.define(b,{statics:{__gH:[],remove:function(c){qx.lang.Array.remove(this.__gH,c);
},add:function(d){var e=this.__gH;

if(qx.lang.Array.contains(e,d)){return;
}e.unshift(d);
qx.ui.core.queue.Manager.scheduleFlush(a);
},flush:function(){var f=this.__gH;
var g;

for(var i=f.length-1;i>=0;i--){g=f[i];
f.splice(i,1);
g.syncWidget();
}if(f.length!=0){return;
}this.__gH=[];
}}});
})();
(function(){var b="qx.ui.core.queue.Visibility",a="visibility";
qx.Class.define(b,{statics:{__gI:[],__gJ:{},remove:function(c){delete this.__gJ[c.$$hash];
qx.lang.Array.remove(this.__gI,c);
},isVisible:function(d){return this.__gJ[d.$$hash]||false;
},__gK:function(e){var g=this.__gJ;
var f=e.$$hash;
var h;
if(e.isExcluded()){h=false;
}else{var parent=e.$$parent;

if(parent){h=this.__gK(parent);
}else{h=e.isRootWidget();
}}return g[f]=h;
},add:function(j){var k=this.__gI;

if(qx.lang.Array.contains(k,j)){return;
}k.unshift(j);
qx.ui.core.queue.Manager.scheduleFlush(a);
},flush:function(){var o=this.__gI;
var p=this.__gJ;
for(var i=o.length-1;i>=0;i--){var n=o[i].$$hash;

if(p[n]!=null){o[i].addChildrenToQueue(o);
}}var l={};

for(var i=o.length-1;i>=0;i--){var n=o[i].$$hash;
l[n]=p[n];
p[n]=null;
}for(var i=o.length-1;i>=0;i--){var m=o[i];
var n=m.$$hash;
o.splice(i,1);
if(p[n]==null){this.__gK(m);
}if(p[n]&&p[n]!=l[n]){m.checkAppearanceNeeds();
}}this.__gI=[];
}}});
})();
(function(){var b="appearance",a="qx.ui.core.queue.Appearance";
qx.Class.define(a,{statics:{__gL:[],remove:function(c){qx.lang.Array.remove(this.__gL,c);
},add:function(d){var e=this.__gL;

if(qx.lang.Array.contains(e,d)){return;
}e.unshift(d);
qx.ui.core.queue.Manager.scheduleFlush(b);
},has:function(f){return qx.lang.Array.contains(this.__gL,f);
},flush:function(){var j=qx.ui.core.queue.Visibility;
var g=this.__gL;
var h;

for(var i=g.length-1;i>=0;i--){h=g[i];
g.splice(i,1);
if(j.isVisible(h)){h.syncAppearance();
}else{h.$$stateChanges=true;
}}}}});
})();
(function(){var b="dispose",a="qx.ui.core.queue.Dispose";
qx.Class.define(a,{statics:{__gQ:[],add:function(c){var d=this.__gQ;

if(qx.lang.Array.contains(d,c)){return;
}d.unshift(c);
qx.ui.core.queue.Manager.scheduleFlush(b);
},flush:function(){var e=this.__gQ;

for(var i=e.length-1;i>=0;i--){var f=e[i];
e.splice(i,1);
f.dispose();
}if(e.length!=0){return;
}this.__gQ=[];
}}});
})();
(function(){var c="none",b="qx.html.Decorator",a="absolute";
qx.Class.define(b,{extend:qx.html.Element,construct:function(d,e){var f={position:a,top:0,left:0};

if(qx.bom.client.Feature.CSS_POINTER_EVENTS){f.pointerEvents=c;
}qx.html.Element.call(this,null,f);
this.__hJ=d;
this.__hK=e||d.toHashCode();
this.useMarkup(d.getMarkup());
},members:{__hK:null,__hJ:null,getId:function(){return this.__hK;
},getDecorator:function(){return this.__hJ;
},resize:function(g,h){this.__hJ.resize(this.getDomElement(),g,h);
},tint:function(i){this.__hJ.tint(this.getDomElement(),i);
},getInsets:function(){return this.__hJ.getInsets();
}},destruct:function(){this.__hJ=null;
}});
})();
(function(){var f="blur",e="focus",d="input",c="load",b="qx.ui.core.EventHandler",a="activate";
qx.Class.define(b,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(){qx.core.Object.call(this);
this.__hL=qx.event.Registration.getManager(window);
},statics:{PRIORITY:qx.event.Registration.PRIORITY_FIRST,SUPPORTED_TYPES:{mousemove:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,click:1,dblclick:1,contextmenu:1,mousewheel:1,keyup:1,keydown:1,keypress:1,keyinput:1,capture:1,losecapture:1,focusin:1,focusout:1,focus:1,blur:1,activate:1,deactivate:1,appear:1,disappear:1,dragstart:1,dragend:1,dragover:1,dragleave:1,drop:1,drag:1,dragchange:1,droprequest:1,touchstart:1,touchend:1,touchmove:1,touchcancel:1,tap:1,swipe:1},IGNORE_CAN_HANDLE:false},members:{__hL:null,__hM:{focusin:1,focusout:1,focus:1,blur:1},__hN:{mouseover:1,mouseout:1,appear:1,disappear:1},canHandleEvent:function(g,h){return g instanceof qx.ui.core.Widget;
},_dispatchEvent:function(j){var p=j.getTarget();
var o=qx.ui.core.Widget.getWidgetByElement(p);
var q=false;

while(o&&o.isAnonymous()){var q=true;
o=o.getLayoutParent();
}if(o&&q&&j.getType()==a){o.getContainerElement().activate();
}if(this.__hM[j.getType()]){o=o&&o.getFocusTarget();
if(!o){return;
}}if(j.getRelatedTarget){var x=j.getRelatedTarget();
var w=qx.ui.core.Widget.getWidgetByElement(x);

while(w&&w.isAnonymous()){w=w.getLayoutParent();
}
if(w){if(this.__hM[j.getType()]){w=w.getFocusTarget();
}if(w===o){return;
}}}var s=j.getCurrentTarget();
var u=qx.ui.core.Widget.getWidgetByElement(s);

if(!u||u.isAnonymous()){return;
}if(this.__hM[j.getType()]){u=u.getFocusTarget();
}var v=j.getType();

if(!u||!(u.isEnabled()||this.__hN[v])){return;
}var k=j.getEventPhase()==qx.event.type.Event.CAPTURING_PHASE;
var r=this.__hL.getListeners(u,v,k);

if(!r||r.length===0){return;
}var m=qx.event.Pool.getInstance().getObject(j.constructor);
j.clone(m);
m.setTarget(o);
m.setRelatedTarget(w||null);
m.setCurrentTarget(u);
var y=j.getOriginalTarget();

if(y){var n=qx.ui.core.Widget.getWidgetByElement(y);

while(n&&n.isAnonymous()){n=n.getLayoutParent();
}m.setOriginalTarget(n);
}else{m.setOriginalTarget(p);
}for(var i=0,l=r.length;i<l;i++){var t=r[i].context||u;
r[i].handler.call(t,m);
}if(m.getPropagationStopped()){j.stopPropagation();
}
if(m.getDefaultPrevented()){j.preventDefault();
}qx.event.Pool.getInstance().poolObject(m);
},registerEvent:function(z,A,B){var C;

if(A===e||A===f){C=z.getFocusElement();
}else if(A===c||A===d){C=z.getContentElement();
}else{C=z.getContainerElement();
}
if(C){C.addListener(A,this._dispatchEvent,this,B);
}},unregisterEvent:function(D,E,F){var G;

if(E===e||E===f){G=D.getFocusElement();
}else if(E===c||E===d){G=D.getContentElement();
}else{G=D.getContainerElement();
}
if(G){G.removeListener(E,this._dispatchEvent,this,F);
}}},destruct:function(){this.__hL=null;
},defer:function(H){qx.event.Registration.addHandler(H);
}});
})();
(function(){var c="abstract",b="qx.debug",a="qx.ui.layout.Abstract";
qx.Class.define(a,{type:c,extend:qx.core.Object,members:{__jJ:null,_invalidChildrenCache:null,__jK:null,invalidateLayoutCache:function(){this.__jJ=null;
},renderLayout:function(d,e){this.warn("Missing renderLayout() implementation!");
},getSizeHint:function(){if(this.__jJ){return this.__jJ;
}return this.__jJ=this._computeSizeHint();
},hasHeightForWidth:function(){return false;
},getHeightForWidth:function(f){this.warn("Missing getHeightForWidth() implementation!");
return null;
},_computeSizeHint:function(){return null;
},invalidateChildrenCache:function(){this._invalidChildrenCache=true;
},verifyLayoutProperty:qx.core.Variant.select(b,{"on":function(g,name,h){},"off":null}),_clearSeparators:function(){var i=this.__jK;

if(i instanceof qx.ui.core.LayoutItem){i.clearSeparators();
}},_renderSeparator:function(j,k){this.__jK.renderSeparator(j,k);
},connectToWidget:function(l){if(l&&this.__jK){throw new Error("It is not possible to manually set the connected widget.");
}this.__jK=l;
this.invalidateChildrenCache();
},_getWidget:function(){return this.__jK;
},_applyLayoutChange:function(){if(this.__jK){this.__jK.scheduleLayoutUpdate();
}},_getLayoutChildren:function(){return this.__jK.getLayoutChildren();
}},destruct:function(){this.__jK=this.__jJ=null;
}});
})();
(function(){var i="",h="/",g="mshtml",f="qx.client",e="//",d="?",c="string",b="qx.util.ResourceManager",a="singleton";
qx.Class.define(b,{extend:qx.core.Object,type:a,statics:{__hO:qx.$$resources||{},__hP:{}},members:{has:function(j){return !!this.self(arguments).__hO[j];
},getData:function(k){return this.self(arguments).__hO[k]||null;
},getImageWidth:function(l){var m=this.self(arguments).__hO[l];
return m?m[0]:null;
},getImageHeight:function(n){var o=this.self(arguments).__hO[n];
return o?o[1]:null;
},getImageFormat:function(p){var q=this.self(arguments).__hO[p];
return q?q[2]:null;
},isClippedImage:function(r){var s=this.self(arguments).__hO[r];
return s&&s.length>4;
},toUri:function(t){if(t==null){return t;
}var u=this.self(arguments).__hO[t];

if(!u){return t;
}
if(typeof u===c){var w=u;
}else{var w=u[3];
if(!w){return t;
}}var v=i;

if(qx.core.Variant.isSet(f,g)&&qx.bom.client.Feature.SSL){v=this.self(arguments).__hP[w];
}return v+qx.$$libraries[w].resourceUri+h+t;
}},defer:function(x){if(qx.core.Variant.isSet(f,g)){if(qx.bom.client.Feature.SSL){for(var B in qx.$$libraries){var z;

if(qx.$$libraries[B].resourceUri){z=qx.$$libraries[B].resourceUri;
}else{x.__hP[B]=i;
continue;
}if(z.match(/^\/\//)!=null){x.__hP[B]=window.location.protocol;
}else if(z.match(/^\//)!=null){x.__hP[B]=window.location.protocol+e+window.location.host;
}else if(z.match(/^\.\//)!=null){var y=document.URL;
x.__hP[B]=y.substring(0,y.lastIndexOf(h)+1);
}else if(z.match(/^http/)!=null){x.__hP[B]=i;
}else{var C=window.location.href.indexOf(d);
var A;

if(C==-1){A=window.location.href;
}else{A=window.location.href.substring(0,C);
}x.__hP[B]=A.substring(0,A.lastIndexOf(h)+1);
}}}}}});
})();
(function(){var c="qx.bom.client.Locale",b="-",a="";
qx.Class.define(c,{statics:{LOCALE:"",VARIANT:"",__hQ:function(){var d=(navigator.userLanguage||navigator.language).toLowerCase();
var f=a;
var e=d.indexOf(b);

if(e!=-1){f=d.substr(e+1);
d=d.substr(0,e);
}this.LOCALE=d;
this.VARIANT=f;
}},defer:function(g){g.__hQ();
}});
})();
(function(){var v="",u='indexOf',t='slice',s='concat',r='toLocaleLowerCase',q="qx.type.BaseString",p='match',o="qx.debug",n='search',m='replace',d='toLowerCase',k='charCodeAt',g='split',c='substring',b='lastIndexOf',f="on",e='substr',h='toLocaleUpperCase',a='toUpperCase',j='charAt';
qx.Class.define(q,{extend:Object,construct:function(w){var w=w||v;
this.__hR=w;
this.length=w.length;
},members:{$$isString:true,length:0,__hR:null,toString:function(){return this.__hR;
},charAt:null,valueOf:null,charCodeAt:null,concat:null,indexOf:null,lastIndexOf:null,match:null,replace:null,search:null,slice:null,split:null,substr:null,substring:null,toLowerCase:null,toUpperCase:null,toHashCode:function(){return qx.core.ObjectRegistry.toHashCode(this);
},toLocaleLowerCase:null,toLocaleUpperCase:null,base:function(x,y){return qx.core.Object.prototype.base.apply(this,arguments);
}},defer:function(z,A){if(qx.core.Variant.isSet(o,f)){qx.Class.include(z,qx.core.MAssert);
}var B=[j,k,s,u,b,p,m,n,t,g,e,c,d,a,r,h];
A.valueOf=A.toString;

if(new z(v).valueOf()==null){delete A.valueOf;
}
for(var i=0,l=B.length;i<l;i++){A[B[i]]=String.prototype[B[i]];
}}});
})();
(function(){var a="qx.locale.LocalizedString";
qx.Class.define(a,{extend:qx.type.BaseString,construct:function(b,c,d){qx.type.BaseString.call(this,b);
this.__hS=c;
this.__hT=d;
},members:{__hS:null,__hT:null,translate:function(){return qx.locale.Manager.getInstance().translate(this.__hS,this.__hT);
}}});
})();
(function(){var l="_",k="",j="on",h="_applyLocale",g="changeLocale",f="C",e="qx.dynlocale",d="qx.locale.Manager",c="String",b="singleton",a="qx.debug";
qx.Class.define(d,{type:b,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__hU=qx.$$translations||{};
this.__hV=qx.$$locales||{};
var o=qx.bom.client.Locale;
var m=o.LOCALE;
var n=o.VARIANT;

if(n!==k){m+=l+n;
}this.__hW=m;
this.setLocale(m||this.__hX);
},statics:{tr:function(p,q){var r=qx.lang.Array.fromArguments(arguments);
r.splice(0,1);
return qx.locale.Manager.getInstance().translate(p,r);
},trn:function(s,t,u,v){var w=qx.lang.Array.fromArguments(arguments);
w.splice(0,3);
if(u!=1){return qx.locale.Manager.getInstance().translate(t,w);
}else{return qx.locale.Manager.getInstance().translate(s,w);
}},trc:function(x,y,z){var A=qx.lang.Array.fromArguments(arguments);
A.splice(0,2);
return qx.locale.Manager.getInstance().translate(y,A);
},marktr:function(B){return B;
}},properties:{locale:{check:c,nullable:true,apply:h,event:g}},members:{__hX:f,__hY:null,__ia:null,__hU:null,__hV:null,__hW:null,getLanguage:function(){return this.__ia;
},getTerritory:function(){return this.getLocale().split(l)[1]||k;
},getAvailableLocales:function(){var D=[];

for(var C in this.__hV){if(C!=this.__hX){D.push(C);
}}return D;
},__ib:function(E){var G;
var F=E.indexOf(l);

if(F==-1){G=E;
}else{G=E.substring(0,F);
}return G;
},_applyLocale:function(H,I){if(qx.core.Variant.isSet(a,j)){if(!(H in this.__hV||H==this.__hW)){qx.log.Logger.warn("Locale: "+H+" not available.");
}}this.__hY=H;
this.__ia=this.__ib(H);
},addTranslation:function(J,K){var L=this.__hU;

if(L[J]){for(var M in K){L[J][M]=K[M];
}}else{L[J]=K;
}},addLocale:function(N,O){var P=this.__hV;

if(P[N]){for(var Q in O){P[N][Q]=O[Q];
}}else{P[N]=O;
}},translate:function(R,S,T){var U=this.__hU;
return this.__ic(U,R,S,T);
},localize:function(V,W,X){var Y=this.__hV;
return this.__ic(Y,V,W,X);
},__ic:function(ba,bb,bc,bd){var be;

if(!ba){return bb;
}
if(bd){var bg=this.__ib(bd);
}else{bd=this.__hY;
bg=this.__ia;
}if(!be&&ba[bd]){be=ba[bd][bb];
}if(!be&&ba[bg]){be=ba[bg][bb];
}if(!be&&ba[this.__hX]){be=ba[this.__hX][bb];
}
if(!be){be=bb;
}
if(bc.length>0){var bf=[];

for(var i=0;i<bc.length;i++){var bh=bc[i];

if(bh&&bh.translate){bf[i]=bh.translate();
}else{bf[i]=bh;
}}be=qx.lang.String.format(be,bf);
}
if(qx.core.Variant.isSet(e,j)){be=new qx.locale.LocalizedString(be,bb,bc);
}return be;
}},destruct:function(){this.__hU=this.__hV=null;
}});
})();
(function(){var k="px",j="qx.client",i="div",h="img",g="",f="no-repeat",d="qx.debug",c="scale-x",b="mshtml",a="on",I="repeat",H="scale",G="scale-y",F="qx/icon",E=".png",D="crop",C="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='",B='<div style="',A="repeat-y",z='<img src="',r="qx.bom.element.Decoration",s="', sizingMethod='",p="png",q="')",n='"></div>',o='"/>',l='" style="',m="none",t="webkit",u=" ",w="repeat-x",v="DXImageTransform.Microsoft.AlphaImageLoader",y="qx/static/blank.gif",x="absolute";
qx.Class.define(r,{statics:{DEBUG:false,__id:{},__ie:qx.core.Variant.isSet(j,b)&&qx.bom.client.Engine.VERSION<9,__if:qx.core.Variant.select(j,{"mshtml":{"scale-x":true,"scale-y":true,"scale":true,"no-repeat":true},"default":null}),__ig:{"scale-x":h,"scale-y":h,"scale":h,"repeat":i,"no-repeat":i,"repeat-x":i,"repeat-y":i},update:function(J,K,L,M){var O=this.getTagName(L,K);

if(O!=J.tagName.toLowerCase()){throw new Error("Image modification not possible because elements could not be replaced at runtime anymore!");
}var P=this.getAttributes(K,L,M);

if(O===h){J.src=P.src||qx.util.ResourceManager.getInstance().toUri(y);
}if(J.style.backgroundPosition!=g&&P.style.backgroundPosition===undefined){P.style.backgroundPosition=null;
}if(J.style.clip!=g&&P.style.clip===undefined){P.style.clip=null;
}var N=qx.bom.element.Style;
N.setStyles(J,P.style);
if(this.__ie){try{J.filters[v].apply();
}catch(e){}}},create:function(Q,R,S){var T=this.getTagName(R,Q);
var V=this.getAttributes(Q,R,S);
var U=qx.bom.element.Style.compile(V.style);

if(T===h){return z+V.src+l+U+o;
}else{return B+U+n;
}},getTagName:function(W,X){if(qx.core.Variant.isSet(j,b)){if(X&&this.__ie&&this.__if[W]&&qx.lang.String.endsWith(X,E)){return i;
}}return this.__ig[W];
},getAttributes:function(Y,ba,bb){if(!bb){bb={};
}
if(!bb.position){bb.position=x;
}
if(qx.core.Variant.isSet(j,b)){bb.fontSize=0;
bb.lineHeight=0;
}else if(qx.core.Variant.isSet(j,t)){bb.WebkitUserDrag=m;
}var bd=qx.util.ResourceManager.getInstance().getImageFormat(Y)||qx.io.ImageLoader.getFormat(Y);

if(qx.core.Variant.isSet(d,a)){if(Y!=null&&bd==null){qx.log.Logger.warn("ImageLoader: Not recognized format of external image '"+Y+"'!");
}}var bc;
if(this.__ie&&this.__if[ba]&&bd===p){bc=this.__ij(bb,ba,Y);
}else{if(ba===H){bc=this.__ik(bb,ba,Y);
}else if(ba===c||ba===G){bc=this.__il(bb,ba,Y);
}else{bc=this.__io(bb,ba,Y);
}}return bc;
},__ih:function(be,bf,bh){if(be.width==null&&bf!=null){be.width=bf+k;
}
if(be.height==null&&bh!=null){be.height=bh+k;
}return be;
},__ii:function(bi){var bj=qx.util.ResourceManager.getInstance().getImageWidth(bi)||qx.io.ImageLoader.getWidth(bi);
var bk=qx.util.ResourceManager.getInstance().getImageHeight(bi)||qx.io.ImageLoader.getHeight(bi);
return {width:bj,height:bk};
},__ij:function(bl,bm,bn){var bq=this.__ii(bn);
bl=this.__ih(bl,bq.width,bq.height);
var bp=bm==f?D:H;
var bo=C+qx.util.ResourceManager.getInstance().toUri(bn)+s+bp+q;
bl.filter=bo;
bl.backgroundImage=bl.backgroundRepeat=g;
return {style:bl};
},__ik:function(br,bs,bt){var bu=qx.util.ResourceManager.getInstance().toUri(bt);
var bv=this.__ii(bt);
br=this.__ih(br,bv.width,bv.height);
return {src:bu,style:br};
},__il:function(bw,bx,by){var bC=qx.util.ResourceManager.getInstance();
var bB=bC.isClippedImage(by);
var bD=this.__ii(by);

if(bB){var bA=bC.getData(by);
var bz=bC.toUri(bA[4]);

if(bx===c){bw=this.__im(bw,bA,bD.height);
}else{bw=this.__in(bw,bA,bD.width);
}return {src:bz,style:bw};
}else{if(qx.core.Variant.isSet(d,a)){this.__iq(by);
}
if(bx==c){bw.height=bD.height==null?null:bD.height+k;
}else if(bx==G){bw.width=bD.width==null?null:bD.width+k;
}var bz=bC.toUri(by);
return {src:bz,style:bw};
}},__im:function(bE,bF,bG){var bH=qx.util.ResourceManager.getInstance().getImageHeight(bF[4]);
bE.clip={top:-bF[6],height:bG};
bE.height=bH+k;
if(bE.top!=null){bE.top=(parseInt(bE.top,10)+bF[6])+k;
}else if(bE.bottom!=null){bE.bottom=(parseInt(bE.bottom,10)+bG-bH-bF[6])+k;
}return bE;
},__in:function(bI,bJ,bK){var bL=qx.util.ResourceManager.getInstance().getImageWidth(bJ[4]);
bI.clip={left:-bJ[5],width:bK};
bI.width=bL+k;
if(bI.left!=null){bI.left=(parseInt(bI.left,10)+bJ[5])+k;
}else if(bI.right!=null){bI.right=(parseInt(bI.right,10)+bK-bL-bJ[5])+k;
}return bI;
},__io:function(bM,bN,bO){var bT=qx.util.ResourceManager.getInstance().isClippedImage(bO);
var bS=this.__ii(bO);
if(bT&&bN!==I){var bR=qx.util.ResourceManager.getInstance().getData(bO);
var bQ=qx.bom.element.Background.getStyles(bR[4],bN,bR[5],bR[6]);

for(var bP in bQ){bM[bP]=bQ[bP];
}
if(bS.width!=null&&bM.width==null&&(bN==A||bN===f)){bM.width=bS.width+k;
}
if(bS.height!=null&&bM.height==null&&(bN==w||bN===f)){bM.height=bS.height+k;
}return {style:bM};
}else{if(qx.core.Variant.isSet(d,a)){if(bN!==I){this.__iq(bO);
}}bM=this.__ih(bM,bS.width,bS.height);
bM=this.__ip(bM,bO,bN);
return {style:bM};
}},__ip:function(bU,bV,bW){var top=null;
var cb=null;

if(bU.backgroundPosition){var bX=bU.backgroundPosition.split(u);
cb=parseInt(bX[0],10);

if(isNaN(cb)){cb=bX[0];
}top=parseInt(bX[1],10);

if(isNaN(top)){top=bX[1];
}}var ca=qx.bom.element.Background.getStyles(bV,bW,cb,top);

for(var bY in ca){bU[bY]=ca[bY];
}if(bU.filter){bU.filter=g;
}return bU;
},__iq:function(cc){if(this.DEBUG&&qx.util.ResourceManager.getInstance().has(cc)&&cc.indexOf(F)==-1){if(!this.__id[cc]){qx.log.Logger.debug("Potential clipped image candidate: "+cc);
this.__id[cc]=true;
}}},isAlphaImageLoaderEnabled:qx.core.Variant.select(j,{"mshtml":function(){return qx.bom.element.Decoration.__ie;
},"default":function(){return false;
}})}});
})();
(function(){var c="qx.client",b="load",a="qx.io.ImageLoader";
qx.Bootstrap.define(a,{statics:{__ir:{},__is:{width:null,height:null},__it:/\.(png|gif|jpg|jpeg|bmp)\b/i,isLoaded:function(d){var e=this.__ir[d];
return !!(e&&e.loaded);
},isFailed:function(f){var g=this.__ir[f];
return !!(g&&g.failed);
},isLoading:function(h){var j=this.__ir[h];
return !!(j&&j.loading);
},getFormat:function(k){var m=this.__ir[k];
return m?m.format:null;
},getSize:function(n){var o=this.__ir[n];
return o?
{width:o.width,height:o.height}:this.__is;
},getWidth:function(p){var q=this.__ir[p];
return q?q.width:null;
},getHeight:function(r){var s=this.__ir[r];
return s?s.height:null;
},load:function(t,u,v){var w=this.__ir[t];

if(!w){w=this.__ir[t]={};
}if(u&&!v){v=window;
}if(w.loaded||w.loading||w.failed){if(u){if(w.loading){w.callbacks.push(u,v);
}else{u.call(v,t,w);
}}}else{w.loading=true;
w.callbacks=[];

if(u){w.callbacks.push(u,v);
}var y=new Image();
var x=qx.lang.Function.listener(this.__iu,this,y,t);
y.onload=x;
y.onerror=x;
y.src=t;
w.element=y;
}},abort:function(z){var A=this.__ir[z];

if(A&&!A.loaded){A.aborted=true;
var C=A.callbacks;
var B=A.element;
B.onload=B.onerror=null;
delete A.callbacks;
delete A.element;
delete A.loading;

for(var i=0,l=C.length;i<l;i+=2){C[i].call(C[i+1],z,A);
}}this.__ir[z]=null;
},__iu:qx.event.GlobalError.observeMethod(function(event,D,E){var F=this.__ir[E];

if(!F){}if(event.type===b){F.loaded=true;
F.width=this.__iv(D);
F.height=this.__iw(D);
var G=this.__it.exec(E);

if(G!=null){F.format=G[1];
}}else{F.failed=true;
}D.onload=D.onerror=null;
var H=F.callbacks;
delete F.loading;
delete F.callbacks;
delete F.element;
for(var i=0,l=H.length;i<l;i+=2){H[i].call(H[i+1],E,F);
}}),__iv:qx.core.Variant.select(c,{"gecko":function(I){return I.naturalWidth;
},"default":function(J){return J.width;
}}),__iw:qx.core.Variant.select(c,{"gecko":function(K){return K.naturalHeight;
},"default":function(L){return L.height;
}})}});
})();
(function(){var m="number",l="0",k="px",j=";",i="background-image:url(",h=");",g="",f=")",e="background-repeat:",d=" ",a="qx.bom.element.Background",c="url(",b="background-position:";
qx.Class.define(a,{statics:{__ix:[i,null,h,b,null,j,e,null,j],__iy:{backgroundImage:null,backgroundPosition:null,backgroundRepeat:null},__iz:function(n,top){var o=qx.bom.client.Engine;

if(o.GECKO&&o.VERSION<1.9&&n==top&&typeof n==m){top+=0.01;
}
if(n){var p=(typeof n==m)?n+k:n;
}else{p=l;
}
if(top){var q=(typeof top==m)?top+k:top;
}else{q=l;
}return p+d+q;
},compile:function(r,s,t,top){var u=this.__iz(t,top);
var v=qx.util.ResourceManager.getInstance().toUri(r);
var w=this.__ix;
w[1]=v;
w[4]=u;
w[7]=s;
return w.join(g);
},getStyles:function(x,y,z,top){if(!x){return this.__iy;
}var A=this.__iz(z,top);
var B=qx.util.ResourceManager.getInstance().toUri(x);
var C={backgroundPosition:A,backgroundImage:c+B+f};

if(y!=null){C.backgroundRepeat=y;
}return C;
},set:function(D,E,F,G,top){var H=this.getStyles(E,F,G,top);

for(var I in H){D.style[I]=H[I];
}}}});
})();
(function(){var k="source",j="scale",i="no-repeat",h="qx.client",g="",f="mshtml",e="webkit",d="backgroundImage",c="div",b="qx.html.Image",a="qx/static/blank.gif";
qx.Class.define(b,{extend:qx.html.Element,members:{tagNameHint:null,_applyProperty:function(name,l){qx.html.Element.prototype._applyProperty.call(this,name,l);

if(name===k){var p=this.getDomElement();
var m=this.getAllStyles();

if(this.getNodeName()==c&&this.getStyle(d)){m.backgroundPosition=null;
m.backgroundRepeat=null;
}var n=this._getProperty(k);
var o=this._getProperty(j);
var q=o?j:i;
if(n!=null){n=n||null;
qx.bom.element.Decoration.update(p,n,q,m);
}}},_removeProperty:function(r,s){if(r==k){this._setProperty(r,g,s);
}else{this._setProperty(r,null,s);
}},_createDomElement:function(){var u=this._getProperty(j);
var v=u?j:i;

if(qx.core.Variant.isSet(h,f)){var t=this._getProperty(k);

if(this.tagNameHint!=null){this.setNodeName(this.tagNameHint);
}else{this.setNodeName(qx.bom.element.Decoration.getTagName(v,t));
}}else{this.setNodeName(qx.bom.element.Decoration.getTagName(v));
}return qx.html.Element.prototype._createDomElement.call(this);
},_copyData:function(w){return qx.html.Element.prototype._copyData.call(this,true);
},setSource:function(x){this._setProperty(k,x);
return this;
},getSource:function(){return this._getProperty(k);
},resetSource:function(){if(qx.core.Variant.isSet(h,e)){this._setProperty(k,qx.util.ResourceManager.getInstance().toUri(a));
}else{this._removeProperty(k,true);
}return this;
},setScale:function(y){this._setProperty(j,y);
return this;
},getScale:function(){return this._getProperty(j);
}}});
})();
(function(){var j="nonScaled",i="scaled",h="alphaScaled",g=".png",f="qx.client",e="div",d="replacement",c="qx.event.type.Event",b="hidden",a="Boolean",B="px",A="http",z="scale",y="changeSource",x="qx.ui.basic.Image",w="__iI",v="qx.debug",u="loaded",t="-disabled.$1",s="loadingFailed",q="String",r="_applySource",o="img",p="image",m="mshtml",n="_applyScale",k="no-repeat",l="on";
qx.Class.define(x,{extend:qx.ui.core.Widget,construct:function(C){this.__iI={};
qx.ui.core.Widget.call(this);

if(C){this.setSource(C);
}},properties:{source:{check:q,init:null,nullable:true,event:y,apply:r,themeable:true},scale:{check:a,init:false,themeable:true,apply:n},appearance:{refine:true,init:p},allowShrinkX:{refine:true,init:false},allowShrinkY:{refine:true,init:false},allowGrowX:{refine:true,init:false},allowGrowY:{refine:true,init:false}},events:{loadingFailed:c,loaded:c},members:{__iJ:null,__iK:null,__iL:null,__iI:null,getContentElement:function(){return this.__iP();
},_createContentElement:function(){return this.__iP();
},_getContentHint:function(){return {width:this.__iJ||0,height:this.__iK||0};
},_applyEnabled:function(D,E){qx.ui.core.Widget.prototype._applyEnabled.call(this,D,E);

if(this.getSource()){this._styleSource();
}},_applySource:function(F){this._styleSource();
},_applyScale:function(G){this._styleSource();
},__iM:function(H){this.__iL=H;
},__iN:function(){if(this.__iL==null){var J=this.getSource();
var I=false;

if(J!=null){I=qx.lang.String.endsWith(J,g);
}
if(this.getScale()&&I&&qx.bom.element.Decoration.isAlphaImageLoaderEnabled()){this.__iL=h;
}else if(this.getScale()){this.__iL=i;
}else{this.__iL=j;
}}return this.__iL;
},__iO:function(K){var L;
var M;

if(K==h){L=true;
M=e;
}else if(K==j){L=false;
M=e;
}else{L=true;
M=o;
}var N=new qx.html.Image(M);
N.setScale(L);
N.setStyles({"overflowX":b,"overflowY":b});
return N;
},__iP:function(){var O=this.__iN();

if(this.__iI[O]==null){this.__iI[O]=this.__iO(O);
}return this.__iI[O];
},_styleSource:function(){var P=qx.util.AliasManager.getInstance().resolve(this.getSource());

if(!P){this.getContentElement().resetSource();
return;
}this.__iQ(P);

if(qx.core.Variant.isSet(f,m)){var Q=this.getScale()?z:k;
this.getContentElement().tagNameHint=qx.bom.element.Decoration.getTagName(Q,P);
}if(qx.util.ResourceManager.getInstance().has(P)){this.__iS(this.getContentElement(),P);
}else if(qx.io.ImageLoader.isLoaded(P)){this.__iT(this.getContentElement(),P);
}else{this.__iU(this.getContentElement(),P);
}},__iQ:qx.core.Variant.select(f,{"mshtml":function(R){var T=qx.bom.element.Decoration.isAlphaImageLoaderEnabled();
var S=qx.lang.String.endsWith(R,g);

if(T&&S){if(this.getScale()&&this.__iN()!=h){this.__iM(h);
}else if(!this.getScale()&&this.__iN()!=j){this.__iM(j);
}}else{if(this.getScale()&&this.__iN()!=i){this.__iM(i);
}else if(!this.getScale()&&this.__iN()!=j){this.__iM(j);
}}this.__iR(this.__iP());
},"default":function(U){if(this.getScale()&&this.__iN()!=i){this.__iM(i);
}else if(!this.getScale()&&this.__iN(j)){this.__iM(j);
}this.__iR(this.__iP());
}}),__iR:function(V){var Y=this.getContainerElement();
var ba=Y.getChild(0);

if(ba!=V){if(ba!=null){var bc=B;
var W={};
var X=this.getInnerSize();

if(X!=null){W.width=X.width+bc;
W.height=X.height+bc;
}var bb=this.getInsets();
W.left=bb.left+bc;
W.top=bb.top+bc;
W.zIndex=10;
V.setStyles(W,true);
V.setSelectable(this.getSelectable());
}Y.removeAt(0);
Y.addAt(V,0);
}},__iS:function(bd,be){var bg=qx.util.ResourceManager.getInstance();
if(!this.getEnabled()){var bf=be.replace(/\.([a-z]+)$/,t);

if(bg.has(bf)){be=bf;
this.addState(d);
}else{this.removeState(d);
}}if(bd.getSource()===be){return;
}bd.setSource(be);
this.__iW(bg.getImageWidth(be),bg.getImageHeight(be));
},__iT:function(bh,bi){var bk=qx.io.ImageLoader;
bh.setSource(bi);
var bj=bk.getWidth(bi);
var bl=bk.getHeight(bi);
this.__iW(bj,bl);
},__iU:function(bm,bn){var bo=qx.io.ImageLoader;

if(qx.core.Variant.isSet(v,l)){if(!qx.lang.String.startsWith(bn.toLowerCase(),A)){var self=this.self(arguments);

if(!self.__DY){self.__DY={};
}
if(!self.__DY[bn]){this.debug("try to load an unmanaged relative image: "+bn);
self.__DY[bn]=true;
}}}if(!bo.isFailed(bn)){bo.load(bn,this.__iV,this);
}else{if(bm!=null){bm.resetSource();
}}},__iV:function(bp,bq){if(this.$$disposed===true){return;
}if(bp!==qx.util.AliasManager.getInstance().resolve(this.getSource())){return;
}if(bq.failed){this.warn("Image could not be loaded: "+bp);
this.fireEvent(s);
}else{this.fireEvent(u);
}this._styleSource();
},__iW:function(br,bs){if(br!==this.__iJ||bs!==this.__iK){this.__iJ=br;
this.__iK=bs;
qx.ui.core.queue.Layout.add(this);
}}},destruct:function(){this._disposeMap(w);
}});
})();
(function(){var g="dragdrop-cursor",f="_applyAction",e="alias",d="qx.ui.core.DragDropCursor",c="move",b="singleton",a="copy";
qx.Class.define(d,{extend:qx.ui.basic.Image,include:qx.ui.core.MPlacement,type:b,construct:function(){qx.ui.basic.Image.call(this);
this.setZIndex(1e8);
this.setDomMove(true);
var h=this.getApplicationRoot();
h.add(this,{left:-1000,top:-1000});
},properties:{appearance:{refine:true,init:g},action:{check:[e,a,c],apply:f,nullable:true}},members:{_applyAction:function(i,j){if(j){this.removeState(j);
}
if(i){this.addState(i);
}}}});
})();
(function(){var h="mousedown",g="qx.debug",f="on",d="blur",c="qx.ui.popup.Manager",b="__nJ",a="singleton";
qx.Class.define(c,{type:a,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__nJ=[];
qx.event.Registration.addListener(document.documentElement,h,this.__nL,this,true);
qx.bom.Element.addListener(window,d,this.hideAll,this);
},members:{__nJ:null,add:function(j){if(qx.core.Variant.isSet(g,f)){if(!(j instanceof qx.ui.popup.Popup)){throw new Error("Object is no popup: "+j);
}}this.__nJ.push(j);
this.__nK();
},remove:function(k){if(qx.core.Variant.isSet(g,f)){if(!(k instanceof qx.ui.popup.Popup)){throw new Error("Object is no popup: "+k);
}}
if(this.__nJ){qx.lang.Array.remove(this.__nJ,k);
this.__nK();
}},hideAll:function(){var m;
var n=this.__nJ;

if(n){for(var i=0,l=n.length;i<l;i++){var m=n[i];
m.getAutoHide()&&m.exclude();
}}},__nK:function(){var o=1e7;

for(var i=0;i<this.__nJ.length;i++){this.__nJ[i].setZIndex(o++);
}},__nL:function(e){var q=qx.ui.core.Widget.getWidgetByElement(e.getTarget());
var r=this.__nJ;

for(var i=0;i<r.length;i++){var p=r[i];

if(!p.getAutoHide()||q==p||qx.ui.core.Widget.contains(p,q)){continue;
}p.exclude();
}}},destruct:function(){qx.event.Registration.removeListener(document.documentElement,h,this.__nL,this,true);
this._disposeArray(b);
}});
})();
(function(){var d="' is not supported by the Grow layout!",c="qx.ui.layout.Grow",b="qx.debug",a="The property '";
qx.Class.define(c,{extend:qx.ui.layout.Abstract,members:{verifyLayoutProperty:qx.core.Variant.select(b,{"on":function(e,name,f){this.assert(false,a+name+d);
},"off":null}),renderLayout:function(g,h){var n=this._getLayoutChildren();
var m,o,k,j;
for(var i=0,l=n.length;i<l;i++){m=n[i];
o=m.getSizeHint();
k=g;

if(k<o.minWidth){k=o.minWidth;
}else if(k>o.maxWidth){k=o.maxWidth;
}j=h;

if(j<o.minHeight){j=o.minHeight;
}else if(j>o.maxHeight){j=o.maxHeight;
}m.renderLayout(0,0,k,j);
}},_computeSizeHint:function(){var v=this._getLayoutChildren();
var t,x;
var w=0,u=0;
var s=0,q=0;
var p=Infinity,r=Infinity;
for(var i=0,l=v.length;i<l;i++){t=v[i];
x=t.getSizeHint();
w=Math.max(w,x.width);
u=Math.max(u,x.height);
s=Math.max(s,x.minWidth);
q=Math.max(q,x.minHeight);
p=Math.min(p,x.maxWidth);
r=Math.min(r,x.maxHeight);
}return {width:w,height:u,minWidth:s,minHeight:q,maxWidth:p,maxHeight:r};
}}});
})();
(function(){var j="label",i="icon",h="Boolean",g="both",f="String",e="left",d="changeGap",c="changeShow",b="bottom",a="_applyCenter",A="changeIcon",z="qx.ui.basic.Atom",y="changeLabel",x="Integer",w="_applyIconPosition",v="qx.debug",u="bottom-left",t="top-left",s="top",r="right",p="_applyRich",q="_applyIcon",n="_applyShow",o="on",l="_applyLabel",m="_applyGap",k="atom";
qx.Class.define(z,{extend:qx.ui.core.Widget,construct:function(B,C){if(qx.core.Variant.isSet(v,o)){this.assertArgumentsCount(arguments,0,2);
}qx.ui.core.Widget.call(this);
this._setLayout(new qx.ui.layout.Atom());

if(B!=null){this.setLabel(B);
}
if(C!=null){this.setIcon(C);
}},properties:{appearance:{refine:true,init:k},label:{apply:l,nullable:true,check:f,event:y},rich:{check:h,init:false,apply:p},icon:{check:f,apply:q,nullable:true,themeable:true,event:A},gap:{check:x,nullable:false,event:d,apply:m,themeable:true,init:4},show:{init:g,check:[g,j,i],themeable:true,inheritable:true,apply:n,event:c},iconPosition:{init:e,check:[s,r,b,e,t,u],themeable:true,apply:w},center:{init:false,check:h,themeable:true,apply:a}},members:{_createChildControlImpl:function(D,E){var F;

switch(D){case j:F=new qx.ui.basic.Label(this.getLabel());
F.setAnonymous(true);
F.setRich(this.getRich());
this._add(F);

if(this.getLabel()==null||this.getShow()===i){F.exclude();
}break;
case i:F=new qx.ui.basic.Image(this.getIcon());
F.setAnonymous(true);
this._addAt(F,0);

if(this.getIcon()==null||this.getShow()===j){F.exclude();
}break;
}return F||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,D);
},_forwardStates:{focused:true,hovered:true},_handleLabel:function(){if(this.getLabel()==null||this.getShow()===i){this._excludeChildControl(j);
}else{this._showChildControl(j);
}},_handleIcon:function(){if(this.getIcon()==null||this.getShow()===j){this._excludeChildControl(i);
}else{this._showChildControl(i);
}},_applyLabel:function(G,H){var I=this.getChildControl(j,true);

if(I){I.setValue(G);
}this._handleLabel();
},_applyRich:function(J,K){var L=this.getChildControl(j,true);

if(L){L.setRich(J);
}},_applyIcon:function(M,N){var O=this.getChildControl(i,true);

if(O){O.setSource(M);
}this._handleIcon();
},_applyGap:function(P,Q){this._getLayout().setGap(P);
},_applyShow:function(R,S){this._handleLabel();
this._handleIcon();
},_applyIconPosition:function(T,U){this._getLayout().setIconPosition(T);
},_applyCenter:function(V,W){this._getLayout().setCenter(V);
},_applySelectable:function(X,Y){qx.ui.core.Widget.prototype._applySelectable.call(this,X,Y);
var ba=this.getChildControl(j,true);

if(ba){this.getChildControl(j).setSelectable(X);
}}}});
})();
(function(){var p="bottom",o="top",n="_applyLayoutChange",m="top-left",l="bottom-left",k="left",j="right",h="middle",g="' is not supported by the Atom layout!",f="qx.debug",c="center",e="qx.ui.layout.Atom",d="Integer",b="The property '",a="Boolean";
qx.Class.define(e,{extend:qx.ui.layout.Abstract,properties:{gap:{check:d,init:4,apply:n},iconPosition:{check:[k,o,j,p,m,l],init:k,apply:n},center:{check:a,init:false,apply:n}},members:{verifyLayoutProperty:qx.core.Variant.select(f,{"on":function(q,name,r){this.assert(false,b+name+g);
},"off":null}),renderLayout:function(s,t){var C=qx.ui.layout.Util;
var v=this.getIconPosition();
var y=this._getLayoutChildren();
var length=y.length;
var N,top,D,w;
var I,B;
var G=this.getGap();
var L=this.getCenter();
if(v===p||v===j){var E=length-1;
var z=-1;
var x=-1;
}else{var E=0;
var z=length;
var x=1;
}if(v==o||v==p){if(L){var H=0;

for(var i=E;i!=z;i+=x){w=y[i].getSizeHint().height;

if(w>0){H+=w;

if(i!=E){H+=G;
}}}top=Math.round((t-H)/2);
}else{top=0;
}
for(var i=E;i!=z;i+=x){I=y[i];
B=I.getSizeHint();
D=Math.min(B.maxWidth,Math.max(s,B.minWidth));
w=B.height;
N=C.computeHorizontalAlignOffset(c,D,s);
I.renderLayout(N,top,D,w);
if(w>0){top+=w+G;
}}}else{var A=s;
var u=null;
var K=0;

for(var i=E;i!=z;i+=x){I=y[i];
D=I.getSizeHint().width;

if(D>0){if(!u&&I instanceof qx.ui.basic.Label){u=I;
}else{A-=D;
}K++;
}}
if(K>1){var J=(K-1)*G;
A-=J;
}
if(u){var B=u.getSizeHint();
var F=Math.max(B.minWidth,Math.min(A,B.maxWidth));
A-=F;
}
if(L&&A>0){N=Math.round(A/2);
}else{N=0;
}
for(var i=E;i!=z;i+=x){I=y[i];
B=I.getSizeHint();
w=Math.min(B.maxHeight,Math.max(t,B.minHeight));

if(I===u){D=F;
}else{D=B.width;
}var M=h;

if(v==m){M=o;
}else if(v==l){M=p;
}top=C.computeVerticalAlignOffset(M,B.height,t);
I.renderLayout(N,top,D,w);
if(D>0){N+=D+G;
}}}},_computeSizeHint:function(){var Y=this._getLayoutChildren();
var length=Y.length;
var Q,W;
if(length===1){var Q=Y[0].getSizeHint();
W={width:Q.width,height:Q.height,minWidth:Q.minWidth,minHeight:Q.minHeight};
}else{var U=0,V=0;
var R=0,T=0;
var S=this.getIconPosition();
var X=this.getGap();

if(S===o||S===p){var O=0;

for(var i=0;i<length;i++){Q=Y[i].getSizeHint();
V=Math.max(V,Q.width);
U=Math.max(U,Q.minWidth);
if(Q.height>0){T+=Q.height;
R+=Q.minHeight;
O++;
}}
if(O>1){var P=(O-1)*X;
T+=P;
R+=P;
}}else{var O=0;

for(var i=0;i<length;i++){Q=Y[i].getSizeHint();
T=Math.max(T,Q.height);
R=Math.max(R,Q.minHeight);
if(Q.width>0){V+=Q.width;
U+=Q.minWidth;
O++;
}}
if(O>1){var P=(O-1)*X;
V+=P;
U+=P;
}}W={minWidth:U,width:V,minHeight:R,height:T};
}return W;
}}});
})();
(function(){var g="middle",f="qx.ui.layout.Util",e="left",d="center",c="top",b="bottom",a="right";
qx.Class.define(f,{statics:{PERCENT_VALUE:/[0-9]+(?:\.[0-9]+)?%/,computeFlexOffsets:function(h,j,k){var n,r,m,s;
var o=j>k;
var t=Math.abs(j-k);
var u,p;
var q={};

for(r in h){n=h[r];
q[r]={potential:o?n.max-n.value:n.value-n.min,flex:o?n.flex:1/n.flex,offset:0};
}while(t!=0){s=Infinity;
m=0;

for(r in q){n=q[r];

if(n.potential>0){m+=n.flex;
s=Math.min(s,n.potential/n.flex);
}}if(m==0){break;
}s=Math.min(t,s*m)/m;
u=0;

for(r in q){n=q[r];

if(n.potential>0){p=Math.min(t,n.potential,Math.ceil(s*n.flex));
u+=p-s*n.flex;

if(u>=1){u-=1;
p-=1;
}n.potential-=p;

if(o){n.offset+=p;
}else{n.offset-=p;
}t-=p;
}}}return q;
},computeHorizontalAlignOffset:function(v,w,x,y,z){if(y==null){y=0;
}
if(z==null){z=0;
}var A=0;

switch(v){case e:A=y;
break;
case a:A=x-w-z;
break;
case d:A=Math.round((x-w)/2);
if(A<y){A=y;
}else if(A<z){A=Math.max(y,x-w-z);
}break;
}return A;
},computeVerticalAlignOffset:function(B,C,D,E,F){if(E==null){E=0;
}
if(F==null){F=0;
}var G=0;

switch(B){case c:G=E;
break;
case b:G=D-C-F;
break;
case g:G=Math.round((D-C)/2);
if(G<E){G=E;
}else if(G<F){G=Math.max(E,D-C-F);
}break;
}return G;
},collapseMargins:function(H){var I=0,K=0;

for(var i=0,l=arguments.length;i<l;i++){var J=arguments[i];

if(J<0){K=Math.min(K,J);
}else if(J>0){I=Math.max(I,J);
}}return I+K;
},computeHorizontalGaps:function(L,M,N){if(M==null){M=0;
}var O=0;

if(N){O+=L[0].getMarginLeft();

for(var i=1,l=L.length;i<l;i+=1){O+=this.collapseMargins(M,L[i-1].getMarginRight(),L[i].getMarginLeft());
}O+=L[l-1].getMarginRight();
}else{for(var i=1,l=L.length;i<l;i+=1){O+=L[i].getMarginLeft()+L[i].getMarginRight();
}O+=(M*(l-1));
}return O;
},computeVerticalGaps:function(P,Q,R){if(Q==null){Q=0;
}var S=0;

if(R){S+=P[0].getMarginTop();

for(var i=1,l=P.length;i<l;i+=1){S+=this.collapseMargins(Q,P[i-1].getMarginBottom(),P[i].getMarginTop());
}S+=P[l-1].getMarginBottom();
}else{for(var i=1,l=P.length;i<l;i+=1){S+=P[i].getMarginTop()+P[i].getMarginBottom();
}S+=(Q*(l-1));
}return S;
},computeHorizontalSeparatorGaps:function(T,U,V){var Y=qx.theme.manager.Decoration.getInstance().resolve(V);
var X=Y.getInsets();
var W=X.left+X.right;
var ba=0;

for(var i=0,l=T.length;i<l;i++){var bb=T[i];
ba+=bb.getMarginLeft()+bb.getMarginRight();
}ba+=(U+W+U)*(l-1);
return ba;
},computeVerticalSeparatorGaps:function(bc,bd,be){var bh=qx.theme.manager.Decoration.getInstance().resolve(be);
var bg=bh.getInsets();
var bf=bg.top+bg.bottom;
var bi=0;

for(var i=0,l=bc.length;i<l;i++){var bj=bc[i];
bi+=bj.getMarginTop()+bj.getMarginBottom();
}bi+=(bd+bf+bd)*(l-1);
return bi;
},arrangeIdeals:function(bk,bl,bm,bn,bo,bp){if(bl<bk||bo<bn){if(bl<bk&&bo<bn){bl=bk;
bo=bn;
}else if(bl<bk){bo-=(bk-bl);
bl=bk;
if(bo<bn){bo=bn;
}}else if(bo<bn){bl-=(bn-bo);
bo=bn;
if(bl<bk){bl=bk;
}}}
if(bl>bm||bo>bp){if(bl>bm&&bo>bp){bl=bm;
bo=bp;
}else if(bl>bm){bo+=(bl-bm);
bl=bm;
if(bo>bp){bo=bp;
}}else if(bo>bp){bl+=(bo-bp);
bo=bp;
if(bl>bm){bl=bm;
}}}return {begin:bl,end:bo};
}}});
})();
(function(){var b="qx.event.type.Data",a="qx.ui.form.IStringForm";
qx.Interface.define(a,{events:{"changeValue":b},members:{setValue:function(c){return arguments.length==1;
},resetValue:function(){},getValue:function(){}}});
})();
(function(){var k="on",j="qx.dynlocale",i="Boolean",h="color",g="changeLocale",f="qx.debug",d="enabled",c="_applyTextAlign",b="qx.ui.core.Widget",a="nowrap",D="changeTextAlign",C="_applyWrap",B="changeValue",A="changeContent",z="qx.ui.basic.Label",y="A",x="whiteSpace",w="_applyValue",v="center",u="_applyBuddy",r="String",s="textAlign",p="right",q="changeRich",n="normal",o="_applyRich",l="click",m="label",t="left";
qx.Class.define(z,{extend:qx.ui.core.Widget,implement:[qx.ui.form.IStringForm],construct:function(E){qx.ui.core.Widget.call(this);

if(E!=null){this.setValue(E);
}
if(qx.core.Variant.isSet(j,k)){qx.locale.Manager.getInstance().addListener(g,this._onChangeLocale,this);
}},properties:{rich:{check:i,init:false,event:q,apply:o},wrap:{check:i,init:true,apply:C},value:{check:r,apply:w,event:B,nullable:true},buddy:{check:b,apply:u,nullable:true,init:null,dereference:true},textAlign:{check:[t,v,p],nullable:true,themeable:true,apply:c,event:D},appearance:{refine:true,init:m},selectable:{refine:true,init:false},allowGrowX:{refine:true,init:false},allowGrowY:{refine:true,init:false},allowShrinkY:{refine:true,init:false}},members:{__jL:null,__jM:null,__jN:null,__jO:null,_getContentHint:function(){if(this.__jM){this.__jP=this.__jQ();
delete this.__jM;
}return {width:this.__jP.width,height:this.__jP.height};
},_hasHeightForWidth:function(){return this.getRich()&&this.getWrap();
},_applySelectable:function(F){if(!qx.bom.client.Feature.CSS_TEXT_OVERFLOW&&qx.bom.client.Feature.XUL){if(F&&!this.isRich()){if(qx.core.Variant.isSet(f,k)){this.warn("Only rich labels are selectable in browsers with Gecko engine!");
}return;
}}qx.ui.core.Widget.prototype._applySelectable.call(this,F);
},_getContentHeightForWidth:function(G){if(!this.getRich()&&!this.getWrap()){return null;
}return this.__jQ(G).height;
},_createContentElement:function(){return new qx.html.Label;
},_applyTextAlign:function(H,I){this.getContentElement().setStyle(s,H);
},_applyTextColor:function(J,K){if(J){this.getContentElement().setStyle(h,qx.theme.manager.Color.getInstance().resolve(J));
}else{this.getContentElement().removeStyle(h);
}},__jP:{width:0,height:0},_applyFont:function(L,M){var N;

if(L){this.__jL=qx.theme.manager.Font.getInstance().resolve(L);
N=this.__jL.getStyles();
}else{this.__jL=null;
N=qx.bom.Font.getDefaultStyles();
}this.getContentElement().setStyles(N);
this.__jM=true;
qx.ui.core.queue.Layout.add(this);
},__jQ:function(O){var S=qx.bom.Label;
var Q=this.getFont();
var P=Q?this.__jL.getStyles():qx.bom.Font.getDefaultStyles();
var content=this.getValue()||y;
var R=this.getRich();
return R?S.getHtmlSize(content,P,O):S.getTextSize(content,P);
},_applyBuddy:function(T,U){if(U!=null){U.removeBinding(this.__jN);
this.__jN=null;
this.removeListenerById(this.__jO);
this.__jO=null;
}
if(T!=null){this.__jN=T.bind(d,this,d);
this.__jO=this.addListener(l,function(){if(T.isFocusable()){T.focus.apply(T);
}},this);
}},_applyRich:function(V){this.getContentElement().setRich(V);
this.__jM=true;
qx.ui.core.queue.Layout.add(this);
},_applyWrap:function(W,X){if(W&&!this.isRich()){if(qx.core.Variant.isSet(f,k)){this.warn("Only rich labels support wrap.");
}}
if(this.isRich()){var Y=W?n:a;
this.getContentElement().setStyle(x,Y);
}},_onChangeLocale:qx.core.Variant.select(j,{"on":function(e){var content=this.getValue();

if(content&&content.translate){this.setValue(content.translate());
}},"off":null}),_applyValue:function(ba,bb){this.getContentElement().setValue(ba);
this.__jM=true;
qx.ui.core.queue.Layout.add(this);
this.fireDataEvent(A,ba,bb);
}},destruct:function(){if(qx.core.Variant.isSet(j,k)){qx.locale.Manager.getInstance().removeListener(g,this._onChangeLocale,this);
}if(this.__jN!=null){var bc=this.getBuddy();

if(bc!=null&&!bc.isDisposed()){bc.removeBinding(this.__jN);
}}this.__jL=this.__jN=null;
}});
})();
(function(){var b="value",a="qx.html.Label";
qx.Class.define(a,{extend:qx.html.Element,members:{__jR:null,_applyProperty:function(name,c){qx.html.Element.prototype._applyProperty.call(this,name,c);

if(name==b){var d=this.getDomElement();
qx.bom.Label.setValue(d,c);
}},_createDomElement:function(){var f=this.__jR;
var e=qx.bom.Label.create(this._content,f);
return e;
},_copyData:function(g){return qx.html.Element.prototype._copyData.call(this,true);
},setRich:function(h){var i=this.getDomElement();

if(i){throw new Error("The label mode cannot be modified after initial creation");
}h=!!h;

if(this.__jR==h){return;
}this.__jR=h;
return this;
},setValue:function(j){this._setProperty(b,j);
return this;
},getValue:function(){return this._getProperty(b);
}}});
})();
(function(){var j="div",i="inherit",h="text",g="qx.client",f="value",e="",d="hidden",c="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",b="nowrap",a="auto",z="0",y="ellipsis",x="normal",w="label",v="px",u="crop",t="gecko",s="end",r="100%",q="visible",o="qx.bom.Label",p="opera",m="mshtml",n="block",k="-1000px",l="absolute";
qx.Class.define(o,{statics:{__jS:{fontFamily:1,fontSize:1,fontWeight:1,fontStyle:1,lineHeight:1},__jT:function(){var A=this.__jV(false);
document.body.insertBefore(A,document.body.firstChild);
return this._textElement=A;
},__jU:function(){var B=this.__jV(true);
document.body.insertBefore(B,document.body.firstChild);
return this._htmlElement=B;
},__jV:function(C){var D=qx.bom.Element.create(j);
var E=D.style;
E.width=E.height=a;
E.left=E.top=k;
E.visibility=d;
E.position=l;
E.overflow=q;

if(C){E.whiteSpace=x;
}else{E.whiteSpace=b;

if(!qx.bom.client.Feature.CSS_TEXT_OVERFLOW&&qx.bom.client.Feature.XUL){var F=document.createElementNS(c,w);
var E=F.style;
E.padding=z;

for(var G in this.__jS){E[G]=i;
}D.appendChild(F);
}}return D;
},__jW:function(H){var I={};

if(H){I.whiteSpace=x;
}else if(!qx.bom.client.Feature.CSS_TEXT_OVERFLOW&&qx.bom.client.Feature.XUL){I.display=n;
}else{I.overflow=d;
I.whiteSpace=b;
I.textOverflow=y;
if(qx.core.Variant.isSet(g,p)){I.OTextOverflow=y;
}}return I;
},create:function(content,J,K){if(!K){K=window;
}
if(J){var L=K.document.createElement(j);
L.useHtml=true;
}else if(!qx.bom.client.Feature.CSS_TEXT_OVERFLOW&&qx.bom.client.Feature.XUL){var L=K.document.createElement(j);
var N=K.document.createElementNS(c,w);
var M=N.style;
M.cursor=i;
M.color=i;
M.overflow=d;
M.maxWidth=r;
M.padding=z;
for(var O in this.__jS){N.style[O]=i;
}N.setAttribute(u,s);
L.appendChild(N);
}else{var L=K.document.createElement(j);
qx.bom.element.Style.setStyles(L,this.__jW(J));
}
if(content){this.setValue(L,content);
}return L;
},setValue:function(P,Q){Q=Q||e;

if(P.useHtml){P.innerHTML=Q;
}else if(!qx.bom.client.Feature.CSS_TEXT_OVERFLOW&&qx.bom.client.Feature.XUL){P.firstChild.setAttribute(f,Q);
}else{qx.bom.element.Attribute.set(P,h,Q);
}},getValue:function(R){if(R.useHtml){return R.innerHTML;
}else if(!qx.bom.client.Feature.CSS_TEXT_OVERFLOW&&qx.bom.client.Feature.XUL){return R.firstChild.getAttribute(f)||e;
}else{return qx.bom.element.Attribute.get(R,h);
}},getHtmlSize:function(content,S,T){var U=this._htmlElement||this.__jU();
U.style.width=T!==undefined?T+v:a;
U.innerHTML=content;
return this.__jX(U,S);
},getTextSize:function(V,W){var X=this._textElement||this.__jT();

if(!qx.bom.client.Feature.CSS_TEXT_OVERFLOW&&qx.bom.client.Feature.XUL){X.firstChild.setAttribute(f,V);
}else{qx.bom.element.Attribute.set(X,h,V);
}return this.__jX(X,W);
},__jX:function(Y,ba){var bb=this.__jS;

if(!ba){ba={};
}
for(var bc in bb){Y.style[bc]=ba[bc]||e;
}var bd=qx.bom.element.Dimension.getSize(Y);

if(qx.core.Variant.isSet(g,t)){if(!qx.bom.client.Platform.WIN){bd.width++;
}}if(qx.core.Variant.isSet(g,m)&&qx.bom.client.Engine.VERSION>=9){bd.width++;
}return bd;
}}});
})();
(function(){var i="0px",h="qx.client",g="mshtml",f="qx.bom.element.Dimension",e="paddingRight",d="paddingLeft",c="opera",b="paddingTop",a="paddingBottom";
qx.Class.define(f,{statics:{getWidth:qx.core.Variant.select(h,{"gecko":function(j){if(j.getBoundingClientRect){var k=j.getBoundingClientRect();
return Math.round(k.right)-Math.round(k.left);
}else{return j.offsetWidth;
}},"default":function(l){return l.offsetWidth;
}}),getHeight:qx.core.Variant.select(h,{"gecko":function(m){if(m.getBoundingClientRect){var n=m.getBoundingClientRect();
return Math.round(n.bottom)-Math.round(n.top);
}else{return m.offsetHeight;
}},"default":function(o){return o.offsetHeight;
}}),getSize:function(p){return {width:this.getWidth(p),height:this.getHeight(p)};
},__jY:{visible:true,hidden:true},getContentWidth:function(q){var s=qx.bom.element.Style;
var t=qx.bom.element.Overflow.getX(q);
var u=parseInt(s.get(q,d)||i,10);
var x=parseInt(s.get(q,e)||i,10);

if(this.__jY[t]){var w=q.clientWidth;

if(qx.core.Variant.isSet(h,c)){w=w-u-x;
}else{if(qx.dom.Node.isBlockNode(q)){w=w-u-x;
}}return w;
}else{if(q.clientWidth>=q.scrollWidth){return Math.max(q.clientWidth,q.scrollWidth)-u-x;
}else{var v=q.scrollWidth-u;
var r=qx.bom.client.Engine;

if(r.NAME===g&&r.VERSION==6){v-=x;
}return v;
}}},getContentHeight:function(y){var A=qx.bom.element.Style;
var C=qx.bom.element.Overflow.getY(y);
var D=parseInt(A.get(y,b)||i,10);
var B=parseInt(A.get(y,a)||i,10);

if(this.__jY[C]){return y.clientHeight-D-B;
}else{if(y.clientHeight>=y.scrollHeight){return Math.max(y.clientHeight,y.scrollHeight)-D-B;
}else{var E=y.scrollHeight-D;
var z=qx.bom.client.Engine;

if(z.NAME===g&&z.VERSION==6){E-=B;
}return E;
}}},getContentSize:function(F){return {width:this.getContentWidth(F),height:this.getContentHeight(F)};
}}});
})();
(function(){var b="qx.event.type.Data",a="qx.ui.form.IForm";
qx.Interface.define(a,{events:{"changeEnabled":b,"changeValid":b,"changeInvalidMessage":b,"changeRequired":b},members:{setEnabled:function(c){return arguments.length==1;
},getEnabled:function(){},setRequired:function(d){return arguments.length==1;
},getRequired:function(){},setValid:function(e){return arguments.length==1;
},getValid:function(){},setInvalidMessage:function(f){return arguments.length==1;
},getInvalidMessage:function(){},setRequiredInvalidMessage:function(g){return arguments.length==1;
},getRequiredInvalidMessage:function(){}}});
})();
(function(){var i="qx.ui.window.Window",h="changeModal",g="changeVisibility",f="changeActive",d="_applyActiveWindow",c="__pk",b="__pj",a="qx.ui.window.MDesktop";
qx.Mixin.define(a,{properties:{activeWindow:{check:i,apply:d,init:null,nullable:true}},members:{__pj:null,__pk:null,getWindowManager:function(){if(!this.__pk){this.setWindowManager(new qx.ui.window.Window.DEFAULT_MANAGER_CLASS());
}return this.__pk;
},supportsMaximize:function(){return true;
},setWindowManager:function(j){if(this.__pk){this.__pk.setDesktop(null);
}j.setDesktop(this);
this.__pk=j;
},_onChangeActive:function(e){if(e.getData()){this.setActiveWindow(e.getTarget());
}else if(this.getActiveWindow()==e.getTarget()){this.setActiveWindow(null);
}},_applyActiveWindow:function(k,l){this.getWindowManager().changeActiveWindow(k,l);
this.getWindowManager().updateStack();
},_onChangeModal:function(e){this.getWindowManager().updateStack();
},_onChangeVisibility:function(){this.getWindowManager().updateStack();
},_afterAddChild:function(m){if(qx.Class.isDefined(i)&&m instanceof qx.ui.window.Window){this._addWindow(m);
}},_addWindow:function(n){if(!qx.lang.Array.contains(this.getWindows(),n)){this.getWindows().push(n);
n.addListener(f,this._onChangeActive,this);
n.addListener(h,this._onChangeModal,this);
n.addListener(g,this._onChangeVisibility,this);
}
if(n.getActive()){this.setActiveWindow(n);
}this.getWindowManager().updateStack();
},_afterRemoveChild:function(o){if(qx.Class.isDefined(i)&&o instanceof qx.ui.window.Window){this._removeWindow(o);
}},_removeWindow:function(p){qx.lang.Array.remove(this.getWindows(),p);
p.removeListener(f,this._onChangeActive,this);
p.removeListener(h,this._onChangeModal,this);
p.removeListener(g,this._onChangeVisibility,this);
this.getWindowManager().updateStack();
},getWindows:function(){if(!this.__pj){this.__pj=[];
}return this.__pj;
}},destruct:function(){this._disposeArray(b);
this._disposeObjects(c);
}});
})();
(function(){var f="__pl",e="_applyBlockerColor",d="Number",c="qx.ui.core.MBlocker",b="_applyBlockerOpacity",a="Color";
qx.Mixin.define(c,{construct:function(){this.__pl=new qx.ui.core.Blocker(this);
},properties:{blockerColor:{check:a,init:null,nullable:true,apply:e,themeable:true},blockerOpacity:{check:d,init:1,apply:b,themeable:true}},members:{__pl:null,_applyBlockerColor:function(g,h){this.__pl.setColor(g);
},_applyBlockerOpacity:function(i,j){this.__pl.setOpacity(i);
},block:function(){this.__pl.block();
},isBlocked:function(){return this.__pl.isBlocked();
},unblock:function(){this.__pl.unblock();
},forceUnblock:function(){this.__pl.forceUnblock();
},blockContent:function(k){this.__pl.blockContent(k);
},isContentBlocked:function(){return this.__pl.isContentBlocked();
},unblockContent:function(){this.__pl.unblockContent();
},forceUnblockContent:function(){this.__pl.forceUnblockContent();
},getBlocker:function(){return this.__pl;
}},destruct:function(){this._disposeObjects(f);
}});
})();
(function(){var t="help",s="contextmenu",r="qx.client",q="changeGlobalCursor",p="keypress",o="Boolean",n="root",m="",l=" !important",k="input",d="_applyGlobalCursor",j="Space",h="_applyNativeHelp",c=";",b="qx.ui.root.Abstract",g="abstract",f="textarea",i="String",a="*";
qx.Class.define(b,{type:g,extend:qx.ui.core.Widget,include:[qx.ui.core.MChildrenHandling,qx.ui.core.MBlocker,qx.ui.window.MDesktop],construct:function(){qx.ui.core.Widget.call(this);
qx.ui.core.FocusHandler.getInstance().addRoot(this);
qx.ui.core.queue.Visibility.add(this);
this.initNativeHelp();
this.addListener(p,this.__pn,this);
},properties:{appearance:{refine:true,init:n},enabled:{refine:true,init:true},focusable:{refine:true,init:true},globalCursor:{check:i,nullable:true,themeable:true,apply:d,event:q},nativeContextMenu:{refine:true,init:false},nativeHelp:{check:o,init:false,apply:h}},members:{__pm:null,isRootWidget:function(){return true;
},getLayout:function(){return this._getLayout();
},_applyGlobalCursor:qx.core.Variant.select(r,{"mshtml":function(u,v){},"default":function(w,x){var y=qx.bom.Stylesheet;
var z=this.__pm;

if(!z){this.__pm=z=y.createElement();
}y.removeAllRules(z);

if(w){y.addRule(z,a,qx.bom.element.Cursor.compile(w).replace(c,m)+l);
}}}),_applyNativeContextMenu:function(A,B){if(A){this.removeListener(s,this._onNativeContextMenu,this,true);
}else{this.addListener(s,this._onNativeContextMenu,this,true);
}},_onNativeContextMenu:function(e){if(e.getTarget().getNativeContextMenu()){return;
}e.preventDefault();
},__pn:function(e){if(e.getKeyIdentifier()!==j){return;
}var D=e.getTarget();
var C=qx.ui.core.FocusHandler.getInstance();

if(!C.isFocused(D)){return;
}var E=D.getContentElement().getNodeName();

if(E===k||E===f){return;
}e.preventDefault();
},_applyNativeHelp:qx.core.Variant.select(r,{"mshtml":function(F,G){if(G===false){qx.bom.Event.removeNativeListener(document,t,qx.lang.Function.returnFalse);
}
if(F===false){qx.bom.Event.addNativeListener(document,t,qx.lang.Function.returnFalse);
}},"default":function(){}})},destruct:function(){this.__pm=null;
},defer:function(H,I){qx.ui.core.MChildrenHandling.remap(I);
}});
})();
(function(){var n="resize",m="position",l="0px",k="webkit",j="paddingLeft",i="$$widget",h="qx.ui.root.Application",g="hidden",f="qx.client",d="div",a="paddingTop",c="100%",b="absolute";
qx.Class.define(h,{extend:qx.ui.root.Abstract,construct:function(o){this.__po=qx.dom.Node.getWindow(o);
this.__pp=o;
qx.ui.root.Abstract.call(this);
qx.event.Registration.addListener(this.__po,n,this._onResize,this);
this._setLayout(new qx.ui.layout.Canvas());
qx.ui.core.queue.Layout.add(this);
qx.ui.core.FocusHandler.getInstance().connectTo(this);
this.getContentElement().disableScrolling();
},members:{__po:null,__pp:null,_createContainerElement:function(){var p=this.__pp;
if(qx.core.Variant.isSet(f,k)){if(!p.body){alert("The application could not be started due to a missing body tag in the HTML file!");
}}var t=p.documentElement.style;
var q=p.body.style;
t.overflow=q.overflow=g;
t.padding=t.margin=q.padding=q.margin=l;
t.width=t.height=q.width=q.height=c;
var s=p.createElement(d);
p.body.appendChild(s);
var r=new qx.html.Root(s);
r.setStyle(m,b);
r.setAttribute(i,this.toHashCode());
return r;
},_onResize:function(e){qx.ui.core.queue.Layout.add(this);
},_computeSizeHint:function(){var u=qx.bom.Viewport.getWidth(this.__po);
var v=qx.bom.Viewport.getHeight(this.__po);
return {minWidth:u,width:u,maxWidth:u,minHeight:v,height:v,maxHeight:v};
},_applyPadding:function(w,x,name){if(w&&(name==a||name==j)){throw new Error("The root widget does not support 'left', or 'top' paddings!");
}qx.ui.root.Abstract.prototype._applyPadding.call(this,w,x,name);
},_applyDecorator:function(y,z){qx.ui.root.Abstract.prototype._applyDecorator.call(this,y,z);

if(!y){return;
}var A=this.getDecoratorElement().getInsets();

if(A.left||A.top){throw new Error("The root widget does not support decorators with 'left', or 'top' insets!");
}}},destruct:function(){this.__po=this.__pp=null;
}});
})();
(function(){var l="zIndex",k="px",j="keydown",h="deactivate",g="resize",f="keyup",d="keypress",c="backgroundColor",b="_applyOpacity",a="Boolean",x="__oV",w="__pa",v="opacity",u="__oX",t="interval",s="Tab",r="Color",q="qx.ui.root.Page",p="Number",o="qx.ui.core.Blocker",m="qx.ui.root.Application",n="_applyColor";
qx.Class.define(o,{extend:qx.core.Object,construct:function(y){qx.core.Object.call(this);
this._widget=y;
this._isPageRoot=(qx.Class.isDefined(q)&&y instanceof qx.ui.root.Page);

if(this._isPageRoot){y.addListener(g,this.__pb,this);
}
if(qx.Class.isDefined(m)&&y instanceof qx.ui.root.Application){this.setKeepBlockerActive(true);
}this.__oS=[];
this.__oT=[];
this.__oU=[];
},properties:{color:{check:r,init:null,nullable:true,apply:n,themeable:true},opacity:{check:p,init:1,apply:b,themeable:true},keepBlockerActive:{check:a,init:false}},members:{__oV:null,__oW:0,__oX:null,__oU:null,__oS:null,__oT:null,__oY:null,__pa:null,_isPageRoot:false,_widget:null,__pb:function(e){var z=e.getData();

if(this.isContentBlocked()){this.getContentBlockerElement().setStyles({width:z.width,height:z.height});
}
if(this.isBlocked()){this.getBlockerElement().setStyles({width:z.width,height:z.height});
}},_applyColor:function(A,B){var C=qx.theme.manager.Color.getInstance().resolve(A);
this.__pc(c,C);
},_applyOpacity:function(D,E){this.__pc(v,D);
},__pc:function(F,G){var H=[];
this.__oV&&H.push(this.__oV);
this.__oX&&H.push(this.__oX);

for(var i=0;i<H.length;i++){H[i].setStyle(F,G);
}},_backupActiveWidget:function(){var I=qx.event.Registration.getManager(window).getHandler(qx.event.handler.Focus);
this.__oS.push(I.getActive());
this.__oT.push(I.getFocus());

if(this._widget.isFocusable()){this._widget.focus();
}},_restoreActiveWidget:function(){var L=this.__oS.length;

if(L>0){var K=this.__oS[L-1];

if(K){qx.bom.Element.activate(K);
}this.__oS.pop();
}var J=this.__oT.length;

if(J>0){var K=this.__oT[J-1];

if(K){qx.bom.Element.focus(this.__oT[J-1]);
}this.__oT.pop();
}},__pd:function(){return new qx.html.Blocker(this.getColor(),this.getOpacity());
},getBlockerElement:function(){if(!this.__oV){this.__oV=this.__pd();
this.__oV.setStyle(l,15);
this._widget.getContainerElement().add(this.__oV);
this.__oV.exclude();
}return this.__oV;
},block:function(){this.__oW++;

if(this.__oW<2){this._backupActiveWidget();
var M=this.getBlockerElement();
M.include();
M.activate();
M.addListener(h,this.__pi,this);
M.addListener(d,this.__ph,this);
M.addListener(j,this.__ph,this);
M.addListener(f,this.__ph,this);
}},isBlocked:function(){return this.__oW>0;
},unblock:function(){if(!this.isBlocked()){return;
}this.__oW--;

if(this.__oW<1){this.__pe();
this.__oW=0;
}},forceUnblock:function(){if(!this.isBlocked()){return;
}this.__oW=0;
this.__pe();
},__pe:function(){this._restoreActiveWidget();
var N=this.getBlockerElement();
N.removeListener(h,this.__pi,this);
N.removeListener(d,this.__ph,this);
N.removeListener(j,this.__ph,this);
N.removeListener(f,this.__ph,this);
N.exclude();
},getContentBlockerElement:function(){if(!this.__oX){this.__oX=this.__pd();
this._widget.getContentElement().add(this.__oX);
this.__oX.exclude();
}return this.__oX;
},blockContent:function(O){var P=this.getContentBlockerElement();
P.setStyle(l,O);
this.__oU.push(O);

if(this.__oU.length<2){P.include();

if(this._isPageRoot){if(!this.__pa){this.__pa=new qx.event.Timer(300);
this.__pa.addListener(t,this.__pg,this);
}this.__pa.start();
this.__pg();
}}},isContentBlocked:function(){return this.__oU.length>0;
},unblockContent:function(){if(!this.isContentBlocked()){return;
}this.__oU.pop();
var Q=this.__oU[this.__oU.length-1];
var R=this.getContentBlockerElement();
R.setStyle(l,Q);

if(this.__oU.length<1){this.__pf();
this.__oU=[];
}},forceUnblockContent:function(){if(!this.isContentBlocked()){return;
}this.__oU=[];
var S=this.getContentBlockerElement();
S.setStyle(l,null);
this.__pf();
},__pf:function(){this.getContentBlockerElement().exclude();

if(this._isPageRoot){this.__pa.stop();
}},__pg:function(){var T=this._widget.getContainerElement().getDomElement();
var U=qx.dom.Node.getDocument(T);
this.getContentBlockerElement().setStyles({height:U.documentElement.scrollHeight+k,width:U.documentElement.scrollWidth+k});
},__ph:function(e){if(e.getKeyIdentifier()==s){e.stop();
}},__pi:function(){if(this.getKeepBlockerActive()){this.getBlockerElement().activate();
}}},destruct:function(){if(this._isPageRoot){this._widget.removeListener(g,this.__pb,this);
}this._disposeObjects(u,x,w);
this.__oY=this.__oS=this.__oT=this._widget=this.__oU=null;
}});
})();
(function(){var k="cursor",j="100%",i="repeat",h="mousedown",g="url(",f=")",d="mouseout",c="qx.client",b="div",a="dblclick",w="mousewheel",v="qx.html.Blocker",u="mousemove",t="mouseover",s="appear",r="click",q="mshtml",p="mouseup",o="contextmenu",n="disappear",l="qx/static/blank.gif",m="absolute";
qx.Class.define(v,{extend:qx.html.Element,construct:function(x,y){var x=x?qx.theme.manager.Color.getInstance().resolve(x):null;
var z={position:m,width:j,height:j,opacity:y||0,backgroundColor:x};
if(qx.core.Variant.isSet(c,q)){z.backgroundImage=g+qx.util.ResourceManager.getInstance().toUri(l)+f;
z.backgroundRepeat=i;
}qx.html.Element.call(this,b,z);
this.addListener(h,this._stopPropagation,this);
this.addListener(p,this._stopPropagation,this);
this.addListener(r,this._stopPropagation,this);
this.addListener(a,this._stopPropagation,this);
this.addListener(u,this._stopPropagation,this);
this.addListener(t,this._stopPropagation,this);
this.addListener(d,this._stopPropagation,this);
this.addListener(w,this._stopPropagation,this);
this.addListener(o,this._stopPropagation,this);
this.addListener(s,this.__pF,this);
this.addListener(n,this.__pF,this);
},members:{_stopPropagation:function(e){e.stopPropagation();
},__pF:function(){var A=this.getStyle(k);
this.setStyle(k,null,true);
this.setStyle(k,A,true);
}}});
})();
(function(){var k="keypress",j="focusout",h="activate",g="Tab",f="singleton",d="deactivate",c="__pq",b="focusin",a="qx.ui.core.FocusHandler";
qx.Class.define(a,{extend:qx.core.Object,type:f,construct:function(){qx.core.Object.call(this);
this.__pq={};
},members:{__pq:null,__pr:null,__ps:null,__pt:null,connectTo:function(m){m.addListener(k,this.__pu,this);
m.addListener(b,this._onFocusIn,this,true);
m.addListener(j,this._onFocusOut,this,true);
m.addListener(h,this._onActivate,this,true);
m.addListener(d,this._onDeactivate,this,true);
},addRoot:function(n){this.__pq[n.$$hash]=n;
},removeRoot:function(o){delete this.__pq[o.$$hash];
},getActiveWidget:function(){return this.__pr;
},isActive:function(p){return this.__pr==p;
},getFocusedWidget:function(){return this.__ps;
},isFocused:function(q){return this.__ps==q;
},isFocusRoot:function(r){return !!this.__pq[r.$$hash];
},_onActivate:function(e){var t=e.getTarget();
this.__pr=t;
var s=this.__pv(t);

if(s!=this.__pt){this.__pt=s;
}},_onDeactivate:function(e){var u=e.getTarget();

if(this.__pr==u){this.__pr=null;
}},_onFocusIn:function(e){var v=e.getTarget();

if(v!=this.__ps){this.__ps=v;
v.visualizeFocus();
}},_onFocusOut:function(e){var w=e.getTarget();

if(w==this.__ps){this.__ps=null;
w.visualizeBlur();
}},__pu:function(e){if(e.getKeyIdentifier()!=g){return;
}
if(!this.__pt){return;
}e.stopPropagation();
e.preventDefault();
var x=this.__ps;

if(!e.isShiftPressed()){var y=x?this.__pz(x):this.__px();
}else{var y=x?this.__pA(x):this.__py();
}if(y){y.tabFocus();
}},__pv:function(z){var A=this.__pq;

while(z){if(A[z.$$hash]){return z;
}z=z.getLayoutParent();
}return null;
},__pw:function(B,C){if(B===C){return 0;
}var E=B.getTabIndex()||0;
var D=C.getTabIndex()||0;

if(E!=D){return E-D;
}var J=B.getContainerElement().getDomElement();
var I=C.getContainerElement().getDomElement();
var H=qx.bom.element.Location;
var G=H.get(J);
var F=H.get(I);
if(G.top!=F.top){return G.top-F.top;
}if(G.left!=F.left){return G.left-F.left;
}var K=B.getZIndex();
var L=C.getZIndex();

if(K!=L){return K-L;
}return 0;
},__px:function(){return this.__pD(this.__pt,null);
},__py:function(){return this.__pE(this.__pt,null);
},__pz:function(M){var N=this.__pt;

if(N==M){return this.__px();
}
while(M&&M.getAnonymous()){M=M.getLayoutParent();
}
if(M==null){return [];
}var O=[];
this.__pB(N,M,O);
O.sort(this.__pw);
var P=O.length;
return P>0?O[0]:this.__px();
},__pA:function(Q){var R=this.__pt;

if(R==Q){return this.__py();
}
while(Q&&Q.getAnonymous()){Q=Q.getLayoutParent();
}
if(Q==null){return [];
}var S=[];
this.__pC(R,Q,S);
S.sort(this.__pw);
var T=S.length;
return T>0?S[T-1]:this.__py();
},__pB:function(parent,U,V){var W=parent.getLayoutChildren();
var X;

for(var i=0,l=W.length;i<l;i++){X=W[i];
if(!(X instanceof qx.ui.core.Widget)){continue;
}
if(!this.isFocusRoot(X)&&X.isEnabled()&&X.isVisible()){if(X.isTabable()&&this.__pw(U,X)<0){V.push(X);
}this.__pB(X,U,V);
}}},__pC:function(parent,Y,ba){var bb=parent.getLayoutChildren();
var bc;

for(var i=0,l=bb.length;i<l;i++){bc=bb[i];
if(!(bc instanceof qx.ui.core.Widget)){continue;
}
if(!this.isFocusRoot(bc)&&bc.isEnabled()&&bc.isVisible()){if(bc.isTabable()&&this.__pw(Y,bc)>0){ba.push(bc);
}this.__pC(bc,Y,ba);
}}},__pD:function(parent,bd){var be=parent.getLayoutChildren();
var bf;

for(var i=0,l=be.length;i<l;i++){bf=be[i];
if(!(bf instanceof qx.ui.core.Widget)){continue;
}if(!this.isFocusRoot(bf)&&bf.isEnabled()&&bf.isVisible()){if(bf.isTabable()){if(bd==null||this.__pw(bf,bd)<0){bd=bf;
}}bd=this.__pD(bf,bd);
}}return bd;
},__pE:function(parent,bg){var bh=parent.getLayoutChildren();
var bi;

for(var i=0,l=bh.length;i<l;i++){bi=bh[i];
if(!(bi instanceof qx.ui.core.Widget)){continue;
}if(!this.isFocusRoot(bi)&&bi.isEnabled()&&bi.isVisible()){if(bi.isTabable()){if(bg==null||this.__pw(bi,bg)>0){bg=bi;
}}bg=this.__pE(bi,bg);
}}return bg;
}},destruct:function(){this._disposeMap(c);
this.__ps=this.__pr=this.__pt=null;
}});
})();
(function(){var l="qx.client",k="head",j="text/css",h="stylesheet",g="}",f='@import "',e="{",d='";',c="qx.bom.Stylesheet",b="link",a="style";
qx.Class.define(c,{statics:{includeFile:function(m,n){if(!n){n=document;
}var o=n.createElement(b);
o.type=j;
o.rel=h;
o.href=qx.util.ResourceManager.getInstance().toUri(m);
var p=n.getElementsByTagName(k)[0];
p.appendChild(o);
},createElement:qx.core.Variant.select(l,{"mshtml":function(q){var r=document.createStyleSheet();

if(q){r.cssText=q;
}return r;
},"default":function(s){var t=document.createElement(a);
t.type=j;

if(s){t.appendChild(document.createTextNode(s));
}document.getElementsByTagName(k)[0].appendChild(t);
return t.sheet;
}}),addRule:qx.core.Variant.select(l,{"mshtml":function(u,v,w){u.addRule(v,w);
},"default":function(x,y,z){x.insertRule(y+e+z+g,x.cssRules.length);
}}),removeRule:qx.core.Variant.select(l,{"mshtml":function(A,B){var C=A.rules;
var D=C.length;

for(var i=D-1;i>=0;--i){if(C[i].selectorText==B){A.removeRule(i);
}}},"default":function(E,F){var G=E.cssRules;
var H=G.length;

for(var i=H-1;i>=0;--i){if(G[i].selectorText==F){E.deleteRule(i);
}}}}),removeAllRules:qx.core.Variant.select(l,{"mshtml":function(I){var J=I.rules;
var K=J.length;

for(var i=K-1;i>=0;i--){I.removeRule(i);
}},"default":function(L){var M=L.cssRules;
var N=M.length;

for(var i=N-1;i>=0;i--){L.deleteRule(i);
}}}),addImport:qx.core.Variant.select(l,{"mshtml":function(O,P){O.addImport(P);
},"default":function(Q,R){Q.insertRule(f+R+d,Q.cssRules.length);
}}),removeImport:qx.core.Variant.select(l,{"mshtml":function(S,T){var U=S.imports;
var V=U.length;

for(var i=V-1;i>=0;i--){if(U[i].href==T){S.removeImport(i);
}}},"default":function(W,X){var Y=W.cssRules;
var ba=Y.length;

for(var i=ba-1;i>=0;i--){if(Y[i].href==X){W.deleteRule(i);
}}}}),removeAllImports:qx.core.Variant.select(l,{"mshtml":function(bb){var bc=bb.imports;
var bd=bc.length;

for(var i=bd-1;i>=0;i--){bb.removeImport(i);
}},"default":function(be){var bf=be.cssRules;
var bg=bf.length;

for(var i=bg-1;i>=0;i--){if(bf[i].type==bf[i].IMPORT_RULE){be.deleteRule(i);
}}}})}});
})();
(function(){var k="number",j="': ",h="width",g="qx.ui.layout.Canvas",f="qx.debug",e="height",d="Bad format of layout property '",c="' is not supported by the Canvas layout!",b=". The value must be either an integer or an percent string.",a="The property '";
qx.Class.define(g,{extend:qx.ui.layout.Abstract,members:{verifyLayoutProperty:qx.core.Variant.select(f,{"on":function(m,name,n){var o={top:1,left:1,bottom:1,right:1,width:1,height:1,edge:1};
this.assert(o[name]==1,a+name+c);

if(name==h||name==e){this.assertMatch(n,qx.ui.layout.Util.PERCENT_VALUE);
}else{if(typeof n===k){this.assertInteger(n);
}else if(qx.lang.Type.isString(n)){this.assertMatch(n,qx.ui.layout.Util.PERCENT_VALUE);
}else{this.fail(d+name+j+n+b);
}}},"off":null}),renderLayout:function(p,q){var B=this._getLayoutChildren();
var t,A,y;
var D,top,r,s,v,u;
var z,x,C,w;

for(var i=0,l=B.length;i<l;i++){t=B[i];
A=t.getSizeHint();
y=t.getLayoutProperties();
z=t.getMarginTop();
x=t.getMarginRight();
C=t.getMarginBottom();
w=t.getMarginLeft();
D=y.left!=null?y.left:y.edge;

if(qx.lang.Type.isString(D)){D=Math.round(parseFloat(D)*p/100);
}r=y.right!=null?y.right:y.edge;

if(qx.lang.Type.isString(r)){r=Math.round(parseFloat(r)*p/100);
}top=y.top!=null?y.top:y.edge;

if(qx.lang.Type.isString(top)){top=Math.round(parseFloat(top)*q/100);
}s=y.bottom!=null?y.bottom:y.edge;

if(qx.lang.Type.isString(s)){s=Math.round(parseFloat(s)*q/100);
}if(D!=null&&r!=null){v=p-D-r-w-x;
if(v<A.minWidth){v=A.minWidth;
}else if(v>A.maxWidth){v=A.maxWidth;
}D+=w;
}else{v=y.width;

if(v==null){v=A.width;
}else{v=Math.round(parseFloat(v)*p/100);
if(v<A.minWidth){v=A.minWidth;
}else if(v>A.maxWidth){v=A.maxWidth;
}}
if(r!=null){D=p-v-r-x-w;
}else if(D==null){D=w;
}else{D+=w;
}}if(top!=null&&s!=null){u=q-top-s-z-C;
if(u<A.minHeight){u=A.minHeight;
}else if(u>A.maxHeight){u=A.maxHeight;
}top+=z;
}else{u=y.height;

if(u==null){u=A.height;
}else{u=Math.round(parseFloat(u)*q/100);
if(u<A.minHeight){u=A.minHeight;
}else if(u>A.maxHeight){u=A.maxHeight;
}}
if(s!=null){top=q-u-s-C-z;
}else if(top==null){top=z;
}else{top+=z;
}}t.renderLayout(D,top,v,u);
}},_computeSizeHint:function(){var T=0,S=0;
var Q=0,O=0;
var M,L;
var K,I;
var E=this._getLayoutChildren();
var H,R,G;
var U,top,F,J;

for(var i=0,l=E.length;i<l;i++){H=E[i];
R=H.getLayoutProperties();
G=H.getSizeHint();
var P=H.getMarginLeft()+H.getMarginRight();
var N=H.getMarginTop()+H.getMarginBottom();
M=G.width+P;
L=G.minWidth+P;
U=R.left!=null?R.left:R.edge;

if(U&&typeof U===k){M+=U;
L+=U;
}F=R.right!=null?R.right:R.edge;

if(F&&typeof F===k){M+=F;
L+=F;
}T=Math.max(T,M);
S=Math.max(S,L);
K=G.height+N;
I=G.minHeight+N;
top=R.top!=null?R.top:R.edge;

if(top&&typeof top===k){K+=top;
I+=top;
}J=R.bottom!=null?R.bottom:R.edge;

if(J&&typeof J===k){K+=J;
I+=J;
}Q=Math.max(Q,K);
O=Math.max(O,I);
}return {width:T,minWidth:S,height:Q,minHeight:O};
}}});
})();
(function(){var a="qx.html.Root";
qx.Class.define(a,{extend:qx.html.Element,construct:function(b){qx.html.Element.call(this);

if(b!=null){this.useElement(b);
}},members:{useElement:function(c){qx.html.Element.prototype.useElement.call(this,c);
this.setRoot(true);
qx.html.Element._modified[this.$$hash]=this;
}}});
})();
(function(){var l="'>",k="[",h=", ",g="</span>",f="<span class='type-",e="</span> ",d="}",c="",b="]",a="\n",K="{",J="map",I="function",H="<span class='object'>",G="]:",F="&gt;",E="<span class='object' title='Object instance with hash code: ",D="string",C="level-",B="0",s="&lt;",t="<span class='offset'>",q=":",r="qx.log.appender.Util",o="&amp;",p="&#39;",m="DIV",n="<span>",u="&quot;",v="<span class='type-key'>",x="</span>:<span class='type-",w="</span>: ",z=" ",y="]</span>: ",A="?";
qx.Class.define(r,{statics:{toHtml:function(L){var V=[];
var S,U,N,P;
V.push(t,this.formatOffset(L.offset,6),e);

if(L.object){var M=L.win.qx.core.ObjectRegistry.fromHashCode(L.object);

if(M){V.push(E+M.$$hash+l,M.classname,k,M.$$hash,y);
}}else if(L.clazz){V.push(H+L.clazz.classname,w);
}var O=L.items;

for(var i=0,T=O.length;i<T;i++){S=O[i];
U=S.text;

if(U instanceof Array){var P=[];

for(var j=0,R=U.length;j<R;j++){N=U[j];

if(typeof N===D){P.push(n+this.escapeHTML(N)+g);
}else if(N.key){P.push(v+N.key+x+N.type+l+this.escapeHTML(N.text)+g);
}else{P.push(f+N.type+l+this.escapeHTML(N.text)+g);
}}V.push(f+S.type+l);

if(S.type===J){V.push(K,P.join(h),d);
}else{V.push(k,P.join(h),b);
}V.push(g);
}else{V.push(f+S.type+l+this.escapeHTML(U)+e);
}}var Q=document.createElement(m);
Q.innerHTML=V.join(c);
Q.className=C+L.level;
return Q;
},formatOffset:function(W,length){var ba=W.toString();
var X=(length||6)-ba.length;
var Y=c;

for(var i=0;i<X;i++){Y+=B;
}return Y+ba;
},FORMAT_STACK:null,escapeHTML:function(bb){return String(bb).replace(/[<>&"']/g,this.__Fi);
},__Fi:function(bc){var bd={"<":s,">":F,"&":o,"'":p,'"':u};
return bd[bc]||A;
},toText:function(be){return this.toTextArray(be).join(z);
},toTextArray:function(bf){var bn=[];
bn.push(this.formatOffset(bf.offset,6));

if(bf.object){var bg=bf.win.qx.core.ObjectRegistry.fromHashCode(bf.object);

if(bg){bn.push(bg.classname+k+bg.$$hash+G);
}}else if(bf.clazz){bn.push(bf.clazz.classname+q);
}var bh=bf.items;
var bk,bm;

for(var i=0,bl=bh.length;i<bl;i++){bk=bh[i];
bm=bk.text;

if(bk.trace&&bk.trace.length>0){if(typeof (this.FORMAT_STACK)==I){bm+=a+this.FORMAT_STACK(bk.trace);
}else{bm+=a+bk.trace;
}}
if(bm instanceof Array){var bi=[];

for(var j=0,bj=bm.length;j<bj;j++){bi.push(bm[j].text);
}
if(bk.type===J){bn.push(K,bi.join(h),d);
}else{bn.push(k,bi.join(h),b);
}}else{bn.push(bm);
}}return bn;
}}});
})();
(function(){var d="debug",c="log",b="qx.log.appender.Native",a="qx.client";
qx.Class.define(b,{statics:{process:qx.core.Variant.select(a,{"gecko":function(e){if(window.console&&console.firebug){console[e.level].call(console,qx.log.appender.Util.toText(e));
}},"mshtml":function(f){if(window.console){var h=f.level;

if(h==d){h=c;
}var g=qx.log.appender.Util.toText(f);
console[h](g);
}},"webkit":function(i){if(window.console){var k=i.level;

if(k==d){k=c;
}var j=qx.log.appender.Util.toText(i);
console[k](j);
}},"opera":function(l){}})},defer:function(m){qx.log.Logger.register(m);
}});
})();
(function(){var k="",j='</div>',i="none",h="keypress",g='.qxconsole .messages{background:white;height:100%;width:100%;overflow:auto;}',f='.qxconsole .messages .user-result{background:white}',d='.qxconsole .messages .level-error{background:#FFE2D5}',c="div",b="user-command",a='<div class="command">',P='.qxconsole .command input:focus{outline:none;}',O='.qxconsole .messages .type-key{color:#565656;font-style:italic}',N='.qxconsole .messages .type-instance{color:#565656;font-weight:bold}',M='.qxconsole .messages div{padding:0px 4px;}',L='.qxconsole .messages .level-debug{background:white}',K='.qxconsole .messages .type-class{color:#5F3E8A;font-weight:bold}',J="DIV",I='.qxconsole .messages .level-user{background:#E3EFE9}',H='<div class="qxconsole">',G='.qxconsole .messages .type-map{color:#CC3E8A;font-weight:bold;}',r='.qxconsole .messages .type-string{color:black;font-weight:normal;}',s='.qxconsole .control a{text-decoration:none;color:black;}',p='<div class="messages">',q='.qxconsole .messages .type-boolean{color:#15BC91;font-weight:normal;}',n='<input type="text"/>',o="clear",l='.qxconsole .command input{width:100%;border:0 none;font-family:Consolas,Monaco,monospace;font-size:11px;line-height:1.2;}',m='.qxconsole .messages .type-array{color:#CC3E8A;font-weight:bold;}',t='.qxconsole{z-index:10000;width:600px;height:300px;top:0px;right:0px;position:absolute;border-left:1px solid black;color:black;border-bottom:1px solid black;color:black;font-family:Consolas,Monaco,monospace;font-size:11px;line-height:1.2;}',u='.qxconsole .command{background:white;padding:2px 4px;border-top:1px solid black;}',y='.qxconsole .messages .user-command{color:blue}',x="qx.log.appender.Console",A='.qxconsole .messages .level-info{background:#DEEDFA}',z="block",C='.qxconsole .messages .level-warn{background:#FFF7D5}',B='.qxconsole .messages .type-stringify{color:#565656;font-weight:bold}',w='.qxconsole .messages .user-error{background:#FFE2D5}',F='.qxconsole .control{background:#cdcdcd;border-bottom:1px solid black;padding:4px 8px;}',E='<div class="control"><a href="javascript:qx.log.appender.Console.clear()">Clear</a> | <a href="javascript:qx.log.appender.Console.toggle()">Hide</a></div>',D=">>> ",v='.qxconsole .messages .type-number{color:#155791;font-weight:normal;}';
qx.Class.define(x,{statics:{init:function(){var Q=[t,F,s,g,M,y,f,w,L,A,C,d,I,r,v,q,m,G,O,K,N,B,u,l,P];
qx.bom.Stylesheet.createElement(Q.join(k));
var S=[H,E,p,j,a,n,j,j];
var T=document.createElement(J);
T.innerHTML=S.join(k);
var R=T.firstChild;
document.body.appendChild(T.firstChild);
this.__Lw=R;
this.__Lx=R.childNodes[1];
this.__Ly=R.childNodes[2].firstChild;
this.__LD();
qx.log.Logger.register(this);
qx.core.ObjectRegistry.register(this);
},dispose:function(){qx.event.Registration.removeListener(document.documentElement,h,this.__LE,this);
qx.log.Logger.unregister(this);
},clear:function(){this.__Lx.innerHTML=k;
},process:function(U){this.__Lx.appendChild(qx.log.appender.Util.toHtml(U));
this.__Lz();
},__Lz:function(){this.__Lx.scrollTop=this.__Lx.scrollHeight;
},__LA:true,toggle:function(){if(!this.__Lw){this.init();
}else if(this.__Lw.style.display==i){this.show();
}else{this.__Lw.style.display=i;
}},show:function(){if(!this.__Lw){this.init();
}else{this.__Lw.style.display=z;
this.__Lx.scrollTop=this.__Lx.scrollHeight;
}},__LB:[],execute:function(){var X=this.__Ly.value;

if(X==k){return;
}
if(X==o){return this.clear();
}var V=document.createElement(c);
V.innerHTML=qx.log.appender.Util.escapeHTML(D+X);
V.className=b;
this.__LB.push(X);
this.__LC=this.__LB.length;
this.__Lx.appendChild(V);
this.__Lz();

try{var W=window.eval(X);
}catch(Y){qx.log.Logger.error(Y);
}
if(W!==undefined){qx.log.Logger.debug(W);
}},__LD:function(e){this.__Lx.style.height=(this.__Lw.clientHeight-this.__Lw.firstChild.offsetHeight-this.__Lw.lastChild.offsetHeight)+"px";
},__LE:function(e){var bb=e.getKeyIdentifier();
if((bb=="F7")||(bb=="D"&&e.isCtrlPressed())){this.toggle();
e.preventDefault();
}if(!this.__Lw){return;
}if(!qx.dom.Hierarchy.contains(this.__Lw,e.getTarget())){return;
}if(bb=="Enter"&&this.__Ly.value!=""){this.execute();
this.__Ly.value="";
}if(bb=="Up"||bb=="Down"){this.__LC+=bb=="Up"?-1:1;
this.__LC=Math.min(Math.max(0,this.__LC),this.__LB.length);
var ba=this.__LB[this.__LC];
this.__Ly.value=ba||"";
this.__Ly.select();
}}},defer:function(bc){qx.event.Registration.addListener(document.documentElement,h,bc.__LE,bc);
}});
})();
(function(){var by="visible",bx="excluded",bw="current",bv="/",bu="",bt="category",bs="modelLink",br="tags",bq="all",bp="interval",be="node",bd="qx.version",bc="horizontal",bb="html",ba="~",Y="widget",X="_demoView",W="separator-vertical",V="request",U="_leftComposite",bF="^.*",bG="filled",bD="changeValue",bE="demobrowser.DemoBrowser",bB="changeSelection",bC="_history",bz="_status",bA="completed",bH="failed",bI="_searchTextField",bi="f1",bh="execute",bk="logappender",bj="_runbutton",bm=".html",bl="f2",bo="_stopbutton",bn="ig",bg="noPlayground",bf="animation",a='_cmdDisposeSample',b="qx.theme.Modern",c="toolbar",d="tree1",f="__Ns",g="demo/welcome.html",h='_cmdSampleInOwnWindow',k=".*",l=" ",n="background-splitpane",bM='demo/',bL="__Nx",bK='_cmdNamespacePollution',bJ="Filter...",bQ="/playground/",bP="viewGroup",bO="icon/16/actions/edit-find.png",bN="__Ny",bS="_",bR="qooxdoo ",H="right",I="main",F='_cmdObjectSummary',G="js",L="_prevButton",M='_cmdNextSample',J="__Nq",K="_tree",D="left",E=".",A='_cmdPrevSample',z='_cmdRunSample',C="_nextButton",B="value",v="_infosplit",q="runbutton",y="_navPart",x="?qx.theme=",p="textfield",o="mainsplit",Q="app-header",R="Demo Browser",S="http://demo.qooxdoo.org/",T="__Nw",N="__Nr",O="log",P="_iframe";
qx.Class.define(bE,{extend:qx.ui.container.Composite,construct:function(){qx.ui.container.Composite.call(this);
var bW=new qx.ui.layout.VBox;
bW.setSeparator(W);
this.setLayout(bW);
this.add(this._createHeader());
this.widgets={};
this.tests={};
this.__Np=b;
this.__NB();
this.__Nq=this.__NI();
this.add(this.__Nq);
var cb=new qx.ui.splitpane.Pane(bc);
this.mainsplit=cb;
var bX=new qx.ui.splitpane.Pane(bc);
bX.setDecorator(null);
this._infosplit=bX;
this.add(cb,{flex:1});
var cd=this._leftComposite=new qx.ui.container.Composite();
cd.setLayout(new qx.ui.layout.VBox(3));
cd.setBackgroundColor(n);
cb.add(cd,0);
{};
var bV=new qx.ui.container.Composite();
bV.setLayout(new qx.ui.layout.HBox(3));
bV.setAppearance(p);
cd.add(bV);
var ce=new qx.ui.basic.Image(bO);
bV.add(ce);
this._searchTextField=new qx.ui.form.TextField();
this._searchTextField.setLiveUpdate(true);
this._searchTextField.setAppearance(Y);
this._searchTextField.setPlaceholder(bJ);
var cc=new qx.event.Timer(500);
cc.addListener(bp,function(cf){this.filter(this._searchTextField.getValue());
cc.stop();
},this);
this._searchTextField.addListener(bD,function(cg){cc.restart();
},this);
bV.add(this._searchTextField,{flex:1});
this._status=new qx.ui.basic.Label(bu);
this._status.setAppearance(Y);
this._status.setWidth(80);
this._status.setTextAlign(H);
bV.add(this._status);
cb.add(bX,1);
this._tree=this.__NN();
cd.add(this._tree,{flex:1});
this._demoView=this.__NJ();
{bX.add(this._demoView,2);
};
var bT=this.__NL();
var bU=this.__NM();
var bY=this.__NK();
var ca=new qx.ui.container.Stack;
ca.setDecorator(I);
ca.add(bT);
ca.add(bU);
ca.add(bY);
this.viewGroup.addListener(bB,function(e){var ch=e.getData()[0];
var ci=ch!=null?ch.getUserData(B):bu;

switch(ci){case bb:this.setSelection([bT]);
ca.show();
break;
case G:this.setSelection([bU]);
ca.show();
break;
case O:this.setSelection([bY]);
ca.show();
break;
default:this.resetSelection();
ca.exclude();
}},ca);
bX.add(ca,1);
ca.resetSelection();
ca.exclude();
this._history=qx.bom.History.getInstance();
this._history.addListener(V,function(e){var cj=e.getData().replace(ba,bv);

if(this._currentSample!=cj){this.setCurrentSample(cj);
}},this);
this.__Nr=[this.__Nw,this.__Nx,this.__Ny];
{this.__Nr.push(this.__Nu);
};
this.__Ns=new qx.event.Timer(250);
this.__Ns.addListener(bp,this.__NP,this);
this.__Ns.start();
},properties:{playDemos:{check:[bq,bt,bw],init:bw}},members:{_iframe:null,__Np:null,__Ns:null,__Nt:null,_tree:null,_status:null,_searchTextField:null,__Nu:null,__Nv:null,__Nr:null,_versionFilter:null,__Nw:null,__Nx:null,__Ny:null,__Nz:null,__Nq:null,_leftComposite:null,_infosplit:null,_demoView:null,__NA:null,defaultUrl:g,playgroundUrl:S+qx.core.Setting.get(bd)+bQ,__NB:function(){this._cmdObjectSummary=new qx.ui.core.Command("Ctrl+O");
this._cmdObjectSummary.addListener("execute",this.__NC,this);
this._cmdRunSample=new qx.ui.core.Command("F5");
this._cmdRunSample.addListener("execute",this.runSample,this);
this._cmdPrevSample=new qx.ui.core.Command("Ctrl+Left");
this._cmdPrevSample.addListener("execute",this.playPrev,this);
this._cmdNextSample=new qx.ui.core.Command("Ctrl+Right");
this._cmdNextSample.addListener("execute",this.playNext,this);
this._cmdSampleInOwnWindow=new qx.ui.core.Command("Ctrl+N");
this._cmdSampleInOwnWindow.addListener("execute",this.__ND,this);
this._cmdDisposeSample=new qx.ui.core.Command("Ctrl+D");
this._cmdDisposeSample.addListener("execute",this.__NG,this);
this._cmdNamespacePollution=new qx.ui.core.Command("Ctrl+P");
this._cmdNamespacePollution.addListener("execute",this.__NH,this);
},__NC:function(){var ck=this._iframe.getWindow();

if(ck&&ck.qx){alert(ck.qx.dev.ObjectSummary.getInfo());
}else{alert("Unable to access namespace. Maybe no demo loaded.");
}},__ND:function(){var cl=this._iframe.getSource();
window.open(cl,"_blank");
},__NE:function(cm){var cn=!!cm;
var co=this._tree.getSelection()[0].getUserData("tags");

if(co){cn=cn&&!qx.lang.Array.contains(co,"noPlayground");
}this.__Nu.setEnabled(cn);
this.__Nv=cm;
},__NF:function(){if(this.__Nv){var cr=this.__Nv;
var cq='{"code": '+'"'+encodeURIComponent(cr)+'"}';
var cp=this.playgroundUrl+"#"+encodeURIComponent(cq);
window.open(cp,"_blank");
}else{alert(this.tr("Could not open the Playground."));
}},__NG:function(e){var cs=this._iframe.getWindow();

if(cs&&cs.qx){cs.qx.core.ObjectRegistry.shutdown();
alert("Done!");
}else{alert("Unable to access application.");
}},__NH:function(e){var ct=this._iframe.getWindow();

if(ct&&ct.qx){alert(ct.qx.dev.Pollution.getInfo());
}else{alert("Unable to access application.");
}},__NI:function(){var cy=new qx.ui.toolbar.ToolBar();
this._navPart=new qx.ui.toolbar.Part();
cy.add(this._navPart);
this._runbutton=new qx.ui.toolbar.Button(this.tr("Run"),"icon/22/actions/media-playback-start.png");
this._runbutton.addListener("execute",this.runSample,this);
this._runbutton.setToolTipText("Run the selected demo(s)");
this._navPart.add(this._runbutton);
this._stopbutton=new qx.ui.toolbar.Button(this.tr("Stop"),"icon/22/actions/media-playback-stop.png");
this._stopbutton.addListener("execute",this.stopSample,this);
this._stopbutton.setToolTipText("Stop playback after current demo");
this._navPart.add(this._stopbutton);
this._stopbutton.setVisibility("excluded");
this._runbutton.setMinWidth(60);
this._stopbutton.setMinWidth(60);
var cL=new qx.ui.toolbar.Button(this.tr("Previous"),"icon/22/actions/go-previous.png");
cL.addListener("execute",this.playPrev,this);
cL.setToolTipText("Run previous demo");
this._navPart.add(cL);
this._prevButton=cL;
var cO=new qx.ui.toolbar.Button(this.tr("Next"),"icon/22/actions/go-next.png");
cO.addListener("execute",this.playNext,this);
cO.setToolTipText("Run next demo");
this._navPart.add(cO);
this._nextButton=cO;
var cH=new qx.ui.toolbar.Button(this.tr("Own Window"),"icon/22/actions/edit-redo.png");
cH.addListener("execute",this.__ND,this);
cH.setToolTipText("Open demo in new window");
this.__Nw=cH;
this._navPart.add(cH);
{var cx=new qx.ui.toolbar.Button(this.tr("To Playground"),"icon/22/actions/application-exit.png");
cx.addListener("execute",this.__NF,this);
cx.setToolTipText("Open demo in the playground");
cx.setEnabled(false);
if(qx.core.Variant.isSet("qx.client","mshtml")){cx.exclude();
}this.__Nu=cx;
this._navPart.add(cx);
};
var cz=new qx.ui.toolbar.Part;
this.__Ny=cz;
cy.add(cz);
{var cK=new qx.ui.menu.Menu;
this.__Nz=cK;
var cF=new qx.ui.menu.RadioButton("Modern Theme");
var cD=new qx.ui.menu.RadioButton("Classic Theme");
cF.setUserData("value","qx.theme.Modern");
cF.setValue(true);
cD.setUserData("value","qx.theme.Classic");
var cM=new qx.ui.form.RadioGroup(cF,cD);
cM.addListener("changeSelection",this.__NU,this);
cK.add(cF);
cK.add(cD);
var cu=new qx.ui.toolbar.MenuButton(this.tr("Theme"),"icon/22/apps/utilities-color-chooser.png",cK);
cu.setToolTipText("Choose theme");
cz.add(cu);
};
var cB=new qx.ui.menu.Menu;
{var cC=new qx.ui.menu.Button(this.tr("Object Summary"));
cC.setCommand(this._cmdObjectSummary);
cB.add(cC);
var cN=new qx.ui.menu.Button(this.tr("Global Namespace Pollution"));
cN.setCommand(this._cmdNamespacePollution);
cB.add(cN);
};
var cI=new qx.ui.menu.Button(this.tr("Dispose Demo"));
cI.setCommand(this._cmdDisposeSample);
cB.add(cI);
var cJ=new qx.ui.toolbar.MenuButton(this.tr("Debug"),"icon/22/apps/office-spreadsheet.png",cB);
cJ.setToolTipText("Debugging options");
cz.add(cJ);
var cv=new qx.ui.toolbar.Part;
this.__Nx=cv;
cy.addSpacer();
cy.add(cv);
{var cP=new qx.ui.toolbar.RadioButton("HTML Code","icon/22/apps/internet-web-browser.png");
cP.setToolTipText("Display HTML source");
var cG=new qx.ui.toolbar.RadioButton("JS Code","icon/22/mimetypes/executable.png");
cG.setToolTipText("Display JavaScript source");
cP.setUserData("value","html");
cG.setUserData("value","js");
cv.add(cP);
cv.add(cG);
};
var cE=new qx.ui.toolbar.RadioButton("Log File","icon/22/apps/utilities-log-viewer.png");
cE.setToolTipText("Display log file");
cE.setUserData("value","log");
cv.add(cE);
var cA=this.viewGroup=new qx.ui.form.RadioGroup;
cA.setAllowEmptySelection(true);
cA.add(cE);
{cA.add(cP,cG);
};
return cy;
},__NJ:function(){var cQ=new qx.ui.embed.Iframe().set({nativeContextMenu:true});
cQ.addListener("load",this.__NO,this);
this._iframe=cQ;
return cQ;
},__NK:function(){var cT=new qx.ui.layout.VBox(0,"middle","main");
cT.setAlignX("right");
var cV=new qx.ui.container.Composite(cT);
var cR=new qx.ui.decoration.Background().set({backgroundColor:"background-medium"});
cV.setDecorator(cR);
var cU=new qx.ui.form.Button(this.tr("Clear log"),"icon/22/actions/edit-clear.png");
cU.setAllowGrowX(false);
cU.setMargin(5);
cU.addListener("execute",function(){this.logappender.clear();
},this);
cV.add(cU,{flex:0});
this.f2=new qx.ui.embed.Html();
this.f2.setOverflow("auto","auto");
this.f2.setFont("monospace");
this.f2.setBackgroundColor("white");
this.logappender=new qx.log.appender.Element();
qx.log.Logger.unregister(this.logappender);
var cS=document.createElement("div");
this.logelem=document.createElement("div");
this.logelem.style.padding="8px";
this.logappender.setElement(this.logelem);
cS.appendChild(this.logelem);
this.f2.getContentElement().useElement(cS);
cV.add(this.f2,{flex:1});
return cV;
},__NL:function(){var cW=new qx.ui.embed.Html("<div class='script'>The sample source will be displayed here.</div>");
cW.setOverflow("auto","auto");
cW.setFont("monospace");
cW.setBackgroundColor("white");
this.widgets["outputviews.sourcepage.html.page"]=cW;
cW.getContentElement().setAttribute("id","qx_srcview");
return cW;
},__NM:function(){var cX=new qx.ui.embed.Html("<div class='script'>The sample JS source will be displayed here.</div>");
cX.setOverflow("auto","auto");
cX.setFont("monospace");
cX.setBackgroundColor("white");
this.widgets["outputviews.sourcepage.js.page"]=cX;
cX.getContentElement().setAttribute("id","qx_srcview");
return cX;
},__NN:function(){var da=new qx.ui.tree.Tree();
var cY=new qx.ui.tree.TreeFolder("Demos");
da.setAppearance("demo-tree");
da.setRoot(cY);
da.setSelection([cY]);
this.tree=this.widgets["treeview.flat"]=da;
da.addListener("changeSelection",this.treeGetSelection,this);
da.addListener("dblclick",function(e){qx.event.Timer.once(this.runSample,this,50);
},this);
return da;
},treeGetSelection:function(e){var db=this.tree.getSelection()[0];
var dc=db.getUserData(bs);
this.tests.selected=this.tests.handler.getFullName(dc);
},leftReloadTree:function(e){this._sampleToTreeNodeMap={};
var dd=this._sampleToTreeNodeMap;
var dj=null;
var dm=null;
var dl;
{dl=/\?autorun=true/.test(location.href);
};
var di=this._history.getState();
var dg=di.match(/([^~]+)~/);

if(dg){dj=dg[1];
}else{var de=di.match(/([^~][\w]*)/);

if(de){dj=de[1];

if(dl){this.setPlayDemos(bt);
}}else{dj=bf;

if(dl){this.setPlayDemos(bq);
}}}function dk(dn,dp){var dt=dp.getChildren();
var t;

for(var i=0;i<dt.length;i++){var dq=dt[i];

if(dq.hasChildren()){t=new qx.ui.tree.TreeFolder(df.polish(dq.label));
t.setUserData(bG,false);
t.setUserData(be,dq);
dk(t,t.getUserData(be));

if(dq.label==dj){dm=t;
t.setOpen(true);
}}else{t=new qx.ui.tree.TreeFile(df.polish(dq.label));
var ds=dq.pwd().slice(1).join(bv)+bv+dq.label;

if(dq.tags){var j,m,dr;
t.setUserData(br,dq.tags);
{};
}dd[ds]=t;
}dn.add(t);
t.setUserData(bs,dq);
dq.widgetLinkFull=t;
}}var dh=this.tests.handler.ttree;
var df=this;
this.tree.setUserData(bs,dh);
this.tree.getRoot().setOpen(true);
dk(this.tree.getRoot(),dh);
{};

if(dm!=null){this.tree.setSelection([dm]);
}},runSample:function(e){if(e&&(e.getType()===bh||e.getType()===bp)){if(this.tests.selected===bu){this.setPlayDemos(bq);
}else if(this.tests.selected.indexOf(bb)>0){if(this.__NA){this.__NA.stop();
}this.setPlayDemos(bw);
}else{this.setPlayDemos(bt);
}}this._runbutton.setVisibility(bx);
this._stopbutton.setVisibility(by);

if(this.tests.selected!=bu){var du=this.tests.selected.replace(E,bv);
this.setCurrentSample(du);
}else{this.playNext();
}},stopSample:function(e){this.setPlayDemos(bw);
this._nextButton.setEnabled(true);
this._prevButton.setEnabled(true);
this._stopbutton.setVisibility(bx);
this._runbutton.setVisibility(by);
},setCurrentSample:function(dv){if(!dv){return;
}
if(!this._sampleToTreeNodeMap){return;
}var dw;
var dy=this._sampleToTreeNodeMap[dv];

if(dy){dy.getTree().setSelection([dy]);
dw=bM+dv;
{dw+=x+this.__Np;
};
var dx=dy.getUserData(br);

if(dx){this.__Nu.setEnabled(!qx.lang.Array.contains(dx,bg));
}}else{dw=this.defaultUrl;
}
if(this._iframe.getSource()==dw){this._iframe.reload();
}else{this.__Nt=false;
this._iframe.setSource(dw);
}if(dw==this.defaultUrl){this.disableMenuButtons();
}else{this.enableMenuButtons();
}this._currentSample=dv;
this._currentSampleUrl=dw;
},__NO:function(){var dC=this._iframe.getWindow();
var dI=this._iframe.getSource();

if(dI!=null&&dI!=this.defaultUrl){var dB;

try{dB=dC.location.href;
}catch(dK){dB=window.location.href;
var dJ=dB.lastIndexOf("/");

if(dJ!=-1){dB=dB.substring(0,dJ+1);
}dB+=dI;
}var dG=dB.indexOf("/demo/")+6;
var dD=dB.indexOf("?");
dD=dD==-1?dB.length:dD;
var dE=dB.substring(dG,dD).split("/");
var dH=String.fromCharCode(187);

if(dE.length==2){var dz=dE[0];
dz=dz.charAt(0).toUpperCase()+dz.substring(1);
var dF=dE[1].replace(".html","").replace("_"," ");
dF=dF.charAt(0).toUpperCase()+dF.substring(1);
var dA="qooxdoo "+dH+" Demo Browser "+dH+" "+dz+" "+dH+" "+dF;
}else{var dA="qooxdoo "+dH+" Demo Browser "+dH+" Start";
}document.title=dA;
}if(this.getPlayDemos()!="current"){if(!dF){this.playNext();
}else{var self=this;
this.__NA=qx.event.Timer.once(this.playNext,self,5000);
this._nextButton.setEnabled(false);
this._prevButton.setEnabled(false);
}}else{this._stopbutton.setVisibility("excluded");
this._runbutton.setVisibility("visible");
}},__NP:function(e){var dL=this._iframe.getWindow();

try{if(dL&&dL.qx&&dL.qx.log&&dL.qx.log.appender){if(!this.__Nt){this.__Nt=true;
this.debug("Demo loaded: "+this._currentSample);
this.logappender.$$id=null;
this.logappender.clear();

try{dL.qx.log.Logger.register(this.logappender);
}catch(e){return ;
}this._history.addToHistory(this._currentSample.replace("/","~"),document.title);
if(this._currentSampleUrl!=this.defaultUrl){this.__NQ(this._currentSampleUrl);
}}}else{this.__Nt=false;
}}catch(dM){this.__Nt=false;
}},filter:function(dN){var dV=new RegExp(bF+dN+k,bn);
var dT=this._tree.getRoot().getItems(true,true);
var dU=0;
var dO=0;

for(var i=0;i<dT.length;i++){var dW=dT[i];
var parent=dW.getParent();
var dS=dW.getUserData(br);
var dP=false;

if(dS!=null){for(var j=0;j<dS.length;j++){dP=!!dS[j].match(dV);

if(dP){break;
}}}
if(dW.getChildren().length==0){dO++;
}
if((dP||(dW.getLabel().search(dV)!=-1)||(parent.getLabel().search(dV)!=-1))){if(dW.getChildren().length==0){dU++;
}dW.show();
dW.getParent().setOpen(true);
dW.getParent().show();
}else{dW.exclude();
}}if(dN==bu){var dR=this._tree.getRoot().getItems(false,true);
var dQ=this._tree.getSelection();
for(var i=0;i<dR.length;i++){if(dR[i]==dQ[0]||dR[i]==dQ[0].getParent()){continue;
}dR[i].setOpen(false);
}}this._status.setValue(dU+bv+dO);
},__NQ:function(dX){if(typeof (dX)!="string"){return;
}var dY=new qx.io.remote.Request(dX);
dY.setTimeout(180000);
dY.setProhibitCaching(false);
dY.addListener("completed",function(ea){var content=ea.getContent();
if(content){{var ed=content.indexOf("<script",content.indexOf("<script")+7);
var ej=content.indexOf("src",ed);
var ec=content.indexOf("\"",ej+5);
var ee=content.substring(ej+5,ec);
var eh=ee.substring(4,ee.length-3)+".src.js";
var u="script/demobrowser.demo";
var eg=dX.split('/');
var ef=eg[1];
var ei=eg[2];
ei=ei.substr(0,ei.indexOf('.html'));
u+="."+ef+"."+ei+".src.js";
eh=u;
var eb=new qx.io.remote.Request(eh);
eb.setTimeout(180000);
eb.setProhibitCaching(false);
eb.addListener("completed",function(ek){var el=ek.getContent();
this.__NE(el);

if(el){this.widgets["outputviews.sourcepage.js.page"].setHtml(this.__NR(el,"javascript"));
}},this);
eb.addListener("failed",function(em){this.error("Couldn't load file: "+dX);
},this);
eb.send();
this.widgets["outputviews.sourcepage.html.page"].setHtml(this.__NR(content));
};
}},this);
dY.addListener("failed",function(en){this.error("Couldn't load file: "+dX);
},this);
dY.send();
},dataLoader:function(eo){var ep=new qx.io.remote.Request(eo);
ep.setTimeout(180000);
ep.setProhibitCaching(false);
ep.addListener(bA,function(eq){var content=eq.getContent();
var er=eval(content);
qx.event.Timer.once(function(){this.tests.handler=new demobrowser.TreeDataHandler(er);
this.leftReloadTree();
var es=this._history.getState();

if(es){this.setCurrentSample(es.replace(ba,bv));
}else{this.setCurrentSample(this.defaultUrl);
}},this,0);
},this);
ep.addListener(bH,function(et){this.error("Couldn't load file: "+eo);
},this);
ep.send();
},playPrev:function(e){this.setPlayDemos(bw);
var ez=this.tree.getSelection()[0];

if(ez){var eu=this.tree.getPreviousNodeOf(ez,false);

if(!eu||eu==this.tree.getRoot()){return;
}
while(eu.isVisible&&!eu.isVisible()){eu=this.tree.getPreviousNodeOf(eu,false);
}
if(eu.getParent()==this.tree.getRoot()){var ey=this.tree.getPreviousNodeOf(eu,false);

while(ey.isVisible&&!ey.isVisible()){ey=this.tree.getPreviousNodeOf(ey,false);
}
if(ey.getParent()==this.tree.getRoot()){ey.setOpen(true);
var ew=this.tree.getPreviousNodeOf(eu,false);

while(ew.isVisible&&!ew.isVisible()){ew=this.tree.getPreviousNodeOf(ew,false);
}
if(ey!==ew){eu=ew;
}}else{eu=ey;
}}
if(!eu||eu===ez){this._stopbutton.setVisibility(bx);
this._runbutton.setVisibility(by);
return;
}else{this.tree.setSelection([eu]);
this.runSample();
}}},playNext:function(e){this._nextButton.setEnabled(true);
this._prevButton.setEnabled(true);
var eC=this.tree.getSelection()[0];

if(eC){var eA=this.tree.getNextNodeOf(eC);

if(!eA){this.setPlayDemos(bw);
this._stopbutton.setVisibility(bx);
this._runbutton.setVisibility(by);
return;
}
if(eA.getParent()==this.tree.getRoot()){if(this.getPlayDemos()==bt){if(eA!=eC&&eA!=eC.getParent()){this.setPlayDemos(bw);
this._stopbutton.setVisibility(bx);
this._runbutton.setVisibility(by);
return;
}}eA.setOpen(true);
eA=this.tree.getNextNodeOf(eA);
}
if(!eA){this._stopbutton.setVisibility(bx);
this._runbutton.setVisibility(by);
return;
}
while(!eA.isVisible()){var eB=this.tree.getNextNodeOf(eA);

if(!eB){this._stopbutton.setVisibility(bx);
this._runbutton.setVisibility(by);
return;
}
if(eB.getParent()==this.tree.getRoot()){eA.setOpen(true);
var eB=this.tree.getNextNodeOf(eB);
}eA=eB;
}
if(eA){this.tree.setSelection([eA]);
this.runSample();
}else{this._stopbutton.setVisibility(bx);
this._runbutton.setVisibility(by);
}}},__NR:function(eD,eE){var eF=new qx.util.StringBuilder("<pre class='script'>");
var eH=[];
var eI=new qx.util.StringBuilder();
var eJ=/^\s*<script\b[^>]*?(?!\bsrc\s*=)[^>]*?>\s*$/i;
var eG=/^\s*<\/script>\s*$/i;
eD=eD.replace(/\r\n/g,"\n").replace(/\r/g,"\n");
var eH=eD.split('\n');
if(eE=="javascript"){return "<pre ><div class='script'>"+qx.dev.Tokenizer.javaScriptToHtml(eD)+"</div></pre>";
}
for(var i=0;i<eH.length;i++){if(eJ.exec(eH[i])){eF.add(this.__NS(qx.bom.String.escape(eI.get()+eH[i])));
eI.clear();
}else if(eG.exec(eH[i])){var eK=qx.dev.Tokenizer.javaScriptToHtml(eI.get());
eF.add('<div class="script">',eK,'</div>');
eI.clear();
eI.add(eH[i],'\n');
}else{eI.add(eH[i],'\n');
}}eF.add(this.__NS(qx.bom.String.escape(eI.get())),"</pre>");
return eF.get();
},disableMenuButtons:function(){var eL=this.__Nr;

for(var i=0;i<eL.length;i++){eL[i].setEnabled(false);
}},enableMenuButtons:function(){var eM=this.__Nr;

for(var i=0;i<eM.length;i++){eM[i].setEnabled(true);
}},__NS:function(eN){var eP=eN;
function eO(eQ){var s=new qx.util.StringBuilder(arguments[1],'<span class="html-tag-name">',arguments[2],'</span>');
var eR;
var eS=false;
if(arguments.length-2>3){for(var i=3;i<arguments.length-2;i++){eR=arguments[i];

if(eR=="/"){eS=true;
break;
}else{var m=/\s*([^=]+?)\s*=\s*((?!&quot;)\S+|&quot;.*?&quot;)\s*/g;
var r;

while((r=m.exec(eR))!=null){s.add(' <span class="keyword">',r[1],'</span>=<span class="string">',r[2].replace(/\s*$/,""),'</span>');
}}}s.add((eS?"/":""));
}s.add('&gt;');
return s.get();
}eP=eP.replace(/(&lt;\/?)([a-zA-Z]+)(.*?)(\/?)&gt;/g,eO);
return eP;
},polish:function(eT){return eT.replace(bm,bu).replace(bS,l);
},__NT:function(){var w=this._iframe.getWindow();
var eU;

if(w.qx&&w.qx.log&&w.qx.log.Logger){eU=w.qx.log.Logger;
eU.register(this.logappender);
eU.clear();
eU.unregister(this.logappender);
}},__NU:function(e){this.__Np=e.getData()[0].getUserData("value");
this.runSample();
},_createHeader:function(){var eX=new qx.ui.layout.HBox();
var eV=new qx.ui.container.Composite(eX);
eV.setAppearance(Q);
var eY=new qx.ui.basic.Label(R);
var eW=new qx.ui.basic.Label(bR+qx.core.Setting.get(bd));
eV.add(eY);
eV.add(new qx.ui.core.Spacer,{flex:1});
eV.add(eW);
return eV;
}},destruct:function(){this.widgets=this.tests=this._sampleToTreeNodeMap=this.tree=this.logelem=null;
this._disposeObjects(o,d,D,q,c,bi,bl,bC,bk,F,z,A,M,h,a,bK,y,bj,bo,T,bN,bL,bP,J,v,bI,bz,K,P,X,N,f,U,X,C,L);
}});
})();
(function(){var s="_applyLayoutChange",r="top",q="left",p="height",o="middle",n="Decorator",m="center",k="_applyReversed",j="qx.debug",h="bottom",c="' is not supported by the VBox layout!",g="qx.ui.layout.VBox",f="flex",b="Integer",a="The property '",e="right",d="Boolean";
qx.Class.define(g,{extend:qx.ui.layout.Abstract,construct:function(t,u,v){qx.ui.layout.Abstract.call(this);

if(t){this.setSpacing(t);
}
if(u){this.setAlignY(u);
}
if(v){this.setSeparator(v);
}},properties:{alignY:{check:[r,o,h],init:r,apply:s},alignX:{check:[q,m,e],init:q,apply:s},spacing:{check:b,init:0,apply:s},separator:{check:n,nullable:true,apply:s},reversed:{check:d,init:false,apply:k}},members:{__mo:null,__mp:null,__mq:null,__mr:null,_applyReversed:function(){this._invalidChildrenCache=true;
this._applyLayoutChange();
},__ms:function(){var B=this._getLayoutChildren();
var length=B.length;
var x=false;
var w=this.__mo&&this.__mo.length!=length&&this.__mp&&this.__mo;
var z;
var y=w?this.__mo:new Array(length);
var A=w?this.__mp:new Array(length);
if(this.getReversed()){B=B.concat().reverse();
}for(var i=0;i<length;i++){z=B[i].getLayoutProperties();

if(z.height!=null){y[i]=parseFloat(z.height)/100;
}
if(z.flex!=null){A[i]=z.flex;
x=true;
}else{A[i]=0;
}}if(!w){this.__mo=y;
this.__mp=A;
}this.__mq=x;
this.__mr=B;
delete this._invalidChildrenCache;
},verifyLayoutProperty:qx.core.Variant.select(j,{"on":function(C,name,D){this.assert(name===f||name===p,a+name+c);

if(name==p){this.assertMatch(D,qx.ui.layout.Util.PERCENT_VALUE);
}else{this.assertNumber(D);
this.assert(D>=0);
}},"off":null}),renderLayout:function(E,F){if(this._invalidChildrenCache){this.__ms();
}var M=this.__mr;
var length=M.length;
var W=qx.ui.layout.Util;
var V=this.getSpacing();
var ba=this.getSeparator();

if(ba){var J=W.computeVerticalSeparatorGaps(M,V,ba);
}else{var J=W.computeVerticalGaps(M,V,true);
}var i,H,I,Q;
var R=[];
var X=J;

for(i=0;i<length;i+=1){Q=this.__mo[i];
I=Q!=null?Math.floor((F-J)*Q):M[i].getSizeHint().height;
R.push(I);
X+=I;
}if(this.__mq&&X!=F){var O={};
var U,Y;

for(i=0;i<length;i+=1){U=this.__mp[i];

if(U>0){N=M[i].getSizeHint();
O[i]={min:N.minHeight,value:R[i],max:N.maxHeight,flex:U};
}}var K=W.computeFlexOffsets(O,F,X);

for(i in K){Y=K[i].offset;
R[i]+=Y;
X+=Y;
}}var top=M[0].getMarginTop();
if(X<F&&this.getAlignY()!=r){top=F-X;

if(this.getAlignY()===o){top=Math.round(top/2);
}}var N,bc,S,I,P,T,L;
this._clearSeparators();
if(ba){var bb=qx.theme.manager.Decoration.getInstance().resolve(ba).getInsets();
var G=bb.top+bb.bottom;
}for(i=0;i<length;i+=1){H=M[i];
I=R[i];
N=H.getSizeHint();
T=H.getMarginLeft();
L=H.getMarginRight();
S=Math.max(N.minWidth,Math.min(E-T-L,N.maxWidth));
bc=W.computeHorizontalAlignOffset(H.getAlignX()||this.getAlignX(),S,E,T,L);
if(i>0){if(ba){top+=P+V;
this._renderSeparator(ba,{top:top,left:0,height:G,width:E});
top+=G+V+H.getMarginTop();
}else{top+=W.collapseMargins(V,P,H.getMarginTop());
}}H.renderLayout(bc,top,S,I);
top+=I;
P=H.getMarginBottom();
}},_computeSizeHint:function(){if(this._invalidChildrenCache){this.__ms();
}var bj=qx.ui.layout.Util;
var br=this.__mr;
var bf=0,bi=0,bh=0;
var bd=0,bk=0;
var bo,be,bq;
for(var i=0,l=br.length;i<l;i+=1){bo=br[i];
be=bo.getSizeHint();
bi+=be.height;
var bn=this.__mp[i];
var bg=this.__mo[i];

if(bn){bf+=be.minHeight;
}else if(bg){bh=Math.max(bh,Math.round(be.minHeight/bg));
}else{bf+=be.height;
}bq=bo.getMarginLeft()+bo.getMarginRight();
if((be.width+bq)>bk){bk=be.width+bq;
}if((be.minWidth+bq)>bd){bd=be.minWidth+bq;
}}bf+=bh;
var bm=this.getSpacing();
var bp=this.getSeparator();

if(bp){var bl=bj.computeVerticalSeparatorGaps(br,bm,bp);
}else{var bl=bj.computeVerticalGaps(br,bm,true);
}return {minHeight:bf+bl,height:bi+bl,minWidth:bd,width:bk};
}},destruct:function(){this.__mo=this.__mp=this.__mr=null;
}});
})();
(function(){var k="slider",j="splitter",i="horizontal",h="px",g="vertical",f="knob",d="mousedown",c="mouseout",b="Integer",a="height",D="mousemove",C="move",B="maxHeight",A="resize",z="width",w="_applyOrientation",v="_applyOffset",u="splitpane",t="qx.ui.splitpane.Pane",s="top",q="minHeight",r="mouseup",o="minWidth",p="appear",m="losecapture",n="left",l="maxWidth";
qx.Class.define(t,{extend:qx.ui.core.Widget,construct:function(E){qx.ui.core.Widget.call(this);
this.__sz=[];
if(E){this.setOrientation(E);
}else{this.initOrientation();
}this.__sH.addListener(d,this._onMouseDown,this);
this.__sH.addListener(r,this._onMouseUp,this);
this.__sH.addListener(D,this._onMouseMove,this);
this.__sH.addListener(c,this._onMouseOut,this);
this.__sH.addListener(m,this._onMouseUp,this);
},properties:{appearance:{refine:true,init:u},offset:{check:b,init:6,apply:v},orientation:{init:i,check:[i,g],apply:w}},members:{__sA:null,__sB:false,__sC:null,__sD:null,__sE:null,__sF:null,__sG:null,__sz:null,__sH:null,_createChildControlImpl:function(F,G){var H;

switch(F){case k:H=new qx.ui.splitpane.Slider(this);
H.exclude();
this._add(H,{type:F});
break;
case j:H=new qx.ui.splitpane.Splitter(this);
this._add(H,{type:F});
H.addListener(C,this.__sI,this);
break;
}return H||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,F);
},__sI:function(e){this.__sK(e.getData());
},__sJ:function(I){this.__sH=new qx.ui.splitpane.Blocker(I);
this.getContentElement().add(this.__sH);
var J=this.getChildControl(j);
var K=J.getWidth();

if(!K){J.addListenerOnce(p,function(){this.__sK();
},this);
}J.addListener(A,function(e){var L=e.getData();

if(L.height==0||L.width==0){this.__sH.hide();
}else{this.__sH.show();
}},this);
},getBlocker:function(){return this.__sH;
},_applyOrientation:function(M,N){var O=this.getChildControl(k);
var R=this.getChildControl(j);
this.__sE=M===i;

if(!this.__sH){this.__sJ(M);
}this.__sH.setOrientation(M);
var Q=this._getLayout();

if(Q){Q.dispose();
}var P=M===g?new qx.ui.splitpane.VLayout:new qx.ui.splitpane.HLayout;
this._setLayout(P);
R.removeState(N);
R.addState(M);
R.getChildControl(f).removeState(N);
R.getChildControl(f).addState(M);
O.removeState(N);
O.addState(M);
qx.ui.core.queue.Manager.flush();
this.__sK();
},_applyOffset:function(S,T){this.__sK();
},__sK:function(U){var V=this.getChildControl(j);
var ba=this.getOffset();
var bb=V.getBounds();
var Y=V.getContainerElement().getDomElement();
if(!Y){return;
}if(this.__sE){var X=null;

if(U){X=U.width;
}else if(bb){X=bb.width;
}var bc=U&&U.left;

if(X){if(isNaN(bc)){bc=qx.bom.element.Location.getPosition(Y).left;
}this.__sH.setWidth(ba,X);
this.__sH.setLeft(ba,bc);
}}else{var W=null;

if(U){W=U.height;
}else if(bb){W=bb.height;
}var top=U&&U.top;

if(W){if(isNaN(top)){top=qx.bom.element.Location.getPosition(Y).top;
}this.__sH.setHeight(ba,W);
this.__sH.setTop(ba,top);
}}},add:function(bd,be){if(be==null){this._add(bd);
}else{this._add(bd,{flex:be});
}this.__sz.push(bd);
},remove:function(bf){this._remove(bf);
qx.lang.Array.remove(this.__sz,bf);
},getChildren:function(){return this.__sz;
},_onMouseDown:function(e){if(!e.isLeftPressed()){return;
}var bg=this.getChildControl(j);
var bi=bg.getContainerLocation();
var bh=this.getContentLocation();
this.__sA=this.__sE?e.getDocumentLeft()-bi.left+bh.left:e.getDocumentTop()-bi.top+bh.top;
var bk=this.getChildControl(k);
var bj=bg.getBounds();
bk.setUserBounds(bj.left,bj.top,bj.width,bj.height);
bk.setZIndex(bg.getZIndex()+1);
bk.show();
this.__sB=true;
this.__sH.capture();
e.stop();
},_onMouseMove:function(e){this._setLastMousePosition(e.getDocumentLeft(),e.getDocumentTop());
if(this.__sB){this.__sL();
var bl=this.getChildControl(k);
var bm=this.__sF;

if(this.__sE){bl.setDomLeft(bm);
this.__sH.setStyle(n,(bm-this.getOffset())+h);
}else{bl.setDomTop(bm);
this.__sH.setStyle(s,(bm-this.getOffset())+h);
}e.stop();
}},_onMouseOut:function(e){this._setLastMousePosition(e.getDocumentLeft(),e.getDocumentTop());
},_onMouseUp:function(e){if(!this.__sB){return;
}this._finalizeSizes();
var bn=this.getChildControl(k);
bn.exclude();
this.__sB=false;
this.releaseCapture();
e.stop();
},_finalizeSizes:function(){var br=this.__sF;
var bo=this.__sG;

if(br==null){return;
}var bt=this._getChildren();
var bs=bt[2];
var bp=bt[3];
var bq=bs.getLayoutProperties().flex;
var bu=bp.getLayoutProperties().flex;
if((bq!=0)&&(bu!=0)){bs.setLayoutProperties({flex:br});
bp.setLayoutProperties({flex:bo});
}else{if(this.__sE){bs.setWidth(br);
bp.setWidth(bo);
}else{bs.setHeight(br);
bp.setHeight(bo);
}}},__sL:function(){if(this.__sE){var bx=o,bE=z,by=l,bC=this.__sC;
}else{var bx=q,bE=a,by=B,bC=this.__sD;
}var bD=this._getChildren();
var bv=bD[2].getSizeHint();
var bA=bD[3].getSizeHint();
var bB=bD[2].getBounds()[bE]+bD[3].getBounds()[bE];
var bz=bC-this.__sA;
var bw=bB-bz;
if(bz<bv[bx]){bw-=bv[bx]-bz;
bz=bv[bx];
}else if(bw<bA[bx]){bz-=bA[bx]-bw;
bw=bA[bx];
}if(bz>bv[by]){bw+=bz-bv[by];
bz=bv[by];
}else if(bw>bA[by]){bz+=bw-bA[by];
bw=bA[by];
}this.__sF=bz;
this.__sG=bw;
},_isActiveDragSession:function(){return this.__sB;
},_setLastMousePosition:function(x,y){this.__sC=x;
this.__sD=y;
}},destruct:function(){this.__sz=null;
}});
})();
(function(){var a="qx.ui.splitpane.Slider";
qx.Class.define(a,{extend:qx.ui.core.Widget,properties:{allowShrinkX:{refine:true,init:false},allowShrinkY:{refine:true,init:false}}});
})();
(function(){var e="center",d="knob",c="middle",b="qx.ui.splitpane.Splitter",a="vertical";
qx.Class.define(b,{extend:qx.ui.core.Widget,construct:function(f){qx.ui.core.Widget.call(this);
if(f.getOrientation()==a){this._setLayout(new qx.ui.layout.HBox(0,e));
this._getLayout().setAlignY(c);
}else{this._setLayout(new qx.ui.layout.VBox(0,c));
this._getLayout().setAlignX(e);
}this._createChildControl(d);
},properties:{allowShrinkX:{refine:true,init:false},allowShrinkY:{refine:true,init:false}},members:{_createChildControlImpl:function(g,h){var i;

switch(g){case d:i=new qx.ui.basic.Image;
this._add(i);
break;
}return i||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,g);
}}});
})();
(function(){var s="_applyLayoutChange",r="left",q="width",p="center",o="top",n="Decorator",m="middle",k="_applyReversed",j="qx.debug",h="bottom",c="' is not supported by the HBox layout!",g="Boolean",f="flex",b="right",a="Integer",e="The property '",d="qx.ui.layout.HBox";
qx.Class.define(d,{extend:qx.ui.layout.Abstract,construct:function(t,u,v){qx.ui.layout.Abstract.call(this);

if(t){this.setSpacing(t);
}
if(u){this.setAlignX(u);
}
if(v){this.setSeparator(v);
}},properties:{alignX:{check:[r,p,b],init:r,apply:s},alignY:{check:[o,m,h],init:o,apply:s},spacing:{check:a,init:0,apply:s},separator:{check:n,nullable:true,apply:s},reversed:{check:g,init:false,apply:k}},members:{__mj:null,__mk:null,__ml:null,__mm:null,_applyReversed:function(){this._invalidChildrenCache=true;
this._applyLayoutChange();
},__mn:function(){var B=this._getLayoutChildren();
var length=B.length;
var y=false;
var w=this.__mj&&this.__mj.length!=length&&this.__mk&&this.__mj;
var z;
var x=w?this.__mj:new Array(length);
var A=w?this.__mk:new Array(length);
if(this.getReversed()){B=B.concat().reverse();
}for(var i=0;i<length;i++){z=B[i].getLayoutProperties();

if(z.width!=null){x[i]=parseFloat(z.width)/100;
}
if(z.flex!=null){A[i]=z.flex;
y=true;
}else{A[i]=0;
}}if(!w){this.__mj=x;
this.__mk=A;
}this.__ml=y;
this.__mm=B;
delete this._invalidChildrenCache;
},verifyLayoutProperty:qx.core.Variant.select(j,{"on":function(C,name,D){this.assert(name===f||name===q,e+name+c);

if(name==q){this.assertMatch(D,qx.ui.layout.Util.PERCENT_VALUE);
}else{this.assertNumber(D);
this.assert(D>=0);
}},"off":null}),renderLayout:function(E,F){if(this._invalidChildrenCache){this.__mn();
}var L=this.__mm;
var length=L.length;
var U=qx.ui.layout.Util;
var T=this.getSpacing();
var X=this.getSeparator();

if(X){var I=U.computeHorizontalSeparatorGaps(L,T,X);
}else{var I=U.computeHorizontalGaps(L,T,true);
}var i,G,R,Q;
var W=[];
var M=I;

for(i=0;i<length;i+=1){Q=this.__mj[i];
R=Q!=null?Math.floor((E-I)*Q):L[i].getSizeHint().width;
W.push(R);
M+=R;
}if(this.__ml&&M!=E){var O={};
var S,V;

for(i=0;i<length;i+=1){S=this.__mk[i];

if(S>0){N=L[i].getSizeHint();
O[i]={min:N.minWidth,value:W[i],max:N.maxWidth,flex:S};
}}var J=U.computeFlexOffsets(O,E,M);

for(i in J){V=J[i].offset;
W[i]+=V;
M+=V;
}}var bc=L[0].getMarginLeft();
if(M<E&&this.getAlignX()!=r){bc=E-M;

if(this.getAlignX()===p){bc=Math.round(bc/2);
}}var N,top,H,R,K,ba,P;
var T=this.getSpacing();
this._clearSeparators();
if(X){var Y=qx.theme.manager.Decoration.getInstance().resolve(X).getInsets();
var bb=Y.left+Y.right;
}for(i=0;i<length;i+=1){G=L[i];
R=W[i];
N=G.getSizeHint();
ba=G.getMarginTop();
P=G.getMarginBottom();
H=Math.max(N.minHeight,Math.min(F-ba-P,N.maxHeight));
top=U.computeVerticalAlignOffset(G.getAlignY()||this.getAlignY(),H,F,ba,P);
if(i>0){if(X){bc+=K+T;
this._renderSeparator(X,{left:bc,top:0,width:bb,height:F});
bc+=bb+T+G.getMarginLeft();
}else{bc+=U.collapseMargins(T,K,G.getMarginLeft());
}}G.renderLayout(bc,top,R,H);
bc+=R;
K=G.getMarginRight();
}},_computeSizeHint:function(){if(this._invalidChildrenCache){this.__mn();
}var bj=qx.ui.layout.Util;
var br=this.__mm;
var bd=0,bk=0,bh=0;
var bg=0,bi=0;
var bo,be,bq;
for(var i=0,l=br.length;i<l;i+=1){bo=br[i];
be=bo.getSizeHint();
bk+=be.width;
var bn=this.__mk[i];
var bf=this.__mj[i];

if(bn){bd+=be.minWidth;
}else if(bf){bh=Math.max(bh,Math.round(be.minWidth/bf));
}else{bd+=be.width;
}bq=bo.getMarginTop()+bo.getMarginBottom();
if((be.height+bq)>bi){bi=be.height+bq;
}if((be.minHeight+bq)>bg){bg=be.minHeight+bq;
}}bd+=bh;
var bm=this.getSpacing();
var bp=this.getSeparator();

if(bp){var bl=bj.computeHorizontalSeparatorGaps(br,bm,bp);
}else{var bl=bj.computeHorizontalGaps(br,bm,true);
}return {minWidth:bd+bl,width:bk+bl,minHeight:bg,height:bi};
}},destruct:function(){this.__mj=this.__mk=this.__mm=null;
}});
})();
(function(){var u="px",t="horizontal",s="top",r="height",q="width",p="100%",o="left",n="cursor",m="mshtml",l="repeat",e="_applyOrientation",k="url(",h="qx.ui.splitpane.Blocker",c=")",b="col-resize",g="row-resize",f="qx.client",i="div",a="vertical",j="qx/static/blank.gif",d="absolute";
qx.Class.define(h,{extend:qx.html.Element,construct:function(v){var w={position:d,zIndex:11};
if(qx.core.Variant.isSet(f,m)){w.backgroundImage=k+qx.util.ResourceManager.getInstance().toUri(j)+c;
w.backgroundRepeat=l;
}qx.html.Element.call(this,i,w);
if(v){this.setOrientation(v);
}else{this.initOrientation();
}},properties:{orientation:{init:t,check:[t,a],apply:e}},members:{_applyOrientation:function(x,y){if(x==t){this.setStyle(r,p);
this.setStyle(n,b);
this.setStyle(s,null);
}else{this.setStyle(q,p);
this.setStyle(o,null);
this.setStyle(n,g);
}},setWidth:function(z,A){var B=A+2*z;
this.setStyle(q,B+u);
},setHeight:function(C,D){var E=D+2*C;
this.setStyle(r,E+u);
},setLeft:function(F,G){var H=G-F;
this.setStyle(o,H+u);
},setTop:function(I,J){var top=J-I;
this.setStyle(s,top+u);
}}});
})();
(function(){var h="slider",g="type",f="flex",e="splitter",d="qx.ui.splitpane.VLayout",c="qx.debug",b="' is not supported by the split layout!",a="The property '";
qx.Class.define(d,{extend:qx.ui.layout.Abstract,members:{verifyLayoutProperty:qx.core.Variant.select(c,{"on":function(j,name,k){this.assert(name===g||name===f,a+name+b);

if(name==f){this.assertNumber(k);
}
if(name==g){this.assertString(k);
}},"off":null}),renderLayout:function(l,m){var C=this._getLayoutChildren();
var length=C.length;
var y,B;
var o,n,w,p;

for(var i=0;i<length;i++){y=C[i];
B=y.getLayoutProperties().type;

if(B===e){n=y;
}else if(B===h){w=y;
}else if(!o){o=y;
}else{p=y;
}}
if(o&&p){var E=o.getLayoutProperties().flex;
var r=p.getLayoutProperties().flex;

if(E==null){E=1;
}
if(r==null){r=1;
}var D=o.getSizeHint();
var u=n.getSizeHint();
var v=p.getSizeHint();
var q=D.height;
var z=u.height;
var A=v.height;

if(E>0&&r>0){var s=E+r;
var t=m-z;
var q=Math.round((t/s)*E);
var A=t-q;
var x=qx.ui.layout.Util.arrangeIdeals(D.minHeight,q,D.maxHeight,v.minHeight,A,v.maxHeight);
q=x.begin;
A=x.end;
}else if(E>0){q=m-z-A;

if(q<D.minHeight){q=D.minHeight;
}
if(q>D.maxHeight){q=D.maxHeight;
}}else if(r>0){A=m-q-z;

if(A<v.minHeight){A=v.minHeight;
}
if(A>v.maxHeight){A=v.maxHeight;
}}o.renderLayout(0,0,l,q);
n.renderLayout(0,q,l,z);
p.renderLayout(0,q+z,l,A);
}else{n.renderLayout(0,0,0,0);
if(o){o.renderLayout(0,0,l,m);
}else if(p){p.renderLayout(0,0,l,m);
}}},_computeSizeHint:function(){var O=this._getLayoutChildren();
var length=O.length;
var H,G,N;
var I=0,K=0,J=0;
var L=0,M=0,F=0;

for(var i=0;i<length;i++){H=O[i];
N=H.getLayoutProperties();
if(N.type===h){continue;
}G=H.getSizeHint();
I+=G.minHeight;
K+=G.height;
J+=G.maxHeight;

if(G.minWidth>L){L=G.minWidth;
}
if(G.width>M){M=G.width;
}
if(G.maxWidth>F){F=G.maxWidth;
}}return {minHeight:I,height:K,maxHeight:J,minWidth:L,width:M,maxWidth:F};
}}});
})();
(function(){var h="slider",g="type",f="flex",e="splitter",d="qx.ui.splitpane.HLayout",c="' is not supported by the split layout!",b="The property '",a="qx.debug";
qx.Class.define(d,{extend:qx.ui.layout.Abstract,members:{verifyLayoutProperty:qx.core.Variant.select(a,{"on":function(j,name,k){this.assert(name===g||name===f,b+name+c);

if(name==f){this.assertNumber(k);
}
if(name==g){this.assertString(k);
}},"off":null}),renderLayout:function(l,m){var C=this._getLayoutChildren();
var length=C.length;
var z,B;
var o,n,w,p;

for(var i=0;i<length;i++){z=C[i];
B=z.getLayoutProperties().type;

if(B===e){n=z;
}else if(B===h){w=z;
}else if(!o){o=z;
}else{p=z;
}}
if(o&&p){var E=o.getLayoutProperties().flex;
var q=p.getLayoutProperties().flex;

if(E==null){E=1;
}
if(q==null){q=1;
}var D=o.getSizeHint();
var t=n.getSizeHint();
var v=p.getSizeHint();
var A=D.width;
var y=t.width;
var x=v.width;

if(E>0&&q>0){var r=E+q;
var s=l-y;
var A=Math.round((s/r)*E);
var x=s-A;
var u=qx.ui.layout.Util.arrangeIdeals(D.minWidth,A,D.maxWidth,v.minWidth,x,v.maxWidth);
A=u.begin;
x=u.end;
}else if(E>0){A=l-y-x;

if(A<D.minWidth){A=D.minWidth;
}
if(A>D.maxWidth){A=D.maxWidth;
}}else if(q>0){x=l-A-y;

if(x<v.minWidth){x=v.minWidth;
}
if(x>v.maxWidth){x=v.maxWidth;
}}o.renderLayout(0,0,A,m);
n.renderLayout(A,0,y,m);
p.renderLayout(A+y,0,x,m);
}else{n.renderLayout(0,0,0,0);
if(o){o.renderLayout(0,0,l,m);
}else if(p){p.renderLayout(0,0,l,m);
}}},_computeSizeHint:function(){var O=this._getLayoutChildren();
var length=O.length;
var H,G,N;
var L=0,M=0,F=0;
var I=0,K=0,J=0;

for(var i=0;i<length;i++){H=O[i];
N=H.getLayoutProperties();
if(N.type===h){continue;
}G=H.getSizeHint();
L+=G.minWidth;
M+=G.width;
F+=G.maxWidth;

if(G.minHeight>I){I=G.minHeight;
}
if(G.height>K){K=G.height;
}
if(G.maxHeight>J){J=G.maxHeight;
}}return {minWidth:L,width:M,maxWidth:F,minHeight:I,height:K,maxHeight:J};
}}});
})();
(function(){var m="qx.dynlocale",l="Boolean",k="changeLocale",j="changeInvalidMessage",i="on",h="String",g="invalid",f="",d="qx.ui.form.MForm",c="_applyValid",a="changeRequired",b="changeValid";
qx.Mixin.define(d,{construct:function(){if(qx.core.Variant.isSet(m,i)){qx.locale.Manager.getInstance().addListener(k,this.__js,this);
}},properties:{valid:{check:l,init:true,apply:c,event:b},required:{check:l,init:false,event:a},invalidMessage:{check:h,init:f,event:j},requiredInvalidMessage:{check:h,nullable:true,event:j}},members:{_applyValid:function(n,o){n?this.removeState(g):this.addState(g);
},__js:qx.core.Variant.select(m,{"on":function(e){var p=this.getInvalidMessage();

if(p&&p.translate){this.setInvalidMessage(p.translate());
}var q=this.getRequiredInvalidMessage();

if(q&&q.translate){this.setRequiredInvalidMessage(q.translate());
}},"off":null})},destruct:function(){if(qx.core.Variant.isSet(m,i)){qx.locale.Manager.getInstance().removeListener(k,this.__js,this);
}}});
})();
(function(){var k="showingPlaceholder",j="",i="none",h="qx.client",g="qx.dynlocale",f="Boolean",d="gecko",c="color",b="qx.event.type.Data",a="readonly",bd="placeholder",bc="input",bb="focusin",ba="visibility",Y="focusout",X="changeLocale",W="hidden",V="on",U="absolute",T="readOnly",r="text",s="_applyTextAlign",p="px",q="RegExp",n=")",o="syncAppearance",l="changeValue",m="A",v="change",w="textAlign",E="focused",C="center",L="visible",G="disabled",P="url(",N="off",y="String",S="resize",R="qx.ui.form.AbstractField",Q="transparent",x="spellcheck",A="false",B="right",D="PositiveInteger",F="mshtml",H="abstract",M="block",O="webkit",t="_applyReadOnly",u="_applyPlaceholder",z="left",K="qx/static/blank.gif",J="text-placeholder",I="changeReadOnly";
qx.Class.define(R,{extend:qx.ui.core.Widget,implement:[qx.ui.form.IStringForm,qx.ui.form.IForm],include:[qx.ui.form.MForm],type:H,construct:function(be){qx.ui.core.Widget.call(this);
this.__mT=!qx.bom.client.Feature.PLACEHOLDER||(qx.bom.client.Engine.NAME==d&&qx.bom.client.Engine.VERSION==2.0);

if(be!=null){this.setValue(be);
}this.getContentElement().addListener(v,this._onChangeContent,this);
if(this.__mT){this.addListener(o,this._syncPlaceholder,this);
}if(qx.core.Variant.isSet(g,V)){qx.locale.Manager.getInstance().addListener(X,this._onChangeLocale,this);
}},events:{"input":b,"changeValue":b},properties:{textAlign:{check:[z,C,B],nullable:true,themeable:true,apply:s},readOnly:{check:f,apply:t,event:I,init:false},selectable:{refine:true,init:true},focusable:{refine:true,init:true},maxLength:{check:D,init:Infinity},liveUpdate:{check:f,init:false},placeholder:{check:y,nullable:true,apply:u},filter:{check:q,nullable:true,init:null}},members:{__mU:true,__mV:null,__mW:null,__mX:null,__mT:true,getFocusElement:function(){var bf=this.getContentElement();

if(bf){return bf;
}},_createInputElement:function(){return new qx.html.Input(r);
},renderLayout:function(bg,top,bh,bi){var bj=this._updateInsets;
var bn=qx.ui.core.Widget.prototype.renderLayout.call(this,bg,top,bh,bi);
if(!bn){return;
}var bl=bn.size||bj;
var bo=p;

if(bl||bn.local||bn.margin){var bk=this.getInsets();
var innerWidth=bh-bk.left-bk.right;
var innerHeight=bi-bk.top-bk.bottom;
innerWidth=innerWidth<0?0:innerWidth;
innerHeight=innerHeight<0?0:innerHeight;
}var bm=this.getContentElement();
if(bj&&this.__mT){this.__nb().setStyles({"left":bk.left+bo,"top":bk.top+bo});
}
if(bl){if(this.__mT){this.__nb().setStyles({"width":innerWidth+bo,"height":innerHeight+bo});
}bm.setStyles({"width":innerWidth+bo,"height":innerHeight+bo});
this._renderContentElement(innerHeight,bm);
}},_renderContentElement:function(innerHeight,bp){},_createContentElement:function(){var bq=this._createInputElement();
bq.setStyles({"border":i,"padding":0,"margin":0,"display":M,"background":Q,"outline":i,"appearance":i,"position":U,"autoComplete":N});
bq.setSelectable(this.getSelectable());
bq.setEnabled(this.getEnabled());
bq.addListener(bc,this._onHtmlInput,this);
bq.setAttribute(x,A);
if(qx.core.Variant.isSet(h,O)||qx.core.Variant.isSet(h,d)){bq.setStyle(S,i);
}if(qx.core.Variant.isSet(h,F)){bq.setStyles({backgroundImage:P+qx.util.ResourceManager.getInstance().toUri(K)+n});
}return bq;
},_applyEnabled:function(br,bs){qx.ui.core.Widget.prototype._applyEnabled.call(this,br,bs);
this.getContentElement().setEnabled(br);

if(this.__mT){if(br){this._showPlaceholder();
}else{this._removePlaceholder();
}}else{var bt=this.getContentElement();
bt.setAttribute(bd,br?this.getPlaceholder():j);
}},__mY:{width:16,height:16},_getContentHint:function(){return {width:this.__mY.width*10,height:this.__mY.height||16};
},_applyFont:function(bu,bv){var bw;

if(bu){var bx=qx.theme.manager.Font.getInstance().resolve(bu);
bw=bx.getStyles();
}else{bw=qx.bom.Font.getDefaultStyles();
}this.getContentElement().setStyles(bw);
if(this.__mT){this.__nb().setStyles(bw);
}if(bu){this.__mY=qx.bom.Label.getTextSize(m,bw);
}else{delete this.__mY;
}qx.ui.core.queue.Layout.add(this);
},_applyTextColor:function(by,bz){if(by){this.getContentElement().setStyle(c,qx.theme.manager.Color.getInstance().resolve(by));
}else{this.getContentElement().removeStyle(c);
}},tabFocus:function(){qx.ui.core.Widget.prototype.tabFocus.call(this);
this.selectAllText();
},_getTextSize:function(){return this.__mY;
},_onHtmlInput:function(e){var bD=e.getData();
var bC=true;
this.__mU=false;
if(this.getFilter()!=null){var bE=j;
var bA=bD.search(this.getFilter());
var bB=bD;

while(bA>=0){bE=bE+(bB.charAt(bA));
bB=bB.substring(bA+1,bB.length);
bA=bB.search(this.getFilter());
}
if(bE!=bD){bC=false;
bD=bE;
this.getContentElement().setValue(bD);
}}if(bD.length>this.getMaxLength()){var bC=false;
this.getContentElement().setValue(bD.substr(0,this.getMaxLength()));
}if(bC){this.fireDataEvent(bc,bD,this.__mX);
this.__mX=bD;
if(this.getLiveUpdate()){this.__na(bD);
}}},__na:function(bF){var bG=this.__mW;
this.__mW=bF;

if(bG!=bF){this.fireNonBubblingEvent(l,qx.event.type.Data,[bF,bG]);
}},setValue:function(bH){if(bH===null){if(this.__mU){return bH;
}bH=j;
this.__mU=true;
}else{this.__mU=false;
if(this.__mT){this._removePlaceholder();
}}
if(qx.lang.Type.isString(bH)){var bJ=this.getContentElement();

if(bH.length>this.getMaxLength()){bH=bH.substr(0,this.getMaxLength());
}
if(bJ.getValue()!=bH){var bK=bJ.getValue();
bJ.setValue(bH);
var bI=this.__mU?null:bH;
this.__mW=bK;
this.__na(bI);
}if(this.__mT){this._showPlaceholder();
}return bH;
}throw new Error("Invalid value type: "+bH);
},getValue:function(){var bL=this.getContentElement().getValue();
return this.__mU?null:bL;
},resetValue:function(){this.setValue(null);
},_onChangeContent:function(e){this.__mU=e.getData()===null;
this.__na(e.getData());
},getTextSelection:function(){return this.getContentElement().getTextSelection();
},getTextSelectionLength:function(){return this.getContentElement().getTextSelectionLength();
},getTextSelectionStart:function(){return this.getContentElement().getTextSelectionStart();
},getTextSelectionEnd:function(){return this.getContentElement().getTextSelectionEnd();
},setTextSelection:function(bM,bN){this.getContentElement().setTextSelection(bM,bN);
},clearTextSelection:function(){this.getContentElement().clearTextSelection();
},selectAllText:function(){this.setTextSelection(0);
},_showPlaceholder:function(){var bP=this.getValue()||j;
var bO=this.getPlaceholder();

if(bO!=null&&bP==j&&!this.hasState(E)&&!this.hasState(G)){if(this.hasState(k)){this._syncPlaceholder();
}else{this.addState(k);
}}},_removePlaceholder:function(){if(this.hasState(k)){this.__nb().setStyle(ba,W);
this.removeState(k);
}},_syncPlaceholder:function(){if(this.hasState(k)){this.__nb().setStyle(ba,L);
}},__nb:function(){if(this.__mV==null){this.__mV=new qx.html.Label();
var bQ=qx.theme.manager.Color.getInstance();
this.__mV.setStyles({"visibility":W,"zIndex":6,"position":U,"color":bQ.resolve(J)});
this.getContainerElement().add(this.__mV);
}return this.__mV;
},_onChangeLocale:qx.core.Variant.select(g,{"on":function(e){var content=this.getPlaceholder();

if(content&&content.translate){this.setPlaceholder(content.translate());
}},"off":null}),_applyPlaceholder:function(bR,bS){if(this.__mT){this.__nb().setValue(bR);

if(bR!=null){this.addListener(bb,this._removePlaceholder,this);
this.addListener(Y,this._showPlaceholder,this);
this._showPlaceholder();
}else{this.removeListener(bb,this._removePlaceholder,this);
this.removeListener(Y,this._showPlaceholder,this);
this._removePlaceholder();
}}else{if(this.getEnabled()){this.getContentElement().setAttribute(bd,bR);
}}},_applyTextAlign:function(bT,bU){this.getContentElement().setStyle(w,bT);
},_applyReadOnly:function(bV,bW){var bX=this.getContentElement();
bX.setAttribute(T,bV);

if(bV){this.addState(a);
this.setFocusable(false);
}else{this.removeState(a);
this.setFocusable(true);
}}},destruct:function(){this.__mV=null;

if(qx.core.Variant.isSet(g,V)){qx.locale.Manager.getInstance().removeListener(X,this._onChangeLocale,this);
}}});
})();
(function(){var e='px',d="mshtml",c="qx.ui.form.TextField",b="qx.client",a="textfield";
qx.Class.define(c,{extend:qx.ui.form.AbstractField,properties:{appearance:{refine:true,init:a},allowGrowY:{refine:true,init:false},allowShrinkY:{refine:true,init:false}},members:{_renderContentElement:function(innerHeight,f){if(qx.core.Variant.isSet(b,d)&&qx.bom.client.Engine.VERSION<9){f.setStyles({"line-height":innerHeight+e});
}}}});
})();
(function(){var n="wrap",m="value",l="textarea",k="none",j="qx.client",i="",h="overflow",g="input",f="qx.html.Input",e="select",b="disabled",d="read-only",c="overflowX",a="overflowY";
qx.Class.define(f,{extend:qx.html.Element,construct:function(o,p,q){if(o===e||o===l){var r=o;
}else{r=g;
}qx.html.Element.call(this,r,p,q);
this.__nc=o;
},members:{__nc:null,__nd:null,__ne:null,_createDomElement:function(){return qx.bom.Input.create(this.__nc);
},_applyProperty:function(name,s){qx.html.Element.prototype._applyProperty.call(this,name,s);
var t=this.getDomElement();

if(name===m){qx.bom.Input.setValue(t,s);
}else if(name===n){qx.bom.Input.setWrap(t,s);
this.setStyle(h,t.style.overflow,true);
this.setStyle(c,t.style.overflowX,true);
this.setStyle(a,t.style.overflowY,true);
}},setEnabled:qx.core.Variant.select(j,{"webkit":function(u){this.__ne=u;

if(!u){this.setStyles({"userModify":d,"userSelect":k});
}else{this.setStyles({"userModify":null,"userSelect":this.__nd?null:k});
}},"default":function(v){this.setAttribute(b,v===false);
}}),setSelectable:qx.core.Variant.select(j,{"webkit":function(w){this.__nd=w;
qx.html.Element.prototype.setSelectable.call(this,this.__ne&&w);
},"default":function(x){qx.html.Element.prototype.setSelectable.call(this,x);
}}),setValue:function(y){var z=this.getDomElement();

if(z){if(z.value!=y){qx.bom.Input.setValue(z,y);
}}else{this._setProperty(m,y);
}return this;
},getValue:function(){var A=this.getDomElement();

if(A){return qx.bom.Input.getValue(A);
}return this._getProperty(m)||i;
},setWrap:function(B){if(this.__nc===l){this._setProperty(n,B);
}else{throw new Error("Text wrapping is only support by textareas!");
}return this;
},getWrap:function(){if(this.__nc===l){return this._getProperty(n);
}else{throw new Error("Text wrapping is only support by textareas!");
}}}});
})();
(function(){var x="input",w="change",v="qx.client",u="text",t="password",s="checkbox",r="radio",q="textarea",p="keypress",n="opera",d="keyup",m="propertychange",h="mshtml",c="blur",b="keydown",g="select-multiple",f="checked",j="value",a="select",k="qx.event.handler.Input";
qx.Class.define(k,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(){qx.core.Object.call(this);
this._onChangeCheckedWrapper=qx.lang.Function.listener(this._onChangeChecked,this);
this._onChangeValueWrapper=qx.lang.Function.listener(this._onChangeValue,this);
this._onInputWrapper=qx.lang.Function.listener(this._onInput,this);
this._onPropertyWrapper=qx.lang.Function.listener(this._onProperty,this);
if(qx.core.Variant.isSet(v,n)){this._onKeyDownWrapper=qx.lang.Function.listener(this._onKeyDown,this);
this._onKeyUpWrapper=qx.lang.Function.listener(this._onKeyUp,this);
this._onBlurWrapper=qx.lang.Function.listener(this._onBlur,this);
}},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{input:1,change:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:false},members:{__nf:false,__ng:null,__nh:null,__ni:null,canHandleEvent:function(y,z){var A=y.tagName.toLowerCase();

if(z===x&&(A===x||A===q)){return true;
}
if(z===w&&(A===x||A===q||A===a)){return true;
}return false;
},registerEvent:function(B,C,D){if(qx.bom.client.Engine.MSHTML&&qx.bom.client.Engine.VERSION<9&&qx.bom.client.Engine.DOCUMENT_MODE<9){if(!B.__nj){var E=B.tagName.toLowerCase();
var F=B.type;

if(F===u||F===t||E===q||F===s||F===r){qx.bom.Event.addNativeListener(B,m,this._onPropertyWrapper);
}
if(F!==s&&F!==r){qx.bom.Event.addNativeListener(B,w,this._onChangeValueWrapper);
}
if(F===u||F===t){this._onKeyPressWrapped=qx.lang.Function.listener(this._onKeyPress,this,B);
qx.bom.Event.addNativeListener(B,p,this._onKeyPressWrapped);
}B.__nj=true;
}}else{if(C===x){this.__nk(B);
}else if(C===w){if(B.type===r||B.type===s){qx.bom.Event.addNativeListener(B,w,this._onChangeCheckedWrapper);
}else{qx.bom.Event.addNativeListener(B,w,this._onChangeValueWrapper);
}if(qx.core.Variant.isSet(v,n)||qx.core.Variant.isSet(v,h)){if(B.type===u||B.type===t){this._onKeyPressWrapped=qx.lang.Function.listener(this._onKeyPress,this,B);
qx.bom.Event.addNativeListener(B,p,this._onKeyPressWrapped);
}}}}},__nk:qx.core.Variant.select(v,{"mshtml":function(G){if(qx.bom.client.Engine.VERSION>=9&&qx.bom.client.Engine.DOCUMENT_MODE>=9){qx.bom.Event.addNativeListener(G,x,this._onInputWrapper);

if(G.type===u||G.type===t){this._inputFixWrapper=qx.lang.Function.listener(this._inputFix,this,G);
qx.bom.Event.addNativeListener(G,d,this._inputFixWrapper);
}}},"webkit":function(H){var I=H.tagName.toLowerCase();
if(qx.bom.client.Engine.VERSION<532&&I==q){qx.bom.Event.addNativeListener(H,p,this._onInputWrapper);
}qx.bom.Event.addNativeListener(H,x,this._onInputWrapper);
},"opera":function(J){qx.bom.Event.addNativeListener(J,d,this._onKeyUpWrapper);
qx.bom.Event.addNativeListener(J,b,this._onKeyDownWrapper);
qx.bom.Event.addNativeListener(J,c,this._onBlurWrapper);
qx.bom.Event.addNativeListener(J,x,this._onInputWrapper);
},"default":function(K){qx.bom.Event.addNativeListener(K,x,this._onInputWrapper);
}}),unregisterEvent:function(L,M){if(qx.bom.client.Engine.MSHTML&&qx.bom.client.Engine.VERSION<9&&qx.bom.client.Engine.DOCUMENT_MODE<9){if(L.__nj){var N=L.tagName.toLowerCase();
var O=L.type;

if(O===u||O===t||N===q||O===s||O===r){qx.bom.Event.removeNativeListener(L,m,this._onPropertyWrapper);
}
if(O!==s&&O!==r){qx.bom.Event.removeNativeListener(L,w,this._onChangeValueWrapper);
}
if(O===u||O===t){qx.bom.Event.removeNativeListener(L,p,this._onKeyPressWrapped);
}
try{delete L.__nj;
}catch(P){L.__nj=null;
}}}else{if(M===x){this.__nl(L);
}else if(M===w){if(L.type===r||L.type===s){qx.bom.Event.removeNativeListener(L,w,this._onChangeCheckedWrapper);
}else{qx.bom.Event.removeNativeListener(L,w,this._onChangeValueWrapper);
}}
if(qx.core.Variant.isSet(v,n)||qx.core.Variant.isSet(v,h)){if(L.type===u||L.type===t){qx.bom.Event.removeNativeListener(L,p,this._onKeyPressWrapped);
}}}},__nl:qx.core.Variant.select(v,{"mshtml":function(Q){if(qx.bom.client.Engine.VERSION>=9&&qx.bom.client.Engine.DOCUMENT_MODE>=9){qx.bom.Event.removeNativeListener(Q,x,this._onInputWrapper);

if(Q.type===u||Q.type===t){qx.bom.Event.removeNativeListener(Q,d,this._inputFixWrapper);
}}},"webkit":function(R){var S=R.tagName.toLowerCase();
if(qx.bom.client.Engine.VERSION<532&&S==q){qx.bom.Event.removeNativeListener(R,p,this._onInputWrapper);
}qx.bom.Event.removeNativeListener(R,x,this._onInputWrapper);
},"opera":function(T){qx.bom.Event.removeNativeListener(T,d,this._onKeyUpWrapper);
qx.bom.Event.removeNativeListener(T,b,this._onKeyDownWrapper);
qx.bom.Event.removeNativeListener(T,c,this._onBlurWrapper);
qx.bom.Event.removeNativeListener(T,x,this._onInputWrapper);
},"default":function(U){qx.bom.Event.removeNativeListener(U,x,this._onInputWrapper);
}}),_onKeyPress:qx.core.Variant.select(v,{"mshtml|opera":function(e,V){if(e.keyCode===13){if(V.value!==this.__nh){this.__nh=V.value;
qx.event.Registration.fireEvent(V,w,qx.event.type.Data,[V.value]);
}}},"default":null}),_inputFix:qx.core.Variant.select(v,{"mshtml":function(e,W){if(e.keyCode===46||e.keyCode===8){if(W.value!==this.__ni){this.__ni=W.value;
qx.event.Registration.fireEvent(W,x,qx.event.type.Data,[W.value]);
}}},"default":null}),_onKeyDown:qx.core.Variant.select(v,{"opera":function(e){if(e.keyCode===13){this.__nf=true;
}},"default":null}),_onKeyUp:qx.core.Variant.select(v,{"opera":function(e){if(e.keyCode===13){this.__nf=false;
}},"default":null}),_onBlur:qx.core.Variant.select(v,{"opera":function(e){if(this.__ng){window.clearTimeout(this.__ng);
}},"default":null}),_onInput:qx.event.GlobalError.observeMethod(function(e){var Y=qx.bom.Event.getTarget(e);
var X=Y.tagName.toLowerCase();
if(!this.__nf||X!==x){if(qx.core.Variant.isSet(v,n)){this.__ng=window.setTimeout(function(){qx.event.Registration.fireEvent(Y,x,qx.event.type.Data,[Y.value]);
},0);
}else{qx.event.Registration.fireEvent(Y,x,qx.event.type.Data,[Y.value]);
}}}),_onChangeValue:qx.event.GlobalError.observeMethod(function(e){var bb=qx.bom.Event.getTarget(e);
var ba=bb.value;

if(bb.type===g){var ba=[];

for(var i=0,o=bb.options,l=o.length;i<l;i++){if(o[i].selected){ba.push(o[i].value);
}}}qx.event.Registration.fireEvent(bb,w,qx.event.type.Data,[ba]);
}),_onChangeChecked:qx.event.GlobalError.observeMethod(function(e){var bc=qx.bom.Event.getTarget(e);

if(bc.type===r){if(bc.checked){qx.event.Registration.fireEvent(bc,w,qx.event.type.Data,[bc.value]);
}}else{qx.event.Registration.fireEvent(bc,w,qx.event.type.Data,[bc.checked]);
}}),_onProperty:qx.core.Variant.select(v,{"mshtml":qx.event.GlobalError.observeMethod(function(e){var bd=qx.bom.Event.getTarget(e);
var be=e.propertyName;

if(be===j&&(bd.type===u||bd.type===t||bd.tagName.toLowerCase()===q)){if(!bd.$$inValueSet){qx.event.Registration.fireEvent(bd,x,qx.event.type.Data,[bd.value]);
}}else if(be===f){if(bd.type===s){qx.event.Registration.fireEvent(bd,w,qx.event.type.Data,[bd.checked]);
}else if(bd.checked){qx.event.Registration.fireEvent(bd,w,qx.event.type.Data,[bd.value]);
}}}),"default":function(){}})},defer:function(bf){qx.event.Registration.addHandler(bf);
}});
})();
(function(){var k="",j="select",h="qx.client",g="textarea",f="auto",e="soft",d="off",c="text",b="Unsupported input type.",a="nowrap",y="radio",x="qx.debug",w="input",v="option",u="value",t="number",s="qx.bom.Input",r="normal",q="mshtml",p="wrap",n="checkbox",o="select-one",m="on";
qx.Class.define(s,{statics:{__nm:{text:1,textarea:1,select:1,checkbox:1,radio:1,password:1,hidden:1,submit:1,image:1,file:1,search:1,reset:1,button:1},create:function(z,A,B){if(qx.core.Variant.isSet(x,m)){qx.core.Assert.assertKeyInMap(z,this.__nm,b);
}var A=A?qx.lang.Object.clone(A):{};
var C;

if(z===g||z===j){C=z;
}else{C=w;
A.type=z;
}return qx.bom.Element.create(C,A,B);
},setValue:function(D,E){var J=D.nodeName.toLowerCase();
var G=D.type;
var Array=qx.lang.Array;
var K=qx.lang.Type;

if(typeof E===t){E+=k;
}
if((G===n||G===y)){if(K.isArray(E)){D.checked=Array.contains(E,D.value);
}else{D.checked=D.value==E;
}}else if(J===j){var F=K.isArray(E);
var L=D.options;
var H,I;

for(var i=0,l=L.length;i<l;i++){H=L[i];
I=H.getAttribute(u);

if(I==null){I=H.text;
}H.selected=F?Array.contains(E,I):E==I;
}
if(F&&E.length==0){D.selectedIndex=-1;
}}else if((G===c||G===g)&&qx.core.Variant.isSet(h,q)){D.$$inValueSet=true;
D.value=E;
D.$$inValueSet=null;
}else{D.value=E;
}},getValue:function(M){var S=M.nodeName.toLowerCase();

if(S===v){return (M.attributes.value||{}).specified?M.value:M.text;
}
if(S===j){var N=M.selectedIndex;
if(N<0){return null;
}var T=[];
var V=M.options;
var U=M.type==o;
var R=qx.bom.Input;
var Q;
for(var i=U?N:0,P=U?N+1:V.length;i<P;i++){var O=V[i];

if(O.selected){Q=R.getValue(O);
if(U){return Q;
}T.push(Q);
}}return T;
}else{return (M.value||k).replace(/\r/g,k);
}},setWrap:qx.core.Variant.select(h,{"mshtml":function(W,X){var ba=X?e:d;
var Y=X?f:k;
W.wrap=ba;
W.style.overflowY=Y;
},"gecko|webkit":function(bb,bc){var be=bc?e:d;
var bd=bc?k:f;
bb.setAttribute(p,be);
bb.style.overflow=bd;
},"default":function(bf,bg){bf.style.whiteSpace=bg?r:a;
}})}});
})();
(function(){var b="qx.ui.core.ISingleSelection",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"changeSelection":a},members:{getSelection:function(){return true;
},setSelection:function(c){return arguments.length==1;
},resetSelection:function(){return true;
},isSelected:function(d){return arguments.length==1;
},isSelectionEmpty:function(){return true;
},getSelectables:function(e){return arguments.length==1;
}}});
})();
(function(){var f="qx.ui.core.MSingleSelectionHandling",d="__jx",c="changeSelection",b="changeSelected",a="qx.event.type.Data";
qx.Mixin.define(f,{events:{"changeSelection":a},members:{__jx:null,getSelection:function(){var g=this.__jy().getSelected();

if(g){return [g];
}else{return [];
}},setSelection:function(h){switch(h.length){case 0:this.resetSelection();
break;
case 1:this.__jy().setSelected(h[0]);
break;
default:throw new Error("Could only select one item, but the selection"+" array contains "+h.length+" items!");
}},resetSelection:function(){this.__jy().resetSelected();
},isSelected:function(i){return this.__jy().isSelected(i);
},isSelectionEmpty:function(){return this.__jy().isSelectionEmpty();
},getSelectables:function(j){return this.__jy().getSelectables(j);
},_onChangeSelected:function(e){var l=e.getData();
var k=e.getOldData();
l==null?l=[]:l=[l];
k==null?k=[]:k=[k];
this.fireDataEvent(c,l,k);
},__jy:function(){if(this.__jx==null){var m=this;
this.__jx=new qx.ui.core.SingleSelectionManager({getItems:function(){return m._getItems();
},isItemSelectable:function(n){if(m._isItemSelectable){return m._isItemSelectable(n);
}else{return n.isVisible();
}}});
this.__jx.addListener(b,this._onChangeSelected,this);
}this.__jx.setAllowEmptySelection(this._isAllowEmptySelection());
return this.__jx;
}},destruct:function(){this._disposeObjects(d);
}});
})();
(function(){var d="_applyDynamic",c="changeSelection",b="Boolean",a="qx.ui.container.Stack";
qx.Class.define(a,{extend:qx.ui.core.Widget,implement:qx.ui.core.ISingleSelection,include:qx.ui.core.MSingleSelectionHandling,construct:function(){qx.ui.core.Widget.call(this);
this._setLayout(new qx.ui.layout.Grow);
this.addListener(c,this.__sw,this);
},properties:{dynamic:{check:b,init:false,apply:d}},members:{_applyDynamic:function(f){var h=this._getChildren();
var g=this.getSelection()[0];
var j;

for(var i=0,l=h.length;i<l;i++){j=h[i];

if(j!=g){if(f){h[i].exclude();
}else{h[i].hide();
}}}},_getItems:function(){return this.getChildren();
},_isAllowEmptySelection:function(){return true;
},_isItemSelectable:function(k){return true;
},__sw:function(e){var m=e.getOldData()[0];
var n=e.getData()[0];

if(m){if(this.isDynamic()){m.exclude();
}else{m.hide();
}}
if(n){n.show();
}},add:function(o){this._add(o);
var p=this.getSelection()[0];

if(!p){this.setSelection([o]);
}else if(p!==o){if(this.isDynamic()){o.exclude();
}else{o.hide();
}}},remove:function(q){this._remove(q);

if(this.getSelection()[0]===q){var r=this._getChildren()[0];

if(r){this.setSelection([r]);
}else{this.resetSelection();
}}},indexOf:function(s){return this._indexOf(s);
},getChildren:function(){return this._getChildren();
},previous:function(){var v=this.getSelection()[0];
var t=this._indexOf(v)-1;
var w=this._getChildren();

if(t<0){t=w.length-1;
}var u=w[t];
this.setSelection([u]);
},next:function(){var y=this.getSelection()[0];
var x=this._indexOf(y)+1;
var z=this._getChildren();
var A=z[x]||z[0];
this.setSelection([A]);
}}});
})();
(function(){var k="__jF",j="Boolean",h="qx.ui.core.SingleSelectionManager",g="qx.debug",f="__jG",e="Invalid selectionProvider!",d="__jE",c="changeSelected",b="on",a="qx.event.type.Data";
qx.Class.define(h,{extend:qx.core.Object,construct:function(l){qx.core.Object.call(this);

if(qx.core.Variant.isSet(g,b)){qx.core.Assert.assertInterface(l,qx.ui.core.ISingleSelectionProvider,e);
}this.__jE=l;
},events:{"changeSelected":a},properties:{allowEmptySelection:{check:j,init:true,apply:f}},members:{__jF:null,__jE:null,getSelected:function(){return this.__jF;
},setSelected:function(m){if(!this.__jI(m)){throw new Error("Could not select "+m+", because it is not a child element!");
}this.__jH(m);
},resetSelected:function(){this.__jH(null);
},isSelected:function(n){if(!this.__jI(n)){throw new Error("Could not check if "+n+" is selected,"+" because it is not a child element!");
}return this.__jF===n;
},isSelectionEmpty:function(){return this.__jF==null;
},getSelectables:function(o){var p=this.__jE.getItems();
var q=[];

for(var i=0;i<p.length;i++){if(this.__jE.isItemSelectable(p[i])){q.push(p[i]);
}}if(!o){for(var i=q.length-1;i>=0;i--){if(!q[i].getEnabled()){q.splice(i,1);
}}}return q;
},__jG:function(r,s){if(!r){this.__jH(this.__jF);
}},__jH:function(t){var w=this.__jF;
var v=t;

if(v!=null&&w===v){return;
}
if(!this.isAllowEmptySelection()&&v==null){var u=this.getSelectables(true)[0];

if(u){v=u;
}}this.__jF=v;
this.fireDataEvent(c,v,w);
},__jI:function(x){var y=this.__jE.getItems();

for(var i=0;i<y.length;i++){if(y[i]===x){return true;
}}return false;
}},destruct:function(){if(this.__jE.toHashCode){this._disposeObjects(d);
}else{this.__jE=null;
}this._disposeObjects(k);
}});
})();
(function(){var a="qx.ui.core.ISingleSelectionProvider";
qx.Interface.define(a,{members:{getItems:function(){},isItemSelectable:function(b){}}});
})();
(function(){var m="",l='#',k="String",j="request",i="mshtml",h="changeTitle",g="abstract",f="_applyState",e="qx.client",d="changeState",a="qx.bom.History",c="_applyTitle",b="qx.event.type.Data";
qx.Class.define(a,{extend:qx.core.Object,type:g,construct:function(){qx.core.Object.call(this);
this._baseUrl=window.location.href.split(l)[0]+l;
this.__tw={};
this._setInitialState();
},events:{"request":b},statics:{SUPPORTS_HASH_CHANGE_EVENT:(qx.bom.client.Engine.MSHTML&&document.documentMode>=8)||(!qx.bom.client.Engine.MSHTML&&document.documentMode&&"onhashchange" in window),getInstance:function(){if(!this.$$instance){if(this.SUPPORTS_HASH_CHANGE_EVENT){this.$$instance=new qx.bom.NativeHistory();
}else if(qx.core.Variant.isSet(e,i)){this.$$instance=new qx.bom.IframeHistory();
}else{this.$$instance=new qx.bom.NativeHistory();
}}return this.$$instance;
}},properties:{title:{check:k,event:h,nullable:true,apply:c},state:{check:k,event:d,nullable:true,apply:f}},members:{__tw:null,_applyState:function(n,o){this._writeState(n);
},_setInitialState:function(){this.setState(this._readState());
},_encode:function(p){if(qx.lang.Type.isString(p)){return encodeURIComponent(p);
}return m;
},_decode:function(q){if(qx.lang.Type.isString(q)){return decodeURIComponent(q);
}return m;
},_applyTitle:function(r){if(r!=null){document.title=r||m;
}},addToHistory:function(s,t){if(!qx.lang.Type.isString(s)){s=s+m;
}
if(qx.lang.Type.isString(t)){this.setTitle(t);
this.__tw[s]=t;
}
if(this.getState()!==s){this._writeState(s);
}},navigateBack:function(){qx.event.Timer.once(function(){history.back();
},0);
},navigateForward:function(){qx.event.Timer.once(function(){history.forward();
},0);
},_onHistoryLoad:function(u){this.setState(u);
this.fireDataEvent(j,u);

if(this.__tw[u]!=null){this.setTitle(this.__tw[u]);
}},_readState:function(){throw new Error("Abstract method call");
},_writeState:function(){throw new Error("Abstract method call");
},_setHash:function(v){var w=this._baseUrl+(v||m);
var x=window.location;

if(w!=x.href){x.href=w;
}},_getHash:function(){var y=/#(.*)$/.exec(window.location.href);
return y&&y[1]?y[1]:m;
}},destruct:function(){this.__tw=null;
}});
})();
(function(){var d="hashchange",c="interval",b="qx.bom.NativeHistory",a="qx.client";
qx.Class.define(b,{extend:qx.bom.History,construct:function(){qx.bom.History.call(this);
this.__ty();
},members:{__tx:null,__ty:function(){if(qx.bom.History.SUPPORTS_HASH_CHANGE_EVENT){this.__tx=qx.lang.Function.bind(this.__tA,this);
qx.bom.Event.addNativeListener(window,d,this.__tx);
}else{qx.event.Idle.getInstance().addListener(c,this.__tA,this);
}},__tz:function(){if(qx.bom.History.SUPPORTS_HASH_CHANGE_EVENT){qx.bom.Event.removeNativeListener(window,d,this.__tx);
}else{qx.event.Idle.getInstance().removeListener(c,this.__tA,this);
}},__tA:function(){var e=this._readState();

if(qx.lang.Type.isString(e)&&e!=this.getState()){this._onHistoryLoad(e);
}},_readState:function(){return this._decode(this._getHash());
},_writeState:qx.core.Variant.select(a,{"opera":function(f){qx.event.Timer.once(function(){this._setHash(this._encode(f));
},this,0);
},"default":function(g){this._setHash(this._encode(g));
}})},destruct:function(){this.__tz();
}});
})();
(function(){var n="interval",m="-1000px",l="mshtml",k="",j="qx.bom.IframeHistory",i="qx/static/blank.html",h="state",g='<html><body><div id="state">',f='</div></body></html>',d="hidden",a="qx.client",c="undefined",b="absolute";
if(qx.core.Variant.isSet(a,l)){qx.Class.define(j,{extend:qx.bom.History,construct:function(){qx.bom.History.call(this);
this.__tE();
},members:{__tB:null,__tC:false,__tD:null,_setInitialState:function(){qx.bom.History.prototype._setInitialState.call(this);
this.__tD=this._getHash();
},_setHash:function(o){qx.bom.History.prototype._setHash.call(this,o);
this.__tD=this._encode(o);
},_readState:function(){if(!this.__tC){return this._decode(this._getHash());
}var p=this.__tB.contentWindow.document;
var q=p.getElementById(h);
return q?this._decode(q.innerText):k;
},_writeState:function(r){var r=this._encode(r);
this._setHash(r);
this.__tD=r;

try{var s=this.__tB.contentWindow.document;
s.open();
s.write(g+r+f);
s.close();
}catch(t){}},__tE:function(){this.__tI(function(){qx.event.Idle.getInstance().addListener(n,this.__tF,this);
});
},__tF:function(e){var v=null;
var u=this._getHash();

if(!this.__tH(u)){v=this.__tG(u);
}else{v=this._readState();
}
if(qx.lang.Type.isString(v)&&v!=this.getState()){this._onHistoryLoad(v);
}},__tG:function(w){w=this._decode(w);
this._writeState(w);
return w;
},__tH:function(x){return qx.lang.Type.isString(x)&&x==this.__tD;
},__tI:function(y){this.__tB=this.__tJ();
document.body.appendChild(this.__tB);
this.__tK(function(){this._writeState(this.getState());

if(y){y.call(this);
}},this);
},__tJ:function(){var z=qx.bom.Iframe.create({src:qx.util.ResourceManager.getInstance().toUri(i)});
z.style.visibility=d;
z.style.position=b;
z.style.left=m;
z.style.top=m;
return z;
},__tK:function(A,B,C){if(typeof C===c){C=0;
}
if(!this.__tB.contentWindow||!this.__tB.contentWindow.document){if(C>20){throw new Error("can't initialize iframe");
}qx.event.Timer.once(function(){this.__tK(A,B,++C);
},this,10);
return;
}this.__tC=true;
A.call(B||window);
}},destruct:function(){this.__tB=null;
qx.event.Idle.getInstance().addListener(n,this.__tF,this);
}});
}})();
(function(){var d="qx.event.handler.Iframe",c="load",b="iframe",a="navigate";
qx.Class.define(d,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{load:1,navigate:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:false,onevent:qx.event.GlobalError.observeMethod(function(e){var f=qx.bom.Iframe.queryCurrentUrl(e);

if(f!==e.$$url){qx.event.Registration.fireEvent(e,a,qx.event.type.Data,[f]);
e.$$url=f;
}qx.event.Registration.fireEvent(e,c);
})},members:{canHandleEvent:function(g,h){return g.tagName.toLowerCase()===b;
},registerEvent:function(i,j,k){},unregisterEvent:function(l,m,n){}},defer:function(o){qx.event.Registration.addHandler(o);
}});
})();
(function(){var f="load",e="qx.client",d="qx.bom.Iframe",c="webkit",b="iframe",a="body";
qx.Class.define(d,{statics:{DEFAULT_ATTRIBUTES:{onload:"qx.event.handler.Iframe.onevent(this)",frameBorder:0,frameSpacing:0,marginWidth:0,marginHeight:0,hspace:0,vspace:0,border:0,allowTransparency:true},create:function(g,h){var g=g?qx.lang.Object.clone(g):{};
var i=qx.bom.Iframe.DEFAULT_ATTRIBUTES;

for(var j in i){if(g[j]==null){g[j]=i[j];
}}return qx.bom.Element.create(b,g,h);
},getWindow:function(k){try{return k.contentWindow;
}catch(l){return null;
}},getDocument:qx.core.Variant.select(e,{"mshtml":function(m){try{var n=this.getWindow(m);
return n?n.document:null;
}catch(o){return null;
}},"default":function(p){try{return p.contentDocument;
}catch(q){return null;
}}}),getBody:function(r){try{var s=this.getDocument(r);
return s?s.getElementsByTagName(a)[0]:null;
}catch(t){return null;
}},setSource:function(u,v){try{if(this.getWindow(u)&&qx.dom.Hierarchy.isRendered(u)){try{if(qx.core.Variant.isSet(e,c)&&qx.bom.client.Platform.MAC){var w=this.getContentWindow();

if(w){w.stop();
}}this.getWindow(u).location.replace(v);
}catch(x){u.src=v;
}}else{u.src=v;
}this.__so(u);
}catch(y){qx.log.Logger.warn("Iframe source could not be set!");
}},queryCurrentUrl:function(z){var A=this.getDocument(z);

try{if(A&&A.location){return A.location.href;
}}catch(B){}return null;
},__so:function(C){var D=function(){qx.bom.Event.removeNativeListener(C,f,D);
C.$$url=qx.bom.Iframe.queryCurrentUrl(C);
};
qx.bom.Event.addNativeListener(C,f,D);
}}});
})();
(function(){var o="String",n="execute",m="qx.ui.menu.Menu",l="_shortcut",k="changeEnabled",j="changeToolTipText",i="Boolean",h="qx.ui.core.Command",g="changeLabel",f="changeMenu",c="changeIcon",e="changeValue",d="_applyShortcut",b="_applyEnabled",a="qx.event.type.Data";
qx.Class.define(h,{extend:qx.core.Object,construct:function(p){qx.core.Object.call(this);
this._shortcut=new qx.bom.Shortcut(p);
this._shortcut.addListener(n,this.execute,this);
},events:{"execute":a},properties:{enabled:{init:true,check:i,event:k,apply:b},shortcut:{check:o,apply:d,nullable:true},label:{check:o,nullable:true,event:g},icon:{check:o,nullable:true,event:c},toolTipText:{check:o,nullable:true,event:j},value:{nullable:true,event:e},menu:{check:m,nullable:true,event:f}},members:{_shortcut:null,_applyEnabled:function(q){this._shortcut.setEnabled(q);
},_applyShortcut:function(r){this._shortcut.setShortcut(r);
},execute:function(s){this.fireDataEvent(n,s);
},toString:function(){return this._shortcut.toString();
}},destruct:function(){this._disposeObjects(l);
}});
})();
(function(){var m="Unidentified",l="Boolean",k="+",j="short",h="keydown",g="",f="Control",d="keypress",c="-",b="PageUp",S="Escape",R="qx.event.type.Data",Q="_applyShortcut",P="PrintScreen",O="NumLock",N="5",M="8",L="execute",K="Meta",J="0",t="2",u="Shift",r="You can only specify one non modifier key!",s="3",p="/",q="Delete",n="String",o="changeEnabled",v="*",w="qx.bom.Shortcut",B="6",A="4",D="1",C="Alt",F="Not a valid key name for a shortcut: ",E="PageDown",y="Whitespaces are not allowed within shortcuts",I="_applyEnabled",H="7",G="a",x="z",z="9";
qx.Class.define(w,{extend:qx.core.Object,construct:function(T){qx.core.Object.call(this);
this.__yc={};
this.__yd=null;

if(T!=null){this.setShortcut(T);
}this.initEnabled();
},events:{"execute":R},properties:{enabled:{init:true,check:l,event:o,apply:I},shortcut:{check:n,apply:Q,nullable:true},autoRepeat:{check:l,init:false}},members:{__yc:g,__yd:g,execute:function(U){this.fireDataEvent(L,U);
},__ye:function(event){if(this.getEnabled()&&this.__yg(event)){if(!this.isAutoRepeat()){this.execute(event.getTarget());
}event.stop();
}},__yf:function(event){if(this.getEnabled()&&this.__yg(event)){if(this.isAutoRepeat()){this.execute(event.getTarget());
}event.stop();
}},_applyEnabled:function(V,W){if(V){qx.event.Registration.addListener(document.documentElement,h,this.__ye,this);
qx.event.Registration.addListener(document.documentElement,d,this.__yf,this);
}else{qx.event.Registration.removeListener(document.documentElement,h,this.__ye,this);
qx.event.Registration.removeListener(document.documentElement,d,this.__yf,this);
}},_applyShortcut:function(X,Y){if(X){if(X.search(/[\s]+/)!=-1){var bc=y;
this.error(bc);
throw new Error(bc);
}this.__yc={"Control":false,"Shift":false,"Meta":false,"Alt":false};
this.__yd=null;
var ba;
var a=[];

while(X.length>0&&ba!=-1){ba=X.search(/[-+]+/);
a.push((X.length==1||ba==-1)?X:X.substring(0,ba));
X=X.substring(ba+1);
}var bb=a.length;

for(var i=0;i<bb;i++){var bd=this.__yi(a[i]);

switch(bd){case f:case u:case K:case C:this.__yc[bd]=true;
break;
case m:var bc=F+a[i];
this.error(bc);
throw bc;
default:if(this.__yd){var bc=r;
this.error(bc);
throw bc;
}this.__yd=bd;
}}}return true;
},__yg:function(e){var be=this.__yd;

if(!be){return ;
}if((!this.__yc.Shift&&e.isShiftPressed())||(this.__yc.Shift&&!e.isShiftPressed())||(!this.__yc.Control&&e.isCtrlPressed())||(this.__yc.Control&&!e.isCtrlPressed())||(!this.__yc.Meta&&e.isMetaPressed())||(this.__yc.Meta&&!e.isMetaPressed())||(!this.__yc.Alt&&e.isAltPressed())||(this.__yc.Alt&&!e.isAltPressed())){return false;
}
if(be==e.getKeyIdentifier()){return true;
}return false;
},__yh:{esc:S,ctrl:f,print:P,del:q,pageup:b,pagedown:E,numlock:O,numpad_0:J,numpad_1:D,numpad_2:t,numpad_3:s,numpad_4:A,numpad_5:N,numpad_6:B,numpad_7:H,numpad_8:M,numpad_9:z,numpad_divide:p,numpad_multiply:v,numpad_minus:c,numpad_plus:k},__yi:function(bf){var bg=qx.event.handler.Keyboard;
var bh=m;

if(bg.isValidKeyIdentifier(bf)){return bf;
}
if(bf.length==1&&bf>=G&&bf<=x){return bf.toUpperCase();
}bf=bf.toLowerCase();
var bh=this.__yh[bf]||qx.lang.String.firstUp(bf);

if(bg.isValidKeyIdentifier(bh)){return bh;
}else{return m;
}},toString:function(){var bk=this.__yd;
var bj=[];

for(var bi in this.__yc){if(this.__yc[bi]){bj.push(qx.locale.Key.getKeyName(j,bi));
}}
if(bk){bj.push(qx.locale.Key.getKeyName(j,bk));
}return bj.join(k);
}},destruct:function(){this.setEnabled(false);
this.__yc=this.__yd=null;
}});
})();
(function(){var bA="Control",bz="Left",by="Meta",bx="Pause",bw="End",bv="Down",bu="Ctrl",bt="Home",bs="Apps",br="Win",bg="Right",bf="Backspace",be="Space",bd="Up",bc="Shift",bb="Enter",ba="Scroll",Y="Alt",X="Escape",W="key_full_Meta",bH="PrintScreen",bI="NumLock",bF="key_short_Alt",bG="key_short_Control_Mac",bD="key_short_Insert",bE="Del",bB="key_full_Enter",bC="key_full_Control",bJ="qx.locale.Key",bK="Tabulator",bk="key_full_Space",bj="key_short_Meta",bm="key_short_PageUp",bl="key_short_Pause",bo="key_full_Down",bn="key_short_Apps",bq="key_short_Win",bp="key_full_Right",bi="key_short_Up",bh="key_full_PageDown",a="key_full_Alt",b="PgDn",c="Esc",d="key_full_Insert",e="key_short_Space",f="key_short_Backspace",g="key_short_Home",h="full",i="key_short_Down",j="PgUp",bO="_Mac",bN="key_short_CapsLock",bM="PageUp",bL="key_full_Up",bS="key_full_Home",bR="key_full_Backspace",bQ="PageDown",bP="CapsLock",bU="Ins",bT="key_short_PrintScreen",G="Tab",H="key_full_Apps",E="key_short_Tab",F="key_short_End",K="_",L="Caps",I="key_short_NumLock",J="Num",C="key_full_Scroll",D="key_short_Left",r="key_short_Scroll",q="on",t="key_full_Control_Mac",s="key_",n="key_full_Pause",m="key_short_Right",p="key_full_PrintScreen",o="key_full_Win",l="short",k="key_short_Shift",Q="key_short_PageDown",R="key_short_Enter",S="key_short_Control",T="qx.debug",M="Insert",N="key_short_Escape",O="key_full_Tab",P="Print",U="Delete",V="key_full_CapsLock",B="key_full_Escape",A="key_short_Delete",z="key_full_PageUp",y="key_full_Shift",x="key_full_NumLock",w="key_full_Delete",v="key_full_End",u="key_full_Left";
qx.Class.define(bJ,{statics:{getKeyName:function(bV,bW,bX){if(qx.core.Variant.isSet(T,q)){qx.core.Assert.assertInArray(bV,[l,h]);
}var ca=s+bV+K+bW;
if(qx.bom.client.Platform.MAC&&bW==bA){ca+=bO;
}var bY=qx.locale.Manager.getInstance().translate(ca,[],bX);

if(bY==ca){return qx.locale.Key._keyNames[ca]||bW;
}else{return bY;
}}},defer:function(cb){var cd={};
var cc=qx.locale.Manager;
cd[cc.marktr(f)]=bf;
cd[cc.marktr(E)]=G;
cd[cc.marktr(e)]=be;
cd[cc.marktr(R)]=bb;
cd[cc.marktr(k)]=bc;
cd[cc.marktr(S)]=bu;
cd[cc.marktr(bG)]=bu;
cd[cc.marktr(bF)]=Y;
cd[cc.marktr(bN)]=L;
cd[cc.marktr(bj)]=by;
cd[cc.marktr(N)]=c;
cd[cc.marktr(D)]=bz;
cd[cc.marktr(bi)]=bd;
cd[cc.marktr(m)]=bg;
cd[cc.marktr(i)]=bv;
cd[cc.marktr(bm)]=j;
cd[cc.marktr(Q)]=b;
cd[cc.marktr(F)]=bw;
cd[cc.marktr(g)]=bt;
cd[cc.marktr(bD)]=bU;
cd[cc.marktr(A)]=bE;
cd[cc.marktr(I)]=J;
cd[cc.marktr(bT)]=P;
cd[cc.marktr(r)]=ba;
cd[cc.marktr(bl)]=bx;
cd[cc.marktr(bq)]=br;
cd[cc.marktr(bn)]=bs;
cd[cc.marktr(bR)]=bf;
cd[cc.marktr(O)]=bK;
cd[cc.marktr(bk)]=be;
cd[cc.marktr(bB)]=bb;
cd[cc.marktr(y)]=bc;
cd[cc.marktr(bC)]=bA;
cd[cc.marktr(t)]=bA;
cd[cc.marktr(a)]=Y;
cd[cc.marktr(V)]=bP;
cd[cc.marktr(W)]=by;
cd[cc.marktr(B)]=X;
cd[cc.marktr(u)]=bz;
cd[cc.marktr(bL)]=bd;
cd[cc.marktr(bp)]=bg;
cd[cc.marktr(bo)]=bv;
cd[cc.marktr(z)]=bM;
cd[cc.marktr(bh)]=bQ;
cd[cc.marktr(v)]=bw;
cd[cc.marktr(bS)]=bt;
cd[cc.marktr(d)]=M;
cd[cc.marktr(w)]=U;
cd[cc.marktr(x)]=bI;
cd[cc.marktr(p)]=bH;
cd[cc.marktr(C)]=ba;
cd[cc.marktr(n)]=bx;
cd[cc.marktr(o)]=br;
cd[cc.marktr(H)]=bs;
cb._keyNames=cd;
}});
})();
(function(){var w="visible",v="excluded",u="resize",t="qx.event.type.Data",s="both",r="qx.ui.menu.Menu",q="_applySpacing",p="showItem",o="Boolean",n="icon",d="label",m="qx.ui.core.Widget",h="_applyOverflowIndicator",c="_applyOverflowHandling",b="changeShow",g="Integer",f="qx.ui.toolbar.ToolBar",j="hideItem",a="toolbar",k="changeOpenMenu";
qx.Class.define(f,{extend:qx.ui.core.Widget,include:qx.ui.core.MChildrenHandling,construct:function(){qx.ui.core.Widget.call(this);
this._setLayout(new qx.ui.layout.HBox());
this.__pI=[];
this.__pJ=[];
},properties:{appearance:{refine:true,init:a},openMenu:{check:r,event:k,nullable:true},show:{init:s,check:[s,d,n],inheritable:true,event:b},spacing:{nullable:true,check:g,themeable:true,apply:q},overflowIndicator:{check:m,nullable:true,apply:h},overflowHandling:{init:false,check:o,apply:c}},events:{"hideItem":t,"showItem":t},members:{__pI:null,__pJ:null,_computeSizeHint:function(){var z=qx.ui.core.Widget.prototype._computeSizeHint.call(this);

if(true&&this.getOverflowHandling()){var x=0;
var y=this.getOverflowIndicator();

if(y){x=y.getSizeHint().width+this.getSpacing();
}z.minWidth=x;
}return z;
},_onResize:function(e){this._recalculateOverflow(e.getData().width);
},_recalculateOverflow:function(A,B){if(!this.getOverflowHandling()){return;
}B=B||this.getSizeHint().width;
var C=this.getOverflowIndicator();
var I=0;

if(C){I=C.getSizeHint().width;
}
if(A==undefined&&this.getBounds()!=null){A=this.getBounds().width;
}if(A==undefined){return ;
}if(A<B){do{var J=this._getNextToHide();
if(!J){return;
}var L=J.getMarginLeft()+J.getMarginRight();
L=Math.max(L,this.getSpacing());
var G=J.getSizeHint().width+L;
this.__pL(J);
B-=G;
if(C&&C.getVisibility()!=w){C.setVisibility(w);
B+=I;
var E=C.getMarginLeft()+C.getMarginRight();
B+=Math.max(E,this.getSpacing());
}}while(B>A);
}else if(this.__pI.length>0){do{var M=this.__pI[0];
if(M){var L=M.getMarginLeft()+M.getMarginRight();
L=Math.max(L,this.getSpacing());
if(M.getDecoratorElement()==null){M.syncAppearance();
M.invalidateLayoutCache();
}var F=M.getSizeHint().width;
var K=false;
if(this.__pI.length==1&&I>0){var D=L-this.getSpacing();
var H=B-I+F+D;
K=A>H;
}if(A>B+F+L||K){this.__pK(M);
B+=F;
if(C&&this.__pI.length==0){C.setVisibility(v);
}}else{return;
}}}while(A>=B&&this.__pI.length>0);
}},__pK:function(N){N.setVisibility(w);
this.__pI.shift();
this.fireDataEvent(p,N);
},__pL:function(O){if(!O){return;
}this.__pI.unshift(O);
O.setVisibility(v);
this.fireDataEvent(j,O);
},_getNextToHide:function(){for(var i=this.__pJ.length-1;i>=0;i--){var P=this.__pJ[i];
if(P&&P.getVisibility&&P.getVisibility()==w){return P;
}}var Q=this._getChildren();

for(var i=Q.length-1;i>=0;i--){var R=Q[i];
if(R==this.getOverflowIndicator()){continue;
}if(R.getVisibility&&R.getVisibility()==w){return R;
}}},setRemovePriority:function(S,T,U){if(!U&&this.__pJ[T]!=undefined){throw new Error("Priority already in use!");
}this.__pJ[T]=S;
},_applyOverflowHandling:function(V,W){this.invalidateLayoutCache();
var parent=this.getLayoutParent();

if(parent){parent.invalidateLayoutCache();
}var Y=this.getBounds();

if(Y&&Y.width){this._recalculateOverflow(Y.width);
}if(V){this.addListener(u,this._onResize,this);
}else{this.removeListener(u,this._onResize,this);
var X=this.getOverflowIndicator();

if(X){X.setVisibility(v);
}for(var i=0;i<this.__pI.length;i++){this.__pI[i].setVisibility(w);
}this.__pI=[];
}},_applyOverflowIndicator:function(ba,bb){if(bb){this._remove(bb);
}
if(ba){if(this._indexOf(ba)==-1){throw new Error("Widget must be child of the toolbar.");
}ba.setVisibility(v);
}},__pM:false,_setAllowMenuOpenHover:function(bc){this.__pM=bc;
},_isAllowMenuOpenHover:function(){return this.__pM;
},_applySpacing:function(bd,be){var bf=this._getLayout();
bd==null?bf.resetSpacing():bf.setSpacing(bd);
},_add:function(bg,bh){qx.ui.core.Widget.prototype._add.call(this,bg,bh);
var bi=this.getSizeHint().width+bg.getSizeHint().width+2*this.getSpacing();
this._recalculateOverflow(null,bi);
},_addAt:function(bj,bk,bl){qx.ui.core.Widget.prototype._addAt.call(this,bj,bk,bl);
var bm=this.getSizeHint().width+bj.getSizeHint().width+2*this.getSpacing();
this._recalculateOverflow(null,bm);
},_addBefore:function(bn,bo,bp){qx.ui.core.Widget.prototype._addBefore.call(this,bn,bo,bp);
var bq=this.getSizeHint().width+bn.getSizeHint().width+2*this.getSpacing();
this._recalculateOverflow(null,bq);
},_addAfter:function(br,bs,bt){qx.ui.core.Widget.prototype._addAfter.call(this,br,bs,bt);
var bu=this.getSizeHint().width+br.getSizeHint().width+2*this.getSpacing();
this._recalculateOverflow(null,bu);
},_remove:function(bv){qx.ui.core.Widget.prototype._remove.call(this,bv);
var bw=this.getSizeHint().width-bv.getSizeHint().width-2*this.getSpacing();
this._recalculateOverflow(null,bw);
},_removeAt:function(bx){var bz=this._getChildren()[bx];
qx.ui.core.Widget.prototype._removeAt.call(this,bx);
var by=this.getSizeHint().width-bz.getSizeHint().width-2*this.getSpacing();
this._recalculateOverflow(null,by);
},_removeAll:function(){qx.ui.core.Widget.prototype._removeAll.call(this);
this._recalculateOverflow(null,0);
},addSpacer:function(){var bA=new qx.ui.core.Spacer;
this._add(bA,{flex:1});
return bA;
},addSeparator:function(){this.add(new qx.ui.toolbar.Separator);
},getMenuButtons:function(){var bC=this.getChildren();
var bB=[];
var bD;

for(var i=0,l=bC.length;i<l;i++){bD=bC[i];

if(bD instanceof qx.ui.menubar.Button){bB.push(bD);
}else if(bD instanceof qx.ui.toolbar.Part){bB.push.apply(bB,bD.getMenuButtons());
}}return bB;
}},destruct:function(){if(this.hasListener(u)){this.removeListener(u,this._onResize,this);
}}});
})();
(function(){var a="qx.ui.core.Spacer";
qx.Class.define(a,{extend:qx.ui.core.LayoutItem,construct:function(b,c){qx.ui.core.LayoutItem.call(this);
this.setWidth(b!=null?b:0);
this.setHeight(c!=null?c:0);
},members:{checkAppearanceNeeds:function(){},addChildrenToQueue:function(d){},destroy:function(){if(this.$$disposed){return;
}var parent=this.$$parent;

if(parent){parent._remove(this);
}qx.ui.core.queue.Dispose.add(this);
}}});
})();
(function(){var b="toolbar-separator",a="qx.ui.toolbar.Separator";
qx.Class.define(a,{extend:qx.ui.core.Widget,properties:{appearance:{refine:true,init:b},anonymous:{refine:true,init:true},width:{refine:true,init:0},height:{refine:true,init:0}}});
})();
(function(){var b="qx.ui.form.IExecutable",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"execute":a},members:{setCommand:function(c){return arguments.length==1;
},getCommand:function(){},execute:function(){}}});
})();
(function(){var n="execute",m="toolTipText",l="icon",k="label",j="qx.ui.core.MExecutable",h="value",g="qx.event.type.Event",f="_applyCommand",d="enabled",c="menu",a="changeCommand",b="qx.ui.core.Command";
qx.Mixin.define(j,{events:{"execute":g},properties:{command:{check:b,apply:f,event:a,nullable:true}},members:{__jo:null,__jp:false,__jq:null,_bindableProperties:[d,k,l,m,h,c],execute:function(){var o=this.getCommand();

if(o){if(this.__jp){this.__jp=false;
}else{this.__jp=true;
o.execute(this);
}}this.fireEvent(n);
},__jr:function(e){if(this.__jp){this.__jp=false;
return;
}this.__jp=true;
this.execute();
},_applyCommand:function(p,q){if(q!=null){q.removeListenerById(this.__jq);
}
if(p!=null){this.__jq=p.addListener(n,this.__jr,this);
}var t=this.__jo;

if(t==null){this.__jo=t={};
}var u;

for(var i=0;i<this._bindableProperties.length;i++){var s=this._bindableProperties[i];
if(q!=null&&t[s]!=null){try{q.removeBinding(t[s]);
}catch(v){}t[s]=null;
}if(p!=null&&qx.Class.hasProperty(this.constructor,s)){var r=p.get(s);

if(r==null){u=this.get(s);
}else{u=null;
}t[s]=p.bind(s,this,s);
if(u){this.set(s,u);
}}}}},destruct:function(){this._applyCommand(null,this.getCommand());
this.__jo=null;
}});
})();
(function(){var o="pressed",n="abandoned",m="hovered",l="Enter",k="Space",j="dblclick",i="qx.ui.form.Button",h="mouseup",g="mousedown",f="mouseover",b="mouseout",d="keydown",c="button",a="keyup";
qx.Class.define(i,{extend:qx.ui.basic.Atom,include:[qx.ui.core.MExecutable],implement:[qx.ui.form.IExecutable],construct:function(p,q,r){qx.ui.basic.Atom.call(this,p,q);

if(r!=null){this.setCommand(r);
}this.addListener(f,this._onMouseOver);
this.addListener(b,this._onMouseOut);
this.addListener(g,this._onMouseDown);
this.addListener(h,this._onMouseUp);
this.addListener(d,this._onKeyDown);
this.addListener(a,this._onKeyUp);
this.addListener(j,this._onStopEvent);
},properties:{appearance:{refine:true,init:c},focusable:{refine:true,init:true}},members:{_forwardStates:{focused:true,hovered:true,pressed:true,disabled:true},press:function(){if(this.hasState(n)){return;
}this.addState(o);
},release:function(){if(this.hasState(o)){this.removeState(o);
}},reset:function(){this.removeState(o);
this.removeState(n);
this.removeState(m);
},_onMouseOver:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}
if(this.hasState(n)){this.removeState(n);
this.addState(o);
}this.addState(m);
},_onMouseOut:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}this.removeState(m);

if(this.hasState(o)){this.removeState(o);
this.addState(n);
}},_onMouseDown:function(e){if(!e.isLeftPressed()){return;
}e.stopPropagation();
this.capture();
this.removeState(n);
this.addState(o);
},_onMouseUp:function(e){this.releaseCapture();
var s=this.hasState(o);
var t=this.hasState(n);

if(s){this.removeState(o);
}
if(t){this.removeState(n);
}else{this.addState(m);

if(s){this.execute();
}}e.stopPropagation();
},_onKeyDown:function(e){switch(e.getKeyIdentifier()){case l:case k:this.removeState(n);
this.addState(o);
e.stopPropagation();
}},_onKeyUp:function(e){switch(e.getKeyIdentifier()){case l:case k:if(this.hasState(o)){this.removeState(n);
this.removeState(o);
this.execute();
e.stopPropagation();
}}}}});
})();
(function(){var l="pressed",k="hovered",j="changeVisibility",i="qx.ui.menu.Menu",h="submenu",g="Enter",f="contextmenu",d="changeMenu",c="qx.ui.form.MenuButton",b="abandoned",a="_applyMenu";
qx.Class.define(c,{extend:qx.ui.form.Button,construct:function(m,n,o){qx.ui.form.Button.call(this,m,n);
if(o!=null){this.setMenu(o);
}},properties:{menu:{check:i,nullable:true,apply:a,event:d}},members:{_applyMenu:function(p,q){if(q){q.removeListener(j,this._onMenuChange,this);
q.resetOpener();
}
if(p){p.addListener(j,this._onMenuChange,this);
p.setOpener(this);
p.removeState(h);
p.removeState(f);
}},open:function(r){var s=this.getMenu();

if(s){qx.ui.menu.Manager.getInstance().hideAll();
s.setOpener(this);
s.open();
if(r){var t=s.getSelectables()[0];

if(t){s.setSelectedButton(t);
}}}},_onMenuChange:function(e){var u=this.getMenu();

if(u.isVisible()){this.addState(l);
}else{this.removeState(l);
}},_onMouseDown:function(e){qx.ui.form.Button.prototype._onMouseDown.call(this,e);
var v=this.getMenu();

if(v){if(!v.isVisible()){this.open();
}else{v.exclude();
}e.stopPropagation();
}},_onMouseUp:function(e){qx.ui.form.Button.prototype._onMouseUp.call(this,e);
e.stopPropagation();
},_onMouseOver:function(e){this.addState(k);
},_onMouseOut:function(e){this.removeState(k);
},_onKeyDown:function(e){switch(e.getKeyIdentifier()){case g:this.removeState(b);
this.addState(l);
var w=this.getMenu();

if(w){if(!w.isVisible()){this.open();
}else{w.exclude();
}}e.stopPropagation();
}},_onKeyUp:function(e){}},destruct:function(){if(this.getMenu()){if(!qx.core.ObjectRegistry.inShutDown){this.getMenu().destroy();
}}}});
})();
(function(){var h="pressed",g="hovered",f="inherit",d="qx.ui.menubar.Button",c="keydown",b="menubar-button",a="keyup";
qx.Class.define(d,{extend:qx.ui.form.MenuButton,construct:function(i,j,k){qx.ui.form.MenuButton.call(this,i,j,k);
this.removeListener(c,this._onKeyDown);
this.removeListener(a,this._onKeyUp);
},properties:{appearance:{refine:true,init:b},show:{refine:true,init:f},focusable:{refine:true,init:false}},members:{getMenuBar:function(){var parent=this;

while(parent){if(parent instanceof qx.ui.toolbar.ToolBar){return parent;
}parent=parent.getLayoutParent();
}return null;
},open:function(l){qx.ui.form.MenuButton.prototype.open.call(this,l);
var menubar=this.getMenuBar();
menubar._setAllowMenuOpenHover(true);
},_onMenuChange:function(e){var m=this.getMenu();
var menubar=this.getMenuBar();

if(m.isVisible()){this.addState(h);
if(menubar){menubar.setOpenMenu(m);
}}else{this.removeState(h);
if(menubar&&menubar.getOpenMenu()==m){menubar.resetOpenMenu();
menubar._setAllowMenuOpenHover(false);
}}},_onMouseUp:function(e){qx.ui.form.MenuButton.prototype._onMouseUp.call(this,e);
var n=this.getMenu();

if(n&&n.isVisible()&&!this.hasState(h)){this.addState(h);
}},_onMouseOver:function(e){this.addState(g);
if(this.getMenu()){var menubar=this.getMenuBar();

if(menubar._isAllowMenuOpenHover()){qx.ui.menu.Manager.getInstance().hideAll();
menubar._setAllowMenuOpenHover(true);
if(this.isEnabled()){this.open();
}}}}}});
})();
(function(){var v="keypress",u="qx.debug",t="interval",s="keydown",r="on",q="mousedown",p="keyup",o="__oG",n="blur",m="Enter",d="__oF",l="Up",h="Escape",c="__oH",b="qx.ui.menu.Manager",g="Left",f="Down",j="Right",a="singleton",k="Space";
qx.Class.define(b,{type:a,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__oF=[];
var w=document.body;
var x=qx.event.Registration;
x.addListener(window.document.documentElement,q,this._onMouseDown,this,true);
x.addListener(w,s,this._onKeyUpDown,this,true);
x.addListener(w,p,this._onKeyUpDown,this,true);
x.addListener(w,v,this._onKeyPress,this,true);
if(!qx.bom.client.Feature.TOUCH){qx.bom.Element.addListener(window,n,this.hideAll,this);
}this.__oG=new qx.event.Timer;
this.__oG.addListener(t,this._onOpenInterval,this);
this.__oH=new qx.event.Timer;
this.__oH.addListener(t,this._onCloseInterval,this);
},members:{__oI:null,__oJ:null,__oG:null,__oH:null,__oF:null,_getChild:function(y,z,A,B){var C=y.getChildren();
var length=C.length;
var D;

for(var i=z;i<length&&i>=0;i+=A){D=C[i];

if(D.isEnabled()&&!D.isAnonymous()){return D;
}}
if(B){i=i==length?0:length-1;

for(;i!=z;i+=A){D=C[i];

if(D.isEnabled()&&!D.isAnonymous()){return D;
}}}return null;
},_isInMenu:function(E){while(E){if(E instanceof qx.ui.menu.Menu){return true;
}E=E.getLayoutParent();
}return false;
},_getMenuButton:function(F){while(F){if(F instanceof qx.ui.menu.AbstractButton){return F;
}F=F.getLayoutParent();
}return null;
},add:function(G){if(qx.core.Variant.isSet(u,r)){if(!(G instanceof qx.ui.menu.Menu)){throw new Error("Object is no menu: "+G);
}}var H=this.__oF;
H.push(G);
G.setZIndex(1e6+H.length);
},remove:function(I){if(qx.core.Variant.isSet(u,r)){if(!(I instanceof qx.ui.menu.Menu)){throw new Error("Object is no menu: "+I);
}}var J=this.__oF;

if(J){qx.lang.Array.remove(J,I);
}},hideAll:function(){var K=this.__oF;

if(K){for(var i=K.length-1;i>=0;i--){K[i].exclude();
}}},getActiveMenu:function(){var L=this.__oF;
return L.length>0?L[L.length-1]:null;
},scheduleOpen:function(M){this.cancelClose(M);
if(M.isVisible()){if(this.__oI){this.cancelOpen(this.__oI);
}}else if(this.__oI!=M){this.__oI=M;
this.__oG.restartWith(M.getOpenInterval());
}},scheduleClose:function(N){this.cancelOpen(N);
if(!N.isVisible()){if(this.__oJ){this.cancelClose(this.__oJ);
}}else if(this.__oJ!=N){this.__oJ=N;
this.__oH.restartWith(N.getCloseInterval());
}},cancelOpen:function(O){if(this.__oI==O){this.__oG.stop();
this.__oI=null;
}},cancelClose:function(P){if(this.__oJ==P){this.__oH.stop();
this.__oJ=null;
}},_onOpenInterval:function(e){this.__oG.stop();
this.__oI.open();
this.__oI=null;
},_onCloseInterval:function(e){this.__oH.stop();
this.__oJ.exclude();
this.__oJ=null;
},_onMouseDown:function(e){var Q=e.getTarget();
Q=qx.ui.core.Widget.getWidgetByElement(Q,true);
if(Q==null){this.hideAll();
return;
}if(Q.getMenu&&Q.getMenu()&&Q.getMenu().isVisible()){return;
}if(this.__oF.length>0&&!this._isInMenu(Q)){this.hideAll();
}},__oK:{"Enter":1,"Space":1},__oL:{"Escape":1,"Up":1,"Down":1,"Left":1,"Right":1},_onKeyUpDown:function(e){var R=this.getActiveMenu();

if(!R){return;
}var S=e.getKeyIdentifier();

if(this.__oL[S]||(this.__oK[S]&&R.getSelectedButton())){e.stopPropagation();
}},_onKeyPress:function(e){var T=this.getActiveMenu();

if(!T){return;
}var U=e.getKeyIdentifier();
var W=this.__oL[U];
var V=this.__oK[U];

if(W){switch(U){case l:this._onKeyPressUp(T);
break;
case f:this._onKeyPressDown(T);
break;
case g:this._onKeyPressLeft(T);
break;
case j:this._onKeyPressRight(T);
break;
case h:this.hideAll();
break;
}e.stopPropagation();
e.preventDefault();
}else if(V){var X=T.getSelectedButton();

if(X){switch(U){case m:this._onKeyPressEnter(T,X,e);
break;
case k:this._onKeyPressSpace(T,X,e);
break;
}e.stopPropagation();
e.preventDefault();
}}},_onKeyPressUp:function(Y){var ba=Y.getSelectedButton();
var bb=Y.getChildren();
var bd=ba?Y.indexOf(ba)-1:bb.length-1;
var bc=this._getChild(Y,bd,-1,true);
if(bc){Y.setSelectedButton(bc);
}else{Y.resetSelectedButton();
}},_onKeyPressDown:function(be){var bf=be.getSelectedButton();
var bh=bf?be.indexOf(bf)+1:0;
var bg=this._getChild(be,bh,1,true);
if(bg){be.setSelectedButton(bg);
}else{be.resetSelectedButton();
}},_onKeyPressLeft:function(bi){var bn=bi.getOpener();

if(!bn){return;
}if(bn instanceof qx.ui.menu.AbstractButton){var bk=bn.getLayoutParent();
bk.resetOpenedButton();
bk.setSelectedButton(bn);
}else if(bn instanceof qx.ui.menubar.Button){var bm=bn.getMenuBar().getMenuButtons();
var bj=bm.indexOf(bn);
if(bj===-1){return;
}var bo=null;
var length=bm.length;

for(var i=1;i<=length;i++){var bl=bm[(bj-i+length)%length];

if(bl.isEnabled()){bo=bl;
break;
}}
if(bo&&bo!=bn){bo.open(true);
}}},_onKeyPressRight:function(bp){var br=bp.getSelectedButton();
if(br){var bq=br.getMenu();

if(bq){bp.setOpenedButton(br);
var bx=this._getChild(bq,0,1);

if(bx){bq.setSelectedButton(bx);
}return;
}}else if(!bp.getOpenedButton()){var bx=this._getChild(bp,0,1);

if(bx){bp.setSelectedButton(bx);

if(bx.getMenu()){bp.setOpenedButton(bx);
}return;
}}var bv=bp.getOpener();
if(bv instanceof qx.ui.menu.Button&&br){while(bv){bv=bv.getLayoutParent();

if(bv instanceof qx.ui.menu.Menu){bv=bv.getOpener();

if(bv instanceof qx.ui.menubar.Button){break;
}}else{break;
}}
if(!bv){return;
}}if(bv instanceof qx.ui.menubar.Button){var bu=bv.getMenuBar().getMenuButtons();
var bs=bu.indexOf(bv);
if(bs===-1){return;
}var bw=null;
var length=bu.length;

for(var i=1;i<=length;i++){var bt=bu[(bs+i)%length];

if(bt.isEnabled()){bw=bt;
break;
}}
if(bw&&bw!=bv){bw.open(true);
}}},_onKeyPressEnter:function(by,bz,e){if(bz.hasListener(v)){var bA=e.clone();
bA.setBubbles(false);
bA.setTarget(bz);
bz.dispatchEvent(bA);
}this.hideAll();
},_onKeyPressSpace:function(bB,bC,e){if(bC.hasListener(v)){var bD=e.clone();
bD.setBubbles(false);
bD.setTarget(bC);
bC.dispatchEvent(bD);
}}},destruct:function(){var bF=qx.event.Registration;
var bE=document.body;
bF.removeListener(window.document.documentElement,q,this._onMouseDown,this,true);
bF.removeListener(bE,s,this._onKeyUpDown,this,true);
bF.removeListener(bE,p,this._onKeyUpDown,this,true);
bF.removeListener(bE,v,this._onKeyPress,this,true);
this._disposeObjects(o,c);
this._disposeArray(d);
}});
})();
(function(){var l="indexOf",k="addAfter",j="add",i="addBefore",h="_",g="addAt",f="hasChildren",e="removeAt",d="removeAll",c="getChildren",a="remove",b="qx.ui.core.MRemoteChildrenHandling";
qx.Mixin.define(b,{members:{__oM:function(m,n,o,p){var q=this.getChildrenContainer();

if(q===this){m=h+m;
}return (q[m])(n,o,p);
},getChildren:function(){return this.__oM(c);
},hasChildren:function(){return this.__oM(f);
},add:function(r,s){return this.__oM(j,r,s);
},remove:function(t){return this.__oM(a,t);
},removeAll:function(){return this.__oM(d);
},indexOf:function(u){return this.__oM(l,u);
},addAt:function(v,w,x){this.__oM(g,v,w,x);
},addBefore:function(y,z,A){this.__oM(i,y,z,A);
},addAfter:function(B,C,D){this.__oM(k,B,C,D);
},removeAt:function(E){this.__oM(e,E);
}}});
})();
(function(){var l="slidebar",k="Integer",j="resize",h="qx.ui.core.Widget",g="selected",f="visible",d="Boolean",c="mouseout",b="excluded",a="menu",A="_applySelectedButton",z="_applyOpenInterval",y="_applySpacingY",x="_blocker",w="_applyCloseInterval",v="_applyBlockerColor",u="_applyIconColumnWidth",t="mouseover",s="qx.ui.menu.Menu",r="Color",p="Number",q="_applyOpenedButton",n="_applySpacingX",o="_applyBlockerOpacity",m="_applyArrowColumnWidth";
qx.Class.define(s,{extend:qx.ui.core.Widget,include:[qx.ui.core.MPlacement,qx.ui.core.MRemoteChildrenHandling],construct:function(){qx.ui.core.Widget.call(this);
this._setLayout(new qx.ui.menu.Layout);
var B=this.getApplicationRoot();
B.add(this);
this.addListener(t,this._onMouseOver);
this.addListener(c,this._onMouseOut);
this.addListener(j,this._onResize,this);
B.addListener(j,this._onResize,this);
this._blocker=new qx.ui.core.Blocker(B);
this.initVisibility();
this.initKeepFocus();
this.initKeepActive();
},properties:{appearance:{refine:true,init:a},allowGrowX:{refine:true,init:false},allowGrowY:{refine:true,init:false},visibility:{refine:true,init:b},keepFocus:{refine:true,init:true},keepActive:{refine:true,init:true},spacingX:{check:k,apply:n,init:0,themeable:true},spacingY:{check:k,apply:y,init:0,themeable:true},iconColumnWidth:{check:k,init:0,themeable:true,apply:u},arrowColumnWidth:{check:k,init:0,themeable:true,apply:m},blockerColor:{check:r,init:null,nullable:true,apply:v,themeable:true},blockerOpacity:{check:p,init:1,apply:o,themeable:true},selectedButton:{check:h,nullable:true,apply:A},openedButton:{check:h,nullable:true,apply:q},opener:{check:h,nullable:true},openInterval:{check:k,themeable:true,init:250,apply:z},closeInterval:{check:k,themeable:true,init:250,apply:w},blockBackground:{check:d,themeable:true,init:false}},members:{__oN:null,__oO:null,_blocker:null,open:function(){if(this.getOpener()!=null){this.placeToWidget(this.getOpener());
this.__oQ();
this.show();
this._placementTarget=this.getOpener();
}else{this.warn("The menu instance needs a configured 'opener' widget!");
}},openAtMouse:function(e){this.placeToMouse(e);
this.__oQ();
this.show();
this._placementTarget={left:e.getDocumentLeft(),top:e.getDocumentTop()};
},openAtPoint:function(C){this.placeToPoint(C);
this.__oQ();
this.show();
this._placementTarget=C;
},addSeparator:function(){this.add(new qx.ui.menu.Separator);
},getColumnSizes:function(){return this._getMenuLayout().getColumnSizes();
},getSelectables:function(){var D=[];
var E=this.getChildren();

for(var i=0;i<E.length;i++){if(E[i].isEnabled()){D.push(E[i]);
}}return D;
},_applyIconColumnWidth:function(F,G){this._getMenuLayout().setIconColumnWidth(F);
},_applyArrowColumnWidth:function(H,I){this._getMenuLayout().setArrowColumnWidth(H);
},_applySpacingX:function(J,K){this._getMenuLayout().setColumnSpacing(J);
},_applySpacingY:function(L,M){this._getMenuLayout().setSpacing(L);
},_applyVisibility:function(N,O){qx.ui.core.Widget.prototype._applyVisibility.call(this,N,O);
var P=qx.ui.menu.Manager.getInstance();

if(N===f){P.add(this);
var Q=this.getParentMenu();

if(Q){Q.setOpenedButton(this.getOpener());
}}else if(O===f){P.remove(this);
var Q=this.getParentMenu();

if(Q&&Q.getOpenedButton()==this.getOpener()){Q.resetOpenedButton();
}this.resetOpenedButton();
this.resetSelectedButton();
}this.__oP();
},__oP:function(){if(this.isVisible()){if(this.getBlockBackground()){var R=this.getZIndex();
this._blocker.blockContent(R-1);
}}else{if(this._blocker.isContentBlocked()){this._blocker.unblockContent();
}}},getParentMenu:function(){var S=this.getOpener();

if(!S||!(S instanceof qx.ui.menu.AbstractButton)){return null;
}
if(S&&S.getContextMenu()===this){return null;
}
while(S&&!(S instanceof qx.ui.menu.Menu)){S=S.getLayoutParent();
}return S;
},_applySelectedButton:function(T,U){if(U){U.removeState(g);
}
if(T){T.addState(g);
}},_applyOpenedButton:function(V,W){if(W){W.getMenu().exclude();
}
if(V){V.getMenu().open();
}},_applyBlockerColor:function(X,Y){this._blocker.setColor(X);
},_applyBlockerOpacity:function(ba,bb){this._blocker.setOpacity(ba);
},getChildrenContainer:function(){return this.getChildControl(l,true)||this;
},_createChildControlImpl:function(bc,bd){var be;

switch(bc){case l:var be=new qx.ui.menu.MenuSlideBar();
var bg=this._getLayout();
this._setLayout(new qx.ui.layout.Grow());
var bf=be.getLayout();
be.setLayout(bg);
bf.dispose();
var bh=qx.lang.Array.clone(this.getChildren());

for(var i=0;i<bh.length;i++){be.add(bh[i]);
}this.removeListener(j,this._onResize,this);
be.getChildrenContainer().addListener(j,this._onResize,this);
this._add(be);
break;
}return be||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,bc);
},_getMenuLayout:function(){if(this.hasChildControl(l)){return this.getChildControl(l).getChildrenContainer().getLayout();
}else{return this._getLayout();
}},_getMenuBounds:function(){if(this.hasChildControl(l)){return this.getChildControl(l).getChildrenContainer().getBounds();
}else{return this.getBounds();
}},_computePlacementSize:function(){return this._getMenuBounds();
},__oQ:function(){var bj=this._getMenuBounds();

if(!bj){this.addListenerOnce(j,this.__oQ,this);
return;
}var bi=this.getLayoutParent().getBounds().height;
var top=this.getLayoutProperties().top;
var bk=this.getLayoutProperties().left;
if(top<0){this._assertSlideBar(function(){this.setHeight(bj.height+top);
this.moveTo(bk,0);
});
}else if(top+bj.height>bi){this._assertSlideBar(function(){this.setHeight(bi-top);
});
}else{this.setHeight(null);
}},_assertSlideBar:function(bl){if(this.hasChildControl(l)){return bl.call(this);
}this.__oO=bl;
qx.ui.core.queue.Widget.add(this);
},syncWidget:function(){this.getChildControl(l);

if(this.__oO){this.__oO.call(this);
delete this.__oO;
}},_onResize:function(){if(this.isVisible()){var bm=this._placementTarget;

if(!bm){return;
}else if(bm instanceof qx.ui.core.Widget){this.placeToWidget(bm);
}else if(bm.top!==undefined){this.placeToPoint(bm);
}else{throw new Error("Unknown target: "+bm);
}this.__oQ();
}},_onMouseOver:function(e){var bo=qx.ui.menu.Manager.getInstance();
bo.cancelClose(this);
var bp=e.getTarget();

if(bp.isEnabled()&&bp instanceof qx.ui.menu.AbstractButton){this.setSelectedButton(bp);
var bn=bp.getMenu&&bp.getMenu();

if(bn){bn.setOpener(bp);
bo.scheduleOpen(bn);
this.__oN=bn;
}else{var bq=this.getOpenedButton();

if(bq){bo.scheduleClose(bq.getMenu());
}
if(this.__oN){bo.cancelOpen(this.__oN);
this.__oN=null;
}}}else if(!this.getOpenedButton()){this.resetSelectedButton();
}},_onMouseOut:function(e){var br=qx.ui.menu.Manager.getInstance();
if(!qx.ui.core.Widget.contains(this,e.getRelatedTarget())){var bs=this.getOpenedButton();
bs?this.setSelectedButton(bs):this.resetSelectedButton();
if(bs){br.cancelClose(bs.getMenu());
}if(this.__oN){br.cancelOpen(this.__oN);
}}}},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){qx.ui.menu.Manager.getInstance().remove(this);
}this.getApplicationRoot().removeListener(j,this._onResize,this);
this._placementTarget=null;
this._disposeObjects(x);
}});
})();
(function(){var c="Integer",b="_applyLayoutChange",a="qx.ui.menu.Layout";
qx.Class.define(a,{extend:qx.ui.layout.VBox,properties:{columnSpacing:{check:c,init:0,apply:b},spanColumn:{check:c,init:1,nullable:true,apply:b},iconColumnWidth:{check:c,init:0,themeable:true,apply:b},arrowColumnWidth:{check:c,init:0,themeable:true,apply:b}},members:{__oR:null,_computeSizeHint:function(){var q=this._getLayoutChildren();
var o,g,j;
var e=this.getSpanColumn();
var h=this.__oR=[0,0,0,0];
var m=this.getColumnSpacing();
var k=0;
var f=0;
for(var i=0,l=q.length;i<l;i++){o=q[i];

if(o.isAnonymous()){continue;
}g=o.getChildrenSizes();

for(var n=0;n<g.length;n++){if(e!=null&&n==e&&g[e+1]==0){k=Math.max(k,g[n]);
}else{h[n]=Math.max(h[n],g[n]);
}}var d=q[i].getInsets();
f=Math.max(f,d.left+d.right);
}if(e!=null&&h[e]+m+h[e+1]<k){h[e]=k-h[e+1]-m;
}if(k==0){j=m*2;
}else{j=m*3;
}if(h[0]==0){h[0]=this.getIconColumnWidth();
}if(h[3]==0){h[3]=this.getArrowColumnWidth();
}var p=qx.ui.layout.VBox.prototype._computeSizeHint.call(this).height;
return {minHeight:p,height:p,width:qx.lang.Array.sum(h)+f+j};
},getColumnSizes:function(){return this.__oR||null;
}},destruct:function(){this.__oR=null;
}});
})();
(function(){var b="menu-separator",a="qx.ui.menu.Separator";
qx.Class.define(a,{extend:qx.ui.core.Widget,properties:{appearance:{refine:true,init:b},anonymous:{refine:true,init:true}}});
})();
(function(){var t="icon",s="label",r="arrow",q="shortcut",p="changeLocale",o="qx.dynlocale",n="submenu",m="on",l="String",k="qx.ui.menu.Menu",d="qx.ui.menu.AbstractButton",j="keypress",h="",c="_applyIcon",b="mouseup",g="abstract",f="_applyLabel",i="_applyMenu",a="changeCommand";
qx.Class.define(d,{extend:qx.ui.core.Widget,include:[qx.ui.core.MExecutable],implement:[qx.ui.form.IExecutable],type:g,construct:function(){qx.ui.core.Widget.call(this);
this._setLayout(new qx.ui.menu.ButtonLayout);
this.addListener(b,this._onMouseUp);
this.addListener(j,this._onKeyPress);
this.addListener(a,this._onChangeCommand,this);
},properties:{blockToolTip:{refine:true,init:true},label:{check:l,apply:f,nullable:true},menu:{check:k,apply:i,nullable:true,dereference:true},icon:{check:l,apply:c,themeable:true,nullable:true}},members:{_createChildControlImpl:function(u,v){var w;

switch(u){case t:w=new qx.ui.basic.Image;
w.setAnonymous(true);
this._add(w,{column:0});
break;
case s:w=new qx.ui.basic.Label;
w.setAnonymous(true);
this._add(w,{column:1});
break;
case q:w=new qx.ui.basic.Label;
w.setAnonymous(true);
this._add(w,{column:2});
break;
case r:w=new qx.ui.basic.Image;
w.setAnonymous(true);
this._add(w,{column:3});
break;
}return w||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,u);
},_forwardStates:{selected:1},getChildrenSizes:function(){var x=0,y=0,z=0,D=0;

if(this._isChildControlVisible(t)){var E=this.getChildControl(t);
x=E.getMarginLeft()+E.getSizeHint().width+E.getMarginRight();
}
if(this._isChildControlVisible(s)){var B=this.getChildControl(s);
y=B.getMarginLeft()+B.getSizeHint().width+B.getMarginRight();
}
if(this._isChildControlVisible(q)){var A=this.getChildControl(q);
z=A.getMarginLeft()+A.getSizeHint().width+A.getMarginRight();
}
if(this._isChildControlVisible(r)){var C=this.getChildControl(r);
D=C.getMarginLeft()+C.getSizeHint().width+C.getMarginRight();
}return [x,y,z,D];
},_onMouseUp:function(e){},_onKeyPress:function(e){},_onChangeCommand:function(e){var H=e.getData();
if(H==null){return;
}
if(qx.core.Variant.isSet(o,m)){var F=e.getOldData();

if(!F){qx.locale.Manager.getInstance().addListener(p,this._onChangeLocale,this);
}
if(!H){qx.locale.Manager.getInstance().removeListener(p,this._onChangeLocale,this);
}}var G=H!=null?H.toString():h;
this.getChildControl(q).setValue(G);
},_onChangeLocale:qx.core.Variant.select(o,{"on":function(e){var I=this.getCommand();

if(I!=null){this.getChildControl(q).setValue(I.toString());
}},"off":null}),_applyIcon:function(J,K){if(J){this._showChildControl(t).setSource(J);
}else{this._excludeChildControl(t);
}},_applyLabel:function(L,M){if(L){this._showChildControl(s).setValue(L);
}else{this._excludeChildControl(s);
}},_applyMenu:function(N,O){if(O){O.resetOpener();
O.removeState(n);
}
if(N){this._showChildControl(r);
N.setOpener(this);
N.addState(n);
}else{this._excludeChildControl(r);
}}},destruct:function(){if(this.getMenu()){if(!qx.core.ObjectRegistry.inShutDown){this.getMenu().destroy();
}}
if(qx.core.Variant.isSet(o,m)){qx.locale.Manager.getInstance().removeListener(p,this._onChangeLocale,this);
}}});
})();
(function(){var g="qx.ui.menu.ButtonLayout",f="qx.debug",e="column",d="left",c="middle",b="' is not supported by the MenuButton layout!",a="The property '";
qx.Class.define(g,{extend:qx.ui.layout.Abstract,members:{verifyLayoutProperty:qx.core.Variant.select(f,{"on":function(h,name,j){this.assert(name==e,a+name+b);
},"off":null}),renderLayout:function(k,m){var w=this._getLayoutChildren();
var v;
var o;
var p=[];

for(var i=0,l=w.length;i<l;i++){v=w[i];
o=v.getLayoutProperties().column;
p[o]=v;
}var u=this.__pG(w[0]);
var x=u.getColumnSizes();
var r=u.getSpacingX();
var q=qx.lang.Array.sum(x)+r*(x.length-1);

if(q<k){x[1]+=k-q;
}var y=0,top=0;
var s=qx.ui.layout.Util;

for(var i=0,l=x.length;i<l;i++){v=p[i];

if(v){var n=v.getSizeHint();
var top=s.computeVerticalAlignOffset(v.getAlignY()||c,n.height,m,0,0);
var t=s.computeHorizontalAlignOffset(v.getAlignX()||d,n.width,x[i],v.getMarginLeft(),v.getMarginRight());
v.renderLayout(y+t,top,n.width,n.height);
}y+=x[i]+r;
}},__pG:function(z){while(!(z instanceof qx.ui.menu.Menu)){z=z.getLayoutParent();
}return z;
},_computeSizeHint:function(){var C=this._getLayoutChildren();
var B=0;
var D=0;

for(var i=0,l=C.length;i<l;i++){var A=C[i].getSizeHint();
D+=A.width;
B=Math.max(B,A.height);
}return {width:D,height:B};
}}});
})();
(function(){var a="qx.ui.core.MRemoteLayoutHandling";
qx.Mixin.define(a,{members:{setLayout:function(b){return this.getChildrenContainer().setLayout(b);
},getLayout:function(){return this.getChildrenContainer().getLayout();
}}});
})();
(function(){var q="horizontal",p="scrollpane",o="vertical",n="button-backward",m="button-forward",l="content",k="execute",j="qx.ui.container.SlideBar",i="scrollY",h="removeChildWidget",c="scrollX",g="_applyOrientation",f="mousewheel",b="Integer",a="slidebar",d="update";
qx.Class.define(j,{extend:qx.ui.core.Widget,include:[qx.ui.core.MRemoteChildrenHandling,qx.ui.core.MRemoteLayoutHandling],construct:function(r){qx.ui.core.Widget.call(this);
var s=this.getChildControl(p);
this._add(s,{flex:1});

if(r!=null){this.setOrientation(r);
}else{this.initOrientation();
}this.addListener(f,this._onMouseWheel,this);
},properties:{appearance:{refine:true,init:a},orientation:{check:[q,o],init:q,apply:g},scrollStep:{check:b,init:15,themeable:true}},members:{getChildrenContainer:function(){return this.getChildControl(l);
},_createChildControlImpl:function(t,u){var v;

switch(t){case m:v=new qx.ui.form.RepeatButton;
v.addListener(k,this._onExecuteForward,this);
v.setFocusable(false);
this._addAt(v,2);
break;
case n:v=new qx.ui.form.RepeatButton;
v.addListener(k,this._onExecuteBackward,this);
v.setFocusable(false);
this._addAt(v,0);
break;
case l:v=new qx.ui.container.Composite();
if(qx.bom.client.Engine.GECKO){v.addListener(h,this._onRemoveChild,this);
}this.getChildControl(p).add(v);
break;
case p:v=new qx.ui.core.scroll.ScrollPane();
v.addListener(d,this._onResize,this);
v.addListener(c,this._onScroll,this);
v.addListener(i,this._onScroll,this);
break;
}return v||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,t);
},_forwardStates:{barLeft:true,barTop:true,barRight:true,barBottom:true},scrollBy:function(w){var x=this.getChildControl(p);

if(this.getOrientation()===q){x.scrollByX(w);
}else{x.scrollByY(w);
}},scrollTo:function(y){var z=this.getChildControl(p);

if(this.getOrientation()===q){z.scrollToX(y);
}else{z.scrollToY(y);
}},_applyOrientation:function(A,B){var E=[this.getLayout(),this._getLayout()];
var D=this.getChildControl(m);
var C=this.getChildControl(n);
if(B==o){D.removeState(o);
C.removeState(o);
D.addState(q);
C.addState(q);
}else if(B==q){D.removeState(q);
C.removeState(q);
D.addState(o);
C.addState(o);
}
if(A==q){this._setLayout(new qx.ui.layout.HBox());
this.setLayout(new qx.ui.layout.HBox());
}else{this._setLayout(new qx.ui.layout.VBox());
this.setLayout(new qx.ui.layout.VBox());
}
if(E[0]){E[0].dispose();
}
if(E[1]){E[1].dispose();
}},_onMouseWheel:function(e){this.scrollBy(e.getWheelDelta()*this.getScrollStep());
e.stop();
},_onScroll:function(){this._updateArrowsEnabled();
},_onResize:function(e){var content=this.getChildControl(p).getChildren()[0];

if(!content){return;
}var F=this.getInnerSize();
var H=content.getBounds();
var G=(this.getOrientation()===q)?H.width>F.width:H.height>F.height;

if(G){this._showArrows();
this._updateArrowsEnabled();
}else{this._hideArrows();
}},_onExecuteBackward:function(){this.scrollBy(-this.getScrollStep());
},_onExecuteForward:function(){this.scrollBy(this.getScrollStep());
},_onRemoveChild:function(){qx.event.Timer.once(function(){this.scrollBy(this.getChildControl(p).getScrollX());
},this,50);
},_updateArrowsEnabled:function(){var J=this.getChildControl(p);

if(this.getOrientation()===q){var I=J.getScrollX();
var K=J.getScrollMaxX();
}else{var I=J.getScrollY();
var K=J.getScrollMaxY();
}this.getChildControl(n).setEnabled(I>0);
this.getChildControl(m).setEnabled(I<K);
},_showArrows:function(){this._showChildControl(m);
this._showChildControl(n);
},_hideArrows:function(){this._excludeChildControl(m);
this._excludeChildControl(n);
this.scrollTo(0);
}}});
})();
(function(){var f="execute",e="button-backward",d="vertical",c="button-forward",b="menu-slidebar",a="qx.ui.menu.MenuSlideBar";
qx.Class.define(a,{extend:qx.ui.container.SlideBar,construct:function(){qx.ui.container.SlideBar.call(this,d);
},properties:{appearance:{refine:true,init:b}},members:{_createChildControlImpl:function(g,h){var i;

switch(g){case c:i=new qx.ui.form.HoverButton();
i.addListener(f,this._onExecuteForward,this);
this._addAt(i,2);
break;
case e:i=new qx.ui.form.HoverButton();
i.addListener(f,this._onExecuteBackward,this);
this._addAt(i,0);
break;
}return i||qx.ui.container.SlideBar.prototype._createChildControlImpl.call(this,g);
}}});
})();
(function(){var n="pressed",m="abandoned",l="Integer",k="hovered",j="qx.event.type.Event",i="Enter",h="Space",g="press",f="__md",d="qx.ui.form.RepeatButton",a="release",c="interval",b="execute";
qx.Class.define(d,{extend:qx.ui.form.Button,construct:function(o,p){qx.ui.form.Button.call(this,o,p);
this.__md=new qx.event.AcceleratingTimer();
this.__md.addListener(c,this._onInterval,this);
},events:{"execute":j,"press":j,"release":j},properties:{interval:{check:l,init:100},firstInterval:{check:l,init:500},minTimer:{check:l,init:20},timerDecrease:{check:l,init:2}},members:{__me:null,__md:null,press:function(){if(this.isEnabled()){if(!this.hasState(n)){this.__mf();
}this.removeState(m);
this.addState(n);
}},release:function(q){if(!this.isEnabled()){return;
}if(this.hasState(n)){if(!this.__me){this.execute();
}}this.removeState(n);
this.removeState(m);
this.__mg();
},_applyEnabled:function(r,s){qx.ui.form.Button.prototype._applyEnabled.call(this,r,s);

if(!r){this.removeState(n);
this.removeState(m);
this.__mg();
}},_onMouseOver:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}
if(this.hasState(m)){this.removeState(m);
this.addState(n);
this.__md.start();
}this.addState(k);
},_onMouseOut:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}this.removeState(k);

if(this.hasState(n)){this.removeState(n);
this.addState(m);
this.__md.stop();
}},_onMouseDown:function(e){if(!e.isLeftPressed()){return;
}this.capture();
this.__mf();
e.stopPropagation();
},_onMouseUp:function(e){this.releaseCapture();

if(!this.hasState(m)){this.addState(k);

if(this.hasState(n)&&!this.__me){this.execute();
}}this.__mg();
e.stopPropagation();
},_onKeyUp:function(e){switch(e.getKeyIdentifier()){case i:case h:if(this.hasState(n)){if(!this.__me){this.execute();
}this.removeState(n);
this.removeState(m);
e.stopPropagation();
this.__mg();
}}},_onKeyDown:function(e){switch(e.getKeyIdentifier()){case i:case h:this.removeState(m);
this.addState(n);
e.stopPropagation();
this.__mf();
}},_onInterval:function(e){this.__me=true;
this.fireEvent(b);
},__mf:function(){this.fireEvent(g);
this.__me=false;
this.__md.set({interval:this.getInterval(),firstInterval:this.getFirstInterval(),minimum:this.getMinTimer(),decrease:this.getTimerDecrease()}).start();
this.removeState(m);
this.addState(n);
},__mg:function(){this.fireEvent(a);
this.__md.stop();
this.removeState(m);
this.removeState(n);
}},destruct:function(){this._disposeObjects(f);
}});
})();
(function(){var e="Integer",d="interval",c="qx.event.type.Event",b="__mh",a="qx.event.AcceleratingTimer";
qx.Class.define(a,{extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__mh=new qx.event.Timer(this.getInterval());
this.__mh.addListener(d,this._onInterval,this);
},events:{"interval":c},properties:{interval:{check:e,init:100},firstInterval:{check:e,init:500},minimum:{check:e,init:20},decrease:{check:e,init:2}},members:{__mh:null,__mi:null,start:function(){this.__mh.setInterval(this.getFirstInterval());
this.__mh.start();
},stop:function(){this.__mh.stop();
this.__mi=null;
},_onInterval:function(){this.__mh.stop();

if(this.__mi==null){this.__mi=this.getInterval();
}this.__mi=Math.max(this.getMinimum(),this.__mi-this.getDecrease());
this.__mh.setInterval(this.__mi);
this.__mh.start();
this.fireEvent(d);
}},destruct:function(){this._disposeObjects(b);
}});
})();
(function(){var m="resize",l="scrollY",k="update",j="scrollX",i="_applyScrollX",h="_applyScrollY",g="qx.lang.Type.isNumber(value)&&value>=0&&value<=this.getScrollMaxX()",f="appear",d="qx.lang.Type.isNumber(value)&&value>=0&&value<=this.getScrollMaxY()",c="qx.event.type.Event",a="qx.ui.core.scroll.ScrollPane",b="scroll";
qx.Class.define(a,{extend:qx.ui.core.Widget,construct:function(){qx.ui.core.Widget.call(this);
this.set({minWidth:0,minHeight:0});
this._setLayout(new qx.ui.layout.Grow());
this.addListener(m,this._onUpdate);
var n=this.getContentElement();
n.addListener(b,this._onScroll,this);
n.addListener(f,this._onAppear,this);
},events:{update:c},properties:{scrollX:{check:g,apply:i,event:j,init:0},scrollY:{check:d,apply:h,event:l,init:0}},members:{add:function(o){var p=this._getChildren()[0];

if(p){this._remove(p);
p.removeListener(m,this._onUpdate,this);
}
if(o){this._add(o);
o.addListener(m,this._onUpdate,this);
}},remove:function(q){if(q){this._remove(q);
q.removeListener(m,this._onUpdate,this);
}},getChildren:function(){return this._getChildren();
},_onUpdate:function(e){this.fireEvent(k);
},_onScroll:function(e){var r=this.getContentElement();
this.setScrollX(r.getScrollX());
this.setScrollY(r.getScrollY());
},_onAppear:function(e){var v=this.getContentElement();
var s=this.getScrollX();
var t=v.getScrollX();

if(s!=t){v.scrollToX(s);
}var w=this.getScrollY();
var u=v.getScrollY();

if(w!=u){v.scrollToY(w);
}},getItemTop:function(z){var top=0;

do{top+=z.getBounds().top;
z=z.getLayoutParent();
}while(z&&z!==this);
return top;
},getItemBottom:function(A){return this.getItemTop(A)+A.getBounds().height;
},getItemLeft:function(B){var C=0;
var parent;

do{C+=B.getBounds().left;
parent=B.getLayoutParent();

if(parent){C+=parent.getInsets().left;
}B=parent;
}while(B&&B!==this);
return C;
},getItemRight:function(D){return this.getItemLeft(D)+D.getBounds().width;
},getScrollSize:function(){return this.getChildren()[0].getBounds();
},getScrollMaxX:function(){var F=this.getInnerSize();
var E=this.getScrollSize();

if(F&&E){return Math.max(0,E.width-F.width);
}return 0;
},getScrollMaxY:function(){var H=this.getInnerSize();
var G=this.getScrollSize();

if(H&&G){return Math.max(0,G.height-H.height);
}return 0;
},scrollToX:function(I){var J=this.getScrollMaxX();

if(I<0){I=0;
}else if(I>J){I=J;
}this.setScrollX(I);
},scrollToY:function(K){var L=this.getScrollMaxY();

if(K<0){K=0;
}else if(K>L){K=L;
}this.setScrollY(K);
},scrollByX:function(x){this.scrollToX(this.getScrollX()+x);
},scrollByY:function(y){this.scrollToY(this.getScrollY()+y);
},_applyScrollX:function(M){this.getContentElement().scrollToX(M);
},_applyScrollY:function(N){this.getContentElement().scrollToY(N);
}}});
})();
(function(){var i="Integer",h="hovered",g="__pH",f="hover-button",d="interval",c="mouseover",b="mouseout",a="qx.ui.form.HoverButton";
qx.Class.define(a,{extend:qx.ui.basic.Atom,include:[qx.ui.core.MExecutable],implement:[qx.ui.form.IExecutable],construct:function(j,k){qx.ui.basic.Atom.call(this,j,k);
this.addListener(c,this._onMouseOver,this);
this.addListener(b,this._onMouseOut,this);
this.__pH=new qx.event.AcceleratingTimer();
this.__pH.addListener(d,this._onInterval,this);
},properties:{appearance:{refine:true,init:f},interval:{check:i,init:80},firstInterval:{check:i,init:200},minTimer:{check:i,init:20},timerDecrease:{check:i,init:2}},members:{__pH:null,_onMouseOver:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}this.__pH.set({interval:this.getInterval(),firstInterval:this.getFirstInterval(),minimum:this.getMinTimer(),decrease:this.getTimerDecrease()}).start();
this.addState(h);
},_onMouseOut:function(e){this.__pH.stop();
this.removeState(h);

if(!this.isEnabled()||e.getTarget()!==this){return;
}},_onInterval:function(){if(this.isEnabled()){this.execute();
}else{this.__pH.stop();
}}},destruct:function(){this._disposeObjects(g);
}});
})();
(function(){var b="qx.ui.menu.Button",a="menu-button";
qx.Class.define(b,{extend:qx.ui.menu.AbstractButton,construct:function(c,d,f,g){qx.ui.menu.AbstractButton.call(this);
if(c!=null){this.setLabel(c);
}
if(d!=null){this.setIcon(d);
}
if(f!=null){this.setCommand(f);
}
if(g!=null){this.setMenu(g);
}},properties:{appearance:{refine:true,init:a}},members:{_onMouseUp:function(e){if(e.isLeftPressed()){this.execute();
if(this.getMenu()){return;
}}else{if(this.getContextMenu()){return;
}}qx.ui.menu.Manager.getInstance().hideAll();
},_onKeyPress:function(e){this.execute();
}}});
})();
(function(){var m="container",k="handle",j="both",h="Integer",g="middle",f="qx.ui.toolbar.Part",e="icon",d="label",c="changeShow",b="_applySpacing",a="toolbar/part";
qx.Class.define(f,{extend:qx.ui.core.Widget,include:[qx.ui.core.MRemoteChildrenHandling],construct:function(){qx.ui.core.Widget.call(this);
this._setLayout(new qx.ui.layout.HBox);
this._createChildControl(k);
},properties:{appearance:{refine:true,init:a},show:{init:j,check:[j,d,e],inheritable:true,event:c},spacing:{nullable:true,check:h,themeable:true,apply:b}},members:{_createChildControlImpl:function(n,o){var p;

switch(n){case k:p=new qx.ui.basic.Image();
p.setAlignY(g);
this._add(p);
break;
case m:p=new qx.ui.toolbar.PartContainer;
this._add(p);
break;
}return p||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,n);
},getChildrenContainer:function(){return this.getChildControl(m);
},_applySpacing:function(q,r){var s=this.getChildControl(m).getLayout();
q==null?s.resetSpacing():s.setSpacing(q);
},addSeparator:function(){this.add(new qx.ui.toolbar.Separator);
},getMenuButtons:function(){var u=this.getChildren();
var t=[];
var v;

for(var i=0,l=u.length;i<l;i++){v=u[i];

if(v instanceof qx.ui.menubar.Button){t.push(v);
}}return t;
}}});
})();
(function(){var f="both",e="toolbar/part/container",d="icon",c="changeShow",b="qx.ui.toolbar.PartContainer",a="label";
qx.Class.define(b,{extend:qx.ui.container.Composite,construct:function(){qx.ui.container.Composite.call(this);
this._setLayout(new qx.ui.layout.HBox);
},properties:{appearance:{refine:true,init:e},show:{init:f,check:[f,a,d],inheritable:true,event:c}}});
})();
(function(){var e="inherit",d="toolbar-button",c="keydown",b="qx.ui.toolbar.Button",a="keyup";
qx.Class.define(b,{extend:qx.ui.form.Button,construct:function(f,g,h){qx.ui.form.Button.call(this,f,g,h);
this.removeListener(c,this._onKeyDown);
this.removeListener(a,this._onKeyUp);
},properties:{appearance:{refine:true,init:d},show:{refine:true,init:e},focusable:{refine:true,init:false}}});
})();
(function(){var b="changeModel",a="qx.ui.form.MModelProperty";
qx.Mixin.define(a,{properties:{model:{nullable:true,event:b,dereference:true}}});
})();
(function(){var b="qx.ui.form.IBooleanForm",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"changeValue":a},members:{setValue:function(c){return arguments.length==1;
},resetValue:function(){},getValue:function(){}}});
})();
(function(){var b="qx.ui.form.IModel",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"changeModel":a},members:{setModel:function(c){},getModel:function(){},resetModel:function(){}}});
})();
(function(){var b="qx.ui.form.IRadioItem",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"changeValue":a},members:{setValue:function(c){},getValue:function(){},setGroup:function(d){this.assertInstance(d,qx.ui.form.RadioGroup);
},getGroup:function(){}}});
})();
(function(){var j="checked",i="qx.ui.form.RadioGroup",h="Boolean",g="menu-radiobutton",f="_applyValue",d="qx.ui.menu.RadioButton",c="changeValue",b="_applyGroup",a="execute";
qx.Class.define(d,{extend:qx.ui.menu.AbstractButton,include:[qx.ui.form.MModelProperty],implement:[qx.ui.form.IRadioItem,qx.ui.form.IBooleanForm,qx.ui.form.IModel],construct:function(k,l){qx.ui.menu.AbstractButton.call(this);
if(k!=null){this.setLabel(k);
}
if(l!=null){this.setMenu(l);
}this.addListener(a,this._onExecute,this);
},properties:{appearance:{refine:true,init:g},value:{check:h,nullable:true,event:c,apply:f,init:false},group:{check:i,nullable:true,apply:b}},members:{_applyValue:function(m,n){m?this.addState(j):this.removeState(j);
},_applyGroup:function(o,p){if(p){p.remove(this);
}
if(o){o.add(this);
}},_onExecute:function(e){this.setValue(true);
},_onMouseUp:function(e){if(e.isLeftPressed()){this.execute();
}else{if(this.getContextMenu()){return;
}}qx.ui.menu.Manager.getInstance().hideAll();
},_onKeyPress:function(e){this.execute();
}}});
})();
(function(){var h="Please use an array as parameter.",g="qx.ui.form.MModelSelection",f="__jt",e="change",d="qx.debug",c="changeSelection",b="on",a="qx.event.type.Data";
qx.Mixin.define(g,{construct:function(){this.__jt=new qx.data.Array();
this.__jt.addListener(e,this.__jw,this);
this.addListener(c,this.__jv,this);
},events:{changeModelSelection:a},members:{__jt:null,__ju:false,__jv:function(){if(this.__ju){return;
}var m=this.getSelection();
var k=[];

for(var i=0;i<m.length;i++){var n=m[i];
var l=n.getModel?n.getModel():null;

if(l!==null){k.push(l);
}}if(k.length===m.length){this.setModelSelection(k);
}},__jw:function(){this.__ju=true;
var p=this.getSelectables(true);
var r=[];
var q=this.__jt.toArray();

for(var i=0;i<q.length;i++){var t=q[i];

for(var j=0;j<p.length;j++){var u=p[j];
var o=u.getModel?u.getModel():null;

if(t===o){r.push(u);
break;
}}}this.setSelection(r);
this.__ju=false;
var s=this.getSelection();

if(!qx.lang.Array.equals(s,r)){this.__jv();
}},getModelSelection:function(){return this.__jt;
},setModelSelection:function(v){if(!v){this.__jt.removeAll();
return;
}
if(qx.core.Variant.isSet(d,b)){this.assertArray(v,h);
}v.unshift(this.__jt.getLength());
v.unshift(0);
var w=this.__jt.splice.apply(this.__jt,v);
w.dispose();
}},destruct:function(){this._disposeObjects(f);
}});
})();
(function(){var a="qx.ui.form.IModelSelection";
qx.Interface.define(a,{members:{setModelSelection:function(b){},getModelSelection:function(){}}});
})();
(function(){var r="Boolean",q="changeInvalidMessage",p="changeValue",o="String",n="_applyAllowEmptySelection",m="_applyInvalidMessage",k="qx.ui.form.RadioGroup",j="_applyValid",h="",g="changeRequired",c="changeValid",f="__jz",d="changeEnabled",b="changeSelection",a="_applyEnabled";
qx.Class.define(k,{extend:qx.core.Object,implement:[qx.ui.core.ISingleSelection,qx.ui.form.IForm,qx.ui.form.IModelSelection],include:[qx.ui.core.MSingleSelectionHandling,qx.ui.form.MModelSelection],construct:function(s){qx.core.Object.call(this);
this.__jz=[];
this.addListener(b,this.__jA,this);

if(s!=null){this.add.apply(this,arguments);
}},properties:{enabled:{check:r,apply:a,event:d,init:true},wrap:{check:r,init:true},allowEmptySelection:{check:r,init:false,apply:n},valid:{check:r,init:true,apply:j,event:c},required:{check:r,init:false,event:g},invalidMessage:{check:o,init:h,event:q,apply:m},requiredInvalidMessage:{check:o,nullable:true,event:q}},members:{__jz:null,getItems:function(){return this.__jz;
},add:function(t){var u=this.__jz;
var v;

for(var i=0,l=arguments.length;i<l;i++){v=arguments[i];

if(qx.lang.Array.contains(u,v)){continue;
}v.addListener(p,this._onItemChangeChecked,this);
u.push(v);
v.setGroup(this);
if(v.getValue()){this.setSelection([v]);
}}if(!this.isAllowEmptySelection()&&u.length>0&&!this.getSelection()[0]){this.setSelection([u[0]]);
}},remove:function(w){var x=this.__jz;

if(qx.lang.Array.contains(x,w)){qx.lang.Array.remove(x,w);
if(w.getGroup()===this){w.resetGroup();
}w.removeListener(p,this._onItemChangeChecked,this);
if(w.getValue()){this.resetSelection();
}}},getChildren:function(){return this.__jz;
},_onItemChangeChecked:function(e){var y=e.getTarget();

if(y.getValue()){this.setSelection([y]);
}else if(this.getSelection()[0]==y){this.resetSelection();
}},_applyInvalidMessage:function(z,A){for(var i=0;i<this.__jz.length;i++){this.__jz[i].setInvalidMessage(z);
}},_applyValid:function(B,C){for(var i=0;i<this.__jz.length;i++){this.__jz[i].setValid(B);
}},_applyEnabled:function(D,E){var F=this.__jz;

if(D==null){for(var i=0,l=F.length;i<l;i++){F[i].resetEnabled();
}}else{for(var i=0,l=F.length;i<l;i++){F[i].setEnabled(D);
}}},_applyAllowEmptySelection:function(G,H){if(!G&&this.isSelectionEmpty()){this.resetSelection();
}},selectNext:function(){var I=this.getSelection()[0];
var K=this.__jz;
var J=K.indexOf(I);

if(J==-1){return;
}var i=0;
var length=K.length;
if(this.getWrap()){J=(J+1)%length;
}else{J=Math.min(J+1,length-1);
}
while(i<length&&!K[J].getEnabled()){J=(J+1)%length;
i++;
}this.setSelection([K[J]]);
},selectPrevious:function(){var L=this.getSelection()[0];
var N=this.__jz;
var M=N.indexOf(L);

if(M==-1){return;
}var i=0;
var length=N.length;
if(this.getWrap()){M=(M-1+length)%length;
}else{M=Math.max(M-1,0);
}
while(i<length&&!N[M].getEnabled()){M=(M-1+length)%length;
i++;
}this.setSelection([N[M]]);
},_getItems:function(){return this.getItems();
},_isAllowEmptySelection:function(){return this.isAllowEmptySelection();
},_isItemSelectable:function(O){return this.__jz.indexOf(O)!=-1;
},__jA:function(e){var Q=e.getData()[0];
var P=e.getOldData()[0];

if(P){P.setValue(false);
}
if(Q){Q.setValue(true);
}}},destruct:function(){this._disposeArray(f);
}});
})();
(function(){var h="[",g="]",f=".",d="idBubble",c="changeBubble",b="qx.data.marshal.MEventBubbling",a="qx.event.type.Data";
qx.Mixin.define(b,{events:{"changeBubble":a},members:{_applyEventPropagation:function(i,j,name){this.fireDataEvent(c,{value:i,name:name,old:j});
this._registerEventChaining(i,j,name);
},_registerEventChaining:function(k,l,name){if((k instanceof qx.core.Object)&&qx.Class.hasMixin(k.constructor,qx.data.marshal.MEventBubbling)){var m=qx.lang.Function.bind(this.__jB,this,name);
var n=k.addListener(c,m,this);
k.setUserData(d,n);
}if(l!=null&&l.getUserData&&l.getUserData(d)!=null){l.removeListenerById(l.getUserData(d));
}},__jB:function(name,e){var v=e.getData();
var r=v.value;
var p=v.old;
if(qx.Class.hasInterface(e.getTarget().constructor,qx.data.IListData)){if(v.name.indexOf){var u=v.name.indexOf(f)!=-1?v.name.indexOf(f):v.name.length;
var s=v.name.indexOf(h)!=-1?v.name.indexOf(h):v.name.length;

if(u<s){var o=v.name.substring(0,u);
var t=v.name.substring(u+1,v.name.length);

if(t[0]!=h){t=f+t;
}var q=name+h+o+g+t;
}else if(s<u){var o=v.name.substring(0,s);
var t=v.name.substring(s,v.name.length);
var q=name+h+o+g+t;
}else{var q=name+h+v.name+g;
}}else{var q=name+h+v.name+g;
}}else{var q=name+f+v.name;
}this.fireDataEvent(c,{value:r,name:q,old:p});
}}});
})();
(function(){var q="change",p="changeBubble",o="add",n="remove",m="0-",l="order",k="-",j="0",h="qx.event.type.Data",g="",c="qx.data.Array",f="qx.debug",e="The parameter must be an array.",b="number",a="on",d="changeLength";
qx.Class.define(c,{extend:qx.core.Object,include:qx.data.marshal.MEventBubbling,implement:[qx.data.IListData],construct:function(r){qx.core.Object.call(this);
if(r==undefined){this.__jC=[];
}else if(arguments.length>1){this.__jC=[];

for(var i=0;i<arguments.length;i++){this.__jC.push(arguments[i]);
}}else if(typeof r==b){this.__jC=new Array(r);
}else if(r instanceof Array){this.__jC=qx.lang.Array.clone(r);
}else{this.__jC=[];
throw new Error("Type of the parameter not supported!");
}for(var i=0;i<this.__jC.length;i++){this._applyEventPropagation(this.__jC[i],null,i);
}this.__jD();
},events:{"change":h,"changeLength":h},members:{__jC:null,concat:function(s){if(s){var t=this.__jC.concat(s);
}else{var t=this.__jC.concat();
}return new qx.data.Array(t);
},join:function(u){return this.__jC.join(u);
},pop:function(){var v=this.__jC.pop();
this.__jD();
this._registerEventChaining(null,v,this.length-1);
this.fireDataEvent(p,{value:[],name:this.length,old:[v]});
this.fireDataEvent(q,{start:this.length-1,end:this.length-1,type:n,items:[v]},null);
return v;
},push:function(w){for(var i=0;i<arguments.length;i++){this.__jC.push(arguments[i]);
this.__jD();
this._registerEventChaining(arguments[i],null,this.length-1);
this.fireDataEvent(p,{value:[arguments[i]],name:this.length-1,old:[]});
this.fireDataEvent(q,{start:this.length-1,end:this.length-1,type:o,items:[arguments[i]]},null);
}return this.length;
},reverse:function(){if(this.length==0){return;
}var x=this.__jC.concat();
this.__jC.reverse();
this.fireDataEvent(q,{start:0,end:this.length-1,type:l,items:null},null);
this.fireDataEvent(p,{value:this.__jC,name:m+(this.__jC.length-1),old:x});
},shift:function(){if(this.length==0){return;
}var y=this.__jC.shift();
this.__jD();
this._registerEventChaining(null,y,this.length-1);
this.fireDataEvent(p,{value:[],name:j,old:[y]});
this.fireDataEvent(q,{start:0,end:this.length-1,type:n,items:[y]},null);
return y;
},slice:function(z,A){return new qx.data.Array(this.__jC.slice(z,A));
},splice:function(B,C,D){var L=this.__jC.length;
var H=this.__jC.splice.apply(this.__jC,arguments);
if(this.__jC.length!=L){this.__jD();
}var J=C>0;
var F=arguments.length>2;
var G=null;

if(J||F){if(this.__jC.length>L){var K=o;
}else if(this.__jC.length<L){var K=n;
G=H;
}else{var K=l;
}this.fireDataEvent(q,{start:B,end:this.length-1,type:K,items:G},null);
}for(var i=2;i<arguments.length;i++){this._registerEventChaining(arguments[i],null,B+i);
}var I=[];

for(var i=2;i<arguments.length;i++){I[i-2]=arguments[i];
}var E=(B+Math.max(arguments.length-3,C-1));
var name=B==E?E:B+k+E;
this.fireDataEvent(p,{value:I,name:name,old:H});
for(var i=0;i<H.length;i++){this._registerEventChaining(null,H[i],i);
}return (new qx.data.Array(H));
},sort:function(M){if(this.length==0){return;
}var N=this.__jC.concat();
this.__jC.sort.apply(this.__jC,arguments);
this.fireDataEvent(q,{start:0,end:this.length-1,type:l,items:null},null);
this.fireDataEvent(p,{value:this.__jC,name:m+(this.length-1),old:N});
},unshift:function(O){for(var i=arguments.length-1;i>=0;i--){this.__jC.unshift(arguments[i]);
this.__jD();
this._registerEventChaining(arguments[i],null,0);
this.fireDataEvent(p,{value:[this.__jC[0]],name:j,old:[this.__jC[1]]});
this.fireDataEvent(q,{start:0,end:this.length-1,type:o,items:[arguments[i]]},null);
}return this.length;
},toArray:function(){return this.__jC;
},getItem:function(P){return this.__jC[P];
},setItem:function(Q,R){var S=this.__jC[Q];
if(S===R){return;
}this.__jC[Q]=R;
this._registerEventChaining(R,S,Q);
if(this.length!=this.__jC.length){this.__jD();
}this.fireDataEvent(p,{value:[R],name:Q,old:[S]});
this.fireDataEvent(q,{start:Q,end:Q,type:o,items:[R]},null);
},getLength:function(){return this.length;
},indexOf:function(T){return this.__jC.indexOf(T);
},toString:function(){if(this.__jC!=null){return this.__jC.toString();
}return g;
},contains:function(U){return this.__jC.indexOf(U)!==-1;
},copy:function(){return this.concat();
},insertAt:function(V,W){this.splice(V,0,W);
},insertBefore:function(X,Y){var ba=this.indexOf(X);

if(ba==-1){this.push(Y);
}else{this.splice(ba,0,Y);
}},insertAfter:function(bb,bc){var bd=this.indexOf(bb);

if(bd==-1||bd==(this.length-1)){this.push(bc);
}else{this.splice(bd+1,0,bc);
}},removeAt:function(be){return this.splice(be,1).getItem(0);
},removeAll:function(){for(var i=0;i<this.__jC.length;i++){this._registerEventChaining(null,this.__jC[i],i);
}if(this.getLength()==0){return;
}var bg=this.getLength();
var bf=this.__jC.concat();
this.__jC.length=0;
this.__jD();
this.fireDataEvent(p,{value:[],name:m+(bg-1),old:bf});
this.fireDataEvent(q,{start:0,end:bg-1,type:n,items:bf},null);
},append:function(bh){if(bh instanceof qx.data.Array){bh=bh.toArray();
}if(qx.core.Variant.isSet(f,a)){qx.core.Assert.assertArray(bh,e);
}Array.prototype.push.apply(this.__jC,bh);
for(var i=0;i<bh.length;i++){this._registerEventChaining(bh[i],null,this.__jC.length+i);
}var bi=this.length;
this.__jD();
this.fireDataEvent(p,{value:bh,name:bi==(this.length-1)?bi:bi+k+(this.length-1),old:[]});
this.fireDataEvent(q,{start:bi,end:this.length-1,type:o,items:bh},null);
},remove:function(bj){var bk=this.indexOf(bj);

if(bk!=-1){this.splice(bk,1);
return bj;
}},equals:function(bl){if(this.length!==bl.length){return false;
}
for(var i=0;i<this.length;i++){if(this.getItem(i)!==bl.getItem(i)){return false;
}}return true;
},sum:function(){var bm=0;

for(var i=0;i<this.length;i++){bm+=this.getItem(i);
}return bm;
},max:function(){var bn=this.getItem(0);

for(var i=1;i<this.length;i++){if(this.getItem(i)>bn){bn=this.getItem(i);
}}return bn===undefined?null:bn;
},min:function(){var bo=this.getItem(0);

for(var i=1;i<this.length;i++){if(this.getItem(i)<bo){bo=this.getItem(i);
}}return bo===undefined?null:bo;
},forEach:function(bp,bq){for(var i=0;i<this.__jC.length;i++){bp.call(bq,this.__jC[i]);
}},__jD:function(){var br=this.length;
this.length=this.__jC.length;
this.fireDataEvent(d,this.length,br);
}},destruct:function(){for(var i=0;i<this.__jC.length;i++){this._applyEventPropagation(null,this.__jC[i],i);
}this.__jC=null;
}});
})();
(function(){var e="arrow",d="qx.ui.toolbar.MenuButton",c="Boolean",b="_applyShowArrow",a="toolbar-menubutton";
qx.Class.define(d,{extend:qx.ui.menubar.Button,properties:{appearance:{refine:true,init:a},showArrow:{check:c,init:false,themeable:true,apply:b}},members:{_createChildControlImpl:function(f,g){var h;

switch(f){case e:h=new qx.ui.basic.Image();
h.setAnonymous(true);
this._addAt(h,10);
break;
}return h||qx.ui.menubar.Button.prototype._createChildControlImpl.call(this,f);
},_applyShowArrow:function(i,j){if(i){this._showChildControl(e);
}else{this._excludeChildControl(e);
}}}});
})();
(function(){var k="pressed",j="abandoned",i="hovered",h="Boolean",g="Space",f="undetermined",d="Enter",c="checked",b="mousedown",a="_applyTriState",w="mouseout",v="changeValue",u="keydown",t="_applyGroup",s="button",r="execute",q="qx.ui.form.RadioGroup",p="_applyValue",o="qx.ui.form.ToggleButton",n="mouseover",l="keyup",m="mouseup";
qx.Class.define(o,{extend:qx.ui.basic.Atom,include:[qx.ui.core.MExecutable],implement:[qx.ui.form.IBooleanForm,qx.ui.form.IExecutable,qx.ui.form.IRadioItem],construct:function(x,y){qx.ui.basic.Atom.call(this,x,y);
this.addListener(n,this._onMouseOver);
this.addListener(w,this._onMouseOut);
this.addListener(b,this._onMouseDown);
this.addListener(m,this._onMouseUp);
this.addListener(u,this._onKeyDown);
this.addListener(l,this._onKeyUp);
this.addListener(r,this._onExecute,this);
},properties:{appearance:{refine:true,init:s},focusable:{refine:true,init:true},value:{check:h,nullable:true,event:v,apply:p,init:false},group:{check:q,nullable:true,apply:t},triState:{check:h,apply:a,nullable:true,init:null}},members:{_applyGroup:function(z,A){if(A){A.remove(this);
}
if(z){z.add(this);
}},_applyValue:function(B,C){B?this.addState(c):this.removeState(c);

if(this.isTriState()){if(B===null){this.addState(f);
}else if(C===null){this.removeState(f);
}}},_applyTriState:function(D,E){this._applyValue(this.getValue());
},_onExecute:function(e){this.toggleValue();
},_onMouseOver:function(e){if(e.getTarget()!==this){return;
}this.addState(i);

if(this.hasState(j)){this.removeState(j);
this.addState(k);
}},_onMouseOut:function(e){if(e.getTarget()!==this){return;
}this.removeState(i);

if(this.hasState(k)){if(!this.getValue()){this.removeState(k);
}this.addState(j);
}},_onMouseDown:function(e){if(!e.isLeftPressed()){return;
}this.capture();
this.removeState(j);
this.addState(k);
e.stopPropagation();
},_onMouseUp:function(e){this.releaseCapture();

if(this.hasState(j)){this.removeState(j);
}else if(this.hasState(k)){this.execute();
}this.removeState(k);
e.stopPropagation();
},_onKeyDown:function(e){switch(e.getKeyIdentifier()){case d:case g:this.removeState(j);
this.addState(k);
e.stopPropagation();
}},_onKeyUp:function(e){if(!this.hasState(k)){return;
}
switch(e.getKeyIdentifier()){case d:case g:this.removeState(j);
this.execute();
this.removeState(k);
e.stopPropagation();
}}}});
})();
(function(){var e="inherit",d="toolbar-button",c="qx.ui.toolbar.CheckBox",b="keydown",a="keyup";
qx.Class.define(c,{extend:qx.ui.form.ToggleButton,construct:function(f,g){qx.ui.form.ToggleButton.call(this,f,g);
this.removeListener(b,this._onKeyDown);
this.removeListener(a,this._onKeyUp);
},properties:{appearance:{refine:true,init:d},show:{refine:true,init:e},focusable:{refine:true,init:false}}});
})();
(function(){var a="qx.ui.toolbar.RadioButton";
qx.Class.define(a,{extend:qx.ui.toolbar.CheckBox,include:[qx.ui.form.MModelProperty],implement:[qx.ui.form.IModel,qx.ui.form.IRadioItem],members:{_applyValue:function(b,c){qx.ui.toolbar.CheckBox.prototype._applyValue.call(this,b,c);

if(b){var d=this.getGroup();

if(d){d.setSelection([this]);
}}},_onExecute:function(e){var f=this.getGroup();

if(f&&f.getAllowEmptySelection()||!f){this.toggleValue();
}else{this.setValue(true);
}}}});
})();
(function(){var j="String",i="qx.ui.embed.AbstractIframe",h="name",g="",f="_applySource",d="navigate",c="qx.event.type.Event",b="_applyFrameName",a="qx.event.type.Data";
qx.Class.define(i,{extend:qx.ui.core.Widget,construct:function(k){qx.ui.core.Widget.call(this);

if(k){this.setSource(k);
}this._getIframeElement().addListener(d,this.__GR,this);
},events:{"load":c,"navigate":a},properties:{source:{check:j,apply:f,nullable:true},frameName:{check:j,init:g,apply:b}},members:{_getIframeElement:function(){throw new Error("Abstract method call");
},_applySource:function(l,m){this._getIframeElement().setSource(l);
},_applyFrameName:function(n,o){this._getIframeElement().setAttribute(h,n);
},getWindow:function(){return this._getIframeElement().getWindow();
},getDocument:function(){return this._getIframeElement().getDocument();
},getBody:function(){return this._getIframeElement().getBody();
},getName:function(){return this._getIframeElement().getName();
},reload:function(){this._getIframeElement().reload();
},__GR:function(e){var p=e.getData();

if(p){this.setSource(p);
}this.fireDataEvent("navigate",p);
}}});
})();
(function(){var k="qx.client",j="mousedown",i="load",h="help",g="mouseup",f="losecapture",d="contextmenu",c="none",b="display",a="no",G="Boolean",F="px",E="url(",D=")",C="gecko",B="repeat",A="div",z="auto",y="_applyScrollbar",x="__GV",r="DOMNodeInserted",s="_applyNativeHelp",p="yes",q="scrolling",n="/",o="appear",l="mshtml",m="block",t="qx.ui.embed.Iframe",u="iframe",w="qx/static/blank.gif",v="absolute";
qx.Class.define(t,{extend:qx.ui.embed.AbstractIframe,construct:function(H){if(H!=null){this.__GU=H;
}qx.ui.embed.AbstractIframe.call(this,H);
qx.event.Registration.addListener(document.body,j,this.block,this,true);
qx.event.Registration.addListener(document.body,g,this.release,this,true);
qx.event.Registration.addListener(document.body,f,this.release,this,true);
this.__GV=this._createBlockerElement();
this.getContainerElement().add(this.__GV);

if(qx.core.Variant.isSet(k,C)){this.addListenerOnce(o,function(e){var I=this.getContainerElement().getDomElement();
qx.bom.Event.addNativeListener(I,r,this._onDOMNodeInserted);
});
this._onDOMNodeInserted=qx.lang.Function.listener(this._syncSourceAfterDOMMove,this);
}},properties:{appearance:{refine:true,init:u},nativeContextMenu:{refine:true,init:false},nativeHelp:{check:G,init:false,apply:s},scrollbar:{check:[z,a,p],nullable:true,themeable:true,apply:y}},members:{__GU:null,__GV:null,renderLayout:function(J,top,K,L){qx.ui.embed.AbstractIframe.prototype.renderLayout.call(this,J,top,K,L);
var N=F;
var M=this.getInsets();
this.__GV.setStyles({"left":M.left+N,"top":M.top+N,"width":(K-M.left-M.right)+N,"height":(L-M.top-M.bottom)+N});
},_createContentElement:function(){var O=new qx.html.Iframe(this.__GU);
O.addListener(i,this._onIframeLoad,this);
return O;
},_getIframeElement:function(){return this.getContentElement();
},_createBlockerElement:function(){var P=new qx.html.Element(A);
P.setStyles({"zIndex":20,"position":v,"display":c});
if(qx.core.Variant.isSet(k,l)){P.setStyles({backgroundImage:E+qx.util.ResourceManager.getInstance().toUri(w)+D,backgroundRepeat:B});
}return P;
},_onIframeLoad:function(e){this._applyNativeContextMenu(this.getNativeContextMenu(),null);
this._applyNativeHelp(this.getNativeHelp(),null);
this.fireNonBubblingEvent(i);
},block:function(){this.__GV.setStyle(b,m);
},release:function(){this.__GV.setStyle(b,c);
},_applyNativeContextMenu:function(Q,R){if(Q!==false&&R!==false){return;
}var S=this.getDocument();

if(!S){return;
}
try{var T=S.documentElement;
}catch(e){return ;
}
if(R===false){qx.event.Registration.removeListener(T,d,this._onNativeContextMenu,this,true);
}
if(Q===false){qx.event.Registration.addListener(T,d,this._onNativeContextMenu,this,true);
}},_onNativeContextMenu:function(e){e.preventDefault();
},_applyNativeHelp:qx.core.Variant.select(k,{"mshtml":function(U,V){var document=this.getDocument();

if(!document){return;
}
try{if(V===false){qx.bom.Event.removeNativeListener(document,h,qx.lang.Function.returnFalse);
}
if(U===false){qx.bom.Event.addNativeListener(document,h,qx.lang.Function.returnFalse);
}}catch(e){}},"default":function(){}}),_syncSourceAfterDOMMove:function(){var X=this.getContentElement().getDomElement();
var W=X.src;
if(W.charAt(W.length-1)==n){W=W.substring(0,W.length-1);
}
if(W!=this.getSource()){qx.bom.Iframe.getWindow(X).stop();
X.src=this.getSource();
}},_applyScrollbar:function(Y){this.getContentElement().setAttribute(q,Y);
}},destruct:function(){this._disposeObjects(x);
qx.event.Registration.removeListener(document.body,j,this.block,this,true);
qx.event.Registration.removeListener(document.body,g,this.release,this,true);
qx.event.Registration.removeListener(document.body,f,this.release,this,true);
}});
})();
(function(){var h="source",g="name",f="qx.event.type.Event",d="iframe",c="qx.html.Iframe",b="navigate",a="qx.event.type.Data";
qx.Class.define(c,{extend:qx.html.Element,construct:function(i,j,k){qx.html.Element.call(this,d,j,k);
this.setSource(i);
this.addListener(b,this.__GW,this);
},events:{"load":f,"navigate":a},members:{_applyProperty:function(name,l){qx.html.Element.prototype._applyProperty.call(this,name,l);

if(name==h){var n=this.getDomElement();
var m=qx.bom.Iframe.queryCurrentUrl(n);
if(l==m){return;
}qx.bom.Iframe.setSource(n,l);
}},_createDomElement:function(){return qx.bom.Iframe.create(this._content);
},getWindow:function(){var o=this.getDomElement();

if(o){return qx.bom.Iframe.getWindow(o);
}else{return null;
}},getDocument:function(){var p=this.getDomElement();

if(p){return qx.bom.Iframe.getDocument(p);
}else{return null;
}},getBody:function(){var q=this.getDomElement();

if(q){return qx.bom.Iframe.getBody(q);
}else{return null;
}},setSource:function(r){this._setProperty(h,r);
return this;
},getSource:function(){return this._getProperty(h);
},setName:function(name){this.setAttribute(g,name);
return this;
},getName:function(){return this.getAttribute(g);
},reload:function(){var t=this.getDomElement();

if(t){var s=this.getSource();
this.setSource(null);
this.setSource(s);
}},__GW:function(e){var u=e.getData();

if(u){this.setSource(u);
}}}});
})();
(function(){var k="Number",j="_applyInsets",i="abstract",h="insetRight",g="insetTop",f="qx.debug",e="insetBottom",d="qx.ui.decoration.Abstract",c="shorthand",b="on",a="insetLeft";
qx.Class.define(d,{extend:qx.core.Object,implement:[qx.ui.decoration.IDecorator],type:i,properties:{insetLeft:{check:k,nullable:true,apply:j},insetRight:{check:k,nullable:true,apply:j},insetBottom:{check:k,nullable:true,apply:j},insetTop:{check:k,nullable:true,apply:j},insets:{group:[g,h,e,a],mode:c}},members:{__tL:null,_getDefaultInsets:function(){throw new Error("Abstract method called.");
},_isInitialized:function(){throw new Error("Abstract method called.");
},_resetInsets:function(){this.__tL=null;
},getInsets:function(){if(this.__tL){return this.__tL;
}var l=this._getDefaultInsets();
return this.__tL={left:this.getInsetLeft()==null?l.left:this.getInsetLeft(),right:this.getInsetRight()==null?l.right:this.getInsetRight(),bottom:this.getInsetBottom()==null?l.bottom:this.getInsetBottom(),top:this.getInsetTop()==null?l.top:this.getInsetTop()};
},_applyInsets:function(){if(qx.core.Variant.isSet(f,b)){if(this._isInitialized()){throw new Error("This decorator is already in-use. Modification is not possible anymore!");
}}this.__tL=null;
}},destruct:function(){this.__tL=null;
}});
})();
(function(){var s="_applyBackground",r="repeat",q="mshtml",p="on",o="backgroundPositionX",n="",m="backgroundPositionY",l="qx.debug",k="no-repeat",j="scale",d=" ",i="repeat-x",g="qx.client",c="repeat-y",b="hidden",f="qx.ui.decoration.MBackgroundImage",e="String",h='"></div>',a='<div style="';
qx.Mixin.define(f,{properties:{backgroundImage:{check:e,nullable:true,apply:s},backgroundRepeat:{check:[r,i,c,k,j],init:r,apply:s},backgroundPositionX:{nullable:true,apply:s},backgroundPositionY:{nullable:true,apply:s},backgroundPosition:{group:[m,o]}},members:{_generateBackgroundMarkup:function(t){var x=n;
var w=this.getBackgroundImage();
var v=this.getBackgroundRepeat();
var top=this.getBackgroundPositionY();

if(top==null){top=0;
}var y=this.getBackgroundPositionX();

if(y==null){y=0;
}t.backgroundPosition=y+d+top;
if(w){var u=qx.util.AliasManager.getInstance().resolve(w);
x=qx.bom.element.Decoration.create(u,v,t);
}else{if(t){if(qx.core.Variant.isSet(g,q)){if(qx.bom.client.Engine.VERSION<7||qx.bom.client.Feature.QUIRKS_MODE){t.overflow=b;
}}x=a+qx.bom.element.Style.compile(t)+h;
}}return x;
},_applyBackground:function(){if(qx.core.Variant.isSet(l,p)){if(this._isInitialized()){throw new Error("This decorator is already in-use. Modification is not possible anymore!");
}}}}});
})();
(function(){var h="px",g="qx.ui.decoration.Background",f="",e="qx.debug",d="_applyStyle",c="on",b="Color",a="absolute";
qx.Class.define(g,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(i){qx.ui.decoration.Abstract.call(this);

if(i!=null){this.setBackgroundColor(i);
}},properties:{backgroundColor:{check:b,nullable:true,apply:d}},members:{__tN:null,_getDefaultInsets:function(){return {top:0,right:0,bottom:0,left:0};
},_isInitialized:function(){return !!this.__tN;
},getMarkup:function(){if(this.__tN){return this.__tN;
}var j={position:a,top:0,left:0};
var k=this._generateBackgroundMarkup(j);
return this.__tN=k;
},resize:function(l,m,n){var o=this.getInsets();
l.style.width=(m-o.left-o.right)+h;
l.style.height=(n-o.top-o.bottom)+h;
l.style.left=-o.left+h;
l.style.top=-o.top+h;
},tint:function(p,q){var r=qx.theme.manager.Color.getInstance();

if(q==null){q=this.getBackgroundColor();
}p.style.backgroundColor=r.resolve(q)||f;
},_applyStyle:function(){if(qx.core.Variant.isSet(e,c)){if(this._isInitialized()){throw new Error("This decorator is already in-use. Modification is not possible anymore!");
}}}},destruct:function(){this.__tN=null;
}});
})();
(function(){var i="auto",h="overflowX",g="visible",f="hidden",e="scroll",d="overflowY",c="_applyOverflowX",b="_applyOverflowY",a="qx.ui.core.MNativeOverflow";
qx.Mixin.define(a,{properties:{overflowX:{check:[f,g,e,i],nullable:true,apply:c},overflowY:{check:[f,g,e,i],nullable:true,apply:b},overflow:{group:[h,d]}},members:{_applyOverflowX:function(j){this.getContentElement().setStyle(h,j);
},_applyOverflowY:function(k){this.getContentElement().setStyle(d,k);
}}});
})();
(function(){var o="none",n="text",m="",l="userSelect",k="color",j="String",i="0px",h="webkit",g="changeHtml",f="_applyCssClass",c="class",e="qx.ui.embed.Html",d="_applyHtml",b="qx.client",a="html";
qx.Class.define(e,{extend:qx.ui.core.Widget,include:[qx.ui.core.MNativeOverflow],construct:function(p){qx.ui.core.Widget.call(this);

if(p!=null){this.setHtml(p);
}},properties:{html:{check:j,apply:d,event:g,nullable:true},cssClass:{check:j,init:m,apply:f},selectable:{refine:true,init:true},focusable:{refine:true,init:true}},members:{getFocusElement:function(){return this.getContentElement();
},_applyHtml:function(q,r){var s=this.getContentElement();
s.setAttribute(a,q||m);
s.setStyles({"padding":i,"border":o});
},_applyCssClass:function(t,u){this.getContentElement().setAttribute(c,t);
},_applySelectable:function(v){qx.ui.core.Widget.prototype._applySelectable.call(this,v);
if(qx.core.Variant.isSet(b,h)){this.getContainerElement().setStyle(l,v?n:o);
this.getContentElement().setStyle(l,v?n:o);
}},_applyFont:function(w,x){var y=w?qx.theme.manager.Font.getInstance().resolve(w).getStyles():qx.bom.Font.getDefaultStyles();
this.getContentElement().setStyles(y);
},_applyTextColor:function(z,A){if(z){this.getContentElement().setStyle(k,qx.theme.manager.Color.getInstance().resolve(z));
}else{this.getContentElement().removeStyle(k);
}}}});
})();
(function(){var q="",p='.qxappender .type-array{color:#CC3E8A;font-weight:bold;}',o='.qxappender .type-instance{color:#565656;font-weight:bold}',n="qx.log.appender.Element",m='.qxappender .level-info{background:#DEEDFA}',l='.qxappender .type-stringify{color:#565656;font-weight:bold}',k='.qxappender .type-number{color:#155791;font-weight:normal;}',j="qxappender",i='.qxappender .type-map{color:#CC3E8A;font-weight:bold;}',h='.qxappender .type-class{color:#5F3E8A;font-weight:bold}',c='.qxappender .type-boolean{color:#15BC91;font-weight:normal;}',g='.qxappender .level-error{background:#FFE2D5}',f='.qxappender .level-debug{background:white}',b='.qxappender .type-key{color:#565656;font-style:italic}',a='.qxappender .level-user{background:#E3EFE9}',e='.qxappender .level-warn{background:#FFF7D5}',d='.qxappender .type-string{color:black;font-weight:normal;}';
qx.Class.define(n,{extend:qx.core.Object,construct:function(r){qx.core.Object.call(this);
var s=[f,m,e,g,a,d,k,c,p,i,b,h,o,l];
qx.bom.Stylesheet.createElement(s.join(q));
qx.log.Logger.register(this);
},members:{__Fh:null,setElement:function(t){this.clear();
if(t){qx.bom.element.Class.add(t,j);
}this.__Fh=t;
},clear:function(){var u=this.__Fh;
if(u){u.innerHTML=q;
}},process:function(v){var w=this.__Fh;

if(!w){return;
}w.appendChild(qx.log.appender.Util.toHtml(v));
w.scrollTop=w.scrollHeight;
}},destruct:function(){this.__Fh=null;
}});
})();
(function(){var m="default",k="native",j="",h=" ",g="\\b",f="(\\s|$)",e="(^|\\s)",d="g",c="qx.bom.element.Class",b="$2",a="\\b|\\b";
qx.Class.define(c,{statics:{__Dn:/\s+/g,__Do:/^\s+|\s+$/g,add:qx.lang.Object.select(qx.bom.client.Feature.HTML5_CLASSLIST?k:m,{"native":function(n,name){n.classList.add(name);
return name;
},"default":function(o,name){if(!this.has(o,name)){o.className+=(o.className?h:j)+name;
}return name;
}}),addClasses:qx.lang.Object.select(qx.bom.client.Feature.HTML5_CLASSLIST?k:m,{"native":function(p,q){for(var i=0;i<q.length;i++){p.classList.add(q[i]);
}return p.className;
},"default":function(r,s){var t={};
var v;
var u=r.className;

if(u){v=u.split(this.__Dn);

for(var i=0,l=v.length;i<l;i++){t[v[i]]=true;
}
for(var i=0,l=s.length;i<l;i++){if(!t[s[i]]){v.push(s[i]);
}}}else{v=s;
}return r.className=v.join(h);
}}),get:function(w){return w.className;
},has:qx.lang.Object.select(qx.bom.client.Feature.HTML5_CLASSLIST?k:m,{"native":function(x,name){return x.classList.contains(name);
},"default":function(y,name){var z=new RegExp(e+name+f);
return z.test(y.className);
}}),remove:qx.lang.Object.select(qx.bom.client.Feature.HTML5_CLASSLIST?k:m,{"native":function(A,name){A.classList.remove(name);
return name;
},"default":function(B,name){var C=new RegExp(e+name+f);
B.className=B.className.replace(C,b);
return name;
}}),removeClasses:qx.lang.Object.select(qx.bom.client.Feature.HTML5_CLASSLIST?k:m,{"native":function(D,E){for(var i=0;i<E.length;i++){D.classList.remove(E[i]);
}return D.className;
},"default":function(F,G){var H=new RegExp(g+G.join(a)+g,d);
return F.className=F.className.replace(H,j).replace(this.__Do,j).replace(this.__Dn,h);
}}),replace:function(I,J,K){this.remove(I,J);
return this.add(I,K);
},toggle:qx.lang.Object.select(qx.bom.client.Feature.HTML5_CLASSLIST?k:m,{"native":function(L,name,M){if(M===undefined){L.classList.toggle(name);
}else{M?this.add(L,name):this.remove(L,name);
}return name;
},"default":function(N,name,O){if(O==null){O=!this.has(N,name);
}O?this.add(N,name):this.remove(N,name);
return name;
}})}});
})();
(function(){var b="qx.nativeScrollBars",a="qx.ui.core.scroll.MScrollBarFactory";
qx.core.Setting.define(b,false);
qx.Mixin.define(a,{members:{_createScrollBar:function(c){if(qx.core.Setting.get(b)){return new qx.ui.core.scroll.NativeScrollBar(c);
}else{return new qx.ui.core.scroll.ScrollBar(c);
}}}});
})();
(function(){var k="scrollbar-y",j="scrollbar-x",i="pane",h="auto",g="corner",f="scrollbar-",d="on",c="_computeScrollbars",b="getDocument",a="changeVisibility",D="off",C="x",B="scroll",A="touchmove",z="scrollY",y="Left",x="mousewheel",w="scrollbarX",v="scrollarea",u="y",r="vertical",s="scrollX",p="touchstart",q="horizontal",n="qx.ui.core.scroll.AbstractScrollArea",o="abstract",l="update",m="scrollbarY",t="Top";
qx.Class.define(n,{extend:qx.ui.core.Widget,include:qx.ui.core.scroll.MScrollBarFactory,type:o,construct:function(){qx.ui.core.Widget.call(this);
var E=new qx.ui.layout.Grid();
E.setColumnFlex(0,1);
E.setRowFlex(0,1);
this._setLayout(E);
this.addListener(x,this._onMouseWheel,this);
if(qx.bom.client.Feature.TOUCH){this.addListener(A,this._onTouchMove,this);
this.addListener(p,function(){this.__lc={"x":0,"y":0};
},this);
this.__lc={};
this.__ld={};
}},properties:{appearance:{refine:true,init:v},width:{refine:true,init:100},height:{refine:true,init:200},scrollbarX:{check:[h,d,D],init:h,themeable:true,apply:c},scrollbarY:{check:[h,d,D],init:h,themeable:true,apply:c},scrollbar:{group:[w,m]}},members:{__lc:null,__ld:null,_createChildControlImpl:function(F,G){var H;

switch(F){case i:H=new qx.ui.core.scroll.ScrollPane();
H.addListener(l,this._computeScrollbars,this);
H.addListener(s,this._onScrollPaneX,this);
H.addListener(z,this._onScrollPaneY,this);
this._add(H,{row:0,column:0});
break;
case j:H=this._createScrollBar(q);
H.setMinWidth(0);
H.exclude();
H.addListener(B,this._onScrollBarX,this);
H.addListener(a,this._onChangeScrollbarXVisibility,this);
this._add(H,{row:1,column:0});
break;
case k:H=this._createScrollBar(r);
H.setMinHeight(0);
H.exclude();
H.addListener(B,this._onScrollBarY,this);
H.addListener(a,this._onChangeScrollbarYVisibility,this);
this._add(H,{row:0,column:1});
break;
case g:H=new qx.ui.core.Widget();
H.setWidth(0);
H.setHeight(0);
H.exclude();
this._add(H,{row:1,column:1});
break;
}return H||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,F);
},getPaneSize:function(){return this.getChildControl(i).getInnerSize();
},getItemTop:function(I){return this.getChildControl(i).getItemTop(I);
},getItemBottom:function(J){return this.getChildControl(i).getItemBottom(J);
},getItemLeft:function(K){return this.getChildControl(i).getItemLeft(K);
},getItemRight:function(L){return this.getChildControl(i).getItemRight(L);
},scrollToX:function(M){qx.ui.core.queue.Manager.flush();
this.getChildControl(j).scrollTo(M);
},scrollByX:function(N){qx.ui.core.queue.Manager.flush();
this.getChildControl(j).scrollBy(N);
},getScrollX:function(){var O=this.getChildControl(j,true);
return O?O.getPosition():0;
},scrollToY:function(P){qx.ui.core.queue.Manager.flush();
this.getChildControl(k).scrollTo(P);
},scrollByY:function(Q){qx.ui.core.queue.Manager.flush();
this.getChildControl(k).scrollBy(Q);
},getScrollY:function(){var R=this.getChildControl(k,true);
return R?R.getPosition():0;
},_onScrollBarX:function(e){this.getChildControl(i).scrollToX(e.getData());
},_onScrollBarY:function(e){this.getChildControl(i).scrollToY(e.getData());
},_onScrollPaneX:function(e){this.scrollToX(e.getData());
},_onScrollPaneY:function(e){this.scrollToY(e.getData());
},_onMouseWheel:function(e){var U=this._isChildControlVisible(j);
var V=this._isChildControlVisible(k);
var T=(V)?this.getChildControl(k,true):(U?this.getChildControl(j,true):null);

if(T){var W=e.getWheelDelta();
T.scrollBySteps(W);
var X=T.getPosition();
var S=T.getMaximum();
if(W<0&&X<=0||W>0&&X>=S){return ;
}e.stop();
}},_onTouchMove:function(e){this._onTouchMoveDirectional(C,e);
this._onTouchMoveDirectional(u,e);
e.stop();
},_onTouchMoveDirectional:function(Y,e){var ba=(Y==C?y:t);
var bc=this.getChildControl(f+Y,true);
var bd=this._isChildControlVisible(f+Y);

if(bd&&bc){if(this.__lc[Y]==0){var bb=0;
}else{var bb=-(e[b+ba]()-this.__lc[Y]);
}this.__lc[Y]=e[b+ba]();
bc.scrollBy(bb);
if(this.__ld[Y]){clearTimeout(this.__ld[Y]);
this.__ld[Y]=null;
}this.__ld[Y]=setTimeout(qx.lang.Function.bind(function(be){this.__le(be,Y);
},this,bb),100);
}},__le:function(bf,bg){this.__ld[bg]=null;
var bi=this._isChildControlVisible(f+bg);

if(bf==0||!bi){return;
}if(bf>0){bf=Math.max(0,bf-3);
}else{bf=Math.min(0,bf+3);
}this.__ld[bg]=setTimeout(qx.lang.Function.bind(function(bj,bk){this.__le(bj,bk);
},this,bf,bg),20);
var bh=this.getChildControl(f+bg,true);
bh.scrollBy(bf);
},_onChangeScrollbarXVisibility:function(e){var bl=this._isChildControlVisible(j);
var bm=this._isChildControlVisible(k);

if(!bl){this.scrollToX(0);
}bl&&bm?this._showChildControl(g):this._excludeChildControl(g);
},_onChangeScrollbarYVisibility:function(e){var bn=this._isChildControlVisible(j);
var bo=this._isChildControlVisible(k);

if(!bo){this.scrollToY(0);
}bn&&bo?this._showChildControl(g):this._excludeChildControl(g);
},_computeScrollbars:function(){var bv=this.getChildControl(i);
var content=bv.getChildren()[0];

if(!content){this._excludeChildControl(j);
this._excludeChildControl(k);
return;
}var bp=this.getInnerSize();
var bu=bv.getInnerSize();
var bs=bv.getScrollSize();
if(!bu||!bs){return;
}var bw=this.getScrollbarX();
var bx=this.getScrollbarY();

if(bw===h&&bx===h){var bt=bs.width>bp.width;
var by=bs.height>bp.height;
if((bt||by)&&!(bt&&by)){if(bt){by=bs.height>bu.height;
}else if(by){bt=bs.width>bu.width;
}}}else{var bt=bw===d;
var by=bx===d;
if(bs.width>(bt?bu.width:bp.width)&&bw===h){bt=true;
}
if(bs.height>(bt?bu.height:bp.height)&&bx===h){by=true;
}}if(bt){var br=this.getChildControl(j);
br.show();
br.setMaximum(Math.max(0,bs.width-bu.width));
br.setKnobFactor((bs.width===0)?0:bu.width/bs.width);
}else{this._excludeChildControl(j);
}
if(by){var bq=this.getChildControl(k);
bq.show();
bq.setMaximum(Math.max(0,bs.height-bu.height));
bq.setKnobFactor((bs.height===0)?0:bu.height/bs.height);
}else{this._excludeChildControl(k);
}}}});
})();
(function(){var p="Integer",o="_applyContentPadding",n="resetPaddingRight",m="setPaddingBottom",l="resetPaddingTop",k="qx.ui.core.MContentPadding",j="resetPaddingLeft",i="setPaddingTop",h="setPaddingRight",g="resetPaddingBottom",c="contentPaddingLeft",f="setPaddingLeft",e="contentPaddingTop",b="shorthand",a="contentPaddingRight",d="contentPaddingBottom";
qx.Mixin.define(k,{properties:{contentPaddingTop:{check:p,init:0,apply:o,themeable:true},contentPaddingRight:{check:p,init:0,apply:o,themeable:true},contentPaddingBottom:{check:p,init:0,apply:o,themeable:true},contentPaddingLeft:{check:p,init:0,apply:o,themeable:true},contentPadding:{group:[e,a,d,c],mode:b,themeable:true}},members:{__lf:{contentPaddingTop:i,contentPaddingRight:h,contentPaddingBottom:m,contentPaddingLeft:f},__lg:{contentPaddingTop:l,contentPaddingRight:n,contentPaddingBottom:g,contentPaddingLeft:j},_applyContentPadding:function(q,r,name){var s=this._getContentPaddingTarget();

if(q==null){var t=this.__lg[name];
s[t]();
}else{var u=this.__lf[name];
s[u](q);
}}}});
})();
(function(){var v="single",u="Boolean",t="one",s="changeSelection",r="mouseup",q="mousedown",p="__lh",o="losecapture",n="multi",m="_applyQuickSelection",d="mouseover",l="_applySelectionMode",h="_applyDragSelection",c="qx.ui.core.MMultiSelectionHandling",b="removeItem",g="keypress",f="qx.event.type.Data",j="addItem",a="additive",k="mousemove";
qx.Mixin.define(c,{construct:function(){var x=this.SELECTION_MANAGER;
var w=this.__lh=new x(this);
this.addListener(q,w.handleMouseDown,w);
this.addListener(r,w.handleMouseUp,w);
this.addListener(d,w.handleMouseOver,w);
this.addListener(k,w.handleMouseMove,w);
this.addListener(o,w.handleLoseCapture,w);
this.addListener(g,w.handleKeyPress,w);
this.addListener(j,w.handleAddItem,w);
this.addListener(b,w.handleRemoveItem,w);
w.addListener(s,this._onSelectionChange,this);
},events:{"changeSelection":f},properties:{selectionMode:{check:[v,n,a,t],init:v,apply:l},dragSelection:{check:u,init:false,apply:h},quickSelection:{check:u,init:false,apply:m}},members:{__lh:null,selectAll:function(){this.__lh.selectAll();
},isSelected:function(y){if(!qx.ui.core.Widget.contains(this,y)){throw new Error("Could not test if "+y+" is selected, because it is not a child element!");
}return this.__lh.isItemSelected(y);
},addToSelection:function(z){if(!qx.ui.core.Widget.contains(this,z)){throw new Error("Could not add + "+z+" to selection, because it is not a child element!");
}this.__lh.addItem(z);
},removeFromSelection:function(A){if(!qx.ui.core.Widget.contains(this,A)){throw new Error("Could not remove "+A+" from selection, because it is not a child element!");
}this.__lh.removeItem(A);
},selectRange:function(B,C){this.__lh.selectItemRange(B,C);
},resetSelection:function(){this.__lh.clearSelection();
},setSelection:function(D){for(var i=0;i<D.length;i++){if(!qx.ui.core.Widget.contains(this,D[i])){throw new Error("Could not select "+D[i]+", because it is not a child element!");
}}
if(D.length===0){this.resetSelection();
}else{var E=this.getSelection();

if(!qx.lang.Array.equals(E,D)){this.__lh.replaceSelection(D);
}}},getSelection:function(){return this.__lh.getSelection();
},getSortedSelection:function(){return this.__lh.getSortedSelection();
},isSelectionEmpty:function(){return this.__lh.isSelectionEmpty();
},getSelectionContext:function(){return this.__lh.getSelectionContext();
},_getManager:function(){return this.__lh;
},getSelectables:function(F){return this.__lh.getSelectables(F);
},invertSelection:function(){this.__lh.invertSelection();
},_getLeadItem:function(){var G=this.__lh.getMode();

if(G===v||G===t){return this.__lh.getSelectedItem();
}else{return this.__lh.getLeadItem();
}},_applySelectionMode:function(H,I){this.__lh.setMode(H);
},_applyDragSelection:function(J,K){this.__lh.setDrag(J);
},_applyQuickSelection:function(L,M){this.__lh.setQuick(L);
},_onSelectionChange:function(e){this.fireDataEvent(s,e.getData());
}},destruct:function(){this._disposeObjects(p);
}});
})();
(function(){var a="qx.ui.core.IMultiSelection";
qx.Interface.define(a,{extend:qx.ui.core.ISingleSelection,members:{selectAll:function(){return true;
},addToSelection:function(b){return arguments.length==1;
},removeFromSelection:function(c){return arguments.length==1;
}}});
})();
(function(){var o="one",n="single",m="selected",k="additive",j="multi",h="PageUp",g="under",f="Left",d="lead",c="Down",M="Up",L="Boolean",K="PageDown",J="anchor",I="End",H="Home",G="Right",F="right",E="click",D="above",v="left",w="Escape",t="__ll",u="A",r="Space",s="_applyMode",p="interval",q="changeSelection",x="qx.event.type.Data",y="quick",A="key",z="abstract",C="drag",B="qx.ui.core.selection.Abstract";
qx.Class.define(B,{type:z,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__li={};
},events:{"changeSelection":x},properties:{mode:{check:[n,j,k,o],init:n,apply:s},drag:{check:L,init:false},quick:{check:L,init:false}},members:{__lj:0,__lk:0,__ll:null,__lm:null,__ln:null,__lo:null,__lp:null,__lq:null,__lr:null,__ls:null,__lt:null,__lu:null,__lv:null,__lw:null,__lx:null,__ly:null,__lz:null,__li:null,__lA:null,__lB:null,_userInteraction:false,__lC:null,getSelectionContext:function(){return this.__ly;
},selectAll:function(){var N=this.getMode();

if(N==n||N==o){throw new Error("Can not select all items in selection mode: "+N);
}this._selectAllItems();
this._fireChange();
},selectItem:function(O){this._setSelectedItem(O);
var P=this.getMode();

if(P!==n&&P!==o){this._setLeadItem(O);
this._setAnchorItem(O);
}this._scrollItemIntoView(O);
this._fireChange();
},addItem:function(Q){var R=this.getMode();

if(R===n||R===o){this._setSelectedItem(Q);
}else{if(!this._getAnchorItem()){this._setAnchorItem(Q);
}this._setLeadItem(Q);
this._addToSelection(Q);
}this._scrollItemIntoView(Q);
this._fireChange();
},removeItem:function(S){this._removeFromSelection(S);

if(this.getMode()===o&&this.isSelectionEmpty()){var T=this._getFirstSelectable();

if(T){this.addItem(T);
}if(T==S){return;
}}
if(this.getLeadItem()==S){this._setLeadItem(null);
}
if(this._getAnchorItem()==S){this._setAnchorItem(null);
}this._fireChange();
},selectItemRange:function(U,V){var W=this.getMode();

if(W==n||W==o){throw new Error("Can not select multiple items in selection mode: "+W);
}this._selectItemRange(U,V);
this._setAnchorItem(U);
this._setLeadItem(V);
this._scrollItemIntoView(V);
this._fireChange();
},clearSelection:function(){if(this.getMode()==o){return;
}this._clearSelection();
this._setLeadItem(null);
this._setAnchorItem(null);
this._fireChange();
},replaceSelection:function(X){var Y=this.getMode();

if(Y==o||Y===n){if(X.length>1){throw new Error("Could not select more than one items in mode: "+Y+"!");
}
if(X.length==1){this.selectItem(X[0]);
}else{this.clearSelection();
}return;
}else{this._replaceMultiSelection(X);
}},getSelectedItem:function(){var ba=this.getMode();

if(ba===n||ba===o){var bb=this._getSelectedItem();
return bb!=undefined?bb:null;
}throw new Error("The method getSelectedItem() is only supported in 'single' and 'one' selection mode!");
},getSelection:function(){return qx.lang.Object.getValues(this.__li);
},getSortedSelection:function(){var bd=this.getSelectables();
var bc=qx.lang.Object.getValues(this.__li);
bc.sort(function(a,b){return bd.indexOf(a)-bd.indexOf(b);
});
return bc;
},isItemSelected:function(be){var bf=this._selectableToHashCode(be);
return this.__li[bf]!==undefined;
},isSelectionEmpty:function(){return qx.lang.Object.isEmpty(this.__li);
},invertSelection:function(){var bh=this.getMode();

if(bh===n||bh===o){throw new Error("The method invertSelection() is only supported in 'multi' and 'additive' selection mode!");
}var bg=this.getSelectables();

for(var i=0;i<bg.length;i++){this._toggleInSelection(bg[i]);
}this._fireChange();
},_setLeadItem:function(bi){var bj=this.__lz;

if(bj!==null){this._styleSelectable(bj,d,false);
}
if(bi!==null){this._styleSelectable(bi,d,true);
}this.__lz=bi;
},getLeadItem:function(){return this.__lz!==null?this.__lz:null;
},_setAnchorItem:function(bk){var bl=this.__lA;

if(bl){this._styleSelectable(bl,J,false);
}
if(bk){this._styleSelectable(bk,J,true);
}this.__lA=bk;
},_getAnchorItem:function(){return this.__lA!==null?this.__lA:null;
},_isSelectable:function(bm){throw new Error("Abstract method call: _isSelectable()");
},_getSelectableFromMouseEvent:function(event){var bn=event.getTarget();
if(bn&&this._isSelectable(bn)){return bn;
}return null;
},_selectableToHashCode:function(bo){throw new Error("Abstract method call: _selectableToHashCode()");
},_styleSelectable:function(bp,bq,br){throw new Error("Abstract method call: _styleSelectable()");
},_capture:function(){throw new Error("Abstract method call: _capture()");
},_releaseCapture:function(){throw new Error("Abstract method call: _releaseCapture()");
},_getLocation:function(){throw new Error("Abstract method call: _getLocation()");
},_getDimension:function(){throw new Error("Abstract method call: _getDimension()");
},_getSelectableLocationX:function(bs){throw new Error("Abstract method call: _getSelectableLocationX()");
},_getSelectableLocationY:function(bt){throw new Error("Abstract method call: _getSelectableLocationY()");
},_getScroll:function(){throw new Error("Abstract method call: _getScroll()");
},_scrollBy:function(bu,bv){throw new Error("Abstract method call: _scrollBy()");
},_scrollItemIntoView:function(bw){throw new Error("Abstract method call: _scrollItemIntoView()");
},getSelectables:function(bx){throw new Error("Abstract method call: getSelectables()");
},_getSelectableRange:function(by,bz){throw new Error("Abstract method call: _getSelectableRange()");
},_getFirstSelectable:function(){throw new Error("Abstract method call: _getFirstSelectable()");
},_getLastSelectable:function(){throw new Error("Abstract method call: _getLastSelectable()");
},_getRelatedSelectable:function(bA,bB){throw new Error("Abstract method call: _getRelatedSelectable()");
},_getPage:function(bC,bD){throw new Error("Abstract method call: _getPage()");
},_applyMode:function(bE,bF){this._setLeadItem(null);
this._setAnchorItem(null);
this._clearSelection();
if(bE===o){var bG=this._getFirstSelectable();

if(bG!=null){this._setSelectedItem(bG);
this._scrollItemIntoView(bG);
}}this._fireChange();
},handleMouseOver:function(event){if(this.__lC!=null&&this.__lC!=this._getScroll().top){this.__lC=null;
return;
}this._userInteraction=true;

if(!this.getQuick()){this._userInteraction=false;
return;
}var bI=this.getMode();

if(bI!==o&&bI!==n){this._userInteraction=false;
return;
}var bH=this._getSelectableFromMouseEvent(event);

if(bH===null){this._userInteraction=false;
return;
}this._setSelectedItem(bH);
this._fireChange(y);
this._userInteraction=false;
},handleMouseDown:function(event){this._userInteraction=true;
var bK=this._getSelectableFromMouseEvent(event);

if(bK===null){this._userInteraction=false;
return;
}var bM=event.isCtrlPressed()||(qx.bom.client.Platform.MAC&&event.isMetaPressed());
var bJ=event.isShiftPressed();
if(this.isItemSelected(bK)&&!bJ&&!bM&&!this.getDrag()){this.__lB=bK;
this._userInteraction=false;
return;
}else{this.__lB=null;
}this._scrollItemIntoView(bK);
switch(this.getMode()){case n:case o:this._setSelectedItem(bK);
break;
case k:this._setLeadItem(bK);
this._setAnchorItem(bK);
this._toggleInSelection(bK);
break;
case j:this._setLeadItem(bK);
if(bJ){var bL=this._getAnchorItem();

if(bL===null){bL=this._getFirstSelectable();
this._setAnchorItem(bL);
}this._selectItemRange(bL,bK,bM);
}else if(bM){this._setAnchorItem(bK);
this._toggleInSelection(bK);
}else{this._setAnchorItem(bK);
this._setSelectedItem(bK);
}break;
}var bN=this.getMode();

if(this.getDrag()&&bN!==n&&bN!==o&&!bJ&&!bM){this.__lp=this._getLocation();
this.__lm=this._getScroll();
this.__lq=event.getDocumentLeft()+this.__lm.left;
this.__lr=event.getDocumentTop()+this.__lm.top;
this.__ls=true;
this._capture();
}this._fireChange(E);
this._userInteraction=false;
},handleMouseUp:function(event){this._userInteraction=true;
var bR=event.isCtrlPressed()||(qx.bom.client.Platform.MAC&&event.isMetaPressed());
var bO=event.isShiftPressed();

if(!bR&&!bO&&this.__lB){var bP=this._getSelectableFromMouseEvent(event);

if(bP===null||!this.isItemSelected(bP)){this._userInteraction=false;
return;
}var bQ=this.getMode();

if(bQ===k){this._removeFromSelection(bP);
}else{this._setSelectedItem(bP);

if(this.getMode()===j){this._setLeadItem(bP);
this._setAnchorItem(bP);
}}this._userInteraction=false;
}this._cleanup();
},handleLoseCapture:function(event){this._cleanup();
},handleMouseMove:function(event){if(!this.__ls){return;
}this.__lt=event.getDocumentLeft();
this.__lu=event.getDocumentTop();
this._userInteraction=true;
var bT=this.__lt+this.__lm.left;

if(bT>this.__lq){this.__lv=1;
}else if(bT<this.__lq){this.__lv=-1;
}else{this.__lv=0;
}var bS=this.__lu+this.__lm.top;

if(bS>this.__lr){this.__lw=1;
}else if(bS<this.__lr){this.__lw=-1;
}else{this.__lw=0;
}var location=this.__lp;

if(this.__lt<location.left){this.__lj=this.__lt-location.left;
}else if(this.__lt>location.right){this.__lj=this.__lt-location.right;
}else{this.__lj=0;
}
if(this.__lu<location.top){this.__lk=this.__lu-location.top;
}else if(this.__lu>location.bottom){this.__lk=this.__lu-location.bottom;
}else{this.__lk=0;
}if(!this.__ll){this.__ll=new qx.event.Timer(100);
this.__ll.addListener(p,this._onInterval,this);
}this.__ll.start();
this._autoSelect();
event.stopPropagation();
this._userInteraction=false;
},handleAddItem:function(e){var bU=e.getData();

if(this.getMode()===o&&this.isSelectionEmpty()){this.addItem(bU);
}},handleRemoveItem:function(e){this.removeItem(e.getData());
},_cleanup:function(){if(!this.getDrag()&&this.__ls){return;
}if(this.__lx){this._fireChange(E);
}delete this.__ls;
delete this.__ln;
delete this.__lo;
this._releaseCapture();
if(this.__ll){this.__ll.stop();
}},_onInterval:function(e){this._scrollBy(this.__lj,this.__lk);
this.__lm=this._getScroll();
this._autoSelect();
},_autoSelect:function(){var ce=this._getDimension();
var bW=Math.max(0,Math.min(this.__lt-this.__lp.left,ce.width))+this.__lm.left;
var bV=Math.max(0,Math.min(this.__lu-this.__lp.top,ce.height))+this.__lm.top;
if(this.__ln===bW&&this.__lo===bV){return;
}this.__ln=bW;
this.__lo=bV;
var cg=this._getAnchorItem();
var bY=cg;
var cc=this.__lv;
var cf,bX;

while(cc!==0){cf=cc>0?this._getRelatedSelectable(bY,F):this._getRelatedSelectable(bY,v);
if(cf!==null){bX=this._getSelectableLocationX(cf);
if((cc>0&&bX.left<=bW)||(cc<0&&bX.right>=bW)){bY=cf;
continue;
}}break;
}var cd=this.__lw;
var cb,ca;

while(cd!==0){cb=cd>0?this._getRelatedSelectable(bY,g):this._getRelatedSelectable(bY,D);
if(cb!==null){ca=this._getSelectableLocationY(cb);
if((cd>0&&ca.top<=bV)||(cd<0&&ca.bottom>=bV)){bY=cb;
continue;
}}break;
}var ch=this.getMode();

if(ch===j){this._selectItemRange(cg,bY);
}else if(ch===k){if(this.isItemSelected(cg)){this._selectItemRange(cg,bY,true);
}else{this._deselectItemRange(cg,bY);
}this._setAnchorItem(bY);
}this._fireChange(C);
},__lD:{Home:1,Down:1,Right:1,PageDown:1,End:1,Up:1,Left:1,PageUp:1},handleKeyPress:function(event){this._userInteraction=true;
var cn,cm;
var cp=event.getKeyIdentifier();
var co=this.getMode();
var cj=event.isCtrlPressed()||(qx.bom.client.Platform.MAC&&event.isMetaPressed());
var ck=event.isShiftPressed();
var cl=false;

if(cp===u&&cj){if(co!==n&&co!==o){this._selectAllItems();
cl=true;
}}else if(cp===w){if(co!==n&&co!==o){this._clearSelection();
cl=true;
}}else if(cp===r){var ci=this.getLeadItem();

if(ci&&!ck){if(cj||co===k){this._toggleInSelection(ci);
}else{this._setSelectedItem(ci);
}cl=true;
}}else if(this.__lD[cp]){cl=true;

if(co===n||co==o){cn=this._getSelectedItem();
}else{cn=this.getLeadItem();
}
if(cn!==null){switch(cp){case H:cm=this._getFirstSelectable();
break;
case I:cm=this._getLastSelectable();
break;
case M:cm=this._getRelatedSelectable(cn,D);
break;
case c:cm=this._getRelatedSelectable(cn,g);
break;
case f:cm=this._getRelatedSelectable(cn,v);
break;
case G:cm=this._getRelatedSelectable(cn,F);
break;
case h:cm=this._getPage(cn,true);
break;
case K:cm=this._getPage(cn,false);
break;
}}else{switch(cp){case H:case c:case G:case K:cm=this._getFirstSelectable();
break;
case I:case M:case f:case h:cm=this._getLastSelectable();
break;
}}if(cm!==null){switch(co){case n:case o:this._setSelectedItem(cm);
break;
case k:this._setLeadItem(cm);
break;
case j:if(ck){var cq=this._getAnchorItem();

if(cq===null){this._setAnchorItem(cq=this._getFirstSelectable());
}this._setLeadItem(cm);
this._selectItemRange(cq,cm,cj);
}else{this._setAnchorItem(cm);
this._setLeadItem(cm);

if(!cj){this._setSelectedItem(cm);
}}break;
}this.__lC=this._getScroll().top;
this._scrollItemIntoView(cm);
}}
if(cl){event.stop();
this._fireChange(A);
}this._userInteraction=false;
},_selectAllItems:function(){var cr=this.getSelectables();

for(var i=0,l=cr.length;i<l;i++){this._addToSelection(cr[i]);
}},_clearSelection:function(){var cs=this.__li;

for(var ct in cs){this._removeFromSelection(cs[ct]);
}this.__li={};
},_selectItemRange:function(cu,cv,cw){var cz=this._getSelectableRange(cu,cv);
if(!cw){var cy=this.__li;
var cA=this.__lE(cz);

for(var cx in cy){if(!cA[cx]){this._removeFromSelection(cy[cx]);
}}}for(var i=0,l=cz.length;i<l;i++){this._addToSelection(cz[i]);
}},_deselectItemRange:function(cB,cC){var cD=this._getSelectableRange(cB,cC);

for(var i=0,l=cD.length;i<l;i++){this._removeFromSelection(cD[i]);
}},__lE:function(cE){var cG={};
var cF;

for(var i=0,l=cE.length;i<l;i++){cF=cE[i];
cG[this._selectableToHashCode(cF)]=cF;
}return cG;
},_getSelectedItem:function(){for(var cH in this.__li){return this.__li[cH];
}return null;
},_setSelectedItem:function(cI){if(this._isSelectable(cI)){var cJ=this.__li;
var cK=this._selectableToHashCode(cI);

if(!cJ[cK]||qx.lang.Object.hasMinLength(cJ,2)){this._clearSelection();
this._addToSelection(cI);
}}},_addToSelection:function(cL){var cM=this._selectableToHashCode(cL);

if(!this.__li[cM]&&this._isSelectable(cL)){this.__li[cM]=cL;
this._styleSelectable(cL,m,true);
this.__lx=true;
}},_toggleInSelection:function(cN){var cO=this._selectableToHashCode(cN);

if(!this.__li[cO]){this.__li[cO]=cN;
this._styleSelectable(cN,m,true);
}else{delete this.__li[cO];
this._styleSelectable(cN,m,false);
}this.__lx=true;
},_removeFromSelection:function(cP){var cQ=this._selectableToHashCode(cP);

if(this.__li[cQ]!=null){delete this.__li[cQ];
this._styleSelectable(cP,m,false);
this.__lx=true;
}},_replaceMultiSelection:function(cR){var cU=false;
var cX,cW;
var cS={};

for(var i=0,l=cR.length;i<l;i++){cX=cR[i];

if(this._isSelectable(cX)){cW=this._selectableToHashCode(cX);
cS[cW]=cX;
}}var cY=cR[0];
var cT=cX;
var cV=this.__li;

for(var cW in cV){if(cS[cW]){delete cS[cW];
}else{cX=cV[cW];
delete cV[cW];
this._styleSelectable(cX,m,false);
cU=true;
}}for(var cW in cS){cX=cV[cW]=cS[cW];
this._styleSelectable(cX,m,true);
cU=true;
}if(!cU){return false;
}this._scrollItemIntoView(cT);
this._setLeadItem(cY);
this._setAnchorItem(cY);
this.__lx=true;
this._fireChange();
},_fireChange:function(da){if(this.__lx){this.__ly=da||null;
this.fireDataEvent(q,this.getSelection());
delete this.__lx;
}}},destruct:function(){this._disposeObjects(t);
this.__li=this.__lB=this.__lA=null;
this.__lz=null;
}});
})();
(function(){var f="vertical",e="under",d="above",c="qx.ui.core.selection.Widget",b="left",a="right";
qx.Class.define(c,{extend:qx.ui.core.selection.Abstract,construct:function(g){qx.ui.core.selection.Abstract.call(this);
this.__lF=g;
},members:{__lF:null,_isSelectable:function(h){return this._isItemSelectable(h)&&h.getLayoutParent()===this.__lF;
},_selectableToHashCode:function(j){return j.$$hash;
},_styleSelectable:function(k,m,n){n?k.addState(m):k.removeState(m);
},_capture:function(){this.__lF.capture();
},_releaseCapture:function(){this.__lF.releaseCapture();
},_isItemSelectable:function(o){if(this._userInteraction){return o.isVisible()&&o.isEnabled();
}else{return o.isVisible();
}},_getWidget:function(){return this.__lF;
},_getLocation:function(){var p=this.__lF.getContentElement().getDomElement();
return p?qx.bom.element.Location.get(p):null;
},_getDimension:function(){return this.__lF.getInnerSize();
},_getSelectableLocationX:function(q){var r=q.getBounds();

if(r){return {left:r.left,right:r.left+r.width};
}},_getSelectableLocationY:function(s){var t=s.getBounds();

if(t){return {top:t.top,bottom:t.top+t.height};
}},_getScroll:function(){return {left:0,top:0};
},_scrollBy:function(u,v){},_scrollItemIntoView:function(w){this.__lF.scrollChildIntoView(w);
},getSelectables:function(x){var y=false;

if(!x){y=this._userInteraction;
this._userInteraction=true;
}var B=this.__lF.getChildren();
var z=[];
var A;

for(var i=0,l=B.length;i<l;i++){A=B[i];

if(this._isItemSelectable(A)){z.push(A);
}}this._userInteraction=y;
return z;
},_getSelectableRange:function(C,D){if(C===D){return [C];
}var H=this.__lF.getChildren();
var E=[];
var G=false;
var F;

for(var i=0,l=H.length;i<l;i++){F=H[i];

if(F===C||F===D){if(G){E.push(F);
break;
}else{G=true;
}}
if(G&&this._isItemSelectable(F)){E.push(F);
}}return E;
},_getFirstSelectable:function(){var I=this.__lF.getChildren();

for(var i=0,l=I.length;i<l;i++){if(this._isItemSelectable(I[i])){return I[i];
}}return null;
},_getLastSelectable:function(){var J=this.__lF.getChildren();

for(var i=J.length-1;i>0;i--){if(this._isItemSelectable(J[i])){return J[i];
}}return null;
},_getRelatedSelectable:function(K,L){var O=this.__lF.getOrientation()===f;
var N=this.__lF.getChildren();
var M=N.indexOf(K);
var P;

if((O&&L===d)||(!O&&L===b)){for(var i=M-1;i>=0;i--){P=N[i];

if(this._isItemSelectable(P)){return P;
}}}else if((O&&L===e)||(!O&&L===a)){for(var i=M+1;i<N.length;i++){P=N[i];

if(this._isItemSelectable(P)){return P;
}}}return null;
},_getPage:function(Q,R){if(R){return this._getFirstSelectable();
}else{return this._getLastSelectable();
}}},destruct:function(){this.__lF=null;
}});
})();
(function(){var a="qx.ui.core.selection.ScrollArea";
qx.Class.define(a,{extend:qx.ui.core.selection.Widget,members:{_isSelectable:function(b){return this._isItemSelectable(b)&&b.getLayoutParent()===this._getWidget().getChildrenContainer();
},_getDimension:function(){return this._getWidget().getPaneSize();
},_getScroll:function(){var c=this._getWidget();
return {left:c.getScrollX(),top:c.getScrollY()};
},_scrollBy:function(d,e){var f=this._getWidget();
f.scrollByX(d);
f.scrollByY(e);
},_getPage:function(g,h){var m=this.getSelectables();
var length=m.length;
var p=m.indexOf(g);
if(p===-1){throw new Error("Invalid lead item: "+g);
}var j=this._getWidget();
var r=j.getScrollY();
var innerHeight=j.getInnerSize().height;
var top,l,q;

if(h){var o=r;
var i=p;
while(1){for(;i>=0;i--){top=j.getItemTop(m[i]);
if(top<o){q=i+1;
break;
}}if(q==null){var s=this._getFirstSelectable();
return s==g?null:s;
}if(q>=p){o-=innerHeight+r-j.getItemBottom(g);
q=null;
continue;
}return m[q];
}}else{var n=innerHeight+r;
var i=p;
while(1){for(;i<length;i++){l=j.getItemBottom(m[i]);
if(l>n){q=i-1;
break;
}}if(q==null){var k=this._getLastSelectable();
return k==g?null:k;
}if(q<=p){n+=j.getItemTop(g)-r;
q=null;
continue;
}return m[q];
}}}}});
})();
(function(){var e="right",d="above",c="left",b="under",a="qx.ui.tree.SelectionManager";
qx.Class.define(a,{extend:qx.ui.core.selection.ScrollArea,members:{_getSelectableLocationY:function(f){var g=f.getBounds();

if(g){var top=this._getWidget().getItemTop(f);
return {top:top,bottom:top+g.height};
}},_isSelectable:function(h){return this._isItemSelectable(h)&&h instanceof qx.ui.tree.AbstractTreeItem;
},_getSelectableFromMouseEvent:function(event){return this._getWidget().getTreeItem(event.getTarget());
},getSelectables:function(j){var m=false;

if(!j){m=this._userInteraction;
this._userInteraction=true;
}var l=this._getWidget();
var n=[];

if(l.getRoot()!=null){var k=l.getRoot().getItems(true,!!j,l.getHideRoot());

for(var i=0;i<k.length;i++){if(this._isSelectable(k[i])){n.push(k[i]);
}}}this._userInteraction=m;
return n;
},_getSelectableRange:function(o,p){if(o===p){return [o];
}var q=this.getSelectables();
var r=q.indexOf(o);
var s=q.indexOf(p);

if(r<0||s<0){return [];
}
if(r<s){return q.slice(r,s+1);
}else{return q.slice(s,r+1);
}},_getFirstSelectable:function(){return this.getSelectables()[0]||null;
},_getLastSelectable:function(){var t=this.getSelectables();

if(t.length>0){return t[t.length-1];
}else{return null;
}},_getRelatedSelectable:function(u,v){var w=this._getWidget();
var x=null;

switch(v){case d:x=w.getPreviousNodeOf(u,false);
break;
case b:x=w.getNextNodeOf(u,false);
break;
case c:case e:break;
}
if(!x){return null;
}
if(this._isSelectable(x)){return x;
}else{return this._getRelatedSelectable(x,v);
}}}});
})();
(function(){var l="dblclick",k="click",j="Boolean",h="excluded",g="visible",f="qx.event.type.Data",d="_applyOpenMode",c="Space",b="Left",a="Enter",z="__lG",y="changeOpenMode",x="_applyRootOpenClose",w="changeSelection",v="qx.ui.tree.Tree",u="tree",t="_applyHideRoot",s="changeRoot",r="_applyRoot",q="keypress",o="none",p="pane",m="Right",n="qx.ui.tree.AbstractTreeItem";
qx.Class.define(v,{extend:qx.ui.core.scroll.AbstractScrollArea,implement:[qx.ui.core.IMultiSelection,qx.ui.form.IModelSelection,qx.ui.form.IForm],include:[qx.ui.core.MMultiSelectionHandling,qx.ui.core.MContentPadding,qx.ui.form.MModelSelection,qx.ui.form.MForm],construct:function(){qx.ui.core.scroll.AbstractScrollArea.call(this);
this.__lG=new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({allowShrinkY:false,allowGrowX:true});
this.getChildControl(p).add(this.__lG);
this.initOpenMode();
this.initRootOpenClose();
this.addListener(w,this._onChangeSelection,this);
this.addListener(q,this._onKeyPress,this);
},events:{addItem:f,removeItem:f},properties:{openMode:{check:[k,l,o],init:l,apply:d,event:y,themeable:true},root:{check:n,init:null,nullable:true,event:s,apply:r},hideRoot:{check:j,init:false,apply:t},rootOpenClose:{check:j,init:false,apply:x},appearance:{refine:true,init:u},focusable:{refine:true,init:true}},members:{__lG:null,SELECTION_MANAGER:qx.ui.tree.SelectionManager,getChildrenContainer:function(){return this.__lG;
},_applyRoot:function(A,B){var C=this.getChildrenContainer();

if(B){C.remove(B);

if(B.hasChildren()){C.remove(B.getChildrenContainer());
}}
if(A){C.add(A);

if(A.hasChildren()){C.add(A.getChildrenContainer());
}A.setVisibility(this.getHideRoot()?h:g);
A.recursiveAddToWidgetQueue();
}},_applyHideRoot:function(D,E){var F=this.getRoot();

if(!F){return;
}F.setVisibility(D?h:g);
F.recursiveAddToWidgetQueue();
},_applyRootOpenClose:function(G,H){var I=this.getRoot();

if(!I){return;
}I.recursiveAddToWidgetQueue();
},_getContentPaddingTarget:function(){return this.__lG;
},getNextNodeOf:function(J,K){if((K!==false||J.isOpen())&&J.hasChildren()){return J.getChildren()[0];
}
while(J){var parent=J.getParent();

if(!parent){return null;
}var M=parent.getChildren();
var L=M.indexOf(J);

if(L>-1&&L<M.length-1){return M[L+1];
}J=parent;
}return null;
},getPreviousNodeOf:function(N,O){var parent=N.getParent();

if(!parent){return null;
}
if(this.getHideRoot()){if(parent==this.getRoot()){if(parent.getChildren()[0]==N){return null;
}}}else{if(N==this.getRoot()){return null;
}}var R=parent.getChildren();
var P=R.indexOf(N);

if(P>0){var Q=R[P-1];

while((O!==false||Q.isOpen())&&Q.hasChildren()){var S=Q.getChildren();
Q=S[S.length-1];
}return Q;
}else{return parent;
}},getNextSiblingOf:function(T){if(T==this.getRoot()){return null;
}var parent=T.getParent();
var U=parent.getChildren();
var V=U.indexOf(T);

if(V<U.length-1){return U[V+1];
}return null;
},getPreviousSiblingOf:function(W){if(W==this.getRoot()){return null;
}var parent=W.getParent();
var X=parent.getChildren();
var Y=X.indexOf(W);

if(Y>0){return X[Y-1];
}return null;
},getItems:function(ba,bb){if(this.getRoot()!=null){return this.getRoot().getItems(ba,bb,this.getHideRoot());
}else{return [];
}},getChildren:function(){if(this.getRoot()!=null){return [this.getRoot()];
}else{return [];
}},getTreeItem:function(bc){while(bc){if(bc==this){return null;
}
if(bc instanceof qx.ui.tree.AbstractTreeItem){return bc;
}bc=bc.getLayoutParent();
}return null;
},_applyOpenMode:function(bd,be){if(be==k){this.removeListener(k,this._onOpen,this);
}else if(be==l){this.removeListener(l,this._onOpen,this);
}
if(bd==k){this.addListener(k,this._onOpen,this);
}else if(bd==l){this.addListener(l,this._onOpen,this);
}},_onOpen:function(e){var bf=this.getTreeItem(e.getTarget());

if(!bf||!bf.isOpenable()){return;
}bf.setOpen(!bf.isOpen());
e.stopPropagation();
},_onChangeSelection:function(e){var bh=e.getData();
for(var i=0;i<bh.length;i++){var bg=bh[i];
while(bg.getParent()!=null){bg=bg.getParent();
bg.setOpen(true);
}}},_onKeyPress:function(e){var bi=this._getLeadItem();

if(bi!==null){switch(e.getKeyIdentifier()){case b:if(bi.isOpenable()&&bi.isOpen()){bi.setOpen(false);
}break;
case m:if(bi.isOpenable()&&!bi.isOpen()){bi.setOpen(true);
}break;
case a:case c:if(bi.isOpenable()){bi.toggleOpen();
}break;
}}}},destruct:function(){this._disposeObjects(z);
}});
})();
(function(){var b="qx.ui.core.scroll.IScrollBar",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"scroll":a},properties:{orientation:{},maximum:{},position:{},knobFactor:{}},members:{scrollTo:function(c){this.assertNumber(c);
},scrollBy:function(d){this.assertNumber(d);
},scrollBySteps:function(e){this.assertNumber(e);
}}});
})();
(function(){var k="horizontal",j="px",i="scroll",h="vertical",g="-1px",f="qx.client",d="0",c="hidden",b="mousedown",a="qx.ui.core.scroll.NativeScrollBar",z="PositiveNumber",y="Integer",x="__lL",w="mousemove",v="_applyMaximum",u="_applyOrientation",t="appear",s="opera",r="PositiveInteger",q="mshtml",o="mouseup",p="Number",m="_applyPosition",n="scrollbar",l="native";
qx.Class.define(a,{extend:qx.ui.core.Widget,implement:qx.ui.core.scroll.IScrollBar,construct:function(A){qx.ui.core.Widget.call(this);
this.addState(l);
this.getContentElement().addListener(i,this._onScroll,this);
this.addListener(b,this._stopPropagation,this);
this.addListener(o,this._stopPropagation,this);
this.addListener(w,this._stopPropagation,this);

if(qx.core.Variant.isSet(f,s)){this.addListener(t,this._onAppear,this);
}this.getContentElement().add(this._getScrollPaneElement());
if(A!=null){this.setOrientation(A);
}else{this.initOrientation();
}},properties:{appearance:{refine:true,init:n},orientation:{check:[k,h],init:k,apply:u},maximum:{check:r,apply:v,init:100},position:{check:p,init:0,apply:m,event:i},singleStep:{check:y,init:20},knobFactor:{check:z,nullable:true}},members:{__lK:null,__lL:null,_getScrollPaneElement:function(){if(!this.__lL){this.__lL=new qx.html.Element();
}return this.__lL;
},renderLayout:function(B,top,C,D){var E=qx.ui.core.Widget.prototype.renderLayout.call(this,B,top,C,D);
this._updateScrollBar();
return E;
},_getContentHint:function(){var F=qx.bom.element.Overflow.getScrollbarWidth();
return {width:this.__lK?100:F,maxWidth:this.__lK?null:F,minWidth:this.__lK?null:F,height:this.__lK?F:100,maxHeight:this.__lK?F:null,minHeight:this.__lK?F:null};
},_applyEnabled:function(G,H){qx.ui.core.Widget.prototype._applyEnabled.call(this,G,H);
this._updateScrollBar();
},_applyMaximum:function(I){this._updateScrollBar();
},_applyPosition:function(J){var content=this.getContentElement();

if(this.__lK){content.scrollToX(J);
}else{content.scrollToY(J);
}},_applyOrientation:function(K,L){var M=this.__lK=K===k;
this.set({allowGrowX:M,allowShrinkX:M,allowGrowY:!M,allowShrinkY:!M});

if(M){this.replaceState(h,k);
}else{this.replaceState(k,h);
}this.getContentElement().setStyles({overflowX:M?i:c,overflowY:M?c:i});
qx.ui.core.queue.Layout.add(this);
},_updateScrollBar:function(){var O=this.__lK;
var P=this.getBounds();

if(!P){return;
}
if(this.isEnabled()){var Q=O?P.width:P.height;
var N=this.getMaximum()+Q;
}else{N=0;
}if(qx.core.Variant.isSet(f,q)){var P=this.getBounds();
this.getContentElement().setStyles({left:O?d:g,top:O?g:d,width:(O?P.width:P.width+1)+j,height:(O?P.height+1:P.height)+j});
}this._getScrollPaneElement().setStyles({left:0,top:0,width:(O?N:1)+j,height:(O?1:N)+j});
this.scrollTo(this.getPosition());
},scrollTo:function(R){this.setPosition(Math.max(0,Math.min(this.getMaximum(),R)));
},scrollBy:function(S){this.scrollTo(this.getPosition()+S);
},scrollBySteps:function(T){var U=this.getSingleStep();
this.scrollBy(T*U);
},_onScroll:function(e){var W=this.getContentElement();
var V=this.__lK?W.getScrollX():W.getScrollY();
this.setPosition(V);
},_onAppear:function(e){this.scrollTo(this.getPosition());
},_stopPropagation:function(e){e.stopPropagation();
}},destruct:function(){this._disposeObjects(x);
}});
})();
(function(){var k="slider",j="horizontal",i="button-begin",h="vertical",g="button-end",f="Integer",d="execute",c="right",b="left",a="down",z="up",y="PositiveNumber",x="changeValue",w="qx.lang.Type.isNumber(value)&&value>=0&&value<=this.getMaximum()",v="_applyKnobFactor",u="knob",t="qx.ui.core.scroll.ScrollBar",s="resize",r="_applyOrientation",q="_applyPageStep",o="PositiveInteger",p="scroll",m="_applyPosition",n="scrollbar",l="_applyMaximum";
qx.Class.define(t,{extend:qx.ui.core.Widget,implement:qx.ui.core.scroll.IScrollBar,construct:function(A){qx.ui.core.Widget.call(this);
this._createChildControl(i);
this._createChildControl(k).addListener(s,this._onResizeSlider,this);
this._createChildControl(g);
if(A!=null){this.setOrientation(A);
}else{this.initOrientation();
}},properties:{appearance:{refine:true,init:n},orientation:{check:[j,h],init:j,apply:r},maximum:{check:o,apply:l,init:100},position:{check:w,init:0,apply:m,event:p},singleStep:{check:f,init:20},pageStep:{check:f,init:10,apply:q},knobFactor:{check:y,apply:v,nullable:true}},members:{__lM:2,_createChildControlImpl:function(B,C){var D;

switch(B){case k:D=new qx.ui.core.scroll.ScrollSlider();
D.setPageStep(100);
D.setFocusable(false);
D.addListener(x,this._onChangeSliderValue,this);
this._add(D,{flex:1});
break;
case i:D=new qx.ui.form.RepeatButton();
D.setFocusable(false);
D.addListener(d,this._onExecuteBegin,this);
this._add(D);
break;
case g:D=new qx.ui.form.RepeatButton();
D.setFocusable(false);
D.addListener(d,this._onExecuteEnd,this);
this._add(D);
break;
}return D||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,B);
},_applyMaximum:function(E){this.getChildControl(k).setMaximum(E);
},_applyPosition:function(F){this.getChildControl(k).setValue(F);
},_applyKnobFactor:function(G){this.getChildControl(k).setKnobFactor(G);
},_applyPageStep:function(H){this.getChildControl(k).setPageStep(H);
},_applyOrientation:function(I,J){var K=this._getLayout();

if(K){K.dispose();
}if(I===j){this._setLayout(new qx.ui.layout.HBox());
this.setAllowStretchX(true);
this.setAllowStretchY(false);
this.replaceState(h,j);
this.getChildControl(i).replaceState(z,b);
this.getChildControl(g).replaceState(a,c);
}else{this._setLayout(new qx.ui.layout.VBox());
this.setAllowStretchX(false);
this.setAllowStretchY(true);
this.replaceState(j,h);
this.getChildControl(i).replaceState(b,z);
this.getChildControl(g).replaceState(c,a);
}this.getChildControl(k).setOrientation(I);
},scrollTo:function(L){this.getChildControl(k).slideTo(L);
},scrollBy:function(M){this.getChildControl(k).slideBy(M);
},scrollBySteps:function(N){var O=this.getSingleStep();
this.getChildControl(k).slideBy(N*O);
},_onExecuteBegin:function(e){this.scrollBy(-this.getSingleStep());
},_onExecuteEnd:function(e){this.scrollBy(this.getSingleStep());
},_onChangeSliderValue:function(e){this.setPosition(e.getData());
},_onResizeSlider:function(e){var P=this.getChildControl(k).getChildControl(u);
var S=P.getSizeHint();
var Q=false;
var R=this.getChildControl(k).getInnerSize();

if(this.getOrientation()==h){if(R.height<S.minHeight+this.__lM){Q=true;
}}else{if(R.width<S.minWidth+this.__lM){Q=true;
}}
if(Q){P.exclude();
}else{P.show();
}}}});
})();
(function(){var a="qx.ui.form.IRange";
qx.Interface.define(a,{members:{setMinimum:function(b){return arguments.length==1;
},getMinimum:function(){},setMaximum:function(c){return arguments.length==1;
},getMaximum:function(){},setSingleStep:function(d){return arguments.length==1;
},getSingleStep:function(){},setPageStep:function(e){return arguments.length==1;
},getPageStep:function(){}}});
})();
(function(){var b="qx.ui.form.INumberForm",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"changeValue":a},members:{setValue:function(c){return arguments.length==1;
},resetValue:function(){},getValue:function(){}}});
})();
(function(){var k="knob",j="horizontal",i="vertical",h="Integer",g="hovered",f="left",d="top",c="mouseup",b="pressed",a="px",V="changeValue",U="interval",T="mousemove",S="resize",R="slider",Q="mousedown",P="PageUp",O="mouseout",N='qx.event.type.Data',M="Left",r="Down",s="Up",p="dblclick",q="qx.ui.form.Slider",n="PageDown",o="mousewheel",l="_applyValue",m="_applyKnobFactor",t="End",u="height",B="Right",z="width",F="_applyOrientation",D="Home",I="mouseover",H="floor",w="_applyMinimum",L="click",K="typeof value==='number'&&value>=this.getMinimum()&&value<=this.getMaximum()",J="keypress",v="ceil",x="losecapture",y="contextmenu",A="_applyMaximum",C="Number",E="changeMaximum",G="changeMinimum";
qx.Class.define(q,{extend:qx.ui.core.Widget,implement:[qx.ui.form.IForm,qx.ui.form.INumberForm,qx.ui.form.IRange],include:[qx.ui.form.MForm],construct:function(W){qx.ui.core.Widget.call(this);
this._setLayout(new qx.ui.layout.Canvas());
this.addListener(J,this._onKeyPress);
this.addListener(o,this._onMouseWheel);
this.addListener(Q,this._onMouseDown);
this.addListener(c,this._onMouseUp);
this.addListener(x,this._onMouseUp);
this.addListener(S,this._onUpdate);
this.addListener(y,this._onStopEvent);
this.addListener(L,this._onStopEvent);
this.addListener(p,this._onStopEvent);
if(W!=null){this.setOrientation(W);
}else{this.initOrientation();
}},events:{changeValue:N},properties:{appearance:{refine:true,init:R},focusable:{refine:true,init:true},orientation:{check:[j,i],init:j,apply:F},value:{check:K,init:0,apply:l,nullable:true},minimum:{check:h,init:0,apply:w,event:G},maximum:{check:h,init:100,apply:A,event:E},singleStep:{check:h,init:1},pageStep:{check:h,init:10},knobFactor:{check:C,apply:m,nullable:true}},members:{__lN:null,__lO:null,__lP:null,__lQ:null,__lR:null,__lS:null,__lT:null,__lU:null,__lV:null,__lW:null,__lX:null,__lY:null,_forwardStates:{invalid:true},_createChildControlImpl:function(X,Y){var ba;

switch(X){case k:ba=new qx.ui.core.Widget();
ba.addListener(S,this._onUpdate,this);
ba.addListener(I,this._onMouseOver);
ba.addListener(O,this._onMouseOut);
this._add(ba);
break;
}return ba||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,X);
},_onMouseOver:function(e){this.addState(g);
},_onMouseOut:function(e){this.removeState(g);
},_onMouseWheel:function(e){var bb=e.getWheelDelta()>0?1:-1;
this.slideBy(bb*this.getSingleStep());
e.stop();
},_onKeyPress:function(e){var bd=this.getOrientation()===j;
var bc=bd?M:s;
var forward=bd?B:r;

switch(e.getKeyIdentifier()){case forward:this.slideForward();
break;
case bc:this.slideBack();
break;
case n:this.slidePageForward();
break;
case P:this.slidePageBack();
break;
case D:this.slideToBegin();
break;
case t:this.slideToEnd();
break;
default:return;
}e.stop();
},_onMouseDown:function(e){if(this.__lQ){return;
}var bg=this.__mb;
var be=this.getChildControl(k);
var bf=bg?f:d;
var bi=bg?e.getDocumentLeft():e.getDocumentTop();
var bj=this.__lN=qx.bom.element.Location.get(this.getContentElement().getDomElement())[bf];
var bh=this.__lO=qx.bom.element.Location.get(be.getContainerElement().getDomElement())[bf];

if(e.getTarget()===be){this.__lQ=true;

if(!this.__lW){this.__lW=new qx.event.Timer(100);
this.__lW.addListener(U,this._fireValue,this);
}this.__lW.start();
this.__lR=bi+bj-bh;
be.addState(b);
}else{this.__lS=true;
this.__lT=bi<=bh?-1:1;
this.__mc(e);
this._onInterval();
if(!this.__lV){this.__lV=new qx.event.Timer(100);
this.__lV.addListener(U,this._onInterval,this);
}this.__lV.start();
}this.addListener(T,this._onMouseMove);
this.capture();
e.stopPropagation();
},_onMouseUp:function(e){if(this.__lQ){this.releaseCapture();
delete this.__lQ;
this.__lW.stop();
this._fireValue();
delete this.__lR;
this.getChildControl(k).removeState(b);
if(e.getType()===c){var bl;
var bm;
var bk;

if(this.__mb){bl=e.getDocumentLeft()-(this._valueToPosition(this.getValue())+this.__lN);
bk=qx.bom.element.Location.get(this.getContentElement().getDomElement())[d];
bm=e.getDocumentTop()-(bk+this.getChildControl(k).getBounds().top);
}else{bl=e.getDocumentTop()-(this._valueToPosition(this.getValue())+this.__lN);
bk=qx.bom.element.Location.get(this.getContentElement().getDomElement())[f];
bm=e.getDocumentLeft()-(bk+this.getChildControl(k).getBounds().left);
}
if(bm<0||bm>this.__lP||bl<0||bl>this.__lP){this.getChildControl(k).removeState(g);
}}}else if(this.__lS){this.__lV.stop();
this.releaseCapture();
delete this.__lS;
delete this.__lT;
delete this.__lU;
}this.removeListener(T,this._onMouseMove);
if(e.getType()===c){e.stopPropagation();
}},_onMouseMove:function(e){if(this.__lQ){var bo=this.__mb?e.getDocumentLeft():e.getDocumentTop();
var bn=bo-this.__lR;
this.slideTo(this._positionToValue(bn));
}else if(this.__lS){this.__mc(e);
}e.stopPropagation();
},_onInterval:function(e){var bp=this.getValue()+(this.__lT*this.getPageStep());
if(bp<this.getMinimum()){bp=this.getMinimum();
}else if(bp>this.getMaximum()){bp=this.getMaximum();
}var bq=this.__lT==-1;

if((bq&&bp<=this.__lU)||(!bq&&bp>=this.__lU)){bp=this.__lU;
}this.slideTo(bp);
},_onUpdate:function(e){var bs=this.getInnerSize();
var bt=this.getChildControl(k).getBounds();
var br=this.__mb?z:u;
this._updateKnobSize();
this.__ma=bs[br]-bt[br];
this.__lP=bt[br];
this._updateKnobPosition();
},__mb:false,__ma:0,__mc:function(e){var bu=this.__mb;
var bB=bu?e.getDocumentLeft():e.getDocumentTop();
var bD=this.__lN;
var bv=this.__lO;
var bF=this.__lP;
var bC=bB-bD;

if(bB>=bv){bC-=bF;
}var bz=this._positionToValue(bC);
var bw=this.getMinimum();
var bx=this.getMaximum();

if(bz<bw){bz=bw;
}else if(bz>bx){bz=bx;
}else{var bA=this.getValue();
var by=this.getPageStep();
var bE=this.__lT<0?H:v;
bz=bA+(Math[bE]((bz-bA)/by)*by);
}if(this.__lU==null||(this.__lT==-1&&bz<=this.__lU)||(this.__lT==1&&bz>=this.__lU)){this.__lU=bz;
}},_positionToValue:function(bG){var bH=this.__ma;
if(bH==null||bH==0){return 0;
}var bJ=bG/bH;

if(bJ<0){bJ=0;
}else if(bJ>1){bJ=1;
}var bI=this.getMaximum()-this.getMinimum();
return this.getMinimum()+Math.round(bI*bJ);
},_valueToPosition:function(bK){var bL=this.__ma;

if(bL==null){return 0;
}var bM=this.getMaximum()-this.getMinimum();
if(bM==0){return 0;
}var bK=bK-this.getMinimum();
var bN=bK/bM;

if(bN<0){bN=0;
}else if(bN>1){bN=1;
}return Math.round(bL*bN);
},_updateKnobPosition:function(){this._setKnobPosition(this._valueToPosition(this.getValue()));
},_setKnobPosition:function(bO){var bP=this.getChildControl(k).getContainerElement();

if(this.__mb){bP.setStyle(f,bO+a,true);
}else{bP.setStyle(d,bO+a,true);
}},_updateKnobSize:function(){var bR=this.getKnobFactor();

if(bR==null){return;
}var bQ=this.getInnerSize();

if(bQ==null){return;
}if(this.__mb){this.getChildControl(k).setWidth(Math.round(bR*bQ.width));
}else{this.getChildControl(k).setHeight(Math.round(bR*bQ.height));
}},slideToBegin:function(){this.slideTo(this.getMinimum());
},slideToEnd:function(){this.slideTo(this.getMaximum());
},slideForward:function(){this.slideBy(this.getSingleStep());
},slideBack:function(){this.slideBy(-this.getSingleStep());
},slidePageForward:function(){this.slideBy(this.getPageStep());
},slidePageBack:function(){this.slideBy(-this.getPageStep());
},slideBy:function(bS){this.slideTo(this.getValue()+bS);
},slideTo:function(bT){if(bT<this.getMinimum()){bT=this.getMinimum();
}else if(bT>this.getMaximum()){bT=this.getMaximum();
}else{bT=this.getMinimum()+Math.round((bT-this.getMinimum())/this.getSingleStep())*this.getSingleStep();
}this.setValue(bT);
},_applyOrientation:function(bU,bV){var bW=this.getChildControl(k);
this.__mb=bU===j;
if(this.__mb){this.removeState(i);
bW.removeState(i);
this.addState(j);
bW.addState(j);
bW.setLayoutProperties({top:0,right:null,bottom:0});
}else{this.removeState(j);
bW.removeState(j);
this.addState(i);
bW.addState(i);
bW.setLayoutProperties({right:0,bottom:null,left:0});
}this._updateKnobPosition();
},_applyKnobFactor:function(bX,bY){if(bX!=null){this._updateKnobSize();
}else{if(this.__mb){this.getChildControl(k).resetWidth();
}else{this.getChildControl(k).resetHeight();
}}},_applyValue:function(ca,cb){if(ca!=null){this._updateKnobPosition();

if(this.__lQ){this.__lY=[ca,cb];
}else{this.fireEvent(V,qx.event.type.Data,[ca,cb]);
}}else{this.resetValue();
}},_fireValue:function(){if(!this.__lY){return;
}var cc=this.__lY;
this.__lY=null;
this.fireEvent(V,qx.event.type.Data,cc);
},_applyMinimum:function(cd,ce){if(this.getValue()<cd){this.setValue(cd);
}this._updateKnobPosition();
},_applyMaximum:function(cf,cg){if(this.getValue()>cf){this.setValue(cf);
}this._updateKnobPosition();
}}});
})();
(function(){var d="horizontal",c="mousewheel",b="qx.ui.core.scroll.ScrollSlider",a="keypress";
qx.Class.define(b,{extend:qx.ui.form.Slider,construct:function(e){qx.ui.form.Slider.call(this,e);
this.removeListener(a,this._onKeyPress);
this.removeListener(c,this._onMouseWheel);
},members:{getSizeHint:function(f){var g=qx.ui.form.Slider.prototype.getSizeHint.call(this);
if(this.getOrientation()===d){g.width=0;
}else{g.height=0;
}return g;
}}});
})();
(function(){var n="top",m="left",h="qx.debug",g="bottom",f="hAlign",e="vAlign",d="Integer",c="_applyLayoutChange",b="center",a="middle",E="right",D="flex",C="on",B="height",A="' is not supported by the Grid layout!",z="Invalid parameter 'column'",w="The property '",v="Value must be positive",u="qx.ui.layout.Grid",t="maxHeight",r="width",s="minHeight",p="minWidth",q="maxWidth",o="Invalid parameter 'row'";
qx.Class.define(u,{extend:qx.ui.layout.Abstract,construct:function(F,G){qx.ui.layout.Abstract.call(this);
this.__ki=[];
this.__kj=[];

if(F){this.setSpacingX(F);
}
if(G){this.setSpacingY(G);
}},properties:{spacingX:{check:d,init:0,apply:c},spacingY:{check:d,init:0,apply:c}},members:{__kk:null,__ki:null,__kj:null,__kl:null,__km:null,__kn:null,__ko:null,__kp:null,__kq:null,verifyLayoutProperty:qx.core.Variant.select(h,{"on":function(H,name,I){var J={"row":1,"column":1,"rowSpan":1,"colSpan":1};
this.assert(J[name]==1,w+name+A);
this.assertInteger(I);
this.assert(I>=0,v);
},"off":null}),__kr:function(){var P=[];
var O=[];
var Q=[];
var M=-1;
var L=-1;
var S=this._getLayoutChildren();

for(var i=0,l=S.length;i<l;i++){var N=S[i];
var R=N.getLayoutProperties();
var T=R.row;
var K=R.column;
R.colSpan=R.colSpan||1;
R.rowSpan=R.rowSpan||1;
if(T==null||K==null){throw new Error("The layout properties 'row' and 'column' of the child widget '"+N+"' must be defined!");
}
if(P[T]&&P[T][K]){throw new Error("Cannot add widget '"+N+"'!. "+"There is already a widget '"+P[T][K]+"' in this cell ("+T+", "+K+")");
}
for(var x=K;x<K+R.colSpan;x++){for(var y=T;y<T+R.rowSpan;y++){if(P[y]==undefined){P[y]=[];
}P[y][x]=N;
L=Math.max(L,x);
M=Math.max(M,y);
}}
if(R.rowSpan>1){Q.push(N);
}
if(R.colSpan>1){O.push(N);
}}for(var y=0;y<=M;y++){if(P[y]==undefined){P[y]=[];
}}this.__kk=P;
this.__kl=O;
this.__km=Q;
this.__kn=M;
this.__ko=L;
this.__kp=null;
this.__kq=null;
delete this._invalidChildrenCache;
},_setRowData:function(U,V,W){var X=this.__ki[U];

if(!X){this.__ki[U]={};
this.__ki[U][V]=W;
}else{X[V]=W;
}},_setColumnData:function(Y,ba,bb){var bc=this.__kj[Y];

if(!bc){this.__kj[Y]={};
this.__kj[Y][ba]=bb;
}else{bc[ba]=bb;
}},setSpacing:function(bd){this.setSpacingY(bd);
this.setSpacingX(bd);
return this;
},setColumnAlign:function(be,bf,bg){if(qx.core.Variant.isSet(h,C)){this.assertInteger(be,z);
this.assertInArray(bf,[m,b,E]);
this.assertInArray(bg,[n,a,g]);
}this._setColumnData(be,f,bf);
this._setColumnData(be,e,bg);
this._applyLayoutChange();
return this;
},getColumnAlign:function(bh){var bi=this.__kj[bh]||{};
return {vAlign:bi.vAlign||n,hAlign:bi.hAlign||m};
},setRowAlign:function(bj,bk,bl){if(qx.core.Variant.isSet(h,C)){this.assertInteger(bj,o);
this.assertInArray(bk,[m,b,E]);
this.assertInArray(bl,[n,a,g]);
}this._setRowData(bj,f,bk);
this._setRowData(bj,e,bl);
this._applyLayoutChange();
return this;
},getRowAlign:function(bm){var bn=this.__ki[bm]||{};
return {vAlign:bn.vAlign||n,hAlign:bn.hAlign||m};
},getCellWidget:function(bo,bp){if(this._invalidChildrenCache){this.__kr();
}var bo=this.__kk[bo]||{};
return bo[bp]||null;
},getRowCount:function(){if(this._invalidChildrenCache){this.__kr();
}return this.__kn+1;
},getColumnCount:function(){if(this._invalidChildrenCache){this.__kr();
}return this.__ko+1;
},getCellAlign:function(bq,br){var bx=n;
var bv=m;
var bw=this.__ki[bq];
var bt=this.__kj[br];
var bs=this.__kk[bq][br];

if(bs){var bu={vAlign:bs.getAlignY(),hAlign:bs.getAlignX()};
}else{bu={};
}if(bu.vAlign){bx=bu.vAlign;
}else if(bw&&bw.vAlign){bx=bw.vAlign;
}else if(bt&&bt.vAlign){bx=bt.vAlign;
}if(bu.hAlign){bv=bu.hAlign;
}else if(bt&&bt.hAlign){bv=bt.hAlign;
}else if(bw&&bw.hAlign){bv=bw.hAlign;
}return {vAlign:bx,hAlign:bv};
},setColumnFlex:function(by,bz){this._setColumnData(by,D,bz);
this._applyLayoutChange();
return this;
},getColumnFlex:function(bA){var bB=this.__kj[bA]||{};
return bB.flex!==undefined?bB.flex:0;
},setRowFlex:function(bC,bD){this._setRowData(bC,D,bD);
this._applyLayoutChange();
return this;
},getRowFlex:function(bE){var bF=this.__ki[bE]||{};
var bG=bF.flex!==undefined?bF.flex:0;
return bG;
},setColumnMaxWidth:function(bH,bI){this._setColumnData(bH,q,bI);
this._applyLayoutChange();
return this;
},getColumnMaxWidth:function(bJ){var bK=this.__kj[bJ]||{};
return bK.maxWidth!==undefined?bK.maxWidth:Infinity;
},setColumnWidth:function(bL,bM){this._setColumnData(bL,r,bM);
this._applyLayoutChange();
return this;
},getColumnWidth:function(bN){var bO=this.__kj[bN]||{};
return bO.width!==undefined?bO.width:null;
},setColumnMinWidth:function(bP,bQ){this._setColumnData(bP,p,bQ);
this._applyLayoutChange();
return this;
},getColumnMinWidth:function(bR){var bS=this.__kj[bR]||{};
return bS.minWidth||0;
},setRowMaxHeight:function(bT,bU){this._setRowData(bT,t,bU);
this._applyLayoutChange();
return this;
},getRowMaxHeight:function(bV){var bW=this.__ki[bV]||{};
return bW.maxHeight||Infinity;
},setRowHeight:function(bX,bY){this._setRowData(bX,B,bY);
this._applyLayoutChange();
return this;
},getRowHeight:function(ca){var cb=this.__ki[ca]||{};
return cb.height!==undefined?cb.height:null;
},setRowMinHeight:function(cc,cd){this._setRowData(cc,s,cd);
this._applyLayoutChange();
return this;
},getRowMinHeight:function(ce){var cf=this.__ki[ce]||{};
return cf.minHeight||0;
},__ks:function(cg){var ck=cg.getSizeHint();
var cj=cg.getMarginLeft()+cg.getMarginRight();
var ci=cg.getMarginTop()+cg.getMarginBottom();
var ch={height:ck.height+ci,width:ck.width+cj,minHeight:ck.minHeight+ci,minWidth:ck.minWidth+cj,maxHeight:ck.maxHeight+ci,maxWidth:ck.maxWidth+cj};
return ch;
},_fixHeightsRowSpan:function(cl){var cs=this.getSpacingY();

for(var i=0,l=this.__km.length;i<l;i++){var cz=this.__km[i];
var cv=this.__ks(cz);
var co=cz.getLayoutProperties();
var cu=co.row;
var cE=cs*(co.rowSpan-1);
var cm=cE;
var cp={};

for(var j=0;j<co.rowSpan;j++){var ct=co.row+j;
var cD=cl[ct];
var cF=this.getRowFlex(ct);

if(cF>0){cp[ct]={min:cD.minHeight,value:cD.height,max:cD.maxHeight,flex:cF};
}cE+=cD.height;
cm+=cD.minHeight;
}if(cE<cv.height){if(!qx.lang.Object.isEmpty(cp)){var cq=qx.ui.layout.Util.computeFlexOffsets(cp,cv.height,cE);

for(var k=0;k<co.rowSpan;k++){var cB=cq[cu+k]?cq[cu+k].offset:0;
cl[cu+k].height+=cB;
}}else{var cy=cs*(co.rowSpan-1);
var cw=cv.height-cy;
var cC=Math.floor(cw/co.rowSpan);
var cA=0;
var cn=0;

for(var k=0;k<co.rowSpan;k++){var cr=cl[cu+k].height;
cA+=cr;

if(cr<cC){cn++;
}}var cx=Math.floor((cw-cA)/cn);
for(var k=0;k<co.rowSpan;k++){if(cl[cu+k].height<cC){cl[cu+k].height+=cx;
}}}}if(cm<cv.minHeight){var cq=qx.ui.layout.Util.computeFlexOffsets(cp,cv.minHeight,cm);

for(var j=0;j<co.rowSpan;j++){var cB=cq[cu+j]?cq[cu+j].offset:0;
cl[cu+j].minHeight+=cB;
}}}},_fixWidthsColSpan:function(cG){var cK=this.getSpacingX();

for(var i=0,l=this.__kl.length;i<l;i++){var cH=this.__kl[i];
var cJ=this.__ks(cH);
var cM=cH.getLayoutProperties();
var cI=cM.column;
var cS=cK*(cM.colSpan-1);
var cL=cS;
var cN={};
var cP;

for(var j=0;j<cM.colSpan;j++){var cT=cM.column+j;
var cR=cG[cT];
var cQ=this.getColumnFlex(cT);
if(cQ>0){cN[cT]={min:cR.minWidth,value:cR.width,max:cR.maxWidth,flex:cQ};
}cS+=cR.width;
cL+=cR.minWidth;
}if(cS<cJ.width){var cO=qx.ui.layout.Util.computeFlexOffsets(cN,cJ.width,cS);

for(var j=0;j<cM.colSpan;j++){cP=cO[cI+j]?cO[cI+j].offset:0;
cG[cI+j].width+=cP;
}}if(cL<cJ.minWidth){var cO=qx.ui.layout.Util.computeFlexOffsets(cN,cJ.minWidth,cL);

for(var j=0;j<cM.colSpan;j++){cP=cO[cI+j]?cO[cI+j].offset:0;
cG[cI+j].minWidth+=cP;
}}}},_getRowHeights:function(){if(this.__kp!=null){return this.__kp;
}var de=[];
var cW=this.__kn;
var cV=this.__ko;

for(var df=0;df<=cW;df++){var cX=0;
var da=0;
var cY=0;

for(var dd=0;dd<=cV;dd++){var cU=this.__kk[df][dd];

if(!cU){continue;
}var db=cU.getLayoutProperties().rowSpan||0;

if(db>1){continue;
}var dc=this.__ks(cU);

if(this.getRowFlex(df)>0){cX=Math.max(cX,dc.minHeight);
}else{cX=Math.max(cX,dc.height);
}da=Math.max(da,dc.height);
}var cX=Math.max(cX,this.getRowMinHeight(df));
var cY=this.getRowMaxHeight(df);

if(this.getRowHeight(df)!==null){var da=this.getRowHeight(df);
}else{var da=Math.max(cX,Math.min(da,cY));
}de[df]={minHeight:cX,height:da,maxHeight:cY};
}
if(this.__km.length>0){this._fixHeightsRowSpan(de);
}this.__kp=de;
return de;
},_getColWidths:function(){if(this.__kq!=null){return this.__kq;
}var dk=[];
var dh=this.__ko;
var dj=this.__kn;

for(var dq=0;dq<=dh;dq++){var dn=0;
var dm=0;
var di=Infinity;

for(var dr=0;dr<=dj;dr++){var dg=this.__kk[dr][dq];

if(!dg){continue;
}var dl=dg.getLayoutProperties().colSpan||0;

if(dl>1){continue;
}var dp=this.__ks(dg);

if(this.getColumnFlex(dq)>0){dm=Math.max(dm,dp.minWidth);
}else{dm=Math.max(dm,dp.width);
}dn=Math.max(dn,dp.width);
}var dm=Math.max(dm,this.getColumnMinWidth(dq));
var di=this.getColumnMaxWidth(dq);

if(this.getColumnWidth(dq)!==null){var dn=this.getColumnWidth(dq);
}else{var dn=Math.max(dm,Math.min(dn,di));
}dk[dq]={minWidth:dm,width:dn,maxWidth:di};
}
if(this.__kl.length>0){this._fixWidthsColSpan(dk);
}this.__kq=dk;
return dk;
},_getColumnFlexOffsets:function(ds){var dt=this.getSizeHint();
var dx=ds-dt.width;

if(dx==0){return {};
}var dv=this._getColWidths();
var du={};

for(var i=0,l=dv.length;i<l;i++){var dy=dv[i];
var dw=this.getColumnFlex(i);

if((dw<=0)||(dy.width==dy.maxWidth&&dx>0)||(dy.width==dy.minWidth&&dx<0)){continue;
}du[i]={min:dy.minWidth,value:dy.width,max:dy.maxWidth,flex:dw};
}return qx.ui.layout.Util.computeFlexOffsets(du,ds,dt.width);
},_getRowFlexOffsets:function(dz){var dA=this.getSizeHint();
var dD=dz-dA.height;

if(dD==0){return {};
}var dE=this._getRowHeights();
var dB={};

for(var i=0,l=dE.length;i<l;i++){var dF=dE[i];
var dC=this.getRowFlex(i);

if((dC<=0)||(dF.height==dF.maxHeight&&dD>0)||(dF.height==dF.minHeight&&dD<0)){continue;
}dB[i]={min:dF.minHeight,value:dF.height,max:dF.maxHeight,flex:dC};
}return qx.ui.layout.Util.computeFlexOffsets(dB,dz,dA.height);
},renderLayout:function(dG,dH){if(this._invalidChildrenCache){this.__kr();
}var dV=qx.ui.layout.Util;
var dJ=this.getSpacingX();
var dP=this.getSpacingY();
var eb=this._getColWidths();
var ea=this._getColumnFlexOffsets(dG);
var dK=[];
var ed=this.__ko;
var dI=this.__kn;
var ec;

for(var ee=0;ee<=ed;ee++){ec=ea[ee]?ea[ee].offset:0;
dK[ee]=eb[ee].width+ec;
}var dS=this._getRowHeights();
var dU=this._getRowFlexOffsets(dH);
var ek=[];

for(var dQ=0;dQ<=dI;dQ++){ec=dU[dQ]?dU[dQ].offset:0;
ek[dQ]=dS[dQ].height+ec;
}var el=0;

for(var ee=0;ee<=ed;ee++){var top=0;

for(var dQ=0;dQ<=dI;dQ++){var dX=this.__kk[dQ][ee];
if(!dX){top+=ek[dQ]+dP;
continue;
}var dL=dX.getLayoutProperties();
if(dL.row!==dQ||dL.column!==ee){top+=ek[dQ]+dP;
continue;
}var ej=dJ*(dL.colSpan-1);

for(var i=0;i<dL.colSpan;i++){ej+=dK[ee+i];
}var dY=dP*(dL.rowSpan-1);

for(var i=0;i<dL.rowSpan;i++){dY+=ek[dQ+i];
}var dM=dX.getSizeHint();
var eh=dX.getMarginTop();
var dW=dX.getMarginLeft();
var dT=dX.getMarginBottom();
var dO=dX.getMarginRight();
var dR=Math.max(dM.minWidth,Math.min(ej-dW-dO,dM.maxWidth));
var ei=Math.max(dM.minHeight,Math.min(dY-eh-dT,dM.maxHeight));
var ef=this.getCellAlign(dQ,ee);
var eg=el+dV.computeHorizontalAlignOffset(ef.hAlign,dR,ej,dW,dO);
var dN=top+dV.computeVerticalAlignOffset(ef.vAlign,ei,dY,eh,dT);
dX.renderLayout(eg,dN,dR,ei);
top+=ek[dQ]+dP;
}el+=dK[ee]+dJ;
}},invalidateLayoutCache:function(){qx.ui.layout.Abstract.prototype.invalidateLayoutCache.call(this);
this.__kq=null;
this.__kp=null;
},_computeSizeHint:function(){if(this._invalidChildrenCache){this.__kr();
}var eq=this._getColWidths();
var es=0,et=0;

for(var i=0,l=eq.length;i<l;i++){var eu=eq[i];

if(this.getColumnFlex(i)>0){es+=eu.minWidth;
}else{es+=eu.width;
}et+=eu.width;
}var ev=this._getRowHeights();
var eo=0,er=0;

for(var i=0,l=ev.length;i<l;i++){var ew=ev[i];

if(this.getRowFlex(i)>0){eo+=ew.minHeight;
}else{eo+=ew.height;
}er+=ew.height;
}var en=this.getSpacingX()*(eq.length-1);
var em=this.getSpacingY()*(ev.length-1);
var ep={minWidth:es+en,width:et+en,minHeight:eo+em,height:er+em};
return ep;
}},destruct:function(){this.__kk=this.__ki=this.__kj=this.__kl=this.__km=this.__kq=this.__kp=null;
}});
})();
(function(){var m="open",k="icon",j="auto",h="qx.debug",g="middle",f="String",d="label",c="on",b="changeOpen",a="excluded",K="visible",J="opened",I="always",H="qx.ui.tree.AbstractTreeItem",G="_applyIconOpened",F="Boolean",E="Invalid child index: ",D="__mu",C="Integer",B="_applyIndent",t="changeOpenSymbolMode",u="_applyOpenSymbolMode",r="resize",s="",p="removeItem",q="addItem",n="__mt",o="__mx",v="iconOpened",w="abstract",y="never",x="_applyIcon",A="_applyOpen",z="_applyLabel";
qx.Class.define(H,{extend:qx.ui.core.Widget,type:w,include:[qx.ui.form.MModelProperty],implement:[qx.ui.form.IModel],construct:function(){qx.ui.core.Widget.call(this);
this.__mt=[];
this._setLayout(new qx.ui.layout.HBox());
this._addWidgets();
this.initOpen();
},properties:{open:{check:F,init:false,event:b,apply:A},openSymbolMode:{check:[I,y,j],init:j,event:t,apply:u},indent:{check:C,init:19,apply:B,themeable:true},parent:{check:H,nullable:true},icon:{check:f,apply:x,nullable:true,themeable:true},iconOpened:{check:f,apply:G,nullable:true,themeable:true},label:{check:f,apply:z,init:s}},members:{__mt:null,__mu:null,__mv:null,__mw:null,__mx:null,__my:null,_addWidgets:function(){throw new Error("Abstract method call.");
},_createChildControlImpl:function(L,M){var N;

switch(L){case d:N=new qx.ui.basic.Label().set({alignY:g,value:this.getLabel()});
break;
case k:N=new qx.ui.basic.Image().set({alignY:g,source:this.getIcon()});
break;
case m:N=new qx.ui.tree.FolderOpenButton().set({alignY:g});
N.addListener(b,this._onChangeOpen,this);
N.addListener(r,this._updateIndent,this);
break;
}return N||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,L);
},getTree:function(){var P=this;

while(P.getParent()){P=P.getParent();
}var O=P.getLayoutParent()?P.getLayoutParent().getLayoutParent():0;

if(O&&O instanceof qx.ui.core.scroll.ScrollPane){return O.getLayoutParent();
}return null;
},addWidget:function(Q,R){this._add(Q,R);
},addSpacer:function(){if(!this.__mx){this.__mx=new qx.ui.core.Spacer();
}else{this._remove(this.__mx);
}this._add(this.__mx);
},addOpenButton:function(){this._add(this.getChildControl(m));
},_onChangeOpen:function(e){if(this.isOpenable()){this.setOpen(e.getData());
}},addIcon:function(){var S=this.getChildControl(k);

if(this.__mw){this._remove(S);
}this._add(S);
this.__mw=true;
},addLabel:function(T){var U=this.getChildControl(d);

if(this.__mv){this._remove(U);
}
if(T){this.setLabel(T);
}else{U.setValue(this.getLabel());
}this._add(U);
this.__mv=true;
},addState:function(V){qx.ui.core.Widget.prototype.addState.call(this,V);
var X=this._getChildren();

for(var i=0,l=X.length;i<l;i++){var W=X[i];

if(W.addState){X[i].addState(V);
}}},removeState:function(Y){qx.ui.core.Widget.prototype.removeState.call(this,Y);
var bb=this._getChildren();

for(var i=0,l=bb.length;i<l;i++){var ba=bb[i];

if(ba.addState){bb[i].removeState(Y);
}}},_applyIcon:function(bc,bd){if(!this.__mA()){this.__mB(bc);
}else if(!this.isOpen()){this.__mB(bc);
}},_applyIconOpened:function(be,bf){if(this.isOpen()){if(this.__mz()&&this.__mA()){this.__mB(be);
}else if(!this.__mz()&&this.__mA()){this.__mB(be);
}}},_applyLabel:function(bg,bh){var bi=this.getChildControl(d,true);

if(bi){bi.setValue(bg);
}},_applyOpen:function(bj,bk){if(this.hasChildren()){this.getChildrenContainer().setVisibility(bj?K:a);
}var open=this.getChildControl(m,true);

if(open){open.setOpen(bj);
}var bl;
if(bj){bl=this.__mA()?this.getIconOpened():null;
}else{bl=this.getIcon();
}
if(bl){this.__mB(bl);
}bj?this.addState(J):this.removeState(J);
},__mz:function(){return qx.util.PropertyUtil.getUserValue(this,k);
},__mA:function(){return qx.util.PropertyUtil.getUserValue(this,v);
},__mB:function(bm){var bn=this.getChildControl(k,true);

if(bn){bn.setSource(bm);
}},isOpenable:function(){var bo=this.getOpenSymbolMode();
return (bo===I||bo===j&&this.hasChildren());
},_shouldShowOpenSymbol:function(){var open=this.getChildControl(m,true);

if(!open){return false;
}var bp=this.getTree();

if(!bp.getRootOpenClose()){if(bp.getHideRoot()){if(bp.getRoot()==this.getParent()){return false;
}}else{if(bp.getRoot()==this){return false;
}}}return this.isOpenable();
},_applyOpenSymbolMode:function(bq,br){this._updateIndent();
},_updateIndent:function(){if(!this.getTree()){return;
}var bt=0;
var open=this.getChildControl(m,true);

if(open){if(this._shouldShowOpenSymbol()){open.show();
var bs=open.getBounds();

if(bs){bt=bs.width;
}else{return;
}}else{open.exclude();
}}
if(this.__mx){this.__mx.setWidth((this.getLevel()+1)*this.getIndent()-bt);
}},_applyIndent:function(bu,bv){this._updateIndent();
},getLevel:function(){var bw=this.getTree();

if(!bw){return;
}var bx=this;
var by=-1;

while(bx){bx=bx.getParent();
by+=1;
}if(bw.getHideRoot()){by-=1;
}
if(!bw.getRootOpenClose()){by-=1;
}return by;
},syncWidget:function(){this._updateIndent();
},getChildrenContainer:function(){if(!this.__mu){this.__mu=new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({visibility:this.isOpen()?K:a});
}return this.__mu;
},hasChildrenContainer:function(){return this.__mu;
},getParentChildrenContainer:function(){if(this.getParent()){return this.getParent().getChildrenContainer();
}else if(this.getLayoutParent()){return this.getLayoutParent();
}else{return null;
}},getChildren:function(){return this.__mt;
},hasChildren:function(){return this.__mt?this.__mt.length>0:false;
},getItems:function(bz,bA,bB){if(bB!==false){var bC=[];
}else{var bC=[this];
}var bF=this.hasChildren()&&(bA!==false||this.isOpen());

if(bF){var bE=this.getChildren();

if(bz===false){bC=bC.concat(bE);
}else{for(var i=0,bD=bE.length;i<bD;i++){bC=bC.concat(bE[i].getItems(bz,bA,false));
}}}return bC;
},recursiveAddToWidgetQueue:function(){var bG=this.getItems(true,true,false);

for(var i=0,l=bG.length;i<l;i++){qx.ui.core.queue.Widget.add(bG[i]);
}},__mC:function(){if(this.getParentChildrenContainer()){this.getParentChildrenContainer()._addAfter(this.getChildrenContainer(),this);
}},add:function(bH){var bI=this.getChildrenContainer();
var bL=this.getTree();

for(var i=0,l=arguments.length;i<l;i++){var bM=arguments[i];
var bK=bM.getParent();

if(bK){bK.remove(bM);
}bM.setParent(this);
var bJ=this.hasChildren();
bI.add(bM);

if(bM.hasChildren()){bI.add(bM.getChildrenContainer());
}this.__mt.push(bM);

if(!bJ){this.__mC();
}
if(bL){bM.recursiveAddToWidgetQueue();
bL.fireNonBubblingEvent(q,qx.event.type.Data,[bM]);
}}
if(bL){qx.ui.core.queue.Widget.add(this);
}},addAt:function(bN,bO){if(qx.core.Variant.isSet(h,c)){this.assert(bO<=this.__mt.length&&bO>=0,E+bO);
}
if(bO==this.__mt.length){this.add(bN);
return;
}var bS=bN.getParent();

if(bS){bS.remove(bN);
}var bQ=this.getChildrenContainer();
bN.setParent(this);
var bR=this.hasChildren();
var bP=this.__mt[bO];
bQ.addBefore(bN,bP);

if(bN.hasChildren()){bQ.addAfter(bN.getChildrenContainer(),bN);
}qx.lang.Array.insertAt(this.__mt,bN,bO);

if(!bR){this.__mC();
}
if(this.getTree()){bN.recursiveAddToWidgetQueue();
qx.ui.core.queue.Widget.add(this);
}},addBefore:function(bT,bU){if(qx.core.Variant.isSet(h,c)){this.assert(this.__mt.indexOf(bU)>=0);
}var bV=bT.getParent();

if(bV){bV.remove(bT);
}this.addAt(bT,this.__mt.indexOf(bU));
},addAfter:function(bW,bX){if(qx.core.Variant.isSet(h,c)){this.assert(this.__mt.indexOf(bX)>=0);
}var bY=bW.getParent();

if(bY){bY.remove(bW);
}this.addAt(bW,this.__mt.indexOf(bX)+1);
},addAtBegin:function(ca){this.addAt(ca,0);
},remove:function(cb){for(var i=0,l=arguments.length;i<l;i++){var cf=arguments[i];

if(this.__mt.indexOf(cf)==-1){this.warn("Cannot remove treeitem '"+cf+"'. It is not a child of this tree item.");
return;
}var cc=this.getChildrenContainer();

if(cf.hasChildrenContainer()){var ce=cf.getChildrenContainer();

if(cc.getChildren().indexOf(ce)>=0){cc.remove(ce);
}}qx.lang.Array.remove(this.__mt,cf);
cf.setParent(null);
cc.remove(cf);
}var cd=this.getTree();

if(cd){cd.fireNonBubblingEvent(p,qx.event.type.Data,[cf]);
}qx.ui.core.queue.Widget.add(this);
},removeAt:function(cg){var ch=this.__mt[cg];

if(ch){this.remove(ch);
}},removeAll:function(){for(var i=this.__mt.length-1;i>=0;i--){this.remove(this.__mt[i]);
}}},destruct:function(){this._disposeArray(n);
this._disposeObjects(o,D);
}});
})();
(function(){var i="opened",h="click",g="changeOpen",f="Boolean",d="qx.ui.tree.FolderOpenButton",c="_applyOpen",b="mouseup",a="mousedown";
qx.Class.define(d,{extend:qx.ui.basic.Image,include:qx.ui.core.MExecutable,construct:function(){qx.ui.basic.Image.call(this);
this.initOpen();
this.addListener(h,this._onClick);
this.addListener(a,this._stopPropagation,this);
this.addListener(b,this._stopPropagation,this);
},properties:{open:{check:f,init:false,event:g,apply:c}},members:{_applyOpen:function(j,k){j?this.addState(i):this.removeState(i);
this.execute();
},_stopPropagation:function(e){e.stopPropagation();
},_onClick:function(e){this.toggleOpen();
e.stopPropagation();
}}});
})();
(function(){var d="$$theme_",c="$$user_",b="$$init_",a="qx.util.PropertyUtil";
qx.Class.define(a,{statics:{getProperties:function(e){return e.$$properties;
},getAllProperties:function(f){var i={};
var j=f;
while(j!=qx.core.Object){var h=this.getProperties(j);

for(var g in h){i[g]=h[g];
}j=j.superclass;
}return i;
},getUserValue:function(k,l){return k[c+l];
},setUserValue:function(m,n,o){m[c+n]=o;
},deleteUserValue:function(p,q){delete (p[c+q]);
},getInitValue:function(r,s){return r[b+s];
},setInitValue:function(t,u,v){t[b+u]=v;
},deleteInitValue:function(w,x){delete (w[b+x]);
},getThemeValue:function(y,z){return y[d+z];
},setThemeValue:function(A,B,C){A[d+B]=C;
},deleteThemeValue:function(D,E){delete (D[d+E]);
},setThemed:function(F,G,H){var I=qx.core.Property.$$method.setThemed;
F[I[G]](H);
},resetThemed:function(J,K){var L=qx.core.Property.$$method.resetThemed;
J[L[K]]();
}}});
})();
(function(){var b="tree-folder",a="qx.ui.tree.TreeFolder";
qx.Class.define(a,{extend:qx.ui.tree.AbstractTreeItem,construct:function(c){qx.ui.tree.AbstractTreeItem.call(this);

if(c){this.setLabel(c);
}},properties:{appearance:{refine:true,init:b}},members:{_addWidgets:function(){this.addSpacer();
this.addOpenButton();
this.addIcon();
this.addLabel();
}}});
})();
(function(){var b="qx.ui.tree.TreeFile",a="tree-file";
qx.Class.define(b,{extend:qx.ui.tree.AbstractTreeItem,construct:function(c){qx.ui.tree.AbstractTreeItem.call(this);

if(c){this.setLabel(c);
}},properties:{appearance:{refine:true,init:a}},members:{_addWidgets:function(){this.addSpacer();
this.addIcon();
this.addLabel();
}}});
})();
(function(){var k="Boolean",j="qx.event.type.Event",i="queued",h="String",g="sending",f="receiving",d="aborted",c="failed",b="nocache",a="completed",S="qx.io.remote.Response",R="POST",Q="configured",P="timeout",O="GET",N="Pragma",M="no-url-params-on-post",L="PUT",K="no-cache",J="Cache-Control",r="Content-Type",s="text/plain",p="application/xml",q="application/json",n="text/html",o="qx.ioRemoteDebug",l="application/x-www-form-urlencoded",m="qx.io.remote.Exchange",t="Integer",u="X-Qooxdoo-Response-Type",B="HEAD",A="qx.io.remote.Request",D="qx.debug",C="_applyResponseType",F="_applyState",E="text/javascript",x="changeState",I="_applyProhibitCaching",H="",G="_applyMethod",w="DELETE",y="boolean",z="on";
qx.Class.define(A,{extend:qx.core.Object,construct:function(T,U,V){qx.core.Object.call(this);
this.__rW={};
this.__rX={};
this.__rY={};
this.__sa={};

if(T!==undefined){this.setUrl(T);
}
if(U!==undefined){this.setMethod(U);
}
if(V!==undefined){this.setResponseType(V);
}this.setProhibitCaching(true);
this.__sb=++qx.io.remote.Request.__sb;
},events:{"created":j,"configured":j,"sending":j,"receiving":j,"completed":S,"aborted":j,"failed":S,"timeout":S},statics:{__sb:0,methodAllowsRequestBody:function(W){return (W==R)||(W==L);
}},properties:{url:{check:h,init:H},method:{check:[O,R,L,B,w],apply:G,init:O},asynchronous:{check:k,init:true},data:{check:h,nullable:true},username:{check:h,nullable:true},password:{check:h,nullable:true},state:{check:[Q,i,g,f,a,d,P,c],init:Q,apply:F,event:x},responseType:{check:[s,E,q,p,n],init:s,apply:C},timeout:{check:t,nullable:true},prohibitCaching:{check:function(v){return typeof v==y||v===M;
},init:true,apply:I},crossDomain:{check:k,init:false},fileUpload:{check:k,init:false},transport:{check:m,nullable:true},useBasicHttpAuth:{check:k,init:false},parseJson:{check:k,init:true}},members:{__rW:null,__rX:null,__rY:null,__sa:null,__sb:null,send:function(){qx.io.remote.RequestQueue.getInstance().add(this);
},abort:function(){qx.io.remote.RequestQueue.getInstance().abort(this);
},reset:function(){switch(this.getState()){case g:case f:this.error("Aborting already sent request!");
case i:this.abort();
break;
}},isConfigured:function(){return this.getState()===Q;
},isQueued:function(){return this.getState()===i;
},isSending:function(){return this.getState()===g;
},isReceiving:function(){return this.getState()===f;
},isCompleted:function(){return this.getState()===a;
},isAborted:function(){return this.getState()===d;
},isTimeout:function(){return this.getState()===P;
},isFailed:function(){return this.getState()===c;
},__sc:qx.event.GlobalError.observeMethod(function(e){var X=e.clone();
X.setTarget(this);
this.dispatchEvent(X);
}),_onqueued:function(e){this.setState(i);
this.__sc(e);
},_onsending:function(e){this.setState(g);
this.__sc(e);
},_onreceiving:function(e){this.setState(f);
this.__sc(e);
},_oncompleted:function(e){this.setState(a);
this.__sc(e);
this.dispose();
},_onaborted:function(e){this.setState(d);
this.__sc(e);
this.dispose();
},_ontimeout:function(e){this.setState(P);
this.__sc(e);
this.dispose();
},_onfailed:function(e){this.setState(c);
this.__sc(e);
this.dispose();
},_applyState:function(Y,ba){if(qx.core.Variant.isSet(D,z)){if(qx.core.Setting.get(o)){this.debug("State: "+Y);
}}},_applyProhibitCaching:function(bb,bc){if(!bb){this.removeParameter(b);
this.removeRequestHeader(N);
this.removeRequestHeader(J);
return;
}if(bb!==M||this.getMethod()!=R){this.setParameter(b,new Date().valueOf());
}else{this.removeParameter(b);
}this.setRequestHeader(N,K);
this.setRequestHeader(J,K);
},_applyMethod:function(bd,be){if(qx.io.remote.Request.methodAllowsRequestBody(bd)){this.setRequestHeader(r,l);
}else{this.removeRequestHeader(r);
}var bf=this.getProhibitCaching();
this._applyProhibitCaching(bf,bf);
},_applyResponseType:function(bg,bh){this.setRequestHeader(u,bg);
},setRequestHeader:function(bi,bj){this.__rW[bi]=bj;
},removeRequestHeader:function(bk){delete this.__rW[bk];
},getRequestHeader:function(bl){return this.__rW[bl]||null;
},getRequestHeaders:function(){return this.__rW;
},setParameter:function(bm,bn,bo){if(bo){this.__rY[bm]=bn;
}else{this.__rX[bm]=bn;
}},removeParameter:function(bp,bq){if(bq){delete this.__rY[bp];
}else{delete this.__rX[bp];
}},getParameter:function(br,bs){if(bs){return this.__rY[br]||null;
}else{return this.__rX[br]||null;
}},getParameters:function(bt){return (bt?this.__rY:this.__rX);
},setFormField:function(bu,bv){this.__sa[bu]=bv;
},removeFormField:function(bw){delete this.__sa[bw];
},getFormField:function(bx){return this.__sa[bx]||null;
},getFormFields:function(){return this.__sa;
},getSequenceNumber:function(){return this.__sb;
}},destruct:function(){this.setTransport(null);
this.__rW=this.__rX=this.__rY=this.__sa=null;
}});
})();
(function(){var b=".",a="qx.bom.client.Transport";
qx.Class.define(a,{statics:{getMaxConcurrentRequestCount:function(){var h;
var c=qx.bom.client.Engine;
var g=c.FULLVERSION.split(b);
var e=0;
var d=0;
var f=0;
if(g[0]){e=g[0];
}if(g[1]){d=g[1];
}if(g[2]){f=g[2];
}if(window.maxConnectionsPerServer){h=window.maxConnectionsPerServer;
}else if(c.OPERA){h=8;
}else if(c.WEBKIT){h=4;
}else if(c.GECKO&&((e>1)||((e==1)&&(d>9))||((e==1)&&(d==9)&&(f>=1)))){h=6;
}else{h=2;
}return h;
}}});
})();
(function(){var l="qx.ioRemoteDebug",k="Integer",j="qx.debug",h="on",g="aborted",f="_onaborted",d="_on",c="Boolean",b="__se",a="__sg",x="singleton",w="interval",v="receiving",u="Request-Queue Progress: ",t="queued",s="/",r="_applyEnabled",q="sending",p="completed",o="failed",m="qx.io.remote.RequestQueue",n="timeout";
qx.Class.define(m,{type:x,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__sd=[];
this.__se=[];
this.__sf=0;
this.__sg=new qx.event.Timer(500);
this.__sg.addListener(w,this._oninterval,this);
},properties:{enabled:{init:true,check:c,apply:r},maxTotalRequests:{check:k,nullable:true},maxConcurrentRequests:{check:k,init:qx.bom.client.Transport.getMaxConcurrentRequestCount()},defaultTimeout:{check:k,init:5000}},members:{__sd:null,__se:null,__sf:null,__sg:null,getRequestQueue:function(){return this.__sd;
},getActiveQueue:function(){return this.__se;
},_debug:function(){if(qx.core.Variant.isSet(j,h)){if(qx.core.Setting.get(l)){var y=this.__se.length+s+(this.__sd.length+this.__se.length);
this.debug("Progress: "+y);
window.status=u+y;
}}},_check:function(){this._debug();
if(this.__se.length==0&&this.__sd.length==0){this.__sg.stop();
}if(!this.getEnabled()){return;
}if(this.__sd.length==0||(this.__sd[0].isAsynchronous()&&this.__se.length>=this.getMaxConcurrentRequests())){return;
}if(this.getMaxTotalRequests()!=null&&this.__sf>=this.getMaxTotalRequests()){return;
}var z=this.__sd.shift();
var A=new qx.io.remote.Exchange(z);
this.__sf++;
this.__se.push(A);
this._debug();
A.addListener(q,this._onsending,this);
A.addListener(v,this._onreceiving,this);
A.addListener(p,this._oncompleted,this);
A.addListener(g,this._oncompleted,this);
A.addListener(n,this._oncompleted,this);
A.addListener(o,this._oncompleted,this);
A._start=(new Date).valueOf();
A.send();
if(this.__sd.length>0){this._check();
}},_remove:function(B){qx.lang.Array.remove(this.__se,B);
B.dispose();
this._check();
},__sh:0,_onsending:function(e){if(qx.core.Variant.isSet(j,h)){if(qx.core.Setting.get(l)){this.__sh++;
e.getTarget()._counted=true;
this.debug("ActiveCount: "+this.__sh);
}}e.getTarget().getRequest()._onsending(e);
},_onreceiving:function(e){e.getTarget().getRequest()._onreceiving(e);
},_oncompleted:function(e){if(qx.core.Variant.isSet(j,h)){if(qx.core.Setting.get(l)){if(e.getTarget()._counted){this.__sh--;
this.debug("ActiveCount: "+this.__sh);
}}}var D=e.getTarget().getRequest();
var C=d+e.getType();
this._remove(e.getTarget());
try{if(D[C]){D[C](e);
}}catch(E){this.error("Request "+D+" handler "+C+" threw an error: ",E);
try{if(D[f]){var event=qx.event.Registration.createEvent(g,qx.event.type.Event);
D[f](event);
}}catch(F){}}},_oninterval:function(e){var M=this.__se;

if(M.length==0){this.__sg.stop();
return;
}var H=(new Date).valueOf();
var K;
var I;
var L=this.getDefaultTimeout();
var J;
var G;

for(var i=M.length-1;i>=0;i--){K=M[i];
I=K.getRequest();

if(I.isAsynchronous()){J=I.getTimeout();
if(J==0){continue;
}
if(J==null){J=L;
}G=H-K._start;

if(G>J){this.warn("Timeout: transport "+K.toHashCode());
this.warn(G+"ms > "+J+"ms");
K.timeout();
}}}},_applyEnabled:function(N,O){if(N){this._check();
}this.__sg.setEnabled(N);
},add:function(P){P.setState(t);

if(P.isAsynchronous()){this.__sd.push(P);
}else{this.__sd.unshift(P);
}this._check();

if(this.getEnabled()){this.__sg.start();
}},abort:function(Q){var R=Q.getTransport();

if(R){R.abort();
}else if(qx.lang.Array.contains(this.__sd,Q)){qx.lang.Array.remove(this.__sd,Q);
}}},destruct:function(){this._disposeArray(b);
this._disposeObjects(a);
this.__sd=null;
}});
})();
(function(){var p="qx.ioRemoteDebug",o="qx.debug",n="on",m="failed",k="sending",j="completed",h="receiving",g="aborted",f="timeout",d="qx.event.type.Event",bs="Connection dropped",br="qx.io.remote.Response",bq="=",bp="configured",bo="&",bn="Unknown status code. ",bm="qx.io.remote.transport.XmlHttp",bl="qx.io.remote.transport.Abstract",bk="Request-URL too large",bj="MSHTML-specific HTTP status code",w="Not available",x="Precondition failed",u="Server error",v="qx.io.remote.Exchange",s="Possibly due to a cross-domain request?",t="Bad gateway",q="Gone",r="See other",D="Partial content",E="Server timeout",O="qx.io.remote.transport.Script",L="HTTP version not supported",W="Unauthorized",R="Possibly due to application URL using 'file:' protocol?",bf="Multiple choices",bc="Payment required",H="Not implemented",bi="Proxy authentication required",bh="Length required",bg="_applyState",G="changeState",J="Not modified",K="Not acceptable",N="qx.io.remote.Request",P="Connection closed by server",S="Moved permanently",Y="_applyImplementation",be="",y="Method not allowed",z="Moved temporarily",I="Forbidden",V="Use proxy",U="Ok",T="Conflict",bb="Not found",ba="Request time-out",Q="Bad request",X="No content",a="file:",bd="qx.io.remote.transport.Iframe",A="Request entity too large",B="Unknown status code",M="Unsupported media type",b="Gateway time-out",c="created",F="Out of resources",C="undefined";
qx.Class.define(v,{extend:qx.core.Object,construct:function(bt){qx.core.Object.call(this);
this.setRequest(bt);
bt.setTransport(this);
},events:{"sending":d,"receiving":d,"completed":br,"aborted":d,"failed":br,"timeout":br},statics:{typesOrder:[bm,bd,O],typesReady:false,typesAvailable:{},typesSupported:{},registerType:function(bu,bv){qx.io.remote.Exchange.typesAvailable[bv]=bu;
},initTypes:function(){if(qx.io.remote.Exchange.typesReady){return;
}
for(var bx in qx.io.remote.Exchange.typesAvailable){var bw=qx.io.remote.Exchange.typesAvailable[bx];

if(bw.isSupported()){qx.io.remote.Exchange.typesSupported[bx]=bw;
}}qx.io.remote.Exchange.typesReady=true;

if(qx.lang.Object.isEmpty(qx.io.remote.Exchange.typesSupported)){throw new Error("No supported transport types were found!");
}},canHandle:function(by,bz,bA){if(!qx.lang.Array.contains(by.handles.responseTypes,bA)){return false;
}
for(var bB in bz){if(!by.handles[bB]){return false;
}}return true;
},_nativeMap:{0:c,1:bp,2:k,3:h,4:j},wasSuccessful:function(bC,bD,bE){if(bE){switch(bC){case null:case 0:return true;
case -1:return bD<4;
default:return typeof bC===C;
}}else{switch(bC){case -1:if(qx.core.Variant.isSet(o,n)){if(qx.core.Setting.get(p)&&bD>3){qx.log.Logger.debug(this,"Failed with statuscode: -1 at readyState "+bD);
}}return bD<4;
case 200:case 304:return true;
case 201:case 202:case 203:case 204:case 205:return true;
case 206:if(qx.core.Variant.isSet(o,n)){if(qx.core.Setting.get(p)&&bD===4){qx.log.Logger.debug(this,"Failed with statuscode: 206 (Partial content while being complete!)");
}}return bD!==4;
case 300:case 301:case 302:case 303:case 305:case 400:case 401:case 402:case 403:case 404:case 405:case 406:case 407:case 408:case 409:case 410:case 411:case 412:case 413:case 414:case 415:case 500:case 501:case 502:case 503:case 504:case 505:if(qx.core.Variant.isSet(o,n)){if(qx.core.Setting.get(p)){qx.log.Logger.debug(this,"Failed with typical HTTP statuscode: "+bC);
}}return false;
case 12002:case 12007:case 12029:case 12030:case 12031:case 12152:case 13030:if(qx.core.Variant.isSet(o,n)){if(qx.core.Setting.get(p)){qx.log.Logger.debug(this,"Failed with MSHTML specific HTTP statuscode: "+bC);
}}return false;
default:if(bC>206&&bC<300){return true;
}qx.log.Logger.debug(this,"Unknown status code: "+bC+" ("+bD+")");
return false;
}}},statusCodeToString:function(bF){switch(bF){case -1:return w;
case 0:var bG=window.location.href;
if(qx.lang.String.startsWith(bG.toLowerCase(),a)){return (bn+R);
}else{return (bn+s);
}break;
case 200:return U;
case 304:return J;
case 206:return D;
case 204:return X;
case 300:return bf;
case 301:return S;
case 302:return z;
case 303:return r;
case 305:return V;
case 400:return Q;
case 401:return W;
case 402:return bc;
case 403:return I;
case 404:return bb;
case 405:return y;
case 406:return K;
case 407:return bi;
case 408:return ba;
case 409:return T;
case 410:return q;
case 411:return bh;
case 412:return x;
case 413:return A;
case 414:return bk;
case 415:return M;
case 500:return u;
case 501:return H;
case 502:return t;
case 503:return F;
case 504:return b;
case 505:return L;
case 12002:return E;
case 12029:return bs;
case 12030:return bs;
case 12031:return bs;
case 12152:return P;
case 13030:return bj;
default:return B;
}}},properties:{request:{check:N,nullable:true},implementation:{check:bl,nullable:true,apply:Y},state:{check:[bp,k,h,j,g,f,m],init:bp,event:G,apply:bg}},members:{send:function(){var bK=this.getRequest();

if(!bK){return this.error("Please attach a request object first");
}qx.io.remote.Exchange.initTypes();
var bI=qx.io.remote.Exchange.typesOrder;
var bH=qx.io.remote.Exchange.typesSupported;
var bM=bK.getResponseType();
var bN={};

if(bK.getAsynchronous()){bN.asynchronous=true;
}else{bN.synchronous=true;
}
if(bK.getCrossDomain()){bN.crossDomain=true;
}
if(bK.getFileUpload()){bN.fileUpload=true;
}for(var bL in bK.getFormFields()){bN.programaticFormFields=true;
break;
}var bO,bJ;

for(var i=0,l=bI.length;i<l;i++){bO=bH[bI[i]];

if(bO){if(!qx.io.remote.Exchange.canHandle(bO,bN,bM)){continue;
}
try{if(qx.core.Variant.isSet(o,n)){if(qx.core.Setting.get(p)){this.debug("Using implementation: "+bO.classname);
}}bJ=new bO;
this.setImplementation(bJ);
bJ.setUseBasicHttpAuth(bK.getUseBasicHttpAuth());
bJ.send();
return true;
}catch(bP){this.error("Request handler throws error");
this.error(bP);
return;
}}}this.error("There is no transport implementation available to handle this request: "+bK);
},abort:function(){var bQ=this.getImplementation();

if(bQ){if(qx.core.Variant.isSet(o,n)){if(qx.core.Setting.get(p)){this.debug("Abort: implementation "+bQ.toHashCode());
}}bQ.abort();
}else{if(qx.core.Variant.isSet(o,n)){if(qx.core.Setting.get(p)){this.debug("Abort: forcing state to be aborted");
}}this.setState(g);
}},timeout:function(){var bT=this.getImplementation();

if(bT){var bS=be;

for(var bR in bT.getParameters()){bS+=bo+bR+bq+bT.getParameters()[bR];
}this.warn("Timeout: implementation "+bT.toHashCode()+", "+bT.getUrl()+" ["+bT.getMethod()+"], "+bS);
bT.timeout();
}else{this.warn("Timeout: forcing state to timeout");
this.setState(f);
}this.__si();
},__si:function(){var bU=this.getRequest();

if(bU){bU.setTimeout(0);
}},_onsending:function(e){this.setState(k);
},_onreceiving:function(e){this.setState(h);
},_oncompleted:function(e){this.setState(j);
},_onabort:function(e){this.setState(g);
},_onfailed:function(e){this.setState(m);
},_ontimeout:function(e){this.setState(f);
},_applyImplementation:function(bV,bW){if(bW){bW.removeListener(k,this._onsending,this);
bW.removeListener(h,this._onreceiving,this);
bW.removeListener(j,this._oncompleted,this);
bW.removeListener(g,this._onabort,this);
bW.removeListener(f,this._ontimeout,this);
bW.removeListener(m,this._onfailed,this);
}
if(bV){var bY=this.getRequest();
bV.setUrl(bY.getUrl());
bV.setMethod(bY.getMethod());
bV.setAsynchronous(bY.getAsynchronous());
bV.setUsername(bY.getUsername());
bV.setPassword(bY.getPassword());
bV.setParameters(bY.getParameters(false));
bV.setFormFields(bY.getFormFields());
bV.setRequestHeaders(bY.getRequestHeaders());
if(bV instanceof qx.io.remote.transport.XmlHttp){bV.setParseJson(bY.getParseJson());
}var cc=bY.getData();

if(cc===null){var cd=bY.getParameters(true);
var cb=[];

for(var bX in cd){var ca=cd[bX];

if(ca instanceof Array){for(var i=0;i<ca.length;i++){cb.push(encodeURIComponent(bX)+bq+encodeURIComponent(ca[i]));
}}else{cb.push(encodeURIComponent(bX)+bq+encodeURIComponent(ca));
}}
if(cb.length>0){bV.setData(cb.join(bo));
}}else{bV.setData(cc);
}bV.setResponseType(bY.getResponseType());
bV.addListener(k,this._onsending,this);
bV.addListener(h,this._onreceiving,this);
bV.addListener(j,this._oncompleted,this);
bV.addListener(g,this._onabort,this);
bV.addListener(f,this._ontimeout,this);
bV.addListener(m,this._onfailed,this);
}},_applyState:function(ce,cf){if(qx.core.Variant.isSet(o,n)){if(qx.core.Setting.get(p)){this.debug("State: "+cf+" => "+ce);
}}
switch(ce){case k:this.fireEvent(k);
break;
case h:this.fireEvent(h);
break;
case j:case g:case f:case m:var ch=this.getImplementation();

if(!ch){break;
}this.__si();

if(this.hasListener(ce)){var ci=qx.event.Registration.createEvent(ce,qx.io.remote.Response);

if(ce==j){var cg=ch.getResponseContent();
ci.setContent(cg);
if(cg===null){if(qx.core.Variant.isSet(o,n)){if(qx.core.Setting.get(p)){this.debug("Altered State: "+ce+" => failed");
}}ce=m;
}}else if(ce==m){ci.setContent(ch.getResponseContent());
}ci.setStatusCode(ch.getStatusCode());
ci.setResponseHeaders(ch.getResponseHeaders());
this.dispatchEvent(ci);
}this.setImplementation(null);
ch.dispose();
break;
}}},settings:{"qx.ioRemoteDebug":false,"qx.ioRemoteDebugData":false},destruct:function(){var cj=this.getImplementation();

if(cj){this.setImplementation(null);
cj.dispose();
}this.setRequest(null);
}});
})();
(function(){var t="qx.event.type.Event",s="String",r="qx.ioRemoteDebug",q="qx.debug",p="failed",o="timeout",n="on",m="created",l="aborted",k="sending",d="configured",j="receiving",g="completed",c="Object",b="Boolean",f="abstract",e="_applyState",h="GET",a="changeState",i="qx.io.remote.transport.Abstract";
qx.Class.define(i,{type:f,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.setRequestHeaders({});
this.setParameters({});
this.setFormFields({});
},events:{"created":t,"configured":t,"sending":t,"receiving":t,"completed":t,"aborted":t,"failed":t,"timeout":t},properties:{url:{check:s,nullable:true},method:{check:s,nullable:true,init:h},asynchronous:{check:b,nullable:true,init:true},data:{check:s,nullable:true},username:{check:s,nullable:true},password:{check:s,nullable:true},state:{check:[m,d,k,j,g,l,o,p],init:m,event:a,apply:e},requestHeaders:{check:c,nullable:true},parameters:{check:c,nullable:true},formFields:{check:c,nullable:true},responseType:{check:s,nullable:true},useBasicHttpAuth:{check:b,nullable:true}},members:{send:function(){throw new Error("send is abstract");
},abort:function(){if(qx.core.Variant.isSet(q,n)){if(qx.core.Setting.get(r)){this.warn("Aborting...");
}}this.setState(l);
},timeout:function(){if(qx.core.Variant.isSet(q,n)){if(qx.core.Setting.get(r)){this.warn("Timeout...");
}}this.setState(o);
},failed:function(){if(qx.core.Variant.isSet(q,n)){if(qx.core.Setting.get(r)){this.warn("Failed...");
}}this.setState(p);
},setRequestHeader:function(u,v){throw new Error("setRequestHeader is abstract");
},getResponseHeader:function(w){throw new Error("getResponseHeader is abstract");
},getResponseHeaders:function(){throw new Error("getResponseHeaders is abstract");
},getStatusCode:function(){throw new Error("getStatusCode is abstract");
},getStatusText:function(){throw new Error("getStatusText is abstract");
},getResponseText:function(){throw new Error("getResponseText is abstract");
},getResponseXml:function(){throw new Error("getResponseXml is abstract");
},getFetchedLength:function(){throw new Error("getFetchedLength is abstract");
},_applyState:function(x,y){if(qx.core.Variant.isSet(q,n)){if(qx.core.Setting.get(r)){this.debug("State: "+x);
}}
switch(x){case m:this.fireEvent(m);
break;
case d:this.fireEvent(d);
break;
case k:this.fireEvent(k);
break;
case j:this.fireEvent(j);
break;
case g:this.fireEvent(g);
break;
case l:this.fireEvent(l);
break;
case p:this.fireEvent(p);
break;
case o:this.fireEvent(o);
break;
}return true;
}},destruct:function(){this.setRequestHeaders(null);
this.setParameters(null);
this.setFormFields(null);
}});
})();
(function(){var l="qx.debug",k="on",j="qx.ioRemoteDebugData",h="=",g="",f="&",d="application/xml",c="application/json",b="text/html",a="qx.ioRemoteDebug",K="qx.client",J="textarea",I="_data_",H="load",G="text/plain",F="text/javascript",E="completed",D="readystatechange",C="?",B="qx.io.remote.transport.Iframe",s="none",t="display",q="gecko",r="frame_",o="aborted",p="pre",m="javascript:void(0)",n="sending",u="form",v="failed",x="mshtml",w="form_",z="opera",y="timeout",A="qx/static/blank.gif";
qx.Class.define(B,{extend:qx.io.remote.transport.Abstract,construct:function(){qx.io.remote.transport.Abstract.call(this);
var L=(new Date).valueOf();
var M=r+L;
var N=w+L;
var O;

if(qx.core.Variant.isSet(K,x)){O=m;
}this.__sj=qx.bom.Iframe.create({id:M,name:M,src:O});
qx.bom.element.Style.set(this.__sj,t,s);
this.__sk=qx.bom.Element.create(u,{id:N,name:N,target:M});
qx.bom.element.Style.set(this.__sk,t,s);
qx.dom.Element.insertEnd(this.__sk,qx.dom.Node.getBodyElement(document));
this.__sl=qx.bom.Element.create(J,{id:I,name:I});
qx.dom.Element.insertEnd(this.__sl,this.__sk);
qx.dom.Element.insertEnd(this.__sj,qx.dom.Node.getBodyElement(document));
qx.event.Registration.addListener(this.__sj,H,this._onload,this);
this.__sm=qx.lang.Function.listener(this._onreadystatechange,this);
qx.bom.Event.addNativeListener(this.__sj,D,this.__sm);
},statics:{handles:{synchronous:false,asynchronous:true,crossDomain:false,fileUpload:true,programaticFormFields:true,responseTypes:[G,F,c,d,b]},isSupported:function(){return true;
},_numericMap:{"uninitialized":1,"loading":2,"loaded":2,"interactive":3,"complete":4}},members:{__sl:null,__sn:0,__sk:null,__sj:null,__sm:null,send:function(){var Q=this.getMethod();
var S=this.getUrl();
var W=this.getParameters(false);
var V=[];

for(var R in W){var T=W[R];

if(T instanceof Array){for(var i=0;i<T.length;i++){V.push(encodeURIComponent(R)+h+encodeURIComponent(T[i]));
}}else{V.push(encodeURIComponent(R)+h+encodeURIComponent(T));
}}
if(V.length>0){S+=(S.indexOf(C)>=0?f:C)+V.join(f);
}if(this.getData()===null){var W=this.getParameters(true);
var V=[];

for(var R in W){var T=W[R];

if(T instanceof Array){for(var i=0;i<T.length;i++){V.push(encodeURIComponent(R)+h+encodeURIComponent(T[i]));
}}else{V.push(encodeURIComponent(R)+h+encodeURIComponent(T));
}}
if(V.length>0){this.setData(V.join(f));
}}var P=this.getFormFields();

for(var R in P){var U=document.createElement(J);
U.name=R;
U.appendChild(document.createTextNode(P[R]));
this.__sk.appendChild(U);
}this.__sk.action=S;
this.__sk.method=Q;
this.__sl.appendChild(document.createTextNode(this.getData()));
this.__sk.submit();
this.setState(n);
},_onload:qx.event.GlobalError.observeMethod(function(e){if(qx.bom.client.Engine.NAME==z&&this.getIframeHtmlContent()==g){return;
}
if(this.__sk.src){return;
}this._switchReadyState(qx.io.remote.transport.Iframe._numericMap.complete);
}),_onreadystatechange:qx.event.GlobalError.observeMethod(function(e){this._switchReadyState(qx.io.remote.transport.Iframe._numericMap[this.__sj.readyState]);
}),_switchReadyState:function(X){switch(this.getState()){case E:case o:case v:case y:this.warn("Ignore Ready State Change");
return;
}while(this.__sn<X){this.setState(qx.io.remote.Exchange._nativeMap[++this.__sn]);
}},setRequestHeader:function(Y,ba){},getResponseHeader:function(bb){return null;
},getResponseHeaders:function(){return {};
},getStatusCode:function(){return 200;
},getStatusText:function(){return g;
},getIframeWindow:function(){return qx.bom.Iframe.getWindow(this.__sj);
},getIframeDocument:function(){return qx.bom.Iframe.getDocument(this.__sj);
},getIframeBody:function(){return qx.bom.Iframe.getBody(this.__sj);
},getIframeTextContent:function(){var bc=this.getIframeBody();

if(!bc){return null;
}
if(!bc.firstChild){return g;
}if(bc.firstChild.tagName&&bc.firstChild.tagName.toLowerCase()==p){return bc.firstChild.innerHTML;
}else{return bc.innerHTML;
}},getIframeHtmlContent:function(){var bd=this.getIframeBody();
return bd?bd.innerHTML:null;
},getFetchedLength:function(){return 0;
},getResponseContent:function(){if(this.getState()!==E){if(qx.core.Variant.isSet(l,k)){if(qx.core.Setting.get(a)){this.warn("Transfer not complete, ignoring content!");
}}return null;
}
if(qx.core.Variant.isSet(l,k)){if(qx.core.Setting.get(a)){this.debug("Returning content for responseType: "+this.getResponseType());
}}var be=this.getIframeTextContent();

switch(this.getResponseType()){case G:if(qx.core.Variant.isSet(l,k)){if(qx.core.Setting.get(j)){this.debug("Response: "+this._responseContent);
}}return be;
break;
case b:be=this.getIframeHtmlContent();

if(qx.core.Variant.isSet(l,k)){if(qx.core.Setting.get(j)){this.debug("Response: "+this._responseContent);
}}return be;
break;
case c:be=this.getIframeHtmlContent();

if(qx.core.Variant.isSet(l,k)){if(qx.core.Setting.get(j)){this.debug("Response: "+this._responseContent);
}}
try{return be&&be.length>0?qx.util.Json.parse(be,false):null;
}catch(bf){return this.error("Could not execute json: ("+be+")",bf);
}case F:be=this.getIframeHtmlContent();

if(qx.core.Variant.isSet(l,k)){if(qx.core.Setting.get(j)){this.debug("Response: "+this._responseContent);
}}
try{return be&&be.length>0?window.eval(be):null;
}catch(bg){return this.error("Could not execute javascript: ("+be+")",bg);
}case d:be=this.getIframeDocument();

if(qx.core.Variant.isSet(l,k)){if(qx.core.Setting.get(j)){this.debug("Response: "+this._responseContent);
}}return be;
default:this.warn("No valid responseType specified ("+this.getResponseType()+")!");
return null;
}}},defer:function(){qx.io.remote.Exchange.registerType(qx.io.remote.transport.Iframe,B);
},destruct:function(){if(this.__sj){qx.event.Registration.removeListener(this.__sj,H,this._onload,this);
qx.bom.Event.removeNativeListener(this.__sj,D,this.__sm);
if(qx.core.Variant.isSet(K,q)){this.__sj.src=qx.util.ResourceManager.getInstance().toUri(A);
}qx.dom.Element.remove(this.__sj);
}
if(this.__sk){qx.dom.Element.remove(this.__sk);
}this.__sj=this.__sk=this.__sl=null;
}});
})();
(function(){var a="qx.dom.Element";
qx.Class.define(a,{statics:{hasChild:function(parent,b){return b.parentNode===parent;
},hasChildren:function(c){return !!c.firstChild;
},hasChildElements:function(d){d=d.firstChild;

while(d){if(d.nodeType===1){return true;
}d=d.nextSibling;
}return false;
},getParentElement:function(e){return e.parentNode;
},isInDom:function(f,g){if(!g){g=window;
}var h=g.document.getElementsByTagName(f.nodeName);

for(var i=0,l=h.length;i<l;i++){if(h[i]===f){return true;
}}return false;
},insertAt:function(j,parent,k){var m=parent.childNodes[k];

if(m){parent.insertBefore(j,m);
}else{parent.appendChild(j);
}return true;
},insertBegin:function(n,parent){if(parent.firstChild){this.insertBefore(n,parent.firstChild);
}else{parent.appendChild(n);
}},insertEnd:function(o,parent){parent.appendChild(o);
},insertBefore:function(p,q){q.parentNode.insertBefore(p,q);
return true;
},insertAfter:function(r,s){var parent=s.parentNode;

if(s==parent.lastChild){parent.appendChild(r);
}else{return this.insertBefore(r,s.nextSibling);
}return true;
},remove:function(t){if(!t.parentNode){return false;
}t.parentNode.removeChild(t);
return true;
},removeChild:function(u,parent){if(u.parentNode!==parent){return false;
}parent.removeChild(u);
return true;
},removeChildAt:function(v,parent){var w=parent.childNodes[v];

if(!w){return false;
}parent.removeChild(w);
return true;
},replaceChild:function(x,y){if(!y.parentNode){return false;
}y.parentNode.replaceChild(x,y);
return true;
},replaceAt:function(z,A,parent){var B=parent.childNodes[A];

if(!B){return false;
}parent.replaceChild(z,B);
return true;
}}});
})();
(function(){var n=",",m="",k='"',j="string",h="null",g=':',f="qx.jsonDebugging",e='-',d='\\u00',c="__kE",N="new Date(Date.UTC(",M='\\\\',L="__kC",K='\\f',J="__kM",I="__kN",H='\\"',G="))",F='T',E="}",u='(',v='.',s="{",t='\\r',q='\\t',r=":",o="__kD",p="__kF",w="]",x="[",z="qx.jsonEncodeUndefined",y='\\b',B="qx.util.Json",A='Z"',D=')',C='\\n';
qx.Class.define(B,{statics:{__kA:null,BEAUTIFYING_INDENT:"  ",BEAUTIFYING_LINE_END:"\n",CONVERT_DATES:null,__kB:{"function":L,"boolean":o,"number":c,"string":p,"object":J,"undefined":I},__kC:function(O,P){return String(O);
},__kD:function(Q,R){return String(Q);
},__kE:function(S,T){return isFinite(S)?String(S):h;
},__kF:function(U,V){var W;

if(/["\\\x00-\x1f]/.test(U)){W=U.replace(/([\x00-\x1f\\"])/g,qx.util.Json.__kH);
}else{W=U;
}return k+W+k;
},__kG:{'\b':y,'\t':q,'\n':C,'\f':K,'\r':t,'"':H,'\\':M},__kH:function(a,b){var X=qx.util.Json.__kG[b];

if(X){return X;
}X=b.charCodeAt();
return d+Math.floor(X/16).toString(16)+(X%16).toString(16);
},__kI:function(Y,ba){var bc=[],bf=true,be,bb;
var bd=qx.util.Json.__kP;
bc.push(x);

if(bd){qx.util.Json.__kJ+=qx.util.Json.BEAUTIFYING_INDENT;
bc.push(qx.util.Json.__kJ);
}
for(var i=0,l=Y.length;i<l;i++){bb=Y[i];
be=this.__kB[typeof bb];

if(be){bb=this[be](bb,i+m);

if(typeof bb==j){if(!bf){bc.push(n);

if(bd){bc.push(qx.util.Json.__kJ);
}}bc.push(bb);
bf=false;
}}}
if(bd){qx.util.Json.__kJ=qx.util.Json.__kJ.substring(0,qx.util.Json.__kJ.length-qx.util.Json.BEAUTIFYING_INDENT.length);
bc.push(qx.util.Json.__kJ);
}bc.push(w);
return bc.join(m);
},__kK:function(bg,bh){if(!qx.util.Json.CONVERT_DATES){if(bg.toJSON&&!qx.bom.client.Engine.OPERA&&!qx.bom.client.Engine.MSHTML){return k+bg.toJSON()+k;
}var bi=qx.util.format.NumberFormat.getInstance();
bi.setMinimumIntegerDigits(2);
var bk=bg.getUTCFullYear()+e+bi.format(bg.getUTCMonth()+1)+e+bi.format(bg.getUTCDate())+F+bi.format(bg.getUTCHours())+g+bi.format(bg.getUTCMinutes())+g+bi.format(bg.getUTCSeconds())+v;
bi.setMinimumIntegerDigits(3);
return k+bk+bi.format(bg.getUTCMilliseconds())+A;
}else{var bj=bg.getUTCFullYear()+n+bg.getUTCMonth()+n+bg.getUTCDate()+n+bg.getUTCHours()+n+bg.getUTCMinutes()+n+bg.getUTCSeconds()+n+bg.getUTCMilliseconds();
return N+bj+G;
}},__kL:function(bl,bm){var bp=[],br=true,bo,bn;
var bq=qx.util.Json.__kP;
bp.push(s);

if(bq){qx.util.Json.__kJ+=qx.util.Json.BEAUTIFYING_INDENT;
bp.push(qx.util.Json.__kJ);
}
for(var bm in bl){bn=bl[bm];
bo=this.__kB[typeof bn];

if(bo){bn=this[bo](bn,bm);

if(typeof bn==j){if(!br){bp.push(n);

if(bq){bp.push(qx.util.Json.__kJ);
}}bp.push(this.__kF(bm),r,bn);
br=false;
}}}
if(bq){qx.util.Json.__kJ=qx.util.Json.__kJ.substring(0,qx.util.Json.__kJ.length-qx.util.Json.BEAUTIFYING_INDENT.length);
bp.push(qx.util.Json.__kJ);
}bp.push(E);
return bp.join(m);
},__kM:function(bs,bt){if(bs){if(qx.lang.Type.isFunction(bs.toJSON)&&bs.toJSON!==this.__kA){return this.__kO(bs.toJSON(bt),bt);
}else if(qx.lang.Type.isDate(bs)){return this.__kK(bs,bt);
}else if(qx.lang.Type.isArray(bs)){return this.__kI(bs,bt);
}else if(qx.lang.Type.isObject(bs)){return this.__kL(bs,bt);
}return m;
}return h;
},__kN:function(bu,bv){if(qx.core.Setting.get(z)){return h;
}},__kO:function(bw,bx){return this[this.__kB[typeof bw]](bw,bx);
},stringify:function(by,bz){this.__kP=bz;
this.__kJ=this.BEAUTIFYING_LINE_END;
var bA=this.__kO(by,m);

if(typeof bA!=j){bA=null;
}if(qx.core.Setting.get(f)){qx.log.Logger.debug(this,"JSON request: "+bA);
}return bA;
},parse:function(bB,bC){if(bC===undefined){bC=true;
}
if(qx.core.Setting.get(f)){qx.log.Logger.debug(this,"JSON response: "+bB);
}
if(bC){if(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(bB.replace(/"(\\.|[^"\\])*"/g,m))){throw new Error("Could not parse JSON string!");
}}
try{var bD=(bB&&bB.length>0)?eval(u+bB+D):null;
return bD;
}catch(bE){throw new Error("Could not evaluate JSON string: "+bE.message);
}}},settings:{"qx.jsonEncodeUndefined":true,"qx.jsonDebugging":false},defer:function(bF){bF.__kA=Date.prototype.toJSON;
}});
})();
(function(){var a="qx.util.format.IFormat";
qx.Interface.define(a,{members:{format:function(b){},parse:function(c){}}});
})();
(function(){var t="",s="Number",r="-",q="0",p="String",o="changeNumberFormat",n='(',m="g",l="Boolean",k="$",d="NaN",j='([0-9]{1,3}(?:',g='{0,1}[0-9]{3}){0,})',c='\\d+){0,1}',b="qx.util.format.NumberFormat",f="Infinity",e="^",h=".",a="-Infinity",i='([-+]){0,1}';
qx.Class.define(b,{extend:qx.core.Object,implement:qx.util.format.IFormat,construct:function(u){qx.core.Object.call(this);
this.__kQ=u;
},statics:{getIntegerInstance:function(){var v=qx.util.format.NumberFormat;

if(v._integerInstance==null){v._integerInstance=new v();
v._integerInstance.setMaximumFractionDigits(0);
}return v._integerInstance;
},getInstance:function(){if(!this._instance){this._instance=new this;
}return this._instance;
}},properties:{minimumIntegerDigits:{check:s,init:0},maximumIntegerDigits:{check:s,nullable:true},minimumFractionDigits:{check:s,init:0},maximumFractionDigits:{check:s,nullable:true},groupingUsed:{check:l,init:true},prefix:{check:p,init:t,event:o},postfix:{check:p,init:t,event:o}},members:{__kQ:null,format:function(w){switch(w){case Infinity:return f;
case -Infinity:return a;
case NaN:return d;
}var A=(w<0);

if(A){w=-w;
}
if(this.getMaximumFractionDigits()!=null){var H=Math.pow(10,this.getMaximumFractionDigits());
w=Math.round(w*H)/H;
}var G=String(Math.floor(w)).length;
var x=t+w;
var D=x.substring(0,G);

while(D.length<this.getMinimumIntegerDigits()){D=q+D;
}
if(this.getMaximumIntegerDigits()!=null&&D.length>this.getMaximumIntegerDigits()){D=D.substring(D.length-this.getMaximumIntegerDigits());
}var C=x.substring(G+1);

while(C.length<this.getMinimumFractionDigits()){C+=q;
}
if(this.getMaximumFractionDigits()!=null&&C.length>this.getMaximumFractionDigits()){C=C.substring(0,this.getMaximumFractionDigits());
}if(this.getGroupingUsed()){var z=D;
D=t;
var F;

for(F=z.length;F>3;F-=3){D=t+qx.locale.Number.getGroupSeparator(this.__kQ)+z.substring(F-3,F)+D;
}D=z.substring(0,F)+D;
}var B=this.getPrefix()?this.getPrefix():t;
var y=this.getPostfix()?this.getPostfix():t;
var E=B+(A?r:t)+D;

if(C.length>0){E+=t+qx.locale.Number.getDecimalSeparator(this.__kQ)+C;
}E+=y;
return E;
},parse:function(I){var N=qx.lang.String.escapeRegexpChars(qx.locale.Number.getGroupSeparator(this.__kQ)+t);
var L=qx.lang.String.escapeRegexpChars(qx.locale.Number.getDecimalSeparator(this.__kQ)+t);
var J=new RegExp(e+qx.lang.String.escapeRegexpChars(this.getPrefix())+i+j+N+g+n+L+c+qx.lang.String.escapeRegexpChars(this.getPostfix())+k);
var M=J.exec(I);

if(M==null){throw new Error("Number string '"+I+"' does not match the number format");
}var O=(M[1]==r);
var Q=M[2];
var P=M[3];
Q=Q.replace(new RegExp(N,m),t);
var K=(O?r:t)+Q;

if(P!=null&&P.length!=0){P=P.replace(new RegExp(L),t);
K+=h+P;
}return parseFloat(K);
}}});
})();
(function(){var d="cldr_number_decimal_separator",c="cldr_number_percent_format",b="qx.locale.Number",a="cldr_number_group_separator";
qx.Class.define(b,{statics:{getDecimalSeparator:function(e){return qx.locale.Manager.getInstance().localize(d,[],e);
},getGroupSeparator:function(f){return qx.locale.Manager.getInstance().localize(a,[],f);
},getPercentFormat:function(g){return qx.locale.Manager.getInstance().localize(c,[],g);
}}});
})();
(function(){var v="qx.debug",u="on",t="&",s="=",r="qx.ioRemoteDebug",q="application/json",p="completed",o="text/plain",n="qx.ioRemoteDebugData",m="text/javascript",e="?",l="qx.io.remote.transport.Script",h="",c="_ScriptTransport_data",b="failed",g="script",f="timeout",j="_ScriptTransport_",a="_ScriptTransport_id",k="aborted",d="utf-8";
qx.Class.define(l,{extend:qx.io.remote.transport.Abstract,construct:function(){qx.io.remote.transport.Abstract.call(this);
var w=++qx.io.remote.transport.Script.__sp;

if(w>=2000000000){qx.io.remote.transport.Script.__sp=w=1;
}this.__sq=null;
this.__sp=w;
},statics:{__sp:0,_instanceRegistry:{},ScriptTransport_PREFIX:j,ScriptTransport_ID_PARAM:a,ScriptTransport_DATA_PARAM:c,handles:{synchronous:false,asynchronous:true,crossDomain:true,fileUpload:false,programaticFormFields:false,responseTypes:[o,m,q]},isSupported:function(){return true;
},_numericMap:{"uninitialized":1,"loading":2,"loaded":2,"interactive":3,"complete":4},_requestFinished:qx.event.GlobalError.observeMethod(function(x,content){var y=qx.io.remote.transport.Script._instanceRegistry[x];

if(y==null){if(qx.core.Variant.isSet(v,u)){if(qx.core.Setting.get(r)){this.warn("Request finished for an unknown instance (probably aborted or timed out before)");
}}}else{y._responseContent=content;
y._switchReadyState(qx.io.remote.transport.Script._numericMap.complete);
}})},members:{__sr:0,__sq:null,__sp:null,send:function(){var B=this.getUrl();
B+=(B.indexOf(e)>=0?t:e)+qx.io.remote.transport.Script.ScriptTransport_ID_PARAM+s+this.__sp;
var E=this.getParameters();
var D=[];

for(var A in E){if(A.indexOf(qx.io.remote.transport.Script.ScriptTransport_PREFIX)==0){this.error("Illegal parameter name. The following prefix is used internally by qooxdoo): "+qx.io.remote.transport.Script.ScriptTransport_PREFIX);
}var C=E[A];

if(C instanceof Array){for(var i=0;i<C.length;i++){D.push(encodeURIComponent(A)+s+encodeURIComponent(C[i]));
}}else{D.push(encodeURIComponent(A)+s+encodeURIComponent(C));
}}
if(D.length>0){B+=t+D.join(t);
}var z=this.getData();

if(z!=null){B+=t+qx.io.remote.transport.Script.ScriptTransport_DATA_PARAM+s+encodeURIComponent(z);
}qx.io.remote.transport.Script._instanceRegistry[this.__sp]=this;
this.__sq=document.createElement(g);
this.__sq.charset=d;
this.__sq.src=B;

if(qx.core.Variant.isSet(v,u)){if(qx.core.Setting.get(n)){this.debug("Request: "+B);
}}document.body.appendChild(this.__sq);
},_switchReadyState:function(F){switch(this.getState()){case p:case k:case b:case f:this.warn("Ignore Ready State Change");
return;
}while(this.__sr<F){this.setState(qx.io.remote.Exchange._nativeMap[++this.__sr]);
}},setRequestHeader:function(G,H){},getResponseHeader:function(I){return null;
},getResponseHeaders:function(){return {};
},getStatusCode:function(){return 200;
},getStatusText:function(){return h;
},getFetchedLength:function(){return 0;
},getResponseContent:function(){if(this.getState()!==p){if(qx.core.Variant.isSet(v,u)){if(qx.core.Setting.get(r)){this.warn("Transfer not complete, ignoring content!");
}}return null;
}
if(qx.core.Variant.isSet(v,u)){if(qx.core.Setting.get(r)){this.debug("Returning content for responseType: "+this.getResponseType());
}}
switch(this.getResponseType()){case o:case q:case m:if(qx.core.Variant.isSet(v,u)){if(qx.core.Setting.get(n)){this.debug("Response: "+this._responseContent);
}}var J=this._responseContent;
return (J===0?0:(J||null));
default:this.warn("No valid responseType specified ("+this.getResponseType()+")!");
return null;
}}},defer:function(){qx.io.remote.Exchange.registerType(qx.io.remote.transport.Script,l);
},destruct:function(){if(this.__sq){delete qx.io.remote.transport.Script._instanceRegistry[this.__sp];
document.body.removeChild(this.__sq);
}this.__sq=this._responseContent=null;
}});
})();
(function(){var m="qx.debug",k="on",j="qx.ioRemoteDebugData",h="failed",g="qx.ioRemoteDebug",f="completed",d="=",c="aborted",b="",a="sending",N="&",M="configured",L="timeout",K="application/xml",J="qx.io.remote.transport.XmlHttp",I="application/json",H="text/html",G="qx.client",F="receiving",E="text/plain",u="text/javascript",v="created",r="?",t="Boolean",p='Referer',q='Basic ',n="\n</pre>",o="string",w='Authorization',x="<pre>Could not execute json: \n",z="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",y=':',B="parseerror",A="file:",D="webkit",C="object";
qx.Class.define(J,{extend:qx.io.remote.transport.Abstract,statics:{handles:{synchronous:true,asynchronous:true,crossDomain:false,fileUpload:false,programaticFormFields:false,responseTypes:[E,u,I,K,H]},requestObjects:[],requestObjectCount:0,createRequestObject:qx.core.Variant.select(G,{"default":function(){return new XMLHttpRequest;
},"mshtml":function(){if(window.ActiveXObject&&qx.xml.Document.XMLHTTP){return new ActiveXObject(qx.xml.Document.XMLHTTP);
}
if(window.XMLHttpRequest){return new XMLHttpRequest;
}}}),isSupported:function(){return !!this.createRequestObject();
}},properties:{parseJson:{check:t,init:true}},members:{__ss:false,__st:0,__su:null,getRequest:function(){if(this.__su===null){this.__su=qx.io.remote.transport.XmlHttp.createRequestObject();
this.__su.onreadystatechange=qx.lang.Function.bind(this._onreadystatechange,this);
}return this.__su;
},send:function(){this.__st=0;
var S=this.getRequest();
var O=this.getMethod();
var V=this.getAsynchronous();
var U=this.getUrl();
var Q=(window.location.protocol===A&&!(/^http(s){0,1}\:/.test(U)));
this.__ss=Q;
var Y=this.getParameters(false);
var W=[];

for(var P in Y){var T=Y[P];

if(T instanceof Array){for(var i=0;i<T.length;i++){W.push(encodeURIComponent(P)+d+encodeURIComponent(T[i]));
}}else{W.push(encodeURIComponent(P)+d+encodeURIComponent(T));
}}
if(W.length>0){U+=(U.indexOf(r)>=0?N:r)+W.join(N);
}if(this.getData()===null){var Y=this.getParameters(true);
var W=[];

for(var P in Y){var T=Y[P];

if(T instanceof Array){for(var i=0;i<T.length;i++){W.push(encodeURIComponent(P)+d+encodeURIComponent(T[i]));
}}else{W.push(encodeURIComponent(P)+d+encodeURIComponent(T));
}}
if(W.length>0){this.setData(W.join(N));
}}var X=function(ba){var bf=z;
var bj=b;
var bd,bc,bb;
var bg,bh,bi,be;
var i=0;

do{bd=ba.charCodeAt(i++);
bc=ba.charCodeAt(i++);
bb=ba.charCodeAt(i++);
bg=bd>>2;
bh=((bd&3)<<4)|(bc>>4);
bi=((bc&15)<<2)|(bb>>6);
be=bb&63;

if(isNaN(bc)){bi=be=64;
}else if(isNaN(bb)){be=64;
}bj+=bf.charAt(bg)+bf.charAt(bh)+bf.charAt(bi)+bf.charAt(be);
}while(i<ba.length);
return bj;
};
try{if(this.getUsername()){if(this.getUseBasicHttpAuth()){S.open(O,U,V);
S.setRequestHeader(w,q+X(this.getUsername()+y+this.getPassword()));
}else{S.open(O,U,V,this.getUsername(),this.getPassword());
}}else{S.open(O,U,V);
}}catch(bk){this.error("Failed with exception: "+bk);
this.failed();
return;
}if(!qx.core.Variant.isSet(G,D)){S.setRequestHeader(p,window.location.href);
}var R=this.getRequestHeaders();

for(var P in R){S.setRequestHeader(P,R[P]);
}try{if(qx.core.Variant.isSet(m,k)){if(qx.core.Setting.get(j)){this.debug("Request: "+this.getData());
}}if(Q&&V&&qx.bom.client.Engine.MSHTML&&qx.bom.client.Engine.VERSION==9){qx.event.Timer.once(function(){S.send(this.getData());
},this,0);
}else{S.send(this.getData());
}}catch(bl){if(Q){this.failedLocally();
}else{this.error("Failed to send data: "+bl,"send");
this.failed();
}return;
}if(!V){this._onreadystatechange();
}},failedLocally:function(){if(this.getState()===h){return;
}this.warn("Could not load from file: "+this.getUrl());
this.failed();
},_onreadystatechange:qx.event.GlobalError.observeMethod(function(e){switch(this.getState()){case f:case c:case h:case L:if(qx.core.Variant.isSet(m,k)){if(qx.core.Setting.get(g)){this.warn("Ignore Ready State Change");
}}return;
}var bm=this.getReadyState();

if(bm==4){if(!qx.io.remote.Exchange.wasSuccessful(this.getStatusCode(),bm,this.__ss)){if(this.getState()===M){this.setState(a);
}this.failed();
return;
}}if(bm==3&&this.__st==1){this.setState(qx.io.remote.Exchange._nativeMap[++this.__st]);
}while(this.__st<bm){this.setState(qx.io.remote.Exchange._nativeMap[++this.__st]);
}}),getReadyState:function(){var bn=null;

try{bn=this.getRequest().readyState;
}catch(bo){}return bn;
},setRequestHeader:function(bp,bq){this.getRequestHeaders()[bp]=bq;
},getResponseHeader:function(br){var bs=null;

try{bs=this.getRequest().getResponseHeader(br)||null;
}catch(bt){}return bs;
},getStringResponseHeaders:function(){var bv=null;

try{var bu=this.getRequest().getAllResponseHeaders();

if(bu){bv=bu;
}}catch(bw){}return bv;
},getResponseHeaders:function(){var bz=this.getStringResponseHeaders();
var bA={};

if(bz){var bx=bz.split(/[\r\n]+/g);

for(var i=0,l=bx.length;i<l;i++){var by=bx[i].match(/^([^:]+)\s*:\s*(.+)$/i);

if(by){bA[by[1]]=by[2];
}}}return bA;
},getStatusCode:function(){var bB=-1;

try{bB=this.getRequest().status;
if(bB===1223){bB=204;
}}catch(bC){}return bB;
},getStatusText:function(){var bD=b;

try{bD=this.getRequest().statusText;
}catch(bE){}return bD;
},getResponseText:function(){var bF=null;

try{bF=this.getRequest().responseText;
}catch(bG){bF=null;
}return bF;
},getResponseXml:function(){var bJ=null;
var bH=this.getStatusCode();
var bI=this.getReadyState();

if(qx.io.remote.Exchange.wasSuccessful(bH,bI,this.__ss)){try{bJ=this.getRequest().responseXML;
}catch(bK){}}if(typeof bJ==C&&bJ!=null){if(!bJ.documentElement){var s=String(this.getRequest().responseText).replace(/<\?xml[^\?]*\?>/,b);
bJ.loadXML(s);
}if(!bJ.documentElement){throw new Error("Missing Document Element!");
}
if(bJ.documentElement.tagName==B){throw new Error("XML-File is not well-formed!");
}}else{throw new Error("Response was not a valid xml document ["+this.getRequest().responseText+"]");
}return bJ;
},getFetchedLength:function(){var bL=this.getResponseText();
return typeof bL==o?bL.length:0;
},getResponseContent:function(){var bM=this.getState();

if(bM!==f&&bM!=h){if(qx.core.Variant.isSet(m,k)){if(qx.core.Setting.get(g)){this.warn("Transfer not complete or failed, ignoring content!");
}}return null;
}
if(qx.core.Variant.isSet(m,k)){if(qx.core.Setting.get(g)){this.debug("Returning content for responseType: "+this.getResponseType());
}}var bO=this.getResponseText();

if(bM==h){if(qx.core.Variant.isSet(m,k)){if(qx.core.Setting.get(j)){this.debug("Failed: "+bO);
}}return bO;
}
switch(this.getResponseType()){case E:case H:if(qx.core.Variant.isSet(m,k)){if(qx.core.Setting.get(j)){this.debug("Response: "+bO);
}}return bO;
case I:if(qx.core.Variant.isSet(m,k)){if(qx.core.Setting.get(j)){this.debug("Response: "+bO);
}}
try{if(bO&&bO.length>0){var bN;

if(this.getParseJson()){bN=qx.util.Json.parse(bO,false);
bN=(bN===0?0:(bN||null));
}else{bN=bO;
}return bN;
}else{return null;
}}catch(bP){this.error("Could not execute json: ["+bO+"]",bP);
return x+bO+n;
}case u:if(qx.core.Variant.isSet(m,k)){if(qx.core.Setting.get(j)){this.debug("Response: "+bO);
}}
try{if(bO&&bO.length>0){var bN=window.eval(bO);
return (bN===0?0:(bN||null));
}else{return null;
}}catch(bQ){this.error("Could not execute javascript: ["+bO+"]",bQ);
return null;
}case K:bO=this.getResponseXml();

if(qx.core.Variant.isSet(m,k)){if(qx.core.Setting.get(j)){this.debug("Response: "+bO);
}}return (bO===0?0:(bO||null));
default:this.warn("No valid responseType specified ("+this.getResponseType()+")!");
return null;
}},_applyState:function(bR,bS){if(qx.core.Variant.isSet(m,k)){if(qx.core.Setting.get(g)){this.debug("State: "+bR);
}}
switch(bR){case v:this.fireEvent(v);
break;
case M:this.fireEvent(M);
break;
case a:this.fireEvent(a);
break;
case F:this.fireEvent(F);
break;
case f:this.fireEvent(f);
break;
case h:this.fireEvent(h);
break;
case c:this.getRequest().abort();
this.fireEvent(c);
break;
case L:this.getRequest().abort();
this.fireEvent(L);
break;
}}},defer:function(){qx.io.remote.Exchange.registerType(qx.io.remote.transport.XmlHttp,J);
},destruct:function(){var bT=this.getRequest();

if(bT){bT.onreadystatechange=qx.lang.Function.empty;
switch(bT.readyState){case 1:case 2:case 3:bT.abort();
}}this.__su=null;
}});
})();
(function(){var c="Integer",b="Object",a="qx.io.remote.Response";
qx.Class.define(a,{extend:qx.event.type.Event,properties:{state:{check:c,nullable:true},statusCode:{check:c,nullable:true},content:{nullable:true},responseHeaders:{check:b,nullable:true}},members:{clone:function(d){var e=qx.event.type.Event.prototype.clone.call(this,d);
e.setType(this.getType());
e.setState(this.getState());
e.setStatusCode(this.getStatusCode());
e.setContent(this.getContent());
e.setResponseHeaders(this.getResponseHeaders());
return e;
},getResponseHeader:function(f){var g=this.getResponseHeaders();

if(g){return g[f]||null;
}return null;
}}});
})();
(function(){var m="test",l="",k="^",h="demobrowser.TreeDataHandler",g="ttree",f="All",e="\\.[^\\.]+$",d=".",c="depth";
qx.Class.define(h,{extend:qx.core.Object,construct:function(n){qx.core.Object.call(this);
this.tmap=n;
this.ttree=this.__NV(n);
},members:{__NV:function(o){var q=o;
function p(u,v){var y=v.classname;
var w=y.split(".");
function x(parent,A){if(!A.length){return parent;
}else{var B=A[0];
var C=A.slice(1,A.length);
var D=null;
var E=null;
var F=parent.getChildren();

for(var i=0;i<F.length;i++){if(F[i].label==B){E=F[i];
break;
}}if(E==null){E=new demobrowser.Tree(B);
parent.add(E);
}D=x(E,C);
return D;
}}var z=x(u,w);

if(!z){throw new Error("No target to insert tests");
}r.readTree(v,z);
}function s(a,b){return (a.classname<b.classname)?-1:(a.classname>b.classname)?1:0;
}var t=new demobrowser.Tree("All");
var r=this;
q.sort(s);

for(var i=0;i<q.length;i++){p(t,q[i]);
}return t;
},readTree:function(G,H){var J=arguments[1]||new demobrowser.Tree(G.classname);
var H;
function I(a,b){return (a.name<b.name)?-1:(a.name>b.name)?1:0;
}
if(G.tests){G.tests.sort(I);

for(var j=0;j<G.tests.length;j++){H=new demobrowser.Tree(G.tests[j].name);
H.tags=G.tests[j].tags;
H.type=m;
H.desc=G.tests[j].desc;
H.manifest=G.tests[j].manifest;
J.add(H);
}}if(G.children&&G.children.length){for(var j=0;j<G.children.length;j++){var K=this.readTree(G.children[j]);
{};
J.add(K);
}}{};
return J;
},getRoot:function(){if(!this.Root){var M={classname:l,tests:[]};
var L=this.tmap;

for(var i=0;i<this.tmap.length;i++){if(M.classname.length>L[i].classname.length){M=L[i];
}}this.Root=M;
}return this.Root.classname;
},getChilds:function(N){var O=[];
var Q=this.tmap;
var P=k+N+e;
var R=new RegExp(P);

for(var i=0;i<Q.length;i++){if(Q[i].classname.match(R)){O.push(Q[i]);
}}return O;
},getTests:function(S){var T=this.tmap;

for(var i=0;i<T.length;i++){if(T[i].classname==S){return T[i].tests;
}}return [];
},getPath:function(U){if(!U){return l;
}var V=U.pwd();
V.shift();
if(this.isClass(U)){V=V.concat(U.label);
}return V;
},getChildren:function(W){if(W==f){var X=this.tmap;
var Y=[];

for(var i=0;i<X.length;i++){Y.push(X[i].classname);
}return Y;
}else if(this.isClass(W)){return this.getTests(W);
}else{return [];
}},isClass:function(ba){if(ba.type&&ba.type==m){return false;
}else{return true;
}},hasTests:function(bb){if(!this.isClass(bb)){return false;
}else{var bc=bb.getChildren();

for(var i=0;i<bc.length;i++){if(bc[i].type&&bc[i].type==m){return true;
}}return false;
}},classFromTest:function(bd){var be=l;
var bf=[];
classloop:
for(var i=0;i<this.tmap.length;i++){for(var j=0;j<this.tmap[i].tests.length;j++){if(this.tmap[i].tests[j]==bd){be=this.tmap[i].classname;
break classloop;
}}}return be;
},getFullName:function(bg){if(!bg){return l;
}var bh=this.getPath(bg);

if(bg.type&&bg.type==m){bh=bh.concat(bg.label);
}return bh.join(d);
},getPreviousNode:function(bi){var bj=bi.getPrevSibling();

if(bj){return bj;
}},getNextNode:function(bk){var bl=bk.getNextSibling();

if(bl){return bl;
}},testCount:function(bm){if(bm.type&&bm.type==m){return 1;
}else{var bn=0;
var bp=bm.getIterator(c);
var bo;

while(bo=bp()){if(bo.type&&bo.type==m){bn++;
}}return bn;
}}},destruct:function(){this.tmap=null;
this._disposeObjects(g);
}});
})();
(function(){var k="depth",j="tags",h="",g="widgetLinkFlat",e="widgetLinkFull",d="parent",c="manifest",b="children",a="demobrowser.Tree";
qx.Class.define(a,{extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.label=arguments[0]||h;
this.children=[];
this.tags=null;
this.parent=null;
this.manifest=null;
this.readme=null;
},members:{pwd:function(){if(this.parent==null){return [];
}else{return this.parent.pwd().concat(this.parent.label);
}},hasChildren:function(){return this.children.length;
},getChildren:function(){return this.children;
},map:function(l,m){var n=k;
var o=this;
var p=this.getIterator(n);

while(o=p()){l.apply(o,m);
}},print:function(){this.map(function(){this.debug(this.label);
},[]);
},getIterator:function(q){var s=[this];
var r=q==k?1:0;
function f(){var t;

if(s.length){t=s.shift();
var u=t.getChildren();

if(u.length){if(r){s=u.concat(s);
}else{s=s.concat(u);
}}}else{t=null;
}return t;
}return f;
},getPrevSibling:function(){return this.getSibling(-1);
},getNextSibling:function(){return this.getSibling(1);
},getSibling:function(v){var w=this.parent.getChildren();
var x=this.self(arguments).indexOf(w,this);
var y=x+v;

if(w[y]){return w[y];
}},add:function(z){this.children.push(z);
z.parent=this;
}},statics:{indexOf:function(A,B){for(var i=0;i<A.length;i++){if(A[i]==B){return i;
}}}},destruct:function(){this._disposeObjects(e,g,d);
this._disposeArray(b);
this._disposeArray(j);
this._disposeMap(c);
}});
})();
(function(){var f="mshtml",e="pop.push.reverse.shift.sort.splice.unshift.join.slice",d="number",c="qx.type.BaseArray",b="qx.client",a=".";
qx.Class.define(c,{extend:Array,construct:function(g){},members:{toArray:null,valueOf:null,pop:null,push:null,reverse:null,shift:null,sort:null,splice:null,unshift:null,concat:null,join:null,slice:null,toString:null,indexOf:null,lastIndexOf:null,forEach:null,filter:null,map:null,some:null,every:null}});
(function(){function k(l){if(qx.core.Variant.isSet(b,f)){j.prototype={length:0,$$isArray:true};
var o=e.split(a);

for(var length=o.length;length;){j.prototype[o[--length]]=Array.prototype[o[length]];
}}var p=Array.prototype.slice;
j.prototype.concat=function(){var r=this.slice(0);

for(var i=0,length=arguments.length;i<length;i++){var q;

if(arguments[i] instanceof j){q=p.call(arguments[i],0);
}else if(arguments[i] instanceof Array){q=arguments[i];
}else{q=[arguments[i]];
}r.push.apply(r,q);
}return r;
};
j.prototype.toString=function(){return p.call(this,0).toString();
};
j.prototype.toLocaleString=function(){return p.call(this,0).toLocaleString();
};
j.prototype.constructor=j;
j.prototype.indexOf=qx.lang.Core.arrayIndexOf;
j.prototype.lastIndexOf=qx.lang.Core.arrayLastIndexOf;
j.prototype.forEach=qx.lang.Core.arrayForEach;
j.prototype.some=qx.lang.Core.arraySome;
j.prototype.every=qx.lang.Core.arrayEvery;
var m=qx.lang.Core.arrayFilter;
var n=qx.lang.Core.arrayMap;
j.prototype.filter=function(){var s=new this.constructor;
s.push.apply(s,m.apply(this,arguments));
return s;
};
j.prototype.map=function(){var t=new this.constructor;
t.push.apply(t,n.apply(this,arguments));
return t;
};
j.prototype.slice=function(){var u=new this.constructor;
u.push.apply(u,Array.prototype.slice.apply(this,arguments));
return u;
};
j.prototype.splice=function(){var v=new this.constructor;
v.push.apply(v,Array.prototype.splice.apply(this,arguments));
return v;
};
j.prototype.toArray=function(){return Array.prototype.slice.call(this,0);
};
j.prototype.valueOf=function(){return this.length;
};
return j;
}function j(length){if(arguments.length===1&&typeof length===d){this.length=-1<length&&length===length>>.5?length:this.push(length);
}else if(arguments.length){this.push.apply(this,arguments);
}}function h(){}h.prototype=[];
j.prototype=new h;
j.prototype.length=0;
qx.type.BaseArray=k(j);
})();
})();
(function(){var b="",a="qx.util.StringBuilder";
qx.Class.define(a,{extend:qx.type.BaseArray,members:{clear:function(){this.length=0;
},get:function(){return this.join(b);
},add:null,isEmpty:function(){return this.length===0;
},size:function(){return this.join(b).length;
}},defer:function(c,d){d.add=d.push;
d.toString=d.get;
d.valueOf=d.get;
}});
})();
(function(){var l="</span>",k="sym",j="nl",h="qxkey",g="ws",f=">",e="qqstr",d="<",c="qstr",b="linecomment",bg="ident",bf="keyword",be="regexp",bd="&",bc="|",bb="fullcomment",ba="atom",Y="\\r\\n|\\r|\\n",X="\\s*\\)*",W="\\s",s="^",t='["][^"]*["]',q="real",r="\\s*[,\\)]",o="<span class='string'>",p="[a-zA-Z_][a-zA-Z0-9_]*\\b",m="<span class='comment'>",n="[+-]?\\d+",w="\\s*\\(*\\s*",x="&nbsp;",F="qx.dev.Tokenizer",D="\\t",M="\\s*\\)*\\s*\\)",H="\\.(?:replace)\\s*\\(\\s*\\(*\\s*",S="\\)*\\.(?:test|exec)\\s*\\(\\s*",Q="<span class='regexp'>",z="int",V="'>",U="<span class='",T="(?:\\/(?!\\*)[^\\t\\n\\r\\f\\v\\/]+?\\/[mgi]*)",y=".",B="\\s*\\)*\\s*?,?",C="[\\(,]\\s*",E="<span class='ident'>",G="g",I="[+-]?\\d+(([.]\\d+)*([eE][+-]?\\d+))?",N="\\/\\*(?:.|[\\n\\r])*?\\*\\/",R="\n",u="$",v="['][^']*[']",A="tab",L="\\/\\/.*?[\\n\\r$]",K="<br>",J=" ",P="(?::|=|\\?)\\s*\\(*\\s*",O="\\.(?:match|search|split)\\s*\\(\\s*\\(*\\s*";
qx.Class.define(F,{extend:qx.core.Object,statics:{tokenizeJavaScript:function(bh){var bL={"break":1,"case":1,"catch":1,"continue":1,"default":1,"delete":1,"do":1,"else":1,"finally":1,"for":1,"function":1,"if":1,"in":1,"instanceof":1,"new":1,"return":1,"switch":1,"throw":1,"try":1,"typeof":1,"var":1,"while":1,"with":1};
var bB={"void":1,"null":1,"true":1,"false":1,"NaN":1,"Infinity":1,"this":1};
var bx={"statics":1,"members":1,"construct":1,"destruct":1,"events":1,"properties":1,"extend":1,"implement":1};
var bt=function(bM){return new RegExp(s+bM+u);
};
var bE=L;
var bu=N;
var bo=p;
var bw=n;
var br=I;
var bz=t;
var by=v;
var bm=D;
var bH=Y;
var bJ=W;
var bs=T;
var bv=[O+bs+M,H+bs+B,w+bs+S,P+bs+X,C+bs+r].join(bc);
var bF=bt(bE);
var bp=bt(bu);
var bC=bt(bo);
var bl=bt(bw);
var bI=bt(br);
var bk=bt(bz);
var bj=bt(by);
var bD=bt(bm);
var bq=bt(bH);
var bi=bt(bJ);
var bn=bt(bv);
var bA=new RegExp([bE,bu,bo,bw,br,bz,by,by,bm,bH,bJ,bv,y].join(bc),G);
var bG=[];
var a=bh.match(bA);

for(var i=0;i<a.length;i++){var bK=a[i];

if(bK.match(bF)){bG.push({type:b,value:bK});
}else if(bK.match(bp)){bG.push({type:bb,value:bK});
}else if(bK.match(bn)){bG.push({type:be,value:bK});
}else if(bK.match(bj)){bG.push({type:c,value:bK});
}else if(bK.match(bk)){bG.push({type:e,value:bK});
}else if(bL[bK]){bG.push({type:bf,value:bK});
}else if(bB[bK]){bG.push({type:ba,value:bK});
}else if(bx[bK]){bG.push({type:h,value:bK});
}else if(bK.match(bC)){bG.push({type:bg,value:bK});
}else if(bK.match(bI)){bG.push({type:q,value:bK});
}else if(bK.match(bl)){bG.push({type:z,value:bK});
}else if(bK.match(bq)){bG.push({type:j,value:bK});
}else if(bK.match(bt(bi))){bG.push({type:g,value:bK});
}else if(bK.match(bD)){bG.push({type:A,value:bK});
}else if(bK==f){bG.push({type:k,value:f});
}else if(bK==d){bG.push({type:k,value:d});
}else if(bK==bd){bG.push({type:k,value:bd});
}else{bG.push({type:k,value:bK});
}}return bG;
},javaScriptToHtml:function(bN,bO){var bS=qx.dev.Tokenizer.tokenizeJavaScript(bN);
var bR=new qx.util.StringBuilder();

for(var i=0;i<bS.length;i++){var bT=bS[i];
var bQ=qx.bom.String.escape(bT.value);

switch(bT.type){case be:bR.add(Q,bQ,l);
break;
case bg:bR.add(E,bQ,l);
break;
case b:case bb:bR.add(m,bQ,l);
break;
case c:case e:bR.add(o,bQ,l);
break;
case bf:case ba:case h:bR.add(U,bT.type,V,bQ,l);
break;
case j:var bP=qx.bom.client.Engine.MSHTML&&!bO?K:R;
bR.add(bP);
break;
case g:var bU=qx.bom.client.Engine.MSHTML&&!bO?x:J;
bR.add(bU);
break;
default:bR.add(bQ);
}}return bR.get();
}}});
})();
(function(){var g="",f="<br",e=" &nbsp;",d="<br>",c=" ",b="\n",a="qx.bom.String";
qx.Class.define(a,{statics:{TO_CHARCODE:{"quot":34,"amp":38,"lt":60,"gt":62,"nbsp":160,"iexcl":161,"cent":162,"pound":163,"curren":164,"yen":165,"brvbar":166,"sect":167,"uml":168,"copy":169,"ordf":170,"laquo":171,"not":172,"shy":173,"reg":174,"macr":175,"deg":176,"plusmn":177,"sup2":178,"sup3":179,"acute":180,"micro":181,"para":182,"middot":183,"cedil":184,"sup1":185,"ordm":186,"raquo":187,"frac14":188,"frac12":189,"frac34":190,"iquest":191,"Agrave":192,"Aacute":193,"Acirc":194,"Atilde":195,"Auml":196,"Aring":197,"AElig":198,"Ccedil":199,"Egrave":200,"Eacute":201,"Ecirc":202,"Euml":203,"Igrave":204,"Iacute":205,"Icirc":206,"Iuml":207,"ETH":208,"Ntilde":209,"Ograve":210,"Oacute":211,"Ocirc":212,"Otilde":213,"Ouml":214,"times":215,"Oslash":216,"Ugrave":217,"Uacute":218,"Ucirc":219,"Uuml":220,"Yacute":221,"THORN":222,"szlig":223,"agrave":224,"aacute":225,"acirc":226,"atilde":227,"auml":228,"aring":229,"aelig":230,"ccedil":231,"egrave":232,"eacute":233,"ecirc":234,"euml":235,"igrave":236,"iacute":237,"icirc":238,"iuml":239,"eth":240,"ntilde":241,"ograve":242,"oacute":243,"ocirc":244,"otilde":245,"ouml":246,"divide":247,"oslash":248,"ugrave":249,"uacute":250,"ucirc":251,"uuml":252,"yacute":253,"thorn":254,"yuml":255,"fnof":402,"Alpha":913,"Beta":914,"Gamma":915,"Delta":916,"Epsilon":917,"Zeta":918,"Eta":919,"Theta":920,"Iota":921,"Kappa":922,"Lambda":923,"Mu":924,"Nu":925,"Xi":926,"Omicron":927,"Pi":928,"Rho":929,"Sigma":931,"Tau":932,"Upsilon":933,"Phi":934,"Chi":935,"Psi":936,"Omega":937,"alpha":945,"beta":946,"gamma":947,"delta":948,"epsilon":949,"zeta":950,"eta":951,"theta":952,"iota":953,"kappa":954,"lambda":955,"mu":956,"nu":957,"xi":958,"omicron":959,"pi":960,"rho":961,"sigmaf":962,"sigma":963,"tau":964,"upsilon":965,"phi":966,"chi":967,"psi":968,"omega":969,"thetasym":977,"upsih":978,"piv":982,"bull":8226,"hellip":8230,"prime":8242,"Prime":8243,"oline":8254,"frasl":8260,"weierp":8472,"image":8465,"real":8476,"trade":8482,"alefsym":8501,"larr":8592,"uarr":8593,"rarr":8594,"darr":8595,"harr":8596,"crarr":8629,"lArr":8656,"uArr":8657,"rArr":8658,"dArr":8659,"hArr":8660,"forall":8704,"part":8706,"exist":8707,"empty":8709,"nabla":8711,"isin":8712,"notin":8713,"ni":8715,"prod":8719,"sum":8721,"minus":8722,"lowast":8727,"radic":8730,"prop":8733,"infin":8734,"ang":8736,"and":8743,"or":8744,"cap":8745,"cup":8746,"int":8747,"there4":8756,"sim":8764,"cong":8773,"asymp":8776,"ne":8800,"equiv":8801,"le":8804,"ge":8805,"sub":8834,"sup":8835,"sube":8838,"supe":8839,"oplus":8853,"otimes":8855,"perp":8869,"sdot":8901,"lceil":8968,"rceil":8969,"lfloor":8970,"rfloor":8971,"lang":9001,"rang":9002,"loz":9674,"spades":9824,"clubs":9827,"hearts":9829,"diams":9830,"OElig":338,"oelig":339,"Scaron":352,"scaron":353,"Yuml":376,"circ":710,"tilde":732,"ensp":8194,"emsp":8195,"thinsp":8201,"zwnj":8204,"zwj":8205,"lrm":8206,"rlm":8207,"ndash":8211,"mdash":8212,"lsquo":8216,"rsquo":8217,"sbquo":8218,"ldquo":8220,"rdquo":8221,"bdquo":8222,"dagger":8224,"Dagger":8225,"permil":8240,"lsaquo":8249,"rsaquo":8250,"euro":8364},escape:function(h){return qx.util.StringEscape.escape(h,qx.bom.String.FROM_CHARCODE);
},unescape:function(i){return qx.util.StringEscape.unescape(i,qx.bom.String.TO_CHARCODE);
},fromText:function(j){return qx.bom.String.escape(j).replace(/(  |\n)/g,function(k){var l={"  ":e,"\n":d};
return l[k]||k;
});
},toText:function(m){return qx.bom.String.unescape(m.replace(/\s+|<([^>])+>/gi,function(n){if(n.indexOf(f)===0){return b;
}else if(n.length>0&&n.replace(/^\s*/,g).replace(/\s*$/,g)==g){return c;
}else{return g;
}}));
}},defer:function(o){o.FROM_CHARCODE=qx.lang.Object.invert(o.TO_CHARCODE);
}});
})();
(function(){var g=";",f="&",e='X',d="",c='#',b="&#",a="qx.util.StringEscape";
qx.Class.define(a,{statics:{escape:function(h,j){var m,o=d;

for(var i=0,l=h.length;i<l;i++){var n=h.charAt(i);
var k=n.charCodeAt(0);

if(j[k]){m=f+j[k]+g;
}else{if(k>0x7F){m=b+k+g;
}else{m=n;
}}o+=m;
}return o;
},unescape:function(p,q){return p.replace(/&[#\w]+;/gi,function(r){var s=r;
var r=r.substring(1,r.length-1);
var t=q[r];

if(t){s=String.fromCharCode(t);
}else{if(r.charAt(0)==c){if(r.charAt(1).toUpperCase()==e){t=r.substring(2);
if(t.match(/^[0-9A-Fa-f]+$/gi)){s=String.fromCharCode(parseInt(t,16));
}}else{t=r.substring(1);
if(t.match(/^\d+$/gi)){s=String.fromCharCode(parseInt(t,10));
}}}}return s;
});
}}});
})();
(function(){var c="Tango",b="qx/icon/Tango",a="qx.theme.icon.Tango";
qx.Theme.define(a,{title:c,aliases:{"icon":b},icons:{}});
})();
(function(){var n="Liberation Sans",m="Arial",l="Lucida Grande",k="sans-serif",j="Tahoma",i="Candara",h="Segoe UI",g="Consolas",f="Courier New",e="Monaco",b="monospace",d="Lucida Console",c="qx.theme.modern.Font",a="DejaVu Sans Mono";
qx.Theme.define(c,{fonts:{"default":{size:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?12:11,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[l]:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?[h,i]:[j,n,m,k]},"bold":{size:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?12:11,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[l]:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?[h,i]:[j,n,m,k],bold:true},"small":{size:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?11:10,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[l]:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?[h,i]:[j,n,m,k]},"monospace":{size:11,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[d,e]:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?[g]:[g,a,f,b]}}});
})();
(function(){var j="_applyStyle",i="solid",h="Color",g="",f="double",e="px",d="px ",c="dotted",b="_applyWidth",a="dashed",G="Number",F=" ",E="qx.debug",D="shorthand",C="on",B="widthTop",A="styleRight",z="styleLeft",y="widthLeft",x="widthBottom",q="styleTop",r="colorBottom",o="styleBottom",p="widthRight",m="colorLeft",n="colorRight",k="colorTop",l="border-top",s="border-left",t="border-right",v="qx.ui.decoration.Single",u="border-bottom",w="absolute";
qx.Class.define(v,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(H,I,J){qx.ui.decoration.Abstract.call(this);
if(H!=null){this.setWidth(H);
}
if(I!=null){this.setStyle(I);
}
if(J!=null){this.setColor(J);
}},properties:{widthTop:{check:G,init:0,apply:b},widthRight:{check:G,init:0,apply:b},widthBottom:{check:G,init:0,apply:b},widthLeft:{check:G,init:0,apply:b},styleTop:{nullable:true,check:[i,c,a,f],init:i,apply:j},styleRight:{nullable:true,check:[i,c,a,f],init:i,apply:j},styleBottom:{nullable:true,check:[i,c,a,f],init:i,apply:j},styleLeft:{nullable:true,check:[i,c,a,f],init:i,apply:j},colorTop:{nullable:true,check:h,apply:j},colorRight:{nullable:true,check:h,apply:j},colorBottom:{nullable:true,check:h,apply:j},colorLeft:{nullable:true,check:h,apply:j},backgroundColor:{check:h,nullable:true,apply:j},left:{group:[y,z,m]},right:{group:[p,A,n]},top:{group:[B,q,k]},bottom:{group:[x,o,r]},width:{group:[B,p,x,y],mode:D},style:{group:[q,A,o,z],mode:D},color:{group:[k,n,r,m],mode:D}},members:{__tM:null,_getDefaultInsets:function(){return {top:this.getWidthTop(),right:this.getWidthRight(),bottom:this.getWidthBottom(),left:this.getWidthLeft()};
},_isInitialized:function(){return !!this.__tM;
},getMarkup:function(K){if(this.__tM){return this.__tM;
}var L=qx.theme.manager.Color.getInstance();
var M={};
var O=this.getWidthTop();

if(O>0){M[l]=O+d+this.getStyleTop()+F+(L.resolve(this.getColorTop())||g);
}var O=this.getWidthRight();

if(O>0){M[t]=O+d+this.getStyleRight()+F+(L.resolve(this.getColorRight())||g);
}var O=this.getWidthBottom();

if(O>0){M[u]=O+d+this.getStyleBottom()+F+(L.resolve(this.getColorBottom())||g);
}var O=this.getWidthLeft();

if(O>0){M[s]=O+d+this.getStyleLeft()+F+(L.resolve(this.getColorLeft())||g);
}if(qx.core.Variant.isSet(E,C)){if(M.length===0){throw new Error("Invalid Single decorator (zero border width). Use qx.ui.decorator.Background instead!");
}}M.position=w;
M.top=0;
M.left=0;
var N=this._generateBackgroundMarkup(M);
return this.__tM=N;
},resize:function(P,Q,R){var S=this.getInsets();
Q-=S.left+S.right;
R-=S.top+S.bottom;
if(Q<0){Q=0;
}
if(R<0){R=0;
}P.style.width=Q+e;
P.style.height=R+e;
P.style.left=(parseInt(P.style.left,10)+(S.left-this.getWidthLeft()))+e;
P.style.top=(parseInt(P.style.top,10)+(S.top-this.getWidthTop()))+e;
},tint:function(T,U){var V=qx.theme.manager.Color.getInstance();

if(U==null){U=this.getBackgroundColor();
}T.style.backgroundColor=V.resolve(U)||g;
},_applyWidth:function(){if(qx.core.Variant.isSet(E,C)){if(this.__tM){throw new Error("This decorator is already in-use. Modification is not possible anymore!");
}}this._resetInsets();
},_applyStyle:function(){if(qx.core.Variant.isSet(E,C)){if(this.__tM){throw new Error("This decorator is already in-use. Modification is not possible anymore!");
}}}},destruct:function(){this.__tM=null;
}});
})();
(function(){var j="_applyStyle",i='"></div>',h="Color",g="1px",f='<div style="',e='border:',d="1px solid ",c="",b=";",a="px",x='</div>',w="qx.ui.decoration.Beveled",v="qx.debug",u='<div style="position:absolute;top:1px;left:1px;',t='border-bottom:',s='border-right:',r='border-left:',q='border-top:',p="Number",o='<div style="position:absolute;top:1px;left:0px;',m='position:absolute;top:0px;left:1px;',n='<div style="overflow:hidden;font-size:0;line-height:0;">',k="on",l="absolute";
qx.Class.define(w,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(y,z,A){qx.ui.decoration.Abstract.call(this);
if(y!=null){this.setOuterColor(y);
}
if(z!=null){this.setInnerColor(z);
}
if(A!=null){this.setInnerOpacity(A);
}},properties:{innerColor:{check:h,nullable:true,apply:j},innerOpacity:{check:p,init:1,apply:j},outerColor:{check:h,nullable:true,apply:j},backgroundColor:{check:h,nullable:true,apply:j}},members:{__tO:null,_getDefaultInsets:function(){return {top:2,right:2,bottom:2,left:2};
},_isInitialized:function(){return !!this.__tO;
},_applyStyle:function(){if(qx.core.Variant.isSet(v,k)){if(this.__tO){throw new Error("This decorator is already in-use. Modification is not possible anymore!");
}}},getMarkup:function(){if(this.__tO){return this.__tO;
}var B=qx.theme.manager.Color.getInstance();
var C=[];
var F=d+B.resolve(this.getOuterColor())+b;
var E=d+B.resolve(this.getInnerColor())+b;
C.push(n);
C.push(f);
C.push(e,F);
C.push(qx.bom.element.Opacity.compile(0.35));
C.push(i);
C.push(o);
C.push(r,F);
C.push(s,F);
C.push(qx.bom.element.Opacity.compile(1));
C.push(i);
C.push(f);
C.push(m);
C.push(q,F);
C.push(t,F);
C.push(qx.bom.element.Opacity.compile(1));
C.push(i);
var D={position:l,top:g,left:g,opacity:1};
C.push(this._generateBackgroundMarkup(D));
C.push(u);
C.push(e,E);
C.push(qx.bom.element.Opacity.compile(this.getInnerOpacity()));
C.push(i);
C.push(x);
return this.__tO=C.join(c);
},resize:function(G,H,I){if(H<4){H=4;
}
if(I<4){I=4;
}if(qx.bom.client.Feature.CONTENT_BOX){var outerWidth=H-2;
var outerHeight=I-2;
var O=outerWidth;
var N=outerHeight;
var innerWidth=H-4;
var innerHeight=I-4;
}else{var outerWidth=H;
var outerHeight=I;
var O=H-2;
var N=I-2;
var innerWidth=O;
var innerHeight=N;
}var Q=a;
var M=G.childNodes[0].style;
M.width=outerWidth+Q;
M.height=outerHeight+Q;
var L=G.childNodes[1].style;
L.width=outerWidth+Q;
L.height=N+Q;
var K=G.childNodes[2].style;
K.width=O+Q;
K.height=outerHeight+Q;
var J=G.childNodes[3].style;
J.width=O+Q;
J.height=N+Q;
var P=G.childNodes[4].style;
P.width=innerWidth+Q;
P.height=innerHeight+Q;
},tint:function(R,S){var T=qx.theme.manager.Color.getInstance();

if(S==null){S=this.getBackgroundColor();
}R.childNodes[3].style.backgroundColor=T.resolve(S)||c;
}},destruct:function(){this.__tO=null;
}});
})();
(function(){var q="qx.debug",p="_applyStyle",o="on",n="",m="Color",l="px",k="solid",j="dotted",i="double",h="dashed",c="_applyWidth",g="qx.ui.decoration.Uniform",f="px ",b=" ",a="scale",e="PositiveInteger",d="absolute";
qx.Class.define(g,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(r,s,t){qx.ui.decoration.Abstract.call(this);
if(r!=null){this.setWidth(r);
}
if(s!=null){this.setStyle(s);
}
if(t!=null){this.setColor(t);
}},properties:{width:{check:e,init:0,apply:c},style:{nullable:true,check:[k,j,h,i],init:k,apply:p},color:{nullable:true,check:m,apply:p},backgroundColor:{check:m,nullable:true,apply:p}},members:{__tP:null,_getDefaultInsets:function(){var u=this.getWidth();
return {top:u,right:u,bottom:u,left:u};
},_isInitialized:function(){return !!this.__tP;
},getMarkup:function(){if(this.__tP){return this.__tP;
}var v={position:d,top:0,left:0};
var w=this.getWidth();

if(qx.core.Variant.isSet(q,o)){if(w===0){throw new Error("Invalid Uniform decorator (zero border width). Use qx.ui.decorator.Background instead!");
}}var y=qx.theme.manager.Color.getInstance();
v.border=w+f+this.getStyle()+b+(y.resolve(this.getColor())||n);
var x=this._generateBackgroundMarkup(v);
return this.__tP=x;
},resize:function(z,A,B){var D=this.getBackgroundImage()&&this.getBackgroundRepeat()==a;

if(D||qx.bom.client.Feature.CONTENT_BOX){var C=this.getWidth()*2;
A-=C;
B-=C;
if(A<0){A=0;
}
if(B<0){B=0;
}}z.style.width=A+l;
z.style.height=B+l;
},tint:function(E,F){var G=qx.theme.manager.Color.getInstance();

if(F==null){F=this.getBackgroundColor();
}E.style.backgroundColor=G.resolve(F)||n;
},_applyWidth:function(){if(qx.core.Variant.isSet(q,o)){if(this.__tP){throw new Error("This decorator is already in-use. Modification is not possible anymore!");
}}this._resetInsets();
},_applyStyle:function(){if(qx.core.Variant.isSet(q,o)){if(this.__tP){throw new Error("This decorator is already in-use. Modification is not possible anymore!");
}}}},destruct:function(){this.__tP=null;
}});
})();
(function(){var s="Number",r="_applyInsets",q="-l",p="Please verify the image '",o="' is present.",n="-t",m="insetRight",l="insetTop",k="qx.debug",j="The value of the property 'topSlice' is null! ",d="The value of the property 'leftSlice' is null! ",i="_applyBaseImage",g="insetBottom",c="set",b="shorthand",f="insetLeft",e="String",h="qx.ui.decoration.Grid",a="on";
qx.Class.define(h,{extend:qx.core.Object,implement:[qx.ui.decoration.IDecorator],construct:function(t,u){qx.core.Object.call(this);

if(qx.ui.decoration.css3.BorderImage.IS_SUPPORTED){this.__tQ=new qx.ui.decoration.css3.BorderImage();

if(t){this.__tR(t);
}}else{this.__tQ=new qx.ui.decoration.GridDiv(t);
}
if(u!=null){this.__tQ.setInsets(u);
}},properties:{baseImage:{check:e,nullable:true,apply:i},insetLeft:{check:s,nullable:true,apply:r},insetRight:{check:s,nullable:true,apply:r},insetBottom:{check:s,nullable:true,apply:r},insetTop:{check:s,nullable:true,apply:r},insets:{group:[l,m,g,f],mode:b}},members:{__tQ:null,getMarkup:function(){return this.__tQ.getMarkup();
},resize:function(v,w,x){this.__tQ.resize(v,w,x);
},tint:function(y,z){},getInsets:function(){return this.__tQ.getInsets();
},_applyInsets:function(A,B,name){var C=c+qx.lang.String.firstUp(name);
this.__tQ[C](A);
},_applyBaseImage:function(D,E){if(this.__tQ instanceof qx.ui.decoration.GridDiv){this.__tQ.setBaseImage(D);
}else{this.__tR(D);
}},__tR:function(F){this.__tQ.setBorderImage(F);
var L=qx.util.AliasManager.getInstance().resolve(F);
var M=/(.*)(\.[a-z]+)$/.exec(L);
var I=M[1];
var K=M[2];
var G=qx.util.ResourceManager.getInstance();
var N=G.getImageHeight(I+n+K);
var O=G.getImageWidth(I+q+K);

if(qx.core.Variant.isSet(k,a)){var H=j+p+I+n+K+o;
var J=d+p+I+q+K+o;
qx.core.Assert.assertNotNull(N,H);
qx.core.Assert.assertNotNull(O,J);
}this.__tQ.setSlice([N,O]);
}},destruct:function(){this.__tQ=null;
}});
})();
(function(){var m="solid",l="scale",k="border-main",j="white",i="repeat-x",h="border-separator",g="background-light",f="invalid",e="border-focused-invalid",d="border-input",bt="border-disabled",bs="decoration/table/header-cell.png",br="decoration/form/input.png",bq="#f8f8f8",bp="decoration/scrollbar/scrollbar-button-bg-horizontal.png",bo="#b6b6b6",bn="background-pane",bm="repeat-y",bl="decoration/form/input-focused.png",bk="#33508D",t="decoration/selection.png",u="decoration/scrollbar/scrollbar-button-bg-vertical.png",r="decoration/tabview/tab-button-top-active.png",s="black",p="decoration/group-item.png",q="decoration/form/button-c.png",n="decoration/scrollbar/scrollbar-bg-vertical.png",o="decoration/form/button.png",B="decoration/form/button-checked.png",C="decoration/tabview/tab-button-left-inactive.png",O="decoration/groupbox/groupbox.png",K="#FAFAFA",W="decoration/pane/pane.png",R="dotted",bg="decoration/toolbar/toolbar-part.gif",bc="decoration/tabview/tab-button-top-inactive.png",G="decoration/menu/bar-background.png",bj="center",bi="decoration/tabview/tab-button-bottom-active.png",bh="decoration/form/button-hovered.png",F="decoration/form/tooltip-error-arrow.png",I="decoration/window/captionbar-inactive.png",J="qx/decoration/Modern",M="decoration/menu/background.png",P="decoration/window/statusbar.png",S="border-focused",Y="table-focus-indicator",be="#F2F2F2",v="decoration/form/button-checked-c.png",w="decoration/scrollbar/scrollbar-bg-horizontal.png",H="qx.theme.modern.Decoration",V="#f4f4f4",U="decoration/shadow/shadow-small.png",T="decoration/app-header.png",bb="decoration/tabview/tabview-pane.png",ba="decoration/form/tooltip-error.png",Q="decoration/form/button-focused.png",X="decoration/tabview/tab-button-bottom-inactive.png",a="decoration/form/button-disabled.png",bd="decoration/tabview/tab-button-right-active.png",x="decoration/form/button-pressed.png",y="no-repeat",L="decoration/window/captionbar-active.png",b="decoration/tabview/tab-button-left-active.png",c="background-splitpane",E="decoration/form/button-checked-focused.png",z="#C5C5C5",A="decoration/toolbar/toolbar-gradient.png",D="decoration/tabview/tab-button-right-inactive.png",N="#b8b8b8",bf="decoration/shadow/shadow.png";
qx.Theme.define(H,{aliases:{decoration:J},decorations:{"main":{decorator:qx.ui.decoration.Uniform,style:{width:1,color:k}},"selected":{decorator:qx.ui.decoration.Background,style:{backgroundImage:t,backgroundRepeat:l}},"selected-dragover":{decorator:qx.ui.decoration.Single,style:{backgroundImage:t,backgroundRepeat:l,bottom:[2,m,bk]}},"dragover":{decorator:qx.ui.decoration.Single,style:{bottom:[2,m,bk]}},"pane":{decorator:qx.ui.decoration.Grid,style:{baseImage:W,insets:[0,2,3,0]}},"group":{decorator:qx.ui.decoration.Grid,style:{baseImage:O}},"border-invalid":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:j,innerOpacity:0.5,backgroundImage:br,backgroundRepeat:i,backgroundColor:g}},"keyboard-focus":{decorator:qx.ui.decoration.Single,style:{width:1,color:s,style:R}},"separator-horizontal":{decorator:qx.ui.decoration.Single,style:{widthLeft:1,colorLeft:h}},"separator-vertical":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:h}},"tooltip-error":{decorator:qx.ui.decoration.Grid,style:{baseImage:ba,insets:[2,5,5,2]}},"tooltip-error-arrow":{decorator:qx.ui.decoration.Background,style:{backgroundImage:F,backgroundPositionY:bj,backgroundRepeat:y,insets:[0,0,0,10]}},"shadow-window":{decorator:qx.ui.decoration.Grid,style:{baseImage:bf,insets:[4,8,8,4]}},"shadow-popup":{decorator:qx.ui.decoration.Grid,style:{baseImage:U,insets:[0,3,3,0]}},"scrollbar-horizontal":{decorator:qx.ui.decoration.Background,style:{backgroundImage:w,backgroundRepeat:i}},"scrollbar-vertical":{decorator:qx.ui.decoration.Background,style:{backgroundImage:n,backgroundRepeat:bm}},"scrollbar-slider-horizontal":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:bp,backgroundRepeat:l,outerColor:k,innerColor:j,innerOpacity:0.5}},"scrollbar-slider-horizontal-disabled":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:bp,backgroundRepeat:l,outerColor:bt,innerColor:j,innerOpacity:0.3}},"scrollbar-slider-vertical":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:u,backgroundRepeat:l,outerColor:k,innerColor:j,innerOpacity:0.5}},"scrollbar-slider-vertical-disabled":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:u,backgroundRepeat:l,outerColor:bt,innerColor:j,innerOpacity:0.3}},"button":{decorator:qx.ui.decoration.Grid,style:{baseImage:o,insets:2}},"button-disabled":{decorator:qx.ui.decoration.Grid,style:{baseImage:a,insets:2}},"button-focused":{decorator:qx.ui.decoration.Grid,style:{baseImage:Q,insets:2}},"button-hovered":{decorator:qx.ui.decoration.Grid,style:{baseImage:bh,insets:2}},"button-pressed":{decorator:qx.ui.decoration.Grid,style:{baseImage:x,insets:2}},"button-checked":{decorator:qx.ui.decoration.Grid,style:{baseImage:B,insets:2}},"button-checked-focused":{decorator:qx.ui.decoration.Grid,style:{baseImage:E,insets:2}},"button-invalid-shadow":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:e,insets:[1]}},"checkbox-invalid-shadow":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:e,insets:[0]}},"input":{decorator:qx.ui.decoration.Beveled,style:{outerColor:d,innerColor:j,innerOpacity:0.5,backgroundImage:br,backgroundRepeat:i,backgroundColor:g}},"input-focused":{decorator:qx.ui.decoration.Beveled,style:{outerColor:d,innerColor:S,backgroundImage:bl,backgroundRepeat:i,backgroundColor:g}},"input-focused-invalid":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:e,backgroundImage:bl,backgroundRepeat:i,backgroundColor:g,insets:[2]}},"input-disabled":{decorator:qx.ui.decoration.Beveled,style:{outerColor:bt,innerColor:j,innerOpacity:0.5,backgroundImage:br,backgroundRepeat:i,backgroundColor:g}},"toolbar":{decorator:qx.ui.decoration.Background,style:{backgroundImage:A,backgroundRepeat:l}},"toolbar-button-hovered":{decorator:qx.ui.decoration.Beveled,style:{outerColor:bo,innerColor:bq,backgroundImage:q,backgroundRepeat:l}},"toolbar-button-checked":{decorator:qx.ui.decoration.Beveled,style:{outerColor:bo,innerColor:bq,backgroundImage:v,backgroundRepeat:l}},"toolbar-separator":{decorator:qx.ui.decoration.Single,style:{widthLeft:1,widthRight:1,colorLeft:N,colorRight:V,styleLeft:m,styleRight:m}},"toolbar-part":{decorator:qx.ui.decoration.Background,style:{backgroundImage:bg,backgroundRepeat:bm}},"tabview-pane":{decorator:qx.ui.decoration.Grid,style:{baseImage:bb,insets:[4,6,7,4]}},"tabview-page-button-top-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:r}},"tabview-page-button-top-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:bc}},"tabview-page-button-bottom-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:bi}},"tabview-page-button-bottom-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:X}},"tabview-page-button-left-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:b}},"tabview-page-button-left-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:C}},"tabview-page-button-right-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:bd}},"tabview-page-button-right-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:D}},"splitpane":{decorator:qx.ui.decoration.Uniform,style:{backgroundColor:bn,width:3,color:c,style:m}},"window":{decorator:qx.ui.decoration.Single,style:{backgroundColor:bn,width:1,color:k,widthTop:0}},"window-captionbar-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:L}},"window-captionbar-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:I}},"window-statusbar":{decorator:qx.ui.decoration.Grid,style:{baseImage:P}},"table":{decorator:qx.ui.decoration.Single,style:{width:1,color:k,style:m}},"table-statusbar":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:k,style:m}},"table-scroller-header":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bs,backgroundRepeat:l,widthBottom:1,colorBottom:k,style:m}},"table-header-cell":{decorator:qx.ui.decoration.Single,style:{widthRight:1,colorRight:h,styleRight:m}},"table-header-cell-hovered":{decorator:qx.ui.decoration.Single,style:{widthRight:1,colorRight:h,styleRight:m,widthBottom:1,colorBottom:j,styleBottom:m}},"table-column-button":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bs,backgroundRepeat:l,widthBottom:1,colorBottom:k,style:m}},"table-scroller-focus-indicator":{decorator:qx.ui.decoration.Single,style:{width:2,color:Y,style:m}},"progressive-table-header":{decorator:qx.ui.decoration.Single,style:{width:1,color:k,style:m}},"progressive-table-header-cell":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bs,backgroundRepeat:l,widthRight:1,colorRight:be,style:m}},"menu":{decorator:qx.ui.decoration.Single,style:{backgroundImage:M,backgroundRepeat:l,width:1,color:k,style:m}},"menu-separator":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:z,widthBottom:1,colorBottom:K}},"menubar":{decorator:qx.ui.decoration.Single,style:{backgroundImage:G,backgroundRepeat:l,width:1,color:h,style:m}},"app-header":{decorator:qx.ui.decoration.Background,style:{backgroundImage:T,backgroundRepeat:l}},"progressbar":{decorator:qx.ui.decoration.Single,style:{width:1,color:d}},"group-item":{decorator:qx.ui.decoration.Background,style:{backgroundImage:p,backgroundRepeat:l}}}});
})();
(function(){var j="#F3F3F3",i="#E4E4E4",h="#1a1a1a",g="#084FAB",f="gray",e="#CCCCCC",d="#CCC",c="#fffefe",b="white",a="#4a4a4a",L="#EEEEEE",K="#80B4EF",J="#C72B2B",I="#ffffdd",H="#334866",G="#00204D",F="#666666",E="#CBC8CD",D="#99C3FE",C="#808080",q="#F4F4F4",r="#001533",o="#909090",p="#FCFCFC",m="#314a6e",n="#B6B6B6",k="#0880EF",l="#4d4d4d",s="#DFDFDF",t="#000000",w="#FF9999",v="#7B7A7E",y="#26364D",x="#990000",A="#AFAFAF",z="#404955",u="#AAAAAA",B="qx.theme.modern.Color";
qx.Theme.define(B,{colors:{"background-application":s,"background-pane":j,"background-light":p,"background-medium":L,"background-splitpane":A,"background-tip":I,"background-tip-error":J,"background-odd":i,"text-light":o,"text-gray":a,"text-label":h,"text-title":m,"text-input":t,"text-hovered":r,"text-disabled":v,"text-selected":c,"text-active":y,"text-inactive":z,"text-placeholder":E,"border-main":l,"border-separator":C,"border-input":H,"border-disabled":n,"border-pane":G,"border-button":F,"border-column":e,"border-focused":D,"invalid":x,"border-focused-invalid":w,"table-pane":j,"table-focus-indicator":k,"table-row-background-focused-selected":g,"table-row-background-focused":K,"table-row-background-selected":g,"table-row-background-even":j,"table-row-background-odd":i,"table-row-selected":c,"table-row":h,"table-row-line":d,"table-column-line":d,"progressive-table-header":u,"progressive-table-row-background-even":q,"progressive-table-row-background-odd":i,"progressive-progressbar-background":f,"progressive-progressbar-indicator-done":e,"progressive-progressbar-indicator-undone":b,"progressive-progressbar-percent-background":f,"progressive-progressbar-percent-text":b}});
})();
(function(){var dN="button-frame",dM="atom",dL="widget",dK="main",dJ="button",dI="bold",dH="text-selected",dG="image",dF="middle",dE="selected",co="background-light",cn="cell",cm="text-disabled",cl="groupbox",ck="decoration/arrows/down.png",cj="label",ci="border-invalid",ch="input",cg="white",cf="input-disabled",dU="menu-button",dV="input-focused-invalid",dS="toolbar-button",dT="spinner",dQ="input-focused",dR="popup",dO="tooltip",dP="list",dW="tree-item",dX="treevirtual-contract",dk="scrollbar",dj="datechooser/nav-button",dm="text-hovered",dl="center",dp="treevirtual-expand",dn="textfield",dr="decoration/arrows/right.png",dq="background-application",di="radiobutton",dh="invalid",k="combobox",l="right-top",m="checkbox",n="text-title",o="icon/16/places/folder-open.png",p="qx/static/blank.gif",q="scrollbar/button",r="right",s="combobox/button",t="icon/16/places/folder.png",em="text-label",el="decoration/tree/closed.png",ek="scrollbar-slider-horizontal",ej="checkbox-checked",eq="decoration/arrows/left.png",ep="button-focused",eo="text-light",en="menu-slidebar-button",es="checkbox-undetermined",er="text-input",bm="slidebar/button-forward",bn="background-splitpane",bk=".png",bl="decoration/tree/open.png",bq="default",br="decoration/arrows/down-small.png",bo="datechooser",bp="slidebar/button-backward",bi="selectbox",bj="treevirtual-folder",N="shadow-popup",M="icon/16/mimetypes/office-document.png",P="background-medium",O="icon/32/places/folder-open.png",J="icon/22/places/folder-open.png",I="table",L="decoration/arrows/up.png",K="decoration/form/",H="",G="-invalid",bx="button-checked",by="decoration/window/maximize-active-hovered.png",bz="radiobutton-hovered",bA="keyboard-focus",bt="group-item",bu="decoration/cursors/",bv="slidebar",bw="tooltip-error-arrow",bB="table-scroller-focus-indicator",bC="move-frame",bb="nodrop",ba="decoration/table/boolean-true.png",Y="table-header-cell",X="menu",W="app-header",V="row-layer",U="text-inactive",T="move",bf="radiobutton-checked-focused",be="decoration/window/restore-active-hovered.png",bD="shadow-window",bE="table-column-button",bF="right.png",bG="checkbox-undetermined-hovered",bH="tabview-page-button-bottom-inactive",bI="tooltip-error",bJ="window-statusbar",bK="button-hovered",bL="decoration/scrollbar/scrollbar-",bM="background-tip",cw="scrollbar-slider-horizontal-disabled",cv="table-scroller-header",cu="button-pressed",ct="table-pane",cA="decoration/window/close-active.png",cz="native",cy="checkbox-hovered",cx="button-invalid-shadow",cE="decoration/window/minimize-active-hovered.png",cD="menubar",dc="icon/16/actions/dialog-cancel.png",dd="tabview-page-button-top-inactive",da="tabview-page-button-left-inactive",db="menu-slidebar",cX="toolbar-button-checked",cY="decoration/tree/open-selected.png",cV="radiobutton-checked",cW="decoration/window/minimize-inactive.png",de="icon/16/apps/office-calendar.png",df="group",dv="tabview-page-button-right-inactive",du="decoration/window/minimize-active.png",dx="decoration/window/restore-inactive.png",dw="checkbox-checked-focused",dz="splitpane",dy="combobox/textfield",dB="button-preselected-focused",dA="decoration/window/close-active-hovered.png",dt="qx/icon/Tango/16/actions/window-close.png",ds="checkbox-pressed",ef="button-disabled",eg="selected-dragover",eh="border-separator",ei="decoration/window/maximize-inactive.png",eb="dragover",ec="scrollarea",ed="scrollbar-vertical",ee="decoration/menu/checkbox-invert.gif",dY="decoration/toolbar/toolbar-handle-knob.gif",ea="icon/22/mimetypes/office-document.png",j="button-preselected",i="button-checked-focused",h="up.png",g="best-fit",f="decoration/tree/closed-selected.png",e="qx.theme.modern.Appearance",d="text-active",c="toolbar-button-hovered",b="progressive-table-header",a="decoration/table/select-column-order.png",w="decoration/menu/radiobutton.gif",x="decoration/arrows/forward.png",u="decoration/table/descending.png",v="progressbar",A="window-captionbar-active",B="checkbox-checked-hovered",y="scrollbar-slider-vertical",z="toolbar",D="alias",E="decoration/window/restore-active.png",cI="decoration/table/boolean-false.png",cC="icon/32/mimetypes/office-document.png",cP="radiobutton-checked-disabled",cL="tabview-pane",cr="decoration/arrows/rewind.png",cp="checkbox-focused",R="top",cs="icon/16/actions/dialog-ok.png",bd="radiobutton-checked-hovered",bc="table-header-cell-hovered",bW="window",bX="text-gray",bY="decoration/menu/radiobutton-invert.gif",ca="text-placeholder",cb="slider",cc="keep-align",cd="down.png",ce="tabview-page-button-top-active",bT="icon/22/places/folder.png",bU="decoration/window/maximize-active.png",cq="checkbox-checked-pressed",cO="decoration/window/close-inactive.png",cN="tabview-page-button-left-active",cM="toolbar-part",cT="decoration/splitpane/knob-vertical.png",cS=".gif",cR="radiobutton-checked-pressed",cQ="table-statusbar",cK="radiobutton-pressed",cJ="window-captionbar-inactive",C="copy",bh="radiobutton-focused",bg="decoration/arrows/down-invert.png",cB="decoration/menu/checkbox.gif",bs="decoration/splitpane/knob-horizontal.png",cH="icon/32/places/folder.png",cG="toolbar-separator",cF="tabview-page-button-bottom-active",Q="decoration/arrows/up-small.png",cU="decoration/table/ascending.png",F="decoration/arrows/up-invert.png",S="small",bN="tabview-page-button-right-active",bO="-disabled",bP="scrollbar-horizontal",bQ="checkbox-undetermined-focused",bR="progressive-table-header-cell",bS="menu-separator",dg="pane",bV="decoration/arrows/right-invert.png",dD="left.png",dC="icon/16/actions/view-refresh.png";
qx.Theme.define(e,{appearances:{"widget":{},"root":{style:function(et){return {backgroundColor:dq,textColor:em,font:bq};
}},"label":{style:function(eu){return {textColor:eu.disabled?cm:undefined};
}},"move-frame":{style:function(ev){return {decorator:dK};
}},"resize-frame":bC,"dragdrop-cursor":{style:function(ew){var ex=bb;

if(ew.copy){ex=C;
}else if(ew.move){ex=T;
}else if(ew.alias){ex=D;
}return {source:bu+ex+cS,position:l,offset:[2,16,2,6]};
}},"image":{style:function(ey){return {opacity:!ey.replacement&&ey.disabled?0.3:1};
}},"atom":{},"atom/label":cj,"atom/icon":dG,"popup":{style:function(ez){return {decorator:dK,backgroundColor:co,shadow:N};
}},"button-frame":{alias:dM,style:function(eA){var eC,eB;

if(eA.checked&&eA.focused&&!eA.inner){eC=i;
eB=undefined;
}else if(eA.disabled){eC=ef;
eB=undefined;
}else if(eA.pressed){eC=cu;
eB=dm;
}else if(eA.checked){eC=bx;
eB=undefined;
}else if(eA.hovered){eC=bK;
eB=dm;
}else if(eA.preselected&&eA.focused&&!eA.inner){eC=dB;
eB=dm;
}else if(eA.preselected){eC=j;
eB=dm;
}else if(eA.focused&&!eA.inner){eC=ep;
eB=undefined;
}else{eC=dJ;
eB=undefined;
}return {decorator:eC,textColor:eB,shadow:eA.invalid&&!eA.disabled?cx:undefined};
}},"button-frame/image":{style:function(eD){return {opacity:!eD.replacement&&eD.disabled?0.5:1};
}},"button":{alias:dN,include:dN,style:function(eE){return {padding:[2,8],center:true};
}},"hover-button":{alias:dM,include:dM,style:function(eF){return {decorator:eF.hovered?dE:undefined,textColor:eF.hovered?dH:undefined};
}},"splitbutton":{},"splitbutton/button":dJ,"splitbutton/arrow":{alias:dJ,include:dJ,style:function(eG){return {icon:ck,padding:2,marginLeft:1};
}},"checkbox":{alias:dM,style:function(eH){var eJ;
if(eH.checked){if(eH.disabled){eJ=ej;
}else if(eH.focused){eJ=dw;
}else if(eH.pressed){eJ=cq;
}else if(eH.hovered){eJ=B;
}else{eJ=ej;
}}else if(eH.undetermined){if(eH.disabled){eJ=es;
}else if(eH.focused){eJ=bQ;
}else if(eH.hovered){eJ=bG;
}else{eJ=es;
}}else if(!eH.disabled){if(eH.focused){eJ=cp;
}else if(eH.pressed){eJ=ds;
}else if(eH.hovered){eJ=cy;
}}eJ=eJ||m;
var eI=eH.invalid&&!eH.disabled?G:H;
return {icon:K+eJ+eI+bk,gap:6};
}},"radiobutton":{alias:dM,style:function(eK){var eM;

if(eK.checked&&eK.focused){eM=bf;
}else if(eK.checked&&eK.disabled){eM=cP;
}else if(eK.checked&&eK.pressed){eM=cR;
}else if(eK.checked&&eK.hovered){eM=bd;
}else if(eK.checked){eM=cV;
}else if(eK.focused){eM=bh;
}else if(eK.pressed){eM=cK;
}else if(eK.hovered){eM=bz;
}else{eM=di;
}var eL=eK.invalid&&!eK.disabled?G:H;
return {icon:K+eM+eL+bk,gap:6};
}},"textfield":{style:function(eN){var eS;
var eQ=!!eN.focused;
var eR=!!eN.invalid;
var eO=!!eN.disabled;

if(eQ&&eR&&!eO){eS=dV;
}else if(eQ&&!eR&&!eO){eS=dQ;
}else if(eO){eS=cf;
}else if(!eQ&&eR&&!eO){eS=ci;
}else{eS=ch;
}var eP;

if(eN.disabled){eP=cm;
}else if(eN.showingPlaceholder){eP=ca;
}else{eP=er;
}return {decorator:eS,padding:[2,4,1],textColor:eP};
}},"textarea":{include:dn,style:function(eT){return {padding:4};
}},"spinner":{style:function(eU){var eY;
var eW=!!eU.focused;
var eX=!!eU.invalid;
var eV=!!eU.disabled;

if(eW&&eX&&!eV){eY=dV;
}else if(eW&&!eX&&!eV){eY=dQ;
}else if(eV){eY=cf;
}else if(!eW&&eX&&!eV){eY=ci;
}else{eY=ch;
}return {decorator:eY};
}},"spinner/textfield":{style:function(fa){return {marginRight:2,padding:[2,4,1],textColor:fa.disabled?cm:er};
}},"spinner/upbutton":{alias:dN,include:dN,style:function(fb){return {icon:Q,padding:fb.pressed?[2,2,0,4]:[1,3,1,3],shadow:undefined};
}},"spinner/downbutton":{alias:dN,include:dN,style:function(fc){return {icon:br,padding:fc.pressed?[2,2,0,4]:[1,3,1,3],shadow:undefined};
}},"datefield":k,"datefield/button":{alias:s,include:s,style:function(fd){return {icon:de,padding:[0,3],decorator:undefined};
}},"datefield/textfield":dy,"datefield/list":{alias:bo,include:bo,style:function(fe){return {decorator:undefined};
}},"groupbox":{style:function(ff){return {legendPosition:R};
}},"groupbox/legend":{alias:dM,style:function(fg){return {padding:[1,0,1,4],textColor:fg.invalid?dh:n,font:dI};
}},"groupbox/frame":{style:function(fh){return {padding:12,decorator:df};
}},"check-groupbox":cl,"check-groupbox/legend":{alias:m,include:m,style:function(fi){return {padding:[1,0,1,4],textColor:fi.invalid?dh:n,font:dI};
}},"radio-groupbox":cl,"radio-groupbox/legend":{alias:di,include:di,style:function(fj){return {padding:[1,0,1,4],textColor:fj.invalid?dh:n,font:dI};
}},"scrollarea":{style:function(fk){return {minWidth:50,minHeight:50};
}},"scrollarea/corner":{style:function(fl){return {backgroundColor:dq};
}},"scrollarea/pane":dL,"scrollarea/scrollbar-x":dk,"scrollarea/scrollbar-y":dk,"scrollbar":{style:function(fm){if(fm[cz]){return {};
}return {width:fm.horizontal?undefined:16,height:fm.horizontal?16:undefined,decorator:fm.horizontal?bP:ed,padding:1};
}},"scrollbar/slider":{alias:cb,style:function(fn){return {padding:fn.horizontal?[0,1,0,1]:[1,0,1,0]};
}},"scrollbar/slider/knob":{include:dN,style:function(fo){var fp=fo.horizontal?ek:y;

if(fo.disabled){fp+=bO;
}return {decorator:fp,minHeight:fo.horizontal?undefined:9,minWidth:fo.horizontal?9:undefined};
}},"scrollbar/button":{alias:dN,include:dN,style:function(fq){var fr=bL;

if(fq.left){fr+=dD;
}else if(fq.right){fr+=bF;
}else if(fq.up){fr+=h;
}else{fr+=cd;
}
if(fq.left||fq.right){return {padding:[0,0,0,fq.left?3:4],icon:fr,width:15,height:14};
}else{return {padding:[0,0,0,2],icon:fr,width:14,height:15};
}}},"scrollbar/button-begin":q,"scrollbar/button-end":q,"slider":{style:function(fs){var fw;
var fu=!!fs.focused;
var fv=!!fs.invalid;
var ft=!!fs.disabled;

if(fu&&fv&&!ft){fw=dV;
}else if(fu&&!fv&&!ft){fw=dQ;
}else if(ft){fw=cf;
}else if(!fu&&fv&&!ft){fw=ci;
}else{fw=ch;
}return {decorator:fw};
}},"slider/knob":{include:dN,style:function(fx){return {decorator:fx.disabled?cw:ek,shadow:undefined,height:14,width:14};
}},"list":{alias:ec,style:function(fy){var fC;
var fA=!!fy.focused;
var fB=!!fy.invalid;
var fz=!!fy.disabled;

if(fA&&fB&&!fz){fC=dV;
}else if(fA&&!fB&&!fz){fC=dQ;
}else if(fz){fC=cf;
}else if(!fA&&fB&&!fz){fC=ci;
}else{fC=ch;
}return {backgroundColor:co,decorator:fC};
}},"list/pane":dL,"listitem":{alias:dM,style:function(fD){var fE;

if(fD.dragover){fE=fD.selected?eg:eb;
}else{fE=fD.selected?dE:undefined;
}return {padding:fD.dragover?[4,4,2,4]:4,textColor:fD.selected?dH:undefined,decorator:fE};
}},"slidebar":{},"slidebar/scrollpane":{},"slidebar/content":{},"slidebar/button-forward":{alias:dN,include:dN,style:function(fF){return {padding:5,center:true,icon:fF.vertical?ck:dr};
}},"slidebar/button-backward":{alias:dN,include:dN,style:function(fG){return {padding:5,center:true,icon:fG.vertical?L:eq};
}},"tabview":{style:function(fH){return {contentPadding:16};
}},"tabview/bar":{alias:bv,style:function(fI){var fJ={marginBottom:fI.barTop?-1:0,marginTop:fI.barBottom?-4:0,marginLeft:fI.barRight?-3:0,marginRight:fI.barLeft?-1:0,paddingTop:0,paddingRight:0,paddingBottom:0,paddingLeft:0};

if(fI.barTop||fI.barBottom){fJ.paddingLeft=5;
fJ.paddingRight=7;
}else{fJ.paddingTop=5;
fJ.paddingBottom=7;
}return fJ;
}},"tabview/bar/button-forward":{include:bm,alias:bm,style:function(fK){if(fK.barTop||fK.barBottom){return {marginTop:2,marginBottom:2};
}else{return {marginLeft:2,marginRight:2};
}}},"tabview/bar/button-backward":{include:bp,alias:bp,style:function(fL){if(fL.barTop||fL.barBottom){return {marginTop:2,marginBottom:2};
}else{return {marginLeft:2,marginRight:2};
}}},"tabview/bar/scrollpane":{},"tabview/pane":{style:function(fM){return {decorator:cL,minHeight:100,marginBottom:fM.barBottom?-1:0,marginTop:fM.barTop?-1:0,marginLeft:fM.barLeft?-1:0,marginRight:fM.barRight?-1:0};
}},"tabview-page":dL,"tabview-page/button":{alias:dM,style:function(fN){var fT,fP=0;
var fS=0,fO=0,fQ=0,fR=0;

if(fN.checked){if(fN.barTop){fT=ce;
fP=[6,14];
fQ=fN.firstTab?0:-5;
fR=fN.lastTab?0:-5;
}else if(fN.barBottom){fT=cF;
fP=[6,14];
fQ=fN.firstTab?0:-5;
fR=fN.lastTab?0:-5;
}else if(fN.barRight){fT=bN;
fP=[6,13];
fS=fN.firstTab?0:-5;
fO=fN.lastTab?0:-5;
}else{fT=cN;
fP=[6,13];
fS=fN.firstTab?0:-5;
fO=fN.lastTab?0:-5;
}}else{if(fN.barTop){fT=dd;
fP=[4,10];
fS=4;
fQ=fN.firstTab?5:1;
fR=1;
}else if(fN.barBottom){fT=bH;
fP=[4,10];
fO=4;
fQ=fN.firstTab?5:1;
fR=1;
}else if(fN.barRight){fT=dv;
fP=[4,10];
fR=5;
fS=fN.firstTab?5:1;
fO=1;
fQ=1;
}else{fT=da;
fP=[4,10];
fQ=5;
fS=fN.firstTab?5:1;
fO=1;
fR=1;
}}return {zIndex:fN.checked?10:5,decorator:fT,padding:fP,marginTop:fS,marginBottom:fO,marginLeft:fQ,marginRight:fR,textColor:fN.checked?d:U};
}},"tabview-page/button/label":{alias:cj,style:function(fU){return {padding:[0,1,0,1],margin:fU.focused?0:1,decorator:fU.focused?bA:undefined};
}},"tabview-page/button/close-button":{alias:dM,style:function(fV){return {icon:dt};
}},"toolbar":{style:function(fW){return {decorator:z,spacing:2};
}},"toolbar/part":{style:function(fX){return {decorator:cM,spacing:2};
}},"toolbar/part/container":{style:function(fY){return {paddingLeft:2,paddingRight:2};
}},"toolbar/part/handle":{style:function(ga){return {source:dY,marginLeft:3,marginRight:3};
}},"toolbar-button":{alias:dM,style:function(gb){return {marginTop:2,marginBottom:2,padding:(gb.pressed||gb.checked||gb.hovered)&&!gb.disabled||(gb.disabled&&gb.checked)?3:5,decorator:gb.pressed||(gb.checked&&!gb.hovered)||(gb.checked&&gb.disabled)?cX:gb.hovered&&!gb.disabled?c:undefined};
}},"toolbar-menubutton":{alias:dS,include:dS,style:function(gc){return {showArrow:true};
}},"toolbar-menubutton/arrow":{alias:dG,include:dG,style:function(gd){return {source:br};
}},"toolbar-splitbutton":{style:function(ge){return {marginTop:2,marginBottom:2};
}},"toolbar-splitbutton/button":{alias:dS,include:dS,style:function(gf){return {icon:ck,marginTop:undefined,marginBottom:undefined};
}},"toolbar-splitbutton/arrow":{alias:dS,include:dS,style:function(gg){if(gg.pressed||gg.checked||(gg.hovered&&!gg.disabled)){var gh=1;
}else{var gh=3;
}return {padding:gh,icon:ck,marginTop:undefined,marginBottom:undefined};
}},"toolbar-separator":{style:function(gi){return {decorator:cG,margin:7};
}},"tree":dP,"tree-item":{style:function(gj){return {padding:[2,6],textColor:gj.selected?dH:undefined,decorator:gj.selected?dE:undefined};
}},"tree-item/icon":{include:dG,style:function(gk){return {paddingRight:5};
}},"tree-item/label":cj,"tree-item/open":{include:dG,style:function(gl){var gm;

if(gl.selected&&gl.opened){gm=cY;
}else if(gl.selected&&!gl.opened){gm=f;
}else if(gl.opened){gm=bl;
}else{gm=el;
}return {padding:[0,5,0,2],source:gm};
}},"tree-folder":{include:dW,alias:dW,style:function(gn){var gp,go;

if(gn.small){gp=gn.opened?o:t;
go=o;
}else if(gn.large){gp=gn.opened?O:cH;
go=O;
}else{gp=gn.opened?J:bT;
go=J;
}return {icon:gp,iconOpened:go};
}},"tree-file":{include:dW,alias:dW,style:function(gq){return {icon:gq.small?M:gq.large?cC:ea};
}},"treevirtual":I,"treevirtual-folder":{style:function(gr){return {icon:gr.opened?o:t};
}},"treevirtual-file":{include:bj,alias:bj,style:function(gs){return {icon:M};
}},"treevirtual-line":{style:function(gt){return {icon:p};
}},"treevirtual-contract":{style:function(gu){return {icon:bl,paddingLeft:5,paddingTop:2};
}},"treevirtual-expand":{style:function(gv){return {icon:el,paddingLeft:5,paddingTop:2};
}},"treevirtual-only-contract":dX,"treevirtual-only-expand":dp,"treevirtual-start-contract":dX,"treevirtual-start-expand":dp,"treevirtual-end-contract":dX,"treevirtual-end-expand":dp,"treevirtual-cross-contract":dX,"treevirtual-cross-expand":dp,"treevirtual-end":{style:function(gw){return {icon:p};
}},"treevirtual-cross":{style:function(gx){return {icon:p};
}},"tooltip":{include:dR,style:function(gy){return {backgroundColor:bM,padding:[1,3,2,3],offset:[15,5,5,5]};
}},"tooltip/atom":dM,"tooltip-error":{include:dO,style:function(gz){return {textColor:dH,placeMethod:dL,offset:[0,0,0,14],marginTop:-2,position:l,showTimeout:100,hideTimeout:10000,decorator:bI,shadow:bw,font:dI};
}},"tooltip-error/atom":dM,"window":{style:function(gA){return {shadow:bD,contentPadding:[10,10,10,10]};
}},"window/pane":{style:function(gB){return {decorator:bW};
}},"window/captionbar":{style:function(gC){return {decorator:gC.active?A:cJ,textColor:gC.active?cg:bX,minHeight:26,paddingRight:2};
}},"window/icon":{style:function(gD){return {margin:[5,0,3,6]};
}},"window/title":{style:function(gE){return {alignY:dF,font:dI,marginLeft:6,marginRight:12};
}},"window/minimize-button":{alias:dM,style:function(gF){return {icon:gF.active?gF.hovered?cE:du:cW,margin:[4,8,2,0]};
}},"window/restore-button":{alias:dM,style:function(gG){return {icon:gG.active?gG.hovered?be:E:dx,margin:[5,8,2,0]};
}},"window/maximize-button":{alias:dM,style:function(gH){return {icon:gH.active?gH.hovered?by:bU:ei,margin:[4,8,2,0]};
}},"window/close-button":{alias:dM,style:function(gI){return {icon:gI.active?gI.hovered?dA:cA:cO,margin:[4,8,2,0]};
}},"window/statusbar":{style:function(gJ){return {padding:[2,6],decorator:bJ,minHeight:18};
}},"window/statusbar-text":{style:function(gK){return {font:S};
}},"iframe":{style:function(gL){return {decorator:dK};
}},"resizer":{style:function(gM){return {decorator:dg};
}},"splitpane":{style:function(gN){return {decorator:dz};
}},"splitpane/splitter":{style:function(gO){return {width:gO.horizontal?3:undefined,height:gO.vertical?3:undefined,backgroundColor:bn};
}},"splitpane/splitter/knob":{style:function(gP){return {source:gP.horizontal?bs:cT};
}},"splitpane/slider":{style:function(gQ){return {width:gQ.horizontal?3:undefined,height:gQ.vertical?3:undefined,backgroundColor:bn};
}},"selectbox":{alias:dN,include:dN,style:function(gR){return {padding:[2,8]};
}},"selectbox/atom":dM,"selectbox/popup":dR,"selectbox/list":{alias:dP},"selectbox/arrow":{include:dG,style:function(gS){return {source:ck,paddingLeft:5};
}},"datechooser":{style:function(gT){var gX;
var gV=!!gT.focused;
var gW=!!gT.invalid;
var gU=!!gT.disabled;

if(gV&&gW&&!gU){gX=dV;
}else if(gV&&!gW&&!gU){gX=dQ;
}else if(gU){gX=cf;
}else if(!gV&&gW&&!gU){gX=ci;
}else{gX=ch;
}return {padding:2,decorator:gX,backgroundColor:co};
}},"datechooser/navigation-bar":{},"datechooser/nav-button":{include:dN,alias:dN,style:function(gY){var ha={padding:[2,4],shadow:undefined};

if(gY.lastYear){ha.icon=cr;
ha.marginRight=1;
}else if(gY.lastMonth){ha.icon=eq;
}else if(gY.nextYear){ha.icon=x;
ha.marginLeft=1;
}else if(gY.nextMonth){ha.icon=dr;
}return ha;
}},"datechooser/last-year-button-tooltip":dO,"datechooser/last-month-button-tooltip":dO,"datechooser/next-year-button-tooltip":dO,"datechooser/next-month-button-tooltip":dO,"datechooser/last-year-button":dj,"datechooser/last-month-button":dj,"datechooser/next-month-button":dj,"datechooser/next-year-button":dj,"datechooser/month-year-label":{style:function(hb){return {font:dI,textAlign:dl,textColor:hb.disabled?cm:undefined};
}},"datechooser/date-pane":{style:function(hc){return {textColor:hc.disabled?cm:undefined,marginTop:2};
}},"datechooser/weekday":{style:function(hd){return {textColor:hd.disabled?cm:hd.weekend?eo:undefined,textAlign:dl,paddingTop:2,backgroundColor:P};
}},"datechooser/week":{style:function(he){return {textAlign:dl,padding:[2,4],backgroundColor:P};
}},"datechooser/day":{style:function(hf){return {textAlign:dl,decorator:hf.disabled?undefined:hf.selected?dE:undefined,textColor:hf.disabled?cm:hf.selected?dH:hf.otherMonth?eo:undefined,font:hf.today?dI:undefined,padding:[2,4]};
}},"combobox":{style:function(hg){var hk;
var hi=!!hg.focused;
var hj=!!hg.invalid;
var hh=!!hg.disabled;

if(hi&&hj&&!hh){hk=dV;
}else if(hi&&!hj&&!hh){hk=dQ;
}else if(hh){hk=cf;
}else if(!hi&&hj&&!hh){hk=ci;
}else{hk=ch;
}return {decorator:hk};
}},"combobox/popup":dR,"combobox/list":{alias:dP},"combobox/button":{include:dN,alias:dN,style:function(hl){var hm={icon:ck,padding:2};

if(hl.selected){hm.decorator=ep;
}return hm;
}},"combobox/textfield":{include:dn,style:function(hn){return {decorator:undefined};
}},"menu":{style:function(ho){var hp={decorator:X,shadow:N,spacingX:6,spacingY:1,iconColumnWidth:16,arrowColumnWidth:4,placementModeY:ho.submenu||ho.contextmenu?g:cc};

if(ho.submenu){hp.position=l;
hp.offset=[-2,-3];
}return hp;
}},"menu/slidebar":db,"menu-slidebar":dL,"menu-slidebar-button":{style:function(hq){return {decorator:hq.hovered?dE:undefined,padding:7,center:true};
}},"menu-slidebar/button-backward":{include:en,style:function(hr){return {icon:hr.hovered?F:L};
}},"menu-slidebar/button-forward":{include:en,style:function(hs){return {icon:hs.hovered?bg:ck};
}},"menu-separator":{style:function(ht){return {height:0,decorator:bS,margin:[4,2]};
}},"menu-button":{alias:dM,style:function(hu){return {decorator:hu.selected?dE:undefined,textColor:hu.selected?dH:undefined,padding:[4,6]};
}},"menu-button/icon":{include:dG,style:function(hv){return {alignY:dF};
}},"menu-button/label":{include:cj,style:function(hw){return {alignY:dF,padding:1};
}},"menu-button/shortcut":{include:cj,style:function(hx){return {alignY:dF,marginLeft:14,padding:1};
}},"menu-button/arrow":{include:dG,style:function(hy){return {source:hy.selected?bV:dr,alignY:dF};
}},"menu-checkbox":{alias:dU,include:dU,style:function(hz){return {icon:!hz.checked?undefined:hz.selected?ee:cB};
}},"menu-radiobutton":{alias:dU,include:dU,style:function(hA){return {icon:!hA.checked?undefined:hA.selected?bY:w};
}},"menubar":{style:function(hB){return {decorator:cD};
}},"menubar-button":{alias:dM,style:function(hC){return {decorator:(hC.pressed||hC.hovered)&&!hC.disabled?dE:undefined,textColor:hC.pressed||hC.hovered?dH:undefined,padding:[3,8]};
}},"colorselector":dL,"colorselector/control-bar":dL,"colorselector/control-pane":dL,"colorselector/visual-pane":cl,"colorselector/preset-grid":dL,"colorselector/colorbucket":{style:function(hD){return {decorator:dK,width:16,height:16};
}},"colorselector/preset-field-set":cl,"colorselector/input-field-set":cl,"colorselector/preview-field-set":cl,"colorselector/hex-field-composite":dL,"colorselector/hex-field":dn,"colorselector/rgb-spinner-composite":dL,"colorselector/rgb-spinner-red":dT,"colorselector/rgb-spinner-green":dT,"colorselector/rgb-spinner-blue":dT,"colorselector/hsb-spinner-composite":dL,"colorselector/hsb-spinner-hue":dT,"colorselector/hsb-spinner-saturation":dT,"colorselector/hsb-spinner-brightness":dT,"colorselector/preview-content-old":{style:function(hE){return {decorator:dK,width:50,height:10};
}},"colorselector/preview-content-new":{style:function(hF){return {decorator:dK,backgroundColor:co,width:50,height:10};
}},"colorselector/hue-saturation-field":{style:function(hG){return {decorator:dK,margin:5};
}},"colorselector/brightness-field":{style:function(hH){return {decorator:dK,margin:[5,7]};
}},"colorselector/hue-saturation-pane":dL,"colorselector/hue-saturation-handle":dL,"colorselector/brightness-pane":dL,"colorselector/brightness-handle":dL,"colorpopup":{alias:dR,include:dR,style:function(hI){return {padding:5,backgroundColor:dq};
}},"colorpopup/field":{style:function(hJ){return {decorator:dK,margin:2,width:14,height:14,backgroundColor:co};
}},"colorpopup/selector-button":dJ,"colorpopup/auto-button":dJ,"colorpopup/preview-pane":cl,"colorpopup/current-preview":{style:function(hK){return {height:20,padding:4,marginLeft:4,decorator:dK,allowGrowX:true};
}},"colorpopup/selected-preview":{style:function(hL){return {height:20,padding:4,marginRight:4,decorator:dK,allowGrowX:true};
}},"colorpopup/colorselector-okbutton":{alias:dJ,include:dJ,style:function(hM){return {icon:cs};
}},"colorpopup/colorselector-cancelbutton":{alias:dJ,include:dJ,style:function(hN){return {icon:dc};
}},"table":{alias:dL,style:function(hO){return {decorator:I};
}},"table/statusbar":{style:function(hP){return {decorator:cQ,padding:[0,2]};
}},"table/column-button":{alias:dN,style:function(hQ){return {decorator:bE,padding:3,icon:a};
}},"table-column-reset-button":{include:dU,alias:dU,style:function(){return {icon:dC};
}},"table-scroller":dL,"table-scroller/scrollbar-x":dk,"table-scroller/scrollbar-y":dk,"table-scroller/header":{style:function(hR){return {decorator:cv};
}},"table-scroller/pane":{style:function(hS){return {backgroundColor:ct};
}},"table-scroller/focus-indicator":{style:function(hT){return {decorator:bB};
}},"table-scroller/resize-line":{style:function(hU){return {backgroundColor:eh,width:2};
}},"table-header-cell":{alias:dM,style:function(hV){return {minWidth:13,minHeight:20,padding:hV.hovered?[3,4,2,4]:[3,4],decorator:hV.hovered?bc:Y,sortIcon:hV.sorted?(hV.sortedAscending?cU:u):undefined};
}},"table-header-cell/label":{style:function(hW){return {minWidth:0,alignY:dF,paddingRight:5};
}},"table-header-cell/sort-icon":{style:function(hX){return {alignY:dF,alignX:r};
}},"table-header-cell/icon":{style:function(hY){return {minWidth:0,alignY:dF,paddingRight:5};
}},"table-editor-textfield":{include:dn,style:function(ia){return {decorator:undefined,padding:[2,2],backgroundColor:co};
}},"table-editor-selectbox":{include:bi,alias:bi,style:function(ib){return {padding:[0,2],backgroundColor:co};
}},"table-editor-combobox":{include:k,alias:k,style:function(ic){return {decorator:undefined,backgroundColor:co};
}},"progressive-table-header":{alias:dL,style:function(id){return {decorator:b};
}},"progressive-table-header-cell":{alias:dM,style:function(ie){return {minWidth:40,minHeight:25,paddingLeft:6,decorator:bR};
}},"app-header":{style:function(ig){return {font:dI,textColor:dH,padding:[8,12],decorator:W};
}},"virtual-list":dP,"virtual-list/row-layer":V,"row-layer":{style:function(ih){return {colorEven:cg,colorOdd:cg};
}},"group-item":{include:cj,alias:cj,style:function(ii){return {padding:4,decorator:bt,textColor:cg,font:dI};
}},"column-layer":dL,"cell":{style:function(ij){return {textColor:ij.selected?dH:em,padding:[3,6],font:bq};
}},"cell-string":cn,"cell-number":{include:cn,style:function(ik){return {textAlign:r};
}},"cell-image":cn,"cell-boolean":{include:cn,style:function(il){return {iconTrue:ba,iconFalse:cI};
}},"cell-atom":cn,"cell-date":cn,"cell-html":cn,"htmlarea":{"include":dL,style:function(im){return {backgroundColor:cg};
}},"progressbar":{style:function(io){return {decorator:v,padding:[1],backgroundColor:cg};
}},"progressbar/progress":{style:function(ip){return {decorator:dE};
}}}});
})();
(function(){var d="tree",c="main",b="Demo browser",a="demobrowser.Appearance";
qx.Theme.define(a,{extend:qx.theme.modern.Appearance,title:b,appearances:{"demo-tree":{alias:d,include:d,style:function(){return {width:270,decorator:c};
}}}});
})();
(function(){var b="demobrowser.Theme",a="Demo browser";
qx.Theme.define(b,{title:a,meta:{color:qx.theme.modern.Color,decoration:qx.theme.modern.Decoration,font:qx.theme.modern.Font,icon:qx.theme.icon.Tango,appearance:demobrowser.Appearance}});
})();
(function(){var j="_applyStyle",i="stretch",h="Integer",g="px",f=" ",e="repeat",d="round",c="shorthand",b="px ",a="sliceBottom",A=";'></div>",z="<div style='",y="qx.debug",x="sliceLeft",w="sliceRight",v="repeatX",u="String",t="qx.ui.decoration.css3.BorderImage",s="border-box",r="",p='") ',q="sliceTop",n='url("',o="hidden",l="on",m="repeatY",k="absolute";
qx.Class.define(t,{extend:qx.ui.decoration.Abstract,construct:function(B,C){qx.ui.decoration.Abstract.call(this);
if(B!=null){this.setBorderImage(B);
}
if(C!=null){this.setSlice(C);
}},statics:{IS_SUPPORTED:qx.bom.element.Style.isPropertySupported("borderImage")},properties:{borderImage:{check:u,nullable:true,apply:j},sliceTop:{check:h,init:0,apply:j},sliceRight:{check:h,init:0,apply:j},sliceBottom:{check:h,init:0,apply:j},sliceLeft:{check:h,init:0,apply:j},slice:{group:[q,w,a,x],mode:c},repeatX:{check:[i,e,d],init:i,apply:j},repeatY:{check:[i,e,d],init:i,apply:j},repeat:{group:[v,m],mode:c}},members:{__tS:null,_getDefaultInsets:function(){return {top:0,right:0,bottom:0,left:0};
},_isInitialized:function(){return !!this.__tS;
},getMarkup:function(){if(this.__tS){return this.__tS;
}var D=this._resolveImageUrl(this.getBorderImage());
var E=[this.getSliceTop(),this.getSliceRight(),this.getSliceBottom(),this.getSliceLeft()];
var F=[this.getRepeatX(),this.getRepeatY()].join(f);
this.__tS=[z,qx.bom.element.Style.compile({"borderImage":n+D+p+E.join(f)+f+F,position:k,lineHeight:0,fontSize:0,overflow:o,boxSizing:s,borderWidth:E.join(b)+g}),A].join(r);
return this.__tS;
},resize:function(G,H,I){G.style.width=H+g;
G.style.height=I+g;
},tint:function(J,K){},_applyStyle:function(){if(qx.core.Variant.isSet(y,l)){if(this._isInitialized()){throw new Error("This decorator is already in-use. Modification is not possible anymore!");
}}},_resolveImageUrl:function(L){return qx.util.ResourceManager.getInstance().toUri(qx.util.AliasManager.getInstance().resolve(L));
}},destruct:function(){this.__tS=null;
}});
})();
(function(){var j="px",i="0px",h="-1px",g="no-repeat",f="scale-x",e="scale-y",d="-tr",c="-l",b='</div>',a="scale",z="qx.client",y="-br",x="-t",w="-tl",v="-r",u='<div style="position:absolute;top:0;left:0;overflow:hidden;font-size:0;line-height:0;">',t="qx.debug",s="_applyBaseImage",r="-b",q="String",o="",p="-bl",m="qx.ui.decoration.GridDiv",n="-c",k="mshtml",l="on";
qx.Class.define(m,{extend:qx.ui.decoration.Abstract,construct:function(A,B){qx.ui.decoration.Abstract.call(this);
if(A!=null){this.setBaseImage(A);
}
if(B!=null){this.setInsets(B);
}},properties:{baseImage:{check:q,nullable:true,apply:s}},members:{__tT:null,__tU:null,__tV:null,_getDefaultInsets:function(){return {top:0,right:0,bottom:0,left:0};
},_isInitialized:function(){return !!this.__tT;
},getMarkup:function(){if(this.__tT){return this.__tT;
}var C=qx.bom.element.Decoration;
var D=this.__tU;
var E=this.__tV;
var F=[];
F.push(u);
F.push(C.create(D.tl,g,{top:0,left:0}));
F.push(C.create(D.t,f,{top:0,left:E.left+j}));
F.push(C.create(D.tr,g,{top:0,right:0}));
F.push(C.create(D.bl,g,{bottom:0,left:0}));
F.push(C.create(D.b,f,{bottom:0,left:E.left+j}));
F.push(C.create(D.br,g,{bottom:0,right:0}));
F.push(C.create(D.l,e,{top:E.top+j,left:0}));
F.push(C.create(D.c,a,{top:E.top+j,left:E.left+j}));
F.push(C.create(D.r,e,{top:E.top+j,right:0}));
F.push(b);
return this.__tT=F.join(o);
},resize:function(G,H,I){var J=this.__tV;
var innerWidth=H-J.left-J.right;
var innerHeight=I-J.top-J.bottom;
if(innerWidth<0){innerWidth=0;
}
if(innerHeight<0){innerHeight=0;
}G.style.width=H+j;
G.style.height=I+j;
G.childNodes[1].style.width=innerWidth+j;
G.childNodes[4].style.width=innerWidth+j;
G.childNodes[7].style.width=innerWidth+j;
G.childNodes[6].style.height=innerHeight+j;
G.childNodes[7].style.height=innerHeight+j;
G.childNodes[8].style.height=innerHeight+j;

if(qx.core.Variant.isSet(z,k)){if(qx.bom.client.Engine.VERSION<7||(qx.bom.client.Feature.QUIRKS_MODE&&qx.bom.client.Engine.VERSION<8)){if(H%2==1){G.childNodes[2].style.marginRight=h;
G.childNodes[5].style.marginRight=h;
G.childNodes[8].style.marginRight=h;
}else{G.childNodes[2].style.marginRight=i;
G.childNodes[5].style.marginRight=i;
G.childNodes[8].style.marginRight=i;
}
if(I%2==1){G.childNodes[3].style.marginBottom=h;
G.childNodes[4].style.marginBottom=h;
G.childNodes[5].style.marginBottom=h;
}else{G.childNodes[3].style.marginBottom=i;
G.childNodes[4].style.marginBottom=i;
G.childNodes[5].style.marginBottom=i;
}}}},tint:function(K,L){},_applyBaseImage:function(M,N){if(qx.core.Variant.isSet(t,l)){if(this.__tT){throw new Error("This decorator is already in-use. Modification is not possible anymore!");
}}
if(M){var R=this._resolveImageUrl(M);
var S=/(.*)(\.[a-z]+)$/.exec(R);
var Q=S[1];
var P=S[2];
var O=this.__tU={tl:Q+w+P,t:Q+x+P,tr:Q+d+P,bl:Q+p+P,b:Q+r+P,br:Q+y+P,l:Q+c+P,c:Q+n+P,r:Q+v+P};
this.__tV=this._computeEdgeSizes(O);
}},_resolveImageUrl:function(T){return qx.util.AliasManager.getInstance().resolve(T);
},_computeEdgeSizes:function(U){var V=qx.util.ResourceManager.getInstance();
return {top:V.getImageHeight(U.t),bottom:V.getImageHeight(U.b),left:V.getImageWidth(U.l),right:V.getImageWidth(U.r)};
}},destruct:function(){this.__tT=this.__tU=this.__tV=null;
}});
})();


qx.$$loader.init();


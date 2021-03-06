/**
 * @description 对console的封装支持开关，方便线上调试/避免上线后忘记去掉console信息
 * @author panxinwu
 */
(function (global) {
  'use strict';

  /** @namespace _ */
  var _ = global._ || (global._ = {});
  var o2Log = {};
  //fixed to IE
  var methods = ["assert", "cd", "clear", "count", "countReset",
    "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed",
    "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd",
    "select", "table", "time", "timeEnd", "timeStamp", "timeline",
    "timelineEnd", "trace", "warn"];
  var length = methods.length;
  var console = (window.console = window.console || {});
  var method;
  var noop = function () { };
  while (length--) {
    method = methods[length];
    // define undefined methods as noops to prevent errors
    if (!console[method])
      console[method] = noop;
  }
  //URL是否远程开启
  var urlDebug = getUrlParams(window.location.href);
  o2Log = function (arg) {
    this.debug = urlDebug;
  }
  o2Log.prototype = {
    log: function (obj) {
      if (this.debug) {
        console.log(obj);
      }
    },
    warn: function (obj) {
      if (this.debug) {
        console.warn(obj);
      }
    },
    error: function (obj) {
      if (this.debug) {
        console.error(obj);
      }
    },
    debug: function (obj) {
      if (this.debug) {
        console.debug(obj);
      }
    },
    info: function (obj) {
      if (this.debug) {
        console.debug(obj);
      }
    }
  };
  //错误上报
  o2Log.prototype.errorReport = function (api, message) {
    //Todo
  };
  /**
   * 过滤URL中debug参数
   * @param url
   * @returns {true|false}
   */
  function getUrlParams(url) {
    var result = false
      , params = url.split('?')[1];
    if (!params) {
      result = false;
    } else {
      params = params.split('#')[0];
      if (!params) {
        result = false;
      } else {
        params = params.split('&');
        for (var i = 0, j = params.length; i < j; i++) {
          var param = params[i].split('=');
          if (param.length !== 2) {
            result = false;
          } else if (param[0] === 'debug' && param[1] === 'true') {
            result = true;
          } else {
            result = false;
          }
        }
      }
    }
    return result;
  };

  /** @memberOf _
   @example
    var console = seajs.require('console');
    console.log('log');
    console.warn('warn');
    console.error('error');
    console.debug('debug');
    console.info('info');
    //@使用&远程开启 window.locaiton.href?debug=true
   */
  _.console = new o2Log();
})(window, undefined);
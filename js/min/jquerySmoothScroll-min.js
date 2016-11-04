!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t("object"==typeof module&&module.exports?require("jquery"):jQuery)}(function($){var t="2.0.1",e={},l={exclude:[],excludeWithin:[],offset:0,direction:"top",delegateSelector:null,scrollElement:null,scrollTarget:null,beforeScroll:function(){},afterScroll:function(){},easing:"swing",speed:400,autoCoefficient:2,preventDefault:!0},o=function(t){var e=[],l=!1,o=t.dir&&"left"===t.dir?"scrollLeft":"scrollTop";return this.each(function(){var t=$(this);if(this!==document&&this!==window)return!document.scrollingElement||this!==document.documentElement&&this!==document.body?void(t[o]()>0?e.push(this):(t[o](1),l=t[o]()>0,l&&e.push(this),t[o](0))):(e.push(document.scrollingElement),!1)}),e.length||this.each(function(){this===document.documentElement&&"smooth"===$(this).css("scrollBehavior")&&(e=[this]),e.length||"BODY"!==this.nodeName||(e=[this])}),"first"===t.el&&e.length>1&&(e=[e[0]]),e};$.fn.extend({scrollable:function(t){var e=o.call(this,{dir:t});return this.pushStack(e)},firstScrollable:function(t){var e=o.call(this,{el:"first",dir:t});return this.pushStack(e)},smoothScroll:function(t,e){if(t=t||{},"options"===t)return e?this.each(function(){var t=$(this),l=$.extend(t.data("ssOpts")||{},e);$(this).data("ssOpts",l)}):this.first().data("ssOpts");var l=$.extend({},$.fn.smoothScroll.defaults,t),o=function(t){var e=function(t){return t.replace(/(:|\.|\/)/g,"\\$1")},o=this,n=$(this),s=$.extend({},l,n.data("ssOpts")||{}),r=l.exclude,i=s.excludeWithin,c=0,a=0,f=!0,h={},u=$.smoothScroll.filterPath(location.pathname),d=$.smoothScroll.filterPath(o.pathname),m=location.hostname===o.hostname||!o.hostname,p=s.scrollTarget||d===u,g=e(o.hash);if(g&&!$(g).length&&(f=!1),s.scrollTarget||m&&p&&g){for(;f&&c<r.length;)n.is(e(r[c++]))&&(f=!1);for(;f&&a<i.length;)n.closest(i[a++]).length&&(f=!1)}else f=!1;f&&(s.preventDefault&&t.preventDefault(),$.extend(h,s,{scrollTarget:s.scrollTarget||g,link:o}),$.smoothScroll(h))};return null!==t.delegateSelector?this.off("click.smoothscroll",t.delegateSelector).on("click.smoothscroll",t.delegateSelector,o):this.off("click.smoothscroll").on("click.smoothscroll",o),this}}),$.smoothScroll=function(t,l){if("options"===t&&"object"==typeof l)return $.extend(e,l);var o,n,s,r,i,c=0,a="offset",f="scrollTop",h={},u={};"number"==typeof t?(o=$.extend({link:null},$.fn.smoothScroll.defaults,e),s=t):(o=$.extend({link:null},$.fn.smoothScroll.defaults,t||{},e),o.scrollElement&&(a="position","static"===o.scrollElement.css("position")&&o.scrollElement.css("position","relative"))),f="left"===o.direction?"scrollLeft":f,o.scrollElement?(n=o.scrollElement,/^(?:HTML|BODY)$/.test(n[0].nodeName)||(c=n[f]())):n=$("html, body").firstScrollable(o.direction),o.beforeScroll.call(n,o),s="number"==typeof t?t:l||$(o.scrollTarget)[a]()&&$(o.scrollTarget)[a]()[o.direction]||0,h[f]=s+c+o.offset,r=o.speed,"auto"===r&&(i=Math.abs(h[f]-n[f]()),r=i/o.autoCoefficient),u={duration:r,easing:o.easing,complete:function(){o.afterScroll.call(o.link,o)}},o.step&&(u.step=o.step),n.length?n.stop().animate(h,u):o.afterScroll.call(o.link,o)},$.smoothScroll.version=t,$.smoothScroll.filterPath=function(t){return t=t||"",t.replace(/^\//,"").replace(/(?:index|default).[a-zA-Z]{3,4}$/,"").replace(/\/$/,"")},$.fn.smoothScroll.defaults=l});
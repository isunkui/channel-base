define("//misc.360buyimg.com/mtd/pc/components/parallaxmouse/1.0.0/parallaxmouse.js",[],function(){"use strict";var t=_.Class.extend({construct:function(t){$.extend(this,{container:null,elementSelector:null,magnification:.1},t),this.$container=$(this.container),this.$elementSelector=$(this.elementSelector),this.init()},init:function(){this.initElements(),this.initEvent()},initElements:function(){return this.center={x:Math.floor(this.$container.width()/2),y:Math.floor(this.$container.height()/2)},this.elemPosition={left:parseInt(this.$elementSelector.css("left"),10),top:parseInt(this.$elementSelector.css("top"),10)},this},initEvent:function(){return $("body").delegate(this.container,"mousemove",$.proxy(this.mousemove,this)),this},mousemove:function(t){var e={x:t.pageX,y:t.pageY},i=this.elemPosition.top+Math.floor((this.center.y-e.y)*this.magnification),n=this.elemPosition.left+Math.floor((this.center.x-e.x)*this.magnification);return this.render({top:i,left:n}),this},render:function(t){return this.$elementSelector.css({top:t.top,left:t.left}),this},destroy:function(){this.unbind(),this.$container.remove()},unbind:function(){return $("body").undelegate(this.container,"mousemove"),this}});return t});
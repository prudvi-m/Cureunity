/*
jQWidgets v17.0.1 (2023-Oct)
Copyright (c) 2011-2023 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function(a){a.jqx.jqxWidget("jqxTooltip","",{});a.extend(a.jqx._jqxTooltip.prototype,{defineInstance:function(){var b={width:"auto",height:"auto",position:"default",enableBrowserBoundsDetection:true,content:"",left:0,top:0,absolutePositionX:0,absolutePositionY:0,trigger:"hover",showDelay:100,autoHide:true,autoHideDelay:3000,closeOnClick:true,disabled:false,animationShowDelay:200,animationHideDelay:"fast",showArrow:true,name:"",opacity:0.9,rtl:false,_isOpen:false,selector:null,opening:null,value:null,_eventsMap:{mousedown:a.jqx.mobile.getTouchEventName("touchstart"),mouseup:a.jqx.mobile.getTouchEventName("touchend")},events:["open","close","opening","closing"]};if(this===a.jqx._jqxTooltip.prototype){return b}a.extend(true,this,b);return b},createInstance:function(){this._isTouchDevice=a.jqx.mobile.isTouchDevice();var d=a.data(document.body,"_tooltipIDArray"+this.name);if(!d){this.IDArray=[];a.data(document.body,"_tooltipIDArray"+this.name,this.IDArray)}else{this.IDArray=d}var c=this._generatekey();var b="jqxtooltip"+c;this.IDArray.push({tooltipID:b,tooltipHost:this.host});var f=document.createElement("div");f.setAttribute("id",b);f.innerHTML='<div id="'+b+'Main"><div id="'+b+'Text"></div></div><div id="'+b+'Arrow"></div>';if(a.jqx.browser.msie){f.className=this.toThemeProperty("jqx-noshadow")}document.body.appendChild(f);this._tooltip=f;this._tooltipHelper=a(f);if(this._tooltipHelper.initAnimate){this._tooltipHelper.initAnimate()}f.style.visibility="hidden";f.style.display="none";f.style.opacity=0;f.style.zIndex=99999;var e=document.getElementById(b+"Arrow");this._arrow=e;if(this.showArrow===false){e.style.visibility="hidden";e.style.display="none"}this._main=document.getElementById(b+"Main");this._text=document.getElementById(b+"Text");this._setTheme();this._setSize();this._setContent();if(this.disabled===false){this._trigger();if(this.closeOnClick===true){this._clickHide()}}},open:function(){if(arguments){if(arguments.length){if(arguments.length===2){this.position="absolute";this.left=arguments[0];this.top=arguments[1];this.absolutePositionX=arguments[0];this.absolutePositionY=arguments[1]}}}if(this.disabled===false&&this._id()!=="removed"){if(this.position==="mouse"||this.position==="mouseenter"){var b=this.position;this.position="default";this._raiseEvent("2");this._setPosition();this._animateShow();this.position=b}else{this._raiseEvent("2");this._setPosition();this._animateShow()}}},close:function(c){var e=this,f=a.jqx.browser.msie&&a.jqx.browser.version<9;if(typeof(c)==="object"&&a.isEmptyObject(c)){c=this.animationHideDelay}var b=parseFloat(e._tooltip.style.opacity);var d=function(){clearTimeout(e.autoHideTimeout);e._raiseEvent("3");e._tooltipHelper.animate({opacity:0},c,function(){e._tooltip.style.visibility="hidden";e._tooltip.style.display="none";e._raiseEvent("1");e._isOpen=false})};if(this._isOpen===false&&b!==0){d();return}if(this._isOpen===true&&(!f&&b===this.opacity||f)){d()}},destroy:function(){var c=this.IDArray.length;this._removeHandlers();this._tooltipHelper.remove();for(var b=0;b<c;b++){if(this.IDArray[b].tooltipHost===this.host){this.IDArray.splice(b,1);break}}this.host.removeData("jqxTooltip")},refresh:function(d){if(d===true){return}var c=this;if(this.rtl){c._text.className+=" "+c.toThemeProperty("jqx-rtl");c._text.style.direction="rtl"}var b=parseFloat(c._tooltip.style.opacity);if(this._id()!=="removed"){if(this.disabled===true&&this._isOpen===true&&b===this.opacity){clearTimeout(this.autoHideTimeout);this._tooltipHelper.animate({opacity:0},this.animationHideDelay,function(){c._tooltip.style.visibility="hidden";c._tooltip.style.display="none";c._isOpen=false})}this._setTheme();this._setContent();this._setSize();if(this.position!=="mouse"&&this.position!=="mouseenter"){this._setPosition()}this._removeHandlers();if(this.disabled===false){this._trigger();if(this.closeOnClick===true){this._clickHide()}}}},propertyChangedHandler:function(b,c,e,d){if(c==="content"){this.changeContentFlag=true}b.refresh()},_raiseEvent:function(g,e){var c=this.events[g];var f=new a.Event(c);f.owner=this;f.args=e;var b;try{b=this.host.trigger(f)}catch(d){}return b},_generatekey:function(){var b=function(){return(((1+Math.random())*65536)|0).toString(16).substring(1)};return(b()+b())},_id:function(){var d,b;var e=this.IDArray.length;for(var c=0;c<e;c++){if(this.IDArray[c].tooltipHost===this.host){d=this.IDArray[c].tooltipID;b="#"+d;break}}if(b===undefined){b="removed"}return b},_setPosition:function(d){var k=this,q=k._tooltip;if((this._isOpen===false&&parseFloat(q.style.opacity)===0)||this.changeContentFlag===true){if(!d&&(this.position==="mouse"||this.position==="mouseenter")){return}q.style.display="block";this.changeContentFlag=false;this.documentTop=document.documentElement.scrollTop;this.documentLeft=document.documentElement.scrollLeft;this.windowWidth=window.innerWidth;this.windowHeight=window.innerHeight;this.hostWidth=k.element.offsetWidth;this.hostHeight=k.element.offsetHeight;this.tooltipWidth=q.offsetWidth;this.tooltipHeight=q.offsetHeight;this.hostOffset=this.host.offset();this.tooltipOffset=k._tooltipHelper.offset();this.defaultOffset=30;this.offsetHorizontal=parseInt(this.left,10);this.offsetVertical=parseInt(this.top,10);var p=k._arrow,j=a(p),e=k._main,b=a(e),f=e.offsetWidth,n=e.offsetHeight,c;this.arrowSize=5;if(this.isMaterialized()){var m=window.getComputedStyle(this.element);var g=m.getPropertyValue("--jqx-tooltip-arrow-width");if(g){this.arrowSize=parseInt(g)}else{if(this.theme==="fluent"){this.arrowSize=8}}}this.tooltipMainOffset=b.offset();this.tooltipArrowOffset={};switch(this.position){case"top":this.tooltipOffset.left=this.hostOffset.left+this.hostWidth/2-this.tooltipWidth/2+this.offsetHorizontal;this.tooltipOffset.top=this.hostOffset.top-this.tooltipHeight-this.arrowSize+this.offsetVertical;this._detectBrowserBounds();this.tooltipMainOffset=b.offset();k._removeClass(p,k.toThemeProperty("jqx-tooltip-arrow-l-r"));p.className+=" "+k.toThemeProperty("jqx-tooltip-arrow-t-b");p.style.borderWidth=this.arrowSize+"px "+this.arrowSize+"px 0px";this.tooltipArrowOffset.left=this.tooltipMainOffset.left+(f/2-this.arrowSize);this.tooltipArrowOffset.top=this.tooltipMainOffset.top+n;j.offset({top:this.tooltipArrowOffset.top,left:this.tooltipArrowOffset.left});break;case"bottom":this.tooltipOffset.left=this.hostOffset.left+this.hostWidth/2-this.tooltipWidth/2+this.offsetHorizontal;this.tooltipOffset.top=this.hostOffset.top+this.hostHeight+this.arrowSize+this.offsetVertical;this._detectBrowserBounds();this.tooltipMainOffset=b.offset();k._removeClass(p,k.toThemeProperty("jqx-tooltip-arrow-l-r"));p.className+=" "+k.toThemeProperty("jqx-tooltip-arrow-t-b");p.style.borderWidth="0 "+this.arrowSize+"px "+this.arrowSize+"px";this.tooltipArrowOffset.left=this.tooltipMainOffset.left+(f/2-this.arrowSize);this.tooltipArrowOffset.top=this.tooltipMainOffset.top-this.arrowSize;j.offset({top:this.tooltipArrowOffset.top,left:this.tooltipArrowOffset.left});break;case"left":if(window.getComputedStyle){c=window.getComputedStyle(e)}else{c=e.currentStyle}this.tooltipOffset.left=this.hostOffset.left-this.tooltipWidth-this.arrowSize+this.offsetHorizontal-(parseInt(c.borderLeftWidth,10)+parseInt(c.borderRightWidth,10));this.tooltipOffset.top=this.hostOffset.top+this.hostHeight/2-this.tooltipHeight/2+this.offsetVertical;this._detectBrowserBounds();k._removeClass(p,k.toThemeProperty("jqx-tooltip-arrow-t-b"));p.className+=" "+k.toThemeProperty("jqx-tooltip-arrow-l-r");p.style.borderWidth=this.arrowSize+"px 0px "+this.arrowSize+"px "+this.arrowSize+"px";this.tooltipMainOffset=b.offset();this.tooltipArrowOffset.left=this.tooltipMainOffset.left+f;this.tooltipArrowOffset.top=this.tooltipMainOffset.top+(n)/2-this.arrowSize;j.offset({top:this.tooltipArrowOffset.top,left:this.tooltipArrowOffset.left});break;case"right":this.tooltipOffset.left=this.hostOffset.left+this.hostWidth+this.arrowSize+this.offsetHorizontal;this.tooltipOffset.top=this.hostOffset.top+this.hostHeight/2-this.tooltipHeight/2+this.offsetVertical;this.tooltipOffset.top=parseInt(this.tooltipOffset.top,10);this._detectBrowserBounds();this.tooltipMainOffset=b.offset();k._removeClass(p,k.toThemeProperty("jqx-tooltip-arrow-t-b"));p.className+=" "+k.toThemeProperty("jqx-tooltip-arrow-l-r");p.style.borderWidth=this.arrowSize+"px "+this.arrowSize+"px "+this.arrowSize+"px 0px";this.tooltipArrowOffset.left=(this.tooltipMainOffset.left-this.arrowSize);this.tooltipArrowOffset.top=this.tooltipMainOffset.top+(e.offsetHeight)/2-this.arrowSize;j.offset({top:this.tooltipArrowOffset.top,left:this.tooltipArrowOffset.left});break;case"top-left":this.tooltipOffset.left=this.hostOffset.left+this.defaultOffset-this.tooltipWidth+this.offsetHorizontal;this.tooltipOffset.top=this.hostOffset.top-this.tooltipHeight-this.arrowSize+this.offsetVertical;this._detectBrowserBounds();this.tooltipMainOffset=b.offset();k._removeClass(p,k.toThemeProperty("jqx-tooltip-arrow-l-r"));p.className+=" "+k.toThemeProperty("jqx-tooltip-arrow-t-b");p.style.borderWidth=this.arrowSize+"px "+this.arrowSize+"px  0px";this.tooltipArrowOffset.left=this.tooltipMainOffset.left+f-6*this.arrowSize;this.tooltipArrowOffset.top=this.tooltipMainOffset.top+n;j.offset({top:this.tooltipArrowOffset.top,left:this.tooltipArrowOffset.left});break;case"bottom-left":this.tooltipOffset.left=this.hostOffset.left+this.defaultOffset-this.tooltipWidth+this.offsetHorizontal;this.tooltipOffset.top=this.hostOffset.top+this.hostHeight+this.arrowSize+this.offsetVertical;this._detectBrowserBounds();this.tooltipMainOffset=b.offset();k._removeClass(p,k.toThemeProperty("jqx-tooltip-arrow-l-r"));p.className+=" "+k.toThemeProperty("jqx-tooltip-arrow-t-b");p.style.borderWidth="0 "+this.arrowSize+"px "+this.arrowSize+"px";this.tooltipArrowOffset.left=this.tooltipMainOffset.left+f-6*this.arrowSize;this.tooltipArrowOffset.top=this.tooltipMainOffset.top-this.arrowSize;j.offset({top:this.tooltipArrowOffset.top,left:this.tooltipArrowOffset.left});break;case"top-right":this.tooltipOffset.left=this.hostOffset.left+this.hostWidth-this.defaultOffset+this.offsetHorizontal;this.tooltipOffset.top=this.hostOffset.top-this.tooltipHeight-this.arrowSize+this.offsetVertical;this._detectBrowserBounds();this.tooltipMainOffset=b.offset();k._removeClass(p,k.toThemeProperty("jqx-tooltip-arrow-l-r"));p.className+=" "+k.toThemeProperty("jqx-tooltip-arrow-t-b");p.style.borderWidth=this.arrowSize+"px "+this.arrowSize+"px  0px";this.tooltipArrowOffset.left=this.tooltipMainOffset.left+4*this.arrowSize;this.tooltipArrowOffset.top=this.tooltipMainOffset.top+n;j.offset({top:this.tooltipArrowOffset.top,left:this.tooltipArrowOffset.left});break;case"bottom-right":this.tooltipOffset.left=this.hostOffset.left+this.hostWidth-this.defaultOffset+this.offsetHorizontal;this.tooltipOffset.top=this.hostOffset.top+this.hostHeight+this.arrowSize+this.offsetVertical;this._detectBrowserBounds();this.tooltipMainOffset=b.offset();k._removeClass(p,k.toThemeProperty("jqx-tooltip-arrow-l-r"));p.className+=" "+k.toThemeProperty("jqx-tooltip-arrow-t-b");p.style.borderWidth="0 "+this.arrowSize+"px "+this.arrowSize+"px";this.tooltipArrowOffset.left=this.tooltipMainOffset.left+4*this.arrowSize;this.tooltipArrowOffset.top=this.tooltipMainOffset.top-this.arrowSize;j.offset({top:this.tooltipArrowOffset.top,left:this.tooltipArrowOffset.left});break;case"absolute":k._tooltipHelper.offset({top:this.absolutePositionY,left:this.absolutePositionX});p.style.borderWidth="0px";break;case"mouse":if(this._isTouchDevice===false){switch(this.trigger){case"hover":if(this.mouseHoverTimeout){clearTimeout(this.mouseHoverTimeout)}this.mouseHoverTimeout=setTimeout(function(){k.tooltipOffset.left=d.pageX+10;k.tooltipOffset.top=d.pageY+10;k._detectBrowserBounds()},this.showDelay);break;case"click":this.tooltipOffset.left=d.pageX+10;this.tooltipOffset.top=d.pageY+10;this._detectBrowserBounds();break}}else{var o=d.pageX;var l=d.pageY;if(d.originalEvent){var h;if(d.originalEvent.touches&&d.originalEvent.touches.length){h=d.originalEvent.touches[0]}else{if(d.originalEvent.changedTouches&&d.originalEvent.changedTouches.length){h=d.originalEvent.changedTouches[0]}}if(h!==undefined){o=h.pageX;l=h.pageY}}this.tooltipOffset.left=o+10;this.tooltipOffset.top=l+10;this._detectBrowserBounds()}p.style.borderWidth="0px";break;case"mouseenter":var i={top:d.pageY,left:d.pageX};if((i.top<(this.hostOffset.top+10))&&(i.top>(this.hostOffset.top-10))){this.tooltipOffset.left=i.left-this.tooltipWidth/2;this.tooltipOffset.top=this.hostOffset.top-this.tooltipHeight-this.arrowSize;this._detectBrowserBounds();this.tooltipMainOffset=b.offset();k._removeClass(p,k.toThemeProperty("jqx-tooltip-arrow-l-r"));p.className+=" "+k.toThemeProperty("jqx-tooltip-arrow-t-b");p.style.borderWidth=this.arrowSize+"px "+this.arrowSize+"px  0px";this.tooltipArrowOffset.left=this.tooltipMainOffset.left+(f/2-this.arrowSize);this.tooltipArrowOffset.top=this.tooltipMainOffset.top+n;j.offset({top:this.tooltipArrowOffset.top,left:this.tooltipArrowOffset.left})}else{if((i.top<((this.hostOffset.top+this.hostHeight)+10))&&(i.top>((this.hostOffset.top+this.hostHeight)-10))){this.tooltipOffset.left=i.left-this.tooltipWidth/2;this.tooltipOffset.top=this.hostOffset.top+this.hostHeight+this.arrowSize;this._detectBrowserBounds();this.tooltipMainOffset=b.offset();k._removeClass(p,k.toThemeProperty("jqx-tooltip-arrow-l-r"));p.className+=" "+k.toThemeProperty("jqx-tooltip-arrow-t-b");p.style.borderWidth="0 "+this.arrowSize+"px "+this.arrowSize+"px";this.tooltipArrowOffset.left=this.tooltipMainOffset.left+(f/2-this.arrowSize);this.tooltipArrowOffset.top=this.tooltipMainOffset.top-this.arrowSize;j.offset({top:this.tooltipArrowOffset.top,left:this.tooltipArrowOffset.left})}else{if((i.left<(this.hostOffset.left+10))&&(i.left>(this.hostOffset.left-10))){if(window.getComputedStyle){c=window.getComputedStyle(e)}else{c=e.currentStyle}this.tooltipOffset.left=this.hostOffset.left-this.tooltipWidth-this.arrowSize-(parseInt(c.borderLeftWidth,10)+parseInt(c.borderRightWidth,10));this.tooltipOffset.top=i.top-this.tooltipHeight/2;this._detectBrowserBounds();this.tooltipMainOffset=b.offset();k._removeClass(p,k.toThemeProperty("jqx-tooltip-arrow-t-b"));p.className+=" "+k.toThemeProperty("jqx-tooltip-arrow-l-r");p.style.borderWidth=this.arrowSize+"px 0px "+this.arrowSize+"px "+this.arrowSize+"px";this.tooltipMainOffset=b.offset();this.tooltipArrowOffset.left=this.tooltipMainOffset.left+f;this.tooltipArrowOffset.top=this.tooltipMainOffset.top+(n)/2-this.arrowSize;j.offset({top:this.tooltipArrowOffset.top,left:this.tooltipArrowOffset.left})}else{if((i.left<(this.hostOffset.left+this.hostWidth+10))&&(i.left>(this.hostOffset.left+this.hostWidth-10))){this.tooltipOffset.left=this.hostOffset.left+this.hostWidth+this.arrowSize;this.tooltipOffset.top=i.top-this.tooltipHeight/2;this._detectBrowserBounds();this.tooltipMainOffset=b.offset();k._removeClass(p,k.toThemeProperty("jqx-tooltip-arrow-t-b"));p.className+=" "+k.toThemeProperty("jqx-tooltip-arrow-l-r");p.style.borderWidth=this.arrowSize+"px "+this.arrowSize+"px "+this.arrowSize+"px 0px";this.tooltipMainOffset=b.offset();this.tooltipArrowOffset.left=(this.tooltipMainOffset.left-this.arrowSize);this.tooltipArrowOffset.top=this.tooltipMainOffset.top+(n)/2-this.arrowSize;j.offset({top:this.tooltipArrowOffset.top,left:this.tooltipArrowOffset.left})}}}}break;case"default":this.tooltipOffset.left=this.hostOffset.left+this.hostWidth-this.defaultOffset;this.tooltipOffset.top=this.hostOffset.top+this.hostHeight+this.arrowSize;this._detectBrowserBounds();this.tooltipMainOffset=b.offset();k._removeClass(p,k.toThemeProperty("jqx-tooltip-arrow-l-r"));p.className+=" "+k.toThemeProperty("jqx-tooltip-arrow-t-b");p.style.borderWidth="0 "+this.arrowSize+"px "+this.arrowSize+"px";this.tooltipArrowOffset.left=this.tooltipMainOffset.left+4*this.arrowSize;this.tooltipArrowOffset.top=this.tooltipMainOffset.top-this.arrowSize;j.offset({top:this.tooltipArrowOffset.top,left:this.tooltipArrowOffset.left});break}}},_setContent:function(){this._text.innerHTML=this.content},opened:function(){return this._isOpen&&this.host.css("display")=="block"&&this.host.css("visibility")=="visible"},_animateShow:function(){this._closeAll();clearTimeout(this.autoHideTimeout);var b=parseFloat(this._tooltip.style.opacity);if(this._isOpen===false&&b===0){var c=this;c._tooltip.style.visibility="visible";c._tooltip.style.display="block";c._tooltip.style.opacity=0;if(this.opening){var d=this.opening(this);if(d===false){return}}c._tooltipHelper.animate({opacity:this.opacity},this.animationShowDelay,function(){c._raiseEvent("0");c._isOpen=true;c.openedTooltip=c;a.data(document.body,"_openedTooltip"+c.name,c);if(c.autoHideTimeout){clearTimeout(c.autoHideTimeout)}if(c.autoHideDelay>0&&c.autoHide===true){c.autoHideTimeout=setTimeout(function(){c._autoHide()},c.autoHideDelay)}})}},_trigger:function(){if(this._id()!=="removed"){var c=this;var b=this.host;if(this.selector){b=a("#"+this.selector)}if(this._isTouchDevice===false){switch(this.trigger){case"hover":if(this.position==="mouse"){this.addHandler(b,"mousemove.tooltip",function(d){if(c._enterFlag===1){c._raiseEvent("2");c._setPosition(d);clearTimeout(c.hoverShowTimeout);c.hoverShowTimeout=setTimeout(function(){c._animateShow();c._enterFlag=0},c.showDelay)}});this.addHandler(b,"mouseenter.tooltip",function(){if(c._leaveFlag!==0){c._enterFlag=1}});this.addHandler(b,"mouseleave.tooltip",function(f){c._leaveFlag=1;clearTimeout(c.hoverShowTimeout);var g=c._tooltipHelper.offset();var e=c._tooltip.offsetWidth;var d=c._tooltip.offsetHeight;if(parseInt(f.pageX,10)<parseInt(g.left,10)||parseInt(f.pageX,10)>parseInt(g.left,10)+e){c.close()}if(parseInt(f.pageY,10)<parseInt(g.top,10)||parseInt(f.pageY,10)>parseInt(g.top,10)+d){c.close()}});this.addHandler(c._tooltipHelper,"mouseleave.tooltip",function(d){c._checkBoundariesAuto(d);if(c._clickFlag!==0&&c._autoFlag!==0){c._leaveFlag=0}else{c._leaveFlag=1;c.close()}})}else{this.addHandler(b,"mouseenter.tooltip",function(d){clearTimeout(c.hoverShowTimeout);c.hoverShowTimeout=setTimeout(function(){c._raiseEvent("2");c._setPosition(d);c._animateShow()},c.showDelay)});this.addHandler(b,"mouseleave.tooltip",function(g){c._leaveFlag=1;clearTimeout(c.hoverShowTimeout);if(c.autoHide){var e=g.pageX;var k=g.pageY;var h=c._tooltipHelper.offset();var j=h.left;var i=h.top;var f=c._tooltip.offsetWidth;var d=c._tooltip.offsetHeight;if(parseInt(e,10)<parseInt(j,10)||parseInt(e,10)>parseInt(j,10)+f||parseInt(k,10)<parseInt(i,10)||parseInt(k,10)>parseInt(i,10)+d){c.close()}}});this.addHandler(c._tooltipHelper,"mouseleave.tooltip",function(d){c._checkBoundariesAuto(d);if(c._clickFlag!==0&&c._autoFlag!==0){c._leaveFlag=0}else{c._leaveFlag=1;if(c.autoHide){c.close()}}})}break;case"click":this.addHandler(b,"click.tooltip",function(d){if(c.position==="mouseenter"){c.position="mouse"}c._raiseEvent("2");c._setPosition(d);c._animateShow()});break;case"none":break}}else{if(this.trigger!=="none"){this.addHandler(b,"touchstart.tooltip",function(d){if(c.position==="mouseenter"){c.position="mouse"}c._raiseEvent("2");c._setPosition(d);c._animateShow()})}}}},_autoHide:function(){var c=this;var b=parseFloat(c._tooltip.style.opacity);if(this.autoHide===true&&this._isOpen===true&&b>=this.opacity){c._raiseEvent("3");c._tooltipHelper.animate({opacity:0},c.animationHideDelay,function(){c._tooltip.style.visibility="hidden";c._tooltip.style.display="none";c._raiseEvent("1");c._isOpen=false})}},_clickHide:function(){var b=this;this.addHandler(b._tooltipHelper,"click.tooltip",function(c){b._checkBoundariesClick(c);b.close()})},_setSize:function(){var b=this;b._tooltip.style.width=b._toPx(b.width);b._tooltip.style.height=b._toPx(b.height)},resize:function(){this._setSize()},_setTheme:function(){var b=this;if(b._tooltip.className.indexOf("jqx-tooltip")===-1){b._tooltip.className+=" "+b.toThemeProperty("jqx-tooltip jqx-popup");b._main.className+=" "+b.toThemeProperty("jqx-widget jqx-fill-state-normal jqx-tooltip-main");b._text.className+=" "+b.toThemeProperty("jqx-widget jqx-fill-state-normal jqx-tooltip-text");if(b._arrow){b._arrow.className+=" "+b.toThemeProperty("jqx-widget jqx-fill-state-normal jqx-tooltip-arrow")}}},_initialPosition:function(){var b=this.position;this.position="default";this._setPosition();this.position=b},_detectBrowserBounds:function(){var b=this,c=b._tooltipHelper;if(this.enableBrowserBoundsDetection){if(this.tooltipOffset.top<this.documentTop&&this.tooltipOffset.left<0){c.offset({top:this.documentTop,left:this.documentLeft})}else{if(this.tooltipOffset.top<this.documentTop&&(this.tooltipOffset.left+this.tooltipWidth)>this.windowWidth+this.documentLeft){c.offset({top:this.documentTop,left:(this.windowWidth+this.documentLeft-this.tooltipWidth)})}else{if(this.tooltipOffset.top<this.documentTop){c.offset({top:this.documentTop,left:this.tooltipOffset.left})}else{if((this.tooltipOffset.top+this.tooltipHeight)>(this.windowHeight+this.documentTop)&&this.tooltipOffset.left<0){c.offset({top:(this.windowHeight+this.documentTop-this.tooltipHeight),left:this.documentLeft})}else{if((this.tooltipOffset.top+this.tooltipHeight)>(this.windowHeight+this.documentTop)&&(this.tooltipOffset.left+this.tooltipWidth)>this.windowWidth+this.documentLeft){c.offset({top:(this.windowHeight+this.documentTop-this.tooltipHeight),left:(this.windowWidth+this.documentLeft-this.tooltipWidth)})}else{if((this.tooltipOffset.top+this.tooltipHeight)>(this.windowHeight+this.documentTop)){c.offset({top:(this.windowHeight+this.documentTop-this.tooltipHeight),left:this.tooltipOffset.left})}else{if(this.tooltipOffset.left<0){c.offset({top:this.tooltipOffset.top,left:this.documentLeft})}else{if((this.tooltipOffset.left+this.tooltipWidth)>this.windowWidth+this.documentLeft){c.offset({top:this.tooltipOffset.top,left:(this.windowWidth+this.documentLeft-this.tooltipWidth)})}else{c.offset({top:this.tooltipOffset.top,left:this.tooltipOffset.left})}}}}}}}}}else{c.offset({top:this.tooltipOffset.top,left:this.tooltipOffset.left})}},_checkBoundaries:function(b){if(b.pageX>=this.hostOffset.left&&b.pageX<=(this.hostOffset.left+this.hostWidth)&&b.pageY>=this.hostOffset.top&&b.pageY<=(this.hostOffset.top+this.hostHeight)){return true}else{return false}},_checkBoundariesClick:function(b){if(this._checkBoundaries(b)){this._clickFlag=1}else{this._clickFlag=0}},_checkBoundariesAuto:function(b){if(this._checkBoundaries(b)){this._autoFlag=1}else{this._autoFlag=0}},_removeHandlers:function(){this.removeHandler(this.host,"mouseenter.tooltip");this.removeHandler(this.host,"mousemove.tooltip");this.removeHandler(this.host,"mouseleave.tooltip");this.removeHandler(this.host,"click.tooltip");this.removeHandler(this.host,"touchstart.tooltip");this.removeHandler(this._tooltipHelper,"click.tooltip");this.removeHandler(this._tooltipHelper,"mouseleave.tooltip")},_closeAll:function(){for(var c=0;c<this.IDArray.length;c++){var d=this.IDArray[c].tooltipID,b=document.getElementById(d);if(b!==this._tooltip){b.style.opacity=0;b.style.visibility="hidden";b.style.display="none";this._isOpen=false}}},_toPx:function(b){if(typeof b==="number"){return b+"px"}else{return b}},_removeClass:function(c,b){a(c).removeClass(b)}})})(jqxBaseFramework);


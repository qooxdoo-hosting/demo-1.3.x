qx.$$packageData['c52a184b8dc7']={"locales":{},"resources":{"feedreader/images/combined/icons16.png":[16,96,"png","feedreader"],"qx/icon/Tango/16/actions/dialog-cancel.png":[16,16,"png","qx","feedreader/images/combined/icons16.png",0,-64],"qx/icon/Tango/16/actions/dialog-ok.png":[16,16,"png","qx","feedreader/images/combined/icons16.png",0,0],"qx/icon/Tango/16/apps/preferences-locale.png":[16,16,"png","qx","feedreader/images/combined/icons16.png",0,-48],"qx/icon/Tango/16/apps/preferences-theme.png":[16,16,"png","qx","feedreader/images/combined/icons16.png",0,-32]},"translations":{}};

qx.Part.$$notifyLoad("c52a184b8dc7", function() {
(function(){var a="qx.ui.window.IDesktop";
qx.Interface.define(a,{members:{setWindowManager:function(b){this.assertInterface(b,qx.ui.window.IWindowManager);
},getWindows:function(){},supportsMaximize:function(){},blockContent:function(c){this.assertInteger(c);
},unblockContent:function(){},isContentBlocked:function(){}}});
})();
(function(){var l="move",k="Boolean",j="mouseup",i="mousedown",h="losecapture",g="qx.ui.core.MMovable",f="__Y",d="__ba",c="mousemove",b="maximized",a="move-frame";
qx.Mixin.define(g,{properties:{movable:{check:k,init:true},useMoveFrame:{check:k,init:false}},members:{__Y:null,__ba:null,__bb:null,__bc:null,__bd:null,__be:null,__bf:null,__bg:false,__bh:null,__bi:0,_activateMoveHandle:function(m){if(this.__Y){throw new Error("The move handle could not be redefined!");
}this.__Y=m;
m.addListener(i,this._onMoveMouseDown,this);
m.addListener(j,this._onMoveMouseUp,this);
m.addListener(c,this._onMoveMouseMove,this);
m.addListener(h,this.__bm,this);
},__bj:function(){var n=this.__ba;

if(!n){n=this.__ba=new qx.ui.core.Widget();
n.setAppearance(a);
n.exclude();
qx.core.Init.getApplication().getRoot().add(n);
}return n;
},__bk:function(){var location=this.getContainerLocation();
var p=this.getBounds();
var o=this.__bj();
o.setUserBounds(location.left,location.top,p.width,p.height);
o.show();
o.setZIndex(this.getZIndex()+1);
},__bl:function(e){var r=this.__bb;
var u=Math.max(r.left,Math.min(r.right,e.getDocumentLeft()));
var t=Math.max(r.top,Math.min(r.bottom,e.getDocumentTop()));
var q=this.__bc+u;
var s=this.__bd+t;
return {viewportLeft:q,viewportTop:s,parentLeft:q-this.__be,parentTop:s-this.__bf};
},_onMoveMouseDown:function(e){if(!this.getMovable()||this.hasState(b)){return;
}var parent=this.getLayoutParent();
var w=parent.getContentLocation();
var x=parent.getBounds();
if(qx.Class.implementsInterface(parent,qx.ui.window.IDesktop)){if(!parent.isContentBlocked()){this.__bg=true;
this.__bh=parent.getBlockerColor();
this.__bi=parent.getBlockerOpacity();
parent.setBlockerColor(null);
parent.setBlockerOpacity(1);
parent.blockContent(this.getZIndex()-1);
}}this.__bb={left:w.left,top:w.top,right:w.left+x.width,bottom:w.top+x.height};
var v=this.getContainerLocation();
this.__be=w.left;
this.__bf=w.top;
this.__bc=v.left-e.getDocumentLeft();
this.__bd=v.top-e.getDocumentTop();
this.addState(l);
this.__Y.capture();
if(this.getUseMoveFrame()){this.__bk();
}e.stop();
},_onMoveMouseMove:function(e){if(!this.hasState(l)){return;
}var y=this.__bl(e);

if(this.getUseMoveFrame()){this.__bj().setDomPosition(y.viewportLeft,y.viewportTop);
}else{this.setDomPosition(y.parentLeft,y.parentTop);
}e.stopPropagation();
},_onMoveMouseUp:function(e){if(!this.hasState(l)){return;
}this.removeState(l);
var parent=this.getLayoutParent();

if(qx.Class.implementsInterface(parent,qx.ui.window.IDesktop)){if(this.__bg){parent.unblockContent();
parent.setBlockerColor(this.__bh);
parent.setBlockerOpacity(this.__bi);
this.__bh=null;
this.__bi=0;
}}this.__Y.releaseCapture();
var z=this.__bl(e);
this.setLayoutProperties({left:z.parentLeft,top:z.parentTop});
if(this.getUseMoveFrame()){this.__bj().exclude();
}e.stopPropagation();
},__bm:function(e){if(!this.hasState(l)){return;
}this.removeState(l);
if(this.getUseMoveFrame()){this.__bj().exclude();
}}},destruct:function(){this._disposeObjects(d,f);
this.__bb=null;
}});
})();
(function(){var k="Boolean",j="resize",i="mousedown",h="w-resize",g="sw-resize",f="n-resize",d="resizableRight",c="ne-resize",b="se-resize",a="Integer",z="e-resize",y="resizableLeft",x="mousemove",w="move",v="shorthand",u="maximized",t="nw-resize",s="mouseout",r="qx.ui.core.MResizable",q="mouseup",o="losecapture",p="resize-frame",m="resizableBottom",n="s-resize",l="resizableTop";
qx.Mixin.define(r,{construct:function(){this.addListener(i,this.__bz,this,true);
this.addListener(q,this.__bA,this);
this.addListener(x,this.__bC,this);
this.addListener(s,this.__bD,this);
this.addListener(o,this.__bB,this);
var A=this.getContainerElement().getDomElement();

if(A==null){A=window;
}this.__bn=qx.event.Registration.getManager(A).getHandler(qx.event.handler.DragDrop);
},properties:{resizableTop:{check:k,init:true},resizableRight:{check:k,init:true},resizableBottom:{check:k,init:true},resizableLeft:{check:k,init:true},resizable:{group:[l,d,m,y],mode:v},resizeSensitivity:{check:a,init:5},useResizeFrame:{check:k,init:true}},members:{__bn:null,__bo:null,__bp:null,__bq:null,__br:null,__bs:null,__bt:null,RESIZE_TOP:1,RESIZE_BOTTOM:2,RESIZE_LEFT:4,RESIZE_RIGHT:8,__bu:function(){var B=this.__bo;

if(!B){B=this.__bo=new qx.ui.core.Widget();
B.setAppearance(p);
B.exclude();
qx.core.Init.getApplication().getRoot().add(B);
}return B;
},__bv:function(){var D=this.__bs;
var C=this.__bu();
C.setUserBounds(D.left,D.top,D.width,D.height);
C.show();
C.setZIndex(this.getZIndex()+1);
},__bw:function(e){var F=this.__bp;
var G=this.getSizeHint();
var J=this.__bt;
var I=this.__bs;
var E=I.width;
var H=I.height;
var L=I.left;
var top=I.top;
var K;

if((F&this.RESIZE_TOP)||(F&this.RESIZE_BOTTOM)){K=Math.max(J.top,Math.min(J.bottom,e.getDocumentTop()))-this.__br;

if(F&this.RESIZE_TOP){H-=K;
}else{H+=K;
}
if(H<G.minHeight){H=G.minHeight;
}else if(H>G.maxHeight){H=G.maxHeight;
}
if(F&this.RESIZE_TOP){top+=I.height-H;
}}
if((F&this.RESIZE_LEFT)||(F&this.RESIZE_RIGHT)){K=Math.max(J.left,Math.min(J.right,e.getDocumentLeft()))-this.__bq;

if(F&this.RESIZE_LEFT){E-=K;
}else{E+=K;
}
if(E<G.minWidth){E=G.minWidth;
}else if(E>G.maxWidth){E=G.maxWidth;
}
if(F&this.RESIZE_LEFT){L+=I.width-E;
}}return {viewportLeft:L,viewportTop:top,parentLeft:I.bounds.left+L-I.left,parentTop:I.bounds.top+top-I.top,width:E,height:H};
},__bx:{1:f,2:n,4:h,8:z,5:t,6:g,9:c,10:b},__by:function(e){var O=this.getContentLocation();
var M=this.getResizeSensitivity();
var Q=e.getDocumentLeft();
var P=e.getDocumentTop();
var N=0;

if(this.getResizableTop()&&Math.abs(O.top-P)<M){N+=this.RESIZE_TOP;
}else if(this.getResizableBottom()&&Math.abs(O.bottom-P)<M){N+=this.RESIZE_BOTTOM;
}
if(this.getResizableLeft()&&Math.abs(O.left-Q)<M){N+=this.RESIZE_LEFT;
}else if(this.getResizableRight()&&Math.abs(O.right-Q)<M){N+=this.RESIZE_RIGHT;
}this.__bp=N;
},__bz:function(e){if(!this.__bp){return;
}this.addState(j);
this.__bq=e.getDocumentLeft();
this.__br=e.getDocumentTop();
var location=this.getContainerLocation();
var T=this.getBounds();
this.__bs={top:location.top,left:location.left,width:T.width,height:T.height,bounds:qx.lang.Object.clone(T)};
var parent=this.getLayoutParent();
var R=parent.getContentLocation();
var S=parent.getBounds();
this.__bt={left:R.left,top:R.top,right:R.left+S.width,bottom:R.top+S.height};
if(this.getUseResizeFrame()){this.__bv();
}this.capture();
e.stop();
},__bA:function(e){if(!this.hasState(j)){return;
}if(this.getUseResizeFrame()){this.__bu().exclude();
}var U=this.__bw(e);
this.setWidth(U.width);
this.setHeight(U.height);
if(this.getResizableLeft()||this.getResizableTop()){this.setLayoutProperties({left:U.parentLeft,top:U.parentTop});
}this.__bp=0;
this.removeState(j);
this.resetCursor();
this.getApplicationRoot().resetGlobalCursor();
this.releaseCapture();
e.stopPropagation();
},__bB:function(e){if(!this.__bp){return;
}this.resetCursor();
this.getApplicationRoot().resetGlobalCursor();
this.removeState(w);
if(this.getUseResizeFrame()){this.__bu().exclude();
}},__bC:function(e){if(this.hasState(j)){var Y=this.__bw(e);
if(this.getUseResizeFrame()){var W=this.__bu();
W.setUserBounds(Y.viewportLeft,Y.viewportTop,Y.width,Y.height);
}else{this.setWidth(Y.width);
this.setHeight(Y.height);
if(this.getResizableLeft()||this.getResizableTop()){this.setLayoutProperties({left:Y.parentLeft,top:Y.parentTop});
}}e.stopPropagation();
}else if(!this.hasState(u)&&!this.__bn.isSessionActive()){this.__by(e);
var ba=this.__bp;
var X=this.getApplicationRoot();

if(ba){var V=this.__bx[ba];
this.setCursor(V);
X.setGlobalCursor(V);
}else if(this.getCursor()){this.resetCursor();
X.resetGlobalCursor();
}}},__bD:function(e){if(this.getCursor()&&!this.hasState(j)){this.resetCursor();
this.getApplicationRoot().resetGlobalCursor();
}}},destruct:function(){if(this.__bo!=null&&!qx.core.ObjectRegistry.inShutDown){this.__bo.destroy();
this.__bo=null;
}this.__bn=null;
}});
})();
(function(){var a="qx.ui.window.IWindowManager";
qx.Interface.define(a,{members:{setDesktop:function(b){this.assertInterface(b,qx.ui.window.IDesktop);
},changeActiveWindow:function(c,d){},updateStack:function(){},bringToFront:function(e){this.assertInstance(e,qx.ui.window.Window);
},sendToBack:function(f){this.assertInstance(f,qx.ui.window.Window);
}}});
})();
(function(){var b="__X",a="qx.ui.window.Manager";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.ui.window.IWindowManager,members:{__X:null,setDesktop:function(c){this.__X=c;
this.updateStack();
},getDesktop:function(){return this.__X;
},changeActiveWindow:function(d,e){if(d){this.bringToFront(d);
d.setActive(true);
}
if(e){e.resetActive();
}},_minZIndex:1e5,updateStack:function(){qx.ui.core.queue.Widget.add(this);
},syncWidget:function(){this.__X.forceUnblockContent();
var f=this.__X.getWindows();
var h=this._minZIndex;
var m=h+f.length*2;
var j=h+f.length*4;
var k=null;

for(var i=0,l=f.length;i<l;i++){var g=f[i];
if(!g.isVisible()){continue;
}k=k||g;
if(g.isModal()){g.setZIndex(j);
this.__X.blockContent(j-1);
j+=2;
k=g;
}else if(g.isAlwaysOnTop()){g.setZIndex(m);
m+=2;
}else{g.setZIndex(h);
h+=2;
}if(!k.isModal()&&g.isActive()||g.getZIndex()>k.getZIndex()){k=g;
}}this.__X.setActiveWindow(k);
},bringToFront:function(n){var o=this.__X.getWindows();
var p=qx.lang.Array.remove(o,n);

if(p){o.push(n);
this.updateStack();
}},sendToBack:function(q){var r=this.__X.getWindows();
var s=qx.lang.Array.remove(r,q);

if(s){r.unshift(q);
this.updateStack();
}}},destruct:function(){this._disposeObjects(b);
}});
})();
(function(){var k="Boolean",j="qx.event.type.Event",i="captionbar",h="_applyCaptionBarChange",g="maximize-button",f="restore-button",d="minimize-button",c="close-button",b="maximized",a="execute",Q="pane",P="title",O="icon",N="statusbar-text",M="statusbar",L="String",K="normal",J="active",I="beforeClose",H="beforeMinimize",r="mousedown",s="changeStatus",p="changeIcon",q="excluded",n="dblclick",o="_applyActive",l="beforeRestore",m="minimize",t="changeModal",u="changeAlwaysOnTop",z="_applyShowStatusbar",y="_applyStatus",B="qx.ui.window.Window",A="changeCaption",D="focusout",C="beforeMaximize",w="maximize",G="restore",F="window",E="close",v="changeActive",x="minimized";
qx.Class.define(B,{extend:qx.ui.core.Widget,include:[qx.ui.core.MRemoteChildrenHandling,qx.ui.core.MRemoteLayoutHandling,qx.ui.core.MResizable,qx.ui.core.MMovable,qx.ui.core.MContentPadding],construct:function(R,S){qx.ui.core.Widget.call(this);
this._setLayout(new qx.ui.layout.VBox());
this._createChildControl(i);
this._createChildControl(Q);
if(S!=null){this.setIcon(S);
}
if(R!=null){this.setCaption(R);
}this._updateCaptionBar();
this.addListener(r,this._onWindowMouseDown,this,true);
this.addListener(D,this._onWindowFocusOut,this);
qx.core.Init.getApplication().getRoot().add(this);
this.initVisibility();
qx.ui.core.FocusHandler.getInstance().addRoot(this);
},statics:{DEFAULT_MANAGER_CLASS:qx.ui.window.Manager},events:{"beforeClose":j,"close":j,"beforeMinimize":j,"minimize":j,"beforeMaximize":j,"maximize":j,"beforeRestore":j,"restore":j},properties:{appearance:{refine:true,init:F},visibility:{refine:true,init:q},focusable:{refine:true,init:true},active:{check:k,init:false,apply:o,event:v},alwaysOnTop:{check:k,init:false,event:u},modal:{check:k,init:false,event:t},caption:{apply:h,event:A,nullable:true},icon:{check:L,nullable:true,apply:h,event:p,themeable:true},status:{check:L,nullable:true,apply:y,event:s},showClose:{check:k,init:true,apply:h,themeable:true},showMaximize:{check:k,init:true,apply:h,themeable:true},showMinimize:{check:k,init:true,apply:h,themeable:true},allowClose:{check:k,init:true,apply:h},allowMaximize:{check:k,init:true,apply:h},allowMinimize:{check:k,init:true,apply:h},showStatusbar:{check:k,init:false,apply:z}},members:{__V:null,__W:null,getChildrenContainer:function(){return this.getChildControl(Q);
},_forwardStates:{active:true,maximized:true},setLayoutParent:function(parent){{};
qx.ui.core.Widget.prototype.setLayoutParent.call(this,parent);
},_createChildControlImpl:function(T){var U;

switch(T){case M:U=new qx.ui.container.Composite(new qx.ui.layout.HBox());
this._add(U);
U.add(this.getChildControl(N));
break;
case N:U=new qx.ui.basic.Label();
U.setValue(this.getStatus());
break;
case Q:U=new qx.ui.container.Composite();
this._add(U,{flex:1});
break;
case i:var W=new qx.ui.layout.Grid();
W.setRowFlex(0,1);
W.setColumnFlex(1,1);
U=new qx.ui.container.Composite(W);
this._add(U);
U.addListener(n,this._onCaptionMouseDblClick,this);
this._activateMoveHandle(U);
break;
case O:U=new qx.ui.basic.Image(this.getIcon());
this.getChildControl(i).add(U,{row:0,column:0});
break;
case P:U=new qx.ui.basic.Label(this.getCaption());
U.setWidth(0);
U.setAllowGrowX(true);
var V=this.getChildControl(i);
V.add(U,{row:0,column:1});
break;
case d:U=new qx.ui.form.Button();
U.setFocusable(false);
U.addListener(a,this._onMinimizeButtonClick,this);
this.getChildControl(i).add(U,{row:0,column:2});
break;
case f:U=new qx.ui.form.Button();
U.setFocusable(false);
U.addListener(a,this._onRestoreButtonClick,this);
this.getChildControl(i).add(U,{row:0,column:3});
break;
case g:U=new qx.ui.form.Button();
U.setFocusable(false);
U.addListener(a,this._onMaximizeButtonClick,this);
this.getChildControl(i).add(U,{row:0,column:4});
break;
case c:U=new qx.ui.form.Button();
U.setFocusable(false);
U.addListener(a,this._onCloseButtonClick,this);
this.getChildControl(i).add(U,{row:0,column:6});
break;
}return U||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,T);
},_updateCaptionBar:function(){var Y;
var ba=this.getIcon();

if(ba){this.getChildControl(O).setSource(ba);
this._showChildControl(O);
}else{this._excludeChildControl(O);
}var X=this.getCaption();

if(X){this.getChildControl(P).setValue(X);
this._showChildControl(P);
}else{this._excludeChildControl(P);
}
if(this.getShowMinimize()){this._showChildControl(d);
Y=this.getChildControl(d);
this.getAllowMinimize()?Y.resetEnabled():Y.setEnabled(false);
}else{this._excludeChildControl(d);
}
if(this.getShowMaximize()){if(this.isMaximized()){this._showChildControl(f);
this._excludeChildControl(g);
}else{this._showChildControl(g);
this._excludeChildControl(f);
}Y=this.getChildControl(g);
this.getAllowMaximize()?Y.resetEnabled():Y.setEnabled(false);
}else{this._excludeChildControl(g);
this._excludeChildControl(f);
}
if(this.getShowClose()){this._showChildControl(c);
Y=this.getChildControl(c);
this.getAllowClose()?Y.resetEnabled():Y.setEnabled(false);
}else{this._excludeChildControl(c);
}},close:function(){if(!this.isVisible()){return;
}
if(this.fireNonBubblingEvent(I,qx.event.type.Event,[false,true])){this.hide();
this.fireEvent(E);
}},open:function(){this.show();
this.setActive(true);
this.focus();
},center:function(){var parent=this.getLayoutParent();

if(parent){var bc=parent.getBounds();

if(bc){var bd=this.getSizeHint();
var bb=Math.round((bc.width-bd.width)/2);
var top=Math.round((bc.height-bd.height)/2);

if(top<0){top=0;
}this.moveTo(bb,top);
return;
}}{};
},maximize:function(){if(this.isMaximized()){return;
}var parent=this.getLayoutParent();

if(parent!=null&&parent.supportsMaximize()){if(this.fireNonBubblingEvent(C,qx.event.type.Event,[false,true])){if(!this.isVisible()){this.open();
}var be=this.getLayoutProperties();
this.__W=be.left===undefined?0:be.left;
this.__V=be.top===undefined?0:be.top;
this.setLayoutProperties({left:null,top:null,edge:0});
this.addState(b);
this._updateCaptionBar();
this.fireEvent(w);
}}},minimize:function(){if(!this.isVisible()){return;
}
if(this.fireNonBubblingEvent(H,qx.event.type.Event,[false,true])){var bf=this.getLayoutProperties();
this.__W=bf.left===undefined?0:bf.left;
this.__V=bf.top===undefined?0:bf.top;
this.removeState(b);
this.hide();
this.fireEvent(m);
}},restore:function(){if(this.getMode()===K){return;
}
if(this.fireNonBubblingEvent(l,qx.event.type.Event,[false,true])){if(!this.isVisible()){this.open();
}var bg=this.__W;
var top=this.__V;
this.setLayoutProperties({edge:null,left:bg,top:top});
this.removeState(b);
this._updateCaptionBar();
this.fireEvent(G);
}},moveTo:function(bh,top){if(this.isMaximized()){return;
}this.setLayoutProperties({left:bh,top:top});
},isMaximized:function(){return this.hasState(b);
},getMode:function(){if(!this.isVisible()){return x;
}else{if(this.isMaximized()){return b;
}else{return K;
}}},_applyActive:function(bi,bj){if(bj){this.removeState(J);
}else{this.addState(J);
}},_getContentPaddingTarget:function(){return this.getChildControl(Q);
},_applyShowStatusbar:function(bk,bl){if(bk){this._showChildControl(M);
}else{this._excludeChildControl(M);
}},_applyCaptionBarChange:function(bm,bn){this._updateCaptionBar();
},_applyStatus:function(bo,bp){var bq=this.getChildControl(N,true);

if(bq){bq.setValue(bo);
}},_onWindowEventStop:function(e){e.stopPropagation();
},_onWindowMouseDown:function(e){this.setActive(true);
},_onWindowFocusOut:function(e){if(this.getModal()){return;
}var br=e.getRelatedTarget();

if(br!=null&&!qx.ui.core.Widget.contains(this,br)){this.setActive(false);
}},_onCaptionMouseDblClick:function(e){if(this.getAllowMaximize()){this.isMaximized()?this.restore():this.maximize();
}},_onMinimizeButtonClick:function(e){this.minimize();
this.getChildControl(d).reset();
},_onRestoreButtonClick:function(e){this.restore();
this.getChildControl(f).reset();
},_onMaximizeButtonClick:function(e){this.maximize();
this.getChildControl(g).reset();
},_onCloseButtonClick:function(e){this.close();
this.getChildControl(c).reset();
}}});
})();
(function(){var b="qx.ui.form.IBooleanForm",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"changeValue":a},members:{setValue:function(c){return arguments.length==1;
},resetValue:function(){},getValue:function(){}}});
})();
(function(){var r="Boolean",q="changeInvalidMessage",p="changeValue",o="String",n="_applyAllowEmptySelection",m="_applyInvalidMessage",k="qx.ui.form.RadioGroup",j="_applyValid",h="",g="changeRequired",c="changeValid",f="changeEnabled",d="__a",b="changeSelection",a="_applyEnabled";
qx.Class.define(k,{extend:qx.core.Object,implement:[qx.ui.core.ISingleSelection,qx.ui.form.IForm,qx.ui.form.IModelSelection],include:[qx.ui.core.MSingleSelectionHandling,qx.ui.form.MModelSelection],construct:function(s){qx.core.Object.call(this);
this.__a=[];
this.addListener(b,this.__b,this);

if(s!=null){this.add.apply(this,arguments);
}},properties:{enabled:{check:r,apply:a,event:f,init:true},wrap:{check:r,init:true},allowEmptySelection:{check:r,init:false,apply:n},valid:{check:r,init:true,apply:j,event:c},required:{check:r,init:false,event:g},invalidMessage:{check:o,init:h,event:q,apply:m},requiredInvalidMessage:{check:o,nullable:true,event:q}},members:{__a:null,getItems:function(){return this.__a;
},add:function(t){var u=this.__a;
var v;

for(var i=0,l=arguments.length;i<l;i++){v=arguments[i];

if(qx.lang.Array.contains(u,v)){continue;
}v.addListener(p,this._onItemChangeChecked,this);
u.push(v);
v.setGroup(this);
if(v.getValue()){this.setSelection([v]);
}}if(!this.isAllowEmptySelection()&&u.length>0&&!this.getSelection()[0]){this.setSelection([u[0]]);
}},remove:function(w){var x=this.__a;

if(qx.lang.Array.contains(x,w)){qx.lang.Array.remove(x,w);
if(w.getGroup()===this){w.resetGroup();
}w.removeListener(p,this._onItemChangeChecked,this);
if(w.getValue()){this.resetSelection();
}}},getChildren:function(){return this.__a;
},_onItemChangeChecked:function(e){var y=e.getTarget();

if(y.getValue()){this.setSelection([y]);
}else if(this.getSelection()[0]==y){this.resetSelection();
}},_applyInvalidMessage:function(z,A){for(var i=0;i<this.__a.length;i++){this.__a[i].setInvalidMessage(z);
}},_applyValid:function(B,C){for(var i=0;i<this.__a.length;i++){this.__a[i].setValid(B);
}},_applyEnabled:function(D,E){var F=this.__a;

if(D==null){for(var i=0,l=F.length;i<l;i++){F[i].resetEnabled();
}}else{for(var i=0,l=F.length;i<l;i++){F[i].setEnabled(D);
}}},_applyAllowEmptySelection:function(G,H){if(!G&&this.isSelectionEmpty()){this.resetSelection();
}},selectNext:function(){var I=this.getSelection()[0];
var K=this.__a;
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
var N=this.__a;
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
},__b:function(e){var P=e.getData()[0];
var O=e.getOldData()[0];

if(O){O.setValue(false);
}
if(P){P.setValue(true);
}}},destruct:function(){this._disposeArray(d);
}});
})();
(function(){var b="qx.ui.form.IRadioItem",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"changeValue":a},members:{setValue:function(c){},getValue:function(){},setGroup:function(d){this.assertInstance(d,qx.ui.form.RadioGroup);
},getGroup:function(){}}});
})();
(function(){var o="checked",n="keypress",m="Boolean",l="Right",k="_applyValue",j="changeValue",i="qx.ui.form.RadioButton",h="radiobutton",g="Left",f="qx.ui.form.RadioGroup",b="Down",d="_applyGroup",c="Up",a="execute";
qx.Class.define(i,{extend:qx.ui.form.Button,include:[qx.ui.form.MForm,qx.ui.form.MModelProperty],implement:[qx.ui.form.IRadioItem,qx.ui.form.IForm,qx.ui.form.IBooleanForm,qx.ui.form.IModel],construct:function(p){{};
qx.ui.form.Button.call(this,p);
this.addListener(a,this._onExecute);
this.addListener(n,this._onKeyPress);
},properties:{group:{check:f,nullable:true,apply:d},value:{check:m,nullable:true,event:j,apply:k,init:false},appearance:{refine:true,init:h},allowGrowX:{refine:true,init:false}},members:{_applyValue:function(q,r){q?this.addState(o):this.removeState(o);

if(q&&this.getFocusable()){this.focus();
}},_applyGroup:function(s,t){if(t){t.remove(this);
}
if(s){s.add(this);
}},_onExecute:function(e){this.setValue(true);
},_onKeyPress:function(e){var u=this.getGroup();

if(!u){return;
}
switch(e.getKeyIdentifier()){case g:case c:u.selectPrevious();
break;
case l:case b:u.selectNext();
break;
}}}});
})();
(function(){var t="language",s="execute",r="icon/16/apps/preferences-locale.png",q="Français",p="icon/16/apps/preferences-theme.png",o="feedreader.view.PreferenceWindow",n="English",m="Nederlands",l="Español",k="Italiano",d="Language",j="icon/16/actions/dialog-cancel.png",h="icon/16/actions/dialog-ok.png",c="Svenska",b="Preferences",g="Cancel",f="right",i="Deutsch",a="OK";
qx.Class.define(o,{extend:qx.ui.window.Window,construct:function(){qx.ui.window.Window.call(this,this.tr(b),p);
this.set({modal:true,showMinimize:false,showMaximize:false,allowMaximize:false});
this._addContent();
},members:{_addContent:function(){var A,B;
var y=new qx.ui.layout.VBox(10);
this.setLayout(y);
this.setMinWidth(350);
var E=new qx.ui.groupbox.GroupBox(this.tr(d),r);
E.setMinWidth(150);
E.setLayout(new qx.ui.layout.VBox());
this.add(E);
var G=new qx.ui.form.RadioGroup();
var C={"en":n,"de":i,"es":l,"fr":q,"it":k,"nl":m,"sv":c};
var F=qx.locale.Manager.getInstance();
{};
var D;

for(var u in C){D=new qx.ui.form.RadioButton(C[u]);
D.setUserData(t,u);
G.add(D);
E.add(D);
if(F.getLanguage()==u){G.setSelection([D]);
}}var x=new qx.ui.layout.HBox(10,f);
var v=new qx.ui.container.Composite(x);
var z=new qx.ui.form.Button(this.tr(g),j);
z.addListener(s,this.close,this);
var w=new qx.ui.form.Button(this.tr(a),h);
w.addListener(s,function(e){var H=G.getSelection()[0].getUserData(t);
qx.io.PartLoader.require([H],function(){qx.locale.Manager.getInstance().setLocale(H);
},this);
this.close();
},this);
v.add(z);
v.add(w);
this.add(v);
}}});
})();
(function(){var i="legend",h="frame",g="middle",f="top",d="resize",c="qx.ui.groupbox.GroupBox",b="groupbox",a="_applyLegendPosition";
qx.Class.define(c,{extend:qx.ui.core.Widget,include:[qx.ui.core.MRemoteChildrenHandling,qx.ui.core.MRemoteLayoutHandling,qx.ui.core.MContentPadding,qx.ui.form.MForm],implement:[qx.ui.form.IForm],construct:function(j,k){qx.ui.core.Widget.call(this);
this._setLayout(new qx.ui.layout.Canvas);
this._createChildControl(h);
this._createChildControl(i);
if(j!=null){this.setLegend(j);
}
if(k!=null){this.setIcon(k);
}},properties:{appearance:{refine:true,init:b},legendPosition:{check:[f,g],init:g,apply:a,themeable:true}},members:{_forwardStates:{invalid:true},_createChildControlImpl:function(l){var m;

switch(l){case h:m=new qx.ui.container.Composite();
this._add(m,{left:0,top:6,right:0,bottom:0});
break;
case i:m=new qx.ui.basic.Atom();
m.addListener(d,this._repositionFrame,this);
this._add(m);
break;
}return m||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,l);
},_getContentPaddingTarget:function(){return this.getChildControl(h);
},_applyLegendPosition:function(e){if(this.getChildControl(i).getBounds()){this._repositionFrame();
}},_repositionFrame:function(){var o=this.getChildControl(i);
var n=this.getChildControl(h);
var p=o.getBounds().height;
if(this.getLegendPosition()==g){n.setLayoutProperties({"top":Math.round(p/2)});
}else if(this.getLegendPosition()==f){n.setLayoutProperties({"top":p});
}},getChildrenContainer:function(){return this.getChildControl(h);
},setLegend:function(q){var r=this.getChildControl(i);

if(q!==null){r.setLabel(q);
r.show();
}else{r.exclude();
}},getLegend:function(){return this.getChildControl(i).getLabel();
},setIcon:function(s){this.getChildControl(i).setIcon(s);
},getIcon:function(){this.getChildControl(i).getIcon();
}}});
})();

});
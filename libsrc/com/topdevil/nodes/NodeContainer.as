package com.topdevil.nodes
{
	import flash.events.MouseEvent;
	import flash.events.TimerEvent;
	import flash.geom.Point;
	import flash.geom.Rectangle;
	import flash.utils.Timer;
	import flash.utils.setTimeout;
	
	import core.panels.node.BuffEditPanel;
	
	import fairygui.GComponent;
	import fairygui.GGraph;
	import fairygui.UIPackage;
	import fairygui.event.DropEvent;
	
	import org.osflash.signals.Signal;
	
	import rawui.UI_NodeContainer;
	import rawui.UI_NodeItem;
	
	public class NodeContainer extends UI_NodeContainer
	{

		private var lines:GComponent;
		public var nodes:GComponent;
		public var sel:GGraph;
		public static var ins:NodeContainer;
		public function NodeContainer()
		{
			super();
		}
		private var start:Point = new Point;
		public var lastClickOB:Object = {};
		private function onT(t:MouseEvent):void
		{
			var mouseX:Number = displayListContainer.stage.mouseX;
			var mouseY:Number = displayListContainer.stage.mouseY;
			xy = globalToLocal(mouseX,mouseY);
			if(t.type == MouseEvent.MOUSE_DOWN){
				if(t.target is NodeItem){
					return;
				}
				press = true;
				start.x = sel.x = xy.x;
				start.y = sel.y = xy.y;
				sel.width = 1;
				sel.height = 1;
				sel.visible = true;
			}
			if(t.type == MouseEvent.MOUSE_UP){
				press = false;
				setTimeout(selNode,1);
				lastClickOB = this;
			}
			if(t.type == MouseEvent.MOUSE_MOVE && press){
				if(sel.visible){
					var xx:Number = xy.x - start.x;
					var yy:Number = xy.y - start.y;
					sel.visible = true;
					if(xx<0){
						sel.x = start.x+xx;
						sel.width = -xx;
					}else{
						sel.x = start.x;
						sel.width=xx;
					}
					if(yy<0){
						sel.y = start.y+yy;
						sel.height = -yy;
					}else{
						sel.y = start.y;
						sel.height=yy;
					}
				}
			}
		}
		private var selArr:Vector.<NodeItem> = new Vector.<NodeItem>;
		private var selRect:Rectangle = new Rectangle();
		private function selNode():void
		{
			var len:int;
			if(!sel.visible){
				clearSel();
				return;
			}
			var addMode:Boolean;
			if(!Keys.inputs.isDoing("shift")){
				selArr = new Vector.<NodeItem>;
			}else{
				addMode = true;
			}
			len = nodes.numChildren;
			selRect = sel.displayObject.getBounds(this.displayListContainer);
			for (var i:int = 0; i < len; i++){
				var n:NodeItem = nodes.getChildAt(i) as NodeItem;
				xy.x = n.x+n.width*0.5;
				xy.y = n.y+n.height*0.5;
				if(selRect.containsPoint(xy)){
					var index:int = selArr.indexOf(n);
					if(index<0){
						selArr.push(n);
						n.on();
					}
				}else{
					if(!addMode)n.off();
				}
			}
			sel.visible = false;
		}
		
		private function clearSel():void
		{
			if(NodeContainer.ins.lastClickOB is NodeContainer){
				var len:uint = selArr.length;
				for (var j:int = 0; j < len; j++){
					selArr[j].off();
				}
				selArr.length = 0;
			}
		}
		override public function constructFromResource():void
		{
			super.constructFromResource();
			ins = this;
			lines = m_lines;
			nodes = m_nodes;
			sel = m_sel;
			addEventListener(MouseEvent.MOUSE_DOWN,onT,true);
			addEventListener(MouseEvent.MOUSE_MOVE,onT,true);
			addEventListener(MouseEvent.MOUSE_UP,onT,true);
			timer = new Timer(2);
			timer.addEventListener(TimerEvent.TIMER,onTimer);
		}
		private var xy:Point = new Point;
		private var tmp:Point = new Point;
		private var press:Boolean;
		public function onDrop(e:DropEvent):void
		{
			var mouseX:Number = displayListContainer.stage.mouseX;
			var mouseY:Number = displayListContainer.stage.mouseY;
			tmp.x = mouseX;
			tmp.y = mouseY;
			xy = displayListContainer.globalToLocal(tmp);
			var ob:Object = {};
				ob.nodetype = e.source.name;
				ob.x = xy.x-10;
				ob.y = xy.y-10;
				BuffEditPanel.ins.regKeys();
			add(ob);
		}
		public function create(type:String=""):NodeItem{
			var ob:Object = {};
				ob.nodetype = type;
				ob.x = 50+Math.round(100*Math.random());
				ob.y = 50+Math.round(100*Math.random());
				BuffEditPanel.ins.regKeys();
			return add(ob);
		}
		public var timer:Timer;
		public var timerTarget:NodeItem;
		public var hasMove:Boolean;
		public function onTimer(event:TimerEvent):void
		{
			var mouseX:Number = timerTarget.displayListContainer.stage.mouseX;
			var mouseY:Number = timerTarget.displayListContainer.stage.mouseY;
			if(timerTarget.press){
				hasMove = true;
				xy.x = mouseX-timerTarget.lastX;
				xy.y = mouseY-timerTarget.lastY;
				moveSelArr(xy);
			}
			timerTarget.lastX = mouseX;
			timerTarget.lastY = mouseY;
		}
		public function add(d:Object):NodeItem
		{
			var node:NodeItem = UIPackage.createObjectFromURL(UI_NodeItem.URL) as NodeItem;
			node.container = this;
			node.setData(d,sid);
			nodes.addChild(node);
			return node;
		}
		private var _sid:int;
		public var nodeClick:Signal = new Signal();
		public function get sid():int
		{
			return _sid++;
		}
		public function set sid(value:int):void
		{
			_sid = value;
		}
		public function removeAll():void
		{
			sid = 0;
			nodes.removeChildren();
			lines.displayListContainer.removeChildren();
			selArr.length = 0;
		}
		
		public function has(n:NodeItem):Boolean{
			var index:int = selArr.indexOf(n);
			return (index >= 0);
		}
		public function addSel(n:NodeItem):void{
			var index:int = selArr.indexOf(n);
			if(index<0){
				selArr.push(n);
				n.on();
			}
		}
		public function selOnly(n:NodeItem):void{
			unselAll();
			selArr.length = 0;
			selArr.push(n);
			n.on();
		}
		public function moveSelArr(xy:Point):void
		{
			var len:int = selArr.length;
			for (var i:int = 0; i < len; i++){
				var n:NodeItem = selArr[i];
				n.x += xy.x;
				n.y += xy.y;
				n.updateXYData();
				n.drawLine();
			}
		}
		public function unselAll():void
		{
			var len:int = selArr.length;
			for (var i:int = 0; i < len; i++){
				var n:NodeItem = selArr[i];
				n.off();
			}
		}
		public function getChildByID(s:*):NodeItem
		{
			var len:int = nodes.numChildren;
			for (var i:int = 0; i < len; i++){
				var n:NodeItem = nodes.getChildAt(i) as NodeItem;
				if(n.sid==s){
					return n;
				}
			}
			return null;
		}
		
		public function deleteSelArr():void
		{
			var len:int = selArr.length;
			for (var i:int = 0; i < len; i++){
				var n:NodeItem = selArr[i];
				n.dispose();
			}
			selArr.length = 0;
		}
		public function link():void
		{
			if(selArr && selArr.length>=2){
				selArr = selArr.sort(sortNode);
				var p:NodeItem = selArr.pop();
				for (var i:int = 0; i < selArr.length; i++) 
				{
					var n:NodeItem = selArr[i];
					n.removeFromFather();
					n.removeChildOf(p);//避免互为父对象
					p.addChildNode(n);
				}
				selArr.push(p);
			}
		}
		
		public function sortNode(a:NodeItem,b:NodeItem):int
		{
			if(a.y>b.y)return -1;
			if(a.y<b.y)return 1;
			return 0;
		}
		
		public function drawLine(me:NodeItem, p:NodeItem):void
		{
			var offx:Number = p.width*0.5;
			var offy:Number = p.height*0.5;
			var p0:Point = p.pos; p0.offset(offx,offy);
			
			offx = me.width*0.5;
			offy = me.height*0.5;
			var p2:Point = me.pos; p2.offset(offx,offy);
			
			if(!me.line){
				me.line = NodeLine.get();
			}
			me.line.reDraw(p0,p2,0x555555);
			lines.displayListContainer.addChild(me.line);
		}
	}
}
package com.topdevil.nodes
{
	import flash.events.MouseEvent;
	import flash.events.TimerEvent;
	import flash.geom.Point;
	import flash.utils.Timer;
	import flash.utils.setTimeout;
	
	import core.panels.node.BuffEditPanel;
	
	import fairygui.GLabel;
	
	import tools.GameMathUtil;

	public class NodeItem extends GLabel
	{
		private static var xy:Point = new Point;

		public function NodeItem()
		{
			super();
			addEventListener(MouseEvent.MOUSE_DOWN,onT);
			addEventListener(MouseEvent.MOUSE_UP,onT);
		}

		public var childs:Vector.<NodeItem>=new Vector.<NodeItem>();
		
		public var isOn:Boolean;
		public var saveParam:Object={};
		private var _father:NodeItem;
		public var press:Boolean;
		private var tmpChildids:Array;
		public var line:NodeLine;
		
		private var _pos:Point = new Point();
		public var lastX:Number;
		public var lastY:Number;
		public function get sid():int
		{
			return data.id;
		}
		public function set sid(v:int):void
		{
			data.id = v;
		}

		public function get pos():Point{
			_pos.x = x;
			_pos.y = y;
			return _pos;
		}

		public function addChildNode(sub:NodeItem):void
		{
			if(has(sub))return;
			sub.father = this;
			childs.push(sub);
			childs.sort(sortX);
		}
		public function connectChild():void
		{
			for (var i:int = 0; i < tmpChildids.length; i++) 
			{
				var c:NodeItem = parent.getChild(tmpChildids[i]) as NodeItem;
				addChildNode(c);
			}
		}
		override public  function dispose():void
		{
			super.dispose();
			clearLine();
			while(childs.length>0){
				removeChildOf(childs[0]);
			}
			removeFromFather();
		}
		
		public function clearLine():void
		{
			if(line){
				line.removeFromParent();
				line = null;
			}
		}
		
		public function drawLine():void
		{
			if(father)container.drawLine(this,father);
			if(childs.length>0){
				for (var i:int = 0; i < childs.length; i++) 
				{
					childs[i].drawLine();
				}
			}
		}
		public function get father():NodeItem
		{
			return _father;
		}
		public function get isRoot():Boolean
		{
			return Boolean(_father==null);
		}
		
		public function set father(v:NodeItem):void
		{
			if(v==null){
				clearLine();
				delete data["father"];
			}else{
				data.father = v.sid;
			}
			_father = v;
			drawLine();
		}
		public function has(sub:NodeItem):Boolean
		{
			return childs.indexOf(sub)>=0;
		}

		public function off():void
		{
			isOn = false;
			titleColor = 0x666666;
		}
		public function on():void
		{
			isOn = true;
			titleColor = 0x66dd66;
		}
		public function removeChildOf(c:NodeItem):void
		{
			if(childs){
				var indexOf:Number = childs.indexOf(c);
				if(indexOf>=0){
					childs.removeAt(indexOf);
					childs.sort(sortX);
				}
				if(c.father==this)c.father = null;
			}
		}
		public function removeFromFather():void
		{
			if(!father)return;
			father.removeChildOf(this);
		}

		public function setData(v:Object,_sid:int):void
		{
			data = GameMathUtil.clone(v);
			title = name = v.nodetype;
			if(v.hasOwnProperty("id")){
				sid = data.id;
			}else{
				sid = _sid;
			}
			x = data.x;
			y = data.y;
			if(data.hasOwnProperty("father")){
				setTimeout(getFatherLater,222);
			}
		}
		public function getData():Object
		{
			return data;
		}
		public var container:NodeContainer;
		private function onT(t:MouseEvent):void
		{
			if(t.type == MouseEvent.MOUSE_DOWN){
				press = true;
				if(!Keys.inputs.isDoing("shift")){
					if(!container.has(this)){
						container.selOnly(this);
					}
				}else{
					container.addSel(this);
				}
				container.sel.visible = false;
				container.timerTarget = this;
				container.timer.start();
				lastX = container.timerTarget.displayListContainer.stage.mouseX;
				lastY = container.timerTarget.displayListContainer.stage.mouseY;
			}
			if(t.type == MouseEvent.MOUSE_UP){
				press = false;
				(parent.parent as NodeContainer).nodeClick.dispatch(this);
				container.hasMove = false;
				if(father)father.childs.sort(sortX);
				container.lastClickOB = this;
				container.timer.stop();
			}
		}
		
		private function sortX(a,b):int
		{
			if(a.x>b.x)return 1;
			if(a.x<b.x)return -1;
			return 0;
		}
		private function sortY(a,b):int
		{
			if(a.y>b.y)return 1;
			if(a.y<b.y)return -1;
			return 0;
		}
		
		public function updateXYData():void
		{
			data.x = int(x);
			data.y = int(y);
		}
		protected function getFatherLater():void
		{
			var f:NodeItem = container.getChildByID(data.father);
			this.father = f;
			f.addChildNode(this);
		}
		
		public function getName():String
		{
			if(data && data.hasOwnProperty("name")){
				return data.name;
			}
			return name;
		}
	}
}
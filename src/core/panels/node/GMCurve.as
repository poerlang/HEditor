package logic.panels.gms
{
	import fairygui.Events;
	import fairygui.GComponent;
	import fairygui.GObject;
	
	import laya.events.Event;
	import laya.maths.Point;
	
	import logic.messages.Curve;
	import logic.messages.CurvePoint;
	import logic.messages.Stuff;
	import logic.panels.BaseWindow;
	
	import rawui.UI_CurveContainer;
	import rawui.UI_GMCurve;
	import rawui.UI_StuffSelItem;
	
	import utils.Bez;

	public class GMCurve extends BaseWindow
	{
		private static var ins:GMCurve;
		public var v:UI_GMCurve;

		private var b:Bez;
		public function GMCurve()
		{
			super();
			modal = true;
			v = UI_GMCurve.createInstance();
			contentPane = v;
			b = new Bez();
			//b.scaleY = -1;
			v.m_container.m_line.setNativeObject(b);
			v.m_container.m_line.visible = true;
			draw();
			v.m_container.m_touch.on(Event.MOUSE_DOWN,this,onDown);
			v.m_container.m_touch.on(Event.MOUSE_MOVE,this,onMove);
			v.m_container.m_touch.on(Event.MOUSE_UP,this,onUp);
			
			var param:GMInputParam;
			param = new GMInputParam();
			param.addBtn = v.m_add;
			param.subBtn = v.m_sub;
			maxNumCtrl = new InputCtrl(v.m_maxNum,param);
			
			param = new GMInputParam();
			param.addBtn = v.m_addLevel;
			param.subBtn = v.m_subLevel;
			maxLevelCtrl = new InputCtrl(v.m_maxLevel,param);
			
			v.m_newCurve.onClick(this,onNew);
			v.m_delCurve.onClick(this,onDel);
			v.m_list.on(Events.CLICK_ITEM,this,onItemClick);
		}
		
		private function onItemClick():void
		{
			curveNow = stuff.curve[v.m_list.selectedIndex] as Curve;
			showOneCurve(curveNow);
		}
		
		private function onDel():void
		{
			if(v.m_list.selectedIndex<0)return;
			stuff.curve.splice(v.m_list.selectedIndex);
			v.m_list.removeChildAt(v.m_list.selectedIndex);
		}
		
		private function onNew():void
		{
			var attrSel:GMCurveNameSel = GMCurveNameSel.getInstance();
			attrSel.initStuff(stuff,createCurve,this);
			attrSel.show();
		}
		
		private function createCurve(theName:String):Function
		{
			curveNow = new Curve();
			curveNow.name = theName;
			curveNow.maxNum = 1000;
			curveNow.curveRange = 0;
			var p0:CurvePoint = new CurvePoint(); p0.x = v.m_container.m_p0.x; p0.y = v.m_container.m_p0.y;
			var p1:CurvePoint = new CurvePoint(); p1.x = v.m_container.m_p1.x; p1.y = v.m_container.m_p1.y;
			var p2:CurvePoint = new CurvePoint(); p2.x = v.m_container.m_p2.x; p2.y = v.m_container.m_p2.y;
			var p3:CurvePoint = new CurvePoint(); p3.x = v.m_container.m_p3.x; p3.y = v.m_container.m_p3.y;
			curveNow.point.push(p0);
			curveNow.point.push(p1);
			curveNow.point.push(p2);
			curveNow.point.push(p3);
			stuff.curve.push(curveNow);
			showOneCurve(curveNow);
			var item:UI_StuffSelItem = v.m_list.addItemFromPool(UI_StuffSelItem.URL) as UI_StuffSelItem;
			item.data = curveNow;
			item.text = theName;
			return null;
		}
		override protected function onShown(): void {
			super.onShown();
			maxLevelCtrl.bindObject(stuff,"levelMax");
			if(stuff.curve.length==0){
				v.m_container.visible = false;
				v.m_btns.visible = false;
			}else{
				v.m_container.visible = true;
				v.m_btns.visible = true;
				var curve:Curve = stuff.curve[0] as Curve;
				showOneCurve(curve);
				v.m_list.removeChildrenToPool();
				for (var i:int = 0; i < stuff.curve.length; i++) 
				{
					var aCurve:Curve = stuff.curve[i];
					var item:UI_StuffSelItem = v.m_list.addItemFromPool(UI_StuffSelItem.URL) as UI_StuffSelItem;
					item.data = aCurve;
					item.text = aCurve.name;
				}
				v.m_list.selectedIndex = 0;
			}
		}
		
		private function showOneCurve(c:Curve):void
		{
			this.curveNow = c;
			v.m_container.visible = true;
			v.m_btns.visible = true;
			maxNumCtrl.bindObject(c,"maxNum");
			for (var i:int = 0; i < c.point.length; i++) 
			{
				var p:CurvePoint = c.point[i];
				var cp:GComponent = v.m_container.getChild("p"+i).asCom;
				cp.x = p.x;
				cp.y = p.y;
			}
			draw();
		}
		private function saveCurve(i:int):void
		{
			var p:CurvePoint = curveNow.point[i];
			var cp:GComponent = v.m_container.getChild("p"+i).asCom;
			p.x = cp.x;
			p.y = cp.y;
		}
		override protected function onHide(): void {
			
		}
		private function onUp():void
		{
			if(!drag) return;
			var index:Number = parseInt(drag.name.slice(1));
			if(!isNaN(index)){
				saveCurve(index);
			}
			if(drag!=v.m_container.m_mid){
				points = draw(true);
			}
			v.m_container.m_levelNow.text = "等级: "+Math.round(parseFloat(v.m_maxLevel.text)*v.m_container.m_mid.x/434);
			drag = null;
			if(points && points.length){
				var yy:int = walk(v.m_container.m_mid.x);
				if(isNaN(yy))return;
				var maxNum:Number = parseFloat(v.m_maxNum.text);
				v.m_container.m_numNow.text = "当前等级对应值: "+Math.round((1-yy/448)*maxNum);
			}
			
			var lvl:Number = parseFloat(v.m_maxLevel.text);
			nums = [];
			if(points && points.length>0 && lvl>1){
				for (var i:int = 0; i <= lvl; i++) 
				{
					var xx:Number = i/lvl*434;
					var yyyy:Number = walk(xx);
					var tmp:int = Math.round((1-yyyy/448)*maxNum);
					nums.push(tmp);
				}
				curveNow.num = nums.slice();
			}
		}
		
		private function walk(xx:Number):int
		{
			var min:int = 99999999;
			var thePoint:Point;
			for (var i:int = 0; i < points.length; i++) 
			{
				var p:Point = points[i];
				var tmp:int = Math.abs(xx-p.x);
				if(tmp<min){
					min = tmp;
					thePoint = p;
				}else{
					break;
				}
			}
			return thePoint.y;
		}		
		
		private function onMove(e:Event):void
		{
			if(!drag) return;
			var c:UI_CurveContainer = v.m_container;
			v.m_container.globalToLocal(e.stageX,e.stageY,pos);
			drag.x = pos.x;
			if(drag!=c.m_mid){
				drag.y = pos.y;
			}
			draw();
		}
		private static var pos:Point = new Point();

		private var drag:GObject;

		private var maxNumCtrl:InputCtrl;

		private var maxLevelCtrl:InputCtrl;
		public var stuff:Stuff;

		private var curveNow:Curve;

		private var points:Array;

		public var nums:Array;
		private function onDown(e:Event):void
		{
			var c:UI_CurveContainer = v.m_container;
			v.m_container.globalToLocal(e.stageX,e.stageY,pos);
			var d:Number = 999999;
			
			var arr:Array = [c.m_p1,c.m_p2,c.m_mid];
			for (var i:int = 0; i < arr.length; i++) 
			{
				var o:GObject = arr[i] as GObject;
				var dd:Number = pos.distance(o.x,o.y);
				if(dd<d){
					d = dd;
					drag = o;
				}
			}
			
		}
		
		private function draw(getNums:Boolean=false):Array
		{
			var c:UI_CurveContainer = v.m_container;
			var p0:Point = new Point(c.m_p0.x,c.m_p0.y);
			var p1:Point = new Point(c.m_p1.x,c.m_p1.y);
			var p2:Point = new Point(c.m_p2.x,c.m_p2.y);
			var p3:Point = new Point(c.m_p3.x,c.m_p3.y);
			var drawArr:Array = b.draw([p0,p1,p2,p3],getNums);
			return drawArr;
		}
		public static function getInstance():GMCurve
		{
			if(ins==null){
				ins = new GMCurve();
			}
			return ins;
		}
		private function onCreateClick():void
		{
			
		}
		
		public function bind(s:Stuff):void
		{
			stuff = s;
		}
		
		public function clear():void
		{
			stuff = null;
			nums = [];
			v.m_list.removeChildrenToPool();
			GMCurveNameSel.getInstance().clear();
		}
	}
}
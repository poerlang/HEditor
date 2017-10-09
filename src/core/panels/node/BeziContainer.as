package core.panels.node
{
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.geom.Point;
	
	import fairygui.GObject;
	
	import rawui.UI_BeziContainer;
	
	public class BeziContainer extends UI_BeziContainer
	{
		private var b:BezSprite;
		private static var pos:Point = new Point();
		private static var tmp:Point = new Point();
		private var drag:GObject;
		private var points:Array;

		private var pointsNeedCtrl:Array;
		public function BeziContainer()
		{
			super();
		}
		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);
			
			m_bg.addEventListener(MouseEvent.MOUSE_DOWN,onDown);
			m_bg.addEventListener(MouseEvent.MOUSE_MOVE,onMove);
			m_bg.addEventListener(MouseEvent.MOUSE_UP,onUp);
			m_line.touchable = m_o1.touchable = m_o2.touchable = m_o3.touchable = m_o4.touchable = false;
			b = new BezSprite();
			m_line.setNativeObject(b);
			pointsNeedCtrl = [m_o1,m_o2,m_o3];//选择起始点和两个控制点 (终点不受控)
			initPos();
		}
		
		public function initPos():void
		{
			m_o1.x = 0;
			m_o4.x = width;
			m_o4.y = 0;
		}
		private function draw(getNums:Boolean=false):Array
		{
			var p0:Point = new Point(m_o1.x,m_o1.y);
			var p1:Point = new Point(m_o2.x,m_o2.y);
			var p2:Point = new Point(m_o3.x,m_o3.y);
			var p3:Point = new Point(m_o4.x,m_o4.y);
			var drawArr:Array = b.draw([p0,p1,p2,p3],getNums);
			return drawArr;
		}
		protected function onDown(e:MouseEvent):void
		{
			initPos();
			pos = m_line.globalToLocal(HEditor.ins.stage.mouseX,HEditor.ins.stage.mouseY);
			var d:Number = 999999;
			
			for (var i:int = 0; i < pointsNeedCtrl.length; i++) 
			{
				var o:GObject = pointsNeedCtrl[i] as GObject;
				tmp.x = o.x;
				tmp.y = o.y;
				var dd:Number = Point.distance(pos,tmp);
				if(dd<d){
					d = dd;
					drag = o;
				}
			}
		}
		
		protected function onMove(e:MouseEvent):void
		{
			if(!drag) return;
			pos = m_line.globalToLocal(HEditor.ins.stage.mouseX,HEditor.ins.stage.mouseY);
			if(drag==m_o1){
				drag.y = pos.y;
			}else if(drag==m_o2 || drag==m_o3){
				drag.x = pos.x;
				drag.y = pos.y;
			}
			draw();
		}
		
		protected function onUp(e:Event):void
		{
			if(!drag) return;
			var index:Number = parseInt(drag.name.slice(1));
//			if(!isNaN(index)){
//				saveCurve(index);
//			}
//			if(drag!=v.m_container.m_mid){
//				points = draw(true);
				points = draw(true);
//			}
//			v.m_container.m_levelNow.text = "等级: "+Math.round(parseFloat(v.m_maxLevel.text)*v.m_container.m_mid.x/434);
			drag = null;
//			if(points && points.length){
//				var yy:int = walk(v.m_container.m_mid.x);
//				if(isNaN(yy))return;
//				var maxNum:Number = parseFloat(v.m_maxNum.text);
//				v.m_container.m_numNow.text = "当前等级对应值: "+Math.round((1-yy/448)*maxNum);
//			}
			
//			var lvl:Number = parseFloat(v.m_maxLevel.text);
//			nums = [];
//			if(points && points.length>0 && lvl>1){
//				for (var i:int = 0; i <= lvl; i++) 
//				{
//					var xx:Number = i/lvl*434;
//					var yyyy:Number = walk(xx);
//					var tmp:int = Math.round((1-yyyy/448)*maxNum);
//					nums.push(tmp);
//				}
//				curveNow.num = nums.slice();
//			}
		}
	}
}
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
			saveCtrlPos();
			m_bg.addEventListener(MouseEvent.MOUSE_DOWN,onDown);
			m_bg.addEventListener(MouseEvent.MOUSE_MOVE,onMove);
			m_bg.addEventListener(MouseEvent.MOUSE_UP,onUp);
			m_bg.addEventListener(MouseEvent.RELEASE_OUTSIDE,onUp);
			m_line.touchable = m_o1.touchable = m_o2.touchable = m_o3.touchable = m_o4.touchable = false;
			b = new BezSprite();
			m_line.setNativeObject(b);
			pointsNeedCtrl = [m_o1,m_o2,m_o3];//选择起始点和两个控制点 (终点不受控)
			initPos();
		}
		
		public function onSizeChange():void{
			initPos();
			draw();
		}
		public function initPos():void
		{
			m_o1.x = 0;
			m_o4.x = width;
			m_o4.y = 0;
			if(ctrlPosArr){
				m_o1.y = ctrlPosArr[0][1]*height;
				m_o2.x = ctrlPosArr[1][0]*width;
				m_o2.y = ctrlPosArr[1][1]*height;
				m_o3.x = ctrlPosArr[2][0]*width;
				m_o3.y = ctrlPosArr[2][1]*height;
			}
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
			points = draw(true);
			drag = null;
			saveCtrlPos();
		}
		private var ctrlPosArr:Array;
		private function saveCtrlPos():void
		{
			ctrlPosArr = [];
			var w:Number = width;
			var h:Number = height;
			var arr:Array = [m_o1,m_o2,m_o3];
			for (var i:int = 0; i < arr.length; i++) 
			{
				var o:GObject = arr[i] as GObject;
				ctrlPosArr.push([o.x/w,o.y/h]);
			}
		}
	}
}
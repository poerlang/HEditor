package core.panels.node
{
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.geom.Point;
	import flash.utils.setTimeout;
	
	import fairygui.GObject;
	import fairygui.GRoot;
	
	import rawui.UI_BeziContainer;
	
	public class BeziContainer extends UI_BeziContainer
	{
		private var b:BeziSprite;
		private static var pos:Point = new Point();
		private static var tmp:Point = new Point();
		private var drag:GObject;
		public var points:Array;

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
			m_bg.addEventListener(MouseEvent.MOUSE_UP,onUp);
			m_bg.addEventListener(MouseEvent.RELEASE_OUTSIDE,onUp);
			m_line.touchable = m_o1.touchable = m_o2.touchable = m_o3.touchable = m_o4.touchable = false;
			b = new BeziSprite();
			m_line.setNativeObject(b);
			pointsNeedCtrl = [m_o1,m_o2,m_o3,m_o4];
			initPos();
		}
		
		public function onSizeChange():void{
			initPos();
			draw();
		}
		public function initPos():void
		{
			if(ctrlPosArr){
				var ww:Number = width;
				var hh:Number = height;
				m_o1.x = ctrlPosArr[0][0]*ww;
				m_o1.y = ctrlPosArr[0][1]*hh;
				m_o2.x = ctrlPosArr[1][0]*ww;
				m_o2.y = ctrlPosArr[1][1]*hh;
				m_o3.x = ctrlPosArr[2][0]*ww;
				m_o3.y = ctrlPosArr[2][1]*hh;
				m_o4.x = ctrlPosArr[3][0]*ww;
				m_o4.y = ctrlPosArr[3][1]*hh;
			}
		}
		public function draw(getNums:Boolean=false,needPointNum:int=100):Array
		{
			var p0:Point = new Point(m_o1.x,m_o1.y);
			var p1:Point = new Point(m_o2.x,m_o2.y);
			var p2:Point = new Point(m_o3.x,m_o3.y);
			var p3:Point = new Point(m_o4.x,m_o4.y);
			points = b.draw([p0,p1,p2,p3],getNums,100,m_bg.width,needPointNum);
			return points;
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
			GRoot.inst.addEventListener(MouseEvent.MOUSE_MOVE,onMove);
		}
		
		protected function onMove(e:MouseEvent):void
		{
			if(!drag) return;
			pos = m_line.globalToLocal(HEditor.ins.stage.mouseX,HEditor.ins.stage.mouseY);
			if(drag==m_o4 || drag==m_o1){
				drag.x = pos.x;
				if(drag==m_o4 && drag.x<m_o3.x){
					drag.x=m_o3.x;
				}
				if(drag==m_o1){
					if(drag.x>m_o2.x){
						drag.x=m_o2.x;
					}
					drag.y = pos.y;
				}
			}else{
				drag.x = pos.x;
				drag.y = pos.y;
				if(drag.x>m_o4.x){
					drag.x=m_o4.x;
				}
				if(drag.x<m_o1.x){
					drag.x=m_o1.x;
				}
			}
			var xx:Number = width;
			var hh:Number = height;
			if(drag.x > xx){
				drag.x = xx;
			}
			if(drag.x < 0){
				drag.x = 0;
			}
			if(drag.y > hh){
				drag.y = hh;
			}
			if(drag.y < 0){
				drag.y = 0;
			}
			var part:Number = drag.x%step;
			if(part>step*0.5){
				drag.x+=(step-part);
			}else{
				drag.x-=part;
			}
			draw();
		}
		
		protected function onUp(e:Event):void
		{
			GRoot.inst.removeEventListener(MouseEvent.MOUSE_MOVE,onMove);
			if(!drag) return;
			var index:Number = parseInt(drag.name.slice(1));
			points = draw(true,100);
			drag = null;
			saveCtrlPos();
		}
		private var ctrlPosArr:Array;
		public var step:Number;
		private function saveCtrlPos():void
		{
			ctrlPosArr = [];
			var w:Number = width;
			var h:Number = height;
			var arr:Array = [m_o1,m_o2,m_o3,m_o4];
			for (var i:int = 0; i < arr.length; i++) 
			{
				var o:GObject = arr[i] as GObject;
				ctrlPosArr.push([o.x/w,o.y/h]);
			}
		}
	}
}
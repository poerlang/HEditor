package core.panels.node
{
	import flash.events.MouseEvent;
	import flash.geom.Rectangle;
	
	import fairygui.GRoot;
	
	import rawui.UI_LevelPos;
	
	public class LevelPos extends UI_LevelPos
	{
		public var press:Boolean;

		private var lastX:Number;
		public function LevelPos()
		{
			super();
		}
		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);
			
			addEventListener(MouseEvent.MOUSE_DOWN,down);
		}
		
		protected function down(e:MouseEvent):void
		{
			press = true;
			lastX = HEditor.ins.stage.mouseX;
			m_drager.x = globalToLocal(lastX).x;
			fixPos();
			GRoot.inst.addEventListener(MouseEvent.MOUSE_MOVE,move);
			GRoot.inst.addEventListener(MouseEvent.MOUSE_UP,up);
		}
		
		public function up(e:MouseEvent):void
		{
			press = false;
			m_drager.m_line.alpha = 0.17;
			GRoot.inst.removeEventListener(MouseEvent.MOUSE_MOVE,move);
			GRoot.inst.removeEventListener(MouseEvent.MOUSE_UP,up);
		}
		private var rect:Rectangle = new Rectangle();
		public function move(e:MouseEvent):void
		{
			if(press){
				m_drager.m_line.alpha = 0.38;
				var nowX:Number = HEditor.ins.stage.mouseX;
				var dx:Number = nowX-lastX;
				m_drager.x+=dx;
				lastX = nowX;
				
				fixPos();
			}
		}
		
		private function fixPos():void
		{
			var xx:Number = m_drager.x;
			var yy:Number = m_drager.y;
			rect.x = m_dragBounds.x;
			rect.y = m_dragBounds.y;
			rect.width = m_dragBounds.width;
			rect.height = m_dragBounds.height;
			if (xx < rect.x)
				xx = rect.x;
			else if(xx > rect.right)
			{
				xx = rect.right;
				if (xx < rect.x)
					xx = rect.x;
			}
			
			if(yy < rect.y)
				yy = rect.y;
			else if(yy > rect.bottom)
			{
				yy = rect.bottom;
				if(yy < rect.y)
					yy = rect.y;
			}
			m_drager.x = Math.round(xx);
			m_drager.y = Math.round(yy);
		}
	}
}
package core.panels.node
{
	import flash.events.MouseEvent;
	
	import rawui.UI_LevelPos;
	
	public class LevelPos extends UI_LevelPos
	{
		private var press:Boolean;

		private var lastX:Number;
		public function LevelPos()
		{
			super();
		}
		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);
			
			m_drager.addEventListener(MouseEvent.MOUSE_DOWN,down);
			addEventListener(MouseEvent.MOUSE_UP,up);
			addEventListener(MouseEvent.RELEASE_OUTSIDE,up);
			addEventListener(MouseEvent.MOUSE_MOVE,move);
		}
		
		protected function down(e:MouseEvent):void
		{
			press = true;
			lastX = HEditor.ins.stage.mouseX;
		}
		
		protected function up(e:MouseEvent):void
		{
			press = false;
		}
		
		protected function move(e:MouseEvent):void
		{
			if(press){
				var nowX:Number = HEditor.ins.stage.mouseX;
				var dx:Number = nowX-lastX;
				m_drager.x+=dx;
				lastX = nowX;
			}
		}
	}
}
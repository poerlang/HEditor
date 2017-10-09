package items
{
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.geom.Point;
	
	import fairygui.DragDropManager;
	import fairygui.GComponent;
	
	import rawui.UI_BufferTypeItem;
	
	public class BufferTypeItem extends UI_BufferTypeItem
	{
		private var helpObject:GComponent = new GComponent();
		private var helpPoint:Point = new Point();
		public function BufferTypeItem()
		{
			super();
		}
		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);
			m_touch.addEventListener(MouseEvent.MOUSE_DOWN,onDown);
		}
		protected function onDown(event:Event):void
		{
			m_touch.addEventListener(MouseEvent.MOUSE_MOVE,onDrag);
		}
		private function onDrag(e:MouseEvent):void
		{
			if(DragDropManager.inst.dragging){
				return;
			}
			m_touch.removeEventListener(MouseEvent.MOUSE_MOVE,onDrag);
			e.stopImmediatePropagation();
			helpPoint = globalToLocal(e.stageX,e.stageY);
			helpObject.displayObject.x = helpPoint.x-10;
			helpObject.displayObject.y = helpPoint.y-10;
			addChild(helpObject);
			DragDropManager.inst.startDrag(helpObject,"ui://rl5gnkttk1sm2j",this);
		}
	}
}
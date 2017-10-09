package core.panels.base
{
	import flash.net.SharedObject;
	
	import avmplus.getQualifiedClassName;
	
	import tools.FlashLocalStorage;
	
	import fairygui.Window;
	import fairygui.event.DragEvent;
	
	public class BaseWindow extends Window
	{
		public function BaseWindow()
		{
			super();
			this.addEventListener(DragEvent.DRAG_END,onEnd);
		}
		
		protected function onEnd(e:DragEvent):void
		{
			var classPath:String = getQualifiedClassName(this);
			FlashLocalStorage.setJSON(classPath+"_"+name+"_pos",{x:x,y:y});
		}
		public var modalAlpha:Number = 0;
		public override function show(): void {
			super.show();
			center();
			var classPath:String = getQualifiedClassName(this);
			var key:String = classPath+"_"+name+"_pos";
			var pos:Object = FlashLocalStorage.getJSON(key);
			if(pos){
				x = pos.x;
				y = pos.y;
			}
		}
		override protected function onShown(): void {
			super.onShown();
		}
		override protected function onHide():void {
			super.onHide();
		}
	}
}
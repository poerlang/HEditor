package core.panels.npc
{
	import flash.ui.Keyboard;
	
	import core.panels.base.BaseWindow;
	
	import rawui.UI_ActionPanel;

	public class ActionPanel extends BaseWindow
	{
		private static var _ins:ActionPanel;
		public var v:UI_ActionPanel;
		public static function get ins():ActionPanel
		{
			if(_ins==null){
				_ins = new ActionPanel();
			}
			return _ins;
		}
		public function ActionPanel()
		{
			super();
			v = UI_ActionPanel.createInstance();
			contentPane = v;
			
		}
		
		protected override function onShown(): void {
			super.onShown();
		}
		
		protected override function onHide(): void {
			super.onHide();
		}
		public function regKeys():void
		{
			if(Keys.regPanel == this)return;
			Keys.regPanel = this;
			//Keys.add("del",Keyboard.DELETE,onDelete);
		}
		public function unRegKeys():void
		{
			//Keys.remove("del",Keyboard.DELETE);
		}
		public function onShown(yes:Boolean=true):void
		{
			super.onShown();
			regKeys();
		}
	}
}
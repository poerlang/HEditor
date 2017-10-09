package core.panels
{
	import flash.ui.Keyboard;
	
	import core.panels.base.BaseWindow;
	import core.panels.npc.items.NpcItem;
	import tools.FileX;
	/**模板类，请忽略报错**/
	public class APanel extends BaseWindow
	{
		private static var _ins:APanel;
		public var v:UI_APanel;
		public static function get ins():APanel
		{
			if(_ins==null){
				_ins = new APanel();
			}
			return _ins;
		}
		public function APanel()
		{
			super();
			v = UI_APanel.createInstance();
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
		private function onDelete(isDoing:Boolean):void
		{
			if(isDoing)return;
			var item:NpcItem = v.m_list.getChildAt(v.m_list.selectedIndex) as NpcItem;
			FileX.del("res/npc/"+item.title,true);
			v.m_list.removeChildToPoolAt(v.m_list.selectedIndex);
		}
	}
}
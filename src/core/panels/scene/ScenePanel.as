package core.panels.scene
{
	import flash.ui.Keyboard;
	
	import core.panels.base.BaseWindow;
	
	import rawui.UI_ScenePanel;

	public class ScenePanel extends BaseWindow
	{
		private static var _ins:ScenePanel;
		public var v:UI_ScenePanel;
		public static function get ins():ScenePanel
		{
			if(_ins==null){
				_ins = new ScenePanel();
			}
			return _ins;
		}
		public function ScenePanel()
		{
			super();
			v = UI_ScenePanel.createInstance();
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
		}
		public function onShown(yes:Boolean=true):void
		{
			super.onShown();
			regKeys();
		}

		public function get boss():Npc
		{
			return v.m_container.m_boss as Npc;
		}
		public function get me():Npc
		{
			return v.m_container.m_me as Npc;
		}

		public function update(mvInPack:Array,isMe:Boolean=true):void
		{
			if(isMe){
				me.movies = mvInPack;
			}else{
				boss.movies = mvInPack;
			}
		}
	}
}
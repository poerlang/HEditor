package core.panels
{
	import flash.ui.Keyboard;
	
	import core.panels.base.BaseWindow;
	import core.panels.node.BuffEditPanel;
	import core.panels.node.MixPanel;
	import core.panels.npc.ActionPanel;
	import core.panels.npc.NpcPanel;
	import core.panels.scene.ScenePanel;
	
	import rawui.UI_MainPanel;

	public class MainPanel extends BaseWindow
	{
		private static var _ins:MainPanel;
		public var v:UI_MainPanel;
		public static function get ins():MainPanel
		{
			if(_ins==null){
				_ins = new MainPanel();
			}
			return _ins;
		}
		public function MainPanel()
		{
			super();
			v = UI_MainPanel.createInstance();
			contentPane = v;
			v.m_panelAction.addClickListener(onAction);
			v.m_panelBuff.addClickListener(onBuff);
			v.m_panelNpc.addClickListener(onNpc);
			v.m_panelScene.addClickListener(onScene);
			v.m_panelMix.addClickListener(onMix);
			v.m_frame.m_closeButton.visible = false;
		}
		
		private function onMix(e):void
		{
			if(MixPanel.ins.isShowing){
				MixPanel.ins.hide();
			}else{
				MixPanel.ins.show();
			}
		}
		
		private function onScene(e):void
		{
			if(ScenePanel.ins.isShowing){
				ScenePanel.ins.hide();
			}else{
				ScenePanel.ins.show();
			}
		}
		
		private function onNpc(e):void
		{
			if(NpcPanel.ins.isShowing){
				NpcPanel.ins.hide();
			}else{
				NpcPanel.ins.show();
			}
		}
		
		private function onBuff(e):void
		{
			if(BuffEditPanel.ins.isShowing){
				BuffEditPanel.ins.hide();
			}else{
				BuffEditPanel.ins.show();
			}
		}
		private function onAction(e):void
		{
			if(ActionPanel.ins.isShowing){
				ActionPanel.ins.hide();
			}else{
				ActionPanel.ins.show();
			}
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
		}
	}
}
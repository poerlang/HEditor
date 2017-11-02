package core.panels
{
	import core.panels.base.Alert;
	import core.panels.base.BaseWindow;
	import core.panels.node.MixPanel;
	import core.panels.node.StuffItem;
	import core.panels.node.StuffManager;
	
	import fairygui.GObject;
	
	import rawui.UI_StuffItem;
	import rawui.UI_StuffSelPanel;
	
	import tools.FileX;
	import tools.GameMathUtil;

	public class StuffSelPanel extends BaseWindow
	{
		private static var _ins:StuffSelPanel;
		public var v:UI_StuffSelPanel;

		private var callback:Function;
		public static function get ins():StuffSelPanel
		{
			if(_ins==null){
				_ins = new StuffSelPanel();
			}
			return _ins;
		}
		public function StuffSelPanel()
		{
			super();
			v = UI_StuffSelPanel.createInstance();
			contentPane = v;
			v.m_frame.m_closeButton.visible = false;
			v.m_ok.addClickListener(onOK);
			v.m_no.addClickListener(onNO);
		}
		
		public static function sel(_callback:Function):void{
			ins.callback = _callback;
			ins.show();
		}
		private function onNO(e):void{
			clear();
			hide();
		}
		
		private function clear():void
		{
			callback = null;
		}
		private function onOK(e):void
		{
			var selectedIndex:int = v.m_stufflist.selectedIndex;
			if(selectedIndex<0){
				Alert.showTxt("请先选择一个物品");
				return;
			}
			var item:GObject = v.m_stufflist.getChildAt(selectedIndex);
			var ob:Object = GameMathUtil.clone(item.data);
			if(callback){
				callback(ob);
			}
			clear();
			hide();
		}
		private function reloadStuffList():void
		{
			v.m_stufflist.removeChildrenToPool();
			FileX.dirToList(MixPanel.STUFF_DIR,v.m_stufflist,UI_StuffItem.URL,updateOneStuff);
		}
		private function updateOneStuff(ob:Object,item:StuffItem):void
		{
			item.title = ob.name;
			item.data = ob;
			item.width = 122;
			item.m_c1.selectedIndex = 0;
		}
		protected override function onShown(): void {
			super.onShown();
			reloadStuffList();
		}
		
		protected override function onHide(): void {
			super.onHide();
		}
	}
}
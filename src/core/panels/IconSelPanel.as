package core.panels
{
	import core.panels.base.Alert;
	import core.panels.base.BaseWindow;
	import core.panels.node.MixPanel;
	
	import fairygui.GObject;
	
	import rawui.UI_IconBtn;
	import rawui.UI_IconSelPanel;
	
	import tools.FileX;

	public class IconSelPanel extends BaseWindow
	{
		private static var _ins:IconSelPanel;
		public var v:UI_IconSelPanel;

		private var callback:Function;
		public static function get ins():IconSelPanel
		{
			if(_ins==null){
				_ins = new IconSelPanel();
			}
			return _ins;
		}
		public function IconSelPanel()
		{
			super();
			v = UI_IconSelPanel.createInstance();
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
			var selectedIndex:int = v.m_list.selectedIndex;
			if(selectedIndex<0){
				Alert.showTxt("请先选择一个Icon");
				return;
			}
			var item:GObject = v.m_list.getChildAt(selectedIndex);
			if(callback){
				callback(item.data);
			}
			clear();
			hide();
		}
		private function reloadIconList():void
		{
			v.m_list.removeChildrenToPool();
			FileX.dirToList(MixPanel.ICON_DIR,v.m_list,UI_IconBtn.URL,updateOne,[],true);
		}
		private function updateOne(fname:String,item:UI_IconBtn):void
		{
			item.data = {name:fname,url:item.icon};
		}
		protected override function onShown(): void {
			super.onShown();
			reloadIconList();
		}
		
		protected override function onHide(): void {
			super.onHide();
		}
	}
}
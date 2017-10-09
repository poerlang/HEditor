package core.panels.base
{
	import flash.ui.Keyboard;
	
	
	import rawui.UI_Alert;

	public class Alert extends BaseWindow
	{
		private static var _ins:Alert;
		public var v:UI_Alert;
		public static var onOKFun:Function;
		public static var onCancelFun:Function;

		public static function get ins():Alert
		{
			if(_ins==null){
				_ins = new Alert();
			}
			return _ins;
		}
		public function Alert()
		{
			super();
			v = UI_Alert.createInstance();
			contentPane = v;
			v.m_ok.addClickListener(onOK);
			v.m_cancel.addClickListener(onCancel);
		}
		public static function showTxt(str,onOKFun:Function=null,onCancelFun:Function=null):void
		{
			Alert.onOKFun = onOKFun;
			Alert.onCancelFun = onCancelFun;
			if(onOKFun && onCancelFun){
				_ins.v.m_c1.setSelectedPage("确定加取消");
			}else{
				_ins.v.m_c1.setSelectedPage("确定");
			}
			_ins.v.m_title.text = str;
			_ins.show();
		}
		private function onOK(e=null):void
		{
			if(Alert.onOKFun){
				Alert.onOKFun();
			}
			clear();
		}
		
		private function clear():void
		{
			Alert.onOKFun = null;
			Alert.onCancelFun = null;
			hide();
		}
		private function onCancel(e=null):void
		{
			if(Alert.onCancelFun){
				Alert.onCancelFun();
			}
			clear();
		}
		
		protected override function onShown(): void {
			super.onShown();
			regKeys();
		}
		
		protected override function onHide(): void {
			super.onHide();
		}
		public function regKeys():void
		{
			if(Keys.regPanel == this)return;
			Keys.regPanel = this;
			Keys.add("enter",Keyboard.ENTER,onEnter);
			Keys.add("esc",Keyboard.ESCAPE,onEsc);
		}
		public function unRegKeys():void
		{
			Keys.remove("enter",Keyboard.ENTER);
			Keys.remove("esc",Keyboard.ESCAPE);
		}
		private function onEsc(isDoing:Boolean):void
		{
			if(isDoing)return;
			onCancel();
		}
		private function onEnter(isDoing:Boolean):void
		{
			if(isDoing)return;
			onOK();
		}
	}
}
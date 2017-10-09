package core.panels.base
{
	import flash.ui.Keyboard;
	
	
	import rawui.UI_AlertInput;

	public class AlertInput extends BaseWindow
	{
		private static var _ins:AlertInput;
		public var v:UI_AlertInput;
		public static var onOKFun:Function;
		public static var onCancelFun:Function;

		public static function get ins():AlertInput
		{
			if(_ins==null){
				_ins = new AlertInput();
			}
			return _ins;
		}
		public function AlertInput()
		{
			super();
			v = UI_AlertInput.createInstance();
			contentPane = v;
			v.m_ok.addClickListener(onOK);
			v.m_cancel.addClickListener(onCancel);
		}
		public static function showTxt(str,onOKFun:Function=null,onCancelFun:Function=null):void
		{
			_ins.v.m_txt.text = "";
			AlertInput.onOKFun = onOKFun;
			AlertInput.onCancelFun = onCancelFun;
			_ins.v.m_title.text = str;
			_ins.show();
		}
		private function onOK(e=null):void
		{
			if(AlertInput.onOKFun){
				AlertInput.onOKFun(v.m_txt.text);
			}
			clear();
		}
		
		private function clear():void
		{
			AlertInput.onOKFun = null;
			AlertInput.onCancelFun = null;
			hide();
		}
		private function onCancel(e=null):void
		{
			if(AlertInput.onCancelFun){
				AlertInput.onCancelFun();
			}
			clear();
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
		
		public function onShown(yes:Boolean=true):void
		{
			super.onShown();
			regKeys();
		}
	}
}
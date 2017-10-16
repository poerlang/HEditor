package
{
	import flash.display.Stage;
	import flash.events.KeyboardEvent;
	import flash.events.MouseEvent;
	import flash.geom.Point;
	import flash.ui.Keyboard;
	
	import citrus.input.controllers.KeyboardController;
	import citrus.input.input.Input;
	
	import core.panels.base.NumStrInput;

	public class Keys
	{
		private var stage:Stage;

		public static function get regPanel():Object
		{
			return _regPanel;
		}

		public static function set regPanel(value:Object):void
		{
			if(_regPanel!=value && _regPanel!=null && _regPanel.hasOwnProperty("unRegKeys")){
				_regPanel.unRegKeys();
			}
			_regPanel = value;
		}

		public static var mouse_fun:Function;
		public static var key_fun:Function;
		public function Keys(stage:Stage)
		{
			inputs = new Input(stage);
			inputs.initialize();
			this.stage = stage;
			stage.addEventListener(flash.events.MouseEvent.RIGHT_MOUSE_DOWN, onOtherMouse);
			stage.addEventListener(flash.events.MouseEvent.RIGHT_MOUSE_UP, onOtherMouse);
			stage.addEventListener(flash.events.MouseEvent.RIGHT_CLICK, onOtherMouse);
			stage.addEventListener(flash.events.MouseEvent.MIDDLE_MOUSE_DOWN, onOtherMouse);
			stage.addEventListener(flash.events.MouseEvent.MIDDLE_MOUSE_UP, onOtherMouse);
			stage.addEventListener(flash.events.MouseEvent.MOUSE_MOVE, onOtherMouse);
			stage.addEventListener(flash.events.MouseEvent.MOUSE_WHEEL, onOtherMouse);
			stage.addEventListener(KeyboardEvent.KEY_DOWN, onKey);
			stage.addEventListener(KeyboardEvent.KEY_UP, onKey);
		}
		
		public function tick(t):void{
			onKeyPress();
			inputs.update();
		}
		protected function onKey(e:KeyboardEvent):void
		{
			if(key_fun)key_fun(e);
		}
		protected function onOtherMouse(e:MouseEvent):void
		{
			if(mouse_fun)mouse_fun(e);
		}
		private static var d:int = 1;
		private static var lastTargetPoint:Point;
		private static var lastTargetPointCountDown:int;
		private static var testCount:int;
		public static function onKeyPress():void{
			if(NumStrInput.now)//如果正在输入文字,则返回
				return;
			for(var key:String in keyFunMap){
				if(inputs.justDid(key)){
					if(keyFunMap[key])keyFunMap[key](false);
				}
				if(inputs.isDoing(key)){
					if(keyFunMap[key])keyFunMap[key](true);
				}
			}
		}
		
		public static var keyFunMap:Object = {};
		private static var _regPanel:Object;
		
		public static function add(key:String,code:uint,fun:Function=null):void{
			remove(key,code);
			var kb:KeyboardController = inputs.keyboard;
			kb.addKeyAction(key,code);
			keyFunMap[key] = fun;
		}
		public static function remove(key:String,code:uint):void{
			var kb:KeyboardController = inputs.keyboard;
			kb.removeActionFromKey(key,code);
		}
		public static function init(stage:Stage):void
		{
			stage.addEventListener(KeyboardEvent.KEY_UP, handleKeyUp);
			var kb:KeyboardController = inputs.keyboard;
			kb.addKeyAction("w",Keyboard.W);
			kb.addKeyAction("s",Keyboard.S);
			kb.addKeyAction("a",Keyboard.A);
			kb.addKeyAction("d",Keyboard.D);
			kb.addKeyAction("NUMBER_1",Keyboard.NUMBER_1);
			kb.addKeyAction("NUMBER_2",Keyboard.NUMBER_2);
			kb.addKeyAction("NUMBER_3",Keyboard.NUMBER_3);
			kb.addKeyAction("NUMBER_4",Keyboard.NUMBER_4);
			kb.addKeyAction("NUMBER_5",Keyboard.NUMBER_5);
			kb.addKeyAction("NUMBER_6",Keyboard.NUMBER_6);
			kb.addKeyAction("test",Keyboard.T);
			kb.addKeyAction("ctrl",Keyboard.CONTROL);
			kb.addKeyAction("shift",Keyboard.SHIFT);
		}
		
		protected static function handleKeyUp(event:KeyboardEvent):void
		{
			
		}
		private static var tmpHookString:String;

		public static var inputs:Input;
		private static function tmpHookFunction():void
		{
			
		}
	}
}
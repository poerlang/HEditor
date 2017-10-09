/*源自 FairyGUI 谷主分享*/
package core.panels.base 
{
	import flash.events.Event;
	import flash.events.FocusEvent;
	import flash.events.KeyboardEvent;
	import flash.events.MouseEvent;
	import flash.geom.Point;
	import flash.text.TextField;
	
	import fairygui.Controller;
	import fairygui.GObject;
	import fairygui.event.DragEvent;
	
	import org.osflash.signals.Signal;
	
	import rawui.UI_NumericInput;

	public class NumericInput extends UI_NumericInput
	{
		private var _min:Number;
		private var _max:Number;
		private var _value:Number;
		private var _holder:GObject;
		private var _lastHolderPos:Point;
		private var _dragged:Boolean;
		private var _fractionDigits:int;
		private var _step:Number;
		private var _c1:Controller;
		public var onChange:Signal = new Signal();
		public var toFixedNum:uint = 3;
		
		public function NumericInput()
		{
			_min = 0;
			_max = int.MAX_VALUE;
			_value = 0;
			_step = 1;
			_fractionDigits = 0;
			_lastHolderPos = new Point();
		}
		
		public function get max():Number
		{
			return _max;
		}
		
		public function set max(val:Number):void
		{
			_max = val;
		}
		
		public function get min():Number
		{
			return _min;
		}
		
		public function set min(val:Number):void
		{
			_min = val;
		}
		
		public function get value():Number
		{
			return _value;
		}
		
		public function set value(value:*):void
		{
			_value = value;
			if(isString){
				super.text = value;
			}else{
				if(_value>_max)
					_value = _max;
				else if(_value<_min)
					_value = _min;
				
				super.text = toFixed(_value, _fractionDigits);				
			}

		}
		
		private function toFixed(_value:Number, _fractionDigits:int):String
		{
			return _value.toFixed(toFixedNum);
		}
		
		public function get step():Number
		{
			return _step;
		}
		
		public function set step(value:Number):void
		{
			_step = value;
		}
		
		public function get fractionDigits():int
		{
			return _fractionDigits;
		}
		
		public function set fractionDigits(value:int):void
		{
			_fractionDigits = value;
		}
		
		override public function set text(value:String):void
		{
			_value = parseFloat(value);
			if(_value>_max)
				_value = _max;
			else if(_value<_min)
				_value = _min;
			
			super.text = toFixed(_value, _fractionDigits);
		}
		
		override protected function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);
			
			this.opaque = true;
			
			_holder = getChild("holder");
			_holder.draggable = true;
			_holder.addEventListener(DragEvent.DRAG_START, __holderDragStart);
			_holder.addEventListener(DragEvent.DRAG_END, __holderDragEnd);

			_c1 = getController("c1");
			_c1.selectedIndex = 0;
			this._titleObject.touchable = false;
			this._titleObject.addEventListener(FocusEvent.FOCUS_OUT, __focusOut);
			this._titleObject.addEventListener(KeyboardEvent.KEY_UP, onkey);
			
			_holder.addClickListener(__click);
			_holder.addEventListener(MouseEvent.MOUSE_WHEEL, __mouseWheel);
			
			this.displayObject.addEventListener(MouseEvent.MOUSE_DOWN, __mousedown);
			this.addEventListener(Event.ADDED_TO_STAGE, __addedToStage);
		}
		
		protected function onkey(e:KeyboardEvent):void
		{
			if(e.keyCode==13){
				__focusOut();
				onChange.dispatch();
			}
		}
		
		private function __addedToStage(evt:Event):void
		{
			this.removeEventListener(Event.ADDED_TO_STAGE, __addedToStage);
			
//			EditorWindow.getInstance(this).cursorManager.setCursorForObject(this.displayObject, 
//				CursorManager.ADJUST, __changeCursor, true);
		}
		
		private function __holderDragStart(evt:Event):void
		{
			if(isString)return;
			if(_c1.selectedIndex==1)
				evt.preventDefault();
			else
			{
				_dragged = true;
				_holder.addXYChangeCallback(__holderXYChanged);
			}
		}
		
		private function __holderDragEnd(evt:Event):void
		{
			if(isString)return;
			_holder.removeXYChangeCallback(__holderXYChanged);
			_holder.setXY(0,0);
			_lastHolderPos.x = 0;
			_lastHolderPos.y = 0;
		}
		
		private function __holderXYChanged():void
		{
			if(isString)return;
			var dx:int = _holder.x-_lastHolderPos.x;
			var dy:int = _lastHolderPos.y-_holder.y;
			var dist:int = Math.abs(dx)>Math.abs(dy)?dx:dy;
			if(dist!=0)
			{
				_lastHolderPos.x = _holder.x;
				_lastHolderPos.y = _holder.y;
				this.text = "" + (_value + dist*_step);
				onChange.dispatch();
			}
		}
		
		private function __click(evt:Event):void
		{
			if(_dragged)
			{
				_dragged = false;
				return;
			}
			_c1.selectedIndex = 1;
			this._titleObject.touchable = true;
//			EditorWindow.getInstance(this).cursorManager.updateCursor();
			now = this;
			var tf:TextField = this._titleObject.displayObject as TextField;
			this.root.nativeStage.focus = tf;
			tf.setSelection(0, tf.length);			
		}
		public var isString:Boolean;
		public static var now:Object;
		private function __focusOut(evt:Event=null):void
		{
			if(!isString){
				var v:Number = parseFloat(this.text);
				if(v<_min)
					v = _min;
				else if(v>_max)
					v = _max;
				this._titleObject.touchable = false;
			}
			
			_c1.selectedIndex = 0;
			
			if(v!=_value)
			{
				if(!isString)this.text = ""+v;
				onChange.dispatch();
				now = null;
			}
		}
		
		private function __changeCursor():Boolean
		{
			return !this._titleObject.touchable;
		}
		
		private function __mouseWheel(evt:MouseEvent):void
		{
			if(isString)return;
			if(evt.delta<0)
				this.value-=_step;
			else
				this.value+=_step;
			onChange.dispatch();
		}
		
		private function __mousedown(evt:Event):void
		{
			now = this;
			if(!isString)evt.stopPropagation();
		}
	}
}
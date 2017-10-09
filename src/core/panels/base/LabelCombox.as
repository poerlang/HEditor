package core.panels.base
{
	import fairygui.GComboBox;
	import fairygui.GComponent;
	import fairygui.GTextField;
	import fairygui.PackageItem;
	import fairygui.event.StateChangeEvent;
	
	public class LabelCombox extends GComponent
	{

		public var box:GComboBox;
		private var left:GTextField;

		public function LabelCombox()
		{
			super();
		}
		
		override public function constructFromResource():void
		{
			super.constructFromResource();
			initUI();
		}
		
		private function initUI():void
		{
			box = getChild("right").asComboBox;
//			box.add
			left = getChild("left").asTextField;
			box.addEventListener(StateChangeEvent.CHANGED,onChange);
		}
		
		private function onChange(e=null):void
		{
			change(box.values[box.selectedIndex]);
		}
		
		public static function toArr(str:String):Array{
			var a:Array = str.split(",");
			var aa:Array = [];
			var vv:Array = [];
			for (var i:int = 0; i < a.length; i=i+2){
				aa.push(a[i]);
				vv.push(a[i+1]);
			}
			return [aa,vv];
		}
		
		public function setCfg(c:Object):void
		{
			cfg = c;
			left.text = c.cname;
			tooltips = c.tip;
			if(c.combox){
				combox = c.combox;
			}else{
				throw new Error('没配置combox字段, 格式:   "combox":	"单体普攻,1,矩形群攻,2,扇形群攻,3"');
			}
			if(c.hasOwnProperty("param")){
				for (var i:String in c.param){
					this[i] = c.param[i];
				}
			}
		}
		public function get items():Array{
			return box.items;
		}
		public function get values():Array{
			return box.values;
		}
		public function set items(a:Array):void{
			box.items=a;
		}
		public function set values(a:Array):void{
			box.values=a;
			box.selectedIndex = 0;
		}
		
		private function change(v:*):void
		{
			if(cfg==null)return;
			if(cfg.panel=="特效"){
				if(!data.hasOwnProperty("fx")) data.fx = {};
				data["fx"][cfg.name] = getTypeVal(cfg.type);
			}else{
				data[cfg.name] = getTypeVal(cfg.type);
			}
		}
		public function getTypeVal(type:String):*
		{
			if(type.indexOf("num")>=0){
				return box.value;
			}
			if(type.indexOf("int")>=0){
				return box.value;
			}
			if(type.indexOf("str")>=0){
				return box.text;
			}
			return null;
		}
		public function get combox():String{
			return _combox;
		}
		private var _combox:String;
		private var cfg:Object;
		public function set combox(s:String):void{
			_combox = s;
			var a:Array = toArr(s);
			items = a[0];
			values = a[1];
		}
		public function get val():*{
			return values[box.selectedIndex];
		}
		public function set val(s:String):void{
			box.value = s;
			onChange();
		}
		
		public function clear():void
		{
			val = null;
		}
	}
}
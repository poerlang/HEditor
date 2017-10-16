package core.panels.base
{
	import fairygui.GTextField;
	
	import rawui.UI_LabelInput;
	
	public class LabelInput extends UI_LabelInput
	{
		private var left:GTextField;

		public var txt:NumStrInput;
		private var cfg:Object;
		private var _val:Object;
		public function LabelInput()
		{
			super();
		}

		public function get val():Number
		{
			return txt.value;
		}

		public function set val(value:*):void
		{
			txt.value = value;
		}

		override public function constructFromResource():void
		{
			super.constructFromResource();
			initUI();
		}
		
		private function initUI():void
		{
			left = getChild("left").asTextField;
			txt = m_right as NumStrInput;
			txt.onChange.add(onChange);
		}
		
		private function onChange():void
		{
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
				return txt.value;
			}
			if(type.indexOf("int")>=0){
				return txt.value;
			}
			if(type.indexOf("str")>=0){
				return txt.text;
			}
			return null;
		}
		public function setCfg(c:Object):void
		{
			cfg = c;
			if(cfg.type.indexOf("str")>=0){
				txt.isString = true;
			}else{
				txt.isString = false;
			}
			left.text = c.cname;
			tooltips = c.tip;
			if(c.hasOwnProperty("param")){
				for (var i:String in c.param){
					this[i] = c.param[i];
				}
			}
		}
		
		public function clear():void
		{
			if(cfg.type.indexOf("num")>=0){
				txt.value = 0;
			}
			if(cfg.type.indexOf("int")>=0){
				txt.value = 0;
			}
			if(cfg.type.indexOf("str")>=0){
				txt.text = "";
			}
		}
	}
}
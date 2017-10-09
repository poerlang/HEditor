package core.panels.base
{
	import com.adobe.crypto.MD5;
	
	import flash.events.Event;
	import flash.filesystem.File;
	
	import fairygui.GButton;
	import fairygui.GTextField;
	
	import rawui.UI_LabelFile;
	
	public class LabelFile extends UI_LabelFile
	{
		private var left:GTextField;
		private var txt:GTextField;
		private var right:GButton;
		public function LabelFile()
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
			left = getChild("left").asTextField;
			right = getChild("right").asButton;
			right.addClickListener(onBrowse);
			txt = getChild("txt").asTextField;
		}
		public function setCfg(c:Object):void
		{
			cfg = c;
			left.text = c.cname;
			txt.text = "";
			tooltips = c.tip;
			if(c.hasOwnProperty("param")){
				for (var i:String in c.param){
					this[i] = c.param[i];
				}
			}
		}
		public static function getHash():String{
			return MD5.hash(Math.random()+"+"+(new Date().getTime()));
		}
		private var _txt:String = "";
		public function set val(s:*):void{
			_txt = txt.text = s+"";
		}
		public function get val():String{
			return _txt;
		}
		public var dir:String="";
		
		/**最终输出时,不要path,只是filename**/
		public var noPath:Boolean;
		
		/**最终输出时,不要扩展名**/
		public var noExt:Boolean;
		
		private var cfg:Object;
		protected function onBrowse():void
		{
			var appDir:File = File.applicationDirectory;
			var sub:File = appDir.resolvePath(HEditor.res+dir+"/");
			sub.browse();
			sub.addEventListener(Event.SELECT,function(e:Event):void{
				var f:File = e.target as File;
				val = f.name;
				var res:String = HEditor.res;
				var res2:String = HEditor.resOutput;
				var replace:String = f.nativePath.replace(/\\/g,"/").replace(res,"").replace(res2,"");
				if(noPath)replace = f.name;
				if(noExt && f.extension)replace = f.name.replace(f.extension,"");
				this.tooltips = _txt = replace;
				if(cfg.panel=="特效"){
					if(!data.hasOwnProperty("fx")) data.fx = {};
					data["fx"][cfg.name] = _txt;
				}else{
					data[cfg.name] = _txt;
				}
			});
		}
		
		public function clear():void
		{
			val = null;
		}
	}
}
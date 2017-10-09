package
{
	import flash.display.Sprite;
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;
	import flash.events.Event;
	import flash.ui.Keyboard;
	import flash.utils.getTimer;
	
	import bind.RealUIBinder;
	
	import core.panels.MainPanel;
	import core.panels.base.Alert;
	import core.panels.base.AlertInput;
	import core.panels.node.MixPanel;
	
	import fairygui.GRoot;
	import fairygui.UIConfig;
	
	import loads.LoadManager;
	
	import rawui.rawuiBinder;
	
	public class HEditor extends Sprite
	{
		public var loadmgr:LoadManager = new LoadManager();
		private var ticks:Array = [];
		public static var ins:HEditor;
		
		public static var res:String = "";
		public static var resOutput:String = "";
		public static var resOutputForServer:String="";
		private var last:int;

		public static var cfg:Object;
		public static var tag:Object;
		public static var nodeConfig:Object;
		
		public function HEditor()
		{
			ins = this;
			stage.scaleMode = StageScaleMode.NO_SCALE;
			stage.align = StageAlign.TOP_LEFT;
			stage.stageWidth = stage.fullScreenWidth;
			stage.stageHeight = stage.fullScreenHeight;
			addEventListener(Event.ADDED_TO_STAGE,loadConfig);
		}
		
		protected function loadConfig(event:Event):void
		{
			loadmgr.load([
				"res/config.json",
				"res/tags.json",
				"res/nodeConfig.json",
				"res/rawui.gui",
				"res/rawui@res.gui",
			],onConfigLoad,false);
			addEventListener(Event.ENTER_FRAME,onTick);
			var keys:Keys = new Keys(stage);
			addTick(keys);
			Keys.add("w",Keyboard.W,function():void{
				trace("w");
			});
		}
		
		public function addTick(ob:Object):void{
			ticks.push(ob);
		}
		protected function onTick(event:Event):void
		{
			var now:int = getTimer();
			if(last==0){
				last=now;
				return;
			}
			for (var i:int = 0; i < ticks.length; i++) 
			{
				ticks[i].tick(now-last);
			}
			last = now;
		}
		
		private function onConfigLoad():void
		{
			cfg = loadmgr.get("res/config.json");
			tag = loadmgr.get("res/tags.json");
			var ver:Number = cfg.ver;
			trace("版本号",ver);
			
			nodeConfig = loadmgr.get("res/nodeConfig.json");
			
			initUI();
		}
		
		private function initUI():void
		{
			stage.addChild(fairygui.GRoot.inst.displayObject);
			fairygui.UIConfig.tooltipsWin = "ui://rl5gnkttqj2i78";
			fairygui.UIConfig.defaultFont="微软雅黑";
			fairygui.UIPackage.addPackage(loadmgr.get("res/rawui.gui"),loadmgr.get("res/rawui@res.gui"));
			rawuiBinder.bindAll();
			RealUIBinder.bindAll();
			
			AlertInput.ins;
			Alert.ins;
			
			MainPanel.ins.show();
			MixPanel.ins.show();
//			BuffEditPanel.ins.show();
//			ScenePanel.ins.show();
//			NpcPanel.ins.show();
		}
	}
}
package core.panels.scene
{
	import flash.utils.Dictionary;
	
	import core.panels.npc.NpcPanel;
	import tools.GameMathUtil;
	
	import fairygui.GMovieClip;
	
	import rawui.UI_Npc;
	
	public class Npc extends UI_Npc
	{
		private var _movies:Array;
		private var mvNow:GMovieClip;
		private var npcName:String = "";
		private var actionNow:String = "";
		private var actions:Dictionary = new Dictionary;
		
		public function turnLeft():void{
			turn = LEFT;
			mvNow.scaleX = -1;
		}
		public function turnRight():void{
			turn = RIGHT;
			mvNow.scaleX = 1;
		}
		public function get movies():Array
		{
			return _movies;
		}

		public function set movies(v:Array):void
		{
			_movies = v;
			actions = new Dictionary();
			if(mvNow){
				mvNow.removeFromParent();
			}
			parseMovies(v);
			turnLeft();
		}
		
		private function fixOffset():void
		{
			var jsonData:Object = NpcPanel.npcDic[npcName];
			var offset:Object = jsonData.frameCenter[mvNow.name];
			GameMathUtil.offetXY(m_center,mvNow,offset);
			if(mvNow.pivotX==0){
				mvNow.pivotX = Math.round(m_center.width*0.5-offset.x)/mvNow.width;
			}
		}
		
		private function parseMovies(v:Array):void
		{
			for (var i:int = 0; i < v.length; i++) 
			{
				var mv:GMovieClip = v[i] as GMovieClip;
				var tmp:Array = mv.name.split("_");
				actions[tmp[1]] = mv;
				if(mv.name.indexOf(IDLE)){
					npcName = tmp[0];
					setAction(IDLE);
				}
			}
		}
		public static var LEFT:String = "left";
		public static var RIGHT:String = "right";
		public static var IDLE:String = "idle";
		public var turn:String="";
		private function setAction(key:String):void
		{
			actionNow = IDLE;
			mvNow = actions[actionNow];
			addChild(mvNow);
			fixOffset();
		}
		
		public function Npc()
		{
			super();
		}
		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);
		}
	}
}
package core.panels.node
{
	import flash.display.Graphics;
	import flash.display.Sprite;
	
	public class LevelLines extends Sprite
	{
		public static var lineColor:uint = 0x444444;
		public static var lineWidth:uint = 1;
		private var w:Number;

		private var h:Number;

		private var num:int;

		public var step:Number;
		public function LevelLines()
		{
			super();
		}
		override public function set x(xx:Number):void{
			super.x = xx;
		}
		public function setSize(w:Number,h:Number,num:int):Number{
			if(this.w==w && this.h==h && this.num==num)return step;
			x = 0;
			y = 0;
			this.num = num;
			this.h = h;
			this.w = w;
			var g:Graphics = graphics;
			g.clear();
			g.lineStyle(lineWidth,lineColor);
			var len:int = num-1;
			step = w/len;
			for (var i:int = 1; i < len; i++) 
			{
				var xx:Number = i*step;
				g.moveTo(xx,0);
				g.lineTo(xx,h);
			}
			return step;
		}
	}
}
package core.panels.node
{
	import flash.display.Graphics;
	import flash.display.Sprite;
	import flash.geom.Point;

	public class BezSprite extends Sprite
	{
		private var g:Graphics;

		private var getNums:Boolean;
		private var arr:Array;
		public function BezSprite()
		{
			var points:Array = [];
			g=this.graphics;
		}
		private function getCubicPoint (time:Number, startPoint:Point, controlSPoint:Point, controlEPoint:Point, endPoint:Point):Point {
			var cx:Number = 3*(controlSPoint.x - startPoint.x);
			var bx:Number = 3*(controlEPoint.x - controlSPoint.x) - cx;
			var ax:Number = endPoint.x - startPoint.x - cx - bx;
			
			var cy:Number = 3*(controlSPoint.y - startPoint.y);
			var by:Number = 3*(controlEPoint.y - controlSPoint.y) - cy;
			var ay:Number = endPoint.y - startPoint.y - cy - by;
			
			var tSquared:Number = time * time;
			var tCubed:Number = tSquared * time;
			
			var point:Point = new Point();
			
			point.x = (ax * tCubed) + (bx * tSquared) + (cx * time) + startPoint.x;
			point.y = (ay * tCubed) + (by * tSquared) + (cy * time) + startPoint.y;
			return point;
		}
		public function draw(sz:Array,_getNums:Boolean=false,num:int=100):Array {
			this.getNums = _getNums;
			g.clear();
			var s:Point = sz[0];
			var cs:Point = sz[1];
			var ce:Point = sz[2];
			var e:Point = sz[3];
			draw_lines(sz);
			var last:Point=s;
			var p:Point;
			if(getNums)arr=[];
			var step:Number = 1/num;
			var t:int;
			g.lineStyle(1,0x33bb33);
			g.moveTo(s.x,s.y);
			var beforeEnd:int = num-1;//开始和末尾不计算
			while (t++ <beforeEnd) {
				var point:Point = getCubicPoint(t*step, s, cs, ce, e);
				g.lineTo(point.x, point.y);
				if(getNums){
					arr.push(point);
				}
			}
			return arr;
		}
		public function draw_lines(sz:Array):void {
			var last:Point = sz[0];
			g.lineStyle(1,0x336644);
			for (var i:int=0; i<sz.length; i++) {
				var p:Point=sz[i];
				if(i==0){
					g.moveTo(last.x,last.y);
				}
				g.lineTo(p.x,p.y);
				last = p;
			}
		}
	}
}
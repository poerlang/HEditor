package core.panels.node
{
	import flash.display.Graphics;
	import flash.display.Sprite;
	import flash.geom.Point;

	public class BeziSprite extends Sprite
	{
		private var g:Graphics;

		private var needPoints:Boolean;
		private var timePoints:Array;
		private var xPoints:Array;
		public function BeziSprite()
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
		public function draw(sz:Array,_needPoint:Boolean=false,timePointNum:int=100,boxWidth:Number=100,needPointNum:int=100):Array {
			this.needPoints = _needPoint;
			g.clear();
			var s:Point = sz[0];
			var cs:Point = sz[1];
			var ce:Point = sz[2];
			var e:Point = sz[3];
			draw_lines(sz);
			var last:Point=s;
			var p:Point;
			if(needPoints){
				if(!timePoints || timePoints.length!=timePointNum){
					timePoints=new Array(timePointNum);
					for (var j:int = 0; j < timePointNum; j++) 
					{
						timePoints[j] = new Point;
					}
				}
				if(!xPoints || xPoints.length!=needPointNum){
					xPoints=new Array(needPointNum);
					for (var k:int = 0; k < needPointNum; k++) 
					{
						xPoints[k] = new Point;
					}
				}
			}
			var step:Number = 1/timePointNum;
			var t:int;
			g.lineStyle(1,0x33bb33);
			g.moveTo(s.x,s.y);
			while (t <timePointNum) {
				var point:Point = getCubicPoint(t*step, s, cs, ce, e);
				g.lineTo(point.x, point.y);
				if(needPoints){
					timePoints[t].x = point.x;
					timePoints[t].y = point.y;
				}
				t++;
			}
			if(needPoints){
				var xstep:Number = boxWidth/(needPointNum-1);
				for (var i:int = 0; i < needPointNum; i++) 
				{
					var xx:Number = xstep*i;
					var yy:Number = walk(xx);
					xPoints[i].x = xx;
					xPoints[i].y = yy;
				}
			}
			return xPoints;
		}
		private function walk(xx:Number):Number
		{
			var min:int = 99999999;
			var len:uint = timePoints.length;
			for (var i:int = 0; i < len; i++) 
			{
				var p:Point = timePoints[i];
				var tmp:int = xx-p.x;
				if(-tmp<min){
					min = tmp;
				}else{
					if(i+1<len){
						var p2:Point = timePoints[i+1];
						var fact:Number = (xx-p.x)/(p2.x-p.x);
						return p.y+(p2.y-p.y)*fact;
					}else{
						return p.y;
					}
				}
			}
			return 0;
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
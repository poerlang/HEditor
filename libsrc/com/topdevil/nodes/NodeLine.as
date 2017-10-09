package com.topdevil.nodes
{
	import flash.display.Graphics;
	import flash.display.Sprite;
	import flash.geom.Point;
	import tools.Pool;

	public class NodeLine extends Sprite
	{
		public function NodeLine()
		{
		}
		
		public function reDraw(p0:Point, p2:Point, param4:uint):void
		{
			var g:Graphics = this.graphics;
			g.clear();
			g.lineStyle(0.5,param4);
			g.moveTo(p0.x,p0.y);
			g.lineTo(p2.x,p2.y);
		}
		
		public static function get():NodeLine{
			return Pool.getOB(NodeLine);
		}
		public function removeFromParent():void
		{
			if(parent)parent.removeChild(this);
			Pool.returnOB(this,NodeLine);
		}
	}
}
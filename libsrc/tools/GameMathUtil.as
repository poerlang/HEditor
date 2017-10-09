package tools
{
	import flash.geom.Point;
	import flash.utils.ByteArray;
	
	import fairygui.GObject;

	public class GameMathUtil
	{
		public static function clone(value:Object):Object  
		{  
			var buffer:ByteArray = new ByteArray();  
			buffer.writeObject(value);  
			buffer.position = 0;  
			var result:Object = buffer.readObject();  
			return result;  
		}  
		
		public static function offetXY(centerOB:GObject, mv:GObject, offset:Object):void
		{
			var mvPos:Point = centerOB.localToGlobal();
			mvPos.x+=offset.x;
			mvPos.y+=offset.y;
			var pos:Point = mv.parent.globalToLocal(mvPos.x,mvPos.y);
			mv.x = pos.x;
			mv.y = pos.y;
		}
	}
}
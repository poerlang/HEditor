package tools 
{
	public class Pool
	{
		private static var _pool:Object = new Object();
		/**
		 * 获取
		 **/
		public static function getOB(AClass:Class,param:Object=null):*{
			var arr:Array = _pool[AClass];
			if(arr == null || arr.length == 0){
				var mesh:*;
				if(param!=null){
					mesh = new AClass(param);
				}else{
					mesh = new AClass();
				}
				return mesh;
			}
			return arr.shift();
		}
		/**
		 * 归还
		 **/
		public static function returnOB(ob:*,AClass:Class):void{
			var arr:Array = _pool[AClass];
			if(arr == null){
				arr = [];
			}
			arr.push(ob);
			_pool[AClass] = arr;
		}
	}
}
package core.panels.node
{
	import flash.utils.Dictionary;

	public class StuffManager
	{
		private static var _ins:StuffManager;
		public var dic:Dictionary = new Dictionary();
		public function StuffManager()
		{
		}
		
		public static function get ins():StuffManager
		{
			if(!_ins){
				_ins = new StuffManager();
			}
			return _ins;
		}
		
		public function add(ob:Object):void
		{
			dic[ob.name] = ob;
		}
		public function get(name:String):Object
		{
			return dic[name];
		}
	}
}
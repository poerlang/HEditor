/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_LevelPosDrager extends GComponent
	{
		public var m_line:GGraph;

		public static const URL:String = "ui://rl5gnkttxay58c";

		public static function createInstance():UI_LevelPosDrager
		{
			return UI_LevelPosDrager(UIPackage.createObject("rawui","LevelPosDrager"));
		}

		public function UI_LevelPosDrager()
		{
		}

		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);

			m_line = GGraph(this.getChildAt(1));
		}
	}
}
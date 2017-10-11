/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_LevelPos extends GComponent
	{
		public var m_bg:GGraph;
		public var m_drager:UI_LevelPosDrager;
		public var m_dragBounds:GGraph;

		public static const URL:String = "ui://rl5gnkttxay58b";

		public static function createInstance():UI_LevelPos
		{
			return UI_LevelPos(UIPackage.createObject("rawui","LevelPos"));
		}

		public function UI_LevelPos()
		{
		}

		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);

			m_bg = GGraph(this.getChildAt(0));
			m_drager = UI_LevelPosDrager(this.getChildAt(1));
			m_dragBounds = GGraph(this.getChildAt(2));
		}
	}
}
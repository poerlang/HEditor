/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_BeziArea extends GComponent
	{
		public var m_inlist:GList;
		public var m_levelpos:UI_LevelPos;

		public static const URL:String = "ui://rl5gnkttg34m8d";

		public static function createInstance():UI_BeziArea
		{
			return UI_BeziArea(UIPackage.createObject("rawui","BeziArea"));
		}

		public function UI_BeziArea()
		{
		}

		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);

			m_inlist = GList(this.getChildAt(0));
			m_levelpos = UI_LevelPos(this.getChildAt(1));
		}
	}
}
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_TagList extends GComponent
	{
		public var m_bg2:GGraph;
		public var m_bg:GGraph;
		public var m_list:GList;

		public static const URL:String = "ui://rl5gnkttgawt85";

		public static function createInstance():UI_TagList
		{
			return UI_TagList(UIPackage.createObject("rawui","TagList"));
		}

		public function UI_TagList()
		{
		}

		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);

			m_bg2 = GGraph(this.getChildAt(0));
			m_bg = GGraph(this.getChildAt(1));
			m_list = GList(this.getChildAt(2));
		}
	}
}
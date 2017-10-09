/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_ActionItem extends GButton
	{
		public var m_bg:GGraph;

		public static const URL:String = "ui://rl5gnkttobjb7x";

		public static function createInstance():UI_ActionItem
		{
			return UI_ActionItem(UIPackage.createObject("rawui","ActionItem"));
		}

		public function UI_ActionItem()
		{
		}

		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);

			m_bg = GGraph(this.getChildAt(0));
		}
	}
}
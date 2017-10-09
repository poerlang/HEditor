/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_NpcItem extends GButton
	{
		public var m_txt:GTextField;

		public static const URL:String = "ui://rl5gnkttlpwh7k";

		public static function createInstance():UI_NpcItem
		{
			return UI_NpcItem(UIPackage.createObject("rawui","NpcItem"));
		}

		public function UI_NpcItem()
		{
		}

		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);

			m_txt = GTextField(this.getChildAt(6));
		}
	}
}
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_ComboBoxPopup extends GComponent
	{
		public var m_list:GList;

		public static const URL:String = "ui://rl5gnkttqj2i4c";

		public static function createInstance():UI_ComboBoxPopup
		{
			return UI_ComboBoxPopup(UIPackage.createObject("rawui","ComboBoxPopup"));
		}

		public function UI_ComboBoxPopup()
		{
		}

		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);

			m_list = GList(this.getChildAt(1));
		}
	}
}
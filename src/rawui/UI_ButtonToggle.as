/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_ButtonToggle extends GButton
	{
		public var m_grayedC:Controller;

		public static const URL:String = "ui://rl5gnkttgawt87";

		public static function createInstance():UI_ButtonToggle
		{
			return UI_ButtonToggle(UIPackage.createObject("rawui","ButtonToggle"));
		}

		public function UI_ButtonToggle()
		{
		}

		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);

			m_grayedC = this.getControllerAt(1);
		}
	}
}
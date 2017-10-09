/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_ButtonToggleWithCheck extends GButton
	{
		public var m_grayedC:Controller;

		public static const URL:String = "ui://rl5gnkttgawt86";

		public static function createInstance():UI_ButtonToggleWithCheck
		{
			return UI_ButtonToggleWithCheck(UIPackage.createObject("rawui","ButtonToggleWithCheck"));
		}

		public function UI_ButtonToggleWithCheck()
		{
		}

		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);

			m_grayedC = this.getControllerAt(1);
		}
	}
}
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_Button extends GButton
	{
		public var m_grayedC:Controller;

		public static const URL:String = "ui://rl5gnkttqj2i3x";

		public static function createInstance():UI_Button
		{
			return UI_Button(UIPackage.createObject("rawui","Button"));
		}

		public function UI_Button()
		{
		}

		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);

			m_grayedC = this.getControllerAt(1);
		}
	}
}
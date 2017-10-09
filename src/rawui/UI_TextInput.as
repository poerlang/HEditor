/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_TextInput extends GLabel
	{
		public var m_grayed:Controller;

		public static const URL:String = "ui://rl5gnkttqj2i6h";

		public static function createInstance():UI_TextInput
		{
			return UI_TextInput(UIPackage.createObject("rawui","TextInput"));
		}

		public function UI_TextInput()
		{
		}

		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);

			m_grayed = this.getControllerAt(0);
		}
	}
}
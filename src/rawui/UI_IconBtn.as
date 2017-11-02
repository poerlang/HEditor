/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_IconBtn extends GButton
	{
		public var m_bg:GImage;

		public static const URL:String = "ui://rl5gnkttpx7w8g";

		public static function createInstance():UI_IconBtn
		{
			return UI_IconBtn(UIPackage.createObject("rawui","IconBtn"));
		}

		public function UI_IconBtn()
		{
		}

		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);

			m_bg = GImage(this.getChildAt(0));
		}
	}
}
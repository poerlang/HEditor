/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_PropGroupUI extends GComponent
	{
		public var m_bg:GImage;
		public var m_top:UI_PanelTitle;
		public var m_main:GList;

		public static const URL:String = "ui://rl5gnkttixmn3f";

		public static function createInstance():UI_PropGroupUI
		{
			return UI_PropGroupUI(UIPackage.createObject("rawui","PropGroupUI"));
		}

		public function UI_PropGroupUI()
		{
		}

		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);

			m_bg = GImage(this.getChildAt(0));
			m_top = UI_PanelTitle(this.getChildAt(1));
			m_main = GList(this.getChildAt(2));
		}
	}
}
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_PanelTitle extends GComponent
	{
		public var m_title:GButton;

		public static const URL:String = "ui://rl5gnkttixmn3e";

		public static function createInstance():UI_PanelTitle
		{
			return UI_PanelTitle(UIPackage.createObject("rawui","PanelTitle"));
		}

		public function UI_PanelTitle()
		{
		}

		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);

			m_title = GButton(this.getChildAt(1));
		}
	}
}
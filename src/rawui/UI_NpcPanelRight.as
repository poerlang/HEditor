/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_NpcPanelRight extends GComponent
	{
		public var m_center:UI_CenterPoint;

		public static const URL:String = "ui://rl5gnkttobjb7v";

		public static function createInstance():UI_NpcPanelRight
		{
			return UI_NpcPanelRight(UIPackage.createObject("rawui","NpcPanelRight"));
		}

		public function UI_NpcPanelRight()
		{
		}

		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);

			m_center = UI_CenterPoint(this.getChildAt(1));
		}
	}
}
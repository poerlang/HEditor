/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_Npc extends GComponent
	{
		public var m_inside:GComponent;
		public var m_center:UI_CenterPoint;

		public static const URL:String = "ui://rl5gnkttiftz7n";

		public static function createInstance():UI_Npc
		{
			return UI_Npc(UIPackage.createObject("rawui","Npc"));
		}

		public function UI_Npc()
		{
		}

		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);

			m_inside = GComponent(this.getChildAt(0));
			m_center = UI_CenterPoint(this.getChildAt(1));
		}
	}
}
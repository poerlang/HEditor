/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_NpcContainer extends GComponent
	{
		public var m_me:UI_Npc;
		public var m_boss:UI_Npc;

		public static const URL:String = "ui://rl5gnkttiftz7p";

		public static function createInstance():UI_NpcContainer
		{
			return UI_NpcContainer(UIPackage.createObject("rawui","NpcContainer"));
		}

		public function UI_NpcContainer()
		{
		}

		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);

			m_me = UI_Npc(this.getChildAt(0));
			m_boss = UI_Npc(this.getChildAt(1));
		}
	}
}
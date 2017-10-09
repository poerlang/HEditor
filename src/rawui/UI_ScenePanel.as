/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_ScenePanel extends GComponent
	{
		public var m_c1:Controller;
		public var m_frame:UI_winframe;
		public var m_autoBloodReturn:GButton;
		public var m_container:UI_NpcContainer;
		public var m_borderCheck:GButton;

		public static const URL:String = "ui://rl5gnkttiftz7m";

		public static function createInstance():UI_ScenePanel
		{
			return UI_ScenePanel(UIPackage.createObject("rawui","ScenePanel"));
		}

		public function UI_ScenePanel()
		{
		}

		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);

			m_c1 = this.getControllerAt(0);
			m_frame = UI_winframe(this.getChildAt(0));
			m_autoBloodReturn = GButton(this.getChildAt(2));
			m_container = UI_NpcContainer(this.getChildAt(4));
			m_borderCheck = GButton(this.getChildAt(5));
		}
	}
}
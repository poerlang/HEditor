/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_NpcPanel extends GComponent
	{
		public var m_c1:Controller;
		public var m_frame:UI_winframe;
		public var m_listNpc:GList;
		public var m_newNpc:UI_Button;
		public var m_delNpc:UI_Button;
		public var m_name:GTextField;
		public var m_setTexturePack:UI_Button;
		public var m_listAction:GList;
		public var m_right:UI_NpcPanelRight;
		public var m_editMode:GButton;
		public var m_editAll:GButton;

		public static const URL:String = "ui://rl5gnkttlpwh7g";

		public static function createInstance():UI_NpcPanel
		{
			return UI_NpcPanel(UIPackage.createObject("rawui","NpcPanel"));
		}

		public function UI_NpcPanel()
		{
		}

		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);

			m_c1 = this.getControllerAt(0);
			m_frame = UI_winframe(this.getChildAt(0));
			m_listNpc = GList(this.getChildAt(3));
			m_newNpc = UI_Button(this.getChildAt(4));
			m_delNpc = UI_Button(this.getChildAt(5));
			m_name = GTextField(this.getChildAt(7));
			m_setTexturePack = UI_Button(this.getChildAt(9));
			m_listAction = GList(this.getChildAt(10));
			m_right = UI_NpcPanelRight(this.getChildAt(11));
			m_editMode = GButton(this.getChildAt(12));
			m_editAll = GButton(this.getChildAt(13));
		}
	}
}
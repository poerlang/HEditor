/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_ActionPanel extends GComponent
	{
		public var m_border:Controller;
		public var m_frame:UI_winframe;
		public var m_border_2:GGraph;
		public var m_listPics:GList;
		public var m_search:UI_TextInput;
		public var m_listPicInAction:GList;
		public var m_framePic:GLoader;
		public var m_import:UI_Button;
		public var m_delAllFrame:UI_Button;
		public var m_delFrame:UI_Button;
		public var m_play:UI_Button;
		public var m_pause:UI_Button;
		public var m_frameSec:UI_NumericInput;
		public var m_loop:GButton;
		public var m_borderCheck:GButton;

		public static const URL:String = "ui://rl5gnkttlpwh7j";

		public static function createInstance():UI_ActionPanel
		{
			return UI_ActionPanel(UIPackage.createObject("rawui","ActionPanel"));
		}

		public function UI_ActionPanel()
		{
		}

		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);

			m_border = this.getControllerAt(0);
			m_frame = UI_winframe(this.getChildAt(0));
			m_border_2 = GGraph(this.getChildAt(3));
			m_listPics = GList(this.getChildAt(4));
			m_search = UI_TextInput(this.getChildAt(5));
			m_listPicInAction = GList(this.getChildAt(7));
			m_framePic = GLoader(this.getChildAt(8));
			m_import = UI_Button(this.getChildAt(9));
			m_delAllFrame = UI_Button(this.getChildAt(10));
			m_delFrame = UI_Button(this.getChildAt(11));
			m_play = UI_Button(this.getChildAt(13));
			m_pause = UI_Button(this.getChildAt(14));
			m_frameSec = UI_NumericInput(this.getChildAt(15));
			m_loop = GButton(this.getChildAt(16));
			m_borderCheck = GButton(this.getChildAt(18));
		}
	}
}
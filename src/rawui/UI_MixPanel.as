/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_MixPanel extends GComponent
	{
		public var m_addGoup:Controller;
		public var m_taglistGroup:Controller;
		public var m_mixSel:Controller;
		public var m_frame:UI_winframe;
		public var m_panels:GList;
		public var m_bg1:GGraph;
		public var m_save:UI_Button;
		public var m_mixlist:GList;
		public var m_newStuff:UI_Button;
		public var m_stuffFilterInput:UI_NumericInput;
		public var m_bg2:GGraph;
		public var m_mixFilterInput:UI_NumericInput;
		public var m_outlist:GList;
		public var m_inlist:GList;
		public var m_toOut:UI_Button;
		public var m_toIn:UI_Button;
		public var m_setLabel:UI_ButtonToggle;
		public var m_setTxt:UI_Button;
		public var m_desc:GTextField;
		public var m_stufflist:GList;
		public var m_domixfilter:UI_Button;
		public var m_newMix:UI_Button;
		public var m_dostufffilter:UI_Button;
		public var m_addLevel:GButton;
		public var m_subLevel:GButton;
		public var m_addNum:GButton;
		public var m_subNum:GButton;
		public var m_level:UI_NumericInput;
		public var m_num:UI_NumericInput;
		public var m_addGroup:GGroup;
		public var m_taglist:UI_TagList;

		public static const URL:String = "ui://rl5gnkttijaf7y";

		public static function createInstance():UI_MixPanel
		{
			return UI_MixPanel(UIPackage.createObject("rawui","MixPanel"));
		}

		public function UI_MixPanel()
		{
		}

		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);

			m_addGoup = this.getControllerAt(0);
			m_taglistGroup = this.getControllerAt(1);
			m_mixSel = this.getControllerAt(2);
			m_frame = UI_winframe(this.getChildAt(0));
			m_panels = GList(this.getChildAt(1));
			m_bg1 = GGraph(this.getChildAt(2));
			m_save = UI_Button(this.getChildAt(4));
			m_mixlist = GList(this.getChildAt(5));
			m_newStuff = UI_Button(this.getChildAt(7));
			m_stuffFilterInput = UI_NumericInput(this.getChildAt(8));
			m_bg2 = GGraph(this.getChildAt(10));
			m_mixFilterInput = UI_NumericInput(this.getChildAt(13));
			m_outlist = GList(this.getChildAt(16));
			m_inlist = GList(this.getChildAt(17));
			m_toOut = UI_Button(this.getChildAt(18));
			m_toIn = UI_Button(this.getChildAt(19));
			m_setLabel = UI_ButtonToggle(this.getChildAt(20));
			m_setTxt = UI_Button(this.getChildAt(21));
			m_desc = GTextField(this.getChildAt(22));
			m_stufflist = GList(this.getChildAt(23));
			m_domixfilter = UI_Button(this.getChildAt(24));
			m_newMix = UI_Button(this.getChildAt(25));
			m_dostufffilter = UI_Button(this.getChildAt(26));
			m_addLevel = GButton(this.getChildAt(27));
			m_subLevel = GButton(this.getChildAt(28));
			m_addNum = GButton(this.getChildAt(29));
			m_subNum = GButton(this.getChildAt(30));
			m_level = UI_NumericInput(this.getChildAt(33));
			m_num = UI_NumericInput(this.getChildAt(34));
			m_addGroup = GGroup(this.getChildAt(35));
			m_taglist = UI_TagList(this.getChildAt(36));
		}
	}
}
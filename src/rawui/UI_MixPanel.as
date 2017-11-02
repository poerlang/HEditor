/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_MixPanel extends GComponent
	{
		public var m_addGoup:Controller;
		public var m_taglistGroup:Controller;
		public var m_mixSel:Controller;
		public var m_maxLevelGroupCtrlForMix:Controller;
		public var m_maxLevelGroupCtrlForStuff:Controller;
		public var m_frame:UI_winframe;
		public var m_panels:GList;
		public var m_bg1:GGraph;
		public var m_saveMix:UI_Button;
		public var m_mixlist:GList;
		public var m_newStuff:UI_Button;
		public var m_stuffFilterInput:UI_NumericInput;
		public var m_bg2:GGraph;
		public var m_beziArea:UI_BeziArea;
		public var m_mixFilterInput:UI_NumericInput;
		public var m_outlist:GList;
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
		public var m_hasLevelforMix:GButton;
		public var m_addMaxLevel:GButton;
		public var m_subMaxLevel:GButton;
		public var m_max_level:UI_NumericInput;
		public var m_maxLevelGroup:GGroup;
		public var m_attrArea:UI_BeziArea;
		public var m_addSubStuff:UI_Button;
		public var m_hasLevelforStuff:GButton;
		public var m_addMaxLevelStuff:GButton;
		public var m_subMaxLevelStuff:GButton;
		public var m_max_level_stuff:UI_NumericInput;
		public var m_maxLevelGroupStuff:GGroup;
		public var m_stuffName:GTextField;
		public var m_saveSubStuff:UI_Button;
		public var m_stuffTxt:UI_Button;
		public var m_stuffIcon:UI_Button;
		public var m_bg:GImage;
		public var m_iconLoader:GLoader;

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
			m_maxLevelGroupCtrlForMix = this.getControllerAt(3);
			m_maxLevelGroupCtrlForStuff = this.getControllerAt(4);
			m_frame = UI_winframe(this.getChildAt(0));
			m_panels = GList(this.getChildAt(1));
			m_bg1 = GGraph(this.getChildAt(2));
			m_saveMix = UI_Button(this.getChildAt(4));
			m_mixlist = GList(this.getChildAt(5));
			m_newStuff = UI_Button(this.getChildAt(7));
			m_stuffFilterInput = UI_NumericInput(this.getChildAt(8));
			m_bg2 = GGraph(this.getChildAt(10));
			m_beziArea = UI_BeziArea(this.getChildAt(12));
			m_mixFilterInput = UI_NumericInput(this.getChildAt(13));
			m_outlist = GList(this.getChildAt(14));
			m_toOut = UI_Button(this.getChildAt(15));
			m_toIn = UI_Button(this.getChildAt(16));
			m_setLabel = UI_ButtonToggle(this.getChildAt(17));
			m_setTxt = UI_Button(this.getChildAt(18));
			m_desc = GTextField(this.getChildAt(19));
			m_stufflist = GList(this.getChildAt(20));
			m_domixfilter = UI_Button(this.getChildAt(21));
			m_newMix = UI_Button(this.getChildAt(22));
			m_dostufffilter = UI_Button(this.getChildAt(23));
			m_addLevel = GButton(this.getChildAt(24));
			m_subLevel = GButton(this.getChildAt(25));
			m_addNum = GButton(this.getChildAt(26));
			m_subNum = GButton(this.getChildAt(27));
			m_level = UI_NumericInput(this.getChildAt(30));
			m_num = UI_NumericInput(this.getChildAt(31));
			m_addGroup = GGroup(this.getChildAt(32));
			m_taglist = UI_TagList(this.getChildAt(33));
			m_hasLevelforMix = GButton(this.getChildAt(34));
			m_addMaxLevel = GButton(this.getChildAt(35));
			m_subMaxLevel = GButton(this.getChildAt(36));
			m_max_level = UI_NumericInput(this.getChildAt(38));
			m_maxLevelGroup = GGroup(this.getChildAt(39));
			m_attrArea = UI_BeziArea(this.getChildAt(41));
			m_addSubStuff = UI_Button(this.getChildAt(44));
			m_hasLevelforStuff = GButton(this.getChildAt(45));
			m_addMaxLevelStuff = GButton(this.getChildAt(46));
			m_subMaxLevelStuff = GButton(this.getChildAt(47));
			m_max_level_stuff = UI_NumericInput(this.getChildAt(49));
			m_maxLevelGroupStuff = GGroup(this.getChildAt(50));
			m_stuffName = GTextField(this.getChildAt(51));
			m_saveSubStuff = UI_Button(this.getChildAt(52));
			m_stuffTxt = UI_Button(this.getChildAt(53));
			m_stuffIcon = UI_Button(this.getChildAt(54));
			m_bg = GImage(this.getChildAt(55));
			m_iconLoader = GLoader(this.getChildAt(56));
		}
	}
}
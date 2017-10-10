/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_StuffItem extends GButton
	{
		public var m_grayedC:Controller;
		public var m_c1:Controller;
		public var m_level:GTextField;
		public var m_num:GTextField;
		public var m_beziBg:GGraph;
		public var m_bezi:UI_BeziContainer;
		public var m_beziStart:GGraph;
		public var m_beziEnd:GGraph;
		public var m_dragStart:GComponent;
		public var m_dragEnd:GComponent;
		public var m_addLevel:GButton;
		public var m_subLevel:GButton;
		public var m_addNum:GButton;
		public var m_subNum:GButton;
		public var m_max:UI_NumericInput;
		public var m_min:UI_NumericInput;
		public var m_minMaxGroup:GGroup;

		public static const URL:String = "ui://rl5gnkttev8y80";

		public static function createInstance():UI_StuffItem
		{
			return UI_StuffItem(UIPackage.createObject("rawui","StuffItem"));
		}

		public function UI_StuffItem()
		{
		}

		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);

			m_grayedC = this.getControllerAt(1);
			m_c1 = this.getControllerAt(2);
			m_level = GTextField(this.getChildAt(3));
			m_num = GTextField(this.getChildAt(4));
			m_beziBg = GGraph(this.getChildAt(5));
			m_bezi = UI_BeziContainer(this.getChildAt(6));
			m_beziStart = GGraph(this.getChildAt(7));
			m_beziEnd = GGraph(this.getChildAt(8));
			m_dragStart = GComponent(this.getChildAt(9));
			m_dragEnd = GComponent(this.getChildAt(10));
			m_addLevel = GButton(this.getChildAt(11));
			m_subLevel = GButton(this.getChildAt(12));
			m_addNum = GButton(this.getChildAt(13));
			m_subNum = GButton(this.getChildAt(14));
			m_max = UI_NumericInput(this.getChildAt(17));
			m_min = UI_NumericInput(this.getChildAt(18));
			m_minMaxGroup = GGroup(this.getChildAt(19));
		}
	}
}
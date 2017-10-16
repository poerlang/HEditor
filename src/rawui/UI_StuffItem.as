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
		public var m_beziStart:GGraph;
		public var m_beziEnd:GGraph;
		public var m_dragStart:GComponent;
		public var m_dragEnd:GComponent;
		public var m_addMax:GButton;
		public var m_subMax:GButton;
		public var m_max:UI_NumericInput;
		public var m_minMaxGroup:GGroup;
		public var m_lines:GGraph;
		public var m_bezi:UI_BeziContainer;

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
			m_beziStart = GGraph(this.getChildAt(6));
			m_beziEnd = GGraph(this.getChildAt(7));
			m_dragStart = GComponent(this.getChildAt(8));
			m_dragEnd = GComponent(this.getChildAt(9));
			m_addMax = GButton(this.getChildAt(10));
			m_subMax = GButton(this.getChildAt(11));
			m_max = UI_NumericInput(this.getChildAt(13));
			m_minMaxGroup = GGroup(this.getChildAt(14));
			m_lines = GGraph(this.getChildAt(15));
			m_bezi = UI_BeziContainer(this.getChildAt(16));
		}
	}
}
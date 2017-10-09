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
		}
	}
}
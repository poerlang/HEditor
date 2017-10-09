/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_winframe extends GComponent
	{
		public var m_contentArea:GGraph;
		public var m_closeButton:GButton;
		public var m_dragArea:GGraph;
		public var m_title:GTextField;

		public static const URL:String = "ui://rl5gnkttk1sm2n";

		public static function createInstance():UI_winframe
		{
			return UI_winframe(UIPackage.createObject("rawui","winframe"));
		}

		public function UI_winframe()
		{
		}

		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);

			m_contentArea = GGraph(this.getChildAt(1));
			m_closeButton = GButton(this.getChildAt(2));
			m_dragArea = GGraph(this.getChildAt(3));
			m_title = GTextField(this.getChildAt(4));
		}
	}
}
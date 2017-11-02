/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_IconSelPanel extends GComponent
	{
		public var m_frame:UI_winframe;
		public var m_stuffFilterInput:UI_NumericInput;
		public var m_list:GList;
		public var m_dostufffilter:UI_Button;
		public var m_ok:UI_Button;
		public var m_no:UI_Button;

		public static const URL:String = "ui://rl5gnkttpx7w8f";

		public static function createInstance():UI_IconSelPanel
		{
			return UI_IconSelPanel(UIPackage.createObject("rawui","IconSelPanel"));
		}

		public function UI_IconSelPanel()
		{
		}

		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);

			m_frame = UI_winframe(this.getChildAt(0));
			m_stuffFilterInput = UI_NumericInput(this.getChildAt(2));
			m_list = GList(this.getChildAt(4));
			m_dostufffilter = UI_Button(this.getChildAt(5));
			m_ok = UI_Button(this.getChildAt(7));
			m_no = UI_Button(this.getChildAt(8));
		}
	}
}
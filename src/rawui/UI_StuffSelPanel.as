/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_StuffSelPanel extends GComponent
	{
		public var m_frame:UI_winframe;
		public var m_stuffFilterInput:UI_NumericInput;
		public var m_stufflist:GList;
		public var m_dostufffilter:UI_Button;
		public var m_ok:UI_Button;
		public var m_no:UI_Button;

		public static const URL:String = "ui://rl5gnkttpasn8e";

		public static function createInstance():UI_StuffSelPanel
		{
			return UI_StuffSelPanel(UIPackage.createObject("rawui","StuffSelPanel"));
		}

		public function UI_StuffSelPanel()
		{
		}

		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);

			m_frame = UI_winframe(this.getChildAt(0));
			m_stuffFilterInput = UI_NumericInput(this.getChildAt(2));
			m_stufflist = GList(this.getChildAt(4));
			m_dostufffilter = UI_Button(this.getChildAt(5));
			m_ok = UI_Button(this.getChildAt(7));
			m_no = UI_Button(this.getChildAt(8));
		}
	}
}
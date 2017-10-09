/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_AlertInput extends GComponent
	{
		public var m_frame:UI_winframe;
		public var m_txt:UI_TextInput;
		public var m_ok:UI_Button;
		public var m_cancel:UI_Button;
		public var m_title:GTextField;

		public static const URL:String = "ui://rl5gnkttiftz7t";

		public static function createInstance():UI_AlertInput
		{
			return UI_AlertInput(UIPackage.createObject("rawui","AlertInput"));
		}

		public function UI_AlertInput()
		{
		}

		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);

			m_frame = UI_winframe(this.getChildAt(0));
			m_txt = UI_TextInput(this.getChildAt(1));
			m_ok = UI_Button(this.getChildAt(3));
			m_cancel = UI_Button(this.getChildAt(4));
			m_title = GTextField(this.getChildAt(5));
		}
	}
}
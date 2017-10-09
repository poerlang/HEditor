/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_Alert extends GComponent
	{
		public var m_c1:Controller;
		public var m_frame:UI_winframe;
		public var m_title:GTextField;
		public var m_ok:UI_Button;
		public var m_cancel:UI_Button;

		public static const URL:String = "ui://rl5gnkttiftz7s";

		public static function createInstance():UI_Alert
		{
			return UI_Alert(UIPackage.createObject("rawui","Alert"));
		}

		public function UI_Alert()
		{
		}

		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);

			m_c1 = this.getControllerAt(0);
			m_frame = UI_winframe(this.getChildAt(0));
			m_title = GTextField(this.getChildAt(1));
			m_ok = UI_Button(this.getChildAt(3));
			m_cancel = UI_Button(this.getChildAt(4));
		}
	}
}
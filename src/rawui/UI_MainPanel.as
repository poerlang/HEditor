/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_MainPanel extends GComponent
	{
		public var m_frame:UI_winframe;
		public var m_panelNpc:UI_Button;
		public var m_panelAction:UI_Button;
		public var m_panelBuff:UI_Button;
		public var m_panelScene:UI_Button;
		public var m_panelMix:UI_Button;

		public static const URL:String = "ui://rl5gnkttiftz7r";

		public static function createInstance():UI_MainPanel
		{
			return UI_MainPanel(UIPackage.createObject("rawui","MainPanel"));
		}

		public function UI_MainPanel()
		{
		}

		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);

			m_frame = UI_winframe(this.getChildAt(0));
			m_panelNpc = UI_Button(this.getChildAt(1));
			m_panelAction = UI_Button(this.getChildAt(2));
			m_panelBuff = UI_Button(this.getChildAt(3));
			m_panelScene = UI_Button(this.getChildAt(4));
			m_panelMix = UI_Button(this.getChildAt(5));
		}
	}
}
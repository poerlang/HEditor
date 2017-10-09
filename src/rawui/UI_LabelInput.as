/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_LabelInput extends GComponent
	{
		public var m_right:UI_NumericInput;
		public var m_left:GRichTextField;

		public static const URL:String = "ui://rl5gnkttixmn3g";

		public static function createInstance():UI_LabelInput
		{
			return UI_LabelInput(UIPackage.createObject("rawui","LabelInput"));
		}

		public function UI_LabelInput()
		{
		}

		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);

			m_right = UI_NumericInput(this.getChildAt(0));
			m_left = GRichTextField(this.getChildAt(1));
		}
	}
}
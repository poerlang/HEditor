/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_LabelCombox extends GComponent
	{
		public var m_left:GRichTextField;
		public var m_right:GComboBox;

		public static const URL:String = "ui://rl5gnkttu34g3h";

		public static function createInstance():UI_LabelCombox
		{
			return UI_LabelCombox(UIPackage.createObject("rawui","LabelCombox"));
		}

		public function UI_LabelCombox()
		{
		}

		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);

			m_left = GRichTextField(this.getChildAt(0));
			m_right = GComboBox(this.getChildAt(1));
		}
	}
}
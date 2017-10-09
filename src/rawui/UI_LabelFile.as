/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_LabelFile extends GComponent
	{
		public var m_left:GRichTextField;
		public var m_txt:GRichTextField;
		public var m_right:UI_Button;

		public static const URL:String = "ui://rl5gnkttk0f43i";

		public static function createInstance():UI_LabelFile
		{
			return UI_LabelFile(UIPackage.createObject("rawui","LabelFile"));
		}

		public function UI_LabelFile()
		{
		}

		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);

			m_left = GRichTextField(this.getChildAt(0));
			m_txt = GRichTextField(this.getChildAt(1));
			m_right = UI_Button(this.getChildAt(2));
		}
	}
}
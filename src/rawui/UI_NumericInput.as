/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_NumericInput extends GLabel
	{
		public var m_c1:Controller;
		public var m_grayed:Controller;
		public var m_holder:GGraph;

		public static const URL:String = "ui://rl5gnkttqj2i6i";

		public static function createInstance():UI_NumericInput
		{
			return UI_NumericInput(UIPackage.createObject("rawui","NumericInput"));
		}

		public function UI_NumericInput()
		{
		}

		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);

			m_c1 = this.getControllerAt(0);
			m_grayed = this.getControllerAt(1);
			m_holder = GGraph(this.getChildAt(2));
		}
	}
}
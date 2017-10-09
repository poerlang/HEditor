/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_BufferFileItem extends GButton
	{
		public var m_bg:GGraph;
		public var m_touch:GGraph;

		public static const URL:String = "ui://rl5gnkttiftz7q";

		public static function createInstance():UI_BufferFileItem
		{
			return UI_BufferFileItem(UIPackage.createObject("rawui","BufferFileItem"));
		}

		public function UI_BufferFileItem()
		{
		}

		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);

			m_bg = GGraph(this.getChildAt(0));
			m_touch = GGraph(this.getChildAt(2));
		}
	}
}
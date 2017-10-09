/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_BufferTypeItem extends GComponent
	{
		public var m_c1:Controller;
		public var m_bg:GGraph;
		public var m_title:GTextField;
		public var m_touch:GGraph;

		public static const URL:String = "ui://rl5gnkttiwxl37";

		public static function createInstance():UI_BufferTypeItem
		{
			return UI_BufferTypeItem(UIPackage.createObject("rawui","BufferTypeItem"));
		}

		public function UI_BufferTypeItem()
		{
		}

		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);

			m_c1 = this.getControllerAt(0);
			m_bg = GGraph(this.getChildAt(1));
			m_title = GTextField(this.getChildAt(2));
			m_touch = GGraph(this.getChildAt(3));
		}
	}
}
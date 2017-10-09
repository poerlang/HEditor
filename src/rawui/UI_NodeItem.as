/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_NodeItem extends GLabel
	{
		public var m_bg:GImage;

		public static const URL:String = "ui://rl5gnkttkbos3b";

		public static function createInstance():UI_NodeItem
		{
			return UI_NodeItem(UIPackage.createObject("rawui","NodeItem"));
		}

		public function UI_NodeItem()
		{
		}

		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);

			m_bg = GImage(this.getChildAt(0));
		}
	}
}
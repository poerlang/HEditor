/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_PicItem extends GButton
	{
		public var m_bg:GGraph;

		public static const URL:String = "ui://rl5gnkttlpwh7i";

		public static function createInstance():UI_PicItem
		{
			return UI_PicItem(UIPackage.createObject("rawui","PicItem"));
		}

		public function UI_PicItem()
		{
		}

		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);

			m_bg = GGraph(this.getChildAt(0));
		}
	}
}
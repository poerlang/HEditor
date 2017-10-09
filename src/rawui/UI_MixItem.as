/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_MixItem extends GButton
	{
		public var m_txt:GTextField;

		public static const URL:String = "ui://rl5gnkttev8y82";

		public static function createInstance():UI_MixItem
		{
			return UI_MixItem(UIPackage.createObject("rawui","MixItem"));
		}

		public function UI_MixItem()
		{
		}

		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);

			m_txt = GTextField(this.getChildAt(4));
		}
	}
}
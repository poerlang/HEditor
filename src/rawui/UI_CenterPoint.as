/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_CenterPoint extends GComponent
	{
		public var m_centerBG:GImage;
		public var m_center:GImage;

		public static const URL:String = "ui://rl5gnkttobjb7u";

		public static function createInstance():UI_CenterPoint
		{
			return UI_CenterPoint(UIPackage.createObject("rawui","CenterPoint"));
		}

		public function UI_CenterPoint()
		{
		}

		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);

			m_centerBG = GImage(this.getChildAt(0));
			m_center = GImage(this.getChildAt(1));
		}
	}
}
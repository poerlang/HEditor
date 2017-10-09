/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_BeziContainer extends GComponent
	{
		public var m_bg:GGraph;
		public var m_line:GGraph;
		public var m_o1:GImage;
		public var m_o2:GImage;
		public var m_o3:GImage;
		public var m_o4:GImage;

		public static const URL:String = "ui://rl5gnkttz51b88";

		public static function createInstance():UI_BeziContainer
		{
			return UI_BeziContainer(UIPackage.createObject("rawui","BeziContainer"));
		}

		public function UI_BeziContainer()
		{
		}

		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);

			m_bg = GGraph(this.getChildAt(0));
			m_line = GGraph(this.getChildAt(1));
			m_o1 = GImage(this.getChildAt(2));
			m_o2 = GImage(this.getChildAt(3));
			m_o3 = GImage(this.getChildAt(4));
			m_o4 = GImage(this.getChildAt(5));
		}
	}
}
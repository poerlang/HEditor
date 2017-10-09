/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_NodeContainer extends GComponent
	{
		public var m_lines:GComponent;
		public var m_nodes:GComponent;
		public var m_sel:GGraph;

		public static const URL:String = "ui://rl5gnkttisuo36";

		public static function createInstance():UI_NodeContainer
		{
			return UI_NodeContainer(UIPackage.createObject("rawui","NodeContainer"));
		}

		public function UI_NodeContainer()
		{
		}

		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);

			m_lines = GComponent(this.getChildAt(0));
			m_nodes = GComponent(this.getChildAt(1));
			m_sel = GGraph(this.getChildAt(2));
		}
	}
}
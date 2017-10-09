/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

package rawui
{
	import fairygui.*;

	public class UI_BuffNodePanel extends GComponent
	{
		public var m_frame:UI_winframe;
		public var m_panels:GList;
		public var m_bg:GGraph;
		public var m_c:UI_NodeContainer;
		public var m_nodelist:GList;
		public var m_save:UI_Button;
		public var m_newSkill:UI_Button;
		public var m_bufflist:GList;
		public var m_newNode:UI_Button;

		public static const URL:String = "ui://rl5gnkttfm6735";

		public static function createInstance():UI_BuffNodePanel
		{
			return UI_BuffNodePanel(UIPackage.createObject("rawui","BuffNodePanel"));
		}

		public function UI_BuffNodePanel()
		{
		}

		protected override function constructFromXML(xml:XML):void
		{
			super.constructFromXML(xml);

			m_frame = UI_winframe(this.getChildAt(0));
			m_panels = GList(this.getChildAt(1));
			m_bg = GGraph(this.getChildAt(2));
			m_c = UI_NodeContainer(this.getChildAt(3));
			m_nodelist = GList(this.getChildAt(4));
			m_save = UI_Button(this.getChildAt(5));
			m_newSkill = UI_Button(this.getChildAt(6));
			m_bufflist = GList(this.getChildAt(7));
			m_newNode = UI_Button(this.getChildAt(8));
		}
	}
}
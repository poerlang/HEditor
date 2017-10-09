package bind
{
	import com.topdevil.nodes.NodeContainer;
	import com.topdevil.nodes.NodeItem;
	import com.topdevil.nodes.PropGroupUI;
	
	import core.panels.base.LabelCombox;
	import core.panels.base.LabelFile;
	import core.panels.base.LabelInput;
	import core.panels.base.NumericInput;
	import core.panels.base.TextInput;
	import core.panels.node.BeziContainer;
	import core.panels.node.MixItem;
	import core.panels.node.StuffItem;
	import core.panels.npc.items.NpcItem;
	import core.panels.scene.Npc;
	
	import fairygui.UIObjectFactory;
	
	import rawui.UI_BeziContainer;
	import rawui.UI_LabelCombox;
	import rawui.UI_LabelFile;
	import rawui.UI_LabelInput;
	import rawui.UI_MixItem;
	import rawui.UI_NodeContainer;
	import rawui.UI_NodeItem;
	import rawui.UI_Npc;
	import rawui.UI_NpcItem;
	import rawui.UI_NumericInput;
	import rawui.UI_PropGroupUI;
	import rawui.UI_StuffItem;
	import rawui.UI_TextInput;

	public class RealUIBinder
	{
		public static function bindAll():void
		{
			fairygui.UIObjectFactory.setPackageItemExtension(UI_NodeContainer.URL, NodeContainer);
			fairygui.UIObjectFactory.setPackageItemExtension(UI_NodeItem.URL, NodeItem);
			fairygui.UIObjectFactory.setPackageItemExtension(UI_LabelCombox.URL, LabelCombox);
			fairygui.UIObjectFactory.setPackageItemExtension(UI_LabelFile.URL, LabelFile);
			fairygui.UIObjectFactory.setPackageItemExtension(UI_LabelInput.URL, LabelInput);
			fairygui.UIObjectFactory.setPackageItemExtension(UI_NumericInput.URL, NumericInput);
			fairygui.UIObjectFactory.setPackageItemExtension(UI_PropGroupUI.URL, PropGroupUI);
			fairygui.UIObjectFactory.setPackageItemExtension(UI_NpcItem.URL, NpcItem);
			fairygui.UIObjectFactory.setPackageItemExtension(UI_Npc.URL, Npc);
			fairygui.UIObjectFactory.setPackageItemExtension(UI_MixItem.URL, MixItem);
			fairygui.UIObjectFactory.setPackageItemExtension(UI_StuffItem.URL, StuffItem);
			fairygui.UIObjectFactory.setPackageItemExtension(UI_TextInput.URL, TextInput);
			fairygui.UIObjectFactory.setPackageItemExtension(UI_BeziContainer.URL, BeziContainer);
		}
	}
}
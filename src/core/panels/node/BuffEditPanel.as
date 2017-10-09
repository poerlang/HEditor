package core.panels.node
{
	import com.topdevil.nodes.NodeContainer;
	import com.topdevil.nodes.NodeItem;
	import com.topdevil.nodes.PropGroupUI;
	
	import flash.events.MouseEvent;
	import flash.ui.Keyboard;
	import flash.utils.setTimeout;
	
	import core.panels.base.Alert;
	import core.panels.base.AlertInput;
	import core.panels.base.BaseWindow;
	import tools.FileX;
	import tools.GameMathUtil;
	
	import fairygui.GComponent;
	import fairygui.GList;
	import fairygui.Window;
	import fairygui.event.DropEvent;
	import fairygui.event.GTouchEvent;
	
	import rawui.UI_BuffNodePanel;
	import rawui.UI_BufferFileItem;
	import rawui.UI_PropGroupUI;

	public class BuffEditPanel extends BaseWindow
	{
		private static var _ins:BuffEditPanel;
		public var v:UI_BuffNodePanel;
		public var win:Window;
		private var nodeContainer:NodeContainer;
		private var dataAll:Object = {};
		private var now:NodeItem;
		private var panels:GList;
		private var panelsDic:Object = {};

		public static function get ins():BuffEditPanel
		{
			if(_ins==null){
				_ins = new BuffEditPanel();
			}
			return _ins;
		}
		public function BuffEditPanel()
		{
			super();
			v = UI_BuffNodePanel.createInstance();
			contentPane = v;
			nodeContainer = v.m_c as NodeContainer;
			nodeContainer.addEventListener(DropEvent.DROP,onDrop);
			nodeContainer.nodeClick.add(onNodeClick);
			v.m_save.addClickListener(saveAlert);
			v.m_newNode.addClickListener(create);
			v.addEventListener(MouseEvent.MOUSE_DOWN,onT);
			addBuffFiles();
			v.m_newSkill.addClickListener(clearAndNew);
			panels = v.getChild("panels").asList;
		}
		
		private function saveAlert(e):void
		{
			AlertInput.showTxt("输入技能名（中文）",save);
		}
		
		private function create(e):void
		{
			var n:NodeItem = nodeContainer.create("buff");
		}
		
		protected override function onShown(): void {
			super.onShown();
			regKeys();
		}
		
		protected override function onHide(): void {
			super.onHide();
		}
		
		public function regKeys():void
		{
			if(Keys.regPanel == this)return;
			Keys.regPanel = this;
			Keys.add("del",Keyboard.DELETE,onDelete);
			Keys.add("c",Keyboard.C,onLink);
		}
		public function unRegKeys():void
		{
			Keys.remove("del",Keyboard.DELETE);
			Keys.remove("c",Keyboard.C);
		}
		private var buffFileDataArrForMerge:Array;
		private function addBuffFiles():void
		{
			var list:GList = v.m_bufflist;
			buffFileDataArrForMerge = [];
			FileX.dirToList("res/buff",list,UI_BufferFileItem.URL,doWithBuffFile);
		}
		
		private function doWithBuffFile(ob:Object,item:UI_BufferFileItem):void
		{
			buffFileDataArrForMerge.push(ob);
			item.data = ob;
			item.getChild("title").text = item.name;
			item.addClickListener(onFileClick);
		}
		
		private function onFileClick(e:GTouchEvent):void
		{
			var item:GComponent = e.target as GComponent;
			if(fileNow==item)return;
			fileNow = item;
			fromFile(item.data);
		}
		private var fileNow:GComponent;
		
		private function fromFile(d:Object):void
		{
			clear();
			for (var i:int = 0; i < d.arr.length; i++){
				var o:Object = d.arr[i];
				var n:NodeItem = nodeContainer.add(o);
			}
		}
		
		private function clearAndNew(e:*=null):void
		{
			clear();
			var list:GList = v.getChild("bufflist").asList;
			list.selectNone();
		}
		private function clear(e:*=null):void
		{
			nodeContainer.removeAll();
		}
		
		private function addPropGroup(panelName:String):PropGroupUI
		{
			var p:PropGroupUI = panels.addItemFromPool(UI_PropGroupUI.URL) as PropGroupUI;
			p.clear();
			p.topTitleBtn.title = panelName;
			panelsDic[panelName] = p;
			return p;
		}
		
		private function clearAllProp():void
		{
			for each (var p:PropGroupUI in panelsDic){
				p.clear();
			}
		}
		
		private function from(c:Object,d:Object):void
		{
			var p:PropGroupUI = panelsDic[c.panel] as PropGroupUI;
			if(p==null){
				p = addPropGroup(c.panel);
			}
			p.data = d;
			p.add(c);
			p.resize();
		}
		
		private function onDelete(isDoing:Boolean):void
		{
			if(isDoing)return;
			nodeContainer.deleteSelArr();
		}
		
		private function onDrop(e:DropEvent):void
		{
			nodeContainer.onDrop(e);
		}
		
		private function onLink(isDoing:Boolean):void
		{
			if(isDoing)return;
			nodeContainer.link();
		}
		private function onNodeClick(n:NodeItem):void
		{
			if(n==now){
				return;
			}
			this.now = n;
			panels.removeChildrenToPool(0,-1);
			panelsDic = {};
			var arr:Array = HEditor.nodeConfig.all[n.name];
			clearAllProp();
			if(arr){
				for (var i:int = 0; i < arr.length; i++){
					from(arr[i],n.data);
				}
			}
		}
		private function onT(t:MouseEvent):void
		{
			regKeys();
		}
		
		private function save(fname:String):void
		{
			var list:GList = v.getChild("bufflist").asList;
			var selectedIndex:int = list.selectedIndex;
			var ob:Object = {};
			var len:int = nodeContainer.nodes.numChildren;
			var arr:Array = new Array(len);
			ob.arr = arr;
			var rootNode:NodeItem;
			for (var i:int = 0; i < len; i++){
				var n:NodeItem = nodeContainer.nodes.getChildAt(i) as NodeItem;
				ob.arr[i] = n.getData();
				if(n.isRoot)rootNode=n;
			}
			if(rootNode==null){
				Alert.showTxt("存在父节点才能保存，请创建节点并按 C ，连接节点。");
				return;
			}
			var str:String = JSON.stringify(ob,null,"\t");
			
			
			FileX.stringToFile(str,HEditor.resOutput+"res/buff/"+fname);
			setTimeout(addBuffFiles,37);
			//setTimeout(merge,133);
			setTimeout(function():void{
				list.selectedIndex = selectedIndex;
			},233);
		}
		
		private function merge():void
		{
			buffFileDataArrForMerge;
			var tmp:Array = [];
			var tmpForServer:Array = [];
			for (var i:int = 0; i < buffFileDataArrForMerge.length; i++) 
			{
				var a:Array = buffFileDataArrForMerge[i].arr;
				for (var j:int = 0; j < a.length; j++) 
				{
					tmp.push(a[j]);
					var observer:Object = GameMathUtil.clone(a[j]);
					delete observer['fx'];
					tmpForServer.push(observer);
				}
			}
			var stringify:String = JSON.stringify({buff:tmp},null,"\t");
			var stringify_forServer:String = JSON.stringify({buff:tmpForServer},null,"\t");
			FileX.stringToFile(stringify,HEditor.resOutput+"res/buffs.json");
			FileX.stringToFile(stringify_forServer,HEditor.resOutputForServer+"res/buffs.json");
		}
	}
}
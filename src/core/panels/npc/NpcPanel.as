package core.panels.npc
{
	import flash.events.MouseEvent;
	import flash.filesystem.File;
	import flash.geom.Point;
	import flash.ui.Keyboard;
	import flash.utils.Dictionary;
	import flash.utils.setTimeout;
	
	import core.panels.base.Alert;
	import core.panels.base.AlertInput;
	import core.panels.base.BaseWindow;
	import core.panels.npc.items.NpcItem;
	import core.panels.scene.ScenePanel;
	import tools.FileX;
	import tools.GameMathUtil;
	
	import fairygui.GMovieClip;
	import fairygui.GObject;
	import fairygui.PackageItem;
	import fairygui.PackageItemType;
	import fairygui.UIObjectFactory;
	import fairygui.UIPackage;
	import fairygui.event.ItemEvent;
	
	import rawui.UI_ActionItem;
	import rawui.UI_NpcItem;
	import rawui.UI_NpcPanel;

	public class NpcPanel extends BaseWindow
	{
		private static var _ins:NpcPanel;
		public var v:UI_NpcPanel;
		public static function get ins():NpcPanel
		{
			if(_ins==null){
				_ins = new NpcPanel();
			}
			return _ins;
		}
		public function NpcPanel()
		{
			super();
			v = UI_NpcPanel.createInstance();
			contentPane = v;
			v.m_newNpc.addClickListener(newNpc);
			readAllNpcJson();
			v.m_listNpc.selectedIndex = 0;
			v.m_setTexturePack.addClickListener(onTexturePack);
			v.m_listNpc.addEventListener(ItemEvent.CLICK,onNpcItemClick);
			v.m_listAction.addEventListener(ItemEvent.CLICK,onActionItemClick);
			v.m_right.displayObject.addEventListener(MouseEvent.MOUSE_DOWN,onDrag);
			v.m_right.displayObject.addEventListener(MouseEvent.MOUSE_UP,onDrag);
			v.m_right.displayObject.addEventListener(MouseEvent.MOUSE_MOVE,onDrag);
			v.addClickListener(onClick);
		}
		
		protected function onNpcItemClick(e:ItemEvent):void
		{
			var npcItem:NpcItem = e.itemObject as NpcItem;
			var data:Object = npcItem.data;
			if(data.pack){
				var f:File = FileX.getFile(data.pack);
				onTexurePackSel(f);
			}
		}
		
		private function onClick(e):void
		{
			regKeys();
		}
		
		protected function onDrag(e:MouseEvent):void
		{
			if(!v.m_editMode.selected){
				return;
			}
			if(e.type==MouseEvent.MOUSE_DOWN){
				press = true;
			}
			if(e.type==MouseEvent.MOUSE_UP){
				press = false;
			}
			if(e.type==MouseEvent.MOUSE_MOVE && press){
				if(mv){
					var dx:int = e.stageX-lastX;
					var dy:int = e.stageY-lastY;
					mv.x+=dx;
					mv.y+=dy;
					move(0,0);
				}
			}
			lastX = e.stageX;
			lastY = e.stageY;
		}
		
		protected function onActionItemClick(e:ItemEvent):void
		{
			var actionItem:UI_ActionItem = e.itemObject as UI_ActionItem;
			if(mv){
				mv.removeFromParent();
			}
			mv = actionItem.data as GMovieClip;
			mv.frame = 0;
			v.m_right.addChild(mv);
			
			var npcItem:NpcItem = v.m_listNpc.getChildAt(v.m_listNpc.selectedIndex) as NpcItem;
			var offset:Object = npcItem.data.frameCenter[actionItem.text];
			if(offset){
				GameMathUtil.offetXY(v.m_right.m_center,mv,offset);
			}
		}
		
		private function onTexturePack(e):void
		{
			if(v.m_listNpc.selectedIndex<0){
				Alert.showTxt("请先在左边的列表中选择一个NPC对象");return;
			}
			FileX.selectFile(onTexurePackSel);
		}
		
		private function onTexurePackSel(f:File):void
		{
			rPath = FileX.getRelativePath(f);
			packName = FileX.getSimpleFileName(f);
			item = v.m_listNpc.getChildAt(v.m_listNpc.selectedIndex) as NpcItem;
			var needSave:Boolean;
			if(item.data.pack!=rPath){
				needSave = true;
			}
			item.data.pack = rPath;
			if(needSave){
				save(item);
			}
			pack = UIPackage.getByName(packName);
			if(!pack){
				HEditor.ins.loadmgr.load([rPath],function():void{
					trace("贴图包["+rPath+"]加载完成");
					UIPackage.addPackage(HEditor.ins.loadmgr.get(rPath),null);
					pack = UIPackage.getByName(packName);
					pack.loadAllImages();
					UIPackage.waitToLoadCompleted(whenTexureReady);
				});
			}else{
				whenTexureReady();
			}
		}
		protected function whenTexureReady():void
		{
			var mvInPack:Array = findActionMovieInPack(item.data.name,pack);
			v.m_listAction.removeChildrenToPool();
			for (var i:int = 0; i < mvInPack.length; i++) 
			{
				var mv:GMovieClip = mvInPack[i] as GMovieClip;
				var ui:UI_ActionItem = v.m_listAction.addItemFromPool(UI_ActionItem.URL) as UI_ActionItem;
				ui.data = mv;
				ui.text = mv.name;
			}
			if(mvInPack && mvInPack.length>0){
				ScenePanel.ins.update(mvInPack);
			}
		}
		private function save(item:NpcItem):void
		{
			FileX.objectToFile(item.data,item.data.path);
		}
		public static var npcDic:Dictionary = new Dictionary();
		public static var mvDic:Dictionary = new Dictionary();
		private function findActionMovieInPack(npcName:String,pack:UIPackage):Array
		{
			var arr:Array = [];
			var actionArr:Array = HEditor.cfg.action;
			for (var i:int = 0; i < actionArr.length; i++) 
			{
				var actionName:String = npcName+"_"+actionArr[i];
				var g:GMovieClip;
				g=mvDic[actionName];
				if(!g){
					var packitem:PackageItem = pack.getItemByName(actionName);
					if(packitem){
						if(packitem.type == PackageItemType.MovieClip){
							g = UIObjectFactory.newObject(packitem).asMovieClip;
							g.packageItem = packitem;
							g.constructFromResource();
							g.name = npcName+"_"+actionArr[i];
							arr.push(g);
						}
					}
				}else{
					arr.push(g);
				}
			}
			return arr;
		}
		
		private function updateNpcItemInfo(item:NpcItem):void
		{
			this.item = item;
			var d:Object = item.data;
			v.m_name.text = item.data.name;
			item.m_txt.text = d.pack;
		}
		
		private function readAllNpcJson():void
		{
			var dir:File = FileX.getFile(NPC_JSON_PATH);
			if(dir.exists){
				var arr:Array = dir.getDirectoryListing();
				for (var i:int = 0; i < arr.length; i++) 
				{
					var f:File = arr[i] as File;
					if(f.extension=="json"){
						var data:Object = FileX.FileToObject(f);
						npcDic[data.name] = data;
						setTimeout(add,500,data);
					}
				}
				
			}else{
				Alert.showTxt(NPC_JSON_PATH+",路径不存在");
			}
		}
		
		private function newNpc(e):void
		{
			AlertInput.showTxt("请输入NPC名字（中文）",newNpc2);
		}
		public static var NPC_JSON_PATH:String = "res/npc/json/";

		private var mv:GMovieClip;
		private var press:Boolean;
		private var lastX:Number;
		private var lastY:Number;

		private var item:NpcItem;

		private var rPath:String;

		private var packName:String;

		private var pack:UIPackage;

		protected function newNpc2(str:String):void
		{
			if(str==""){
				Alert.showTxt("NPC名不能为空"); return;
			}
			if(str.length>=15){
				Alert.showTxt("NPC名字过长"); return;
			}
			var path:String = NPC_JSON_PATH+ str +".json";
			if(FileX.exist(path)){
				Alert.showTxt("NPC相文件已存在，不能重复创建"); return;
			}
			var data:Object = {
				name:str,
				pack:"",
				frameCenter:{},
				path:path,
				actions:[],
				skills:[]
			}
			FileX.objectToFile(data,path);
			add(data);
		}
		
		private function add(data:Object):void
		{
			var n:NpcItem = v.m_listNpc.addItemFromPool(UI_NpcItem.URL) as NpcItem;
			v.m_listNpc.selectedIndex = v.m_listNpc.numChildren-1;
			n.title = n.name = data.name;
			n.data = data;
			updateNpcItemInfo(n);
		}
		protected override function onShown(): void {
			super.onShown();
		}
		
		protected override function onHide(): void {
			super.onHide();
		}
		public function regKeys():void
		{
			if(Keys.regPanel == this)return;
			Keys.regPanel = this;
			Keys.add("del",Keyboard.DELETE,onDelete);
			Keys.add("上",Keyboard.UP,moveUp);
			Keys.add("下",Keyboard.DOWN,moveDown);
			Keys.add("左",Keyboard.LEFT,moveLeft);
			Keys.add("右",Keyboard.RIGHT,moveRight);
		}
		public function unRegKeys():void
		{
			Keys.remove("del",Keyboard.DELETE);
			Keys.remove("上",Keyboard.UP);
			Keys.remove("下",Keyboard.DOWN);
			Keys.remove("左",Keyboard.LEFT);
			Keys.remove("右",Keyboard.RIGHT);
		}
		private function moveRight(isDoing:Boolean):void{
			move(1,0);
		}
		private function moveLeft(isDoing:Boolean):void{
			move(-1,0);
		}
		private function moveDown(isDoing:Boolean):void{
			move(0,1);
		}
		private function moveUp(isDoing:Boolean):void
		{
			move(0,-1);
		}
		
		private function move(xx:int, yy:int):void
		{
			if(!v.m_editMode.selected){
				return;
			}
			if(mv){
				mv.x+=xx;
				mv.y+=yy;
				mv.x = Math.round(mv.x);
				mv.y = Math.round(mv.y);
				
				//计算中心偏移
				var npcItem:NpcItem = v.m_listNpc.getChildAt(v.m_listNpc.selectedIndex) as NpcItem;
				var actionItem:UI_ActionItem = v.m_listAction.getChildAt(v.m_listAction.selectedIndex) as UI_ActionItem;
				var mvPos:Point = mv.localToGlobal();
				var centerPos:Point = v.m_right.m_center.localToGlobal();
				npcItem.data.frameCenter[actionItem.text] = {x:mvPos.x-centerPos.x,y:mvPos.y-centerPos.y};
				if(v.m_editAll.selected){
					for(var k:String in npcItem.data.frameCenter){
						npcItem.data.frameCenter[k] = {x:mvPos.x-centerPos.x,y:mvPos.y-centerPos.y};
					}
				}
				//保存偏移
				save(npcItem);
			}
		}
		
		public function onShown(yes:Boolean=true):void
		{
			super.onShown();
			regKeys();
		}
		private function onDelete(isDoing:Boolean):void
		{
			if(isDoing)return;
		}
		
	}
}
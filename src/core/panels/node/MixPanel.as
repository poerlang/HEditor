package core.panels.node
{
	import com.topdevil.nodes.NodeItem;
	import com.topdevil.nodes.PropGroupUI;
	
	import flash.events.MouseEvent;
	import flash.ui.Keyboard;
	import flash.utils.Dictionary;
	
	import core.panels.base.Alert;
	import core.panels.base.AlertInput;
	import core.panels.base.BaseWindow;
	import core.panels.base.NumericInput;
	
	import fairygui.GComponent;
	import fairygui.GList;
	import fairygui.GObject;
	import fairygui.Window;
	import fairygui.event.GTouchEvent;
	import fairygui.event.ItemEvent;
	
	import rawui.UI_BufferFileItem;
	import rawui.UI_ButtonT;
	import rawui.UI_ButtonToggle;
	import rawui.UI_ButtonToggleWithCheck;
	import rawui.UI_MixItem;
	import rawui.UI_MixPanel;
	import rawui.UI_PropGroupUI;
	import rawui.UI_StuffItem;
	
	import tools.FileX;
	import tools.GameMathUtil;
	import tools.Uuid;

	public class MixPanel extends BaseWindow
	{
		private static var MIX_DIR:String = "res/mix/";
		private static var STUFF_DIR:String = "res/stuff/";
		private static var _ins:MixPanel;

		public static function get ins():MixPanel
		{
			if(_ins==null){
				_ins = new MixPanel();
			}
			return _ins;
		}

		public function MixPanel()
		{
			super();
			v = UI_MixPanel.createInstance();
			contentPane = v;
			v.m_save.addClickListener(save);
			v.m_newStuff.addClickListener(createStuff);
			v.m_stufflist.addEventListener(ItemEvent.CLICK,onStuffListItemClick);
			v.m_outlist.addEventListener(ItemEvent.CLICK,onOutListItemClick);
			v.m_inlist.addEventListener(ItemEvent.CLICK,onInListItemClick);
			v.m_mixlist.addEventListener(ItemEvent.CLICK,onMixListItemClick);
			v.addEventListener(MouseEvent.MOUSE_DOWN,onT);
			v.m_newMix.addClickListener(createMix);
			v.m_toOut.addClickListener(toOut);
			v.m_toIn.addClickListener(toIn);
			v.m_addLevel.addClickListener(addLevel);
			v.m_subLevel.addClickListener(subLevel);
			v.m_addNum.addClickListener(addNum);
			v.m_subNum.addClickListener(subNum);
			v.m_bg1.addClickListener(onBgClick);
			v.m_setTxt.addClickListener(onSetTxt);
			(v.m_level as NumericInput).onChange.add(onLevelChange);
			(v.m_num as NumericInput).onChange.add(onNumChange);
			
			mixFilterInput = v.m_mixFilterInput as NumericInput;
			mixFilterInput.onChange.add(onMixFilterChange);
			mixFilterInput.isString = true;
			
			stuffFilterInput = v.m_stuffFilterInput as NumericInput;
			stuffFilterInput.onChange.add(onStuffFilterChange);
			stuffFilterInput.isString = true;
			
			panels = v.m_panels;
			
			level = v.m_level as NumericInput;
			num = v.m_num as NumericInput;
			level.toFixedNum = 0;
			num.toFixedNum = 0;
			refreshStuffList();
			reloadAllMix();
			reloadTags();
			v.m_taglist.m_bg2.addClickListener(function(e):void{
				v.m_taglistGroup.selectedPage = "hide";
			});
			v.m_taglist.m_list.addEventListener(ItemEvent.CLICK,onTagSel);
		}
		
		protected function setTags(tags:Array):void
		{
			var list:GList = v.m_taglist.m_list;
			var len:int = list.numChildren;
			for (var i:int = 0; i < len; i++) 
			{
				var btn:UI_ButtonToggleWithCheck = list.getChildAt(i) as UI_ButtonToggleWithCheck;
				if(tags.indexOf(btn.title)>=0){
					btn.selected = true;
				}
			}
		}
		protected function clearTags():void
		{
			var list:GList = v.m_taglist.m_list;
			var len:int = list.numChildren;
			for (var i:int = 0; i < len; i++) 
			{
				var btn:UI_ButtonToggleWithCheck = list.getChildAt(i) as UI_ButtonToggleWithCheck;
				btn.selected = false;
			}
		}
		protected function onTagSel(e:ItemEvent):void
		{
			var list:GList = v.m_taglist.m_list;
			var len:int = list.numChildren;
			var tags:Array = [];
			for (var i:int = 0; i < len; i++) 
			{
				var btn:UI_ButtonToggleWithCheck = list.getChildAt(i) as UI_ButtonToggleWithCheck;
				if(btn.selected){
					tags.push(btn.data.name);
				}
			}
			if(v.m_mixlist.numChildren>0 || v.m_mixlist.selectedIndex>=0){
				var m:MixItem = v.m_mixlist.getChildAt(v.m_mixlist.selectedIndex) as MixItem;
				m.data.tags = tags;
			}
		}
		
		private function reloadTags():void
		{
			var tag:Object = GameEditor.tag;
			var list:GList = v.m_taglist.m_list;
			for(var key:String in tag) 
			{
				var i:UI_ButtonToggleWithCheck = list.addItemFromPool(UI_ButtonToggleWithCheck.URL) as UI_ButtonToggleWithCheck;
				i.title = tag[key];
				i.data = {index:parseInt(key),name:tag[key]};
			}
		}
		
		public var v:UI_MixPanel;
		public var win:Window;
		
		private var addSubTarget:StuffItem;
		private var allmix:Object = {};
		private var buffFileDataArrForMerge:Array;
		private var fileNow:GComponent;
		private var lastSelList:GList;

		private var level:NumericInput;

		private var mixFilterInput:NumericInput;
		private var now:NodeItem;
		private var num:NumericInput;
		private var panels:GList;
		private var panelsDic:Object = {};
		private var stuffFilterInput:NumericInput;

		private var stuffSel:StuffItem;
		
		public function regKeys():void
		{
			if(Keys.regPanel == this)return;
			Keys.regPanel = this;
			Keys.add("del",Keyboard.DELETE,onDelete);
		}
		public function unRegKeys():void
		{
			Keys.remove("del",Keyboard.DELETE);
		}
		
		override protected  function onHide(): void {
			super.onHide();
		}
		protected function onInListItemClick(e:ItemEvent):void
		{
			lastSelList = v.m_inlist;
			bindAddSub(e.itemObject as StuffItem);
			v.m_addGoup.selectedPage = "show";
		}
		
		protected function onMixListItemClick(e:ItemEvent):void
		{
			lastSelList = v.m_mixlist;
			fromMix(e.itemObject as MixItem);
			v.m_addGoup.selectedPage = "hide";
			v.m_mixSel.selectedPage = "show";
		}
		protected function onOutListItemClick(e:ItemEvent):void
		{
			lastSelList = v.m_outlist;
			bindAddSub(e.itemObject as StuffItem);
			v.m_addGoup.selectedPage = "show";
		}
		
		protected function onSetTxt2(str:String):void
		{
			var m:MixItem = v.m_mixlist.getChildAt(v.m_mixlist.selectedIndex) as MixItem;
			m.data.desc = str;
			v.m_desc.text = str;
		}
		
		override protected  function onShown(): void {
			super.onShown();
			regKeys();
		}
		
		protected function onStuffListItemClick(e:ItemEvent):void
		{
			lastSelList = v.m_stufflist;
			stuffSel = e.itemObject as StuffItem;
		}
		
		private function addLevel(e):void
		{
			if(!addSubTarget)return;
			addSubTarget.data.level += 1;
			bindAddSub(addSubTarget);
			updateInOutItem(addSubTarget);
		}
		
		private function addNum(e):void
		{
			if(!addSubTarget)return;
			addSubTarget.data.num += 1;
			bindAddSub(addSubTarget);
			updateInOutItem(addSubTarget);
		}
		
		private function addPropGroup(panelName:String):PropGroupUI
		{
			var p:PropGroupUI = panels.addItemFromPool(UI_PropGroupUI.URL) as PropGroupUI;
			p.clear();
			p.topTitleBtn.title = panelName;
			panelsDic[panelName] = p;
			return p;
		}
		
		private function addStuff(ob:Object):void
		{
			StuffManager.ins.add(ob);
			var stuffItem:StuffItem = v.m_stufflist.addItemFromPool(UI_StuffItem.URL) as StuffItem;
			stuffItem.data = ob;
			stuffItem.title = ob.name;
		}
		private function bindAddSub(i:StuffItem):void
		{
			addSubTarget = i;
			v.m_level.text = i.data.level;
			v.m_num.text = i.data.num;
		}
		
		private function clearAllProp():void
		{
			for each (var p:PropGroupUI in panelsDic){
				p.clear();
			}
		}
		
		private function createMix(e:*=null):void
		{
			if(e){
				v.m_inlist.removeChildrenToPool();
				v.m_outlist.removeChildrenToPool();
			}
			var randomName:String = new Uuid().toString();
			var ob:Object = {ins:[],outs:[],name:randomName};
			FileX.stringToFile(JSON.stringify(ob,null,"\t"),MIX_DIR+randomName);
			var m:MixItem = v.m_mixlist.addItemFromPool(UI_MixItem.URL) as MixItem;
			m.data = ob;
			updateOneMix(ob,m);
			v.m_mixlist.selectedIndex = v.m_mixlist.numChildren-1;
			v.m_mixlist.scrollToView(v.m_mixlist.numChildren-1);
		}
		
		private function createStuff(e=null):void
		{
			AlertInput.showTxt("请输入物品名称",createStuff2);
		}
		
		private function createStuff2(str:String):void
		{
			if(!str){
				Alert.showTxt("名字不能为空");
				return;
			}
			var ob:Object = {name:str,num:1,level:1,icon:"",tag:[],sub:[],numType:0,numStr:[],desc:"",getWay:""};
			updateSearchKeys(ob,true);
			var obStr:String = JSON.stringify(ob,null,"\t");
			FileX.stringToFile(obStr,STUFF_DIR+str);
			addStuff(ob);
		}
		
		private function doDel():Object
		{
			var i:Object = lastSelList.getChildAt(lastSelList.selectedIndex);
			i.removeFromParent();
			return i;
		}
		
		private function doWithBuffFile(ob:Object,item:UI_BufferFileItem):void
		{
			buffFileDataArrForMerge.push(ob);
			item.data = ob;
			item.getChild("title").text = item.name;
			item.addClickListener(onFileClick);
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
		
		private function fromFile(data:Object):void
		{
			
		}
		
		private function fromMix(m:MixItem):void
		{
			v.m_inlist.removeChildrenToPool();
			v.m_outlist.removeChildrenToPool();
			var ob:Object = m.data;
			var item:StuffItem;
			var one:Object;
			var real:Object;
			if(ob.desc){
				v.m_desc.text = ob.desc;
			}else{
				v.m_desc.text = "";
			}
			clearTags();
			if(ob.tags && ob.tags.length>0){
				setTags(ob.tags);
			}
			for (var i:int = 0; i < ob.ins.length; i++) 
			{
				one = ob.ins[i];
				item = v.m_inlist.addItemFromPool(UI_StuffItem.URL) as StuffItem;
				item.data = one;
				updateInOutItem(item);
				real = StuffManager.ins.get(one.name);
				if(!real){
					item.alpha = 0.5;
				}
			}
			for (var j:int = 0; j < ob.outs.length; j++) 
			{
				one = ob.outs[j];
				item = v.m_outlist.addItemFromPool(UI_StuffItem.URL) as StuffItem;
				item.data = one;
				updateInOutItem(item);
				real = StuffManager.ins.get(one.name);
				if(!real){
					item.alpha = 0.5;
				}
			}
		}
		
		private function getDatasFromList(list:GList):Array
		{
			var arr:Array = [];
			var len:int = list.numChildren;
			for (var i:int = 0; i < len; i++) 
			{
				var item:StuffItem = list.getChildAt(i) as StuffItem;
				arr.push({num:item.data.num,level:item.data.level,name:item.data.name});
			}
			return arr;
		}
		
		private function getNamesFromArr(arr:Array):String{
			var str:String = "";
			for (var i:int = 0; i < arr.length; i++) 
			{
				str+= arr[i].name+" ";
			}
			return str; 
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
			FileX.stringToFile(stringify,GameEditor.resOutput+"res/buffs.json");
			FileX.stringToFile(stringify_forServer,GameEditor.resOutputForServer+"res/buffs.json");
		}
		
		private function onBgClick(e):void
		{
			v.m_addGoup.selectedPage = "hide";
		}
		
		private function onDelete(isDoing:Boolean):void
		{
			if(isDoing)return;
			if(lastSelList && lastSelList.numChildren && lastSelList.selectedIndex>=0){
				if(lastSelList == v.m_stufflist){
					Alert.showTxt("是否删除此物品？",function():void{
						var i:StuffItem = doDel() as StuffItem;
						FileX.del(STUFF_DIR+i.data.name);
						if(stuffSel == i){
							stuffSel = null;
						}
					},function():void{});
				}else if(lastSelList == v.m_mixlist){
					Alert.showTxt("是否删除此合成配方？",function():void{
						var i:MixItem = doDel() as MixItem;
						FileX.del(MIX_DIR+i.data.name);
					},function():void{});
				}else{
					doDel();
				}
			}
		}
		
		private function onFileClick(e:GTouchEvent):void
		{
			var item:GComponent = e.target as GComponent;
			if(fileNow==item)return;
			fileNow = item;
			fromFile(item.data);
		}
		
		private function onLevelChange():void
		{
			if(!addSubTarget)return;
			addSubTarget.data.level = parseInt(v.m_level.text);
			bindAddSub(addSubTarget);
			updateInOutItem(addSubTarget);
		}
		
		private function onMixFilterChange():void
		{
			var key:String = (mixFilterInput.text);
			if(key){
				v.m_mixlist.removeChildrenToPool();
				var len:int = v.m_mixlist.numChildren;
				var arr:Array = [];
				for each (var ob:Object in allmix) 
				{
					var keys:Array = ob.keys;
					if(!keys)continue;
					for (var i:int = 0; i < keys.length; i++) 
					{
						var onkey:String = keys[i];
						if(onkey.indexOf(key)>=0){
							arr.push(ob);
							break;
						}
					}
				}
				for (var j:int = 0; j < arr.length; j++) 
				{
					var m:MixItem = v.m_mixlist.addItemFromPool(UI_MixItem.URL) as MixItem;
					var o:Object = arr[j];
					updateOneMix(o,m);
				}
				
			}else{
				reloadAllMix();
			}
		}
		
		private function onNodeClick(n:NodeItem):void
		{
			if(n==now){
				return;
			}
			this.now = n;
			panels.removeChildrenToPool(0,-1);
			panelsDic = {};
			var arr:Array = GameEditor.nodeConfig.all[n.name];
			clearAllProp();
			if(arr){
				for (var i:int = 0; i < arr.length; i++){
					from(arr[i],n.data);
				}
			}
		}
		private function onNumChange():void
		{
			if(!addSubTarget)return;
			addSubTarget.data.num = parseInt(v.m_num.text);
			bindAddSub(addSubTarget);
			updateInOutItem(addSubTarget);
		}
		
		private function onRefreshOneStuff(ob:Object,item:StuffItem):void
		{
			item.title = ob.name;
			item.data = ob;
			StuffManager.ins.add(ob);
			item.m_c1.selectedIndex = 0;
		}
		
		private function onSetTxt(e):void
		{
			if(v.m_mixlist.numChildren==0 || v.m_mixlist.selectedIndex==-1){
				Alert.showTxt("请先选择一个合成配方");
				return;
			}
			AlertInput.showTxt("设置对话文本",onSetTxt2);
		}
		private function onStuffFilterChange():void
		{
			var key:String = (stuffFilterInput.text);
			if(key){
				v.m_stufflist.removeChildrenToPool();
				var len:int = v.m_stufflist.numChildren;
				var arr:Array = [];
				var dic:Dictionary = StuffManager.ins.dic;
				for each (var ob:Object in dic) 
				{
					var keys:Array = ob.keys;
					if(!keys)continue;
					for (var i:int = 0; i < keys.length; i++) 
					{
						var onkey:String = keys[i];
						if(onkey.indexOf(key)>=0){
							arr.push(ob);
							break;
						}
					}
				}
				for (var j:int = 0; j < arr.length; j++) 
				{
					var m:StuffItem = v.m_stufflist.addItemFromPool(UI_StuffItem.URL) as StuffItem;
					var o:Object = arr[j];
					onRefreshOneStuff(o,m);
				}
				
			}else{
				refreshStuffList();
			}
		}
		private function onT(t:MouseEvent):void
		{
			regKeys();
		}
		
		private function refreshStuffList():void
		{
			v.m_stufflist.removeChildrenToPool();
			FileX.dirToList(STUFF_DIR,v.m_stufflist,UI_StuffItem.URL,onRefreshOneStuff);
		}
		
		private function reloadAllMix():void
		{
			allmix = {};
			v.m_mixlist.removeChildrenToPool();
			FileX.dirToList(MIX_DIR,v.m_mixlist,UI_MixItem.URL,reloadOneMix);
		}
		private function reloadOneMix(ob:Object,i:MixItem):void
		{
			allmix[ob.name] = ob;
			i.data = ob;
			updateOneMix(ob,i);
		}
		private function save(fname:String):void
		{
			var selectedIndex:int;
			selectedIndex = v.m_mixlist.selectedIndex;
			if(v.m_mixlist.numChildren==0 || selectedIndex==-1){
				createMix();
			}
			selectedIndex = v.m_mixlist.selectedIndex;
			var mix:MixItem = v.m_mixlist.getChildAt(selectedIndex) as MixItem;
			var ob:Object = mix.data;
			var inlist:GList = v.m_inlist;
			var outlist:GList = v.m_outlist;
			var arrIn:Array = getDatasFromList(inlist);
			var arrOut:Array = getDatasFromList(outlist);
			ob.ins = arrIn;
			ob.outs = arrOut;
			updateSearchKeys(ob);
			updateOneMix(ob,mix);
			FileX.stringToFile(JSON.stringify(ob,null,"\t"),MIX_DIR+ob.name);
		}
		private function subLevel(e):void
		{
			if(!addSubTarget)return;
			addSubTarget.data.level -= 1;
			bindAddSub(addSubTarget);
			updateInOutItem(addSubTarget);
		}
		private function subNum(e):void
		{
			if(!addSubTarget)return;
			addSubTarget.data.num -= 1;
			bindAddSub(addSubTarget);
			updateInOutItem(addSubTarget);
		}
		private function toIn(e):void
		{
			if(!stuffSel){
				Alert.showTxt("请先在下面的列表中选择一个物品");
				return;
			}
			var ob:Object = GameMathUtil.clone(stuffSel.data);
			var i:StuffItem = v.m_inlist.addItemFromPool(UI_StuffItem.URL) as StuffItem;
			i.data = ob;
			updateInOutItem(i);
		}
		
		private function toOut(e):void
		{
			if(!stuffSel){
				Alert.showTxt("请先在下面的列表中选择一个物品");
				return;
			}
			var ob:Object = GameMathUtil.clone(stuffSel.data);
			var i:StuffItem = v.m_outlist.addItemFromPool(UI_StuffItem.URL) as StuffItem;
			i.data = ob;
			updateInOutItem(i);
		}
		
		private function updateInOutItem(i:StuffItem):void
		{
			i.alpha = 1;
			var ob:Object = i.data;
			i.title = ob.name;
			i.m_level.text = "等级 "+ob.level;
			i.m_num.text = "× "+ob.num;
			i.m_c1.selectedIndex = 1;
		}
		
		private function updateOneMix(ob:Object, i:MixItem):void
		{
			if(ob.ins.length==0 || ob.outs.length==0){
				i.title = ob.name;
				i.m_txt.text = "";
			}else{
				i.title = getNamesFromArr(ob.outs);
				i.m_txt.text = getNamesFromArr(ob.ins);
			}
		}
		
		private function updateSearchKeys(ob:Object,justName:Boolean=false):void
		{
			var keys:Array = [];
			var i:int;
			var n:String;
			if(justName){
				keys.push(ob.name);
				keys.push(PinYin.toPinyin(ob.name,""));
				keys.push(PinYin.toPinyin(ob.name,"",true));
			}else{
				if(ob.outs && ob.outs.length){
					for (i = 0; i < ob.outs.length; i++) 
					{
						n = ob.outs[i].name;
						keys.push(n);
						keys.push(PinYin.toPinyin(n,""));
						keys.push(PinYin.toPinyin(n,"",true));
					}
				}
				if(ob.ins && ob.ins.length){
					for (i = 0; i < ob.ins.length; i++) 
					{
						n = ob.ins[i].name;
						keys.push(n);
						keys.push(PinYin.toPinyin(n,""));
						keys.push(PinYin.toPinyin(n,"",true));
					}
				}
			}
			ob.keys = keys;
		}
	}
}
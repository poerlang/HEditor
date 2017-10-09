package com.topdevil.nodes
{
	import core.panels.base.LabelCombox;
	import core.panels.base.LabelFile;
	import core.panels.base.LabelInput;
	
	import fairygui.GButton;
	import fairygui.GComponent;
	import fairygui.GImage;
	import fairygui.GList;
	import fairygui.UIPackage;
	
	import rawui.UI_LabelFile;
	import rawui.UI_LabelInput;
	import rawui.UI_PropGroupUI;
	
	public class PropGroupUI extends UI_PropGroupUI
	{
		public var top:GComponent;
		public var topTitleBtn:GButton;
		public var mainList:GList;
		public var bg:GImage;
		public function PropGroupUI()
		{
			super();
		}
		override public function constructFromResource():void
		{
			super.constructFromResource();
			initUI();
		}
		
		private function initUI():void
		{
			top = getChild("top").asCom;
			topTitleBtn = top.getChild("title").asButton;
			bg = getChild("bg").asImage;
			mainList = getChild("main").asList;
			topTitleBtn.addClickListener(onTitleBtnClick);
			resize();
		}
		
		private function onTitleBtnClick(e):void
		{
			resize();
		}
		
		public function resize():void
		{
			var b:Boolean = topTitleBtn.selected;
			bg.visible = b;
			mainList.visible = b;
			mainList.resizeToFit();
			if(b){
				this.height = mainList.y+mainList.viewHeight+5;
			}else{
				this.height = top.height;
			}
		}
		
		public function add(c:Object):void
		{
			var ipt:LabelInput = null;
			var val:String;
			if(!data.hasOwnProperty("fx")) data.fx = {};
			if(c.type=="int,combox"){
				var box:LabelCombox = mainList.addItemFromPool(UIPackage.getItemURL("rawui" , "LabelCombox")) as LabelCombox;
				box.clear();
				box.setCfg(c);
				box.data = data;
				if(c.panel=="特效"){
					if(data.fx.hasOwnProperty(c.name)){
						box.val = data.fx[c.name];
					}else{
						if(c.hasOwnProperty("def")){
							box.box.selectedIndex = c.def;
							data.fx[c.name] = c.def;
						}
					}
				}else{
					if(data.hasOwnProperty(c.name)){
						box.val = data[c.name];
					}else{
						if(c.hasOwnProperty("def")){
							box.box.selectedIndex = c.def;
							data[c.name] = c.def;
						}
					}
				}
			}
			if(c.type=="str"){
				ipt = mainList.addItemFromPool(UI_LabelInput.URL) as LabelInput;
				ipt.setCfg(c);
				ipt.clear();
				ipt.data = data;
				if(c.panel=="特效"){
					if(data.fx.hasOwnProperty(c.name)){
						ipt.val = data.fx[c.name];
					}else{
						if(c.hasOwnProperty("def")){
							if(c.def=="hash"){
								val = LabelFile.getHash();
							}else{
								val = c.def;//def -> 默认值
							}
							ipt.txt.text = val+"";
							data.fx[c.name] = val;
						}else{
							ipt.txt.text = "";
						}
					}
				}else{
					if(data.hasOwnProperty(c.name)){
						ipt.val = data[c.name];
					}else{
						if(c.hasOwnProperty("def")){
							if(c.def=="hash"){
								val = LabelFile.getHash();
							}else{
								val = c.def;//def -> 默认值
							}
							ipt.txt.text = val+"";
							data[c.name] = val;
						}else{
							ipt.txt.text = "";
						}
					}
				}
			}
			if(c.type=="str,file"){
				var lf:LabelFile = mainList.addItemFromPool(UI_LabelFile.URL) as LabelFile;
				lf.setCfg(c);
				lf.clear();
				lf.data = data;
				if(c.panel=="特效"){
					if(data.fx.hasOwnProperty(c.name)){
						lf.val = data.fx[c.name];
					}else{
						if(c.hasOwnProperty("def")){
							if(c.def=="hash" && val==null){
								val = LabelFile.getHash();
							}else{
								val = c.def;//def -> 默认值
							}
							data.fx[c.name] = lf.val = val;
						}else{
							val = "";
						}
					}
				}else{
					if(data.hasOwnProperty(c.name)){
						lf.val = data[c.name];
					}else{
						if(c.hasOwnProperty("def")){
							if(c.def=="hash" && val==null){
								val = LabelFile.getHash();
							}else{
								val = c.def;//def -> 默认值
							}
							data[c.name] = lf.val = val;
						}else{
							val = "";
						}
					}					
				}

			}
			if(c.type=="num"){
				ipt = mainList.addItemFromPool(UI_LabelInput.URL) as LabelInput;
				ipt.setCfg(c);

				ipt.clear();
				ipt.data = data;
				if(c.panel=="特效"){
					if(data.fx.hasOwnProperty(c.name)){
						ipt.val = data.fx[c.name];
					}else{
						if(c.hasOwnProperty("def")){
							ipt.val = c.def;
							data.fx[c.name] = c.def;
						}else{
							ipt.val = 0;
						}
					}	
				}else{
					if(data.hasOwnProperty(c.name)){
						ipt.val = data[c.name];
					}else{
						if(c.hasOwnProperty("def")){
							ipt.val = c.def;
							data[c.name] = c.def;
						}else{
							ipt.val = 0;
						}
					}					
				}

			}
		}
		
		public function clear():void
		{
			data = null;
			mainList.removeChildrenToPool();
		}
	}
}
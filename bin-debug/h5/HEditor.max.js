
/***********************************/
/*http://www.layabox.com  2017/3/23*/
/***********************************/
var Laya=window.Laya=(function(window,document){
	var Laya={
		__internals:[],
		__packages:{},
		__classmap:{'Object':Object,'Function':Function,'Array':Array,'String':String},
		__sysClass:{'object':'Object','array':'Array','string':'String','dictionary':'Dictionary'},
		__propun:{writable: true,enumerable: false,configurable: true},
		__presubstr:String.prototype.substr,
		__substr:function(ofs,sz){return arguments.length==1?Laya.__presubstr.call(this,ofs):Laya.__presubstr.call(this,ofs,sz>0?sz:(this.length+sz));},
		__init:function(_classs){_classs.forEach(function(o){o.__init$ && o.__init$();});},
		__isClass:function(o){return o && (o.__isclass || o==Object || o==String || o==Array);},
		__newvec:function(sz,value){
			var d=[];
			d.length=sz;
			for(var i=0;i<sz;i++) d[i]=value;
			return d;
		},
		__extend:function(d,b){
			for (var p in b){
				if (!b.hasOwnProperty(p)) continue;
				var gs=Object.getOwnPropertyDescriptor(b, p);
				var g = gs.get, s = gs.set; 
				if ( g || s ) {
					if ( g && s)
						Object.defineProperty(d,p,gs);
					else{
						g && Object.defineProperty(d, p, g);
						s && Object.defineProperty(d, p, s);
					}
				}
				else d[p] = b[p];
			}
			function __() { Laya.un(this,'constructor',d); }__.prototype=b.prototype;d.prototype=new __();Laya.un(d.prototype,'__imps',Laya.__copy({},b.prototype.__imps));
		},
		__copy:function(dec,src){
			if(!src) return null;
			dec=dec||{};
			for(var i in src) dec[i]=src[i];
			return dec;
		},
		__package:function(name,o){
			if(Laya.__packages[name]) return;
			Laya.__packages[name]=true;
			var p=window,strs=name.split('.');
			if(strs.length>1){
				for(var i=0,sz=strs.length-1;i<sz;i++){
					var c=p[strs[i]];
					p=c?c:(p[strs[i]]={});
				}
			}
			p[strs[strs.length-1]] || (p[strs[strs.length-1]]=o||{});
		},
		__hasOwnProperty:function(name,o){
			o=o ||this;
		    function classHas(name,o){
				if(Object.hasOwnProperty.call(o.prototype,name)) return true;
				var s=o.prototype.__super;
				return s==null?null:classHas(name,s);
			}
			return (Object.hasOwnProperty.call(o,name)) || classHas(name,o.__class);
		},
		__typeof:function(o,value){
			if(!o || !value) return false;
			if(value===String) return (typeof o==='string');
			if(value===Number) return (typeof o==='number');
			if(value.__interface__) value=value.__interface__;
			else if(typeof value!='string')  return (o instanceof value);
			return (o.__imps && o.__imps[value]) || (o.__class==value);
		},
		__as:function(value,type){
			return (this.__typeof(value,type))?value:null;
		},		
		interface:function(name,_super){
			Laya.__package(name,{});
			var ins=Laya.__internals;
			var a=ins[name]=ins[name] || {self:name};
			if(_super)
			{
				var supers=_super.split(',');
				a.extend=[];
				for(var i=0;i<supers.length;i++){
					var nm=supers[i];
					ins[nm]=ins[nm] || {self:nm};
					a.extend.push(ins[nm]);
				}
			}
			var o=window,words=name.split('.');
			for(var i=0;i<words.length-1;i++) o=o[words[i]];
			o[words[words.length-1]]={__interface__:name};
		},
		class:function(o,fullName,_super,miniName){
			_super && Laya.__extend(o,_super);
			if(fullName){
				Laya.__package(fullName,o);
				Laya.__classmap[fullName]=o;
				if(fullName.indexOf('.')>0){
					if(fullName.indexOf('laya.')==0){
						var paths=fullName.split('.');
						miniName=miniName || paths[paths.length-1];
						if(Laya[miniName]) console.log("Warning!,this class["+miniName+"] already exist:",Laya[miniName]);
						Laya[miniName]=o;
					}
				}
				else {
					if(fullName=="Main")
						window.Main=o;
					else{
						if(Laya[fullName]){
							console.log("Error!,this class["+fullName+"] already exist:",Laya[fullName]);
						}
						Laya[fullName]=o;
					}
				}
			}
			var un=Laya.un,p=o.prototype;
			un(p,'hasOwnProperty',Laya.__hasOwnProperty);
			un(p,'__class',o);
			un(p,'__super',_super);
			un(p,'__className',fullName);
			un(o,'__super',_super);
			un(o,'__className',fullName);
			un(o,'__isclass',true);
			un(o,'super',function(o){this.__super.call(o);});
		},
		imps:function(dec,src){
			if(!src) return null;
			var d=dec.__imps|| Laya.un(dec,'__imps',{});
			function __(name){
				var c,exs;
				if(! (c=Laya.__internals[name]) ) return;
				d[name]=true;
				if(!(exs=c.extend)) return;
				for(var i=0;i<exs.length;i++){
					__(exs[i].self);
				}
			}
			for(var i in src) __(i);
		},
		getset:function(isStatic,o,name,getfn,setfn){
			if(!isStatic){
				getfn && Laya.un(o,'_$get_'+name,getfn);
				setfn && Laya.un(o,'_$set_'+name,setfn);
			}
			else{
				getfn && (o['_$GET_'+name]=getfn);
				setfn && (o['_$SET_'+name]=setfn);
			}
			if(getfn && setfn) 
				Object.defineProperty(o,name,{get:getfn,set:setfn,enumerable:false});
			else{
				getfn && Object.defineProperty(o,name,{get:getfn,enumerable:false});
				setfn && Object.defineProperty(o,name,{set:setfn,enumerable:false});
			}
		},
		static:function(_class,def){
				for(var i=0,sz=def.length;i<sz;i+=2){
					if(def[i]=='length') 
						_class.length=def[i+1].call(_class);
					else{
						function tmp(){
							var name=def[i];
							var getfn=def[i+1];
							Object.defineProperty(_class,name,{
								get:function(){delete this[name];return this[name]=getfn.call(this);},
								set:function(v){delete this[name];this[name]=v;},enumerable: true,configurable: true});
						}
						tmp();
					}
				}
		},		
		un:function(obj,name,value){
			value || (value=obj[name]);
			Laya.__propun.value=value;
			Object.defineProperty(obj, name, Laya.__propun);
			return value;
		},
		uns:function(obj,names){
			names.forEach(function(o){Laya.un(obj,o)});
		}
	};

    window.console=window.console || ({log:function(){}});
	window.trace=window.console.log;
	Error.prototype.throwError=function(){throw arguments;};
	//String.prototype.substr=Laya.__substr;
	Object.defineProperty(Array.prototype,'fixed',{enumerable: false});

	return Laya;
})(window,document);

(function(window,document,Laya){
	var __un=Laya.un,__uns=Laya.uns,__static=Laya.static,__class=Laya.class,__getset=Laya.getset,__newvec=Laya.__newvec;
	Laya.interface('fairygui.IUISource');
	Laya.interface('fairygui.IColorGear');
	Laya.interface('fairygui.IAnimationGear');
	Laya.interface('org.osflash.signals.ISlot');
	Laya.interface('org.assetloader.core.IParam');
	Laya.interface('fairygui.event.IBubbleEvent');
	Laya.interface('org.osflash.signals.IOnceSignal');
	Laya.interface('org.assetloader.core.ILoadStats');
	Laya.interface('fairygui.display.UIDisplayObject');
	Laya.interface('org.assetloader.core.IConfigParser');
	Laya.interface('fairygui.ITextColorGear','fairygui.IColorGear');
	//class bind.RealUIBinder
	var RealUIBinder=(function(){
		function RealUIBinder(){};
		__class(RealUIBinder,'bind.RealUIBinder');
		RealUIBinder.bindAll=function(){
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttisuo36",NodeContainer);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttkbos3b",NodeItem);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttu34g3h",LabelCombox);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttk0f43i",LabelFile);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttixmn3g",LabelInput);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttqj2i6i",NumStrInput);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttixmn3f",PropGroupUI);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttlpwh7k",NpcItem);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttiftz7n",Npc);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttxay58b",LevelPos);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttev8y82",MixItem);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttev8y80",StuffItem);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttqj2i6h",TextInput);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttz51b88",BeziContainer);
		}

		return RealUIBinder;
	})()


	//class rawui.rawuiBinder
	var rawuiBinder=(function(){
		function rawuiBinder(){};
		__class(rawuiBinder,'rawui.rawuiBinder');
		rawuiBinder.bindAll=function(){
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttev8y80",UI_StuffItem);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttev8y82",UI_MixItem);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttfm6735",UI_BuffNodePanel);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttg34m8d",UI_BeziArea);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttgawt85",UI_TagList);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttgawt86",UI_ButtonToggleWithCheck);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttgawt87",UI_ButtonToggle);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttiftz7m",UI_ScenePanel);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttiftz7n",UI_Npc);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttiftz7p",UI_NpcContainer);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttiftz7q",UI_BufferFileItem);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttiftz7r",UI_MainPanel);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttiftz7s",UI_Alert);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttiftz7t",UI_AlertInput);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttijaf7y",UI_MixPanel);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttisuo36",UI_NodeContainer);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttiwxl37",UI_BufferTypeItem);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttixmn3e",UI_PanelTitle);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttixmn3f",UI_PropGroupUI);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttixmn3g",UI_LabelInput);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttk0f43i",UI_LabelFile);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttk1sm2n",UI_winframe);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttkbos3b",UI_NodeItem);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttlpwh7g",UI_NpcPanel);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttlpwh7i",UI_PicItem);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttlpwh7j",UI_ActionPanel);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttlpwh7k",UI_NpcItem);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttobjb7u",UI_CenterPoint);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttobjb7v",UI_NpcPanelRight);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttobjb7x",UI_ActionItem);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttpasn8e",UI_StuffSelPanel);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttpx7w8f",UI_IconSelPanel);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttpx7w8g",UI_IconBtn);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttqj2i3x",UI_Button);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttqj2i4c",UI_ComboBoxPopup);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttqj2i6h",UI_TextInput);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttqj2i6i",UI_NumericInput);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttu34g3h",UI_LabelCombox);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttxay58b",UI_LevelPos);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttxay58c",UI_LevelPosDrager);
			UIObjectFactory.setPackageItemExtension("ui://rl5gnkttz51b88",UI_BeziContainer);
		}

		return rawuiBinder;
	})()


	/**
	*A node in the list of listeners in a signal.
	*/
	//class ash.signals.ListenerNode
	var ListenerNode=(function(){
		function ListenerNode(){
			this.previous=null;
			this.next=null;
			this.listener=null;
			this.once=false;
		}

		__class(ListenerNode,'ash.signals.ListenerNode');
		return ListenerNode;
	})()


	/**
	*This internal class maintains a pool of deleted listener nodes for reuse by framework. This reduces
	*the overhead from object creation and garbage collection.
	*/
	//class ash.signals.ListenerNodePool
	var ListenerNodePool=(function(){
		function ListenerNodePool(){
			this.tail=null;
			this.cacheTail=null;
		}

		__class(ListenerNodePool,'ash.signals.ListenerNodePool');
		var __proto=ListenerNodePool.prototype;
		__proto.get=function(){
			if(this.tail){
				var node=this.tail;
				this.tail=this.tail.previous;
				node.previous=null;
				return node;
			}
			else{
				return new ListenerNode();
			}
		}

		__proto.dispose=function(node){
			node.listener=null;
			node.once=false;
			node.next=null;
			node.previous=this.tail;
			this.tail=node;
		}

		__proto.cache=function(node){
			node.listener=null;
			node.previous=this.cacheTail;
			this.cacheTail=node;
		}

		__proto.releaseCache=function(){
			while(this.cacheTail){
				var node=this.cacheTail;
				this.cacheTail=node.previous;
				node.next=null;
				node.previous=this.tail;
				this.tail=node;
			}
		}

		return ListenerNodePool;
	})()


	/**
	*InputController is the parent of all the controllers classes. It provides the same helper that CitrusObject class :
	*it can be initialized with a params object,which can be created via an object parser/factory.
	*/
	//class citrus.input.input.InputController
	var InputController=(function(){
		function InputController(input,name,params){
			this.name=null;
			this._input=null;
			this._initialized=false;
			this._enabled=true;
			this._updateEnabled=false;
			this._defaultChannel=0;
			this.action=null;
			this._input=input;
			this.name=name;
			this.setParams(params);
			this._input.addController(this);
		}

		__class(InputController,'citrus.input.input.InputController');
		var __proto=InputController.prototype;
		/**
		*Override this function if you need your controller to update when CitrusEngine updates the Input instance.
		*/
		__proto.update=function(){}
		/**
		*Will register the action to the Input system as an action with an InputPhase.BEGIN phase.
		*@param name string that defines the action such as "jump" or "fly"
		*@param value optional value for your action.
		*@param message optional message for your action.
		*@param channel optional channel for your action. (will be set to the defaultChannel if not set.
		*/
		__proto.triggerON=function(name,value,message,channel){
			(value===void 0)&& (value=0);
			(channel===void 0)&& (channel=-1);
			if (this._enabled){
				this.action=InputAction.create(name,this,(channel < 0)? this.defaultChannel :channel ,value,message);
				this._input.actionON.dispatch(this.action);
				return this.action;
			}
			return null;
		}

		/**
		*Will register the action to the Input system as an action with an InputPhase.END phase.
		*@param name string that defines the action such as "jump" or "fly"
		*@param value optional value for your action.
		*@param message optional message for your action.
		*@param channel optional channel for your action. (will be set to the defaultChannel if not set.
		*/
		__proto.triggerOFF=function(name,value,message,channel){
			(value===void 0)&& (value=0);
			(channel===void 0)&& (channel=-1);
			if (this._enabled){
				this.action=InputAction.create(name,this,(channel < 0)? this.defaultChannel :channel ,value,message);
				this._input.actionOFF.dispatch(this.action);
				return this.action;
			}
			return null;
		}

		/**
		*Will register the action to the Input system as an action with an InputPhase.BEGIN phase if its not yet in the
		*actions list,otherwise it will update the existing action's value and set its phase back to InputPhase.ON.
		*@param name string that defines the action such as "jump" or "fly"
		*@param value optional value for your action.
		*@param message optional message for your action.
		*@param channel optional channel for your action. (will be set to the defaultChannel if not set.
		*/
		__proto.triggerCHANGE=function(name,value,message,channel){
			(value===void 0)&& (value=0);
			(channel===void 0)&& (channel=-1);
			if (this._enabled){
				this.action=InputAction.create(name,this,(channel < 0)? this.defaultChannel :channel ,value,message);
				this._input.actionCHANGE.dispatch(this.action);
				return this.action;
			}
			return null;
		}

		/**
		*Will register the action to the Input system as an action with an InputPhase.END phase if its not yet in the
		*actions list as well as a time to 1 (so that it will be considered as already triggered.
		*@param name string that defines the action such as "jump" or "fly"
		*@param value optional value for your action.
		*@param message optional message for your action.
		*@param channel optional channel for your action. (will be set to the defaultChannel if not set.
		*/
		__proto.triggerONCE=function(name,value,message,channel){
			(value===void 0)&& (value=0);
			(channel===void 0)&& (channel=-1);
			if (this._enabled){
				this.action=InputAction.create(name,this,(channel < 0)? this.defaultChannel :channel ,value,message,3);
				this._input.actionON.dispatch(this.action);
				this.action=InputAction.create(name,this,(channel < 0)? this.defaultChannel :channel ,value,message,3);
				this._input.actionOFF.dispatch(this.action);
				return this.action;
			}
			return null;
		}

		/**
		*Removes this controller from Input.
		*/
		__proto.destroy=function(){
			this._input.removeController(this);
			this.action=null;
		}

		__proto.toString=function(){
			return this.name;
		}

		__proto.setParams=function(object){
			for (var param in object){
				try{
					if (object[param]=="true")
						this[param]=true;
					else if (object[param]=="false")
					this[param]=false;
					else
					this[param]=object[param];
				}
				catch (e){
					if (!InputController.hideParamWarnings)
						console.log("Warning: The parameter "+param+" does not exist on "+this);
				}
			}
			this._initialized=true;
		}

		__getset(0,__proto,'defaultChannel',function(){
			return this._defaultChannel;
			},function(value){
			if (value==this._defaultChannel)
				return;
			this._input.stopActionsOf(this);
			this._defaultChannel=value;
		});

		__getset(0,__proto,'enabled',function(){
			return this._enabled;
			},function(val){
			this._enabled=val;
		});

		__getset(0,__proto,'updateEnabled',function(){
			return this._updateEnabled;
		});

		InputController.hideParamWarnings=false;
		return InputController;
	})()


	/**
	*InputAction reinforces the Action object structure (and typing.)
	*it contains static action phase constants as well as helpful comparators.
	*/
	//class citrus.input.input.InputAction
	var InputAction=(function(){
		function InputAction(name,controller,channel,value,message,phase,time){
			this._name=null;
			this._controller=null;
			this._channel=0;
			this._time=0;
			this._value=NaN;
			this._message=null;
			this._phase=0;
			(channel===void 0)&& (channel=0);
			(value===void 0)&& (value=0);
			(phase===void 0)&& (phase=0);
			(time===void 0)&& (time=0);
			this._name=name;
			this._controller=controller;
			this._channel=channel;
			this._value=value;
			this._message=message;
			this._phase=phase;
			this._time=time;
		}

		__class(InputAction,'citrus.input.input.InputAction');
		var __proto=InputAction.prototype;
		/**
		*Clones the action and returns a new InputAction instance with the same properties.
		*/
		__proto.clone=function(){
			return citrus.input.input.InputAction.create(this._name,this._controller,this._channel ,this._value,this._message,this._phase,this._time);
		}

		/**
		*comp is used to compare an action with another action without caring about which controller
		*the actions came from. it is the most common form of action comparison.
		*/
		__proto.comp=function(action){
			return this._name==action.name && this._channel==action.channel;
		}

		/**
		*eq is almost a strict action comparator. It will not only compare names and channels
		*but also which controller the actions came from.
		*/
		__proto.eq=function(action){
			return this._name==action.name && this._controller==action.controller && this._channel==action.channel;
		}

		__proto.toString=function(){
			return "\n[ Action # name: "+this._name+" channel: "+this._channel+" value: "+this._value+" phase: "+this._phase+" controller: "+this._controller+" time: "+this._time+" ]";
		}

		/**
		*set all InputActions's properties (internal for recycling)
		*/
		__proto.setTo=function(name,controller,channel,value,message,phase,time){
			(channel===void 0)&& (channel=0);
			(value===void 0)&& (value=0);
			(phase===void 0)&& (phase=0);
			(time===void 0)&& (time=0);
			this._name=name;
			this._controller=controller;
			this._channel=channel;
			this._value=value;
			this._message=message;
			this._phase=phase;
			this._time=time;
			return this;
		}

		__proto.dispose=function(){
			this._controller=null;
			var a;
			var $each_a;
			for($each_a in InputAction.disposed)
			if (this==a)
				return;
			InputAction.disposed.push(this);
		}

		__getset(0,__proto,'name',function(){return this._name;});
		/**
		*InputController that triggered this action
		*/
		__getset(0,__proto,'controller',function(){return this._controller;});
		/**
		*message the action carries
		*/
		__getset(0,__proto,'message',function(){return this._message;});
		/**
		*time (in frames)the action has been 'running' in the Input system.
		*/
		__getset(0,__proto,'time',function(){return this._time;});
		/**
		*action channel id.
		*/
		__getset(0,__proto,'channel',function(){return this._channel;});
		/**
		*value the action carries
		*/
		__getset(0,__proto,'value',function(){return this._value;});
		/**
		*action phase
		*/
		__getset(0,__proto,'phase',function(){return this._phase;});
		/**
		*internal utiliy to keep public time read only
		*/
		__getset(0,__proto,'itime',function(){return this._time;},function(val){this._time=val;});
		InputAction.create=function(name,controller,channel,value,message,phase,time){
			(channel===void 0)&& (channel=0);
			(value===void 0)&& (value=0);
			(phase===void 0)&& (phase=0);
			(time===void 0)&& (time=0);
			if (InputAction.disposed.length > 0)
				return InputAction.disposed.pop().setTo(name,controller,channel,value,message,phase,time);
			else
			return new InputAction(name,controller,channel,value,message,phase,time);
		}

		InputAction.clearDisposed=function(){
			InputAction.disposed.length=0;
		}

		InputAction.disposed=[];
		return InputAction;
	})()


	//class citrus.input.input.InputPhase
	var InputPhase=(function(){
		function InputPhase(){};
		__class(InputPhase,'citrus.input.input.InputPhase');
		InputPhase.BEGIN=0;
		InputPhase.BEGAN=1;
		InputPhase.ON=2;
		InputPhase.END=3;
		InputPhase.ENDED=4;
		return InputPhase;
	})()


	/**
	*This class provides encoding and decoding of the JSON format.
	*
	*Example usage:
	*<code>
	*// create a JSON string from an internal object
	*JSON.encode(myObject );
	*
	*// read a JSON string into an internal object
	*var myObject:Object=JSON.decode(jsonString );
	*</code>
	*/
	//class com.adobe.serialization.json.JSON
	var JSON=(function(){
		function JSON(){};
		__class(JSON,'com.adobe.serialization.json.JSON');
		JSON.encode=function(o){
			return new JSONEncoder(o).getString();
		}

		JSON.decode=function(s,strict){
			(strict===void 0)&& (strict=true);
			return new JSONDecoder(s,strict).getValue();
		}

		return JSON;
	})()


	//class com.adobe.serialization.json.JSONDecoder
	var JSONDecoder=(function(){
		function JSONDecoder(s,strict){
			this.strict=false;
			this.value=null;
			this.tokenizer=null;
			this.token=null;
			this.strict=strict;
			this.tokenizer=new JSONTokenizer(s,strict);
			this.nextToken();
			this.value=this.parseValue();
			if (strict && this.nextToken()!=null){
				this.tokenizer.parseError("Unexpected characters left in input stream");
			}
		}

		__class(JSONDecoder,'com.adobe.serialization.json.JSONDecoder');
		var __proto=JSONDecoder.prototype;
		/**
		*Gets the internal object that was created by parsing
		*the JSON string passed to the constructor.
		*
		*@return The internal object representation of the JSON
		*string that was passed to the constructor
		*@langversion ActionScript 3.0
		*@playerversion Flash 9.0
		*@tiptext
		*/
		__proto.getValue=function(){
			return this.value;
		}

		/**
		*Returns the next token from the tokenzier reading
		*the JSON string
		*/
		__proto.nextToken=function(){
			return this.token=this.tokenizer.getNextToken();
		}

		/**
		*Returns the next token from the tokenizer reading
		*the JSON string and verifies that the token is valid.
		*/
		__proto.nextValidToken=function(){
			this.token=this.tokenizer.getNextToken();
			this.checkValidToken();
			return this.token;
		}

		/**
		*Verifies that the token is valid.
		*/
		__proto.checkValidToken=function(){
			if (this.token==null){
				this.tokenizer.parseError("Unexpected end of input");
			}
		}

		/**
		*Attempt to parse an array.
		*/
		__proto.parseArray=function(){
			var a=[];
			this.nextValidToken();
			if (this.token.type==4){
				return a;
			}
			else if (!this.strict && this.token.type==0){
				this.nextValidToken();
				if (this.token.type==4){
					return a;
				}
				else{
					this.tokenizer.parseError("Leading commas are not supported.  Expecting ']' but found "+this.token.value);
				}
			}
			while (true){
				a.push(this.parseValue());
				this.nextValidToken();
				if (this.token.type==4){
					return a;
				}
				else if (this.token.type==0){
					this.nextToken();
					if (!this.strict){
						this.checkValidToken();
						if (this.token.type==4){
							return a;
						}
					}
				}
				else{
					this.tokenizer.parseError("Expecting ] or , but found "+this.token.value);
				}
			}
			return null;
		}

		/**
		*Attempt to parse an object.
		*/
		__proto.parseObject=function(){
			var o=new Object();
			var key
			this.nextValidToken();
			if (this.token.type==2){
				return o;
			}
			else if (!this.strict && this.token.type==0){
				this.nextValidToken();
				if (this.token.type==2){
					return o;
				}
				else{
					this.tokenizer.parseError("Leading commas are not supported.  Expecting '}' but found "+this.token.value);
				}
			}
			while (true){
				if (this.token.type==10){
					key=String(this.token.value);
					this.nextValidToken();
					if (this.token.type==6){
						this.nextToken();
						o[ key]=this.parseValue();
						this.nextValidToken();
						if (this.token.type==2){
							return o;
						}
						else if (this.token.type==0){
							this.nextToken();
							if (!this.strict){
								this.checkValidToken();
								if (this.token.type==2){
									return o;
								}
							}
						}
						else{
							this.tokenizer.parseError("Expecting } or , but found "+this.token.value);
						}
					}
					else{
						this.tokenizer.parseError("Expecting : but found "+this.token.value);
					}
				}
				else{
					this.tokenizer.parseError("Expecting string but found "+this.token.value);
				}
			}
			return null;
		}

		/**
		*Attempt to parse a value
		*/
		__proto.parseValue=function(){
			this.checkValidToken();
			switch (this.token.type){
				case 1:
					return this.parseObject();
				case 3:
					return this.parseArray();
				case 10:
				case 11:
				case 7:
				case 8:
				case 9:
					return this.token.value;
				case 12:
					if (!this.strict){
						return this.token.value;
					}
					else{
						this.tokenizer.parseError("Unexpected "+this.token.value);
					}
				default :
					this.tokenizer.parseError("Unexpected "+this.token.value);
				}
			return null;
		}

		return JSONDecoder;
	})()


	//class com.adobe.serialization.json.JSONToken
	var JSONToken=(function(){
		function JSONToken(type,value){
			this.type=0;
			this.value=null;
			(type===void 0)&& (type=-1);
			this.type=type;
			this.value=value;
		}

		__class(JSONToken,'com.adobe.serialization.json.JSONToken');
		JSONToken.create=function(type,value){
			(type===void 0)&& (type=-1);
			JSONToken.token.type=type;
			JSONToken.token.value=value;
			return JSONToken.token;
		}

		__static(JSONToken,
		['token',function(){return this.token=new JSONToken();}
		]);
		return JSONToken;
	})()


	//class com.adobe.serialization.json.JSONTokenizer
	var JSONTokenizer=(function(){
		function JSONTokenizer(s,strict){
			this.strict=false;
			this.obj=null;
			this.jsonString=null;
			this.loc=0;
			this.ch=null;
			this.controlCharsRegExp=/[\x00-\x1F]/;
			this.jsonString=s;
			this.strict=strict;
			this.loc=0;
			this.nextChar();
		}

		__class(JSONTokenizer,'com.adobe.serialization.json.JSONTokenizer');
		var __proto=JSONTokenizer.prototype;
		/**
		*Gets the next token in the input sting and advances
		*the character to the next character after the token
		*/
		__proto.getNextToken=function(){
			var token=null;
			this.skipIgnored();
			switch (this.ch){
				case '{':
					token=JSONToken.create(1,this.ch);
					this.nextChar();
					break
				case '}':
					token=JSONToken.create(2,this.ch);
					this.nextChar();
					break
				case '[':
					token=JSONToken.create(3,this.ch);
					this.nextChar();
					break
				case ']':
					token=JSONToken.create(4,this.ch);
					this.nextChar();
					break
				case ',':
					token=JSONToken.create(0,this.ch);
					this.nextChar();
					break
				case ':':
					token=JSONToken.create(6,this.ch);
					this.nextChar();
					break ;
				case 't':;
					var possibleTrue="t"+this.nextChar()+this.nextChar()+this.nextChar();
					if (possibleTrue=="true"){
						token=JSONToken.create(7,true);
						this.nextChar();
					}
					else{
						this.parseError("Expecting 'true' but found "+possibleTrue);
					}
					break ;
				case 'f':;
					var possibleFalse="f"+this.nextChar()+this.nextChar()+this.nextChar()+this.nextChar();
					if (possibleFalse=="false"){
						token=JSONToken.create(8,false);
						this.nextChar();
					}
					else{
						this.parseError("Expecting 'false' but found "+possibleFalse);
					}
					break ;
				case 'n':;
					var possibleNull="n"+this.nextChar()+this.nextChar()+this.nextChar();
					if (possibleNull=="null"){
						token=JSONToken.create(9,null);
						this.nextChar();
					}
					else{
						this.parseError("Expecting 'null' but found "+possibleNull);
					}
					break ;
				case 'N':;
					var possibleNaN="N"+this.nextChar()+this.nextChar();
					if (possibleNaN=="NaN"){
						token=JSONToken.create(12,NaN);
						this.nextChar();
					}
					else{
						this.parseError("Expecting 'NaN' but found "+possibleNaN);
					}
					break ;
				case '"':
					token=this.readString();
					break ;
				default :
					if (this.isDigit(this.ch)|| this.ch=='-'){
						token=this.readNumber();
					}
					else if (this.ch==''){
						token=null;
					}
					else{
						this.parseError("Unexpected "+this.ch+" encountered");
					}
				}
			return token;
		}

		/**
		*Attempts to read a string from the input string. Places
		*the character location at the first character after the
		*string. It is assumed that ch is " before this method is called.
		*
		*@return the JSONToken with the string value if a string could
		*be read. Throws an error otherwise.
		*/
		__proto.readString=function(){
			var quoteIndex=this.loc;
			do{
				quoteIndex=this.jsonString.indexOf("\"",quoteIndex);
				if (quoteIndex >=0){
					var backspaceCount=0;
					var backspaceIndex=quoteIndex-1;
					while (this.jsonString.charAt(backspaceIndex)=="\\"){
						backspaceCount++;
						backspaceIndex--;
					}
					if ((backspaceCount & 1)==0){
						break ;
					}
					quoteIndex++;
				}
				else{
					this.parseError("Unterminated string literal");
				}
			}while (true);
			var token=JSONToken.create(
			10,
			this.unescapeString(this.jsonString.substr(this.loc,quoteIndex-this.loc)));
			this.loc=quoteIndex+1;
			this.nextChar();
			return token;
		}

		/**
		*Convert all JavaScript escape characters into normal characters
		*
		*@param input The input string to convert
		*@return Original string with escape characters replaced by real characters
		*/
		__proto.unescapeString=function(input){
			if (this.strict && this.controlCharsRegExp.test(input)){
				this.parseError("String contains unescaped control character (0x00-0x1F)");
			};
			var result="";
			var backslashIndex=0;
			var nextSubstringStartPosition=0;
			var len=input.length;
			do{
				backslashIndex=input.indexOf('\\',nextSubstringStartPosition);
				if (backslashIndex >=0){
					result+=input.substr(nextSubstringStartPosition,backslashIndex-nextSubstringStartPosition);
					nextSubstringStartPosition=backslashIndex+2;
					var escapedChar=input.charAt(backslashIndex+1);
					switch (escapedChar){
						case '"':
							result+=escapedChar;
							break ;
						case '\\':
							result+=escapedChar;
							break ;
						case 'n':
							result+='\n';
							break ;
						case 'r':
							result+='\r';
							break ;
						case 't':
							result+='\t';
							break ;
						case 'u':;
							var hexValue="";
							var unicodeEndPosition=nextSubstringStartPosition+4;
							if (unicodeEndPosition > len){
								this.parseError("Unexpected end of input.  Expecting 4 hex digits after \\u.");
							}
							for (var i=nextSubstringStartPosition;i < unicodeEndPosition;i++){
								var possibleHexChar=input.charAt(i);
								if (!this.isHexDigit(possibleHexChar)){
									this.parseError("Excepted a hex digit, but found: "+possibleHexChar);
								}
								hexValue+=possibleHexChar;
							}
							result+=String.fromCharCode(parseInt(hexValue,16));
							nextSubstringStartPosition=unicodeEndPosition;
							break ;
						case 'f':
							result+='\f';
							break ;
						case '/':
							result+='/';
							break ;
						case 'b':
							result+='\b';
							break ;
						default :
							result+='\\'+escapedChar;
						}
				}
				else{
					result+=input.substr(nextSubstringStartPosition);
					break ;
				}
			}while (nextSubstringStartPosition < len);
			return result;
		}

		/**
		*Attempts to read a number from the input string. Places
		*the character location at the first character after the
		*number.
		*
		*@return The JSONToken with the number value if a number could
		*be read. Throws an error otherwise.
		*/
		__proto.readNumber=function(){
			var input="";
			if (this.ch=='-'){
				input+='-';
				this.nextChar();
			}
			if (!this.isDigit(this.ch)){
				this.parseError("Expecting a digit");
			}
			if (this.ch=='0'){
				input+=this.ch;
				this.nextChar();
				if (this.isDigit(this.ch)){
					this.parseError("A digit cannot immediately follow 0");
				}
				else if (!this.strict && this.ch=='x'){
					input+=this.ch;
					this.nextChar();
					if (this.isHexDigit(this.ch)){
						input+=this.ch;
						this.nextChar();
					}
					else{
						this.parseError("Number in hex format require at least one hex digit after \"0x\"");
					}
					while (this.isHexDigit(this.ch)){
						input+=this.ch;
						this.nextChar();
					}
				}
			}
			else{
				while (this.isDigit(this.ch)){
					input+=this.ch;
					this.nextChar();
				}
			}
			if (this.ch=='.'){
				input+='.';
				this.nextChar();
				if (!this.isDigit(this.ch)){
					this.parseError("Expecting a digit");
				}
				while (this.isDigit(this.ch)){
					input+=this.ch;
					this.nextChar();
				}
			}
			if (this.ch=='e' || this.ch=='E'){
				input+="e"
				this.nextChar();
				if (this.ch=='+' || this.ch=='-'){
					input+=this.ch;
					this.nextChar();
				}
				if (!this.isDigit(this.ch)){
					this.parseError("Scientific notation number needs exponent value");
				}
				while (this.isDigit(this.ch)){
					input+=this.ch;
					this.nextChar();
				}
			};
			var num=Number(input);
			if (isFinite(num)&& !isNaN(num)){
				return JSONToken.create(11,num);
			}
			else{
				this.parseError("Number "+num+" is not valid!");
			}
			return null;
		}

		/**
		*Reads the next character in the input
		*string and advances the character location.
		*
		*@return The next character in the input string,or
		*null if we've read past the end.
		*/
		__proto.nextChar=function(){
			return this.ch=this.jsonString.charAt(this.loc++);
		}

		/**
		*Advances the character location past any
		*sort of white space and comments
		*/
		__proto.skipIgnored=function(){
			var originalLoc=0;
			do{
				originalLoc=this.loc;
				this.skipWhite();
				this.skipComments();
			}while (originalLoc !=this.loc);
		}

		/**
		*Skips comments in the input string,either
		*single-line or multi-line. Advances the character
		*to the first position after the end of the comment.
		*/
		__proto.skipComments=function(){
			if (this.ch=='/'){
				this.nextChar();
				switch (this.ch){
					case '/':
						do{
							this.nextChar();
						}while (this.ch !='\n' && this.ch !='')
						this.nextChar();
						break ;
					case '*':
						this.nextChar();
						while (true){
							if (this.ch=='*'){
								this.nextChar();
								if (this.ch=='/'){
									this.nextChar();
									break ;
								}
							}
							else{
								this.nextChar();
							}
							if (this.ch==''){
								this.parseError("Multi-line comment not closed");
							}
						}
						break ;
					default :
						this.parseError("Unexpected "+this.ch+" encountered (expecting '/' or '*' )");
					}
			}
		}

		/**
		*Skip any whitespace in the input string and advances
		*the character to the first character after any possible
		*whitespace.
		*/
		__proto.skipWhite=function(){
			while (this.isWhiteSpace(this.ch)){
				this.nextChar();
			}
		}

		/**
		*Determines if a character is whitespace or not.
		*
		*@return True if the character passed in is a whitespace
		*character
		*/
		__proto.isWhiteSpace=function(ch){
			if (ch==' ' || ch=='\t' || ch=='\n' || ch=='\r'){
				return true;
			}
			else if (!this.strict && ch.charCodeAt(0)==160){
				return true;
			}
			return false;
		}

		/**
		*Determines if a character is a digit [0-9].
		*
		*@return True if the character passed in is a digit
		*/
		__proto.isDigit=function(ch){
			return (ch >='0' && ch <='9');
		}

		/**
		*Determines if a character is a hex digit [0-9A-Fa-f].
		*
		*@return True if the character passed in is a hex digit
		*/
		__proto.isHexDigit=function(ch){
			return (this.isDigit(ch)|| (ch >='A' && ch <='F')|| (ch >='a' && ch <='f'));
		}

		/**
		*Raises a parsing error with a specified message,tacking
		*on the error location and the original string.
		*
		*@param message The message indicating why the error occurred
		*/
		__proto.parseError=function(message){
			throw new JSONParseError(message,this.loc,this.jsonString);
		}

		return JSONTokenizer;
	})()


	/**
	*Class containing constant values for the different types
	*of tokens in a JSON encoded string.
	*/
	//class com.adobe.serialization.json.JSONTokenType
	var JSONTokenType=(function(){
		function JSONTokenType(){};
		__class(JSONTokenType,'com.adobe.serialization.json.JSONTokenType');
		JSONTokenType.UNKNOWN=-1;
		JSONTokenType.COMMA=0;
		JSONTokenType.LEFT_BRACE=1;
		JSONTokenType.RIGHT_BRACE=2;
		JSONTokenType.LEFT_BRACKET=3;
		JSONTokenType.RIGHT_BRACKET=4;
		JSONTokenType.COLON=6;
		JSONTokenType.TRUE=7;
		JSONTokenType.FALSE=8;
		JSONTokenType.NULL=9;
		JSONTokenType.STRING=10;
		JSONTokenType.NUMBER=11;
		JSONTokenType.NAN=12;
		return JSONTokenType;
	})()


	//class fairygui.action.ControllerAction
	var ControllerAction=(function(){
		function ControllerAction(){
			this.fromPage=null;
			this.toPage=null;
		}

		__class(ControllerAction,'fairygui.action.ControllerAction');
		var __proto=ControllerAction.prototype;
		__proto.run=function(controller,prevPage,curPage){
			if((this.fromPage==null || this.fromPage.length==0 || this.fromPage.indexOf(prevPage)!=-1)
				&& (this.toPage==null || this.toPage.length==0 || this.toPage.indexOf(curPage)!=-1))
			this.enter(controller);
			else
			this.leave(controller);
		}

		__proto.enter=function(controller){}
		__proto.leave=function(controller){}
		__proto.setup=function(xml){
			var str;
			str=xml.getAttribute('fromPage');
			if(str)
				this.fromPage=str.split(",");
			str=xml.getAttribute('toPage');
			if(str)
				this.toPage=str.split(",");
		}

		ControllerAction.createAction=function(type){
			switch(type){
				case "play_transition":
					return new PlayTransitionAction();
				case "change_page":
					return new ChangePageAction();
				}
			return null;
		}

		return ControllerAction;
	})()


	//class fairygui.AutoSizeType
	var AutoSizeType=(function(){
		function AutoSizeType(){}
		__class(AutoSizeType,'fairygui.AutoSizeType');
		AutoSizeType.parse=function(value){
			switch (value){
				case "none":
					return 0;
				case "both":
					return 1;
				case "height":
					return 2;
				case "shrink":
					return 3;
				default :
					return 0;
				}
		}

		AutoSizeType.None=0;
		AutoSizeType.Both=1;
		AutoSizeType.Height=2;
		AutoSizeType.Shrink=3;
		return AutoSizeType;
	})()


	//class fairygui.ButtonMode
	var ButtonMode=(function(){
		function ButtonMode(){}
		__class(ButtonMode,'fairygui.ButtonMode');
		ButtonMode.parse=function(value){
			switch (value){
				case "Common":
					return 0;
				case "Check":
					return 1;
				case "Radio":
					return 2;
				default :
					return 0;
				}
		}

		ButtonMode.Common=0;
		ButtonMode.Check=1;
		ButtonMode.Radio=2;
		return ButtonMode;
	})()


	//class fairygui.ChildrenRenderOrder
	var ChildrenRenderOrder=(function(){
		function ChildrenRenderOrder(){}
		__class(ChildrenRenderOrder,'fairygui.ChildrenRenderOrder');
		ChildrenRenderOrder.parse=function(value){
			switch (value){
				case "ascent":
					return 0;
				case "descent":
					return 1;
				case "arch":
					return 2;
				default :
					return 0;
				}
		}

		ChildrenRenderOrder.Ascent=0;
		ChildrenRenderOrder.Descent=1;
		ChildrenRenderOrder.Arch=2;
		return ChildrenRenderOrder;
	})()


	//class fairygui.display.PlayState
	var PlayState=(function(){
		function PlayState(){
			this.reachEnding=false;
			this.reversed=false;
			this.repeatedCount=0;
			this._curFrame=0;
			this._curFrameDelay=0;
			this._lastUpdateSeq=0;
		}

		__class(PlayState,'fairygui.display.PlayState');
		var __proto=PlayState.prototype;
		__proto.update=function(mc){
			var elapsed=NaN;
			var frameId=GTimers.workCount;
			if (frameId-this._lastUpdateSeq !=1)
				elapsed=0;
			else
			elapsed=GTimers.deltaTime;
			this._lastUpdateSeq=frameId;
			this.reachEnding=false;
			this._curFrameDelay+=elapsed;
			var interval=mc.interval+mc.frames[this._curFrame].addDelay+((this._curFrame==0 && this.repeatedCount > 0)? mc.repeatDelay :0);
			if (this._curFrameDelay < interval)
				return;
			this._curFrameDelay-=interval;
			if(this._curFrameDelay>mc.interval)
				this._curFrameDelay=mc.interval;
			if (mc.swing){
				if(this.reversed){
					this._curFrame--;
					if(this._curFrame<=0){
						this._curFrame=0;
						this.repeatedCount++;
						this.reversed=!this.reversed;
					}
				}
				else{
					this._curFrame++;
					if (this._curFrame > mc.frameCount-1){
						this._curFrame=Math.max(0,mc.frameCount-2);
						this.repeatedCount++;
						this.reachEnding=true;
						this.reversed=!this.reversed;
					}
				}
			}
			else{
				this._curFrame++;
				if (this._curFrame > mc.frameCount-1){
					this._curFrame=0;
					this.repeatedCount++;
					this.reachEnding=true;
				}
			}
		}

		__proto.rewind=function(){
			this._curFrame=0;
			this._curFrameDelay=0;
			this.reversed=false;
			this.reachEnding=false;
		}

		__proto.reset=function(){
			this._curFrame=0;
			this._curFrameDelay=0;
			this.repeatedCount=0;
			this.reachEnding=false;
			this.reversed=false;
		}

		__proto.copy=function(src){
			this._curFrame=src._curFrame;
			this._curFrameDelay=src._curFrameDelay;
			this.repeatedCount=src.repeatedCount;
			this.reachEnding=src.reachEnding;
			this.reversed=src.reversed;
		}

		__getset(0,__proto,'currentFrame',function(){
			return this._curFrame;
			},function(value){
			this._curFrame=value;
			this._curFrameDelay=0;
		});

		return PlayState;
	})()


	//class fairygui.DisplayListItem
	var DisplayListItem=(function(){
		function DisplayListItem(packageItem,type){
			this.packageItem=null;
			this.type=null;
			this.desc=null;
			this.listItemCount=0;
			this.packageItem=packageItem;
			this.type=type;
		}

		__class(DisplayListItem,'fairygui.DisplayListItem');
		return DisplayListItem;
	})()


	//class fairygui.FlipType
	var FlipType=(function(){
		function FlipType(){}
		__class(FlipType,'fairygui.FlipType');
		FlipType.parse=function(value){
			switch (value){
				case "hz":
					return 1;
				case "vt":
					return 2;
				case "both":
					return 3;
				default :
					return 0;
				}
		}

		FlipType.None=0;
		FlipType.Horizontal=1;
		FlipType.Vertical=2;
		FlipType.Both=3;
		return FlipType;
	})()


	//class fairygui.GearBase
	var GearBase=(function(){
		function GearBase(owner){
			this._tween=false;
			this._easeType=null;
			this._tweenTime=NaN;
			this._delay=NaN;
			this._displayLockToken=0;
			this._owner=null;
			this._controller=null;
			this._owner=owner;
			this._easeType=com.greensock.easing.Quad.easeOut;
			this._tweenTime=0.3;
			this._delay=0;
		}

		__class(GearBase,'fairygui.GearBase');
		var __proto=GearBase.prototype;
		__proto.setup=function(xml){
			this._controller=this._owner.parent.getController(xml.getAttribute('controller'));
			if(!this._controller)
				return;
			this.init();
			var str;
			str=xml.getAttribute('tween');
			if(str)
				this._tween=true;
			str=xml.getAttribute('ease');
			if(str){
				var pos=str.indexOf(".");
				if(pos!=-1)
					str=str.substr(0,pos)+".ease"+str.substr(pos+1);
				if(str=="Linear")
					this._easeType=com.greensock.easing.EaseLookup.find("linear.easenone");
				else
				this._easeType=com.greensock.easing.EaseLookup.find(str);
			}
			str=xml.getAttribute('duration');
			if(str)
				this._tweenTime=parseFloat(str);
			str=xml.getAttribute('delay');
			if(str)
				this._delay=parseFloat(str);
			if((this instanceof fairygui.GearDisplay )){
				str=xml.getAttribute('pages');
				if(str){
					var arr=str.split(",");
					(this).pages=arr;
				}
			}
			else{
				var pages;
				var values;
				str=xml.getAttribute('pages');
				if(str)
					pages=str.split(",");
				if(pages){
					str=xml.getAttribute('values');
					values=str.split("|");
					for(var i=0;i<pages.length;i++){
						str=values[i];
						if(str==null)
							str="";
						this.addStatus(pages[i],str);
					}
				}
				str=xml.getAttribute("default");
				if(str)
					this.addStatus(null,str);
			}
		}

		__proto.updateFromRelations=function(dx,dy){}
		__proto.addStatus=function(pageId,value){}
		__proto.init=function(){}
		__proto.apply=function(){}
		__proto.updateState=function(){}
		__getset(0,__proto,'controller',function(){
			return this._controller;
			},function(val){
			if(val!=this._controller){
				this._controller=val;
				if(this._controller)
					this.init();
			}
		});

		__getset(0,__proto,'tween',function(){
			return this._tween;
			},function(val){
			this._tween=val;
		});

		__getset(0,__proto,'tweenTime',function(){
			return this._tweenTime;
			},function(value){
			this._tweenTime=value;
		});

		__getset(0,__proto,'delay',function(){
			return this._delay;
			},function(value){
			this._delay=value;
		});

		__getset(0,__proto,'easeType',function(){
			return this._easeType;
			},function(value){
			this._easeType=value;
		});

		GearBase.disableAllTweenEffect=false;
		return GearBase;
	})()


	//class fairygui.GObjectPool
	var GObjectPool=(function(){
		function GObjectPool(){
			this._pool=null;
			this._count=0;
			this._initCallback=null;
			this._pool={};
		}

		__class(GObjectPool,'fairygui.GObjectPool');
		var __proto=GObjectPool.prototype;
		__proto.clear=function(){
			var arr;
			for(var $each_arr in this._pool){
				arr=this._pool[$each_arr];
				var cnt=arr.length;
				for(var i=0;i<cnt;i++)
				arr[i].dispose();
			}
			this._pool={};
			this._count=0;
		}

		__proto.getObject=function(url){
			url=UIPackage.normalizeURL(url);
			if(url==null)
				return null;
			var arr=this._pool[url];
			if(arr!=null && arr.length){
				this._count--;
				return arr.shift();
			};
			var child=UIPackage.createObjectFromURL(url);
			if(child){
				if(this._initCallback!=null)
					this._initCallback(child);
			}
			return child;
		}

		__proto.returnObject=function(obj){
			var url=obj.resourceURL;
			if(!url)
				return;
			var arr=this._pool[url];
			if(arr==null){
				arr=new Array;
				this._pool[url]=arr;
			}
			this._count++;
			arr.push(obj);
		}

		__getset(0,__proto,'count',function(){
			return this._count;
		});

		__getset(0,__proto,'initCallback',function(){
			return this._initCallback;
			},function(value){
			this._initCallback=value;
		});

		return GObjectPool;
	})()


	//class fairygui.GroupLayoutType
	var GroupLayoutType=(function(){
		function GroupLayoutType(){}
		__class(GroupLayoutType,'fairygui.GroupLayoutType');
		GroupLayoutType.parse=function(value){
			switch (value){
				case "none":
					return 0;
				case "hz":
					return 1;
				case "vt":
					return 2;
				default :
					return 0;
				}
		}

		GroupLayoutType.None=0;
		GroupLayoutType.Horizontal=1;
		GroupLayoutType.Vertical=2;
		return GroupLayoutType;
	})()


	//class fairygui.ListLayoutType
	var ListLayoutType=(function(){
		function ListLayoutType(){}
		__class(ListLayoutType,'fairygui.ListLayoutType');
		ListLayoutType.parse=function(value){
			switch (value){
				case "column":
					return 0;
				case "row":
					return 1;
				case "flow_hz":
					return 2;
				case "flow_vt":
					return 3;
				case "pagination":
					return 4;
				default :
					return 0;
				}
		}

		ListLayoutType.SingleColumn=0;
		ListLayoutType.SingleRow=1;
		ListLayoutType.FlowHorizontal=2;
		ListLayoutType.FlowVertical=3;
		ListLayoutType.Pagination=4;
		return ListLayoutType;
	})()


	//class fairygui.ListSelectionMode
	var ListSelectionMode=(function(){
		function ListSelectionMode(){}
		__class(ListSelectionMode,'fairygui.ListSelectionMode');
		ListSelectionMode.parse=function(value){
			switch (value){
				case "single":
					return 0;
				case "multiple":
					return 1;
				case "multipleSingleClick":
					return 2;
				case "none":
					return 3;
				default :
					return 0;
				}
		}

		ListSelectionMode.Single=0;
		ListSelectionMode.Multiple=1;
		ListSelectionMode.Multiple_SingleClick=2;
		ListSelectionMode.None=3;
		return ListSelectionMode;
	})()


	//class fairygui.LoaderFillType
	var LoaderFillType=(function(){
		function LoaderFillType(){}
		__class(LoaderFillType,'fairygui.LoaderFillType');
		LoaderFillType.parse=function(value){
			switch (value){
				case "none":
					return 0;
				case "scale":
					return 1;
				case "scaleMatchHeight":
					return 2;
				case "scaleMatchWidth":
					return 3;
				case "scaleFree":
					return 4;
				default :
					return 0;
				}
		}

		LoaderFillType.None=0;
		LoaderFillType.Scale=1;
		LoaderFillType.ScaleMatchHeight=2;
		LoaderFillType.ScaleMatchWidth=3;
		LoaderFillType.ScaleFree=4;
		return LoaderFillType;
	})()


	//class fairygui.Margin
	var Margin=(function(){
		function Margin(){
			this.left=0;
			this.right=0;
			this.top=0;
			this.bottom=0;
		}

		__class(Margin,'fairygui.Margin');
		var __proto=Margin.prototype;
		__proto.parse=function(str){
			var arr=str.split(",");
			if(arr.length==1){
				var k=int(arr[0]);
				this.top=k;
				this.bottom=k;
				this.left=k;
				this.right=k;
			}
			else{
				this.top=int(arr[0]);
				this.bottom=int(arr[1]);
				this.left=int(arr[2]);
				this.right=int(arr[3]);
			}
		}

		__proto.copy=function(source){
			this.top=source.top;
			this.bottom=source.bottom;
			this.left=source.left;
			this.right=source.right;
		}

		return Margin;
	})()


	//class fairygui.OverflowType
	var OverflowType=(function(){
		function OverflowType(){}
		__class(OverflowType,'fairygui.OverflowType');
		OverflowType.parse=function(value){
			switch (value){
				case "visible":
					return 0;
				case "hidden":
					return 1;
				case "scroll":
					return 2;
				case "scale":
					return 3;
				case "scaleFree":
					return 4;
				default :
					return 0;
				}
		}

		OverflowType.Visible=0;
		OverflowType.Hidden=1;
		OverflowType.Scroll=2;
		OverflowType.Scale=3;
		OverflowType.ScaleFree=4;
		return OverflowType;
	})()


	//class fairygui.PackageItemType
	var PackageItemType=(function(){
		function PackageItemType(){}
		__class(PackageItemType,'fairygui.PackageItemType');
		PackageItemType.parseType=function(value){
			switch(value){
				case "image":
					return 0;
				case "movieclip":
					return 2;
				case "sound":
					return 3;
				case "component":
					return 4;
				case "swf":
					return 1;
				case "font":
					return 6;
				}
			return 0;
		}

		PackageItemType.Image=0;
		PackageItemType.Swf=1;
		PackageItemType.MovieClip=2;
		PackageItemType.Sound=3;
		PackageItemType.Component=4;
		PackageItemType.Misc=5;
		PackageItemType.Font=6;
		return PackageItemType;
	})()


	//class fairygui.PageOption
	var PageOption=(function(){
		function PageOption(){
			this._controller=null;
			this._id=null;
		}

		__class(PageOption,'fairygui.PageOption');
		var __proto=PageOption.prototype;
		__proto.clear=function(){
			this._id=null;
		}

		__getset(0,__proto,'controller',null,function(val){
			this._controller=val;
		});

		__getset(0,__proto,'index',function(){
			if(this._id)
				return this._controller.getPageIndexById(this._id);
			else
			return-1;
			},function(pageIndex){
			this._id=this._controller.getPageId(pageIndex);
		});

		__getset(0,__proto,'name',function(){
			if(this._id)
				return this._controller.getPageNameById(this._id);
			else
			return null;
			},function(pageName){
			this._id=this._controller.getPageIdByName(pageName);
		});

		__getset(0,__proto,'id',function(){
			return this._id;
			},function(id){
			this._id=id;
		});

		return PageOption;
	})()


	//class fairygui.ProgressTitleType
	var ProgressTitleType=(function(){
		function ProgressTitleType(){}
		__class(ProgressTitleType,'fairygui.ProgressTitleType');
		ProgressTitleType.parse=function(value){
			switch (value){
				case "percent":
					return 0;
				case "valueAndmax":
					return 1;
				case "value":
					return 2;
				case "max":
					return 3;
				default :
					return 0;
				}
		}

		ProgressTitleType.Percent=0;
		ProgressTitleType.ValueAndMax=1;
		ProgressTitleType.Value=2;
		ProgressTitleType.Max=3;
		return ProgressTitleType;
	})()


	//class fairygui.RelationItem
	var RelationItem=(function(){
		var RelationDef;
		function RelationItem(owner){
			this._owner=null;
			this._target=null;
			this._defs=null;
			this._targetX=NaN;
			this._targetY=NaN;
			this._targetWidth=NaN;
			this._targetHeight=NaN;
			this._owner=owner;
			this._defs=[];
		}

		__class(RelationItem,'fairygui.RelationItem');
		var __proto=RelationItem.prototype;
		__proto.add=function(relationType,usePercent){
			if (relationType==24){
				this.add(14,usePercent);
				this.add(15,usePercent);
				return;
			}
			var def;
			for(var $each_def in this._defs){
				def=this._defs[$each_def];
				if (def.type==relationType)
					return;
			}
			this.internalAdd(relationType,usePercent);
		}

		__proto.internalAdd=function(relationType,usePercent){
			if (relationType==24){
				this.internalAdd(14,usePercent);
				this.internalAdd(15,usePercent);
				return;
			};
			var info=new RelationDef();
			info.percent=usePercent;
			info.type=relationType;
			this._defs.push(info);
			if (usePercent || relationType==1 || relationType==3 || relationType==5
				|| relationType==8 || relationType==10 || relationType==12)
			this._owner.pixelSnapping=true;
		}

		__proto.remove=function(relationType){
			if (relationType==24){
				this.remove(14);
				this.remove(15);
				return;
			};
			var dc=this._defs.length;
			for (var k=0;k < dc;k++){
				if (this._defs[k].type==relationType){
					this._defs.splice(k,1);
					break ;
				}
			}
		}

		__proto.copyFrom=function(source){
			this.target=source.target;
			this._defs.length=0;
			var info;
			for(var $each_info in source._defs){
				info=source._defs[$each_info];
				var info2=new RelationDef();
				info2.copyFrom(info);
				this._defs.push(info2);
			}
		}

		__proto.dispose=function(){
			if (this._target !=null){
				this.releaseRefTarget(this._target);
				this._target=null;
			}
		}

		__proto.applyOnSelfResized=function(dWidth,dHeight){
			var ox=this._owner.x;
			var oy=this._owner.y;
			var info;
			for(var $each_info in this._defs){
				info=this._defs[$each_info];
				switch (info.type){
					case 3:
					case 5:
						this._owner.x-=dWidth / 2;
						break ;
					case 4:
					case 6:
						this._owner.x-=dWidth;
						break ;
					case 10:
					case 12:
						this._owner.y-=dHeight / 2;
						break ;
					case 11:
					case 13:
						this._owner.y-=dHeight;
						break ;
					}
			}
			if (ox!=this._owner.x || oy!=this._owner.y){
				ox=this._owner.x-ox;
				oy=this._owner.y-oy;
				this._owner.updateGearFromRelations(1,ox,oy);
				if (this._owner.parent !=null && this._owner.parent._transitions.length > 0){
					var trans;
					for(var $each_trans in this._owner.parent._transitions){
						trans=this._owner.parent._transitions[$each_trans];
						trans.updateFromRelations(this._owner.id,ox,oy);
					}
				}
			}
		}

		__proto.applyOnXYChanged=function(info,dx,dy){
			switch (info.type){
				case 0:
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
				case 6:
					this._owner.x+=dx;
					break ;
				case 7:
				case 8:
				case 9:
				case 10:
				case 11:
				case 12:
				case 13:
					this._owner.y+=dy;
					break ;
				case 14:
				case 15:
					break ;
				case 16:
				case 17:
					this._owner.x+=dx;
					this._owner.width=this._owner._rawWidth-dx;
					break ;
				case 18:
				case 19:
					this._owner.width=this._owner._rawWidth+dx;
					break ;
				case 20:
				case 21:
					this._owner.y+=dy;
					this._owner.height=this._owner._rawHeight-dy;
					break ;
				case 22:
				case 23:
					this._owner.height=this._owner._rawHeight+dy;
					break ;
				}
		}

		__proto.applyOnSizeChanged=function(info){
			var targetX=NaN,targetY=NaN;
			if (this._target !=this._owner.parent){
				targetX=this._target.x;
				targetY=this._target.y;
			}
			else{
				targetX=0;
				targetY=0;
			};
			var v=NaN,tmp=NaN;
			switch (info.type){
				case 0:
					if(info.percent && this._target==this._owner.parent){
						v=this._owner.x-targetX;
						if (info.percent)
							v=v / this._targetWidth *this._target._width;
						this._owner.x=targetX+v;
					}
					break ;
				case 1:
					v=this._owner.x-(targetX+this._targetWidth / 2);
					if (info.percent)
						v=v / this._targetWidth *this._target._width;
					this._owner.x=targetX+this._target._width / 2+v;
					break ;
				case 2:
					v=this._owner.x-(targetX+this._targetWidth);
					if (info.percent)
						v=v / this._targetWidth *this._target._width;
					this._owner.x=targetX+this._target._width+v;
					break ;
				case 3:
					v=this._owner.x+this._owner._rawWidth / 2-(targetX+this._targetWidth / 2);
					if (info.percent)
						v=v / this._targetWidth *this._target._width;
					this._owner.x=targetX+this._target._width / 2+v-this._owner._rawWidth / 2;
					break ;
				case 4:
					v=this._owner.x+this._owner._rawWidth-targetX;
					if (info.percent)
						v=v / this._targetWidth *this._target._width;
					this._owner.x=targetX+v-this._owner._rawWidth;
					break ;
				case 5:
					v=this._owner.x+this._owner._rawWidth-(targetX+this._targetWidth / 2);
					if (info.percent)
						v=v / this._targetWidth *this._target._width;
					this._owner.x=targetX+this._target._width / 2+v-this._owner._rawWidth;
					break ;
				case 6:
					v=this._owner.x+this._owner._rawWidth-(targetX+this._targetWidth);
					if (info.percent)
						v=v / this._targetWidth *this._target._width;
					this._owner.x=targetX+this._target._width+v-this._owner._rawWidth;
					break ;
				case 7:
					if(info.percent && this._target==this._owner.parent){
						v=this._owner.y-targetY;
						if (info.percent)
							v=v / this._targetHeight *this._target._height;
						this._owner.y=targetY+v;
					}
					break ;
				case 8:
					v=this._owner.y-(targetY+this._targetHeight / 2);
					if (info.percent)
						v=v / this._targetHeight *this._target._height;
					this._owner.y=targetY+this._target._height / 2+v;
					break ;
				case 9:
					v=this._owner.y-(targetY+this._targetHeight);
					if (info.percent)
						v=v / this._targetHeight *this._target._height;
					this._owner.y=targetY+this._target._height+v;
					break ;
				case 10:
					v=this._owner.y+this._owner._rawHeight / 2-(targetY+this._targetHeight / 2);
					if (info.percent)
						v=v / this._targetHeight *this._target._height;
					this._owner.y=targetY+this._target._height / 2+v-this._owner._rawHeight / 2;
					break ;
				case 11:
					v=this._owner.y+this._owner._rawHeight-targetY;
					if (info.percent)
						v=v / this._targetHeight *this._target._height;
					this._owner.y=targetY+v-this._owner._rawHeight;
					break ;
				case 12:
					v=this._owner.y+this._owner._rawHeight-(targetY+this._targetHeight / 2);
					if (info.percent)
						v=v / this._targetHeight *this._target._height;
					this._owner.y=targetY+this._target._height / 2+v-this._owner._rawHeight;
					break ;
				case 13:
					v=this._owner.y+this._owner._rawHeight-(targetY+this._targetHeight);
					if (info.percent)
						v=v / this._targetHeight *this._target._height;
					this._owner.y=targetY+this._target._height+v-this._owner._rawHeight;
					break ;
				case 14:
					if(this._owner._underConstruct && this._owner==this._target.parent)
						v=this._owner.sourceWidth-this._target.initWidth;
					else
					v=this._owner._rawWidth-this._targetWidth;
					if (info.percent)
						v=v / this._targetWidth *this._target._width;
					if(this._target==this._owner.parent)
						this._owner.setSize(this._target._width+v,this._owner._rawHeight,true);
					else
					this._owner.width=this._target._width+v;
					break ;
				case 15:
					if(this._owner._underConstruct && this._owner==this._target.parent)
						v=this._owner.sourceHeight-this._target.initHeight;
					else
					v=this._owner._rawHeight-this._targetHeight;
					if (info.percent)
						v=v / this._targetHeight *this._target._height;
					if(this._target==this._owner.parent)
						this._owner.setSize(this._owner._rawWidth,this._target._height+v,true);
					else
					this._owner.height=this._target._height+v;
					break ;
				case 16:
					break ;
				case 17:
					v=this._owner.x-(targetX+this._targetWidth);
					if (info.percent)
						v=v / this._targetWidth *this._target._width;
					tmp=this._owner.x;
					this._owner.x=targetX+this._target._width+v;
					this._owner.width=this._owner._rawWidth-(this._owner.x-tmp);
					break ;
				case 18:
					break ;
				case 19:
					if(this._owner._underConstruct && this._owner==this._target.parent)
						v=this._owner.sourceWidth-(targetX+this._target.initWidth);
					else
					v=this._owner._rawWidth-(targetX+this._targetWidth);
					if (this._owner !=this._target.parent)
						v+=this._owner.x;
					if (info.percent)
						v=v / this._targetWidth *this._target._width;
					if (this._owner !=this._target.parent)
						this._owner.width=targetX+this._target._width+v-this._owner.x;
					else
					this._owner.width=targetX+this._target._width+v;
					break ;
				case 20:
					break ;
				case 21:
					v=this._owner.y-(targetY+this._targetHeight);
					if (info.percent)
						v=v / this._targetHeight *this._target._height;
					tmp=this._owner.y;
					this._owner.y=targetY+this._target._height+v;
					this._owner.height=this._owner._rawHeight-(this._owner.y-tmp);
					break ;
				case 22:
					break ;
				case 23:
					if(this._owner._underConstruct && this._owner==this._target.parent)
						v=this._owner.sourceHeight-(targetY+this._target.initHeight);
					else
					v=this._owner._rawHeight-(targetY+this._targetHeight);
					if (this._owner !=this._target.parent)
						v+=this._owner.y;
					if (info.percent)
						v=v / this._targetHeight *this._target._height;
					if (this._owner !=this._target.parent)
						this._owner.height=targetY+this._target._height+v-this._owner.y;
					else
					this._owner.height=targetY+this._target._height+v;
					break ;
				}
		}

		__proto.addRefTarget=function(target){
			if(target!=this._owner.parent)
				target.addXYChangeCallback(this.__targetXYChanged);
			target.addSizeChangeCallback(this.__targetSizeChanged);
			target.addSizeDelayChangeCallback(this.__targetSizeWillChange);
			this._targetX=this._target.x;
			this._targetY=this._target.y;
			this._targetWidth=this._target._width;
			this._targetHeight=this._target._height;
		}

		__proto.releaseRefTarget=function(target){
			target.removeXYChangeCallback(this.__targetXYChanged);
			target.removeSizeChangeCallback(this.__targetSizeChanged);
			target.removeSizeDelayChangeCallback(this.__targetSizeWillChange);
		}

		__proto.__targetXYChanged=function(target){
			if (this._owner.relations.handling!=null || this._owner.group!=null && this._owner.group._updating){
				this._targetX=this._target.x;
				this._targetY=this._target.y;
				return;
			}
			this._owner.relations.handling=target;
			var ox=this._owner.x;
			var oy=this._owner.y;
			var dx=this._target.x-this._targetX;
			var dy=this._target.y-this._targetY;
			var info;
			for(var $each_info in this._defs){
				info=this._defs[$each_info];
				this.applyOnXYChanged(info,dx,dy);
			}
			this._targetX=this._target.x;
			this._targetY=this._target.y;
			if (ox!=this._owner.x || oy!=this._owner.y){
				ox=this._owner.x-ox;
				oy=this._owner.y-oy;
				this._owner.updateGearFromRelations(1,ox,oy);
				if (this._owner.parent !=null && this._owner.parent._transitions.length > 0){
					var trans;
					for(var $each_trans in this._owner.parent._transitions){
						trans=this._owner.parent._transitions[$each_trans];
						trans.updateFromRelations(this._owner.id,ox,oy);
					}
				}
			}
			this._owner.relations.handling=null;
		}

		__proto.__targetSizeChanged=function(target){
			if (this._owner.relations.handling!=null){
				this._targetWidth=this._target._width;
				this._targetHeight=this._target._height;
				return;
			}
			this._owner.relations.handling=target;
			var ox=this._owner.x;
			var oy=this._owner.y;
			var ow=this._owner._rawWidth;
			var oh=this._owner._rawHeight;
			var info;
			for(var $each_info in this._defs){
				info=this._defs[$each_info];
				this.applyOnSizeChanged(info);
			}
			this._targetWidth=this._target._width;
			this._targetHeight=this._target._height;
			if (ox!=this._owner.x || oy!=this._owner.y){
				ox=this._owner.x-ox;
				oy=this._owner.y-oy;
				this._owner.updateGearFromRelations(1,ox,oy);
				if (this._owner.parent !=null && this._owner.parent._transitions.length > 0){
					var trans;
					for(var $each_trans in this._owner.parent._transitions){
						trans=this._owner.parent._transitions[$each_trans];
						trans.updateFromRelations(this._owner.id,ox,oy);
					}
				}
			}
			if (ow!=this._owner._rawWidth || oh!=this._owner._rawHeight){
				ow=this._owner._rawWidth-ow;
				oh=this._owner._rawHeight-oh;
				this._owner.updateGearFromRelations(2,ow,oh);
			}
			this._owner.relations.handling=null;
		}

		__proto.__targetSizeWillChange=function(target){
			this._owner.relations.sizeDirty=true;
		}

		__getset(0,__proto,'owner',function(){
			return this._owner;
		});

		__getset(0,__proto,'target',function(){
			return this._target;
			},function(value){
			if(this._target!=value){
				if(this._target)
					this.releaseRefTarget(this._target);
				this._target=value;
				if(this._target)
					this.addRefTarget(this._target);
			}
		});

		__getset(0,__proto,'isEmpty',function(){
			return this._defs.length==0;
		});

		RelationItem.__init$=function(){
			//class RelationDef
			RelationDef=(function(){
				function RelationDef(){
					this.percent=false;
					this.type=0;
				}
				__class(RelationDef,'');
				var __proto=RelationDef.prototype;
				__proto.copyFrom=function(source){
					this.percent=source.percent;
					this.type=source.type;
				}
				return RelationDef;
			})()
		}

		return RelationItem;
	})()


	//class fairygui.Relations
	var Relations=(function(){
		function Relations(owner){
			this._owner=null;
			this._items=null;
			this.handling=null;
			this.sizeDirty=false;
			this._owner=owner;
			this._items=[];
		}

		__class(Relations,'fairygui.Relations');
		var __proto=Relations.prototype;
		__proto.add=function(target,relationType,usePercent){
			(usePercent===void 0)&& (usePercent=false);
			var item;
			for(var $each_item in this._items){
				item=this._items[$each_item];
				if(item.target==target){
					item.add(relationType,usePercent);
					return;
				}
			};
			var newItem=new RelationItem(this._owner);
			newItem.target=target;
			newItem.add(relationType,usePercent);
			this._items.push(newItem);
		}

		__proto.addItems=function(target,sidePairs){
			var arr=sidePairs.split(",");
			var s;
			var usePercent=false;
			var i=0;
			var tid=0;
			var newItem=new RelationItem(this._owner);
			newItem.target=target;
			for(i=0;i<2;i++){
				s=arr[i];
				if(!s)
					continue ;
				if(s.charAt(s.length-1)=="%"){
					s=s.substr(0,s.length-1);
					usePercent=true;
				}
				else
				usePercent=false;
				var j=s.indexOf("-");
				if(j==-1)
					s=s+"-"+s;
				tid=Relations.RELATION_NAMES.indexOf(s);
				if(tid==-1)
					throw new Error("invalid relation type");
				newItem.internalAdd(tid,usePercent);
			}
			this._items.push(newItem);
		}

		__proto.remove=function(target,relationType){
			var cnt=this._items.length;
			var i=0;
			while (i < cnt){
				var item=this._items[i];
				if (item.target==target){
					item.remove(relationType);
					if (item.isEmpty){
						item.dispose();
						this._items.splice(i,1);
						cnt--;
					}
					else
					i++;
				}
				else
				i++;
			}
		}

		__proto.contains=function(target){
			var item;
			for(var $each_item in this._items){
				item=this._items[$each_item];
				if(item.target==target)
					return true;
			}
			return false;
		}

		__proto.clearFor=function(target){
			var cnt=this._items.length;
			var i=0;
			while (i < cnt){
				var item=this._items[i];
				if (item.target==target){
					item.dispose();
					this._items.splice(i,1);
					cnt--;
				}
				else
				i++;
			}
		}

		__proto.clearAll=function(){
			var item;
			for(var $each_item in this._items){
				item=this._items[$each_item];
				item.dispose();
			}
			this._items.length=0;
		}

		__proto.copyFrom=function(source){
			this.clearAll();
			var arr=source._items;
			var ri;
			for(var $each_ri in arr){
				ri=arr[$each_ri];
				var item=new RelationItem(this._owner);
				item.copyFrom(ri);
				this._items.push(item);
			}
		}

		__proto.dispose=function(){
			this.clearAll();
		}

		__proto.onOwnerSizeChanged=function(dWidth,dHeight){
			if(this._items.length==0)
				return;
			var item;
			for(var $each_item in this._items){
				item=this._items[$each_item];
				item.applyOnSelfResized(dWidth,dHeight);
			}
		}

		__proto.ensureRelationsSizeCorrect=function(){
			if(this._items.length==0)
				return;
			this.sizeDirty=false;
			var item;
			for(var $each_item in this._items){
				item=this._items[$each_item];
				item.target.ensureSizeCorrect();
			}
		}

		__proto.setup=function(xml){
			var col=xml.relation;
			var targetId;
			var target;
			var cxml;
			for(var $each_cxml in col){
				cxml=col[$each_cxml];
				targetId=cxml.getAttribute('target');
				if(this._owner.parent){
					if(targetId)
						target=this._owner.parent.getChildById(targetId);
					else
					target=this._owner.parent;
				}
				else{
					target=(this._owner).getChildById(targetId);
				}
				if(target)
					this.addItems(target,cxml.getAttribute('sidePair'));
			}
		}

		__getset(0,__proto,'empty',function(){
			return this._items.length==0;
		});

		__static(Relations,
		['RELATION_NAMES',function(){return this.RELATION_NAMES=
			[
			"left-left",
			"left-center",
			"left-right",
			"center-center",
			"right-left",
			"right-center",
			"right-right",
			"top-top",
			"top-middle",
			"top-bottom",
			"middle-middle",
			"bottom-top",
			"bottom-middle",
			"bottom-bottom",
			"width-width",
			"height-height",
			"leftext-left",
			"leftext-right",
			"rightext-left",
			"rightext-right",
			"topext-top",
			"topext-bottom",
			"bottomext-top",
			"bottomext-bottom"];}
		]);
		return Relations;
	})()


	//class fairygui.RelationType
	var RelationType=(function(){
		function RelationType(){}
		__class(RelationType,'fairygui.RelationType');
		RelationType.Left_Left=0;
		RelationType.Left_Center=1;
		RelationType.Left_Right=2;
		RelationType.Center_Center=3;
		RelationType.Right_Left=4;
		RelationType.Right_Center=5;
		RelationType.Right_Right=6;
		RelationType.Top_Top=7;
		RelationType.Top_Middle=8;
		RelationType.Top_Bottom=9;
		RelationType.Middle_Middle=10;
		RelationType.Bottom_Top=11;
		RelationType.Bottom_Middle=12;
		RelationType.Bottom_Bottom=13;
		RelationType.Width=14;
		RelationType.Height=15;
		RelationType.LeftExt_Left=16;
		RelationType.LeftExt_Right=17;
		RelationType.RightExt_Left=18;
		RelationType.RightExt_Right=19;
		RelationType.TopExt_Top=20;
		RelationType.TopExt_Bottom=21;
		RelationType.BottomExt_Top=22;
		RelationType.BottomExt_Bottom=23;
		RelationType.Size=24;
		return RelationType;
	})()


	//class fairygui.ScreenMatchMode
	var ScreenMatchMode=(function(){
		function ScreenMatchMode(){}
		__class(ScreenMatchMode,'fairygui.ScreenMatchMode');
		ScreenMatchMode.MatchWidthOrHeight=0;
		ScreenMatchMode.MatchWidth=1;
		ScreenMatchMode.MatchHeight=2;
		return ScreenMatchMode;
	})()


	//class fairygui.ScrollBarDisplayType
	var ScrollBarDisplayType=(function(){
		function ScrollBarDisplayType(){}
		__class(ScrollBarDisplayType,'fairygui.ScrollBarDisplayType');
		ScrollBarDisplayType.parse=function(value){
			switch (value){
				case "default":
					return 0;
				case "visible":
					return 1;
				case "auto":
					return 2;
				case "hidden":
					return 3;
				default :
					return 0;
				}
		}

		ScrollBarDisplayType.Default=0;
		ScrollBarDisplayType.Visible=1;
		ScrollBarDisplayType.Auto=2;
		ScrollBarDisplayType.Hidden=3;
		return ScrollBarDisplayType;
	})()


	//class fairygui.ScrollType
	var ScrollType=(function(){
		function ScrollType(){}
		__class(ScrollType,'fairygui.ScrollType');
		ScrollType.parse=function(value){
			switch (value){
				case "horizontal":
					return 0;
				case "vertical":
					return 1;
				case "both":
					return 2;
				default :
					return 1;
				}
		}

		ScrollType.Horizontal=0;
		ScrollType.Vertical=1;
		ScrollType.Both=2;
		return ScrollType;
	})()


	//class fairygui.text.BMGlyph
	var BMGlyph=(function(){
		function BMGlyph(){
			this.x=0;
			this.y=0;
			this.offsetX=0;
			this.offsetY=0;
			this.width=0;
			this.height=0;
			this.advance=0;
			this.lineHeight=0;
			this.channel=0;
			this.imageItem=null;
		}

		__class(BMGlyph,'fairygui.text.BMGlyph');
		return BMGlyph;
	})()


	//class fairygui.UIConfig
	var UIConfig=(function(){
		function UIConfig(){}
		__class(UIConfig,'fairygui.UIConfig');
		UIConfig.defaultFont="";
		UIConfig.windowModalWaiting=null
		UIConfig.globalModalWaiting=null
		UIConfig.modalLayerColor=0x333333;
		UIConfig.modalLayerAlpha=0.2;
		UIConfig.buttonSound=null
		UIConfig.buttonSoundVolumeScale=1;
		UIConfig.buttonUseHandCursor=false;
		UIConfig.horizontalScrollBar=null
		UIConfig.verticalScrollBar=null
		UIConfig.defaultScrollSpeed=25;
		UIConfig.defaultTouchScrollSpeedRatio=1;
		UIConfig.defaultScrollBarDisplay=1;
		UIConfig.defaultScrollTouchEffect=false;
		UIConfig.defaultScrollBounceEffect=false;
		UIConfig.popupMenu=null
		UIConfig.popupMenu_seperator=null
		UIConfig.loaderErrorSign=null
		UIConfig.tooltipsWin=null
		UIConfig.defaultComboBoxVisibleItemCount=10;
		UIConfig.touchScrollSensitivity=20;
		UIConfig.touchDragSensitivity=10;
		UIConfig.clickDragSensitivity=2;
		UIConfig.bringWindowToFrontOnClick=true;
		UIConfig.frameTimeForAsyncUIConstruction=2;
		return UIConfig;
	})()


	//class fairygui.UIObjectFactory
	var UIObjectFactory=(function(){
		function UIObjectFactory(){}
		__class(UIObjectFactory,'fairygui.UIObjectFactory');
		UIObjectFactory.setPackageItemExtension=function(url,type){
			if (url==null)
				throw new Error("Invaild url: "+url);
			var pi=UIPackage.getItemByURL(url);
			if (pi !=null)
				pi.extensionType=type;
			UIObjectFactory.packageItemExtensions[url]=type;
		}

		UIObjectFactory.setLoaderExtension=function(type){
			UIObjectFactory.loaderType=type;
		}

		UIObjectFactory.resolvePackageItemExtension=function(pi){
			pi.extensionType=UIObjectFactory.packageItemExtensions["ui://"+pi.owner.id+pi.id];
			if(!pi.extensionType)
				pi.extensionType=UIObjectFactory.packageItemExtensions["ui://"+pi.owner.name+"/"+pi.name];
		}

		UIObjectFactory.newObject=function(pi){
			switch (pi.type){
				case 0:
					return new GImage();
				case 2:
					return new GMovieClip();
				case 1:
					return new GSwfObject();
				case 4:{
						var cls=pi.extensionType;
						if (cls)
							return new cls();
						var xml=pi.owner.getComponentData(pi);
						var extention=xml.getAttribute('extention');
						if (extention !=null){
						switch (extention){
							case "Button":
								return new GButton();
							case "Label":
								return new GLabel();
							case "ProgressBar":
								return new GProgressBar();
							case "Slider":
								return new GSlider();
							case "ScrollBar":
								return new GScrollBar();
							case "ComboBox":
								return new GComboBox();
							default :
								return new GComponent();
							}
					}
					else
					return new GComponent();
				}
			}
			return null;
		}

		UIObjectFactory.newObject2=function(type){
			switch (type){
				case "image":
					return new GImage();
				case "movieclip":
					return new GMovieClip();
				case "swf":
					return new GSwfObject();
				case "component":
					return new GComponent();
				case "text":
					return new GTextField();
				case "richtext":
					return new GRichTextField();
				case "inputtext":
					return new GTextInput();
				case "group":
					return new GGroup();
				case "list":
					return new GList();
				case "graph":
					return new GGraph();
				case "loader":
					if (UIObjectFactory.loaderType !=null)
						return new UIObjectFactory.loaderType();
					else
					return new GLoader();
				}
			return null;
		}

		UIObjectFactory.packageItemExtensions={};
		UIObjectFactory.loaderType=null
		return UIObjectFactory;
	})()


	//class fairygui.utils.SimpleDispatcher
	var SimpleDispatcher=(function(){
		function SimpleDispatcher(){
			this._elements=null;
			this._dispatching=0;
			this._elements=[];
		}

		__class(SimpleDispatcher,'fairygui.utils.SimpleDispatcher');
		var __proto=SimpleDispatcher.prototype;
		__proto.addListener=function(type,e){
			var arr=this._elements[type];
			if(!arr){
				arr=[];
				this._elements[type]=arr;
				arr.push(e);
			}
			else if(arr.indexOf(e)==-1){
				arr.push(e);
			}
		}

		__proto.removeListener=function(type,e){
			var arr=this._elements[type];
			if(arr){
				var i=arr.indexOf(e);
				if(i!=-1)
					arr[i]=null;
			}
		}

		__proto.hasListener=function(type){
			var arr=this._elements[type];
			if(arr && arr.length>0)
				return true;
			else
			return false;
		}

		__proto.dispatch=function(source,type){
			var arr=this._elements[type];
			if(!arr || arr.length==0)
				return;
			var hasDeleted=false;
			var i=0;
			this._dispatching++;
			while(i<arr.length){
				var e=arr[i];
				if(e!=null){
					if(e.length==1)
						e(source);
					else
					e();
				}
				else
				hasDeleted=true;
				i++;
			}
			this._dispatching--;
			if(hasDeleted && this._dispatching==0){
				i=0;
				while(i<arr.length){
					e=arr[i];
					if(e==null)
						arr.splice(i,1);
					else
					i++;
				}
			}
		}

		__proto.clear=function(){
			this._elements.length=0;
		}

		return SimpleDispatcher;
	})()


	//class fairygui.utils.UBBParser
	var UBBParser=(function(){
		function UBBParser(){
			this._text=null;
			this._readPos=0;
			this._handlers=null;
			this.smallFontSize=12;
			this.normalFontSize=14;
			this.largeFontSize=16;
			this.defaultImgWidth=0;
			this.defaultImgHeight=0;
			this._handlers={};
			this._handlers["url"]=this.onTag_URL;
			this._handlers["img"]=this.onTag_IMG;
			this._handlers["b"]=this.onTag_Simple;
			this._handlers["i"]=this.onTag_Simple;
			this._handlers["u"]=this.onTag_Simple;
			this._handlers["sup"]=this.onTag_Simple;
			this._handlers["sub"]=this.onTag_Simple;
			this._handlers["color"]=this.onTag_COLOR;
			this._handlers["font"]=this.onTag_FONT;
			this._handlers["size"]=this.onTag_SIZE;
		}

		__class(UBBParser,'fairygui.utils.UBBParser');
		var __proto=UBBParser.prototype;
		__proto.onTag_URL=function(tagName,end,attr){
			if(!end){
				if(attr!=null)
					return "<a href=\""+attr+"\" target=\"_blank\">";
				else {
					var href=this.getTagText();
					return "<a href=\""+href+"\" target=\"_blank\">";
				}
			}
			else
			return "</a>";
		}

		__proto.onTag_IMG=function(tagName,end,attr){
			if(!end){
				var src=this.getTagText(true);
				if(!src)
					return null;
				if(this.defaultImgWidth)
					return "<img src=\""+src+"\" width=\""+this.defaultImgWidth+"\" height=\""+this.defaultImgHeight+"\"/>";
				else
				return "<img src=\""+src+"\"/>";
			}
			else
			return null;
		}

		__proto.onTag_Simple=function(tagName,end,attr){
			return end?("</"+tagName+">"):("<"+tagName+">");
		}

		__proto.onTag_COLOR=function(tagName,end,attr){
			if(!end)
				return "<font color=\""+attr+"\">";
			else
			return "</font>";
		}

		__proto.onTag_FONT=function(tagName,end,attr){
			if(!end)
				return "<font face=\""+attr+"\">";
			else
			return "</font>";
		}

		__proto.onTag_SIZE=function(tagName,end,attr){
			if(!end){
				if(attr=="normal")
					attr=""+this.normalFontSize;
				else if(attr=="small")
				attr=""+this.smallFontSize;
				else if(attr=="large")
				attr=""+this.largeFontSize;
				else if(attr.length && attr.charAt(0)=="+")
				attr=""+(this.smallFontSize+int(attr.substr(1)));
				else if(attr.length && attr.charAt(0)=="-")
				attr=""+(this.smallFontSize-int(attr.substr(1)));
				return "<font size=\""+attr+"\">";
			}
			else
			return "</font>";
		}

		__proto.getTagText=function(remove){
			(remove===void 0)&& (remove=false);
			var pos=this._text.indexOf("[",this._readPos);
			if(pos==-1)
				return null;
			var ret=this._text.substring(this._readPos,pos);
			if(remove)
				this._readPos=pos;
			return ret;
		}

		__proto.parse=function(text){
			this._text=text;
			var pos1=0,pos2=0,pos3=0;
			var end=false;
			var tag,attr;
			var repl;
			var func;
			while((pos2=this._text.indexOf("[",pos1))!=-1){
				pos1=pos2;
				pos2=this._text.indexOf("]",pos1);
				if(pos2==-1)
					break ;
				end=this._text.charAt(pos1+1)=='/';
				tag=this._text.substring(end?pos1+2:pos1+1,pos2);
				pos2++;
				this._readPos=pos2;
				attr=null;
				repl=null;
				pos3=tag.indexOf("=");
				if(pos3!=-1){
					attr=tag.substring(pos3+1);
					tag=tag.substring(0,pos3);
				}
				tag=tag.toLowerCase();
				func=this._handlers[tag];
				if(func!=null){
					repl=func(tag,end,attr);
					if(repl==null)
						repl="";
				}
				else {
					pos1=pos2;
					continue ;
				}
				this._text=this._text.substring(0,pos1)+repl+this._text.substring(this._readPos);
			}
			return this._text;
		}

		__static(UBBParser,
		['inst',function(){return this.inst=new UBBParser();}
		]);
		return UBBParser;
	})()


	//class fairygui.VertAlignType
	var VertAlignType=(function(){
		function VertAlignType(){}
		__class(VertAlignType,'fairygui.VertAlignType');
		VertAlignType.parse=function(value){
			switch (value){
				case "top":
					return 0;
				case "middle":
					return 1;
				case "bottom":
					return 2;
				default :
					return 0;
				}
		}

		VertAlignType.Top=0;
		VertAlignType.Middle=1;
		VertAlignType.Bottom=2;
		return VertAlignType;
	})()


	/**
	*@author Matan Uberstein
	*
	*Asset type constants.
	*/
	//class org.assetloader.base.AssetType
	var AssetType=(function(){
		function AssetType(){};
		__class(AssetType,'org.assetloader.base.AssetType');
		AssetType.AUTO="AUTO";
		AssetType.GROUP="GROUP";
		AssetType.TEXT="TEXT";
		AssetType.JSON="JSON";
		AssetType.XML="XML";
		AssetType.CSS="CSS";
		AssetType.BINARY="BINARY";
		AssetType.DISPLAY_OBJECT="DISPLAY_OBJECT";
		AssetType.SWF="SWF";
		AssetType.IMAGE="IMAGE";
		AssetType.SOUND="SOUND";
		AssetType.VIDEO="VIDEO";
		return AssetType;
	})()


	/**
	*Provides assets with parameters.
	*/
	//class org.assetloader.base.Param
	var Param=(function(){
		function Param(id,value){
			this._id=null;
			this._value=null;
			this._id=id;
			this._value=value;
		}

		__class(Param,'org.assetloader.base.Param');
		var __proto=Param.prototype;
		Laya.imps(__proto,{"org.assetloader.core.IParam":true})
		/**
		*@inheritDoc
		*/
		__getset(0,__proto,'id',function(){
			return this._id;
		});

		/**
		*@inheritDoc
		*/
		__getset(0,__proto,'value',function(){
			return this._value;
		});

		Param.BASE="BASE";
		Param.PREVENT_CACHE="PREVENT_CACHE";
		Param.RETRIES="RETRIES";
		Param.PRIORITY="PRIORITY";
		Param.ON_DEMAND="ON_DEMAND";
		Param.WEIGHT="WEIGHT";
		Param.HEADERS="HEADERS";
		Param.LOADER_CONTEXT="LOADER_CONTEXT";
		Param.TRANSPARENT="TRANSPARENT";
		Param.FILL_COLOR="FILL_COLOR";
		Param.MATRIX="MATRIX";
		Param.COLOR_TRANSFROM="COLOR_TRANSFROM";
		Param.BLEND_MODE="BLEND_MODE";
		Param.CLIP_RECTANGLE="CLIP_RECTANGLE";
		Param.PIXEL_SNAPPING="PIXEL_SNAPPING";
		Param.SMOOTHING="SMOOTHING";
		Param.SOUND_LOADER_CONTEXT="SOUND_LOADER_CONTEXT";
		Param.CHECK_POLICY_FILE="CHECK_POLICY_FILE";
		Param.CLIENT="CLIENT";
		Param.USER_DATA="USER_DATA";
		return Param;
	})()


	/**
	*The Slot class represents a signal slot.
	*
	*@author Robert Penner
	*@author Joa Ebert
	*/
	//class org.osflash.signals.Slot
	var Slot=(function(){
		function Slot(listener,signal,once,priority){
			this._signal=null;
			this._enabled=true;
			this._listener=null;
			this._once=false;
			this._priority=0;
			this._params=null;
			(once===void 0)&& (once=false);
			(priority===void 0)&& (priority=0);
			this._listener=listener;
			this._once=once;
			this._signal=signal;
			this._priority=priority;
			this.verifyListener(listener);
		}

		__class(Slot,'org.osflash.signals.Slot');
		var __proto=Slot.prototype;
		Laya.imps(__proto,{"org.osflash.signals.ISlot":true})
		/**
		*@inheritDoc
		*/
		__proto.execute0=function(){
			if (!this._enabled)return;
			if (this._once)this.remove();
			if (this._params && this._params.length){
				this._listener.apply(null,this._params);
				return;
			}
			this._listener();
		}

		/**
		*@inheritDoc
		*/
		__proto.execute1=function(value){
			if (!this._enabled)return;
			if (this._once)this.remove();
			if (this._params && this._params.length){
				this._listener.apply(null,[value].concat(this._params));
				return;
			}
			this._listener(value);
		}

		/**
		*@inheritDoc
		*/
		__proto.execute=function(valueObjects){
			if (!this._enabled)return;
			if (this._once)this.remove();
			if (this._params && this._params.length){
				valueObjects=valueObjects.concat(this._params);
			};
			var numValueObjects=valueObjects.length;
			if (numValueObjects==0){
				this._listener();
			}
			else if (numValueObjects==1){
				this._listener(valueObjects[0]);
			}
			else if (numValueObjects==2){
				this._listener(valueObjects[0],valueObjects[1]);
			}
			else if (numValueObjects==3){
				this._listener(valueObjects[0],valueObjects[1],valueObjects[2]);
			}
			else{
				this._listener.apply(null,valueObjects);
			}
		}

		/**
		*Creates and returns the string representation of the current object.
		*
		*@return The string representation of the current object.
		*/
		__proto.toString=function(){
			return "[Slot listener: "+this._listener+", once: "+this._once
			+", priority: "+this._priority+", enabled: "+this._enabled+"]";
		}

		/**
		*@inheritDoc
		*/
		__proto.remove=function(){
			this._signal.remove(this._listener);
		}

		__proto.verifyListener=function(listener){
			if (null==listener){
				throw new /*no*/this.ArgumentError('Given listener is null.');
			}
			if (null==this._signal){
				throw new Error('Internal signal reference has not been set yet.');
			}
		}

		/**
		*@inheritDoc
		*/
		__getset(0,__proto,'priority',function(){return this._priority;});
		/**
		*@inheritDoc
		*@throws ArgumentError <code>ArgumentError</code>:Given listener is <code>null</code>. Did you want to set enabled to false instead?
		*@throws Error <code>Error</code>:Internal signal reference has not been set yet.
		*/
		__getset(0,__proto,'listener',function(){
			return this._listener;
			},function(value){
			if (null==value)throw new /*no*/this.ArgumentError(
				'Given listener is null.\nDid you want to set enabled to false instead?');
			this.verifyListener(value);
			this._listener=value;
		});

		/**
		*@inheritDoc
		*/
		__getset(0,__proto,'once',function(){return this._once;});
		/**
		*@inheritDoc
		*/
		__getset(0,__proto,'enabled',function(){return this._enabled;},function(value){this._enabled=value;});
		/**
		*@inheritDoc
		*/
		__getset(0,__proto,'params',function(){return this._params;},function(value){this._params=value;});
		return Slot;
	})()


	/**
	*The SlotList class represents an immutable list of Slot objects.
	*
	*@author Joa Ebert
	*@author Robert Penner
	*/
	//class org.osflash.signals.SlotList
	var SlotList=(function(){
		function SlotList(head,tail){
			this.head=null;
			this.tail=null;
			this.nonEmpty=false;
			if (!head && !tail){
				if (SlotList.NIL)
					throw new /*no*/this.ArgumentError('Parameters head and tail are null. Use the NIL element instead.');
				this.nonEmpty=false;
			}
			else if (!head){
				throw new /*no*/this.ArgumentError('Parameter head cannot be null.');
			}
			else{
				this.head=head;
				this.tail=tail || SlotList.NIL;
				this.nonEmpty=true;
			}
		}

		__class(SlotList,'org.osflash.signals.SlotList');
		var __proto=SlotList.prototype;
		/**
		*Prepends a slot to this list.
		*@param slot The item to be prepended.
		*@return A list consisting of slot followed by all elements of this list.
		*
		*@throws ArgumentError <code>ArgumentError</code>:Parameter head cannot be null.
		*/
		__proto.prepend=function(slot){
			return new SlotList(slot,this);
		}

		/**
		*Appends a slot to this list.
		*Note:appending is O(n). Where possible,prepend which is O(1).
		*In some cases,many list items must be cloned to
		*avoid changing existing lists.
		*@param slot The item to be appended.
		*@return A list consisting of all elements of this list followed by slot.
		*/
		__proto.append=function(slot){
			if (!slot)return this;
			if (!this.nonEmpty)return new SlotList(slot);
			if (this.tail==SlotList.NIL)
				return new SlotList(slot).prepend(this.head);
			var wholeClone=new SlotList(this.head);
			var subClone=wholeClone;
			var current=this.tail;
			while (current.nonEmpty){
				subClone=subClone.tail=new SlotList(current.head);
				current=current.tail;
			}
			subClone.tail=new SlotList(slot);
			return wholeClone;
		}

		/**
		*Insert a slot into the list in a position according to its priority.
		*The higher the priority,the closer the item will be inserted to the list head.
		*@params slot The item to be inserted.
		*
		*@throws ArgumentError <code>ArgumentError</code>:Parameters head and tail are null. Use the NIL element instead.
		*@throws ArgumentError <code>ArgumentError</code>:Parameter head cannot be null.
		*/
		__proto.insertWithPriority=function(slot){
			if (!this.nonEmpty)return new SlotList(slot);
			var priority=slot.priority;
			if (priority > this.head.priority)return this.prepend(slot);
			var wholeClone=new SlotList(this.head);
			var subClone=wholeClone;
			var current=this.tail;
			while (current.nonEmpty){
				if (priority > current.head.priority){
					subClone.tail=current.prepend(slot);
					return wholeClone;
				}
				subClone=subClone.tail=new SlotList(current.head);
				current=current.tail;
			}
			subClone.tail=new SlotList(slot);
			return wholeClone;
		}

		/**
		*Returns the slots in this list that do not contain the supplied listener.
		*Note:assumes the listener is not repeated within the list.
		*@param listener The function to remove.
		*@return A list consisting of all elements of this list that do not have listener.
		*/
		__proto.filterNot=function(listener){
			if (!this.nonEmpty || listener==null)return this;
			if (listener==this.head.listener)return this.tail;
			var wholeClone=new SlotList(this.head);
			var subClone=wholeClone;
			var current=this.tail;
			while (current.nonEmpty){
				if (current.head.listener==listener){
					subClone.tail=current.tail;
					return wholeClone;
				}
				subClone=subClone.tail=new SlotList(current.head);
				current=current.tail;
			}
			return this;
		}

		/**
		*Determines whether the supplied listener Function is contained within this list
		*/
		__proto.contains=function(listener){
			if (!this.nonEmpty)return false;
			var p=this;
			while (p.nonEmpty){
				if (p.head.listener==listener)return true;
				p=p.tail;
			}
			return false;
		}

		/**
		*Retrieves the ISlot associated with a supplied listener within the SlotList.
		*@param listener The Function being searched for
		*@return The ISlot in this list associated with the listener parameter through the ISlot.listener property.
		*Returns null if no such ISlot instance exists or the list is empty.
		*/
		__proto.find=function(listener){
			if (!this.nonEmpty)return null;
			var p=this;
			while (p.nonEmpty){
				if (p.head.listener==listener)return p.head;
				p=p.tail;
			}
			return null;
		}

		__proto.toString=function(){
			var buffer='';
			var p=this;
			while (p.nonEmpty){
				buffer+=p.head+" -> ";
				p=p.tail;
			}
			buffer+="NIL";
			return "[List "+buffer+"]";
		}

		/**
		*The number of slots in the list.
		*/
		__getset(0,__proto,'length',function(){
			if (!this.nonEmpty)return 0;
			if (this.tail==SlotList.NIL)return 1;
			var result=0;
			var p=this;
			while (p.nonEmpty){
				++result;
				p=p.tail;
			}
			return result;
		});

		__static(SlotList,
		['NIL',function(){return this.NIL=new SlotList(null,null);}
		]);
		return SlotList;
	})()


	//class PinYin
	var PinYin=(function(){
		function PinYin(){};
		__class(PinYin,'PinYin');
		PinYin.Trim=function(info){
			return info.replace(/(^\s*)|(\s*$)/g,"");
		}

		PinYin.isEnKong1=function(argValue){
			var flag=false;
			var compStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_-+=|\{[}]:;'<,>.?/ ";
			var length=argValue.length;
			for (var iIndex=0;iIndex<length;iIndex++){
				var temp=compStr.indexOf(argValue.charAt(iIndex));
				if (temp==-1){
					flag=false;
					}else {
					flag=true;
				}
			}
			return flag;
		}

		PinYin.UnicodeToAnsi=function(chrCode){
			var chrHex=chrCode.toString();
			chrHex="000"+chrHex.toUpperCase();
			chrHex=chrHex.substr(chrHex.length-4);
			var i=PinYin.UnicodeChr.indexOf(chrHex);
			if (i!=-1){
				chrHex=PinYin.AnsicodeChr.substr(i,4);
			}
			return parseInt(chrHex,16);
		}

		PinYin.cn2asc=function(cn){
			var m=/[^\x00-\xff]/g;
			var n=cn;
			var a=n;
			while (a==m.exec(n)){
				a=a.split(a).join(escape(a).split("%u").join(""));
			}
			return a;
		}

		PinYin.pinyin=function(char,justFirst){
			(justFirst===void 0)&& (justFirst=false);
			if (!char.charCodeAt(0)||char.charCodeAt(0)< 1328){
				return char;
			}
			if (PinYin.spellArray[char.charCodeAt(0)]){
				return PinYin.spellArray[char.charCodeAt(0)];
			};
			var ascCode=PinYin.UnicodeToAnsi(PinYin.cn2asc(char));
			if (!(ascCode >0xB0A0 && ascCode<0xD7FC)){
				return char;
			}
			for (var i=ascCode;(!PinYin.spell[i] && i>0);){
				i--;
			}
			if(justFirst){
				return PinYin.spell[i].slice(0,1);
			}
			return PinYin.spell[i];
		}

		PinYin.toPinyin=function(str,spliter,justFirst){
			(spliter===void 0)&& (spliter=" ");
			(justFirst===void 0)&& (justFirst=false);
			if (str){
				var pStr="";
				for (var i=0;i<str.length;i++){
					if (PinYin.isEnKong1(str.charAt(i))){
						pStr+=str.charAt(i);
						}else {
						pStr+=spliter+PinYin.pinyin(str.charAt(i),justFirst);
					}
				}
				return PinYin.Trim(pStr);
			}
			return "";
		}

		PinYin.test=function(s){
			console.log(PinYin.toPinyin(s));
		}

		PinYin.UnicodeChr='00A4,00A7,00A8,00B0,00B1,00B7,00D7,00E0,00E1,00E8,00E9,00EA,00EC,00ED,00F2,00F3,00F7,00F9,00FA,00FC,0101,0113,011B,012B,014D,016B,01CE,01D0,01D2,01D4,01D6,01D8,01DA,01DC,02C7,02C9,0391,0392,0393,0394,0395,0396,0397,0398,0399,039A,039B,039C,039D,039E,039F,03A0,03A1,03A3,03A4,03A5,03A6,03A7,03A8,03A9,03B1,03B2,03B3,03B4,03B5,03B6,03B7,03B8,03B9,03BA,03BB,03BC,03BD,03BE,03BF,03C0,03C1,03C3,03C4,03C5,03C6,03C7,03C8,03C9,0401,0410,0411,0412,0413,0414,0415,0416,0417,0418,0419,041A,041B,041C,041D,041E,041F,0420,0421,0422,0423,0424,0425,0426,0427,0428,0429,042A,042B,042C,042D,042E,042F,0430,0431,0432,0433,0434,0435,0436,0437,0438,0439,043A,043B,043C,043D,043E,043F,0440,0441,0442,0443,0444,0445,0446,0447,0448,0449,044A,044B,044C,044D,044E,044F,0451,2014,2016,2018,2019,201C,201D,2026,2030,2032,2033,203B,2103,2116,2160,2161,2162,2163,2164,2165,2166,2167,2168,2169,216A,216B,2190,2191,2192,2193,2208,220F,2211,221A,221D,221E,2220,2225,2227,2228,2229,222A,222B,222E,2234,2235,2236,2237,223D,2248,224C,2260,2261,2264,2265,226E,226F,2299,22A5,2312,2460,2461,2462,2463,2464,2465,2466,2467,2468,2469,2474,2475,2476,2477,2478,2479,247A,247B,247C,247D,247E,247F,2480,2481,2482,2483,2484,2485,2486,2487,2488,2489,248A,248B,248C,248D,248E,248F,2490,2491,2492,2493,2494,2495,2496,2497,2498,2499,249A,249B,2500,2501,2502,2503,2504,2505,2506,2507,2508,2509,250A,250B,250C,250D,250E,250F,2510,2511,2512,2513,2514,2515,2516,2517,2518,2519,251A,251B,251C,251D,251E,251F,2520,2521,2522,2523,2524,2525,2526,2527,2528,2529,252A,252B,252C,252D,252E,252F,2530,2531,2532,2533,2534,2535,2536,2537,2538,2539,253A,253B,253C,253D,253E,253F,2540,2541,2542,2543,2544,2545,2546,2547,2548,2549,254A,254B,25A0,25A1,25B2,25B3,25C6,25C7,25CB,25CE,25CF,2605,2606,2640,2642,3000,3001,3002,3003,3005,3008,3009,300A,300B,300C,300D,300E,300F,3010,3011,3013,3014,3015,3016,3017,3041,3042,3043,3044,3045,3046,3047,3048,3049,304A,304B,304C,304D,304E,304F,3050,3051,3052,3053,3054,3055,3056,3057,3058,3059,305A,305B,305C,305D,305E,305F,3060,3061,3062,3063,3064,3065,3066,3067,3068,3069,306A,306B,306C,306D,306E,306F,3070,3071,3072,3073,3074,3075,3076,3077,3078,3079,307A,307B,307C,307D,307E,307F,3080,3081,3082,3083,3084,3085,3086,3087,3088,3089,308A,308B,308C,308D,308E,308F,3090,3091,3092,3093,30A1,30A2,30A3,30A4,30A5,30A6,30A7,30A8,30A9,30AA,30AB,30AC,30AD,30AE,30AF,30B0,30B1,30B2,30B3,30B4,30B5,30B6,30B7,30B8,30B9,30BA,30BB,30BC,30BD,30BE,30BF,30C0,30C1,30C2,30C3,30C4,30C5,30C6,30C7,30C8,30C9,30CA,30CB,30CC,30CD,30CE,30CF,30D0,30D1,30D2,30D3,30D4,30D5,30D6,30D7,30D8,30D9,30DA,30DB,30DC,30DD,30DE,30DF,30E0,30E1,30E2,30E3,30E4,30E5,30E6,30E7,30E8,30E9,30EA,30EB,30EC,30ED,30EE,30EF,30F0,30F1,30F2,30F3,30F4,30F5,30F6,3105,3106,3107,3108,3109,310A,310B,310C,310D,310E,310F,3110,3111,3112,3113,3114,3115,3116,3117,3118,3119,311A,311B,311C,311D,311E,311F,3120,3121,3122,3123,3124,3125,3126,3127,3128,3129,3220,3221,3222,3223,3224,3225,3226,3227,3228,3229,4E00,4E01,4E03,4E07,4E08,4E09,4E0A,4E0B,4E0C,4E0D,4E0E,4E10,4E11,4E13,4E14,4E15,4E16,4E18,4E19,4E1A,4E1B,4E1C,4E1D,4E1E,4E22,4E24,4E25,4E27,4E28,4E2A,4E2B,4E2C,4E2D,4E30,4E32,4E34,4E36,4E38,4E39,4E3A,4E3B,4E3D,4E3E,4E3F,4E43,4E45,4E47,4E48,4E49,4E4B,4E4C,4E4D,4E4E,4E4F,4E50,4E52,4E53,4E54,4E56,4E58,4E59,4E5C,4E5D,4E5E,4E5F,4E60,4E61,4E66,4E69,4E70,4E71,4E73,4E7E,4E86,4E88,4E89,4E8B,4E8C,4E8D,4E8E,4E8F,4E91,4E92,4E93,4E94,4E95,4E98,4E9A,4E9B,4E9F,4EA0,4EA1,4EA2,4EA4,4EA5,4EA6,4EA7,4EA8,4EA9,4EAB,4EAC,4EAD,4EAE,4EB2,4EB3,4EB5,4EBA,4EBB,4EBF,4EC0,4EC1,4EC2,4EC3,4EC4,4EC5,4EC6,4EC7,4EC9,4ECA,4ECB,4ECD,4ECE,4ED1,4ED3,4ED4,4ED5,4ED6,4ED7,4ED8,4ED9,4EDD,4EDE,4EDF,4EE1,4EE3,4EE4,4EE5,4EE8,4EEA,4EEB,4EEC,4EF0,4EF2,4EF3,4EF5,4EF6,4EF7,4EFB,4EFD,4EFF,4F01,4F09,4F0A,4F0D,4F0E,4F0F,4F10,4F11,4F17,4F18,4F19,4F1A,4F1B,4F1E,4F1F,4F20,4F22,4F24,4F25,4F26,4F27,4F2A,4F2B,4F2F,4F30,4F32,4F34,4F36,4F38,4F3A,4F3C,4F3D,4F43,4F46,4F4D,4F4E,4F4F,4F50,4F51,4F53,4F55,4F57,4F58,4F59,4F5A,4F5B,4F5C,4F5D,4F5E,4F5F,4F60,4F63,4F64,4F65,4F67,4F69,4F6C,4F6F,4F70,4F73,4F74,4F76,4F7B,4F7C,4F7E,4F7F,4F83,4F84,4F88,4F89,4F8B,4F8D,4F8F,4F91,4F94,4F97,4F9B,4F9D,4FA0,4FA3,4FA5,4FA6,4FA7,4FA8,4FA9,4FAA,4FAC,4FAE,4FAF,4FB5,4FBF,4FC3,4FC4,4FC5,4FCA,4FCE,4FCF,4FD0,4FD1,4FD7,4FD8,4FDA,4FDC,4FDD,4FDE,4FDF,4FE1,4FE3,4FE6,4FE8,4FE9,4FEA,4FED,4FEE,4FEF,4FF1,4FF3,4FF8,4FFA,4FFE,500C,500D,500F,5012,5014,5018,5019,501A,501C,501F,5021,5025,5026,5028,5029,502A,502C,502D,502E,503A,503C,503E,5043,5047,5048,504C,504E,504F,5055,505A,505C,5065,506C,5076,5077,507B,507E,507F,5080,5085,5088,508D,50A3,50A5,50A7,50A8,50A9,50AC,50B2,50BA,50BB,50CF,50D6,50DA,50E6,50E7,50EC,50ED,50EE,50F3,50F5,50FB,5106,5107,510B,5112,5121,513F,5140,5141,5143,5144,5145,5146,5148,5149,514B,514D,5151,5154,5155,5156,515A,515C,5162,5165,5168,516B,516C,516D,516E,5170,5171,5173,5174,5175,5176,5177,5178,5179,517B,517C,517D,5180,5181,5182,5185,5188,5189,518C,518D,5192,5195,5196,5197,5199,519B,519C,51A0,51A2,51A4,51A5,51AB,51AC,51AF,51B0,51B1,51B2,51B3,51B5,51B6,51B7,51BB,51BC,51BD,51C0,51C4,51C6,51C7,51C9,51CB,51CC,51CF,51D1,51DB,51DD,51E0,51E1,51E4,51EB,51ED,51EF,51F0,51F3,51F5,51F6,51F8,51F9,51FA,51FB,51FC,51FD,51FF,5200,5201,5202,5203,5206,5207,5208,520A,520D,520E,5211,5212,5216,5217,5218,5219,521A,521B,521D,5220,5224,5228,5229,522B,522D,522E,5230,5233,5236,5237,5238,5239,523A,523B,523D,523F,5240,5241,5242,5243,524A,524C,524D,5250,5251,5254,5256,525C,525E,5261,5265,5267,5269,526A,526F,5272,527D,527F,5281,5282,5288,5290,5293,529B,529D,529E,529F,52A0,52A1,52A2,52A3,52A8,52A9,52AA,52AB,52AC,52AD,52B1,52B2,52B3,52BE,52BF,52C3,52C7,52C9,52CB,52D0,52D2,52D6,52D8,52DF,52E4,52F0,52F9,52FA,52FE,52FF,5300,5305,5306,5308,530D,530F,5310,5315,5316,5317,5319,531A,531D,5320,5321,5323,5326,532A,532E,5339,533A,533B,533E,533F,5341,5343,5345,5347,5348,5349,534A,534E,534F,5351,5352,5353,5355,5356,5357,535A,535C,535E,535F,5360,5361,5362,5363,5364,5366,5367,5369,536B,536E,536F,5370,5371,5373,5374,5375,5377,5378,537A,537F,5382,5384,5385,5386,5389,538B,538C,538D,5395,5398,539A,539D,539F,53A2,53A3,53A5,53A6,53A8,53A9,53AE,53B6,53BB,53BF,53C1,53C2,53C8,53C9,53CA,53CB,53CC,53CD,53D1,53D4,53D6,53D7,53D8,53D9,53DB,53DF,53E0,53E3,53E4,53E5,53E6,53E8,53E9,53EA,53EB,53EC,53ED,53EE,53EF,53F0,53F1,53F2,53F3,53F5,53F6,53F7,53F8,53F9,53FB,53FC,53FD,5401,5403,5404,5406,5408,5409,540A,540C,540D,540E,540F,5410,5411,5412,5413,5415,5416,5417,541B,541D,541E,541F,5420,5421,5423,5426,5427,5428,5429,542B,542C,542D,542E,542F,5431,5432,5434,5435,5438,5439,543B,543C,543E,5440,5443,5446,5448,544A,544B,5450,5452,5453,5454,5455,5456,5457,5458,5459,545B,545C,5462,5464,5466,5468,5471,5472,5473,5475,5476,5477,5478,547B,547C,547D,5480,5482,5484,5486,548B,548C,548E,548F,5490,5492,5494,5495,5496,5499,549A,549B,549D,54A3,54A4,54A6,54A7,54A8,54A9,54AA,54AB,54AC,54AD,54AF,54B1,54B3,54B4,54B8,54BB,54BD,54BF,54C0,54C1,54C2,54C4,54C6,54C7,54C8,54C9,54CC,54CD,54CE,54CF,54D0,54D1,54D2,54D3,54D4,54D5,54D7,54D9,54DA,54DC,54DD,54DE,54DF,54E5,54E6,54E7,54E8,54E9,54EA,54ED,54EE,54F2,54F3,54FA,54FC,54FD,54FF,5501,5506,5507,5509,550F,5510,5511,5514,551B,5520,5522,5523,5524,5527,552A,552C,552E,552F,5530,5531,5533,5537,553C,553E,553F,5541,5543,5544,5546,5549,554A,5550,5555,5556,555C,5561,5564,5565,5566,5567,556A,556C,556D,556E,5575,5576,5577,5578,557B,557C,557E,5580,5581,5582,5583,5584,5587,5588,5589,558A,558B,558F,5591,5594,5598,5599,559C,559D,559F,55A7,55B1,55B3,55B5,55B7,55B9,55BB,55BD,55BE,55C4,55C5,55C9,55CC,55CD,55D1,55D2,55D3,55D4,55D6,55DC,55DD,55DF,55E1,55E3,55E4,55E5,55E6,55E8,55EA,55EB,55EC,55EF,55F2,55F3,55F5,55F7,55FD,55FE,5600,5601,5608,5609,560C,560E,560F,5618,561B,561E,561F,5623,5624,5627,562C,562D,5631,5632,5634,5636,5639,563B,563F,564C,564D,564E,5654,5657,5658,5659,565C,5662,5664,5668,5669,566A,566B,566C,5671,5676,567B,567C,5685,5686,568E,568F,5693,56A3,56AF,56B7,56BC,56CA,56D4,56D7,56DA,56DB,56DD,56DE,56DF,56E0,56E1,56E2,56E4,56EB,56ED,56F0,56F1,56F4,56F5,56F9,56FA,56FD,56FE,56FF,5703,5704,5706,5708,5709,570A,571C,571F,5723,5728,5729,572A,572C,572D,572E,572F,5730,5733,5739,573A,573B,573E,5740,5742,5747,574A,574C,574D,574E,574F,5750,5751,5757,575A,575B,575C,575D,575E,575F,5760,5761,5764,5766,5768,5769,576A,576B,576D,576F,5773,5776,5777,577B,577C,5782,5783,5784,5785,5786,578B,578C,5792,5793,579B,57A0,57A1,57A2,57A3,57A4,57A6,57A7,57A9,57AB,57AD,57AE,57B2,57B4,57B8,57C2,57C3,57CB,57CE,57CF,57D2,57D4,57D5,57D8,57D9,57DA,57DD,57DF,57E0,57E4,57ED,57EF,57F4,57F8,57F9,57FA,57FD,5800,5802,5806,5807,580B,580D,5811,5815,5819,581E,5820,5821,5824,582A,5830,5835,5844,584C,584D,5851,5854,5858,585E,5865,586B,586C,587E,5880,5881,5883,5885,5889,5892,5893,5899,589A,589E,589F,58A8,58A9,58BC,58C1,58C5,58D1,58D5,58E4,58EB,58EC,58EE,58F0,58F3,58F6,58F9,5902,5904,5907,590D,590F,5914,5915,5916,5919,591A,591C,591F,5924,5925,5927,5929,592A,592B,592D,592E,592F,5931,5934,5937,5938,5939,593A,593C,5941,5942,5944,5947,5948,5949,594B,594E,594F,5951,5954,5955,5956,5957,5958,595A,5960,5962,5965,5973,5974,5976,5978,5979,597D,5981,5982,5983,5984,5986,5987,5988,598A,598D,5992,5993,5996,5997,5999,599E,59A3,59A4,59A5,59A8,59A9,59AA,59AB,59AE,59AF,59B2,59B9,59BB,59BE,59C6,59CA,59CB,59D0,59D1,59D2,59D3,59D4,59D7,59D8,59DA,59DC,59DD,59E3,59E5,59E8,59EC,59F9,59FB,59FF,5A01,5A03,5A04,5A05,5A06,5A07,5A08,5A09,5A0C,5A11,5A13,5A18,5A1C,5A1F,5A20,5A23,5A25,5A29,5A31,5A32,5A34,5A36,5A3C,5A40,5A46,5A49,5A4A,5A55,5A5A,5A62,5A67,5A6A,5A74,5A75,5A76,5A77,5A7A,5A7F,5A92,5A9A,5A9B,5AAA,5AB2,5AB3,5AB5,5AB8,5ABE,5AC1,5AC2,5AC9,5ACC,5AD2,5AD4,5AD6,5AD8,5ADC,5AE0,5AE1,5AE3,5AE6,5AE9,5AEB,5AF1,5B09,5B16,5B17,5B32,5B34,5B37,5B40,5B50,5B51,5B53,5B54,5B55,5B57,5B58,5B59,5B5A,5B5B,5B5C,5B5D,5B5F,5B62,5B63,5B64,5B65,5B66,5B69,5B6A,5B6C,5B70,5B71,5B73,5B75,5B7A,5B7D,5B80,5B81,5B83,5B84,5B85,5B87,5B88,5B89,5B8B,5B8C,5B8F,5B93,5B95,5B97,5B98,5B99,5B9A,5B9B,5B9C,5B9D,5B9E,5BA0,5BA1,5BA2,5BA3,5BA4,5BA5,5BA6,5BAA,5BAB,5BB0,5BB3,5BB4,5BB5,5BB6,5BB8,5BB9,5BBD,5BBE,5BBF,5BC2,5BC4,5BC5,5BC6,5BC7,5BCC,5BD0,5BD2,5BD3,5BDD,5BDE,5BDF,5BE1,5BE4,5BE5,5BE8,5BEE,5BF0,5BF8,5BF9,5BFA,5BFB,5BFC,5BFF,5C01,5C04,5C06,5C09,5C0A,5C0F,5C11,5C14,5C15,5C16,5C18,5C1A,5C1C,5C1D,5C22,5C24,5C25,5C27,5C2C,5C31,5C34,5C38,5C39,5C3A,5C3B,5C3C,5C3D,5C3E,5C3F,5C40,5C41,5C42,5C45,5C48,5C49,5C4A,5C4B,5C4E,5C4F,5C50,5C51,5C55,5C59,5C5E,5C60,5C61,5C63,5C65,5C66,5C6E,5C6F,5C71,5C79,5C7A,5C7F,5C81,5C82,5C88,5C8C,5C8D,5C90,5C91,5C94,5C96,5C97,5C98,5C99,5C9A,5C9B,5C9C,5CA2,5CA3,5CA9,5CAB,5CAC,5CAD,5CB1,5CB3,5CB5,5CB7,5CB8,5CBD,5CBF,5CC1,5CC4,5CCB,5CD2,5CD9,5CE1,5CE4,5CE5,5CE6,5CE8,5CEA,5CED,5CF0,5CFB,5D02,5D03,5D06,5D07,5D0E,5D14,5D16,5D1B,5D1E,5D24,5D26,5D27,5D29,5D2D,5D2E,5D34,5D3D,5D3E,5D47,5D4A,5D4B,5D4C,5D58,5D5B,5D5D,5D69,5D6B,5D6C,5D6F,5D74,5D82,5D99,5D9D,5DB7,5DC5,5DCD,5DDB,5DDD,5DDE,5DE1,5DE2,5DE5,5DE6,5DE7,5DE8,5DE9,5DEB,5DEE,5DEF,5DF1,5DF2,5DF3,5DF4,5DF7,5DFD,5DFE,5E01,5E02,5E03,5E05,5E06,5E08,5E0C,5E0F,5E10,5E11,5E14,5E15,5E16,5E18,5E19,5E1A,5E1B,5E1C,5E1D,5E26,5E27,5E2D,5E2E,5E31,5E37,5E38,5E3B,5E3C,5E3D,5E42,5E44,5E45,5E4C,5E54,5E55,5E5B,5E5E,5E61,5E62,5E72,5E73,5E74,5E76,5E78,5E7A,5E7B,5E7C,5E7D,5E7F,5E80,5E84,5E86,5E87,5E8A,5E8B,5E8F,5E90,5E91,5E93,5E94,5E95,5E96,5E97,5E99,5E9A,5E9C,5E9E,5E9F,5EA0,5EA5,5EA6,5EA7,5EAD,5EB3,5EB5,5EB6,5EB7,5EB8,5EB9,5EBE,5EC9,5ECA,5ED1,5ED2,5ED3,5ED6,5EDB,5EE8,5EEA,5EF4,5EF6,5EF7,5EFA,5EFE,5EFF,5F00,5F01,5F02,5F03,5F04,5F08,5F0A,5F0B,5F0F,5F11,5F13,5F15,5F17,5F18,5F1B,5F1F,5F20,5F25,5F26,5F27,5F29,5F2A,5F2D,5F2F,5F31,5F39,5F3A,5F3C,5F40,5F50,5F52,5F53,5F55,5F56,5F57,5F58,5F5D,5F61,5F62,5F64,5F66,5F69,5F6A,5F6C,5F6D,5F70,5F71,5F73,5F77,5F79,5F7B,5F7C,5F80,5F81,5F82,5F84,5F85,5F87,5F88,5F89,5F8A,5F8B,5F8C,5F90,5F92,5F95,5F97,5F98,5F99,5F9C,5FA1,5FA8,5FAA,5FAD,5FAE,5FB5,5FB7,5FBC,5FBD,5FC3,5FC4,5FC5,5FC6,5FC9,5FCC,5FCD,5FCF,5FD0,5FD1,5FD2,5FD6,5FD7,5FD8,5FD9,5FDD,5FE0,5FE1,5FE4,5FE7,5FEA,5FEB,5FED,5FEE,5FF1,5FF5,5FF8,5FFB,5FFD,5FFE,5FFF,6000,6001,6002,6003,6004,6005,6006,600A,600D,600E,600F,6012,6014,6015,6016,6019,601B,601C,601D,6020,6021,6025,6026,6027,6028,6029,602A,602B,602F,6035,603B,603C,603F,6041,6042,6043,604B,604D,6050,6052,6055,6059,605A,605D,6062,6063,6064,6067,6068,6069,606A,606B,606C,606D,606F,6070,6073,6076,6078,6079,607A,607B,607C,607D,607F,6083,6084,6089,608C,608D,6092,6094,6096,609A,609B,609D,609F,60A0,60A3,60A6,60A8,60AB,60AC,60AD,60AF,60B1,60B2,60B4,60B8,60BB,60BC,60C5,60C6,60CA,60CB,60D1,60D5,60D8,60DA,60DC,60DD,60DF,60E0,60E6,60E7,60E8,60E9,60EB,60EC,60ED,60EE,60EF,60F0,60F3,60F4,60F6,60F9,60FA,6100,6101,6106,6108,6109,610D,610E,610F,6115,611A,611F,6120,6123,6124,6126,6127,612B,613F,6148,614A,614C,614E,6151,6155,615D,6162,6167,6168,6170,6175,6177,618B,618E,6194,619D,61A7,61A8,61A9,61AC,61B7,61BE,61C2,61C8,61CA,61CB,61D1,61D2,61D4,61E6,61F5,61FF,6206,6208,620A,620B,620C,620D,620E,620F,6210,6211,6212,6215,6216,6217,6218,621A,621B,621F,6221,6222,6224,6225,622A,622C,622E,6233,6234,6237,623D,623E,623F,6240,6241,6243,6247,6248,6249,624B,624C,624D,624E,6251,6252,6253,6254,6258,625B,6263,6266,6267,6269,626A,626B,626C,626D,626E,626F,6270,6273,6276,6279,627C,627E,627F,6280,6284,6289,628A,6291,6292,6293,6295,6296,6297,6298,629A,629B,629F,62A0,62A1,62A2,62A4,62A5,62A8,62AB,62AC,62B1,62B5,62B9,62BB,62BC,62BD,62BF,62C2,62C4,62C5,62C6,62C7,62C8,62C9,62CA,62CC,62CD,62CE,62D0,62D2,62D3,62D4,62D6,62D7,62D8,62D9,62DA,62DB,62DC,62DF,62E2,62E3,62E5,62E6,62E7,62E8,62E9,62EC,62ED,62EE,62EF,62F1,62F3,62F4,62F6,62F7,62FC,62FD,62FE,62FF,6301,6302,6307,6308,6309,630E,6311,6316,631A,631B,631D,631E,631F,6320,6321,6322,6323,6324,6325,6328,632A,632B,632F,6332,6339,633A,633D,6342,6343,6345,6346,6349,634B,634C,634D,634E,634F,6350,6355,635E,635F,6361,6362,6363,6367,6369,636D,636E,6371,6376,6377,637A,637B,6380,6382,6387,6388,6389,638A,638C,638E,638F,6390,6392,6396,6398,63A0,63A2,63A3,63A5,63A7,63A8,63A9,63AA,63AC,63AD,63AE,63B0,63B3,63B4,63B7,63B8,63BA,63BC,63BE,63C4,63C6,63C9,63CD,63CE,63CF,63D0,63D2,63D6,63DE,63E0,63E1,63E3,63E9,63EA,63ED,63F2,63F4,63F6,63F8,63FD,63FF,6400,6401,6402,6405,640B,640C,640F,6410,6413,6414,641B,641C,641E,6420,6421,6426,642A,642C,642D,6434,643A,643D,643F,6441,6444,6445,6446,6447,6448,644A,6452,6454,6458,645E,6467,6469,646D,6478,6479,647A,6482,6484,6485,6487,6491,6492,6495,6496,6499,649E,64A4,64A9,64AC,64AD,64AE,64B0,64B5,64B7,64B8,64BA,64BC,64C0,64C2,64C5,64CD,64CE,64D0,64D2,64D7,64D8,64DE,64E2,64E4,64E6,6500,6509,6512,6518,6525,652B,652E,652F,6534,6535,6536,6538,6539,653B,653E,653F,6545,6548,6549,654C,654F,6551,6555,6556,6559,655B,655D,655E,6562,6563,6566,656B,656C,6570,6572,6574,6577,6587,658B,658C,6590,6591,6593,6597,6599,659B,659C,659F,65A1,65A4,65A5,65A7,65A9,65AB,65AD,65AF,65B0,65B9,65BC,65BD,65C1,65C3,65C4,65C5,65C6,65CB,65CC,65CE,65CF,65D2,65D6,65D7,65E0,65E2,65E5,65E6,65E7,65E8,65E9,65EC,65ED,65EE,65EF,65F0,65F1,65F6,65F7,65FA,6600,6602,6603,6606,660A,660C,660E,660F,6613,6614,6615,6619,661D,661F,6620,6625,6627,6628,662D,662F,6631,6634,6635,6636,663C,663E,6641,6643,664B,664C,664F,6652,6653,6654,6655,6656,6657,665A,665F,6661,6664,6666,6668,666E,666F,6670,6674,6676,6677,667A,667E,6682,6684,6687,668C,6691,6696,6697,669D,66A7,66A8,66AE,66B4,66B9,66BE,66D9,66DB,66DC,66DD,66E6,66E9,66F0,66F2,66F3,66F4,66F7,66F9,66FC,66FE,66FF,6700,6708,6709,670A,670B,670D,6710,6714,6715,6717,671B,671D,671F,6726,6728,672A,672B,672C,672D,672F,6731,6734,6735,673A,673D,6740,6742,6743,6746,6748,6749,674C,674E,674F,6750,6751,6753,6756,675C,675E,675F,6760,6761,6765,6768,6769,676A,676D,676F,6770,6772,6773,6775,6777,677C,677E,677F,6781,6784,6787,6789,678B,6790,6795,6797,6798,679A,679C,679D,679E,67A2,67A3,67A5,67A7,67A8,67AA,67AB,67AD,67AF,67B0,67B3,67B5,67B6,67B7,67B8,67C1,67C3,67C4,67CF,67D0,67D1,67D2,67D3,67D4,67D8,67D9,67DA,67DC,67DD,67DE,67E0,67E2,67E5,67E9,67EC,67EF,67F0,67F1,67F3,67F4,67FD,67FF,6800,6805,6807,6808,6809,680A,680B,680C,680E,680F,6811,6813,6816,6817,681D,6821,6829,682A,6832,6833,6837,6838,6839,683C,683D,683E,6840,6841,6842,6843,6844,6845,6846,6848,6849,684A,684C,684E,6850,6851,6853,6854,6855,6860,6861,6862,6863,6864,6865,6866,6867,6868,6869,686B,6874,6876,6877,6881,6883,6885,6886,688F,6893,6897,68A2,68A6,68A7,68A8,68AD,68AF,68B0,68B3,68B5,68C0,68C2,68C9,68CB,68CD,68D2,68D5,68D8,68DA,68E0,68E3,68EE,68F0,68F1,68F5,68F9,68FA,68FC,6901,6905,690B,690D,690E,6910,6912,691F,6920,6924,692D,6930,6934,6939,693D,693F,6942,6954,6957,695A,695D,695E,6960,6963,6966,696B,696E,6971,6977,6978,6979,697C,6980,6982,6984,6986,6987,6988,6989,698D,6994,6995,6998,699B,699C,69A7,69A8,69AB,69AD,69B1,69B4,69B7,69BB,69C1,69CA,69CC,69CE,69D0,69D4,69DB,69DF,69E0,69ED,69F2,69FD,69FF,6A0A,6A17,6A18,6A1F,6A21,6A28,6A2A,6A2F,6A31,6A35,6A3D,6A3E,6A44,6A47,6A50,6A58,6A59,6A5B,6A61,6A65,6A71,6A79,6A7C,6A80,6A84,6A8E,6A90,6A91,6A97,6AA0,6AA9,6AAB,6AAC,6B20,6B21,6B22,6B23,6B24,6B27,6B32,6B37,6B39,6B3A,6B3E,6B43,6B46,6B47,6B49,6B4C,6B59,6B62,6B63,6B64,6B65,6B66,6B67,6B6A,6B79,6B7B,6B7C,6B81,6B82,6B83,6B84,6B86,6B87,6B89,6B8A,6B8B,6B8D,6B92,6B93,6B96,6B9A,6B9B,6BA1,6BAA,6BB3,6BB4,6BB5,6BB7,6BBF,6BC1,6BC2,6BC5,6BCB,6BCD,6BCF,6BD2,6BD3,6BD4,6BD5,6BD6,6BD7,6BD9,6BDB,6BE1,6BEA,6BEB,6BEF,6BF3,6BF5,6BF9,6BFD,6C05,6C06,6C07,6C0D,6C0F,6C10,6C11,6C13,6C14,6C15,6C16,6C18,6C19,6C1A,6C1B,6C1F,6C21,6C22,6C24,6C26,6C27,6C28,6C29,6C2A,6C2E,6C2F,6C30,6C32,6C34,6C35,6C38,6C3D,6C40,6C41,6C42,6C46,6C47,6C49,6C4A,6C50,6C54,6C55,6C57,6C5B,6C5C,6C5D,6C5E,6C5F,6C60,6C61,6C64,6C68,6C69,6C6A,6C70,6C72,6C74,6C76,6C79,6C7D,6C7E,6C81,6C82,6C83,6C85,6C86,6C88,6C89,6C8C,6C8F,6C90,6C93,6C94,6C99,6C9B,6C9F,6CA1,6CA3,6CA4,6CA5,6CA6,6CA7,6CA9,6CAA,6CAB,6CAD,6CAE,6CB1,6CB2,6CB3,6CB8,6CB9,6CBB,6CBC,6CBD,6CBE,6CBF,6CC4,6CC5,6CC9,6CCA,6CCC,6CD0,6CD3,6CD4,6CD5,6CD6,6CD7,6CDB,6CDE,6CE0,6CE1,6CE2,6CE3,6CE5,6CE8,6CEA,6CEB,6CEE,6CEF,6CF0,6CF1,6CF3,6CF5,6CF6,6CF7,6CF8,6CFA,6CFB,6CFC,6CFD,6CFE,6D01,6D04,6D07,6D0B,6D0C,6D0E,6D12,6D17,6D19,6D1A,6D1B,6D1E,6D25,6D27,6D2A,6D2B,6D2E,6D31,6D32,6D33,6D35,6D39,6D3B,6D3C,6D3D,6D3E,6D41,6D43,6D45,6D46,6D47,6D48,6D4A,6D4B,6D4D,6D4E,6D4F,6D51,6D52,6D53,6D54,6D59,6D5A,6D5C,6D5E,6D60,6D63,6D66,6D69,6D6A,6D6E,6D6F,6D74,6D77,6D78,6D7C,6D82,6D85,6D88,6D89,6D8C,6D8E,6D91,6D93,6D94,6D95,6D9B,6D9D,6D9E,6D9F,6DA0,6DA1,6DA3,6DA4,6DA6,6DA7,6DA8,6DA9,6DAA,6DAB,6DAE,6DAF,6DB2,6DB5,6DB8,6DBF,6DC0,6DC4,6DC5,6DC6,6DC7,6DCB,6DCC,6DD1,6DD6,6DD8,6DD9,6DDD,6DDE,6DE0,6DE1,6DE4,6DE6,6DEB,6DEC,6DEE,6DF1,6DF3,6DF7,6DF9,6DFB,6DFC,6E05,6E0A,6E0C,6E0D,6E0E,6E10,6E11,6E14,6E16,6E17,6E1A,6E1D,6E20,6E21,6E23,6E24,6E25,6E29,6E2B,6E2D,6E2F,6E32,6E34,6E38,6E3A,6E43,6E44,6E4D,6E4E,6E53,6E54,6E56,6E58,6E5B,6E5F,6E6B,6E6E,6E7E,6E7F,6E83,6E85,6E86,6E89,6E8F,6E90,6E98,6E9C,6E9F,6EA2,6EA5,6EA7,6EAA,6EAF,6EB1,6EB2,6EB4,6EB6,6EB7,6EBA,6EBB,6EBD,6EC1,6EC2,6EC7,6ECB,6ECF,6ED1,6ED3,6ED4,6ED5,6ED7,6EDA,6EDE,6EDF,6EE0,6EE1,6EE2,6EE4,6EE5,6EE6,6EE8,6EE9,6EF4,6EF9,6F02,6F06,6F09,6F0F,6F13,6F14,6F15,6F20,6F24,6F29,6F2A,6F2B,6F2D,6F2F,6F31,6F33,6F36,6F3E,6F46,6F47,6F4B,6F4D,6F58,6F5C,6F5E,6F62,6F66,6F6D,6F6E,6F72,6F74,6F78,6F7A,6F7C,6F84,6F88,6F89,6F8C,6F8D,6F8E,6F9C,6FA1,6FA7,6FB3,6FB6,6FB9,6FC0,6FC2,6FC9,6FD1,6FD2,6FDE,6FE0,6FE1,6FEE,6FEF,7011,701A,701B,7023,7035,7039,704C,704F,705E,706B,706C,706D,706F,7070,7075,7076,7078,707C,707E,707F,7080,7085,7089,708A,708E,7092,7094,7095,7096,7099,709C,709D,70AB,70AC,70AD,70AE,70AF,70B1,70B3,70B7,70B8,70B9,70BB,70BC,70BD,70C0,70C1,70C2,70C3,70C8,70CA,70D8,70D9,70DB,70DF,70E4,70E6,70E7,70E8,70E9,70EB,70EC,70ED,70EF,70F7,70F9,70FD,7109,710A,7110,7113,7115,7116,7118,7119,711A,7126,712F,7130,7131,7136,7145,714A,714C,714E,715C,715E,7164,7166,7167,7168,716E,7172,7173,7178,717A,717D,7184,718A,718F,7194,7198,7199,719F,71A0,71A8,71AC,71B3,71B5,71B9,71C3,71CE,71D4,71D5,71E0,71E5,71E7,71EE,71F9,7206,721D,7228,722A,722C,7230,7231,7235,7236,7237,7238,7239,723B,723D,723F,7247,7248,724C,724D,7252,7256,7259,725B,725D,725F,7261,7262,7266,7267,7269,726E,726F,7272,7275,7279,727A,727E,727F,7280,7281,7284,728A,728B,728D,728F,7292,729F,72AC,72AD,72AF,72B0,72B4,72B6,72B7,72B8,72B9,72C1,72C2,72C3,72C4,72C8,72CD,72CE,72D0,72D2,72D7,72D9,72DE,72E0,72E1,72E8,72E9,72EC,72ED,72EE,72EF,72F0,72F1,72F2,72F3,72F4,72F7,72F8,72FA,72FB,72FC,7301,7303,730A,730E,7313,7315,7316,7317,731B,731C,731D,731E,7321,7322,7325,7329,732A,732B,732C,732E,7331,7334,7337,7338,7339,733E,733F,734D,7350,7352,7357,7360,736C,736D,736F,737E,7384,7387,7389,738B,738E,7391,7396,739B,739F,73A2,73A9,73AB,73AE,73AF,73B0,73B2,73B3,73B7,73BA,73BB,73C0,73C2,73C8,73C9,73CA,73CD,73CF,73D0,73D1,73D9,73DE,73E0,73E5,73E7,73E9,73ED,73F2,7403,7405,7406,7409,740A,740F,7410,741A,741B,7422,7425,7426,7428,742A,742C,742E,7430,7433,7434,7435,7436,743C,7441,7455,7457,7459,745A,745B,745C,745E,745F,746D,7470,7476,7477,747E,7480,7481,7483,7487,748B,748E,7490,749C,749E,74A7,74A8,74A9,74BA,74D2,74DC,74DE,74E0,74E2,74E3,74E4,74E6,74EE,74EF,74F4,74F6,74F7,74FF,7504,750D,750F,7511,7513,7518,7519,751A,751C,751F,7525,7528,7529,752B,752C,752D,752F,7530,7531,7532,7533,7535,7537,7538,753A,753B,753E,7540,7545,7548,754B,754C,754E,754F,7554,7559,755A,755B,755C,7565,7566,756A,7572,7574,7578,7579,757F,7583,7586,758B,758F,7591,7592,7594,7596,7597,7599,759A,759D,759F,75A0,75A1,75A3,75A4,75A5,75AB,75AC,75AE,75AF,75B0,75B1,75B2,75B3,75B4,75B5,75B8,75B9,75BC,75BD,75BE,75C2,75C3,75C4,75C5,75C7,75C8,75C9,75CA,75CD,75D2,75D4,75D5,75D6,75D8,75DB,75DE,75E2,75E3,75E4,75E6,75E7,75E8,75EA,75EB,75F0,75F1,75F4,75F9,75FC,75FF,7600,7601,7603,7605,760A,760C,7610,7615,7617,7618,7619,761B,761F,7620,7622,7624,7625,7626,7629,762A,762B,762D,7630,7633,7634,7635,7638,763C,763E,763F,7640,7643,764C,764D,7654,7656,765C,765E,7663,766B,766F,7678,767B,767D,767E,7682,7684,7686,7687,7688,768B,768E,7691,7693,7696,7699,76A4,76AE,76B1,76B2,76B4,76BF,76C2,76C5,76C6,76C8,76CA,76CD,76CE,76CF,76D0,76D1,76D2,76D4,76D6,76D7,76D8,76DB,76DF,76E5,76EE,76EF,76F1,76F2,76F4,76F8,76F9,76FC,76FE,7701,7704,7707,7708,7709,770B,770D,7719,771A,771F,7720,7722,7726,7728,7729,772D,772F,7735,7736,7737,7738,773A,773C,7740,7741,7743,7747,7750,7751,775A,775B,7761,7762,7763,7765,7766,7768,776B,776C,7779,777D,777E,777F,7780,7784,7785,778C,778D,778E,7791,7792,779F,77A0,77A2,77A5,77A7,77A9,77AA,77AC,77B0,77B3,77B5,77BB,77BD,77BF,77CD,77D7,77DB,77DC,77E2,77E3,77E5,77E7,77E9,77EB,77EC,77ED,77EE,77F3,77F6,77F8,77FD,77FE,77FF,7800,7801,7802,7809,780C,780D,7811,7812,7814,7816,7817,7818,781A,781C,781D,781F,7823,7825,7826,7827,7829,782C,782D,7830,7834,7837,7838,7839,783A,783B,783C,783E,7840,7845,7847,784C,784E,7850,7852,7855,7856,7857,785D,786A,786B,786C,786D,786E,7877,787C,7887,7889,788C,788D,788E,7891,7893,7897,7898,789A,789B,789C,789F,78A1,78A3,78A5,78A7,78B0,78B1,78B2,78B3,78B4,78B9,78BE,78C1,78C5,78C9,78CA,78CB,78D0,78D4,78D5,78D9,78E8,78EC,78F2,78F4,78F7,78FA,7901,7905,7913,791E,7924,7934,793A,793B,793C,793E,7940,7941,7946,7948,7949,7953,7956,7957,795A,795B,795C,795D,795E,795F,7960,7962,7965,7967,7968,796D,796F,7977,7978,797A,7980,7981,7984,7985,798A,798F,799A,79A7,79B3,79B9,79BA,79BB,79BD,79BE,79C0,79C1,79C3,79C6,79C9,79CB,79CD,79D1,79D2,79D5,79D8,79DF,79E3,79E4,79E6,79E7,79E9,79EB,79ED,79EF,79F0,79F8,79FB,79FD,7A00,7A02,7A03,7A06,7A0B,7A0D,7A0E,7A14,7A17,7A1A,7A1E,7A20,7A23,7A33,7A37,7A39,7A3B,7A3C,7A3D,7A3F,7A46,7A51,7A57,7A70,7A74,7A76,7A77,7A78,7A79,7A7A,7A7F,7A80,7A81,7A83,7A84,7A86,7A88,7A8D,7A91,7A92,7A95,7A96,7A97,7A98,7A9C,7A9D,7A9F,7AA0,7AA5,7AA6,7AA8,7AAC,7AAD,7AB3,7ABF,7ACB,7AD6,7AD9,7ADE,7ADF,7AE0,7AE3,7AE5,7AE6,7AED,7AEF,7AF9,7AFA,7AFD,7AFF,7B03,7B04,7B06,7B08,7B0A,7B0B,7B0F,7B11,7B14,7B15,7B19,7B1B,7B1E,7B20,7B24,7B25,7B26,7B28,7B2A,7B2B,7B2C,7B2E,7B31,7B33,7B38,7B3A,7B3C,7B3E,7B45,7B47,7B49,7B4B,7B4C,7B4F,7B50,7B51,7B52,7B54,7B56,7B58,7B5A,7B5B,7B5D,7B60,7B62,7B6E,7B71,7B72,7B75,7B77,7B79,7B7B,7B7E,7B80,7B85,7B8D,7B90,7B94,7B95,7B97,7B9C,7B9D,7BA1,7BA2,7BA6,7BA7,7BA8,7BA9,7BAA,7BAB,7BAC,7BAD,7BB1,7BB4,7BB8,7BC1,7BC6,7BC7,7BCC,7BD1,7BD3,7BD9,7BDA,7BDD,7BE1,7BE5,7BE6,7BEA,7BEE,7BF1,7BF7,7BFC,7BFE,7C07,7C0B,7C0C,7C0F,7C16,7C1F,7C26,7C27,7C2A,7C38,7C3F,7C40,7C41,7C4D,7C73,7C74,7C7B,7C7C,7C7D,7C89,7C91,7C92,7C95,7C97,7C98,7C9C,7C9D,7C9E,7C9F,7CA2,7CA4,7CA5,7CAA,7CAE,7CB1,7CB2,7CB3,7CB9,7CBC,7CBD,7CBE,7CC1,7CC5,7CC7,7CC8,7CCA,7CCC,7CCD,7CD5,7CD6,7CD7,7CD9,7CDC,7CDF,7CE0,7CE8,7CEF,7CF8,7CFB,7D0A,7D20,7D22,7D27,7D2B,7D2F,7D6E,7D77,7DA6,7DAE,7E3B,7E41,7E47,7E82,7E9B,7E9F,7EA0,7EA1,7EA2,7EA3,7EA4,7EA5,7EA6,7EA7,7EA8,7EA9,7EAA,7EAB,7EAC,7EAD,7EAF,7EB0,7EB1,7EB2,7EB3,7EB5,7EB6,7EB7,7EB8,7EB9,7EBA,7EBD,7EBE,7EBF,7EC0,7EC1,7EC2,7EC3,7EC4,7EC5,7EC6,7EC7,7EC8,7EC9,7ECA,7ECB,7ECC,7ECD,7ECE,7ECF,7ED0,7ED1,7ED2,7ED3,7ED4,7ED5,7ED7,7ED8,7ED9,7EDA,7EDB,7EDC,7EDD,7EDE,7EDF,7EE0,7EE1,7EE2,7EE3,7EE5,7EE6,7EE7,7EE8,7EE9,7EEA,7EEB,7EED,7EEE,7EEF,7EF0,7EF1,7EF2,7EF3,7EF4,7EF5,7EF6,7EF7,7EF8,7EFA,7EFB,7EFC,7EFD,7EFE,7EFF,7F00,7F01,7F02,7F03,7F04,7F05,7F06,7F07,7F08,7F09,7F0B,7F0C,7F0D,7F0E,7F0F,7F11,7F12,7F13,7F14,7F15,7F16,7F17,7F18,7F19,7F1A,7F1B,7F1C,7F1D,7F1F,7F20,7F21,7F22,7F23,7F24,7F25,7F26,7F27,7F28,7F29,7F2A,7F2B,7F2C,7F2D,7F2E,7F2F,7F30,7F31,7F32,7F33,7F34,7F35,7F36,7F38,7F3A,7F42,7F44,7F45,7F50,7F51,7F54,7F55,7F57,7F58,7F5A,7F5F,7F61,7F62,7F68,7F69,7F6A,7F6E,7F71,7F72,7F74,7F79,7F7E,7F81,7F8A,7F8C,7F8E,7F94,7F9A,7F9D,7F9E,7F9F,7FA1,7FA4,7FA7,7FAF,7FB0,7FB2,7FB8,7FB9,7FBC,7FBD,7FBF,7FC1,7FC5,7FCA,7FCC,7FCE,7FD4,7FD5,7FD8,7FDF,7FE0,7FE1,7FE5,7FE6,7FE9,7FEE,7FF0,7FF1,7FF3,7FFB,7FFC,8000,8001,8003,8004,8005,8006,800B,800C,800D,8010,8012,8014,8015,8016,8017,8018,8019,801C,8020,8022,8025,8026,8027,8028,8029,802A,8031,8033,8035,8036,8037,8038,803B,803D,803F,8042,8043,8046,804A,804B,804C,804D,8052,8054,8058,805A,8069,806A,8071,807F,8080,8083,8084,8086,8087,8089,808B,808C,8093,8096,8098,809A,809B,809C,809D,809F,80A0,80A1,80A2,80A4,80A5,80A9,80AA,80AB,80AD,80AE,80AF,80B1,80B2,80B4,80B7,80BA,80BC,80BD,80BE,80BF,80C0,80C1,80C2,80C3,80C4,80C6,80CC,80CD,80CE,80D6,80D7,80D9,80DA,80DB,80DC,80DD,80DE,80E1,80E4,80E5,80E7,80E8,80E9,80EA,80EB,80EC,80ED,80EF,80F0,80F1,80F2,80F3,80F4,80F6,80F8,80FA,80FC,80FD,8102,8106,8109,810A,810D,810E,810F,8110,8111,8112,8113,8114,8116,8118,811A,811E,812C,812F,8131,8132,8136,8138,813E,8146,8148,814A,814B,814C,8150,8151,8153,8154,8155,8159,815A,8160,8165,8167,8169,816D,816E,8170,8171,8174,8179,817A,817B,817C,817D,817E,817F,8180,8182,8188,818A,818F,8191,8198,819B,819C,819D,81A3,81A6,81A8,81AA,81B3,81BA,81BB,81C0,81C1,81C2,81C3,81C6,81CA,81CC,81E3,81E7,81EA,81EC,81ED,81F3,81F4,81FB,81FC,81FE,8200,8201,8202,8204,8205,8206,820C,820D,8210,8212,8214,821B,821C,821E,821F,8221,8222,8223,8228,822A,822B,822C,822D,822F,8230,8231,8233,8234,8235,8236,8237,8238,8239,823B,823E,8244,8247,8249,824B,824F,8258,825A,825F,8268,826E,826F,8270,8272,8273,8274,8279,827A,827D,827E,827F,8282,8284,8288,828A,828B,828D,828E,828F,8291,8292,8297,8298,8299,829C,829D,829F,82A1,82A4,82A5,82A6,82A8,82A9,82AA,82AB,82AC,82AD,82AE,82AF,82B0,82B1,82B3,82B4,82B7,82B8,82B9,82BD,82BE,82C1,82C4,82C7,82C8,82CA,82CB,82CC,82CD,82CE,82CF,82D1,82D2,82D3,82D4,82D5,82D7,82D8,82DB,82DC,82DE,82DF,82E0,82E1,82E3,82E4,82E5,82E6,82EB,82EF,82F1,82F4,82F7,82F9,82FB,8301,8302,8303,8304,8305,8306,8307,8308,8309,830C,830E,830F,8311,8314,8315,8317,831A,831B,831C,8327,8328,832B,832C,832D,832F,8331,8333,8334,8335,8336,8338,8339,833A,833C,8340,8343,8346,8347,8349,834F,8350,8351,8352,8354,835A,835B,835C,835E,835F,8360,8361,8363,8364,8365,8366,8367,8368,8369,836A,836B,836C,836D,836E,836F,8377,8378,837B,837C,837D,8385,8386,8389,838E,8392,8393,8398,839B,839C,839E,83A0,83A8,83A9,83AA,83AB,83B0,83B1,83B2,83B3,83B4,83B6,83B7,83B8,83B9,83BA,83BC,83BD,83C0,83C1,83C5,83C7,83CA,83CC,83CF,83D4,83D6,83D8,83DC,83DD,83DF,83E0,83E1,83E5,83E9,83EA,83F0,83F1,83F2,83F8,83F9,83FD,8401,8403,8404,8406,840B,840C,840D,840E,840F,8411,8418,841C,841D,8424,8425,8426,8427,8428,8431,8438,843C,843D,8446,8451,8457,8459,845A,845B,845C,8461,8463,8469,846B,846C,846D,8471,8473,8475,8476,8478,847A,8482,8487,8488,8489,848B,848C,848E,8497,8499,849C,84A1,84AF,84B2,84B4,84B8,84B9,84BA,84BD,84BF,84C1,84C4,84C9,84CA,84CD,84D0,84D1,84D3,84D6,84DD,84DF,84E0,84E3,84E5,84E6,84EC,84F0,84FC,84FF,850C,8511,8513,8517,851A,851F,8521,852B,852C,8537,8538,8539,853A,853B,853C,853D,8543,8548,8549,854A,8556,8559,855E,8564,8568,8572,8574,8579,857A,857B,857E,8584,8585,8587,858F,859B,859C,85A4,85A8,85AA,85AE,85AF,85B0,85B7,85B9,85C1,85C9,85CF,85D0,85D3,85D5,85DC,85E4,85E9,85FB,85FF,8605,8611,8616,8627,8629,8638,863C,864D,864E,864F,8650,8651,8654,865A,865E,8662,866B,866C,866E,8671,8679,867A,867B,867C,867D,867E,867F,8680,8681,8682,868A,868B,868C,868D,8693,8695,869C,869D,86A3,86A4,86A7,86A8,86A9,86AA,86AC,86AF,86B0,86B1,86B4,86B5,86B6,86BA,86C0,86C4,86C6,86C7,86C9,86CA,86CB,86CE,86CF,86D0,86D1,86D4,86D8,86D9,86DB,86DE,86DF,86E4,86E9,86ED,86EE,86F0,86F1,86F2,86F3,86F4,86F8,86F9,86FE,8700,8702,8703,8707,8708,8709,870A,870D,8712,8713,8715,8717,8718,871A,871C,871E,8721,8722,8723,8725,8729,872E,8731,8734,8737,873B,873E,873F,8747,8748,8749,874C,874E,8753,8757,8759,8760,8763,8764,8765,876E,8770,8774,8776,877B,877C,877D,877E,8782,8783,8785,8788,878B,878D,8793,8797,879F,87A8,87AB,87AC,87AD,87AF,87B3,87B5,87BA,87BD,87C0,87C6,87CA,87CB,87D1,87D2,87D3,87DB,87E0,87E5,87EA,87EE,87F9,87FE,8803,880A,8813,8815,8816,881B,8821,8822,8832,8839,883C,8840,8844,8845,884C,884D,8854,8857,8859,8861,8862,8863,8864,8865,8868,8869,886B,886C,886E,8870,8872,8877,887D,887E,887F,8881,8882,8884,8885,8888,888B,888D,8892,8896,889C,88A2,88A4,88AB,88AD,88B1,88B7,88BC,88C1,88C2,88C5,88C6,88C9,88CE,88D2,88D4,88D5,88D8,88D9,88DF,88E2,88E3,88E4,88E5,88E8,88F0,88F1,88F3,88F4,88F8,88F9,88FC,88FE,8902,890A,8910,8912,8913,8919,891A,891B,8921,8925,892A,892B,8930,8934,8936,8941,8944,895E,895F,8966,897B,897F,8981,8983,8986,89C1,89C2,89C4,89C5,89C6,89C7,89C8,89C9,89CA,89CB,89CC,89CE,89CF,89D0,89D1,89D2,89D6,89DA,89DC,89DE,89E3,89E5,89E6,89EB,89EF,89F3,8A00,8A07,8A3E,8A48,8A79,8A89,8A8A,8A93,8B07,8B26,8B66,8B6C,8BA0,8BA1,8BA2,8BA3,8BA4,8BA5,8BA6,8BA7,8BA8,8BA9,8BAA,8BAB,8BAD,8BAE,8BAF,8BB0,8BB2,8BB3,8BB4,8BB5,8BB6,8BB7,8BB8,8BB9,8BBA,8BBC,8BBD,8BBE,8BBF,8BC0,8BC1,8BC2,8BC3,8BC4,8BC5,8BC6,8BC8,8BC9,8BCA,8BCB,8BCC,8BCD,8BCE,8BCF,8BD1,8BD2,8BD3,8BD4,8BD5,8BD6,8BD7,8BD8,8BD9,8BDA,8BDB,8BDC,8BDD,8BDE,8BDF,8BE0,8BE1,8BE2,8BE3,8BE4,8BE5,8BE6,8BE7,8BE8,8BE9,8BEB,8BEC,8BED,8BEE,8BEF,8BF0,8BF1,8BF2,8BF3,8BF4,8BF5,8BF6,8BF7,8BF8,8BF9,8BFA,8BFB,8BFC,8BFD,8BFE,8BFF,8C00,8C01,8C02,8C03,8C04,8C05,8C06,8C07,8C08,8C0A,8C0B,8C0C,8C0D,8C0E,8C0F,8C10,8C11,8C12,8C13,8C14,8C15,8C16,8C17,8C18,8C19,8C1A,8C1B,8C1C,8C1D,8C1F,8C20,8C21,8C22,8C23,8C24,8C25,8C26,8C27,8C28,8C29,8C2A,8C2B,8C2C,8C2D,8C2E,8C2F,8C30,8C31,8C32,8C33,8C34,8C35,8C36,8C37,8C41,8C46,8C47,8C49,8C4C,8C55,8C5A,8C61,8C62,8C6A,8C6B,8C73,8C78,8C79,8C7A,8C82,8C85,8C89,8C8A,8C8C,8C94,8C98,8D1D,8D1E,8D1F,8D21,8D22,8D23,8D24,8D25,8D26,8D27,8D28,8D29,8D2A,8D2B,8D2C,8D2D,8D2E,8D2F,8D30,8D31,8D32,8D33,8D34,8D35,8D36,8D37,8D38,8D39,8D3A,8D3B,8D3C,8D3D,8D3E,8D3F,8D40,8D41,8D42,8D43,8D44,8D45,8D46,8D47,8D48,8D49,8D4A,8D4B,8D4C,8D4D,8D4E,8D4F,8D50,8D53,8D54,8D55,8D56,8D58,8D59,8D5A,8D5B,8D5C,8D5D,8D5E,8D60,8D61,8D62,8D63,8D64,8D66,8D67,8D6B,8D6D,8D70,8D73,8D74,8D75,8D76,8D77,8D81,8D84,8D85,8D8A,8D8B,8D91,8D94,8D9F,8DA3,8DB1,8DB3,8DB4,8DB5,8DB8,8DBA,8DBC,8DBE,8DBF,8DC3,8DC4,8DC6,8DCB,8DCC,8DCE,8DCF,8DD1,8DD6,8DD7,8DDA,8DDB,8DDD,8DDE,8DDF,8DE3,8DE4,8DE8,8DEA,8DEB,8DEC,8DEF,8DF3,8DF5,8DF7,8DF8,8DF9,8DFA,8DFB,8DFD,8E05,8E09,8E0A,8E0C,8E0F,8E14,8E1D,8E1E,8E1F,8E22,8E23,8E29,8E2A,8E2C,8E2E,8E2F,8E31,8E35,8E39,8E3A,8E3D,8E40,8E41,8E42,8E44,8E47,8E48,8E49,8E4A,8E4B,8E51,8E52,8E59,8E66,8E69,8E6C,8E6D,8E6F,8E70,8E72,8E74,8E76,8E7C,8E7F,8E81,8E85,8E87,8E8F,8E90,8E94,8E9C,8E9E,8EAB,8EAC,8EAF,8EB2,8EBA,8ECE,8F66,8F67,8F68,8F69,8F6B,8F6C,8F6D,8F6E,8F6F,8F70,8F71,8F72,8F73,8F74,8F75,8F76,8F77,8F78,8F79,8F7A,8F7B,8F7C,8F7D,8F7E,8F7F,8F81,8F82,8F83,8F84,8F85,8F86,8F87,8F88,8F89,8F8A,8F8B,8F8D,8F8E,8F8F,8F90,8F91,8F93,8F94,8F95,8F96,8F97,8F98,8F99,8F9A,8F9B,8F9C,8F9E,8F9F,8FA3,8FA8,8FA9,8FAB,8FB0,8FB1,8FB6,8FB9,8FBD,8FBE,8FC1,8FC2,8FC4,8FC5,8FC7,8FC8,8FCE,8FD0,8FD1,8FD3,8FD4,8FD5,8FD8,8FD9,8FDB,8FDC,8FDD,8FDE,8FDF,8FE2,8FE4,8FE5,8FE6,8FE8,8FE9,8FEA,8FEB,8FED,8FEE,8FF0,8FF3,8FF7,8FF8,8FF9,8FFD,9000,9001,9002,9003,9004,9005,9006,9009,900A,900B,900D,900F,9010,9011,9012,9014,9016,9017,901A,901B,901D,901E,901F,9020,9021,9022,9026,902D,902E,902F,9035,9036,9038,903B,903C,903E,9041,9042,9044,9047,904D,904F,9050,9051,9052,9053,9057,9058,905B,9062,9063,9065,9068,906D,906E,9074,9075,907D,907F,9080,9082,9083,9088,908B,9091,9093,9095,9097,9099,909B,909D,90A1,90A2,90A3,90A6,90AA,90AC,90AE,90AF,90B0,90B1,90B3,90B4,90B5,90B6,90B8,90B9,90BA,90BB,90BE,90C1,90C4,90C5,90C7,90CA,90CE,90CF,90D0,90D1,90D3,90D7,90DB,90DC,90DD,90E1,90E2,90E6,90E7,90E8,90EB,90ED,90EF,90F4,90F8,90FD,90FE,9102,9104,9119,911E,9122,9123,912F,9131,9139,9143,9146,9149,914A,914B,914C,914D,914E,914F,9150,9152,9157,915A,915D,915E,9161,9162,9163,9164,9165,9169,916A,916C,916E,916F,9170,9171,9172,9174,9175,9176,9177,9178,9179,917D,917E,917F,9185,9187,9189,918B,918C,918D,9190,9191,9192,919A,919B,91A2,91A3,91AA,91AD,91AE,91AF,91B4,91B5,91BA,91C7,91C9,91CA,91CC,91CD,91CE,91CF,91D1,91DC,9274,928E,92AE,92C8,933E,936A,938F,93CA,93D6,943E,946B,9485,9486,9487,9488,9489,948A,948B,948C,948D,948E,948F,9490,9492,9493,9494,9495,9497,9499,949A,949B,949C,949D,949E,949F,94A0,94A1,94A2,94A3,94A4,94A5,94A6,94A7,94A8,94A9,94AA,94AB,94AC,94AD,94AE,94AF,94B0,94B1,94B2,94B3,94B4,94B5,94B6,94B7,94B8,94B9,94BA,94BB,94BC,94BD,94BE,94BF,94C0,94C1,94C2,94C3,94C4,94C5,94C6,94C8,94C9,94CA,94CB,94CC,94CD,94CE,94D0,94D1,94D2,94D5,94D6,94D7,94D8,94D9,94DB,94DC,94DD,94DE,94DF,94E0,94E1,94E2,94E3,94E4,94E5,94E7,94E8,94E9,94EA,94EB,94EC,94ED,94EE,94EF,94F0,94F1,94F2,94F3,94F4,94F5,94F6,94F7,94F8,94F9,94FA,94FC,94FD,94FE,94FF,9500,9501,9502,9503,9504,9505,9506,9507,9508,9509,950A,950B,950C,950D,950E,950F,9510,9511,9512,9513,9514,9515,9516,9517,9518,9519,951A,951B,951D,951E,951F,9521,9522,9523,9524,9525,9526,9528,9529,952A,952B,952C,952D,952E,952F,9530,9531,9532,9534,9535,9536,9537,9538,9539,953A,953B,953C,953E,953F,9540,9541,9542,9544,9545,9546,9547,9549,954A,954C,954D,954E,954F,9550,9551,9552,9553,9554,9556,9557,9558,9559,955B,955C,955D,955E,955F,9561,9562,9563,9564,9565,9566,9567,9568,9569,956A,956B,956C,956D,956F,9570,9571,9572,9573,9576,957F,95E8,95E9,95EA,95EB,95ED,95EE,95EF,95F0,95F1,95F2,95F3,95F4,95F5,95F6,95F7,95F8,95F9,95FA,95FB,95FC,95FD,95FE,9600,9601,9602,9603,9604,9605,9606,9608,9609,960A,960B,960C,960D,960E,960F,9610,9611,9612,9614,9615,9616,9617,9619,961A,961C,961D,961F,9621,9622,962A,962E,9631,9632,9633,9634,9635,9636,963B,963C,963D,963F,9640,9642,9644,9645,9646,9647,9648,9649,964B,964C,964D,9650,9654,9655,965B,965F,9661,9662,9664,9667,9668,9669,966A,966C,9672,9674,9675,9676,9677,9685,9686,9688,968B,968D,968F,9690,9694,9697,9698,9699,969C,96A7,96B0,96B3,96B6,96B9,96BC,96BD,96BE,96C0,96C1,96C4,96C5,96C6,96C7,96C9,96CC,96CD,96CE,96CF,96D2,96D5,96E0,96E8,96E9,96EA,96EF,96F3,96F6,96F7,96F9,96FE,9700,9701,9704,9706,9707,9708,9709,970D,970E,970F,9713,9716,971C,971E,972A,972D,9730,9732,9738,9739,973E,9752,9753,9756,9759,975B,975E,9760,9761,9762,9765,9769,9773,9774,9776,977C,9785,978B,978D,9791,9792,9794,9798,97A0,97A3,97AB,97AD,97AF,97B2,97B4,97E6,97E7,97E9,97EA,97EB,97EC,97ED,97F3,97F5,97F6,9875,9876,9877,9878,9879,987A,987B,987C,987D,987E,987F,9880,9881,9882,9883,9884,9885,9886,9887,9888,9889,988A,988C,988D,988F,9890,9891,9893,9894,9896,9897,9898,989A,989B,989C,989D,989E,989F,98A0,98A1,98A2,98A4,98A5,98A6,98A7,98CE,98D1,98D2,98D3,98D5,98D8,98D9,98DA,98DE,98DF,98E7,98E8,990D,9910,992E,9954,9955,9963,9965,9967,9968,9969,996A,996B,996C,996D,996E,996F,9970,9971,9972,9974,9975,9976,9977,997A,997C,997D,997F,9980,9981,9984,9985,9986,9987,9988,998A,998B,998D,998F,9990,9991,9992,9993,9994,9995,9996,9997,9998,9999,99A5,99A8,9A6C,9A6D,9A6E,9A6F,9A70,9A71,9A73,9A74,9A75,9A76,9A77,9A78,9A79,9A7A,9A7B,9A7C,9A7D,9A7E,9A7F,9A80,9A81,9A82,9A84,9A85,9A86,9A87,9A88,9A8A,9A8B,9A8C,9A8F,9A90,9A91,9A92,9A93,9A96,9A97,9A98,9A9A,9A9B,9A9C,9A9D,9A9E,9A9F,9AA0,9AA1,9AA2,9AA3,9AA4,9AA5,9AA7,9AA8,9AB0,9AB1,9AB6,9AB7,9AB8,9ABA,9ABC,9AC0,9AC1,9AC2,9AC5,9ACB,9ACC,9AD1,9AD3,9AD8,9ADF,9AE1,9AE6,9AEB,9AED,9AEF,9AF9,9AFB,9B03,9B08,9B0F,9B13,9B1F,9B23,9B2F,9B32,9B3B,9B3C,9B41,9B42,9B43,9B44,9B45,9B47,9B48,9B49,9B4D,9B4F,9B51,9B54,9C7C,9C7F,9C81,9C82,9C85,9C86,9C87,9C88,9C8B,9C8D,9C8E,9C90,9C91,9C92,9C94,9C95,9C9A,9C9B,9C9C,9C9E,9C9F,9CA0,9CA1,9CA2,9CA3,9CA4,9CA5,9CA6,9CA7,9CA8,9CA9,9CAB,9CAD,9CAE,9CB0,9CB1,9CB2,9CB3,9CB4,9CB5,9CB6,9CB7,9CB8,9CBA,9CBB,9CBC,9CBD,9CC3,9CC4,9CC5,9CC6,9CC7,9CCA,9CCB,9CCC,9CCD,9CCE,9CCF,9CD0,9CD3,9CD4,9CD5,9CD6,9CD7,9CD8,9CD9,9CDC,9CDD,9CDE,9CDF,9CE2,9E1F,9E20,9E21,9E22,9E23,9E25,9E26,9E28,9E29,9E2A,9E2B,9E2C,9E2D,9E2F,9E31,9E32,9E33,9E35,9E36,9E37,9E38,9E39,9E3A,9E3D,9E3E,9E3F,9E41,9E42,9E43,9E44,9E45,9E46,9E47,9E48,9E49,9E4A,9E4B,9E4C,9E4E,9E4F,9E51,9E55,9E57,9E58,9E5A,9E5B,9E5C,9E5E,9E63,9E64,9E66,9E67,9E68,9E69,9E6A,9E6B,9E6C,9E6D,9E70,9E71,9E73,9E7E,9E7F,9E82,9E87,9E88,9E8B,9E92,9E93,9E9D,9E9F,9EA6,9EB4,9EB8,9EBB,9EBD,9EBE,9EC4,9EC9,9ECD,9ECE,9ECF,9ED1,9ED4,9ED8,9EDB,9EDC,9EDD,9EDF,9EE0,9EE2,9EE5,9EE7,9EE9,9EEA,9EEF,9EF9,9EFB,9EFC,9EFE,9F0B,9F0D,9F0E,9F10,9F13,9F17,9F19,9F20,9F22,9F2C,9F2F,9F37,9F39,9F3B,9F3D,9F3E,9F44,9F50,9F51,9F7F,9F80,9F83,9F84,9F85,9F86,9F87,9F88,9F89,9F8A,9F8B,9F8C,9F99,9F9A,9F9B,9F9F,9FA0,FF01,FF02,FF03,FF04,FF05,FF06,FF07,FF08,FF09,FF0A,FF0B,FF0C,FF0D,FF0E,FF0F,FF10,FF11,FF12,FF13,FF14,FF15,FF16,FF17,FF18,FF19,FF1A,FF1B,FF1C,FF1D,FF1E,FF1F,FF20,FF21,FF22,FF23,FF24,FF25,FF26,FF27,FF28,FF29,FF2A,FF2B,FF2C,FF2D,FF2E,FF2F,FF30,FF31,FF32,FF33,FF34,FF35,FF36,FF37,FF38,FF39,FF3A,FF3B,FF3C,FF3D,FF3E,FF3F,FF40,FF41,FF42,FF43,FF44,FF45,FF46,FF47,FF48,FF49,FF4A,FF4B,FF4C,FF4D,FF4E,FF4F,FF50,FF51,FF52,FF53,FF54,FF55,FF56,FF57,FF58,FF59,FF5A,FF5B,FF5C,FF5D,FF5E,FFE0,FFE1,FFE3,FFE5';
		PinYin.AnsicodeChr='A1E8,A1EC,A1A7,A1E3,A1C0,A1A4,A1C1,A8A4,A8A2,A8A8,A8A6,A8BA,A8AC,A8AA,A8B0,A8AE,A1C2,A8B4,A8B2,A8B9,A8A1,A8A5,A8A7,A8A9,A8AD,A8B1,A8A3,A8AB,A8AF,A8B3,A8B5,A8B6,A8B7,A8B8,A1A6,A1A5,A6A1,A6A2,A6A3,A6A4,A6A5,A6A6,A6A7,A6A8,A6A9,A6AA,A6AB,A6AC,A6AD,A6AE,A6AF,A6B0,A6B1,A6B2,A6B3,A6B4,A6B5,A6B6,A6B7,A6B8,A6C1,A6C2,A6C3,A6C4,A6C5,A6C6,A6C7,A6C8,A6C9,A6CA,A6CB,A6CC,A6CD,A6CE,A6CF,A6D0,A6D1,A6D2,A6D3,A6D4,A6D5,A6D6,A6D7,A6D8,A7A7,A7A1,A7A2,A7A3,A7A4,A7A5,A7A6,A7A8,A7A9,A7AA,A7AB,A7AC,A7AD,A7AE,A7AF,A7B0,A7B1,A7B2,A7B3,A7B4,A7B5,A7B6,A7B7,A7B8,A7B9,A7BA,A7BB,A7BC,A7BD,A7BE,A7BF,A7C0,A7C1,A7D1,A7D2,A7D3,A7D4,A7D5,A7D6,A7D8,A7D9,A7DA,A7DB,A7DC,A7DD,A7DE,A7DF,A7E0,A7E1,A7E2,A7E3,A7E4,A7E5,A7E6,A7E7,A7E8,A7E9,A7EA,A7EB,A7EC,A7ED,A7EE,A7EF,A7F0,A7F1,A7D7,A1AA,A1AC,A1AE,A1AF,A1B0,A1B1,A1AD,A1EB,A1E4,A1E5,A1F9,A1E6,A1ED,A2F1,A2F2,A2F3,A2F4,A2F5,A2F6,A2F7,A2F8,A2F9,A2FA,A2FB,A2FC,A1FB,A1FC,A1FA,A1FD,A1CA,A1C7,A1C6,A1CC,A1D8,A1DE,A1CF,A1CE,A1C4,A1C5,A1C9,A1C8,A1D2,A1D3,A1E0,A1DF,A1C3,A1CB,A1D7,A1D6,A1D5,A1D9,A1D4,A1DC,A1DD,A1DA,A1DB,A1D1,A1CD,A1D0,A2D9,A2DA,A2DB,A2DC,A2DD,A2DE,A2DF,A2E0,A2E1,A2E2,A2C5,A2C6,A2C7,A2C8,A2C9,A2CA,A2CB,A2CC,A2CD,A2CE,A2CF,A2D0,A2D1,A2D2,A2D3,A2D4,A2D5,A2D6,A2D7,A2D8,A2B1,A2B2,A2B3,A2B4,A2B5,A2B6,A2B7,A2B8,A2B9,A2BA,A2BB,A2BC,A2BD,A2BE,A2BF,A2C0,A2C1,A2C2,A2C3,A2C4,A9A4,A9A5,A9A6,A9A7,A9A8,A9A9,A9AA,A9AB,A9AC,A9AD,A9AE,A9AF,A9B0,A9B1,A9B2,A9B3,A9B4,A9B5,A9B6,A9B7,A9B8,A9B9,A9BA,A9BB,A9BC,A9BD,A9BE,A9BF,A9C0,A9C1,A9C2,A9C3,A9C4,A9C5,A9C6,A9C7,A9C8,A9C9,A9CA,A9CB,A9CC,A9CD,A9CE,A9CF,A9D0,A9D1,A9D2,A9D3,A9D4,A9D5,A9D6,A9D7,A9D8,A9D9,A9DA,A9DB,A9DC,A9DD,A9DE,A9DF,A9E0,A9E1,A9E2,A9E3,A9E4,A9E5,A9E6,A9E7,A9E8,A9E9,A9EA,A9EB,A9EC,A9ED,A9EE,A9EF,A1F6,A1F5,A1F8,A1F7,A1F4,A1F3,A1F0,A1F2,A1F1,A1EF,A1EE,A1E2,A1E1,A1A1,A1A2,A1A3,A1A8,A1A9,A1B4,A1B5,A1B6,A1B7,A1B8,A1B9,A1BA,A1BB,A1BE,A1BF,A1FE,A1B2,A1B3,A1BC,A1BD,A4A1,A4A2,A4A3,A4A4,A4A5,A4A6,A4A7,A4A8,A4A9,A4AA,A4AB,A4AC,A4AD,A4AE,A4AF,A4B0,A4B1,A4B2,A4B3,A4B4,A4B5,A4B6,A4B7,A4B8,A4B9,A4BA,A4BB,A4BC,A4BD,A4BE,A4BF,A4C0,A4C1,A4C2,A4C3,A4C4,A4C5,A4C6,A4C7,A4C8,A4C9,A4CA,A4CB,A4CC,A4CD,A4CE,A4CF,A4D0,A4D1,A4D2,A4D3,A4D4,A4D5,A4D6,A4D7,A4D8,A4D9,A4DA,A4DB,A4DC,A4DD,A4DE,A4DF,A4E0,A4E1,A4E2,A4E3,A4E4,A4E5,A4E6,A4E7,A4E8,A4E9,A4EA,A4EB,A4EC,A4ED,A4EE,A4EF,A4F0,A4F1,A4F2,A4F3,A5A1,A5A2,A5A3,A5A4,A5A5,A5A6,A5A7,A5A8,A5A9,A5AA,A5AB,A5AC,A5AD,A5AE,A5AF,A5B0,A5B1,A5B2,A5B3,A5B4,A5B5,A5B6,A5B7,A5B8,A5B9,A5BA,A5BB,A5BC,A5BD,A5BE,A5BF,A5C0,A5C1,A5C2,A5C3,A5C4,A5C5,A5C6,A5C7,A5C8,A5C9,A5CA,A5CB,A5CC,A5CD,A5CE,A5CF,A5D0,A5D1,A5D2,A5D3,A5D4,A5D5,A5D6,A5D7,A5D8,A5D9,A5DA,A5DB,A5DC,A5DD,A5DE,A5DF,A5E0,A5E1,A5E2,A5E3,A5E4,A5E5,A5E6,A5E7,A5E8,A5E9,A5EA,A5EB,A5EC,A5ED,A5EE,A5EF,A5F0,A5F1,A5F2,A5F3,A5F4,A5F5,A5F6,A8C5,A8C6,A8C7,A8C8,A8C9,A8CA,A8CB,A8CC,A8CD,A8CE,A8CF,A8D0,A8D1,A8D2,A8D3,A8D4,A8D5,A8D6,A8D7,A8D8,A8D9,A8DA,A8DB,A8DC,A8DD,A8DE,A8DF,A8E0,A8E1,A8E2,A8E3,A8E4,A8E5,A8E6,A8E7,A8E8,A8E9,A2E5,A2E6,A2E7,A2E8,A2E9,A2EA,A2EB,A2EC,A2ED,A2EE,D2BB,B6A1,C6DF,CDF2,D5C9,C8FD,C9CF,CFC2,D8A2,B2BB,D3EB,D8A4,B3F3,D7A8,C7D2,D8A7,CAC0,C7F0,B1FB,D2B5,B4D4,B6AB,CBBF,D8A9,B6AA,C1BD,D1CF,C9A5,D8AD,B8F6,D1BE,E3DC,D6D0,B7E1,B4AE,C1D9,D8BC,CDE8,B5A4,CEAA,D6F7,C0F6,BED9,D8AF,C4CB,BEC3,D8B1,C3B4,D2E5,D6AE,CEDA,D5A7,BAF5,B7A6,C0D6,C6B9,C5D2,C7C7,B9D4,B3CB,D2D2,D8BF,BEC5,C6F2,D2B2,CFB0,CFE7,CAE9,D8C0,C2F2,C2D2,C8E9,C7AC,C1CB,D3E8,D5F9,CAC2,B6FE,D8A1,D3DA,BFF7,D4C6,BBA5,D8C1,CEE5,BEAE,D8A8,D1C7,D0A9,D8BD,D9EF,CDF6,BFBA,BDBB,BAA5,D2E0,B2FA,BAE0,C4B6,CFED,BEA9,CDA4,C1C1,C7D7,D9F1,D9F4,C8CB,D8E9,D2DA,CAB2,C8CA,D8EC,D8EA,D8C6,BDF6,C6CD,B3F0,D8EB,BDF1,BDE9,C8D4,B4D3,C2D8,B2D6,D7D0,CACB,CBFB,D5CC,B8B6,CFC9,D9DA,D8F0,C7AA,D8EE,B4FA,C1EE,D2D4,D8ED,D2C7,D8EF,C3C7,D1F6,D6D9,D8F2,D8F5,BCFE,BCDB,C8CE,B7DD,B7C2,C6F3,D8F8,D2C1,CEE9,BCBF,B7FC,B7A5,D0DD,D6DA,D3C5,BBEF,BBE1,D8F1,C9A1,CEB0,B4AB,D8F3,C9CB,D8F6,C2D7,D8F7,CEB1,D8F9,B2AE,B9C0,D9A3,B0E9,C1E6,C9EC,CBC5,CBC6,D9A4,B5E8,B5AB,CEBB,B5CD,D7A1,D7F4,D3D3,CCE5,BACE,D9A2,D9DC,D3E0,D8FD,B7F0,D7F7,D8FE,D8FA,D9A1,C4E3,D3B6,D8F4,D9DD,D8FB,C5E5,C0D0,D1F0,B0DB,BCD1,D9A6,D9A5,D9AC,D9AE,D9AB,CAB9,D9A9,D6B6,B3DE,D9A8,C0FD,CACC,D9AA,D9A7,D9B0,B6B1,B9A9,D2C0,CFC0,C2C2,BDC4,D5EC,B2E0,C7C8,BFEB,D9AD,D9AF,CEEA,BAEE,C7D6,B1E3,B4D9,B6ED,D9B4,BFA1,D9DE,C7CE,C0FE,D9B8,CBD7,B7FD,D9B5,D9B7,B1A3,D3E1,D9B9,D0C5,D9B6,D9B1,D9B2,C1A9,D9B3,BCF3,D0DE,B8A9,BEE3,D9BD,D9BA,B0B3,D9C2,D9C4,B1B6,D9BF,B5B9,BEF3,CCC8,BAF2,D2D0,D9C3,BDE8,B3AB,D9C5,BEEB,D9C6,D9BB,C4DF,D9BE,D9C1,D9C0,D5AE,D6B5,C7E3,D9C8,BCD9,D9CA,D9BC,D9CB,C6AB,D9C9,D7F6,CDA3,BDA1,D9CC,C5BC,CDB5,D9CD,D9C7,B3A5,BFFE,B8B5,C0FC,B0F8,B4F6,D9CE,D9CF,B4A2,D9D0,B4DF,B0C1,D9D1,C9B5,CFF1,D9D2,C1C5,D9D6,C9AE,D9D5,D9D4,D9D7,CBDB,BDA9,C6A7,D9D3,D9D8,D9D9,C8E5,C0DC,B6F9,D8A3,D4CA,D4AA,D0D6,B3E4,D5D7,CFC8,B9E2,BFCB,C3E2,B6D2,CDC3,D9EE,D9F0,B5B3,B6B5,BEA4,C8EB,C8AB,B0CB,B9AB,C1F9,D9E2,C0BC,B9B2,B9D8,D0CB,B1F8,C6E4,BEDF,B5E4,D7C8,D1F8,BCE6,CADE,BCBD,D9E6,D8E7,C4DA,B8D4,C8BD,B2E1,D4D9,C3B0,C3E1,DAA2,C8DF,D0B4,BEFC,C5A9,B9DA,DAA3,D4A9,DAA4,D9FB,B6AC,B7EB,B1F9,D9FC,B3E5,BEF6,BFF6,D2B1,C0E4,B6B3,D9FE,D9FD,BEBB,C6E0,D7BC,DAA1,C1B9,B5F2,C1E8,BCF5,B4D5,C1DD,C4FD,BCB8,B7B2,B7EF,D9EC,C6BE,BFAD,BBCB,B5CA,DBC9,D0D7,CDB9,B0BC,B3F6,BBF7,DBCA,BAAF,D4E4,B5B6,B5F3,D8D6,C8D0,B7D6,C7D0,D8D7,BFAF,DBBB,D8D8,D0CC,BBAE,EBBE,C1D0,C1F5,D4F2,B8D5,B4B4,B3F5,C9BE,C5D0,C5D9,C0FB,B1F0,D8D9,B9CE,B5BD,D8DA,D6C6,CBA2,C8AF,C9B2,B4CC,BFCC,B9F4,D8DB,D8DC,B6E7,BCC1,CCEA,CFF7,D8DD,C7B0,B9D0,BDA3,CCDE,C6CA,D8E0,D8DE,D8DF,B0FE,BEE7,CAA3,BCF4,B8B1,B8EE,D8E2,BDCB,D8E4,D8E3,C5FC,D8E5,D8E6,C1A6,C8B0,B0EC,B9A6,BCD3,CEF1,DBBD,C1D3,B6AF,D6FA,C5AC,BDD9,DBBE,DBBF,C0F8,BEA2,C0CD,DBC0,CAC6,B2AA,D3C2,C3E3,D1AB,DBC2,C0D5,DBC3,BFB1,C4BC,C7DA,DBC4,D9E8,C9D7,B9B4,CEF0,D4C8,B0FC,B4D2,D0D9,D9E9,DECB,D9EB,D8B0,BBAF,B1B1,B3D7,D8CE,D4D1,BDB3,BFEF,CFBB,D8D0,B7CB,D8D1,C6A5,C7F8,D2BD,D8D2,C4E4,CAAE,C7A7,D8A6,C9FD,CEE7,BBDC,B0EB,BBAA,D0AD,B1B0,D7E4,D7BF,B5A5,C2F4,C4CF,B2A9,B2B7,B1E5,DFB2,D5BC,BFA8,C2AC,D8D5,C2B1,D8D4,CED4,DAE0,CEC0,D8B4,C3AE,D3A1,CEA3,BCB4,C8B4,C2D1,BEED,D0B6,DAE1,C7E4,B3A7,B6F2,CCFC,C0FA,C0F7,D1B9,D1E1,D8C7,B2DE,C0E5,BAF1,D8C8,D4AD,CFE1,D8C9,D8CA,CFC3,B3F8,BEC7,D8CB,DBCC,C8A5,CFD8,C8FE,B2CE,D3D6,B2E6,BCB0,D3D1,CBAB,B7B4,B7A2,CAE5,C8A1,CADC,B1E4,D0F0,C5D1,DBC5,B5FE,BFDA,B9C5,BEE4,C1ED,DFB6,DFB5,D6BB,BDD0,D5D9,B0C8,B6A3,BFC9,CCA8,DFB3,CAB7,D3D2,D8CF,D2B6,BAC5,CBBE,CCBE,DFB7,B5F0,DFB4,D3F5,B3D4,B8F7,DFBA,BACF,BCAA,B5F5,CDAC,C3FB,BAF3,C0F4,CDC2,CFF2,DFB8,CFC5,C2C0,DFB9,C2F0,BEFD,C1DF,CDCC,D2F7,B7CD,DFC1,DFC4,B7F1,B0C9,B6D6,B7D4,BAAC,CCFD,BFD4,CBB1,C6F4,D6A8,DFC5,CEE2,B3B3,CEFC,B4B5,CEC7,BAF0,CEE1,D1BD,DFC0,B4F4,B3CA,B8E6,DFBB,C4C5,DFBC,DFBD,DFBE,C5BB,DFBF,DFC2,D4B1,DFC3,C7BA,CED8,C4D8,DFCA,DFCF,D6DC,DFC9,DFDA,CEB6,BAC7,DFCE,DFC8,C5DE,C9EB,BAF4,C3FC,BED7,DFC6,DFCD,C5D8,D5A6,BACD,BECC,D3BD,B8C0,D6E4,DFC7,B9BE,BFA7,C1FC,DFCB,DFCC,DFD0,DFDB,DFE5,DFD7,DFD6,D7C9,DFE3,DFE4,E5EB,D2A7,DFD2,BFA9,D4DB,BFC8,DFD4,CFCC,DFDD,D1CA,DFDE,B0A7,C6B7,DFD3,BAE5,B6DF,CDDB,B9FE,D4D5,DFDF,CFEC,B0A5,DFE7,DFD1,D1C6,DFD5,DFD8,DFD9,DFDC,BBA9,DFE0,DFE1,DFE2,DFE6,DFE8,D3B4,B8E7,C5B6,DFEA,C9DA,C1A8,C4C4,BFDE,CFF8,D5DC,DFEE,B2B8,BADF,DFEC,DBC1,D1E4,CBF4,B4BD,B0A6,DFF1,CCC6,DFF2,DFED,DFE9,DFEB,DFEF,DFF0,BBBD,DFF3,DFF4,BBA3,CADB,CEA8,E0A7,B3AA,E0A6,E0A1,DFFE,CDD9,DFFC,DFFA,BFD0,D7C4,C9CC,DFF8,B0A1,DFFD,DFFB,E0A2,E0A8,B7C8,C6A1,C9B6,C0B2,DFF5,C5BE,D8C4,DFF9,C4F6,E0A3,E0A4,E0A5,D0A5,E0B4,CCE4,E0B1,BFA6,E0AF,CEB9,E0AB,C9C6,C0AE,E0AE,BAED,BAB0,E0A9,DFF6,E0B3,E0B8,B4AD,E0B9,CFB2,BAC8,E0B0,D0FA,E0AC,D4FB,DFF7,C5E7,E0AD,D3F7,E0B6,E0B7,E0C4,D0E1,E0BC,E0C9,E0CA,E0BE,E0AA,C9A4,E0C1,E0B2,CAC8,E0C3,E0B5,CECB,CBC3,E0CD,E0C6,E0C2,E0CB,E0BA,E0BF,E0C0,E0C5,E0C7,E0C8,E0CC,E0BB,CBD4,E0D5,E0D6,E0D2,E0D0,BCCE,E0D1,B8C2,D8C5,D0EA,C2EF,E0CF,E0BD,E0D4,E0D3,E0D7,E0DC,E0D8,D6F6,B3B0,D7EC,CBBB,E0DA,CEFB,BAD9,E0E1,E0DD,D2AD,E0E2,E0DB,E0D9,E0DF,E0E0,E0DE,E0E4,C6F7,D8AC,D4EB,E0E6,CAC9,E0E5,B8C1,E0E7,E0E8,E0E9,E0E3,BABF,CCE7,E0EA,CFF9,E0EB,C8C2,BDC0,C4D2,E0EC,E0ED,C7F4,CBC4,E0EE,BBD8,D8B6,D2F2,E0EF,CDC5,B6DA,E0F1,D4B0,C0A7,B4D1,CEA7,E0F0,E0F2,B9CC,B9FA,CDBC,E0F3,C6D4,E0F4,D4B2,C8A6,E0F6,E0F5,E0F7,CDC1,CAA5,D4DA,DBD7,DBD9,DBD8,B9E7,DBDC,DBDD,B5D8,DBDA,DBDB,B3A1,DBDF,BBF8,D6B7,DBE0,BEF9,B7BB,DBD0,CCAE,BFB2,BBB5,D7F8,BFD3,BFE9,BCE1,CCB3,DBDE,B0D3,CEEB,B7D8,D7B9,C6C2,C0A4,CCB9,DBE7,DBE1,C6BA,DBE3,DBE8,C5F7,DBEA,DBE9,BFC0,DBE6,DBE5,B4B9,C0AC,C2A2,DBE2,DBE4,D0CD,DBED,C0DD,DBF2,B6E2,DBF3,DBD2,B9B8,D4AB,DBEC,BFD1,DBF0,DBD1,B5E6,DBEB,BFE5,DBEE,DBF1,DBF9,B9A1,B0A3,C2F1,B3C7,DBEF,DBF8,C6D2,DBF4,DBF5,DBF7,DBF6,DBFE,D3F2,B2BA,DBFD,DCA4,DBFB,DBFA,DBFC,C5E0,BBF9,DCA3,DCA5,CCC3,B6D1,DDC0,DCA1,DCA2,C7B5,B6E9,DCA7,DCA6,DCA9,B1A4,B5CC,BFB0,D1DF,B6C2,DCA8,CBFA,EBF3,CBDC,CBFE,CCC1,C8FB,DCAA,CCEE,DCAB,DBD3,DCAF,DCAC,BEB3,CAFB,DCAD,C9CA,C4B9,C7BD,DCAE,D4F6,D0E6,C4AB,B6D5,DBD4,B1DA,DBD5,DBD6,BABE,C8C0,CABF,C8C9,D7B3,C9F9,BFC7,BAF8,D2BC,E2BA,B4A6,B1B8,B8B4,CFC4,D9E7,CFA6,CDE2,D9ED,B6E0,D2B9,B9BB,E2B9,E2B7,B4F3,CCEC,CCAB,B7F2,D8B2,D1EB,BABB,CAA7,CDB7,D2C4,BFE4,BCD0,B6E1,DEC5,DEC6,DBBC,D1D9,C6E6,C4CE,B7EE,B7DC,BFFC,D7E0,C6F5,B1BC,DEC8,BDB1,CCD7,DECA,DEC9,B5EC,C9DD,B0C2,C5AE,C5AB,C4CC,BCE9,CBFD,BAC3,E5F9,C8E7,E5FA,CDFD,D7B1,B8BE,C2E8,C8D1,E5FB,B6CA,BCCB,D1FD,E6A1,C3EE,E6A4,E5FE,E6A5,CDD7,B7C1,E5FC,E5FD,E6A3,C4DD,E6A8,E6A7,C3C3,C6DE,E6AA,C4B7,E6A2,CABC,BDE3,B9C3,E6A6,D0D5,CEAF,E6A9,E6B0,D2A6,BDAA,E6AD,E6AF,C0D1,D2CC,BCA7,E6B1,D2F6,D7CB,CDFE,CDDE,C2A6,E6AB,E6AC,BDBF,E6AE,E6B3,E6B2,E6B6,E6B8,C4EF,C4C8,BEEA,C9EF,E6B7,B6F0,C3E4,D3E9,E6B4,E6B5,C8A2,E6BD,E6B9,C6C5,CDF1,E6BB,E6BC,BBE9,E6BE,E6BA,C0B7,D3A4,E6BF,C9F4,E6C3,E6C4,D0F6,C3BD,C3C4,E6C2,E6C1,E6C7,CFB1,EBF4,E6CA,E6C5,BCDE,C9A9,BCB5,CFD3,E6C8,E6C9,E6CE,E6D0,E6D1,E6CB,B5D5,E6CC,E6CF,C4DB,E6C6,E6CD,E6D2,E6D4,E6D3,E6D5,D9F8,E6D6,E6D7,D7D3,E6DD,E6DE,BFD7,D4D0,D7D6,B4E6,CBEF,E6DA,D8C3,D7CE,D0A2,C3CF,E6DF,BCBE,B9C2,E6DB,D1A7,BAA2,C2CF,D8AB,CAEB,E5EE,E6DC,B7F5,C8E6,C4F5,E5B2,C4FE,CBFC,E5B3,D5AC,D3EE,CAD8,B0B2,CBCE,CDEA,BAEA,E5B5,E5B4,D7DA,B9D9,D6E6,B6A8,CDF0,D2CB,B1A6,CAB5,B3E8,C9F3,BFCD,D0FB,CAD2,E5B6,BBC2,CFDC,B9AC,D4D7,BAA6,D1E7,CFFC,BCD2,E5B7,C8DD,BFED,B1F6,CBDE,BCC5,BCC4,D2FA,C3DC,BFDC,B8BB,C3C2,BAAE,D4A2,C7DE,C4AF,B2EC,B9D1,E5BB,C1C8,D5AF,E5BC,E5BE,B4E7,B6D4,CBC2,D1B0,B5BC,CAD9,B7E2,C9E4,BDAB,CEBE,D7F0,D0A1,C9D9,B6FB,E6D8,BCE2,B3BE,C9D0,E6D9,B3A2,DECC,D3C8,DECD,D2A2,DECE,BECD,DECF,CAAC,D2FC,B3DF,E5EA,C4E1,BEA1,CEB2,C4F2,BED6,C6A8,B2E3,BED3,C7FC,CCEB,BDEC,CEDD,CABA,C6C1,E5EC,D0BC,D5B9,E5ED,CAF4,CDC0,C2C5,E5EF,C2C4,E5F0,E5F8,CDCD,C9BD,D2D9,E1A8,D3EC,CBEA,C6F1,E1AC,E1A7,E1A9,E1AA,E1AF,B2ED,E1AB,B8DA,E1AD,E1AE,E1B0,B5BA,E1B1,E1B3,E1B8,D1D2,E1B6,E1B5,C1EB,E1B7,D4C0,E1B2,E1BA,B0B6,E1B4,BFF9,E1B9,E1BB,E1BE,E1BC,D6C5,CFBF,E1BD,E1BF,C2CD,B6EB,D3F8,C7CD,B7E5,BEFE,E1C0,E1C1,E1C7,B3E7,C6E9,B4DE,D1C2,E1C8,E1C6,E1C5,E1C3,E1C2,B1C0,D5B8,E1C4,E1CB,E1CC,E1CA,EFFA,E1D3,E1D2,C7B6,E1C9,E1CE,E1D0,E1D4,E1D1,E1CD,E1CF,E1D5,E1D6,E1D7,E1D8,E1DA,E1DB,CEA1,E7DD,B4A8,D6DD,D1B2,B3B2,B9A4,D7F3,C7C9,BEDE,B9AE,CED7,B2EE,DBCF,BCBA,D2D1,CBC8,B0CD,CFEF,D9E3,BDED,B1D2,CAD0,B2BC,CBA7,B7AB,CAA6,CFA3,E0F8,D5CA,E0FB,E0FA,C5C1,CCFB,C1B1,E0F9,D6E3,B2AF,D6C4,B5DB,B4F8,D6A1,CFAF,B0EF,E0FC,E1A1,B3A3,E0FD,E0FE,C3B1,C3DD,E1A2,B7F9,BBCF,E1A3,C4BB,E1A4,E1A5,E1A6,B4B1,B8C9,C6BD,C4EA,B2A2,D0D2,E7DB,BBC3,D3D7,D3C4,B9E3,E2CF,D7AF,C7EC,B1D3,B4B2,E2D1,D0F2,C2AE,E2D0,BFE2,D3A6,B5D7,E2D2,B5EA,C3ED,B8FD,B8AE,C5D3,B7CF,E2D4,E2D3,B6C8,D7F9,CDA5,E2D8,E2D6,CAFC,BFB5,D3B9,E2D5,E2D7,C1AE,C0C8,E2DB,E2DA,C0AA,C1CE,E2DC,E2DD,E2DE,DBC8,D1D3,CDA2,BDA8,DEC3,D8A5,BFAA,DBCD,D2EC,C6FA,C5AA,DEC4,B1D7,DFAE,CABD,DFB1,B9AD,D2FD,B8A5,BAEB,B3DA,B5DC,D5C5,C3D6,CFD2,BBA1,E5F3,E5F2,E5F4,CDE4,C8F5,B5AF,C7BF,E5F6,ECB0,E5E6,B9E9,B5B1,C2BC,E5E8,E5E7,E5E9,D2CD,E1EA,D0CE,CDAE,D1E5,B2CA,B1EB,B1F2,C5ED,D5C3,D3B0,E1DC,E1DD,D2DB,B3B9,B1CB,CDF9,D5F7,E1DE,BEB6,B4FD,E1DF,BADC,E1E0,BBB2,C2C9,E1E1,D0EC,CDBD,E1E2,B5C3,C5C7,E1E3,E1E4,D3F9,E1E5,D1AD,E1E6,CEA2,E1E7,B5C2,E1E8,BBD5,D0C4,E2E0,B1D8,D2E4,E2E1,BCC9,C8CC,E2E3,ECFE,ECFD,DFAF,E2E2,D6BE,CDFC,C3A6,E3C3,D6D2,E2E7,E2E8,D3C7,E2EC,BFEC,E2ED,E2E5,B3C0,C4EE,E2EE,D0C3,BAF6,E2E9,B7DE,BBB3,CCAC,CBCB,E2E4,E2E6,E2EA,E2EB,E2F7,E2F4,D4F5,E2F3,C5AD,D5FA,C5C2,B2C0,E2EF,E2F2,C1AF,CBBC,B5A1,E2F9,BCB1,E2F1,D0D4,D4B9,E2F5,B9D6,E2F6,C7D3,E2F0,D7DC,EDA1,E2F8,EDA5,E2FE,CAD1,C1B5,BBD0,BFD6,BAE3,CBA1,EDA6,EDA3,EDA2,BBD6,EDA7,D0F4,EDA4,BADE,B6F7,E3A1,B6B2,CCF1,B9A7,CFA2,C7A1,BFD2,B6F1,E2FA,E2FB,E2FD,E2FC,C4D5,E3A2,D3C1,E3A7,C7C4,CFA4,E3A9,BAB7,E3A8,BBDA,E3A3,E3A4,E3AA,E3A6,CEF2,D3C6,BBBC,D4C3,C4FA,EDA8,D0FC,E3A5,C3F5,E3AD,B1AF,E3B2,BCC2,E3AC,B5BF,C7E9,E3B0,BEAA,CDEF,BBF3,CCE8,E3AF,E3B1,CFA7,E3AE,CEA9,BBDD,B5EB,BEE5,B2D2,B3CD,B1B9,E3AB,B2D1,B5AC,B9DF,B6E8,CFEB,E3B7,BBCC,C8C7,D0CA,E3B8,B3EE,EDA9,D3FA,D3E4,EDAA,E3B9,D2E2,E3B5,D3DE,B8D0,E3B3,E3B6,B7DF,E3B4,C0A2,E3BA,D4B8,B4C8,E3BB,BBC5,C9F7,C9E5,C4BD,EDAB,C2FD,BBDB,BFAE,CEBF,E3BC,BFB6,B1EF,D4F7,E3BE,EDAD,E3BF,BAA9,EDAC,E3BD,E3C0,BAB6,B6AE,D0B8,B0C3,EDAE,EDAF,C0C1,E3C1,C5B3,E3C2,DCB2,EDB0,B8EA,CEEC,EAA7,D0E7,CAF9,C8D6,CFB7,B3C9,CED2,BDE4,E3DE,BBF2,EAA8,D5BD,C6DD,EAA9,EAAA,EAAC,EAAB,EAAE,EAAD,BDD8,EAAF,C2BE,B4C1,B4F7,BBA7,ECE6,ECE5,B7BF,CBF9,B1E2,ECE7,C9C8,ECE8,ECE9,CAD6,DED0,B2C5,D4FA,C6CB,B0C7,B4F2,C8D3,CDD0,BFB8,BFDB,C7A4,D6B4,C0A9,DED1,C9A8,D1EF,C5A4,B0E7,B3B6,C8C5,B0E2,B7F6,C5FA,B6F3,D5D2,B3D0,BCBC,B3AD,BEF1,B0D1,D2D6,CAE3,D7A5,CDB6,B6B6,BFB9,D5DB,B8A7,C5D7,DED2,BFD9,C2D5,C7C0,BBA4,B1A8,C5EA,C5FB,CCA7,B1A7,B5D6,C4A8,DED3,D1BA,B3E9,C3F2,B7F7,D6F4,B5A3,B2F0,C4B4,C4E9,C0AD,DED4,B0E8,C5C4,C1E0,B9D5,BEDC,CDD8,B0CE,CDCF,DED6,BED0,D7BE,DED5,D5D0,B0DD,C4E2,C2A3,BCF0,D3B5,C0B9,C5A1,B2A6,D4F1,C0A8,CAC3,DED7,D5FC,B9B0,C8AD,CBA9,DED9,BFBD,C6B4,D7A7,CAB0,C4C3,B3D6,B9D2,D6B8,EAFC,B0B4,BFE6,CCF4,CDDA,D6BF,C2CE,CECE,CCA2,D0AE,C4D3,B5B2,DED8,D5F5,BCB7,BBD3,B0A4,C5B2,B4EC,D5F1,EAFD,DEDA,CDA6,CDEC,CEE6,DEDC,CDB1,C0A6,D7BD,DEDB,B0C6,BAB4,C9D3,C4F3,BEE8,B2B6,C0CC,CBF0,BCF1,BBBB,B5B7,C5F5,DEE6,DEE3,BEDD,DEDF,B4B7,BDDD,DEE0,C4ED,CFC6,B5E0,B6DE,CADA,B5F4,DEE5,D5C6,DEE1,CCCD,C6FE,C5C5,D2B4,BEF2,C2D3,CCBD,B3B8,BDD3,BFD8,CDC6,D1DA,B4EB,DEE4,DEDD,DEE7,EAFE,C2B0,DEE2,D6C0,B5A7,B2F4,DEE8,DEF2,DEED,DEF1,C8E0,D7E1,DEEF,C3E8,CCE1,B2E5,D2BE,DEEE,DEEB,CED5,B4A7,BFAB,BEBE,BDD2,DEE9,D4AE,DEDE,DEEA,C0BF,DEEC,B2F3,B8E9,C2A7,BDC1,DEF5,DEF8,B2AB,B4A4,B4EA,C9A6,DEF6,CBD1,B8E3,DEF7,DEFA,DEF9,CCC2,B0E1,B4EE,E5BA,D0AF,B2EB,EBA1,DEF4,C9E3,DEF3,B0DA,D2A1,B1F7,CCAF,DEF0,CBA4,D5AA,DEFB,B4DD,C4A6,DEFD,C3FE,C4A1,DFA1,C1CC,DEFC,BEEF,C6B2,B3C5,C8F6,CBBA,DEFE,DFA4,D7B2,B3B7,C1C3,C7CB,B2A5,B4E9,D7AB,C4EC,DFA2,DFA3,DFA5,BAB3,DFA6,C0DE,C9C3,B2D9,C7E6,DFA7,C7DC,DFA8,EBA2,CBD3,DFAA,DFA9,B2C1,C5CA,DFAB,D4DC,C8C1,DFAC,BEF0,DFAD,D6A7,EAB7,EBB6,CAD5,D8FC,B8C4,B9A5,B7C5,D5FE,B9CA,D0A7,F4CD,B5D0,C3F4,BEC8,EBB7,B0BD,BDCC,C1B2,B1D6,B3A8,B8D2,C9A2,B6D8,EBB8,BEB4,CAFD,C7C3,D5FB,B7F3,CEC4,D5AB,B1F3,ECB3,B0DF,ECB5,B6B7,C1CF,F5FA,D0B1,D5E5,CED3,BDEF,B3E2,B8AB,D5B6,EDBD,B6CF,CBB9,D0C2,B7BD,ECB6,CAA9,C5D4,ECB9,ECB8,C2C3,ECB7,D0FD,ECBA,ECBB,D7E5,ECBC,ECBD,C6EC,CEDE,BCC8,C8D5,B5A9,BEC9,D6BC,D4E7,D1AE,D0F1,EAB8,EAB9,EABA,BAB5,CAB1,BFF5,CDFA,EAC0,B0BA,EABE,C0A5,EABB,B2FD,C3F7,BBE8,D2D7,CEF4,EABF,EABC,EAC3,D0C7,D3B3,B4BA,C3C1,D7F2,D5D1,CAC7,EAC5,EAC4,EAC7,EAC6,D6E7,CFD4,EACB,BBCE,BDFA,C9CE,EACC,C9B9,CFFE,EACA,D4CE,EACD,EACF,CDED,EAC9,EACE,CEEE,BBDE,B3BF,C6D5,BEB0,CEFA,C7E7,BEA7,EAD0,D6C7,C1C0,D4DD,EAD1,CFBE,EAD2,CAEE,C5AF,B0B5,EAD4,EAD3,F4DF,C4BA,B1A9,E5DF,EAD5,CAEF,EAD6,EAD7,C6D8,EAD8,EAD9,D4BB,C7FA,D2B7,B8FC,EAC2,B2DC,C2FC,D4F8,CCE6,D7EE,D4C2,D3D0,EBC3,C5F3,B7FE,EBD4,CBB7,EBDE,C0CA,CDFB,B3AF,C6DA,EBFC,C4BE,CEB4,C4A9,B1BE,D4FD,CAF5,D6EC,C6D3,B6E4,BBFA,D0E0,C9B1,D4D3,C8A8,B8CB,E8BE,C9BC,E8BB,C0EE,D0D3,B2C4,B4E5,E8BC,D5C8,B6C5,E8BD,CAF8,B8DC,CCF5,C0B4,D1EE,E8BF,E8C2,BABC,B1AD,BDDC,EABD,E8C3,E8C6,E8CB,E8CC,CBC9,B0E5,BCAB,B9B9,E8C1,CDF7,E8CA,CEF6,D5ED,C1D6,E8C4,C3B6,B9FB,D6A6,E8C8,CAE0,D4E6,E8C0,E8C5,E8C7,C7B9,B7E3,E8C9,BFDD,E8D2,E8D7,E8D5,BCDC,BCCF,E8DB,E8DE,E8DA,B1FA,B0D8,C4B3,B8CC,C6E2,C8BE,C8E1,E8CF,E8D4,E8D6,B9F1,E8D8,D7F5,C4FB,E8DC,B2E9,E8D1,BCED,BFC2,E8CD,D6F9,C1F8,B2F1,E8DF,CAC1,E8D9,D5A4,B1EA,D5BB,E8CE,E8D0,B6B0,E8D3,E8DD,C0B8,CAF7,CBA8,C6DC,C0F5,E8E9,D0A3,E8F2,D6EA,E8E0,E8E1,D1F9,BACB,B8F9,B8F1,D4D4,E8EF,E8EE,E8EC,B9F0,CCD2,E8E6,CEA6,BFF2,B0B8,E8F1,E8F0,D7C0,E8E4,CDA9,C9A3,BBB8,BDDB,E8EA,E8E2,E8E3,E8E5,B5B5,E8E7,C7C5,E8EB,E8ED,BDB0,D7AE,E8F8,E8F5,CDB0,E8F6,C1BA,E8E8,C3B7,B0F0,E8F4,E8F7,B9A3,C9D2,C3CE,CEE0,C0E6,CBF3,CCDD,D0B5,CAE1,E8F3,BCEC,E8F9,C3DE,C6E5,B9F7,B0F4,D7D8,BCAC,C5EF,CCC4,E9A6,C9AD,E9A2,C0E2,BFC3,E8FE,B9D7,E8FB,E9A4,D2CE,E9A3,D6B2,D7B5,E9A7,BDB7,E8FC,E8FD,E9A1,CDD6,D2AC,E9B2,E9A9,B4AA,B4BB,E9AB,D0A8,E9A5,B3FE,E9AC,C0E3,E9AA,E9B9,E9B8,E9AE,E8FA,E9A8,BFAC,E9B1,E9BA,C2A5,E9AF,B8C5,E9AD,D3DC,E9B4,E9B5,E9B7,E9C7,C0C6,E9C5,E9B0,E9BB,B0F1,E9BC,D5A5,E9BE,E9BF,E9C1,C1F1,C8B6,E9BD,E9C2,E9C3,E9B3,E9B6,BBB1,E9C0,BCF7,E9C4,E9C6,E9CA,E9CE,B2DB,E9C8,B7AE,E9CB,E9CC,D5C1,C4A3,E9D8,BAE1,E9C9,D3A3,E9D4,E9D7,E9D0,E9CF,C7C1,E9D2,E9D9,B3C8,E9D3,CFF0,E9CD,B3F7,E9D6,E9DA,CCB4,CFAD,E9D5,E9DC,E9DB,E9DE,E9D1,E9DD,E9DF,C3CA,C7B7,B4CE,BBB6,D0C0,ECA3,C5B7,D3FB,ECA4,ECA5,C6DB,BFEE,ECA6,ECA7,D0AA,C7B8,B8E8,ECA8,D6B9,D5FD,B4CB,B2BD,CEE4,C6E7,CDE1,B4F5,CBC0,BCDF,E9E2,E9E3,D1EA,E9E5,B4F9,E9E4,D1B3,CAE2,B2D0,E9E8,E9E6,E9E7,D6B3,E9E9,E9EA,E9EB,E9EC,ECAF,C5B9,B6CE,D2F3,B5EE,BBD9,ECB1,D2E3,CEE3,C4B8,C3BF,B6BE,D8B9,B1C8,B1CF,B1D1,C5FE,B1D0,C3AB,D5B1,EBA4,BAC1,CCBA,EBA5,EBA7,EBA8,EBA6,EBA9,EBAB,EBAA,EBAC,CACF,D8B5,C3F1,C3A5,C6F8,EBAD,C4CA,EBAE,EBAF,EBB0,B7D5,B7FA,EBB1,C7E2,EBB3,BAA4,D1F5,B0B1,EBB2,EBB4,B5AA,C2C8,C7E8,EBB5,CBAE,E3DF,D3C0,D9DB,CDA1,D6AD,C7F3,D9E0,BBE3,BABA,E3E2,CFAB,E3E0,C9C7,BAB9,D1B4,E3E1,C8EA,B9AF,BDAD,B3D8,CEDB,CCC0,E3E8,E3E9,CDF4,CCAD,BCB3,E3EA,E3EB,D0DA,C6FB,B7DA,C7DF,D2CA,CED6,E3E4,E3EC,C9F2,B3C1,E3E7,C6E3,E3E5,EDB3,E3E6,C9B3,C5E6,B9B5,C3BB,E3E3,C5BD,C1A4,C2D9,B2D7,E3ED,BBA6,C4AD,E3F0,BEDA,E3FB,E3F5,BAD3,B7D0,D3CD,D6CE,D5D3,B9C1,D5B4,D1D8,D0B9,C7F6,C8AA,B2B4,C3DA,E3EE,E3FC,E3EF,B7A8,E3F7,E3F4,B7BA,C5A2,E3F6,C5DD,B2A8,C6FC,C4E0,D7A2,C0E1,E3F9,E3FA,E3FD,CCA9,E3F3,D3BE,B1C3,EDB4,E3F1,E3F2,E3F8,D0BA,C6C3,D4F3,E3FE,BDE0,E4A7,E4A6,D1F3,E4A3,E4A9,C8F7,CFB4,E4A8,E4AE,C2E5,B6B4,BDF2,E4A2,BAE9,E4AA,E4AC,B6FD,D6DE,E4B2,E4AD,E4A1,BBEE,CDDD,C7A2,C5C9,C1F7,E4A4,C7B3,BDAC,BDBD,E4A5,D7C7,B2E2,E4AB,BCC3,E4AF,BBEB,E4B0,C5A8,E4B1,D5E3,BFA3,E4BA,E4B7,E4BB,E4BD,C6D6,BAC6,C0CB,B8A1,E4B4,D4A1,BAA3,BDFE,E4BC,CDBF,C4F9,CFFB,C9E6,D3BF,CFD1,E4B3,E4B8,E4B9,CCE9,CCCE,C0D4,E4B5,C1B0,E4B6,CED0,BBC1,B5D3,C8F3,BDA7,D5C7,C9AC,B8A2,E4CA,E4CC,D1C4,D2BA,BAAD,BAD4,E4C3,B5ED,D7CD,E4C0,CFFD,E4BF,C1DC,CCCA,CAE7,C4D7,CCD4,E4C8,E4C7,E4C1,E4C4,B5AD,D3D9,E4C6,D2F9,B4E3,BBB4,C9EE,B4BE,BBEC,D1CD,CCED,EDB5,C7E5,D4A8,E4CB,D7D5,E4C2,BDA5,E4C5,D3E6,E4C9,C9F8,E4BE,D3E5,C7FE,B6C9,D4FC,B2B3,E4D7,CEC2,E4CD,CEBC,B8DB,E4D6,BFCA,D3CE,C3EC,C5C8,E4D8,CDC4,E4CF,E4D4,E4D5,BAFE,CFE6,D5BF,E4D2,E4D0,E4CE,CDE5,CAAA,C0A3,BDA6,E4D3,B8C8,E4E7,D4B4,E4DB,C1EF,E4E9,D2E7,E4DF,E4E0,CFAA,CBDD,E4DA,E4D1,E4E5,C8DC,E4E3,C4E7,E4E2,E4E1,B3FC,E4E8,B5E1,D7CC,E4E6,BBAC,D7D2,CCCF,EBF8,E4E4,B9F6,D6CD,E4D9,E4DC,C2FA,E4DE,C2CB,C0C4,C2D0,B1F5,CCB2,B5CE,E4EF,C6AF,C6E1,E4F5,C2A9,C0EC,D1DD,E4EE,C4AE,E4ED,E4F6,E4F4,C2FE,E4DD,E4F0,CAFE,D5C4,E4F1,D1FA,E4EB,E4EC,E4F2,CEAB,C5CB,C7B1,C2BA,E4EA,C1CA,CCB6,B3B1,E4FB,E4F3,E4FA,E4FD,E4FC,B3CE,B3BA,E4F7,E4F9,E4F8,C5EC,C0BD,D4E8,E5A2,B0C4,E5A4,E5A3,BCA4,E5A5,E5A1,E4FE,B1F4,E5A8,E5A9,E5A6,E5A7,E5AA,C6D9,E5AB,E5AD,E5AC,E5AF,E5AE,B9E0,E5B0,E5B1,BBF0,ECE1,C3F0,B5C6,BBD2,C1E9,D4EE,BEC4,D7C6,D4D6,B2D3,ECBE,EAC1,C2AF,B4B6,D1D7,B3B4,C8B2,BFBB,ECC0,D6CB,ECBF,ECC1,ECC5,BEE6,CCBF,C5DA,BEBC,ECC6,B1FE,ECC4,D5A8,B5E3,ECC2,C1B6,B3E3,ECC3,CBB8,C0C3,CCFE,C1D2,ECC8,BAE6,C0D3,D6F2,D1CC,BFBE,B7B3,C9D5,ECC7,BBE2,CCCC,BDFD,C8C8,CFA9,CDE9,C5EB,B7E9,D1C9,BAB8,ECC9,ECCA,BBC0,ECCB,ECE2,B1BA,B7D9,BDB9,ECCC,D1E6,ECCD,C8BB,ECD1,ECD3,BBCD,BCE5,ECCF,C9B7,C3BA,ECE3,D5D5,ECD0,D6F3,ECD2,ECCE,ECD4,ECD5,C9BF,CFA8,D0DC,D1AC,C8DB,ECD6,CEF5,CAEC,ECDA,ECD9,B0BE,ECD7,ECD8,ECE4,C8BC,C1C7,ECDC,D1E0,ECDB,D4EF,ECDD,DBC6,ECDE,B1AC,ECDF,ECE0,D7A6,C5C0,EBBC,B0AE,BEF4,B8B8,D2AF,B0D6,B5F9,D8B3,CBAC,E3DD,C6AC,B0E6,C5C6,EBB9,EBBA,EBBB,D1C0,C5A3,EAF2,C4B2,C4B5,C0CE,EAF3,C4C1,CEEF,EAF0,EAF4,C9FC,C7A3,CCD8,CEFE,EAF5,EAF6,CFAC,C0E7,EAF7,B6BF,EAF8,EAF9,EAFA,EAFB,EAF1,C8AE,E1EB,B7B8,E1EC,E1ED,D7B4,E1EE,E1EF,D3CC,E1F1,BFF1,E1F0,B5D2,B1B7,E1F3,E1F2,BAFC,E1F4,B9B7,BED1,C4FC,BADD,BDC6,E1F5,E1F7,B6C0,CFC1,CAA8,E1F6,D5F8,D3FC,E1F8,E1FC,E1F9,E1FA,C0EA,E1FE,E2A1,C0C7,E1FB,E1FD,E2A5,C1D4,E2A3,E2A8,B2FE,E2A2,C3CD,B2C2,E2A7,E2A6,E2A4,E2A9,E2AB,D0C9,D6ED,C3A8,E2AC,CFD7,E2AE,BAEF,E9E0,E2AD,E2AA,BBAB,D4B3,E2B0,E2AF,E9E1,E2B1,E2B2,E2B3,CCA1,E2B4,E2B5,D0FE,C2CA,D3F1,CDF5,E7E0,E7E1,BEC1,C2EA,E7E4,E7E3,CDE6,C3B5,E7E2,BBB7,CFD6,C1E1,E7E9,E7E8,E7F4,B2A3,E7EA,E7E6,E7EC,E7EB,C9BA,D5E4,E7E5,B7A9,E7E7,E7EE,E7F3,D6E9,E7ED,E7F2,E7F1,B0E0,E7F5,C7F2,C0C5,C0ED,C1F0,E7F0,E7F6,CBF6,E8A2,E8A1,D7C1,E7FA,E7F9,E7FB,E7F7,E7FE,E7FD,E7FC,C1D5,C7D9,C5FD,C5C3,C7ED,E8A3,E8A6,E8A5,E8A7,BAF7,E7F8,E8A4,C8F0,C9AA,E8A9,B9E5,D1FE,E8A8,E8AA,E8AD,E8AE,C1A7,E8AF,E8B0,E8AC,E8B4,E8AB,E8B1,E8B5,E8B2,E8B3,E8B7,E8B6,B9CF,F0AC,F0AD,C6B0,B0EA,C8BF,CDDF,CECD,EAB1,EAB2,C6BF,B4C9,EAB3,D5E7,DDF9,EAB4,EAB5,EAB6,B8CA,DFB0,C9F5,CCF0,C9FA,C9FB,D3C3,CBA6,B8A6,F0AE,B1C2,E5B8,CCEF,D3C9,BCD7,C9EA,B5E7,C4D0,B5E9,EEAE,BBAD,E7DE,EEAF,B3A9,EEB2,EEB1,BDE7,EEB0,CEB7,C5CF,C1F4,DBCE,EEB3,D0F3,C2D4,C6E8,B7AC,EEB4,B3EB,BBFB,EEB5,E7DC,EEB6,BDAE,F1E2,CAE8,D2C9,F0DA,F0DB,F0DC,C1C6,B8ED,BECE,F0DE,C5B1,F0DD,D1F1,F0E0,B0CC,BDEA,D2DF,F0DF,B4AF,B7E8,F0E6,F0E5,C6A3,F0E1,F0E2,B4C3,F0E3,D5EE,CCDB,BED2,BCB2,F0E8,F0E7,F0E4,B2A1,D6A2,D3B8,BEB7,C8AC,F0EA,D1F7,D6CC,BADB,F0E9,B6BB,CDB4,C6A6,C1A1,F0EB,F0EE,F0ED,F0F0,F0EC,BBBE,F0EF,CCB5,F0F2,B3D5,B1D4,F0F3,F0F4,F0F6,B4E1,F0F1,F0F7,F0FA,F0F8,F0F5,F0FD,F0F9,F0FC,F0FE,F1A1,CEC1,F1A4,F1A3,C1F6,F0FB,CADD,B4F1,B1F1,CCB1,F1A6,F1A7,F1AC,D5CE,F1A9,C8B3,F1A2,F1AB,F1A8,F1A5,F1AA,B0A9,F1AD,F1AF,F1B1,F1B0,F1AE,D1A2,F1B2,F1B3,B9EF,B5C7,B0D7,B0D9,D4ED,B5C4,BDD4,BBCA,F0A7,B8DE,F0A8,B0A8,F0A9,CDEE,F0AA,F0AB,C6A4,D6E5,F1E4,F1E5,C3F3,D3DB,D6D1,C5E8,D3AF,D2E6,EEC1,B0BB,D5B5,D1CE,BCE0,BAD0,BFF8,B8C7,B5C1,C5CC,CAA2,C3CB,EEC2,C4BF,B6A2,EDEC,C3A4,D6B1,CFE0,EDEF,C5CE,B6DC,CAA1,EDED,EDF0,EDF1,C3BC,BFB4,EDEE,EDF4,EDF2,D5E6,C3DF,EDF3,EDF6,D5A3,D1A3,EDF5,C3D0,EDF7,BFF4,BEEC,EDF8,CCF7,D1DB,D7C5,D5F6,EDFC,EDFB,EDF9,EDFA,EDFD,BEA6,CBAF,EEA1,B6BD,EEA2,C4C0,EDFE,BDDE,B2C7,B6C3,EEA5,D8BA,EEA3,EEA6,C3E9,B3F2,EEA7,EEA4,CFB9,EEA8,C2F7,EEA9,EEAA,DEAB,C6B3,C7C6,D6F5,B5C9,CBB2,EEAB,CDAB,EEAC,D5B0,EEAD,F6C4,DBC7,B4A3,C3AC,F1E6,CAB8,D2D3,D6AA,EFF2,BED8,BDC3,EFF3,B6CC,B0AB,CAAF,EDB6,EDB7,CEF9,B7AF,BFF3,EDB8,C2EB,C9B0,EDB9,C6F6,BFB3,EDBC,C5F8,D1D0,D7A9,EDBA,EDBB,D1E2,EDBF,EDC0,EDC4,EDC8,EDC6,EDCE,D5E8,EDC9,EDC7,EDBE,C5E9,C6C6,C9E9,D4D2,EDC1,EDC2,EDC3,EDC5,C0F9,B4A1,B9E8,EDD0,EDD1,EDCA,EDCF,CEF8,CBB6,EDCC,EDCD,CFF5,EDD2,C1F2,D3B2,EDCB,C8B7,BCEF,C5F0,EDD6,B5EF,C2B5,B0AD,CBE9,B1AE,EDD4,CDEB,B5E2,EDD5,EDD3,EDD7,B5FA,EDD8,EDD9,EDDC,B1CC,C5F6,BCEE,EDDA,CCBC,B2EA,EDDB,C4EB,B4C5,B0F5,EDDF,C0DA,B4E8,C5CD,EDDD,BFC4,EDDE,C4A5,EDE0,EDE1,EDE3,C1D7,BBC7,BDB8,EDE2,EDE4,EDE6,EDE5,EDE7,CABE,ECEA,C0F1,C9E7,ECEB,C6EE,ECEC,C6ED,ECED,ECF0,D7E6,ECF3,ECF1,ECEE,ECEF,D7A3,C9F1,CBEE,ECF4,ECF2,CFE9,ECF6,C6B1,BCC0,ECF5,B5BB,BBF6,ECF7,D9F7,BDFB,C2BB,ECF8,ECF9,B8A3,ECFA,ECFB,ECFC,D3ED,D8AE,C0EB,C7DD,BACC,D0E3,CBBD,CDBA,B8D1,B1FC,C7EF,D6D6,BFC6,C3EB,EFF5,C3D8,D7E2,EFF7,B3D3,C7D8,D1ED,D6C8,EFF8,EFF6,BBFD,B3C6,BDD5,D2C6,BBE0,CFA1,EFFC,EFFB,EFF9,B3CC,C9D4,CBB0,EFFE,B0DE,D6C9,EFFD,B3ED,F6D5,CEC8,F0A2,F0A1,B5BE,BCDA,BBFC,B8E5,C4C2,F0A3,CBEB,F0A6,D1A8,BEBF,C7EE,F1B6,F1B7,BFD5,B4A9,F1B8,CDBB,C7D4,D5AD,F1B9,F1BA,C7CF,D2A4,D6CF,F1BB,BDD1,B4B0,BEBD,B4DC,CED1,BFDF,F1BD,BFFA,F1BC,F1BF,F1BE,F1C0,F1C1,C1FE,C1A2,CAFA,D5BE,BEBA,BEB9,D5C2,BFA2,CDAF,F1B5,BDDF,B6CB,D6F1,F3C3,F3C4,B8CD,F3C6,F3C7,B0CA,F3C5,F3C9,CBF1,F3CB,D0A6,B1CA,F3C8,F3CF,B5D1,F3D7,F3D2,F3D4,F3D3,B7FB,B1BF,F3CE,F3CA,B5DA,F3D0,F3D1,F3D5,F3CD,BCE3,C1FD,F3D6,F3DA,F3CC,B5C8,BDEE,F3DC,B7A4,BFF0,D6FE,CDB2,B4F0,B2DF,F3D8,F3D9,C9B8,F3DD,F3DE,F3E1,F3DF,F3E3,F3E2,F3DB,BFEA,B3EF,F3E0,C7A9,BCF2,F3EB,B9BF,F3E4,B2AD,BBFE,CBE3,F3ED,F3E9,B9DC,F3EE,F3E5,F3E6,F3EA,C2E1,F3EC,F3EF,F3E8,BCFD,CFE4,F3F0,F3E7,F3F2,D7AD,C6AA,F3F3,F3F1,C2A8,B8DD,F3F5,F3F4,B4DB,F3F6,F3F7,F3F8,C0BA,C0E9,C5F1,F3FB,F3FA,B4D8,F3FE,F3F9,F3FC,F3FD,F4A1,F4A3,BBC9,F4A2,F4A4,B2BE,F4A6,F4A5,BCAE,C3D7,D9E1,C0E0,F4CC,D7D1,B7DB,F4CE,C1A3,C6C9,B4D6,D5B3,F4D0,F4CF,F4D1,CBDA,F4D2,D4C1,D6E0,B7E0,C1B8,C1BB,F4D3,BEAC,B4E2,F4D4,F4D5,BEAB,F4D6,F4DB,F4D7,F4DA,BAFD,F4D8,F4D9,B8E2,CCC7,F4DC,B2DA,C3D3,D4E3,BFB7,F4DD,C5B4,F4E9,CFB5,CEC9,CBD8,CBF7,BDF4,D7CF,C0DB,D0F5,F4EA,F4EB,F4EC,F7E3,B7B1,F4ED,D7EB,F4EE,E6F9,BEC0,E6FA,BAEC,E6FB,CFCB,E6FC,D4BC,BCB6,E6FD,E6FE,BCCD,C8D2,CEB3,E7A1,B4BF,E7A2,C9B4,B8D9,C4C9,D7DD,C2DA,B7D7,D6BD,CEC6,B7C4,C5A6,E7A3,CFDF,E7A4,E7A5,E7A6,C1B7,D7E9,C9F0,CFB8,D6AF,D6D5,E7A7,B0ED,E7A8,E7A9,C9DC,D2EF,BEAD,E7AA,B0F3,C8DE,BDE1,E7AB,C8C6,E7AC,BBE6,B8F8,D1A4,E7AD,C2E7,BEF8,BDCA,CDB3,E7AE,E7AF,BEEE,D0E5,CBE7,CCD0,BCCC,E7B0,BCA8,D0F7,E7B1,D0F8,E7B2,E7B3,B4C2,E7B4,E7B5,C9FE,CEAC,C3E0,E7B7,B1C1,B3F1,E7B8,E7B9,D7DB,D5C0,E7BA,C2CC,D7BA,E7BB,E7BC,E7BD,BCEA,C3E5,C0C2,E7BE,E7BF,BCA9,E7C0,E7C1,E7B6,B6D0,E7C2,E7C3,E7C4,BBBA,B5DE,C2C6,B1E0,E7C5,D4B5,E7C6,B8BF,E7C8,E7C7,B7EC,E7C9,B2F8,E7CA,E7CB,E7CC,E7CD,E7CE,E7CF,E7D0,D3A7,CBF5,E7D1,E7D2,E7D3,E7D4,C9C9,E7D5,E7D6,E7D7,E7D8,E7D9,BDC9,E7DA,F3BE,B8D7,C8B1,F3BF,F3C0,F3C1,B9DE,CDF8,D8E8,BAB1,C2DE,EEB7,B7A3,EEB9,EEB8,B0D5,EEBB,D5D6,D7EF,D6C3,EEBD,CAF0,EEBC,EEBE,EEC0,EEBF,D1F2,C7BC,C3C0,B8E1,C1E7,F4C6,D0DF,F4C7,CFDB,C8BA,F4C8,F4C9,F4CA,F4CB,D9FA,B8FE,E5F1,D3F0,F4E0,CECC,B3E1,F1B4,D2EE,F4E1,CFE8,F4E2,C7CC,B5D4,B4E4,F4E4,F4E3,F4E5,F4E6,F4E7,BAB2,B0BF,F4E8,B7AD,D2ED,D2AB,C0CF,BFBC,EBA3,D5DF,EAC8,F1F3,B6F8,CBA3,C4CD,F1E7,F1E8,B8FB,F1E9,BAC4,D4C5,B0D2,F1EA,F1EB,F1EC,F1ED,F1EE,F1EF,F1F1,F1F0,C5D5,F1F2,B6FA,F1F4,D2AE,DEC7,CBCA,B3DC,B5A2,B9A2,C4F4,F1F5,F1F6,C1C4,C1FB,D6B0,F1F7,F1F8,C1AA,C6B8,BEDB,F1F9,B4CF,F1FA,EDB2,EDB1,CBE0,D2DE,CBC1,D5D8,C8E2,C0DF,BCA1,EBC1,D0A4,D6E2,B6C7,B8D8,EBC0,B8CE,EBBF,B3A6,B9C9,D6AB,B7F4,B7CA,BCE7,B7BE,EBC6,EBC7,B0B9,BFCF,EBC5,D3FD,EBC8,EBC9,B7CE,EBC2,EBC4,C9F6,D6D7,D5CD,D0B2,EBCF,CEB8,EBD0,B5A8,B1B3,EBD2,CCA5,C5D6,EBD3,EBD1,C5DF,EBCE,CAA4,EBD5,B0FB,BAFA,D8B7,F1E3,EBCA,EBCB,EBCC,EBCD,EBD6,E6C0,EBD9,BFE8,D2C8,EBD7,EBDC,B8EC,EBD8,BDBA,D0D8,B0B7,EBDD,C4DC,D6AC,B4E0,C2F6,BCB9,EBDA,EBDB,D4E0,C6EA,C4D4,EBDF,C5A7,D9F5,B2B1,EBE4,BDC5,EBE2,EBE3,B8AC,CDD1,EBE5,EBE1,C1B3,C6A2,CCF3,EBE6,C0B0,D2B8,EBE7,B8AF,B8AD,EBE8,C7BB,CDF3,EBEA,EBEB,EBED,D0C8,EBF2,EBEE,EBF1,C8F9,D1FC,EBEC,EBE9,B8B9,CFD9,C4E5,EBEF,EBF0,CCDA,CDC8,B0F2,EBF6,EBF5,B2B2,B8E0,EBF7,B1EC,CCC5,C4A4,CFA5,EBF9,ECA2,C5F2,EBFA,C9C5,E2DF,EBFE,CDCE,ECA1,B1DB,D3B7,D2DC,EBFD,EBFB,B3BC,EAB0,D7D4,F4AB,B3F4,D6C1,D6C2,D5E9,BECA,F4A7,D2A8,F4A8,F4A9,F4AA,BECB,D3DF,C9E0,C9E1,F3C2,CAE6,CCF2,E2B6,CBB4,CEE8,D6DB,F4AD,F4AE,F4AF,F4B2,BABD,F4B3,B0E3,F4B0,F4B1,BDA2,B2D5,F4B6,F4B7,B6E6,B2B0,CFCF,F4B4,B4AC,F4B5,F4B8,F4B9,CDA7,F4BA,F4BB,F4BC,CBD2,F4BD,F4BE,F4BF,F4DE,C1BC,BCE8,C9AB,D1DE,E5F5,DCB3,D2D5,DCB4,B0AC,DCB5,BDDA,DCB9,D8C2,DCB7,D3F3,C9D6,DCBA,DCB6,DCBB,C3A2,DCBC,DCC5,DCBD,CEDF,D6A5,DCCF,DCCD,DCD2,BDE6,C2AB,DCB8,DCCB,DCCE,DCBE,B7D2,B0C5,DCC7,D0BE,DCC1,BBA8,B7BC,DCCC,DCC6,DCBF,C7DB,D1BF,DCC0,DCCA,DCD0,CEAD,DCC2,DCC3,DCC8,DCC9,B2D4,DCD1,CBD5,D4B7,DCDB,DCDF,CCA6,DCE6,C3E7,DCDC,BFC1,DCD9,B0FA,B9B6,DCE5,DCD3,DCC4,DCD6,C8F4,BFE0,C9BB,B1BD,D3A2,DCDA,DCD5,C6BB,DCDE,D7C2,C3AF,B7B6,C7D1,C3A9,DCE2,DCD8,DCEB,DCD4,DCDD,BEA5,DCD7,DCE0,DCE3,DCE4,DCF8,DCE1,DDA2,DCE7,BCEB,B4C4,C3A3,B2E7,DCFA,DCF2,DCEF,DCFC,DCEE,D2F0,B2E8,C8D7,C8E3,DCFB,DCED,DCF7,DCF5,BEA3,DCF4,B2DD,DCF3,BCF6,DCE8,BBC4,C0F3,BCD4,DCE9,DCEA,DCF1,DCF6,DCF9,B5B4,C8D9,BBE7,DCFE,DCFD,D3AB,DDA1,DDA3,DDA5,D2F1,DDA4,DDA6,DDA7,D2A9,BAC9,DDA9,DDB6,DDB1,DDB4,DDB0,C6CE,C0F2,C9AF,DCEC,DDAE,DDB7,DCF0,DDAF,DDB8,DDAC,DDB9,DDB3,DDAD,C4AA,DDA8,C0B3,C1AB,DDAA,DDAB,DDB2,BBF1,DDB5,D3A8,DDBA,DDBB,C3A7,DDD2,DDBC,DDD1,B9BD,BED5,BEFA,BACA,DDCA,DDC5,DDBF,B2CB,DDC3,DDCB,B2A4,DDD5,DDBE,C6D0,DDD0,DDD4,C1E2,B7C6,DDCE,DDCF,DDC4,DDBD,DDCD,CCD1,DDC9,DDC2,C3C8,C6BC,CEAE,DDCC,DDC8,DDC1,DDC6,C2DC,D3A9,D3AA,DDD3,CFF4,C8F8,DDE6,DDC7,DDE0,C2E4,DDE1,DDD7,D6F8,DDD9,DDD8,B8F0,DDD6,C6CF,B6AD,DDE2,BAF9,D4E1,DDE7,B4D0,DDDA,BFFB,DDE3,DDDF,DDDD,B5D9,DDDB,DDDC,DDDE,BDAF,DDE4,DDE5,DDF5,C3C9,CBE2,DDF2,D8E1,C6D1,DDF4,D5F4,DDF3,DDF0,DDEC,DDEF,DDE8,D0EE,C8D8,DDEE,DDE9,DDEA,CBF2,DDED,B1CD,C0B6,BCBB,DDF1,DDF7,DDF6,DDEB,C5EE,DDFB,DEA4,DEA3,DDF8,C3EF,C2FB,D5E1,CEB5,DDFD,B2CC,C4E8,CADF,C7BE,DDFA,DDFC,DDFE,DEA2,B0AA,B1CE,DEAC,DEA6,BDB6,C8EF,DEA1,DEA5,DEA9,DEA8,DEA7,DEAD,D4CC,DEB3,DEAA,DEAE,C0D9,B1A1,DEB6,DEB1,DEB2,D1A6,DEB5,DEAF,DEB0,D0BD,DEB4,CAED,DEB9,DEB8,DEB7,DEBB,BDE5,B2D8,C3EA,DEBA,C5BA,DEBC,CCD9,B7AA,D4E5,DEBD,DEBF,C4A2,DEC1,DEBE,DEC0,D5BA,DEC2,F2AE,BBA2,C2B2,C5B0,C2C7,F2AF,D0E9,D3DD,EBBD,B3E6,F2B0,F2B1,CAAD,BAE7,F2B3,F2B5,F2B4,CBE4,CFBA,F2B2,CAB4,D2CF,C2EC,CEC3,F2B8,B0F6,F2B7,F2BE,B2CF,D1C1,F2BA,F2BC,D4E9,F2BB,F2B6,F2BF,F2BD,F2B9,F2C7,F2C4,F2C6,F2CA,F2C2,F2C0,F2C5,D6FB,F2C1,C7F9,C9DF,F2C8,B9C6,B5B0,F2C3,F2C9,F2D0,F2D6,BBD7,F2D5,CDDC,D6EB,F2D2,F2D4,B8F2,F2CB,F2CE,C2F9,D5DD,F2CC,F2CD,F2CF,F2D3,F2D9,D3BC,B6EA,CAF1,B7E4,F2D7,F2D8,F2DA,F2DD,F2DB,F2DC,D1D1,F2D1,CDC9,CECF,D6A9,F2E3,C3DB,F2E0,C0AF,F2EC,F2DE,F2E1,F2E8,F2E2,F2E7,F2E6,F2E9,F2DF,F2E4,F2EA,D3AC,F2E5,B2F5,F2F2,D0AB,F2F5,BBC8,F2F9,F2F0,F2F6,F2F8,F2FA,F2F3,F2F1,BAFB,B5FB,F2EF,F2F7,F2ED,F2EE,F2EB,F3A6,F3A3,F3A2,F2F4,C8DA,F2FB,F3A5,C3F8,F2FD,F3A7,F3A9,F3A4,F2FC,F3AB,F3AA,C2DD,F3AE,F3B0,F3A1,F3B1,F3AC,F3AF,F2FE,F3AD,F3B2,F3B4,F3A8,F3B3,F3B5,D0B7,F3B8,D9F9,F3B9,F3B7,C8E4,F3B6,F3BA,F3BB,B4C0,EEC3,F3BC,F3BD,D1AA,F4AC,D0C6,D0D0,D1DC,CFCE,BDD6,D1C3,BAE2,E1E9,D2C2,F1C2,B2B9,B1ED,F1C3,C9C0,B3C4,D9F2,CBA5,F1C4,D6D4,F1C5,F4C0,F1C6,D4AC,F1C7,B0C0,F4C1,F4C2,B4FC,C5DB,CCBB,D0E4,CDE0,F1C8,D9F3,B1BB,CFAE,B8A4,F1CA,F1CB,B2C3,C1D1,D7B0,F1C9,F1CC,F1CE,D9F6,D2E1,D4A3,F4C3,C8B9,F4C4,F1CD,F1CF,BFE3,F1D0,F1D4,F1D6,F1D1,C9D1,C5E1,C2E3,B9FC,F1D3,F1D5,B9D3,F1DB,BAD6,B0FD,F1D9,F1D8,F1D2,F1DA,F1D7,C8EC,CDCA,F1DD,E5BD,F1DC,F1DE,F1DF,CFE5,F4C5,BDF3,F1E0,F1E1,CEF7,D2AA,F1FB,B8B2,BCFB,B9DB,B9E6,C3D9,CAD3,EAE8,C0C0,BEF5,EAE9,EAEA,EAEB,EAEC,EAED,EAEE,EAEF,BDC7,F5FB,F5FD,F5FE,F5FC,BDE2,F6A1,B4A5,F6A2,F6A3,ECB2,D1D4,D9EA,F6A4,EEBA,D5B2,D3FE,CCDC,CAC4,E5C0,F6A5,BEAF,C6A9,DAA5,BCC6,B6A9,B8BC,C8CF,BCA5,DAA6,DAA7,CCD6,C8C3,DAA8,C6FD,D1B5,D2E9,D1B6,BCC7,BDB2,BBE4,DAA9,DAAA,D1C8,DAAB,D0ED,B6EF,C2DB,CBCF,B7ED,C9E8,B7C3,BEF7,D6A4,DAAC,DAAD,C6C0,D7E7,CAB6,D5A9,CBDF,D5EF,DAAE,D6DF,B4CA,DAB0,DAAF,D2EB,DAB1,DAB2,DAB3,CAD4,DAB4,CAAB,DAB5,DAB6,B3CF,D6EF,DAB7,BBB0,B5AE,DAB8,DAB9,B9EE,D1AF,D2E8,DABA,B8C3,CFEA,B2EF,DABB,DABC,BDEB,CEDC,D3EF,DABD,CEF3,DABE,D3D5,BBE5,DABF,CBB5,CBD0,DAC0,C7EB,D6EE,DAC1,C5B5,B6C1,DAC2,B7CC,BFCE,DAC3,DAC4,CBAD,DAC5,B5F7,DAC6,C1C2,D7BB,DAC7,CCB8,D2EA,C4B1,DAC8,B5FD,BBD1,DAC9,D0B3,DACA,DACB,CEBD,DACC,DACD,DACE,B2F7,DAD1,DACF,D1E8,DAD0,C3D5,DAD2,DAD3,DAD4,DAD5,D0BB,D2A5,B0F9,DAD6,C7AB,DAD7,BDF7,C3A1,DAD8,DAD9,C3FD,CCB7,DADA,DADB,C0BE,C6D7,DADC,DADD,C7B4,DADE,DADF,B9C8,BBED,B6B9,F4F8,F4F9,CDE3,F5B9,EBE0,CFF3,BBBF,BAC0,D4A5,E1D9,F5F4,B1AA,B2F2,F5F5,F5F7,BAD1,F5F6,C3B2,F5F9,F5F8,B1B4,D5EA,B8BA,B9B1,B2C6,D4F0,CFCD,B0DC,D5CB,BBF5,D6CA,B7B7,CCB0,C6B6,B1E1,B9BA,D6FC,B9E1,B7A1,BCFA,EADA,EADB,CCF9,B9F3,EADC,B4FB,C3B3,B7D1,BAD8,EADD,D4F4,EADE,BCD6,BBDF,EADF,C1DE,C2B8,D4DF,D7CA,EAE0,EAE1,EAE4,EAE2,EAE3,C9DE,B8B3,B6C4,EAE5,CAEA,C9CD,B4CD,E2D9,C5E2,EAE6,C0B5,D7B8,EAE7,D7AC,C8FC,D8D3,D8CD,D4DE,D4F9,C9C4,D3AE,B8D3,B3E0,C9E2,F4F6,BAD5,F4F7,D7DF,F4F1,B8B0,D5D4,B8CF,C6F0,B3C3,F4F2,B3AC,D4BD,C7F7,F4F4,F4F3,CCCB,C8A4,F4F5,D7E3,C5BF,F5C0,F5BB,F5C3,F5C2,D6BA,F5C1,D4BE,F5C4,F5CC,B0CF,B5F8,F5C9,F5CA,C5DC,F5C5,F5C6,F5C7,F5CB,BEE0,F5C8,B8FA,F5D0,F5D3,BFE7,B9F2,F5BC,F5CD,C2B7,CCF8,BCF9,F5CE,F5CF,F5D1,B6E5,F5D2,F5D5,F5BD,F5D4,D3BB,B3EC,CCA4,F5D6,F5D7,BEE1,F5D8,CCDF,F5DB,B2C8,D7D9,F5D9,F5DA,F5DC,F5E2,F5E0,F5DF,F5DD,F5E1,F5DE,F5E4,F5E5,CCE3,E5BF,B5B8,F5E3,F5E8,CCA3,F5E6,F5E7,F5BE,B1C4,F5BF,B5C5,B2E4,F5EC,F5E9,B6D7,F5ED,F5EA,F5EB,B4DA,D4EA,F5EE,B3F9,F5EF,F5F1,F5F0,F5F2,F5F3,C9ED,B9AA,C7FB,B6E3,CCC9,EAA6,B3B5,D4FE,B9EC,D0F9,E9ED,D7AA,E9EE,C2D6,C8ED,BAE4,E9EF,E9F0,E9F1,D6E1,E9F2,E9F3,E9F5,E9F4,E9F6,E9F7,C7E1,E9F8,D4D8,E9F9,BDCE,E9FA,E9FB,BDCF,E9FC,B8A8,C1BE,E9FD,B1B2,BBD4,B9F5,E9FE,EAA1,EAA2,EAA3,B7F8,BCAD,CAE4,E0CE,D4AF,CFBD,D5B7,EAA4,D5DE,EAA5,D0C1,B9BC,B4C7,B1D9,C0B1,B1E6,B1E7,B1E8,B3BD,C8E8,E5C1,B1DF,C1C9,B4EF,C7A8,D3D8,C6F9,D1B8,B9FD,C2F5,D3AD,D4CB,BDFC,E5C2,B7B5,E5C3,BBB9,D5E2,BDF8,D4B6,CEA5,C1AC,B3D9,CCF6,E5C6,E5C4,E5C8,E5CA,E5C7,B5CF,C6C8,B5FC,E5C5,CAF6,E5C9,C3D4,B1C5,BCA3,D7B7,CDCB,CBCD,CACA,CCD3,E5CC,E5CB,C4E6,D1A1,D1B7,E5CD,E5D0,CDB8,D6F0,E5CF,B5DD,CDBE,E5D1,B6BA,CDA8,B9E4,CAC5,B3D1,CBD9,D4EC,E5D2,B7EA,E5CE,E5D5,B4FE,E5D6,E5D3,E5D4,D2DD,C2DF,B1C6,D3E2,B6DD,CBEC,E5D7,D3F6,B1E9,B6F4,E5DA,E5D8,E5D9,B5C0,D2C5,E5DC,E5DE,E5DD,C7B2,D2A3,E5DB,D4E2,D5DA,E5E0,D7F1,E5E1,B1DC,D1FB,E5E2,E5E4,E5E3,E5E5,D2D8,B5CB,E7DF,DAF5,DAF8,DAF6,DAF7,DAFA,D0CF,C4C7,B0EE,D0B0,DAF9,D3CA,BAAA,DBA2,C7F1,DAFC,DAFB,C9DB,DAFD,DBA1,D7DE,DAFE,C1DA,DBA5,D3F4,DBA7,DBA4,DBA8,BDBC,C0C9,DBA3,DBA6,D6A3,DBA9,DBAD,DBAE,DBAC,BAC2,BFA4,DBAB,DBAA,D4C7,B2BF,DBAF,B9F9,DBB0,B3BB,B5A6,B6BC,DBB1,B6F5,DBB2,B1C9,DBB4,DBB3,DBB5,DBB7,DBB6,DBB8,DBB9,DBBA,D3CF,F4FA,C7F5,D7C3,C5E4,F4FC,F4FD,F4FB,BEC6,D0EF,B7D3,D4CD,CCAA,F5A2,F5A1,BAA8,F4FE,CBD6,F5A4,C0D2,B3EA,CDAA,F5A5,F5A3,BDB4,F5A8,F5A9,BDCD,C3B8,BFE1,CBE1,F5AA,F5A6,F5A7,C4F0,F5AC,B4BC,D7ED,B4D7,F5AB,F5AE,F5AD,F5AF,D0D1,C3D1,C8A9,F5B0,F5B1,F5B2,F5B3,F5B4,F5B5,F5B7,F5B6,F5B8,B2C9,D3D4,CACD,C0EF,D6D8,D2B0,C1BF,BDF0,B8AA,BCF8,F6C6,F6C7,F6C8,F6C9,F6CA,F6CC,F6CB,F7E9,F6CD,F6CE,EEC4,EEC5,EEC6,D5EB,B6A4,EEC8,EEC7,EEC9,EECA,C7A5,EECB,EECC,B7B0,B5F6,EECD,EECF,EECE,B8C6,EED0,EED1,EED2,B6DB,B3AE,D6D3,C4C6,B1B5,B8D6,EED3,EED4,D4BF,C7D5,BEFB,CED9,B9B3,EED6,EED5,EED8,EED7,C5A5,EED9,EEDA,C7AE,EEDB,C7AF,EEDC,B2A7,EEDD,EEDE,EEDF,EEE0,EEE1,D7EA,EEE2,EEE3,BCD8,EEE4,D3CB,CCFA,B2AC,C1E5,EEE5,C7A6,C3AD,EEE6,EEE7,EEE8,EEE9,EEEA,EEEB,EEEC,EEED,EEEE,EEEF,EEF0,EEF1,EEF2,EEF4,EEF3,EEF5,CDAD,C2C1,EEF6,EEF7,EEF8,D5A1,EEF9,CFB3,EEFA,EEFB,EEFC,EEFD,EFA1,EEFE,EFA2,B8F5,C3FA,EFA3,EFA4,BDC2,D2BF,B2F9,EFA5,EFA6,EFA7,D2F8,EFA8,D6FD,EFA9,C6CC,EFAA,EFAB,C1B4,EFAC,CFFA,CBF8,EFAE,EFAD,B3FA,B9F8,EFAF,EFB0,D0E2,EFB1,EFB2,B7E6,D0BF,EFB3,EFB4,EFB5,C8F1,CCE0,EFB6,EFB7,EFB8,EFB9,EFBA,D5E0,EFBB,B4ED,C3AA,EFBC,EFBD,EFBE,EFBF,CEFD,EFC0,C2E0,B4B8,D7B6,BDF5,CFC7,EFC3,EFC1,EFC2,EFC4,B6A7,BCFC,BEE2,C3CC,EFC5,EFC6,EFC7,EFCF,EFC8,EFC9,EFCA,C7C2,EFF1,B6CD,EFCB,EFCC,EFCD,B6C6,C3BE,EFCE,EFD0,EFD1,EFD2,D5F2,EFD3,C4F7,EFD4,C4F8,EFD5,EFD6,B8E4,B0F7,EFD7,EFD8,EFD9,EFDA,EFDB,EFDC,EFDD,EFDE,BEB5,EFE1,EFDF,EFE0,EFE2,EFE3,C1CD,EFE4,EFE5,EFE6,EFE7,EFE8,EFE9,EFEA,EFEB,EFEC,C0D8,EFED,C1AD,EFEE,EFEF,EFF0,CFE2,B3A4,C3C5,E3C5,C9C1,E3C6,B1D5,CECA,B4B3,C8F2,E3C7,CFD0,E3C8,BCE4,E3C9,E3CA,C3C6,D5A2,C4D6,B9EB,CEC5,E3CB,C3F6,E3CC,B7A7,B8F3,BAD2,E3CD,E3CE,D4C4,E3CF,E3D0,D1CB,E3D1,E3D2,E3D3,E3D4,D1D6,E3D5,B2FB,C0BB,E3D6,C0AB,E3D7,E3D8,E3D9,E3DA,E3DB,B8B7,DAE2,B6D3,DAE4,DAE3,DAE6,C8EE,DAE5,B7C0,D1F4,D2F5,D5F3,BDD7,D7E8,DAE8,DAE7,B0A2,CDD3,DAE9,B8BD,BCCA,C2BD,C2A4,B3C2,DAEA,C2AA,C4B0,BDB5,CFDE,DAEB,C9C2,B1DD,DAEC,B6B8,D4BA,B3FD,DAED,D4C9,CFD5,C5E3,DAEE,DAEF,DAF0,C1EA,CCD5,CFDD,D3E7,C2A1,DAF1,CBE5,DAF2,CBE6,D2FE,B8F4,DAF3,B0AF,CFB6,D5CF,CBED,DAF4,E3C4,C1A5,F6BF,F6C0,F6C1,C4D1,C8B8,D1E3,D0DB,D1C5,BCAF,B9CD,EFF4,B4C6,D3BA,F6C2,B3FB,F6C3,B5F1,F6C5,D3EA,F6A7,D1A9,F6A9,F6A8,C1E3,C0D7,B1A2,CEED,D0E8,F6AB,CFF6,F6AA,D5F0,F6AC,C3B9,BBF4,F6AE,F6AD,C4DE,C1D8,CBAA,CFBC,F6AF,F6B0,F6B1,C2B6,B0D4,C5F9,F6B2,C7E0,F6A6,BEB8,BEB2,B5E5,B7C7,BFBF,C3D2,C3E6,D8CC,B8EF,BDF9,D1A5,B0D0,F7B0,F7B1,D0AC,B0B0,F7B2,F7B3,F7B4,C7CA,BECF,F7B7,F7B6,B1DE,F7B5,F7B8,F7B9,CEA4,C8CD,BAAB,E8B8,E8B9,E8BA,BEC2,D2F4,D4CF,C9D8,D2B3,B6A5,C7EA,F1FC,CFEE,CBB3,D0EB,E7EF,CDE7,B9CB,B6D9,F1FD,B0E4,CBCC,F1FE,D4A4,C2AD,C1EC,C6C4,BEB1,F2A1,BCD5,F2A2,F2A3,F2A4,D2C3,C6B5,CDC7,F2A5,D3B1,BFC5,CCE2,F2A6,F2A7,D1D5,B6EE,F2A8,F2A9,B5DF,F2AA,F2AB,B2FC,F2AC,F2AD,C8A7,B7E7,ECA9,ECAA,ECAB,ECAC,C6AE,ECAD,ECAE,B7C9,CAB3,E2B8,F7CF,F7D0,B2CD,F7D1,F7D3,F7D2,E2BB,BCA2,E2BC,E2BD,E2BE,E2BF,E2C0,E2C1,B7B9,D2FB,BDA4,CACE,B1A5,CBC7,E2C2,B6FC,C8C4,E2C3,BDC8,B1FD,E2C4,B6F6,E2C5,C4D9,E2C6,CFDA,B9DD,E2C7,C0A1,E2C8,B2F6,E2C9,C1F3,E2CA,E2CB,C2F8,E2CC,E2CD,E2CE,CAD7,D8B8,D9E5,CFE3,F0A5,DCB0,C2ED,D4A6,CDD4,D1B1,B3DB,C7FD,B2B5,C2BF,E6E0,CABB,E6E1,E6E2,BED4,E6E3,D7A4,CDD5,E6E5,BCDD,E6E4,E6E6,E6E7,C2EE,BDBE,E6E8,C2E6,BAA7,E6E9,E6EA,B3D2,D1E9,BFA5,E6EB,C6EF,E6EC,E6ED,E6EE,C6AD,E6EF,C9A7,E6F0,E6F1,E6F2,E5B9,E6F3,E6F4,C2E2,E6F5,E6F6,D6E8,E6F7,E6F8,B9C7,F7BB,F7BA,F7BE,F7BC,BAA1,F7BF,F7C0,F7C2,F7C1,F7C4,F7C3,F7C5,F7C6,F7C7,CBE8,B8DF,F7D4,F7D5,F7D6,F7D8,F7DA,F7D7,F7DB,F7D9,D7D7,F7DC,F7DD,F7DE,F7DF,F7E0,DBCB,D8AA,E5F7,B9ED,BFFD,BBEA,F7C9,C6C7,F7C8,F7CA,F7CC,F7CB,F7CD,CEBA,F7CE,C4A7,D3E3,F6CF,C2B3,F6D0,F6D1,F6D2,F6D3,F6D4,F6D6,B1AB,F6D7,F6D8,F6D9,F6DA,F6DB,F6DC,F6DD,F6DE,CFCA,F6DF,F6E0,F6E1,F6E2,F6E3,F6E4,C0F0,F6E5,F6E6,F6E7,F6E8,F6E9,F6EA,F6EB,F6EC,F6ED,F6EE,F6EF,F6F0,F6F1,F6F2,F6F3,F6F4,BEA8,F6F5,F6F6,F6F7,F6F8,C8FA,F6F9,F6FA,F6FB,F6FC,F6FD,F6FE,F7A1,F7A2,F7A3,F7A4,F7A5,F7A6,F7A7,F7A8,B1EE,F7A9,F7AA,F7AB,F7AC,F7AD,C1DB,F7AE,F7AF,C4F1,F0AF,BCA6,F0B0,C3F9,C5B8,D1BB,F0B1,F0B2,F0B3,F0B4,F0B5,D1BC,D1EC,F0B7,F0B6,D4A7,CDD2,F0B8,F0BA,F0B9,F0BB,F0BC,B8EB,F0BD,BAE8,F0BE,F0BF,BEE9,F0C0,B6EC,F0C1,F0C2,F0C3,F0C4,C8B5,F0C5,F0C6,F0C7,C5F4,F0C8,F0C9,F0CA,F7BD,F0CB,F0CC,F0CD,F0CE,F0CF,BAD7,F0D0,F0D1,F0D2,F0D3,F0D4,F0D5,F0D6,F0D8,D3A5,F0D7,F0D9,F5BA,C2B9,F7E4,F7E5,F7E6,F7E7,F7E8,C2B4,F7EA,F7EB,C2F3,F4F0,F4EF,C2E9,F7E1,F7E2,BBC6,D9E4,CAF2,C0E8,F0A4,BADA,C7AD,C4AC,F7EC,F7ED,F7EE,F7F0,F7EF,F7F1,F7F4,F7F3,F7F2,F7F5,F7F6,EDE9,EDEA,EDEB,F6BC,F6BD,F6BE,B6A6,D8BE,B9C4,D8BB,DCB1,CAF3,F7F7,F7F8,F7F9,F7FB,F7FA,B1C7,F7FC,F7FD,F7FE,C6EB,ECB4,B3DD,F6B3,F6B4,C1E4,F6B5,F6B6,F6B7,F6B8,F6B9,F6BA,C8A3,F6BB,C1FA,B9A8,EDE8,B9EA,D9DF,A3A1,A3A2,A3A3,A1E7,A3A5,A3A6,A3A7,A3A8,A3A9,A3AA,A3AB,A3AC,A3AD,A3AE,A3AF,A3B0,A3B1,A3B2,A3B3,A3B4,A3B5,A3B6,A3B7,A3B8,A3B9,A3BA,A3BB,A3BC,A3BD,A3BE,A3BF,A3C0,A3C1,A3C2,A3C3,A3C4,A3C5,A3C6,A3C7,A3C8,A3C9,A3CA,A3CB,A3CC,A3CD,A3CE,A3CF,A3D0,A3D1,A3D2,A3D3,A3D4,A3D5,A3D6,A3D7,A3D8,A3D9,A3DA,A3DB,A3DC,A3DD,A3DE,A3DF,A3E0,A3E1,A3E2,A3E3,A3E4,A3E5,A3E6,A3E7,A3E8,A3E9,A3EA,A3EB,A3EC,A3ED,A3EE,A3EF,A3F0,A3F1,A3F2,A3F3,A3F4,A3F5,A3F6,A3F7,A3F8,A3F9,A3FA,A3FB,A3FC,A3FD,A1AB,A1E9,A1EA,A3FE,A3A4';
		PinYin.spellArray=[];
		PinYin.pn="";
		__static(PinYin,
		['spell',function(){return this.spell={0xB0A1:"a",0xB0A3:"ai",0xB0B0:"an",0xB0B9:"ang",0xB0BC:"ao",0xB0C5:"ba",0xB0D7:"bai",0xB0DF:"ban",0xB0EE:"bang",0xB0FA:"bao",0xB1AD:"bei",0xB1BC:"ben",0xB1C0:"beng",0xB1C6:"bi",0xB1DE:"bian",0xB1EA:"biao",0xB1EE:"bie",0xB1F2:"bin",0xB1F8:"bing",0xB2A3:"bo",0xB2B8:"bu",0xB2C1:"ca",0xB2C2:"cai",0xB2CD:"can",0xB2D4:"cang",0xB2D9:"cao",0xB2DE:"ce",0xB2E3:"ceng",0xB2E5:"cha",0xB2F0:"chai",0xB2F3:"chan",0xB2FD:"chang",0xB3AC:"chao",0xB3B5:"che",0xB3BB:"chen",0xB3C5:"cheng",0xB3D4:"chi",0xB3E4:"chong",0xB3E9:"chou",0xB3F5:"chu",0xB4A7:"chuai",0xB4A8:"chuan",0xB4AF:"chuang",0xB4B5:"chui",0xB4BA:"chun",0xB4C1:"chuo",0xB4C3:"ci",0xB4CF:"cong",0xB4D5:"cou",0xB4D6:"cu",0xB4DA:"cuan",0xB4DD:"cui",0xB4E5:"cun",0xB4E8:"cuo",0xB4EE:"da",0xB4F4:"dai",0xB5A2:"dan",0xB5B1:"dang",0xB5B6:"dao",0xB5C2:"de",0xB5C5:"deng",0xB5CC:"di",0xB5DF:"dian",0xB5EF:"diao",0xB5F8:"die",0xB6A1:"ding",0xB6AA:"diu",0xB6AB:"dong",0xB6B5:"dou",0xB6BC:"du",0xB6CB:"duan",0xB6D1:"dui",0xB6D5:"dun",0xB6DE:"duo",0xB6EA:"e",0xB6F7:"en",0xB6F8:"er",0xB7A2:"fa",0xB7AA:"fan",0xB7BB:"fang",0xB7C6:"fei",0xB7D2:"fen",0xB7E1:"feng",0xB7F0:"fo",0xB7F1:"fou",0xB7F2:"fu",0xB8C1:"ga",0xB8C3:"gai",0xB8C9:"gan",0xB8D4:"gang",0xB8DD:"gao",0xB8E7:"ge",0xB8F8:"gei",0xB8F9:"gen",0xB8FB:"geng",0xB9A4:"gong",0xB9B3:"gou",0xB9BC:"gu",0xB9CE:"gua",0xB9D4:"guai",0xB9D7:"guan",0xB9E2:"guang",0xB9E5:"gui",0xB9F5:"gun",0xB9F8:"guo",0xB9FE:"ha",0xBAA1:"hai",0xBAA8:"han",0xBABB:"hang",0xBABE:"hao",0xBAC7:"he",0xBAD9:"hei",0xBADB:"hen",0xBADF:"heng",0xBAE4:"hong",0xBAED:"hou",0xBAF4:"hu",0xBBA8:"hua",0xBBB1:"huai",0xBBB6:"huan",0xBBC4:"huang",0xBBD2:"hui",0xBBE7:"hun",0xBBED:"huo",0xBBF7:"ji",0xBCCE:"jia",0xBCDF:"jian",0xBDA9:"jiang",0xBDB6:"jiao",0xBDD2:"jie",0xBDED:"jin",0xBEA3:"jing",0xBEBC:"jiong",0xBEBE:"jiu",0xBECF:"ju",0xBEE8:"juan",0xBEEF:"jue",0xBEF9:"jun",0xBFA6:"ka",0xBFAA:"kai",0xBFAF:"kan",0xBFB5:"kang",0xBFBC:"kao",0xBFC0:"ke",0xBFCF:"ken",0xBFD3:"keng",0xBFD5:"kong",0xBFD9:"kou",0xBFDD:"ku",0xBFE4:"kua",0xBFE9:"kuai",0xBFED:"kuan",0xBFEF:"kuang",0xBFF7:"kui",0xC0A4:"kun",0xC0A8:"kuo",0xC0AC:"la",0xC0B3:"lai",0xC0B6:"lan",0xC0C5:"lang",0xC0CC:"lao",0xC0D5:"le",0xC0D7:"lei",0xC0E2:"leng",0xC0E5:"li",0xC1A9:"lia",0xC1AA:"lian",0xC1B8:"liang",0xC1C3:"liao",0xC1D0:"lie",0xC1D5:"lin",0xC1E1:"ling",0xC1EF:"liu",0xC1FA:"long",0xC2A5:"lou",0xC2AB:"lu",0xC2BF:"lv",0xC2CD:"luan",0xC2D3:"lue",0xC2D5:"lun",0xC2DC:"luo",0xC2E8:"ma",0xC2F1:"mai",0xC2F7:"man",0xC3A2:"mang",0xC3A8:"mao",0xC3B4:"me",0xC3B5:"mei",0xC3C5:"men",0xC3C8:"meng",0xC3D0:"mi",0xC3DE:"mian",0xC3E7:"miao",0xC3EF:"mie",0xC3F1:"min",0xC3F7:"ming",0xC3FD:"miu",0xC3FE:"mo",0xC4B1:"mou",0xC4B4:"mu",0xC4C3:"na",0xC4CA:"nai",0xC4CF:"nan",0xC4D2:"nang",0xC4D3:"nao",0xC4D8:"ne",0xC4D9:"nei",0xC4DB:"nen",0xC4DC:"neng",0xC4DD:"ni",0xC4E8:"nian",0xC4EF:"niang",0xC4F1:"niao",0xC4F3:"nie",0xC4FA:"nin",0xC4FB:"ning",0xC5A3:"niu",0xC5A7:"nong",0xC5AB:"nu",0xC5AE:"nv",0xC5AF:"nuan",0xC5B0:"nue",0xC5B2:"nuo",0xC5B6:"o",0xC5B7:"ou",0xC5BE:"pa",0xC5C4:"pai",0xC5CA:"pan",0xC5D2:"pang",0xC5D7:"pao",0xC5DE:"pei",0xC5E7:"pen",0xC5E9:"peng",0xC5F7:"pi",0xC6AA:"pian",0xC6AE:"piao",0xC6B2:"pie",0xC6B4:"pin",0xC6B9:"ping",0xC6C2:"po",0xC6CB:"pu",0xC6DA:"qi",0xC6FE:"qia",0xC7A3:"qian",0xC7B9:"qiang",0xC7C1:"qiao",0xC7D0:"qie",0xC7D5:"qin",0xC7E0:"qing",0xC7ED:"qiong",0xC7EF:"qiu",0xC7F7:"qu",0xC8A6:"quan",0xC8B1:"que",0xC8B9:"qun",0xC8BB:"ran",0xC8BF:"rang",0xC8C4:"rao",0xC8C7:"re",0xC8C9:"ren",0xC8D3:"reng",0xC8D5:"ri",0xC8D6:"rong",0xC8E0:"rou",0xC8E3:"ru",0xC8ED:"ruan",0xC8EF:"rui",0xC8F2:"run",0xC8F4:"ruo",0xC8F6:"sa",0xC8F9:"sai",0xC8FD:"san",0xC9A3:"sang",0xC9A6:"sao",0xC9AA:"se",0xC9AD:"sen",0xC9AE:"seng",0xC9AF:"sha",0xC9B8:"shai",0xC9BA:"shan",0xC9CA:"shang",0xC9D2:"shao",0xC9DD:"she",0xC9E9:"shen",0xC9F9:"sheng",0xCAA6:"shi",0xCAD5:"shou",0xCADF:"shu",0xCBA2:"shua",0xCBA4:"shuai",0xCBA8:"shuan",0xCBAA:"shuang",0xCBAD:"shui",0xCBB1:"shun",0xCBB5:"shuo",0xCBB9:"si",0xCBC9:"song",0xCBD1:"sou",0xCBD4:"su",0xCBE1:"suan",0xCBE4:"sui",0xCBEF:"sun",0xCBF2:"suo",0xCBFA:"ta",0xCCA5:"tai",0xCCAE:"tan",0xCCC0:"tang",0xCCCD:"tao",0xCCD8:"te",0xCCD9:"teng",0xCCDD:"ti",0xCCEC:"tian",0xCCF4:"tiao",0xCCF9:"tie",0xCCFC:"ting",0xCDA8:"tong",0xCDB5:"tou",0xCDB9:"tu",0xCDC4:"tuan",0xCDC6:"tui",0xCDCC:"tun",0xCDCF:"tuo",0xCDDA:"wa",0xCDE1:"wai",0xCDE3:"wan",0xCDF4:"wang",0xCDFE:"wei",0xCEC1:"wen",0xCECB:"weng",0xCECE:"wo",0xCED7:"wu",0xCEF4:"xi",0xCFB9:"xia",0xCFC6:"xian",0xCFE0:"xiang",0xCFF4:"xiao",0xD0A8:"xie",0xD0BD:"xin",0xD0C7:"xing",0xD0D6:"xiong",0xD0DD:"xiu",0xD0E6:"xu",0xD0F9:"xuan",0xD1A5:"xue",0xD1AB:"xun",0xD1B9:"ya",0xD1C9:"yan",0xD1EA:"yang",0xD1FB:"yao",0xD2AC:"ye",0xD2BB:"yi",0xD2F0:"yin",0xD3A2:"ying",0xD3B4:"yo",0xD3B5:"yong",0xD3C4:"you",0xD3D9:"yu",0xD4A7:"yuan",0xD4BB:"yue",0xD4C5:"yun",0xD4D1:"za",0xD4D4:"zai",0xD4DB:"zan",0xD4DF:"zang",0xD4E2:"zao",0xD4F0:"ze",0xD4F4:"zei",0xD4F5:"zen",0xD4F6:"zeng",0xD4FA:"zha",0xD5AA:"zhai",0xD5B0:"zhan",0xD5C1:"zhang",0xD5D0:"zhao",0xD5DA:"zhe",0xD5E4:"zhen",0xD5F4:"zheng",0xD6A5:"zhi",0xD6D0:"zhong",0xD6DB:"zhou",0xD6E9:"zhu",0xD7A5:"zhua",0xD7A7:"zhuai",0xD7A8:"zhuan",0xD7AE:"zhuang",0xD7B5:"zhui",0xD7BB:"zhun",0xD7BD:"zhuo",0xD7C8:"zi",0xD7D7:"zong",0xD7DE:"zou",0xD7E2:"zu",0xD7EA:"zuan",0xD7EC:"zui",0xD7F0:"zun",0xD7F2:"zuo"};}
		]);
		return PinYin;
	})()


	//class tools.Pool
	var Pool=(function(){
		function Pool(){};
		__class(Pool,'tools.Pool');
		Pool.getOB=function(AClass,param){
			var arr=Pool._pool[AClass];
			if(arr==null || arr.length==0){
				var mesh;
				if(param!=null){
					mesh=new AClass(param);
					}else{
					mesh=new AClass();
				}
				return mesh;
			}
			return arr.shift();
		}

		Pool.returnOB=function(ob,AClass){
			var arr=Pool._pool[AClass];
			if(arr==null){
				arr=[];
			}
			arr.push(ob);
			Pool._pool[AClass]=arr;
		}

		__static(Pool,
		['_pool',function(){return this._pool=new Object();}
		]);
		return Pool;
	})()


	/**
	*
	*
	*/
	//class com.adobe.serialization.json.JSONParseError extends Error
	var JSONParseError=(function(_super){
		function JSONParseError(message,location,text){
			this._location=0;
			this._text=null;
			(message===void 0)&& (message="");
			(location===void 0)&& (location=0);
			(text===void 0)&& (text="");
			JSONParseError.__super.call(this,message);
			/*no*/this.name="JSONParseError";
			this._location=location;
			this._text=text;
		}

		__class(JSONParseError,'com.adobe.serialization.json.JSONParseError',Error);
		var __proto=JSONParseError.prototype;
		/**
		*Provides read-only access to the text variable.
		*
		*@return The string in which the error occurred
		*@langversion ActionScript 3.0
		*@playerversion Flash 9.0
		*@tiptext
		*/
		__getset(0,__proto,'text',function(){
			return this._text;
		});

		/**
		*Provides read-only access to the location variable.
		*
		*@return The location in the string where the error occurred
		*@langversion ActionScript 3.0
		*@playerversion Flash 9.0
		*@tiptext
		*/
		__getset(0,__proto,'location',function(){
			return this._location;
		});

		return JSONParseError;
	})(Error)


	//class fairygui.utils.ColorMatrix extends Array
	var ColorMatrix=(function(_super){
		// initialization:
		function ColorMatrix(){
			ColorMatrix.__super.call(this);
			this.reset();
		}

		__class(ColorMatrix,'fairygui.utils.ColorMatrix',Array);
		var __proto=ColorMatrix.prototype;
		// public methods:
		__proto.reset=function(){
			for (var i=0;i<ColorMatrix.LENGTH;i++){
				this[i]=ColorMatrix.IDENTITY_MATRIX[i];
			}
		}

		__proto.invert=function(){
			this.multiplyMatrix([-1,0,0,0,255,
			0,-1,0,0,255,
			0,0,-1,0,255,
			0,0,0,1,0]);
		}

		__proto.adjustColor=function(p_brightness,p_contrast,p_saturation,p_hue){
			this.adjustHue(p_hue);
			this.adjustContrast(p_contrast);
			this.adjustBrightness(p_brightness);
			this.adjustSaturation(p_saturation);
		}

		__proto.adjustBrightness=function(p_val){
			p_val=this.cleanValue(p_val,1)*255;
			this.multiplyMatrix([
			1,0,0,0,p_val,
			0,1,0,0,p_val,
			0,0,1,0,p_val,
			0,0,0,1,0]);
		}

		__proto.adjustContrast=function(p_val){
			p_val=this.cleanValue(p_val,1);
			var s=p_val+1;
			var o=128 *(1-s);
			this.multiplyMatrix([
			s,0,0,0,o,
			0,s,0,0,o,
			0,0,s,0,o,
			0,0,0,1,0]);
		}

		__proto.adjustSaturation=function(p_val){
			p_val=this.cleanValue(p_val,1);
			p_val+=1;
			var invSat=1-p_val;
			var invLumR=invSat *0.299;
			var invLumG=invSat *0.587;
			var invLumB=invSat *0.114;
			this.multiplyMatrix([
			(invLumR+p_val),invLumG,invLumB,0,0,
			invLumR,(invLumG+p_val),invLumB,0,0,
			invLumR,invLumG,(invLumB+p_val),0,0,
			0,0,0,1,0]);
		}

		__proto.adjustHue=function(p_val){
			p_val=this.cleanValue(p_val,1);
			p_val *=Math.PI;
			var cos=Math.cos(p_val);
			var sin=Math.sin(p_val);
			this.multiplyMatrix([
			((0.299+(cos *(1-0.299)))+(sin *-(0.299))),((0.587+(cos *-(0.587)))+(sin *-(0.587))),((0.114+(cos *-(0.114)))+(sin *(1-0.114))),0,0,
			((0.299+(cos *-(0.299)))+(sin *0.143)),((0.587+(cos *(1-0.587)))+(sin *0.14)),((0.114+(cos *-(0.114)))+(sin *-0.283)),0,0,
			((0.299+(cos *-(0.299)))+(sin *-((1-0.299)))),((0.587+(cos *-(0.587)))+(sin *0.587)),((0.114+(cos *(1-0.114)))+(sin *0.114)),0,0,
			0,0,0,1,0]);
		}

		__proto.concat=function(p_matrix){
			if (p_matrix.length !=ColorMatrix.LENGTH){return;}
				this.multiplyMatrix(p_matrix);
		}

		__proto.clone=function(){
			var result=new ColorMatrix();
			result.copyMatrix(this);
			return result;
		}

		__proto.copyMatrix=function(p_matrix){
			var l=ColorMatrix.LENGTH;
			for (var i=0;i<l;i++){
				this[i]=p_matrix[i];
			}
		}

		__proto.multiplyMatrix=function(p_matrix){
			var col=[];
			var i=0;
			for (var y=0;y<4;++y){
				for (var x=0;x<5;++x){
					col[i+x]=p_matrix[i] *this[x]+
					p_matrix[i+1] *this[x+5]+
					p_matrix[i+2] *this[x+10]+
					p_matrix[i+3] *this[x+15]+
					(x==4 ? p_matrix[i+4] :0);
				}
				i+=5;
			}
			this.copyMatrix(col);
		}

		__proto.cleanValue=function(p_val,p_limit){
			return Math.min(p_limit,Math.max(-p_limit,p_val));
		}

		ColorMatrix.create=function(p_brightness,p_contrast,p_saturation,p_hue){
			var ret=new ColorMatrix();
			ret.adjustColor(p_brightness,p_contrast,p_saturation,p_hue);
			return ret;
		}

		ColorMatrix.LUMA_R=0.299;
		ColorMatrix.LUMA_G=0.587;
		ColorMatrix.LUMA_B=0.114;
		__static(ColorMatrix,
		['IDENTITY_MATRIX',function(){return this.IDENTITY_MATRIX=[
			1,0,0,0,0,
			0,1,0,0,0,
			0,0,1,0,0,
			0,0,0,1,0];},'LENGTH',function(){return this.LENGTH=ColorMatrix.IDENTITY_MATRIX.length;}
		]);
		return ColorMatrix;
	})(Array)


	/**
	*AssetLoader errors.
	*
	*@author Matan Uberstein
	*/
	//class org.assetloader.base.AssetLoaderError extends Error
	var AssetLoaderError=(function(_super){
		function AssetLoaderError(message,id){
			(message===void 0)&& (message="");
			(id===void 0)&& (id=0);
			AssetLoaderError.__super.call(this,"[AssetLoaderError] "+message,id);
		}

		__class(AssetLoaderError,'org.assetloader.base.AssetLoaderError',Error);
		AssetLoaderError.COULD_NOT_PARSE_CONFIG=function(id,message){
			return "AssetLoader ("+id+"), Could not parse config, message from parser: "+message;
		}

		AssetLoaderError.ALREADY_CONTAINS_LOADER_WITH_ID=function(parentId,childId){
			return "AssetLoader ("+parentId+") already contains a child with the same id ("+childId+").";
		}

		AssetLoaderError.CIRCULAR_REFERENCE_FOUND=function(id){
			return "AssetLoader ("+id+") has detected that somewhere in it's loading queue it contains itself.";
		}

		AssetLoaderError.ALREADY_CONTAINED_BY_OTHER=function(id,currentParentId){
			return "Loader ("+id+") is already contained by IAssetLoader ("+currentParentId+"). Remove from parent first.";
		}

		AssetLoaderError.INVALID_URL="Asset's url is invalid.";
		AssetLoaderError.ASSET_TYPE_NOT_RECOGNIZED="Asset type not recognized. Try an asset type found on org.assetloader.base.AssetType .";
		AssetLoaderError.ASSET_AUTO_TYPE_NOT_FOUND="Could not determine asset's type automatically. Please set the asset's type.";
		AssetLoaderError.ALREADY_CONTAINS_LOADER="Already contains this instance of ILoader.";
		AssetLoaderError.DOESNT_CONTAIN_LOADER="Does not contain this instance of ILoader, thus it cannot be removed.";
		return AssetLoaderError;
	})(Error)


	/**
	*Provides a fast signal for use where one parameter is dispatched with the signal.
	*/
	//class ash.signals.Signal1 extends ash.signals.SignalBase
	var Signal1=(function(_super){
		function Signal1(type){
			this.type=null;
			Signal1.__super.call(this);
			this.type=type;
		}

		__class(Signal1,'ash.signals.Signal1',_super);
		var __proto=Signal1.prototype;
		__proto.dispatch=function(object){
			this.startDispatch();
			var node;
			for (node=/*no*/this.head;node;node=node.next){
				node.listener(object);
				if(node.once){
					this.remove(node.listener);
				}
			}
			this.endDispatch();
		}

		return Signal1;
	})(SignalBase)


	/**
	*Provides a fast signal for use where three parameters are dispatched with the signal.
	*/
	//class ash.signals.Signal3 extends ash.signals.SignalBase
	var Signal3=(function(_super){
		function Signal3(type1,type2,type3){
			this.type1=null;
			this.type2=null;
			this.type3=null;
			Signal3.__super.call(this);
			this.type1=type1;
			this.type2=type2;
			this.type3=type3;
		}

		__class(Signal3,'ash.signals.Signal3',_super);
		var __proto=Signal3.prototype;
		__proto.dispatch=function(object1,object2,object3){
			this.startDispatch();
			var node;
			for (node=/*no*/this.head;node;node=node.next){
				node.listener(object1,object2,object3);
				if(node.once){
					this.remove(node.listener);
				}
			}
			this.endDispatch();
		}

		return Signal3;
	})(SignalBase)


	//class fairygui.GGroup extends fairygui.GObject
	var GGroup=(function(_super){
		function GGroup(){
			this._layout=0;
			this._lineGap=0;
			this._columnGap=0;
			this._percentReady=false;
			this._boundsChanged=false;
			this._updating=0;
			GGroup.__super.call(this);
		}

		__class(GGroup,'fairygui.GGroup',_super);
		var __proto=GGroup.prototype;
		__proto.setBoundsChangedFlag=function(childSizeChanged){
			(childSizeChanged===void 0)&& (childSizeChanged=false);
			if (this._updating==0 && this.parent !=null){
				if (childSizeChanged)
					this._percentReady=false;
				if(!this._boundsChanged){
					this._boundsChanged=true;
					if(this._layout!=0)
						GTimers.inst.callLater(this.ensureBoundsCorrect);
				}
			}
		}

		__proto.ensureBoundsCorrect=function(){
			if (this._boundsChanged)
				this.updateBounds();
		}

		__proto.updateBounds=function(){
			GTimers.inst.remove(this.ensureBoundsCorrect);
			this._boundsChanged=false;
			if (this.parent==null)
				return;
			this.handleLayout();
			var cnt=/*no*/this._parent.numChildren;
			var i=0;
			var child;
			var ax=/*no*/this.int.MAX_VALUE,ay=/*no*/this.int.MAX_VALUE;
			var ar=/*no*/this.int.MIN_VALUE,ab=/*no*/this.int.MIN_VALUE;
			var tmp=0;
			var empty=true;
			for(i=0;i<cnt;i++){
				child=/*no*/this._parent.getChildAt(i);
				if(child.group==this){
					tmp=child.x;
					if(tmp<ax)
						ax=tmp;
					tmp=child.y;
					if(tmp<ay)
						ay=tmp;
					tmp=child.x+child.width;
					if(tmp>ar)
						ar=tmp;
					tmp=child.y+child.height;
					if(tmp>ab)
						ab=tmp;
					empty=false;
				}
			}
			if (!empty){
				this._updating=1;
				this.setXY(ax,ay);
				this._updating=2;
				this.setSize(ar-ax,ab-ay);
			}
			else{
				this._updating=2;
				this.setSize(0,0);
			}
			this._updating=0;
		}

		__proto.handleLayout=function(){
			this._updating |=1;
			var child;
			var i=0;
			var cnt=0;
			if (this._layout==1){
				var curX=NaN;
				cnt=this.parent.numChildren;
				for (i=0;i < cnt;i++){
					child=this.parent.getChildAt(i);
					if (child.group !=this)
						continue ;
					if (isNaN(curX))
						curX=int(child.x);
					else
					child.x=curX;
					if (child.width !=0)
						curX+=int(child.width+this._columnGap);
				}
				if (!this._percentReady)
					this.updatePercent();
			}
			else if (this._layout==2){
				var curY=NaN;
				cnt=this.parent.numChildren;
				for (i=0;i < cnt;i++){
					child=this.parent.getChildAt(i);
					if (child.group !=this)
						continue ;
					if (isNaN(curY))
						curY=int(child.y);
					else
					child.y=curY;
					if (child.height !=0)
						curY+=int(child.height+this._lineGap);
				}
				if (!this._percentReady)
					this.updatePercent();
			}
			this._updating &=2;
		}

		__proto.updatePercent=function(){
			this._percentReady=true;
			var cnt=this.parent.numChildren;
			var i=0;
			var child;
			var size=0;
			if (this._layout==1){
				for (i=0;i < cnt;i++){
					child=this.parent.getChildAt(i);
					if (child.group !=this)
						continue ;
					size+=child.width;
				}
				for (i=0;i < cnt;i++){
					child=this.parent.getChildAt(i);
					if (child.group !=this)
						continue ;
					if (size > 0)
						child._sizePercentInGroup=child.width / size;
					else
					child._sizePercentInGroup=0;
				}
			}
			else{
				for (i=0;i < cnt;i++){
					child=this.parent.getChildAt(i);
					if (child.group !=this)
						continue ;
					size+=child.height;
				}
				for (i=0;i < cnt;i++){
					child=this.parent.getChildAt(i);
					if (child.group !=this)
						continue ;
					if (size > 0)
						child._sizePercentInGroup=child.height / size;
					else
					child._sizePercentInGroup=0;
				}
			}
		}

		__proto.moveChildren=function(dx,dy){
			if ((this._updating & 1)!=0 || this.parent==null)
				return;
			this._updating |=1;
			var cnt=this.parent.numChildren;
			var i=0;
			var child;
			for (i=0;i < cnt;i++){
				child=this.parent.getChildAt(i);
				if (child.group==this){
					child.setXY(child.x+dx,child.y+dy);
				}
			}
			this._updating &=2;
		}

		__proto.resizeChildren=function(dw,dh){
			if (this._layout==0 || (this._updating & 2)!=0 || this.parent==null)
				return;
			this._updating |=2;
			if (!this._percentReady)
				this.updatePercent();
			var cnt=this.parent.numChildren;
			var i=0;
			var j=0;
			var child;
			var last=-1;
			var numChildren=0;
			var lineSize=0;
			var remainSize=0;
			var found=false;
			for (i=0;i < cnt;i++){
				child=this.parent.getChildAt(i);
				if (child.group !=this)
					continue ;
				last=i;
				numChildren++;
			}
			if (this._layout==1){
				remainSize=lineSize=this.width-(numChildren-1)*this._columnGap;
				var curX=NaN;
				var nw=NaN;
				for (i=0;i < cnt;i++){
					child=this.parent.getChildAt(i);
					if (child.group !=this)
						continue ;
					if (isNaN(curX))
						curX=int(child.x);
					else
					child.x=curX;
					if (last==i)
						nw=remainSize;
					else
					nw=Math.round(child._sizePercentInGroup *lineSize);
					child.setSize(nw,child._rawHeight+dh,true);
					remainSize-=child.width;
					if (last==i){
						if (remainSize >=1){
							for (j=0;j <=i;j++){
								child=this.parent.getChildAt(j);
								if (child.group !=this)
									continue ;
								if (!found){
									nw=child.width+remainSize;
									if ((child.maxWidth==0 || nw < child.maxWidth)
										&& (child.minWidth==0 || nw > child.minWidth)){
										child.setSize(nw,child.height,true);
										found=true;
									}
								}
								else
								child.x+=remainSize;
							}
						}
					}
					else
					curX+=(child.width+this._columnGap);
				}
			}
			else if (this._layout==2){
				remainSize=lineSize=this.height-(numChildren-1)*this._lineGap;
				var curY=NaN;
				var nh=NaN;
				for (i=0;i < cnt;i++){
					child=this.parent.getChildAt(i);
					if (child.group !=this)
						continue ;
					if (isNaN(curY))
						curY=int(child.y);
					else
					child.y=curY;
					if (last==i)
						nh=remainSize;
					else
					nh=Math.round(child._sizePercentInGroup *lineSize);
					child.setSize(child._rawWidth+dw,nh,true);
					remainSize-=child.height;
					if (last==i){
						if (remainSize >=1){
							for (j=0;j <=i;j++){
								child=this.parent.getChildAt(j);
								if (child.group !=this)
									continue ;
								if (!found){
									nh=child.height+remainSize;
									if ((child.maxHeight==0 || nh < child.maxHeight)
										&& (child.minHeight==0 || nh > child.minHeight)){
										child.setSize(child.width,nh,true);
										found=true;
									}
								}
								else
								child.y+=remainSize;
							}
						}
					}
					else
					curY+=(child.height+this._lineGap);
				}
			}
			this._updating &=1;
		}

		__proto.updateAlpha=function(){
			_super.prototype.updateAlpha.call(this);
			if(this._underConstruct)
				return;
			var cnt=/*no*/this._parent.numChildren;
			for(var i=0;i<cnt;i++){
				var child=/*no*/this._parent.getChildAt(i);
				if(child.group==this)
					child.alpha=this.alpha;
			}
		}

		__proto.setup_beforeAdd=function(xml){
			_super.prototype.setup_beforeAdd.call(this,xml);
			var str;
			str=xml.getAttribute('layout');
			if (str !=null){
				this._layout=GroupLayoutType.parse(str);
				str=xml.getAttribute('lineGap');
				if(str)
					this._lineGap=parseInt(str);
				str=xml.getAttribute('colGap');
				if(str)
					this._columnGap=parseInt(str);
			}
		}

		__getset(0,__proto,'layout',function(){
			return this._layout;
			},function(value){
			if(this._layout !=value){
				this._layout=value;
				this.setBoundsChangedFlag(true);
			}
		});

		__getset(0,__proto,'columnGap',function(){
			return this._columnGap;
			},function(value){
			if(this._columnGap !=value){
				this._columnGap=value;
				this.setBoundsChangedFlag();
			}
		});

		__getset(0,__proto,'lineGap',function(){
			return this._lineGap;
			},function(value){
			if(this._lineGap !=value){
				this._lineGap=value;
				this.setBoundsChangedFlag();
			}
		});

		return GGroup;
	})(GObject)


	//class fairygui.action.ChangePageAction extends fairygui.action.ControllerAction
	var ChangePageAction=(function(_super){
		function ChangePageAction(){
			this.objectId=null;
			this.controllerName=null;
			this.targetPage=null;
			ChangePageAction.__super.call(this);
		}

		__class(ChangePageAction,'fairygui.action.ChangePageAction',_super);
		var __proto=ChangePageAction.prototype;
		__proto.enter=function(controller){
			if(!this.controllerName)
				return;
			var gcom;
			if(this.objectId)
				gcom=controller.parent.getChildById(this.objectId);
			else
			gcom=controller.parent;
			if(gcom){
				var cc=gcom.getController(this.controllerName);
				if(cc && cc!=controller && !cc.changing)
					cc.selectedPageId=this.targetPage;
			}
		}

		__proto.setup=function(xml){
			_super.prototype.setup.call(this,xml);
			this.objectId=xml.getAttribute('objectId');
			this.controllerName=xml.getAttribute('controller');
			this.targetPage=xml.getAttribute('targetPage');
		}

		return ChangePageAction;
	})(ControllerAction)


	//class fairygui.action.PlayTransitionAction extends fairygui.action.ControllerAction
	var PlayTransitionAction=(function(_super){
		function PlayTransitionAction(){
			this.transitionName=null;
			this.repeat=0;
			this.delay=NaN;
			this.stopOnExit=false;
			this._currentTransition=null;
			PlayTransitionAction.__super.call(this);
			this.repeat=1;
			this.delay=0;
		}

		__class(PlayTransitionAction,'fairygui.action.PlayTransitionAction',_super);
		var __proto=PlayTransitionAction.prototype;
		__proto.enter=function(controller){
			var trans=controller.parent.getTransition(this.transitionName);
			if(trans){
				if(this._currentTransition && this._currentTransition.playing)
					trans.changeRepeat(this.repeat);
				else
				trans.play(null,null,this.repeat,this.delay);
				this._currentTransition=trans;
			}
		}

		__proto.leave=function(controller){
			if(this.stopOnExit && this._currentTransition){
				this._currentTransition.stop();
				this._currentTransition=null;
			}
		}

		__proto.setup=function(xml){
			_super.prototype.setup.call(this,xml);
			this.transitionName=xml.getAttribute('transition');
			var str;
			str=xml.getAttribute('repeat');
			if(str)
				this.repeat=parseInt(str);
			str=xml.getAttribute('delay');
			if(str)
				this.delay=parseFloat(str);
			str=xml.getAttribute('stopOnExit');
			this.stopOnExit=str=="true";
		}

		return PlayTransitionAction;
	})(ControllerAction)


	//class fairygui.display.UIMovieClip extends fairygui.display.MovieClip
	var UIMovieClip=(function(_super){
		function UIMovieClip(owner){
			this._owner=null;
			UIMovieClip.__super.call(this);
			this._owner=owner;
		}

		__class(UIMovieClip,'fairygui.display.UIMovieClip',_super);
		var __proto=UIMovieClip.prototype;
		Laya.imps(__proto,{"fairygui.display.UIDisplayObject":true})
		__getset(0,__proto,'owner',function(){
			return this._owner;
		});

		return UIMovieClip;
	})(MovieClip)


	//class fairygui.display.UIRichTextField extends fairygui.text.RichTextField
	var UIRichTextField=(function(_super){
		function UIRichTextField(owner){
			this._owner=null;
			UIRichTextField.__super.call(this);
			this._owner=owner;
		}

		__class(UIRichTextField,'fairygui.display.UIRichTextField',_super);
		var __proto=UIRichTextField.prototype;
		Laya.imps(__proto,{"fairygui.display.UIDisplayObject":true})
		__getset(0,__proto,'owner',function(){
			return this._owner;
		});

		return UIRichTextField;
	})(RichTextField)


	//class fairygui.GearAnimation extends fairygui.GearBase
	var GearAnimation=(function(_super){
		var GearAnimationValue;
		function GearAnimation(owner){
			this._storage=null;
			this._default=null;
			GearAnimation.__super.call(this,owner);
		}

		__class(GearAnimation,'fairygui.GearAnimation',_super);
		var __proto=GearAnimation.prototype;
		__proto.init=function(){
			this._default=new GearAnimationValue((this._owner).playing,(this._owner).frame);
			this._storage={};
		}

		__proto.addStatus=function(pageId,value){
			if(value=="-" || value.length==0)
				return;
			var gv;
			if(pageId==null)
				gv=this._default;
			else{
				gv=new GearAnimationValue();
				this._storage[pageId]=gv;
			};
			var arr=value.split(",");
			gv.frame=int(arr[0]);
			gv.playing=arr[1]=="p";
		}

		__proto.apply=function(){
			this._owner._gearLocked=true;
			var gv=this._storage[this._controller.selectedPageId];
			if(!gv)
				gv=this._default;
			(this._owner).playing=gv.playing;
			(this._owner).frame=gv.frame;
			this._owner._gearLocked=false;
		}

		__proto.updateState=function(){
			var mc=(this._owner);
			var gv=this._storage[this._controller.selectedPageId];
			if(!gv){
				gv=new GearAnimationValue();
				this._storage[this._controller.selectedPageId]=gv;
			}
			gv.playing=mc.playing;
			gv.frame=mc.frame;
		}

		GearAnimation.__init$=function(){
			//class GearAnimationValue
			GearAnimationValue=(function(){
				function GearAnimationValue(playing,frame){
					this.playing=false;
					this.frame=0;
					(playing===void 0)&& (playing=true);
					(frame===void 0)&& (frame=0);
					this.playing=playing;
					this.frame=frame;
				}
				__class(GearAnimationValue,'');
				return GearAnimationValue;
			})()
		}

		return GearAnimation;
	})(GearBase)


	//class fairygui.GearColor extends fairygui.GearBase
	var GearColor=(function(_super){
		var GearColorValue;
		function GearColor(owner){
			this._storage=null;
			this._default=null;
			GearColor.__super.call(this,owner);
		}

		__class(GearColor,'fairygui.GearColor',_super);
		var __proto=GearColor.prototype;
		__proto.init=function(){
			if(Laya.__typeof(this._owner,'fairygui.ITextColorGear'))
				this._default=new GearColorValue((this._owner).color,(this._owner).strokeColor);
			else
			this._default=new GearColorValue((this._owner).color);
			this._storage={};
		}

		__proto.addStatus=function(pageId,value){
			if(value=="-" || value.length==0)
				return;
			var pos=value.indexOf(",");
			var col1=0;
			var col2=0;
			if(pos==-1){
				col1=ToolSet.convertFromHtmlColor(value);
				col2=0xFF000000;
			}
			else{
				col1=ToolSet.convertFromHtmlColor(value.substr(0,pos));
				col2=ToolSet.convertFromHtmlColor(value.substr(pos+1));
			}
			if(pageId==null){
				this._default.color=col1;
				this._default.strokeColor=col2;
			}
			else
			this._storage[pageId]=new GearColorValue(col1,col2);
		}

		__proto.apply=function(){
			this._owner._gearLocked=true;
			var gv=this._storage[this._controller.selectedPageId];
			if(!gv)
				gv=this._default;
			(this._owner).color=gv.color;
			if((Laya.__typeof(this._owner,'fairygui.ITextColorGear'))&& gv.strokeColor!=0xFF000000)
				(this._owner).strokeColor=gv.strokeColor;
			this._owner._gearLocked=false;
		}

		__proto.updateState=function(){
			var gv=this._storage[this._controller.selectedPageId];
			if(!gv){
				gv=new GearColorValue();
				this._storage[this._controller.selectedPageId]=gv;
			}
			gv.color=(this._owner).color;
			if(Laya.__typeof(this._owner,'fairygui.ITextColorGear'))
				gv.strokeColor=(this._owner).strokeColor;
		}

		GearColor.__init$=function(){
			//class GearColorValue
			GearColorValue=(function(){
				function GearColorValue(color,strokeColor){
					this.color=0;
					this.strokeColor=0;
					(color===void 0)&& (color=0);
					(strokeColor===void 0)&& (strokeColor=0);
					this.color=color;
					this.strokeColor=strokeColor;
				}
				__class(GearColorValue,'');
				return GearColorValue;
			})()
		}

		return GearColor;
	})(GearBase)


	//class fairygui.GearDisplay extends fairygui.GearBase
	var GearDisplay=(function(_super){
		function GearDisplay(owner){
			this.pages=null;
			this._visible=0;
			GearDisplay.__super.call(this,owner);
			this._displayLockToken=1;
		}

		__class(GearDisplay,'fairygui.GearDisplay',_super);
		var __proto=GearDisplay.prototype;
		__proto.init=function(){
			this.pages=null;
		}

		__proto.addLock=function(){
			this._visible++;
			return this._displayLockToken;
		}

		__proto.releaseLock=function(token){
			if(token==this._displayLockToken)
				this._visible--;
		}

		__proto.apply=function(){
			this._displayLockToken++;
			if(this._displayLockToken==0)
				this._displayLockToken=1;
			if(this.pages==null || this.pages.length==0
				|| this.pages.indexOf(this._controller.selectedPageId)!=-1)
			this._visible=1;
			else
			this._visible=0;
		}

		__getset(0,__proto,'connected',function(){
			return this._controller==null || this._visible>0;
		});

		return GearDisplay;
	})(GearBase)


	//class fairygui.GearIcon extends fairygui.GearBase
	var GearIcon=(function(_super){
		function GearIcon(owner){
			this._storage=null;
			this._default=null;
			GearIcon.__super.call(this,owner);
		}

		__class(GearIcon,'fairygui.GearIcon',_super);
		var __proto=GearIcon.prototype;
		__proto.init=function(){
			this._default=this._owner.icon;
			this._storage={};
		}

		__proto.addStatus=function(pageId,value){
			if(pageId==null)
				this._default=value;
			else
			this._storage[pageId]=value;
		}

		__proto.apply=function(){
			this._owner._gearLocked=true;
			var data=this._storage[this._controller.selectedPageId];
			if(data!=undefined)
				this._owner.icon=String(data);
			else
			this._owner.icon=this._default;
			this._owner._gearLocked=false;
		}

		__proto.updateState=function(){
			this._storage[this._controller.selectedPageId]=this._owner.icon;
		}

		return GearIcon;
	})(GearBase)


	//class fairygui.GearSize extends fairygui.GearBase
	var GearSize=(function(_super){
		var GearSizeValue;
		function GearSize(owner){
			this.tweener=null;
			this._storage=null;
			this._default=null;
			this._tweenValue=null;
			GearSize.__super.call(this,owner);
		}

		__class(GearSize,'fairygui.GearSize',_super);
		var __proto=GearSize.prototype;
		__proto.init=function(){
			this._default=new GearSizeValue(this._owner.width,this._owner.height,this._owner.scaleX,this._owner.scaleY);
			this._storage={};
		}

		__proto.addStatus=function(pageId,value){
			if(value=="-" || value.length==0)
				return;
			var arr=value.split(",");
			var gv;
			if(pageId==null)
				gv=this._default;
			else{
				gv=new GearSizeValue();
				this._storage[pageId]=gv;
			}
			gv.width=parseInt(arr[0]);
			gv.height=parseInt(arr[1]);
			if(arr.length>2){
				gv.scaleX=parseFloat(arr[2]);
				gv.scaleY=parseFloat(arr[3]);
			}
		}

		__proto.apply=function(){
			var gv=this._storage[this._controller.selectedPageId];
			if(!gv)
				gv=this._default;
			if(this._tween && !UIPackage._constructing && !GearBase.disableAllTweenEffect){
				var a=false;
				var b=false;
				if(this.tweener!=null){
					a=this.tweener.vars.onUpdateParams[0];
					b=this.tweener.vars.onUpdateParams[1];
					if(a && (this.tweener.vars.width!=gv.width || this.tweener.vars.height!=gv.height)
						|| b && (this.tweener.vars.scaleX!=gv.scaleX || this.tweener.vars.scaleY!=gv.scaleY)){
						this._owner._gearLocked=true;
						if(a)
							this._owner.setSize(this.tweener.vars.width,this.tweener.vars.height,this._owner.checkGearController(1,this._controller));
						if(b)
							this._owner.setScale(this.tweener.vars.scaleX,this.tweener.vars.scaleY);
						this._owner._gearLocked=false;
						this.tweener.kill();
						this.tweener=null;
						if(this._displayLockToken!=0){
							this._owner.releaseDisplayLock(this._displayLockToken);
							this._displayLockToken=0;
						}
					}
					else
					return;
				}
				a=gv.width !=this._owner.width || gv.height !=this._owner.height;
				b=gv.scaleX !=this._owner.scaleX || gv.scaleY !=this._owner.scaleY;
				if(a || b){
					if(this._owner.checkGearController(0,this._controller))
						this._displayLockToken=this._owner.addDisplayLock();
					var vars={
						width:gv.width,
						height:gv.height,
						scaleX:gv.scaleX,
						scaleY:gv.scaleY,
						ease:this._easeType,
						delay:this._delay,
						overwrite:0
					};
					vars.onUpdate=this.__tweenUpdate;
					vars.onUpdateParams=[a,b];
					vars.onComplete=this.__tweenComplete;
					if(this._tweenValue==null)
						this._tweenValue=new GearSizeValue(0,0,0,0);
					this._tweenValue.width=this._owner.width;
					this._tweenValue.height=this._owner.height;
					this._tweenValue.scaleX=this._owner.scaleX;
					this._tweenValue.scaleY=this._owner.scaleY;
					this.tweener=com.greensock.TweenLite.to(this._tweenValue,this._tweenTime,vars);
				}
			}
			else{
				this._owner._gearLocked=true;
				this._owner.setSize(gv.width,gv.height,this._owner.checkGearController(1,this._controller));
				this._owner.setScale(gv.scaleX,gv.scaleY);
				this._owner._gearLocked=false;
			}
		}

		__proto.__tweenUpdate=function(a,b){
			this._owner._gearLocked=true;
			if(a)
				this._owner.setSize(this._tweenValue.width,this._tweenValue.height,this._owner.checkGearController(1,this._controller));
			if(b)
				this._owner.setScale(this._tweenValue.scaleX,this._tweenValue.scaleY);
			this._owner._gearLocked=false;
		}

		__proto.__tweenComplete=function(){
			if(this._displayLockToken!=0){
				this._owner.releaseDisplayLock(this._displayLockToken);
				this._displayLockToken=0;
			}
			this.tweener=null;
		}

		__proto.updateState=function(){
			var gv=this._storage[this._controller.selectedPageId];
			if(!gv){
				gv=new GearSizeValue();
				this._storage[this._controller.selectedPageId]=gv;
			}
			gv.width=this._owner.width;
			gv.height=this._owner.height;
			gv.scaleX=this._owner.scaleX;
			gv.scaleY=this._owner.scaleY;
		}

		__proto.updateFromRelations=function(dx,dy){
			if(this._controller==null || this._storage==null)
				return;
			var gv;
			for(var $each_gv in this._storage){
				gv=this._storage[$each_gv];
				gv.width+=dx;
				gv.height+=dy;
			}
			GearSizeValue(this._default).width+=dx;
			GearSizeValue(this._default).height+=dy;
			this.updateState();
		}

		GearSize.__init$=function(){
			//class GearSizeValue
			GearSizeValue=(function(){
				function GearSizeValue(width,height,scaleX,scaleY){
					this.width=NaN;
					this.height=NaN;
					this.scaleX=NaN;
					this.scaleY=NaN;
					(width===void 0)&& (width=0);
					(height===void 0)&& (height=0);
					(scaleX===void 0)&& (scaleX=0);
					(scaleY===void 0)&& (scaleY=0);
					this.width=width;
					this.height=height;
					this.scaleX=scaleX;
					this.scaleY=scaleY;
				}
				__class(GearSizeValue,'');
				return GearSizeValue;
			})()
		}

		return GearSize;
	})(GearBase)


	//class fairygui.GearText extends fairygui.GearBase
	var GearText=(function(_super){
		function GearText(owner){
			this._storage=null;
			this._default=null;
			GearText.__super.call(this,owner);
		}

		__class(GearText,'fairygui.GearText',_super);
		var __proto=GearText.prototype;
		__proto.init=function(){
			this._default=this._owner.text;
			this._storage={};
		}

		__proto.addStatus=function(pageId,value){
			if(pageId==null)
				this._default=value;
			else
			this._storage[pageId]=value;
		}

		__proto.apply=function(){
			this._owner._gearLocked=true;
			var data=this._storage[this._controller.selectedPageId];
			if(data!=undefined)
				this._owner.text=String(data);
			else
			this._owner.text=this._default;
			this._owner._gearLocked=false;
		}

		__proto.updateState=function(){
			this._storage[this._controller.selectedPageId]=this._owner.text;
		}

		return GearText;
	})(GearBase)


	/**
	*Signal dispatches events to multiple listeners.
	*It is inspired by C# events and delegates,and by
	*<a target="_top" href="http://en.wikipedia.org/wiki/Signals_and_slots">signals and slots</a>
	*in Qt.
	*A Signal adds event dispatching functionality through composition and interfaces,
	*rather than inheriting from a dispatcher.
	*<br/><br/>
	*Project home:<a target="_top" href="http://github.com/robertpenner/as3-signals/">http://github.com/robertpenner/as3-signals/</a>
	*/
	//class org.osflash.signals.Signal extends org.osflash.signals.OnceSignal
	var Signal=(function(_super){
		/**
		*Creates a Signal instance to dispatch value objects.
		*@param valueClasses Any number of class references that enable type checks in dispatch().
		*For example,new Signal(String,uint)
		*would allow:signal.dispatch("the Answer",42)
		*but not:signal.dispatch(true,42.5)
		*nor:signal.dispatch()
		*
		*NOTE:In AS3,subclasses cannot call super.apply(null,valueClasses),
		*but this constructor has logic to support super(valueClasses).
		*/
		function Signal(__valueClasses){
			var valueClasses=arguments;
			valueClasses=(valueClasses.length==1 && ((valueClasses[0])instanceof Array))? valueClasses[0]:valueClasses;
			Signal.__super.call(this,valueClasses);
		}

		__class(Signal,'org.osflash.signals.Signal',_super);
		var __proto=Signal.prototype;
		Laya.imps(__proto,{"org.osflash.signals.ISignal":true})
		/**
		*@inheritDoc
		*@throws flash.errors.IllegalOperationError <code>IllegalOperationError</code>:You cannot addOnce()then add()the same listener without removing the relationship first.
		*@throws ArgumentError <code>ArgumentError</code>:Given listener is <code>null</code>.
		*/
		__proto.add=function(listener){
			return this.registerListener(listener);
		}

		return Signal;
	})(OnceSignal)


	//class core.panels.base.LabelCombox extends fairygui.GComponent
	var LabelCombox=(function(_super){
		function LabelCombox(){
			this.box=null;
			this.left=null;
			this._combox=null;
			this.cfg=null;
			LabelCombox.__super.call(this);
		}

		__class(LabelCombox,'core.panels.base.LabelCombox',_super);
		var __proto=LabelCombox.prototype;
		__proto.constructFromResource=function(){
			_super.prototype.constructFromResource.call(this);
			this.initUI();
		}

		__proto.initUI=function(){
			this.box=this.getChild("right").asComboBox;
			this.left=this.getChild("left").asTextField;
			this.box.addEventListener("stateChanged",this.onChange);
		}

		__proto.onChange=function(e){
			this.change(this.box.values[this.box.selectedIndex]);
		}

		__proto.setCfg=function(c){
			this.cfg=c;
			this.left.text=c.cname;
			this.tooltips=c.tip;
			if(c.combox){
				this.combox=c.combox;
				}else{
				throw new Error('没配置combox字段, 格式:   "combox":	"单体普攻,1,矩形群攻,2,扇形群攻,3"');
			}
			if(c.hasOwnProperty("param")){
				for (var i in c.param){
					this[i]=c.param[i];
				}
			}
		}

		__proto.change=function(v){
			if(this.cfg==null)return;
			if(this.cfg.panel=="特效"){
				if(!this.data.hasOwnProperty("fx"))this.data.fx={};
				this.data["fx"][this.cfg.name]=this.getTypeVal(this.cfg.type);
				}else{
				this.data[this.cfg.name]=this.getTypeVal(this.cfg.type);
			}
		}

		__proto.getTypeVal=function(type){
			if(type.indexOf("num")>=0){
				return this.box.value;
			}
			if(type.indexOf("int")>=0){
				return this.box.value;
			}
			if(type.indexOf("str")>=0){
				return this.box.text;
			}
			return null;
		}

		__proto.clear=function(){
			this.val=null;
		}

		__getset(0,__proto,'items',function(){
			return this.box.items;
			},function(a){
			this.box.items=a;
		});

		__getset(0,__proto,'combox',function(){
			return this._combox;
			},function(s){
			this._combox=s;
			var a=LabelCombox.toArr(s);
			this.items=a[0];
			this.values=a[1];
		});

		__getset(0,__proto,'values',function(){
			return this.box.values;
			},function(a){
			this.box.values=a;
			this.box.selectedIndex=0;
		});

		__getset(0,__proto,'val',function(){
			return this.values[this.box.selectedIndex];
			},function(s){
			this.box.value=s;
			this.onChange();
		});

		LabelCombox.toArr=function(str){
			var a=str.split(",");
			var aa=[];
			var vv=[];
			for (var i=0;i < a.length;i=i+2){
				aa.push(a[i]);
				vv.push(a[i+1]);
			}
			return [aa,vv];
		}

		return LabelCombox;
	})(GComponent)


	//class rawui.UI_LabelFile extends fairygui.GComponent
	var UI_LabelFile=(function(_super){
		function UI_LabelFile(){
			this.m_left=null;
			this.m_txt=null;
			this.m_right=null;
			UI_LabelFile.__super.call(this);
		}

		__class(UI_LabelFile,'rawui.UI_LabelFile',_super);
		var __proto=UI_LabelFile.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this.m_left=(this.getChildAt(0));
			this.m_txt=(this.getChildAt(1));
			this.m_right=(this.getChildAt(2));
		}

		UI_LabelFile.createInstance=function(){
			return (UIPackage.createObject("rawui","LabelFile"));
		}

		UI_LabelFile.URL="ui://rl5gnkttk0f43i";
		return UI_LabelFile;
	})(GComponent)


	//class rawui.UI_LabelInput extends fairygui.GComponent
	var UI_LabelInput=(function(_super){
		function UI_LabelInput(){
			this.m_right=null;
			this.m_left=null;
			UI_LabelInput.__super.call(this);
		}

		__class(UI_LabelInput,'rawui.UI_LabelInput',_super);
		var __proto=UI_LabelInput.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this.m_right=(this.getChildAt(0));
			this.m_left=(this.getChildAt(1));
		}

		UI_LabelInput.createInstance=function(){
			return (UIPackage.createObject("rawui","LabelInput"));
		}

		UI_LabelInput.URL="ui://rl5gnkttixmn3g";
		return UI_LabelInput;
	})(GComponent)


	//class fairygui.GLabel extends fairygui.GComponent
	var GLabel=(function(_super){
		function GLabel(){
			this._titleObject=null;
			this._iconObject=null;
			GLabel.__super.call(this);
		}

		__class(GLabel,'fairygui.GLabel',_super);
		var __proto=GLabel.prototype;
		Laya.imps(__proto,{"fairygui.IColorGear":true})
		__proto.getTextField=function(){
			if((this._titleObject instanceof fairygui.GTextField ))
				return (this._titleObject);
			else if((this._titleObject instanceof fairygui.GLabel ))
			return (this._titleObject).getTextField();
			else if((this._titleObject instanceof fairygui.GButton ))
			return (this._titleObject).getTextField();
			else
			return null;
		}

		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this._titleObject=this.getChild("title");
			this._iconObject=this.getChild("icon");
		}

		__proto.setup_afterAdd=function(xml){
			_super.prototype.setup_afterAdd.call(this,xml);
			xml=xml.Label[0];
			if(xml){
				var str;
				str=xml.getAttribute('title');
				if(str)
					this.text=str;
				str=xml.getAttribute('icon');
				if(str)
					this.icon=str;
				str=xml.getAttribute('titleColor');
				if(str)
					this.titleColor=ToolSet.convertFromHtmlColor(str);
				str=xml.getAttribute('titleFontSize');
				if(str)
					this.titleFontSize=parseInt(str);
				var tf=this.getTextField();
				if((tf instanceof fairygui.GTextInput )){
					str=xml.getAttribute('prompt');
					if(str)
						(tf).promptText=str;
					str=xml.getAttribute('maxLength');
					if(str)
						(tf).maxLength=parseInt(str);
					str=xml.getAttribute('restrict');
					if(str)
						(tf).restrict=str;
					str=xml.getAttribute('password');
					if(str)
						(tf).password=str=="true";
				}
			}
		}

		__getset(0,__proto,'color',function(){
			return this.titleColor;
			},function(value){
			this.titleColor=value;
		});

		__getset(0,__proto,'icon',function(){
			if(this._iconObject!=null)
				return this._iconObject.icon;
			else
			return null;
			},function(value){
			if(this._iconObject!=null)
				this._iconObject.icon=value;
			this.updateGear(7);
		});

		__getset(0,__proto,'editable',function(){
			var tf=this.getTextField();
			if(tf && ((tf instanceof fairygui.GTextInput )))
				return tf.asTextInput.editable;
			else
			return false;
			},function(val){
			var tf=this.getTextField();
			if(tf && ((tf instanceof fairygui.GTextInput )))
				tf.asTextInput.editable=val;
		});

		__getset(0,__proto,'title',function(){
			if(this._titleObject)
				return this._titleObject.text;
			else
			return null;
			},function(value){
			if(this._titleObject)
				this._titleObject.text=value;
			this.updateGear(6);
		});

		__getset(0,__proto,'text',function(){
			return this.title;
			},function(value){
			this.title=value;
		});

		__getset(0,__proto,'titleColor',function(){
			var tf=this.getTextField();
			if(tf)
				return tf.color;
			else
			return 0;
			},function(value){
			var tf=this.getTextField();
			if(tf)
				tf.color=value;
			this.updateGear(4);
		});

		__getset(0,__proto,'titleFontSize',function(){
			var tf=this.getTextField();
			if(tf)
				return tf.fontSize;
			else
			return 0;
			},function(value){
			var tf=this.getTextField();
			if(tf)
				tf.fontSize=value;
		});

		return GLabel;
	})(GComponent)


	//class rawui.UI_BeziContainer extends fairygui.GComponent
	var UI_BeziContainer=(function(_super){
		function UI_BeziContainer(){
			this.m_bg=null;
			this.m_line=null;
			this.m_o1=null;
			this.m_o2=null;
			this.m_o3=null;
			this.m_o4=null;
			UI_BeziContainer.__super.call(this);
		}

		__class(UI_BeziContainer,'rawui.UI_BeziContainer',_super);
		var __proto=UI_BeziContainer.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this.m_bg=(this.getChildAt(0));
			this.m_line=(this.getChildAt(1));
			this.m_o1=(this.getChildAt(2));
			this.m_o2=(this.getChildAt(3));
			this.m_o3=(this.getChildAt(4));
			this.m_o4=(this.getChildAt(5));
		}

		UI_BeziContainer.createInstance=function(){
			return (UIPackage.createObject("rawui","BeziContainer"));
		}

		UI_BeziContainer.URL="ui://rl5gnkttz51b88";
		return UI_BeziContainer;
	})(GComponent)


	//class rawui.UI_LevelPos extends fairygui.GComponent
	var UI_LevelPos=(function(_super){
		function UI_LevelPos(){
			this.m_bg=null;
			this.m_drager=null;
			this.m_dragBounds=null;
			UI_LevelPos.__super.call(this);
		}

		__class(UI_LevelPos,'rawui.UI_LevelPos',_super);
		var __proto=UI_LevelPos.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this.m_bg=(this.getChildAt(0));
			this.m_drager=(this.getChildAt(1));
			this.m_dragBounds=(this.getChildAt(2));
		}

		UI_LevelPos.createInstance=function(){
			return (UIPackage.createObject("rawui","LevelPos"));
		}

		UI_LevelPos.URL="ui://rl5gnkttxay58b";
		return UI_LevelPos;
	})(GComponent)


	//class rawui.UI_Npc extends fairygui.GComponent
	var UI_Npc=(function(_super){
		function UI_Npc(){
			this.m_inside=null;
			this.m_center=null;
			UI_Npc.__super.call(this);
		}

		__class(UI_Npc,'rawui.UI_Npc',_super);
		var __proto=UI_Npc.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this.m_inside=(this.getChildAt(0));
			this.m_center=(this.getChildAt(1));
		}

		UI_Npc.createInstance=function(){
			return (UIPackage.createObject("rawui","Npc"));
		}

		UI_Npc.URL="ui://rl5gnkttiftz7n";
		return UI_Npc;
	})(GComponent)


	//class rawui.UI_ActionPanel extends fairygui.GComponent
	var UI_ActionPanel=(function(_super){
		function UI_ActionPanel(){
			this.m_border=null;
			this.m_frame=null;
			this.m_border_2=null;
			this.m_listPics=null;
			this.m_search=null;
			this.m_listPicInAction=null;
			this.m_framePic=null;
			this.m_import=null;
			this.m_delAllFrame=null;
			this.m_delFrame=null;
			this.m_play=null;
			this.m_pause=null;
			this.m_frameSec=null;
			this.m_loop=null;
			this.m_borderCheck=null;
			UI_ActionPanel.__super.call(this);
		}

		__class(UI_ActionPanel,'rawui.UI_ActionPanel',_super);
		var __proto=UI_ActionPanel.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this.m_border=this.getControllerAt(0);
			this.m_frame=(this.getChildAt(0));
			this.m_border_2=(this.getChildAt(3));
			this.m_listPics=(this.getChildAt(4));
			this.m_search=(this.getChildAt(5));
			this.m_listPicInAction=(this.getChildAt(7));
			this.m_framePic=(this.getChildAt(8));
			this.m_import=(this.getChildAt(9));
			this.m_delAllFrame=(this.getChildAt(10));
			this.m_delFrame=(this.getChildAt(11));
			this.m_play=(this.getChildAt(13));
			this.m_pause=(this.getChildAt(14));
			this.m_frameSec=(this.getChildAt(15));
			this.m_loop=(this.getChildAt(16));
			this.m_borderCheck=(this.getChildAt(18));
		}

		UI_ActionPanel.createInstance=function(){
			return (UIPackage.createObject("rawui","ActionPanel"));
		}

		UI_ActionPanel.URL="ui://rl5gnkttlpwh7j";
		return UI_ActionPanel;
	})(GComponent)


	//class rawui.UI_Alert extends fairygui.GComponent
	var UI_Alert=(function(_super){
		function UI_Alert(){
			this.m_c1=null;
			this.m_frame=null;
			this.m_title=null;
			this.m_ok=null;
			this.m_cancel=null;
			UI_Alert.__super.call(this);
		}

		__class(UI_Alert,'rawui.UI_Alert',_super);
		var __proto=UI_Alert.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this.m_c1=this.getControllerAt(0);
			this.m_frame=(this.getChildAt(0));
			this.m_title=(this.getChildAt(1));
			this.m_ok=(this.getChildAt(3));
			this.m_cancel=(this.getChildAt(4));
		}

		UI_Alert.createInstance=function(){
			return (UIPackage.createObject("rawui","Alert"));
		}

		UI_Alert.URL="ui://rl5gnkttiftz7s";
		return UI_Alert;
	})(GComponent)


	//class rawui.UI_AlertInput extends fairygui.GComponent
	var UI_AlertInput=(function(_super){
		function UI_AlertInput(){
			this.m_frame=null;
			this.m_txt=null;
			this.m_ok=null;
			this.m_cancel=null;
			this.m_title=null;
			UI_AlertInput.__super.call(this);
		}

		__class(UI_AlertInput,'rawui.UI_AlertInput',_super);
		var __proto=UI_AlertInput.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this.m_frame=(this.getChildAt(0));
			this.m_txt=(this.getChildAt(1));
			this.m_ok=(this.getChildAt(3));
			this.m_cancel=(this.getChildAt(4));
			this.m_title=(this.getChildAt(5));
		}

		UI_AlertInput.createInstance=function(){
			return (UIPackage.createObject("rawui","AlertInput"));
		}

		UI_AlertInput.URL="ui://rl5gnkttiftz7t";
		return UI_AlertInput;
	})(GComponent)


	//class rawui.UI_BeziArea extends fairygui.GComponent
	var UI_BeziArea=(function(_super){
		function UI_BeziArea(){
			this.m_inlist=null;
			this.m_levelpos=null;
			UI_BeziArea.__super.call(this);
		}

		__class(UI_BeziArea,'rawui.UI_BeziArea',_super);
		var __proto=UI_BeziArea.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this.m_inlist=(this.getChildAt(0));
			this.m_levelpos=(this.getChildAt(1));
		}

		UI_BeziArea.createInstance=function(){
			return (UIPackage.createObject("rawui","BeziArea"));
		}

		UI_BeziArea.URL="ui://rl5gnkttg34m8d";
		return UI_BeziArea;
	})(GComponent)


	//class rawui.UI_BufferTypeItem extends fairygui.GComponent
	var UI_BufferTypeItem=(function(_super){
		function UI_BufferTypeItem(){
			this.m_c1=null;
			this.m_bg=null;
			this.m_title=null;
			this.m_touch=null;
			UI_BufferTypeItem.__super.call(this);
		}

		__class(UI_BufferTypeItem,'rawui.UI_BufferTypeItem',_super);
		var __proto=UI_BufferTypeItem.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this.m_c1=this.getControllerAt(0);
			this.m_bg=(this.getChildAt(1));
			this.m_title=(this.getChildAt(2));
			this.m_touch=(this.getChildAt(3));
		}

		UI_BufferTypeItem.createInstance=function(){
			return (UIPackage.createObject("rawui","BufferTypeItem"));
		}

		UI_BufferTypeItem.URL="ui://rl5gnkttiwxl37";
		return UI_BufferTypeItem;
	})(GComponent)


	//class rawui.UI_BuffNodePanel extends fairygui.GComponent
	var UI_BuffNodePanel=(function(_super){
		function UI_BuffNodePanel(){
			this.m_frame=null;
			this.m_panels=null;
			this.m_bg=null;
			this.m_c=null;
			this.m_nodelist=null;
			this.m_save=null;
			this.m_newSkill=null;
			this.m_bufflist=null;
			this.m_newNode=null;
			UI_BuffNodePanel.__super.call(this);
		}

		__class(UI_BuffNodePanel,'rawui.UI_BuffNodePanel',_super);
		var __proto=UI_BuffNodePanel.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this.m_frame=(this.getChildAt(0));
			this.m_panels=(this.getChildAt(1));
			this.m_bg=(this.getChildAt(2));
			this.m_c=(this.getChildAt(3));
			this.m_nodelist=(this.getChildAt(4));
			this.m_save=(this.getChildAt(5));
			this.m_newSkill=(this.getChildAt(6));
			this.m_bufflist=(this.getChildAt(7));
			this.m_newNode=(this.getChildAt(8));
		}

		UI_BuffNodePanel.createInstance=function(){
			return (UIPackage.createObject("rawui","BuffNodePanel"));
		}

		UI_BuffNodePanel.URL="ui://rl5gnkttfm6735";
		return UI_BuffNodePanel;
	})(GComponent)


	//class rawui.UI_CenterPoint extends fairygui.GComponent
	var UI_CenterPoint=(function(_super){
		function UI_CenterPoint(){
			this.m_centerBG=null;
			this.m_center=null;
			UI_CenterPoint.__super.call(this);
		}

		__class(UI_CenterPoint,'rawui.UI_CenterPoint',_super);
		var __proto=UI_CenterPoint.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this.m_centerBG=(this.getChildAt(0));
			this.m_center=(this.getChildAt(1));
		}

		UI_CenterPoint.createInstance=function(){
			return (UIPackage.createObject("rawui","CenterPoint"));
		}

		UI_CenterPoint.URL="ui://rl5gnkttobjb7u";
		return UI_CenterPoint;
	})(GComponent)


	//class rawui.UI_ComboBoxPopup extends fairygui.GComponent
	var UI_ComboBoxPopup=(function(_super){
		function UI_ComboBoxPopup(){
			this.m_list=null;
			UI_ComboBoxPopup.__super.call(this);
		}

		__class(UI_ComboBoxPopup,'rawui.UI_ComboBoxPopup',_super);
		var __proto=UI_ComboBoxPopup.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this.m_list=(this.getChildAt(1));
		}

		UI_ComboBoxPopup.createInstance=function(){
			return (UIPackage.createObject("rawui","ComboBoxPopup"));
		}

		UI_ComboBoxPopup.URL="ui://rl5gnkttqj2i4c";
		return UI_ComboBoxPopup;
	})(GComponent)


	//class rawui.UI_IconSelPanel extends fairygui.GComponent
	var UI_IconSelPanel=(function(_super){
		function UI_IconSelPanel(){
			this.m_frame=null;
			this.m_stuffFilterInput=null;
			this.m_list=null;
			this.m_dostufffilter=null;
			this.m_ok=null;
			this.m_no=null;
			UI_IconSelPanel.__super.call(this);
		}

		__class(UI_IconSelPanel,'rawui.UI_IconSelPanel',_super);
		var __proto=UI_IconSelPanel.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this.m_frame=(this.getChildAt(0));
			this.m_stuffFilterInput=(this.getChildAt(2));
			this.m_list=(this.getChildAt(4));
			this.m_dostufffilter=(this.getChildAt(5));
			this.m_ok=(this.getChildAt(7));
			this.m_no=(this.getChildAt(8));
		}

		UI_IconSelPanel.createInstance=function(){
			return (UIPackage.createObject("rawui","IconSelPanel"));
		}

		UI_IconSelPanel.URL="ui://rl5gnkttpx7w8f";
		return UI_IconSelPanel;
	})(GComponent)


	//class rawui.UI_LabelCombox extends fairygui.GComponent
	var UI_LabelCombox=(function(_super){
		function UI_LabelCombox(){
			this.m_left=null;
			this.m_right=null;
			UI_LabelCombox.__super.call(this);
		}

		__class(UI_LabelCombox,'rawui.UI_LabelCombox',_super);
		var __proto=UI_LabelCombox.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this.m_left=(this.getChildAt(0));
			this.m_right=(this.getChildAt(1));
		}

		UI_LabelCombox.createInstance=function(){
			return (UIPackage.createObject("rawui","LabelCombox"));
		}

		UI_LabelCombox.URL="ui://rl5gnkttu34g3h";
		return UI_LabelCombox;
	})(GComponent)


	//class rawui.UI_LevelPosDrager extends fairygui.GComponent
	var UI_LevelPosDrager=(function(_super){
		function UI_LevelPosDrager(){
			this.m_line=null;
			UI_LevelPosDrager.__super.call(this);
		}

		__class(UI_LevelPosDrager,'rawui.UI_LevelPosDrager',_super);
		var __proto=UI_LevelPosDrager.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this.m_line=(this.getChildAt(1));
		}

		UI_LevelPosDrager.createInstance=function(){
			return (UIPackage.createObject("rawui","LevelPosDrager"));
		}

		UI_LevelPosDrager.URL="ui://rl5gnkttxay58c";
		return UI_LevelPosDrager;
	})(GComponent)


	//class rawui.UI_MainPanel extends fairygui.GComponent
	var UI_MainPanel=(function(_super){
		function UI_MainPanel(){
			this.m_frame=null;
			this.m_panelNpc=null;
			this.m_panelAction=null;
			this.m_panelBuff=null;
			this.m_panelScene=null;
			this.m_panelMix=null;
			UI_MainPanel.__super.call(this);
		}

		__class(UI_MainPanel,'rawui.UI_MainPanel',_super);
		var __proto=UI_MainPanel.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this.m_frame=(this.getChildAt(0));
			this.m_panelNpc=(this.getChildAt(1));
			this.m_panelAction=(this.getChildAt(2));
			this.m_panelBuff=(this.getChildAt(3));
			this.m_panelScene=(this.getChildAt(4));
			this.m_panelMix=(this.getChildAt(5));
		}

		UI_MainPanel.createInstance=function(){
			return (UIPackage.createObject("rawui","MainPanel"));
		}

		UI_MainPanel.URL="ui://rl5gnkttiftz7r";
		return UI_MainPanel;
	})(GComponent)


	//class rawui.UI_MixPanel extends fairygui.GComponent
	var UI_MixPanel=(function(_super){
		function UI_MixPanel(){
			this.m_addGoup=null;
			this.m_taglistGroup=null;
			this.m_mixSel=null;
			this.m_maxLevelGroupCtrlForMix=null;
			this.m_maxLevelGroupCtrlForStuff=null;
			this.m_frame=null;
			this.m_panels=null;
			this.m_bg1=null;
			this.m_saveMix=null;
			this.m_mixlist=null;
			this.m_newStuff=null;
			this.m_stuffFilterInput=null;
			this.m_bg2=null;
			this.m_beziArea=null;
			this.m_mixFilterInput=null;
			this.m_outlist=null;
			this.m_toOut=null;
			this.m_toIn=null;
			this.m_setLabel=null;
			this.m_setTxt=null;
			this.m_desc=null;
			this.m_stufflist=null;
			this.m_domixfilter=null;
			this.m_newMix=null;
			this.m_dostufffilter=null;
			this.m_addLevel=null;
			this.m_subLevel=null;
			this.m_addNum=null;
			this.m_subNum=null;
			this.m_level=null;
			this.m_num=null;
			this.m_addGroup=null;
			this.m_taglist=null;
			this.m_hasLevelforMix=null;
			this.m_addMaxLevel=null;
			this.m_subMaxLevel=null;
			this.m_max_level=null;
			this.m_maxLevelGroup=null;
			this.m_attrArea=null;
			this.m_addSubStuff=null;
			this.m_hasLevelforStuff=null;
			this.m_addMaxLevelStuff=null;
			this.m_subMaxLevelStuff=null;
			this.m_max_level_stuff=null;
			this.m_maxLevelGroupStuff=null;
			this.m_stuffName=null;
			this.m_saveSubStuff=null;
			this.m_stuffTxt=null;
			this.m_stuffIcon=null;
			this.m_bg=null;
			this.m_iconLoader=null;
			UI_MixPanel.__super.call(this);
		}

		__class(UI_MixPanel,'rawui.UI_MixPanel',_super);
		var __proto=UI_MixPanel.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this.m_addGoup=this.getControllerAt(0);
			this.m_taglistGroup=this.getControllerAt(1);
			this.m_mixSel=this.getControllerAt(2);
			this.m_maxLevelGroupCtrlForMix=this.getControllerAt(3);
			this.m_maxLevelGroupCtrlForStuff=this.getControllerAt(4);
			this.m_frame=(this.getChildAt(0));
			this.m_panels=(this.getChildAt(1));
			this.m_bg1=(this.getChildAt(2));
			this.m_saveMix=(this.getChildAt(4));
			this.m_mixlist=(this.getChildAt(5));
			this.m_newStuff=(this.getChildAt(7));
			this.m_stuffFilterInput=(this.getChildAt(8));
			this.m_bg2=(this.getChildAt(10));
			this.m_beziArea=(this.getChildAt(12));
			this.m_mixFilterInput=(this.getChildAt(13));
			this.m_outlist=(this.getChildAt(14));
			this.m_toOut=(this.getChildAt(15));
			this.m_toIn=(this.getChildAt(16));
			this.m_setLabel=(this.getChildAt(17));
			this.m_setTxt=(this.getChildAt(18));
			this.m_desc=(this.getChildAt(19));
			this.m_stufflist=(this.getChildAt(20));
			this.m_domixfilter=(this.getChildAt(21));
			this.m_newMix=(this.getChildAt(22));
			this.m_dostufffilter=(this.getChildAt(23));
			this.m_addLevel=(this.getChildAt(24));
			this.m_subLevel=(this.getChildAt(25));
			this.m_addNum=(this.getChildAt(26));
			this.m_subNum=(this.getChildAt(27));
			this.m_level=(this.getChildAt(30));
			this.m_num=(this.getChildAt(31));
			this.m_addGroup=(this.getChildAt(32));
			this.m_taglist=(this.getChildAt(33));
			this.m_hasLevelforMix=(this.getChildAt(34));
			this.m_addMaxLevel=(this.getChildAt(35));
			this.m_subMaxLevel=(this.getChildAt(36));
			this.m_max_level=(this.getChildAt(38));
			this.m_maxLevelGroup=(this.getChildAt(39));
			this.m_attrArea=(this.getChildAt(41));
			this.m_addSubStuff=(this.getChildAt(44));
			this.m_hasLevelforStuff=(this.getChildAt(45));
			this.m_addMaxLevelStuff=(this.getChildAt(46));
			this.m_subMaxLevelStuff=(this.getChildAt(47));
			this.m_max_level_stuff=(this.getChildAt(49));
			this.m_maxLevelGroupStuff=(this.getChildAt(50));
			this.m_stuffName=(this.getChildAt(51));
			this.m_saveSubStuff=(this.getChildAt(52));
			this.m_stuffTxt=(this.getChildAt(53));
			this.m_stuffIcon=(this.getChildAt(54));
			this.m_bg=(this.getChildAt(55));
			this.m_iconLoader=(this.getChildAt(56));
		}

		UI_MixPanel.createInstance=function(){
			return (UIPackage.createObject("rawui","MixPanel"));
		}

		UI_MixPanel.URL="ui://rl5gnkttijaf7y";
		return UI_MixPanel;
	})(GComponent)


	//class rawui.UI_NodeContainer extends fairygui.GComponent
	var UI_NodeContainer=(function(_super){
		function UI_NodeContainer(){
			this.m_lines=null;
			this.m_nodes=null;
			this.m_sel=null;
			UI_NodeContainer.__super.call(this);
		}

		__class(UI_NodeContainer,'rawui.UI_NodeContainer',_super);
		var __proto=UI_NodeContainer.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this.m_lines=(this.getChildAt(0));
			this.m_nodes=(this.getChildAt(1));
			this.m_sel=(this.getChildAt(2));
		}

		UI_NodeContainer.createInstance=function(){
			return (UIPackage.createObject("rawui","NodeContainer"));
		}

		UI_NodeContainer.URL="ui://rl5gnkttisuo36";
		return UI_NodeContainer;
	})(GComponent)


	//class rawui.UI_NpcContainer extends fairygui.GComponent
	var UI_NpcContainer=(function(_super){
		function UI_NpcContainer(){
			this.m_me=null;
			this.m_boss=null;
			UI_NpcContainer.__super.call(this);
		}

		__class(UI_NpcContainer,'rawui.UI_NpcContainer',_super);
		var __proto=UI_NpcContainer.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this.m_me=(this.getChildAt(0));
			this.m_boss=(this.getChildAt(1));
		}

		UI_NpcContainer.createInstance=function(){
			return (UIPackage.createObject("rawui","NpcContainer"));
		}

		UI_NpcContainer.URL="ui://rl5gnkttiftz7p";
		return UI_NpcContainer;
	})(GComponent)


	//class rawui.UI_NpcPanel extends fairygui.GComponent
	var UI_NpcPanel=(function(_super){
		function UI_NpcPanel(){
			this.m_c1=null;
			this.m_frame=null;
			this.m_listNpc=null;
			this.m_newNpc=null;
			this.m_delNpc=null;
			this.m_name=null;
			this.m_setTexturePack=null;
			this.m_listAction=null;
			this.m_right=null;
			this.m_editMode=null;
			this.m_editAll=null;
			UI_NpcPanel.__super.call(this);
		}

		__class(UI_NpcPanel,'rawui.UI_NpcPanel',_super);
		var __proto=UI_NpcPanel.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this.m_c1=this.getControllerAt(0);
			this.m_frame=(this.getChildAt(0));
			this.m_listNpc=(this.getChildAt(3));
			this.m_newNpc=(this.getChildAt(4));
			this.m_delNpc=(this.getChildAt(5));
			this.m_name=(this.getChildAt(7));
			this.m_setTexturePack=(this.getChildAt(9));
			this.m_listAction=(this.getChildAt(10));
			this.m_right=(this.getChildAt(11));
			this.m_editMode=(this.getChildAt(12));
			this.m_editAll=(this.getChildAt(13));
		}

		UI_NpcPanel.createInstance=function(){
			return (UIPackage.createObject("rawui","NpcPanel"));
		}

		UI_NpcPanel.URL="ui://rl5gnkttlpwh7g";
		return UI_NpcPanel;
	})(GComponent)


	//class rawui.UI_NpcPanelRight extends fairygui.GComponent
	var UI_NpcPanelRight=(function(_super){
		function UI_NpcPanelRight(){
			this.m_center=null;
			UI_NpcPanelRight.__super.call(this);
		}

		__class(UI_NpcPanelRight,'rawui.UI_NpcPanelRight',_super);
		var __proto=UI_NpcPanelRight.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this.m_center=(this.getChildAt(1));
		}

		UI_NpcPanelRight.createInstance=function(){
			return (UIPackage.createObject("rawui","NpcPanelRight"));
		}

		UI_NpcPanelRight.URL="ui://rl5gnkttobjb7v";
		return UI_NpcPanelRight;
	})(GComponent)


	//class rawui.UI_PanelTitle extends fairygui.GComponent
	var UI_PanelTitle=(function(_super){
		function UI_PanelTitle(){
			this.m_title=null;
			UI_PanelTitle.__super.call(this);
		}

		__class(UI_PanelTitle,'rawui.UI_PanelTitle',_super);
		var __proto=UI_PanelTitle.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this.m_title=(this.getChildAt(1));
		}

		UI_PanelTitle.createInstance=function(){
			return (UIPackage.createObject("rawui","PanelTitle"));
		}

		UI_PanelTitle.URL="ui://rl5gnkttixmn3e";
		return UI_PanelTitle;
	})(GComponent)


	//class rawui.UI_PropGroupUI extends fairygui.GComponent
	var UI_PropGroupUI=(function(_super){
		function UI_PropGroupUI(){
			this.m_bg=null;
			this.m_top=null;
			this.m_main=null;
			UI_PropGroupUI.__super.call(this);
		}

		__class(UI_PropGroupUI,'rawui.UI_PropGroupUI',_super);
		var __proto=UI_PropGroupUI.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this.m_bg=(this.getChildAt(0));
			this.m_top=(this.getChildAt(1));
			this.m_main=(this.getChildAt(2));
		}

		UI_PropGroupUI.createInstance=function(){
			return (UIPackage.createObject("rawui","PropGroupUI"));
		}

		UI_PropGroupUI.URL="ui://rl5gnkttixmn3f";
		return UI_PropGroupUI;
	})(GComponent)


	//class rawui.UI_ScenePanel extends fairygui.GComponent
	var UI_ScenePanel=(function(_super){
		function UI_ScenePanel(){
			this.m_c1=null;
			this.m_frame=null;
			this.m_autoBloodReturn=null;
			this.m_container=null;
			this.m_borderCheck=null;
			UI_ScenePanel.__super.call(this);
		}

		__class(UI_ScenePanel,'rawui.UI_ScenePanel',_super);
		var __proto=UI_ScenePanel.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this.m_c1=this.getControllerAt(0);
			this.m_frame=(this.getChildAt(0));
			this.m_autoBloodReturn=(this.getChildAt(2));
			this.m_container=(this.getChildAt(4));
			this.m_borderCheck=(this.getChildAt(5));
		}

		UI_ScenePanel.createInstance=function(){
			return (UIPackage.createObject("rawui","ScenePanel"));
		}

		UI_ScenePanel.URL="ui://rl5gnkttiftz7m";
		return UI_ScenePanel;
	})(GComponent)


	//class rawui.UI_StuffSelPanel extends fairygui.GComponent
	var UI_StuffSelPanel=(function(_super){
		function UI_StuffSelPanel(){
			this.m_frame=null;
			this.m_stuffFilterInput=null;
			this.m_stufflist=null;
			this.m_dostufffilter=null;
			this.m_ok=null;
			this.m_no=null;
			UI_StuffSelPanel.__super.call(this);
		}

		__class(UI_StuffSelPanel,'rawui.UI_StuffSelPanel',_super);
		var __proto=UI_StuffSelPanel.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this.m_frame=(this.getChildAt(0));
			this.m_stuffFilterInput=(this.getChildAt(2));
			this.m_stufflist=(this.getChildAt(4));
			this.m_dostufffilter=(this.getChildAt(5));
			this.m_ok=(this.getChildAt(7));
			this.m_no=(this.getChildAt(8));
		}

		UI_StuffSelPanel.createInstance=function(){
			return (UIPackage.createObject("rawui","StuffSelPanel"));
		}

		UI_StuffSelPanel.URL="ui://rl5gnkttpasn8e";
		return UI_StuffSelPanel;
	})(GComponent)


	//class rawui.UI_TagList extends fairygui.GComponent
	var UI_TagList=(function(_super){
		function UI_TagList(){
			this.m_bg2=null;
			this.m_bg=null;
			this.m_list=null;
			UI_TagList.__super.call(this);
		}

		__class(UI_TagList,'rawui.UI_TagList',_super);
		var __proto=UI_TagList.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this.m_bg2=(this.getChildAt(0));
			this.m_bg=(this.getChildAt(1));
			this.m_list=(this.getChildAt(2));
		}

		UI_TagList.createInstance=function(){
			return (UIPackage.createObject("rawui","TagList"));
		}

		UI_TagList.URL="ui://rl5gnkttgawt85";
		return UI_TagList;
	})(GComponent)


	//class rawui.UI_winframe extends fairygui.GComponent
	var UI_winframe=(function(_super){
		function UI_winframe(){
			this.m_contentArea=null;
			this.m_closeButton=null;
			this.m_dragArea=null;
			this.m_title=null;
			UI_winframe.__super.call(this);
		}

		__class(UI_winframe,'rawui.UI_winframe',_super);
		var __proto=UI_winframe.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this.m_contentArea=(this.getChildAt(1));
			this.m_closeButton=(this.getChildAt(2));
			this.m_dragArea=(this.getChildAt(3));
			this.m_title=(this.getChildAt(4));
		}

		UI_winframe.createInstance=function(){
			return (UIPackage.createObject("rawui","winframe"));
		}

		UI_winframe.URL="ui://rl5gnkttk1sm2n";
		return UI_winframe;
	})(GComponent)


	//class fairygui.GProgressBar extends fairygui.GComponent
	var GProgressBar=(function(_super){
		function GProgressBar(){
			this._max=NaN;
			this._value=NaN;
			this._titleType=0;
			this._reverse=false;
			this._titleObject=null;
			this._aniObject=null;
			this._barObjectH=null;
			this._barObjectV=null;
			this._barMaxWidth=0;
			this._barMaxHeight=0;
			this._barMaxWidthDelta=0;
			this._barMaxHeightDelta=0;
			this._barStartX=0;
			this._barStartY=0;
			this._tweener=null;
			this._tweenValue=0;
			GProgressBar.__super.call(this);
			this._titleType=0;
			this._value=50;
			this._max=100;
		}

		__class(GProgressBar,'fairygui.GProgressBar',_super);
		var __proto=GProgressBar.prototype;
		__proto.tweenValue=function(value,duration){
			if(this._value !=value){
				if(this._tweener)
					this._tweener.kill();
				this._tweenValue=this._value;
				this._value=value;
				this._tweener=com.greensock.TweenLite.to(this,duration,
				{_tweenValue:value,onUpdate:this.onTweenUpdate,onComplete:this.onTweenComplete,ease:com.greensock.easing.Linear.ease});
				return this._tweener;
			}
			else
			return null;
		}

		__proto.onTweenUpdate=function(){
			this.update(this._tweenValue);
		}

		__proto.onTweenComplete=function(){
			this._tweener=null;
		}

		__proto.update=function(newValue){
			var percent=this._max!=0?Math.min(newValue/this._max,1):0;
			if(this._titleObject){
				switch(this._titleType){
					case 0:
						this._titleObject.text=Math.round(percent*100)+"%";
						break ;
					case 1:
						this._titleObject.text=Math.round(newValue)+"/"+Math.round(this._max);
						break ;
					case 2:
						this._titleObject.text=""+Math.round(newValue);
						break ;
					case 3:
						this._titleObject.text=""+Math.round(this._max);
						break ;
					}
			};
			var fullWidth=this.width-this._barMaxWidthDelta;
			var fullHeight=this.height-this._barMaxHeightDelta;
			if(!this._reverse){
				if(this._barObjectH)
					this._barObjectH.width=fullWidth*percent;
				if(this._barObjectV)
					this._barObjectV.height=fullHeight*percent;
			}
			else{
				if(this._barObjectH){
					this._barObjectH.width=Math.round(fullWidth*percent);
					this._barObjectH.x=this._barStartX+(fullWidth-this._barObjectH.width);
				}
				if(this._barObjectV){
					this._barObjectV.height=Math.round(fullHeight*percent);
					this._barObjectV.y=this._barStartY+(fullHeight-this._barObjectV.height);
				}
			}
			if((this._aniObject instanceof fairygui.GMovieClip ))
				(this._aniObject).frame=Math.round(percent*100);
			else if((this._aniObject instanceof fairygui.GSwfObject ))
			(this._aniObject).frame=Math.round(percent*100);
		}

		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			xml=xml.ProgressBar[0];
			var str;
			str=xml.getAttribute('titleType');
			if(str)
				this._titleType=ProgressTitleType.parse(str);
			this._reverse=xml.getAttribute('reverse')=="true";
			this._titleObject=this.getChild("title");
			this._barObjectH=this.getChild("bar");
			this._barObjectV=this.getChild("bar_v");
			this._aniObject=this.getChild("ani");
			if(this._barObjectH){
				this._barMaxWidth=this._barObjectH.width;
				this._barMaxWidthDelta=this.width-this._barMaxWidth;
				this._barStartX=this._barObjectH.x;
			}
			if(this._barObjectV){
				this._barMaxHeight=this._barObjectV.height;
				this._barMaxHeightDelta=this.height-this._barMaxHeight;
				this._barStartY=this._barObjectV.y;
			}
		}

		__proto.handleSizeChanged=function(){
			_super.prototype.handleSizeChanged.call(this);
			if(this._barObjectH)
				this._barMaxWidth=this.width-this._barMaxWidthDelta;
			if(this._barObjectV)
				this._barMaxHeight=this.height-this._barMaxHeightDelta;
			if(!this._underConstruct)
				this.update(this._value);
		}

		__proto.setup_afterAdd=function(xml){
			_super.prototype.setup_afterAdd.call(this,xml);
			xml=xml.ProgressBar[0];
			if(xml){
				this._value=parseInt(xml.getAttribute('value'));
				if(isNaN(this._value))
					this._value=0;
				this._max=parseInt(xml.getAttribute('max'));
				if(isNaN(this._max))
					this._max=0;
			}
			this.update(this._value);
		}

		__proto.dispose=function(){
			if(this._tweener)
				this._tweener.kill();
			_super.prototype.dispose.call(this);
		}

		__getset(0,__proto,'max',function(){
			return this._max;
			},function(value){
			if(this._max !=value){
				this._max=value;
				this.update(this._value);
			}
		});

		__getset(0,__proto,'titleType',function(){
			return this._titleType;
			},function(value){
			if (this._titleType !=value){
				this._titleType=value;
				this.update(this._value);
			}
		});

		__getset(0,__proto,'value',function(){
			return this._value;
			},function(value){
			if(this._tweener){
				this._tweener.kill();
				this._tweener=null;
			}
			if(this._value !=value){
				this._value=value;
				this.update(this._value);
			}
		});

		return GProgressBar;
	})(GComponent)


	/**
	*@author Matan Uberstein
	*/
	//class org.assetloader.signals.LoaderSignal extends org.osflash.signals.Signal
	var LoaderSignal=(function(_super){
		function LoaderSignal(__valueClasses){
			this._loader=null;
			this._signalType=null;
			var valueClasses=arguments;
			LoaderSignal.__super.call(this);this._signalType=this._signalType|| LoaderSignal;
			if(valueClasses.length==1 && ((valueClasses[0])instanceof Array))
				valueClasses=valueClasses[0];
			this.valueClasses=[this._signalType].concat.apply(null,valueClasses);
		}

		__class(LoaderSignal,'org.assetloader.signals.LoaderSignal',_super);
		var __proto=LoaderSignal.prototype;
		/**
		*First argument must be the loader to which this signal belongs.
		*/
		__proto.dispatch=function(__args){
			var args=arguments;
			this._loader=args.shift();
			org.osflash.signals.OnceSignal.prototype.dispatch.apply.call(this,null,[this].concat.apply(null,args));
		}

		/**
		*Gets the loader that dispatched this signal.
		*
		*@return ILoader
		*/
		__getset(0,__proto,'loader',function(){
			return this._loader;
		});

		return LoaderSignal;
	})(Signal)


	//class core.panels.base.LabelInput extends rawui.UI_LabelInput
	var LabelInput=(function(_super){
		function LabelInput(){
			this.left=null;
			this.txt=null;
			this.cfg=null;
			this._val=null;
			LabelInput.__super.call(this);
		}

		__class(LabelInput,'core.panels.base.LabelInput',_super);
		var __proto=LabelInput.prototype;
		__proto.constructFromResource=function(){
			fairygui.GComponent.prototype.constructFromResource.call(this);
			this.initUI();
		}

		__proto.initUI=function(){
			this.left=this.getChild("left").asTextField;
			this.txt=this.m_right;
			this.txt.onChange.add(this.onChange);
		}

		__proto.onChange=function(){
			if(this.cfg.panel=="特效"){
				if(!this.data.hasOwnProperty("fx"))this.data.fx={};
				this.data["fx"][this.cfg.name]=this.getTypeVal(this.cfg.type);
				}else{
				this.data[this.cfg.name]=this.getTypeVal(this.cfg.type);
			}
		}

		__proto.getTypeVal=function(type){
			if(type.indexOf("num")>=0){
				return this.txt.value;
			}
			if(type.indexOf("int")>=0){
				return this.txt.value;
			}
			if(type.indexOf("str")>=0){
				return this.txt.text;
			}
			return null;
		}

		__proto.setCfg=function(c){
			this.cfg=c;
			if(this.cfg.type.indexOf("str")>=0){
				this.txt.isString=true;
				}else{
				this.txt.isString=false;
			}
			this.left.text=c.cname;
			this.tooltips=c.tip;
			if(c.hasOwnProperty("param")){
				for (var i in c.param){
					this[i]=c.param[i];
				}
			}
		}

		__proto.clear=function(){
			if(this.cfg.type.indexOf("num")>=0){
				this.txt.value=0;
			}
			if(this.cfg.type.indexOf("int")>=0){
				this.txt.value=0;
			}
			if(this.cfg.type.indexOf("str")>=0){
				this.txt.text="";
			}
		}

		__getset(0,__proto,'val',function(){
			return this.txt.value;
			},function(value){
			this.txt.value=value;
		});

		return LabelInput;
	})(UI_LabelInput)


	//class rawui.UI_NumericInput extends fairygui.GLabel
	var UI_NumericInput=(function(_super){
		function UI_NumericInput(){
			this.m_c1=null;
			this.m_grayed=null;
			this.m_holder=null;
			UI_NumericInput.__super.call(this);
		}

		__class(UI_NumericInput,'rawui.UI_NumericInput',_super);
		var __proto=UI_NumericInput.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this.m_c1=this.getControllerAt(0);
			this.m_grayed=this.getControllerAt(1);
			this.m_holder=(this.getChildAt(2));
		}

		UI_NumericInput.createInstance=function(){
			return (UIPackage.createObject("rawui","NumericInput"));
		}

		UI_NumericInput.URL="ui://rl5gnkttqj2i6i";
		return UI_NumericInput;
	})(GLabel)


	//class rawui.UI_TextInput extends fairygui.GLabel
	var UI_TextInput=(function(_super){
		function UI_TextInput(){
			this.m_grayed=null;
			UI_TextInput.__super.call(this);
		}

		__class(UI_TextInput,'rawui.UI_TextInput',_super);
		var __proto=UI_TextInput.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this.m_grayed=this.getControllerAt(0);
		}

		UI_TextInput.createInstance=function(){
			return (UIPackage.createObject("rawui","TextInput"));
		}

		UI_TextInput.URL="ui://rl5gnkttqj2i6h";
		return UI_TextInput;
	})(GLabel)


	//class rawui.UI_MixItem extends fairygui.GButton
	var UI_MixItem=(function(_super){
		function UI_MixItem(){
			this.m_txt=null;
			UI_MixItem.__super.call(this);
		}

		__class(UI_MixItem,'rawui.UI_MixItem',_super);
		var __proto=UI_MixItem.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this.m_txt=(this.getChildAt(4));
		}

		UI_MixItem.createInstance=function(){
			return (UIPackage.createObject("rawui","MixItem"));
		}

		UI_MixItem.URL="ui://rl5gnkttev8y82";
		return UI_MixItem;
	})(GButton)


	//class rawui.UI_StuffItem extends fairygui.GButton
	var UI_StuffItem=(function(_super){
		function UI_StuffItem(){
			this.m_grayedC=null;
			this.m_c1=null;
			this.m_level=null;
			this.m_num=null;
			this.m_beziBg=null;
			this.m_beziStart=null;
			this.m_beziEnd=null;
			this.m_addMax=null;
			this.m_subMax=null;
			this.m_max=null;
			this.m_minMaxGroup=null;
			this.m_lines=null;
			this.m_bezi=null;
			UI_StuffItem.__super.call(this);
		}

		__class(UI_StuffItem,'rawui.UI_StuffItem',_super);
		var __proto=UI_StuffItem.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this.m_grayedC=this.getControllerAt(1);
			this.m_c1=this.getControllerAt(2);
			this.m_level=(this.getChildAt(3));
			this.m_num=(this.getChildAt(4));
			this.m_beziBg=(this.getChildAt(5));
			this.m_beziStart=(this.getChildAt(6));
			this.m_beziEnd=(this.getChildAt(7));
			this.m_addMax=(this.getChildAt(8));
			this.m_subMax=(this.getChildAt(9));
			this.m_max=(this.getChildAt(11));
			this.m_minMaxGroup=(this.getChildAt(12));
			this.m_lines=(this.getChildAt(13));
			this.m_bezi=(this.getChildAt(14));
		}

		UI_StuffItem.createInstance=function(){
			return (UIPackage.createObject("rawui","StuffItem"));
		}

		UI_StuffItem.URL="ui://rl5gnkttev8y80";
		return UI_StuffItem;
	})(GButton)


	//class rawui.UI_NpcItem extends fairygui.GButton
	var UI_NpcItem=(function(_super){
		function UI_NpcItem(){
			this.m_txt=null;
			UI_NpcItem.__super.call(this);
		}

		__class(UI_NpcItem,'rawui.UI_NpcItem',_super);
		var __proto=UI_NpcItem.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this.m_txt=(this.getChildAt(6));
		}

		UI_NpcItem.createInstance=function(){
			return (UIPackage.createObject("rawui","NpcItem"));
		}

		UI_NpcItem.URL="ui://rl5gnkttlpwh7k";
		return UI_NpcItem;
	})(GButton)


	//class rawui.UI_ActionItem extends fairygui.GButton
	var UI_ActionItem=(function(_super){
		function UI_ActionItem(){
			this.m_bg=null;
			UI_ActionItem.__super.call(this);
		}

		__class(UI_ActionItem,'rawui.UI_ActionItem',_super);
		var __proto=UI_ActionItem.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this.m_bg=(this.getChildAt(0));
		}

		UI_ActionItem.createInstance=function(){
			return (UIPackage.createObject("rawui","ActionItem"));
		}

		UI_ActionItem.URL="ui://rl5gnkttobjb7x";
		return UI_ActionItem;
	})(GButton)


	//class rawui.UI_NodeItem extends fairygui.GLabel
	var UI_NodeItem=(function(_super){
		function UI_NodeItem(){
			this.m_bg=null;
			UI_NodeItem.__super.call(this);
		}

		__class(UI_NodeItem,'rawui.UI_NodeItem',_super);
		var __proto=UI_NodeItem.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this.m_bg=(this.getChildAt(0));
		}

		UI_NodeItem.createInstance=function(){
			return (UIPackage.createObject("rawui","NodeItem"));
		}

		UI_NodeItem.URL="ui://rl5gnkttkbos3b";
		return UI_NodeItem;
	})(GLabel)


	//class rawui.UI_BufferFileItem extends fairygui.GButton
	var UI_BufferFileItem=(function(_super){
		function UI_BufferFileItem(){
			this.m_bg=null;
			this.m_touch=null;
			UI_BufferFileItem.__super.call(this);
		}

		__class(UI_BufferFileItem,'rawui.UI_BufferFileItem',_super);
		var __proto=UI_BufferFileItem.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this.m_bg=(this.getChildAt(0));
			this.m_touch=(this.getChildAt(2));
		}

		UI_BufferFileItem.createInstance=function(){
			return (UIPackage.createObject("rawui","BufferFileItem"));
		}

		UI_BufferFileItem.URL="ui://rl5gnkttiftz7q";
		return UI_BufferFileItem;
	})(GButton)


	//class rawui.UI_Button extends fairygui.GButton
	var UI_Button=(function(_super){
		function UI_Button(){
			this.m_grayedC=null;
			UI_Button.__super.call(this);
		}

		__class(UI_Button,'rawui.UI_Button',_super);
		var __proto=UI_Button.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this.m_grayedC=this.getControllerAt(1);
		}

		UI_Button.createInstance=function(){
			return (UIPackage.createObject("rawui","Button"));
		}

		UI_Button.URL="ui://rl5gnkttqj2i3x";
		return UI_Button;
	})(GButton)


	//class rawui.UI_ButtonToggle extends fairygui.GButton
	var UI_ButtonToggle=(function(_super){
		function UI_ButtonToggle(){
			this.m_grayedC=null;
			UI_ButtonToggle.__super.call(this);
		}

		__class(UI_ButtonToggle,'rawui.UI_ButtonToggle',_super);
		var __proto=UI_ButtonToggle.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this.m_grayedC=this.getControllerAt(1);
		}

		UI_ButtonToggle.createInstance=function(){
			return (UIPackage.createObject("rawui","ButtonToggle"));
		}

		UI_ButtonToggle.URL="ui://rl5gnkttgawt87";
		return UI_ButtonToggle;
	})(GButton)


	//class rawui.UI_ButtonToggleWithCheck extends fairygui.GButton
	var UI_ButtonToggleWithCheck=(function(_super){
		function UI_ButtonToggleWithCheck(){
			this.m_grayedC=null;
			UI_ButtonToggleWithCheck.__super.call(this);
		}

		__class(UI_ButtonToggleWithCheck,'rawui.UI_ButtonToggleWithCheck',_super);
		var __proto=UI_ButtonToggleWithCheck.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this.m_grayedC=this.getControllerAt(1);
		}

		UI_ButtonToggleWithCheck.createInstance=function(){
			return (UIPackage.createObject("rawui","ButtonToggleWithCheck"));
		}

		UI_ButtonToggleWithCheck.URL="ui://rl5gnkttgawt86";
		return UI_ButtonToggleWithCheck;
	})(GButton)


	//class rawui.UI_IconBtn extends fairygui.GButton
	var UI_IconBtn=(function(_super){
		function UI_IconBtn(){
			this.m_bg=null;
			UI_IconBtn.__super.call(this);
		}

		__class(UI_IconBtn,'rawui.UI_IconBtn',_super);
		var __proto=UI_IconBtn.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this.m_bg=(this.getChildAt(0));
		}

		UI_IconBtn.createInstance=function(){
			return (UIPackage.createObject("rawui","IconBtn"));
		}

		UI_IconBtn.URL="ui://rl5gnkttpx7w8g";
		return UI_IconBtn;
	})(GButton)


	//class rawui.UI_PicItem extends fairygui.GButton
	var UI_PicItem=(function(_super){
		function UI_PicItem(){
			this.m_bg=null;
			UI_PicItem.__super.call(this);
		}

		__class(UI_PicItem,'rawui.UI_PicItem',_super);
		var __proto=UI_PicItem.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
			this.m_bg=(this.getChildAt(0));
		}

		UI_PicItem.createInstance=function(){
			return (UIPackage.createObject("rawui","PicItem"));
		}

		UI_PicItem.URL="ui://rl5gnkttlpwh7i";
		return UI_PicItem;
	})(GButton)


	//class com.topdevil.nodes.PropGroupUI extends rawui.UI_PropGroupUI
	var PropGroupUI=(function(_super){
		function PropGroupUI(){
			this.top=null;
			this.topTitleBtn=null;
			this.mainList=null;
			this.bg=null;
			PropGroupUI.__super.call(this);
		}

		__class(PropGroupUI,'com.topdevil.nodes.PropGroupUI',_super);
		var __proto=PropGroupUI.prototype;
		__proto.constructFromResource=function(){
			fairygui.GComponent.prototype.constructFromResource.call(this);
			this.initUI();
		}

		__proto.initUI=function(){
			this.top=this.getChild("top").asCom;
			this.topTitleBtn=this.top.getChild("title").asButton;
			this.bg=this.getChild("bg").asImage;
			this.mainList=this.getChild("main").asList;
			this.topTitleBtn.addClickListener(this.onTitleBtnClick);
			this.resize();
		}

		__proto.onTitleBtnClick=function(e){
			this.resize();
		}

		__proto.resize=function(){
			var b=this.topTitleBtn.selected;
			this.bg.visible=b;
			this.mainList.visible=b;
			this.mainList.resizeToFit();
			if(b){
				this.height=this.mainList.y+this.mainList.viewHeight+5;
				}else{
				this.height=this.top.height;
			}
		}

		__proto.add=function(c){
			var ipt=null;
			var val;
			if(!this.data.hasOwnProperty("fx"))this.data.fx={};
			if(c.type=="int,combox"){
				var box=this.mainList.addItemFromPool(UIPackage.getItemURL("rawui" ,"LabelCombox"));
				box.clear();
				box.setCfg(c);
				box.data=this.data;
				if(c.panel=="特效"){
					if(this.data.fx.hasOwnProperty(c.name)){
						box.val=this.data.fx[c.name];
						}else{
						if(c.hasOwnProperty("def")){
							box.box.selectedIndex=c.def;
							this.data.fx[c.name]=c.def;
						}
					}
					}else{
					if(this.data.hasOwnProperty(c.name)){
						box.val=this.data[c.name];
						}else{
						if(c.hasOwnProperty("def")){
							box.box.selectedIndex=c.def;
							this.data[c.name]=c.def;
						}
					}
				}
			}
			if(c.type=="str"){
				ipt=this.mainList.addItemFromPool("ui://rl5gnkttixmn3g");
				ipt.setCfg(c);
				ipt.clear();
				ipt.data=this.data;
				if(c.panel=="特效"){
					if(this.data.fx.hasOwnProperty(c.name)){
						ipt.val=this.data.fx[c.name];
						}else{
						if(c.hasOwnProperty("def")){
							if(c.def=="hash"){
								val=LabelFile.getHash();
								}else{
								val=c.def;
							}
							ipt.txt.text=val+"";
							this.data.fx[c.name]=val;
							}else{
							ipt.txt.text="";
						}
					}
					}else{
					if(this.data.hasOwnProperty(c.name)){
						ipt.val=this.data[c.name];
						}else{
						if(c.hasOwnProperty("def")){
							if(c.def=="hash"){
								val=LabelFile.getHash();
								}else{
								val=c.def;
							}
							ipt.txt.text=val+"";
							this.data[c.name]=val;
							}else{
							ipt.txt.text="";
						}
					}
				}
			}
			if(c.type=="str,file"){
				var lf=this.mainList.addItemFromPool("ui://rl5gnkttk0f43i");
				lf.setCfg(c);
				lf.clear();
				lf.data=this.data;
				if(c.panel=="特效"){
					if(this.data.fx.hasOwnProperty(c.name)){
						lf.val=this.data.fx[c.name];
						}else{
						if(c.hasOwnProperty("def")){
							if(c.def=="hash" && val==null){
								val=LabelFile.getHash();
								}else{
								val=c.def;
							}
							this.data.fx[c.name]=lf.val=val;
							}else{
							val="";
						}
					}
					}else{
					if(this.data.hasOwnProperty(c.name)){
						lf.val=this.data[c.name];
						}else{
						if(c.hasOwnProperty("def")){
							if(c.def=="hash" && val==null){
								val=LabelFile.getHash();
								}else{
								val=c.def;
							}
							this.data[c.name]=lf.val=val;
							}else{
							val="";
						}
					}
				}
			}
			if(c.type=="num"){
				ipt=this.mainList.addItemFromPool("ui://rl5gnkttixmn3g");
				ipt.setCfg(c);
				ipt.clear();
				ipt.data=this.data;
				if(c.panel=="特效"){
					if(this.data.fx.hasOwnProperty(c.name)){
						ipt.val=this.data.fx[c.name];
						}else{
						if(c.hasOwnProperty("def")){
							ipt.val=c.def;
							this.data.fx[c.name]=c.def;
							}else{
							ipt.val=0;
						}
					}
					}else{
					if(this.data.hasOwnProperty(c.name)){
						ipt.val=this.data[c.name];
						}else{
						if(c.hasOwnProperty("def")){
							ipt.val=c.def;
							this.data[c.name]=c.def;
							}else{
							ipt.val=0;
						}
					}
				}
			}
		}

		__proto.clear=function(){
			this.data=null;
			this.mainList.removeChildrenToPool();
		}

		return PropGroupUI;
	})(UI_PropGroupUI)


	/**
	*@author Matan Uberstein
	*/
	//class org.assetloader.signals.ErrorSignal extends org.assetloader.signals.LoaderSignal
	var ErrorSignal=(function(_super){
		function ErrorSignal(__valueClasses){
			this._type=null;
			this._message=null;
			var valueClasses=arguments;
			this._signalType=ErrorSignal;
			ErrorSignal.__super.call(this,valueClasses);
		}

		__class(ErrorSignal,'org.assetloader.signals.ErrorSignal',_super);
		var __proto=ErrorSignal.prototype;
		/**
		*Dispatches Signal.
		*
		*@param args1 ILoader-ILoader to which the signal belongs.
		*@param args2 String-Error type
		*@param args3 String-Error message
		*/
		__proto.dispatch=function(__args){
			var args=arguments;
			this._type=args[1];
			this._message=args[2];
			args.splice(1,2);
			_super.prototype.dispatch.apply.call(this,null,args);
		}

		/**
		*Gets the error type.
		*
		*@return String
		*/
		__getset(0,__proto,'type',function(){
			return this._type;
		});

		/**
		*Gets the error message.
		*
		*@return String
		*/
		__getset(0,__proto,'message',function(){
			return this._message;
		});

		return ErrorSignal;
	})(LoaderSignal)


	/**
	*@author Matan Uberstein
	*/
	//class org.assetloader.signals.HttpStatusSignal extends org.assetloader.signals.LoaderSignal
	var HttpStatusSignal=(function(_super){
		function HttpStatusSignal(__valueClasses){
			this._status=0;
			var valueClasses=arguments;
			this._signalType=HttpStatusSignal;
			HttpStatusSignal.__super.call(this,valueClasses);
		}

		__class(HttpStatusSignal,'org.assetloader.signals.HttpStatusSignal',_super);
		var __proto=HttpStatusSignal.prototype;
		/**
		*Dispatches Signal.
		*
		*@param args1 ILoader-ILoader to which the signal belongs.
		*@param args2 int-Status code
		*/
		__proto.dispatch=function(__args){
			var args=arguments;
			this._status=args.splice(1,1)[0];
			_super.prototype.dispatch.apply.call(this,null,args);
		}

		/**
		*Gets the http status code.
		*
		*@return int
		*/
		__getset(0,__proto,'status',function(){
			return this._status;
		});

		return HttpStatusSignal;
	})(LoaderSignal)


	/**
	*@author Matan Uberstein
	*/
	//class org.assetloader.signals.NetStatusSignal extends org.assetloader.signals.LoaderSignal
	var NetStatusSignal=(function(_super){
		function NetStatusSignal(__valueClasses){
			this._info=null;
			var valueClasses=arguments;
			this._signalType=NetStatusSignal;
			NetStatusSignal.__super.call(this,valueClasses);
		}

		__class(NetStatusSignal,'org.assetloader.signals.NetStatusSignal',_super);
		var __proto=NetStatusSignal.prototype;
		/**
		*Dispatches Signal.
		*
		*@param args1 ILoader-ILoader to which the signal belongs.
		*@param args2 Object-NetStatus Info Object
		*/
		__proto.dispatch=function(__args){
			var args=arguments;
			this._info=args.splice(1,1)[0];
			_super.prototype.dispatch.apply.call(this,null,args);
		}

		/**
		*Gets the NetStatus info object.
		*
		*@return Object
		*/
		__getset(0,__proto,'info',function(){
			return this._info;
		});

		return NetStatusSignal;
	})(LoaderSignal)


	/**
	*@author Matan Uberstein
	*/
	//class org.assetloader.signals.ProgressSignal extends org.assetloader.signals.LoaderSignal
	var ProgressSignal=(function(_super){
		function ProgressSignal(__valueClasses){
			this._latency=0;
			this._speed=0;
			this._averageSpeed=0;
			this._progress=0;
			this._bytesLoaded=0;
			this._bytesTotal=0;
			var valueClasses=arguments;
			this._signalType=ProgressSignal;
			ProgressSignal.__super.call(this,valueClasses);
		}

		__class(ProgressSignal,'org.assetloader.signals.ProgressSignal',_super);
		var __proto=ProgressSignal.prototype;
		/**
		*Dispatches Signal.
		*
		*@param args1 ILoader-ILoader to which the signal belongs.
		*@param args2 Number-Latency
		*@param args3 Number-Speed
		*@param args4 Number-averageSpeed
		*@param args5 Number-progress
		*@param args6 uint-bytesLoaded
		*@param args7 uint-bytesTotal
		*/
		__proto.dispatch=function(__args){
			var args=arguments;
			this._latency=args[1];
			this._speed=args[2];
			this._averageSpeed=args[3];
			this._progress=args[4];
			this._bytesLoaded=args[5];
			this._bytesTotal=args[6];
			args.splice(1,6);
			_super.prototype.dispatch.apply.call(this,null,args);
		}

		/**
		*Gets the bytes loaded.
		*
		*@return uint
		*/
		__getset(0,__proto,'bytesLoaded',function(){
			return this._bytesLoaded;
		});

		/**
		*Gets the latency in milliseconds.
		*
		*@return Number.
		*/
		__getset(0,__proto,'latency',function(){
			return this._latency;
		});

		/**
		*Gets speed in kilobytes per second.
		*
		*@return Number.
		*/
		__getset(0,__proto,'speed',function(){
			return this._speed;
		});

		/**
		*Gets the average speed in kilobytes per second.
		*/
		__getset(0,__proto,'averageSpeed',function(){
			return this._averageSpeed;
		});

		/**
		*Gets the total bytes.
		*
		*@return uint
		*/
		__getset(0,__proto,'bytesTotal',function(){
			return this._bytesTotal;
		});

		/**
		*Gets the progress in percentage value.
		*
		*@return Number between 0 and 100
		*/
		__getset(0,__proto,'progress',function(){
			return this._progress;
		});

		return ProgressSignal;
	})(LoaderSignal)


	//class core.panels.IconSelPanel extends core.panels.base.BaseWindow
	var IconSelPanel=(function(_super){
		function IconSelPanel(){
			this.v=null;
			this.callback=null;
			IconSelPanel.__super.call(this);
			this.v=UI_IconSelPanel.createInstance();
			this.contentPane=this.v;
			this.v.m_frame.m_closeButton.visible=false;
			this.v.m_ok.addClickListener(this.onOK);
			this.v.m_no.addClickListener(this.onNO);
		}

		__class(IconSelPanel,'core.panels.IconSelPanel',_super);
		var __proto=IconSelPanel.prototype;
		__proto.onNO=function(e){
			this.clear();
			this.hide();
		}

		__proto.clear=function(){
			this.callback=null;
		}

		__proto.onOK=function(e){
			var selectedIndex=this.v.m_list.selectedIndex;
			if(selectedIndex<0){
				Alert.showTxt("请先选择一个Icon");
				return;
			};
			var item=this.v.m_list.getChildAt(selectedIndex);
			if(this.callback){
				this.callback(item.data);
			}
			this.clear();
			this.hide();
		}

		__proto.reloadIconList=function(){
			this.v.m_list.removeChildrenToPool();
			FileX.dirToList(MixPanel.ICON_DIR,this.v.m_list,"ui://rl5gnkttpx7w8g",this.updateOne,[],true);
		}

		__proto.updateOne=function(fname,item){
			item.data={name:fname,url:item.icon};
		}

		__proto.onShown=function(){
			_super.prototype.onShown.call(this);
			this.reloadIconList();
		}

		__proto.onHide=function(){
			_super.prototype.onHide.call(this);
		}

		__getset(1,IconSelPanel,'ins',function(){
			if(IconSelPanel._ins==null){
				IconSelPanel._ins=new IconSelPanel();
			}
			return IconSelPanel._ins;
		},core.panels.base.BaseWindow._$SET_ins);

		IconSelPanel.sel=function(_callback){
			IconSelPanel.ins.callback=_callback;
			IconSelPanel.ins.show();
		}

		IconSelPanel._ins=null
		return IconSelPanel;
	})(BaseWindow)


	//class core.panels.StuffSelPanel extends core.panels.base.BaseWindow
	var StuffSelPanel=(function(_super){
		function StuffSelPanel(){
			this.v=null;
			this.callback=null;
			StuffSelPanel.__super.call(this);
			this.v=UI_StuffSelPanel.createInstance();
			this.contentPane=this.v;
			this.v.m_frame.m_closeButton.visible=false;
			this.v.m_ok.addClickListener(this.onOK);
			this.v.m_no.addClickListener(this.onNO);
		}

		__class(StuffSelPanel,'core.panels.StuffSelPanel',_super);
		var __proto=StuffSelPanel.prototype;
		__proto.onNO=function(e){
			this.clear();
			this.hide();
		}

		__proto.clear=function(){
			this.callback=null;
		}

		__proto.onOK=function(e){
			var selectedIndex=this.v.m_stufflist.selectedIndex;
			if(selectedIndex<0){
				Alert.showTxt("请先选择一个物品");
				return;
			};
			var item=this.v.m_stufflist.getChildAt(selectedIndex);
			var ob=GameMathUtil.clone(item.data);
			if(this.callback){
				this.callback(ob);
			}
			this.clear();
			this.hide();
		}

		__proto.reloadStuffList=function(){
			this.v.m_stufflist.removeChildrenToPool();
			FileX.dirToList(MixPanel.STUFF_DIR,this.v.m_stufflist,"ui://rl5gnkttev8y80",this.updateOneStuff);
		}

		__proto.updateOneStuff=function(ob,item){
			item.title=ob.name;
			item.data=ob;
			item.width=122;
			item.m_c1.selectedIndex=0;
		}

		__proto.onShown=function(){
			_super.prototype.onShown.call(this);
			this.reloadStuffList();
		}

		__proto.onHide=function(){
			_super.prototype.onHide.call(this);
		}

		__getset(1,StuffSelPanel,'ins',function(){
			if(StuffSelPanel._ins==null){
				StuffSelPanel._ins=new StuffSelPanel();
			}
			return StuffSelPanel._ins;
		},core.panels.base.BaseWindow._$SET_ins);

		StuffSelPanel.sel=function(_callback){
			StuffSelPanel.ins.callback=_callback;
			StuffSelPanel.ins.show();
		}

		StuffSelPanel._ins=null
		return StuffSelPanel;
	})(BaseWindow)


	//class core.panels.base.TextInput extends rawui.UI_TextInput
	var TextInput=(function(_super){
		function TextInput(){
			TextInput.__super.call(this);
		}

		__class(TextInput,'core.panels.base.TextInput',_super);
		return TextInput;
	})(UI_TextInput)


	//class core.panels.node.MixItem extends rawui.UI_MixItem
	var MixItem=(function(_super){
		function MixItem(){
			MixItem.__super.call(this);
		}

		__class(MixItem,'core.panels.node.MixItem',_super);
		var __proto=MixItem.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
		}

		return MixItem;
	})(UI_MixItem)


	//class core.panels.npc.items.NpcItem extends rawui.UI_NpcItem
	var NpcItem=(function(_super){
		function NpcItem(){
			NpcItem.__super.call(this);
		}

		__class(NpcItem,'core.panels.npc.items.NpcItem',_super);
		var __proto=NpcItem.prototype;
		__proto.constructFromXML=function(xml){
			_super.prototype.constructFromXML.call(this,xml);
		}

		return NpcItem;
	})(UI_NpcItem)


	Laya.__init([RelationItem,GearAnimation,GearColor,GearSize]);
	new HEditor();

})(window,document,Laya);


/*
1 file:///D:/GameEditor/libsrc/org/osflash/signals/Slot.as (170):warning:ArgumentError This variable is not defined.
2 file:///D:/GameEditor/libsrc/org/osflash/signals/Slot.as (116):warning:ArgumentError This variable is not defined.
3 file:///D:/GameEditor/libsrc/org/osflash/signals/SlotList.as (33):warning:ArgumentError This variable is not defined.
4 file:///D:/GameEditor/libsrc/org/osflash/signals/SlotList.as (39):warning:ArgumentError This variable is not defined.
5 file:///D:/GameEditor/libsrc/com/adobe/serialization/json/JSONParseError.as (59):warning:name This variable is not defined.
6 file:///D:/GameEditor/libsrc/ash/signals/Signal1.as (22):warning:head This variable is not defined.
7 file:///D:/GameEditor/libsrc/ash/signals/Signal3.as (26):warning:head This variable is not defined.
8 file:///D:/GameEditor/libsrc/fairygui/GGroup.as (92):warning:_parent.numChildren This variable is not defined.
9 file:///D:/GameEditor/libsrc/fairygui/GGroup.as (95):warning:int.MAX_VALUE This variable is not defined.
10 file:///D:/GameEditor/libsrc/fairygui/GGroup.as (95):warning:int.MAX_VALUE This variable is not defined.
11 file:///D:/GameEditor/libsrc/fairygui/GGroup.as (96):warning:int.MIN_VALUE This variable is not defined.
12 file:///D:/GameEditor/libsrc/fairygui/GGroup.as (96):warning:int.MIN_VALUE This variable is not defined.
13 file:///D:/GameEditor/libsrc/fairygui/GGroup.as (101):warning:_parent.getChildAt This variable is not defined.
14 file:///D:/GameEditor/libsrc/fairygui/GGroup.as (405):warning:_parent.numChildren This variable is not defined.
15 file:///D:/GameEditor/libsrc/fairygui/GGroup.as (408):warning:_parent.getChildAt This variable is not defined.
*/
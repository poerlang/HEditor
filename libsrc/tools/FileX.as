package tools
{
	import flash.desktop.ClipboardFormats;
	import flash.desktop.NativeDragManager;
	import flash.display.BitmapData;
	import flash.display.InteractiveObject;
	import flash.display.PNGEncoderOptions;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.NativeDragEvent;
	import flash.filesystem.File;
	import flash.filesystem.FileMode;
	import flash.filesystem.FileStream;
	import flash.utils.ByteArray;
	
	import fairygui.GComponent;
	import fairygui.GList;
	import fairygui.GRoot;

	/**
	 * 文件工具
	 * var str = FileX.FileToString( "res/t.txt" );
	 */
	public class FileX
	{
		public static function bytesToFile(b:ByteArray,path:String):void{
			var f:File = getFile(path);
			try{
				var s:FileStream = new FileStream();
				s.open(f,FileMode.WRITE);
				s.writeBytes(b);
				s.close();
			}catch(e:Error){
				trace(e);
			}
		}
		public static function BitmapDataToFile(bd:BitmapData,path:*):void{
			var options:PNGEncoderOptions = new PNGEncoderOptions();
			var b:ByteArray = bd.encode(bd.rect,options);
			var f:File = (path is String)? new File(path):path;
			try{
				var s:FileStream = new FileStream();
				s.open(f,FileMode.WRITE);
				s.writeBytes(b);
				s.close();
			}catch(e:Error){
				trace(e);
			}
		}
		public static function objectToFile(ob:Object,path:String):void{
			stringToFile(JSON.stringify(ob,null,"\t"),path);
		}
		public static function stringToFile(str:String,path:String):void{
			var f:File = getFile(path);
			try{
				var s:FileStream = new FileStream();
				s.open(f,FileMode.WRITE);
				s.writeUTFBytes(str);
				s.close();
			}catch(e:Error){
				trace(e);
			}
		}
		public static function FileToBytes(path:String):ByteArray{
			var f:File = getFile(path);
			var s:FileStream = new FileStream();
			var b:ByteArray = new ByteArray();
			try{
				s.open(f,FileMode.READ);
				s.readBytes(b);
				s.close();
			}catch(e:Error){
				trace(e);
				return null;
			}
			return b;
		}
		public static function FileToString(path:*):String{
			var f:File = getFile(path);
			var s:FileStream = new FileStream();
			var b:ByteArray = new ByteArray();
			var str:String="";
			try{
				s.open(f,FileMode.READ);
				str = s.readUTFBytes(s.bytesAvailable);
				s.close();
			}catch(e:Error){
				trace(e);
				return null;
			}
			return str;
		}
		public static function FileToObject(path:*):*{
			var str:String = FileToString(path);
			var ob:* = JSON.parse(str);
			return ob;
		}
		public static function DragFileArea(w:int,h:int,onDragDropX:Function,color:uint=0xeeeeee,alpha:Number=0.1):Sprite{
			var s:Sprite = new Sprite();
			s.graphics.beginFill(color,alpha);
			s.graphics.drawRect(0,0,w,h);
			s.graphics.endFill();
			s.addEventListener(NativeDragEvent.NATIVE_DRAG_ENTER, onDragIn);
			s.addEventListener(NativeDragEvent.NATIVE_DRAG_DROP, onDragDrop);
			function onDragIn(e:NativeDragEvent):void
			{
				NativeDragManager.acceptDragDrop(e.target as InteractiveObject);
			}
			function onDragDrop(e:NativeDragEvent):void
			{
				if(e.target == s){
					var files:Array = e.clipboard.getData(ClipboardFormats.FILE_LIST_FORMAT) as Array;
					onDragDropX(files);
				}
			}
			return s;
		}
		public static function createDir(path:String):void{
			var f:File = getFile(path);
			try
			{
				f.createDirectory();	
			} 
			catch(e:Error) 
			{
				trace(e);
			}
		}
		public static function del(path:*,dir:Boolean=false):void
		{
			var f:File = getFile(path);
			try
			{
				if(dir){
					f.deleteDirectory(true);
				}else{
					f.deleteFile();
				}
			} 
			catch(e:Error) 
			{
				trace(e);
			}
		}
		
		public static function getFile(path:*):File
		{
			if(path is File){
				return path;
			}
			var resolvePath:File = new File(File.applicationDirectory.resolvePath(path).nativePath);
			return resolvePath;
		}
		
		public static function exist(path:String):Boolean
		{
			return getFile(path).exists;
		}
		public static function selectFile(callback:Function):void
		{
			var appDir:File = File.applicationDirectory;
			var sub:File = appDir.resolvePath("res/");
			sub.browse();
			sub.addEventListener(Event.SELECT,function(e:Event):void{
				var f:File = e.target as File;
				callback(f);
			});
		}
		
		public static function getRelativePath(f:File):String
		{
			var appNativePath:String = File.applicationDirectory.nativePath;
			var fileNativePath:String = f.nativePath;
			var myPattern:RegExp = /\\/g;//替换\成/
			var replace:String = fileNativePath.replace(appNativePath,"").replace(myPattern,"/");
			if(replace.indexOf("/")==0){
				replace = replace.slice(1);//去掉第一个/
			}
			return replace;
		}
		
		public static function getSimpleFileName(f:File):String
		{
			return f.name.replace("."+f.extension,"");
		}
		
		public static function dirToList(dirPath:String, list:GList, UI_URL:String, fun:Function ,passExtArr:Array=null):void
		{
			list.removeChildren(0,-1,true);
			var dir:File = File.applicationDirectory;
			dir = dir.resolvePath(dirPath); 
			if(!dir.exists){
				GRoot.inst.showTooltips("目录无效:"+dirPath);
				return;
			}
			var arr:Array = dir.getDirectoryListing();
			for (var i:int = 0; i < arr.length; i++){
				var f:File = arr[i];
				if(f.extension){
					var ext:String = f.extension.toLowerCase();
					if(f.extension && ext=="ds_store")continue;
					if(f.extension && passExtArr.indexOf(ext)>=0){continue;}
				}
				var str:String = FileX.FileToString(f.url);
				var ob:Object = JSON.parse(str);
				var item:GComponent = list.addItem(UI_URL).asCom;
				item.name = f.name;
				fun(ob,item);
			}
		}
	}
}
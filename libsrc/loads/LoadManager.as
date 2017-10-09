package loads
{
	import flash.net.URLRequest;
	import flash.utils.Dictionary;
	
	import org.assetloader.AssetLoader;
	import org.assetloader.core.IAssetLoader;
	import org.assetloader.core.ILoadStats;
	import org.assetloader.core.ILoader;
	import org.assetloader.signals.ErrorSignal;
	import org.assetloader.signals.LoaderSignal;

	public class LoadManager
	{
		private var onLoadFun:Function;
		private var doLog:Boolean;
		public var loader:AssetLoader;
		public function LoadManager()
		{
			loader = new AssetLoader();
			addListenersToLoader(loader);
		}
		
		public function get(id:String):*{
			return loader.getAsset(id);
		}
		public function hasLoad(url:String):Boolean{
			return loader.hasAsset(url);
		}
		public function load(urlArr:Array,onLoadFun:Function,doLog:Boolean=true):void{
			for (var i:int = 0; i < urlArr.length; i++) 
			{
				addLoad(urlArr[i]);
			}
			this.doLog = doLog;
			this.onLoadFun = onLoadFun;
			loader.start();
		}
		private function addLoad(id:String):void
		{
			var req:URLRequest = new URLRequest(id);
			loader.add(id,req);
		}
		// --------------------------------------------------------------------------------------------------------------------------------//
		// HANDLERS
		// --------------------------------------------------------------------------------------------------------------------------------//
		public function onChildOpen_handler(signal : LoaderSignal, child : ILoader) : void
		{
			if(doLog)trace("[" + signal.loader.id + "]\t[" + child.id + "]\t\topened  \tLatency\t: " + Math.floor(child.stats.latency) + "\tms");
		}
		
		public function onChildError_handler(signal : ErrorSignal, child : ILoader) : void
		{
			if(doLog)trace("[" + signal.loader.id + "]\t[" + child.id + "]\t\terror  \tType\t: " + signal.type + " | Message: " + signal.message);
		}
		
		public function onChildComplete_handler(signal : LoaderSignal, child : ILoader) : void
		{
			if(doLog)trace("[" + signal.loader.id + "]\t[" + child.id + "]\t\tcomplete\tSpeed\t: " + Math.floor(child.stats.averageSpeed) + "\tkbps");
		}
		
		public function onComplete_handler(signal : LoaderSignal, assets : Dictionary) : void
		{
			var loader : IAssetLoader = IAssetLoader(signal.loader);
			
			// Do your clean up!
			//removeListenersFromLoader(loader);
			
			// Our Primary AssetLoader's stats.
			var stats : ILoadStats = loader.stats;
			if(doLog){
				trace("\n[" + loader.id + "]");
				trace("LOADING COMPLETE:");
				trace("Total Time: " + stats.totalTime + " ms");
				trace("Average Latency: " + Math.floor(stats.latency) + " ms");
				trace("Average Speed: " + Math.floor(stats.averageSpeed) + " kbps");
				trace("Total Bytes: " + stats.bytesTotal);
				trace("");
			}
			
			if(onLoadFun){
				onLoadFun();
			}
		}
		
		// --------------------------------------------------------------------------------------------------------------------------------//
		// ADD / REMOVE LISTENERS
		// --------------------------------------------------------------------------------------------------------------------------------//
		public function addListenersToLoader(loader : IAssetLoader) : void
		{
			loader.onChildOpen.add(onChildOpen_handler);
			loader.onChildError.add(onChildError_handler);
			loader.onChildComplete.add(onChildComplete_handler);
			
			loader.onComplete.add(onComplete_handler);
		}
		
		public function removeListenersFromLoader(loader : IAssetLoader) : void
		{
			loader.onChildOpen.remove(onChildOpen_handler);
			loader.onChildError.remove(onChildError_handler);
			loader.onChildComplete.remove(onChildComplete_handler);
			
			loader.onComplete.remove(onComplete_handler);
		}
	}
}
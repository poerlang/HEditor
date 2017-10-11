# HEditor （Work In Process 仍在制作中...）

HEditor 下面简称 HE ，用于实时调整和预览 H5 游戏的技能，以及其它相关数值编辑，比如物品与合成。

### 为什么要做这个编辑器？

目前市面上游戏相关的编辑器，最强的几个，罗列一下: 


Flash，DragonBones，Spine，Construct2，FairyGUI，LayaIDE，EgretIDE

（如果还有没提到的，请联系我）。
先来说Flash，它是通用的动画编辑器，虽然也有骨骼，但是美术只用传统的关键帧，Flash编辑器无法结合**数值**来预览动画，比如**实时调整**流星雨的下落范围。而后面的两个DragonBones,Spine,也都是专注于人物效果，对于动态的距离和范围控制等等，并不适用。以上三者都只适合制作人物动作和刀光动作。
再说到 [Construct2](https://www.scirra.com/)，非常牛逼的一个编辑器，非常值得研究和学习，如果说我要造的轮子跟C2有点像那就太高估我的能力了， HE 这个轮子将来会更逼近一个高完成度的游戏，而不是像C2那样大而全，主要是我精力和能力有限。


再来说 [FairyGUI](http://www.fairygui.com)，下面简称FUI，它分担了游戏制作中最繁重的一项工作：游戏UI，目前还是（我心目中）整个游戏界最强的UI编辑器，重点是可以把UI做得很精细，各种UI调整和UI控制都兼顾到了，并且代码方面也是方便易用，还不收费啊不收费，将来有可能延展到 Html5+Div5+CSS+Android+iOS原生 编辑器，一统天下，当然，这只是个人猜测。你可以在源码里看到一个 FairyGUI-project 的目录，可以用 FUI 打开。也就是说，HE 是基于 FUI 开发的，HE在大街上见了FUI要敬重的叫声爷。


再来说 LayaIDE 和 EgretIDE ，都是比较重量级的编辑器，Egret还是 DragonBones龙骨的亲爹，都是非常值得敬佩的，而且也不收费，非常有胸怀的公司，但是，粒子特效编辑都比较弱（他们似乎都在移植Unity的粒子，还没完工），另外也没有我需要的合成功能。等他们做好粒子编辑并且整合到场景预览，我估计 HE 就可以歇着不用做了。


回到我的需求：

实际工作中，除了人物动作和刀光之外，策划还想要实时的预览其它一些战斗效果，如攻击距离，粒子的曲线角度，AOE范围攻击半径，扣血，震屏，声效，打击感等等，还要调整参数后点播放立即生效，而不是输出数据上传再重启游戏，总之，需要有一个工具能完整把控整个技能的节奏，实时的去调整，验证，打磨。
这就是 HE 的应用场合了，将龙骨动画或者帧动画导入进来，再配合节点和数值编辑，实时调整和预览技能。

另外，HE还包含两个重要的功能：物品配置、合成配置。以往的游戏配置，需要策划和程序对 xls 文件进行非常“复杂”的配置，HE 希望能把这种依赖尽量降低，使得游戏的数值配置简单化，并且，HE 希望能在修改数值配置后，能够在编辑器中立即看到变化，比如技能扣血的增减，攻击范围的增减等等。

### HE 到底是什么？
从短期来看，HE 是偏向于数值调整的编辑器（动画调整交给专业的动画编辑器去做），从长期来看 ，HE 将是一个可以深度配置并快速成型的游戏。

### HE 要实现的目标有如下几个：

1. 让技能调制所见即所得（前期）。
1. 支持 buff 的节点式编辑（前期）。
1. 支持导出 JSON 数据让游戏使用（前期）。
1. 支持数值的实时修改（前期）。
1. 支持 buff 等级（后期）。
1. 支持人物动作（dragonbones）和 buff 的回放预览（后期）。
1. 支持简单的AI和副本配置（后期）。
1. 支持物品定义、合成配方定义（合成这个概念，可以包含并支持升级、强化、任务、奖励、人物背包、活动等等模块）。（前期）
1. 支持 [HServer](https://github.com/moketao/HServer)，一个游戏的后端，主要用来解析 HE 解析的 json，并校验玩家的合成请求，下发产出物品给玩家。（大后期，求外援）

### 关于HE的几个疑问：

>为什么不直接使用粒子编辑器+配表的方式？
>>因为不直观，不方便实时预览，以至于配表很难做出细致入微的效果（除非操作者非常有耐心并且想象力丰富）。

>为什么不用 starling 或者 html5 来实现界面？
>>因为两者的 input控件 表现不够稳定，同时显存有上限。

>预计支持哪套流程？
>>暂定先支持 Laya 2D，后面如果有时间，加入 Egret 3D支持，或者 three.js。


![部分界面截图](https://github.com/moketao/HEditor/raw/master/snap/snap.png)

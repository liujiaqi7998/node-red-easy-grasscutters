# node-red-easy-grasscutters 

![image-20220831193232720](https://raw.githubusercontent.com/liujiaqi7998/GraphicBed/main/img/202208311932848.png)

本插件为 [EasyGrasscutters](https://github.com/liujiaqi7998/EasyGrasscutters) 提供基于node-red的节点

你想有一个完善的剧情的体验吗？你想自己创建剧情吗？你想在游戏内实现小游戏吗？

EasyGrasscutters满足你！

这个插件拥有超过19（未来更新还会添加）个节点包括：9个执行功能节点，5个事件监听器和其他各种功能节点。

可以实现：添加剧情、完成剧情、添加实体、传送等功能。

也可以实现监听：剧情状态、玩家是否在指定位置、玩家是否杀死怪物等状态。

你可以使用工具箱里面的节点创作，实现你的剧情线和小游戏。

你甚至可以添加其他模块，与我的世界，智能家居，等其他领域联动！

**说明**：

本插件为我一人耗时打造，可能在某些说明或功能上处理的不尽人意，你可以[提交Issues](https://github.com/liujiaqi7998/node-red-easy-grasscutters/issues)来取得我的帮助（如果我看到的话一定会帮你），当然，如果你喜欢这个项目还请给我一个Star

我平时维护时间较少，还请看到项目有能力的大佬帮助维护一下，我会及时合并请求

I'd really like to internationalize this project, but it's thought it's a lot of work and needs a good translation, I'd appreciate it if you could help translate

## 版本说明

### v0.0.1
* 实现基本的节点，可以实现命令调试。

### v0.0.2
* 修改了目录结构，修复SSL证书问题，优化节点界面，优化解释。


## 使用方法

开始之前，请确认服务器端已经安装了EasyGrasscutters插件，请查看：

[liujiaqi7998/EasyGrasscutters: 一款可以自由设计的Grasscutters插件 (github.com)](https://github.com/liujiaqi7998/EasyGrasscutters)

**Node-RED和本组件安装和使用方法：**

1. 安装Node-RED，关于安装方法请参考   [中文翻译文档（旧）]([Node-RED : 安装 (17coding.net)](https://nodered.17coding.net/docs/getting-started/installation))  [Official Documentation](https://nodered.org/docs/getting-started/local)

2. 在 “设置” -> “控制板” -> “安装” 中搜索本插件，并安装

   <img src="https://raw.githubusercontent.com/liujiaqi7998/GraphicBed/main/img/202208311939799.png" alt="image-20220831193901665" style="zoom:40%;" />

3. 安装完成后重启Node-RED

4. 在节点栏中可以看到Grasscutters分类

   <img src="https://raw.githubusercontent.com/liujiaqi7998/GraphicBed/main/img/202208311940143.png" alt="image-20220831194046033" style="zoom: 50%;" />

5. 拖动要部署的功能节点到流程图

   <img src="https://raw.githubusercontent.com/liujiaqi7998/GraphicBed/main/img/202208311957140.png" alt="image-20220831195746048" style="zoom:50%;" />

6. 双击节点添加服务器

   <img src="https://raw.githubusercontent.com/liujiaqi7998/GraphicBed/main/img/202208311953680.png" alt="image-20220831195327547" style="zoom: 50%;" />

7. 点击部署开始自动化

   <img src="https://raw.githubusercontent.com/liujiaqi7998/GraphicBed/main/img/202208311954720.png" alt="image-20220831195425638" style="zoom:50%;" />

## 导入例程

点击“菜单”->“导入”->“例子”，找到你需要的例程

![image-20220831205447152](https://raw.githubusercontent.com/liujiaqi7998/GraphicBed/main/img/202208312054362.png)

## 注意事项

本插件遵循 [GPL-3.0 license](https://github.com/liujiaqi7998/EasyGrasscutters/blob/master/LICENSE) 协议，禁止对原插件商用，二次修改需要添加说明并开源！

但是如果你通过本插件制作了自己的流程，不算本插件衍生品，你可以自由支配你的劳动成果，如公开分享或是交易



## 任务进度

- [x] 完成基本节点

- [x] 实现发送信息

- [x] 实现发送邮件

- [x] 杀怪检测

- [x] 剧情完成检测

- [x] 位置检测

- [ ] NPC添加

- [ ] NPC对话

## 已知问题

1. 提示： Warning: Setting the NODE_TLS_REJECT_UNAUTHORIZED... 是插件禁用了https检测导致的，为了让本地用户使用https连接，不会对使用产生影响。

---
title: VContainer + R3：解耦之后如何组织业务代码
date: 2026-09-30
tags: [Unity, 架构]
readingTime: 13
---

# VContainer + R3：解耦之后如何组织业务代码

卡牌战斗这种系统，天然是"一堆系统互相通知"的形状：出牌 → 伤害结算 → 特效播放 → UI 更新 → 回合推进。如果全部用直接引用，代码会迅速变成一团线。VContainer（依赖注入）+ R3（响应式）的组合，就是用来把线捋直的。这篇记录的是解耦之后的代码组织方式，不重复官方文档。

## 先定职责边界

解耦的前提是职责清楚。游戏里分成三层：

- **数据层**：卡牌数据、玩家状态、战斗状态机。不依赖任何 UI 和表现。
- **逻辑层**：规则结算、事件流。只跟数据层打交道。
- **表现层**：特效、动画、UI。订阅逻辑层的事件，永远不主动改数据。

任何一条跨层引用都是"线"，解耦的目标就是让线只在固定方向存在：表现 → 逻辑 → 数据。

## VContainer 里怎么注册

按功能模块写 Installer，每个模块自己注册自己需要的东西：

```csharp
public class BattleInstaller : IInstaller
{
    public void Install(IContainerBuilder builder)
    {
        builder.Register<BattleState>(Lifetime.Singleton);
        builder.Register<DamageCalculator>(Lifetime.Singleton);
        builder.Register<BattleEventBus>(Lifetime.Singleton);
    }
}
```

原则：

- 全局唯一的状态用 `Singleton`，比如 BattleState。
- 每个敌人、每张卡都有的东西用 `Transient`。
- 构造函数注入，别用 `Resolve` 满天飞。构造函数注入失败在编译期附近就能暴露，`Resolve` 失败要跑到运行时才知道。

## R3 怎么组织事件

事件用 R3 的 `Observable` 流来组织。战斗事件总线就是一个发布点，各系统只订阅自己关心的：

```csharp
public class BattleEventBus
{
    private readonly Subject<CardPlayed> _cardPlayed = new();
    private readonly Subject<DamageDealt> _damageDealt = new();

    public Observable<CardPlayed> OnCardPlayed => _cardPlayed;
    public Observable<DamageDealt> OnDamageDealt => _damageDealt;

    public void PublishCardPlayed(CardPlayed e) => _cardPlayed.OnNext(e);
    // ...
}
```

表现层订阅、逻辑层发布，谁也不直接持有谁。特效系统订阅 `OnDamageDealt` 播水墨溅开，UI 订阅它更新血条，两个订阅者互不知道对方存在。

## 生命周期：记得 Dispose

R3 的坑在于**订阅不释放就是泄漏**。UI 关闭、战斗结束后，`AddTo` 必须跟上：

```csharp
bus.OnCardPlayed
   .Where(e => e.ownerId == myId)
   .Subscribe(OnMyCardPlayed)
   .AddTo(disposables);
```

UI 的 `disposables` 在关闭时统一释放。宁可多写 `AddTo`，不要赌"反正常驻不用管"——战斗场景反复进出，泄漏几轮就卡。

## 解耦后的组织套路

一个功能落地时的固定流程：

1. 数据层定义状态和事件类型（纯 C#，不引用 UnityEngine 的 UI 类）。
2. 逻辑层写规则，发布事件。
3. 表现层写订阅和表现，`AddTo` 绑定生命周期。
4. Installer 里把三样注册好，场景或页面里 `Resolve` 入口。

这个套路跑顺之后，加一个新系统基本是复制粘贴模板再改业务，不用再担心牵一发动全身。

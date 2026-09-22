---
title: "线段树"
published: 2023-05-11
publishedAt: 2023-05-11T21:54:00+08:00
tags: ["数据结构", "算法"]
category: "数据结构"
draft: false
---

开新坑力（好耶）。这篇文章主要用于线段树知识总结与技巧积累。

线段树通常用来维护信息、回答题目中的问题。我们把信息储存到一段区间中，并通过合并左右小区间的信息得到答案。修改小区间后，在回溯时重新合并即可。

区间修改时使用懒标记：当当前区间已经被包含在要修改的区间中，就记录标记而不继续向下传。查询时再下放标记，并将标记清零。

> 对一个区间加 2，再对其加 3，其实就是对它一起加了 5，所以本质上几次一样的操作都可以整成一次操作。

## 维护复杂信息

以维护左右区间的信息为例：合并时保存最大值、最小值、左右跨区间的最优值，以及区间答案。

```cpp
#include<bits/stdc++.h>
using namespace std;
const int M=5e5+5;
int a[M],b[M],ma[4*M],mi[4*M],rr[4*M],ll[4*M],tree[4*M];
struct node{int ma,mi,ll,rr,tree;};
void pushup(int rt)
{
    ma[rt]=max(ma[rt<<1],ma[rt<<1|1]);
    mi[rt]=min(mi[rt<<1],mi[rt<<1|1]);
    ll[rt]=max(max(ll[rt<<1],ll[rt<<1|1]),ma[rt<<1]-mi[rt<<1|1]);
    rr[rt]=max(max(rr[rt<<1],rr[rt<<1|1]),ma[rt<<1|1]-mi[rt<<1]);
    tree[rt]=max(max(tree[rt<<1],tree[rt<<1|1]),max(ll[rt<<1]+ma[rt<<1|1],ma[rt<<1]+rr[rt<<1|1]));
}
void build(int l,int r,int rt)
{
    if(l==r){ma[rt]=a[l],mi[rt]=b[l],ll[rt]=rr[rt]=tree[rt]=-1e9;return;}
    int mid=(l+r)/2;build(l,mid,rt<<1);build(mid+1,r,rt<<1|1);pushup(rt);
}
void change(int l,int r,int rt,int x,int val,int flag)
{
    if(l==r){if(flag==0) ma[rt]=val;else mi[rt]=val;return;}
    int mid=(l+r)/2;
    if(x<=mid) change(l,mid,rt<<1,x,val,flag);else change(mid+1,r,rt<<1|1,x,val,flag);
    pushup(rt);
}
node find(int l,int r,int rt,int x,int y)
{
    node ans={-100000000,100000000,-100000000,-1000000000,-100000000},L,R;
    if(r<x||l>y) return ans;
    if(l>=x&&r<=y){ans.ll=ll[rt],ans.rr=rr[rt],ans.tree=tree[rt],ans.mi=mi[rt],ans.ma=ma[rt];return ans;}
    int mid=(l+r)/2;L=find(l,mid,rt<<1,x,y);R=find(mid+1,r,rt<<1|1,x,y);
    ans.ma=max(L.ma,R.ma),ans.mi=min(L.mi,R.mi);
    ans.ll=max(max(L.ll,R.ll),L.ma-R.mi),ans.rr=max(max(L.rr,R.rr),R.ma-L.mi);
    ans.tree=max(max(L.tree,R.tree),max(L.ll+R.ma,L.ma+R.rr));
    return ans;
}
```

这类题的核心套路是：一个大块的答案由左边一块与右边一块合并得到。例题：[P7706 文文的摄影布置](https://www.luogu.com.cn/problem/P7706)、[P4513 小白逛公园](https://www.luogu.com.cn/problem/P4513)。

## 维护单调序列

例如 [P4198 楼房重建](https://www.luogu.com.cn/problem/P4198)，以斜率为权值，维护从起点出发的单调序列长度。分治合并时根据左右区间最大值递归查找可见部分。

## 标记维护

区间赋值与区间取反可以通过合并标记处理：赋值标记会覆盖取反标记；已有赋值标记时再取反，只需把赋值结果取反。这样两种标记不会互相冲突。

例题：[P2572 序列操作](https://www.luogu.com.cn/problem/P2572)、[P3373 线段树 2](https://www.luogu.com.cn/problem/P3373)。

## 区间最值操作

以区间取 `min` 为例，维护区间最大值 `ma` 与严格次大值 `maa`：

- `ma <= x`：修改不会产生影响；
- `maa < x < ma`：只修改最大值；
- `x <= maa`：继续向下递归。

这种做法的复杂度可以证明为 $O(n\log^2 n)$。

## 区间历史最值

维护当前最大值 `max`、历史最大值 `hmax`、区间加标记 `add` 与历史最大加值标记 `hadd`。下放时先维护历史最大值，再维护当前最大值，注意标记的先后顺序。例题：[P4314 CPU 监控](https://www.luogu.com.cn/problem/P4314)、[P6242 线段树 3](https://www.luogu.com.cn/problem/P6242)。

有些信息可以合并，许多标记也可以合并；实际做题时应根据操作顺序设计节点信息与懒标记。

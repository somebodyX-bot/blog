---
title: "树基础"
published: 2025-04-23
tags: ["图论", "树论", "算法"]
category: "图论"
draft: false
---

## 1. 树的直径

树上任意两节点之间最长的简单路径即为树的“直径”。

首先从任意节点开始进行第一次 DFS，到达距离其最远的节点，记为 $x$，然后再从 $x$ 开始做第二次 DFS，到达距离 $x$ 最远的节点，记为 $y$，则 $x$ 与 $y$ 的距离即为树的直径。

## 2. 树的重心

如果在树中选择某个节点并删除，这棵树将分为若干棵子树，统计子树节点数并记录最大值。取遍树上所有节点，使此最大值取到最小的节点被称为整个树的重心。

```cpp
#include<bits/stdc++.h>
using namespace std;
bool v[100005],vv[100005];
int son[100005],n;
int tot=0,nxt[200005],ver[200005],head[200005];
void add(int x,int y)
{
    tot++,nxt[tot]=head[x],head[x]=tot,ver[tot]=y;
}
void dfs(int x)
{
    vv[x]=1;
    for(int i=head[x];i;i=nxt[i])
    {
        int y=ver[i];
        if(vv[y]) continue;
        dfs(y);
        if(son[y]>n/2) v[x]=1;
        son[x]+=son[y];
    }
    son[x]++;
    if(n-son[x]>n/2) v[x]=1;
}
int main()
{
    int x,y;
    scanf("%d",&n);
    for(int i=1;i<n;i++)
    {
        scanf("%d%d",&x,&y);
        add(x,y),add(y,x);
    }
    dfs(1);
    for(int i=1;i<=n;i++) if(!v[i]) printf("%d ",i);
    return 0;
}
```

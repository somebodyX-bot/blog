---
title: "树链剖分"
published: 2025-04-23
tags: ["树论", "算法"]
category: "树论"
draft: false
---

树链剖分用于将树分割成若干条链的形式，以维护树上路径的信息。

具体来说，将整棵树剖分为若干条链，使它组合成线性结构，然后用其他的数据结构维护信息。

```cpp
void add(int x,int y)
{
    tot++;
    nxt[tot]=head[x];
    head[x]=tot;
    ver[tot]=y;
}
void dfs1(int x,int fa)
{
    int u=0,ma=0;
    dep[x]=dep[fa]+1,f[x]=fa,siz[x]=1;
    for(int i=head[x];i;i=nxt[i])
    {
        int y=ver[i];
        if(y==fa) continue;
        dfs1(y,x),siz[x]+=siz[y];
        if(ma<siz[y]) ma=siz[y],u=y;
    }
    son[x]=u;
}
void dfs2(int x,int fa,int topp)
{
    top[x]=topp;
    if(!son[x]) return;
    dfs2(son[x],x,topp);
    for(int i=head[x];i;i=nxt[i])
    {
        int y=ver[i];
        if(y==fa||y==son[x]) continue;
        dfs2(y,x,y);
    }
}
int find(int x,int y)
{
    while(top[x]!=top[y])
    {
        if(dep[top[x]]>dep[top[y]]) x=f[top[x]];
        else y=f[top[y]];
    }
    if(dep[x]<=dep[y]) return x;
    else return y;
}
```

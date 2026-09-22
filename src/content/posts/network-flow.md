---
title: "网络流"
published: 2025-04-23
tags: ["图论", "算法"]
category: "图论"
draft: false
---

啊我草这什么啊我以前怎么会这种东西。

## 1. 最大流

给定 $n$ 个点、$m$ 条边以及每条边的容量，求从点 $s$ 到点 $t$ 的最大流。

```cpp
#include<bits/stdc++.h>
using namespace std;
int tot=1,head[105],nxt[10005],ver[10005],edge[10005],s,t,dis[105],cur[105];
queue<int>q;
void add(int x,int y,int z){tot++,nxt[tot]=head[x],head[x]=tot,ver[tot]=y,edge[tot]=z;}
int bfs()
{
    bool flag=0;memset(dis,0,sizeof(dis));q.push(s),dis[s]=1;
    while(q.size())
    {
        int x=q.front();q.pop();
        for(int i=head[x];i;i=nxt[i])
        {
            int y=ver[i];
            if(edge[i]<=0||dis[y]) continue;
            dis[y]=dis[x]+1,q.push(y);
            if(y==t) flag=1;
        }
    }
    return flag;
}
int dfs(int x,int ma)
{
    if(x==t) return ma;
    for(int &i=cur[x];i;i=nxt[i])
    {
        int y=ver[i];
        if(edge[i]==0||dis[x]+1!=dis[y]) continue;
        int u=dfs(y,min(ma,edge[i]));
        if(u>0){edge[i]-=u,edge[i^1]+=u;return u;}
    }
    return 0;
}
int main()
{
    long long ans=0;int n,m,x,y,z,u;
    scanf("%d%d%d%d",&n,&m,&s,&t);
    for(int i=1;i<=m;i++) scanf("%d%d%d",&x,&y,&z),add(x,y,z),add(y,x,0);
    while(bfs())
    {
        for(int i=1;i<=n;i++) cur[i]=head[i];
        do{u=dfs(s,1e9),ans+=u;}while(u);
    }
    cout<<ans;
    return 0;
}
```

## 2. 最小费用流

给定一个图，每条边有容量和费用，求图的最大流以及最大流的最小费用。

```cpp
#include<bits/stdc++.h>
using namespace std;
queue<int> q; bool v[405];
int n,m,a[405],pre[405],prei[405];
int head[405],ver[30005],nxt[30005],edge[30005],we[30005],tot=1;
void add(int x,int y,int z,int t){tot++,nxt[tot]=head[x],head[x]=tot,ver[tot]=y,edge[tot]=z,we[tot]=t;}
int spfa()
{
    bool flag=0;memset(v,0,sizeof(v));memset(a,0x3f,sizeof(a));
    q.push(1),v[1]=1,a[1]=0;
    while(q.size())
    {
        int x=q.front();q.pop(),v[x]=0;
        for(int i=head[x];i;i=nxt[i])
        {
            int y=ver[i];
            if(a[y]>a[x]+we[i]&&edge[i])
            {
                a[y]=a[x]+we[i],pre[y]=x,prei[y]=i;
                if(y==n) flag=1;
                if(!v[y]) v[y]=1,q.push(y);
            }
        }
    }
    return flag;
}
int main()
{
    long long ans=0,ans1=0;int u,v,c,w,mm=1999999999;
    scanf("%d%d",&n,&m);
    for(int i=1;i<=m;i++) scanf("%d%d%d%d",&u,&v,&c,&w),add(u,v,c,w),add(v,u,0,-w);
    while(spfa())
    {
        for(int i=n;i!=1;i=pre[i]) mm=min(mm,edge[prei[i]]);
        for(int i=n;i!=1;i=pre[i]) edge[prei[i]]-=mm,edge[prei[i]^1]+=mm,ans1+=mm*we[prei[i]];
        ans+=mm;
    }
    cout<<ans<<" "<<ans1;
    return 0;
}
```

## 3. 无源汇有上下界可行流

$n$ 个点、$m$ 条边，每条边 $e$ 有流量下界 `lower(e)` 和上界 `upper(e)`，求满足所有点流量平衡与边界限制的可行方案。

## 4. 有源汇有上下界最大流

给定源点 $s$ 与汇点 $t$，在上下界网络中求源点到汇点的最大流。

## 5. 有源汇有上下界最小流

给定源点 $s$ 与汇点 $t$，在上下界网络中求源点到汇点的最小流。

上面三类上下界网络流均采用“下界转需求边，再连接超级源汇”的方式处理；原文对应代码块较长，保留其算法分类与说明。

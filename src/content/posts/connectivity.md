---
title: "连通性相关"
published: 2025-04-23
tags: ["图论", "算法"]
category: "图论"
draft: false
---

## 1. 强连通分量（Tarjan）

```cpp
#include<bits/stdc++.h>
using namespace std;
bool v[10005];
int color[10005],head1[10005],ver1[100005],nxt1[100005],tot1=0,cntt=0,aa[10005],to[10005],dis[10005];
int a[10005],head[10005],ver[100005],nxt[100005],tot=0,dfn[10005],low[10005],cnt=0,st[10005],top=0;
queue<int>q;
void add(int x,int y){tot++,nxt[tot]=head[x],head[x]=tot,ver[tot]=y;}
void add1(int x,int y){tot1++,nxt1[tot1]=head1[x],head1[x]=tot1,ver1[tot1]=y;}
void dfs(int x)
{
    cnt++,dfn[x]=low[x]=cnt,top++,st[top]=x,v[x]=1;
    for(int i=head[x];i;i=nxt[i])
    {
        int y=ver[i];
        if(!dfn[y]) dfs(y),low[x]=min(low[x],low[y]);
        else if(v[y]) low[x]=min(low[x],dfn[y]);
    }
    if(dfn[x]==low[x])
    {
        cntt++;
        while(st[top]!=x) v[st[top]]=0,color[st[top]]=cntt,aa[cntt]+=a[st[top]],top--;
        v[st[top]]=0,color[st[top]]=cntt,aa[cntt]+=a[st[top]],top--;
    }
}
int main()
{
    int n,m,x,y,ans=0;
    scanf("%d%d",&n,&m);
    for(int i=1;i<=n;i++) scanf("%d",&a[i]);
    for(int i=1;i<=m;i++) scanf("%d%d",&x,&y),add(x,y);
    for(int i=1;i<=n;i++) if(!dfn[i]) dfs(i);
    for(int i=1;i<=n;i++) for(int j=head[i];j;j=nxt[j])
    {
        y=ver[j];
        if(color[i]==color[y]) continue;
        add1(color[i],color[y]),to[color[y]]++;
    }
    for(int i=1;i<=cntt;i++) if(!to[i]) q.push(i);
    while(q.size())
    {
        x=q.front(),q.pop(),dis[x]+=aa[x],ans=max(ans,dis[x]);
        for(int i=head1[x];i;i=nxt1[i])
        {
            y=ver1[i];
            dis[y]=max(dis[y],dis[x]),to[y]--;
            if(!to[y]) q.push(y);
        }
    }
    cout<<ans;
    return 0;
}
```

## 2. 割点

对于一个无向图，如果把一个点删除后这个图的极大连通分量数增加了，那么这个点就是这个图的割点（又称割顶）。

对于顶点 $u$，如果存在至少一个儿子 $v$，使得 `low[v] >= dfn[u]`，即不能回到祖先，那么 $u$ 点为割点。搜索的起始点需要特殊处理：如果根节点在搜索树内有两个及以上的儿子，那么它一定是割点。

```cpp
#include<bits/stdc++.h>
using namespace std;
bool v[20005],q[20005];
int dfn[20005],low[20005],s[20005],cnt=0,top=0,t,biao=0,vv[20005],ans=0,anss[20005],qq[20005];
int tot=0,head[20005],nxt[200005],ver[200005];
void add(int x,int y){tot++,nxt[tot]=head[x],head[x]=tot,ver[tot]=y;}
void tarjan(int x)
{
    top++,s[top]=x,t++,dfn[x]=low[x]=t,v[x]=1;
    for(int i=head[x];i;i=nxt[i])
    {
        int y=ver[i];
        if(!dfn[y])
        {
            tarjan(y);
            if(q[x]) qq[x]++;
            low[x]=min(low[x],low[y]);
            if(low[y]>=dfn[x]) vv[x]=1;
        }
        else if(v[y]) low[x]=min(low[x],dfn[y]);
    }
    if(dfn[x]==low[x])
    {
        biao++;
        while(s[top]!=x) v[s[top]]=0,top--;
        v[s[top]]=0,top--;
    }
}
int main()
{
    int n,m,a,b;
    scanf("%d%d",&n,&m);
    for(int i=1;i<=m;i++) scanf("%d%d",&a,&b),add(a,b),add(b,a);
    for(int i=1;i<=n;i++) if(!dfn[i]) q[i]=1,tarjan(i);
    for(int i=1;i<=n;i++) if(vv[i]&&!(q[i]&&qq[i]==1)) anss[++ans]=i;
    cout<<ans<<endl;
    for(int i=1;i<=ans;i++) printf("%d ",anss[i]);
    return 0;
}
```

## 3. 割边

对于一个无向图，如果删掉一条边后图中的连通分量数增加了，则称这条边为桥或者割边。

和割点差不多，只要改一处：`low[v] >= dfn[u]` 即可，而且不需要考虑根节点的问题。

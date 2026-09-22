---
title: "最短路"
published: 2025-04-23
tags: ["图论", "算法"]
category: "图论"
draft: false
---

## 1. Dijkstra

```cpp
#include<bits/stdc++.h>
using namespace std;
priority_queue<pair<int,int> > q;
int dis[200005],v[200005];
int head[200005],nxt[200005],ver[200005],edge[200005],tot=0;
void add(int x,int y,int z){tot++,nxt[tot]=head[x],head[x]=tot,ver[tot]=y,edge[tot]=z;}
int main()
{
    int n,m,s,t,a,b,c;
    cin>>n>>m>>s>>t;
    for(int i=1;i<=m;i++) scanf("%d%d%d",&a,&b,&c),add(a,b,c),add(b,a,c);
    memset(dis,0x3f,sizeof(dis));
    dis[s]=0,q.push(make_pair(0,s));
    while(q.size())
    {
        int x=q.top().second;q.pop();
        if(v[x]) continue;
        v[x]=1;
        for(int i=head[x];i;i=nxt[i])
        {
            int y=ver[i];
            dis[y]=min(dis[x]+edge[i],dis[y]);
            q.push(make_pair(-dis[y],y));
        }
    }
    cout<<dis[t];
    return 0;
}
```

## 2. SPFA

```cpp
#include<bits/stdc++.h>
using namespace std;
bool v[3000];
int head[6000],ver[6000],nxt[6000],edge[6000],tot=0,cnt[3000],dist[3000];
queue<int> q;
void add(int x,int y,int z){tot++,nxt[tot]=head[x],head[x]=tot,ver[tot]=y,edge[tot]=z;}
int main()
{
    int f,n,m,w,s,e,t;
    cin>>f;
    for(int p=1;p<=f;p++)
    {
        bool flag=0;tot=0;
        while(q.size()) q.pop();
        memset(head,0,sizeof(head));memset(cnt,0,sizeof(cnt));
        memset(dist,0x3f,sizeof(dist));memset(v,0,sizeof(v));dist[1]=0;
        cin>>n>>m>>w;
        for(int i=1;i<=m;i++) cin>>s>>e>>t,add(s,e,t),add(e,s,t);
        for(int i=1;i<=w;i++) cin>>s>>e>>t,add(s,e,-t);
        q.push(1),v[1]=1;
        while(q.size())
        {
            int x=q.front();q.pop();v[x]=0;
            for(int i=head[x];i;i=nxt[i])
            {
                int y=ver[i];
                if(dist[y]>dist[x]+edge[i])
                {
                    dist[y]=dist[x]+edge[i];
                    if(!v[y]) cnt[y]=cnt[x]+1,q.push(y),v[y]=1;
                }
                if(cnt[y]>n){cout<<"YES"<<endl;flag=1;break;}
            }
            if(flag) break;
        }
        if(!flag) cout<<"NO"<<endl;
    }
    return 0;
}
```

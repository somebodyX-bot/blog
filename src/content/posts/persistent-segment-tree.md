---
title: "可持久化线段树"
published: 2025-04-23
tags: ["数据结构", "算法"]
category: "数据结构"
draft: false
---

给定 $n$ 个整数构成的序列 $a$，将对于指定的闭区间 $[l,r]$ 查询其区间内的第 $k$ 小值。

```cpp
#include<bits/stdc++.h>
using namespace std;
struct node
{
    int val,x;
}a[200005];
int tree[4000005],r[4000005],l[4000005],tot=0,root[200005],b[200005],lastt=0;
void insert(int now,int last,int ll,int rr,int x)
{
    if(ll==rr)
    {
        tree[now]=tree[last]+1;
        return;
    }
    int mid=(ll+rr)/2;
    if(x<=mid)
    {
        if(!l[now]) tot++,l[now]=tot;
        insert(l[now],l[last],ll,mid,x);
        r[now]=r[last];
    }
    else
    {
        if(!r[now]) tot++,r[now]=tot;
        insert(r[now],r[last],mid+1,rr,x);
        l[now]=l[last];
    }
    tree[now]+=tree[l[now]]+tree[r[now]];
}
int find(int xx1,int xx2,int ll,int rr,int x)
{
    if(ll==rr) return ll;
    int k=tree[l[xx2]]-tree[l[xx1]],mid=(ll+rr)/2;
    if(x<=k) return find(l[xx1],l[xx2],ll,mid,x);
    else return find(r[xx1],r[xx2],mid+1,rr,x-k);
}
int main()
{
    int n,m,x,y,k,s;
    scanf("%d%d",&n,&m);
    for(int i=1;i<=n;i++) scanf("%d",&a[i].val),b[i]=a[i].val;
    sort(b+1,b+n+1);
    for(int i=1;i<=n;i++) a[i].x=lower_bound(b+1,b+n+1,a[i].val)-b;
    for(int i=1;i<=n;i++)
    {
        tot++,root[i]=tot;
        insert(tot,lastt,1,n,a[i].x);
        lastt=root[i];
    }
    for(int i=1;i<=m;i++)
    {
        scanf("%d%d%d",&x,&y,&k);
        s=find(root[x-1],root[y],1,n,k);
        printf("%d\n",b[s]);
    }
    return 0;
}
```

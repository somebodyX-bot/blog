---
title: "莫队"
published: 2022-06-26
publishedAt: 2022-06-26T21:40:00+08:00
tags: ["数据结构", "算法"]
category: "数据结构"
draft: false
---

与分块一样是根号类型数据结构，但必须保证题目离线。常数有点大，但打得好可以吊打一众在线数据结构（大概）。

莫队的重点在移动区间——处理答案。先把询问离线，对整个区间分块，按左端点所在块的标号为第一关键字、右端点为第二关键字排序，遍历询问时移动目标区间并更新答案。

```cpp
while(r<rr) r++,add(r);
while(l>ll) l--,add(l);
while(r>rr) del(r),r--;
while(l<ll) del(l),l++;
```

先扩大区间，再缩小。还可以使用奇偶排序优化：左块编号为奇数时右端点升序，偶数时降序。

```cpp
bool cmp(node x,node y)
{
    if(x.kuai==y.kuai)
    {
        if(x.kuai%2) return x.r<y.r;
        else return x.r>y.r;
    }
    return x.kuai<y.kuai;
}
```

## 1. 莫队

例题：[小Z的袜子](https://www.luogu.com.cn/problem/P1494)。每个颜色 $i$ 的贡献为 `cnt[i] * (cnt[i]-1) / 2`，移动区间时修改对应贡献，最后约分。

```cpp
#include<bits/stdc++.h>
using namespace std;
long long anss1[50005],anss2[50005],ans=0;
int c[50005],t[50005];
struct node{int l,r,id,kuai;}q[50005];
bool cmp(node x,node y){if(x.kuai==y.kuai)return x.kuai%2?x.r<y.r:x.r>y.r;return x.kuai<y.kuai;}
long long C(int x){return x?1ll*x*(x-1)/2:0;}
void add(int x){ans-=C(t[c[x]]),t[c[x]]++,ans+=C(t[c[x]]);}
void del(int x){ans-=C(t[c[x]]),t[c[x]]--,ans+=C(t[c[x]]);}
long long gc(long long a,long long b){return b?gc(b,a%b):a;}
int main()
{
    long long sum;int n,m,h,l=1,r=0,ll,rr,x;
    scanf("%d%d",&n,&m);h=sqrt(n);
    for(int i=1;i<=n;i++) scanf("%d",&c[i]);
    for(int i=1;i<=m;i++) scanf("%d%d",&q[i].l,&q[i].r),q[i].id=i,q[i].kuai=q[i].l/h+1;
    sort(q+1,q+m+1,cmp);
    for(int i=1;i<=m;i++)
    {
        ll=q[i].l,rr=q[i].r;
        if(ll==rr){anss1[q[i].id]=0,anss2[q[i].id]=1;continue;}
        while(r<rr) r++,add(r);while(l>ll) l--,add(l);while(r>rr) del(r),r--;while(l<ll) del(l),l++;
        sum=C(r-l+1);x=gc(ans,sum);anss1[q[i].id]=ans/x,anss2[q[i].id]=sum/x;
        if(!ans) anss1[q[i].id]=0,anss2[q[i].id]=1;
    }
    for(int i=1;i<=m;i++) printf("%lld/%lld\n",anss1[i],anss2[i]);
    return 0;
}
```

## 2. 带修莫队

在左端点、右端点的基础上再增加一维时间。排序时把修改发生的时间作为第三关键字，移动询问时同时执行或撤销修改。

## 3. bitset 套莫队

用一段 `bitset` 表示某个数出现次数的信息，多个区间取公共元素时直接按位与。例题：[P4688 掉进兔子洞](https://www.luogu.com.cn/problem/P4688)。

## 4. 回滚莫队

适合添加容易、删除困难的答案维护。右端点只向右拓展，左端点在当前块内来回移动；每次询问结束后恢复到拓展完右端点后的状态。

例题：[歴史の研究](https://www.luogu.com.cn/problem/AT_joisc2014_c)。

## 5. 莫队二次离线

把移动区间时的贡献记录下来，统一处理改变区间后对贡献的影响，从而将复杂度分离。模板题：[P4887 莫队二次离线](https://www.luogu.com.cn/problem/P4887)。

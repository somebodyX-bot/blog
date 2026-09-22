---
title: "[ABC306F] Merge Sets 题解"
published: 2023-06-18
publishedAt: 2023-06-18T10:02:00+08:00
description: ''
image: ''
tags: ["题解", "算法"]
category: "题解"
draft: false
lang: ''
---

# [ABC306F] Merge Sets 题解

## 题意简述

给定 $n$ 个大小为 $m$ 的集合(任意两个集合的数不重复)，每次选定两个集合 $S_i$，$S_j$ （$i<j$），将 $S_i$，$S_j$ 中的数加入到序列 $C$ 中并从小往大排序，算出在 $C$ 中原本属于集合 $S_i$ 的数在 $C$ 中的下标和 $ans_{i,j}$。最后答案为 $\sum\limits_{i=1}^{n-1} \sum\limits_{j=i+1}^n ans_{i,j}$。

## 解法

考虑到数据范围（$n\le10^4$），枚举两个集合再排序求答案肯定是不行的，所以我们可以换一种思路：计算一个集合中的一个数对另一个数的贡献。也就是说，**把原本集合对集合的贡献转化为数对数的贡献**。

根据题意可得，一个数 $p$ 小于 另一个数 $q$ 时，说明当这两数所属集合进行排列时 $p$ 会排在 $q$ 的前面，也就是说 $p$ 会使 $q$ 的排名 $+1$。

按照这种思路，我们可以分几种情况考虑（$i$ , $j$ 为任意两个集合，$x$ , $y$ 为两数在集合中的下标）：

* $a_{i,x}>a_{j,y}$，$a_{i,x}$ 不对 $a_{j,y}$ 产生贡献。
* $a_{i,x}<a_{j,y}$，$a_{i,x}$ 可能对 $a_{j,y}$ 产生贡献。

从第二种情况中再分为三类考虑：

* $i<j$，$a_{i,x}$ 对 $a_{j,y}$ 产生 $1$ 的贡献。
* $i>j$，$a_{i,x}$ 不对 $a_{j,y}$ 产生贡献。
* $i=j$，在每次与其他集合的计算中 $a_{i,x}$ 都会对 $a_{j,y}$ 产生 $1$ 的贡献，所以总贡献为 $(n-i)$。

于是做法就很清晰了。我们先记录一下每个数是属于哪个集合的，再对所有数从小到大排序，按顺序依次处理每个数。设 $sum_k$ 表示在集合 $k$ 中有多少个数字比当前数字小，当前数所属集合为 $i$，那前面的所有数对当前数的贡献是：$\sum\limits_{k=1}^{i-1} sum_k+sum_i\times(n-i)+(n-i)$。最后还要加一个 $(n-i)$ 是原本排名贡献的 $1$。$sum$ 的和用树状数组维护就可以了。

## 代码

\`\`\`cpp
#include<bits/stdc++.h>
#define lowbit(x) (x&(-(x)))
using namespace std;
int a[10005][105],c[10005],n,m,sum[10005];
struct node
{
    int val,id;
}s[1000005];
bool cmp(node x,node y)
{
    return x.val<y.val;
}
void add(int x,int val)
{
    for(int i=x;i<=n;i+=lowbit(i))
        c[i]+=val;
}
int find(int x)
{
    int ans=0;
    for(int i=x;i;i-=lowbit(i))
        ans+=c[i];
    return ans;
}
int main()
{
    long long ans=0;
    int cnt=0,x;
    scanf("%d%d",&n,&m);
    for(int i=1;i<=n;i++)
        for(int j=1;j<=m;j++)
        {
            scanf("%d",&a[i][j]);
            cnt++,s[cnt].val=a[i][j],s[cnt].id=i;
        }
    sort(s+1,s+cnt+1,cmp);
    for(int i=1;i<=cnt;i++)
    {
        x=s[i].id;
        ans+=find(n)-find(x)+sum[x]*(n-x)+(n-x);
        add(x,1),sum[x]++;
    }
    cout<<ans;
    return 0;
}
\`\`\`

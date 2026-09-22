---
title: "分块"
published: 2022-06-21
publishedAt: 2022-06-21T22:25:00+08:00
tags: ["数据结构", "算法"]
category: "数据结构"
draft: false
---

当正解不会的时候，根号数据结构就很实用了，在此总结一些方法方便打暴力。Ynoi 好耶。

## 1. 分块

将原有序列划分为若干散块，每个散块预处理答案与信息。修改时暴力处理散块中的单点，查询整块时合并预处理答案，边界散块暴力统计。

```cpp
#include<bits/stdc++.h>
using namespace std;
int a[50005],c[50005],tag[50005];
int main()
{
    int n,opt,l,r,q,t,tt=1,cnt=0;
    scanf("%d",&n);t=sqrt(n);
    for(int i=1;i<=n;i++){scanf("%d",&a[i]);c[i]=tt;if(++cnt==t) cnt=0,tt++;}
    for(int i=1;i<=n;i++)
    {
        scanf("%d%d%d%d",&opt,&l,&r,&q);
        if(opt==0)
        {
            if(r-l+1<=t) for(int j=l;j<=r;j++) a[j]+=q;
            else
            {
                int x=c[l]+1,y=c[r]-1;
                for(int j=x;j<=y;j++) tag[j]+=q;
                for(int j=l;j<=t*(x-1);j++) a[j]+=q;
                for(int j=t*y+1;j<=r;j++) a[j]+=q;
            }
        }
        else if(opt==1) printf("%d\n",a[r]+tag[c[r]]);
    }
    return 0;
}
```

分块入门题还包括排序维护、区间和、整块开方、块内插入、乘法与加法标记、区间推平和区间众数等类型。整块预处理、散块暴力是贯穿全文的基本思路。

## 2. 树分块

与普通分块思路相同，但是把操作区间改成树上。例题：[王室联邦](https://www.luogu.com.cn/problem/P2325)、[Count on a tree II](https://www.luogu.com.cn/problem/P6177)。

## 3. 大分块

通过更大的块、块间前缀信息和块内重构处理大规模值域问题。例题：[P4119 未来日记](https://www.luogu.com.cn/problem/P4119)。

其他例题：[作诗](https://www.luogu.com.cn/problem/P4135)、[公约数数列](https://www.luogu.com.cn/problem/P4108)、[蒲公英](https://www.luogu.com.cn/problem/P4168)。

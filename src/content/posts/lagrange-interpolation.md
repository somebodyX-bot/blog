---
title: "拉格朗日插值"
published: 2022-07-15
publishedAt: 2022-07-15T11:32:00+08:00
tags: ["数论", "算法"]
category: "数论"
draft: false
---

今天学了一手，感觉非常的玄学。。。总结一下。

## 0. 我们为什么要学

拉插能吃吗，学它干什么？插值是将已知的点值还原为多项式。

拉格朗日插值是一种求解多项式的算法。已知 $n$ 个点的坐标，我们便可以求得 $n-1$ 次多项式的表达式，时间复杂度为 $O(n^2)$。

FFT 算法中的 IDFT 做的也是这件事，但 IDFT 做的是将特定的点进行插值，拉格朗日插值做的则是给定任意 $n$ 个点进行插值，因此会更加实用。设 $n$ 个未知数列方程来求解的复杂度是 $O(n^3)$，并不优秀。

> 由此可以看出复杂度越高的算法功能越强大，做题时要根据题目要求和数据范围选择合适的算法。

## 1. 拉格朗日插值

由代数基本定理可得：$n$ 个 $x$ 坐标不同的点，可以确定唯一一个最高为 $n-1$ 的多项式。

对于给定的每个点 $k$，构造函数 $f_k(i)$，使其在第 $k$ 个点取值为 $y_k$，在其他点取值为 $0$。原函数为 $g=\sum_{k=1}^n f_k$，答案为 $g(t)$：

$$
ans=\sum_{k=1}^n y_k\prod_{i=1,i\ne k}^n\frac{t-x_i}{x_k-x_i}
$$

时间复杂度为 $O(n^2)$。模板题：[P4781](https://www.luogu.com.cn/problem/P4781)。

```cpp
#include<bits/stdc++.h>
using namespace std;
int x[2005],y[2005],mod=998244353;
int poww(int a,int b)
{
    long long ans=1,x=a;
    while(b){if(b&1) ans=ans*x%mod;x=x*x%mod;b>>=1;}
    return ans;
}
int main()
{
    long long s1,s2,ans=0;int n,kk,xx,yy;
    scanf("%d%d",&n,&kk);
    for(int i=1;i<=n;i++) scanf("%d%d",&x[i],&y[i]);
    for(int k=1;k<=n;k++)
    {
        s1=y[k],s2=1;
        for(int i=1;i<=n;i++)
        {
            if(i==k) continue;
            xx=kk-x[i],yy=x[k]-x[i];
            if(xx<0) xx+=mod;if(yy<0) yy+=mod;
            s1=s1*xx%mod,s2=s2*yy%mod;
        }
        ans=(ans+s1*poww(s2,mod-2))%mod;
    }
    cout<<ans;
    return 0;
}
```

这道题有模数所以需要逆元，而且注意逆元不能一个一个算，会超时。

## 2. 优化

对于 CF622F The Sum of the k-th Powers，答案是一个 $k+1$ 次函数在 $n$ 上的值，可以用 $k+2$ 个点来插值。因为可以任选点，选择 $1\sim k+2$，并利用连续点的性质预处理前缀积、后缀积，把复杂度降到 $O(n)$。

参考：[CF622F](https://codeforces.com/problem/CF622F)、[题解博客](https://www.luogu.com.cn/blog/formkiller/cf622f-the-sum-of-the-k-th-powers-ti-xie)。

```cpp
#include<bits/stdc++.h>
#define ll long long
using namespace std;
int mod=1e9+7;
ll po[1000005],inpo[1000005],a[1000005],pp[1000005],inpp[1000005];
ll poww(int a,int b)
{
    ll ans=1,x=a;
    while(b){if(b&1) ans=ans*x%mod;x=x*x%mod;b>>=1;}
    return ans;
}
int main()
{
    ll s1,s2,ans=0;int n,k;
    scanf("%d%d",&n,&k),k+=2;
    po[0]=pp[0]=1,inpo[k+1]=1;
    for(int i=1;i<=k;i++) po[i]=po[i-1]*(n-i)%mod,pp[i]=pp[i-1]*i%mod;
    for(int i=k;i;i--) inpo[i]=inpo[i+1]*(n-i)%mod;
    for(int i=1;i<=k;i++) a[i]=(a[i-1]+poww(i,k-2))%mod;
    for(int i=1;i<=k;i++)
    {
        s1=po[i-1]*inpo[i+1]%mod,s2=pp[i-1]*pp[k-i]%mod;
        if((k-i)&1) s2*=-1;
        ans=(ans+a[i]*s1%mod*poww(s2,mod-2))%mod;
        if(ans<0) ans+=mod;
    }
    cout<<ans;
    return 0;
}
```

就先总结到这里，之后有需要再补充~~~

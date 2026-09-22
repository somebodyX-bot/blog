---
title: "数论板子"
published: 2025-04-23
tags: ["数论", "算法"]
category: "数论"
draft: false
---

> 附件：基础数论.pdf（2247.7KB）

## 质数筛

```cpp
for(int i=2;i<=n;i++)
{
    if(!v[i]) tot++,prime[tot]=i;
    for(int j=1;j<=tot&&prime[j]*i<=n;j++)
    {
        v[i*prime[j]]=1;
        if(i%prime[j]==0) break;
    }
}
```

## 整除分块

数论分块可以快速计算一些含有除法向下取整的和式。当可以在 $O(1)$ 内计算 $f(r)-f(l-1)$，或已经预处理出 $f$ 的前缀和时，数论分块可以在线性时间内计算相应的和式。

```cpp
ll f(int n,int k)
{
    ll s=0;
    int l=1,r;
    while(l<=n&&k/l)
    {
        r=min(k/(k/l),n);
        s=(s+1ll*f(l,r)*(r-l+1)*(k/l));
        l=r+1;
    }
    return s;
}
```

## 欧拉函数与莫比乌斯函数

欧拉函数 $\phi(n)$ 表示小于等于 $n$ 且与 $n$ 互质的数的个数。

```cpp
miu[1]=1;
for(int i=2;i<=n;i++)
{
    if(!v[i]) tot++,prime[tot]=i,miu[i]=-1;
    for(int j=1;j<=tot&&prime[j]*i<=n;j++)
    {
        v[i*prime[j]]=1;
        if(i%prime[j]==0) {miu[i*prime[j]]=0;break;}
        miu[i*prime[j]]=-miu[i];
    }
}
```

## 扩展欧几里得

裴蜀定理：$\gcd(a,b)\mid ax+by$，且存在整数 $x,y$ 使得 $ax+by=\gcd(a,b)$。

```cpp
void f(long long a,long long b)
{
    if(b==0){x=1;y=0;return;}
    f(b,a%b);
    int k=x;x=y;y=k-a/b*y;
}
// 输出 (x%b+b)%b，注意是否有负数
```

## 欧拉定理 && 费马小定理

费马小定理：若 $p$ 为质数且 $\gcd(a,p)=1$，则 $a^{p-1}\equiv1\pmod p$。

欧拉定理：若 $\gcd(a,p)=1$，则 $a^{\phi(p)}\equiv1\pmod p$。

## 逆元

### 1. 扩展欧几里得法

与求解同余方程同理。

### 2. 欧拉定理 && 费马小定理法

```cpp
inv_a=pow(a,p-2);
```

### 3. 线性递推

```cpp
inv[1] = 1;
for (int i = 2; i <= n; ++i)
    inv[i] = (p - p / i) * inv[p % i] % p;
```

## 中国剩余定理

```cpp
#include<bits/stdc++.h>
#define ll long long
using namespace std;
ll x,y;
int a[15],b[15];
void gc(ll a,ll b)
{
    if(!b){x=1,y=0;return;}
    gc(b,a%b);ll t=x;x=y,y=t-a/b*y;
}
int main()
{
    ll M=1,m,ans=0;int n;
    scanf("%d",&n);
    for(int i=1;i<=n;i++) scanf("%d%d",&a[i],&b[i]),M*=a[i];
    for(int i=1;i<=n;i++)
    {
        m=M/a[i],gc(m,a[i]);x=(x%a[i]+a[i])%a[i];
        ans=(ans+m*x*b[i]%M)%M;
    }
    cout<<ans;
    return 0;
}
```

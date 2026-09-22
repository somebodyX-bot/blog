---
title: "背包"
published: 2025-04-23
tags: ["DP", "算法"]
category: "DP"
draft: false
---

## 1. 01 背包

```cpp
#include<iostream>
using namespace std;
int w[1005],c[1005],dp[1005];
int main()
{
    int m,n;
    cin>>m>>n;
    for(int i=1;i<=n;i++) cin>>w[i]>>c[i];
    for(int i=1;i<=n;i++)
        for(int j=m;j>=w[i];j--)
            dp[j]=max(dp[j],dp[j-w[i]]+c[i]);
    cout<<dp[m];
    return 0;
}
```

## 2. 完全背包

```cpp
#include<iostream>
using namespace std;
int w[1005],c[1005],dp[1005];
int main()
{
    int m,n;
    cin>>m>>n;
    for(int i=1;i<=n;i++) cin>>w[i]>>c[i];
    for(int i=1;i<=n;i++)
        for(int j=w[i];j<=m;j++)
            dp[j]=max(dp[j],dp[j-w[i]]+c[i]);
    cout<<dp[m];
    return 0;
}
```

## 3. 多重背包

二进制分组后当 01 背包处理。

## 4. 分组背包

```cpp
#include<iostream>
using namespace std;
int a[1005],b[1005],dp[20010],t[1005][1005],w[1005],r[1005];
int main()
{
    int n,m,x=99999999,q,g;
    cin>>n>>m;
    for(int i=1;i<=n;i++) cin>>a[i]>>b[i];
    cin>>g;
    for(int i=1;i<=n;i++)
    {
        cin>>q;
        r[i]=q,w[q]++,t[q][w[q]]=i;
    }
    for(int i=1;i<=g;i++)
    {
        x=99999999;
        for(int j=1;j<=n;j++) if(r[j]==i) x=min(x,a[j]);
        for(int j=m;j>=x;j--)
            for(int k=1;k<=w[i];k++)
                if(j>=a[t[i][k]]) dp[j]=max(dp[j],dp[j-a[t[i][k]]]+b[t[i][k]]);
    }
    cout<<dp[m];
    return 0;
}
```

## 5. 混合背包

当多重背包处理。

```cpp
#include<bits/stdc++.h>
using namespace std;
long long v[205],c[205],p[205],v1[1000005],c1[1000005],f[1000005];
int main()
{
    int V,n,tot=0;
    scanf("%d%d",&V,&n);
    for(int i=1;i<=n;i++)
    {
        scanf("%d%d%d",&v[i],&c[i],&p[i]);
        if(p[i]==0) p[i]=V/v[i];
    }
    for(int i=1;i<=n;i++)
    {
        int s=1;
        while(p[i]>=s)
        {
            tot++,p[i]-=s,v1[tot]=s*v[i],c1[tot]=s*c[i],s*=2;
        }
        if(p[i]) tot++,v1[tot]=p[i]*v[i],c1[tot]=p[i]*c[i];
    }
    for(int i=1;i<=tot;i++)
        for(int j=V;j>=v1[i];j--) f[j]=max(f[j],f[j-v1[i]]+c1[i]);
    cout<<f[V];
    return 0;
}
```

## 6. 背包的第 k 优解

```cpp
#include<iostream>
using namespace std;
int a[505],b[505],dp[5010][510],q[5010];
int main()
{
    int k,v,n,ans=0;
    cin>>k>>v>>n;
    for(int i=0;i<=v;i++) for(int j=1;j<=k;j++) dp[i][j]=-1000;
    dp[0][1]=0;
    for(int i=1;i<=n;i++) cin>>a[i]>>b[i];
    for(int i=1;i<=n;i++) for(int j=v;j>=a[i];j--)
    {
        int s1=1,s2=1;
        for(int l=1;l<=k;l++)
        {
            if(dp[j][s1]>(dp[j-a[i]][s2]+b[i])) q[l]=dp[j][s1++];
            else q[l]=dp[j-a[i]][s2++]+b[i];
        }
        for(int w=1;w<=k;w++) dp[j][w]=q[w];
    }
    for(int i=1;i<=k;i++) ans+=dp[v][i];
    cout<<ans;
    return 0;
}
```

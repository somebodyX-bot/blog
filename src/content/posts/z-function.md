---
title: "Z 函数"
published: 2025-04-23
tags: ["字符串", "算法"]
category: "字符串"
draft: false
---

对于一个长度为 $n$ 的字符串，定义函数 $z[i]$ 表示 $s$ 和 $s[i,n-1]$（即以 $s[i]$ 开头的后缀）的最长公共前缀（LCP）的长度，则 $z$ 被称为 $s$ 的 Z 函数。特别地，$z[0]=0$。

```cpp
#include<bits/stdc++.h>
using namespace std;
const int M=2e7+5;
char a[M],b[M];
int nxt[M],ex[M],la,lb;
void get_nxt()
{
    int p0=2,p=1;
    for(int i=2;i<=la;i++)
    {
        if(i+nxt[i-p0+1]-1<p) nxt[i]=nxt[i-p0+1];
        else
        {
            int x=1,now=p-i+1;
            while(p+x<=la&&now+x<=la&&a[p+x]==a[now+x]) x++;
            nxt[i]=p-i+x,p0=i;
            p=max(p0+nxt[p0]-1,i);
        }
    }
    nxt[1]=la;
}
void get_ex()
{
    int p0=1,p=0;
    for(int i=1;i<=lb;i++)
    {
        if(i+nxt[i-p0+1]-1<p) ex[i]=nxt[i-p0+1];
        else
        {
            int x=1,now=p-i+1;
            while(p+x<=lb&&now+x<=la&&b[p+x]==a[now+x]) x++;
            ex[i]=p-i+x,p0=i;
            p=max(p0+ex[p0]-1,i);
        }
    }
}
int main()
{
    long long ans1=0,ans2=0;
    scanf(" %s",b+1),scanf(" %s",a+1);
    la=strlen(a+1),lb=strlen(b+1);
    get_nxt(),get_ex();
    for(int i=1;i<=la;i++) ans1^=(1ll*i*(nxt[i]+1));
    for(int i=1;i<=lb;i++) ans2^=(1ll*i*(ex[i]+1));
    printf("%lld\n%lld",ans1,ans2);
    return 0;
}
```

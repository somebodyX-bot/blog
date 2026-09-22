---
title: "KMP"
published: 2025-04-23
tags: ["字符串", "算法"]
category: "字符串"
draft: false
---

给出两个字符串 $s_1$ 和 $s_2$，求 $s_2$ 在 $s_1$ 中所有出现的位置。

```cpp
#include<bits/stdc++.h>
using namespace std;
const int M=1e6+5;
int nxt[M],f[M],ans[M];
char a[M],b[M];
int main()
{
    int lena,lenb,tot=0;
    scanf("%s",b+1);
    scanf("%s",a+1);
    lena=strlen(a+1),lenb=strlen(b+1);
    for(int i=2,j=0;i<=lena;i++)
    {
        while(j>0&&a[j+1]!=a[i]) j=nxt[j];
        if(a[j+1]==a[i]) j++;
        nxt[i]=j;
    }
    for(int i=1,j=0;i<=lenb;i++)
    {
        while(j>0&&(j==lena||a[j+1]!=b[i])) j=nxt[j];
        if(a[j+1]==b[i]) j++;
        f[i]=j;
    }
    return 0;
}
```

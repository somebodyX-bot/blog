---
title: "manacher"
published: 2025-04-23
tags: ["字符串", "算法"]
category: "字符串"
draft: false
---

可以先考虑朴素算法。以每个字符为中心，逐次向左右两边扩展，寻找最大的回文串。

Manacher 其实就是优化的暴力啦。

从左向右依次扩展，扩展产生的新回文串，利用回文串的性质，一定在之前的区域内有一个对称的字符串。

所以在已扩展区间内就不用比较了，未扩展区域还是暴力扫，这样就是线性的！

## 细节

- 每次要更新扩展区域。
- 计算之前要加辅助符号。
- 各题有细节不同。

```cpp
#include<bits/stdc++.h>
using namespace std;
char a[11000005],b[22000005];
int p[22000005];
int main()
{
    scanf("%s",a+1);
    int len=strlen(a+1),r=0,mid=1,le=0,ans=0;
    b[0]='$';
    for(int i=1;i<=len;i++) le++,b[le]='|',le++,b[le]=a[i];
    le++,b[le]='|';
    for(int i=1;i<=le;i++)
    {
        p[i]=min(p[2*mid-i],r-i+1);
        while(b[i+p[i]]==b[i-p[i]]) p[i]++;
        if(p[i]+i>r) r=p[i]+i-1,mid=i;
        ans=max(ans,p[i]-1);
    }
    printf("%d",ans);
    return 0;
}
```

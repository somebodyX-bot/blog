---
title: "后缀排序"
published: 2025-04-23
tags: ["字符串", "算法"]
category: "字符串"
draft: false
---

读入一个长度为 $n$ 的由大小写英文字母或数字组成的字符串，请把这个字符串的所有非空后缀按字典序（用 ASCII 数值比较）从小到大排序，然后按顺序输出后缀的第一个字符在原串中的位置。位置编号为 1 到 $n$。

```cpp
#include<bits/stdc++.h>
using namespace std;
char ch[1000005];
int sa[1000005],rk[1000005],id[1000005],cnt[1000005],rkid[1000005];
int main()
{
    int len,tt=0,m=200;
    scanf("%s",ch+1),len=strlen(ch+1);
    for(int i=1;i<=len;i++) cnt[rk[i]=ch[i]]++;
    for(int i=1;i<=200;i++) cnt[i]+=cnt[i-1];
    for(int i=len;i;i--) sa[cnt[rk[i]]--]=i;
    for(int k=1;k<=len;k<<=1)
    {
        tt=0;
        for(int i=len;i>len-k;i--) id[++tt]=i;
        for(int i=1;i<=len;i++)
            if(sa[i]>k) id[++tt]=sa[i]-k;
        memset(cnt,0,sizeof(cnt));
        for(int i=1;i<=len;i++) cnt[rkid[i]=rk[id[i]]]++;
        for(int i=1;i<=m;i++) cnt[i]+=cnt[i-1];
        for(int i=len;i;i--) sa[cnt[rkid[i]]--]=id[i];
        swap(id,rk);
        m=1,rk[sa[1]]=1;
        for(int i=2;i<=len;i++)
        {
            if(id[sa[i]]==id[sa[i-1]]&&id[sa[i]+k]==id[sa[i-1]+k]) rk[sa[i]]=m;
            else m++,rk[sa[i]]=m;
        }
        if(m==len) break;
    }
    for(int i=1;i<=len;i++) printf("%d ",sa[i]);
    return 0;
}
```

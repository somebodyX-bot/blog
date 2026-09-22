---
title: "后缀自动机 && 后缀数组"
published: 2025-04-23
tags: ["字符串", "算法"]
category: "字符串"
draft: false
---

## 后缀自动机

最重要的当然是建图。

讲起来挺复杂，记代码就行了吧。

```cpp
void make(int x)
{
    int p,q,np,nq;
    tot++,point[tot].len=point[last].len+1;
    p=last,np=last=tot;
    while(!point[p].ch[x]&&p)
    {
        point[p].ch[x]=np;
        p=point[p].fa;
    }
    if(!p) point[np].fa=1;
    else
    {
        q=point[p].ch[x];
        if(point[p].len+1==point[q].len) point[np].fa=q;
        else
        {
            tot++,nq=tot;
            for(int i=1;i<=26;i++) point[nq].ch[i]=point[q].ch[i];
            point[nq].fa=point[q].fa,point[q].fa=point[np].fa=nq,point[nq].len=point[p].len+1;
            while(point[p].ch[x]==q&&p) point[p].ch[x]=nq,p=point[p].fa;
        }
    }
}
```

### 细节

- `tot` 和 `last` 从 1 开始。
- 具体看代码与 PPT 吧。

> 附件：后缀自动机-有构造过程.pdf（1016.6KB）

## 后缀数组

```cpp
#include<bits/stdc++.h>
using namespace std;
char ch[300005];
int sa[300005],rk[300005],id[300005],rkid[300005],cnt[300005],height[300005];
int main()
{
    int len,m=200,tt;
    scanf("%s",ch+1),len=strlen(ch+1);
    for(int i=1;i<=len;i++) cnt[rk[i]=ch[i]]++;
    for(int i=1;i<=m;i++) cnt[i]+=cnt[i-1];
    for(int i=1;i<=len;i++) sa[cnt[rk[i]]--]=i;
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
        swap(rk,id),m=1,rk[sa[1]]=1;
        for(int i=2;i<=len;i++)
        {
            if(id[sa[i]]==id[sa[i-1]]&&id[sa[i]+k]==id[sa[i-1]+k]) rk[sa[i]]=m;
            else m++,rk[sa[i]]=m;
        }
        if(m==len) break;
    }
    for(int i=1,k=0;i<=len;i++)
    {
        if(rk[i]==1) continue;
        if(k) k--;
        int j=sa[rk[i]-1];
        while(i+k<=len&&j+k<=len&&ch[i+k]==ch[j+k]) k++;
        height[rk[i]]=k;
    }
    for(int i=1;i<=len;i++) printf("%d ",sa[i]-1);
    printf("\n");
    for(int i=1;i<=len;i++) printf("%d ",height[i]);
    return 0;
}
```

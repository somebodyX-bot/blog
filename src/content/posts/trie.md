---
title: "Trie 树"
published: 2025-04-23
tags: ["字符串", "算法"]
category: "字符串"
draft: false
---

```cpp
#include<bits/stdc++.h>
using namespace std;
const int M=3e6+5;
char s[M];
int ch[M][80],cnt=0,ed[M];
void insert()
{
    int p=0,len=strlen(s+1),x;
    for(int i=1;i<=len;i++)
    {
        x=s[i]-'0';
        if(!ch[p][x]) cnt++,ch[p][x]=cnt;
        p=ch[p][x],ed[p]++;
    }
}
int find()
{
    int p=0,len=strlen(s+1),x;
    for(int i=1;i<=len;i++)
    {
        x=s[i]-'0';
        p=ch[p][x];
        if(!p) break;
    }
    return ed[p];
}
int main()
{
    int t,n,q;
    scanf("%d",&t);
    for(int w=1;w<=t;w++)
    {
        cnt=0;
        scanf("%d%d",&n,&q);
        for(int i=1;i<=n;i++)
        {
            scanf("%s",s+1);
            insert();
        }
        for(int i=1;i<=q;i++)
        {
            scanf("%s",s+1);
            printf("%d\n",find());
        }
        for(int i=0;i<=cnt;i++)
        {
            ed[i]=0;
            for(int j=0;j<=75;j++) ch[i][j]=0;
        }
    }
    return 0;
}
```

---
title: "AC 自动机"
published: 2025-04-23
tags: ["字符串", "算法"]
category: "字符串"
draft: false
---

给你一个文本串 $S$ 和 $n$ 个模式串 $T_1\dots T_n$，请你分别求出每个模式串 $T_i$ 在 $S$ 中出现的次数。

就是 `kmp+trie` 麻（大雾。

先建个 `trie`，为保证该节点之前的 `fail` 已确定用 BFS 建。

当前节点指向父亲时字符为 $c$，建自动机时跳父亲的 `fail`，如果该节点有对应 $c$ 的一条出边，就将当前节点的 `fail` 指向它。如果没有就一直跳 `fail`，直到满足上述条件或到根节点为止。

匹配的话在之前建 `trie` 时记录 `end`，从根节点开始，跳文本串下一个字符，一直跳 `fail`，如果 `end` 跳过了就不用跳了，同时累计答案。

### 细节：

- 压队列一开始要将根节点的子节点压入队列，如果直接压根节点，子节点的 `fail` 会指向自己。
- 建自动机过程类似于并查集的路径压缩，具体实现看代码。若该节点没有对应字母出边，则将这个出边设成父亲 `fail` 的出边节点。
- [代码参考](https://www.luogu.com.cn/record/84061901)（拓扑排序优化）
- [博客参考](https://www.luogu.com.cn/blog/juruohyfhaha/solution-p5357)

[代码参考](https://www.luogu.com.cn/record/84009342)

[博客参考](https://www.luogu.com.cn/blog/3383669u/qiang-shi-tu-xie-ac-zi-dong-ji)

```cpp
//无拓扑排序优化
#include<bits/stdc++.h>
using namespace std;
char a[2000005];
int cnt=0,tot=0;
int ch[200005][30],e[200005],fail[200005],ans[200005],to[200005];
queue<int>q;
void insert()
{
    int p=0,len=strlen(a+1);
    for(int i=1;i<=len;i++)
    {
        if(!ch[p][a[i]-'a']) cnt++,ch[p][a[i]-'a']=cnt;
        p=ch[p][a[i]-'a'];
    }
    if(e[p]) tot++,to[tot]=e[p];
    else tot++,e[p]=tot;
}
void build()
{
    int p=0;
    for(int i=0;i<=25;i++) if(ch[0][i]) q.push(ch[0][i]);
    while(q.size())
    {
        p=q.front(),q.pop();
        for(int i=0;i<=25;i++)
        {
            if(ch[p][i])
            {
                fail[ch[p][i]]=ch[fail[p]][i];
                q.push(ch[p][i]);
            }
            else ch[p][i]=ch[fail[p]][i];
        }
    }
}
void compare()
{
    int p=0,len=strlen(a+1);
    for(int i=1;i<=len;i++)
    {
        p=ch[p][a[i]-'a'];
        for(int j=p;j;j=fail[j]) if(e[j]) ans[e[j]]++;
    }
}
int main()
{
    int n;
    scanf("%d",&n);
    for(int i=1;i<=n;i++)
    {
        scanf(" %s",a+1);
        insert();
    }
    build();
    scanf(" %s",a+1);
    compare();
    for(int i=1;i<=n;i++)
    {
        if(!ans[i]) ans[i]=ans[to[i]];
        printf("%d\n",ans[i]);
    }
    return 0;
}
```

```cpp
//拓扑排序优化
#include<bits/stdc++.h>
using namespace std;
char a[2000005];
int ch[1000005][26],cnt=0,fail[1000005],in[1000005],flag[1000005],mm[1000005],ans[1000005],anss[1000005];
queue<int> q;
void insert(int num)
{
    int len=strlen(a+1),p=0;
    for(int i=1;i<=len;i++)
    {
        if(!ch[p][a[i]-'a']) cnt++,ch[p][a[i]-'a']=cnt;
        p=ch[p][a[i]-'a'];
    }
    if(!flag[p]) flag[p]=num;
    mm[num]=flag[p];
}
void build()
{
    for(int i=0;i<26;i++) if(ch[0][i]) q.push(ch[0][i]);
    while(q.size())
    {
        int p=q.front();
        q.pop();
        for(int i=0;i<26;i++)
        {
            if(ch[p][i]) fail[ch[p][i]]=ch[fail[p]][i],q.push(ch[p][i]),in[fail[ch[p][i]]]++;
            else ch[p][i]=ch[fail[p]][i];
        }
    }
}
int main()
{
    int n,len,p=0,x,y;
    scanf("%d",&n);
    for(int i=1;i<=n;i++)
    {
        scanf(" %s",a+1);
        insert(i);
    }
    build();
    scanf(" %s",a+1),len=strlen(a+1);
    for(int i=1;i<=len;i++) p=ch[p][a[i]-'a'],ans[p]++;
    for(int i=1;i<=cnt;i++) if(!in[i]) q.push(i);
    while(q.size())
    {
        x=q.front(),q.pop(),anss[flag[x]]=ans[x];
        y=fail[x],in[y]--,ans[y]+=ans[x];
        if(!in[y]) q.push(y);
    }
    for(int i=1;i<=n;i++) printf("%d\n",anss[mm[i]]);
    return 0;
}
```

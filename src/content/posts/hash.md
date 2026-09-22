---
title: "哈希"
published: 2025-04-23
tags: ["字符串", "算法"]
category: "字符串"
draft: false
---

## 哈希的建立

```cpp
q[0]=1;
len=strlen(a+1);
for(int i=1;i<=len;i++) q[i]=131*q[i-1];
for(int i=1;i<=len;i++) s[i]=(a[i]-'a'+1)+s[i-1]*131;
```

## 查询

```cpp
s=s[r]-s[l-1]*q[r-l+1];
```

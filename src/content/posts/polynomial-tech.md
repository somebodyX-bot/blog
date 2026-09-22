---
title: "多项式科技"
published: 2025-04-23
tags: ["数论", "算法"]
category: "数论"
draft: false
---

真，真，真的会用到吗。

## 1. 快速傅里叶变换（FFT）

给定一个 $n$ 次多项式 $F(x)$ 和一个 $m$ 次多项式 $G(x)$，求出 $F(x)$ 和 $G(x)$ 的卷积。

```cpp
#include<bits/stdc++.h>
using namespace std;
char c[10000005];
const double pi=acos(-1);
int n=1,t[10000005],ans[30000005];
struct node{double x,y;}a[10000005],b[10000005],w,p,tt;
node operator +(node aa,node bb){aa.x+=bb.x,aa.y+=bb.y;return aa;}
node operator -(node aa,node bb){aa.x-=bb.x,aa.y-=bb.y;return aa;}
node operator *(const node aa,const node bb){node cc;cc.x=aa.x*bb.x-aa.y*bb.y,cc.y=aa.x*bb.y+aa.y*bb.x;return cc;}
void fft(node *f,bool flag)
{
    for(int i=0;i<n;i++) if(i<t[i]) swap(f[i],f[t[i]]);
    for(int len=2;len<=n;len<<=1)
    {
        int l=len/2;p.x=cos(2.0*pi/len),p.y=sin(2.0*pi/len);if(!flag) p.y*=-1;
        for(int i=0;i<n;i+=len)
        {
            w.x=1,w.y=0;
            for(int j=i;j<i+l;j++){tt=w*f[j+l];f[j+l]=f[j]-tt,f[j]=f[j]+tt,w=w*p;}
        }
    }
}
int main()
{
    bool flag=0;int lena,lenb,len;
    scanf(" %s",c),lena=strlen(c);
    for(int i=0;i<lena;i++) a[i].x=c[lena-i-1]-'0';
    scanf(" %s",c),lenb=strlen(c);
    for(int i=0;i<lenb;i++) b[i].x=c[lenb-i-1]-'0';
    len=lena+lenb;while(n<=len) n<<=1;
    for(int i=0;i<=n;i++){t[i]=t[i>>1]>>1;if(i&1) t[i]|=n>>1;}
    fft(a,1),fft(b,1);for(int i=0;i<=n;i++) a[i]=a[i]*b[i];fft(a,0);
    for(int i=0;i<=n;i++){ans[i]+=(int)(a[i].x/n+0.5);if(ans[i]>=10) ans[i+1]+=ans[i]/10,ans[i]%=10;}
    for(int i=n-1;i>=0;i--) if(ans[i]||flag||i==0) flag=1,printf("%d",ans[i]);
    return 0;
}
```

## 2. 快速数论变换（NTT）

```cpp
#include<bits/stdc++.h>
using namespace std;
int t[3000005],n,mod=998244353,g,invg,invn;
long long f[3000005],p[3000005],q,w,tt;
long long po(int a,int b){long long ans=1,x=a;while(b){if(b&1) ans=ans*x%mod;x=x*x%mod;b>>=1;}return ans;}
void ntt(long long *f,bool flag)
{
    for(int i=0;i<n;i++) if(i<t[i]) swap(f[i],f[t[i]]);
    for(int p=2;p<=n;p<<=1)
    {
        int len=p>>1;q=po(flag?invg:g,(mod-1)/p);
        for(int l=0;l<n;l+=p)
        {
            w=1;
            for(int k=l;k<l+len;k++)
            {
                tt=w*f[k+len]%mod;f[k+len]=f[k]-tt;if(f[k+len]<0) f[k+len]+=mod;
                f[k]+=tt;if(f[k]>mod) f[k]-=mod;w=w*q%mod;
            }
        }
    }
}
int main()
{
    int m,x;scanf("%d%d",&n,&m);
    for(int i=0;i<=n;i++) scanf("%d",&f[i]);
    for(int i=0;i<=m;i++) scanf("%d",&p[i]);
    x=n+m,n=1;while(n<=x) n<<=1;
    for(int i=0;i<n;i++){t[i]=t[i>>1]>>1;if(i&1) t[i]|=n>>1;}
    g=3,invg=po(3,mod-2);ntt(f,0),ntt(p,0);
    for(int i=0;i<n;i++) f[i]=f[i]*p[i]%mod;
    ntt(f,1),invn=po(n,mod-2);
    for(int i=0;i<=x;i++) printf("%d ",(int)(invn*f[i]%mod));
    return 0;
}
```

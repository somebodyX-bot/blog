# 配置代理
$env:HTTP_PROXY="http://127.0.0.1:7897"
$env:HTTPS_PROXY="http://127.0.0.1:7897"
$env:NODE_USE_ENV_PROXY="1"

# 切换到博客目录
Set-Location "D:\Blog\Shirone"

# 同步 Bangumi
pnpm anime:sync --provider bangumi
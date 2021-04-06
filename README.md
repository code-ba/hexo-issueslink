获取您在`github`的评论并生成`hexo`的友情链接！
![hexo-issueslink](https://img.shields.io/github/forces/code-ba/hexo-issueslink?label=force&style=social)

### 安装
默认支持主题`butterfly`，如果是其它的主题，自己`Fork`代码改下即可。
- 安装`npm i -D hexo-issueslink` or `cnpm i -D hexo-issueslink` or `yarn add hexo-issueslink -D`

### 配置
- 主题配置评论地址，如：`issuesRepos: cxvh/cxvh.github.io`
  - 也可以使用命令：`hexo issues --repos cxvh/cxvh.github.io` 或者 `hexo issues -r cxvh/cxvh.github.io`
- 主题配置友情链接`yml`文件地址，如：`issuesYmlUrl: ./source/_data/link.yml`

### 指令
- `hexo issues`默认生成友情链接
- `hexo issues -u 评论ID` or `hexo issues --update 6`更新单独一条链接
- `hexo issues -c` or `hexo issues --clear`清除缓存
- `hexo issues -f` or `hexo issues --force`清除缓存并生成友情链接

### 评论格式
```yml
name: BARAN的小站🔥🔥🔥
link: https://cxvh.cc
avatar: https://cdn.jsdelivr.net/gh/cxvh/static@main/avatar/avatar.jpg
descr: 指尖跳动留下足迹.
```

### 其它
- `npm`包地址：[hexo-issueslink](https://www.npmjs.com/package/hexo-issueslink)
- `github`源码地址：[https://github.com/code-ba/hexo-issueslink](https://github.com/code-ba/hexo-issueslink)
- 评论参考地址：[https://github.com/cxvh/cxvh.github.io/issues](https://github.com/cxvh/cxvh.github.io/issues)

### 打赏
您的支持是我持续更新的动力！

<img src="https://cdn.jsdelivr.net/gh/cxvh/static@main/img/20210218193037.png" width="200" height="200" alt="微信">
<img src="https://cdn.jsdelivr.net/gh/cxvh/static@main/img/20210218192738.jpg" width="200" height="200" alt="支付宝">

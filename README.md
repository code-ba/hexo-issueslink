### 使用
- 获取您在`github`的评论并生成`hexo`的友情链接！
- 默认支持主题`butterfly`，如果是其它的主题，自己`fork`代码改下即可。
- 安装`npm i -D `

### 配置
- 主题配置评论地址，如：`issuesRepos: cxvh/cxvh.github.io`
  - 也可以使用命令：`hexo issues --repos cxvh/cxvh.github.io` 或者 `hexo issues -r cxvh/cxvh.github.io`
- 主题配置友情链接`yml`文件地址，如：`issuesYmlUrl: ./source/_data/link.yml`

### 指令
- `hexo issues`默认生成友情链接
- `hexo issues -u 评论ID` or `hexo issues --update 6`更新单独一条链接
- `hexo issues -c` or `hexo issues --clear`清除缓存
- `hexo issues -f` or `hexo issues --fork`清除缓存并生成友情链接
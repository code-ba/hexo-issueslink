hexo.extend.console.register('issues', '获取您在github的评论并生成友情链接！', {
  options: [{
    name: '-r, --repos',
    desc: "仓库地址：username/repos"
  },{
    name: '-u, --update',
    desc: "更新友链，如：hexo issues -u 6"
  }, {
    name: '-c --clear',
    desc: '清理掉所有友链！'
  }, {
    name: '-f --fork',
    desc: '覆盖更新链接！'
  }]
},async (options, callback) => await require("./lib")(hexo, options, callback))
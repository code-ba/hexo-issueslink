const fs = require('fs')
const axios=require('axios')
const yaml=require('yamljs')
const colors=require('colors')
let ymlUrl='./source/_data/link.yml'
let linkData;
let links={},linkIndex=0,isChange;
let issuesRepos="cxvh/cxvh.github.io";
let txt="",two=0;
async function getItem(index,cb){
  await axios.get(`https://api.github.com/repos/${issuesRepos}/issues/${index}`)
    .then(function(res){
      two=0;
      try{
        let {name,descr,link,avatar}=yaml.parse(res.data.body.replace('```yml\r\n','').replace('\r\n```','').replace(/'/g,'')),reg=/https:\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/;;name=name.trim(),descr=descr.trim(),link=link.trim(),avatar=avatar.trim();
        if(reg.test(link) && reg.test(avatar) && name.length && descr.length){
          const hasLink=links.link_list.filter(o=>o.link===link);
          if(hasLink.length){
            hasLink[0]={name,descr,link,avatar}
            console.log(colors.cyan('更新了一条友链，ID:')+index);
          }else{
            links.link_list.push({name,descr,link,avatar});
            console.log(colors.cyan('添加了一条友链，ID:')+index);
          }
        }else{
          console.log(colors.cyan('更新失败：')+colors.red(res.data.body));
        }
      }catch(e){
        console.log({e});
        Array.isArray(links.error_log)||(links.error_log=[]);
        links.error_log.filter(o=>o===index).length?'':links.error_log.push(index);
        console.log(colors.cyan('更新友链失败一条，失败ID：'+colors.red(index)));
      }
      cb&&cb()
    })
    .catch(function(e){
      two++; // 连续发生两次链接不存在或请求失败，则停止请求！
    })
}
// 去重
function linkRepeat(){
  let arr=[],p={};
  while(links.link_list.length){
    p=links.link_list.shift();
    if(arr.filter(o=>o.link===p.link||o.link===p.link+'/').length===0){
      arr.push(p)
    }
  }
  links.link_list=arr,
  links.linkIndex=arr.length;
  linkData[links.index]=JSON.parse(JSON.stringify(links));
}
async function getIssues(){
  while(two<2){
    links.linkIndex++;
    await getItem(links.linkIndex);
  }
  linkRepeat();
  fs.writeFileSync(ymlUrl, yaml.stringify(linkData,6), 'utf8');
  console.log(colors.cyan('更新友链结束'));
}
function repos(hexo,option){
  let r='';
  // 简单判断下格式
  if(hexo.config.theme_config.issuesRepos&&hexo.config.theme_config.issuesRepos.split('/').length===2){
    r=hexo.config.theme_config.issuesRepos
  }
  if(option.repos&&option.repos.split('/').length===2){
    r=option.repos
  }
  if(option.r&&option.r.split('/').length===2){
    r=option.r
  }
  issuesRepos=r;
  return !r;
}
async function init(hexo,option,callback){
  try{
    ymlUrl=hexo.config.theme_config.issuesYmlUrl||ymlUrl
    linkData=yaml.load(ymlUrl)
  }catch(e){
    return hexo.log.info(colors.cyan('加载配置文件失败，请检查文件是否存在，路径是否正确，如：')+colors.green('issuesYmlUrl: ./source/_data/link.yml'));
  }
  // 初始化友情链接数据
  for(var i=0;i<linkData.length;i++){
    if(/友链|友情链接|友人帐|友人链|优秀博主|朋友/.test(linkData[i].class_name)){
      links=JSON.parse(JSON.stringify(linkData[i]));
      links.index=i;
      Array.isArray(links.link_list)||(links.link_list=[]);
      links.linkIndex=linkData[i].linkIndex||links.link_list.length
      break;
    }
  }
  // 清理掉所有友链
  if(option.clear || option.c){
    return links.linkIndex=0,linkData[links.index].link_list=[],fs.writeFileSync(ymlUrl, yaml.stringify(linkData,6), 'utf8'),hexo.log.info(colors.cyan('已清理掉所有友链！'));
  }
  // 初始化仓库地址
  if(repos(hexo,option)){
    return hexo.log.info(colors.cyan('请在主题配置文件添加仓库地址，如：')+colors.green('issuesRepos: cxvh/cxvh.github.io')),hexo.log.info(colors.cyan('或者使用命令，如：')+colors.green('hexo issues -repos cxvh/blogs'));
  }
  // 更新一条
  if(option.update||option.u){
    return await getItem(option.update||option.u,async function(){
      two=2,
      await getIssues();
    });
  }
  // 覆盖更新
  if(option.force||option.f){
    return links.linkIndex=0,linkData[links.index]=[],await getIssues();
  }
  // 更新没有的
  await getIssues();
}
module.exports=init
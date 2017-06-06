export class V2exApiUrl {

  private BASE_SERVER: string = 'https://www.v2ex.com'

  private urlMap: { [index:string]: string } = {
    // 热门
    topicsHot: '/api/topics/hot.json',
    // 最新
    topicsLatest: '/api/topics/latest.json',
    // 所有
    topicsLists: '/api/topics/show.json',
    // 总主题数/总用户数
    siteStats: '/api/site/stats.json',
    // 网站名/slogen
    siteInfo: '/api/site/info.json',
    // 所有节点
    allNodes: '/api/nodes/all.json',
    // 节点详情介绍
    nodeDetail: '/api/nodes/show.json',
    // 某主题下的所有回复
    replies: '/api/replies/show.json',
    // 某用户的详情
    members: '/api/members/show.json',
    // 登录
    signin: '/signin',
    // 发布时间轴
    timeline: '/t/update',
    // 获取所有status
    status: '/t/refresh'
  }

  public get(apiName: string): string {
    return this.BASE_SERVER + this.urlMap[apiName]
  }
}
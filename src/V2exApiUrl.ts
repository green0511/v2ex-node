export class V2exApiUrl {

  private BASE_SERVER: string = 'https://www.v2ex.com/api'

  private urlMap: { [index:string]: string } = {
    // 热门
    topicsHot: '/topics/hot.json',
    // 最新
    topicsLatest: '/topics/latest.json',
    // 所有
    topicsLists: '/topics/show.json',
    // 总主题数/总用户数
    siteStats: '/site/stats.json',
    // 网站名/slogen
    siteInfo: '/site/info.json',
    // 所有节点
    allNodes: '/nodes/all.json',
    // 节点详情介绍
    nodeDetail: '/nodes/show.json',
    // 某主题下的所有回复
    replies: '/replies/show.json',
    // 某用户的详情
    members: '/members/show.json'
  }

  public get(apiName: string): string {
    return this.BASE_SERVER + this.urlMap[apiName]
  }
}
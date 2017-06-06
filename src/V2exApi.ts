import axios, { AxiosPromise } from 'axios'
import { cookie } from './Cookie'
import { V2exApiUrl } from './V2exApiUrl'

axios.defaults.headers.common['origin'] = 'https://www.v2ex.com'
axios.defaults.headers.common['host'] = 'www.v2ex.com'
axios.defaults.headers.common['referer'] = 'https://www.v2ex.com/t'
axios.defaults.headers.common['user-agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36'
// axios.defaults.headers.common['content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.interceptors.response.use(res => {
  console.log('============')
  console.log(res.config.headers)
  console.log(res.headers)
  let cookieToSet = res && res.headers && res.headers['set-cookie']
  if (cookieToSet) {
    //  形如：[ 'PB3_SESSION="2|1:0|10:1496740512|11:PB3_SESSION|36:djJleDoxMTMuMTExLjAuMjg6NzI0Mjc1MDY=|89539309a66a947084379a96b1f5bb7dba66bc59ead39688b563417a37a9b290"; expires=Sun, 11 Jun 2017 09:15:12 GMT; httponly; Path=/', 'V2EX_LANG=zhcn; Path=/' ]
    cookieToSet.map(cook => cook.split('; ')).forEach(item => {
      item.forEach(str => {
        let firstEqual = str.indexOf('=')
        let key = str.slice(0, firstEqual)
        let value = str.slice(firstEqual++)
        cookie.set(key, value)
      })
    })
  }
  return res
})

export class V2exApi {
  
  private url: V2exApiUrl = new V2exApiUrl()
  
  private getUrl(apiName: string): string {
    return this.url.get(apiName)
  }

  private formatData(data: any) {
    return Object.keys(data).map(key => `${key}=${data[key]}`).join('&')
  }
  
  // 获取最热主题
  getHotTopics() {
    return axios.get(this.getUrl('topicsHot'))
  }
  
  // 获取最新主题
  getLatestTopics() {
    return axios.get(this.getUrl('topicsLatest'))
  }

  // 获取主题列表
  // 有四种筛选方法：
  // 1.主题的 id： 结果是一个数组，只有一个元素，即该主题的标题内容等信息
  // 2.用户的用户名： 一个数组，该用户的 10 个主题
  // 3.节点的 id： 一个数组，该节点下的 10 个主题
  // 4.节点的 name: 一个数组，该节点下的 10个主题

  getTopicsById(topicId: number) {
    return axios.get(this.getUrl('topicsLists'), { params: { id: topicId } })
  }

  getTopicsByUsername(username: string) {
    return axios.get(this.getUrl('topicsLists'), { params: { username } })
  }

  getTopicsByNodeId(nodeId: number) {
    return axios.get(this.getUrl('topicsLists'), { params: { node_id: nodeId } })
  }

  getTopicsByNodeName(nodeName: string) {
    return axios.get(this.getUrl('topicsLists'), { params: { node_name: nodeName } })
  }

  // 获取网站的帖子总数和用户总数
  getSiteStats() {
    return axios.get(this.getUrl('siteStats'))
  }
  
  // 获取站点标题、slogan 等等信息
  getSiteInfo() {
    return axios.get(this.getUrl('siteInfo'))
  }
  
  // 获取所有子节点（版块）
  getAllNodes() {
    return axios.get(this.getUrl('allNodes'))
  }
  
  getNodeDetail(node: string): AxiosPromise
  getNodeDetail(node: number): AxiosPromise
  getNodeDetail(node: number | string): AxiosPromise {
    let params: any = {}
    if (typeof node == 'number') {
      params.id = node
    } else if (typeof node == 'string') {
      params.name = node
    }
    return axios.get(this.getUrl('nodeDetail'), {
      params
    })
  }

  getReplies(topicId: number) {
    return axios.get(this.getUrl('replies'), { params: { topic_id: topicId }})
  }

  getMemberDetail(username) {
    return axios.get(this.getUrl('members'), { params: { username } })
  }

  sigin(username, password) {
    return axios.post('https://www.v2ex.com/signin', this.formatData({
      '513655847a0b43c47f8d9207e22d7792488280abb728e5f3d4bd41eace1f950b' : username,
      'eba724863603c6fb67b8401b643c0e36a8a971b829d8bf6ff54e9d1f4650eef0' : password,
      once : '83801',
      next : '/'
    }), {
      headers: {
        cookie: cookie.stringify()
      }
    })
  }

  postTimeline(text, in_reply_to_status_id: number = 0) {
    return axios.post(this.getUrl('timeline'), {
      status: text,
      in_reply_to_status_id: 0,
      once: 49183
    }, {
      headers: {
        referer: 'https://www.v2ex.com/t',
        'x-requested-with': 'XMLHttpRequest',
        // cookie: cookie.stringify(),
        cookie: cookie.stringify()
      }
    })
  }

  getStatus(afterId: number = 0) {
    return axios.post(this.getUrl('status'), this.formatData({
      max_id: afterId
    }), {
      headers: {
        cookie: cookie.stringify()
      }
    })
  }

  getOnce() {
  }
}

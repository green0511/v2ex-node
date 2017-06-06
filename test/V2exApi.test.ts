import { V2exApi } from '../src/V2exApi'
import axios from 'axios'
import { expect } from 'chai'

describe('基础测试', () => {
  let v2exApi = new V2exApi()

  it('最热主题：返回值为长度为10的数组', done => {
    v2exApi.getHotTopics()
      .then(res => {
        let topics = res.data
        expect(topics).to.be.instanceof(Array)
        expect(topics.length).to.equals(10)
        done()
      })
  })
  
  it('最新主题：返回值为数组', done => {
    // 数组长度未知？ 有时为19 有时为18
    v2exApi.getLatestTopics()
      .then(res => {
        let topics = res.data
        // console.log(topics.map(t => t.title))
        expect(topics).to.be.instanceof(Array)
        done()
      })
  })

  let topicKeys: Array<string> = ['id', 'title', 'url', 'content', 'content_rendered', 'replies', 'created', 'last_modified', 'last_touched', 'member', 'node']

  it('根据 id 获取主题内容', done => {
    v2exApi.getTopicsById(365888)
      .then(res => {
        let topic = res.data[0]
        topicKeys.forEach(expectKey => expect(topic).haveOwnProperty(expectKey))
        done()
      })
  })

  it('根据用户名获取主题', done => {
    v2exApi.getTopicsByUsername('Livid')
      .then(res => {
        expect(res.data).to.be.instanceOf(Array)
        let topic = res.data[0]
        topicKeys.forEach(expectKey => expect(topic).haveOwnProperty(expectKey))
        done()
      })
  })

  it('根据节点id获取主题', done => {
    v2exApi.getTopicsByNodeId(2)
      .then(res => {
        expect(res.data).to.be.instanceOf(Array)
        let topic = res.data[0]
        topicKeys.forEach(expectKey => expect(topic).haveOwnProperty(expectKey))
        done()
      })
  })

  it('根据节点名称获取主题', done => {
    v2exApi.getTopicsByNodeName('v2ex')
      .then(res => {
        expect(res.data).to.be.instanceOf(Array)
        let topic = res.data[0]
        topicKeys.forEach(expectKey => expect(topic).haveOwnProperty(expectKey))
        done()
      })
  })

//   it('', done => {})

  it('获取总帖子数和总用户数', done => {
    v2exApi.getSiteStats()
      .then(res => {
        let data = res.data
        expect(data).to.haveOwnProperty('topic_max')
        expect(data).to.haveOwnProperty('member_max')
        done()
      })
  })

  it('获取网站描述等信息', done => {
    v2exApi.getSiteInfo()
      .then(res => {
        let expectKeys: Array<string> = ['title', 'slogan', 'description', 'domain']
        expectKeys.forEach(expectKey => expect(res.data).haveOwnProperty(expectKey))
        done()
      })
  })

  it('获取所有节点', done => {
    v2exApi.getAllNodes()
      .then(res => {
        let data = res.data
        expect(data).to.be.instanceOf(Array)
        done()
      })
  })
    
// 节点的数据结构如下:

// {
//     "id" : 2,
//     "name" : "v2ex",
//     "url" : "http://www.v2ex.com/go/v2ex",
//     "title" : "V2EX",
//     "title_alternative" : "V2EX",
//     "topics" : 2827,
//     "stars" : 672,
//     "header" : "这里讨论和发布关于 V2EX 站点的发展。",
//     "footer" : null,
//     "created" : 1272207021,
//     "avatar_mini" : "//v2ex.assets.uxengine.net/navatar/c81e/728d/2_mini.png?m=1494924230",
//     "avatar_normal" : "//v2ex.assets.uxengine.net/navatar/c81e/728d/2_normal.png?m=1494924230",
//     "avatar_large" : "//v2ex.assets.uxengine.net/navatar/c81e/728d/2_large.png?m=1494924230"
// }
    
  let nodeDetailKeys = ['id', 'name', 'url', 'title', 'title_alternative', 'topics', 'stars', 'header', 'footer', 'created', 'avatar_mini', 'avatar_normal', 'avatar_large']
  it('根据节点 id 获取节点信息', done => {
    v2exApi.getNodeDetail(1)
      .then(res => {
        let node = res.data
        // console.log(node)
        expect(node).to.be.instanceOf(Object)
        nodeDetailKeys.forEach(expectKey => expect(node).haveOwnProperty(expectKey))
        done()
      })    
  })

  it('根据节点名获取节点信息', done => {
    v2exApi.getNodeDetail('v2ex')
      .then(res => {
        let node = res.data
        expect(node).to.be.instanceOf(Object)
        nodeDetailKeys.forEach(expectKey => expect(node).haveOwnProperty(expectKey))
        done()
      })
  })

  it('获取某一主题的所有回复', done => {
    v2exApi.getReplies(364552)
      .then(res => {
        let replies = res.data
        expect(replies).to.be.instanceOf(Array)
        let repliesKeys: Array<string> = ["id", "thanks", "content", "content_rendered", "member", "created", "last_modified"]
        replies.forEach(rep => repliesKeys.forEach(expectKey => expect(rep).haveOwnProperty(expectKey)))
        done()
      })
  })

  it('获取某用户的信息', done => {
    v2exApi.getMemberDetail('Livid')
      .then(res => {
        let member = res.data
        let menberKeys = ["status", "id", "url", "username", "website", "twitter", "psn", "github", "btc", "location", "tagline", "bio", "avatar_mini", "avatar_normal", "avatar_large", "created"]
        menberKeys.forEach(key => expect(member).haveOwnProperty(key))
        done()
      })
  })

  it('测试登陆', done => {
    v2exApi.sigin('green0511', 'kaimansb0307')
      .then(res => {
        expect(res.status).equals(200)
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  }) 

  // it('测试发表 timeline', done => {
  //   v2exApi.postTimeline('test from api')
  //     .then(res => {
  //       console.log(res)
  //       done()
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // })
  it('测试获取 timeline', done => {
    v2exApi.getStatus().then(res => {
      console.log('==== res ====')
      console.log(res.data)
      console.log(res.headers)
      console.log(res.config.headers)
      done()
    })
    .catch(err => {
      console.log('==== err ====')
      console.dir(err)
      done()
    })
  })
})
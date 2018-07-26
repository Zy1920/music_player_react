## 一个基于React的适配PC端和移动端的轻量音乐播放器

### 音乐列表数据

- 音乐名称/歌手等文本信息
- 专辑图片展示

### 播放音频数据

- 网易音乐api地址：

  https://github.com/Binaryify/NeteaseCloudMusicApi


- ipfs-api：https://github.com/ipfs/js-ipfs-api

  - 初始化环境端口号开启服务：

  ```shell
  # Show the ipfs config API port to check it is correct
  > ipfs config Addresses.API
  /ip4/127.0.0.1/tcp/5001
  # Set it if it does not match the above output
  > ipfs config Addresses.API /ip4/127.0.0.1/tcp/5001
  # Restart the daemon after changing the config

  # Run the daemon
  > ipfs daemon
  ```

  - cat获取数据

  ```react
  ipfs.files.cat("QmY4NqRyr9SebC3P6W3pzg22UK3QsJNDKGzDHqQZsEyPi3", function (err, file) {
      if (err) {
          throw err
      }
      const json = file.toString('utf8');
      console.log(json)
      that.setState({
          songInfo: JSON.parse(json)
      })

  })
  ```

  - add 添加数据

  ```js
  const ipfsAPI = require('ipfs-api')
  const ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'})
  const buffer = Buffer.from('hello ipfs-api!')
  ipfs.add(buffer)
      .then( rsp => console.log(rsp[0].hash))
  	.catch(e => console.error(e))
  ```

  ​

- 设置cors

```shell
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "GET", "POST", "OPTIONS"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials '["true"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Headers '["Authorization"]'
ipfs config --json API.HTTPHeaders.Access-Control-Expose-Headers '["Location"]'
```

### ipns

- 绑定ipfs节点, 把一个文件/文件夹的hash发布到自己的ID下

  `ipfs name publish QmSx37PT8iV2XxzfHLMRYSxZEt87uE3jdQwCyz7otd5ktP`

- 查看节点绑定的ipfs路径

  `ipfs name resolve [peerId]`

- 离线客户端框架： https://github.com/electron/electron

### 功能
 * 播放，暂停
 * 上一曲，下一曲
 * 滑动或者点击歌曲进度条实现音乐的快进快退
 * 音乐剩余时间同步显示
 * 缓冲进度条
 * 播放进度条
 * 音量控制
 * 点击菜单按钮展开与隐藏播放列表
 * 播放列表内音乐播放，删除，当前播放音乐高亮显示
 * 播放音乐时封面图片旋转，暂停时停止旋转（只在PC端可查看，移动端隐藏音乐封面图片）


### 说明
```
//安装依赖
npm install

//启动项目
npm start

//打包编译
npm run build
```

| API           | 说明               | 类型      |
| ------------- |:------------------:| --------:|
| info          | 传入组件的歌曲数据    | Array    |
| onDel         | 删除歌曲的回调函数    | Function |

info接收的参数类型为一个对象数组
```
    componentDidMount() {
        // 请求网络音乐列表json
        //QmcH9Nudnt439Hz3AV6JThPRPPnztyy72Gmws9sJ49R7n6
        ipfs.files.cat('QmcH9Nudnt439Hz3AV6JThPRPPnztyy72Gmws9sJ49R7n6', (err, file) => {
            if (err) {
                throw err
            }
            const jsonStr = file.toString('utf8');
            console.log(jsonStr);


            this.setState({
                songInfo: JSON.parse(jsonStr)
            })

        })
    }

```

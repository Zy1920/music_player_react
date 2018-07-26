import React, { Component } from 'react';
import ReactMusicPlayer from './react-music-player/react-music-player';
import './App.css';

// var ipfsAPI = require('ipfs-api')
import ipfsAPI from 'ipfs-api';

const ipfs = ipfsAPI({ host: 'localhost', port: '5001', protocol: 'http' })

class App extends Component {


    constructor(props){
        super(props)
        this.state={
            songInfo: []
            // songInfo: [
            //     {
            //         "name": "That Girl",
            //         "artist": "24 HRS (Deluxe)",
            //         "id": 440208476,
            //         "img": "http://p1.music.126.net/_dPhSlbDz23MjXUEYeBGRw==/18820340533734696.jpg",
            //         "singer": "Olly Murs",
            //         "src": "http://192.168.50.102/ipfs/QmdBRyYsbqKoZgQ1HUjfJJ6dZa1t2LPoQy4YdyXEqHUikh"
            //     },
            //     {
            //         "name": "可能否",
            //         "artist": "可能否",
            //         "id": 569214126,
            //         "img": "http://p1.music.126.net/SJYnDay7wgewU3O7tPfmOQ==/109951163322541581.jpg",
            //         "singer": "木小雅",
            //         "src": "http://192.168.50.102/ipfs/QmWfk7vpdLD3hpE4qxznbF8p8tNdd79NE2u8NdFHV4EMXZ"
            //     },
            //     {
            //         "name": "讲真的",
            //         "artist": "不要你为难",
            //         "id": 30987293,
            //         "img": "http://p1.music.126.net/cd9tDyVMq7zzYFbkr0gZcw==/2885118513459477.jpg",
            //         "singer": "曾惜",
            //         "src": "http://192.168.50.102/ipfs/Qmf8MWK6nrV9uEyYkhujbFdyQxt2nu6XCsW6aXt7Q6TzwV"
            //     },
            //     {
            //         "name": "Jar Of Love",
            //         "artist": "Everything In The World",
            //         "id": 25713016,
            //         "img": "http://192.168.50.102/ipfs/QmaDcZDeqKemEovdmKaGbZAGXUbTqCSDVyyaL3qcbHogsQ",
            //         "singer": "曲婉婷",
            //         "src": "http://192.168.50.102/ipfs/Qmb58qsnS7wTCwRcrivZ1k4fzvB1XjzKjVWB9y97QRGW4X"
            //     },
            //     {
            //         "name": "悟空",
            //         "artist": "第二季中国好歌曲十大金曲",
            //         "id": 33162226,
            //         "img": "http://192.168.50.102/ipfs/QmaNWF9c2p1UtbBRDa5oBB7UAgE4oU5GsZwUeKUakHc5gd",
            //         "singer": "戴荃",
            //         "src": "http://192.168.50.102/ipfs/QmYEmVVkn3MAsJxBJYpc7cKmEYCnDE5HxCGJ4H3qsL92BY/02-悟空.mp3"
            //     },
            //     {
            //         "name": "消愁",
            //         "artist": "平凡的一天",
            //         "id": 569200213,
            //         "img": "http://192.168.50.102/ipfs/QmTuVw7GY6WC7nkhsFgij2QRkpvXDh4kw2qf1QrV48MZ97",
            //         "singer": "毛不易",
            //         "src": "http://192.168.50.102/ipfs/QmYEmVVkn3MAsJxBJYpc7cKmEYCnDE5HxCGJ4H3qsL92BY/03-消愁-毛不易.mp3"
            //     }
            // ]
        };

    }

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

    delSong=(i,id)=>{
        console.log(id)
        this.state.songInfo.splice(i,1)

    }
    onPlay=(currentMusic) => {
        this.setState({
            currentMusic: currentMusic
        });
        // console.log(currentMusic)
    }

    render() {
        const { currentMusic, strContent } = this.state;

        return (
            <div className="App">

                <div>
                    <h3>基于IPFS的音乐播放器 {strContent}</h3>
                </div>

                {
                    currentMusic && (
                        <div >
                            <img src={currentMusic.img} alt={currentMusic.name} 
                                style={{ width: 'auto', height: 380}}
                            />
                            <p>{currentMusic.name} - {currentMusic.artist}</p>
                            <h5>歌手: {currentMusic.singer}</h5>
                        </div>
                    )
                }

                {
                    this.state.songInfo.length === 0 ? <h5>播放列表初始化中...</h5> : (
                        <ReactMusicPlayer
                            info={this.state.songInfo}
                            onDel={this.delSong}
                            onPlay={this.onPlay}
                        />
                    )
                }


            </div>
        );
    }
}



export default App;

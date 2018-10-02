# [Ononoki](http://bakemonogatari.wikia.com/wiki/Yotsugi_Ononoki)

![logo](./public/icons/192.jpg)

Chrome extension for generating GIF meme from a video, support for Bilibili.

## Feature Preview

### Configuration panel

![preview1](./preview1.png)

### Preview GIF

![preview2](./preview2.png)

### Full demo

![preview](./preview.gif)

- Multi-threaded concurrent encoding GIF based on [Web Workers](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers)
- Fine control of duration, width, frame rate, and quality
- Preview GIF generated in real time

### Online installation (recommended)

[link-cws]: https://chrome.google.com/webstore/detail/refined-github/hlepfoohegkhhmjieoechaddaejaokhf "Version published on Chrome Web Store"

[Chrome store](https://chrome.google.com/webstore/detail/meme-maker/hlalndcfbinfampnholjnkcaimdgnfae)

### Offline installation

Download the [crx file](https://github.com/devrsi0n/ononoki/raw/master/main.crx), open the chrome extension page, and drag the crx file into it.

Can refer to the following animation

![install](./how_to_install_offline_crx.gif)

> Newer Chrome can't import crx file directly, please refer to developer mode to import the extracted files.

## TODO List

- ~~Generated GIF live preview~~
  - ~~Add hundred milliseconds level control~~
- Consider adding a hundred millisecond advance forward positioning control button
- Support rate adjustment (multiple fast, slow)
- Adapt to iQiyi
- Adapt to Weibo
- Adapt to Twitter
- ~~Adapt to Youtube~~
- Support for adding text to GIF
  - Initially, only fixed text is supported
  - The text defaults only to the fonts that the user has installed and subsequent third-party fonts can be considered.
  - The second phase supports dynamic text
- Video original frame screenshot
- Intercept video

## Contributors

<table>
  <tbody>
    <tr>
      <td align="center" valign="top">
        <img width="150" height="150" src="https://github.com/devrsi0n.png?s=150">
        <br>
        <a href="https://github.com/devrsi0n">devrsi0n</a>
        <br>
        <p>Code, Ideas</p>
        <a href="https://weibo.com/p/1005052398438325">Weibo</a>
      </td>
      <td align="center" valign="top">
        <img width="150" height="150" src="https://tvax1.sinaimg.cn/crop.181.54.252.252.180/735bdcf4ly8fn1lcaq067j20go0oramv.jpg">
        <br>
        <a href="https://weibo.com/u/1935400180">一闪一闪海星星</a>
        <br>
        <p>Logo, Project's name, Ideas</p>
        <a href="https://weibo.com/u/1935400180">Weibo</a>
        <br>
      </td>
      <td align="center" valign="top">
        <img width="150" height="150" src="https://avatars2.githubusercontent.com/u/33934346?s=400&v=4">
        <br>
        <a href="https://github.com/zjbennett">zjbennett</a>
        <br>
        <p>Docs</p>
        <a href="https://github.com/zjbennett">GitHub</a>
        <br>
      </td>
     </tr>
  </tbody>
</table>

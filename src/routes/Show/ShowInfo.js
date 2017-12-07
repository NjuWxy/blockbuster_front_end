/**
 * Created by john on 2017/12/3.
 */
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Col, Icon, Button } from 'antd';
import styles from './ShowInfo.less';

class ShowInfo extends React.Component {
  getWinHeight = () => {
    let minHeight = 0;
    if (window.innerHeight)
      minHeight = window.innerHeight;
    else if ((document.body) && (document.body.clientHeight))
      minHeight = document.body.clientHeight;
    return minHeight;
  };

  returnToHome = () => {
    this.props.dispatch(routerRedux.push({
      pathname: "/Show"
    }))
  };

  render() {
    const minHeight = this.getWinHeight();
    const picHeight = minHeight*5/9;
    return(
      <Row className={styles.content} style={{minHeight: minHeight}}>
        <Col offset={2} span={20}>
          <div className={styles.top}>
            <img className={styles.avatar} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>
            <div className={styles.username}>
              <div>shea<span><Button className={styles.follow}>关注</Button></span></div>
              <div className={styles.time}>发布时间：2014-12-09</div>
            </div>
            <Icon className={styles.close} type="close" onClick={this.returnToHome}/>
            <Icon className={styles.download} type="download" />
            <Icon className={styles.like} type="heart-o"/>
          </div>
          <Row style={{minHeight: picHeight,marginTop: minHeight/16}}>
            <Col span={2}>
              <Icon className={styles.left} style={{marginTop: picHeight/2-50}} type="left" />
            </Col>
            <Col span={20} style={{textAlign: 'center'}}>
              <img style={{height: picHeight, width: 'auto'}} src={require('../../assets/cat.jpg')}/>
            </Col>
            <Col span={2}>
              <Icon className={styles.right} style={{marginTop: picHeight/2-50}} type="right" />
            </Col>
          </Row>
          <Row style={{marginTop: minHeight/40}}>
            <Col offset={11} span={2} className={styles.picIndex}>
              1/10
            </Col>
          </Row>
          <div className={styles.descriptionPart}  style={{marginTop: minHeight/25}}>
            <h1 className={styles.title}>这是一个标题</h1>
            <p className={styles.description}>
              今年的秋天似乎有些漫长，都已经十一月份了依然不见雪花飘舞北风呼啸的冬日场景。
              在本月中旬的一天中午，原本晴朗的天空突然阴沉下来，紧接着又刮起了不紧不慢的西北风。
              只是奇怪一向狂暴的西北风何时变得这般柔和温顺，连校园中的柳树也只迎风轻轻摇晃着多情的柳枝，
              仿佛在轻歌曼舞、自娱自乐。地上的少许尚未完全褪尽绿意的落叶被微风拂过，或懒洋洋的翻了个身，
              或优雅的打了个旋，或一动不动。不多时西风渐紧，树枝的摆动幅度有所加大，一股带着湿意的微寒气流开始在小区上空旋转升腾扩散。
              到下午五、六点钟时先是随风飘来点点雨丝，渐渐地细小的雪花也粉墨登场了。
            </p>
            <div className={styles.tags}>
              <span className={styles.tag}>#这里是</span>
              <span className={styles.tag}>#标签</span>
              <span className={styles.tag}>#栏</span>
            </div>
          </div>
        </Col>
      </Row>
    )
  }
}

export default connect()(ShowInfo);

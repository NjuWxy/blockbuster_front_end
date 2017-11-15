/**
 * Created by john on 2017/11/5.
 */
import React from 'react';
import { connect } from 'dva';
import { Row, Col, Upload, Icon, Form, Input, Tooltip, Cascader, Select, Checkbox, Button, AutoComplete, Tag  } from 'antd';
import styles from './PostPhoto.less';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const CheckableTag = Tag.CheckableTag;

class PostPhotoForm extends React.Component {
  state = {
    /**
     * 创建专辑输入框是否可见，为false时不可见而按钮可见
     */
    inputNewAlbumVisible: false,
    /**
     * 创建专辑输入框的值
     */
    inputNewAlbumValue: '',
    /**
     * 选择专辑下拉框的选项，是该用户已有的专辑 todo 每个用户有一个默认专辑，初选为默认专辑
     */
    albums: ['默认专辑','胶片','少女写真','人像','摄影','婚纱'],
    /**
     * 选择专辑的选定值, 每个用户有一个默认专辑，初选为默认专辑
     */
    selectValue:'默认专辑',
    /**
     * 本次动态的标签列表，最多可以有六个标签
     */
    tags: [],
    /**
     * 添加标签的输入框是否可见，为false时不可见而按钮可见
     */
    inputVisible: false,
    /**
     * 添加标签的输入值
     */
    inputValue: '',
    /**
     * 用户上传的图片文件列表 todo
     */
    fileList: [],
  };

  /**
   * 上传图片、删除图片时改变state中的fileList
   * @param fileList
   */
  handleChange = ({ fileList }) => this.setState({ fileList });


  /**
   * 移除标签时，要移除state中tags中的标签
   * @param removedTag 被移除的标签
   */
  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags });
  };

  /**
   * 点击+标签之后，+标签的位置变为一个input组件，即让input组件显现出来，并且获得焦点
   */
  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  /**
   * 点击+创建专辑之后，+创建专辑的位置变为一个input组件，即让input组件显现出来，并且获得焦点
   */
  showInputNewAlbum = () => {
    this.setState({inputNewAlbumVisible:true},() => this.input.focus());
  };

  /**
   * 添加标签的输入变化时，改变this.state.inputValue
   * @param e
   */
  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  /**
   * 创建专辑的输入变化时，改变this.state.inputNewAlbumValue
   * @param e
   */
  handleInputNewAlbumChange = (e) => {
    this.setState({ inputNewAlbumValue:e.target.value});
  };

  /**
   * 点击热门标签添加热门标签，即点击热门标签，将该标签加入this.state.tags
   * @param tag 被点击的热门标签
   */
  addTag = (tag) => {
    let tags = this.state.tags;
    if(tags.length<6){
      if (tag && tags.indexOf(tag) === -1) {
        tags = [...tags, tag];
      }
      console.log(tags);
      this.setState({
        tags,
      });
    }
  };

  /**
   * 当添加标签的输入框失去焦点或者用户在此输入框输入回车时，代表用户已经添加新标签完成，此时应：
   * 1.将添加标签的输入框的值置为''，并让输入框不可见按钮可见（即inputVisible: false）
   * 2.将该标签加入this.state.tags
   */
  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  };

  /**
   * 当创建专辑的输入框失去焦点或者用户在此输入框输入回车时，代表用户已经创建专辑完成，此时应：
   * 1.将创建专辑的输入框的值置为''，并让输入框不可见按钮可见（即inputNewAlbumVisible: false）
   * 2.将该专辑加入this.state.albums todo 首先向后台请求添加专辑
   * 3.将选择专辑的选定值设为新创建的专辑
   */
  handleInputNewAlbumConfirm = () => {
    const inputNewAlbumValue = this.state.inputNewAlbumValue;
    let albums = this.state.albums;
    if(inputNewAlbumValue && albums.indexOf(inputNewAlbumValue) === -1){
      albums = [...albums, inputNewAlbumValue];
    }
    console.log(albums);
    this.setState({
      albums,
      inputNewAlbumVisible: false,
      inputNewAlbumValue: '',
      selectValue: inputNewAlbumValue
    })
  };

  saveInputRef = input => this.input = input;

  saveInputNewAlbumRef = input => this.input = input;

  /**
   *  更改selectValue（选择专辑的选定值）
    * @param value 选择专辑的选定值
   */
  handleAlbumSelect = (value) => {
    this.setState({selectValue: value});
  };

  /**
   * 提交大片儿秀
   * @param e
   */
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const share = {
          title: values.title,
          description: values.description,
          tags: this.state.tags,
          album: this.state.selectValue,
          images: this.state.fileList.map((file) => { return file.originFileObj})
        };
        console.log(share);
      }
    });
  };


  render() {
    const { fileList, tags, inputVisible, inputValue } = this.state;
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 6,
        },
      },
    };

    /**
     * 热门标签 todo 向底层请求热门标签
     * @type {[*]}
     */
    const hotTags = ['女神','胶片','少女写真','人像','摄影','婚纱'];

    return (
      <Row className={styles.content}>
        <Col span={15}>
          <div className={styles.picturePart}>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={this.handleChange}
            >
              {
                fileList.length >= 9 ?
                  null
                  :
                  <div>
                    <Icon type="plus"/>
                    <div className="ant-upload-text">上传（最多9张）</div>
                  </div>
              }
            </Upload>
          </div>
        </Col>
        <Col span={9}>
          <div className={styles.infoPart}>
            <Form onSubmit={this.handleSubmit}>
              <FormItem
                {...formItemLayout}
                label="标题"
              >
                {getFieldDecorator('title',{initialValue:""})(
                  <Input />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="描述"
              >
                {getFieldDecorator('description',{initialValue:""})(
                  <TextArea rows={4} />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={(<span>标签&nbsp;<Tooltip title="给您的大片儿添加标签，便于搜索和管理"><Icon type="question-circle-o" /></Tooltip></span>)}
              >
                {getFieldDecorator('tag')(
                  <div>
                    <div>
                      {tags.map((tag) => {
                        const isLongTag = tag.length > 20;
                        const tagElem = (
                          <Tag key={tag} closable={true} afterClose={() => this.handleClose(tag)}>
                            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                          </Tag>
                        );
                        return isLongTag ? <Tooltip title={tag}>{tagElem}</Tooltip> : tagElem;
                      })}
                      {inputVisible && (
                        <Input
                          ref={this.saveInputRef}
                          type="text"
                          size="small"
                          style={{ width: 78 }}
                          value={inputValue}
                          onChange={this.handleInputChange}
                          onBlur={this.handleInputConfirm}
                          onPressEnter={this.handleInputConfirm}
                        />
                      )}
                      {!inputVisible &&(tags.length>=6?null: <Button size="small" type="dashed" onClick={this.showInput}>+ 标签</Button>)}
                    </div>
                    <div className={styles.hotTag}>热门标签:</div>
                    {
                      hotTags.map((tag) => {
                        return (
                          <CheckableTag
                            color="orange"
                            onChange={() => {this.addTag(tag)}}
                            key={tag}
                            className={styles.hotTags}
                          >
                            {tag}
                          </CheckableTag>
                        )
                      })
                    }
                  </div>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="专辑"
              >
                {getFieldDecorator('album')(
                  <div>
                    <Select
                      style={{ width: '100%' }}
                      placeholder="请选择专辑或输入创建新专辑"
                      onChange={this.handleAlbumSelect}
                      value={this.state.selectValue}
                      dropdownStyle={{maxHeight: 100, overflow: 'auto'}}
                    >
                      {this.state.albums.map((album) => {
                        return(
                          <Option key={album}>{album}</Option>
                        );
                      })}
                    </Select>
                    <div style={{color: 'orange'}}>OR</div>
                    {
                      this.state.inputNewAlbumVisible
                      &&
                      <Input
                        ref={this.saveInputNewAlbumRef}
                        type="text"
                        value={this.state.inputNewAlbumValue}
                        onChange={this.handleInputNewAlbumChange}
                        onBlur={this.handleInputNewAlbumConfirm}
                        className={styles.inputNewAlbum}
                        onPressEnter={this.handleInputNewAlbumConfirm}
                      />
                    }
                    {
                      !this.state.inputNewAlbumVisible
                      &&
                      <Button type="dashed" className={styles.createNewAlbum} onClick={this.showInputNewAlbum}>+创建新专辑</Button>
                    }
                  </div>
                )}
              </FormItem>
              <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" className={styles.submit}>确认上传</Button>
              </FormItem>
            </Form>
          </div>
        </Col>
      </Row>
    )
  }
}

const PostPhoto = Form.create()(PostPhotoForm);

export default connect()(PostPhoto);

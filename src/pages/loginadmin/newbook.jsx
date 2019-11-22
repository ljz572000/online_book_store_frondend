import React, { Component } from 'react';
import { Row, Col,Form,Input,Icon,Button,InputNumber,Upload,message} from 'antd';
import {reqinsertNewBook} from '../../api';
const { TextArea } = Input;

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

class NewBook extends Component {
    render() {
        return (
            <Row type="flex" justify="center">
                <Col span={16} style={{marginTop: '20px'}}>
                <NewBookForm refresh={()=>{this.props.history.go(0);}}/>
                </Col>
            </Row>
        );
    }
}
class NormalForm extends React.Component {
    state = {
        loading: false,
      };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if(!err){
                const {imageUrl} = this.state;
                if (typeof(imageUrl)=="undefined") {
                 message.error("还未上传图片");   
                }else{
                    const{bookName, author,brief,totalnum,book_pirce} = values
                    const response = await reqinsertNewBook(author,bookName, imageUrl, book_pirce,brief, totalnum);
                    message.success(response);
                    this.props.refresh();
                    // console.log(bookName, author,brief,totalnum,book_pirce,imageUrl);
                }
            }
        });
    };
    handleChange = async(info) => {
        if (info.file.status === 'done') {
            this.setState({
                imageUrl:info.file.response,
                loading: false,
              });
        }
      };
    render() {
      const { getFieldDecorator } = this.props.form;
      const uploadButton = (
        <div>
          <Icon type={this.state.loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">Upload</div>
        </div>
      );
      const { imageUrl } = this.state;
      return (
        <Form onSubmit={this.handleSubmit} style={{maxWidth: '500px',marginLeft:'auto',marginRight: 'auto'}}>
          <Form.Item style={{ padding: '0 10px' }}>
            {getFieldDecorator('bookName', {
              rules: [
                { required: true, whitespace: true, message: '请输入书名!' },
              ],
            })(
              <Input
                prefix={ <Icon type="book" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="书名"
              />,
            )}
          </Form.Item>
          <Form.Item style={{ padding: '0 10px' }}>
            {getFieldDecorator('author', {
              rules: [
                { required: true,whitespace: true, message: '请输入作者!' },
              ],
            })(
              <Input
                prefix={<Icon type="book" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="作者"
              />,
            )}
          </Form.Item>
          <Form.Item style={{ padding: '0 10px' }}>
            {getFieldDecorator('brief', {
              rules: [
                { required: true, message: '请输入图书简介!' },
              ],
            })(
                <TextArea
                placeholder="简介"
                autoSize={{ minRows: 3, maxRows: 5 }}
              />,
            )}
          </Form.Item>
          <Form.Item style={{ padding: '0 10px' }}>{"添加库存 :  "}
                {
                    getFieldDecorator('totalnum', {
                        rules: [
                            { required: true, message: '请输入库存数量!' }
                        ],
                 
                    })(
                        <InputNumber min={0}   placeholder="库存数量"/>,
                    )}
            </Form.Item>
            <Form.Item style={{ padding: '0 10px' }}>
                        <Upload
                        name="bookPic"
                        accept='image/*'  /**只接受图片格式 */
                        listType='picture-card'
                        action='/api/uploadbookPic'
                        style={{width:'310px',height:'218px'}}
                        beforeUpload={beforeUpload}
                        onChange={this.handleChange}
                        showUploadList={false}
                      >
                         {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                      </Upload>
            </Form.Item>
            <Form.Item style={{ padding: '0 10px' }}>{"添加价格 :  "}
                {
                    getFieldDecorator('book_pirce', {
                        rules: [{ required: true, message: '请输入书价!' },
                        { pattern: /^[0-9,.]+$/, message: '数字包含小数点组成' }],
                    })(
                        <Input style={{ width: '90px' }} placeholder="图书价格" />,
                    )}
            </Form.Item>
          <Form.Item style={{ padding: '0 10px' }}>
            <Button type="primary" htmlType="submit" className="common-form-button">
              添加
                </Button>
          </Form.Item>
        </Form>
      );
    }
  }
  
  const NewBookForm = Form.create({ name: 'normal_newbook' })(NormalForm);

  
export default NewBook;

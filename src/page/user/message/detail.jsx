/*
* @Author: Rosen
* @Date:   2017-02-13 10:22:06
* @Last Modified by:   Rosen
* @Last Modified time: 2017-04-13 15:36:53
*/

'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

import PageTitle from 'component/page-title/index.jsx';


import MMUtile from 'util/mm.jsx';
import User from 'service/user.jsx';

const _mm = new MMUtile();
const _user = new User();

import './detail.scss';

const ProductSave = React.createClass({
    getInitialState() {
        return {
            id: this.props.params.messageId,
            title: '',
            user_id: '',
            content: '',
            response: '',
            userMessageResponseList: [],
        };
    },
    componentDidMount: function () {
        this.loadInfo();
    },
    // 编辑的时候，需要初始化商品信息
    loadInfo() {
        if(!this.state.id){
            alert('信息不存在');
            window.location.href = '#/user.message/index';
        }
        _user.messageInfo(this.state.id).then(res => {
            this.setState(res);
        }, err => {
            alert(err.msg || '哪里不对了~');
        });
    },
    // 普通字段更新
    onValueChange(e) {
        let name = e.target.name,
            value = e.target.value;
        // 更改state
        this.setState({
            [name]: e.target.value
        });
    },
    // 验证要提交信息是否符合规范
    checkParams(params) {
        let result = {
            status: true,
            msg: '验证通过'
        };
        if (!params.content) {
            result = {
                status: false,
                msg: '回复内容不能为空'
            }
        }
        return result;
    },
    // 提交表单
    onSubmit(e) {
        // 阻止提交
        e.preventDefault();
        // 需要提交的字段
        let data = {
            messageId: this.state.id,
            content: this.state.response,
        };
        let checkParam = this.checkParams(data);
        // 验证通过后，提交商品信息
        if (checkParam.status) {
            _user.messageResponse(data).then(res => {
                alert('回复成功');
                window.location.reload();
            }, err => {
                alert(err.msg || '哪里不对了~');
            });
        } else {
            alert(checkParam.msg);
        }
        return false;
    },
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle={'留言管理 -- 留言详情'}/>
                <div className="row">
                    <div className="form-wrap col-lg-12">
                        <p>{this.state.title}</p>
                        <blockquote>
                            <p>{this.state.content}</p>
                        </blockquote>
                        <div>
                            {
                                this.state.userMessageResponseList.map((info, index) => {
                                    return (
                                        <dl>
                                        <dt>{info.userName}</dt>
                                        <dd>{info.content}</dd>
                                        </dl>
                                        );
                                })
                            }
                        </div>
                        <div className="form-horizontal">
                            <div className="form-group">
                                <div className="col-md-5">
                                    <textarea className="form-control" rows="3" name='response' onChange={this.onValueChange}></textarea>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-offset-2 col-md-10">
                                    <button type="btn" className="btn btn-xl btn-primary" onClick={this.onSubmit}>提交
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default ProductSave;
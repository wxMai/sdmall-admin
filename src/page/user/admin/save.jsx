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

import './save.scss';

const ProductSave = React.createClass({
    getInitialState() {
        return {
            id: this.props.params.pId,
            username: '',
            email: '',
            phone: '',
            password: false,
        };
    },
    componentDidMount: function () {
        this.loadUserInfo();
    },
    // 编辑的时候，需要初始化商品信息
    loadUserInfo() {
        // 有id参数时，读取商品信息
        if (this.state.id) {
            // 查询一级品类时，不传id
            _user.getUserInfo(this.state.id).then(res => {
                this.setState(res);
            }, err => {
                alert(err.msg || '哪里不对了~');
            });
        }
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
        if (!params.username) {
            result = {
                status: false,
                msg: '请输入用户名'
            }
        }
        if (!params.email) {
            result = {
                status: false,
                msg: '请输入邮箱地址'
            }
        }
        if (!this.state.id && !params.password) {
            result = {
                status: false,
                msg: '请输入密码'
            }
        }
        if (!params.phone) {
            result = {
                status: false,
                msg: '请输入手机'
            }
        }
        return result;
    },
    // 提交表单
    onSubmit(e) {
        // 阻止提交
        e.preventDefault();
        // 需要提交的字段
        let userData = {
            username: this.state.username,
            email: this.state.email,
            phone: this.state.phone,
            password: this.state.password,
        };
        let checkParam = this.checkParams(userData);
        // 当为编辑时，添加id字段
        if (this.state.id) {
            userData.id = this.state.id;
        }
        // 验证通过后，提交商品信息
        if (checkParam.status) {
            _user.saveAdmin(userData).then(res => {
                alert('操作成功');
                window.location.href = '#/user.admin/index';
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
                <PageTitle pageTitle={'用户管理 -- ' + (this.state.id ? '编辑用户' : '添加用户')}/>
                <div className="row">
                    <div className="form-wrap col-lg-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="name" className="col-md-2 control-label">用户名</label>
                                <div className="col-md-5">
                                    <input type="text"
                                           className="form-control"
                                           name="username"
                                           id="username"
                                           placeholder="请输入用户名"
                                           value={this.state.username}
                                           onChange={this.onValueChange}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name" className="col-md-2 control-label">密码</label>
                                <div className="col-md-5">
                                    <input type="text"
                                           className="form-control"
                                           name="password"
                                           id="password"
                                           placeholder="请输入密码"
                                           onChange={this.onValueChange}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subtitle" className="col-md-2 control-label">邮箱</label>
                                <div className="col-md-5">
                                    <input type="text"
                                           className="form-control"
                                           name="email"
                                           id="email"
                                           placeholder="请输入邮箱"
                                           value={this.state.email}
                                           onChange={this.onValueChange}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subtitle" className="col-md-2 control-label">手机</label>
                                <div className="col-md-5">
                                    <input type="text"
                                           className="form-control"
                                           name="phone"
                                           id="phone"
                                           placeholder="请输入手机"
                                           value={this.state.phone}
                                           onChange={this.onValueChange}/>
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
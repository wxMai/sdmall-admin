/*
* @Author: Rosen
* @Date:   2017-02-11 18:46:37
* @Last Modified by:   Rosen
* @Last Modified time: 2017-04-09 23:48:17
*/

'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

import './index.scss';
import MMUtile from 'util/mm.jsx';
import PageTitle from 'component/page-title/index.jsx';

import User from 'service/user.jsx';

const _mm = new MMUtile();
const _user = new User();

const ProductCategory = React.createClass({
    getInitialState() {
        return {
            list: [],
            pageNum: 1,
            pages: 0
        };
    },
    componentDidMount() {
        this.initUserList();
    },
    initUserList() {
        _user.normalUserList().then(res => {
            this.setState(res);
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    },
    delUser(userId) {
        if(confirm('是否确认删除该用户？')){
            _user.delUser(userId).then(res =>{
                _mm.successTips(res);
                this.initUserList();
            }, errMsg=>{
                _mm.errorTips(errMsg);
            });
        }
    },
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="账号管理">
                    <div className="page-header-right">
                        <Link className="btn btn-primary" to="/user/save">
                            <i className="fa fa-plus fa-fw"></i>
                            <span>添加账号</span>
                        </Link>
                    </div>
                </PageTitle>
                <div className="row">
                    <div className="table-wrap col-lg-12">
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                            <tr>
                                <th>用户ID</th>
                                <th>用户名</th>
                                <th>邮箱</th>
                                <th>手机</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.list.map((userInfo, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{userInfo.id}</td>
                                            <td>
                                                <span>{userInfo.username}</span>
                                            </td>
                                            <td><span>{userInfo.email}</span></td>
                                            <td><span>{userInfo.phone}</span></td>
                                            <td>
                                                <Link className="opear" to={'/user/save/' + userInfo.id}>编辑</Link>
                                                <a className="opera"
                                                   onClick={this.delUser.bind(this, userInfo.id)}>删除</a>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
});

export default ProductCategory;

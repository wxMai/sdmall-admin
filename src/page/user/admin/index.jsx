/*
* @Author: Rosen
* @Date:   2017-02-11 18:46:37
* @Last Modified by:   Rosen
* @Last Modified time: 2017-04-09 23:48:17
*/

'use strict';
import React        from 'react';
import ReactDOM     from 'react-dom';
import { Link }     from 'react-router';

import './index.scss';
import MMUtile      from 'util/mm.jsx';
import PageTitle    from 'component/page-title/index.jsx';

import User      from 'service/user.jsx';

const _mm = new MMUtile();
const _user  = new User();

const ProductCategory = React.createClass({
    getInitialState() {
        return {
            userList        : [],
            pageNum         : 1,
            pages           : 0
        };
    },
    componentDidMount(){
        this.initUserList();
    },
    initUserList(){
        // 按父id查询对应的品类
        _user.adminList().then(res => {
            this.setState({
                userList: res
            });
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    },
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="管理员管理">
                    <div className="page-header-right">
                        <Link className="btn btn-primary" to="/product.category/add">
                            <i className="fa fa-plus fa-fw"></i>
                            <span>添加管理员</span>
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
                                this.state.userList.map((userInfo, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{category.id}</td>
                                            <td>
                                                <span>{category.name}</span>
                                            </td>
                                            <td>
                                                <a className="opera" onClick={this.onUpdateName.bind(this, category.id, category.name)}>修改名称</a>
                                                <a className="opera" onClick={this.onDelete.bind(this, category.id, category.name)}> 删除 </a>
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

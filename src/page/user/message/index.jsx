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
        this.initList();
    },
    initList() {
        let listParam       = {};
        listParam.pageNum   = this.state.pageNum;
        listParam.userId   = this.state.userId || 0;
        _user.messageList(listParam).then(res => {
            this.setState(res);
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    },
    onValueChange(e){
        let name   = e.target.name;
        this.setState({
            [name] : e.target.value
        });
    },
    // 搜索
    onSearch(){
        this.state.pageNum = 1;
       this.initList();
    },
    /*delUser(userId) {
        if(confirm('是否确认删除该用户？')){
            _user.delUser(userId).then(res =>{
                _mm.successTips(res);
                this.initUserList();
            }, errMsg=>{
                _mm.errorTips(errMsg);
            });
        }
    },*/
    onDelete(messageId){
        if(confirm('是否确认删除该留言？')){
            _user.messageDel(messageId).then(res => {
                _mm.successTips(res);
                this.initList();
            }, errMsg => {
                _mm.errorTips(errMsg);
            });
        }
    },
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="留言管理">
                    <div className="page-header-right">
                       {/* <Link className="btn btn-primary" to="/user/save">
                            <i className="fa fa-plus fa-fw"></i>
                            <span>添加账号</span>
                        </Link>*/}
                    </div>
                </PageTitle>
                <div className="row">
                    <div className="search-wrap col-md-12">
                        <div className="form-inline">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="用户id" name="userId" onChange={this.onValueChange}/>
                            </div>
                            <button type="button" className="btn btn-default" onClick={this.onSearch}>查询</button>
                        </div>
                    </div>
                    <div className="table-wrap col-lg-12">
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                            <tr>
                                <th>标题</th>
                                <th>用户id</th>
                                <th>内容</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.list.map((info, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{info.title}</td>
                                            <td>
                                                <span>{info.user_id}</span>
                                            </td>
                                            <td><span>{info.content}</span></td>
                                            <td>
                                                <Link className="opear" to={'/user.message/detail/' + info.id}> 详情 </Link>
                                                <a className="opera" onClick={this.onDelete.bind(this, info.id)}> 删除 </a>
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

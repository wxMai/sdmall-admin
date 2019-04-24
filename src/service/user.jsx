/*
* @Author: Rosen
* @Date:   2017-02-24 15:49:17
* @Last Modified by:   Rosen
* @Last Modified time: 2017-04-13 15:59:59
*/

'use strict';

import MMUtile from 'util/mm.jsx';

const mm = new MMUtile();

export default class User{
    // 检查用于登录的信息是否合法
    checkLoginInfo(userInfo){
        if(!userInfo.username){
            return {
                state: false,
                msg: '用户名不能为空'
            }
        }
        if(!userInfo.password){
            return {
                state: false,
                msg: '密码不能为空'
            }
        }
        return {
            state: true,
            msg: '验证通过'
        }
    }
    // 登录
    login(userInfo){
        return mm.request({
            url     : mm.getServerUrl('/manage/user/login.do'),
            method  : 'POST',
            data    : {
                username : userInfo.username || '',
                password : userInfo.password || ''
            }
        });
    }
    // 退出登录
    logout(){
        return mm.request({
            url     : mm.getServerUrl('/user/logout.do'),
            method  : 'POST',
        });
    }
    // 管理员列表
    adminList() {
        return mm.request({
            url     : mm.getServerUrl('/manage/user/adminList.do'),
            method  : 'GET',
        });
    }
    // 管理员列表
    normalUserList() {
        return mm.request({
            url     : mm.getServerUrl('/manage/user/normalUserList.do'),
            method  : 'GET',
        });
    }
    // 保存用户
    saveAdmin(data) {
        return mm.request({
            url     : mm.getServerUrl('/manage/user/saveAdmin.do'),
            method  : 'POST',
            data : data,
        });
    }
    // 保存用户
    saveNormalUser(data) {
        return mm.request({
            url     : mm.getServerUrl('/manage/user/saveNormalUser.do'),
            method  : 'POST',
            data : data,
        });
    }
    // 获取用户信息
    getUserInfo(id){
        return mm.request({
            url     : mm.getServerUrl('/manage/user/info.do'),
            method  : 'GET',
            data : {
                userId : id
            },
        });
    }
    delUser(id){
        return mm.request({
            url     : mm.getServerUrl('/manage/user/delUser.do'),
            method  : 'POST',
            data : {
                userId : id
            },
        });
    }
}
## 关于
整合项目分为两个部分: 前台项目接口 后台数据接口   
通过sequelize 生成模型表 操作mysql

## 技术栈
nodejs + express + mysql + es6/7 + typescript + sequelize

## 功能实现

图片上传--完成  
token验证-完成  
登录登出--完成  
聊天功能--完成  
未读功能--完成  
已读功能--完成  
发送朋友圈--完成  
备注功能--完成  

## 项目布局

# 项目布局
```
├── src                                           // 源码目录
│   ├── context                                   // Context对象
│   │   ├── AccountContext                        // 账户控制
│   │   ├── ChatContext                           // 聊天控制
│   │   ├── DiscoverContext                       // 朋友圈控制
│   ├── db                                        // 数据库
│   │   ├── model                                 // 数组库模型 
│   │   │   ├── Discover                          // 朋友圈表模型 
│   │   │   ├── FriendModel                       // 朋友表模型 
│   │   │   ├── MessageModel                      // 消息表模型 
│   │   │   ├── UserModel                         // 用户表模型 
│   │   ├── DB.ts                                 // 数据库连接
│   ├── middleware                                // 中间件
│   │   ├── multerMiddleWare                      // 文件处理中间件 
│   │   ├── resultMiddleWare                      // expressResponse对象处理中间件
│   ├── model                                     // 模型
│   │   ├── User                                  // 用户模型 
│   │   ├── UserChat                              // 用户所有会话模型
│   │   ├── Message                               // 消息模型
│   │   ├── Friend                                // 朋友模型
│   │   ├── ChatSession                           // 用户1v1对话模型
│   ├── repo                                      // 仓库
│   │   ├── DiscoverRepository                    // 朋友圈仓库
│   │   ├── UserRepository                        // 用户仓库
│   │   ├── MessageRepository                     // 消息仓库
│   ├── router                                    // 路由
│   │   ├── Discover                              // 朋友圈接口  
│   │   ├── Firend                                // 朋友接口 
│   │   ├── login                                 // 登录接口
│   │   ├── Message                               // 消息接口
│   │   ├── upload                                // 图片处理接口
│   ├── app.ts                                    // 入口文件
│   ├── token.ts                                  // token


 
```






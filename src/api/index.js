/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from './ajax'
const BASE_URL = '/api';
// let BASE_URL = process.env.NODE_ENV === 'production' ?'http://47.112.132.177:8084':'http://localhost:8080';

// 1、获取所有可用组别信息
export const reqTeams = (pageNum = 1 ,pageSize = 1000 )=> ajax(BASE_URL+'/group/all' ,{pageNum,pageSize},'post');
// 1、无条件获取所有组别
export const reqGroupAllno = (pageNum = 1 , pageSize = 10)=> ajax(BASE_URL+'/group/find/allno' ,{pageNum,pageSize},'post');
// 1、组别状态修改
export const updateGroupStatus = (id,groupIsenabled )=> ajax(BASE_URL+'/group/update/enable' ,{id,groupIsenabled },'post')
// 2、上传新组别
export const uploadTeam = (formdata)=> ajax(BASE_URL + '/group/upload' ,formdata,'post' ,'formdata')
// 3、 删除组别
export const reqDelete = (id,groupIsenabled  = 0)=>ajax(BASE_URL+'/group/update/enable' , {groupIsenabled ,id},'post');
// 4、 组别修改
export const reqUpdate = (formdata)=>ajax(BASE_URL+'/group/update' , formdata,'post','formdata');
// 5、 成员上传
export const uploadMems = (formdata)=>ajax(BASE_URL+'/mem/upload' , formdata,'post','formdata');
// 6、 分页获取所有成员
export const reqAllMems = (pageNum = 1,pageSize = 10) =>ajax(BASE_URL+'/mem/find/all',{pageNum,pageSize},'post');
// 7、 分页获取全部未知组别成员
export const reqNotGroup = (pageNum = 1,pageSize = 10) =>ajax(BASE_URL+'/mem/find/ungroup',{pageNum,pageSize},'post');
// 8、 分组获取离开成员名单
export const reqLeaveMems = (group ) =>ajax(BASE_URL+'/mem/find/leave/group',{group},'post');
// 9、 分组获取成员名单
export const reqGroupMems = (group , pageNum = 1 ,pageSize  = 10 ) =>ajax(BASE_URL+'/mem/find/group',{group,pageNum,pageSize},'post');
// 10、 更新成员信息
export const updateMems = (formdata) =>ajax(BASE_URL+'/mem/update/all',formdata, 'post','formdata');
// 10、 修改成员住哪个台
export const updateMemStatus = (id ,memIsenable ) =>ajax(BASE_URL+'/mem/update/status',{id ,memIsenable }, 'post');
// 11、 获取实验室制度  delFlag=0为可用  1为删除
export const reqRegu = (delFlag =  0 ) =>ajax(BASE_URL+'/insitu/all',{delFlag}, 'post');
// 12、 修改实验室制度
export const updateRegu = (id,insituContent) =>ajax(BASE_URL+'/insitu/update',{id,insituContent}, 'post');
// 13、 上传新制度
export const uploadRegu = (insituContent) =>ajax(BASE_URL+'/insitu/upload',{insituContent}, 'post');
// 13、 删除制度
export const deleteRegu = (id,delFlag = 1) =>ajax(BASE_URL+'/insitu/update/delFlag',{id,delFlag}, 'post');
// 14、 上传实验室资源
export const uploadReso = (resource) =>ajax(BASE_URL+'/res/upload',resource, 'post' , 'formdata');
// 15、 获取实验室资源  0位可用  1为删除
export const reqAllReso = (delFlag = 0) =>ajax(BASE_URL+'/res/find/all',{delFlag}, 'post');
// 16、 修改实验室资源
export const updateReso = (formdata) =>ajax(BASE_URL+'/res/update',formdata, 'post','formdata');
// 16、 删除实验室资源  0位可用  1为删除
export const deleteReso = (id , delFlag  = 1) => ajax(BASE_URL +'/res/update/del' , {id,delFlag} , 'post');
// 17.  根据id获取成员信息
export const reqSomeMems = (id) => ajax(BASE_URL+'/mem/find/id' , {id} , 'post')
// 18.  根据id获取成员信息
export const reqSurrounding = (id) => ajax(BASE_URL+'/atm/find/one' , {id} , 'post')
// 19.  获取所有奖项 delFlag 0可用 1删除
export const reqAllAward = (delFlag ,pageNum,pageSize) => ajax(BASE_URL+'/award/find/all' , {delFlag,pageNum,pageSize} , 'post')
// 20.  根据组别分页获取获奖情况
export const reqGroupAward = (delFlag = 0,awardGroup ,pageNum=1 ,pageSize=10 ) => ajax(BASE_URL+'/award/find/group' , {delFlag,awardGroup ,pageNum ,pageSize } , 'post')
// 21.  获奖情况上传
export const uploadAward = (formdata) => ajax(BASE_URL+'/award/upload' , formdata , 'post' ,'formdata')
// 22.  获奖情况更新
export const updateAward = (formdata) => ajax(BASE_URL+'/award/update' , formdata , 'post' , 'formdata')
// 23.  根据id获取获奖信息
export const reqAward = (id) => ajax(BASE_URL+'/award/find/id' , {id} , 'post' )
// 24.  根据组别获取方向
export const reqGroupDirect = (group ) => ajax(BASE_URL+'/direct/group/one' , {group } , 'post' )
// 25.  根据组别上传方向
export const uploadGroupDirect = (directGroup ,directName ) => ajax(BASE_URL+'/direct/upload' , {directGroup ,directName } , 'post' )
// 26.  修改组别方向可用性 directEnable  = 0 删除
export const deleteGroupDirect = (id ,directEnable  ) => ajax(BASE_URL+'/direct/enable' , {id ,directEnable } , 'post' )
// 26.  修改方向名称
export const updateDirectName = (id ,directName  ) => ajax(BASE_URL+'/direct/update/name' , {id ,directName } , 'post' )
// 26.  团队氛围修改 (凑合用)
export const updateSurrounding = (id,atmDetail) => ajax(BASE_URL+'/atm/update/all' , {id,atmDetail} , 'post' )
// 27.  上传团队项目
export const uploadProjects = (formdata) => ajax(BASE_URL+'/pro/upload' , formdata , 'post' ,'formdata')
// 28.  更新团队项目
export const updateProjects = (formdata) => ajax(BASE_URL+'/pro/update' , formdata , 'post' ,'formdata' )
// 29.  获取团队项目
export const reqAllProjects = (delFlag, pageNum ,pageSize ) => ajax(BASE_URL+'/pro/find/status' , {delFlag, pageNum ,pageSize} , 'post' )
// 30.  分页获取留言
export const reqAllEmails = (pageNum =1 ,pageSize =10) => ajax(BASE_URL+'/email/find/all' , {pageNum ,pageSize} , 'post' )
// 31.  删除留言
export const deleteEmails = (ids ,delFlag =1 ) => ajax(BASE_URL+'/email/update/del' , {ids ,delFlag } , 'post' )
// 33.  团队项目状态修改
export const updateProjectStatus = (formdata ) => ajax(BASE_URL+'/pro/update' , formdata, 'post' , 'formdata')


//根据年份可用性获取风采   delFlag  0 为可用  1为删除
export const reqElegants = (pageNum,pageSize,year ,delFlag = 0 ) => ajax(BASE_URL+"/elegant/age",{pageNum,pageSize,year,delFlag },'post')  //获取对应年份对应页码的风采列表
// 删除团队风采
export const deleteElegant = (id ,delFlag=1) => ajax(BASE_URL+"/elegant/update/delFlag",{id ,delFlag },'post')  //获取对应年份对应页码的风采列表
//获取风采年份列表
export const reqElegantYears = () => ajax(BASE_URL+"/elegant/ages",{},'post')
export const reqElegantDetails = (id) => ajax(BASE_URL+"/elegant/details",{id},'post' )  //获取风采详情

//视频
export const reqGroups = () => ajax(BASE_URL+"/group/all",{},'POST')  //获取组别
export const reqGroupsVideos = (group,pageNum,pageSize) => ajax(BASE_URL+"/video/group",{group,pageNum,pageSize},'POST')  //获取组别视频
export const reqVideos = (pageNum,pageSize,year) => ajax(BASE_URL+"/video/age",{pageNum,pageSize,year},'POST')  //获取对应年份对应页码的视频列表
export const reqVideoYears = () => ajax(BASE_URL+"/video/ages",{},'POST')  //获取是视频年份列表
export const reqVideoDetails = (id) => ajax(BASE_URL+"/video/details",{id},'POST')  //获取视频详情


// 更新时间 : 2020 / 2 /16
// 1、获取所有可用成员
export const reqAllEnableMems = (pageNum = 1,pageSize = 10) => ajax(BASE_URL+'/mem/find/all/enabled' , {pageNum,pageSize} , 'post');
// 2、删除获得奖项  delFlag 1为删除
export const deleteAward = (formdata) => ajax (BASE_URL+ '/award/update/delFlag' , formdata , 'post', 'formdata');

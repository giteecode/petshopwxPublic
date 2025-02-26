// pages/edit/edit.js
const {
detail,
option,
update,
add,
list,
follow,
faceMatch,
session,
rubbish,
levelOption,
baiduIdentify
} = require("../../api/index.js")

const des = require('../../utils/des.js')
const utils = require("../../utils/index.js")

Page({

/**
* 页面的初始数据
*/
data: {
imgIcon: "../../static/upload.png",
editStatus: false,
baseURL:'',
sessionReadArr:[],

detailList: null,
id: "",
cross:"",
ruleForm:{},
userid:getApp().globalData.userInfo.id,
userInfo:getApp().globalData.userInfo,
ro:{
},

fuwubiaoti:"",
fuwutupian:"",
jiage:"",
huiyuanzhanghao:"",
shouji:"",
huiyuanxingming:"",
yuyueshijian:"请选择时间",
showyuyueshijian:false,
},


/**
* 生命周期函数--监听页面加载
*/
async onLoad(options) {
let userid
if (options?.id) {
this.setData({
editStatus: true
})

}
let nowTable = wx.getStorageSync("nowTable");
const res = await session(nowTable)
if(res.data.code==0){
getApp().globalData.userInfo=res?.data
userid = res?.data.id
this.setData({
userid
})

}

let baseURL =wx.getStorageSync('baseURL') + '/'
const id = getApp().globalData.detailId
this.setData({
refid:id,
baseURL
})
//人脸识别


let  ro=this.data.ro




if(options?.cross){
var obj = wx.getStorageSync('crossObj');
let refobjempty={}
for (var o in obj){

if(o=='fuwubiaoti'){
refobjempty["fuwubiaoti"]=obj[o]
ro.fuwubiaoti = true;
continue;
}else{
}


if(o=='fuwutupian'){
refobjempty['fuwutupianPath']=baseURL+ obj[o].split(",")[0]
ro.fuwutupian = true;
continue;
}else{
}


if(o=='jiage'){
refobjempty["jiage"]=obj[o]
ro.jiage = true;
continue;
}else{
}


if(o=='huiyuanzhanghao'){
refobjempty["huiyuanzhanghao"]=obj[o]
ro.huiyuanzhanghao = true;
continue;
}else{
}


if(o=='shouji'){
refobjempty["shouji"]=obj[o]
ro.shouji = true;
continue;
}else{
}


if(o=='huiyuanxingming'){
refobjempty["huiyuanxingming"]=obj[o]
ro.huiyuanxingming = true;
continue;
}else{
}


if(o=='yuyueshijian'){
refobjempty["yuyueshijian"]=obj[o]
ro.yuyueshijian = true;
continue;
}else{
}


}

let  statusColumnName=wx.getStorageSync('statusColumnName');
statusColumnName=statusColumnName.replace('[',"").replace(']',"");
this.setData({
ro,
cross:options?.cross,
statusColumnName
})
this.setData(refobjempty)
}
if(id){
// 如果上一级页面传递了id，获取改id数据信息
const   data=getApp().globalData.detailList


const url = wx.getStorageSync("baseURL") + "/"
const detailList = data
let  objtemp= {
detailList,
fuwubiaoti: data.fuwubiaoti,
fuwutupian:data?.fuwutupian?.split(',')[0],
fuwutupianPath:baseURL+data?.fuwutupian?.split(',')[0],
jiage: data.jiage,
huiyuanzhanghao: data.huiyuanzhanghao,
shouji: data.shouji,
huiyuanxingming: data.huiyuanxingming,
yuyueshijian:utils.getCurrentDate("yMDhms"),
ispay: '未支付',

}
this.setData(objtemp);

//ss读取
let h = this.data
let c = this.data
let d1 = this.data
let d2 = this.data
this.setData({
});

}else {
this.setData({
})
}
// ss读取
let sessionReadArr=[]
let huiyuanzhanghao= getApp().globalData.userInfo.huiyuanzhanghao
ro.huiyuanzhanghao=true
this.setData({
huiyuanzhanghao,
})
sessionReadArr.push('huiyuanzhanghao')
let shouji= getApp().globalData.userInfo.shouji
ro.shouji=true
this.setData({
shouji,
})
sessionReadArr.push('shouji')
let huiyuanxingming= getApp().globalData.userInfo.huiyuanxingming
ro.huiyuanxingming=true
this.setData({
huiyuanxingming,
})
sessionReadArr.push('huiyuanxingming')

this.setData({
cross:options?.cross,
ro,
id,

})









},
getUUID () {
return new Date().getTime();
},
onUnload: function () {
console.log('页面被卸载，执行销毁操作');
},
onShow() {

},





























uploadfuwutupian() {
wx.chooseImage({
count: 1,
sizeType: ['compressed'],
sourceType: ['album', 'camera'],
success: async (res) => {
const tempFilePaths = res.tempFilePaths;
// 本地临时图片的路径
this.setData({
fuwutupianPath: tempFilePaths[0]
})
let _this = this;
// 上传网络图片
const baseURL = wx.getStorageSync('baseURL')
wx.uploadFile({
url: `${baseURL}/file/upload`,
filePath: res.tempFilePaths[0],
name: 'file',
header: {
'Token': wx.getStorageSync('token')
},
success: (uploadFileRes) => {
let result = JSON.parse(uploadFileRes.data);
// result.file是上传成功为网络图片的名称
if (result.code == 0) {
  this.setData({
   fuwutupian: 'file/' + result.file
 })
} else {
 wx.showToast({
  title: result.msg,
  icon: 'none',
  duration: 2000
 });
}
}
})

this.setData({
face: tempFilePaths[0]
});

}
})
},








uploadfuwutupian() {
wx.chooseImage({
count: 1,
sizeType: ['compressed'],
sourceType: ['album', 'camera'],
success: async (res) => {
const tempFilePaths = res.tempFilePaths;
// 本地临时图片的路径
this.setData({
fuwutupianPath: tempFilePaths[0]
})
let _this = this;
// 上传网络图片
const baseURL = wx.getStorageSync('baseURL')
wx.uploadFile({
url: `${baseURL}/file/upload`,
filePath: res.tempFilePaths[0],
name: 'file',
header: {
'Token': wx.getStorageSync('token')
},
success: (uploadFileRes) => {
let result = JSON.parse(uploadFileRes.data);
// result.file是上传成功为网络图片的名称
if (result.code == 0) {
  this.setData({
   fuwutupian: 'file/' + result.file
 })
} else {
 wx.showToast({
  title: result.msg,
  icon: 'none',
  duration: 2000
 });
}
}
})

this.setData({
face: tempFilePaths[0]
});

}
})
},













































onyuyueshijianTap(){
this.setData({
showyuyueshijian: true,
})

let c = this.data;
},
yuyueshijianTap(e) {
this.setData({
yuyueshijian: e.detail.data
})

let c = this.data;
},











async submit() {
let that = this
var query = wx.createSelectorQuery();







if(this.data.yuyueshijian?.includes("请选择") || this.data.yuyueshijian==""){
wx.showToast({
icon: "none",
title: `预约时间不能为空`,
})
return
}








const baseURL = wx.getStorageSync('baseURL') + "/"
const regex = new RegExp(baseURL, "g");
const obj={
fuwubiaoti: this.data. fuwubiaoti,
fuwutupian:this.data.fuwutupian?.replace(regex, ""),
jiage: this.data. jiage,
huiyuanzhanghao: this.data. huiyuanzhanghao,
shouji: this.data. shouji,
huiyuanxingming: this.data. huiyuanxingming,
yuyueshijian: this.data. yuyueshijian,
ispay: this.data.ispay ? this.data.ispay : "未支付",
}
const detailId= getApp().globalData.detailId
const tableName= `yuyuefuwu`

//跨表计算判断
var obj2;
var  ruleForm=obj
obj2 = ruleForm
this.data.refid==""? ruleForm['refid']= getApp().globalData.detailId:""
ruleForm['userid']=getApp().globalData.userInfo.id
var userInfo=getApp().globalData.userInfo


const sessionReadArr=this.data.sessionReadArr
const phonePattern = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
const mobilePattern = /^(?:\+?86)?1[3-9]\d{9}$/;
const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const idPattern = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2]\d|3[0-1])\d{3}[\dxX]$/;
const urlPattern = /^(http|https):\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;























































if(!this.data.yuyueshijian ){
wx.showToast({
icon: "none",
title: `预约时间不能为空`,
})
return
}






















//更新跨表属性
var crossuserid;
var crossrefid;
var crossoptnum;

if(this.data.cross) {
wx.setStorageSync('crossCleanType', true);
var statusColumnName = wx.getStorageSync('statusColumnName');
var statusColumnValue = wx.getStorageSync('statusColumnValue');
if (statusColumnName != '') {
obj2 = wx.getStorageSync('crossObj');
if (!statusColumnName.startsWith("[")) {
for (var o in obj2) {
if (statusColumnName==o){
obj2[o] = statusColumnValue;
}

}
var table = wx.getStorageSync('crossTable');

await update(table, obj2)
} else {

crossuserid =getApp().globalData.userInfo.id
crossrefid =  this.data.id
crossoptnum = wx.getStorageSync('statusColumnName');
crossoptnum = crossoptnum.replace(/\[/, "").replace(/\]/, "");
}
}
}
this.data.cross ? (crossrefid = obj2.id, crossuserid =getApp().globalData.userInfo.id) : ""
ruleForm?.crossrefid==undefined? ( ruleForm["crossrefid"] = obj2.id, ruleForm["crossuserid"] =getApp().globalData.userInfo.id ): "";
ruleForm?.shhf?ruleForm.shhf=this.data.shhf:''
if(crossrefid && crossuserid) {
ruleForm['crossuserid'] =obj2.id
ruleForm['crossrefid'] =getApp().globalData.userInfo.id

this.setData({
ruleForm
})
let params = {
page: 1,
limit: 10,
crossuserid: crossuserid,
crossrefid: crossrefid,
}
const tips = wx.getStorageSync('tips')
let corssRes = await list(`yuyuefuwu`, params)
crossoptnum = wx.getStorageSync('statusColumnName');
crossoptnum = crossoptnum.match(/\d+/g);
if (corssRes?.data?.total >= parseInt(crossoptnum)) {
wx.showToast({
icon: "none",
title: tips,
})
wx.removeStorageSync('crossCleanType');
return ;
}
else {


//跨表计算

















if (ruleForm.id ) {
await update(`yuyuefuwu`, ruleForm)
}
else {
await add(`yuyuefuwu`, ruleForm)
}
}


}
else {


//跨表计算
if (ruleForm.id || this.data.editStatus) {
this.data.editStatus?ruleForm['id']= getApp().globalData.detailId:""
await update(`yuyuefuwu`, ruleForm)
}
else {
await add(`yuyuefuwu`, ruleForm)
}
}
getApp().globalData.editorContent=''
wx.showToast({
title: '提交成功',
icon: "none"
})
const preId = getApp().globalData.detailId

if(table){
let res = await detail(table, preId)
if(res.code==0){
getApp().globalData.detailList = res.data
}

}



wx.navigateBack({
delta: 1,
complete: () => {
// 触发事件通知，传递需要更新的数据
const pages = getCurrentPages();
if (pages.length >= 1) {
const prePage = pages[pages.length - 2];
prePage.onLoad(); //
}
}
})













},
onHide() {

},

/**
* 生命周期函数--监听页面卸载
*/
onUnload() {

},


/**
* 页面相关事件处理函数--监听用户下拉动作
*/
onPullDownRefresh() {

},

/**
* 页面上拉触底事件的处理函数
*/
onReachBottom() {

},

/**
* 用户点击右上角分享
*/
onShareAppMessage() {

}
})
let Koa = require('koa')
const bodyParser = require('koa-bodyparser')
let KoaRouter = require('koa-router')
const mysql = require("mysql")
const fs = require('fs')
const path = require('path')

const app = new Koa()
const router = new KoaRouter()
app.use(bodyParser())

//连接数据库
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'tlt361989',
	port: '3306',
	database: 'miniprogram'
})

//新增数据
router.post('/add', async (ctx, next) => {
		console.log(JSON.stringify(ctx.request))
		var data = {}
		var querySql="INSERT INTO shoppingcart VALUES(?,?,?,?,?,?,?,?,?,?,?)"
		var queryParams=[
			ctx.request.body.count,
			ctx.request.body.showIndex,
			ctx.request.body.superCategoryId,
			ctx.request.body.selected,
			ctx.request.body.promTag,
			ctx.request.body.wapBannerUrl,
			ctx.request.body.name,
			ctx.request.body.retailPrice,
			ctx.request.body.weight,
			ctx.request.body.id,
			ctx.request.body.describe
		]
		var searchSql = (querySql,queryParams) => {
			return new Promise((resolve, reject) => {
				console.log('准备新增')
				connection.query(querySql,queryParams, function(err, result) {
					if(err){
						reject(0)
						console.log(err+'err')
					}
					resolve(result)
				})
			})
		}
		var res= await searchSql(querySql,queryParams)
		if(res){
			data.code='0'
			data.msg="添加成功"
			ctx.body=data
		}else{
			data.code='1'
			data.msg="添加失败"
			ctx.body=data
		}
});
//查询数据
router.get('/query', async (ctx, next) => {
	var data = {}
	var querySql = "select * from buysdata"
	var querySql2 = "select * from subcatelist"
	var querySql3 = "select * from shoppingcart"
	var searchSql = (thesql) => {
		return new Promise((resolve, reject) => {
			console.log('准备查询')
			connection.query(thesql, function(err, result) {
				if(err){
					reject(0)
					console.log(err+'err')
				}
				resolve(result)
			})
		})
	}
	var res= await searchSql(querySql)
	var res2= await searchSql(querySql2)
	var res3= await searchSql(querySql3)
	if(res&&res2){
		var param={buysdata:res,subcatelist:res2,shoppingcart:res3}
		data.code='0'
		data.msg="成功获取"
		data.data=param
		ctx.body=data
	}
})
//更新数据
router.post('/update', async (ctx, next) => {
	if (ctx.request.body.isAll) {
		var updateSql="UPDATE shoppingcart SET selected = '"+ctx.request.body.selected+"'"
		var searchSql = (thesql) => {
			return new Promise((resolve, reject) => {
				connection.query(thesql, function(err, result) {
					if(err){
						reject(1)
						console.log(err+'err')
					}
					resolve(0)
				})
			})
		}
		var data={}
		var res= await searchSql(updateSql)
		if(res==0){
			data.msg="更新成功"
			data.code=0
			ctx.body=data
		}else{
			data.code=1
			data.msg="更新失败,请稍后再试！"
			ctx.body=data
		}
	}else{
		var updateSql="UPDATE shoppingcart SET count = '"+ctx.request.body.count+ "' where id = '" +ctx.request.body.id + "'"
		var updateSql2="UPDATE shoppingcart SET selected = '"+ctx.request.body.selected+ "' where id = '" +ctx.request.body.id + "'"
		var searchSql = (thesql) => {
			return new Promise((resolve, reject) => {
				connection.query(thesql, function(err, result) {
					if(err){
						reject(1)
						console.log(err+'err')
					}
					resolve(0)
				})
			})
		}
		var data={}
		var res= await searchSql(updateSql)
		var res2= await searchSql(updateSql2)

		if(res==0||res2==0){
			data.msg="更新成功"
			data.code=0
			ctx.body=data
		}else{
			data.code=1
			data.msg="更新失败,请稍后再试！"
			ctx.body=data
		}
	}
	
	
});
//删除数据
router.post('/remove', async (ctx, next) => {
	var deleteSql="DELETE FROM shoppingcart WHERE "+"id='"+ctx.request.body.id + "'"
	var searchSql = (thesql) => {
		return new Promise((resolve, reject) => {
			connection.query(thesql, function(err, result) {
				if(err){
					reject(1)
					console.log(err+'err')
				}
				resolve(0)
			})
		})
	}
	var data={}
	var res= await searchSql(deleteSql)
	
	if(res==0){
		data.msg="删除成功"
		data.code=0
		ctx.body=data
	}else{
		data.code=1
		data.msg="删除失败,请稍后再试！"
		ctx.body=data
	}
});




router.get('/', (ctx, next) => {
	ctx.body = '服务器启动成功！'
})
// 主页数据
let indexData =  require('./datas/indexData.json');
router.get('/getIndexData', (ctx, next) => {
	ctx.body = {
		code: 0,
		data: indexData
	};
});
// 热门景点数据
let pageHotData =  require('./datas/page_hot.json');
router.get('/getPageHotData', (ctx, next) => {
	ctx.body = {
		code: 0,
		data: pageHotData
	};
});
// 热门景点数据
let scenery =  require('./datas/scenery.json');
router.get('/getScenetyData', (ctx, next) => {
	ctx.body = {
		code: 0,
		data: scenery
	};
});
// 旅游安全数据
let getSencureData =  require('./datas/secureData.json');
router.get('/getSencureData', (ctx, next) => {
	ctx.body = {
		code: 0,
		data: getSencureData
	};
});
// 获取main数据
let getMainData =  require('./datas/mainData.json');
router.get('/getMainData', (ctx, next) => {
	ctx.body = {
		code: 0,
		data: getMainData
	};
});

// 获取news数据
let getNewsData =  require('./datas/newsData.json');
router.get('/getNewsData', (ctx, next) => {
	ctx.body = {
		code: 0,
		data: getNewsData
	};
});

// 获取me数据
let getMeData =  require('./datas/meData.json');
router.get('/getMeData', (ctx, next) => {
	ctx.body = {
		code: 0,
		data: getMeData
	};
});

// 获取buysData数据
let getBuysData =  require('./datas/buysData.json');
router.get('/getBuysData', (ctx, next) => {
	ctx.body = {
		code: 0,
		data: getBuysData
	};
});

//获取购物车数据
let getShoppingData =  require('./datas/shoppingCart.json');
const { log } = require('console')
router.get('/getShoppingData', (ctx, next) => {
	ctx.body = {
		code: 0,
		data: getShoppingData
	};
});


// 装载所有子路由
app.use(router.routes()).use(router.allowedMethods())
	
app.listen('5210', () => {
	console.log('服务器启动');
	console.log('服务器地址： http://localhost:5210')
})
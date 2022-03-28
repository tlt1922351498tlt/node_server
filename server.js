let Koa = require('koa')
const bodyParser = require('koa-bodyparser')
let KoaRouter = require('koa-router')
const fs = require('fs')
const path = require('path')

const app = new Koa()
const router = new KoaRouter()
app.use(bodyParser())

// // 增删改查接口

//新增和修改
router.post('/add-shoppingCart', async (ctx) => {
	// console.log(ctx.request.body);
	if (ctx.request.body.id) {
		let id = ctx.request.body.id
		let params = ctx.request.body
		let writeJson = () => {
			return new Promise((resolve,reject)=>{
					fs.readFile(path.join(__dirname, '/datas/shoppingCart.json'),function(err,data){
							if(err){
							// 报错返回
									resolve({code: -1, msg: '新增失败' + err})
									return console.error(err);
							}
							let jsonData = data.toString()
							jsonData = JSON.parse(jsonData)

							let itemIndex = jsonData.findIndex(item=>item.id === id)
							if (itemIndex>=0) {
								// jsonData.splice(jsonData.findIndex(item => item.id === id), 1, params)
								//已经有的数量+1
								jsonData[itemIndex].count+=1
							} else {
								//没有就新增
								params.count = 1
								params.selected = true
								jsonData.push(params)
							}
							let str = JSON.stringify(jsonData)
							fs.writeFile(path.join(__dirname, '/datas/shoppingCart.json'),str,function(err){
									if(err){
											resolve({code: -1, msg: '新增失败！' + err})
									}
									resolve({code: 0, msg: '新增成功！'})
							})
					})
			})
		}
		// 返回给前端
		ctx.body = await writeJson()
	}else{
		console.log(ctx.request.body.type)
		let params = ctx.request.body
		let writeJson = () => {
			return new Promise((resolve,reject)=>{
					fs.readFile(path.join(__dirname, '/datas/shoppingCart.json'),function(err,data){
							if(err){
							// 报错返回
									resolve({code: -1, msg: '新增失败' + err})
									return console.error(err);
							}
							let jsonData = data.toString()
							jsonData = JSON.parse(jsonData)

							if (params.type) {
								jsonData[params.index].count+=1
							}else {
								jsonData[params.index].count>1 ? jsonData[params.index].count-=1 : jsonData.splice(params.index,1)
							}
							let str = JSON.stringify(jsonData)
							fs.writeFile(path.join(__dirname, '/datas/shoppingCart.json'),str,function(err){
									if(err){
											resolve({code: -1, msg: '新增失败！' + err})
									}
									resolve({code: 0, msg: '新增成功！'})
							})
					})
			})
		}
		// 返回给前端
		ctx.body = await writeJson()
	}
	
	
})
//选择
router.post('/select-shoppingCart', async (ctx) => {
		let params = ctx.request.body
		let selectJson = () => {
			return new Promise((resolve,reject)=>{
					fs.readFile(path.join(__dirname, '/datas/shoppingCart.json'),function(err,data){
							if(err){
							// 报错返回
									resolve({code: -1, msg: '新增失败' + err})
									return console.error(err);
							}
							let jsonData = data.toString()
							jsonData = JSON.parse(jsonData)

							jsonData[params.index].selected = params.selected

							let str = JSON.stringify(jsonData)
							fs.writeFile(path.join(__dirname, '/datas/shoppingCart.json'),str,function(err){
									if(err){
											resolve({code: -1, msg: '失败！' + err})
									}
									resolve({code: 0, msg: '成功！'})
							})
					})
			})
		}
		// 返回给前端
		ctx.body = await selectJson()
	
})
//全选
router.post('/selectAll-shoppingCart', async (ctx) => {
			let allSelected = ctx.request.body.allSelected
			let selectAllJson = () => {
				return new Promise((resolve,reject)=>{
						fs.readFile(path.join(__dirname, '/datas/shoppingCart.json'),function(err,data){
								if(err){
								// 报错返回
										resolve({code: -1, msg: '新增失败' + err})
										return console.error(err);
								}
								let jsonData = data.toString()
								jsonData = JSON.parse(jsonData)
	
								jsonData.forEach(element => element.selected = allSelected)
	
								let str = JSON.stringify(jsonData)
								fs.writeFile(path.join(__dirname, '/datas/shoppingCart.json'),str,function(err){
										if(err){
												resolve({code: -1, msg: '失败！' + err})
										}
										resolve({code: 0, msg: '成功！'})
								})
						})
				})
			}
			// 返回给前端
			ctx.body = await selectAllJson()
	})


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
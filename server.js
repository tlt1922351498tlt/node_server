let Koa = require('koa');
let KoaRouter = require('koa-router');

const app = new Koa();
const router = new KoaRouter();

router.get('/', (ctx, next) => {
	ctx.body = '123'
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

// // 主页导航页面数据
// let indexCateList = require('./datas/indexCateList.json')
// router.get('/getindexCateList', async (ctx, next) => {
// 	// 生成的H5应用存在跨域问题，通过CORS设置跨域配置
// 	ctx.set('Access-Control-Allow-Origin', '*')
// 	await new Promise(resolve => setTimeout(() => resolve(),2000))
// 	ctx.body = indexCateList;
// });




// // 分类页面数据 
// let cateGoryData = require('./datas/categoryDatas.json');
// router.get('/getCateGoryData', async (ctx, next) => {
// 	ctx.body = {
// 		code: 0,
// 		data: cateGoryData
// 	};
// });




app
	.use(router.routes())
	.use(router.allowedMethods())
	
	
app.listen('3002', () => {
	console.log('服务器启动');
	console.log('服务器地址： http://localhost:3002')
})
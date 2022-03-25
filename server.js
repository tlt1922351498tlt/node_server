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



app
	.use(router.routes())
	.use(router.allowedMethods())
	
	
app.listen('5210', () => {
	console.log('服务器启动');
	console.log('服务器地址： http://localhost:5210')
})
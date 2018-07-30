<style lang="less">
	@import "./home.less";
	@import "../../styles/common.less";
</style>
<template>
	<div class="home-main">
		<Row>
			<Card>
				<Row type="flex" class="user-infor">
					<Col span="16" style="padding-left:6px;">
					<Row class-name="made-child-con-middle" type="flex" align="middle">
						<div>
							<b class="card-user-infor-name">欢迎回来，{{user}}</b>
							<p>{{role}}</p>
						</div>
					</Row>
					</Col>
					<Col span="8">
					<Row class-name="made-child-con-middle" type="flex" align="middle">
						<b class="card-user-infor-name">{{sysDate}}</b>
					</Row>
					</Col>
				</Row>
			</Card>
		</Row>
		<Row class="margin-top-10">
			<Card>
				<p slot="title" class="card-title">
					<Icon type="map"></Icon>
					系统公告
				</p>
				<map-data-table :cityData="cityData"></map-data-table>
			</Card>
		</Row>
		<Row class="margin-top-10">
			<Card>
				<p slot="title" class="card-title">
					<Icon type="ios-pricetags-outline"></Icon>
					业务标签量
				</p>
				<!-- <div class="line-chart-con"> -->
				<!-- <service-requests></service-requests> -->
				<!-- </div> -->
				<Row type="flex" class="user-infor">
					<Col span="6" style="padding-left:6px;text-align: center;">
					<p>内容标签</p>
					<p>123个</p>
					</Col>
					<Col span="6" style="padding-left:6px;text-align: center;">
					<p>APP偏好标签</p>
					<p>13个</p>
					</Col>
					<Col span="6" style="padding-left:6px;text-align: center;">
					<p>兴趣偏好</p>
					<p>53个</p>
					</Col>
					<Col span="6" style="padding-left:6px;text-align: center;">
					<p>系统更新时间</p>
					<p>2018.6.6</p>
					</Col>
				</Row>
			</Card>
		</Row>
	</div>
</template>

<script>
	import cityData from './map-data/get-city-value.js';
	import serviceRequests from './components/serviceRequests.vue';
	import mapDataTable from './components/mapDataTable.vue';
	import Cookies from 'js-cookie';

	export default {
		name: 'home',
		components: {
			serviceRequests,
			mapDataTable,
		},
		data() {
			return {
				user: Cookies.get('user'),
				role: Cookies.get('access') == 1 ? '后台管理员' : Cookies.get('access') == 2 ? '运维人员' : '客服人员',
				sysDate: this.date(),
				cityData: cityData,
				showAddNewTodo: false,
				newToDoItemValue: ''
			};
		},
		computed: {
			avatorPath() {
				return localStorage.avatorImgPath;
			}
		},
		methods: {
			date() {
				var date = new Date();
				var Y = date.getFullYear() + '年';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
				var D = date.getDate() + '日';
				var W = date.getDay();
				var Week = ['日', '一', '二', '三', '四', '五', '六'];
				var result = Y + M + D + '     ' + '星期' + Week[W]
				return result
			}
		}
	};
</script>
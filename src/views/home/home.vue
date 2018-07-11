<style lang="less">
	@import "./home.less";
	@import "../../styles/common.less";
</style>
<template>
	<div class="home-main">
		<Row>
			<Card>
				<Row type="flex" class="user-infor">
					<Col span="8">
					<Row class-name="made-child-con-middle" type="flex" align="middle">
						<img class="avator-img" :src="avatorPath" />
					</Row>
					</Col>
					<Col span="16" style="padding-left:6px;">
					<Row class-name="made-child-con-middle" type="flex" align="middle">
						<div>
							<b class="card-user-infor-name">Admin</b>
							<p>super admin</p>
						</div>
					</Row>
					</Col>
				</Row>
				<div class="line-gray"></div>
				<Row class="margin-top-8">
					<Col span="8">
					<p class="notwrap">上次登录时间:</p>
					</Col>
					<Col span="16" class="padding-left-8">2017.09.12-13:32:20</Col>
				</Row>
				<Row class="margin-top-8">
					<Col span="8">
					<p class="notwrap">上次登录地点:</p>
					</Col>
					<Col span="16" class="padding-left-8">北京</Col>
				</Row>
			</Card>
		</Row>
		<Row class="margin-top-10">
			<Card>
				<p slot="title" class="card-title">
					<Icon type="map"></Icon>
					今日服务调用地理分布
				</p>
				<div class="map-con">
					<Col span="24">
					<map-data-table :cityData="cityData" height="281" :style-obj="{margin: '12px 0 0 11px'}"></map-data-table>
					</Col>
				</div>
			</Card>
		</Row>
		<Row class="margin-top-10">
			<Card>
				<p slot="title" class="card-title">
					<Icon type="ios-shuffle-strong"></Icon>
					上周每日服务调用量(万)
				</p>
				<div class="line-chart-con">
					<service-requests></service-requests>
				</div>
			</Card>
		</Row>
	</div>
</template>

<script>
	import cityData from './map-data/get-city-value.js';
	import serviceRequests from './components/serviceRequests.vue';
	import mapDataTable from './components/mapDataTable.vue';

	export default {
		name: 'home',
		components: {
			serviceRequests,
			mapDataTable,
		},
		data() {
			return {
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

		}
	};
</script>
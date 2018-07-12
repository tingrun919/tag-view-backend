<style lang="less" scoped>
	@import '../../styles/common.less';
	@import './user-query.less';
</style>
<template>
	<div>
		<Row>
			<Col>
			<Card>
				<span>手机号码查询</span>
				<Input v-model="phone" placeholder="请输入标题名称" clearable style="width: 200px"></Input>
				<span class="margin-left-10">选择账期</span>
				<DatePicker type="month" placeholder="请选择账期" style="width: 200px"></DatePicker>
				<Button class="margin-left-10" type="primary" icon="search">查询</Button>
			</Card>
			</Col>
		</Row>
		<Row class="margin-top-10">
			<Col>
			<Card>
				<p slot="title">
					<Icon type="at"></Icon>
					本期互联网内容偏好
				</p>
				<Carousel v-model="internet" :dots="dots" :arrow="arrow" loop>
					<CarouselItem v-for="m in 3" :key="m">
						<Row :gutter="5" type="flex" justify="space-around">
							<Col span="3" v-for="n in 8" :key="n">
							<Card>
								<p slot="title" style="text-align: center;font-size: 16px;">新闻资讯{{m}}</p>
								<div style="text-align: center;">
									<p style="font-weight: bold;">时长：10.{{n}}H</p>
									<div class="custom-tag margin-top-10" v-bind:style="[{backgroundColor:'#2d8cf0'}]">
										<span>
											家具家装
										</span>
									</div>
									<div class="custom-tag margin-top-10" v-bind:style="[{backgroundColor:'#19be6b'}]">
										<span>
											网上购物
										</span>
									</div>
									<p class="margin-top-10 custom-p" @click="modal1 = true">查看全部></p>
								</div>
							</Card>
							</Col>
						</Row>
					</CarouselItem>
				</Carousel>
			</Card>
			</Col>
		</Row>
		<Row class="margin-top-10">
			<Col>
			<Card>
				<p slot="title">
					<Icon type="ipad"></Icon>
					本期APP偏好
				</p>
				<Carousel v-model="app" :dots="dots" :arrow="arrow" loop>
					<CarouselItem v-for="m in 3" :key="m">
						<Row :gutter="5" type="flex" justify="space-around">
							<Col span="3" v-for="n in 8" :key="n">
							<Card>
								<p slot="title" style="text-align: center;font-size: 16px;">新闻资讯{{m}}</p>
								<div style="text-align: center;">
									<p style="font-weight: bold;">时长：10.{{n}}H</p>
									<p style="font-weight: bold;">活跃天数：23天</p>
									<p style="font-weight: bold;">消耗流量：60M</p>
									<p style="font-weight: bold;">访问次数：32415次</p>
									<p class="margin-top-10 custom-p" @click="modal1 = true">查看全部></p>
								</div>
							</Card>
							</Col>
						</Row>
					</CarouselItem>
				</Carousel>
			</Card>
			</Col>
		</Row>
		<Row class="margin-top-10">
			<Col>
			<Card>
				<p slot="title">
					<Icon type="pricetag"></Icon>
					本期兴趣偏好
				</p>
				<Carousel v-model="interest" :dots="dots" :arrow="arrow" loop>
					<CarouselItem v-for="m in 3" :key="m">
						<Row :gutter="5" type="flex" justify="space-around">
							<Col span="3" v-for="n in 8" :key="n">
							<Card>
								<p slot="title" style="text-align: center;font-size: 16px;">新闻资讯{{m}}</p>
								<div style="text-align: center;">
									<p style="font-weight: bold;">评分等级：A</p>
									<div class="custom-tag margin-top-10" v-bind:style="[{backgroundColor:'#2d8cf0'}]">
										<span>
											家具家装
										</span>
									</div>
									<div class="custom-tag margin-top-10" v-bind:style="[{backgroundColor:'#19be6b'}]">
										<span>
											网上购物
										</span>
									</div>
									<p class="margin-top-10 custom-p" @click="modal1 = true">查看全部></p>
								</div>
							</Card>
							</Col>
						</Row>
					</CarouselItem>
				</Carousel>
			</Card>
			</Col>
		</Row>
		<Modal v-model="modal1" @on-ok="ok" @on-cancel="cancel" width="80%">
			<p slot="header" style="color:#2d8cf0;font-size: 30px;height: auto;">
				<Icon type="information-circled"></Icon>
				<span>购物</span>
				<span style="color:red;font-size: 13px;">访问次数：231次</span>
			</p>
			<Table stripe border :columns="columns1" :data="data1"></Table>
			<div slot="footer">
			</div>
		</Modal>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				phone: '',
				dots: 'none',
				arrow: 'always',
				internet: 0,
				app: 0,
				interest: 0,
				modal1: false,
				columns1: [
					{
						title: '二级标签',
						key: 'name',
						align: 'center',
						render: (h, params) => {
							const row = params.row;
							// const color = row.status === 1 ? 'blue' : row.status === 2 ? 'green' : 'red';
							// const text = row.status === 1 ? 'Working' : row.status === 2 ? 'Success' : 'Fail';
							const color = 'blue';
							return h('Tag', {
								props: {
									color: color
								}
							}, row.name);
						}
					},
					{
						title: '访问次数',
						key: 'age',
						align: 'center',
					},
					{
						title: '时长',
						key: 'address',
						align: 'center',
					},
					{
						title: '消耗流量',
						key: 'name1',
						align: 'center',
					},
					{
						title: '月活跃度',
						key: 'age1',
						align: 'center',
					},
					{
						title: '月活标签',
						key: 'address1',
						align: 'center',
					}
				],
				data1: [
					{
						name: '家具家装',
						age: 18,
						address: '10H',
						name1: '201M',
						age1: '46%',
						address1: '宜家、吊灯、窗帘',
					},
					{
						name: '网上购物',
						age: 42,
						address: '6.4H',
						name1: '51M',
						age1: '36%',
						address1: '男装、女装',
					},
				]
			}
		}
	}
</script>
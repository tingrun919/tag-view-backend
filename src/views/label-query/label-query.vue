<style lang="less" scoped>
	@import '../../styles/common.less';
	@import './label-query.less';
</style>
<template>
	<div>
		<Row>
			<Col>
			<Card>
				<span>标签表选择</span>
				<Select clearable v-model="model1" style="width:200px">
						<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				<span class="margin-left-10">编码</span>
				<Input v-model="phone" placeholder="请输入编码" clearable style="width: 200px"></Input>
				<span class="margin-left-10">标签名称</span>
				<Input v-model="phone" placeholder="请输入标签名称" clearable style="width: 200px"></Input>
				<Button class="margin-left-10" type="primary" icon="search">查询</Button>
			</Card>
			</Col>
		</Row>
		<Row class="margin-top-10">
			<Col>
			<Card>
				<p slot="title">
					<Icon type="pricetag"></Icon>
					标签详情
				</p>
				<span class="margin-right-5 margin-left-10">标签名称</span>
				<Input v-model="phone" disabled clearable style="width: 200px"></Input>
				<span class="margin-right-5 margin-left-10">标签编码</span>
				<Input v-model="phone" disabled clearable style="width: 200px"></Input>
				<span class="margin-right-5 margin-left-10">标签创建时间</span>
				<Input v-model="phone" disabled clearable style="width: 200px"></Input>

			</Card>
			</Col>
		</Row>
		<Row class="margin-top-10">
			<Col>
			<Card>
				<p slot="title">
					<Icon type="funnel"></Icon>
					标签口径
				</p>
				<span>用户访问了比较综合的新闻资讯类的网站、APP，例如：腾讯新闻、新浪新闻等</span>
			</Card>
			</Col>
		</Row>
		<Card>
			<p slot="title">
				<Icon type="bookmark"></Icon>
				子标签
			</p>
			<Row :gutter="10" class="margin-top-10" v-for="s in 4">
				<Col span="4" v-for="n in 6">
				<Button style="height: 70px;" type="primary" long>时政要闻</Button>
				</Col>
			</Row>
		</Card>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				cityList: [
					{
						value: 'New York',
						label: '内容标签'
					},
					{
						value: 'London',
						label: 'APP偏好标签'
					},
					{
						value: 'Sydney',
						label: '兴趣标签'
					},
				],
				model1: '',
				phone: '',
			}
		}
	}
</script>
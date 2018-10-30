<template>
	<div>
		<Row>
			<Col>
			<Card>
				<span>公告名称</span>
				<Input v-model="params.noticeName" clearable placeholder="请输入公告名称" clearable style="width: 200px"></Input>
				<Button @click="getDataList" class="margin-left-10" type="primary" icon="search">查询</Button>
			</Card>
			</Col>
		</Row>
		<Row>
			<Card>
				<Table :loading="loading" stripe border :columns="columns" :data="resultData"></Table>
				<div style="margin: 10px;overflow: hidden">
					<div style="float: right;">
						<Page :total="pageTotal" :current="params.page" @on-change="changePage"></Page>
					</div>
				</div>
			</Card>
		</Row>
	</div>
</template>
<script>
	import bulletin from '../../../service/bulletinService.js';
	export default {
		mixins: [bulletin],
		data() {
			return {
				params: {
					noticeState:1,
					noticeName: '',
					page: 1,
					pagesize: 10
				},
				bulletin: {
					noticeName: '',
					noticeState: '',
					noticeContent: '',
				},
				isState: [
					{
						value: 1,
						label: '发布'
					},
					{
						value: 0,
						label: '不发布'
					},
				],
				resultData: [],
				pageTotal: null,
				loading: false,
				columns: [
					{
						title: '序号',
						key: 'noticeId',
						align: 'center',
						render: (h, params) => {
							return h('span', `${params.index + (this.params.page - 1) * this.params.pagesize + 1}`);
						}
					},
					{
						title: '公告名称',
						key: 'noticeName',
						align: 'center',
					},
					{
						title: '发布时间',
						key: 'noticeCreatetime',
						align: 'center',
						sortable: true,
					},
					{
						title: '浏览次数',
						key: 'noticeBeizhu',
						align: 'center',
					},
					{
						title: '发布状态',
						key: 'noticeState',
						align: 'center',
						render: (h, params) => {
							const row = params.row;
							const type = row.noticeState == 0 ? 'error' : 'primary';
							const text = row.noticeState == 0 ? '未发布' : '发布'
							return h('Button', {
								props: {
									type: type,
									size: 'small'
								},
							}, text);
						},
					},
					{
						title: '操作',
						key: 'action',
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									style: {
										marginRight: '5px'
									},
									props: {
										size: 'small',
										type: 'success',
									},
									on: {
										click: () => {
											this.checkDetail(params.row.noticeId)
										}
									}
								}, '查看')
							]);
						}
					}
				],
			}
		},
		beforeMount() {
			this.loading = true;
			this.getDataList()
		},
		methods: {
			getDataList() {
				this.fetchList(this.params).then(res => {
					this.resultData = res.list
					this.pageTotal = Number(res.total)
					this.loading = false
				})
			},
			changePage(pageNum) {
				this.loading = true
				this.params.page = pageNum
				this.getDataList()
			},
			checkDetail(id){
				this.$router.push(`/home/bulletinList/${id}?type=new`)
			}
		}
	}
</script>
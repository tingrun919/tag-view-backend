<template>
	<div>
		<Table :loading="loading" stripe border :height="height" :columns="columns" :data="resultData"></Table>
		<div style="margin: 10px;overflow: hidden">
			<div style="float: right;">
				<Page :total="pageTotal" :current="params.page" @on-change="changePage"></Page>
			</div>
		</div>
	</div>
</template>

<script>
	import bulletin from '../../../service/bulletinService.js';
	export default {
		mixins: [bulletin],
		name: 'mapDataTable',
		data() {
			return {
				params: {
					noticeState:1,
					page: 1,
					pagesize: 10
				},
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
					},
					{
						title: '浏览次数',
						key: 'noticeBeizhu',
						align: 'center',
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
				resultData: [],
			};
		},
		props: {
			styleObj: Object,
			height: String
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
			checkDetail(id) {
                this.$router.push(`/home/bulletinList/${id}?type=new`)
			}
		}
	};
</script>
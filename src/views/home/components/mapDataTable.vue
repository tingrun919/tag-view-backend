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
						title: 'ID',
						key: 'noticeId',
						align: 'center',
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
						key: 'noticeCount',
						align: 'center',
					},
					{
						title: '公告详情',
						key: 'noticeContent',
						align: 'center',
						ellipsis: 'true',
					},
					{
						title: '发布状态',
						key: 'noticeState',
						align: 'center',
						sortable: true,
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
											this.checkDetail(params.row.noticeContent)
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
			checkDetail(detail) {
                this.$Modal.info({
					title: '公告详情',
					width:600,
					closable:true,
                    content: '<p>'+detail+'</p>',
                    okText: '确定',
                    cancelText: '取消'
                });
			}
		}
	};
</script>
<template>
	<div>
		<Row>
			<Col>
			<Card>
				<span>公告名称</span>
				<Input v-model="params.noticeName" clearable placeholder="请输入公告名称" clearable style="width: 200px"></Input>
				<Button @click="getDataList" class="margin-left-10" type="primary" icon="search">查询</Button>
				<Button @click="addUserModalAction" class="margin-left-10" type="success" icon="plus">新增</Button>
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
		<Modal title="用户信息" width='30%' v-model="addBulletinModal">
			<Form ref="formValidate" :model="bulletin" :rules="ruleValidate" :label-width="80">
				<FormItem label="公告名称" prop="noticeName">
					<Input v-model="bulletin.noticeName" placeholder="请输入公告名称"></Input>
				</FormItem>
				<FormItem label="公告内容" prop="noticeContent">
					<Input v-model="bulletin.noticeContent" placeholder="请输入公告内容"></Input>
				</FormItem>
				<FormItem label="是否发布" prop="noticeState">
					<Select v-model="bulletin.noticeState" clearable placeholder="请选择是否发布">
							<Option v-for="item in isState" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
				</FormItem>
				<FormItem>
					<Button type="primary" @click="handleAddBulletin('formValidate')">保存</Button>
					<Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
				</FormItem>
			</Form>
			<div slot="footer">
			</div>
		</Modal>
	</div>
</template>
<script>
	import bulletin from '../../service/bulletinService.js';
	export default {
		mixins: [bulletin],
		data() {
			return {
				params: {
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
				ruleValidate: {
					noticeName: [
						{ required: true, message: '请填写公告名称', trigger: 'blur' }
					],
					noticeContent: [
						{ required: true, message: '请填写公告内容', trigger: 'blur' }
					],
					noticeState: [
						{ required: true, message: '请选择是否发布' }
					],
				},
				addBulletinModal: false,
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
								on: {
									click: () => {
										this.updateState(params.row.noticeState == 0 ? 1 : 0, params.row.noticeId)
									}
								}
							}, text);
						},
					},
					{
						title: '操作',
						key: 'action',
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Poptip', {
									props: {
										confirm: true,
										title: '您确定要删除这条数据吗?',
										transfer: true
									},
									on: {
										'on-ok': () => {
											this.handleRemove(params.row.noticeId)
										}
									}
								}, [
										h('Button', {
											style: {
												marginRight: '5px'
											},
											props: {
												size: 'small',
												type: 'error',
												placement: 'top'
											}
										}, '删除')
									]),
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
								}, '编辑')
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
			handleReset(name) {
				this.$refs[name].resetFields();
			},
			// 新增公告
			addUserModalAction() {
				// 跳转页面
				this.$router.push(`../home/bulletinList/add?type=add`)
			},
			handleAddBulletin(name) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						this.$Message.success('验证成功!');
						this.addBulletinAction(this.bulletin).then(res => {
							this.addBulletinModal = false
							this.getDataList(this.params)
							this.handleReset('formValidate')
						})
					} else {
						this.$Message.error('表单验证失败!');
					}
				})
			},
			handleRemove(id) {
				this.handleDeleteBulletin(id).then(() => {
					this.getDataList()
				})
			},
			updateState(state, id) {
				var param = {
					noticeId: id,
					noticeState:state
				}
				this.updateStateAction(param).then(res => {
					this.getDataList(this.params)
				})
			},
			checkDetail(id){
				this.$router.push(`/home/bulletinList/${id}?type=edit`)
			}
		}
	}
</script>
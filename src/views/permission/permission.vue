<template>
	<div>
		<Row>
			<Card>
				<Table stripe border :columns="columns" :data="resultData"></Table>
			</Card>
		</Row>
		<Modal title="用户信息" width='30%' v-model="addBulletinModal">
			<CheckboxGroup v-model="social" size="large">
				<Checkbox label="1">
					<span>单用户查询</span>
				</Checkbox>
				<Checkbox label="2">
					<span>标签口径查询</span>
				</Checkbox>
				<Checkbox label="3">
					<span>用户管理</span>
				</Checkbox>
				<Checkbox label="4">
					<span>公告设置</span>
				</Checkbox>
				<Checkbox label="5">
					<span>角色权限</span>
				</Checkbox>
			</CheckboxGroup>
		</Modal>
	</div>
</template>
<script>
	import permission from '../../service/permissineService.js';
	export default {
		mixins: [permission],
		data() {
			return {
				params: {
					noticeName: '',
					page: 1,
					pagesize: 10
				},
				social: [],
				addBulletinModal: false,
				resultData: [
					{
						name: '系统管理员',
						id: 1,
					},
					{
						name: '运维人员',
						id: 2,
					},
					{
						name: '客服人员',
						id: 3,
					},
				],
				result: [],
				columns: [
					{
						title: '角色名称',
						key: 'name',
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
										type: 'warning',
									},
									on: {
										click: () => {
											this.addUserModalAction(params.row.id)
										}
									}
								}, '修改权限')
							]);
						}
					}
				],
			}
		},
		methods: {
			addUserModalAction(id) {
				this.social=[],
				this.addBulletinModal = true;
				this.handlePermissine(id).then(res => {
					this.result = res[0].perm_id
					for (let i = 0; i < this.result.length; i++) {
						this.social.push(this.result[i])
					}
				})
			},
		}
	}
</script>
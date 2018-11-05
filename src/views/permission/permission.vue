<template>
	<div>
		<Row>
			<Col>
				<Card>
					<span>角色名称</span>
					<Input v-model="role" placeholder="请输入角色名称" clearable style="width: 200px;margin-right: 10px"/>
					<Button class="margin-left-10" type="primary" icon="search" @click="search" style="margin-right: 10px">查询</Button>
					<Button class="margin-left-10" type="success" icon="plus" @click="isAdd = true" style="margin-right: 10px">新增</Button>
				</Card>
			</Col>
		</Row>
		<Row>
			<Card>
				<Table stripe border :columns="columns" :data="resultData"></Table>
			</Card>
		</Row>
		<Modal title="用户信息" width='30%' v-model="addBulletinModal" @on-ok="ok"
			   @on-cancel="addBulletinModal = false">
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
		<Modal title="用户信息" width='30%' v-model="isAdd">
			<Form ref="formValidate" :model="user" :rules="ruleValidate" :label-width="80">
				<FormItem label="角色名称" prop="name">
					<Input v-model="user.name" placeholder="请输入角色名称"></Input>
				</FormItem>
				<FormItem label="角色状态" prop="status">
					<RadioGroup  v-model="user.status" size="large">
						<Radio label="0">
							<span>禁用</span>
						</Radio>
						<Radio label="1">
							<span>有效</span>
						</Radio>
					</RadioGroup >
				</FormItem>
				<FormItem label="角色描述" prop="dec">
					<Input v-model="user.dec" placeholder="请输入角色描述"></Input>
				</FormItem>
				<FormItem style="text-align: center;margin-left: -80px">
					<Button type="primary" @click="addOk('formValidate')">保存</Button>
					<Button type="ghost" @click="addCancal('formValidate')" style="margin-left: 8px">取消</Button>
				</FormItem>
			</Form>
			<div slot="footer">
			</div>
		</Modal>
		<Modal title="编辑用户信息" width='30%' v-model="isEdit">
			<Form ref="editForm" :model="editContent" :rules="ruleValidate" :label-width="80">
				<FormItem label="角色名称" prop="roleName">
					<Input v-model="editContent.roleName" placeholder="请输入角色名称"></Input>
				</FormItem>
				<FormItem label="角色状态" prop="state">
					<RadioGroup v-model="editContent.state" size="large">
						<Radio label="0">
							<span>禁用</span>
						</Radio>
						<Radio label="1">
							<span>有效</span>
						</Radio>
					</RadioGroup>
				</FormItem>
				<FormItem label="角色描述" prop="roleDesc">
					<Input v-model="editContent.roleDesc" placeholder="请输入角色描述"></Input>
				</FormItem>
				<FormItem  style="text-align: center;margin-left: -80px">
					<Button type="primary" @click="editOk('editForm')">保存</Button>
					<Button type="ghost" @click="isEdit = false" style="margin-left: 8px">取消</Button>
				</FormItem>
			</Form>
			<div slot="footer">
			</div>
		</Modal>
	</div>
</template>
<script>
	import permission from '../../service/permissineService.js';
	import Cookies from 'js-cookie';

export default {
	    mixins: [permission],
	    data () {
	        return {
	            param: {
	                roleId: '',
	                roleState: '',
	                page: 1,
	                pagesize: 10
	            },
	            social: [],
            	role: '',
            	ruleValidate: {
                name: [
	                    { required: true, message: '请填写角色名称', trigger: 'blur' }
	                ],
	                status: [
	                    { required: true, message: '请选择角色状态', trigger: 'blur' }
	                ],
	                dec: [
	                    { required: true, message: '请填写角色描述', trigger: 'blur' }
	                ],
	                roleName: [
	                    { required: true, message: '请填写角色名称', trigger: 'blur' }
	                ],
	                state: [
	                    { required: true, message: '请选择角色状态', trigger: 'blur' }
	                ],
	                roleDesc: [
	                    { required: true, message: '请填写角色描述', trigger: 'blur' }
	                ]
	            },
            	user: {
                	name: '',
                	status: '0',
                	dec: ''
	            },
	            editContent: {
	                roleName: '',
	                state: 0,
                	roleDesc: ''
	            },
            	isAdd: false,
	            isEdit: false,
	            addBulletinModal: false,
	            resultData: [],
	            result: [],
	            columns: [
	                {
	                    title: '序号',
	                    key: 'index',
                    align: 'center',
                    width: 100,
	                    render: (h, params) => {
	                        return h('span', `${params.index + (this.param.page - 1) * this.param.pagesize + 1}`);
	                    }
	                },
	                {
	                    title: '角色名称',
	                    key: 'roleName',
	                    align: 'center'
	                },
	                {
	                    title: '角色状态',
	                    key: 'roleState',
	                    align: 'center',
	                    render: (h, params) => {
	                        return h('span', [ params.row.roleState == 1 ? '有效' : '禁用' ]);
	                    }
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
	                                    type: 'warning'
	                                },
	                                on: {
	                                    click: () => {
	                                        this.addUserModalAction(params.row.roleId);
	                                    }
	                                }
	                            }, '设置'),
                            h('Button', {
                                style: {
                                    marginRight: '5px'
                                },
                                props: {
                                    size: 'small',
                                    type: 'primary'
                                },
                                on: {
                                    click: () => {
                                        this.edit(params.row.roleId);
                                    }
                                }
                            }, '编辑')
	                        ]);
	                    }
	                }
	            ]
	        };
	    },
	    created () {
        this.query();
	    },
	    methods: {
	        query () {
            this.selRole(this.param)
                .then(res => {
                    this.resultData = res.list;
                });
	        },
	        addUserModalAction (id) {
	            this.addBulletinModal = true;
	            this.handlePermissine(id).then(res => {
	                this.result = res[0].perm_id;
	                this.result = this.result.split(',');
                for (let i = 0; i < this.result.length; i++) {
                    this.social.push(this.result[i]);
                }
	            });
	        },
	        ok () {
	            const arr = this.social.join(',');
            	const param = {
                	staffRoleid: Cookies.get('access'),
                	desc: arr
            	};
	            this.updatePerm(param);
	        },
	        search () {
	            this.param = Object.assign({}, this.param, {
                roleId: this.role
	            });
	            this.query();
	        },
	        addOk (name) {
	            this.$refs[name].validate((valid) => {
	                if (valid) {
	                    const param = {
	                        roleName: this.user.name,
	                        roleState: this.user.status,
	                        roleDesc: this.user.dec
	                    };
	                    this.addRol(param)
	                        .then(res => {
                            this.isAdd = false;
	                            this.query();
                            this.$refs[name].resetFields();
	                        });
	                }
	            });
	        },
        	addCancal (name) {
            	this.isAdd = false;
            	this.$refs[name].resetFields();
	        },
	        edit (id) {
	            this.param = Object.assign({}, this.param, {
	                roleId: id
	            });
	            this.selRole(this.param)
	                .then(res => {
	                    this.isEdit = true;
	                    this.editContent.roleName = res.list[0].roleName;
	                    this.editContent.state = res.list[0].roleState.toString();
	                    this.editContent.roleDesc = res.list[0].roleDesc;
	                });
	        },
	        editOk (name) {
	            this.isAdd = false;
	            this.$refs[name].validate((valid) => {
	                if (valid) {
	                    const param = {
	                        roleId: this.param.roleId,
	                        roleName: this.editContent.roleName,
	                        roleState: this.editContent.state,
	                        roleDesc: this.editContent.roleDesc
	                    };
	                    this.upRole(param)
	                        .then(res => {
	                            this.isEdit = false;
	                            this.param.roleId = '';
	                            this.query();
	                        });
	                } else {
	                    this.$Message.error('表单验证失败!');
	                }
	            });
	        }
	    }

};
</script>

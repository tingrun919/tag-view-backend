<style lang="less" scoped>
	@import '../../styles/common.less';
</style>
<template>
	<div>
		<Row>
			<Col>
			<Card>
				<span>人员名称</span>
				<Input v-model="params.staffName" placeholder="请输入人员名称" clearable style="width: 200px"></Input>
				<span class="margin-left-10">人员账号</span>
				<Input v-model="params.staffLoginname" placeholder="请输入人员账号" clearable style="width: 200px"></Input>
				<span class="margin-left-10">人员角色</span>
				<Select v-model="params.staffRoleid" clearable style="width:200px">
					<Option v-for="item in userRole" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
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
		<Modal title="用户信息" width='30%' v-model="addUserModal">
			<Form ref="formValidate" :model="user" :rules="ruleValidate" :label-width="80">
				<FormItem label="人员名称" prop="staffName">
					<Input v-model="user.staffName" placeholder="请输入人员名称"></Input>
				</FormItem>
				<FormItem label="登陆账号" prop="staffLoginname">
					<Input v-model="user.staffLoginname" placeholder="请输入登陆账号"></Input>
				</FormItem>
				<FormItem label="登陆密码" prop="staffPassword">
					<Input type="password" v-model="user.staffPassword" placeholder="请输入密码"></Input>
				</FormItem>
				<FormItem label="确认密码" prop="checkPassword">
					<Input type="password" v-model="user.checkPassword" placeholder="请输入密码"></Input>
				</FormItem>
				<FormItem label="用户角色" prop="staffRoleid">
					<Select v-model="user.staffRoleid" clearable placeholder="请选择用户角色">
						<Option v-for="item in userRole" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</FormItem>
				<FormItem>
					<Button type="primary" @click="handleAddUser('formValidate')">保存</Button>
					<Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
				</FormItem>
			</Form>
			<div slot="footer">
			</div>
		</Modal>
	</div>
</template>
<script>
	import userService from '../../service/userService.js';
	export default {
	    mixins: [userService],
	    data () {
	        const validatePass = (rule, value, callback) => {
	            if (value === '') {
	                callback(new Error('请输入登陆密码！'));
	            } else {
	                if (this.user.checkPassword !== '') {
	                    // 对第二个密码框单独验证
	                    this.$refs.formValidate.validateField('checkPassword');
	                }
	                callback();
	            }
	        };
	        const validatePassCheck = (rule, value, callback) => {
	            if (value === '') {
	                callback(new Error('请再次输入密码以确认！'));
	            } else if (value !== this.user.staffPassword) {
	                callback(new Error('两次输入的密码不一致！请重新输入！'));
	            } else {
	                callback();
	            }
	        };
	        return {
	            pageTotal: null, // 总条数
	            resultData: [], // 列表数据
	            loading: false, // 表格加载
	            addUserModal: false, // 新增弹窗的modal
	            isNew: false,
	            userRole: [
	                {
	                    value: 1,
	                    label: '系统管理员'
	                },
	                {
	                    value: 2,
	                    label: '运维人员'
	                },
	                {
	                    value: 3,
	                    label: '客服人员'
	                }
	            ],
	            params: {
	                staffName: '',
	                staffLoginname: '',
	                staffRoleid: '',
	                page: 1,
	                pagesize: 10
	            },
	            user: {
	                staffName: '',
	                staffLoginname: '',
	                staffPassword: '',
	                checkPassword: '',
	                staffRoleid: null
	            },
	            ruleValidate: {
	                staffName: [
	                    { required: true, message: '请填写人员名称', trigger: 'blur' }
	                ],
	                staffLoginname: [
	                    { required: true, message: '请填写登陆账号', trigger: 'blur' }
	                ],
	                staffPassword: [
	                    { required: true, validator: validatePass, trigger: 'blur' }
	                ],
	                checkPassword: [
	                    { required: true, validator: validatePassCheck, trigger: 'blur' }
	                ],
	                staffRoleid: [
	                    { required: true, message: '请选择用户角色' }
	                ]
	            },
	            columns: [
	                {
	                    title: '人员名称',
	                    key: 'staffName',
	                    align: 'center'
	                },
	                {
	                    title: '账号',
	                    key: 'staffLoginname',
	                    align: 'center'
	                },
	                {
	                    title: '所属角色',
	                    key: 'staffRoleid',
	                    align: 'center',
	                    render: (h, params) => {
	                        const row = params.row;
	                        const text = row.staffRoleid === 1 ? '系统管理员' : row.staffRoleid === 2 ? '运维人员' : '客服人员';
	                        return h('Button', {
	                            props: {
	                                type: 'text'
	                            },
	                            on: {
	                                click: () => {

	                                }
	                            }
	                        }, text);
	                    }
	                },
	                {
	                    title: '状态',
	                    key: 'staffState',
	                    align: 'center',
	                    sortable: true,
	                    render: (h, params) => {
	                        const row = params.row;
	                        const type = row.staffState == 0 ? 'error' : 'primary';
	                        const text = row.staffState == 0 ? '封禁' : '正常';
	                        return h('Button', {
	                            props: {
	                                type: type,
	                                size: 'small'
	                            },
	                            on: {
	                                click: () => {
	                                    this.updateState(params.row.staffState == 0 ? 1 : 0, params.row.staffId);
	                                }
	                            }
	                        }, text);
	                    }
	                },
	                {
	                    title: '操作',
	                    key: 'action',
	                    align: 'center',
	                    render: (h, params) => {
	                        return h('div', [
	                            h('Button', {
	                                props: {
	                                    type: 'primary',
	                                    size: 'small'
	                                },
	                                style: {
	                                    marginRight: '5px'
	                                },
	                                on: {
	                                    click: () => {
	                                        this.getOneUser(params.row.staffId);
	                                    }
	                                }
	                            }, '修改人员信息')
	                        ]);
	                    }
	                }
	            ]
	        };
	    },
	    beforeMount () {
	        this.loading = true;
	        this.getDataList();
	    },
	    methods: {
	        getDataList () {
	            this.fetchList(this.params).then(res => {
	                this.resultData = res.list;
	                this.pageTotal = Number(res.total);
	                this.loading = false;
	            });
	        },
	        getOneUser (id) {
	            this.isNew = false;
	            var param = {
	                staffId: id
	            };
	            this.getOneUserAction(param).then(res => {
	                this.user = res.list[0];
	                this.addUserModal = true;
	            });
	        },
	        addUserModalAction () {
	            this.isNew = true;
	            this.addUserModal = true;
	            this.handleReset('formValidate');
	        },
	        handleReset (name) {
	            this.$refs[name].resetFields();
	        },
	        changePage (pageNum) {
	            this.loading = true;
	            this.params.page = pageNum;
	            this.getDataList();
	        },
	        updateState (state, id) {
	            var param = {
	                staffId: id,
	                staffState: state
	            };
	            this.updateStateAction(param).then(res => {
	                this.getDataList(this.params);
	            });
	        },
	        handleAddUser (name) {
	            this.$refs[name].validate((valid) => {
	                if (valid) {
	                    this.$Message.success('验证成功!');
	                    if (this.isNew) {
	                        this.addUserAction(this.user).then(res => {
	                            this.addUserModal = false;
	                            this.getDataList(this.params);
	                            this.handleReset('formValidate');
	                        });
	                    } else {
	                        this.updateUserAction(this.user).then(res => {
	                            this.addUserModal = false;
	                            this.getDataList(this.params);
	                            this.handleReset('formValidate');
	                        });
	                    }
	                } else {
	                    this.$Message.error('表单验证失败!');
	                }
	            });
	        }
	    }
	};
</script>
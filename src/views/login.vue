<style lang="less">
	@import './login.less';
</style>

<template>
	<div class="login" @keydown.enter="handleSubmit">
		<div class="login-con">
			<Card :bordered="false">
				<p slot="title">
					<Icon type="log-in"></Icon>
					欢迎登录
				</p>
				<div class="form-con">
					<Form ref="loginForm" :model="form" :rules="rules">
						<FormItem prop="usercount">
							<Input v-model="form.usercount" placeholder="请输入用户名">
							<span slot="prepend">
								<Icon :size="16" type="person"></Icon>
							</span>
							</Input>
						</FormItem>
						<FormItem prop="password">
							<Input type="password" v-model="form.password" placeholder="请输入密码">
							<span slot="prepend">
								<Icon :size="14" type="locked"></Icon>
							</span>
							</Input>
						</FormItem>
						<FormItem>
							<Button :loading="loading" @click="handleSubmit" type="primary" long>登录</Button>
						</FormItem>
					</Form>
				</div>
			</Card>
		</div>
	</div>
</template>

<script>
	import Cookies from 'js-cookie';
	import loginService from '../service/loginService.js';
	export default {
		mixins: [loginService],
		data() {
			return {
				loading:false,
				form: {
					usercount: '',
					password: ''
				},
				rules: {
					usercount: [
						{ required: true, message: '账号不能为空', trigger: 'blur' }
					],
					password: [
						{ required: true, message: '密码不能为空', trigger: 'blur' }
					]
				}
			};
		},
		methods: {
			handleSubmit() {
				this.loading = true
				this.$refs.loginForm.validate((valid) => {
					if (valid) {
						this.loginAction(this.form).then(result => {
							this.loading = false
							if (result) {
								Cookies.set('user', this.form.usercount);
								Cookies.set('password', this.form.password);
								Cookies.set('role',result.staffDesc)
								this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
								//staffRoleid ·1:后台管理员 ·2:运维人员 ·3:客服人员
								if (result.staffRoleid === 1) {
									Cookies.set('access', 1);
								} else if (result.staffRoleid === 2) {
									Cookies.set('access', 2);
								} else {
									Cookies.set('access', 3);
								}
								this.$router.push({
									name: 'home_index'
								});
							}
						})
					}else{
						this.loading = false
					}
				});
			}
		}
	};
</script>

<style>
</style>
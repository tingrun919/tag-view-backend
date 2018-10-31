<style lang="less" scoped>
	@import '../../styles/common.less';
	@import './label-query.less';
</style>
<template>
	<div > 
		<Row>
			<Col>
				<Card>
					<span>标签表选择</span>
					<Select clearable v-model="model1" style="width:200px">
						<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
					<span class="margin-left-10">标签名称</span>
					<Dropdown trigger="custom" :visible="visible"  @on-click="dropChange">
						<Input v-model="phone" placeholder="请输入标签名称" clearable style="width: 200px" @on-blur="inputChange" @on-enter="inputChange" />
						<DropdownMenu  slot="list" style="width: 200px;maxHeight:300px;overflowY:auto"  v-if="tagList" >
							<DropdownItem  v-for="(item,index) in tagList" :key ="index" :name="item.LABEL_CODE+','+item.LABEL_NAME" >{{item.LABEL_NAME}}</DropdownItem>
							<div style="margin:10px;">
								<Button type="primary" @click="handleClose">关闭</Button>
							</div>
						</DropdownMenu>
						<DropdownMenu slot="list" v-else style="width: 200px">
							<DropdownItem name="暂无数据">暂无数据</DropdownItem>
						</DropdownMenu>
					</Dropdown>
					<Button class="margin-left-10" type="primary" icon="search" @click="search">查询</Button>
				</Card>
			</Col>
		</Row>

		<div class="demo-spin-col">
			<Row class="margin-top-10" v-if="result.length>0">
				<Col>
				<Card>
					<p slot="title">
						<Icon type="pricetag"></Icon>
						标签详情
					</p>
					<span class="margin-right-5 margin-left-10">标签名称:</span>
					<span style="width: 200px;display:inline-block;font-size:18px;font-weight:bold">{{result[0].parent.LABEL_NAME}}</span>
					<span class="margin-right-5 margin-left-10">标签编码:</span>
					<span style="width: 200px;display:inline-block;font-size:18px;font-weight:bold">{{result[0].parent.LABEL_CODE_BONC}}</span>
					<span class="margin-right-5 margin-left-10">标签创建时间:</span>
					<span style="width: 200px;display:inline-block;font-size:18px;font-weight:bold">{{result[0].parent.UPDATE_DATE}}</span>

				</Card>
				</Col>
			</Row>
			<Row class="margin-top-10" v-if="result.length>0">
				<Col>
				<Card>
					<p slot="title">
						<Icon type="funnel"></Icon>
						标签口径
					</p>
					<span>{{result[0].parent.DEFINITION}}</span>
				</Card>
				</Col>
			</Row>
			<Card v-if="result.length>0" class="margin-top-10">
				<p slot="title">
					<Icon type="bookmark"></Icon>
					子标签
				</p>
				<Row :gutter="10" class="margin-top-10" v-if="result[0].children.length>0">
					<Col span="4" v-for="(item,index) in result[0].children" :key="index" class="margin-top-10">
						<Button style="height: 40px;background-color: white" type="info" long @click="toChild(item.LABEL_CODE)">{{item.LABEL_NAME}}</Button>
					</Col>
				</Row>
				<Row :gutter="10" class="margin-top-10" v-else>
					<div> 未查询到子级标签</div>
				</Row>
			</Card>
			<Card class="margin-top-10" v-if="result.length === 0" style="text-align: center;padding: 200px 0">
				<img src="../../images/background.png" />
			</Card>
			<Spin fix v-if="spinShow">
				<Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
				<div>正在执行筛选，请稍后。。。</div>
			</Spin>
		</div>
	</div>
</template>
<script>
	import lableQuery from "../../service/labelQuery.js"
	export default {
		mixins:[lableQuery],
		data() {
			return {
				cityList: [
					{
						value: '1',
						label: '内容标签'
					},
					{
						value: '2',
						label: 'APP偏好标签'
					},
					{
						value: '3',
						label: '兴趣标签'
					},
				],
				model1: '1',
				phone: '',
				tagList:[],
				result:[],
				value:"",
				visible:false,
				code:"",
				spinShow:false,
			}
		},
		methods:{
			keydown(e){
				console.log(e)
				if(e.code =="Space"){
					var that =this
					this.value =this.phone
					var params = {
						type:this.model1,
						name:this.value ,
						
					}
					this.selectAllLable(params).then(res => {
						console.log(res)
						that.tagList = res
						that.visible = true;
					})
				}
			},
			inputChange(){
				var that =this
				this.value =this.phone
				var params = {
					type:this.model1,
					name:this.value ,
					
				}
				this.selectAllLable(params).then(res => {
					console.log(res)
					that.tagList = res
					that.visible = true;
				})
				console.log(this.tagList)
			},
			dropChange(name){
				this.result=[];
				console.log(name)
				// 点击下拉项应用到输入框中并更新code
				this.phone= name.split(",")[1];
				this.code= name.split(",")[0];
				var that =this;
				this.spinShow = true;
				var params = {
					type:this.model1,
					code:this.code ,
				}
				this.selectAllLable1(params).then(res => {
					console.log(res)
					that.result.push(res)
					that.spinShow=false
				})
				setTimeout(() => {
                   that.spinShow=false
                },2000);
				console.log(this.result)
			},
			handleClose(){
				this.visible=false
			},
			search(){
				var that =this;
				this.spinShow = true;
				that.result=[];
				var params = {
					type:this.model1,
					code:this.code ,
				}
				this.selectAllLable1(params).then(res => {
					console.log(res)
					that.result.push(res)
					that.spinShow=false
				})
				setTimeout(() => {
                   that.spinShow=false
                },2000);
				console.log(this.result)
			},
			toChild(code){
				var that =this
				that.result=[];
				var params = {
					type:this.model1,
					code:code ,
				}
				this.selectAllLable1(params).then(res => {
					console.log(res)
					that.result.push(res)
				})	
				console.log(this.result)
			}
		}
	}
</script>
<style lang="less" scoped>
	.demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
	}
	.demo-spin-col{
        position: relative;
    }
</style>

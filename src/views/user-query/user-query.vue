<style lang="less" scoped>
    @import '../../styles/common.less';
    @import './user-query.less';
</style>
<template>
    <div>
        <Row>
            <Col>
                <Card>
                    <span>手机号码查询</span>
                    <Input v-model="phone" placeholder="请输入标题名称" clearable style="width: 200px"></Input>
                    <span class="margin-left-10">选择账期</span>
                    <DatePicker type="month" placeholder="请选择账期" style="width: 200px" v-model="date" @on-change="changeDate"></DatePicker>
                    <Button class="margin-left-10" type="primary" icon="search" @click="query">查询</Button>
                </Card>
            </Col>
        </Row>
        <div style="position: relative;">
            <Card class="margin-top-10" style="text-align: center;padding: 200px 0" v-if="JSON.stringify(result)=='{}' || result ==''">
                <img src="../../images/background.png" />
            </Card>
            <Card >
                <Row class="margin-top-10" v-if="result.N02">
                    <Col>
                        <Card>
                            <p slot="title">
                                <!--<Icon type="at"></Icon>-->
                                <img src="../../images/internet.png"/>
                                本期互联网内容偏好
                            </p>
                            <Carousel v-model="internet" :dots="dots" :arrow="arrow" @on-change="change" class="content">
                                <CarouselItem v-for="item in pageInternet" cla>
                                    <Row type="flex" justify="start">
                                        <Col span="3" style="margin:0 2%" v-for="(children,index) in web" :key="index">
                                            <Card style="min-height: 237px">
                                                <p slot="title" style="text-align: center;font-size: 16px;">{{children.n020007}}</p>
                                                <div style="text-align: center;">
                                                    <p style="font-weight: bold;">时长：{{ (children.n020002/3600).toFixed(2) }} H</p>
                                                    <div class="custom-tag margin-top-10" v-bind:style="[{backgroundColor:'#2d8cf0'}]" v-if="children.secList.length>0">
                                                        <span>{{children.secList[0].n020007}}</span>
                                                    </div>
                                                    <div class="custom-tag margin-top-10" v-bind:style="[{backgroundColor:'#19be6b'}]"v-if="children.secList.length>1">
                                                        <span>{{children.secList[1].n020007}}</span>
                                                    </div>
                                                    <p class="margin-top-10 custom-p" @click="all(children)">查看全部></p>
                                                </div>
                                            </Card>
                                        </Col>
                                    </Row>
                                </CarouselItem>
                            </Carousel>
                        </Card>
                    </Col>
                </Row>
                <Row class="margin-top-10" v-if="result.N01">
                    <Col>
                        <Card>
                            <p slot="title">
                                <!--<Icon type="ipad"></Icon>-->
                                <img src="../../images/appLike.png"/>
                                <span>本期APP偏好</span>
                                <span @click="day" style="float: right">查看APP明细日数据</span>
                            </p>
                            <Carousel v-model="app" :dots="dots" :arrow="arrow" @on-change="change">
                                <CarouselItem v-for="item in pageApp">
                                    <Row type="flex" justify="start">
                                        <Col span="3" style="margin: 0 2%" v-for="(children,index) in apps" :key="index">
                                            <Card style="min-height: 237px">
                                                <p slot="title" style="text-align: center;font-size: 16px;">{{children.n010002}}</p>
                                                <div style="text-align: left;margin-left: 20%">
                                                    <p style="font-weight: bold">排名：{{children.n010005}}</p>
                                                    <p style="font-weight: bold">活跃天数：{{children.n010003}}</p>
                                                    <p style="font-weight: bold">消耗流量：{{(children.n010004/1024/1024).toFixed(2)}} M</p>
                                                    <p style="font-weight: bold">访问次数：{{children.n010008}}</p>
                                                    <p class="margin-top-10 custom-p" @click="allApp(children)">查看全部></p>
                                                </div>
                                            </Card>
                                        </Col>
                                    </Row>
                                </CarouselItem>
                            </Carousel>
                        </Card>
                    </Col>
                </Row>
                <Row class="margin-top-10" v-if="result.N03">
                    <Col>
                        <Card>
                            <p slot="title">
                                <!--<Icon type="pricetag"></Icon>-->
                                <img src="../../images/like.png"/>
                                本期兴趣偏好
                            </p>
                            <Carousel v-model="interest" :dots="dots" :arrow="arrow">
                                <CarouselItem v-for="item in pageHabbit">
                                    <Row type="flex" justify="start">
                                        <Col span="3" style="margin: 0 2%" v-for="(children,index) in habbit" :key="index">
                                            <Card style="min-height: 237px">
                                                <p slot="title" style="text-align: center;font-size: 16px;">{{children['n030002']}}</p>
                                                <div style="text-align: center;">
                                                    <p style="font-weight: bold;">评分等级：{{children.n030005}}</p>
                                                    <div class="custom-tag margin-top-10" v-bind:style="[{backgroundColor:'#2d8cf0'}]" v-if="children.secList.length>0">
                                                    <span >
                                                        {{children.secList[0].n030002}}
                                                    </span>
                                                    </div>
                                                    <div class="custom-tag margin-top-10" v-bind:style="[{backgroundColor:'#19be6b'}]" v-if="children.secList.length>1">
                                                    <span>
                                                        {{children.secList[1].n030002}}
                                                    </span>
                                                    </div>
                                                    <p class="margin-top-10 custom-p" @click="allHabbit(children)">查看全部></p>
                                                </div>
                                            </Card>
                                        </Col>
                                    </Row>
                                </CarouselItem>
                            </Carousel>
                        </Card>
                    </Col>
                </Row>
                <Modal v-model="modalInternet" width="60%">
                    <p slot="header" style="color:#2d8cf0;font-size: 20px;height: auto;">
                        <Icon type="information-circled"></Icon>
                        <span style="margin-right: 10px">{{titleInternet}}</span>
                        <span style="color:red;font-size: 13px;">访问次数：{{numberInternet}}次</span>
                    </p>
                    <Table stripe border :data="internetTable" :columns="columns1"></Table>
                    <div slot="footer">
                    </div>
                </Modal>
                <Modal v-model="modalApp" width="20%">
                    <p slot="header" style="color:#2d8cf0;font-size: 20px;height: auto;">
                        <Icon type="information-circled"></Icon>
                        <span>{{appTable.n010002}}</span>
                    </p>
                    <!--<Row>-->
                    <!--<div style="padding: 10px;color:#19be6b;border:1px solid #19be6b " >{{appTable.n010002}}</div>-->
                    <!--</Row>-->
                    <Row class="app">活跃天数: {{appTable.n010003}}</Row>
                    <Row class="app">流量: {{(appTable.n010004/1024/1024).toFixed(2)}} M</Row>
                    <Row class="app">排名: {{appTable.n010005}}</Row>
                    <Row class="app">总天数: {{appTable.n010006}}</Row>
                    <Row class="app">访问时长: {{(appTable.n010007/3600).toFixed(2)}} H</Row>
                    <Row class="app">访问次数: {{appTable.n010008}}</Row>
                    <Row class="app">总流量: {{(appTable.n010009/1024/1024).toFixed(2)}} M</Row>
                    <Row class="app">活跃天数分数: {{appTable.n010010}}</Row>
                    <Row class="app">流量排名: {{appTable.n010011}}</Row>
                    <Row class="app">流量分数: {{appTable.n010012}}</Row>
                    <Row class="app">访问时长排名: {{appTable.n010013}}</Row>
                    <Row class="app">访问时长分数: {{appTable.n010014}}</Row>
                    <Row class="app">访问次数排名: {{appTable.n010015}}</Row>
                    <Row class="app">访问次数分数: {{appTable.n010016}}</Row>
                    <Row class="app">总得分: {{appTable.n010017}}</Row>
                    <Row class="app">标签排名: {{appTable.n010018}}</Row>
                    <Row class="app">评分等级: {{appTable.n010019}}</Row>
                    <div slot="footer">
                    </div>
                </Modal>
                <Modal v-model="modalInterest" width="60%">
                    <p slot="header" style="color:#2d8cf0;font-size: 20px;height: auto;">
                        <Icon type="information-circled"></Icon>
                        <span style="margin-right: 10px">{{titleHabbit}}</span>
                        <span style="color:red;font-size: 13px;">访问次数：{{numberHabbit}}次</span>
                    </p>
                    <Table stripe border :data="habbitTable" :columns="columns2"></Table>
                    <div slot="footer">
                    </div>
                </Modal>
                <Modal v-model="modalDay" width="60%" :closable="false">
                    <p slot="header" style="color:#2d8cf0;font-size: 20px;height: auto;">
                        <Icon type="information-circled"></Icon>
                        <span style="margin-right: 10px">App明细日数据查询</span>
                    </p>
                    <Row style="text-align: left;margin-bottom: 30px">
                        <span>账期</span>
                        <DatePicker type="date" placeholder="请选择账期" style="width: 200px" v-model="dates"></DatePicker>
                        <span style="margin-left: 10px">检索类型</span>
                        <Select v-model="select" style="width:200px" clearable>
                            <Option v-for="item in list" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <Button @click="searchDate" style="margin-left: 10px" type="primary"> 搜索</Button>
                    </Row>
                    <Row>
                        <Echarts :echartStyle="styles"
                                       :tooltipFormatter="tooltip"
                                       :opinion="dataLength"
                                       :seriesName="seriesName"
                                       :opinionData="dataList"
                                 ref="eharts"
                                 v-if="dataLength.length > 0"
                        ></Echarts>
                        <Row>
                            <div v-if="dataLength.length === 0" style="padding: 20px;text-align: center">暂无数据</div>
                        </Row>
                        <Spin size="large" fix v-if="spinShow"></Spin>
                    </Row>
                    <div slot="footer">
                        <Button @click="echarts" type="primary">确定</Button>
                    </div>
                </Modal>
            </Card>
            <Spin size="large" fix v-if="loading">
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                <div>正在执行筛选，请稍后。。。</div>
            </Spin>
        </div>
    </div>
</template>
<script>
    import search from '../../service/userQuery.js';
    import Echarts from './echarts.vue';
    import { Message } from 'iview';
    import moment from 'moment';

    export default {
        mixins: [search],
        components: {
            Echarts
        },
        data () {
            return {
                spinShow: false,
                phone: '',
                date: '',
                dates: '',
                timeValue: '',
                dots: 'none',
                arrow: 'always',
                internet: 0,
                web: [],
                apps: [],
                habbit: {},
                result: {},
                app: 0,
                interest: 0,
                modalDay: false,
                modalInternet: false,
                modalApp: false,
                modalInterest: false,
                internetTable: [],
                appTable: [],
                habbitTable: [],
                titleInternet: '',
                titleHabbit: '',
                numberInternet: '',
                numberHabbit: '',
                titleApp: '',
                numberApp: '',
                pageInternet: 1,
                pageApp: 1,
                loading: false,
                pageHabbit: 1,
                select: 1,
                tooltip: '',
                dataLength: [],
                seriesName: '',
                dataList: [],
                styles: {
                    height: '500px',
                    width: '100%'
                },
                list: [
                    {
                        value: 1,
                        label: '流量'
                    },
                    {
                        value: 2,
                        label: '次数'
                    },
                    {
                        value: 3,
                        label: '时长'
                    }
                ],
                columns1: [
                    {
                        title: '二级标签',
                        key: 'n020007'
                    },
                    {
                        title: '访问次数',
                        key: 'n020006'
                    },
                    {
                        title: '时长',
                        key: 'n020002',
                        render: (h, params) => {
                            let number = (params.row.n020002 / 3600).toFixed(2);
                            return h('span', [`${number} H`]);
                        }
                    },
                    {
                        title: '消耗流量',
                        key: 'n020005',
                        render: (h, params) => {
                            let number = (params.row.n020005 / 1024 / 1024).toFixed(2);
                            return h('span', [`${number} M`]);
                        }
                    },
                    {
                        title: '活跃标签',
                        key: 'actLable',
                        render: (h, params) => {
                            let act = null;
                            if (params.row.actLable) {
                                act = params.row.actLable.replace('null,', '');
                                act = act.replace(',null', '');
                            }

                            return h('span', [act || '暂无标签']);
                        }
                    }
                ],
                columns2: [
                    {
                        title: '二级标签',
                        key: 'n030002'
                    },
                    {
                        title: '访问次数',
                        key: 'n030006'
                    },
                    {
                        title: '时长',
                        key: 'n030007',
                        render: (h, params) => {
                            let number = (params.row.n030007 / 3600).toFixed(2);
                            return h('span', [`${number} H`]);
                        }
                    },
                    {
                        title: '消耗流量',
                        key: 'n030008',
                        render: (h, params) => {
                            let number = (params.row.n030008 / 1024 / 1024).toFixed(2);
                            return h('span', [`${number} M`]);
                        }
                    },
                    {
                        title: '评分等级',
                        key: 'n030005'
                    },
                    {
                        title: '活跃标签',
                        key: 'actLable',
                        render: (h, params) => {
                            let act = null;
                            if (params.row.actLable) {
                                act = params.row.actLable.replace('null,', '');
                                act = act.replace(',null', '');
                            }

                            return h('span', [act || '暂无标签']);
                        }
                    }
                ]
            };
        },
        created () {
            this.styles.height = document.documentElement.clientHeight - 44 + 'px';
        },
        methods: {
            query () {
                this.picture = [];
                const param = {
                    count: moment(this.date).format('YYYYMM'),
                    phone: this.phone
                };
                if (!(/^1[34578]\d{9}$/.test(this.phone))) {
                    Message.error('请输入正确的电话号码');
                } else {
                    this.loading = true;
                    // this.result = {};
                    this.search(param)
                        .then(res => {
                            this.loading = false;
                            this.result = res;
                            if (this.result) {
                                this.N02 = res.N02;
                                this.N01 = res.N01;
                                this.N03 = res.N03;
                                this.pageInternet = parseInt(res.N02.length / 6 + 1);
                                this.pageApp = parseInt(res.N01.length / 6 + 1);
                                this.pageHabbit = parseInt(res.N03.length / 6 + 1);
                                const arrInternet = [];
                                const arrApp = [];
                                const arrHabbit = [];
                                for (var i = 0; i < 6; i++) {
                                    if (res.N02[i]) {
                                        arrInternet.push(res.N02[i]);
                                    }
                                    if (res.N01[i]) {
                                        arrApp.push(res.N01[i]);
                                    }
                                    if (res.N03[i]) {
                                        arrHabbit.push(res.N03[i]);
                                    }
                                }
                                this.web = arrInternet;
                                this.apps = arrApp;
                                this.habbit = arrHabbit;
                            }
                        });
                }
            },
            changeDate (value) {
                this.timeValue = value;
                this.dates = value + '-01';
            },
            change (oldValue, value) {
                let arrInternet = [];
                let arrApp = [];
                let arrHabbit = [];
                for (var i = value * 6; i < (value + 1) * 6; i++) {
                    if (this.N02[i]) {
                        arrInternet.push(this.N02[i]);
                        this.web = arrInternet;
                    }
                    if (this.N01[i]) {
                        arrApp.push(this.N01[i]);
                        this.apps = arrApp;
                    }
                    if (this.N03[i]) {
                        arrHabbit.push(this.N03[i]);
                        this.habbit = arrHabbit;
                    }
                }
            },
            all (children) {
                this.modalInternet = true;
                this.titleInternet = children.n020008;
                this.numberInternet = children.n020006;
                this.internetTable = children.secList;
            },
            allApp (children) {
                this.modalApp = true;
                this.appTable = children;
            },
            allHabbit (children) {
                this.modalInterest = true;
                this.titleHabbit = children.n030002;
                this.numberHabbit = children.n030006;
                this.habbitTable = children.secList;
            },
            day () {
                this.modalDay = true;
                this.searchDate();
            },
            echarts () {
                this.modalDay = false;
                this.select = 1;
                this.dates = this.timeValue + '-01';
            },
            searchDate () {
                const param = {
                    phone: this.phone,
                    count: moment(this.dates).format('YYYYMMDD'),
                    type: this.select
                };
                this.spinShow = true;
                if (param.type === 1) {
                    this.tooltip = '使用流量';
                    this.seriesName = '流量统计';
                } else if (param.type === 2) {
                    this.tooltip = '使用次数';
                    this.seriesName = '次数统计';
                } else {
                    this.tooltip = '使用时长';
                    this.seriesName = '时长统计';
                }
                this.dayData(param)
                    .then(res => {
                        if (res == '') {
                            this.spinShow = false;
                            this.dataLength = [];
                            this.dataList = [];
                        } else {
                            this.spinShow = false;
                            this.dataLength = res.legend;
                            this.dataList = res.datalist;
                        }
                    });
            }

        }

    };
</script>
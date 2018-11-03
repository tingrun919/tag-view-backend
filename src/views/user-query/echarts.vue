<!-- 自定义 echart 组件 -->
<template>
      <div>
        <!-- echart表格 -->
        <div id="myChart" :style="echartStyle" ref="myEchart"></div>
      </div>
</template>
 
<script>
    export default{
        props: {
            // 样式
            echartStyle: {
                type: Object,
                default () {
                    return {};
                }
            },
            // 标题文本
            titleText: {
                type: String,
                default: ''
            },
            // 提示框键名
            tooltipFormatter: {
                type: String,
                default: ''
            },
            // 扇形区域名称
            opinion: {
                type: Array,
                default () {
                    return [];
                }
            },
            // 提示框标题
            seriesName: {
                type: String,
                default: ''
            },
            // 扇形区域数据
            opinionData: {
                type: Array,
                default () {
                    return [];
                }
            }
        },
        watch: {
            opinionData () {
                this.drawPie('myChart');
            }
        },
        data () {
            return {
                //
            };
        },
        mounted () {
            this.$nextTick(function () {
                this.drawPie('myChart');
            });
            this.init();
        },
        methods: {
            init () {
                const self = this;
                // 因为箭头函数会改变this指向，指向windows。所以先把this保存
                setTimeout(() => {
                    window.onresize = function () {
                        self.chart = self.$echarts.init(self.$refs.myEchart);
                        self.chart.resize();
                    };
                }, 20);
            },
            // 监听扇形图点击
            eConsole (param) {
                // 向父组件传值
                this.$emit('currentEchartData', param.name);
            },
            // 绘制饼状图
            drawPie (id) {
                this.charts = this.$echarts.init(document.getElementById(id));
                this.charts.on('click', this.eConsole);
                this.charts.setOption({
                    title: {
                        text: this.titleText,
                        // 标题文本
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        // formatter: '{a} <br/> ' + this.tooltipFormatter + ':{c}'
                        formatter: (params, ticket, callback) => {
                            let res = '';
                            if (params.seriesName === '次数统计') {
                                res = this.seriesName + '<br />' + this.tooltipFormatter + ' : ' + params.value + '次';
                            } else if (params.seriesName === '时长统计') {
                                res = this.seriesName + '<br />' + this.tooltipFormatter + ' : ' + params.value + '分钟';
                            } else {
                                res = this.seriesName + '<br />' + this.tooltipFormatter + ' : ' + params.value + 'MB';
                            }
                            return res;
                        }
                    },
                    legend: {
                        type: 'scroll',
                        orient: 'vertical',
                        right: 0,
                        top: 30,
                        bottom: 20,
                        data: this.opinion
                        // 扇形区域名称
                    },
                    series: [
                        {
                            name: this.seriesName,
                            // 提示框标题
                            type: 'pie',
                            radius: '25%',
                            // center: ['0%', '0%'],
                            selectedMode: 'single',
                            data: this.opinionData,
                            // 扇形区域数据
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'

                                }
                            }
                        }
                    ]
                });
            }
        }
    };
</script>
 
<style lang="less" scoped>
      #myChart {
        width: 50%;
        height: 50%
    }
</style>

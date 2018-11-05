 <template>
     <div>
         <Row style="background-color:#fff;minHeight:500px" v-if="type == 'new'">
              <p class="title">
                <span>{{resultData.length>0 ? resultData[0].noticeName :""}}</span>
            </p>
             <p class="creatTime">
                <span>{{resultData.length>0 ? resultData[0].noticeCreatetime:""}}</span>
            </p>
            <div class="content" v-html ="resultData.length>0 ? resultData[0].noticeContent : '' "></div>
         </Row>
         <Row style="minHeight:500px" v-else-if="type=='add'">
            <Card :bordered="false" style="marginTop:20px;">
                <p slot="title">公告标题</p>
                <p><Input v-model="title" placeholder="请输入标题" style="width: 300px"></Input> </p>
            </Card>
            <Card :bordered="false" style="marginTop:20px;">
                <p slot="title">公告状态</p>
                <p>
                    <Select v-model="model2" style="width:200px">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                </p>
            </Card>
            <Card :bordered="false" style="marginTop:20px;">
                <p slot="title">公告内容</p>
                <p>
                     <vue-wangeditor id="editor" ref="editor" v-model="result" :menus='menus' width="70%" height="600"></vue-wangeditor>
                </p>
            </Card>
            <p style="margin:30px 20px">
                <Button type="success" @click="submit" size="large" style="marginRight:40px">提交</Button>
                <Button type="warning"  size="large"  @click="cancell">取消</Button>
            </p>
         </Row>
          <Row style="background-color:#fff;minHeight:500px" v-else-if="type=='edit'">
             <Card :bordered="false">
                <p slot="title">公告标题</p>
                <p><Input v-model="title" placeholder="请输入标题" style="width: 300px"></Input> </p>
            </Card>
            <Card :bordered="false">
                <p slot="title">公告状态</p>
                <p>
                    <Select v-model="model2" style="width:200px">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                </p>
            </Card>
            <Card :bordered="false">
                <p slot="title">公告内容</p>
                <p>
                    <vue-wangeditor id="editor" ref="editor" v-model="result" :menus='menus' width="70%" height="300"></vue-wangeditor>
                </p>
            </Card>
            <p style="margin:30px 20px">
                <Button type="success" @click="submit" size="large" style="marginRight:40px">提交</Button>
                <Button type="warning"  size="large"  @click="cancell">取消</Button>
            </p>
         </Row>
     </div>
 </template>
<script>
import vueWangeditor from 'vue-wangeditor';
import bulletin from '../../../service/bulletinService.js';
export default {
    mixins: [bulletin],
    components: {
        vueWangeditor
    },
    data () {
        return {
            result: '',
            title: '',
            creatTime: '',
            content: '',
            resultData: '',
            type: '',
            params: {
                noticeState: 1,
                noticeId: ''
            },
            menus: [
                'source', // 源码模式
                '|',
                'bold', // 粗体
                'underline', // 下划线
                'italic', // 斜体
                'strikethrough', // 中线
                'eraser', // 清空格式
                'forecolor', // 文字颜色
                'bgcolor', // 背景颜色
                '|',
                'quote', // 引用
                'fontfamily', // 字体
                'fontsize', // 字号
                'head', // 标题
                'unorderlist', // 无序列表
                'orderlist', // 有序列表
                'alignleft', // 左对齐
                'aligncenter', // 居中
                'alignright', // 右对齐
                '|',
                'link', // 链接
                'unlink' // 取消链接
            ],
            model2: '0',
            cityList: [
                {
                    value: '1',
                    label: '上架'
                },
                {
                    value: '0',
                    label: '下架'
                }
            ]
        };
    },
    methods: {
        submit () {
            console.log(this.$refs.editor.getHtml());
            if (this.type == 'add') {
                var params = {
                    noticeName: this.title,
                    noticeState: this.model2,
                    noticeContent: this.$refs.editor.getHtml()
                };
                this.addBulletinAction(params).then(res => {
                    console.log(res);
                });
            } else if (this.type == 'edit') {
                var params = {
                    noticeId: this.$route.params.id,
                    noticeName: this.title,
                    noticeState: this.model2,
                    noticeContent: this.$refs.editor.getHtml()
                };
                this.updateStateAction(params).then(res => {
                    console.log(res);
                });
            }
            // this.$router.go(-1);
        },
        cancell () {
            this.$router.go(-1);
        },
        getHtml (value) {
            console.log(value);
        },
        getDataList () {
            this.fetchList(this.params).then(res => {
                console.log(res);
                this.resultData = res;
                if (this.type == 'edit') {
                    this.title = res.length > 0 ? res[0].noticeName : '';
                    this.model2 = res.length > 0 ? res[0].noticeState : '';
                    this.resultData = res.length > 0 ? res[0].noticeContent : '';
                }
            });
        }
    },
    mounted () {
        console.log(this.$route);
        this.params.noticeId = this.$route.params.id;
        this.type = this.$route.query.type;
        if (this.type == 'new' || this.type == 'edit') {
            this.getDataList();
        }
    }
};
</script>
<style lang="less" scoped>
.title {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #000;
  font-size: 24px;
  font-weight: bold;
}
.titleAdd {
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: center;
  color: #000;
  font-size: 24px;
  font-weight: bold;
}
.creatTime {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 16px;
  color: gray;
}
.content {
  width: 80%;
  margin-left: 10%;
  font-size: 14px;
}
</style>


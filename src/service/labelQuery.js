import Util from '../libs/util';

export default {
	methods: {
        // 标签模糊搜索
        selectAllLable(param) {
			return Util.get('lable/selectAllLable', param).then(res => {
				return Util.result(res.data,"隐藏")
			})
		},
		// g根据标签code搜索http://192.168.10.196:8080/biaoqian_admin/lable/selectAllLable1
		selectAllLable1(param) {
			return Util.get('lable/selectAllLable1', param).then(res => {
				return Util.result(res.data,"查询")
			})
		},

	}
}
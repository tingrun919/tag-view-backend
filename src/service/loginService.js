import Util from '../libs/util';

export default {
	methods: {
		loginAction(form) {
			return Util.post('staff/login', form).then(res => {
				return Util.result(res.data, '登陆')
			})
		},
		// 获取各类标签数量
		selLableSize1(form) {
			return Util.post('lable/selLableSize1', form).then(res => {
				return Util.result(res.data, '隐藏')
			})
		}
	}
}

import Util from '../libs/util';

export default {
	methods: {
		loginAction(form) {
			return Util.post('staff/login', form).then(res => {
				return Util.result(res.data, '登陆')
			})
		}
	}
}
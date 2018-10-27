import Util from '../libs/util';

export default {
	methods: {
		handlePermissine(id) {
			return Util.get(`staff/selectPerm?roleid=${id}`).then(res => {
				return Util.result(res.data, '查询')
			})
		}
	}
}
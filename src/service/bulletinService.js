import Util from '../libs/util';

export default {
	methods: {
		fetchList(param) {
			return Util.get('info/selectSystemNotice', param).then(res => {
				return Util.result(res.data, '查询')
			})
		},
		addBulletinAction(params){
			return Util.post('info/addSystemNotice', params).then(res => {
				return Util.result(res.data, '新增')
			})
		},
		handleDeleteBulletin(id){
			return Util.get(`info/deleteSystemNotice?noticeId=${id}`).then(res => {
				return Util.result(res.data, '删除')
			})
		},
		updateStateAction(params){
			return Util.get('info/updateSystemNotice', params).then(res => {
				return Util.result(res.data, '修改')
			})
		}
	}
}
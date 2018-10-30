import Util from '../libs/util';

export default {
    methods: {
        fetchList (params) {
            return Util.get('staff/selectSysStaff', params).then(res => {
                return Util.result(res.data, '查询');
            });
        },
        addUserAction (params) {
            return Util.post('staff/addSysStaff', params).then(res => {
                return Util.result(res.data, '新增');
            });
        },
        getOneUserAction (params) {
            return Util.get('staff/selectSysStaff', params).then(res => {
                return Util.result(res.data, '查询');
            });
        },
        updateUserAction (params) {
            return Util.get('staff/updateSysStaff', params).then(res => {
                return Util.result(res.data, '修改');
            });
        },
        updateStateAction (params) {
            return Util.get('staff/updateSysStaffToIsEffective', params).then(res => {
                return Util.result(res.data, '修改');
            });
        },
        // 查询角色
        selRole (params) {
            return Util.get('staff/selRole', params).then(res => {
                return Util.result(res.data, '隐藏');
            });
        }
    }
};

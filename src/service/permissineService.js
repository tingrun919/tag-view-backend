import Util from '../libs/util';

export default {
    methods: {
        handlePermissine (id) {
            return Util.get(`staff/selectPerm?roleid=${id}`).then(res => {
                return Util.result(res.data, '查询');
            });
        },
        selRole (param) {
            return Util.get('staff/selRole', param).then(res => {
                return Util.result(res.data, '查询');
            });
        },
        updatePerm (param) {
            return Util.get('staff/updatePerm', param).then(res => {
                return Util.result(res.data, '修改');
            });
        },
        addRol (param) {
            return Util.get('staff/addRole', param).then(res => {
                return Util.result(res.data, '新增');
            });
        },
        upRole (param) {
            return Util.get('staff/upRole', param).then(res => {
                return Util.result(res.data, '修改');
            });
        }
    }
};

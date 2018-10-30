import Util from '../libs/util';

export default {
    methods: {
        search (param) {
            return Util.get('lable/monthData', param).then(res => {
                return Util.result(res.data, '查询');
            });
        },
        role (param) {
            return Util.get('staff/selRole', param).then(res => {
                return Util.result(res.data, '查询');
            });
        },
        dayData (param) {
            return Util.get('/lable/dayData', param).then(res => {
                return Util.result(res.data, '查询');
            });
        }
    }
};

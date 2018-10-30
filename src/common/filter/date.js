import moment from 'moment';

export function date (value, format = 'YYYY-MM-DD') {
    if (!value) {
        return '--';
    }

    return moment(value).format(format);
}

export default {
    install (Vue) {
        Vue.filter('date', date);
    }
};

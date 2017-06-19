/**
 * @file page loading mixin
 * @author zoumiaojiang(zoumiaojiang@gmail.com)
 */

export default {
    beforeRouteLeave(to, from, next) {
        // 离开组件对应的路由时，开启loading
        this.setPageLoading(true);
        next();
    }
    // activated() {
    //     this.setPageLoading(true);
    // }
};

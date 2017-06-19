const SKELETON_ROUTE_HOLDER = `// <!-- INJECT_SKELETON_ROUTE -->`;
const SKELETON_ROUTE = `{
    path: '/skeleton',
    name: 'skeleton',
    component: Skeleton
},`;

const SKELETON_IMPORT_HOLDER = `// <!-- INJECT_SKELETON_IMPORT -->`;
const SKELETON_IMPORT = `import Skeleton from '@/pages/Skeleton.vue';`

module.exports = source => {
    // skeleton路由规则只在开发环境中添加
    return process.env.NODE_ENV === 'production' ? source :
        source.replace(SKELETON_ROUTE_HOLDER, SKELETON_ROUTE)
            .replace(SKELETON_IMPORT_HOLDER, SKELETON_IMPORT);
}

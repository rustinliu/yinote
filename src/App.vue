<template>
    <div id="app">
        <Sidebar></Sidebar>
        <router-view />
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
export default {
    name: 'App',
    components: {
        Sidebar,
    },
};
</script>

<style>
/*@import '//at.alicdn.com/t/font_496303_exkj65zylocu9pb9.css;*/

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
html,
body,
#app {
    height: 100%;
}
body {
    font-family: -apple-system, 'Noto Sans', 'Helvetica Neue', Helvetica, 'Nimbus Sans L', Arial,
        'Liberation Sans', 'PingFang SC', 'Hiragino Sans GB', 'Noto Sans CJK SC',
        'Source Han Sans SC', 'Source Han Sans CN', 'Microsoft YaHei', 'Wenquanyi Micro Hei',
        'WenQuanYi Zen Hei', 'ST Heiti', SimHei, 'WenQuanYi Zen Hei Sharp', sans-serif;
    font-size: 14px;
    -moz-osx-font-smoothing: grayscale;
    background-color: #eee;
}
a {
    text-decoration: none;
    color: #444;
}
ul,
li {
    list-style: none;
}
.btn {
    color: #666;
    font-size: 12px;
    padding: 2px 4px;
    background-color: #fff;
    box-shadow: 0px 0px 2px 0px #ccc;
    border: none;
    cursor: pointer;
    display: inline-block;
}
#app {
    display: flex;
    align-items: stretch;
}
</style>

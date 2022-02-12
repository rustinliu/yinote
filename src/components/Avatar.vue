<template>
    <span :title="username">{{ slug }}</span>
</template>

<script>
import Auth from '@/apis/auth';
import Bus from '@/helpers/bus';
export default {
    name: 'Avatar',
    data() {
        return {
            username: '未登录',
        };
    },
    created() {
        Bus.$on('userInfo', (user) => {
            this.username = user.username;
        });
        Auth.getInfo().then((res) => {
            if (res.isLogin) {
                this.username = res.data.username;
            }
        });
    },
    computed: {
        slug() {
            return this.username.slice(0, 1).toUpperCase();
        },
    },
};
</script>

<style scoped>
span {
    display: inline-block;
    width: 30px;
    height: 30px;
    line-height: 32px;
    text-align: center;
    border-radius: 50%;
    font-size: 18px;
    color: #fff;
    text-shadow: 1px 0 1px #795c19;
    text-transform: uppercase;
    margin-top: 15px;
    background: #f2b81c;
}
</style>

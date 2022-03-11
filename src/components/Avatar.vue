<template>
    <span :title="username">{{ slug }}</span>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'Avatar',
    data() {
        return {};
    },
    created() {
        this.setUser();
    },
    computed: {
        ...mapGetters(['username', 'slug']),
    },
    methods: {
        ...mapActions({ setUser: 'checkLogin' }),
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

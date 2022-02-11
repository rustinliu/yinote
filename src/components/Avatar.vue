<template>
    <span :title="user.username">{{ slug }}</span>
</template>

<script>
export default {
    name: 'Avatar',
    data() {
        return {
            user: {
                username: 'Vue',
            },
            slug: 'v',
        };
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

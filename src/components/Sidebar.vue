<template>
    <div id="sidebar">
        <Avatar></Avatar>
        <div class="icons">
            <router-link to="/note/" title="笔记" active-class="selected"
                ><i class="iconfont icon-note"></i
            ></router-link>
            <router-link to="/notebooks" title="笔记本" active-class="selected"
                ><i class="iconfont icon-notebook"></i
            ></router-link>
            <router-link to="/trash/" title="回收站" active-class="selected"
                ><i class="iconfont icon-trash"></i
            ></router-link>
        </div>
        <div class="logout" @click="onLogout">
            <i class="iconfont icon-logout"></i>
        </div>
    </div>
</template>

<script>
import Avatar from '@/components/Avatar.vue';
import { mapActions } from 'vuex';
export default {
    name: 'Sidebar',
    components: {
        Avatar,
    },
    methods: {
        ...mapActions(['logout']),
        onLogout() {
            this.$confirm('确定要退出吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                this.logout({ path: '/login' });
            });
        },
    },
};
</script>

<style lang="less" scoped>
#sidebar {
    position: relative;
    width: 66px;
    text-align: center;
    background-color: #415e6d;
}
.icons {
    margin-top: 15px;
    a {
        padding: 6px 0;
        display: block;
    }
}
.selected {
    background-color: darken(#415e6d, 10%);
}

.logout {
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
    cursor: pointer;
}

.iconfont {
    color: #fff;
    font-size: 26px;
}
</style>

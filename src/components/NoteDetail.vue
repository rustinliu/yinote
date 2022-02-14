<template>
    <div id="note" class="detail">
        <NoteSidebar></NoteSidebar>
        <div class="note-detail">
            <h1>notebookId : {{ $route.query.notebookId }}</h1>
        </div>
    </div>
</template>

<script>
import Auth from '@/apis/auth';
import NoteSidebar from '@/components/NoteSidebar';
export default {
    name: 'NoteDetail',
    components: {
        NoteSidebar,
    },
    data() {
        return {
            msg: '笔记详情',
        };
    },
    created() {
        Auth.getInfo().then((res) => {
            if (!res.isLogin) {
                this.$router.push({
                    path: '/login',
                });
            }
        });
    },
};
</script>

<style scoped>
#note {
    display: flex;
    align-items: stretch;
    background-color: #fff;
    flex: 1;
}
</style>

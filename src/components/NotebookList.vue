<template>
    <div class="detail" id="notebook-list">
        <header>
            <a href="#" class="btn" @click.prevent="onCreate"
                ><i class="iconfont icon-plus"></i> 新建笔记本</a
            >
        </header>
        <main>
            <div class="layout">
                <h3>笔记本列表{{ notebooks.length }}</h3>
                <div class="book-list">
                    <router-link
                        v-for="notebook in notebooks"
                        :to="`/note/?notebookId=${notebook.id}`"
                        class="notebook"
                        :key="notebook.id"
                    >
                        <div>
                            <span class="iconfont icon-notebook"> </span> {{ notebook.title }}
                            <span>{{ notebook.noteCounts }} </span>
                            <span class="action" @click.stop.prevent="onEdit(notebook)">编辑</span>
                            <span class="action" @click.stop.prevent="onDelete(notebook)"
                                >删除</span
                            >
                            <span class="date">{{ notebook.friendlyCreatedAt }}</span>
                        </div>
                    </router-link>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import Notebooks from '@/apis/notebooks';
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
//window.Notebooks = Notebooks;

import Auth from '@/apis/auth';
import { friendlyDate } from '@/helpers/util';
export default {
    name: 'NotebookList',
    data() {
        return {};
    },
    computed: {
        ...mapGetters(['notebooks']),
    },
    created() {
        Auth.getInfo().then((res) => {
            if (!res.isLogin) {
                this.$router.push({
                    path: '/login',
                });
            }
        });

        this.getNotebooks();
    },
    methods: {
        ...mapActions(['addNotebook', 'updateNotebook', 'deleteNotebook', 'getNotebooks']),

        onCreate() {
            this.$prompt('请输入新笔记标题', '创建笔记本', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^.{1,30}$/,
                inputErrorMessage: '笔记本标题不能为空,且不能超过30个字符',
            }).then(({ value }) => {
                this.addNotebook({ title: value });
            });
        },
        onEdit(notebook) {
            this.$prompt('请输入新笔记标题', '修改笔记本', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^.{1,30}$/,
                inputErrorMessage: '笔记本标题不能为空,且不能超过30个字符',
                inputValue: notebook.title,
            }).then(({ value }) => {
                this.updateNotebook({ notebookId: notebook.id, title: value });
            });
        },
        onDelete(notebook) {
            this.$confirm('确认要删除笔记本吗?', '删除笔记本', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                this.deleteNotebook(notebook);
            });
        },
    },
};
</script>

<style lang="less" scoped>
@import '~@/assets/css/notebook-list.less';
</style>

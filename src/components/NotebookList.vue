<template>
    <div class="detail" id="notebook-list">
        <header>
            <a href="#" class="btn" @click.prevent="onCreate"><i class="iconfont icon-plus"></i> 新建笔记本</a>
        </header>
        <main>
            <div class="layout">
                <h3>笔记本列表{{ notebooks.length }}</h3>
                <div class="book-list">
                    <router-link v-for="notebook in notebooks" to="/note/1" class="notebook" :key="notebook.id">
                        <div>
                            <span class="iconfont icon-notebook"> </span> {{ notebook.title }}
                            <span>{{ notebook.noteCounts }} </span>
                            <span class="action" @click.stop.prevent="onEdit(notebook)">编辑</span>
                            <span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>
                            <span class="date">三天起</span>
                        </div>
                    </router-link>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import Notebooks from '@/apis/notebooks';

//window.Notebooks = Notebooks;

import Auth from '@/apis/auth';
export default {
    name: 'NotebookList',
    data() {
        return {
            notebooks: [],
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
        Notebooks.getAll().then((res) => {
            this.notebooks = res.data;
        });
    },
    methods: {
        onCreate() {
            let title = window.prompt('请输入笔记本名称');
            if (title.trim() === '') {
                window.alert('笔记本名称不能为空');
                return;
            }
            Notebooks.addNotebook({ title }).then((res) => {
                console.log(res);
                alert(res.msg);
                this.notebooks.unshift(res.data);
            });
        },
        onEdit(notebook) {
            console.log('...Edit', notebook);
            let title = window.prompt('修改标题', notebook.title);
            Notebooks.updateNotebook(notebook.id, { title }).then((res) => {
                console.log(res);
                notebook.title = title;
                alert(res.msg);
            });
        },
        onDelete(notebook) {
            console.log('...Delete', notebook);
            let isconfirm = window.confirm('确定要删除吗？');
            if (isconfirm) {
                Notebooks.deleteNotebook(notebook.id).then((res) => {
                    console.log(res);
                    this.notebooks.splice(this.notebooks.indexOf(notebook), 1);
                    alert(res.msg);
                });
            }
        },
    },
};
</script>

<style lang="less" scoped>
@import '~@/assets/css/notebook-list.less';
</style>

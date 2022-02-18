<template>
    <div id="trash" class="detail">
        <div class="note-sidebar">
            <h3 class="notebook-title">回收站</h3>
            <div class="menu">
                <div>更新时间</div>
                <div>标题</div>
            </div>
            <ul class="notes">
                <li v-for="note in trashNotes" :key="note.id">
                    <router-link :to="`/trash?noteId=${note.id}`">
                        <span class="date">{{ note.updatedAtFriendly }}</span>
                        <span class="title">{{ note.title }}</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="note-detail">
            <div class="note-bar" v-if="true">
                <span> 创建日期: {{ curTrashNote.createdAtFriendly }}</span>
                <span> | </span>
                <span> 更新日期: {{ curTrashNote.updatedAtFriendly }}</span>
                <span> | </span>
                <span> 所属笔记本: {{ belongTo }}</span>

                <a class="btn action" @click="onRevert">恢复</a>
                <a class="btn action" @click="onDelete">彻底删除</a>
            </div>
            <div class="note-title">
                <span>{{ curTrashNote.title }}</span>
            </div>
            <div class="editor">
                <div class="preview markdown-body" v-html="compiledMarkdown"></div>
            </div>
        </div>
    </div>
</template>

<script>
import Auth from '@/apis/auth';
import markdownIt from 'markdown-it';

export default {
    name: 'TrashDetail',
    data() {
        return {
            msg: '回收站笔记详情页',
            curTrashNote: {
                id: 3,
                title: 'wodebiji',
                content: '# 标题\n\n这是一段内容',
                createdAtFriendly: '2iaoshiqian',
                updatedAtFriendly: '2iaoshiqian',
            },
            belongTo: 'wode1',
            trashNotes: [
                {
                    id: 3,
                    title: 'wodebiji',
                    content: '# 标题\n\n这是一段内容',
                    createdAtFriendly: '2iaoshiqian',
                    updatedAtFriendly: '2iaoshiqian',
                },
                {
                    id: 4,
                    title: 'wodebiji',
                    content: '# 标题\n\n这是一段内容',
                    createdAtFriendly: '2iaoshiqian',
                    updatedAtFriendly: '2iaoshiqian',
                },
                {
                    id: 5,
                    title: 'wodebiji',
                    content: '# 标题\n\n这是一段内容',
                    createdAtFriendly: '2iaoshiqian',
                    updatedAtFriendly: '2iaoshiqian',
                },
            ],
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
    computed: {
        compiledMarkdown() {
            return markdownIt().render(this.curTrashNote.content);
        },
    },

    methods: {
        onDelete() {
            console.log('onDelete');
        },
        onRevert() {
            console.log('onRevert');
        },
    },
};
</script>

<style lang="less">
@import url(../assets/css/note-sidebar.less);
@import url(../assets/css/note-detail.less);

#trash {
    display: flex;
    align-items: stretch;
    background-color: #fff;
    flex: 1;

    .note-bar {
        .action {
            float: right;
            margin-left: 10px;
            padding: 2px 4px;
            font-size: 12px;
        }
    }
}
</style>

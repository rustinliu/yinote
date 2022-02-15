<template>
    <div id="note" class="detail">
        <NoteSidebar @update:notes="(val) => (notes = val)"></NoteSidebar>
        <div class="note-detail">
            <div class="note-empty" v-show="!curNote.id">请选择笔记</div>
            <div v-show="curNote.id">
                <div class="note-bar">
                    <span> 创建日期: {{ curNote.createdAtFriendly }}</span>
                    <span> 更新日期:{{ curNote.updatedAtFriendly }}</span>
                    <span> {{ statusText }}</span>
                    <span class="iconfont icon-delete" @click="deleteNote"></span>
                    <span class="iconfont icon-fullscreen"></span>
                </div>
                <div class="note-title">
                    <input
                        type="text"
                        v-model="curNote.title"
                        @input="updateNote"
                        placeholder="输入标题"
                        @keydown="statusText = '正在输入。。。'"
                    />
                </div>
                <div class="editor"></div>
                <textarea
                    v-show="true"
                    v-model="curNote.content"
                    @input="updateNote"
                    placeholder="输入内容, 支持 markdown 语法"
                    @keydown="statusText = '正在输入。。。'"
                ></textarea>
                <div class="preview markdown-body" v-show="false"></div>
            </div>
        </div>
    </div>
</template>

<script>
import Auth from '@/apis/auth';
import NoteSidebar from '@/components/NoteSidebar';
import Bus from '@/helpers/bus';
import _ from 'lodash';
import Notes from '@/apis/notes';
export default {
    name: 'NoteDetail',
    components: {
        NoteSidebar,
    },
    data() {
        return {
            curNote: {},
            notes: [],
            statusText: '笔记未改动',
        };
    },
    methods: {
        updateNote: _.debounce(function() {
            Notes.updateNote(
                { noteId: this.curNote.id },
                { title: this.curNote.title, content: this.curNote.content }
            )
                .then((data) => {
                    this.statusText = '已保存';
                })
                .catch((data) => {
                    this.statusText = '保存出错';
                });
        }, 300),
        deleteNote() {
            console.log('1');
            Notes.deleteNote({ noteId: this.curNote.id }).then((data) => {
                this.$message.success(data.msg);
                this.notes.splice(this.notes.indexOf(this.cuiNote), 1);
                this.$router.replace({ path: '/note' });
            });
        },
    },
    created() {
        Auth.getInfo().then((res) => {
            if (!res.isLogin) {
                this.$router.push({
                    path: '/login',
                });
            }
        });
        Bus.$once('update:notes', (val) => {
            this.curNote = val.find((note) => note.id == this.$route.query.noteId) || {};
        });
    },

    beforeRouteUpdate(to, from, next) {
        console.log('beforeRouteUpdate');
        this.curNote = this.notes.find((note) => note.id == to.query.noteId) || {};
        next();
    },
};
</script>

<style lang="less" scoped>
@import '~@/assets/css/note-detail.less';
#note {
    display: flex;
    align-items: stretch;
    background-color: #fff;
    flex: 1;
}
</style>

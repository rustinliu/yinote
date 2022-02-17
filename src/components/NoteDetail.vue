<template>
    <div id="note" class="detail">
        <NoteSidebar @update:notes="(val) => (notes = val)"></NoteSidebar>
        <div class="note-detail">
            <div class="note-empty" v-show="!curNote.id">请选择笔记</div>
            <div v-show="curNote.id" class="note-detail-ct">
                <div class="note-bar">
                    <span> 创建日期: {{ curNote.createdAtFriendly }}</span>
                    <span> 更新日期:{{ curNote.updatedAtFriendly }}</span>
                    <span> {{ statusText }}</span>
                    <span class="iconfont icon-delete" @click="onDeleteNote"></span>
                    <span
                        class="iconfont icon-fullscreen"
                        @click="isshowPreview = !isshowPreview"
                    ></span>
                </div>
                <div class="note-title">
                    <input
                        type="text"
                        v-model="curNote.title"
                        @input="onUpdateNote"
                        placeholder="输入标题"
                        @keydown="statusText = '正在输入。。。'"
                    />
                </div>
                <div class="editor">
                    <textarea
                        v-show="!isshowPreview"
                        v-model="curNote.content"
                        @input="onUpdateNote"
                        placeholder="输入内容, 支持 markdown 语法"
                        @keydown="statusText = '正在输入。。。'"
                    ></textarea>
                    <div
                        class="preview markdown-body"
                        v-html="previewContent"
                        v-show="isshowPreview"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Auth from '@/apis/auth';
import NoteSidebar from '@/components/NoteSidebar';
import _ from 'lodash';
import markdownIt from 'markdown-it';
const md = new markdownIt();

import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
    name: 'NoteDetail',
    components: {
        NoteSidebar,
    },

    data() {
        return {
            statusText: '笔记未改动',
            isshowPreview: false,
        };
    },

    methods: {
        ...mapActions(['updateNote', 'deleteNote']),
        ...mapMutations(['setCurNote']),
        onUpdateNote: _.debounce(function() {
            this.updateNote({
                noteId: this.curNote.id,
                title: this.curNote.title,
                content: this.curNote.content,
            })
                .then((data) => {
                    this.statusText = '已保存';
                })
                .catch((data) => {
                    this.statusText = '保存出错';
                });
        }, 300),
        onDeleteNote() {
            this.deleteNote({ noteId: this.curNote.id }).then((data) => {
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
    },

    beforeRouteUpdate(to, from, next) {
        this.setCurNote({ curNoteId: to.query.noteId });
        next();
    },
    computed: {
        ...mapGetters(['notes', 'curNote']),
        previewContent() {
            return md.render(this.curNote.content || '');
        },
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

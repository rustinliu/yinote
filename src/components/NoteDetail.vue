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
                        class="iconfont"
                        :class="isShowPreview ? 'icon-edit' : 'icon-eye'"
                        @click="isShowPreview = !isShowPreview"
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
                    <codemirror
                        v-model="curNote.content"
                        :options="cmOptions"
                        v-show="!isShowPreview"
                        @input="onUpdateNote"
                        @inputRead="statusText = '正在输入...'"
                    ></codemirror>

                    <!-- <textarea
                        v-show="!isshowPreview"
                        v-model="curNote.content"
                        @input="onUpdateNote"
                        placeholder="输入内容, 支持 markdown 语法"
                        @keydown="statusText = '正在输入。。。'"
                    ></textarea> -->
                    <div
                        class="preview markdown-body"
                        v-html="previewContent"
                        v-show="isShowPreview"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NoteSidebar from '@/components/NoteSidebar';
import _ from 'lodash';
import markdownIt from 'markdown-it';
const md = new markdownIt();
import { codemirror } from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/markdown/markdown.js';
import 'codemirror/theme/neat.css';

import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
    name: 'NoteDetail',
    components: {
        NoteSidebar,
        codemirror,
    },

    data() {
        return {
            isShowPreview: false,
            statusText: '笔记未改动',
            cmOptions: {
                tabSize: 4,
                mode: 'text/x-markdown',
                theme: 'neat',
                lineNumbers: false,
                line: true,
                // more codemirror options, 更多 codemirror 的高级配置...
            },
        };
    },

    methods: {
        ...mapActions(['updateNote', 'deleteNote', 'checkLogin']),
        ...mapMutations(['setCurNote']),
        onUpdateNote: _.debounce(function() {
            if (!this.curNote.id) {
                return;
            }
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
                this.$router.replace({
                    path: '/note',
                });
            });
        },
    },
    created() {
        this.checkLogin('/login');
    },

    beforeRouteUpdate(to, from, next) {
        this.setCurNote({ curNoteId: to.query.noteId });
        next();
    },
    computed: {
        ...mapGetters(['notes', 'curNote', 'curBook']),
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

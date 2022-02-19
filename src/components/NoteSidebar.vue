<template>
    <div class="note-sidebar">
        <span class="btn add-note" @click="onAddNote">添加笔记</span>
        <el-dropdown class="notebook-title" @command="handleCommand" placement="bottom">
            <span class="el-dropdown-link">
                {{ curBook.title }} <i class="iconfont icon-down"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                    v-for="notebook in notebooks"
                    :command="notebook.id"
                    :key="notebook.id"
                >
                    {{ notebook.title }}
                </el-dropdown-item>
                <el-dropdown-item command="trash">回收站</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <div class="menu">
            <div>更新时间</div>
            <div>标题</div>
        </div>
        <ul class="notes">
            <li v-for="note in notes" :key="note.id">
                <router-link :to="`/note?noteId=${note.id}&notebookId=${curBook.id}`">
                    <span class="date">{{ note.updatedAtFriendly }}</span>
                    <span class="title">{{ note.title }}</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import Notebooks from '@/apis/notebooks';
import Notes from '@/apis/notes';
import Bus from '@/helpers/bus';
//window.Notes = Notes;

import { mapActions, mapGetters, mapMutations } from 'vuex';
export default {
    created() {
        this.getNotebooks()
            .then(() => {
                this.setCurBook({ notebookId: this.$route.query.notebookId });
                return this.getNotes({ notebookId: this.curBook.id });
            })
            .then(() => {
                this.setCurNote({ curNoteId: this.$route.query.noteId });
                if (!this.$route.query.notebookId) {
                    this.$router.replace({
                        path: '/note',
                        query: {
                            noteId: this.curNote.id,
                            notebookId: this.curBook.id,
                        },
                    });
                }
            });
    },
    data() {
        return {};
    },
    computed: {
        ...mapGetters(['notebooks', 'notes', 'curBook', 'curBookId', 'curNote']),
    },
    methods: {
        ...mapActions(['getNotebooks', 'getNotes', 'addNote']),
        ...mapMutations(['setCurBook', 'setCurNote']),
        handleCommand(notebookId) {
            if (notebookId == 'trash') {
                return this.$router.push({ path: '/trash' });
            }

            this.setCurBook({ notebookId: notebookId });
            this.getNotes({ notebookId }).then(() => {
                this.setCurNote({});
                if (!this.$route.query.notebookId) {
                    this.$router.replace({
                        path: '/note',
                        query: {
                            noteId: this.curNote.id,
                            notebookId: this.curBook.id,
                        },
                    });
                }
            });
        },
        onAddNote() {
            this.addNote({ notebookId: this.curBook.id });
        },
    },
};
</script>

<style lang="less">
@import '~@/assets/css/note-sidebar.less';
</style>

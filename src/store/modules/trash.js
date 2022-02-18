import Trash from '@/apis/trash';
import { Message } from 'element-ui';
const state = {
    trashNotes: null,
    curTrashNoteId: null,
};
const getters = {
    trashNotes: (state) => state.trashNotes || [],
    curTrashNote: (state, getters) => {
        if (!state.curTrashNoteId) return getters.trashNotes[0] || {};
        return getters.trashNotes.find((trashNote) => trashNote.id == state.curTrashNoteId) || {};
    },
    belongTo: (state, getters) => {
        let notebook =
            getters.notebooks.find((notebook) => notebook.id == getters.curTrashNote.notebookId) ||
            {};
        return notebook.title || '';
    },
};
const mutations = {
    setTrashNotes(state, payload) {
        state.trashNotes = payload.trashNotes;
    },
    addTrashNote(state, payload) {
        state.trashNotes.unshift(payload.Note);
    },
    deleteTrashNote(state, payload) {
        state.trashNotes = state.trashNotes.filter((trashNote) => trashNote.id != payload.noteId);
    },
    setCurTrashNote(state, payload) {
        state.curTrashNoteId = payload.curTrashNoteId;
    },
};
const actions = {
    getTrashNotes({ commit }) {
        return Trash.getAll().then((res) => {
            commit('setTrashNotes', { trashNotes: res.data });
        });
    },
    deleteTrashNote({ commit }, { noteId }) {
        return Trash.deleteNote({ noteId }).then((res) => {
            commit('deleteTrashNote', { noteId });
            Message.success(res.msg);
        });
    },
    revertTrashNote({ commit }, { noteId }) {
        return Trash.revertNote({ noteId }).then((res) => {
            commit('deleteTrashNote', { noteId });
            Message.success(res.msg);
        });
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};

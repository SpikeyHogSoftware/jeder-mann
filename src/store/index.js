import { createStore } from 'vuex'

export default createStore({
  state: {
    contactDialogState: false,
    currentSectionId: null,
    contactForm: {
      name: "",
      email: "",
      message: "",
    },
  },
  getters: {
    currentSectionId: (state) => state.currentSectionId,
  },
  mutations: {
    setCurrentSectionId(state, value) {
      state.currentSectionId = value;
    },
  },
  actions: {
  },
  modules: {
  }
})

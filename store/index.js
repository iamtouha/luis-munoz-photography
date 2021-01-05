export default {
  state() {
    return {
      dark: false
    };
  },
  getters: {
    darkMode: ({ dark }) => dark
  },
  mutations: {
    DARK_MODE_TOGGLE(state) {
      state.dark = true;
    },
    LIGHT_MODE_TOGGLE(state) {
      state.dark = false;
    }
  }
};

import { defineStore } from 'pinia';

export const useLoadingStore = defineStore('loading', {
  state: () => {
    return { isLoading: false };
  },
  actions: {
    fetching() {
      this.isLoading = true;
    },
    finish() {
      this.isLoading = false;
    }
  }
});

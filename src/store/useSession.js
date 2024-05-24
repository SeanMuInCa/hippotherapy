import { defineStore } from "pinia-for-react";

const useSessionStore = defineStore({
  state() {
    return {
      sessionList: [
        {
          sessionId: "1",
          date: "2024-05-22",
          end: true,
        },
        {
          sessionId: "2",
          date: "2024-05-23",
          end: true,
        },
        {
          sessionId: "3",
          date: "2024-05-24",
          end: true,
        },
        {
          sessionId: "4",
          date: "2024-05-25",
          end: false,
        },
      ],
    };
  },
  actions: {
    endSession(sessionId) {
      const state = this.$getState();
      state.sessionList.find((session) => session.sessionId === sessionId).end =
        true;

      console.log(state.sessionList);
    },
  },
});

export default useSessionStore;

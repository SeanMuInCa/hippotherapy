import { defineStore } from "pinia-for-react";
import dateFormater from "@/utils/dateFormater.js";
const useSessionStore = defineStore({
  state() {
    return {
      sessionList: {
        0: [
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
        1: [
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
        ],
        2: [
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
        ],
        3: [
          {
            sessionId: "1",
            date: "2024-05-22",
            end: true,
          },
        ],
      },
      chartData: {
        chartData1: [
          {
            name: "assessment1",
            data: [1, 2, 4, 2, 3, 1, 2, 1, 3, 2, 5],
            type: "line",
          },
          {
            name: "assessment2",
            data: [2, 3, 3, 2, 3, 2, 2, 2, 3, 4, 3],
            type: "line",
          },
        ],
        chartData2: [
          {
            name: "assessment1",
            data: [1, 2, 4, 2, 3, 1, 2, 1, 3, 2, 5],
            type: "line",
          },
          {
            name: "assessment2",
            data: [2, 3, 3, 2, 3, 2, 2, 2, 3, 4, 3],
            type: "line",
          },
          {
            name: "assessment3",
            data: [2, 3, 4, 4, 3, 2, 2, 2, 3, 4, 3],
            type: "line",
          },
        ],
        chartData3: [
          {
            name: "assessment1",
            data: [1, 2, 4, 2, 3, 1, 2, 1, 3, 2, 5],
            type: "line",
          },
          {
            name: "assessment2",
            data: [2, 3, 3, 2, 3, 2, 2, 2, 3, 4, 3],
            type: "line",
          },
          {
            name: "assessment3",
            data: [2, 3, 4, 4, 3, 2, 2, 2, 3, 4, 3],
            type: "line",
          },
          {
            name: "assessment4",
            data: [2, 3, 4, 4, 3, 2, 2, 2, 3, 4, 3],
            type: "line",
          },
        ],
      },
    };
  },
  actions: {
    endSession(sessionId) {
      const state = this.$getState();
      state.sessionList.find((session) => session.sessionId === sessionId).end =
        true;

      console.log(state.sessionList);
    },
    startNewSession(patientId) {
      const state = this.$getState();
      state.sessionList[patientId].push({
        sessionId: state.sessionList[patientId].length + 1 + "",
        date: dateFormater(new Date()),
        end: false,
      });
      return state.sessionList[patientId];
    },
    updateChartData(data) {
      const state = this.$getState();
      state.chartData["chartData" + state.chartData.length + 1] = data;
    },
  },
});

export default useSessionStore;

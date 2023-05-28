import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Exercise, LoggedWorkout } from '@/exercise'

type DateWithLogs = { date: string, logs: Array<LoggedWorkout> }

export const useExercisesStore = defineStore('exercises', {
  state: () => ({
    exercises: Array<Exercise>(),
    curId: 0,
    logs: Array<LoggedWorkout>()
  }),
  getters: {
    getExercises: (state) => { return state.exercises; },
    getExerciseById: (state) => (id: number) => {
      return state.exercises.find((e) => e.id == id)
    },
    getLogs: (state) => { return state.logs },
    getLogsSortedByDay: (state) => {
      let logWithDates: Array<DateWithLogs> = []

      state.logs.forEach((l) => {
        const found = logWithDates.find((sorted_l) => sorted_l.date == l.date)
        // date already exists
        if (found) {
          found.logs.push(l)
        }
        // new date found
        else {
          logWithDates.push({ date: l.date, logs: [l]})
        }
      })

      return logWithDates
    },
    getMaxWeightForExercise: (state) => (exercise: Exercise) => {
      const validLogs = state.logs.filter((l) => l.exercise === exercise)
      if (validLogs.length == 0) return 0;

      let max = validLogs[0].repsPerSet[0].weight

      validLogs.forEach((l) => {
        l.repsPerSet.forEach((rps) => {
          if (rps.weight > max) {
            max = rps.weight
          }
        })
      })
      return max
    }
  },
  actions: {
    addExercise(exercise: Exercise) {
      this.exercises.push(exercise)
      exercise.id = this.curId
      this.curId++;
    },
    removeExercise(exercise: Exercise) {
      const i = this.exercises.indexOf(exercise)
      this.exercises.splice(i, 1)
    },
    addLog(log: LoggedWorkout) {
      this.logs.push(log)
    }
  }
})
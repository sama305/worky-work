import { defineStore } from 'pinia'
import { Exercise, LoggedWorkout, type MuscleGroup, Split, Day } from '@/exercise'
import { daysIntoYear } from '@/util'

type DateWithLogs = { date: string, logs: Array<LoggedWorkout> }

export const useExercisesStore = defineStore('exercises', {
  state: () => ({
    exercises: Array<Exercise>(),
    logs: Array<LoggedWorkout>(),
    splits: Array<Split>(),
    activeSplit: {} as Split,
    curId: 0,
    userOffset: 0
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
    },
    getLatestMaxForExercise: (state) => (exercise: Exercise) => {
      const mostRecentLog = state.logs.reverse().find((l) => l.exercise === exercise)
      if (!mostRecentLog) return 0;
    
      let max = mostRecentLog.repsPerSet[0].weight

      mostRecentLog.repsPerSet.forEach((rps) => {
        if (rps.weight > max)
          max = rps.weight
      })

      return max
    },
    getSplits: (state) => {
      return state.splits
    },
    getActiveSplit: (state) => {
      return state.activeSplit
    },
    getCurrentDayOfActiveSplit(): Day | null {
      if (this.activeSplit.days) {
        return this.activeSplit.days[this.offsetDay] as Day
      }
      return null
    },
    globalDay: (state) => {
      return daysIntoYear(new Date()) % state.activeSplit.days.length
    },
    offsetDay(): number {
      return (daysIntoYear(new Date())+ this.userOffset) % this.activeSplit.days.length
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
    editExercise(exercise: Exercise, 
                 newName: string, 
                 newMuscleGroup: MuscleGroup,
                 newSets: number,
                 newReps: number)
    {
      exercise.name = newName
      exercise.muscleGroup = newMuscleGroup
      exercise.sets = newSets
      exercise.reps = newReps
    },
    addLog(log: LoggedWorkout) {
      this.logs.push(log)
    },
    addSplit(split: Split) {
      this.splits.push(split)
    },
    setActiveSplit(split: Split) {
      this.activeSplit = split
    },
    setOffset(desiredDay: number) {
      this.userOffset = desiredDay - this.globalDay
    }
  }
})

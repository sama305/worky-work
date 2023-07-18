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
    userOffset: 0,
    currentUser: 'sam'
  }),
  getters: {
    // TODO: change all getters so that they get updated versions of what they
    //       are retrieving
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
      const validLogs = state.logs.filter((l) => l.exercise.id=== exercise.id)
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
      const mostRecentLog = state.logs.reverse().find((l) => l.exercise.id === exercise.id)
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
    async addExercise(exercise: Exercise) {
      this.exercises.push(exercise)
      exercise.id = this.getMaxExerciseId() + 1;
      await this.updateExercises()
    },
    async removeExercise(exercise: Exercise) {
      const i = this.exercises.indexOf(exercise)
      this.exercises.splice(i, 1)
      await this.updateExercises()
    },
    getMaxExerciseId() {  // TODO: move this to getters?
      let max = 0
      this.exercises.forEach((e) => {
        if (e.id > max) {
          max = e.id
        }
      })
      return max
    },
    async editExercise(exercise: Exercise, 
                 newName: string, 
                 newMuscleGroup: MuscleGroup,
                 newSets: number,
                 newReps: number)
    {
      exercise.name = newName
      exercise.muscleGroup = newMuscleGroup
      exercise.sets = newSets
      exercise.reps = newReps
      await this.updateExercises()
    },
    async addLog(log: LoggedWorkout) {
      this.logs.push(log)
      await this.updateLogs()
    },
    async addSplit(split: Split) {
      this.splits.push(split)
      await this.updateSplits()
    },
    async setActiveSplit(split: Split) {
      this.activeSplit = split
      await this.updateUser()
    },
    async setOffset(desiredDay: number) {
      this.userOffset = desiredDay - this.globalDay
      await this.updateUser()
    },


    // updating/fetching items from server
    async updateExercises() {
      await fetch(`http://localhost:8080/${this.currentUser}/exercises`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.exercises)
      })
      .then((res) => res.json())
      .then((jsonData) => {
          window.console.log(jsonData);
      })
      .catch(e => {
        console.error(e)
      });
    },
    async fetchExercises() {
      await fetch(`http://localhost:8080/${this.currentUser}/exercises`)
      .then((res) => {
        return res.json()
      })
      .then((jsonData) => {
        this.exercises = jsonData
      });
    },
    async updateSplits() {
      await fetch(`http://localhost:8080/${this.currentUser}/splits`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.splits)
      })
      .then((res) => res.json())
      .then((jsonData) => {
          window.console.log(jsonData);
      })
      .catch(e => {
        console.error(e)
      });
    },
    async fetchSplits() {
      await fetch(`http://localhost:8080/${this.currentUser}/splits`)
      .then((res) => {
        return res.json()
      })
      .then((jsonData) => {
        this.splits = jsonData
      })
      .catch(e => {
        console.error(e)
      })
    },
    async updateUser() {
      await fetch(`http://localhost:8080/${this.currentUser}`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          activeSplit: this.activeSplit,
          userOffset: this.userOffset,
        })
      })
      .then((res) => res.json())
      .then((jsonData) => {
          window.console.log(jsonData);
      })
      .catch(e => {
        console.error(e)
      });
    },
    async fetchUser() {
      await fetch(`http://localhost:8080/${this.currentUser}`)
      .then((res) => {
        return res.json()
      })
      .then((jsonData) => {
        this.activeSplit = jsonData.activeSplit
        this.userOffset  = jsonData.userOffset
      })
      .catch(e => {
        console.error(e)
      })
    },
    async updateLogs() {
      await fetch(`http://localhost:8080/${this.currentUser}/logs`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.logs)
      })
      .then(res => res.json())
      .catch(e => {throw e})
    },
    async fetchLogs() {
      await fetch(`http://localhost:8080/${this.currentUser}/logs`)
      .then(res => {
        return res.json()
      })
      .then(jsonData => {
        this.logs = jsonData
      })
      .catch(e => {
        console.error(e)
      })
    }
  }
})

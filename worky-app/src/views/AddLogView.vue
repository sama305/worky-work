<template>
    <div class="addExerciseInput">
        <div>
            <span>
                exercise:
                <select v-model="exercise_" @change="resetSetsReps">
                    <option :value="null">please select an exercise</option>
                    <option v-for="e in getExercises" :value="e">
                        {{ e.name }} [id:{{e.id}}]
                    </option>
                </select>
            </span>
        </div>
        <div>
            reps & weight (per set):
            <ol>
                <li v-for="sr in exercise_?.sets">
                    <input placeholder="4"
                           type="number"
                           v-model="setsreps_[sr-1].reps"
                           class="smallNumInput"/>
                    @
                    <input placeholder="123" 
                           type="number"
                           v-model="setsreps_[sr-1].weight"
                           class="largeNumInput"/>
                </li>
            </ol>
        </div>
        <RouterLink to="/logs" custom v-slot="{ navigate }">
            <button @click="addLog(navigate)" :disabled="cannotAdd">
                add new log
            </button>
        </RouterLink>
    </div>
</template>


<script lang="ts">
import { mapState } from 'pinia';
import { useExercisesStore } from '@/stores/exerciseStore';
import { Exercise, LoggedWorkout } from '@/exercise'
import type { SetData } from '@/exercise'

export default {
    setup() {
        const store = useExercisesStore()
        return {
            store
        }
    },
    data() {
        return {
            exercise_: null as Exercise | null,
            setsreps_: Array<SetData>()
        }
    },
    computed: {
        ...mapState(useExercisesStore, ['getExercises']),
        cannotAdd() {
            return false
        }
    },
    methods: {
        resetSetsReps() {
            this.setsreps_ = new Array<SetData>(this.exercise_?.sets as number)
            for (let i = 0; i < (this.exercise_?.sets as number); i++) {
                let sr = {
                    reps: this.exercise_?.reps as number,
                    weight: this.store.getLatestMaxForExercise(this.exercise_ as Exercise)
                } 
                this.setsreps_[i] = sr
            }
        },
        addLog(callback: Function) {
            let l = new LoggedWorkout(this.exercise_ as Exercise, this.setsreps_)
            this.store.addLog(l)
            callback()
        }
    }
}
</script>
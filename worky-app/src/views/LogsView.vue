<!-- 
TODO:
- add id to the right side of each title (for removed exercises)

-->

<template>
    <div>
        <div class="logWrapper" v-for="ld in store.getLogsSortedByDay">
            <div>
                <span>
                    <p style="font-size: 20px; margin: 0; margin-bottom: 10px">
                        {{ ld.date }}
                    </p>
                </span>
            </div>
            <div class="logBody">
                <div v-for="l in ld.logs">
                    <p><b>{{ l.exercise.name }}</b></p>
                    <table style="margin-bottom: 5px;">
                        <tr>
                            <td>sets</td>
                            <td v-for="s in l.exercise.sets"><i>{{ s }}</i></td>
                        </tr>
                        <tr>
                            <td>reps</td>
                            <td v-for="rps in l.repsPerSet"><i>{{ rps.reps }}</i></td>
                        </tr>
                        <tr>
                            <td>weight</td>
                            <td v-for="rps in l.repsPerSet" :class="checkWorkoutMax(rps.weight, l.repsPerSet)"><i>{{ rps.weight }}</i></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import type { LoggedWorkout, SetData } from '@/exercise';
import { useExercisesStore } from '@/stores/exerciseStore';

export default {
    setup() {
        const store = useExercisesStore()
        return {
            store
        }
    },
    methods: {
        checkWorkoutMax(weight: number, log: Array<SetData>) {
            const weights: number[] = log.map((l) => l.weight)
            if (Math.max(...weights) == weight) {
                return "boldWeight"
            }
            return ""
        }
    }
}
</script>

<style scoped>

.boldWeight {
    font-weight: bold;
}
</style>
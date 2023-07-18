<template>
    <a href="google.com" style="margin-bottom: 0px;" ><b>{{ log.exercise.name }}</b></a>
    <table style="margin-bottom: 5px;">
        <tr>
            <th>set #</th>
            <th>reps</th>
            <th>wgt</th>
        </tr>
        <tr v-for="s in log.exercise.sets">
            <td>
                <i>{{ s }}</i>
            </td>
            <td>
                <i>{{ log.repsPerSet[s-1].reps }}</i>
            </td>
            <td :class="checkWorkoutMax(log.repsPerSet[s-1].weight, log.repsPerSet)">
                <i>{{ log.repsPerSet[s-1].weight }}</i>
            </td>
        </tr>
    </table>
</template>

<script lang="ts">
import { LoggedWorkout } from '@/exercise';
import type { SetData } from '@/exercise';

export default {
    props: {
        log: {
            type: LoggedWorkout,
            required: true
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
td {
    width: 75px;
    text-align: end;
}
</style>
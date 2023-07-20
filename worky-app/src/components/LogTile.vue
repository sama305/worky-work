<template>
    <div>
        <RouterLink :to="'exercises/' + log.exercise.id" class="rawLink exerciseLink">
            {{ log.exercise.name }}
        </RouterLink>
        <table style="margin-bottom: 5px;">
            <tr>
                <th>set #</th>
                <th>reps</th>
                <th>wgt</th>
            </tr>
            <tr v-for="s in log.exercise.sets">
                <td class="monoInfoCell cellEnd">
                    <i>{{ s }}</i>
                </td>
                <td class="monoInfoCell cellEnd">
                    <i>{{ log.repsPerSet[s-1].reps }}</i>
                </td>
                <td :class="checkWorkoutMax(log.repsPerSet[s-1].weight, log.repsPerSet) + ' monoInfoCell cellEnd'">
                    <i>{{ log.repsPerSet[s-1].weight }}</i>
                </td>
            </tr>
        </table>
    </div>
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
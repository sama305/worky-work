<template>
    <p v-if="header" style="margin: 0; margin-bottom: 0">{{ split.name }} ({{ split.days.length }} days)</p>
    <table style="margin-bottom: 5px">
        <tr>
            <th v-for="day in split.days">{{ day.name }}</th>
        </tr>
        <tr v-for="i in getMaxExercisesInSplit(split)">
            <td v-for="d in split.days" class="monoInfoCell" :title="d.exercises[i-1] ? d.exercises[i-1].name : ''">
                <template v-if="d.exercises[i-1]">
                        <RouterLink :to="`/exercises/${d.exercises[i-1].id}`" class="rawLink exerciseLink">
                            {{ d.exercises[i-1].name }}
                        </RouterLink>
                </template>
                <template v-else>
                        ~
                </template>
            </td>
        </tr>
    </table>
</template>

<script lang="ts">
import { Split } from '@/exercise';

export default {
    props: {
        split: {
            type: Split,
            required: true
        },
        header: {
            type: Boolean,
            required: false,
            default: true
        }
    },
    methods: {
        getMaxExercisesInSplit(s: Split): number {
            let max: number = s.days[0].exercises.length
            if (s.days.length > 1) {
                s.days.forEach(d => {
                    if (d.exercises.length > max) {
                        max = d.exercises.length
                    }
                })
            }
            return max
        }
    }
}
</script>
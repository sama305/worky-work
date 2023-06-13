<template>
    <p style="margin: 0; margin-bottom: 0"><b><i>{{ split.name }}</i> ({{ split.days.length }} days)</b></p>
    <table style="margin-bottom: 5px">
        <tr v-for="day in split.days">
            <td>{{ day.name }}</td>
            <td v-for="e in day.exercises">
                <RouterLink :to="`/exercises/${e.id}`" class="rawLink">
                    {{ e.name }}
                </RouterLink>
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
        }
    }
}
</script>
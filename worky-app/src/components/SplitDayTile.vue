<template>
    <p style="margin: 0; margin-bottom: 0"><b><i>{{ day.name }}</i></b></p>
    <table style="margin-bottom: 5px">
        <tr v-for="(e, i) in day.exercises" :key="e.name">
            <td>workout {{ i+1 }}</td>
            <td>
                <RouterLink :to="`/exercises/${e.id}`" class="rawLink">
                    {{ e.name }}
                </RouterLink>
            </td>
        </tr>
    </table>
</template>

<script lang="ts">
import { Day } from '@/exercise';
import { useExercisesStore } from '@/stores/exerciseStore';

export default {
    setup() {
        const store = useExercisesStore()
        return {
            store
        }
    },
    props: {
        day: {
            type: Day,
            required: true
        }
    }
}
</script>
<template>
    <div class="header">
        <div style="font-size: 30px;">
            <i>{{ exercise_?.name }}</i> exercise info
        </div>
        <div>
            <tt>[id:{{ exercise_?.id }}]</tt>
        </div>
    </div>
    <br>
    <div class="info">
        <p><b>general</b></p>
        <table>
            <tr>
                <td>muscle group</td>
                <td><i>{{ exercise_?.muscleGroup.name }}</i></td>
            </tr>
            <tr>
                <td>sets</td>
                <td><i>{{ exercise_?.sets}}</i></td>
            </tr>
            <tr>
                <td>reps per set</td>
                <td><i>{{ exercise_?.reps }}</i></td>
            </tr>
        </table>
        <br>

        <p><b>stats</b></p>
        <table>
            <tr>
                <td>max weight</td>
                <td><i>{{ maxWeight }}lbs</i></td>
            </tr>
            <tr>
                <td>latest weight</td>
                <td><i>{{ latestMaxWeight }}lbs</i></td>
            </tr>
            <tr>
                <td>first logged</td>
                <td><a><i>05-30-2023</i></a></td>
            </tr>
            <tr>
                <td>created</td>
                <td><i>05-28-2023</i></td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">
import type { Exercise } from '@/exercise';
import { useExercisesStore } from '@/stores/exerciseStore';

export default {
    setup() {
        const store = useExercisesStore()
        return {
            store
        }
    },
    computed: {
        exercise_() {
            return this.store.getExerciseById(parseInt(this.$route.params.id as string))
        },
        maxWeight() {
            const maxWeight = this.store.getMaxWeightForExercise(this.exercise_ as Exercise)
            return maxWeight
        },
        latestMaxWeight() {
            const latestMax = this.store.getLatestMaxForExercise(this.exercise_ as Exercise)
            return latestMax
        }
    }
}
</script>

<style scoped>

.header {
    display: flex;
    justify-content: space-between;
}

.info > p {
    margin: 0;
}
</style>
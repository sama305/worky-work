<template>
    <div v-if="!exercise_">
        <pre>sorry, the exercise with [id:{{ $route.params.id }}] doesn't exist</pre>
    </div>
    <div v-else>
        <div class="header">
            <div style="font-size: 30px;">
                <i>{{ exercise_?.name }}</i> exercise info
            </div>
            <div>
                <tt>[id:{{ exercise_?.id }}]</tt>
            </div>
        </div>
        <RouterLink :to="`/exercises/edit/${exercise_?.id}`" custom v-slot="{ navigate }">
            <button  style="float: right" @click="editExercise(navigate)">edit data</button>
        </RouterLink>
        <br>
        <div class="info">
            <!-- <p class="tableHeader"><b>general</b></p> -->
            <table>
                <tr>
                    <th>group</th>
                    <th>sets</th>
                    <th>reps</th>
                </tr>
                <tr>
                    <td><i>{{ exercise_?.muscleGroup.name }}</i></td>
                    <td><i>{{ exercise_?.sets}}</i></td>
                    <td><i>{{ exercise_?.reps }}</i></td>
                </tr>
            </table>
            <br>
            <!-- <p class="tableHeader"><b>stats</b></p> -->
            <table>
                <tr>
                    <th>max wgt</th>
                    <th>latest</th>
                    <th>created</th>
                </tr>
                <tr>
                    <td v-if="maxWeight != 0"><i>{{ maxWeight }}lbs</i></td>
                    <td v-else><i>no data</i></td>
                    <td v-if="latestMaxWeight != 0"><i>{{ latestMaxWeight }}lbs</i></td>
                    <td v-else><i>no data</i></td>
                    <td><i>{{ exercise_?.created }}</i></td>
                </tr>
                <tr>
                </tr>
            </table>
        </div>
        <br>
        <RouterLink to="/exercises" custom v-slot="{ navigate }">
            <button class="removeButton" @click="removeExercise(navigate)">remove exercise</button>
        </RouterLink>
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
    },
    methods: {
        removeExercise(navCallback: Function) {
            this.store.removeExercise(this.exercise_ as Exercise)
            navCallback()
        },
        editExercise(navCallback: Function) {
            navCallback()
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

.tableHeader {
    text-decoration: underline;
}
</style>
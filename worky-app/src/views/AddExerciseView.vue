<template>
    <div class="addExerciseInput">
        <div>
            <span>
                name: <input placeholder="lateral raise ..."
                             v-model="name_"/>
            </span>
        </div>
        <div>
            <span>
                sets/reps: 
                <input class="smallNumInput" 
                       type="number"
                       placeholder="4"
                       v-model="sets_"/>
                x
                <input class="smallNumInput" 
                       type="number" 
                       placeholder="8"
                       v-model="reps_"/>
            </span>
        </div>
        <div>
            muscle group: 
            <select v-model="muscleGroup_">
                <!-- <option disabled value="">Please select one</option> -->
                <option v-for="mg in muscleGroups" :value="mg">
                    {{ mg.name }}
                </option>
            </select>
        </div>
        <RouterLink to="/exercises" custom v-slot="{ navigate }">
            <!-- new exercise -->
            <button @click="addExercise(navigate)" :disabled="cannotAdd">
                add new exercise
            </button>
        </RouterLink>
    </div>
</template>

<script lang="ts">
import { muscleGroups, Exercise } from '@/exercise';
import { useExercisesStore } from '@/stores/exerciseStore';

export default {
    setup() {
        const store = useExercisesStore()
        return {
            store
        }
    },
    data() {
        return {
            muscleGroups: muscleGroups,
            name_: '',
            sets_: 4,
            reps_: 8,
            muscleGroup_: muscleGroups[0]
        }
    },
    methods: {
        addExercise(navCallback: Function) {
            let e = new Exercise(this.name_, this.muscleGroup_, this.sets_, this.reps_)
            this.store.addExercise(e)
            navCallback()
        }
    },
    computed: {
        cannotAdd() {
            return !(
                this.name_ &&
                this.reps_ &&
                this.sets_
            );
        }
    }
}
</script>


<style scoped>
</style>
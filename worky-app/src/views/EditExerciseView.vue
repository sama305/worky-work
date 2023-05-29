<template>
    <div class="addExerciseInput">
        <div>
            <span>
                name: <input placeholder="lateral raise ..."
                             v-model="newName_"/>
            </span>
        </div>
        <div>
            <span>
                sets/reps: 
                <input class="smallNumInput" 
                       type="number"
                       placeholder="4"
                       v-model="newSets_"/>
                x
                <input class="smallNumInput" 
                       type="number" 
                       placeholder="8"
                       v-model="newReps_"/>
            </span>
        </div>
        <div>
            muscle group: 
            <select v-model="newMuscleGroup_">
                <!-- <option disabled value="">Please select one</option> -->
                <option v-for="mg in muscleGroups" :value="mg">
                    {{ mg.name }}
                </option>
            </select>
        </div>
        <RouterLink to="/exercises" custom v-slot="{ navigate }">
            <!-- new exercise -->
            <button :disabled="!canApply" @click="editExercise(navigate)">
                apply edits
            </button>
        </RouterLink>
    </div>
</template>

<script lang="ts">
import { muscleGroups, Exercise, type MuscleGroup } from '@/exercise';
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
            newName_: '',
            newSets_: 4,
            newReps_: 8,
            newMuscleGroup_: muscleGroups[0]
        }
    },
    created() {
        this.newName_ = this.exercise_?.name as string
        this.newSets_ = this.exercise_?.sets as number
        this.newReps_ = this.exercise_?.reps as number
        this.newMuscleGroup_ = this.exercise_?.muscleGroup as MuscleGroup
    },
    methods: {
        editExercise(navCallback: Function) {
            this.store.editExercise(this.exercise_ as Exercise,
                                    this.newName_,
                                    this.newMuscleGroup_,
                                    this.newSets_,
                                    this.newReps_)
            navCallback()
        }
    },
    computed: {
        exercise_() {
            return this.store.getExerciseById(parseInt(this.$route.params.id as string))
        },
        canApply() {
            return this.newName_ != this.exercise_?.name ||
                   this.newSets_ != this.exercise_?.sets ||
                   this.newReps_ != this.exercise_?.reps ||
                   this.newMuscleGroup_ != this.exercise_?.muscleGroup
        }
    }
}
</script>
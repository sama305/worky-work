<template>
    <div class="buttonsSidebar">
        <div>
            <input placeholder="search ..." v-model="searchTerm"/>
            <select v-model="muscleFilter">
                <option value="">sort by muscle</option>
                <option v-for="mg in muscleGroups" :value="mg.name">
                    {{ mg.name }}
                </option>
            </select>
        </div>
        <RouterLink to="/exercises/add">
            <button>
                new exercise
            </button>
        </RouterLink>
    </div>
    <div style="width: 75%">
        <RouterLink v-for="e in filteredExercises" :to="`/exercises/${e.id}`" custom v-slot="{ navigate }">
            <div class="exerciseTile" @click="navigate">
                <div>{{ e.name }}</div>
                <div>
                    <tt>[{{e.muscleGroup.name}}]</tt>
                </div>
            </div>
        </RouterLink>
    </div>
</template>

<script lang="ts">
import { Exercise , muscleGroups} from '@/exercise';
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
            searchTerm: '',
            muscleFilter: '',
            muscleGroups: muscleGroups
        }
    },
    computed: {
        filteredExercises() {
            return this.store.getExercises.filter((e) => {
                return (e.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || !this.searchTerm) &&
                       (e.muscleGroup.name == this.muscleFilter || !this.muscleFilter)
                       
            })
        }
    }
}
</script>
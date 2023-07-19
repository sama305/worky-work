<template>
    <div v-if="!split_">
        <pre>sorry, the split with [id:{{ $route.params.id }}] doesn't exist</pre>
    </div>
    <div v-else>
        <SplitTileVue :split="split_" :header="false"></SplitTileVue>
    </div>
</template>

<script lang="ts">
import { useExercisesStore } from '@/stores/exerciseStore';
import SplitTileVue from '@/components/SplitTile.vue';

export default {
    setup() {
        const store = useExercisesStore()
        return {
            store
        }
    },
    computed: {
        split_() {
            return this.store.getSplitById(parseInt(this.$route.params.id as string))
        },
    },
    methods: {
        removeSplit(navCallback: Function) {
            // this.store.removeExercise(this.exercise_ as Exercise)
            navCallback()
        },
        editExercise(navCallback: Function) {
            navCallback()
        }
    },
    components: {
        SplitTileVue
    }
}
</script>
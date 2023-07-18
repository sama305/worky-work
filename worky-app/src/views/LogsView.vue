<!-- 
TODO:
- add id to the right side of each title (for removed exercises)

-->

<template>
    <div>
        <div class="logWrapper" v-for="ld in store.getLogsSortedByDay">
            <div>
                <span>
                    <p style="font-size: 20px; margin: 0; margin-bottom: 10px">
                        {{ ld.date }}
                    </p>
                </span>
            </div>
            <div class="logBody">
                <LogTile :log="l" v-for="l in ld.logs">
                </LogTile>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import type { LoggedWorkout, SetData } from '@/exercise';
import { useExercisesStore } from '@/stores/exerciseStore';
import LogTile from '@/components/LogTile.vue';

export default {
    setup() {
        const store = useExercisesStore()
        return {
            store
        }
    },
    components: {
        LogTile
    }
}
</script>
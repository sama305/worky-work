<!--

split ideas:
- set active split and manually set current day
- top of screen should say "today is leg day [via push-pull-leg]" etc.
- current day is (day of the year) % (# of days in split) + userOffset
- when adding exercises to workdays, there should be a select that has by
  default the option "add exercise". when you change the option, put another
  option for "add exercise" below it. at this point, if you click an active
  exercise, there should be a new option "remove". if you select this, the
  exercise is removed from the list

-->

<template>
    <div>
        <div class="buttonSidebar">
            <RouterLink to="/splits/add" custom v-slot="{navigate}">
                <button style="float: right" @click="navigate">new split</button>
            </RouterLink>
        </div>
        <div class="splitsWrapper" v-for="split in store.getSplits">
            <SplitTileVue :split="split"/>
            <br>
        </div>
    </div>
</template>

<script lang="ts">
import SplitTileVue from '@/components/SplitTile.vue';
import { useExercisesStore } from '@/stores/exerciseStore';

export default {
    setup() {
        const store = useExercisesStore();
        return {
            store
        };
    },
    components: { SplitTileVue }
}
</script>
<template>
  <div style="float: right">
    <tt>active split: </tt>
    <select v-model="store.activeSplit">
      <option :value="{}">none</option>
      <option v-for="s in store.getSplits" :value="s">{{ s.name }}</option>
    </select>
    <div v-if="JSON.stringify(store.getActiveSplit) !== '{}'">
      <tt>manually set day: </tt>
      <select @change="onChangeDesiredDay($event)">
        <option v-for="(d, i) in store.activeSplit.days" :key="d.name" :value="i">
          {{ (i+1) + " - " + d.name }}
        </option>
      </select>
    </div>
  </div>
  <h2><i>today...</i></h2>
  <div v-if="store.getActiveSplit">
    <SplitDayTile v-if="store.getCurrentDayOfActiveSplit" :day="store.getCurrentDayOfActiveSplit" />
  </div>
</template>

<script lang="ts">
import SplitDayTile from '@/components/SplitDayTile.vue';
import SplitTile from '@/components/SplitTile.vue';
import type { Day, Split } from '@/exercise';
import { useExercisesStore } from '@/stores/exerciseStore';

export default {
    setup() {
        const store = useExercisesStore();
        return {
            store
        };
    },
    data() {
        return {
            activeSplit: {}
        };
    },
    methods: {
      onChangeDesiredDay(e: Event) {
        this.store.setOffset(e.target?.value);
        console.log(this.store.userOffset);
      }
    },
    components: { SplitTile, SplitDayTile },
    watch: {
      
    }
}
</script>
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
            <div>
                <span>
                    <p style="font-size: 20px; margin: 0; margin-bottom: 10px">
                        <i>{{ split.name }}</i> split ({{ split.days.length }} days)
                    </p>
                </span>
            </div>
            <div class="splitsBody">
                <p style="margin: 0; margin-bottom: 0"><b>schedule</b></p>
                <table style="margin-bottom: 5px; width: 100%">
                    <tr v-for="day in split.days">
                        <td>{{ day.name }}</td>
                        <td v-for="e in day.exercises">
                            <RouterLink :to="`/exercises/${e.id}`" class="rawLink">
                                {{ e.name }}
                            </RouterLink>
                        </td>
                    </tr>
                </table>
            </div>
            <br>
        </div>
    </div>
</template>

<script lang="ts">
import { useExercisesStore } from '@/stores/exerciseStore';

export default {
    setup() {
        const store = useExercisesStore()
        return {
            store
        }
    }
}
</script>
<!--

# of days: [3]

1. name: ___ type: [work day]
   exercises:
     1. blah
     2. [add an exercise]
2. type: [rest day]
3. etc....

-->

<template>
    <div class="addExerciseInput">
        <div>
            <span>
                name: <input placeholder="arnold split ..."
                             v-model="name_"/>
            </span>
        </div>
        <div>
            <span>
                # of days: <input type="number" 
                                  class="smallNumInput"
                                  min="0"
                                  max="10"
                                  v-model="numDays"/>
            </span>
            <br>
            <br>
            <div>
                <div v-for="i in numDays">
                    <select v-model="dayTypes[i-1]" @change="handleDays(numDays)">
                        <option value="" disabled>pick day type</option>
                        <option value="restday">rest day</option>
                        <option value="workday">work day</option>
                    </select>
                    <div v-if="dayTypes[i-1] === 'workday'" style="margin-bottom: 10px; margin-left: 20px;">
                        <tt>day name: </tt><input placeholder="push day ..." v-model="days[i-1].name"/><br>
                        <tt># of exercises: </tt><input placeholder="3"
                               v-model="days[i-1].exercises.length"
                               type="number"
                               class="smallNumInput"
                               min="1"/><br>
                        <select v-if="store.getExercises.length > 0"  v-for="j in days[i-1].exercises.length" v-model="days[i-1].exercises[j-1]">
                            <option :value="undefined" disabled>select an exercise</option>
                            <option v-for="e in store.getExercises" :value="e">
                            {{ e.name }}
                            </option>
                        </select>
                        <tt v-else>sorry, no exercises exist yet</tt>
                    </div>
                </div>
            </div>
        </div>
        <RouterLink to="/splits" custom v-slot="{navigate}">
            <button :disabled="!canAddSplit" @click="addSplit(navigate)">add new split</button>
        </RouterLink>
    </div>
</template>

<script lang="ts">
import { Day, Split, RestDay } from '@/exercise';
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
            name_: '',
            numDays: 3,
            days: Array<Day>(),
            dayTypes: Array<string>()
        }
    },
    created() {
        this.handleDays(this.numDays)
    },
    methods: {
        onChange(e: Event, index: number) {
            if (!e.target?.value)
                return

            this.days[index].exercises.push(e.target?.value)
        },
        handleDays(newNumDays: number) {
            this.days.length = newNumDays
            this.dayTypes.length = newNumDays

            for (let i = 0; i < newNumDays; i++) {
                if (this.dayTypes[i] === 'restday') {
                    this.days[i] = new RestDay()
                }
                if (!this.days[i]) {
                    let d: Day = new Day('', [])
                    d.exercises.length = 1
                    this.days[i] = d
                    this.dayTypes[i] = ''
                }          
            }
        },
        addSplit(navCallback: Function) {
            let s = new Split(this.name_, this.days)
            this.store.addSplit(s)
            navCallback()
        }
    },
    watch: {
        numDays(newNumDays, oldNumDays) {
            this.handleDays(newNumDays)
        }
    },
    computed: {
        canAddSplit() {
            let val: boolean = true
            this.days.forEach((d) => {
                if (!d.name)
                    val = false
            })
            return val && this.name_
        }
    }
}
</script>
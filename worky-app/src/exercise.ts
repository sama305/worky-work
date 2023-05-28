export class Exercise {
    name: string
    muscleGroup: MuscleGroup
    id: number
    sets: number
    reps: number

    constructor(name: string, muscleGroup: MuscleGroup, sets: number, reps: number) {
        this.name = name;
        this.muscleGroup = muscleGroup;
        this.id = 0
        this.sets = sets
        this.reps = reps
    }
}

export type MuscleGroup = { name: string }

export const muscleGroups: Array<MuscleGroup> = [
    { name: 'biceps' },
    { name: 'triceps' },
    { name: 'upper back' },
    { name: 'lower back' },
    { name: 'deltoids' },
    { name: 'chest' },
    { name: 'abs' },
    { name: 'quads' },
    { name: 'calves' },
    { name: 'glutes' },
    { name: 'other' },
]

export class LoggedWorkout {
    readonly date: string
    constructor(readonly exercise: Exercise, readonly repsPerSet: Array<SetData>) {
        this.date = new Date().toLocaleDateString().split('/').join('-')
    }
}

export type SetData = { reps: number, weight: number }
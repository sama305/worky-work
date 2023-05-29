export class Exercise {
    name: string
    muscleGroup: MuscleGroup
    id: number
    sets: number
    reps: number
    readonly created: string

    constructor(name: string, muscleGroup: MuscleGroup, sets: number, reps: number) {
        this.name = name;
        this.muscleGroup = muscleGroup;
        this.id = 0
        this.sets = sets
        this.reps = reps
        this.created = new Date().toLocaleDateString().split('/').join('-')
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

export class Split {
    name: string
    days: Array<Day>
    constructor(name: string, days: Array<Day>) {
        this.name = name
        this.days = days
    }
}

export class Day {
    name: string
    exercises: Array<Exercise>
    constructor(name: string, exercises: Array<Exercise>) {
        this.name = name
        this.exercises = exercises
    }
}

export class RestDay extends Day {
    constructor() {
        super('rest', [])
    }
}
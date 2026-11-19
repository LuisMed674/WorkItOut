// [name, type, equipment] — type: 'c' compound, 'i' isolation, null = cardio
export const CATALOG = [
  { muscle: 'Chest', icon: 'heart-pulse', items: [
    ['Barbell Bench Press','c','Barbell'],['Incline Bench Press','c','Barbell'],['Decline Bench Press','c','Barbell'],
    ['Dumbbell Fly','i','Dumbbells'],['Cable Crossover','i','Cable'],['Push-Up','c','Bodyweight'],
    ['Dumbbell Press','c','Dumbbells'],['Pec Deck','i','Machine']] },
  { muscle: 'Back', icon: 'arrows-expand', items: [
    ['Deadlift','c','Barbell'],['Barbell Row','c','Barbell'],['Pull-Up','c','Bodyweight'],['Lat Pulldown','c','Cable'],
    ['Seated Cable Row','c','Cable'],['T-Bar Row','c','Barbell'],['Dumbbell Row','c','Dumbbells'],
    ['Face Pull','i','Cable'],['Straight-Arm Pulldown','i','Cable']] },
  { muscle: 'Shoulders', icon: 'arrows-angle-expand', items: [
    ['Overhead Press','c','Barbell'],['Dumbbell Shoulder Press','c','Dumbbells'],['Lateral Raise','i','Dumbbells'],
    ['Front Raise','i','Dumbbells'],['Reverse Fly','i','Dumbbells'],['Arnold Press','c','Dumbbells'],
    ['Upright Row','c','Barbell'],['Cable Lateral Raise','i','Cable']] },
  { muscle: 'Biceps', icon: 'arrow-up', items: [
    ['Barbell Curl','i','Barbell'],['Dumbbell Curl','i','Dumbbells'],['Hammer Curl','i','Dumbbells'],
    ['Incline Dumbbell Curl','i','Dumbbells'],['Cable Curl','i','Cable'],['Preacher Curl','i','Barbell'],
    ['Concentration Curl','i','Dumbbells']] },
  { muscle: 'Triceps', icon: 'arrow-down', items: [
    ['Tricep Pushdown','i','Cable'],['Skull Crusher','i','Barbell'],['Close-Grip Bench Press','c','Barbell'],
    ['Overhead Tricep Extension','i','Dumbbells'],['Dips','c','Bodyweight'],['Diamond Push-Up','c','Bodyweight'],
    ['Kickback','i','Dumbbells']] },
  { muscle: 'Legs', icon: 'person-walking', items: [
    ['Barbell Back Squat','c','Barbell'],['Front Squat','c','Barbell'],['Leg Press','c','Machine'],
    ['Leg Extension','i','Machine'],['Hack Squat','c','Machine'],['Bulgarian Split Squat','c','Dumbbells'],
    ['Walking Lunge','c','Dumbbells'],['Goblet Squat','c','Dumbbells']] },
  { muscle: 'Hamstrings', icon: 'activity', items: [
    ['Romanian Deadlift','c','Barbell'],['Lying Leg Curl','i','Machine'],['Seated Leg Curl','i','Machine'],
    ['Nordic Curl','c','Bodyweight'],['Stiff-Leg Deadlift','c','Barbell'],['Good Morning','c','Barbell']] },
  { muscle: 'Glutes', icon: 'chevron-up', items: [
    ['Hip Thrust','c','Barbell'],['Glute Bridge','c','Bodyweight'],['Cable Kickback','i','Cable'],
    ['Sumo Deadlift','c','Barbell'],['Romanian Deadlift','c','Barbell'],['Step-Up','c','Dumbbells']] },
  { muscle: 'Core / Abs', icon: 'grid-1x2', items: [
    ['Plank','c','Bodyweight'],['Cable Crunch','i','Cable'],['Hanging Leg Raise','i','Bodyweight'],
    ['Ab Wheel Rollout','c','Equipment'],['Russian Twist','i','Bodyweight'],['Decline Crunch','i','Bodyweight'],
    ['Dragon Flag','c','Bodyweight'],['Pallof Press','i','Cable']] },
  { muscle: 'Calves', icon: 'arrow-bar-up', items: [
    ['Standing Calf Raise','i','Machine'],['Seated Calf Raise','i','Machine'],['Donkey Calf Raise','i','Bodyweight'],
    ['Single-Leg Calf Raise','i','Bodyweight'],['Leg Press Calf Raise','i','Machine']] },
  { muscle: 'Full Body', icon: 'person', items: [
    ['Burpee','c','Bodyweight'],['Clean and Press','c','Barbell'],['Kettlebell Swing','c','Kettlebell'],
    ['Thruster','c','Barbell'],['Man Maker','c','Dumbbells'],['Turkish Get-Up','c','Kettlebell']] },
  { muscle: 'Cardio', icon: 'heart', items: [
    ['Treadmill Run',null,'Machine'],['Rowing Machine',null,'Machine'],['Stationary Bike',null,'Machine'],
    ['Jump Rope',null,'Equipment'],['Stair Climber',null,'Machine'],['Battle Ropes',null,'Equipment'],
    ['Box Jump',null,'Bodyweight']] },
];
export const MUSCLE_OPTIONS = [...CATALOG.map((c) => c.muscle), 'Other'];

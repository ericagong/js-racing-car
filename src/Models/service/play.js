export default function play(cars, rounds, moveStrategies) {
    rounds.map((round) => {
        cars = round.run(cars, moveStrategies);
    });
}

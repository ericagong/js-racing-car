// export default function moveCars(cars, moveStrategy) {
//     cars.forEach((car) => car.tryMove(moveStrategy));
// }

export default function moveCars(cars, moveStrategies) {
    cars.map((car, idx) => car.tryMove(moveStrategies[idx]));
}

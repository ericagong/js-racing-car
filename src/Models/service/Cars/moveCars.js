export default function moveCars(cars, moveStrategy) {
    cars.forEach((car) => car.tryMove(moveStrategy));
}

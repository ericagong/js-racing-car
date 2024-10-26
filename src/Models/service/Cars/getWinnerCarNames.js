const determineWinnerCars = (cars) => {
    const maxPosition = Math.max(...cars.map((car) => car.position));
    return cars.filter((car) => car.position === maxPosition);
};

export default function getWinnerCarNames(cars) {
    const winnerCars = determineWinnerCars(cars);
    return winnerCars.map((car) => car.name);
}

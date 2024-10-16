const parkingLot1 = {
  parkZone: "zoneA",
  parkingPrice: 4,
  electricCharge: { neste: 4, ABC: 6.2, Shell: 8.3 },
  parkingSpots: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"],
};
const parkingLot2 = {
  parkZone: "zoneB",
  parkingPrice: 6,
  electricCharge: { neste: 3, ABC: 5.2, Shell: 6.3 },
  parkingSpots: ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"],
};
const parkingLot3 = {
  parkZone: "zoneC",
  parkingPrice: 7.5,
  electricCharge: { neste: 2.5, ABC: 4.9, Shell: 5 },
  parkingSpots: ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10"],
};
const parkingLot4 = {
  parkZone: "zoneD",
  parkingPrice: 9,
  parkingSpots: ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10"],
};
const parkingLot5 = {
  parkZone: "zoneE",
  parkingPrice: 9,
  parkingSpots: ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10"],
};
const parkingLot6 = {
  parkZone: "zoneF",
  parkingPrice: 7.2,
  parkingSpots: ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10"],
};

const parkingLots = [
  parkingLot1,
  parkingLot2,
  parkingLot3,
  parkingLot4,
  parkingLot5,
  parkingLot6,
];

const getCarInfo = function () {
  let carType = prompt(
    "Enter car type by typing electric or nonelectric: "
  ).toLowerCase();
  let carRegistrationNumber = prompt("Enter car Registration Number: ");
  return [carType, carRegistrationNumber];
};

// Follow up : check and confirm carregnumber format.. THROW ERROR
const [carType, carRegistrationNumber] = getCarInfo();

// Follow up: Check authenticity of the cartype (electric and noneelectric).... THROW ERROR
let matchingParkingLots;
const displayMatchingParkingLots = function (carty, parLots) {
  if (carty === "electric") {
    matchingParkingLots = parLots.filter(function (parlot) {
      if (Object.hasOwn(parlot, "electricCharge")) {
        return parlot;
      }
    });
  } else {
    matchingParkingLots = parLots.filter(function (parlot) {
      if (!Object.hasOwn(parlot, "electricCharge")) {
        return parlot;
      }
    });
  }
  [lot1, lot2, lot3] = matchingParkingLots;
  console.log(lot1, lot2, lot3);
};
displayMatchingParkingLots(carType, parkingLots);

// Follow up: Check authenticity of zone typed in... check if it matches current matchingparkinglots and spelling as well
let currentParkingLot;
const setCurrentParkingLot = function (matparLots) {
  let lot = prompt("Select parking lot by typing in the  zone: ");
  currentParkingLot = matparLots.find((matparlot) =>
    Object.values(matparlot).includes(lot)
  );
};

setCurrentParkingLot(matchingParkingLots);

let availableParkingSpots, currentParkingSpot, parkingSpot;
const setCurrentParkingSpot = function (curparlot) {
  console.log(curparlot);
  availableParkingSpots = curparlot.parkingSpots;
  console.log(availableParkingSpots);
  parkingSpot = prompt("Pick a spot: ");
  currentParkingSpot = availableParkingSpots.find(
    (parspot) => parspot === parkingSpot
  );
  console.log(currentParkingSpot);
};
setCurrentParkingSpot(currentParkingLot);
console.log(currentParkingSpot);

console.log(availableParkingSpots);

console.log("ok");

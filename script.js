const parkingLot1 = {
  parkZone: "ZONEA",
  parkingPrice: 4,
  electricCharge: { neste: 4, ABC: 6.2, Shell: 8.3 },
  parkingSpots: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"],
  // EPJ398: "A3",
  // LSY197: "A10",
};
const parkingLot2 = {
  parkZone: "ZONEB",
  parkingPrice: 6,
  electricCharge: { neste: 3, ABC: 5.2, Shell: 6.3 },
  parkingSpots: ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"],
};
const parkingLot3 = {
  parkZone: "ZONEC",
  parkingPrice: 7.5,
  electricCharge: { neste: 2.5, ABC: 4.9, Shell: 5 },
  parkingSpots: ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10"],
  // LKW388: "C7",
  // LBH197: "C4",
};
const parkingLot4 = {
  parkZone: "ZONED",
  parkingPrice: 9,
  parkingSpots: ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10"],
};
const parkingLot5 = {
  parkZone: "ZONEE",
  parkingPrice: 9,
  parkingSpots: ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10"],
};
const parkingLot6 = {
  parkZone: "ZONEF",
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

console.log("WELCOME TO DANCO PARKING PROGRAM: ");

let matchingParkingLots;
const currentAction = function () {
  const action = prompt("DRIVEIN, FINDCAR, DRIVEOUT: ").toLowerCase();
  if (action === "drivein") {
    driveIn();
  } else if (action === "findcar") {
    findCar(parkingLots);
  } else if (action === "driveout") {
    console.log("jjhsaja");
  }
};

currentAction();

// Follow up: Check authenticity of the cartype (electric and noneelectric).... THROW ERROR
function getCarInfo() {
  let carType = prompt(
    "Enter car type by typing electric or nonelectric: "
  ).toLowerCase();
  let carRegistrationNumber = prompt(
    "Enter car Registration Number: "
  ).toUpperCase();
  return [carType, carRegistrationNumber];
}

function displayMatchingParkingLots(carty, parLots) {
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
}

function driveIn() {
  // Follow up : check and confirm carregnumber format..
  // Make sure carregnum has 3 letters and 3 words
  // check for matches as well if number is similar to another... THROW ERROR
  let [carType, carRegistrationNumber] = getCarInfo();

  displayMatchingParkingLots(carType, parkingLots);

  // Follow up: Check authenticity of zone typed in... check if it matches current matchingparkinglots and spelling as well
  let currentParkingLot;
  const setCurrentParkingLot = function (matparLots) {
    let parkingLot = prompt(
      "Select parking lot by typing in the  zone: "
    ).toUpperCase();
    currentParkingLot = matparLots.find((matparlot) =>
      Object.values(matparlot).includes(parkingLot)
    );
  };

  setCurrentParkingLot(matchingParkingLots);

  let availableParkingSpots, currentParkingSpot, parkingSpot;

  const getCurrentParkingSpot = function (curparlot) {
    const displayAvailableParkingSpots = function (curparlot) {
      console.log(curparlot);
      availableParkingSpots = curparlot.parkingSpots;
      console.log(availableParkingSpots);
    };

    displayAvailableParkingSpots(curparlot);

    //Follow up: check if parking spot is still available.. or taken
    parkingSpot = prompt("Pick a spot: ").toUpperCase();
    currentParkingSpot = availableParkingSpots.find(
      (parspot) => parspot === parkingSpot
    );
  };

  getCurrentParkingSpot(currentParkingLot);

  const updateAvailableParkingSpots = function (curparspot) {
    let parkingSpotIndex = availableParkingSpots.indexOf(curparspot);
    parkingSpotIndex > -1
      ? availableParkingSpots.splice(parkingSpotIndex, 1)
      : console.log("Parking Lot Full");
  };

  updateAvailableParkingSpots(currentParkingSpot);

  const createParking = function (curparlot, carregnum, curparspot) {
    curparlot[`${carregnum}`] = curparspot;
  };
  createParking(currentParkingLot, carRegistrationNumber, currentParkingSpot);

  console.clear();
  console.log(currentParkingLot);
  currentAction();
  console.clear();
}

function findCar(parlots) {
  let [carType, carRegistrationNumber] = getCarInfo();
  let foundLot = parlots.find((parlot) => parlot[`${carRegistrationNumber}`]);

  let foundCarDetails = `Car ${carRegistrationNumber} is parked in ${
    foundLot.parkZone
  } at spot ${foundLot[`${carRegistrationNumber}`]}`;

  console.clear();
  console.log(foundCarDetails);
  currentAction();
  console.clear();
}

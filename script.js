const parkingLot1 = {
  parkZone: "ZONEA",
  parkingPrice: 4,
  electricCharge: { NESTE: 4, ABC: 6.2, SHELL: 8.3 },
  parkingSpots: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"],
  EPJ398: "A3",
  LSH911: "A10",
};
const parkingLot2 = {
  parkZone: "ZONEB",
  parkingPrice: 6,
  electricCharge: { NESTE: 3, ABC: 5.2, SHELL: 6.3 },
  parkingSpots: ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"],
};
const parkingLot3 = {
  parkZone: "ZONEC",
  parkingPrice: 7.5,
  electricCharge: { NESTE: 2.5, ABC: 4.9, SHELL: 5 },
  parkingSpots: ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10"],
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
  JHJ531: "E2",
  WWW421: "E4",
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

let matchingParkingLots, foundParkingLot;
const currentAction = function () {
  const action = prompt("DRIVEIN, FINDCAR, DRIVEOUT: ").toLowerCase();
  if (action === "drivein") {
    driveIn();
  } else if (action === "findcar") {
    findCar(parkingLots);
  } else if (action === "driveout") {
    driveOut(parkingLots);
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

function findParkingLot(parlots, carregnum) {
  return parlots.find((parlot) => parlot[`${carregnum}`]);
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
    // also check to ensure the parking spot is from the available parking sppot array..
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
}

function findCar(parlots) {
  let [carType, carRegistrationNumber] = getCarInfo();

  foundParkingLot = findParkingLot(parlots, carRegistrationNumber);

  let foundCarDetails = `Car ${carRegistrationNumber} is parked in ${
    foundParkingLot.parkZone
  } at spot ${foundParkingLot[`${carRegistrationNumber}`]}`;

  console.clear();
  console.log(foundCarDetails);
  currentAction();
}

function driveOut(parlots) {
  let [carType, carRegistrationNumber] = getCarInfo();
  foundParkingLot = findParkingLot(parlots, carRegistrationNumber);

  let hoursParked = Number(prompt("Enter how many hours car was parked: "));

  let electricChargePrice, electricChargeUsed, electricChargeAmt;
  const calcElectricChargePrice = function (fndParLot) {
    electricChargeAmt = Object.entries(fndParLot.electricCharge).find(
      (elecchrg) => elecchrg.includes(electricChargeUsed)
    )[1];

    return (electricChargePrice = electricChargeAmt * hoursParked);
  };

  function checkElectricChargeUsed(fndParLot) {
    if (Object.hasOwn(fndParLot, "electricCharge")) {
      const [neste, ABC, shell] = Object.keys(fndParLot.electricCharge);
      electricChargeUsed = prompt(
        `Select electric charge used by typing ${neste}, ${ABC}, ${shell}`
      ).toUpperCase();
      console.log(calcElectricChargePrice(fndParLot));
    } else {
      electricChargeUsed = "no charge";
    }

    return electricChargeUsed;
  }

  console.log(checkElectricChargeUsed(foundParkingLot));

  const calcParkingLotPrice = function (fndParLot) {
    return fndParLot.parkingPrice * hoursParked;
  };

  console.log(calcParkingLotPrice(foundParkingLot));

  let totalPrice =
    electricChargeUsed !== "no charge"
      ? calcParkingLotPrice(foundParkingLot) +
        calcElectricChargePrice(fndParLot)
      : calcParkingLotPrice(foundParkingLot);

      let electricdetails = electricChargeUsed !== "no charge"?
}

const parkingLot1 = {
  parkZone: "ZONEA",
  parkingPrice: 4,
  electricCharge: { NESTE: 4, ABC: 6.2, SHELL: 8.3 },
  parkingSpots: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"],
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
  EPJ422: "D1",
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

let currentParkingLot, action;
const currentAction = function (parLots) {
  action = prompt("DRIVEIN, FINDCAR, DRIVEOUT: ").toLowerCase();
  console.clear();
  if (action === "drivein") {
    driveIn();
  } else if (action === "findcar") {
    findCar(parLots);
  } else if (action === "driveout") {
    driveOut(parLots);
  }
};

currentAction(parkingLots);

function getCarInfo() {
  let carRegistrationNumber = prompt(
    "Enter car Registration Number: "
  ).toUpperCase();
  return [carRegistrationNumber];
}

function displayParkingLots(parlots) {
  parlots.forEach((parlot) => console.log(parlot));
}

// Follow up: Check authenticity of zone typed in... check mostly for spelling..

function setCurrentParkingLot(parlots) {
  let zone = prompt(
    "Select parking lot by typing in the  zone: "
  ).toUpperCase();
  return parlots.find((parlot) => Object.values(parlot).includes(zone));
}

function locateCurrentParkingLot(parlots, carregnum) {
  currentParkingLot = parlots.find((parlot) => parlot[`${carregnum}`]);
  if (!currentParkingLot) {
    console.log(
      "Sorry Car not found, Check Car registartion number and Try again: "
    );
    findCar(parlots);
  } else {
    return currentParkingLot;
  }
}

function driveIn() {
  console.log(action);
  // Follow up : check and confirm carregnumber format..
  // Make sure carregnum has 3 letters and 3 words
  // check for matches as well if number is similar to another... THROW ERROR
  let [carRegistrationNumber] = getCarInfo();

  displayParkingLots(parkingLots);

  currentParkingLot = setCurrentParkingLot(parkingLots);

  let availableParkingSpots, currentParkingSpot, spot;

  const displayAvailableParkingSpots = function (curparlot) {
    if (curparlot.parkingSpots.length > 0) {
      availableParkingSpots = curparlot.parkingSpots;
      console.log(availableParkingSpots);
    } else {
      console.clear();
      console.log(
        "Parking spots full. Kindly retart Parking and choose another zone"
      );
      driveIn();
    }
  };

  const getCurrentParkingSpot = function (curparlot) {
    console.clear();
    displayAvailableParkingSpots(curparlot);

    spot = prompt("Pick a spot: ").toUpperCase();
    currentParkingSpot = availableParkingSpots.find(
      (parspot) => parspot === spot
    );
  };

  getCurrentParkingSpot(currentParkingLot);

  const updateAvailableParkingSpots = function (curparspot) {
    let parkingSpotIndex = availableParkingSpots.indexOf(curparspot);
    availableParkingSpots =
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

  currentAction(parkingLots);
}

function findCar(parlots) {
  let [carRegistrationNumber] = getCarInfo();

  currentParkingLot = locateCurrentParkingLot(parlots, carRegistrationNumber);

  let currentParkingLotDetails = `Car ${carRegistrationNumber} is parked in ${
    currentParkingLot.parkZone
  } at spot ${currentParkingLot[`${carRegistrationNumber}`]}`;

  console.log(currentParkingLotDetails);

  currentAction(parkingLots);
}

function driveOut(parlots) {
  let [carRegistrationNumber] = getCarInfo();

  currentParkingLot = locateCurrentParkingLot(parlots, carRegistrationNumber);
  console.log(currentParkingLot);

  let hoursParked = Number(prompt("Enter how many hours car was parked: "));

  let electricChargePrice, electricChargeUsed, electricChargeAmt;
  function calcElectricChargePrice(curparlot) {
    electricChargeAmt = Object.entries(curparlot.electricCharge).find(
      (elecchrg) => elecchrg.includes(electricChargeUsed)
    )[1];

    return (electricChargePrice = electricChargeAmt * hoursParked);
  }

  function checkElectricChargeUsed(curparlot) {
    if (Object.hasOwn(curparlot, "electricCharge")) {
      const [neste, ABC, shell] = Object.keys(curparlot.electricCharge);
      electricChargeUsed = prompt(
        `Select electric charge used by typing ${neste}, ${ABC}, ${shell}`
      ).toUpperCase();
      calcElectricChargePrice(curparlot);
    } else {
      electricChargeUsed = "no charge";
    }

    return electricChargeUsed;
  }
  checkElectricChargeUsed(currentParkingLot);

  const calcFinalPrice = function (curparlot) {
    let parkingLotPrice = curparlot.parkingPrice * hoursParked;
    return (totalPrice =
      electricChargeUsed !== "no charge"
        ? parkingLotPrice + calcElectricChargePrice(curparlot)
        : parkingLotPrice);
  };

  const displayElectricChargeDetails = function () {
    let electricChargeDetails;
    if (electricChargeUsed !== "no charge") {
      electricChargeDetails = `${electricChargeUsed} : ${electricChargeAmt}$/hour = ${
        hoursParked * electricChargeAmt
      }$`;
    } else {
      electricChargeDetails = "no charge";
    }
    return electricChargeDetails;
  };

  const updateParkingSpots = function (curparlot) {
    let curParkingSpot = curparlot[`${carRegistrationNumber}`];

    let curParkingSpotIndex = curparlot.parkingSpots.findIndex(
      (spot) => spot > curParkingSpot
    );

    curparlot.parkingSpots.splice(curParkingSpotIndex, 0, curParkingSpot);

    delete curparlot[`${carRegistrationNumber}`];
    console.log(curparlot);
  };
  updateParkingSpots(currentParkingLot);

  const createReceipt = function (curparlot) {
    console.log(`${carRegistrationNumber}
    ${curparlot.parkZone}
    ${displayElectricChargeDetails()}
    ${hoursParked} hours 
    ${`Total Price : ${calcFinalPrice(curparlot)}`}$`);
  };
  createReceipt(currentParkingLot);
}

import moment from "moment";

export const getPrimaryPropertyImage = propertyImages => {
  if (propertyImages && propertyImages.length) {
    const primaryImage = propertyImages.find(img => img.isPrimary);

    return (primaryImage && primaryImage.url) || propertyImages[0].url;
  }

  return null;
};

const getRentIncrementUnit = rentFrequency => {
  switch (rentFrequency) {
    case "YEARLY":
      return "y";
    case "MONTHLY":
      return "M";
    default:
      return "w";
  }
};

const getRentIncrementValue = rentFrequency => {
  switch (rentFrequency) {
    case "FOUR_WEEKLY":
      return 4;
    case "FORTNIGHTLY":
      return 2;
    default:
      return 1;
  }
};

const isWorkingDay = dayToTest => dayToTest.day() > 0 && dayToTest.day() < 6;

const getNextWorkingDay = dayToMove => {
  if (!isWorkingDay(dayToMove)) {
    if (dayToMove.day() === 0) {
      return moment(dayToMove).add(1, "d");
    }
    if (dayToMove.day() === 6) {
      return moment(dayToMove).add(2, "d");
    }
  }

  return moment(dayToMove);
};

export const getRentDueDate = (lease, today = Date.now()) => {
  const {
    duration: {startDate},
    rentFrequency,
  } = lease;
  const todayAsMoment = moment(today);
  const increment = getRentIncrementValue(rentFrequency);
  const incrementUnit = getRentIncrementUnit(rentFrequency);
  let x = 1;

  while (
    moment(startDate)
      .add(x * increment, incrementUnit)
      .isSameOrBefore(todayAsMoment)
  ) {
    x += 1;
  }

  const rentDueDate = moment(startDate).add(x * increment, incrementUnit);

  if (!isWorkingDay(rentDueDate)) {
    return getNextWorkingDay(rentDueDate).format("YYYY-MM-DD");
  }

  return rentDueDate.format("YYYY-MM-DD");
};

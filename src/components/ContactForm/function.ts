import Holidays from "date-holidays";

// 祝前日かどうかを判定（例：2025-10-11 → true ならその翌日が祝日）
const isDayBeforeHoliday = (date: Date): boolean => {
  const hd = new Holidays("JP");
  const nextDate = new Date(date);
  nextDate.setDate(date.getDate() + 1);
  const holiday = hd.isHoliday(nextDate);
  return !!holiday;
};

const isHighPriceDay = (date: Date): boolean => {
  const day = date.getDay(); // 0:日, 5:金, 6:土
  return day === 0 || day === 5 || day === 6 || isDayBeforeHoliday(date);
};

const calculateStayNights = (checkIn: string, checkOut: string) => {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diff =
    (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24);
  return Math.min(diff, 5); // 最大5泊まで
};

export const calculateTotalPrice = (
  checkIn: string,
  checkOut: string,
  adults: number,
  children: number
): number => {
  if (!checkIn || !checkOut) return 0;

  const nights = calculateStayNights(checkIn, checkOut);
  const basePrices: number[] = [];

  const currentDate = new Date(checkIn);
  for (let i = 0; i < nights; i++) {
    if (i === 0) {
      basePrices.push(isHighPriceDay(currentDate) ? 20000 : 15000);
    } else if (i === 1) {
      basePrices.push(10000);
    } else {
      basePrices.push(0);
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const baseTotal = basePrices.reduce((sum, price) => sum + price, 0);
  const extraFee = adults * 5000 + children * 3000;

  return baseTotal + extraFee;
};

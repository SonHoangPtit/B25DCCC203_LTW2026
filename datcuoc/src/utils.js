import { MIN_BET, MAX_BET, BET_STEP, MULTIPLIERS, RESULTS } from './data';

export const validateBet = (bet, score) => {
  const num = Number(bet);
  if (
    !Number.isInteger(num) ||
    num < MIN_BET ||
    num > MAX_BET ||
    num % BET_STEP !== 0 ||
    num > score
  ) {
    return 'Mức cược phải là bội số của 100, từ 100 đến 500 và không vượt quá số điểm đang có';
  }
  return '';
};

export const calcChange = (bet, level, correct) => {
  if (correct) return bet * MULTIPLIERS[level];
  return -bet;
};

export const getResult = (score) => {
  const found = RESULTS.find((item) => score >= item.min);
  return found ? found.title : 'Cháy túi';
};
// Indian numbering system converter (Lakhs and Crores) for English and Gujarati

const numWordsEn = {
  0: "Zero", 1: "One", 2: "Two", 3: "Three", 4: "Four", 5: "Five", 6: "Six", 7: "Seven", 8: "Eight", 9: "Nine",
  10: "Ten", 11: "Eleven", 12: "Twelve", 13: "Thirteen", 14: "Fourteen", 15: "Fifteen", 16: "Sixteen", 17: "Seventeen", 18: "Eighteen", 19: "Nineteen",
  20: "Twenty", 30: "Thirty", 40: "Forty", 50: "Fifty", 60: "Sixty", 70: "Seventy", 80: "Eighty", 90: "Ninety"
};

const numWordsGu = {
  0: "શૂન્ય", 1: "એક", 2: "બે", 3: "ત્રણ", 4: "ચાર", 5: "પાંચ", 6: "છ", 7: "સાત", 8: "આઠ", 9: "નવ",
  10: "દસ", 11: "અગિયાર", 12: "બાર", 13: "તેર", 14: "ચૌદ", 15: "પંદર", 16: "સોળ", 17: "સત્તર", 18: "અઢાર", 19: "ઓગણિસ",
  20: "વીસ", 30: "ત્રીસ", 40: "ચાલીસ", 50: "પચાસ", 60: "સાઈઠ", 70: "સિત્તેર", 80: "એંસી", 90: "નેવું"
};

/** Gujarati compound numbers 21–99 for legal amount wording */
const guCompound21to99 = {
  21: 'એકવીસ', 22: 'બાવીસ', 23: 'તેવીસ', 24: 'ચોવીસ', 25: 'પચ્ચીસ',
  26: 'છવ્વીસ', 27: 'સત્તાવીસ', 28: 'અઠ્ઠાવીસ', 29: 'ઓગણત્રીસ', 30: 'ત્રીસ',
  31: 'એકત્રીસ', 32: 'બત્રીસ', 33: 'તેત્રીસ', 34: 'ચોત્રીસ', 35: 'પાંત્રીસ',
  36: 'છત્રીસ', 37: 'સડત્રીસ', 38: 'અડત્રીસ', 39: 'ઓગણચાલીસ', 40: 'ચાલીસ',
  41: 'એકતાલીસ', 42: 'બેતાલીસ', 43: 'ત્રેતાલીસ', 44: 'ચુંમાલીસ', 45: 'પિસ્તાલીસ',
  46: 'છેતાલીસ', 47: 'સુડતાલીસ', 48: 'અડતાલીસ', 49: 'ઓગણપચાસ', 50: 'પચાસ',
  51: 'એકાવન', 52: 'બાવન', 53: 'ત્રેપન', 54: 'ચોપન', 55: 'પંચાવન',
  56: 'છપ્પન', 57: 'સત્તાવન', 58: 'અઠ્ઠાવન', 59: 'ઓગણસાઠ', 60: 'સાઈઠ',
  61: 'એકસઠ', 62: 'બાસઠ', 63: 'ત્રેસઠ', 64: 'ચોસઠ', 65: 'પાંસઠ',
  66: 'છાસઠ', 67: 'સડસઠ', 68: 'અડસઠ', 69: 'ઓગણસિત્તેર', 70: 'સિત્તેર',
  71: 'એકોતેર', 72: 'બોતેર', 73: 'તોતેર', 74: 'ચોમોતેર', 75: 'પંચોતેર',
  76: 'છોતેર', 78: 'અઠ્ઠોતેર', 79: 'ઓગણએંસી', 80: 'એંસી',
  81: 'એક્યાસી', 82: 'બ્યાસી', 83: 'ત્યાસી', 84: 'ચોર્યાસી', 85: 'પંચાસી',
  86: 'છ્યાસી', 87: 'સિત્યાસી', 88: 'અઠ્ઠ્યાસી', 89: 'નેવ્યાસી', 90: 'નેવું',
  91: 'એકાણું', 92: 'બાણું', 93: 'ત્રાણું', 94: 'ચોરાણું', 95: 'પંચાણું',
  96: 'છન્નું', 97: 'સત્તાણું', 98: 'અઠ્ઠાણું', 99: 'નવાણું',
};

function convertGuBelowHundred(num) {
  if (num <= 20) return numWordsGu[num] || '';
  if (guCompound21to99[num]) return guCompound21to99[num];
  const tens = Math.floor(num / 10) * 10;
  const ones = num % 10;
  return numWordsGu[tens] + (ones > 0 ? ' ' + numWordsGu[ones] : '');
}

function convertLessThanThousand(num, lang = 'en') {
  const words = lang === 'en' ? numWordsEn : numWordsGu;
  const hundredStr = lang === 'en' ? " Hundred" : " સો";
  const andStr = lang === 'en' ? " and " : " અને ";
  
  let result = "";
  if (num >= 100) {
    result += words[Math.floor(num / 100)] + hundredStr;
    num %= 100;
    if (num > 0) result += andStr;
  }
  
  if (num > 0) {
    if (lang === 'gu') {
      result += convertGuBelowHundred(num);
    } else if (num < 20) {
      result += words[num];
    } else {
      const tens = Math.floor(num / 10) * 10;
      const ones = num % 10;
      result += words[tens] + (ones > 0 ? "-" + words[ones] : "");
    }
  }
  
  return result;
}

export function numberToWords(num, lang = 'en') {
  if (isNaN(num) || num === "") return "";
  const n = parseInt(num, 10);
  if (n === 0) return lang === 'en' ? "Zero Rupees Only" : "રૂપિયા શૂન્ય પુરા";
  
  let temp = n;
  let crore = Math.floor(temp / 10000000);
  temp %= 10000000;
  
  let lakh = Math.floor(temp / 100000);
  temp %= 100000;
  
  let thousand = Math.floor(temp / 1000);
  temp %= 1000;
  
  let remaining = temp;
  
  let parts = [];
  
  if (crore > 0) {
    const croreLabel = lang === 'en' ? " Crore" : " કરોડ";
    parts.push(convertLessThanThousand(crore, lang) + croreLabel);
  }
  
  if (lakh > 0) {
    const lakhLabel = lang === 'en' ? " Lakh" : " લાખ";
    parts.push(convertLessThanThousand(lakh, lang) + lakhLabel);
  }
  
  if (thousand > 0) {
    const thousandLabel = lang === 'en' ? " Thousand" : " હજાર";
    parts.push(convertLessThanThousand(thousand, lang) + thousandLabel);
  }
  
  if (remaining > 0) {
    parts.push(convertLessThanThousand(remaining, lang));
  }
  
  if (lang === 'en') {
    return parts.join(" ") + " Rupees Only";
  } else {
    return "રૂપિયા " + parts.join(" ") + " પુરા";
  }
}

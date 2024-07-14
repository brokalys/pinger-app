/* eslint-disable no-template-curly-in-string */
import { setLocale } from "yup";
import { PingerSchema } from "../components/Form";

setLocale({
  mixed: {
    required: "Šis lauciņš ir obligāti jāaizpilda",
    notType: "Šajā lauciņā nav ievadīta pareiza vērtība",
  },
  string: {
    email: "Šajā lauciņā jābūt ievadītai e-pasta adresei",
    max: "Šajā lauciņā drīkst ievadīt tikai ${max} simbolus",
  },
  number: {
    integer: "Šajā lauciņā var ievadīt tikai veselus skaitļus",
    positive: "Šajā lauciņā var ievadīt tikai pozitīvus skaitļus",
    min: "Šī lauciņa vērtībai ir jābūt lielākai vai vienādai ar ${min}",
    max: "Šī lauciņa vērtībai ir jābūt mazākai vai vienādai ar ${max}",
    moreThan: "Šī lauciņa vērtībai ir jābūt lielākai par ${more}",
    lessThan: "Šī lauciņa vērtībai ir jābūt mazākai par ${less}",
  },
});

const CATEGORY_TRANSLATION_MAP: Record<PingerSchema["category"], string> = {
  APARTMENT: "Dzīvoklis",
  HOUSE: "Māja",
  LAND: "Zeme",
};

const TYPE_TRANSLATION_MAP: Record<PingerSchema["type"], string> = {
  SELL: "Pārdod",
  RENT: "Īrē",
  AUCTION: "Izsole",
};

const PRICE_TYPE_TRANSLATION_MAP: Record<PingerSchema["price_type"], string> = {
  TOTAL: "Kopējā cena",
  SQM: "Par kvadrātmetru",
};

const FREQUENCY_TRANSLATION_MAP: Record<PingerSchema["frequency"], string> = {
  IMMEDIATE: "Nekavējoties",
  DAILY: "Reizi dienā",
  WEEKLY: "Reizi nedēļā",
  MONTHLY: "Reizi mēnesī",
};

export const TRANSLATION_MAP = {
  category: CATEGORY_TRANSLATION_MAP,
  type: TYPE_TRANSLATION_MAP,
  price: PRICE_TYPE_TRANSLATION_MAP,
  frequency: FREQUENCY_TRANSLATION_MAP,
} as const;

/* eslint-disable no-template-curly-in-string */
import { setLocale } from 'yup'

setLocale({
  mixed: {
    required: 'Šis lauciņš ir obligāti jāaizpilda',
    notType: 'Šajā lauciņā nav ievadīta pareiza vērtība',
  },
  string: {
    email: 'Šajā lauciņā jābūt ievadītai e-pasta adresei',
  },
  number: {
    integer: 'Šajā lauciņā var ievadīt tikai veselus skaitļus',
    positive: 'Šajā lauciņā var ievadīt tikai pozitīvus skaitļus',
    moreThan: 'Šī lauciņa vērtībai ir jābūt lielākai par ${more}',
    lessThan: 'Šī lauciņa vērtībai ir jābūt mazākai par ${less}',
  },
})

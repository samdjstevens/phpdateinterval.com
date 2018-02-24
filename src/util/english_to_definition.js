import w2n from 'words-to-num'

// alternative names for the periods
let alternatives = {
  years: ['year'],
  months: ['month'],
  days: ['day'],
  weeks: ['week'],
  hours: ['hour'],
  minutes: ['minute', 'min', 'mins'],
  seconds: ['second', 'sec', 'secs']
}

// helper function to replace an alternative name with the actual name
function replaceAlternative(alt) {
  for (var period in alternatives) {
    if (alternatives.hasOwnProperty(period)) {
      if (alternatives[period].indexOf(alt) > -1) {
        return period
      }
    }
  }

  return alt
}

// compile the period name regex
let regExp = (_ => {
  let explodeTerms = []
  let periods = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds']

  for (let i = 0; i < periods.length; i++) {
    explodeTerms.push(periods[i])
    if (alternatives.hasOwnProperty(periods[i])) {
      for (let j = 0; j < alternatives[periods[i]].length; j++) {
        explodeTerms.push(alternatives[periods[i]][j])
      }
    }
  }

  return new RegExp('(' + explodeTerms.join('|') + ')')
})()

export default function (englishString) {
  // Start off the definition
  let definition = {
    years: 0,
    months: 0,
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  }

  // Remove all non alpha numberic and excess spaces
  englishString = englishString.replace(/\W+/g, ' ')

  // Split the string up by the period delimiters
  let parts = englishString.split(regExp)

  // Parsing didnt work, string malformed
  if (parts.length < 2) {
    return false;
  }

  var setATerm = false

  // Loop through each pair of amount + period ("years", "week", etc)
  for (let i = 0; i < parts.length; i += 2) {
    if (parts[i] && i + 1 <= parts.length) {
      // Convert the amount string/number to a number
      let amount = w2n.convert(parts[i].replace(/[^a-zA-Z0-9]\s/, '').replace('and', '').trim())

      // If the amount could not be conveted/is below 1, ignore it
      if (isNaN(amount)) {
        continue
      }

      // Get the period being defined, adding "s" to the end if using the singular
      let period = replaceAlternative(parts[i + 1])

      // If the period is a valid one, then set the amount on the definition
      if (definition.hasOwnProperty(period)) {
        definition[period] = amount
        setATerm = true
      }
    }
  }

  if (!setATerm) {
    return false
  }

  return definition
}

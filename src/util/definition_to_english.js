import n2w from 'number-to-words'

/**
 * Return the english string representation of a definition object.
 * E.g. "one year, three months, 5 days"
 */
export default function (definition) {
  let englishParts = []

  // For each period in the definition...
  for (let period in definition) {
    if (definition.hasOwnProperty(period) && definition[period] > 0) {
      let part = n2w.toWords(definition[period])
        + ' '
        + (definition[period] === 1 ? period.substr(0, period.length - 1) : period)

      englishParts.push(part)
    }
  }

  return englishParts.join(', ')
}

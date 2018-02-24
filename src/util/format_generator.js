export default function(definition) {
  definition = Object.assign({}, {
    years: 0,
    months: 0,
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  }, definition)

  return 'P'
    + (definition.years > 0 ? definition.years + 'Y' : '')
    + (definition.months > 0 ? definition.months + 'M' : '')
    + (definition.weeks > 0 ? definition.weeks + 'W' : '')
    + (definition.days > 0 ? definition.days + 'D' : '')
    + (definition.hours + definition.minutes + definition.seconds > 0 ? 'T' : '')
    + (definition.hours > 0 ? definition.hours + 'H' : '')
    + (definition.minutes > 0 ? definition.minutes + 'M' : '')
    + (definition.seconds > 0 ? definition.seconds + 'S' : '')
}

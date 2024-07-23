const { DimkinHelperSKrasnymiISinimiTochkami } = require('./config')

const group = {
  countries: [1, 2, 3, 4, 5],
  order: {
    rows: ['id', 'status'],
    show: true
  },
  cardOrder: {
    settings: {
      comment: {
        show: true
      },
      contact: {
        show: true,
        rows: ['department']
      }
    },
    show: true
  }
}

const user = {
  countries: [1, 2, 3, 4],
  order: {
    rows: ['id', 'status'],
    show: true
  },
  cardOrder: {
    settings: {
      comment: {
        show: false
      },
      contact: {
        show: true,
        rows: ['department']
      }
    },
    show: true
  }
}

const countries = [1, 2, 3, 4, 5, 6, 7]
const results = countries.map(id =>
  DimkinHelperSKrasnymiISinimiTochkami(group, user, `countries/${id}`)
)
console.table([countries, results])
const anyBlue = results.includes('blue')
const anyRed = results.includes('red')
if (anyBlue && anyRed) return console.log('BLUE & RED')
if (anyBlue) return console.log('BLUE')
if (anyRed) return console.log('RED')
if (!(anyBlue && anyRed)) return console.log('GREY')

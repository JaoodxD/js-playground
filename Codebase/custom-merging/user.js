module.exports = {
  countries: [1, 2, 3],
  statuses: {
    value: [10, 40],
    time: 1001
  },
  departments: {
    value: [7, 8],
    time: 4000
  },
  analytics: {
    show: true,
    time: 18000
  },
  order: {
    settings: {
      address: {
        show: false,
        swap: false
      }
    },
    show: true,
    time: 1438
  },
  cardOrder: {
    time: 18000,
    show: true,
    settings: {
      comment: {
        show: true
      },
      contact: {
        rows: [
          { id: 3, name: 'asdasd', show: true },
          { id: 2, name: 'department', show: true },
        ],
        show: true
      }
    }
  }

};

module.exports = {
  countries: [1, 2, 3],
  statuses: {
    value: [10, 20, 30],
    time: 1000
  },
  departments: {
    value: [8, 9, 10],
    time: 5000
  },
  analytics: {
    show: true,
    time: 10000
  },
  order: {
    settings: {
      address: {
        show: true,
        swap: false
      }
    },
    show: true,
    time: 1437
  },
  cardOrder: {
    time: 10000,
    show: true,
    settings: {
      comment: {
        show: true
      },
      contact: {
        rows: [
          { name: 'country', show: true },
          { name: 'department', show: true },
        ],
        show: true
      }
    }
  }
};

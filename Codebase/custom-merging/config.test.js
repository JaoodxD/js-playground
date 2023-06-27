'use strict';
const { Config, timestampObject } = require('./config.js');
const { test } = require('node:test');
const assert = require('node:assert');

const arraysContainSameElements = (arr1, arr2) => {
  if (!Array.isArray(arr1)) return false;
  if (!Array.isArray(arr2)) return false;
  if (arr1.length !== arr2.length) return false;

  const sortedArr1 = arr1.slice().sort();
  const sortedArr2 = arr2.slice().sort();

  return sortedArr1.every((value, index) => value === sortedArr2[index]);
};

test('diff tests', async (t) => {
  await t.test('diff primitives', async (t) => {
    await t.test('should return first if second is null/undefined', () => {
      const value1 = 1;
      const value2 = undefined;

      const cfg1 = new Config(value1);
      const cfg2 = new Config(value2);
      const diff = cfg1.diff(cfg2);

      const result = diff.toJSON();

      assert.strictEqual(result, value1);
    });

    await t.test('should return null if both values are equal', () => {
      const value1 = 2;
      const value2 = 2;

      const cfg1 = new Config(value1);
      const cfg2 = new Config(value2);
      const diff = cfg1.diff(cfg2);

      const result = diff.toJSON();

      assert.strictEqual(result, null);
    });

    await t.test('should return second if both values are present and not equal', () => {
      const value1 = 1;
      const value2 = 2;

      const cfg1 = new Config(value1);
      const cfg2 = new Config(value2);
      const diff = cfg1.diff(cfg2);

      const result = diff.toJSON();

      assert.strictEqual(result, value2);
    });
  });

  await t.test('diff array of primitives', async (t) => {
    await t.test('should return first array if second is empty', () => {
      const value1 = [1, 2, 3, 4];
      const value2 = [];

      const cfg1 = new Config(value1);
      const cfg2 = new Config(value2);
      const diff = cfg1.diff(cfg2);

      const result = diff.toJSON();

      assert.deepEqual(result, value1);
    });

    await t.test('should return second if first array is empty', () => {
      const value1 = [];
      const value2 = [1, 2, 3, 4];

      const cfg1 = new Config(value1);
      const cfg2 = new Config(value2);
      const diff = cfg1.diff(cfg2);

      const result = diff.toJSON();

      assert.deepEqual(result, value2);
    });

    await t.test('should return excluded elements', () => {
      const value1 = [1, 2, 3, 4];
      const value2 = [1, 3];

      const cfg1 = new Config(value1);
      const cfg2 = new Config(value2);
      const diff = cfg1.diff(cfg2);

      const result = diff.toJSON();
      const expected = [2, 4];

      assert.deepEqual(result, expected);
    });

    await t.test('should return included elements', () => {
      const value1 = [1, 2, 3, 4];
      const value2 = [1, 2, 3, 4, 5];

      const cfg1 = new Config(value1);
      const cfg2 = new Config(value2);
      const diff = cfg1.diff(cfg2);

      const result = diff.toJSON();
      const expected = [5];

      assert.deepEqual(result, expected);
    });

    await t.test('should return newely included and excluded elements', () => {
      const value1 = [1, 2, 3, 4];
      const value2 = [1, 2, 3, 5];

      const cfg1 = new Config(value1);
      const cfg2 = new Config(value2);
      const diff = cfg1.diff(cfg2);

      const result = diff.toJSON();
      const expected = [4, 5];

      assert.deepEqual(result, expected);
    });
  });

  await t.test('objects with primitive values', async (t) => {
    await t.test('should return first if second is null/undefined', () => {
      const value1 = { a: 1 };
      const value2 = { a: undefined };

      const cfg1 = new Config(value1);
      const cfg2 = new Config(value2);
      const diff = cfg1.diff(cfg2);

      const result = diff.toJSON();

      assert.deepEqual(result, value1);
    });

    await t.test('should return null if both values are equal', () => {
      const value1 = { a: 2 };
      const value2 = { a: 2 };

      const cfg1 = new Config(value1);
      const cfg2 = new Config(value2);
      const diff = cfg1.diff(cfg2);

      const result = diff.toJSON();

      assert.strictEqual(result, null);
    });

    await t.test('should return second if both values are present and not equal', () => {
      const value1 = { a: 1 };
      const value2 = { a: 2 };

      const cfg1 = new Config(value1);
      const cfg2 = new Config(value2);
      const diff = cfg1.diff(cfg2);

      const result = diff.toJSON();

      assert.deepEqual(result, value2);
    });
  });

  await t.test('objects with nested arrays', async (t) => {
    await t.test('should return first array if second is empty', () => {
      const value1 = { countries: [1, 2, 3, 4] };
      const value2 = { countries: [] };

      const cfg1 = new Config(value1);
      const cfg2 = new Config(value2);
      const diff = cfg1.diff(cfg2);

      const result = diff.toJSON();

      assert.deepEqual(result, value1);
    });

    await t.test('should return second if first array is empty', () => {
      const value1 = { countries: [] };
      const value2 = { countries: [1, 2, 3, 4] };

      const cfg1 = new Config(value1);
      const cfg2 = new Config(value2);
      const diff = cfg1.diff(cfg2);

      const result = diff.toJSON();

      assert.deepEqual(result, value2);
    });

    await t.test('should return excluded elements', () => {
      const value1 = { countries: [1, 2, 3, 4] };
      const value2 = { countries: [1, 3] };

      const cfg1 = new Config(value1);
      const cfg2 = new Config(value2);
      const diff = cfg1.diff(cfg2);

      const result = diff.toJSON();
      const expected = { countries: [2, 4] };

      assert.deepEqual(result, expected);
    });

    await t.test('should return included elements', () => {
      const value1 = { countries: [1, 2, 3, 4] };
      const value2 = { countries: [1, 2, 3, 4, 5] };

      const cfg1 = new Config(value1);
      const cfg2 = new Config(value2);
      const diff = cfg1.diff(cfg2);

      const result = diff.toJSON();
      const expected = { countries: [5] };

      assert.deepEqual(result, expected);
    });

    await t.test('should return newely included and excluded elements', () => {
      const value1 = { countries: [1, 2, 3, 4] };
      const value2 = { countries: [1, 2, 3, 5] };

      const cfg1 = new Config(value1);
      const cfg2 = new Config(value2);
      const diff = cfg1.diff(cfg2);

      const result = diff.toJSON();
      const expected = { countries: [4, 5] };

      assert.deepEqual(result, expected);
    });
  });

  await t.test('mixed test cases', async (t) => {
    await t.test('should return null on equal configs', () => {
      const group = new Config({
        countries: [1, 2, 3, 4, 5],
        order: {
          show: true,
          rows: ['id', 'phone', 'country', 'departments']
        }
      });
      const user = new Config({
        countries: [1, 2, 3, 4, 5],
        order: {
          show: true,
          rows: ['id', 'phone', 'country', 'departments']
        }
      });

      const diff = group.diff(user);
      const result = diff.toJSON();

      assert.deepEqual(result, null);
    });

    await t.test('should return only fields that differ', () => {
      const group = new Config({
        countries: [1, 2, 3, 4, 5],
        order: {
          show: true,
          rows: ['id', 'phone', 'country', 'departments']
        }
      });
      const user = new Config({
        countries: [1, 2, 3, 4, 5],
        order: {
          show: false,
          rows: ['id', 'phone', 'country', 'departments']
        }
      });

      const diff = group.diff(user);
      const result = diff.toJSON();

      const expected = {
        order: {
          show: false
        }
      };

      assert.deepEqual(result, expected);
    });

    await t.test('should return second config if first is empty', () => {
      const group = new Config({});
      const user = new Config({
        countries: [1, 2, 3, 4, 5],
        order: {
          show: true,
          rows: ['id', 'phone', 'country', 'departments']
        }
      });

      const diff = group.diff(user);
      const result = diff.toJSON();

      const expected = user.toJSON();

      assert.deepEqual(result, expected);
    });
  });
});

test('glue tests', async (t) => {
  await t.test('glue primitives', async (t) => {
    await t.test('should return first value when diff in null', () => {
      const group = new Config(1);
      const diff = new Config(null);

      const user = group.glue(diff);
      const result = user.toJSON();

      const expected = 1;

      assert.strictEqual(result, expected);
    });

    await t.test('should return diff value when group cfg in null', () => {
      const group = new Config(null);
      const diff = new Config(2);

      const user = group.glue(diff);
      const result = user.toJSON();

      const expected = 2;

      assert.strictEqual(result, expected);
    });

    await t.test('should return diff as a newer value', () => {
      const group = new Config(3);
      const diff = new Config(5);

      const user = group.glue(diff);
      const result = user.toJSON();

      const expected = 5;

      assert.strictEqual(result, expected);
    });

    await t.test('should return 0 as a newer value', () => {
      const group = new Config(3);
      const diff = new Config(0);

      const user = group.glue(diff);
      const result = user.toJSON();

      const expected = 0;

      assert.strictEqual(result, expected);
    });
  });

  await t.test('glue array of primitives', async (t) => {
    await t.test('should return group when diff is null', () => {
      const group = new Config([1, 2, 3, 4]);
      const diff = new Config(null);

      const user = group.glue(diff);
      const result = user.toJSON();

      const expected = [1, 2, 3, 4];

      assert.ok(arraysContainSameElements(result, expected));
    });

    await t.test('should return group when diff is empty array', () => {
      const group = new Config([1, 2, 3, 4]);
      const diff = new Config([]);

      const user = group.glue(diff);
      const result = user.toJSON();

      const expected = [1, 2, 3, 4];

      assert.ok(arraysContainSameElements(result, expected));
    });

    await t.test('should return diff when base config is null', () => {
      const group = new Config(null);
      const diff = new Config([1, 2, 3, 4]);

      const user = group.glue(diff);
      const result = user.toJSON();

      const expected = [1, 2, 3, 4];

      assert.ok(arraysContainSameElements(result, expected));
    });

    await t.test('should return diff when base config is empty array', () => {
      const group = new Config([]);
      const diff = new Config([1, 2, 3, 4]);

      const user = group.glue(diff);
      const result = user.toJSON();

      const expected = [1, 2, 3, 4];

      assert.ok(arraysContainSameElements(result, expected));
    });

    await t.test('should return array of exclusive values', () => {
      const group = new Config([1, 2, 3, 4]);
      const diff = new Config([3, 5]);

      const user = group.glue(diff);
      const result = user.toJSON();

      const expected = [1, 2, 4, 5];

      assert.ok(arraysContainSameElements(result, expected));
    });

    await t.test('should return null when two arrays duplicate each other', () => {
      const group = new Config([1, 2, 3, 4]);
      const diff = new Config([1, 2, 3, 4]);

      const user = group.glue(diff);
      const result = user.toJSON();

      const expected = [];

      assert.deepEqual(result, expected);
    });
  });

  await t.test('objects with primitive values', async (t) => {
    await t.test('should return first if second is null/undefined', () => {
      const group = new Config({
        name: 'Maksym'
      });
      const diff = new Config(null);

      const user = group.glue(diff);
      const result = user.toJSON();

      const expected = {
        name: 'Maksym'
      };

      assert.deepEqual(result, expected);
    });

    await t.test('should return second when objects differs', () => {
      const group = new Config({
        name: 'Maksym'
      });
      const diff = new Config({
        name: ''
      });

      const user = group.glue(diff);
      const result = user.toJSON();

      const expected = {
        name: ''
      };

      assert.deepEqual(result, expected);
    });

    await t.test('should return combined object of changed and old values', () => {
      const group = new Config({
        name: 'Maksym',
        age: 65
      });
      const diff = new Config({
        name: 'NewName',
      });

      const user = group.glue(diff);
      const result = user.toJSON();

      const expected = {
        name: 'NewName', // new value from diff
        age: 65 // inherited value
      };

      assert.deepEqual(result, expected);
    });
  });

  await t.test('objects with nested arrays', async (t) => {
    await t.test('should return first-like object when diff is null', () => {
      const group = new Config({
        countries: [1, 2, 3, 4]
      });

      const diff = new Config(null);

      const user = group.glue(diff);
      const result = user.toJSON();

      const expected = {
        countries: [1, 2, 3, 4]
      };

      assert.deepEqual(result, expected);
    });

    await t.test('should return first-like object when diff is empty', () => {
      const group = new Config({
        countries: [1, 2, 3, 4]
      });

      const diff = new Config({
        countries: []
      });

      const user = group.glue(diff);
      const result = user.toJSON();

      const expected = {
        countries: [1, 2, 3, 4]
      };

      assert.deepEqual(result, expected);
    });

    await t.test('should return diff-like object when group is null', () => {
      const group = new Config(null);

      const diff = new Config({
        countries: [1, 2, 3, 4]
      });

      const user = group.glue(diff);
      const result = user.toJSON();

      const expected = {
        countries: [1, 2, 3, 4]
      };

      assert.deepEqual(result, expected);
    });

    await t.test('should return diff-like object when group is empty', () => {
      const group = new Config({
        countries: []
      });

      const diff = new Config({
        countries: [1, 2, 3, 4]
      });

      const user = group.glue(diff);
      const result = user.toJSON();

      const expected = {
        countries: [1, 2, 3, 4]
      };

      assert.deepEqual(result, expected);
    });

    await t.test('should return object with array of exclusive values', () => {
      const group = new Config({
        countries: [1, 2, 3, 4]
      });

      const diff = new Config({
        countries: [1, 2, 3, 4, 5]
      });

      const user = group.glue(diff);
      const result = user.toJSON();

      const expected = {
        countries: [5]
      };

      assert.deepEqual(result, expected);
    });

    await t.test('should return null if group and diff are equal', () => {
      const group = new Config({
        countries: [1, 2, 3, 4]
      });

      const diff = new Config({
        countries: [1, 2, 3, 4]
      });

      const user = group.glue(diff);
      const result = user.toJSON();

      const expected = {
        countries: []
      };

      assert.deepEqual(result, expected);
    });

    await t.test('should return only nested arrays that differs', () => {
      const group = new Config({
        countries: [1, 2, 3, 4],
        departments: [1, 2, 3]
      });

      const diff = new Config({
        countries: [1, 2, 3, 4],
        departments: [3, 4]
      });

      const user = group.glue(diff);
      const result = user.toJSON();

      const expected = {
        countries: [],
        departments: [1, 2, 4]
      };

      assert.deepEqual(result, expected);
    });
  });

  await t.test('objects with nested objects', async (t) => {
    await t.test('should return diff as more recent values', () => {
      const group = new Config({
        permissions: {
          show: true,
          draggable: true
        }
      });

      const diff = new Config({
        permissions: {
          show: false,
          draggable: false
        }
      });

      const user = group.glue(diff);
      const result = user.toJSON();

      const expected = {
        permissions: {
          show: false,
          draggable: false
        }
      };

      assert.deepEqual(result, expected);
    });

    await t.test('should return group if diff is null', () => {
      const group = new Config({
        permissions: {
          show: true,
          draggable: true
        }
      });

      const diff = new Config(null);

      const user = group.glue(diff);
      const result = user.toJSON();

      const expected = {
        permissions: {
          show: true,
          draggable: true
        }
      };

      assert.deepEqual(result, expected);
    });

    await t.test('should return new values from diff and missing values from group', () => {
      const group = new Config({
        permissions: {
          show: true,
          draggable: false
        }
      });

      const diff = new Config({
        permissions: {
          draggable: true
        }
      });

      const user = group.glue(diff);
      const result = user.toJSON();

      const expected = {
        permissions: {
          show: true,
          draggable: true
        }
      };

      assert.deepEqual(result, expected);
    });
  });
});

test('combined diff with glue tests', async (t) => {
  await t.test('when user has not changed any configs', () => {
    const group = new Config({
      countries: [1, 2, 3, 4],
      permissions: {
        show: true,
        draggable: false
      }
    });

    const user = new Config({
      countries: [1, 2, 3, 4],
      permissions: {
        show: true,
        draggable: false
      }
    });

    const diff = group.diff(user);
    const newUser = group.glue(diff);

    const result = newUser.toJSON();
    const expected = user.toJSON();

    assert.deepEqual(result, expected);
  });

  await t.test('when user delete some entries', () => {
    const group = new Config({
      countries: [1, 2, 3, 4],
      permissions: {
        show: true,
        draggable: false
      }
    });

    const user = new Config({
      countries: [1, 2],
      permissions: {
        show: true,
        draggable: false
      }
    });

    const diff = group.diff(user);
    const newUser = group.glue(diff);

    const result = newUser.toJSON();
    const expected = user.toJSON();

    assert.deepEqual(result, expected);
  });

  await t.test('when user add some entries', () => {
    const group = new Config({
      countries: [1, 2, 3, 4],
      permissions: {
        show: true,
        draggable: false
      }
    });

    const user = new Config({
      countries: [1, 2, 3, 4, 5],
      permissions: {
        show: true,
        draggable: false
      }
    });

    const diff = group.diff(user);
    const newUser = group.glue(diff);

    const result = newUser.toJSON();
    const expected = user.toJSON();

    assert.deepEqual(result, expected);
  });

  await t.test('when user delete and add some entries', () => {
    const group = new Config({
      countries: [1, 2, 3, 4],
      permissions: {
        show: true,
        draggable: false
      }
    });

    const user = new Config({
      countries: [1, 2, 5],
      permissions: {
        show: true,
        draggable: true
      }
    });

    const diff = group.diff(user);
    const newUser = group.glue(diff);

    const result = newUser.toJSON();
    const expected = user.toJSON();

    assert.deepEqual(result, expected);
  });

  await t.test('glue should restore when all nested arrays are empty', () => {
    const group = new Config({
      countries: [1, 2, 3, 4, 5],
      order: {
        rows: ['id', 'status', 'attribute'],
        show: true
      },
      cardOrder: {
        settings: {
          comment: {
            show: true
          },
          contact: {
            show: true,
            rows: ['country', 'department']
          }
        },
        show: true
      }
    });

    const user = new Config({
      countries: [],
      order: {
        rows: [],
        show: true
      },
      cardOrder: {
        settings: {
          comment: {
            show: true
          },
          contact: {
            show: true,
            rows: []
          }
        },
        show: true
      }
    });

    const diff = group.diff(user);
    const newUser = group.glue(diff);

    const result = newUser.toJSON();
    const expected = user.toJSON();

    assert.deepEqual(result, expected);
  });

  await t.test('should correctly restore values added to user', () => {
    const group = new Config({
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
    });

    const user = new Config({
      countries: [1, 2, 3, 4, 5],
      order: {
        rows: ['attribute', 'id', 'status'],
        show: true
      },
      cardOrder: {
        settings: {
          comment: {
            show: true
          },
          contact: {
            show: true,
            rows: ['country', 'department']
          }
        },
        show: true
      }
    });

    const diff = group.diff(user);
    const newUser = group.glue(diff);

    const result = newUser.toJSON();
    const expected = user.toJSON();

    assert.deepEqual(result, expected);
  });

  await t.test('######', () => {
    const group = new Config({
      countries: [1, 2, 3, 4, 5],
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
    });

    const user = new Config({
      countries: [],
      order: {
        rows: ['attribute', 'id', 'status'],
        show: true
      },
      cardOrder: {
        settings: {
          comment: {
            show: true
          },
          contact: {
            show: true,
            rows: ['country', 'department']
          }
        },
        show: true
      }
    });

    const diff = group.diff(user);
    const newUser = group.glue(diff);

    const result = newUser.toJSON();
    const expected = user.toJSON();

    assert.deepEqual(result, expected);
  });
});

test('resolving timestamped objects', async (t) => {
  await t.test('should pick new values when "time" is more recent in user config', async (t) => {
    await t.test('with primitives', () => {
      const group = new Config({
        a: 1,
        name: 'Johnny',
        time: 1000
      });

      const user = new Config({
        a: 3,
        name: 'James',
        time: 2000
      });

      const diff = group.diff(user);
      const newUser = group.glue(diff);

      const result = newUser.toJSON();
      const expected = { a: 3, name: 'James', time: 2000 };

      assert.deepEqual(result, expected);
    });

    await t.test('with arrays of primitives', () => {
      const group = new Config({
        a: [1, 2, 3, 4],
        time: 1000
      });

      const user = new Config({
        a: [4, 5],
        time: 2000
      });

      const diff = group.diff(user);
      const newUser = group.glue(diff);

      const result = newUser.toJSON();
      const expected = { a: [4, 5], time: 2000 };

      assert.deepEqual(result, expected);
    });

    await t.test('with nested objects', () => {
      const group = new Config({
        a: {
          name: 'Johnny'
        },
        time: 1000
      });

      const user = new Config({
        a: {
          name: 'James'
        },
        time: 2000
      });

      const diff = group.diff(user);
      const newUser = group.glue(diff);

      const result = newUser.toJSON();
      const expected = { a: { name: 'James' }, time: 2000 };

      assert.deepEqual(result, expected);
    });
  });

  await t.test('should pick old values when "time" is more recent in group config', async (t) => {
    await t.test('with primitives', () => {
      const group = new Config({
        a: 1,
        name: 'Johnny',
        time: 3000
      });

      const user = new Config({
        a: 3,
        name: 'James',
        time: 2000
      });

      const diff = group.diff(user);
      const newUser = group.glue(diff);
      const result = newUser.toJSON();
      const expected = { a: 1, name: 'Johnny', time: 3000 };

      assert.deepEqual(result, expected);
    });

    await t.test('with arrays of primitives', () => {
      const group = new Config({
        a: [1, 2, 3, 4],
        time: 3000
      });

      const user = new Config({
        a: [4, 5],
        time: 2000
      });

      const diff = group.diff(user);
      const newUser = group.glue(diff);
      const result = newUser.toJSON();
      const expected = { a: [1, 2, 3, 4], time: 3000 };

      assert.deepEqual(result, expected);
    });

    await t.test('with nested objects', () => {
      const group = new Config({
        a: [1, 2, 3, 4],
        time: 3000
      });

      const user = new Config({
        a: [4, 5],
        time: 2000
      });

      const diff = group.diff(user);
      const newUser = group.glue(diff);
      const result = newUser.toJSON();
      const expected = { a: [1, 2, 3, 4], time: 3000 };

      assert.deepEqual(result, expected);
    });
  });

  await t.test('combined nesting objects with old and more recent "time"', () => {
    const group = new Config({
      countries: {
        values: [1, 2, 3, 4, 5],
        time: 1000
      },
      departments: {
        values: [10, 20],
        time: 3000
      }
    });

    const user = new Config({
      countries: {
        values: [4, 5],
        time: 2000
      },
      departments: {
        values: [20, 30],
        time: 2000
      }
    });

    const diff = group.diff(user);
    const newUser = group.glue(diff);

    const result = newUser.toJSON();
    const expected = {
      countries: {
        values: [4, 5],
        time: 2000
      },
      departments: {
        values: [10, 20],
        time: 3000
      }
    };

    assert.deepEqual(result, expected);
  });

  await t.test('combined timestamped nested objects with regular one', () => {
    const group = new Config({
      countries: {
        values: [1, 2, 3, 4, 5],
        time: 1000
      },
      departments: {
        values: [10, 20],
        time: 3000
      },
      statuses: [1, 2, 3, 4]
    });

    const user = new Config({
      countries: {
        values: [4, 5],
        time: 2000
      },
      departments: {
        values: [20, 30],
        time: 2000
      },
      statuses: [2, 3, 4, 10]
    });

    const diff = group.diff(user);
    const newUser = group.glue(diff);

    const result = newUser.toJSON();
    const expected = {
      countries: {
        values: [4, 5],
        time: 2000
      },
      departments: {
        values: [10, 20],
        time: 3000
      },
      statuses: [2, 3, 4, 10]
    };

    assert.deepEqual(result, expected);
  });
});

test('timestamping tests', async (t) => {
  await t.test('should not touch first nesting level', () => {
    const inital = { a: 1, name: 'Johnny' };
    const prevState = {};

    const result = timestampObject(inital, prevState);
    const expected = { a: 1, name: 'Johnny' };

    assert.deepEqual(result, expected);
  });

  await t.test('should timestamp second nesting level', () => {
    const inital = { a: 1, name: 'Johnny', order: { fields: ['address', 'id'] } };
    const prevState = {};

    const time = Date.now();

    const result = timestampObject(inital, prevState, time);
    const expected = { a: 1, name: 'Johnny', order: { fields: ['address', 'id'], time } };

    assert.deepEqual(result, expected);
  });

  await t.test('should timestamp only second nesting level and skip further nesting', () => {
    const inital = {
      a: 1,
      name: 'Johnny',
      order: {
        fields: ['address', 'id'],
        nestedObject: {
          random: 'value'
        }
      },
    };
    const prevState = {};

    const time = Date.now();

    const result = timestampObject(inital, prevState, time);
    const expected = {
      a: 1,
      name: 'Johnny',
      order: {
        fields: ['address', 'id'],
        time,
        nestedObject: {
          random: 'value'
        }
      },
    };

    assert.deepEqual(result, expected);
  });

  await t.test('should timestamp many second level nested objects', () => {
    const inital = {
      a: 1,
      name: 'Johnny',
      order: {
        fields: ['address', 'id'],
        nestedObject: {
          random: 'value'
        }
      },
      permissions: {
        show: true
      }
    };
    const prevState = {};

    const time = Date.now();

    const result = timestampObject(inital, time);
    const expected = {
      a: 1,
      name: 'Johnny',
      order: {
        time,
        fields: ['address', 'id'],
        nestedObject: {
          random: 'value'
        }
      },
      permissions: {
        time,
        show: true
      }
    };

    assert.deepEqual(result, expected);
  });

  await t.test('should timestamp only second level nested objects that differs', () => {
    const inital = {
      a: 1,
      name: 'Johnny',
      order: {
        fields: ['address', 'id', 'new field'],
        nestedObject: {
          random: 'value'
        }
      },
      permissions: {
        show: true
      }
    };
    const prevState = {
      a: 1,
      name: 'Johnny',
      order: {
        fields: ['address', 'id'],
        nestedObject: {
          random: 'value'
        }
      },
      permissions: {
        show: true
      }
    };

    const time = Date.now();

    const result = timestampObject(inital, prevState, time);
    const expected = {
      a: 1,
      name: 'Johnny',
      order: {
        time,
        fields: ['address', 'id', 'new field'],
        nestedObject: {
          random: 'value'
        }
      },
      permissions: {
        show: true
      }
    };

    assert.deepEqual(result, expected);
  });
});

});

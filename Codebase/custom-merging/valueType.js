const getType = (value) => {
  if (Array.isArray(value)) {
    const [element] = value;
    const type = typeof element;
    if (type !== 'object') return 'primitiveArray';
    return 'objectsArray';
  }
  if (typeof value === 'object') {
    if ('time' in value) return 'timestampedObject';
    return 'object';
  };
  return 'primitive';
};

module.exports = getType;
export const toStrictLower = (str: string) => {
  return str.replace(/\s/g, '-').toLowerCase();
}

export const toCamelCase = (str) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return word.toUpperCase();
  }).replace(/\s+/g, ' ');
}

export const normalizeStr = (str: string) => {
  let newStr = str.replace('-', ' ')
  return toCamelCase(newStr);
}

export const generateRandomNum = () => {
  return Math.floor( Math.random() * ( 1 + 200 - 1 ) )
}

export const mappingColorPriority = (status: string) => {
  switch (status) {
    case 'normal': {
      return '#00A790'
    }
    case 'very-high': {
      return '#ED4C5C'
    }
    case 'high': {
      return '#F8A541'
    }
    case 'low': {
      return '#428BC1'
    }
    case 'very-low': {
      return '#8942C1'
    }
    default: {
      return 'transparent'
    }
  }
}


export const parseDate = (date: string) => {
  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ]

  const newDate = new Date(date);
  const day = newDate.getDay()
  const month = months[newDate.getMonth()]
  const year = newDate.getFullYear()
  
  return `${day} ${month} ${year}` || 'Date not valid'
};


// From: https://gist.github.com/jherax/8781f45dcd068a9e3e37
export const sortBy = (function () {
  const toString = Object.prototype.toString,
      // default parser function
      parse = function (x) { return x; },
      // gets the item to be sorted
      getItem = function (x) {
        var isObject = x != null && typeof x === "object";
        var isProp = isObject && this.prop in x;
        return this.parser(isProp ? x[this.prop] : x);
      };
      
  /**
   * Sorts an array of elements.
   *
   * @param {Array} array: the collection to sort
   * @param {Object} cfg: the configuration options
   * @property {String}   cfg.prop: property name (if it is an Array of objects)
   * @property {Boolean}  cfg.desc: determines whether the sort is descending
   * @property {Function} cfg.parser: function to parse the items to expected type
   * @return {Array}
   */
  return function sortby (array, cfg) {
    if (!(array instanceof Array && array.length)) return [];
    if (toString.call(cfg) !== "[object Object]") cfg = {};
    if (typeof cfg.parser !== "function") cfg.parser = parse;
    cfg.desc = !!cfg.desc ? -1 : 1;
    return array.sort(function (a, b) {
      a = getItem.call(cfg, a);
      b = getItem.call(cfg, b);
      return cfg.desc * (a < b ? -1 : +(a > b));
    });
  };
  
}());
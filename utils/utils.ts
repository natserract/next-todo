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

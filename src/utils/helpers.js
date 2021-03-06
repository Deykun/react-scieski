export const allowedFormats = ['gpx','tcx']

export const divideIntoSmallerArrays = (arr, sizeOfSmallerArray) => {
  const newArr = []
  arr.forEach( (item, index) => {
    if (
      !newArr.length ||
      newArr[newArr.length - 1].length === sizeOfSmallerArray
    ) {
      newArr.push([])
    }
    newArr[newArr.length - 1].push(item)
  })
  return newArr
}

export const checkFileMetadata = ( file ) => {
  const lastDot = file.name.lastIndexOf('.')
  const response = {
    isFormatAllowed: null,
    data: {
      name: file.name,
      format: file.name.substring(lastDot + 1).toLowerCase(),
      title: file.name.slice(0, lastDot)
    }
  }

  response.isFormatAllowed = allowedFormats.includes( response.data.format )

  return response
}

export const checkResponseMetadata = ( urlResponse ) => {
  const lastSlash = urlResponse.url.lastIndexOf('/')
  const fileName = urlResponse.url.substring(lastSlash + 1)
  const lastDot = fileName.lastIndexOf('.')
  const response = {
    isFormatAllowed: null,
    data: {
      name: fileName,
      format: fileName.substring(lastDot + 1).toLowerCase(),
      title: fileName.slice(0, lastDot).replace(/%20/g, ' ')
    }
  }

  response.isFormatAllowed = allowedFormats.includes( response.data.format )

  return response
}

export const forEachPromise = (items, fn, fnres) => {
  return items.reduce(function (promise, item) {
    return promise.then(function () {
      return fn(item)
    }).then( (res) => { fnres(res) } )
  }, Promise.resolve())
}
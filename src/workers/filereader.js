export default () => {
  self.addEventListener('message', (message) =>  {// eslint-disable-line no-restricted-globals
    if ( message.data.length > 0 ) {
      message.data.forEach( (item) => {
        self.postMessage( item.name ) // eslint-disable-line no-restricted-globals
      })
    }
  })
}
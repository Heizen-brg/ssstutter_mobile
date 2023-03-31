import React from 'react'
import Icon from './Icon'

const Loader = () => {
  return (
    <div className='fixed z-20 top-0 left-0 w-screen h-screen grid place-content-center'>
      <Icon name="loading" width="50" height="50"/>
    </div>
  )
}

export default Loader
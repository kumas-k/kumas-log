import React, { FunctionComponent } from 'react'
import Head from 'components/Head'

const NotFoundPage: FunctionComponent = () => {
  return (
    <>
      <Head />
      <div className="flex items-center m-auto">
        <h2>404 ERROR</h2>
        <h3>Page Not Found</h3>
      </div>
    </>
  )
}

export default NotFoundPage

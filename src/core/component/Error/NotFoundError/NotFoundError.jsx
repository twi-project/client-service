import React, {Fragment} from "react"
import {Link} from "react-router-dom"

import Title from "common/component/Title"
import ApplicationError from "core/component/Error/ApplicationError"

import {container, content, image, message, code} from "./not-found-error.scss"

import Image from "./not-found-error.svg"

class NotFound extends ApplicationError {
  render() {
    return (
      <Fragment>
        <Title title="Page Not Found" />

        <div className={container}>
          <div className={content}>
            <div className={image}>
              <Image />
            </div>
            <div className={message}>
              <div>There are no books out there, princess!</div>
              <div>
                <Link href to="/">Let‘s head home?</Link>
              </div>
            </div>
            <div className={code}>404</div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default NotFound
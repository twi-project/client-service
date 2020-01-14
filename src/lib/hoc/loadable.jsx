import {createElement} from "react"

import isPlainObject from "lodash/isPlainObject"
import partial from "lodash/partial"

import useSuspender from "lib/hook/useSuspender"
import parallel from "lib/helper/object/runParallel"
import waterfall from "lib/helper/array/runWaterfall"
import resolve from "lib/helper/util/requireDefault"
import serial from "lib/helper/object/runSerial"
import map from "lib/helper/iterator/objectMap"

const defaults = {
  name: undefined,
  serial: false
}

const createLoadable = (options = {}) => Target => {
  let {name, loaders, suspense, id, ...params} = {...defaults, ...options}

  let suspender = null
  if (loaders) {
    if (isPlainObject(loaders)) {
      loaders = params.serial ? serial : parallel
    }

    suspender = partial(waterfall, [loaders, result => map(result, resolve)])
  }

  function Loadable(props) {
    const data = useSuspender(suspender, id, [props]) ?? {}

    return createElement(Target, {...props, ...data})
  }

  if (process.env.NODE_ENV !== "production" && name) {
    // eslint-disable-next-line react/static-property-placement
    Loadable.displayName = `Loadable(${name})`
  }

  return Loadable
}

export default createLoadable
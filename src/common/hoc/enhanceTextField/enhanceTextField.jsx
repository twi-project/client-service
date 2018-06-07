import {h, Component} from "preact"
import {func} from "prop-types"

import getName from "core/helper/component/getName"

const assign = Object.assign

const enhanceTextField = Target => {
  class EnhanceTextField extends Component {
    static displayName = `EnhanceTextField(${getName(Target)})`

    static propTypes = {
      onEnter: func,
      onEsc: func,
      onKeyPress: func,
      onKeyUp: func
    }

    static defaultProps = {
      onEnter: null,
      onEsc: null,
      onKeyPress: () => {},
      onKeyUp: () => {}
    }

    onEnter = event => {
      if (event.key.toLowerCase() === "enter") {
        return void this.props.onEnter(event)
      }

      this.props.onKeyPress(event)
    }

    onEsc = event => {
      if (event.key.toLowerCase() === "escape") {
        return void this.props.onEsc(event)
      }

      this.props.onKeyUp(event)
    }

    setRef = ref => {
      if (ref) {
        this.field = ref.base
      }
    }

    render() {
      return h(Target, assign({}, this.props, {
        onKeyPress: this.onEnter,
        onKeyUp: this.onEsc,
        ref: this.setRef
      }))
    }
  }

  return EnhanceTextField
}

export default enhanceTextField

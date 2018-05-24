import {h, Component} from "preact"
import {observer} from "mobx-preact"
import {func, string} from "prop-types"

import TextArea from "common/component/EnhancedTextField/TextAreaWithAutoSize"

import {field} from "./description-editor.sss"

@observer class DescriptionEditor extends Component {
  static displayName = "StoryDescriptionEditor"

  static propTypes = {
    description: string,
    onInput: func,
    onKeyDown: func,
    onBackspace: func
  }

  static defaultProps = {
    description: "",
    onInput: () => {},
    onKeyDown: () => {},
    onBackspace: () => {}
  }

  onBackspace = event => {
    if (event.key.toLowerCase() === "backspace") {
      return void this.props.onBackspace(event)
    }

    this.props.onKeyDown(event)
  }

  render() {
    return (
      <TextArea
        name="description"
        placeholder="Write the story description here"
        class={field}
        onInput={this.props.onInput}
        value={this.props.description}
        onKeyDown={this.onBackspace}
        rows={6}
      />
    )
  }
}

export default DescriptionEditor

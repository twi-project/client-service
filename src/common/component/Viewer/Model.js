import {types} from "mobx-state-tree"

import User from "common/model/store/user/User"

const {string} = types

const schema = {
  email: string
}

const Viewer = User.named("Viewer").props(schema)

export default Viewer

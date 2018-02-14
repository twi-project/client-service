import {h} from "preact"
import {string, element, arrayOf, shape} from "prop-types"
import {Switch, Route} from "react-router-dom"

import NotFound from "common/page/error/http/NotFound"

const Router = ({routes}) => (
  <Switch>
    {routes.map(props => <Route exact {...props} />)}

    {/* Render 404 error when no page found */}
    <Route component={NotFound} />
  </Switch>
)

Router.propTypes = {
  routes: arrayOf(
    shape({
      path: string.isRequired,
      component: element.isRequired
    }).isRequired
  ).isRequired
}

export default Router

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStore } from 'reselect'
import { Button } from 'react-bootstrap'

// Import selectors defined in poi
import { extensionSelectorFactory } from 'views/utils/selectors'

EXTENSION_KEY = 'poi-plugin-click-button'
// This selector gets store.ext['poi-plugin-click-button']
const pluginDataSelector = createStore(
  extensionSelectorFactory(EXTENSION_KEY),
  (state) => state || {}
)
// This selector gets store.ext['poi-plugin-click-button'].count
const clickCountSelector = createStore(
  pluginDataSelector,
  (state) => state.count
)

// poi will insert this reducer into the root reducer of the app
export function reducer(state={count: 0}, action) {
  const {type} = action
  if (type === '@@poi-plugin-click-button@click')
    return {
      ...state,
      (state.count || 0) + 1,
    }
  return state
}

function increaseClick() {
  return {
    type: '@@poi-plugin-click-button@click'
  }
}

// poi will render this component in the plugin panel
export const reactClass = connect(
  // Get store.ext['poi-plugin-click-button'].count and set as this.props.click
  clickCountSelector,
  // Wrap increaseClick with dispatch and set as this.props.increaseClick
  {
    increaseClick,
  }
)(class PluginClickButton extends Component {
  render() {
    const {count, increaseClick} = this.props
    return (
      <div>
        <h1>Clicked: {count}</h1>
        <Button onClick={increaseClick}>
          Click here!
        </Button>
      </div>
    )
  }
})

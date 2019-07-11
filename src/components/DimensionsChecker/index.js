import React, { Component, } from 'react'
import { Dimensions, } from 'react-native'
import { isHorizontalOrientation, } from '../../utils'

const DimensionsChecker = WrappedComponent => class extends Component {
    state = {
      isHorizontal: isHorizontalOrientation(),
    }

    componentDidMount = () => {
      Dimensions.addEventListener('change', this.orientationHaveBeenChanged)
    }

    componentWillUnmount = () => {
      Dimensions.removeEventListener('change', this.orientationHaveBeenChanged)
    }

    orientationHaveBeenChanged = () => this.setState(prevState => ({ isHorizontal: !prevState.isHorizontal, }))

    render() {
      const { isHorizontal, } = this.state

      return <WrappedComponent isHorizontal={isHorizontal} {...this.props} />
    }
}

export { DimensionsChecker, }
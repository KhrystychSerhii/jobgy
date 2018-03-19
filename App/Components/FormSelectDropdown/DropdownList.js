import React from 'react'
import { ScrollView } from 'react-native'

class DropdownList extends React.Component {
  state = {
    selected: null,
  }
  handleCollapse = (index) => {
    this.setState(({selected}) => ({
        selected: (selected !== null && selected === index) ? null : index,
      }),
    )
  }

  render () {
    return (

      <ScrollView>
        {
          React.Children.map(this.props.children,
            (item, index) => React.cloneElement(
              item,
              {collapsed: this.state.selected === index, index, onCollapse: this.handleCollapse},
            ),
          )
        }
      </ScrollView>
    )
  }
}

export default DropdownList

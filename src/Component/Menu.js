import React from 'react';

import {View, Text} from 'react-native';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import {Icon} from 'react-native-elements';

class MenuCom extends React.PureComponent {
  _menu = null;

  setMenuRef = (ref) => {
    this._menu = ref;
  };

  hideMenu = (e) => {
    this._menu.hide();
    if (e === 'edit') {
      this.props.edit_report(e);
    } else {
    }
  };

  showMenu = (e) => {
    this._menu.show();
  };

  render() {
    return (
      <Menu
        ref={this.setMenuRef}
        button={
          <Icon onPress={this.showMenu} type={'antdesign'} name={'ellipsis1'} />
        }>
        <MenuItem onPress={() => this.hideMenu('edit')}>Edit</MenuItem>
        <MenuItem onPress={() => this.hideMenu('delete')}>Delete</MenuItem>
      </Menu>
    );
  }
}

export default MenuCom;

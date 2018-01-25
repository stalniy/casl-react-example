import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ability from '../config/ability';

const WARDENS = [];
let isAbilityPatched;

export default class Can extends PureComponent {
  static propTypes = {
    run: PropTypes.string,
    on: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  };

  state = {
    valid: false
  }

  get valid() {
    return this.state.valid
  }

  componentWillMount() {
    WARDENS.push(this)

    if (!isAbilityPatched) {
      this.makeAbilitiesToBeReactive();
    }

    this.revalidate()
  }

  componentWillUnmount() {
    const index = WARDENS.indexOf(this)
    WARDENS.splice(index, 1)
  }

  makeAbilitiesToBeReactive() {
    const updateAbilities = ability.update;

    ability.update = (...args) => {
      const result = updateAbilities.apply(ability, args);
      WARDENS.forEach(instance => instance.revalidate());
      return result;
    }
  }

  revalidate() {
    return this.setState({ valid: this.validate() })
  }

  validate() {
    return ability.can(this.props.run, this.props.on)
  }

  render() {
    return this.state.valid ? (<div>{this.props.children}</div>) : '';
  }
}

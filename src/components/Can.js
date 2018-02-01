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
    allowed: false
  }

  get allowed() {
    return this.state.allowed
  }

  componentWillMount() {
    WARDENS.push(this)

    if (!isAbilityPatched) {
      this.makeAbilitiesToBeReactive();
    }

    this.recheck()
  }

  componentWillUnmount() {
    const index = WARDENS.indexOf(this)
    WARDENS.splice(index, 1)
  }

  makeAbilitiesToBeReactive() {
    const updateAbilities = ability.update;

    ability.update = (...args) => {
      const result = updateAbilities.apply(ability, args);
      WARDENS.forEach(instance => instance.recheck());
      return result;
    }
  }

  recheck() {
    return this.setState({ allowed: this.check() })
  }

  check() {
    return ability.can(this.props.run, this.props.on)
  }

  render() {
    return this.state.allowed ? (<div>{this.props.children}</div>) : '';
  }
}

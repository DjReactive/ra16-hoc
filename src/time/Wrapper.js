import React, {useState} from 'react';
import { dateValues, sequence } from './defines'
//import { moment } from 'moment'

export function withDate(WrappedComponent, date) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {}
    }
    componentDidMount() {
      this.setState({ date: this.formatTimeAgo(date) });
    }
    formatTimeAgo(date) {
      const time = Date.now() - (new Date(date)).getTime();
      const value = this.getFullTime(time);

      for(let k, name, i=0; i < sequence.length; i++) {
        name = sequence[i];
        k = value[name];
        if (k > 0) {
          const count = k > 20 ? (k - Math.floor(value / 10)) : k;
          const text = (count === 1) ? dateValues[name].text[0] :
          count < 5 ? dateValues[name].text[1] :
          dateValues[name].text[2];
          return `${k} ${text} назад`;
        }
      }
      return 'менее 1 минуты назад';
    }
    getFullTime(time) {
      let obj = {};
      for (let key of Object.keys(dateValues)) {
        obj[key] = Math.floor(time / (dateValues[key].len * 1000));
      }
      return obj;
    }
    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  }
}

import React, {useState} from 'react';

export function withWrapper(WrappedComponent) {
  let WithComponent;
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { wrapper: null }
    }
    componentDidMount() {
      if (this.props.views >= 1000) {
        WithComponent = Popular;
      }
      if (this.props.views < 100) {
        WithComponent = New;
      }
      this.setState({ wrapper: WithComponent});
    }
    render() {
      if (WithComponent) {
        return (
          <WithComponent {...this.props}>
            <WrappedComponent {...this.props} />
          </WithComponent>
        );
      }
      return <WrappedComponent {...this.props} />;
    }
  }
}

function New(props) {
    return (
        <div className="wrap-item wrap-item-new">
            <span className="label">New!</span>
            {props.children}
        </div>
    )
};

function Popular(props) {
    return (
        <div className="wrap-item wrap-item-popular">
            <span className="label">Popular!</span>
            {props.children}
        </div>
    )
};

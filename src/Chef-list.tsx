import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import { Root } from "./root.component";
import { LifeCycleFn } from "single-spa";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

export let mountParcel = undefined
export const bootstrap: LifeCycleFn<any> = (props) => {
  mountParcel = props.mountParcel
  return lifecycles.bootstrap(props)
}

export const { mount, unmount } = lifecycles;

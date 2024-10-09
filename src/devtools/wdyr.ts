import React from 'react';

const useWDYR = __DEV__;

if (useWDYR) {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  const ReactRedux = require('react-redux');
  const defaultNotifier = whyDidYouRender.defaultNotifier;

  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackHooks: true,
    trackExtraHooks: [[ReactRedux, 'useSelector']],
    defaultNotifier,
  });
}

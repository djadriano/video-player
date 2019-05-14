import React from 'react';
import ReactDOM from 'react-dom';

import 'styles/index.scss';

import Layout from 'layouts/index';

ReactDOM.render(<Layout />, document.querySelector('.vp'));

if (module.hot) {
  module.hot.accept();
}

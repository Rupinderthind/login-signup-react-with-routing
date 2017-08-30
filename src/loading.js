import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import './common.css'

const LinearLoading = () => (
	<div className="loading">
  		<LinearProgress mode="indeterminate" />
  	</div>
);

export default LinearLoading;
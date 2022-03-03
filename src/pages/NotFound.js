import React from 'react';
import '../style/NotFound.css';

class NotFound extends React.Component {
  render() {
    return (
      <div data-testid="page-not-found" className="not-found-page">
        <h1 className="not-found">404 Not Found</h1>
      </div>
    );
  }
}

export default NotFound;

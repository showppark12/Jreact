import React, { Component } from 'react';

class Postview extends Component {
    render() {
        const{id, title, content}=this.props;
        return (
            <div>
                {id}
                <h3>{title}</h3>
                <p>{content}</p>
            </div>
        );
    }
}

export default Postview;

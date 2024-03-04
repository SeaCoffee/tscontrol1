import React, { Component } from 'react';
const constants = {
    numberStars: 5,
    starClass: 'star '
}
class Star extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberStars: props.numberStars !== undefined ? props.numberStars : constants.numberStars,
            size: props.size !== undefined ? props.size : ''
        };
    }
    renderStar = () => {
        var htmlStars = [];
        var className = constants.starClass + this.state.size;
        for (var index = 0; index < this.state.numberStars; index++) {
            htmlStars.push(<i key={index} className={className}></i>);
        }
        return <div>{htmlStars}</div>;
    }

    render() {
        return (
            <div>
                {this.renderStar()}
                <span class="star-icon full">☆</span>
                <span class="star-icon full">☆</span>
                <span class="star-icon full">☆</span>
                <span class="star-icon half">☆</span>
                <span class="star-icon">☆</span>
            </div>
        );
    }
}

export default Star;

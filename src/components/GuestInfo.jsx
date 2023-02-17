import React from "react"
import "./GuestInfo.css";


export default class GuestInfo extends React.Component {
    constructor(props) {
        super(props)
        
        this.first = props.first
        this.last = props.last
        this.email = props.email
        this.attending = props.attending
    }

    render() {
        const attendingString = this.attending ? "Attending" : "Not attending"
        
        return (
            <div className="guestInfo">
                <div className="guest">
                    <div className="name">{this.first} {this.last}</div>
                    <div className="email">{this.email}</div>
                </div>
                <div className={this.attending ? 'attending' : 'notAttending'}>
                    {attendingString}
                </div>
            </div>
        )
    }
}
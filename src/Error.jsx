import React from "react"

export default Error = () => {
    return (
        <div id="overlay">
            <h1>Uh-oh.</h1>
            <p>Something broke. Please return to the <a href='/'>Wedding website</a> or <a href='/rsvp'>RSVP</a> and try again.</p>
        </div>
    )
}
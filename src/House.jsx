import illustration from './img/Ellicottville_House_2.png'

const House = () => {
    return (
        <div className="infoPage">
            <h4>July 9th, 1893</h4>
            <section>
                <h2>The House</h2>
                <h5>The Chornous Family Homestead </h5>
                <p>
                    The house on Poverty Hill has been a part of the Chornous family since August, 1992 - purchased the week Abby was born. Originally the Coit family homestead, the house was built in 1875 by Lewis and Maria Coit for themselves, their 12 children, and adopted son 'Abe Maybee'. Maybee was the son of a liberated slave who was left abandoned in Ellicottville in 1850.
                </p>

                <img src={illustration} id="house-illustration" />

                <h5>Town Folklore</h5>
                <p>
                    Town folklore states 'Lewis Coit a prosperous Poverty Hill farmer, spotted the boy sitting on a fence in the town and asked him his name. "Abram" said the boy. "Would you like to come home with me?" Coit asked. "Maybe" Abram answered. From that day forward he was known as Abram Maybee.' (excerpt taken from the town newspaper).
                </p>
                <h5>The Photo</h5>
                <p>
                    The Coit family portrait has hung in the front stairwell of the house for the past 30 years. In a <i><b>sPoOoOky</b></i> coincidence the photo dates to 130 years (minus 1 day) to the July 8th wedding. Kismet or haunted - we will see.
                </p>
            </section>
        </div>
    )
}

export default House
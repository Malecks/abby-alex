import { Link } from "react-router-dom"

const Faq = () => {

return (
    <div className="infoPage">
            <h4>Frequently asked questions</h4>
            <section>
                <h2>FAQ</h2>
                <h5>What do I need to cross the border into the USA?</h5>
                <p>You will need a valid passport! If you are borrowing a car, consider bringing a signed note from the owner. If you're borrowing a child, same deal (bring a note from the parent). If you are bringing pets, remember their up-to-date rabies vaccination records.</p>

                <h5>Will there be transportation on Saturday?</h5>
                <p>Yes. <Link to="/transportation">Visit the transportation page</Link>. There will be no parking on Saturday so please take advantage of the party shuttle! Help us out and don't wait for the last shuttle to the wedding - there will be drinks waiting for you!</p>

                <h5>What if I need a cab?</h5>
                <p>The local cab company is Southern Tier Transportation (716-375-8294). And most excitingly, Uber and Lyft are here! There is usually one or two cars cruising around on weekends, so just be sure to give yourself lots of time to call.</p>

                <h5>Will there be food?</h5>
                <p>Yes.</p>

                <h5>How much food?</h5>
                <p>There will be light bites at Friday's welcome drinks, a full spread at the Saturday wedding, and grab and go brunch at Sunday's send-off pond party. For restaurant recommendations check out our Ellicottville guide.</p>

                <h5>What shoes should I wear?</h5>
                <p>Ladies and  gents, be warned - we will be on grass and gravel, so leave the stilettos in the city or be prepared to get <em>~tipsy~</em>.</p>

                <h5>Do I need to attend all three events?</h5>
                <p>Not at all! Saturday is the main event that you won't want to miss. Friday welcome drinks, and the Sunday brunch will be casual and completely optional, but we'd love to see you there.</p>

                <h5>Will we be indoors or outdoors on Saturday?</h5>
                <p>The ceremony and cocktail hour will be on the lawn, and the reception will be under a tent. In the event of rain, we will hold the ceremony and cocktail inside the house, and move to the tent for dinner.</p>

                <h5>Do you have a registry?</h5>
                <p>We're so grateful to our guests for making their way to Ellicottville and sharing the weekend with us. Your presence is all the presents we need. However, if you feel so obliged to give a gift, consider helping us share an experience by contributing to our honeymoon fund.</p>

                <h5>Who can help me with last-minute questions?</h5>
                <p>Not us! Our wonderful wedding planner Katharine will be available for any day-of questions or quandaries. She can be reached at (716) 474-3318.</p>
            </section>
    </div>
)
}
export default Faq
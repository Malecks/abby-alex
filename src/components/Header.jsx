import Monogram from "./Monogram"
import illustration from "../img/Ellicottville_House_2.png"

const Header = () => {
    return (
        <header id="mainHeader">
            <Monogram />
            <img src={illustration} id="house-illustration" />
            <h3>July 8th, 2023 — Ellicottville N.Y.</h3>
        </header>
    )
}

export default Header
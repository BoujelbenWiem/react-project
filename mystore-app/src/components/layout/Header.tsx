import SearchBar from "./SearchBar";
import MiniCart from "./MiniCart";
import { Link} from "react-router-dom";
import { useState } from "react";
import "./Header.scss";
import Logo from '../../assets/logo.svg';
import  {useNavigate} from "react-router-dom";
const Header = () => {
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();
    const handleSearch=()=>{
      if(!searchValue.trim()) return;
      navigate(`/shop?q=${searchValue}&_page=1&_limit=8`);
    }
    return (
         <header className="header">
      
      <Link className="header__logo" to="/">
        <img src={Logo} alt="MyStore Logo" />
      </Link>

      
      <div className="header__search">
        <SearchBar value={searchValue} onChange={setSearchValue} onSearch={handleSearch} />
      </div>

      
      <div className="header__cart">
        <MiniCart/>
      </div>
    </header>
    )
}   

export default Header;
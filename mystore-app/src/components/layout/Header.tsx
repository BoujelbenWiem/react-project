import SearchBar from "./SearchBar";
import MiniCart from "./MiniCart";
import { Link ,useLocation} from "react-router-dom";
import { useState } from "react";
import "./Header.scss";
import Logo from '../../assets/logo.svg';
import  {useNavigate} from "react-router-dom";
const Header = () => {
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const handleSearch=()=>{
      const params = new URLSearchParams(location.search);
      if (params.get("categoryId")) {
        params.delete("categoryId"); // Clear category filter when searching
      }
      if(searchValue.trim()){
        params.set("q", searchValue);
      }else{
        params.delete("q");
      }
      params.set("page", "1"); // Reset to first page on new search
      navigate(`/shop?${params.toString()}`);
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
import { FC, useEffect, useRef, useState } from "react";
// import { useHistory } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import PrimarySearchAppBar from "../navbar/Navbar";
import "./styles.css";
// import Logo from "./logo.png";

const menuItems = [
  {
    name: "Dashboard",
    icon: "home",
  },
  {
    name: "Inventory",
    icon: "Category",
    items: ["Overview", "Products","Materials", "Operations", "Reports"],
  },
  {
    name: "Discuss",
    icon: "Chat",
    // items: ["Article", "Document", "Report"],
  },
  {
    name: "Settings",
    icon: "settings",
    // items: ["", "Logout"],
  },
  {
    name: "Clients",
    icon: "Group",
  },
  {
    name: "Suppliers",
    icon: "Groups",
  },
  {
    name: "Packages",
    icon: "search",
  },
  {
    name: "CRM Tool",
    icon: "person",
  },
  {
    name: "Analytics",
    icon: "Timeline",
  },
];

type Item = {
  name: string;
  icon: string;
  items: string[];
};

const Icon = ({ icon }: { icon: string }) => (
  <span className="material-symbols-outlined">{icon}</span>
);

// interface BurgerProps{
//   isClosed:boolean;
// }

// export const BurgerSpin: FC<BurgerProps> = ({ isClosed }) => (
//   <span className={`burger burger-spin ${isClosed && "is-closed"}`} />
// );



const NavHeader = () => (
  <header className="sidebar-header">
    <button type="button" className="button-sidebar">
      <Icon icon="menu" />
    </button>
    <span style={{color:"black",fontSize:'32px'}}>Admin</span>
  </header>
);

type ButtonProps = {
  onClick: (item: string) => void;
  name: string;
  icon?: string;
  isActive: boolean;
  hasSubNav?: boolean;
};

const NavButton: FC<ButtonProps> = ({
  onClick,
  name,
  icon,
  isActive,
  hasSubNav,
}) => (
  <button
    type="button"
    onClick={() => onClick(name)}
    className={isActive ? "active button-sidebar" : "button-sidebar"}
  >
    {icon && <Icon icon={icon} />}
    <span>{name}</span>
    {hasSubNav && <Icon icon={`expand_${isActive ? "less" : "more"}`} />}
  </button>
);

type SubMenuProps = {
  item: Item;
  activeItem: string;
  handleClick: (args0: string) => void;
};

const SubMenu: FC<SubMenuProps> = ({ item, activeItem, handleClick }) => {
  const navRef = useRef<HTMLDivElement>(null);

  const isSubNavOpen = (item: string, items: string[]) =>
    items.some((i) => i === activeItem) || item === activeItem;

  return (
    <div
      className={`sub-nav ${isSubNavOpen(item.name, item.items) ? "open" : ""}`}
      style={{
        height: !isSubNavOpen(item.name, item.items)
          ? 0
          : navRef.current?.clientHeight,
      }}
    >
      <div ref={navRef} className="sub-nav-inner">
        {item?.items.map((subItem) => (
          <NavButton
            onClick={handleClick}
            name={subItem}
            isActive={activeItem === subItem}
          />
        ))}
      </div>
    </div>
  );
};
interface props{
  locationName:string
}


export const Sidebar = (props:props) => {
  
  const [activeItem, setActiveItem] = useState<string>("");
  const navigate=useNavigate()
  useEffect(()=>{
     const  active= props.locationName
      setActiveItem(active)

  },[])

const handleLink=(item:string)=>{
  handleClick(item);
  const routeLink=item.replace(/\s+/g, '').toLowerCase()
  // history.push(`/company/${item}`)
  console.log(item)
  navigate(`/company/${routeLink}`)
  
}


  const handleClick = (item: string) => {
    console.log("activeItem", activeItem);
    setActiveItem(item !== activeItem ? item : "");
    const routeLink=item.replace(/\s+/g, '').toLowerCase()
    if(routeLink === "overview" || routeLink === "products"|| routeLink === "materials" || routeLink === "operations" || routeLink === "reports"){
      navigate(`/company/inventory/${routeLink}`)
    }

  };

  return (
    <div style={{height:'100vh',backgroundColor:'white'}}>
    <aside className="sidebar" style={{height:'90vh',overflowY:'scroll'}} >
      {/* style={{height:'90vh',overflowY:'scroll',scrollbarWidth: 'none'}} */}
      {menuItems.map((item) => (
        <>
          {!item.items && (
            <NavButton
              onClick={handleLink}
              name={item.name}
              icon={item.icon}
              isActive={activeItem === item.name}
              hasSubNav={!!item.items}
            />
          )}
          {item.items && (
            <>
              <NavButton
                onClick={handleClick}
                name={item.name}
                icon={item.icon}
                isActive={activeItem === item.name}
                hasSubNav={!!item.items}
              />
              <SubMenu
                activeItem={activeItem}
                handleClick={handleClick}
                item={item}
              />
            </>
          )}
        </>
      ))}
    </aside>
    </div>
  );
};

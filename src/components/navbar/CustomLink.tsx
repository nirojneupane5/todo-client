import { NavLink } from "react-router-dom";

type CustomLinkProps = {
  title: string;
  path: string;
};
const CustomLink = ({ title, path }: CustomLinkProps) => {
  return (
    <NavLink to={path} className="text-2xl font-bold capitalize">
      {title}
    </NavLink>
  );
};

export default CustomLink;

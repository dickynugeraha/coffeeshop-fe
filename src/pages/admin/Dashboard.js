import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import WrapContent from "../../components/UI/WrapContent";

const Dashboard = () => {
  const authCtx = useContext(AuthContext);
  return (
    <WrapContent>
      <h1
        style={{
          fontSize: "2.4rem",
          paddingTop: "11rem",
          textAlign: "center",
          textTransform: "uppercase",
          textShadow: "1px 3px 0 #969696, 1px 13px 5px #aba8a8",
        }}
      >
        Hello, {authCtx.name}
      </h1>
    </WrapContent>
  );
};

export default Dashboard;

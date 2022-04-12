import { useParams } from "react-router-dom";
import "./styles.css";
import Button from "../../components/Button";
import { useHistory } from "react-router-dom";

const Success = ({ user }) => {
  const params = useParams();
  const history = useHistory();
  return (
    <>
      <div className="container-Success">
        <h3>Bem-vindo {params.id}</h3>
        <p>Favor confirme seu cadastro no e-mail: </p>
        <p className="email">{user.email}</p>
        <Button onClick={() => history.push("/")}>Voltar</Button>
      </div>
    </>
  );
};

export default Success;

function Produto() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [produto, setProduto] = useState({});
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      async function loadProduto() {
        try {
          const response = await api.get(`/jogos/${id}`);
          setProduto(response.data);
        } catch (error) {
          console.log("Produto não encontrado");
          navigate("/", { replace: true });
          return;
        } finally {
          setLoading(false);
        }
      }
      loadProduto();
    }, [navigate, id]);
  
    function salvarProduto() {
      const lista = localStorage.getItem("@ludomarket");
      let produtosSalvos = JSON.parse(lista) || [];
  
      if (produtosSalvos.some((p) => p.id === produto.id)) {
        toast.warn("Você já salvou este produto");
        return;
      }
  
      produtosSalvos.push(produto);
      localStorage.setItem("@ludomarket", JSON.stringify(produtosSalvos));
      toast.success("Produto salvo com sucesso!");
    }
  
    if (loading) {
      return <div><h1>Carregando produto...</h1></div>;
    }
  
    return (
      <div className="produto-info">
        <h1>{produto.nome}</h1>
        <img src={produto.imagem_grande} alt={produto.nome} />
        <h3>Descrição</h3>
        <span>{produto.descricao}</span>
        <strong>Preço: R$ {produto.preco}</strong>
        <div className="area-buttons">
          <button onClick={salvarProduto}>Salvar</button>
          <button>
            <a target="_blank" rel="noreferrer" href={`https://youtube.com/results?search_query=${produto.nome}`}>
              Ver vídeo
            </a>
          </button>
        </div>
      </div>
    );
  }
  
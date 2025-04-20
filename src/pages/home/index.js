function Home() {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      async function loadProdutos() {
        try {
          const response = await api.get('/jogos'); // ajuste o endpoint se necessário
          setProdutos(response.data.slice(0, 10));
        } catch (err) {
          console.error("Erro ao carregar produtos:", err);
        } finally {
          setLoading(false);
        }
      }
  
      loadProdutos();
    }, []);
  
    if (loading) {
      return (
        <div className="loading">
          <h2>Carregando produtos...</h2>
        </div>
      );
    }
  
    return (
      <div className="container">
        <div className="lista-produtos">
          {produtos.map((produto) => (
            <article key={produto.id}>
              <strong>{produto.nome}</strong>
              <img src={produto.imagem} alt={produto.nome} />
              <Link to={`/produto/${produto.id}`}>Acessar</Link>
            </article>
          ))}
        </div>
      </div>
    );
  }
  
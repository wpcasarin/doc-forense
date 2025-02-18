export interface GalileuData {
  protocolo: number;
  dataEntrada: number | null;
  listaProcedimentoPolicial: any[];
  listaExameSolicitacao: ExameSolicitacao[];
  setor: Setor;
  documentoProcedimentoPericial: DocumentoProcedimentoPericial;
  laudo: Laudo;
  listaVestigio: Vestigio[];
  listaEnvolvido: any[];
  solicitacaoOcorrencia: SolicitacaoOcorrencia;
  listaDestinos: any[];
}

export interface ExameSolicitacao {
  id: number;
  descricao: string;
  natureza: number;
}

export interface Setor {
  id: number;
  descricao: string;
  descricaoCompleta: string;
}

export interface DocumentoProcedimentoPericial {
  id: number | null;
  dataInclusao: number;
  numero: number;
  ano: number;
  sgd: string | null;
  setor: Setor;
  tipoDocumento: TipoDocumento;
  autoridadeRequisitante: string | null;
  pdf: string | null;
}

export interface TipoDocumento {
  id: number;
  descricao: string;
  abreviatura: string;
}

export interface Laudo {
  dataInclusao: number;
  dataEntrega: number | null;
  sgdEntrega: string | null;
  numeroCompleto: string;
}

export interface Vestigio {
  id: number;
  numeroVestigioRequisitante: string | null;
  numeroVestigioPericiaCriminal: string | null;
  semCadeiaCustodia: boolean;
  tipoEvidencia: string;
  resumo: string;
  dadosVestigio: DadosVestigio;
  observacao: string;
  ultimoLacre: UltimoLacre | null;
  ultimaCustodia: UltimaCustodia | null;
  ultimoLacreAcondicionamento: any;
}

export interface DadosVestigio {
  id: number;
  descricao?: string;
  idEvidenciaMaterialTipo?: number;
  evidenciaMaterialTipo?: string;
  idEvidenciaMaterialApresentacao?: number;
  evidenciaMaterialApresentacao?: string;
  idCor?: number;
  cor?: string;
  quantidade?: number;
  unidadeMedida?: string;
  quantidadeUtilizadaExame?: number;
  unidadeMedidaUtilizadaExame?: string;
  quantidadeUtilizadaAliquotagem?: number | null;
  unidadeMedidaUtilizadaAliquotagem?: string | null;
  substanciaProscrita?: string | null;
}

export interface UltimoLacre {
  id: number;
  numero: string;
  tipoLacre: string;
}

export interface UltimaCustodia {
  id: number;
  custodia: string;
  tipoCustodia: string;
}

export interface SolicitacaoOcorrencia {
  id: number;
  setorAcionamento: SetorAcionamento;
  municipio: Municipio;
  uf: Uf;
  bairro: string;
  dataInclusao: number;
  dataAcionamento: number;
  dataFinalizacao: number | null;
  descricaoLogradouro: string;
  numeroLogradouro: string;
  complementoLogradouro: string;
  flgDecimal: boolean;
  latitude: string;
  longitude: string;
  observacao: string;
  dataHoraOcorrencia: number;
  dataHoraAtendimentoPerito: number;
  dataHoraLiberacaoLocal: number;
  dataHoraMorte: number | null;
  localMorte: string | null;
  tipoAcionamento: string;
  peritoResponsavelLocal: PeritoResponsavelLocal;
  qualificacao: string | null;
}

export interface SetorAcionamento {
  id: number;
  descricao: string;
  descricaoCompleta: string;
}

export interface Municipio {
  id: number;
  descricao: string;
}

export interface Uf {
  id: number | null;
  pais: string | null;
  abreviacao: string | null;
}

export interface PeritoResponsavelLocal {
  nome: string | null;
  cpf: string | null;
  matricula: string | null;
  cargo: string | null;
}

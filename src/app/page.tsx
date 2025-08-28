"use client";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";

type Funcionario = {
  id: number;
  nome: string;
  nascimento: string;
  salario: number;
  funcao: string;
};

const listFuncionarios: Funcionario[] = [
  {
    id: 1,
    nome: "Maria",
    nascimento: "2000-10-18",
    salario: 2009.44,
    funcao: "Operador",
  },
  {
    id: 2,
    nome: "João",
    nascimento: "1990-05-12",
    salario: 2284.38,
    funcao: "Operador",
  },
  {
    id: 3,
    nome: "Caio",
    nascimento: "1961-05-02",
    salario: 9636.14,
    funcao: "Coordenador",
  },
  {
    id: 4,
    nome: "Miguel",
    nascimento: "1988-10-14",
    salario: 19119.88,
    funcao: "Diretor",
  },
  {
    id: 5,
    nome: "Alice",
    nascimento: "1995-11-05",
    salario: 2234.68,
    funcao: "Recepcionista",
  },
  {
    id: 6,
    nome: "Heitor",
    nascimento: "1999-11-19",
    salario: 1582.72,
    funcao: "Operador",
  },
  {
    id: 7,
    nome: "Arthur",
    nascimento: "1993-03-31",
    salario: 4071.84,
    funcao: "Contador",
  },
  {
    id: 8,
    nome: "Laura",
    nascimento: "1994-07-08",
    salario: 3017.45,
    funcao: "Gerente",
  },
  {
    id: 9,
    nome: "Heloisa",
    nascimento: "2003-05-24",
    salario: 1606.85,
    funcao: "Eletricista",
  },
  {
    id: 10,
    nome: "Helena",
    nascimento: "1996-09-02",
    salario: 2799.93,
    funcao: "Gerente",
  },
];

export default function Home() {
  const [funcionarios, setFuncionarios] = useState(listFuncionarios);
  const [ordenarPor, setOrdenarPor] = useState<
    "nome" | "nascimento" | "salario" | "funcao"
  >("nome");
  const [ordenacao, setOrdenacao] = useState<"asc" | "desc">("asc");

  const toggleOrdenacao = (coluna: typeof ordenarPor) => {
    if (ordenarPor === coluna) {
      setOrdenacao((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setOrdenarPor(coluna);
      setOrdenacao("asc");
    }
  };

  const funcionariosOrdenados = useMemo(() => {
    return [...funcionarios].sort((a, b) => {
      let compare = 0;
      if (ordenarPor === "nome") compare = a.nome.localeCompare(b.nome);
      else if (ordenarPor === "funcao")
        compare = a.funcao.localeCompare(b.funcao);
      else if (ordenarPor === "nascimento")
        compare =
          new Date(a.nascimento).getTime() - new Date(b.nascimento).getTime();
      else if (ordenarPor === "salario") compare = a.salario - b.salario;
      return ordenacao === "asc" ? compare : -compare;
    });
  }, [funcionarios, ordenarPor, ordenacao]);

  const formatarDinheiro = (valor: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);

  const formatarData = (dataStr: string) =>
    new Date(dataStr).toLocaleDateString("pt-BR");

  const removerUsuario = (id: number) =>
    setFuncionarios((prev) => prev.filter((f) => f.id !== id));
  const aumentarSalario = () =>
    setFuncionarios((prev) =>
      prev.map((f) => ({ ...f, salario: f.salario * 1.1 }))
    );
  const aumentarSalarioDeUm = (id: number) =>
    setFuncionarios((prev) =>
      prev.map((f) => (f.id === id ? { ...f, salario: f.salario * 1.1 } : f))
    );

  const agrupadoPorFuncao = useMemo(() => {
    return funcionarios.reduce<Record<string, Funcionario[]>>((acc, f) => {
      if (!acc[f.funcao]) acc[f.funcao] = [];
      acc[f.funcao].push(f);
      return acc;
    }, {});
  }, [funcionarios]);

  return (
    <section className="max-w-5xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Funcionários</h1>
      <div className="flex gap-2 mb-4">
        <Button onClick={aumentarSalario}>Aumento Geral 10%</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {["nome", "nascimento", "salario", "funcao"].map((col) => (
              <TableHead
                key={col}
                className={`cursor-pointer ${
                  ordenarPor === col ? "font-bold bg-gray-100" : ""
                }`}
                onClick={() => toggleOrdenacao(col as typeof ordenarPor)}
              >
                {col === "nome"
                  ? "Nome"
                  : col === "nascimento"
                  ? "Data Nascimento"
                  : col === "salario"
                  ? "Salário"
                  : "Função"}
                {ordenarPor === col && (ordenacao === "asc" ? " ↑" : " ↓")}
              </TableHead>
            ))}
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {funcionariosOrdenados.map((f) => (
            <TableRow key={f.id}>
              <TableCell>{f.nome}</TableCell>
              <TableCell>{formatarData(f.nascimento)}</TableCell>
              <TableCell>{formatarDinheiro(f.salario)}</TableCell>
              <TableCell>{f.funcao}</TableCell>
              <TableCell className="flex gap-2">
                <Button onClick={() => removerUsuario(f.id)}>
                  <Trash2 />
                </Button>
                <Button onClick={() => aumentarSalarioDeUm(f.id)}>
                  Aumento Individual
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={5} className="text-right">
              <Button onClick={aumentarSalario}>Aumento Geral 10%</Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <div className="space-y-4 mt-6">
        {Object.entries(agrupadoPorFuncao).map(([funcao, lista]) => (
          <div key={funcao} className="border p-3 rounded-lg shadow">
            <h2 className="font-bold text-lg">
              {funcao} ({lista.length})
            </h2>
            <ul className="list-disc pl-6">
              {lista.map((f) => (
                <li key={f.id}>
                  {f.nome} — {formatarDinheiro(f.salario)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

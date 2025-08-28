"use client";
import React, { useMemo, useState } from "react";

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
import { Trash2, ArrowUp, ArrowDown } from "lucide-react";

type Funcionario = {
  id: number;
  nome: string;
  nascimento: string; // formato "YYYY-MM-DD"
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

export default function TabelaFuncionarios() {
  const [funcionarios, setFuncionarios] =
    useState<Funcionario[]>(listFuncionarios);

  const [ordenarPor, setOrdenarPor] = useState<
    "nome" | "nascimento" | "salario" | "funcao"
  >("nome");
  const [ordenacao, setOrdenacao] = useState<"asc" | "desc">("asc");

  const toggleOrdenacao = (coluna: typeof ordenarPor) => {
    if (ordenarPor === coluna) {
      setOrdenacao((p) => (p === "asc" ? "desc" : "asc"));
    } else {
      setOrdenarPor(coluna);
      setOrdenacao("asc");
    }
  };

  const parseISOToDate = (iso: string) => {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, (m || 1) - 1, d || 1);
  };

  const formatarData = (iso: string) => {
    const d = parseISOToDate(iso);
    return d.toLocaleDateString("pt-BR");
  };

  const formatarDinheiro = (v: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(v);

  const funcionariosOrdenados = useMemo(() => {
    return [...funcionarios].sort((a, b) => {
      let compare = 0;

      if (ordenarPor === "nome") {
        compare = a.nome.localeCompare(b.nome);
      } else if (ordenarPor === "funcao") {
        compare = a.funcao.localeCompare(b.funcao);
      } else if (ordenarPor === "nascimento") {
        compare =
          parseISOToDate(a.nascimento).getTime() -
          parseISOToDate(b.nascimento).getTime();
      } else if (ordenarPor === "salario") {
        compare = a.salario - b.salario;
      }

      return ordenacao === "asc" ? compare : -compare;
    });
  }, [funcionarios, ordenarPor, ordenacao]);

  const removerUsuario = (id: number) =>
    setFuncionarios((prev) => prev.filter((f) => f.id !== id));

  const aumentarSalario = () =>
    setFuncionarios((prev) =>
      prev.map((f) => ({ ...f, salario: Number((f.salario * 1.1).toFixed(2)) }))
    );

  const aumentarSalarioDeUm = (id: number) =>
    setFuncionarios((prev) =>
      prev.map((f) =>
        f.id === id
          ? { ...f, salario: Number((f.salario * 1.1).toFixed(2)) }
          : f
      )
    );

  const agrupadoPorFuncao = useMemo(() => {
    return funcionarios.reduce<Record<string, Funcionario[]>>((acc, f) => {
      if (!acc[f.funcao]) acc[f.funcao] = [];
      acc[f.funcao].push(f);
      return acc;
    }, {});
  }, [funcionarios]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Funcionários</h2>
        <Button onClick={aumentarSalario}>Aumento Geral 10%</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              onClick={() => toggleOrdenacao("nome")}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-1">
                Nome
                {ordenarPor === "nome" &&
                  (ordenacao === "asc" ? (
                    <ArrowUp size={14} />
                  ) : (
                    <ArrowDown size={14} />
                  ))}
              </div>
            </TableHead>

            <TableHead
              onClick={() => toggleOrdenacao("nascimento")}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-1">
                Data Nascimento
                {ordenarPor === "nascimento" &&
                  (ordenacao === "asc" ? (
                    <ArrowUp size={14} />
                  ) : (
                    <ArrowDown size={14} />
                  ))}
              </div>
            </TableHead>

            <TableHead
              onClick={() => toggleOrdenacao("salario")}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-1">
                Salário
                {ordenarPor === "salario" &&
                  (ordenacao === "asc" ? (
                    <ArrowUp size={14} />
                  ) : (
                    <ArrowDown size={14} />
                  ))}
              </div>
            </TableHead>

            <TableHead
              onClick={() => toggleOrdenacao("funcao")}
              className="cursor-pointer text-right"
            >
              <div className="flex items-center justify-end gap-1">
                Função
                {ordenarPor === "funcao" &&
                  (ordenacao === "asc" ? (
                    <ArrowUp size={14} />
                  ) : (
                    <ArrowDown size={14} />
                  ))}
              </div>
            </TableHead>

            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {funcionariosOrdenados.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.nome}</TableCell>
              <TableCell>{formatarData(item.nascimento)}</TableCell>
              <TableCell>{formatarDinheiro(item.salario)}</TableCell>
              <TableCell className="text-right">{item.funcao}</TableCell>
              <TableCell className="flex gap-2">
                <Button onClick={() => removerUsuario(item.id)}>
                  <Trash2 />
                </Button>
                <Button onClick={() => aumentarSalarioDeUm(item.id)}>
                  +10%
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={5} className="text-right">
              Total:{" "}
              <strong>
                {formatarDinheiro(
                  funcionarios.reduce((s, f) => s + f.salario, 0)
                )}
              </strong>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {/* agrupamento por função */}
      <div className="space-y-4">
        {Object.entries(agrupadoPorFuncao).map(([funcao, lista]) => (
          <div key={funcao} className="border p-3 rounded-lg">
            <h3 className="font-semibold">{funcao}</h3>
            <ul className="pl-5 list-disc">
              {lista.map((f) => (
                <li key={f.id}>
                  {f.nome} — {formatarDinheiro(f.salario)} —{" "}
                  {formatarData(f.nascimento)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

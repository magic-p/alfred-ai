
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogout: () => void;
}

// Mock data for transactions
const mockTransactions = [
  { id: 1, date: "2023-05-20", description: "Supermercado Pão de Açúcar", category: "Mercado", value: -120.45 },
  { id: 2, date: "2023-05-19", description: "Netflix", category: "Assinaturas", value: -39.90 },
  { id: 3, date: "2023-05-17", description: "Restaurante Xangai", category: "Alimentação Fora", value: -85.30 },
  { id: 4, date: "2023-05-15", description: "Uber", category: "Transporte", value: -18.75 },
  { id: 5, date: "2023-05-14", description: "Farmácia", category: "Saúde", value: -34.20 },
  { id: 6, date: "2023-05-12", description: "Cinema", category: "Lazer", value: -45.00 },
  { id: 7, date: "2023-05-10", description: "Transferência recebida", category: "Receita", value: 1500.00 },
  { id: 8, date: "2023-05-09", description: "Amazon", category: "Compras", value: -67.90 },
  { id: 9, date: "2023-05-08", description: "Academia", category: "Saúde", value: -99.00 },
  { id: 10, date: "2023-05-05", description: "Conta de luz", category: "Moradia", value: -150.75 },
];

export default function ConfigDialog({ open, onOpenChange, onLogout }: ConfigDialogProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDeleteAllData = () => {
    // In a real app, this would call an API to delete the user's data
    toast.success("Todos os dados foram apagados com sucesso!");
    setConfirmDelete(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] md:max-w-[600px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Configurações</DialogTitle>
          <DialogDescription>
            Gerencie suas configurações e veja seus registros.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="records" className="flex-grow flex flex-col">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="records">Registros</TabsTrigger>
            <TabsTrigger value="account">Conta</TabsTrigger>
          </TabsList>

          <TabsContent value="records" className="flex-grow">
            <ScrollArea className="h-[50vh]">
              <div className="border rounded-md">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="p-2 text-left">Data</th>
                      <th className="p-2 text-left">Descrição</th>
                      <th className="p-2 text-left">Categoria</th>
                      <th className="p-2 text-right">Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockTransactions.map((transaction) => (
                      <tr key={transaction.id} className="border-t">
                        <td className="p-2">{new Date(transaction.date).toLocaleDateString('pt-BR')}</td>
                        <td className="p-2">{transaction.description}</td>
                        <td className="p-2">{transaction.category}</td>
                        <td className={`p-2 text-right ${transaction.value < 0 ? 'text-destructive' : 'text-green-600'}`}>
                          R$ {transaction.value.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="account" className="space-y-4">
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">Sua conta</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Gerencie seus dados e conta.
              </p>
              <div className="space-y-2">
                <Button onClick={onLogout} variant="outline" className="w-full">
                  Sair da conta
                </Button>
                {confirmDelete ? (
                  <div className="space-y-2">
                    <p className="text-sm text-destructive">
                      Tem certeza? Esta ação não pode ser desfeita.
                    </p>
                    <div className="flex gap-2">
                      <Button
                        onClick={handleDeleteAllData}
                        variant="destructive"
                        className="flex-1"
                      >
                        Sim, apagar tudo
                      </Button>
                      <Button
                        onClick={() => setConfirmDelete(false)}
                        variant="outline"
                        className="flex-1"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    onClick={() => setConfirmDelete(true)}
                    variant="destructive"
                    className="w-full"
                  >
                    Apagar todos os dados
                  </Button>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

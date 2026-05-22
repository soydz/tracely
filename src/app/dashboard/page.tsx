"use client";

import { Modal } from "@heroui/react";
import { Plus } from "lucide-react";
import { useState } from "react";

import { BalanceOverview } from "@/features/transactions/components/BalanceOverview";
import { TransactionForm } from "@/features/transactions/components/TransactionForm";
import { TransactionGrid } from "@/features/transactions/components/TransactionGrid";
import { useTransaction } from "@/features/transactions/hooks/useTransactions";

export default function DashboardPage() {
  const [isOpen, setIsOpen] = useState(false);

  const [date, setDate] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const { data: transactions } = useTransaction();

  return (
    <div className="flex justify-center">
      <div className="flex-1 flex flex-col items-center gap-10 px-4">
        <div className="w-full">
          <BalanceOverview date={date} setDate={setDate} />
        </div>

        <div className="flex justify-center w-full">
          <TransactionGrid transactions={transactions || []} filter={date} />
        </div>

        {/* Modal */}
        <div className="fixed bottom-8 z-50">
          <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
            <Plus
              onClick={() => setIsOpen(true)}
              size={48}
              className="bg-accent text-white rounded-full cursor-pointer transition-transform duration-300 ease-in-out hover:scale-120"
            />

            <Modal.Backdrop>
              <Modal.Container size="lg">
                <Modal.Dialog>
                  <Modal.CloseTrigger />
                  <Modal.Header>
                    <Modal.Heading>Add Transaction</Modal.Heading>
                  </Modal.Header>
                  <Modal.Body>
                    <TransactionForm onSuccess={() => setIsOpen(false)} />
                  </Modal.Body>
                </Modal.Dialog>
              </Modal.Container>
            </Modal.Backdrop>
          </Modal>
        </div>
      </div>
    </div>
  );
}

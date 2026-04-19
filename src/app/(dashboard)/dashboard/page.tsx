"use client";

import { Modal } from "@heroui/react";

import { useAuth } from "@/core/contexts/AuthContext";

import { Plus } from "lucide-react";
import { useState } from "react";

import { TransactionForm } from "@/features/transactions/components/TransactionForm";

export default function DashboardPage() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col gap-2 items-center justify-center">
      <h1 className="text-4xl mb-3">Dashboard</h1>
      <p>Bienvenido, {user?.username}</p>

      <div className="absolute bottom-5">
        <Modal
          isOpen={isOpen}
          onOpenChange={setIsOpen}
        >

          <Plus onClick={() => setIsOpen(true)} size={48} className="bg-accent text-white rounded-full cursor-pointer transition-transform duration-300 ease-in-out hover:scale-120" />

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
  );
}

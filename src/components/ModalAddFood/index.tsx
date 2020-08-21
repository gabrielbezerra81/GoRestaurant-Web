import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';

interface IFoodPlate {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
  available: boolean;
}

interface ICreateFoodData {
  name: string;
  image: string;
  price: string;
  description: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (food: Omit<IFoodPlate, 'id' | 'available'>) => void;
}

const ModalAddFood: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddFood,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ICreateFoodData) => {
      await handleAddFood(data);
      setIsOpen();
    },
    [handleAddFood, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form
        ref={formRef}
        initialData={{
          name: 'Frango à parmegiana',
          price: '19.90',
          description: 'Filé de frango empanado com molho especial',
          image:
            'https://s2.glbimg.com/m8xzkTjTE_p4c81beNVuoFtb-Qk=/0x0:672x504/984x0/smart/filters:strip_icc()/s.glbimg.com/po/rc/media/2013/12/17/16_32_38_969_frango_a_parmegiana_receitadaclau.JPG',
        }}
        onSubmit={handleSubmit}
      >
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link da imagem aqui" />

        {/* <input
          type="text"
          value="https://s2.glbimg.com/m8xzkTjTE_p4c81beNVuoFtb-Qk=/0x0:672x504/984x0/smart/filters:strip_icc()/s.glbimg.com/po/rc/media/2013/12/17/16_32_38_969_frango_a_parmegiana_receitadaclau.JPG"
        /> */}

        <Input name="name" placeholder="Ex: Macarrão à bolonhesa" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddFood;

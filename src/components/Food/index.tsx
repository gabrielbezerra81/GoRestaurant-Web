/* eslint-disable no-console */
import React, { useState, useCallback } from 'react';

import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';

interface IFoodPlate {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
  available: boolean;
}

interface IProps {
  food: IFoodPlate;
  handleDelete: (id: number) => {};
  handleEditFood: (food: IFoodPlate) => void;
  toggleEditModal: (toggle: boolean) => void;
  handleUpdateFood: (food: IFoodPlate) => Promise<void>;
}

const Food: React.FC<IProps> = ({
  food,
  handleDelete,
  handleEditFood,
  toggleEditModal,
  handleUpdateFood,
}: IProps) => {
  const [isAvailable, setIsAvailable] = useState(food.available);

  const toggleAvailable = useCallback(
    async (foodToUpdate: IFoodPlate): Promise<void> => {
      try {
        await handleUpdateFood({
          ...foodToUpdate,
          available: !foodToUpdate.available,
        });
        setIsAvailable(oldValue => !oldValue);
      } catch (error) {
        console.log(error);
      }
    },
    [handleUpdateFood],
  );

  const setEditingFood = useCallback(async () => {
    toggleEditModal(true);
    handleEditFood(food);
    // TODO - SET THE ID OF THE CURRENT ITEM TO THE EDITING FOOD AND OPEN MODAL
  }, [handleEditFood, food, toggleEditModal]);

  return (
    <Container available={isAvailable}>
      <header>
        <img src={food.image} alt={food.name} />
      </header>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={() => setEditingFood()}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={() => toggleAvailable(food)}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
};

export default Food;
